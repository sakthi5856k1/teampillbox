import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  BadgeCheck, 
  Mail, 
  Calendar, 
  Award, 
  X, 
  UserCheck, 
  ExternalLink,
  Activity
} from 'lucide-react';

export const StaffRoster = () => {
  const { staffMembers } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRank, setSelectedRank] = useState('All');
  const [selectedStaff, setSelectedStaff] = useState(null);

  const ranks = ['All', 'Executive Management', 'HOD', 'Doctor', 'Nurse', 'EMT', 'Intern'];

  const filteredStaff = staffMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.rank.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRank = selectedRank === 'All' || member.roleCategory === selectedRank || member.department === selectedRank;
    return matchesSearch && matchesRank;
  });

  return (
    <section className="py-16 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ems-red/10 border border-ems-red/30 text-ems-red text-xs font-semibold uppercase tracking-wider mb-3">
              <BadgeCheck className="w-3.5 h-3.5" />
              Active Duty Roster
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
              MEET OUR MEDICAL STAFF
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Verified healthcare personnel serving Pillbox Hill Medical Center & County Districts.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name, rank, or badge #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-850 text-white placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-3 border border-white/10 focus:outline-none focus:border-ems-red transition-all"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 overflow-x-auto">
          {ranks.map((rank) => (
            <button
              key={rank}
              onClick={() => setSelectedRank(rank)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedRank === rank
                  ? 'bg-ems-red text-white shadow-glow-red font-bold scale-105'
                  : 'bg-dark-850 text-slate-300 hover:text-white border border-white/10 hover:border-ems-red/40'
              }`}
            >
              {rank}
            </button>
          ))}
        </div>

        {/* Staff Grid */}
        {filteredStaff.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-2xl">
            <UserCheck className="w-12 h-12 text-slate-500 mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-white font-heading">No Staff Members Found</h3>
            <p className="text-slate-400 text-xs mt-1">Try adjusting your search criteria or rank filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((staff) => (
              <div
                key={staff.id}
                onClick={() => setSelectedStaff(staff)}
                className="glass-panel-interactive rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Avatar Banner Header */}
                  <div className="relative h-48 overflow-hidden bg-dark-900">
                    <img 
                      src={staff.avatar} 
                      alt={staff.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent"></div>
                    
                    {/* Badge Pill Top Right */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-dark-950/90 border border-ems-red/40 font-mono text-xs font-bold text-ems-red shadow-md">
                      #{staff.badge}
                    </div>

                    {/* Status Pill Top Left */}
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 backdrop-blur-md border ${
                      staff.status === 'On Duty' 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                        : staff.status === 'In Training'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        staff.status === 'On Duty' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
                      }`}></span>
                      {staff.status}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <span className="text-[11px] text-ems-red font-mono uppercase font-bold tracking-wider">
                      {staff.department}
                    </span>
                    <h3 className="text-xl font-bold text-white font-heading mt-1 group-hover:text-ems-red transition-colors">
                      {staff.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-semibold mb-3">
                      {staff.rank}
                    </p>

                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
                      {staff.bio}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-ems-red" />
                    <span>{staff.certifications ? staff.certifications.length : 0} Certifications</span>
                  </div>
                  <span className="text-ems-red font-semibold text-[11px] uppercase tracking-wider group-hover:underline flex items-center gap-1">
                    View Profile <ExternalLink className="w-3 h-3" />
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Staff Detail Modal */}
        {selectedStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl glass-panel rounded-2xl overflow-hidden border border-ems-red/40 shadow-glow-red-lg">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedStaff(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-dark-950/80 text-slate-300 hover:text-white border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row">
                
                {/* Avatar Left */}
                <div className="w-full sm:w-1/2 relative bg-dark-900 min-h-[250px]">
                  <img 
                    src={selectedStaff.avatar} 
                    alt={selectedStaff.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent sm:hidden"></div>
                </div>

                {/* Detail Right */}
                <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 rounded-full bg-ems-red/20 text-ems-red font-mono text-xs font-bold border border-ems-red/40">
                        {selectedStaff.badge}
                      </span>
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        {selectedStaff.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white font-heading mt-2">
                      {selectedStaff.name}
                    </h3>
                    <p className="text-xs font-semibold text-ems-red uppercase tracking-wider mb-4">
                      {selectedStaff.rank} • {selectedStaff.department}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Mail className="w-4 h-4 text-ems-red" />
                        <span>{selectedStaff.email || 'dispatch@pillbox-ems.org'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Calendar className="w-4 h-4 text-ems-red" />
                        <span>Joined Service: {selectedStaff.joinDate || '2023-01-01'}</span>
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-mono">Biography</h4>
                    <p className="text-slate-300 text-xs leading-relaxed mb-6">
                      {selectedStaff.bio}
                    </p>

                    {selectedStaff.certifications && (
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-mono">Specialized Qualifications</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedStaff.certifications.map((cert, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded bg-dark-850 text-[11px] text-slate-200 border border-white/10">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => setSelectedStaff(null)}
                      className="px-5 py-2 rounded-xl bg-ems-red text-white text-xs font-semibold uppercase tracking-wider hover:bg-ems-red-hover transition-all"
                    >
                      Close Profile
                    </button>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
