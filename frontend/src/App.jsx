import React, { useEffect, useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { StaffRoster } from './components/StaffRoster';
import { Departments } from './components/Departments';
import { StaffPortal } from './components/StaffPortal';
import { DiscordAuthModal } from './components/DiscordAuthModal';
import { ApplicationForm } from './components/ApplicationForm';
import { Announcements } from './components/Announcements';
import { Gallery } from './components/Gallery';
import { IdCardGenerator } from './components/IdCardGenerator';
import { CertificateGenerator } from './components/CertificateGenerator';
import { EmsRules } from './components/EmsRules';
import { EventCalendar } from './components/EventCalendar';
import { ContactFaq } from './components/ContactFaq';
import { Footer } from './components/Footer';
import { LogIn, ShieldOff } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────
   PageWrapper — triggers .page-enter fade animation on tab switch
──────────────────────────────────────────────────────────────── */
const PageWrapper = ({ children }) => {
  const [animKey, setAnimKey] = useState(0);
  const { currentTab } = useApp();

  useEffect(() => {
    setAnimKey(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  return (
    <div key={animKey} className="page-enter">
      {children}
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────
   LoginGate — shown instead of portal when user is not logged in
──────────────────────────────────────────────────────────────── */
const LoginGate = () => {
  const { setIsDiscordModalOpen, setCurrentTab } = useApp();
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="relative inline-flex mb-6">
          <div className="absolute -inset-4 bg-ems-red/20 rounded-full blur-2xl"></div>
          <div className="relative w-20 h-20 rounded-full bg-dark-900 border-2 border-ems-red/50 flex items-center justify-center">
            <ShieldOff className="w-9 h-9 text-ems-red" />
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-white font-heading mb-2">
          Staff Access Only
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          You need to log in with your Discord Staff account to access the Staff Portal, duty hours, ID cards, and more.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setIsDiscordModalOpen(true)}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm uppercase tracking-wide transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <LogIn className="w-4 h-4" />
            Login with Discord
          </button>
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-dark-850 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white font-semibold text-sm transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────
   App — main router
──────────────────────────────────────────────────────────────── */
export const App = () => {
  const { currentTab, isLoggedIn } = useApp();

  const renderPage = () => {
    switch (currentTab) {
      case 'home':
        return (
          <>
            <HeroSection />
            <div className="fade-in-up fade-in-up-delay-1"><AboutSection /></div>
            <div className="fade-in-up fade-in-up-delay-2"><StaffRoster /></div>
            <div className="fade-in-up fade-in-up-delay-3"><Departments /></div>
            <div className="fade-in-up fade-in-up-delay-4"><Announcements /></div>
            <div className="fade-in-up fade-in-up-delay-4"><ContactFaq /></div>
          </>
        );
      case 'about':         return <AboutSection />;
      case 'staff':         return <StaffRoster />;
      case 'departments':   return <Departments />;
      case 'portal':        return isLoggedIn ? <StaffPortal /> : <LoginGate />;
      case 'recruitment':   return <ApplicationForm />;
      case 'announcements': return <Announcements />;
      case 'gallery':       return <Gallery />;
      case 'idcard':        return <IdCardGenerator />;
      case 'certificates':  return <CertificateGenerator />;
      case 'rules':         return <EmsRules />;
      case 'calendar':      return <EventCalendar />;
      case 'contact':       return <ContactFaq />;
      default:              return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 font-sans flex flex-col">
      <Navbar />
      <DiscordAuthModal />

      <main className="flex-1">
        <PageWrapper>
          {renderPage()}
        </PageWrapper>
      </main>

      <Footer />
    </div>
  );
};

export default App;
