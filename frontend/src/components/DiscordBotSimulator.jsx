import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart3, 
  MessageSquare, 
  ShieldCheck, 
  Radio, 
  Send,
  X,
  Sparkles
} from 'lucide-react';

export const DiscordBotSimulator = () => {
  const { discordUser, isOnDuty, clockIn, clockOut, activeShiftSeconds, shiftHistory } = useApp();

  const [selectedCity, setSelectedCity] = useState('');
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [ephemeralMsg, setEphemeralMsg] = useState(null);
  const [activeTab, setActiveTab] = useState('embed'); // 'embed', 'dm'

  const cities = [
    { name: 'Los Santos Metro', emoji: '🏙️', desc: 'Citywide Code 3 Patrol & Pillbox ER' },
    { name: 'Sandy Shores', emoji: '🌵', desc: 'Blaine County Trauma Sector' },
    { name: 'Paleto Bay', emoji: '🌲', desc: 'Northern San Andreas Medical Unit' },
    { name: 'Air One Helipad Evac', emoji: '🚁', desc: 'Helicopter Mountain & Sea Rescue' }
  ];

  const handleClockInClick = () => {
    if (isOnDuty) {
      triggerEphemeral('⚠️ You are already clocked in! Click Clock Out when ending your shift.', 'warning');
      return;
    }
    setShowCityPicker(true);
  };

  const confirmCityClockIn = (cityName) => {
    setSelectedCity(cityName);
    setShowCityPicker(false);
    clockIn();
    triggerEphemeral(`🟢 Shift Started! You are now clocked in for ${cityName}.\nTimes recorded in IST. Safe patrol, officer!`, 'success');
  };

  const handleClockOutClick = () => {
    if (!isOnDuty) {
      triggerEphemeral('⚠️ You are not currently clocked in.', 'warning');
      return;
    }
    const sector = selectedCity || 'Los Santos Metro';
    clockOut(sector);
    setSelectedCity('');
    triggerEphemeral(`🔴 Shift Ended! Duty hours logged and auto-synced to your Staff Portal.\nA DM summary report has been dispatched to ${discordUser.discordTag}.`, 'success');
  };

  const handleTotalClick = () => {
    const totalHours = discordUser.totalDutyHours;
    triggerEphemeral(`📊 Duty Hours Report sent via DM!\nTotal Logged: ${totalHours} Hours • Quota Status: ${totalHours >= 20 ? '✅ Quota Met' : '⚠️ In Progress'}.`, 'info');
  };

  const triggerEphemeral = (msg, type) => {
    setEphemeralMsg({ msg, type });
    setTimeout(() => {
      setEphemeralMsg(null);
    }, 6000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-[#313338] rounded-3xl text-slate-200 font-sans shadow-2xl border border-white/10 select-none">
      
      {/* Discord Header Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#3F4147]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src="/assets/pillbox_ems_logo.jpg" 
              alt="Bot Avatar" 
              className="w-10 h-10 rounded-full border border-ems-red object-cover"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#313338]"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">PILLBOX MANAGEMENT</span>
              <span className="bg-[#5865F2] text-white text-[9px] font-bold px-1.5 py-0.5 rounded font-mono">
                APP
              </span>
            </div>
            <span className="text-[11px] text-[#949BA4] font-mono">06/11/2026 2:53 PM</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-[#2B2D31] text-[#B5BAC1] text-xs font-mono border border-white/5">
            Synced with Web App
          </span>
        </div>
      </div>

      {/* Main Embed Body (Matching Screenshot Pixel-for-Pixel) */}
      <div className="bg-[#2B2D31] rounded-lg p-4 border-l-4 border-[#5865F2] mb-4 space-y-4 shadow-inner">
        
        {/* Embed Title */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🏥</span>
          <h3 className="text-lg font-extrabold text-white font-heading tracking-wide">
            PILLBOX MANAGEMENT
          </h3>
        </div>

        <p className="text-sm text-[#DBDEE1] leading-relaxed">
          Use the buttons below to log your duty hours.
        </p>

        {/* Description List */}
        <div className="space-y-2 text-sm text-[#DBDEE1]">
          <div className="flex items-start gap-2">
            <span className="text-base">🟢</span>
            <p><strong>Clock In</strong> — Choose a city and start your shift</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-base">🔴</span>
            <p><strong>Clock Out</strong> — End your shift · get DM summary</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-base">📊</span>
            <p><strong>Total</strong> — Receive your full duty report via DM</p>
          </div>
        </div>

        {/* Warning Callout Box */}
        <div className="p-3 rounded-lg bg-[#313338] border-l-4 border-amber-500 text-xs text-[#DBDEE1] flex items-center gap-2.5">
          <span className="text-base">⚠️</span>
          <p>
            <strong>Clock-in auto-ends after 60 minutes</strong> and you'll be notified.
          </p>
        </div>

        {/* Ephemeral Disclaimer */}
        <p className="text-[11px] text-[#949BA4] pt-1">
          All responses are private (ephemeral) • Times in IST
        </p>
      </div>

      {/* City Sector Picker Modal if Clocking In */}
      {showCityPicker && (
        <div className="p-4 mb-4 rounded-xl bg-[#2B2D31] border border-[#5865F2] animate-in fade-in space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-white font-mono">Select Patrol Sector:</span>
            <button onClick={() => setShowCityPicker(false)}><X className="w-4 h-4 text-slate-400" /></button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {cities.map((city) => (
              <button
                key={city.name}
                onClick={() => confirmCityClockIn(city.name)}
                className="p-3 rounded-xl bg-[#313338] hover:bg-[#35373C] border border-white/5 text-left transition-all group"
              >
                <div className="flex items-center gap-2 font-bold text-xs text-white group-hover:text-[#5865F2]">
                  <span>{city.emoji}</span>
                  <span>{city.name}</span>
                </div>
                <span className="text-[10px] text-[#949BA4] block mt-0.5">{city.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ephemeral Private Response Toast */}
      {ephemeralMsg && (
        <div className={`p-3.5 mb-4 rounded-xl text-xs flex items-start gap-2.5 animate-in fade-in ${
          ephemeralMsg.type === 'warning' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
          ephemeralMsg.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
          'bg-[#5865F2]/20 text-white border border-[#5865F2]/40'
        }`}>
          <span className="text-xs font-mono bg-black/40 px-2 py-0.5 rounded text-slate-300">Only you can see this</span>
          <p className="whitespace-pre-line leading-relaxed">{ephemeralMsg.msg}</p>
        </div>
      )}

      {/* Discord Interactive Action Buttons (Exact Match to Screenshot) */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {/* 🟢 Clock In Button */}
        <button
          onClick={handleClockInClick}
          className={`py-3 px-4 rounded-lg font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
            isOnDuty 
              ? 'bg-emerald-700/60 cursor-not-allowed opacity-75' 
              : 'bg-[#248046] hover:bg-[#1a6334]'
          }`}
        >
          <span className="text-base">🟢</span>
          <span>Clock In</span>
        </button>

        {/* 🔴 Clock Out Button */}
        <button
          onClick={handleClockOutClick}
          className={`py-3 px-4 rounded-lg font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
            !isOnDuty 
              ? 'bg-rose-900/60 cursor-not-allowed opacity-75' 
              : 'bg-[#DA373C] hover:bg-[#a1282c]'
          }`}
        >
          <span className="text-base">🔴</span>
          <span>Clock Out</span>
        </button>
      </div>

      {/* 📊 Total Button */}
      <div>
        <button
          onClick={handleTotalClick}
          className="w-full py-3 px-4 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <span className="text-base">📊</span>
          <span>Total</span>
        </button>
      </div>

      {/* Active Duty Status Bar */}
      <div className="mt-4 pt-3 border-t border-[#3F4147] flex items-center justify-between text-xs text-[#949BA4]">
        <span>Officer: <strong className="text-white">{discordUser.name} ({discordUser.badge})</strong></span>
        <span>Active Status: <strong className={isOnDuty ? "text-emerald-400 font-mono" : "text-slate-400"}>
          {isOnDuty ? `ON DUTY (${Math.floor(activeShiftSeconds/60)}m)` : 'OFF DUTY'}
        </strong></span>
      </div>

    </div>
  );
};
