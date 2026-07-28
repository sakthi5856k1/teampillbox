import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Megaphone, 
  Award, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  ShieldCheck, 
  Key, 
  UserCheck, 
  Lock,
  Printer,
  Sparkles
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    userRole, 
    setUserRole, 
    staffMembers, 
    addStaffMember, 
    deleteStaffMember, 
    applications, 
    updateApplicationStatus, 
    announcements, 
    addAnnouncement, 
    deleteAnnouncement, 
    certificates, 
    galleryItems 
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'staff', 'applications', 'news', 'certificates'

  // New staff modal state
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    badge: 'EMS-',
    rank: 'Medical Intern',
    department: 'Intern',
    roleCategory: 'Intern',
    bio: '',
    avatar: '/assets/ems_doctor_portrait.jpg'
  });

  // New announcement state
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [newNews, setNewNews] = useState({
    title: '',
    category: 'Update',
    author: 'Admin Command',
    content: ''
  });

  const rolesList = ['Super Admin', 'Admin', 'HR', 'Doctor', 'EMT'];

  const stats = [
    { label: 'Active Staff Officers', value: staffMembers.length, icon: Users, color: 'text-blue-400' },
    { label: 'Pending Applications', value: applications.filter(a => a.status === 'Pending').length, icon: FileText, color: 'text-amber-400' },
    { label: 'Total Applications', value: applications.length, icon: FileText, color: 'text-emerald-400' },
    { label: 'Published News', value: announcements.length, icon: Megaphone, color: 'text-purple-400' },
    { label: 'Issued Certificates', value: certificates.length, icon: Award, color: 'text-ems-red' },
    { label: 'Gallery Media', value: galleryItems.length, icon: ImageIcon, color: 'text-cyan-400' },
  ];

  const handleCreateStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.badge) return;
    addStaffMember({
      id: `ems-${Math.floor(100 + Math.random() * 900)}`,
      ...newStaff,
      status: 'On Duty',
      certifications: ['BLS Certified'],
      joinDate: new Date().toISOString().split('T')[0]
    });
    setShowAddStaffModal(false);
    setNewStaff({
      name: '',
      badge: 'EMS-',
      rank: 'Medical Intern',
      department: 'Intern',
      roleCategory: 'Intern',
      bio: '',
      avatar: '/assets/ems_doctor_portrait.jpg'
    });
  };

  const handleCreateNews = (e) => {
    e.preventDefault();
    if (!newNews.title || !newNews.content) return;
    addAnnouncement(newNews);
    setShowAddNewsModal(false);
    setNewNews({
      title: '',
      category: 'Update',
      author: 'Admin Command',
      content: ''
    });
  };

  // Check role access
  const canManageStaff = ['Super Admin', 'Admin', 'HR'].includes(userRole);
  const canManageApps = ['Super Admin', 'Admin', 'HR'].includes(userRole);
  const canManageNews = ['Super Admin', 'Admin'].includes(userRole);

  return (
    <section className="py-16 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Role Switcher Bar */}
        <div className="glass-panel p-6 rounded-3xl border border-ems-red/40 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-ems-red/20 text-ems-red border border-ems-red/40">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-white font-heading">ADMIN & COMMAND PORTAL</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                  JWT Session Active
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">Manage personnel, review recruitment applications, issue certificates & post news.</p>
            </div>
          </div>

          {/* Role Switcher Simulator */}
          <div className="flex items-center gap-2 bg-dark-900 p-2 rounded-2xl border border-white/10">
            <ShieldCheck className="w-4 h-4 text-ems-red ml-2" />
            <span className="text-xs font-mono text-slate-400 uppercase hidden sm:inline">Permission Level:</span>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="bg-dark-850 text-white text-xs font-bold font-mono rounded-xl px-3 py-2 border border-white/10 focus:outline-none focus:border-ems-red"
            >
              {rolesList.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          {[
            { id: 'overview', label: 'Overview Metrics', icon: LayoutDashboard },
            { id: 'staff', label: `Staff Roster (${staffMembers.length})`, icon: Users },
            { id: 'applications', label: `Applications (${applications.length})`, icon: FileText },
            { id: 'news', label: `News Directives (${announcements.length})`, icon: Megaphone },
            { id: 'certificates', label: `Certificates (${certificates.length})`, icon: Award },
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
                    : 'bg-dark-850 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.map((st, idx) => {
                const Icon = st.icon;
                return (
                  <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400">{st.label}</span>
                      <Icon className={`w-4 h-4 ${st.color}`} />
                    </div>
                    <div className="text-3xl font-extrabold text-white font-heading">{st.value}</div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Recent Applications Quick Review */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white font-heading">Pending Application Review</h3>
                  <button onClick={() => setActiveTab('applications')} className="text-xs text-ems-red font-bold uppercase">View All</button>
                </div>

                <div className="space-y-3">
                  {applications.filter(a => a.status === 'Pending').slice(0, 3).map(app => (
                    <div key={app.id} className="p-3 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white block">{app.applicantName}</span>
                        <span className="text-slate-400 font-mono">Applied: {app.appliedRole} • {app.submittedAt}</span>
                      </div>
                      
                      {canManageApps ? (
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => updateApplicationStatus(app.id, 'Approved')}
                            className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white"
                            title="Approve"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                            className="p-1.5 rounded-lg bg-ems-red/20 text-ems-red hover:bg-ems-red hover:text-white"
                            title="Reject"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-amber-400 font-bold">Pending</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Role Permissions Guide */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white font-heading mb-4 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-ems-red" />
                  Active Role Matrix: [{userRole}]
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900 border border-white/5">
                    <span>Manage Staff Roster (CRUD)</span>
                    <span className={`font-bold font-mono ${canManageStaff ? 'text-emerald-400' : 'text-ems-red'}`}>
                      {canManageStaff ? 'AUTHORIZED' : 'RESTRICTED'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900 border border-white/5">
                    <span>Recruitment App Review</span>
                    <span className={`font-bold font-mono ${canManageApps ? 'text-emerald-400' : 'text-ems-red'}`}>
                      {canManageApps ? 'AUTHORIZED' : 'RESTRICTED'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900 border border-white/5">
                    <span>Post News & Directives</span>
                    <span className={`font-bold font-mono ${canManageNews ? 'text-emerald-400' : 'text-ems-red'}`}>
                      {canManageNews ? 'AUTHORIZED' : 'RESTRICTED'}
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Staff Management */}
        {activeTab === 'staff' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-heading">Staff Personnel Management</h3>
              
              {canManageStaff && (
                <button
                  onClick={() => setShowAddStaffModal(true)}
                  className="px-4 py-2 rounded-xl bg-ems-red text-white text-xs font-bold uppercase tracking-wider shadow-glow-red hover:bg-ems-red-hover flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Add New Staff
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-dark-900 text-slate-400 font-mono uppercase text-[11px] border-b border-white/10">
                  <tr>
                    <th className="p-3">Badge</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Rank</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {staffMembers.map(staff => (
                    <tr key={staff.id} className="hover:bg-white/5">
                      <td className="p-3 font-mono font-bold text-ems-red">{staff.badge}</td>
                      <td className="p-3 font-semibold text-white">{staff.name}</td>
                      <td className="p-3">{staff.rank}</td>
                      <td className="p-3">{staff.department}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          staff.status === 'On Duty' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'
                        }`}>
                          {staff.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {canManageStaff && (
                          <button
                            onClick={() => deleteStaffMember(staff.id)}
                            className="p-1.5 rounded bg-ems-red/20 text-ems-red hover:bg-ems-red hover:text-white"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 3: Applications Management */}
        {activeTab === 'applications' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold text-white font-heading mb-6">Recruitment Applications Inbox</h3>

            <div className="space-y-4">
              {applications.map(app => (
                <div key={app.id} className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-ems-red">{app.id}</span>
                      <h4 className="text-base font-bold text-white font-heading">{app.applicantName}</h4>
                      <span className="text-xs text-slate-400 font-mono">({app.discordTag})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' :
                        app.status === 'Rejected' ? 'bg-ems-red/20 text-ems-red' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {app.status}
                      </span>

                      {canManageApps && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'Approved')}
                            className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500 hover:text-white"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                            className="px-3 py-1 rounded-lg bg-ems-red/20 text-ems-red text-xs font-bold hover:bg-ems-red hover:text-white"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500 font-mono block">RP Experience:</span>
                      <p className="mt-1 leading-relaxed">{app.experience}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-mono block">Motivation:</span>
                      <p className="mt-1 leading-relaxed">{app.motivation}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: News Directives */}
        {activeTab === 'news' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-heading">Announcements & Bulletins</h3>

              {canManageNews && (
                <button
                  onClick={() => setShowAddNewsModal(true)}
                  className="px-4 py-2 rounded-xl bg-ems-red text-white text-xs font-bold uppercase tracking-wider shadow-glow-red hover:bg-ems-red-hover flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Post New Announcement
                </button>
              )}
            </div>

            <div className="space-y-3">
              {announcements.map(item => (
                <div key={item.id} className="p-4 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-ems-red/20 text-ems-red font-mono text-[10px] font-bold">{item.category}</span>
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                    </div>
                    <p className="text-slate-400 mt-1">{item.content}</p>
                  </div>

                  {canManageNews && (
                    <button
                      onClick={() => deleteAnnouncement(item.id)}
                      className="p-1.5 rounded bg-ems-red/20 text-ems-red hover:bg-ems-red hover:text-white flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 5: Issued Certificates */}
        {activeTab === 'certificates' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold text-white font-heading mb-6">Issued Certificate Registry</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map(cert => (
                <div key={cert.id} className="p-4 rounded-2xl bg-dark-900 border border-amber-500/30 text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-mono text-amber-400 font-bold">{cert.id}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">{cert.type}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{cert.recipientName} ({cert.badge})</h4>
                  <p className="text-slate-300">{cert.title}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Issued By: {cert.issuedBy}</span>
                    <span>Date: {cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Staff Modal */}
        {showAddStaffModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <form onSubmit={handleCreateStaff} className="w-full max-w-lg glass-panel p-6 rounded-2xl border border-ems-red space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-heading">Add New Staff Member</h3>
                <button type="button" onClick={() => setShowAddStaffModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={newStaff.name} 
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full bg-dark-850 text-white text-xs rounded-xl px-3 py-2 border border-white/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Badge #</label>
                  <input 
                    type="text" 
                    required 
                    value={newStaff.badge} 
                    onChange={(e) => setNewStaff({ ...newStaff, badge: e.target.value })}
                    className="w-full bg-dark-850 text-white text-xs rounded-xl px-3 py-2 border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Department</label>
                  <select 
                    value={newStaff.department}
                    onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value, roleCategory: e.target.value })}
                    className="w-full bg-dark-850 text-white text-xs rounded-xl px-3 py-2 border border-white/10"
                  >
                    <option value="Executive Management">Executive Management</option>
                    <option value="HOD">HOD</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="EMT">EMT</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Rank Title</label>
                <input 
                  type="text" 
                  required 
                  value={newStaff.rank} 
                  onChange={(e) => setNewStaff({ ...newStaff, rank: e.target.value })}
                  className="w-full bg-dark-850 text-white text-xs rounded-xl px-3 py-2 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Biography</label>
                <textarea 
                  rows="2"
                  value={newStaff.bio} 
                  onChange={(e) => setNewStaff({ ...newStaff, bio: e.target.value })}
                  className="w-full bg-dark-850 text-white text-xs rounded-xl px-3 py-2 border border-white/10"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddStaffModal(false)} className="px-4 py-2 text-xs text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-ems-red text-white text-xs font-bold uppercase shadow-glow-red">Save Staff</button>
              </div>
            </form>
          </div>
        )}

        {/* Add News Modal */}
        {showAddNewsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <form onSubmit={handleCreateNews} className="w-full max-w-lg glass-panel p-6 rounded-2xl border border-ems-red space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-heading">Post New Announcement</h3>
                <button type="button" onClick={() => setShowAddNewsModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Title</label>
                <input 
                  type="text" 
                  required 
                  value={newNews.title} 
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  className="w-full bg-dark-850 text-white text-xs rounded-xl px-3 py-2 border border-white/10"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
                <select 
                  value={newNews.category}
                  onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                  className="w-full bg-dark-850 text-white text-xs rounded-xl px-3 py-2 border border-white/10"
                >
                  <option value="Update">Update</option>
                  <option value="Event">Event</option>
                  <option value="Recruitment">Recruitment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Content</label>
                <textarea 
                  rows="4"
                  required
                  value={newNews.content} 
                  onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                  className="w-full bg-dark-850 text-white text-xs rounded-xl px-3 py-2 border border-white/10"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddNewsModal(false)} className="px-4 py-2 text-xs text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-ems-red text-white text-xs font-bold uppercase shadow-glow-red">Post News</button>
              </div>
            </form>
          </div>
        )}

      </div>
    </section>
  );
};
