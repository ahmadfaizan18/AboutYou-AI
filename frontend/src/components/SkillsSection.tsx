import type { EducationData, SkillsData } from '../types/profile';

interface SkillsSectionProps {
  data: SkillsData;
  onChange: (updated: SkillsData) => void;
  errors: Record<string, string>;
  education: EducationData;
}

function getSkillsCategory(education: EducationData): 'technical' | 'general' {
  const gradDegree = education.graduation.degreeName?.toLowerCase() ?? '';
  const pgDegree = education.postGraduation.degreeName?.toLowerCase() ?? '';
  const technicalDegrees = ['b.tech', 'bca', 'mca'];
  if (gradDegree && technicalDegrees.includes(gradDegree)) return 'technical';
  if (pgDegree && technicalDegrees.includes(pgDegree)) return 'technical';
  return 'general';
}

export default function SkillsSection({
  data,
  onChange,
  errors,
  education,
}: SkillsSectionProps) {
  const category = getSkillsCategory(education);
  const categoryLabel = category === 'technical' ? 'Technical Skills' : 'Skills';

  const handleAddSkill = () => {
    onChange({ items: [...data.items, ''] });
  };

  const handleRemoveSkill = (index: number) => {
    onChange({
      items: data.items.filter((_, i) => i !== index),
    });
  };

  const handleSkillChange = (index: number, value: string) => {
    const updated = [...data.items];
    updated[index] = value;
    onChange({ items: updated });
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">{categoryLabel}</h2>
      <p className="section-hint">
        Category derived from your education degree.{' '}
        {category === 'technical'
          ? 'B.Tech / BCA / MCA detected.'
          : 'Degree is not B.Tech, BCA, or MCA.'}
      </p>
      <div className="dynamic-list">
        {data.items.map((skill, index) => (
          <div className="dynamic-entry" key={index}>
            <input
              type="text"
              className="form-input"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder="Skill name"
            />
            <button
              type="button"
              className="btn-remove"
              onClick={() => handleRemoveSkill(index)}
              aria-label="Remove skill"
            >
              &times;
            </button>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={handleAddSkill}>
          + Add Skill
        </button>
        {errors.skills && <span className="error-text">{errors.skills}</span>}
      </div>
    </div>
  );
}
