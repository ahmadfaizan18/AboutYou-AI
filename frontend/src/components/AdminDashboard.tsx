import { useState } from 'react';
import type { OwnerProfile } from '../types/profile';
import { profileService } from '../services/profileService';
import TabNavigation from './TabNavigation';
import BasicDetailsSection from './BasicDetailsSection';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import OpenSourceSection from './OpenSourceSection';
import ProfilesSection from './ProfilesSection';
import CourseworkSection from './CourseworkSection';
import CertificationsSection from './CertificationsSection';
import AchievementsSection from './AchievementsSection';
import StrengthsWeaknessesSection from './StrengthsWeaknessesSection';
import CareerObjectivesSection from './CareerObjectivesSection';
import TechnicalInterestsSection from './TechnicalInterestsSection';
import ContactSection from './ContactSection';
import SaveButton from './SaveButton';
import './AdminDashboard.css';

interface AdminDashboardProps {
  profile: OwnerProfile;
  onProfileChange: (updatedProfile: OwnerProfile) => void;
  onBackToChat: () => void;
}

const TABS: Array<{ key: string; label: string }> = [
  { key: 'basic', label: 'Basic Details' },
  { key: 'contact', label: 'Contact' },
  { key: 'education', label: 'Education' },
  { key: 'experience', label: 'Experience' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'openSource', label: 'Open Source' },
  { key: 'profiles', label: 'Profiles' },
  { key: 'coursework', label: 'Coursework' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'strengthsWeaknesses', label: 'Strengths & Weaknesses' },
  { key: 'careerObjectives', label: 'Career Objectives' },
  { key: 'technicalInterests', label: 'Technical Interests' },
];

export default function AdminDashboard({
  profile,
  onProfileChange,
  onBackToChat,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].key);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const validateProfile = (p: OwnerProfile): Record<string, string> => {
    const errors: Record<string, string> = {};

    // Open Source: GitHub Link mandatory per entry
    p.openSource.entries.forEach((entry, index) => {
      if (!entry.githubLink || !entry.githubLink.trim()) {
        errors[`openSource.entries.${index}.githubLink`] = 'GitHub link is required for open source contributions.';
      }
    });

    // Email validation if provided
    if (p.contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.contact.email)) {
      errors['contact.email'] = 'Please enter a valid email address.';
    }

    // Education: end date must be >= start date if both provided
    ['tenth', 'twelfth', 'graduation', 'postGraduation'].forEach((level) => {
      const edu = p.education[level as keyof typeof p.education];
      if (edu.startDate && edu.endDate && edu.endDate < edu.startDate) {
        errors[`education.${level}.endDate`] = 'End date must be on or after start date.';
      }
    });

    // Experience: end date must be >= start date if both provided
    p.experience.entries.forEach((exp, index) => {
      if (exp.startDate && exp.endDate && exp.endDate < exp.startDate) {
        errors[`experience.entries.${index}.endDate`] = 'End date must be on or after start date.';
      }
    });

    return errors;
  };

  const handleSave = async () => {
    const errors = validateProfile(profile);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSaveStatus('error');
      setSaveErrorMessage('Please fix the validation errors above.');
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');
    setSaveErrorMessage(null);

    try {
      await profileService.saveProfile(profile);
      setSaveStatus('success');
      setSaveErrorMessage(null);
    } catch {
      setSaveStatus('error');
      setSaveErrorMessage('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const getSectionErrors = (): Record<string, string> => {
    const prefix = activeTab;
    return Object.fromEntries(
      Object.entries(validationErrors).filter(([key]) => key.startsWith(prefix))
    );
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <button type="button" className="btn-back" onClick={onBackToChat}>
          Back to Chat
        </button>
      </div>

      <TabNavigation
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {activeTab === 'basic' && (
        <BasicDetailsSection
          data={profile.basicDetails}
          onChange={(updated) => {
            onProfileChange({ ...profile, basicDetails: updated });
          }}
          errors={getSectionErrors()}
        />
      )}
      {activeTab === 'contact' && (
        <ContactSection
          data={profile.contact}
          onChange={(updated) => {
            onProfileChange({ ...profile, contact: updated });
          }}
          errors={getSectionErrors()}
        />
      )}
      {activeTab === 'education' && (
        <EducationSection
          data={profile.education}
          onChange={(updated) => {
            onProfileChange({ ...profile, education: updated });
          }}
          errors={getSectionErrors()}
        />
      )}
      {activeTab === 'experience' && (
        <ExperienceSection
          data={profile.experience}
          onChange={(updated) => {
            onProfileChange({ ...profile, experience: updated });
          }}
          errors={getSectionErrors()}
        />
      )}
      {activeTab === 'skills' && (
        <SkillsSection
          data={profile.skills}
          onChange={(updated) => {
            onProfileChange({ ...profile, skills: updated });
          }}
          errors={getSectionErrors()}
          education={profile.education}
        />
      )}
      {activeTab === 'projects' && (
        <ProjectsSection
          data={profile.projects}
          onChange={(updated) => {
            onProfileChange({ ...profile, projects: updated });
          }}
          errors={getSectionErrors()}
        />
      )}
      {activeTab === 'openSource' && (
        <OpenSourceSection
          data={profile.openSource}
          onChange={(updated) => {
            onProfileChange({ ...profile, openSource: updated });
          }}
          errors={getSectionErrors()}
        />
      )}
      {activeTab === 'profiles' && (
        <ProfilesSection
          data={profile.profiles}
          onChange={(updated) => {
            onProfileChange({ ...profile, profiles: updated });
          }}
          errors={getSectionErrors()}
        />
      )}
      {activeTab === 'coursework' && (
        <CourseworkSection
          data={profile.coursework}
          onChange={(updated) => {
            onProfileChange({ ...profile, coursework: updated });
          }}
          errors={getSectionErrors()}
        />
      )}
      {activeTab === 'certifications' && (
        <CertificationsSection
          data={profile.certifications}
          onChange={(updated) => {
            onProfileChange({ ...profile, certifications: updated });
          }}
          errors={getSectionErrors()}
        />
      )}
      {activeTab === 'achievements' && (
        <AchievementsSection
          data={profile.achievements}
          onChange={(updated) => {
            onProfileChange({ ...profile, achievements: updated });
          }}
          errors={getSectionErrors()}
        />
      )}
      {activeTab === 'strengthsWeaknesses' && (
        <StrengthsWeaknessesSection
          data={profile.strengthsWeaknesses}
          onChange={(updated) => {
            onProfileChange({ ...profile, strengthsWeaknesses: updated });
          }}
          errors={getSectionErrors()}
        />
      )}
      {activeTab === 'careerObjectives' && (
        <CareerObjectivesSection
          data={profile.careerObjectives}
          onChange={(updated) => {
            onProfileChange({ ...profile, careerObjectives: updated });
          }}
          errors={getSectionErrors()}
        />
      )}
      {activeTab === 'technicalInterests' && (
        <TechnicalInterestsSection
          data={profile.technicalInterests}
          onChange={(updated) => {
            onProfileChange({ ...profile, technicalInterests: updated });
          }}
          errors={getSectionErrors()}
        />
      )}
      <div className="admin-actions">
        <SaveButton
          disabled={isSaving}
          isSaving={isSaving}
          onSave={handleSave}
        />
      </div>

      {saveStatus === 'success' && (
        <div className="save-status success">
          {saveErrorMessage || 'Profile saved successfully.'}
        </div>
      )}
      {saveStatus === 'error' && saveErrorMessage && (
        <div className="save-status error">
          {saveErrorMessage}
        </div>
      )}
    </div>
  );
}
