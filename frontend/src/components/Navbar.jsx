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
  LayoutDashboard, 
  Menu, 
  X, 
  LogIn, 
  UserCheck,
  MessageSquare
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    setIsDiscordModalOpen, 
    discordUser, 
    onlineCount 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: HeartPulse },
    { id: 'about', label: 'About', icon: Building2 },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'portal', label: 'My Portal', icon: UserCheck },
    { id: 'recruitment', label: 'Applications', icon: FileText },
    { id: 'announcements', label: 'News', icon: Newspaper },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'idcard', label: 'ID Cards', icon: IdCard },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'rules', label: 'Rules & SOPs', icon: ShieldAlert },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'admin', label: 'Admin', icon: LayoutDashboard },
  ];

  const handleNavClick = (id) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-ems-red rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
              <img 
                src="/assets/pillbox_ems_logo.jpg" 
                alt="Pillbox EMS Logo" 
                className="relative w-11 h-11 rounded-full object-cover border-2 border-ems-red shadow-glow-red"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-ems-red transition-colors">
                  TEAM PILLBOX
                </span>
                <span className="bg-ems-red/20 text-ems-red text-[10px] font-bold px-2 py-0.5 rounded border border-ems-red/30">
                  EMS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-wide uppercase">San Andreas Emergency Response</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 10).map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-ems-red text-white shadow-glow-red font-bold' 
                      : link.id === 'portal'
                      ? 'bg-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2] hover:text-white border border-[#5865F2]/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Live Online Responder Counter */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-900/80 border border-emerald-500/30 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{onlineCount} Active</span>
            </div>

            {/* Discord Staff Login Button */}
            <button
              onClick={() => {
                if (currentTab !== 'portal') setCurrentTab('portal');
                else setIsDiscordModalOpen(true);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2] text-white border border-[#5865F2]/40 text-xs font-bold transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-[#5865F2] group-hover:text-white" />
              <span className="truncate">{discordUser ? `${discordUser.badge}` : 'Discord Staff Login'}</span>
            </button>

            {/* Admin Panel button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                currentTab === 'admin'
                  ? 'bg-ems-red/20 text-ems-red border border-ems-red'
                  : 'bg-dark-850 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Admin
            </button>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-dark-850 text-slate-300 hover:text-white border border-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg text-xs font-semibold text-left transition-all ${
                    isActive 
                      ? 'bg-ems-red text-white font-bold' 
                      : 'bg-dark-900/60 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 text-ems-red" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('portal')}
              className="w-full text-center bg-[#5865F2] text-white py-2.5 rounded-lg font-bold text-xs shadow-lg flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Access Staff Discord Portal ({discordUser.name})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
