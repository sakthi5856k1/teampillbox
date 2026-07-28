import React from 'react';
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
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';

export const App = () => {
  const { currentTab } = useApp();

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 font-sans flex flex-col justify-between">
      <div>
        <Navbar />
        <DiscordAuthModal />

        <main>
          {currentTab === 'home' && (
            <>
              <HeroSection />
              <AboutSection />
              <StaffRoster />
              <Departments />
              <Announcements />
              <ContactFaq />
            </>
          )}

          {currentTab === 'about' && <AboutSection />}
          {currentTab === 'staff' && <StaffRoster />}
          {currentTab === 'departments' && <Departments />}
          {currentTab === 'portal' && <StaffPortal />}
          {currentTab === 'recruitment' && <ApplicationForm />}
          {currentTab === 'announcements' && <Announcements />}
          {currentTab === 'gallery' && <Gallery />}
          {currentTab === 'idcard' && <IdCardGenerator />}
          {currentTab === 'certificates' && <CertificateGenerator />}
          {currentTab === 'rules' && <EmsRules />}
          {currentTab === 'calendar' && <EventCalendar />}
          {currentTab === 'contact' && <ContactFaq />}
          {currentTab === 'admin' && <AdminDashboard />}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
