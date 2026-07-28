import React from 'react';
import { useApp } from '../context/AppContext';
import { HeartPulse, MessageSquare, ShieldCheck, ExternalLink, ChevronRight } from 'lucide-react';

export const Footer = () => {
  const { setCurrentTab } = useApp();

  return (
    <footer className="bg-dark-950 border-t border-white/10 text-slate-400 text-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/pillbox_ems_logo.jpg" 
                alt="Logo" 
                className="w-10 h-10 rounded-full border border-ems-red shadow-glow-red object-cover"
              />
              <div>
                <span className="font-heading font-extrabold text-lg text-white block leading-tight">TEAM PILLBOX EMS</span>
                <span className="text-[10px] font-mono text-ems-red uppercase">Emergency Medical Services</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Official medical roleplay organization for Pillbox Hill Medical Center in San Andreas. Delivering rapid emergency trauma care, air medical rescue, and healthcare excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white uppercase text-xs tracking-wider mb-4 font-mono">Quick Navigation</h4>
            <ul className="space-y-2">
              {[
                { id: 'home', label: 'Home Portal' },
                { id: 'about', label: 'About & Mission' },
                { id: 'staff', label: 'Staff Roster' },
                { id: 'departments', label: 'Departments & Hierarchy' },
                { id: 'recruitment', label: 'Apply to Join' },
              ].map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => { setCurrentTab(link.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-ems-red transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-ems-red" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & SOPs */}
          <div>
            <h4 className="font-heading font-bold text-white uppercase text-xs tracking-wider mb-4 font-mono">Tools & Directives</h4>
            <ul className="space-y-2">
              {[
                { id: 'idcard', label: 'EMS ID Card Generator' },
                { id: 'certificates', label: 'Certificate Builder' },
                { id: 'rules', label: 'Rules & Radio SOPs' },
                { id: 'calendar', label: 'Training & Duty Calendar' },
                { id: 'admin', label: 'Admin Command Login' },
              ].map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => { setCurrentTab(link.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-ems-red transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-ems-red" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Discord & Contact */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white uppercase text-xs tracking-wider mb-2 font-mono">Community Hub</h4>
            <p className="text-slate-400 text-xs">
              Connect with our dispatch and HR command team on Discord for interview scheduling and live callouts.
            </p>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5865F2] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#4752C4] transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Join Official Discord
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Team Pillbox EMS. All Rights Reserved. Designed for FiveM Roleplay Community.</p>
          <p>Not affiliated with Rockstar Games or Take-Two Interactive.</p>
        </div>

      </div>
    </footer>
  );
};
