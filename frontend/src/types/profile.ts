// ===== Shared =====
export interface TechStackEntry {
  id: string;
  name: string;
}

// ===== Basic Details =====
export interface BasicDetails {
  name: string;
  age: string;       // optional
  about: string;     // optional
}

// ===== Education (4 fixed categories, each optional) =====
export interface EducationCategory {
  schoolName: string;     // optional
  board?: string;         // 10th / 12th only
  degreeName?: string;    // Graduation / PG only
  branchName?: string;    // Graduation / PG only
  specialization?: string;// Graduation / PG only, optional
  startDate: string;      // optional
  endDate: string | null; // null = ongoing
  percentage: string;     // optional
}

export interface EducationData {
  tenth: EducationCategory;
  twelfth: EducationCategory;
  graduation: EducationCategory;
  postGraduation: EducationCategory;
}

// ===== Experience =====
export interface ExperienceEntry {
  id: string;
  companyName: string;    // optional
  startDate: string;      // optional
  endDate: string | null; // null = ongoing / currently working
  isCurrent: boolean;     // "Currently working here" checkbox
  role: string;           // optional
  responsibilities: string; // optional
}

export interface ExperienceData {
  entries: ExperienceEntry[];
}

// ===== Skills =====
// category is NOT stored - it is derived from education degree
export interface SkillsData {
  items: string[];        // only the skill names
}

// ===== Projects (stable IDs) =====
export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  link: string;
  techStack: TechStackEntry[];
}

export interface ProjectsData {
  entries: ProjectEntry[];
}

// ===== Open Source (stable IDs) =====
export interface OpenSourceEntry {
  id: string;
  name: string;
  description: string;
  githubLink: string;     // mandatory per entry
  techStack: TechStackEntry[];
}

export interface OpenSourceData {
  entries: OpenSourceEntry[];
}

// ===== Profiles =====
export interface ProfileLinks {
  leetcode: string;
  github: string;
  linkedin: string;
  codechef: string;
}

// ===== Coursework (simple string array) =====
export interface CourseworkData {
  entries: string[];
}

// ===== Certifications (stable IDs) =====
export interface CertificationEntry {
  id: string;
  name: string;
  description: string;
}

export interface CertificationsData {
  entries: CertificationEntry[];
}

// ===== Achievements (simple string array) =====
export interface AchievementsData {
  entries: string[];
}

// ===== Strengths & Weaknesses =====
export interface StrengthsWeaknesses {
  strengths: string;
  weaknesses: string;
}

// ===== Career Objectives =====
export interface CareerObjectives {
  objectives: string;
}

// ===== Technical Interests (stable IDs) =====
export interface TechnicalInterestEntry {
  id: string;
  name: string;
}

export interface TechnicalInterestsData {
  entries: TechnicalInterestEntry[];
}

// ===== Contact =====
export interface ContactInfo {
  email: string;
  phone: string;
}

// ===== Aggregate Profile =====
export interface OwnerProfile {
  basicDetails: BasicDetails;
  education: EducationData;
  experience: ExperienceData;
  skills: SkillsData;
  projects: ProjectsData;
  openSource: OpenSourceData;
  profiles: ProfileLinks;
  coursework: CourseworkData;
  certifications: CertificationsData;
  achievements: AchievementsData;
  strengthsWeaknesses: StrengthsWeaknesses;
  careerObjectives: CareerObjectives;
  technicalInterests: TechnicalInterestsData;
  contact: ContactInfo;
}
