import React from 'react';
import { useApp } from '../context/AppContext';
import { X, MessageSquare, ShieldCheck, ExternalLink } from 'lucide-react';

export const DiscordAuthModal = () => {
  const { isDiscordModalOpen, setIsDiscordModalOpen, loginAsDiscordUser, mockDiscordUsers } = useApp();

  if (!isDiscordModalOpen) return null;

  // In production this would be: window.location.href = `https://discord.com/api/oauth2/authorize?...`
  // For demo purposes we simulate auth with the first mock user
  const handleDiscordLogin = () => {
    loginAsDiscordUser(mockDiscordUsers[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
      <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-[#5865F2]/60"
        style={{ background: 'rgba(10,11,15,0.97)' }}
      >
        {/* Close */}
        <button
          onClick={() => setIsDiscordModalOpen(false)}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Discord Brand Header */}
        <div className="relative px-8 pt-10 pb-8 flex flex-col items-center text-center"
          style={{ background: 'linear-gradient(160deg, #5865F2 0%, #3b3fa8 100%)' }}
        >
          {/* Glow ring around icon */}
          <div className="relative mb-5">
            <div className="absolute -inset-3 bg-white/20 rounded-2xl blur-lg"></div>
            <div className="relative w-16 h-16 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-white font-heading tracking-tight mb-1">
            Staff Portal
          </h2>
          <p className="text-sm text-indigo-200 leading-snug max-w-xs">
            Sign in with your Discord account to access your EMS Staff Portal
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-8 flex flex-col gap-5">

          {/* Feature bullets */}
          <div className="space-y-2.5">
            {[
              'Duty hours & shift tracking',
              'Staff ID card & certificates',
              'Patient logs & reports',
              'Leave requests & dashboard',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#5865F2] shrink-0" />
                {feature}
              </div>
            ))}
          </div>

          {/* Login Button */}
          <button
            onClick={handleDiscordLogin}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-extrabold text-white text-base uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
            style={{ background: 'linear-gradient(135deg, #5865F2, #4752C4)' }}
          >
            <MessageSquare className="w-5 h-5" />
            Login with Discord
            <ExternalLink className="w-4 h-4 opacity-70" />
          </button>

          <p className="text-center text-[11px] text-slate-500 leading-relaxed">
            By logging in, you confirm you are an active member of{' '}
            <span className="text-slate-400 font-semibold">Team Pillbox EMS</span>.
            Your Discord ID will be used for authentication.
          </p>
        </div>
      </div>
    </div>
  );
};
