import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Search, 
  User, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  X,
  Sparkles
} from 'lucide-react';

export const ApplicationForm = () => {
  const { submitApplication, applications } = useApp();

  const [formData, setFormData] = useState({
    applicantName: '',
    discordTag: '',
    age: '',
    appliedRole: 'EMT',
    experience: '',
    motivation: '',
    agreedToRules: false
  });

  const [errors, setErrors] = useState({});
  const [submittedApp, setSubmittedApp] = useState(null);
  
  // Status check tab
  const [activeSubTab, setActiveSubTab] = useState('apply'); // 'apply' or 'checkStatus'
  const [searchAppId, setSearchAppId] = useState('');
  const [searchedResult, setSearchedResult] = useState(null);

  const roles = ['EMT', 'Intern', 'Nurse', 'Doctor'];

  const validate = () => {
    const errs = {};
    if (!formData.applicantName.trim()) errs.applicantName = 'Full Name is required.';
    if (!formData.discordTag.trim()) errs.discordTag = 'Discord username is required.';
    if (!formData.age || isNaN(formData.age) || parseInt(formData.age) < 16) {
      errs.age = 'Must be at least 16 years old to apply.';
    }
    if (!formData.experience.trim() || formData.experience.length < 20) {
      errs.experience = 'Please describe your RP experience in at least 20 characters.';
    }
    if (!formData.motivation.trim() || formData.motivation.length < 20) {
      errs.motivation = 'Please state your motivation in at least 20 characters.';
    }
    if (!formData.agreedToRules) {
      errs.agreedToRules = 'You must agree to Team Pillbox EMS SOPs and Server rules.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = submitApplication(formData);
    setSubmittedApp(result);
    setFormData({
      applicantName: '',
      discordTag: '',
      age: '',
      appliedRole: 'EMT',
      experience: '',
      motivation: '',
      agreedToRules: false
    });
    setErrors({});
  };

  const handleSearchStatus = (e) => {
    e.preventDefault();
    if (!searchAppId.trim()) return;
    const found = applications.find(a => a.id.toLowerCase() === searchAppId.trim().toLowerCase());
    setSearchedResult(found || 'NOT_FOUND');
  };

  return (
    <section className="py-16 bg-dark-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ems-red/10 border border-ems-red/30 text-ems-red text-xs font-semibold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            Recruitment Portal
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            JOIN TEAM PILLBOX EMS
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Submit your application to become an official Emergency Medical Services responder.
          </p>

          {/* Sub tab toggles */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveSubTab('apply')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'apply'
                  ? 'bg-ems-red text-white shadow-glow-red'
                  : 'bg-dark-850 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              New Application Form
            </button>
            <button
              onClick={() => setActiveSubTab('checkStatus')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'checkStatus'
                  ? 'bg-ems-red text-white shadow-glow-red'
                  : 'bg-dark-850 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Track Application Status
            </button>
          </div>
        </div>

        {/* Tab 1: New Application */}
        {activeSubTab === 'apply' && (
          <div>
            {submittedApp ? (
              <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center border-2 border-emerald-500/40 shadow-glow-red animate-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-2">
                  APPLICATION SUBMITTED SUCCESSFULLY!
                </h3>
                <p className="text-slate-300 text-sm mb-6 max-w-lg mx-auto">
                  Your application has been received by HR Command. Please save your reference ID for tracking.
                </p>

                <div className="inline-block px-6 py-3 rounded-2xl bg-dark-900 border border-ems-red/50 mb-6">
                  <span className="text-xs text-slate-400 font-mono uppercase block mb-1">Application Reference ID</span>
                  <span className="text-2xl font-extrabold text-ems-red font-mono tracking-widest">{submittedApp.id}</span>
                </div>

                <div className="bg-dark-900/60 p-4 rounded-xl text-left text-xs text-slate-300 max-w-md mx-auto mb-8 space-y-2">
                  <p><strong className="text-white">Applicant Name:</strong> {submittedApp.applicantName}</p>
                  <p><strong className="text-white">Applied Role:</strong> {submittedApp.appliedRole}</p>
                  <p><strong className="text-white">Current Status:</strong> <span className="text-amber-400 font-bold">Pending Review</span></p>
                  <p><strong className="text-white">Next Step:</strong> Join our Discord and wait for HR interview scheduling.</p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => setSubmittedApp(null)}
                    className="px-6 py-3 rounded-xl bg-ems-red text-white text-xs font-bold uppercase tracking-wider shadow-glow-red"
                  >
                    Submit Another Application
                  </button>
                  <a
                    href="https://discord.gg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-[#5865F2] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Join HR Discord Channel
                  </a>
                </div>

              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-panel p-8 sm:p-10 rounded-3xl space-y-6">
                
                {/* Personal Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                      Full Character Name <span className="text-ems-red">*</span>
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Michael Vance"
                      value={formData.applicantName}
                      onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                      className={`w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-3 border ${
                        errors.applicantName ? 'border-ems-red' : 'border-white/10'
                      } focus:outline-none focus:border-ems-red`}
                    />
                    {errors.applicantName && <p className="text-ems-red text-xs mt-1">{errors.applicantName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                      Discord Tag / Handle <span className="text-ems-red">*</span>
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. user_rp#1234"
                      value={formData.discordTag}
                      onChange={(e) => setFormData({ ...formData, discordTag: e.target.value })}
                      className={`w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-3 border ${
                        errors.discordTag ? 'border-ems-red' : 'border-white/10'
                      } focus:outline-none focus:border-ems-red`}
                    />
                    {errors.discordTag && <p className="text-ems-red text-xs mt-1">{errors.discordTag}</p>}
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                      OOC Age <span className="text-ems-red">*</span>
                    </label>
                    <input 
                      type="number"
                      placeholder="e.g. 21"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className={`w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-3 border ${
                        errors.age ? 'border-ems-red' : 'border-white/10'
                      } focus:outline-none focus:border-ems-red`}
                    />
                    {errors.age && <p className="text-ems-red text-xs mt-1">{errors.age}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                      Desired Position <span className="text-ems-red">*</span>
                    </label>
                    <select
                      value={formData.appliedRole}
                      onChange={(e) => setFormData({ ...formData, appliedRole: e.target.value })}
                      className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-3 border border-white/10 focus:outline-none focus:border-ems-red"
                    >
                      {roles.map(r => (
                        <option key={r} value={r} className="bg-dark-900">{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                    FiveM & Medical Roleplay Experience <span className="text-ems-red">*</span>
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Describe your previous experience with EMS, medical terminology, and FiveM servers..."
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className={`w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-3 border ${
                      errors.experience ? 'border-ems-red' : 'border-white/10'
                    } focus:outline-none focus:border-ems-red`}
                  />
                  {errors.experience && <p className="text-ems-red text-xs mt-1">{errors.experience}</p>}
                </div>

                {/* Motivation */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2 font-mono">
                    Why do you want to join Team Pillbox EMS? <span className="text-ems-red">*</span>
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Tell us what drives your passion for emergency medical roleplay..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className={`w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-3 border ${
                      errors.motivation ? 'border-ems-red' : 'border-white/10'
                    } focus:outline-none focus:border-ems-red`}
                  />
                  {errors.motivation && <p className="text-ems-red text-xs mt-1">{errors.motivation}</p>}
                </div>

                {/* Rules agreement checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.agreedToRules}
                      onChange={(e) => setFormData({ ...formData, agreedToRules: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded text-ems-red focus:ring-ems-red bg-dark-850 border-white/20"
                    />
                    <span className="text-xs text-slate-300 leading-relaxed">
                      I agree to abide by the official Team Pillbox EMS Standard Operating Procedures (SOPs), maintain high-quality roleplay standards, and respect all chain of command directions.
                    </span>
                  </label>
                  {errors.agreedToRules && <p className="text-ems-red text-xs mt-1">{errors.agreedToRules}</p>}
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-ems-red via-red-600 to-ems-darkred text-white text-sm font-extrabold uppercase tracking-wider shadow-glow-red hover:shadow-glow-red-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Application to HR Command
                  </button>
                </div>

              </form>
            )}
          </div>
        )}

        {/* Tab 2: Track Status */}
        {activeSubTab === 'checkStatus' && (
          <div className="glass-panel p-8 sm:p-10 rounded-3xl">
            <h3 className="text-xl font-bold text-white font-heading mb-4 text-center">
              CHECK YOUR APPLICATION STATUS
            </h3>

            <form onSubmit={handleSearchStatus} className="flex gap-3 max-w-md mx-auto mb-8">
              <input 
                type="text"
                placeholder="Enter Reference ID (e.g. APP-9021)..."
                value={searchAppId}
                onChange={(e) => setSearchAppId(e.target.value)}
                className="flex-1 bg-dark-850 text-white text-sm rounded-xl px-4 py-3 border border-white/10 focus:outline-none focus:border-ems-red"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-ems-red text-white text-xs font-bold uppercase tracking-wider shadow-glow-red flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Track
              </button>
            </form>

            {searchedResult === 'NOT_FOUND' && (
              <div className="p-4 rounded-xl bg-ems-red/10 border border-ems-red/30 text-center text-xs text-ems-red">
                Application ID not found. Please verify your reference number and try again.
              </div>
            )}

            {searchedResult && searchedResult !== 'NOT_FOUND' && (
              <div className="p-6 rounded-2xl bg-dark-900 border border-white/10 max-w-md mx-auto space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-sm text-ems-red font-bold">{searchedResult.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    searchedResult.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                    searchedResult.status === 'Rejected' ? 'bg-ems-red/20 text-ems-red border border-ems-red/40' :
                    'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}>
                    {searchedResult.status}
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-1.5 pt-2">
                  <p><strong>Applicant Name:</strong> {searchedResult.applicantName}</p>
                  <p><strong>Applied Position:</strong> {searchedResult.appliedRole}</p>
                  <p><strong>Submitted Date:</strong> {searchedResult.submittedAt}</p>
                  <p><strong>Discord Contact:</strong> {searchedResult.discordTag}</p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
