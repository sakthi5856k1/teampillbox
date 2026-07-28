import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X, Check, ShieldCheck, User, LogIn, ArrowRight } from 'lucide-react';

export const DiscordAuthModal = () => {
  const { isDiscordModalOpen, setIsDiscordModalOpen, mockDiscordUsers, loginAsDiscordUser } = useApp();
  const [customTag, setCustomTag] = useState('');
  const [customBadge, setCustomBadge] = useState('EMS-505');

  if (!isDiscordModalOpen) return null;

  const handleCustomLogin = (e) => {
    e.preventDefault();
    if (!customTag.trim()) return;

    loginAsDiscordUser({
      id: `disc-custom-${Date.now()}`,
      discordTag: customTag.includes('#') ? customTag : `${customTag}#1234`,
      discordAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80',
      name: customTag.split('#')[0],
      badge: customBadge,
      rank: 'EMT Paramedic',
      department: 'EMT',
      roleCategory: 'EMT',
      role: 'EMT',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80',
      rankProgress: 45,
      totalDutyHours: 18.5,
      weeklyTargetHours: 20,
      joinDate: new Date().toISOString().split('T')[0],
      email: 'officer@pillbox-ems.org'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl overflow-hidden border-2 border-[#5865F2] shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#5865F2] p-6 text-white text-center relative">
          <button
            onClick={() => setIsDiscordModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-3 border border-white/20">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-extrabold font-heading tracking-tight">DISCORD OAUTH STAFF LOGIN</h3>
          <p className="text-xs text-slate-200 mt-1">Authenticate your Team Pillbox EMS staff credentials</p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 bg-dark-950 space-y-6">
          
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3 tracking-wider">
              Select Officer Profile to Test Login:
            </h4>

            <div className="space-y-3">
              {mockDiscordUsers.map(profile => (
                <div
                  key={profile.id}
                  onClick={() => loginAsDiscordUser(profile)}
                  className="p-3.5 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-white/10 hover:border-[#5865F2] cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={profile.avatar} 
                      alt={profile.name} 
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#5865F2]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm group-hover:text-[#5865F2] transition-colors">{profile.name}</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#5865F2]/20 text-[#5865F2]">
                          {profile.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono">{profile.discordTag} • <span className="text-emerald-400 font-semibold">{profile.rank}</span></p>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-[#5865F2]/10 text-[#5865F2] group-hover:bg-[#5865F2] group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Manual Input Form */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3 tracking-wider">
              Or Enter Custom Discord Username:
            </h4>

            <form onSubmit={handleCustomLogin} className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <input 
                  type="text"
                  placeholder="Discord Username (e.g. Officer_Dan)"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  className="col-span-2 bg-dark-850 text-white text-xs rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-[#5865F2]"
                />
                <input 
                  type="text"
                  placeholder="Badge #"
                  value={customBadge}
                  onChange={(e) => setCustomBadge(e.target.value)}
                  className="bg-dark-850 text-white text-xs font-mono rounded-xl px-3 py-2.5 border border-white/10 focus:outline-none focus:border-[#5865F2]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                Authorize Discord Session
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
