import type { AchievementsData } from '../types/profile';

interface AchievementsSectionProps {
  data: AchievementsData;
  onChange: (updated: AchievementsData) => void;
  errors: Record<string, string>;
}

export default function AchievementsSection({
  data,
  onChange,
  errors,
}: AchievementsSectionProps) {
  const handleAddAchievement = () => {
    onChange({ entries: [...data.entries, ''] });
  };

  const handleRemoveAchievement = (index: number) => {
    onChange({
      entries: data.entries.filter((_, i) => i !== index),
    });
  };

  const handleAchievementChange = (index: number, value: string) => {
    const updated = [...data.entries];
    updated[index] = value;
    onChange({ entries: updated });
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Achievements</h2>
      <div className="dynamic-list">
        {data.entries.map((achievement, index) => (
          <div className="dynamic-entry" key={index}>
            <input
              type="text"
              className="form-input"
              value={achievement}
              onChange={(e) => handleAchievementChange(index, e.target.value)}
              placeholder="Achievement"
            />
            <button
              type="button"
              className="btn-remove"
              onClick={() => handleRemoveAchievement(index)}
              aria-label="Remove achievement"
            >
              &times;
            </button>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={handleAddAchievement}>
          + Add Achievement
        </button>
        {errors.achievements && (
          <span className="error-text">{errors.achievements}</span>
        )}
      </div>
    </div>
  );
}
