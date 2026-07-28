import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Printer, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const CertificateGenerator = () => {
  const { staffMembers, issueCertificate } = useApp();

  const [certData, setCertData] = useState({
    recipientName: 'Samantha Reed',
    badge: 'EMS-104',
    type: 'Promotion', // 'Training', 'Promotion', 'Appreciation'
    title: 'Field Paramedic Captain Merit Award',
    issuedBy: 'Dr. Alexander Vance (Chief of Medicine)',
    date: '2026-07-28',
    description: 'In recognition of outstanding dedication, exceptional trauma resuscitation leadership, and exemplary service to San Andreas Emergency Medical Services.'
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleStaffSelect = (e) => {
    const selectedBadge = e.target.value;
    const found = staffMembers.find(s => s.badge === selectedBadge);
    if (found) {
      setCardDataHelper(found.name, found.badge);
    }
  };

  const setCardDataHelper = (name, badge) => {
    setCertData(prev => ({
      ...prev,
      recipientName: name,
      badge: badge
    }));
  };

  const handleSaveAndPrint = () => {
    issueCertificate(certData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    window.print();
  };

  return (
    <section className="py-16 bg-dark-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ems-red/10 border border-ems-red/30 text-ems-red text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            Official Honors & Accreditation
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            EMS CERTIFICATE GENERATOR
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Generate and export printable Training, Promotion, and Appreciation awards for Pillbox EMS personnel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (Left 5 Cols) */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 no-print">
            <h3 className="text-lg font-bold text-white font-heading border-b border-white/10 pb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-ems-red" />
              Certificate Parameters
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                Autofill Recipient
              </label>
              <select 
                onChange={handleStaffSelect}
                className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
              >
                <option value="">-- Select Officer --</option>
                {staffMembers.map(s => (
                  <option key={s.id} value={s.badge}>{s.badge} - {s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                Award Type
              </label>
              <select 
                value={certData.type}
                onChange={(e) => setCertData({ ...certData, type: e.target.value })}
                className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
              >
                <option value="Promotion">Promotion Honor</option>
                <option value="Training">Training Completion</option>
                <option value="Appreciation">Merit Appreciation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                Recipient Full Name
              </label>
              <input 
                type="text"
                value={certData.recipientName}
                onChange={(e) => setCertData({ ...certData, recipientName: e.target.value })}
                className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                Badge ID
              </label>
              <input 
                type="text"
                value={certData.badge}
                onChange={(e) => setCertData({ ...certData, badge: e.target.value })}
                className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                Certificate Title
              </label>
              <input 
                type="text"
                value={certData.title}
                onChange={(e) => setCertData({ ...certData, title: e.target.value })}
                className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                Issuing Authority
              </label>
              <input 
                type="text"
                value={certData.issuedBy}
                onChange={(e) => setCertData({ ...certData, issuedBy: e.target.value })}
                className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                Description / Citation
              </label>
              <textarea 
                rows="3"
                value={certData.description}
                onChange={(e) => setCertData({ ...certData, description: e.target.value })}
                className="w-full bg-dark-850 text-white text-xs rounded-xl px-4 py-2 border border-white/10 focus:outline-none focus:border-ems-red"
              />
            </div>

            <button
              onClick={handleSaveAndPrint}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ems-red to-ems-darkred text-white text-xs font-bold uppercase tracking-wider shadow-glow-red hover:shadow-glow-red-lg flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Issue & Print Certificate PDF
            </button>

            {isSaved && (
              <p className="text-emerald-400 text-xs text-center font-semibold animate-in fade-in">
                ✓ Certificate Logged to Database!
              </p>
            )}

          </div>

          {/* Certificate View (Right 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            <div className="printable-area relative w-full max-w-[650px] aspect-[1.4/1] p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-dark-950 via-dark-900 to-dark-850 border-4 border-amber-500/60 shadow-2xl text-center text-white flex flex-col justify-between select-none">
              
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400"></div>
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400"></div>
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400"></div>
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400"></div>

              {/* Certificate Header */}
              <div>
                <div className="flex justify-center mb-2">
                  <img 
                    src="/assets/pillbox_ems_logo.jpg" 
                    alt="Pillbox Seal" 
                    className="w-16 h-16 rounded-full border-2 border-amber-400 shadow-glow-red object-cover"
                  />
                </div>
                <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                  SAN ANDREAS EMERGENCY MEDICAL SERVICES
                </h4>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-wider uppercase mt-1">
                  CERTIFICATE OF {certData.type.toUpperCase()}
                </h3>
              </div>

              {/* Certificate Body */}
              <div className="my-4">
                <p className="text-xs font-serif italic text-slate-300 mb-2">This official document certifies that</p>
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-400 tracking-wide underline decoration-amber-500/50">
                  {certData.recipientName}
                </h2>
                <p className="text-xs font-mono text-ems-red font-bold mt-1">BADGE #{certData.badge}</p>

                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed mt-4 italic">
                  "{certData.description}"
                </p>
              </div>

              {/* Certificate Footer Signatures */}
              <div className="pt-4 border-t border-white/15 flex items-end justify-between text-left">
                <div>
                  <span className="block text-[9px] font-mono text-slate-400 uppercase">Date of Issuance</span>
                  <span className="text-xs font-mono font-bold text-white">{certData.date}</span>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full border border-amber-400/60 bg-amber-500/10 flex items-center justify-center mx-auto mb-1">
                    <ShieldCheck className="w-6 h-6 text-amber-400" />
                  </div>
                  <span className="text-[8px] font-mono text-amber-400 uppercase">Official Seal</span>
                </div>

                <div className="text-right">
                  <span className="block font-serif text-sm italic text-amber-300 underline mb-0.5">{certData.issuedBy}</span>
                  <span className="block text-[9px] font-mono text-slate-400 uppercase">Authorized Signature</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
