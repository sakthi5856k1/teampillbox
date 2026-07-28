import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DiscordBotSimulator } from './DiscordBotSimulator';
import { 
  User, 
  Clock, 
  IdCard, 
  Award, 
  FilePlus, 
  Package, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Play, 
  Square, 
  ShieldCheck, 
  QrCode, 
  Activity, 
  ChevronRight, 
  Sparkles,
  Stethoscope,
  Send,
  LogOut,
  Bot
} from 'lucide-react';

export const StaffPortal = () => {
  const { 
    discordUser, 
    setIsDiscordModalOpen, 
    isOnDuty, 
    clockIn, 
    clockOut, 
    activeShiftSeconds, 
    shiftHistory, 
    certificates, 
    patientLogs, 
    addPatientLog, 
    equipmentRequests, 
    submitEquipmentRequest, 
    leaveRequests, 
    submitLeaveRequest 
  } = useApp();

  const [activeTab, setActiveTab] = useState('botPanel'); // Default to Discord Bot Panel for instant user gratification! // 'dashboard', 'duty', 'idcard', 'certs', 'patientLogs', 'equipment', 'leave'

  // Patient Log Form State
  const [patientForm, setPatientForm] = useState({
    patientName: '',
    triageLevel: 'Red (Critical Trauma)',
    diagnosis: '',
    outcome: 'Stabilized - Transferred to Wards',
    location: 'Downtown Los Santos'
  });
  const [patientLogSuccess, setPatientLogSuccess] = useState(false);

  // Equipment Form State
  const [equipItem, setEquipItem] = useState('2x Trauma Medkits & Epipen');
  const [equipReason, setEquipReason] = useState('Shift restocking following Code 3 response');
  const [equipSuccess, setEquipSuccess] = useState(false);

  // Leave Form State
  const [leaveStart, setLeaveStart] = useState('');
  const [leaveEnd, setLeaveEnd] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSuccess, setLeaveSuccess] = useState(false);

  // Format seconds into HH:MM:SS
  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    if (!patientForm.patientName || !patientForm.diagnosis) return;
    addPatientLog(patientForm);
    setPatientLogSuccess(true);
    setTimeout(() => setPatientLogSuccess(false), 3000);
    setPatientForm({
      patientName: '',
      triageLevel: 'Red (Critical Trauma)',
      diagnosis: '',
      outcome: 'Stabilized - Transferred to Wards',
      location: 'Downtown Los Santos'
    });
  };

  const handleEquipSubmit = (e) => {
    e.preventDefault();
    if (!equipItem) return;
    submitEquipmentRequest(equipItem, equipReason);
    setEquipSuccess(true);
    setTimeout(() => setEquipSuccess(false), 3000);
    setEquipItem('2x Trauma Medkits & Epipen');
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!leaveStart || !leaveEnd || !leaveReason) return;
    submitLeaveRequest(leaveStart, leaveEnd, leaveReason);
    setLeaveSuccess(true);
    setTimeout(() => setLeaveSuccess(false), 3000);
    setLeaveStart('');
    setLeaveEnd('');
    setLeaveReason('');
  };

  // Filter officer's personal certificates and shifts
  const myCertificates = certificates.filter(c => c.badge === discordUser.badge || c.recipientName.includes(discordUser.name.split(' ')[1]));
  const myShifts = shiftHistory.filter(s => s.badge === discordUser.badge);
  const myPatientLogs = patientLogs.filter(p => p.officerBadge === discordUser.badge);
  const myEquipmentReqs = equipmentRequests.filter(e => e.officerBadge === discordUser.badge);
  const myLeaveReqs = leaveRequests.filter(l => l.officerBadge === discordUser.badge);

  return (
    <section className="py-12 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Officer Profile Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-ems-red/40 shadow-glow-red mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-ems-red/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            
            {/* Officer Profile Info */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <img 
                  src={discordUser.avatar} 
                  alt={discordUser.name} 
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-ems-red shadow-lg"
                />
                <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-dark-950 flex items-center justify-center text-[9px] ${
                  isOnDuty ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-500 text-slate-200'
                }`}>
                  {isOnDuty ? '●' : '○'}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-ems-red/20 text-ems-red border border-ems-red/40">
                    #{discordUser.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#5865F2]" />
                    {discordUser.discordTag}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  {discordUser.name}
                </h2>

                <p className="text-xs text-ems-red font-semibold tracking-wider uppercase">
                  {discordUser.rank} • {discordUser.department}
                </p>
              </div>
            </div>

            {/* Time Clock Action Widget */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-5 bg-dark-900/90">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Duty Shift Clock</span>
                <span className="text-xl font-extrabold font-mono text-white">
                  {isOnDuty ? formatTime(activeShiftSeconds) : '00:00:00'}
                </span>
                <span className={`block text-[10px] font-semibold ${isOnDuty ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {isOnDuty ? 'ACTIVE PATROL SHIFT' : 'OFF DUTY'}
                </span>
              </div>

              {isOnDuty ? (
                <button
                  onClick={() => clockOut('Citywide Code 3 Patrol')}
                  className="px-5 py-3 rounded-xl bg-ems-red hover:bg-ems-red-hover text-white text-xs font-extrabold uppercase tracking-wider shadow-glow-red flex items-center gap-2"
                >
                  <Square className="w-4 h-4" />
                  Clock Out
                </button>
              ) : (
                <button
                  onClick={clockIn}
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Clock In Shift
                </button>
              )}

              <button
                onClick={() => setIsDiscordModalOpen(true)}
                className="p-3 rounded-xl bg-dark-850 text-slate-300 hover:text-white border border-white/10 hover:border-[#5865F2]"
                title="Switch Discord Account"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Rank Promotion Progress Bar */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs mb-1 font-mono">
              <span className="text-slate-300">Rank Advancement Progress: <strong className="text-white">{discordUser.rank}</strong></span>
              <span className="text-ems-red font-bold">{discordUser.rankProgress}% to Next Merit Tier</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-dark-900 overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-ems-red via-red-500 to-amber-400 rounded-full transition-all duration-500 shadow-glow-red"
                style={{ width: `${discordUser.rankProgress}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* Tab Navigation Bar */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          {[
            { id: 'botPanel', label: 'Discord Bot Duty Panel', icon: Bot },
            { id: 'dashboard', label: 'Officer Dashboard', icon: User },
            { id: 'duty', label: `Duty Hours (${discordUser.totalDutyHours} hrs)`, icon: Clock },
            { id: 'idcard', label: 'My Official ID Card', icon: IdCard },
            { id: 'certs', label: `My Certificates (${myCertificates.length})`, icon: Award },
            { id: 'patientLogs', label: `Patient Case Logs (${myPatientLogs.length})`, icon: Stethoscope },
            { id: 'equipment', label: `Armory & Med Restock`, icon: Package },
            { id: 'leave', label: 'Medical Leave Requests', icon: Calendar },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-ems-red text-white shadow-glow-red'
                    : tab.id === 'botPanel'
                    ? 'bg-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2] hover:text-white border border-[#5865F2]/40'
                    : 'bg-dark-850 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 0: Discord Bot Duty Panel */}
        {activeTab === 'botPanel' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-[#5865F2]/40 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5865F2]/20 text-[#5865F2] font-mono text-xs font-bold mb-3 border border-[#5865F2]/40">
                <Bot className="w-4 h-4" /> Live Discord Bot & Web Sync
              </div>
              <h3 className="text-xl font-bold text-white font-heading">PILLBOX MANAGEMENT DISCORD BOT PANEL</h3>
              <p className="text-slate-300 text-xs mt-1">
                Clocking in or out via this Discord Bot panel automatically calculates and syncs your shift hours with your website Staff Portal in real-time!
              </p>
            </div>

            <DiscordBotSimulator />
          </div>
        )}

        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl border-l-4 border-ems-red">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Shift Hours</span>
                <span className="text-3xl font-extrabold text-white font-heading">{discordUser.totalDutyHours} hrs</span>
                <p className="text-[11px] text-emerald-400 mt-1 font-mono">Completed Shifts</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border-l-4 border-ems-red">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Weekly Quota</span>
                <span className="text-3xl font-extrabold text-white font-heading">{discordUser.weeklyTargetHours} hrs</span>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">Minimum Required</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border-l-4 border-ems-red">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">My Certificates</span>
                <span className="text-3xl font-extrabold text-white font-heading">{myCertificates.length} Awards</span>
                <p className="text-[11px] text-amber-400 mt-1 font-mono">Accreditations</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border-l-4 border-ems-red">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Resuscitation Cases</span>
                <span className="text-3xl font-extrabold text-white font-heading">{myPatientLogs.length} Cases</span>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">Logged Patient Care</p>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Recent Shifts */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white font-heading">Recent Duty Shift History</h3>
                  <button onClick={() => setActiveTab('duty')} className="text-xs text-ems-red font-bold uppercase">View All</button>
                </div>

                <div className="space-y-3">
                  {myShifts.slice(0, 3).map(shift => (
                    <div key={shift.id} className="p-3.5 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white block">{shift.sector}</span>
                        <span className="text-slate-400 font-mono">{shift.date} • {shift.startTime} - {shift.endTime}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                        {Math.round((shift.durationMinutes / 60) * 10) / 10} hrs
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Cases Preview */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white font-heading">My Patient Resuscitation Logs</h3>
                  <button onClick={() => setActiveTab('patientLogs')} className="text-xs text-ems-red font-bold uppercase">+ Add Case</button>
                </div>

                <div className="space-y-3">
                  {myPatientLogs.slice(0, 3).map(log => (
                    <div key={log.id} className="p-3.5 rounded-xl bg-dark-900 border border-white/10 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{log.patientName}</span>
                        <span className="text-ems-red font-mono text-[10px]">{log.triageLevel}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] line-clamp-1">{log.diagnosis}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Duty Hours Tracker */}
        {activeTab === 'duty' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold text-white font-heading mb-6">Officer Shift & Duty Hours Logbook</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-dark-900 text-slate-400 font-mono uppercase text-[11px] border-b border-white/10">
                  <tr>
                    <th className="p-3">Shift Ref</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Time Range</th>
                    <th className="p-3">Sector Patrol Area</th>
                    <th className="p-3">Total Duration</th>
                    <th className="p-3">HR Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {myShifts.map(s => (
                    <tr key={s.id} className="hover:bg-white/5">
                      <td className="p-3 font-mono text-ems-red font-bold">{s.id}</td>
                      <td className="p-3">{s.date}</td>
                      <td className="p-3 font-mono">{s.startTime} - {s.endTime}</td>
                      <td className="p-3 font-semibold text-white">{s.sector}</td>
                      <td className="p-3 font-mono font-bold text-emerald-400">
                        {Math.round((s.durationMinutes / 60) * 10) / 10} hrs
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 3: Official ID Card Locker */}
        {activeTab === 'idcard' && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col items-center">
            <h3 className="text-xl font-bold text-white font-heading mb-2">MY OFFICIAL PILLBOX EMS SECURITY BADGE</h3>
            <p className="text-slate-400 text-xs mb-8">Verified Discord credential badge ready for FiveM inventory usage.</p>

            <div className="relative w-full max-w-[420px] h-[260px] rounded-2xl p-5 overflow-hidden shadow-2xl border-2 border-ems-red/80 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-850 text-white select-none mb-6">
              
              <div className="flex items-center justify-between border-b border-ems-red/40 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <img src="/assets/pillbox_ems_logo.jpg" alt="Logo" className="w-10 h-10 rounded-full border border-ems-red shadow-glow-red" />
                  <div>
                    <h4 className="font-heading font-extrabold text-sm tracking-wider text-white">PILLBOX HILL MEDICAL</h4>
                    <p className="text-[9px] font-mono text-ems-red uppercase tracking-widest">Official Security Credential</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[8px] font-mono text-slate-400 uppercase">Clearance</span>
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">SEC-LEVEL 4</span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="relative w-28 h-32 rounded-xl overflow-hidden border-2 border-ems-red/60 bg-dark-950 flex-shrink-0">
                  <img src={discordUser.avatar} alt="Badge" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-ems-red text-center text-[8px] font-bold font-mono py-0.5 text-white">VERIFIED</div>
                </div>

                <div className="flex-1 space-y-1.5 text-left">
                  <div>
                    <span className="text-[8px] font-mono text-slate-400 uppercase block">Officer Name</span>
                    <p className="text-base font-extrabold text-white font-heading truncate">{discordUser.name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-1">
                    <div>
                      <span className="text-[8px] font-mono text-slate-400 uppercase block">Rank Title</span>
                      <p className="text-[11px] font-semibold text-ems-red truncate">{discordUser.rank}</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-slate-400 uppercase block">Badge ID</span>
                      <p className="text-[11px] font-mono font-bold text-white tracking-wide">{discordUser.badge}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[8px] font-mono text-slate-400 uppercase block">Department</span>
                    <p className="text-[10px] text-slate-300 font-medium truncate">{discordUser.department}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <div>
                      <span className="text-[7px] font-mono text-slate-400 uppercase block">Expires</span>
                      <span className="text-[9px] font-mono font-bold text-slate-200">2027-12-31</span>
                    </div>
                    <div className="w-9 h-9 bg-white p-1 rounded flex items-center justify-center">
                      <QrCode className="w-full h-full text-dark-950" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl bg-ems-red text-white text-xs font-bold uppercase tracking-wider shadow-glow-red hover:bg-ems-red-hover flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print / Save ID Card Badge
            </button>
          </div>
        )}

        {/* Tab 4: Certificates Vault */}
        {activeTab === 'certs' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold text-white font-heading mb-6">MY ACCREDITATION & CERTIFICATE VAULT</h3>

            {myCertificates.length === 0 ? (
              <div className="text-center py-12">
                <Award className="w-12 h-12 text-slate-500 mx-auto mb-2 opacity-50" />
                <p className="text-slate-400 text-xs">No certificates logged yet for this officer badge.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myCertificates.map(cert => (
                  <div key={cert.id} className="p-6 rounded-2xl bg-dark-900 border-2 border-amber-500/40 text-center relative overflow-hidden">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/40 uppercase">
                      {cert.type} AWARD
                    </span>
                    <h4 className="text-lg font-bold text-white font-heading mt-3">{cert.title}</h4>
                    <p className="text-xs text-amber-400 font-mono mt-1">Issued to: {cert.recipientName} ({cert.badge})</p>
                    <p className="text-slate-300 text-xs mt-3 italic">"{cert.issuedBy}"</p>
                    <span className="text-[10px] text-slate-400 font-mono block mt-4">Issued Date: {cert.date}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Tab 5: Patient Resuscitation Logs */}
        {activeTab === 'patientLogs' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-8">
            
            {/* Form */}
            <div>
              <h3 className="text-xl font-bold text-white font-heading mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-ems-red" />
                Log New Patient Resuscitation & Case Report
              </h3>

              <form onSubmit={handlePatientSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Patient Full Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={patientForm.patientName}
                      onChange={(e) => setPatientForm({ ...patientForm, patientName: e.target.value })}
                      className="w-full bg-dark-850 text-white text-xs rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Triage Severity Level</label>
                    <select
                      value={patientForm.triageLevel}
                      onChange={(e) => setPatientForm({ ...patientForm, triageLevel: e.target.value })}
                      className="w-full bg-dark-850 text-white text-xs rounded-xl px-4 py-2.5 border border-white/10"
                    >
                      <option value="Red (Critical Trauma)">Red (Critical Trauma / Surgery Needed)</option>
                      <option value="Yellow (Serious Wounds)">Yellow (Serious Wounds)</option>
                      <option value="Green (Minor ER)">Green (Minor Outpatient)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Diagnosis & Surgery Conducted</label>
                  <textarea
                    rows="2"
                    required
                    placeholder="Describe symptoms, vital signs, CPR, and surgical interventions performed..."
                    value={patientForm.diagnosis}
                    onChange={(e) => setPatientForm({ ...patientForm, diagnosis: e.target.value })}
                    className="w-full bg-dark-850 text-white text-xs rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-ems-red text-white text-xs font-bold uppercase tracking-wider shadow-glow-red flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Log Medical Case to Record
                </button>

                {patientLogSuccess && (
                  <p className="text-emerald-400 text-xs font-bold font-mono">✓ Medical Case Successfully Saved!</p>
                )}
              </form>
            </div>

            {/* Case History Table */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-sm font-bold text-white uppercase font-mono mb-3">Officer Medical Case History</h4>
              <div className="space-y-3">
                {myPatientLogs.map(log => (
                  <div key={log.id} className="p-4 rounded-xl bg-dark-900 border border-white/10 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{log.patientName}</span>
                      <span className="font-mono text-[10px] text-ems-red font-bold">{log.triageLevel}</span>
                    </div>
                    <p className="text-slate-300">{log.diagnosis}</p>
                    <span className="text-[10px] text-slate-400 font-mono block">Location: {log.location} • Logged: {log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 6: Equipment Requisition */}
        {activeTab === 'equipment' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">Equipment & Medkit Requisition Form</h3>

            <form onSubmit={handleEquipSubmit} className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Requested Items & Quantities</label>
                <input 
                  type="text"
                  required
                  value={equipItem}
                  onChange={(e) => setEquipItem(e.target.value)}
                  className="w-full bg-dark-850 text-white text-xs rounded-xl px-4 py-2.5 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Operational Justification</label>
                <textarea 
                  rows="2"
                  required
                  value={equipReason}
                  onChange={(e) => setEquipReason(e.target.value)}
                  className="w-full bg-dark-850 text-white text-xs rounded-xl px-4 py-2.5 border border-white/10"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-ems-red text-white text-xs font-bold uppercase shadow-glow-red"
              >
                Submit Armory Requisition
              </button>

              {equipSuccess && <p className="text-emerald-400 text-xs font-bold font-mono">✓ Requisition Sent to Armory Supervisor!</p>}
            </form>

            <div className="pt-6 border-t border-white/10">
              <h4 className="text-sm font-bold text-white font-mono mb-3">Requisition History</h4>
              <div className="space-y-2">
                {myEquipmentReqs.map(r => (
                  <div key={r.id} className="p-3 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{r.itemRequested}</span>
                      <span className="text-slate-400">{r.reason}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 7: Leave Requests */}
        {activeTab === 'leave' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">Medical Leave Request System</h3>

            <form onSubmit={handleLeaveSubmit} className="space-y-4 max-w-lg">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Start Date</label>
                  <input 
                    type="date"
                    required
                    value={leaveStart}
                    onChange={(e) => setLeaveStart(e.target.value)}
                    className="w-full bg-dark-850 text-white text-xs rounded-xl px-4 py-2.5 border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">End Date</label>
                  <input 
                    type="date"
                    required
                    value={leaveEnd}
                    onChange={(e) => setLeaveEnd(e.target.value)}
                    className="w-full bg-dark-850 text-white text-xs rounded-xl px-4 py-2.5 border border-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Reason for Leave</label>
                <textarea 
                  rows="2"
                  required
                  placeholder="Explain vacation or OOC absence..."
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  className="w-full bg-dark-850 text-white text-xs rounded-xl px-4 py-2.5 border border-white/10"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-ems-red text-white text-xs font-bold uppercase shadow-glow-red"
              >
                Submit Leave Application
              </button>

              {leaveSuccess && <p className="text-emerald-400 text-xs font-bold font-mono">✓ Leave Application Submitted to Command!</p>}
            </form>

            <div className="pt-6 border-t border-white/10">
              <h4 className="text-sm font-bold text-white font-mono mb-3">Leave History</h4>
              <div className="space-y-2">
                {myLeaveReqs.map(l => (
                  <div key={l.id} className="p-3 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{l.startDate} to {l.endDate}</span>
                      <span className="text-slate-400">{l.reason}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                      {l.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
