import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Crown, 
  UserCheck, 
  Stethoscope, 
  Heart, 
  Ambulance, 
  GraduationCap, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const Departments = () => {
  const { setCurrentTab } = useApp();

  const departments = [
    {
      id: 'exec',
      title: 'Executive Management',
      icon: Crown,
      badge: 'Chiefs & Directorship',
      color: 'from-amber-500/20 to-red-950/40',
      border: 'border-amber-500/40',
      desc: 'Oversees overall hospital policy, inter-agency relations, financial budgeting, and high-level disciplinary standards.',
      duties: ['Policy & SOP Enforcement', 'Inter-Agency Command (LSPD/BCSO)', 'High-Level Promotions & Appeals']
    },
    {
      id: 'hod',
      title: 'Head of Department (HOD)',
      icon: UserCheck,
      badge: 'Division Supervisors',
      color: 'from-red-600/20 to-red-950/40',
      border: 'border-red-500/40',
      desc: 'Leads individual divisions (Paramedics, Air One, Medical Education, Field Operations) and manages weekly patrol rosters.',
      duties: ['Field Unit Supervision', 'Division Recruitment & Scheduling', 'Tactical Incident Triage Command']
    },
    {
      id: 'doctor',
      title: 'Doctor Division',
      icon: Stethoscope,
      badge: 'Attending Physicians',
      color: 'from-blue-600/20 to-dark-900',
      border: 'border-blue-500/40',
      desc: 'Specialized surgeons, cardiologists, and emergency physicians leading surgery and intensive care treatment at Pillbox Hospital.',
      duties: ['Emergency Surgery & Resuscitation', 'Complex Trauma Diagnostics', 'Intern Clinical Mentorship']
    },
    {
      id: 'nurse',
      title: 'Nursing Unit',
      icon: Heart,
      badge: 'Patient Care & Triage',
      color: 'from-rose-600/20 to-dark-900',
      border: 'border-rose-500/40',
      desc: 'Manages inpatient wards, pre-op patient prep, blood bank administration, and pharmacy dispensary at Pillbox Medical Center.',
      duties: ['Patient Triage & Admission', 'Pharmaceutical Dispensary', 'Post-Op ICU Recovery Nursing']
    },
    {
      id: 'emt',
      title: 'EMT & Paramedics',
      icon: Ambulance,
      badge: 'First Responders',
      color: 'from-emerald-600/20 to-dark-900',
      border: 'border-emerald-500/40',
      desc: 'Frontline rapid responders operating emergency ambulances across Los Santos and Blaine County for 911 dispatch calls.',
      duties: ['Code 3 Emergency Dispatch', 'Basic & Advanced Life Support', 'Field Stabilization & Transport']
    },
    {
      id: 'intern',
      title: 'Medical Intern Cadets',
      icon: GraduationCap,
      badge: 'Trainees & Probationary',
      color: 'from-purple-600/20 to-dark-900',
      border: 'border-purple-500/40',
      desc: 'Newly accepted academy candidates undergoing practical field ride-alongs and hospital ER rotations under senior supervision.',
      duties: ['Field Ride-Alongs with Paramedics', 'CPR & First Aid Practicums', 'Hospital Admission Logging']
    }
  ];

  return (
    <section className="py-16 bg-dark-900/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ems-red/10 border border-ems-red/30 text-ems-red text-xs font-semibold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            Organizational Structure
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            EMS DIVISIONS & DEPARTMENTS
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Team Pillbox EMS operates with a structured, multi-tier hierarchy designed for maximum operational efficiency and realistic medical roleplay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div 
                key={dept.id}
                className={`glass-panel p-8 rounded-2xl border ${dept.border} bg-gradient-to-br ${dept.color} flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-dark-950/80 text-ems-red border border-white/10 shadow-md group-hover:bg-ems-red group-hover:text-white transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-dark-950/80 text-slate-300 border border-white/10">
                      {dept.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white font-heading mb-3 group-hover:text-ems-red transition-colors">
                    {dept.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed mb-6">
                    {dept.desc}
                  </p>

                  <div className="space-y-2 mb-6">
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">Primary Operational Responsibilities:</h4>
                    {dept.duties.map((duty, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-ems-red"></span>
                        <span>{duty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentTab('recruitment')}
                  className="w-full mt-4 py-2.5 rounded-xl bg-dark-950/80 hover:bg-ems-red text-slate-300 hover:text-white text-xs font-semibold uppercase tracking-wider border border-white/10 hover:border-ems-red transition-all flex items-center justify-center gap-2"
                >
                  <span>Apply For {dept.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
