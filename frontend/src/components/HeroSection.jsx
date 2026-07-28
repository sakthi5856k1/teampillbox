import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartPulse, 
  ShieldCheck, 
  LogIn, 
  MessageSquare, 
  Clock, 
  Award, 
  Radio, 
  ArrowRight,
  Activity
} from 'lucide-react';

export const HeroSection = () => {
  const { setCurrentTab, onlineCount } = useApp();

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-dark-950 pt-8 pb-16">
      
      {/* Background Graphic & Dark Overlay Gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/pillbox_hero_bg.jpg" 
          alt="Pillbox EMS Night Hospital Scene" 
          className="w-full h-full object-cover opacity-25 filter contrast-125 brightness-75 scale-105 transform animate-pulse-subtle"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-transparent to-dark-950/90"></div>
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-ems-red/20 rounded-full blur-[140px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-dark-900/90 border border-ems-red/40 backdrop-blur-md mb-8 shadow-glow-red">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ems-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ems-red"></span>
          </span>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-200">
            Pillbox Hill Medical Center • 24/7 High-Emergency Unit
          </span>
        </div>

        {/* Big Emblem & Title */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-ems-red to-ems-darkred rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <img 
              src="/assets/pillbox_ems_logo.jpg" 
              alt="Team Pillbox EMS Seal" 
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-ems-red shadow-glow-red-lg transform group-hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 font-heading">
          TEAM PILLBOX <span className="text-transparent bg-clip-text bg-gradient-to-r from-ems-red via-red-400 to-ems-red-hover text-glow-red">EMS</span>
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-10">
          San Andreas' premier Emergency Medical Services roleplay organization. Delivering gold-standard trauma care, rapid air evacuation, and tactical medical support across Los Santos.
        </p>

        {/* Animated CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          
          {/* Join EMS CTA */}
          <button
            onClick={() => setCurrentTab('recruitment')}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-ems-red via-red-600 to-ems-darkred font-bold text-white tracking-wide uppercase text-sm shadow-glow-red hover:shadow-glow-red-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <HeartPulse className="w-5 h-5 group-hover:animate-bounce" />
            <span>Join EMS Academy</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Staff Login CTA */}
          <button
            onClick={() => setCurrentTab('admin')}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-dark-850/90 border border-white/15 hover:border-ems-red/60 font-semibold text-slate-200 hover:text-white text-sm tracking-wide uppercase backdrop-blur-md transition-all duration-300 hover:bg-dark-800 hover:scale-105 active:scale-95"
          >
            <LogIn className="w-4 h-4 text-ems-red" />
            <span>Staff Portal Login</span>
          </button>

          {/* Discord CTA */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#5865F2]/20 border border-[#5865F2]/40 hover:bg-[#5865F2] font-semibold text-white text-sm tracking-wide uppercase backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-[#5865F2] group-hover:text-white" />
            <span>Official Discord</span>
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          
          <div className="glass-panel p-5 rounded-2xl border-l-4 border-ems-red">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono text-slate-400">On Duty Paramedics</span>
              <Activity className="w-5 h-5 text-ems-red" />
            </div>
            <div className="text-3xl font-extrabold text-white font-heading">{onlineCount} Units</div>
            <p className="text-[11px] text-emerald-400 font-medium mt-1">Active Patrol & Hospital Triage</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-l-4 border-ems-red">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono text-slate-400">Avg Response Time</span>
              <Clock className="w-5 h-5 text-ems-red" />
            </div>
            <div className="text-3xl font-extrabold text-white font-heading">&lt; 90 Sec</div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Citywide Priority Calls</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-l-4 border-ems-red">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono text-slate-400">Life-Saves This Month</span>
              <ShieldCheck className="w-5 h-5 text-ems-red" />
            </div>
            <div className="text-3xl font-extrabold text-white font-heading">1,420+</div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Code 3 Resuscitation Success</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-l-4 border-ems-red">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono text-slate-400">Air Rescue Certs</span>
              <Radio className="w-5 h-5 text-ems-red" />
            </div>
            <div className="text-3xl font-extrabold text-white font-heading">24/7</div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Air One Helipad Evac Operations</p>
          </div>

        </div>

      </div>
    </div>
  );
};
