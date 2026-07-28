import React from 'react';
import { ShieldAlert, BookOpen, Radio, AlertTriangle, FileText, CheckCircle } from 'lucide-react';

export const EmsRules = () => {
  const rulesList = [
    {
      title: 'Standard Operating Procedures (SOPs)',
      icon: BookOpen,
      rules: [
        'Always prioritize self-preservation and active scene safety before approaching casualties.',
        'Code 3 response (lights and sirens) requires active 911 dispatch notification.',
        'Never transport patients without minimum 2 unit crew or supervisor authorization on high-threat calls.',
        'Treat all patients with equal professional care regardless of affiliation or criminal status.'
      ]
    },
    {
      title: 'Radio Communications & 10-Codes',
      icon: Radio,
      rules: [
        'Maintain concise radio discipline. Use standard 10-Codes on active frequencies (10-4, 10-20, 10-97).',
        'Signal 100 (Emergency Radio Silence) must be respected immediately when called by LSPD/EMS Command.',
        'Report patient status clearly: Code 1 (Stable), Code 2 (Serious), Code 3 (Critical / Trauma Bed Needed).'
      ]
    },
    {
      title: 'Medical Triage Protocol',
      icon: AlertTriangle,
      rules: [
        'Green Tag: Minor injuries; treat in outpatient ER clinic.',
        'Yellow Tag: Serious wounds; stabilize and prepare for observation ward.',
        'Red Tag: Critical trauma / internal bleeding; immediate priority OR surgery required.',
        'Black Tag: Deceased; pronounce on scene after 5 minutes non-responsive CPR.'
      ]
    }
  ];

  return (
    <section className="py-16 bg-dark-900/60 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ems-red/10 border border-ems-red/30 text-ems-red text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            Operational Directives
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            EMS RULES & OPERATING PROCEDURES
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Essential guidelines and radio protocols required for all active Pillbox EMS personnel.
          </p>
        </div>

        <div className="space-y-6">
          {rulesList.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div key={idx} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-ems-red/20 text-ems-red border border-ems-red/40">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">{sec.title}</h3>
                </div>

                <div className="space-y-3">
                  {sec.rules.map((rule, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-ems-red mt-1 flex-shrink-0" />
                      <p className="leading-relaxed">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
