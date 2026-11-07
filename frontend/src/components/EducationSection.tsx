import type { EducationData, EducationCategory } from '../types/profile';

interface EducationSectionProps {
  data: EducationData;
  onChange: (updated: EducationData) => void;
  errors: Record<string, string>;
}

const CATEGORIES: Array<{
  key: keyof EducationData;
  label: string;
  isBasic: boolean;
}> = [
  { key: 'tenth', label: '10th', isBasic: true },
  { key: 'twelfth', label: '12th', isBasic: true },
  { key: 'graduation', label: 'Graduation', isBasic: false },
  { key: 'postGraduation', label: 'Post-graduation', isBasic: false },
];

export default function EducationSection({
  data,
  onChange,
  errors,
}: EducationSectionProps) {
  const updateCategory = (key: keyof EducationData, field: keyof EducationCategory, value: string) => {
    onChange({
      ...data,
      [key]: { ...data[key], [field]: value },
    });
  };

  const updateEndDate = (key: keyof EducationData, endDate: string | null) => {
    onChange({
      ...data,
      [key]: { ...data[key], endDate },
    });
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Education</h2>
      {CATEGORIES.map(({ key, label, isBasic }) => {
        const edu = data[key];
        return (
          <div className="education-card" key={key}>
            <h3 className="education-category-label">{label}</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">School / College Name</label>
                <input
                  type="text"
                  className={`form-input ${errors[`${key}.schoolName`] ? 'input-error' : ''}`}
                  value={edu.schoolName}
                  onChange={(e) => updateCategory(key, 'schoolName', e.target.value)}
                  placeholder="Institution name"
                />
                {errors[`${key}.schoolName`] && (
                  <span className="error-text">{errors[`${key}.schoolName`]}</span>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className={`form-input ${errors[`${key}.startDate`] ? 'input-error' : ''}`}
                  value={edu.startDate}
                  onChange={(e) => updateCategory(key, 'startDate', e.target.value)}
                />
                {errors[`${key}.startDate`] && (
                  <span className="error-text">{errors[`${key}.startDate`]}</span>
                )}
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className={`form-input ${errors[`${key}.endDate`] ? 'input-error' : ''}`}
                  value={edu.endDate ?? ''}
                  onChange={(e) => updateEndDate(key, e.target.value || null)}
                />
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    checked={edu.endDate === null}
                    onChange={() => updateEndDate(key, null)}
                  />
                  Ongoing
                </label>
                {errors[`${key}.endDate`] && (
                  <span className="error-text">{errors[`${key}.endDate`]}</span>
                )}
              </div>
              {isBasic ? (
                <div className="form-group">
                  <label className="form-label">Board</label>
                  <input
                    type="text"
                    className={`form-input ${errors[`${key}.board`] ? 'input-error' : ''}`}
                    value={edu.board ?? ''}
                    onChange={(e) => updateCategory(key, 'board', e.target.value)}
                    placeholder="e.g. CBSE, ICSE, State Board"
                  />
                  {errors[`${key}.board`] && (
                    <span className="error-text">{errors[`${key}.board`]}</span>
                  )}
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label">Degree Name</label>
                    <input
                      type="text"
                      className={`form-input ${errors[`${key}.degreeName`] ? 'input-error' : ''}`}
                      value={edu.degreeName ?? ''}
                      onChange={(e) => updateCategory(key, 'degreeName', e.target.value)}
                      placeholder="e.g. B.Tech, B.Com, M.Sc."
                    />
                    {errors[`${key}.degreeName`] && (
                      <span className="error-text">{errors[`${key}.degreeName`]}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Branch Name</label>
                    <input
                      type="text"
                      className={`form-input ${errors[`${key}.branchName`] ? 'input-error' : ''}`}
                      value={edu.branchName ?? ''}
                      onChange={(e) => updateCategory(key, 'branchName', e.target.value)}
                      placeholder="e.g. Computer Science"
                    />
                    {errors[`${key}.branchName`] && (
                      <span className="error-text">{errors[`${key}.branchName`]}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Specialization (Optional)</label>
                    <input
                      type="text"
                      className={`form-input ${errors[`${key}.specialization`] ? 'input-error' : ''}`}
                      value={edu.specialization ?? ''}
                      onChange={(e) => updateCategory(key, 'specialization', e.target.value)}
                      placeholder="Optional"
                    />
                    {errors[`${key}.specialization`] && (
                      <span className="error-text">{errors[`${key}.specialization`]}</span>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Percentage / GPA</label>
              <input
                type="text"
                className={`form-input ${errors[`${key}.percentage`] ? 'input-error' : ''}`}
                value={edu.percentage}
                onChange={(e) => updateCategory(key, 'percentage', e.target.value)}
                placeholder="e.g. 85% or 8.5 CGPA"
              />
              {errors[`${key}.percentage`] && (
                <span className="error-text">{errors[`${key}.percentage`]}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
