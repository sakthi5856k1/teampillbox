import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CreditCard as IdCard, 
  Printer, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  QrCode, 
  User, 
  BadgeCheck, 
  Building2,
  RefreshCw
} from 'lucide-react';

export const IdCardGenerator = () => {
  const { staffMembers } = useApp();

  const [cardData, setCardData] = useState({
    name: 'Dr. Alexander Vance',
    badge: 'EMS-101',
    rank: 'Chief of Medicine',
    department: 'Executive Management',
    avatar: '/assets/ems_doctor_portrait.jpg',
    expiry: '2027-12-31',
    bloodType: 'O Positive',
    clearance: 'Level 5 (Directorship)'
  });

  const handleStaffSelect = (e) => {
    const selectedBadge = e.target.value;
    const found = staffMembers.find(s => s.badge === selectedBadge);
    if (found) {
      setCardData({
        name: found.name,
        badge: found.badge,
        rank: found.rank,
        department: found.department,
        avatar: found.avatar,
        expiry: '2027-12-31',
        bloodType: 'A Positive',
        clearance: found.roleCategory === 'Executive Management' ? 'Level 5' : 'Level 3'
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-16 bg-dark-900/60 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ems-red/10 border border-ems-red/30 text-ems-red text-xs font-semibold uppercase tracking-wider mb-3">
            <IdCard className="w-3.5 h-3.5" />
            Official Security Credential
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            EMS ID CARD GENERATOR
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Create, preview, and print high-security Pillbox EMS identification cards for FiveM inventory badges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Editor Form (Left 5 Cols) */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5 no-print">
            <h3 className="text-lg font-bold text-white font-heading border-b border-white/10 pb-3 flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-ems-red" />
              Badge Customization Studio
            </h3>

            {/* Autofill preset from Staff */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                Autofill From Staff Roster
              </label>
              <select 
                onChange={handleStaffSelect}
                className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
              >
                <option value="">-- Choose Roster Preset --</option>
                {staffMembers.map(s => (
                  <option key={s.id} value={s.badge}>{s.badge} - {s.name} ({s.rank})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                Officer Name
              </label>
              <input 
                type="text"
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                  Badge #
                </label>
                <input 
                  type="text"
                  value={cardData.badge}
                  onChange={(e) => setCardData({ ...cardData, badge: e.target.value })}
                  className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                  Department
                </label>
                <input 
                  type="text"
                  value={cardData.department}
                  onChange={(e) => setCardData({ ...cardData, department: e.target.value })}
                  className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                Rank Title
              </label>
              <input 
                type="text"
                value={cardData.rank}
                onChange={(e) => setCardData({ ...cardData, rank: e.target.value })}
                className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                Photo URL
              </label>
              <input 
                type="text"
                value={cardData.avatar}
                onChange={(e) => setCardData({ ...cardData, avatar: e.target.value })}
                className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red text-xs font-mono"
              />
            </div>

            <div className="pt-3 flex gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 rounded-xl bg-ems-red text-white text-xs font-bold uppercase tracking-wider shadow-glow-red hover:bg-ems-red-hover flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print / Download Badge
              </button>
            </div>
          </div>

          {/* Interactive Card Preview (Right 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-4">
            
            <div className="printable-area relative w-full max-w-[420px] h-[260px] rounded-2xl p-5 overflow-hidden shadow-2xl border-2 border-ems-red/80 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-850 text-white select-none">
              
              {/* Holographic Security Overlay Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#E61C38_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-ems-red/40 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <img 
                    src="/assets/pillbox_ems_logo.jpg" 
                    alt="Logo" 
                    className="w-10 h-10 rounded-full border border-ems-red shadow-glow-red"
                  />
                  <div>
                    <h4 className="font-heading font-extrabold text-sm tracking-wider text-white">PILLBOX HILL MEDICAL</h4>
                    <p className="text-[9px] font-mono text-ems-red uppercase tracking-widest">San Andreas EMS Security Badge</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[8px] font-mono text-slate-400 uppercase">Clearance</span>
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">SEC-LEVEL 4</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex gap-4 items-center">
                
                {/* Photo Badge Container */}
                <div className="relative w-28 h-32 rounded-xl overflow-hidden border-2 border-ems-red/60 bg-dark-950 flex-shrink-0 shadow-md">
                  <img 
                    src={cardData.avatar || '/assets/ems_doctor_portrait.jpg'} 
                    alt="Badge Photo" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-ems-red text-center text-[8px] font-bold font-mono py-0.5 text-white">
                    VERIFIED
                  </div>
                </div>

                {/* Info Text */}
                <div className="flex-1 space-y-1.5 text-left">
                  <div>
                    <span className="text-[8px] font-mono text-slate-400 uppercase block">Officer Name</span>
                    <p className="text-base font-extrabold text-white font-heading leading-tight truncate">{cardData.name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-1">
                    <div>
                      <span className="text-[8px] font-mono text-slate-400 uppercase block">Rank Title</span>
                      <p className="text-[11px] font-semibold text-ems-red truncate">{cardData.rank}</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-slate-400 uppercase block">Badge ID</span>
                      <p className="text-[11px] font-mono font-bold text-white tracking-wide">{cardData.badge}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[8px] font-mono text-slate-400 uppercase block">Department</span>
                    <p className="text-[10px] text-slate-300 font-medium truncate">{cardData.department}</p>
                  </div>

                  {/* QR Code & Signature Bottom */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <div>
                      <span className="text-[7px] font-mono text-slate-400 uppercase block">Expires</span>
                      <span className="text-[9px] font-mono font-bold text-slate-200">{cardData.expiry}</span>
                    </div>

                    <div className="w-9 h-9 bg-white p-1 rounded border border-slate-300 flex items-center justify-center">
                      {/* Stylized QR Code placeholder */}
                      <QrCode className="w-full h-full text-dark-950" />
                    </div>
                  </div>

                </div>

              </div>

            </div>

            <p className="text-slate-400 text-xs mt-6 text-center font-mono no-print">
              Press "Print / Download Badge" to print or save badge image as PDF for inventory roleplay.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
