import { useState } from 'react';
import MainChatBox from './components/main-chatbox';
import AdminDashboard from './components/AdminDashboard';
import type { OwnerProfile } from './types/profile';

function getInitialProfile(): OwnerProfile {
  return {
    basicDetails: { name: '', age: '', about: '' },
    education: {
      tenth: { schoolName: '', startDate: '', endDate: null, percentage: '' },
      twelfth: { schoolName: '', startDate: '', endDate: null, percentage: '' },
      graduation: { schoolName: '', startDate: '', endDate: null, percentage: '' },
      postGraduation: { schoolName: '', startDate: '', endDate: null, percentage: '' },
    },
    experience: { entries: [] },
    skills: { items: [] },
    projects: { entries: [] },
    openSource: { entries: [] },
    profiles: { leetcode: '', github: '', linkedin: '', codechef: '' },
    coursework: { entries: [] },
    certifications: { entries: [] },
    achievements: { entries: [] },
    strengthsWeaknesses: { strengths: '', weaknesses: '' },
    careerObjectives: { objectives: '' },
    technicalInterests: { entries: [] },
    contact: { email: '', phone: '' },
  };
}

function App() {
  const [viewMode, setViewMode] = useState<'chat' | 'dashboard'>('chat');
  const [profileDraft, setProfileDraft] = useState<OwnerProfile>(getInitialProfile());

  const handleOpenDashboard = () => {
    setViewMode('dashboard');
  };

  const handleBackToChat = () => {
    setViewMode('chat');
  };

  const handleProfileChange = (updatedProfile: OwnerProfile) => {
    setProfileDraft(updatedProfile);
  };

  if (viewMode === 'dashboard') {
    return (
      <AdminDashboard
        profile={profileDraft}
        onProfileChange={handleProfileChange}
        onBackToChat={handleBackToChat}
      />
    );
  }

  return <MainChatBox onOpenDashboard={handleOpenDashboard} />;
}

export default App;
