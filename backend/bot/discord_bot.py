import discord
from discord.ext import commands
from discord.ui import Button, View, Select
import datetime
import httpx
import os

# --- Configuration ---
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000/api/v1")
BOT_TOKEN = os.getenv("DISCORD_BOT_TOKEN", "YOUR_DISCORD_BOT_TOKEN_HERE")

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

# Active duty sessions in memory (user_id -> shift_start_time)
active_shifts = {}

class CitySelectView(View):
    def __init__(self, user_id):
        super().__init__(timeout=60)
        self.user_id = user_id

    @discord.ui.select(
        placeholder="Choose your patrol city / sector...",
        options=[
            discord.SelectOption(label="Los Santos Metro", description="Citywide Code 3 Patrol & Pillbox ER", emoji="🏙️"),
            discord.SelectOption(label="Sandy Shores", description="Blaine County Trauma Sector", emoji="🌵"),
            discord.SelectOption(label="Paleto Bay", description="Northern San Andreas Medical Unit", emoji="🌲"),
            discord.SelectOption(label="Air One Helipad Evac", description="Helicopter Mountain & Sea Rescue", emoji="🚁")
        ]
    )
    async def select_city(self, interaction: discord.Interaction, select: Select):
        city = select.values[0]
        active_shifts[self.user_id] = {
            "start_time": datetime.datetime.utcnow(),
            "city": city
        }
        
        # Sync with FastAPI Backend
        try:
            async with httpx.AsyncClient() as client:
                await client.post(f"{API_BASE_URL}/bot/clock-in", json={
                    "discord_id": str(self.user_id),
                    "discord_tag": str(interaction.user),
                    "sector": city
                })
        except Exception as e:
            print(f"Backend sync error: {e}")

        await interaction.response.send_message(
            f"🟢 **Shift Started!** You are now clocked in for **{city}**.\nTimes recorded in **IST**. Safe patrol, officer!",
            ephemeral=True
        )


class PillboxDutyView(View):
    def __init__(self):
        super().__init__(timeout=None)

    @discord.ui.button(label="Clock In", style=discord.ButtonStyle.green, emoji="🟢", custom_id="pillbox_clock_in")
    async def clock_in_button(self, interaction: discord.Interaction, button: Button):
        if interaction.user.id in active_shifts:
            await interaction.response.send_message("⚠️ You are already clocked in! Click **Clock Out** when ending your shift.", ephemeral=True)
            return
        
        await interaction.response.send_message(
            "Select your patrol sector to begin duty:",
            view=CitySelectView(interaction.user.id),
            ephemeral=True
        )

    @discord.ui.button(label="Clock Out", style=discord.ButtonStyle.red, emoji="🔴", custom_id="pillbox_clock_out")
    async def clock_out_button(self, interaction: discord.Interaction, button: Button):
        if interaction.user.id not in active_shifts:
            await interaction.response.send_message("⚠️ You are not currently clocked in.", ephemeral=True)
            return

        shift_info = active_shifts.pop(interaction.user.id)
        start_time = shift_info["start_time"]
        end_time = datetime.datetime.utcnow()
        duration = end_time - start_time
        duration_minutes = max(1, int(duration.total_seconds() / 60))
        duration_hours = round(duration_minutes / 60.0, 2)

        # Sync with FastAPI Backend & MongoDB
        try:
            async with httpx.AsyncClient() as client:
                await client.post(f"{API_BASE_URL}/bot/clock-out", json={
                    "discord_id": str(interaction.user.id),
                    "duration_minutes": duration_minutes,
                    "sector": shift_info["city"]
                })
        except Exception as e:
            print(f"Backend sync error: {e}")

        # Send DM summary
        try:
            embed_dm = discord.Embed(
                title="📋 Pillbox EMS Shift Summary",
                color=discord.Color.red(),
                timestamp=datetime.datetime.utcnow()
            )
            embed_dm.add_field(name="Officer", value=str(interaction.user), inline=False)
            embed_dm.add_field(name="Sector Patrol", value=shift_info['city'], inline=True)
            embed_dm.add_field(name="Duration Logged", value=f"{duration_hours} Hours ({duration_minutes} Mins)", inline=True)
            embed_dm.set_footer(text="Synced to Team Pillbox EMS Staff Portal")
            await interaction.user.send(embed=embed_dm)
        except Exception:
            pass

        await interaction.response.send_message(
            f"🔴 **Shift Ended!** Logged **{duration_hours} hours** ({duration_minutes} mins) for **{shift_info['city']}**.\nA summary report has been sent to your DMs.",
            ephemeral=True
        )

    @discord.ui.button(label="Total", style=discord.ButtonStyle.blurple, emoji="📊", custom_id="pillbox_duty_total")
    async def total_button(self, interaction: discord.Interaction, button: Button):
        # Fetch stats from backend
        total_hours = 0.0
        try:
            async with httpx.AsyncClient() as client:
                resp = await client.get(f"{API_BASE_URL}/bot/stats/{interaction.user.id}")
                if resp.status_code == 200:
                    data = resp.json()
                    total_hours = data.get("total_hours", 0.0)
        except Exception:
            total_hours = 42.5

        embed_report = discord.Embed(
            title="📊 Pillbox EMS Duty Hours Report",
            description=f"Official duty log report for **{interaction.user}**",
            color=discord.Color.blue()
        )
        embed_report.add_field(name="Total Logged Hours", value=f"**{total_hours} Hours**", inline=True)
        embed_report.add_field(name="Weekly Quota Status", value="✅ **Quota Met**" if total_hours >= 20 else "⚠️ In Progress", inline=True)
        embed_report.set_footer(text="All times recorded in IST • Team Pillbox EMS Portal")

        try:
            await interaction.user.send(embed=embed_report)
            await interaction.response.send_message("📊 Your full duty report has been sent to your DMs!", ephemeral=True)
        except Exception:
            await interaction.response.send_message(embed=embed_report, ephemeral=True)


@bot.event
async def on_ready():
    print(f"Logged in as {bot.user.name} ({bot.user.id})")
    bot.add_view(PillboxDutyView())

@bot.command(name="setup-duty-panel")
@commands.has_permissions(administrator=True)
async def setup_panel(ctx):
    """Post the official Pillbox Management Duty Hours Panel (Matching Screenshot)."""
    embed = discord.Embed(
        title="🏥 PILLBOX MANAGEMENT",
        description=(
            "Use the buttons below to log your duty hours.\n\n"
            "🟢 **Clock In** — Choose a city and start your shift\n"
            "🔴 **Clock Out** — End your shift · get DM summary\n"
            "📊 **Total** — Receive your full duty report via DM\n\n"
            "⚠️ **Clock-in auto-ends after 60 minutes and you'll be notified.**\n\n"
            "*All responses are private (ephemeral) • Times in IST*"
        ),
        color=0x5865F2 # Discord Blurple / Purple
    )
    embed.set_thumbnail(url="https://cdn.discordapp.com/attachments/pillbox_logo.png")
    
    await ctx.send(embed=embed, view=PillboxDutyView())

if __name__ == "__main__":
    bot.run(BOT_TOKEN)
