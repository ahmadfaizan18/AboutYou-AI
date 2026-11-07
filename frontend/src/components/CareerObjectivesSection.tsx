import type { CareerObjectives } from '../types/profile';

interface CareerObjectivesSectionProps {
  data: CareerObjectives;
  onChange: (updated: CareerObjectives) => void;
  errors: Record<string, string>;
}

export default function CareerObjectivesSection({
  data,
  onChange,
  errors,
}: CareerObjectivesSectionProps) {
  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Career Objectives</h2>

      <div className="form-group">
        <label className="form-label">Career Objectives</label>
        <textarea
          className={`form-textarea ${errors.objectives ? 'input-error' : ''}`}
          value={data.objectives}
          onChange={(e) => onChange({ ...data, objectives: e.target.value })}
          placeholder="What are your career goals?"
          rows={4}
        />
        {errors.objectives && <span className="error-text">{errors.objectives}</span>}
      </div>
    </div>
  );
}
