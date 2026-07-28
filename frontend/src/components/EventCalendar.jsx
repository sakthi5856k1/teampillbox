import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Award } from 'lucide-react';

export const EventCalendar = () => {
  const events = [
    {
      id: 1,
      title: 'Weekly EMS Academy Cadet Training',
      date: '2026-07-30',
      time: '19:00 EST',
      location: 'Pillbox Hill Auditorium & Helipad',
      host: 'Captain Samantha Reed',
      type: 'Training',
      desc: 'Mandatory field practicals covering trauma triage, vehicle rescue extractions, and flight operations.'
    },
    {
      id: 2,
      title: 'Joint Agency Mass Casualty Simulation',
      date: '2026-08-01',
      time: '20:30 EST',
      location: 'Sandy Shores Airfield',
      host: 'Chief Alexander Vance',
      type: 'Drill',
      desc: 'Large-scale disaster roleplay exercise with LSPD SWAT and BCSO for rapid triage and casualty evacuation.'
    },
    {
      id: 3,
      title: 'Monthly Department Promotion & Awards Gala',
      date: '2026-08-05',
      time: '21:00 EST',
      location: 'Vinewood City Hall Lounge',
      host: 'Executive Management',
      type: 'Ceremony',
      desc: 'Celebrating responder achievements, rank promotions, and issuing annual service honors.'
    }
  ];

  return (
    <section className="py-16 bg-dark-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ems-red/10 border border-ems-red/30 text-ems-red text-xs font-semibold uppercase tracking-wider mb-3">
            <CalendarIcon className="w-3.5 h-3.5" />
            Duty & Training Schedule
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            EVENT CALENDAR & ACADEMY
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Upcoming academy drills, joint emergency exercises, and department galas.
          </p>
        </div>

        <div className="space-y-6">
          {events.map((evt) => (
            <div key={evt.id} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-ems-red/50 transition-all">
              
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-2xl bg-ems-red/20 text-ems-red border border-ems-red/40 text-center min-w-[80px]">
                  <span className="text-xs font-mono font-bold uppercase block">{evt.type}</span>
                  <span className="text-xl font-extrabold font-heading text-white">{evt.date.split('-')[2]}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">JUL/AUG</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-heading mb-1">{evt.title}</h3>
                  <p className="text-slate-300 text-xs mb-3 leading-relaxed">{evt.desc}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-ems-red" /> {evt.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-ems-red" /> {evt.location}</span>
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-ems-red" /> Host: {evt.host}</span>
                  </div>
                </div>
              </div>

              <button className="px-5 py-2.5 rounded-xl bg-ems-red text-white text-xs font-bold uppercase tracking-wider shadow-glow-red hover:bg-ems-red-hover flex-shrink-0">
                RSVP Attendance
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
