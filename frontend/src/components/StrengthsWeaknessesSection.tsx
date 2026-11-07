import type { StrengthsWeaknesses } from '../types/profile';

interface StrengthsWeaknessesSectionProps {
  data: StrengthsWeaknesses;
  onChange: (updated: StrengthsWeaknesses) => void;
  errors: Record<string, string>;
}

export default function StrengthsWeaknessesSection({
  data,
  onChange,
  errors,
}: StrengthsWeaknessesSectionProps) {
  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Strengths and Weaknesses</h2>

      <div className="form-group">
        <label className="form-label">Strengths</label>
        <textarea
          className={`form-textarea ${errors.strengths ? 'input-error' : ''}`}
          value={data.strengths}
          onChange={(e) => onChange({ ...data, strengths: e.target.value })}
          placeholder="What are your strengths?"
          rows={3}
        />
        {errors.strengths && <span className="error-text">{errors.strengths}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Weaknesses</label>
        <textarea
          className={`form-textarea ${errors.weaknesses ? 'input-error' : ''}`}
          value={data.weaknesses}
          onChange={(e) => onChange({ ...data, weaknesses: e.target.value })}
          placeholder="What are your weaknesses?"
          rows={3}
        />
        {errors.weaknesses && <span className="error-text">{errors.weaknesses}</span>}
      </div>
    </div>
  );
}
