import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartPulse, 
  Users, 
  Building2, 
  FileText, 
  Newspaper, 
  Image as ImageIcon, 
  CreditCard as IdCard, 
  Award, 
  ShieldAlert, 
  Calendar, 
  Menu, 
  X, 
  LogIn, 
  UserCheck,
  MessageSquare,
  Activity
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    setIsDiscordModalOpen, 
    isLoggedIn,
    discordUser, 
    onlineCount 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Public nav links — My Portal only shown when logged in
  const publicLinks = [
    { id: 'home',          label: 'Home',         icon: HeartPulse },
    { id: 'about',         label: 'About',        icon: Building2 },
    { id: 'staff',         label: 'Staff',        icon: Users },
    { id: 'departments',   label: 'Departments',  icon: Building2 },
    { id: 'recruitment',   label: 'Applications', icon: FileText },
    { id: 'announcements', label: 'News',          icon: Newspaper },
    { id: 'gallery',       label: 'Gallery',      icon: ImageIcon },
    { id: 'idcard',        label: 'ID Cards',     icon: IdCard },
    { id: 'certificates',  label: 'Certs',        icon: Award },
  ];

  const handleNavClick = (id) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStaffLogin = () => {
    setIsDiscordModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b border-white/10"
      style={{ background: 'rgba(6,7,9,0.92)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ── Logo ── */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-ems-red rounded-full blur opacity-40 group-hover:opacity-80 transition duration-300"></div>
              <img
                src="/assets/pillbox_ems_logo.jpg"
                alt="Pillbox EMS"
                className="relative w-9 h-9 rounded-full object-cover border-2 border-ems-red"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-extrabold text-base tracking-tight text-white group-hover:text-ems-red transition-colors">
                TEAM PILLBOX
              </span>
              <span className="ml-2 bg-ems-red/20 text-ems-red text-[9px] font-bold px-1.5 py-0.5 rounded border border-ems-red/30">
                EMS
              </span>
              <p className="text-[10px] text-slate-500 font-mono uppercase leading-none mt-0.5">San Andreas EMS</p>
            </div>
          </div>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {publicLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-ems-red text-white shadow-glow-red'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3 h-3 opacity-70" />
                  {link.label}
                </button>
              );
            })}

            {/* My Portal — only visible when logged in */}
            {isLoggedIn && (
              <button
                onClick={() => handleNavClick('portal')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-150 ${
                  currentTab === 'portal'
                    ? 'bg-[#5865F2] text-white'
                    : 'bg-[#5865F2]/15 text-[#7289da] hover:bg-[#5865F2]/30 border border-[#5865F2]/30'
                }`}
              >
                <UserCheck className="w-3 h-3" />
                My Portal
              </button>
            )}
          </nav>

          {/* ── Right Side Actions ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">

            {/* Live counter pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-900/80 border border-emerald-500/25 text-[11px] font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Activity className="w-3 h-3" />
              <span>{onlineCount} Active</span>
            </div>

            {/* Staff Login / My Portal button */}
            {isLoggedIn ? (
              // Already logged in → go straight to My Portal
              <button
                onClick={() => handleNavClick('portal')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-[11px] font-bold transition-all shadow-md"
              >
                <img
                  src={discordUser?.avatar}
                  alt="avatar"
                  className="w-5 h-5 rounded-full object-cover border border-white/30"
                />
                <span>{discordUser?.badge}</span>
                <span className="text-[#a5b4fc] font-normal">· My Portal</span>
              </button>
            ) : (
              // Not logged in → open Discord auth modal
              <button
                onClick={handleStaffLogin}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2] text-white border border-[#5865F2]/40 text-[11px] font-bold transition-all"
              >
                <LogIn className="w-3.5 h-3.5 text-[#7289da]" />
                <span>Staff Login</span>
              </button>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Small live pill on mobile */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-dark-900 border border-emerald-500/25 text-[10px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {onlineCount}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-dark-850 text-slate-300 hover:text-white border border-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 px-4 pt-3 pb-5"
          style={{ background: 'rgba(6,7,9,0.97)' }}
        >
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {publicLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 p-2.5 rounded-lg text-xs font-medium text-left transition-all ${
                    isActive
                      ? 'bg-ems-red text-white'
                      : 'bg-dark-900/60 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-ems-red shrink-0" />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => handleNavClick('portal')}
                className="w-full bg-[#5865F2] text-white py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                My Staff Portal ({discordUser?.name})
              </button>
            ) : (
              <button
                onClick={() => { setIsDiscordModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full bg-[#5865F2] text-white py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Staff Login via Discord
              </button>
            )}
            <button
              onClick={() => handleNavClick('recruitment')}
              className="w-full bg-ems-red text-white py-2.5 rounded-lg font-bold text-xs"
            >
              Join EMS Academy
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
