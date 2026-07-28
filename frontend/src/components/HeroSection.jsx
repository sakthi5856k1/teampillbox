import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartPulse, 
  ShieldCheck, 
  LogIn, 
  MessageSquare, 
  Clock, 
  Radio, 
  ArrowRight,
  Activity
} from 'lucide-react';

export const HeroSection = () => {
  const { setCurrentTab, setIsDiscordModalOpen, onlineCount } = useApp();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-950">
      
      {/* ── Full-screen Background ── */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/pillbox_hero_bg.jpg" 
          alt="Pillbox EMS Night Hospital Scene" 
          className="w-full h-full object-cover opacity-30 filter contrast-110 brightness-75"
          style={{ transform: 'scale(1.04)' }}
        />
        {/* Layered gradients for crisp text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-dark-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-transparent to-dark-950/80"></div>
        
        {/* Ambient red glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-ems-red/15 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-ems-red/10 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      {/* ── Hero Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 flex flex-col items-center">
        
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-900/80 border border-ems-red/35 backdrop-blur-md mb-8 shadow-glow-red">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ems-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ems-red"></span>
          </span>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-200">
            Pillbox Hill Medical Center &nbsp;•&nbsp; 24/7 Emergency Response
          </span>
        </div>

        {/* Logo Emblem */}
        <div className="relative mb-7 group">
          <div className="absolute -inset-5 bg-gradient-to-r from-ems-red to-ems-darkred rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition duration-500"></div>
          <img 
            src="/assets/pillbox_ems_logo.jpg" 
            alt="Team Pillbox EMS Seal" 
            className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-ems-red shadow-glow-red-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4 font-heading leading-none">
          TEAM PILLBOX
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ems-red via-red-400 to-red-500">
            EMS
          </span>
        </h1>

        <p className="max-w-2xl text-base sm:text-lg text-slate-400 font-normal leading-relaxed mb-10">
          San Andreas' premier Emergency Medical Services roleplay organization — delivering gold-standard trauma care, rapid air evacuation, and tactical medical support.
        </p>

        {/* ── CTA Buttons ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          
          {/* Join EMS */}
          <button
            onClick={() => setCurrentTab('recruitment')}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-ems-red via-red-600 to-ems-darkred font-bold text-white tracking-wide uppercase text-sm shadow-glow-red hover:shadow-glow-red-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <HeartPulse className="w-4 h-4 group-hover:animate-bounce" />
            Join EMS Academy
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Staff Login — opens Discord auth modal */}
          <button
            onClick={() => setIsDiscordModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#5865F2]/20 border border-[#5865F2]/50 hover:bg-[#5865F2] font-semibold text-white text-sm tracking-wide uppercase backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <LogIn className="w-4 h-4 text-[#7289da]" />
            Staff Login
          </button>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-dark-850/80 border border-white/10 hover:border-[#5865F2]/60 hover:bg-dark-800 font-semibold text-slate-200 hover:text-white text-sm tracking-wide uppercase backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-[#5865F2]" />
            Discord
          </a>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl">
          
          <div className="glass-panel p-4 rounded-2xl border-l-4 border-ems-red text-left">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-mono text-slate-400">On Duty</span>
              <Activity className="w-4 h-4 text-ems-red" />
            </div>
            <div className="text-2xl font-extrabold text-white font-heading">{onlineCount}</div>
            <p className="text-[10px] text-emerald-400 mt-0.5 font-mono">Units Active</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border-l-4 border-ems-red text-left">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-mono text-slate-400">Response</span>
              <Clock className="w-4 h-4 text-ems-red" />
            </div>
            <div className="text-2xl font-extrabold text-white font-heading">&lt;90s</div>
            <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Priority Calls</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border-l-4 border-ems-red text-left">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-mono text-slate-400">Life-Saves</span>
              <ShieldCheck className="w-4 h-4 text-ems-red" />
            </div>
            <div className="text-2xl font-extrabold text-white font-heading">1,420+</div>
            <p className="text-[10px] text-slate-400 mt-0.5 font-mono">This Month</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border-l-4 border-ems-red text-left">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-mono text-slate-400">Air Rescue</span>
              <Radio className="w-4 h-4 text-ems-red" />
            </div>
            <div className="text-2xl font-extrabold text-white font-heading">24/7</div>
            <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Helipad Ops</p>
          </div>

        </div>

      </div>

      {/* Scroll-down cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce opacity-50">
        <div className="w-5 h-8 rounded-full border-2 border-slate-400 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-slate-400 rounded-full"></div>
        </div>
        <span className="text-[9px] font-mono uppercase text-slate-500 tracking-widest">Scroll</span>
      </div>

    </div>
  );
};
