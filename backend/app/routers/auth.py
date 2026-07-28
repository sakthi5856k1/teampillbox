from fastapi import APIRouter, HTTPException, status
from app.models.schemas import UserLogin, Token, DiscordAuthCode, RoleEnum
from app.utils.security import create_access_token, exchange_discord_code

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    """Authenticate staff member and return JWT Token."""
    if credentials.username_or_email == "admin" and credentials.password == "pillbox2026":
        token = create_access_token({"sub": "admin", "role": RoleEnum.SUPER_ADMIN, "badge": "EMS-101"})
        return Token(access_token=token, role=RoleEnum.SUPER_ADMIN, badge="EMS-101")
    
    raise HTTPException(status_code=401, detail="Invalid username or password")

@router.post("/discord", response_model=Token)
async def discord_oauth(auth_code: DiscordAuthCode):
    """Authenticate via Discord OAuth code."""
    discord_profile = await exchange_discord_code(auth_code.code)
    token = create_access_token({"sub": discord_profile.get("id"), "role": RoleEnum.EMT, "badge": "EMS-DISCORD"})
    return Token(access_token=token, role=RoleEnum.EMT, badge="EMS-DISCORD")
