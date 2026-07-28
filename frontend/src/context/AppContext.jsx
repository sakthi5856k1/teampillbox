import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const MOCK_DISCORD_USERS = [
  {
    id: 'disc-1',
    discordTag: 'Alexander_Vance#0001',
    discordAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    name: 'Dr. Alexander Vance',
    badge: 'EMS-101',
    rank: 'Chief of Medicine',
    department: 'Executive Management',
    roleCategory: 'Executive Management',
    role: 'Super Admin',
    avatar: '/assets/ems_doctor_portrait.jpg',
    rankProgress: 100,
    totalDutyHours: 142.5,
    weeklyTargetHours: 30,
    joinDate: '2022-03-15',
    email: 'a.vance@pillbox-ems.org'
  },
  {
    id: 'disc-2',
    discordTag: 'Samantha_Reed#1040',
    discordAvatar: 'https://images.unsplash.com/photo-1594824813571-24a69c100417?auto=format&fit=crop&w=600&q=80',
    name: 'Captain Samantha Reed',
    badge: 'EMS-104',
    rank: 'Head of Paramedics',
    department: 'HOD',
    roleCategory: 'HOD',
    role: 'Admin',
    avatar: '/assets/ems_paramedic_portrait.jpg',
    rankProgress: 88,
    totalDutyHours: 98.0,
    weeklyTargetHours: 25,
    joinDate: '2022-08-20',
    email: 's.reed@pillbox-ems.org'
  },
  {
    id: 'disc-3',
    discordTag: 'David_Miller_RP#3100',
    discordAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    name: 'David Miller',
    badge: 'EMS-310',
    rank: 'Senior Paramedic',
    department: 'EMT',
    roleCategory: 'EMT',
    role: 'EMT',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    rankProgress: 65,
    totalDutyHours: 54.2,
    weeklyTargetHours: 20,
    joinDate: '2023-11-02',
    email: 'd.miller@pillbox-ems.org'
  }
];

const INITIAL_STAFF = [
  {
    id: 'ems-101',
    badge: 'EMS-101',
    name: 'Dr. Alexander Vance',
    rank: 'Chief of Medicine',
    department: 'Executive Management',
    roleCategory: 'Executive Management',
    status: 'On Duty',
    bio: 'Over 8 years of trauma surgery and medical administration experience in Los Santos. Leads clinical standardizations and strategic operations.',
    avatar: '/assets/ems_doctor_portrait.jpg',
    certifications: ['Advanced Trauma Life Support', 'Flight Medical Specialist', 'Surgical Directorship'],
    joinDate: '2022-03-15',
    email: 'a.vance@pillbox-ems.org'
  },
  {
    id: 'ems-104',
    badge: 'EMS-104',
    name: 'Captain Samantha Reed',
    rank: 'Head of Paramedics',
    department: 'Head of Department',
    roleCategory: 'HOD',
    status: 'On Duty',
    bio: 'Dedicated tactical paramedic captain leading rapid response units across Pillbox Hill and county emergency sectors.',
    avatar: '/assets/ems_paramedic_portrait.jpg',
    certifications: ['Tactical Combat Casualty Care', 'Air Rescue Specialist', 'Field Supervisor'],
    joinDate: '2022-08-20',
    email: 's.reed@pillbox-ems.org'
  },
  {
    id: 'ems-112',
    badge: 'EMS-112',
    name: 'Dr. Marcus Holloway',
    rank: 'Senior Attending Physician',
    department: 'Doctor',
    roleCategory: 'Doctor',
    status: 'On Duty',
    bio: 'Specialist in emergency cardiology and neurotrauma resuscitation. Oversees emergency room triage during high-code incidents.',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    certifications: ['Cardiology Specialist', 'ER Triage Lead'],
    joinDate: '2023-01-10',
    email: 'm.holloway@pillbox-ems.org'
  },
  {
    id: 'ems-205',
    badge: 'EMS-205',
    name: 'Elena Rostova',
    rank: 'Charge Nurse',
    department: 'Nurse',
    roleCategory: 'Nurse',
    status: 'Off Duty',
    bio: 'Manages critical nursing care units, patient triage logs, and pharmaceutical inventory at Pillbox Hill Medical Center.',
    avatar: 'https://images.unsplash.com/photo-1594824813571-24a69c100417?auto=format&fit=crop&w=600&q=80',
    certifications: ['ICU Nursing Lead', 'Pharmacology Certified'],
    joinDate: '2023-05-14',
    email: 'e.rostova@pillbox-ems.org'
  },
  {
    id: 'ems-310',
    badge: 'EMS-310',
    name: 'David Miller',
    rank: 'Senior Paramedic',
    department: 'EMT',
    roleCategory: 'EMT',
    status: 'On Duty',
    bio: 'First responder specializing in high-speed ambulance pursuit response and heavy vehicle extraction rescue operations.',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    certifications: ['EVOC Ambulance Master', 'Hazmat Response'],
    joinDate: '2023-11-02',
    email: 'd.miller@pillbox-ems.org'
  },
  {
    id: 'ems-402',
    badge: 'EMS-402',
    name: 'Chloe Bennett',
    rank: 'Medical Intern',
    department: 'Intern',
    roleCategory: 'Intern',
    status: 'In Training',
    bio: 'Provisional EMS intern currently undergoing field rotations in emergency medicine and trauma stabilization under Dr. Vance.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    certifications: ['Basic Life Support (BLS)', 'First Aid CPR'],
    joinDate: '2024-02-01',
    email: 'c.bennett@pillbox-ems.org'
  }
];

const INITIAL_SHIFTS = [
  {
    id: 'shift-901',
    badge: 'EMS-101',
    date: '2026-07-28',
    startTime: '14:00',
    endTime: '18:30',
    durationMinutes: 270,
    sector: 'Pillbox ER & Air One',
    status: 'Completed'
  },
  {
    id: 'shift-902',
    badge: 'EMS-104',
    date: '2026-07-27',
    startTime: '19:00',
    endTime: '23:15',
    durationMinutes: 255,
    sector: 'Los Santos Metro Code 3 Patrol',
    status: 'Completed'
  },
  {
    id: 'shift-903',
    badge: 'EMS-310',
    date: '2026-07-26',
    startTime: '16:00',
    endTime: '20:00',
    durationMinutes: 240,
    sector: 'Sandy Shores & County Patrol',
    status: 'Completed'
  }
];

const INITIAL_PATIENT_LOGS = [
  {
    id: 'case-701',
    officerBadge: 'EMS-101',
    patientName: 'Johnny Klebitz',
    triageLevel: 'Red (Critical Trauma)',
    diagnosis: 'Gunshot wounds to chest; emergency thoracotomy performed.',
    outcome: 'Survived - Admitted to ICU Bed 2',
    location: 'Vinewood Hills',
    timestamp: '2026-07-28 15:30'
  },
  {
    id: 'case-702',
    officerBadge: 'EMS-104',
    patientName: 'Ashley Butler',
    triageLevel: 'Yellow (Serious Injury)',
    diagnosis: 'Compound leg fracture following motor vehicle incident.',
    outcome: 'Stabilized - Cast applied',
    location: 'Del Perro Freeway',
    timestamp: '2026-07-27 20:15'
  }
];

const INITIAL_EQUIPMENT_REQUESTS = [
  {
    id: 'req-401',
    officerBadge: 'EMS-104',
    itemRequested: 'Air One Stretcher Kit & 4x Trauma Bandages',
    reason: 'Helipad emergency stock replenishment',
    status: 'Approved',
    date: '2026-07-25'
  }
];

const INITIAL_LEAVE_REQUESTS = [
  {
    id: 'leave-101',
    officerBadge: 'EMS-310',
    startDate: '2026-08-10',
    endDate: '2026-08-14',
    reason: 'Out-of-city medical vacation',
    status: 'Approved'
  }
];

export const AppProvider = ({ children }) => {
  const [currentTab, _setCurrentTab] = useState('home');
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState(false);

  // Smart navigation — blocks portal if not logged in
  const setCurrentTab = (tab) => {
    if (tab === 'portal' && !isLoggedIn) {
      setIsDiscordModalOpen(true);
      return;
    }
    _setCurrentTab(tab);
  };

  // Active Logged-in Staff User profile (via Discord) — null until authenticated
  const [discordUser, setDiscordUser] = useState(null);

  // Duty Shift Clock Tracker
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [dutyStartTime, setDutyStartTime] = useState(null);
  const [activeShiftSeconds, setActiveShiftSeconds] = useState(0);

  const [staffMembers, setStaffMembers] = useState(INITIAL_STAFF);
  const [announcements, setAnnouncements] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [applications, setApplications] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [shiftHistory, setShiftHistory] = useState(INITIAL_SHIFTS);
  const [patientLogs, setPatientLogs] = useState(INITIAL_PATIENT_LOGS);
  const [equipmentRequests, setEquipmentRequests] = useState(INITIAL_EQUIPMENT_REQUESTS);
  const [leaveRequests, setLeaveRequests] = useState(INITIAL_LEAVE_REQUESTS);

  const [onlineCount, setOnlineCount] = useState(14);

  // Real-time timer for shift duty clock
  useEffect(() => {
    let timer = null;
    if (isOnDuty) {
      timer = setInterval(() => {
        setActiveShiftSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isOnDuty]);

  // Clock In Action
  const clockIn = () => {
    setIsOnDuty(true);
    setDutyStartTime(new Date());
    setActiveShiftSeconds(0);
  };

  // Clock Out Action
  const clockOut = (sector = 'Citywide Patrol') => {
    if (!isOnDuty) return;
    const now = new Date();
    const durationMins = Math.max(1, Math.round(activeShiftSeconds / 60));
    
    const newShift = {
      id: `shift-${Math.floor(100 + Math.random() * 900)}`,
      badge: discordUser.badge,
      date: now.toISOString().split('T')[0],
      startTime: dutyStartTime ? dutyStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '12:00',
      endTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationMinutes: durationMins,
      sector: sector,
      status: 'Completed'
    };

    setShiftHistory(prev => [newShift, ...prev]);
    setIsOnDuty(false);
    setDutyStartTime(null);
    setActiveShiftSeconds(0);
    
    // Update user's total hours
    setDiscordUser(prev => ({
      ...prev,
      totalDutyHours: Math.round((prev.totalDutyHours + durationMins / 60) * 10) / 10
    }));
  };

  // Login as a specific Discord profile
  const loginAsDiscordUser = (discordProfile) => {
    setDiscordUser(discordProfile);
    setUserRole(discordProfile.role);
    setIsLoggedIn(true);
    setIsDiscordModalOpen(false);
    _setCurrentTab('portal'); // bypass guard — we ARE logging in
  };

  // Logout — clear user and go home
  const logout = () => {
    setDiscordUser(null);
    setUserRole(null);
    setIsLoggedIn(false);
    setIsOnDuty(false);
    setActiveShiftSeconds(0);
    _setCurrentTab('home');
  };

  const addPatientLog = (logData) => {
    const newLog = {
      id: `case-${Math.floor(700 + Math.random() * 300)}`,
      officerBadge: discordUser.badge,
      timestamp: new Date().toLocaleString(),
      ...logData
    };
    setPatientLogs(prev => [newLog, ...prev]);
  };

  const submitEquipmentRequest = (item, reason) => {
    const newReq = {
      id: `req-${Math.floor(400 + Math.random() * 500)}`,
      officerBadge: discordUser.badge,
      itemRequested: item,
      reason: reason,
      status: 'Pending HR Approval',
      date: new Date().toISOString().split('T')[0]
    };
    setEquipmentRequests(prev => [newReq, ...prev]);
  };

  const submitLeaveRequest = (startDate, endDate, reason) => {
    const newLeave = {
      id: `leave-${Math.floor(100 + Math.random() * 900)}`,
      officerBadge: discordUser.badge,
      startDate,
      endDate,
      reason,
      status: 'Pending Command'
    };
    setLeaveRequests(prev => [newLeave, ...prev]);
  };

  const addStaffMember = (newStaff) => setStaffMembers(prev => [newStaff, ...prev]);
  const updateStaffMember = (id, updatedData) => setStaffMembers(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
  const deleteStaffMember = (id) => setStaffMembers(prev => prev.filter(s => s.id !== id));
  const submitApplication = (appData) => {
    const newApp = { id: `APP-${Math.floor(1000 + Math.random() * 9000)}`, ...appData, status: 'Pending', submittedAt: new Date().toISOString().split('T')[0] };
    setApplications(prev => [newApp, ...prev]);
    return newApp;
  };
  const updateApplicationStatus = (id, newStatus) => setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  const addAnnouncement = (newsData) => setAnnouncements(prev => [{ id: `ann-${Date.now()}`, ...newsData, date: new Date().toISOString().split('T')[0] }, ...prev]);
  const deleteAnnouncement = (id) => setAnnouncements(prev => prev.filter(a => a.id !== id));
  const issueCertificate = (certData) => {
    const newCert = { id: `CERT-${Math.floor(500 + Math.random() * 500)}`, ...certData, date: new Date().toISOString().split('T')[0] };
    setCertificates(prev => [newCert, ...prev]);
    return newCert;
  };

  return (
    <AppContext.Provider value={{
      currentTab,
      setCurrentTab,
      userRole,
      setUserRole,
      isLoggedIn,
      setIsLoggedIn,
      isDiscordModalOpen,
      setIsDiscordModalOpen,
      discordUser,
      mockDiscordUsers: MOCK_DISCORD_USERS,
      loginAsDiscordUser,
      logout,
      isOnDuty,
      clockIn,
      clockOut,
      activeShiftSeconds,
      staffMembers,
      addStaffMember,
      updateStaffMember,
      deleteStaffMember,
      announcements,
      addAnnouncement,
      deleteAnnouncement,
      galleryItems,
      setGalleryItems,
      applications,
      submitApplication,
      updateApplicationStatus,
      certificates,
      issueCertificate,
      shiftHistory,
      patientLogs,
      addPatientLog,
      equipmentRequests,
      submitEquipmentRequest,
      leaveRequests,
      submitLeaveRequest,
      onlineCount
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
