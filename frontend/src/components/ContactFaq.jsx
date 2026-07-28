import React, { useState } from 'react';
import { HelpCircle, Mail, Send, ChevronDown, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactFaq = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [contactSent, setContactSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  const faqs = [
    {
      q: 'How do I apply to join Team Pillbox EMS?',
      a: 'Navigate to the "Applications" tab on this website, fill out the recruitment form with your OOC details and IC background, then join our Discord server for HR interview scheduling.'
    },
    {
      q: 'What are the minimum requirements to become an EMS officer?',
      a: 'You must be at least 16 years old OOC, possess a working microphone, hold a valid driver license in-game, and demonstrate a commitment to realistic medical roleplay.'
    },
    {
      q: 'How does the ranking system work?',
      a: 'New recruits start as Medical Interns. Through field shifts, training completions, and merit, officers promote to EMT, Paramedic, Doctor, HOD, and Executive Management.'
    },
    {
      q: 'Can I generate official EMS ID badges and Certificates on this portal?',
      a: 'Yes! Authorized personnel and applicants can utilize our built-in ID Card Generator and Certificate Builder to generate printable high-security badges and accreditation certificates.'
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSent(true);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="py-16 bg-dark-900/60 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ems-red/10 border border-ems-red/30 text-ems-red text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Support & Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            CONTACT & HELP CENTER
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Have questions about recruitment, SOPs, or medical roleplay? Reach out to Command.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* FAQ Accordion */}
          <div>
            <h3 className="text-2xl font-bold text-white font-heading mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-ems-red" />
              Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 text-left font-semibold text-white text-sm flex items-center justify-between gap-4 hover:text-ems-red transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-ems-red transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>

                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-slate-300 text-xs leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-white font-heading mb-6 flex items-center gap-2">
              <Mail className="w-6 h-6 text-ems-red" />
              Dispatch Command Inquiry
            </h3>

            {contactSent ? (
              <div className="glass-panel p-8 rounded-2xl border border-emerald-500/40 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white font-heading">Message Sent to Command!</h4>
                <p className="text-xs text-slate-300">An EMS Command Officer will reply to your inquiry shortly.</p>
                <button 
                  onClick={() => setContactSent(false)}
                  className="px-5 py-2.5 rounded-xl bg-ems-red text-white text-xs font-bold uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-1 font-mono">Your Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="Character or Discord Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-1 font-mono">Email / Contact</label>
                  <input 
                    type="text"
                    required
                    placeholder="your.email@example.com or Discord"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-1 font-mono">Subject</label>
                  <input 
                    type="text"
                    required
                    placeholder="Recruitment, SOP question, Media..."
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-1 font-mono">Message</label>
                  <textarea 
                    rows="4"
                    required
                    placeholder="How can Team Pillbox EMS assist you?"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-dark-850 text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-ems-red"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-ems-red text-white text-xs font-bold uppercase tracking-wider shadow-glow-red hover:bg-ems-red-hover flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Inquiry
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
