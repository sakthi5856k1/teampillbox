import React from 'react';
import { 
  Target, 
  Eye, 
  ShieldAlert, 
  HeartPulse, 
  ShieldAlert as CrossIcon, 
  Award, 
  Users, 
  Stethoscope,
  CheckCircle2
} from 'lucide-react';

export const AboutSection = () => {
  const coreValues = [
    {
      title: 'Rapid Response Integrity',
      desc: 'Enforcing zero-delay dispatch and seamless triage handling regardless of situation chaos.',
      icon: HeartPulse
    },
    {
      title: 'Medical Roleplay Excellence',
      desc: 'Deep immersive medical scenarios utilizing detailed surgical protocols and realistic anatomy diagnostics.',
      icon: Stethoscope
    },
    {
      title: 'Inter-Agency Synergies',
      desc: 'Collaborating tightly with Law Enforcement (LSPD/BCSO/SAHP) and Fire Departments during high-code incidents.',
      icon: ShieldAlert
    },
    {
      title: 'Continuous Academy Development',
      desc: 'Rigorous intern training, certification programs, and continuous medical education for all ranks.',
      icon: Award
    }
  ];

  return (
    <section className="py-16 bg-dark-900/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ems-red/10 border border-ems-red/30 text-ems-red text-xs font-semibold uppercase tracking-wider mb-3">
            <CrossIcon className="w-3.5 h-3.5" />
            About Team Pillbox EMS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            GUARDIANS OF SAN ANDREAS HEALTHCARE
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Team Pillbox EMS is a premier emergency medical service organization within FiveM roleplay. Based at Pillbox Hill Medical Center in Downtown Los Santos, our team provides 24/7 advanced medical care, trauma surgery, and field rescue operations.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          <div className="glass-panel p-8 rounded-2xl border-t-4 border-ems-red relative group hover:border-ems-red transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3.5 rounded-xl bg-ems-red/20 text-ems-red border border-ems-red/30">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-heading">OUR MISSION</h3>
                <span className="text-xs text-ems-red font-mono uppercase tracking-wider">Uncompromising Service</span>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              To safeguard life and limb across San Andreas by delivering rapid, realistic, and high-fidelity emergency medical care. We empower roleplayers to experience the intensity, precision, and camaraderie of real-world emergency medicine.
            </p>
            <ul className="space-y-2.5">
              {['24/7 Citywide Trauma Patrols', 'Dedicated Surgical & Intensive Care Unit', 'Tactical Field Evacuation (Air One)'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-ems-red flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-8 rounded-2xl border-t-4 border-ems-red relative group hover:border-ems-red transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3.5 rounded-xl bg-ems-red/20 text-ems-red border border-ems-red/30">
                <Eye className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-heading">OUR VISION</h3>
                <span className="text-xs text-ems-red font-mono uppercase tracking-wider">Standard of Innovation</span>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              To be recognized as the gold standard of FiveM EMS organizations worldwide through innovative medical SOPs, supportive community culture, and realistic clinical RP standards.
            </p>
            <ul className="space-y-2.5">
              {['Certified Medical Training Curriculum', 'Advanced ID & Certification Tracking', 'Transparent Rank & Merit Progression'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-ems-red flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Core Values Section */}
        <div>
          <h3 className="text-2xl font-bold text-white font-heading text-center mb-8">CORE VALUES</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="glass-panel-interactive p-6 rounded-xl text-center">
                  <div className="inline-flex p-3.5 rounded-xl bg-ems-red/10 text-ems-red mb-4 border border-ems-red/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 font-heading">{val.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
