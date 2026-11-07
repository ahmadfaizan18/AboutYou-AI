import type { BasicDetails } from '../types/profile';

interface BasicDetailsSectionProps {
  data: BasicDetails;
  onChange: (updated: BasicDetails) => void;
  errors: Record<string, string>;
}

export default function BasicDetailsSection({
  data,
  onChange,
  errors,
}: BasicDetailsSectionProps) {
  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Basic Details</h2>

      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          type="text"
          className={`form-input ${errors.name ? 'input-error' : ''}`}
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          placeholder="Enter your full name"
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Age</label>
        <input
          type="number"
          className={`form-input ${errors.age ? 'input-error' : ''}`}
          value={data.age}
          onChange={(e) => onChange({ ...data, age: e.target.value })}
          placeholder="Optional"
        />
        {errors.age && <span className="error-text">{errors.age}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">About</label>
        <textarea
          className={`form-textarea ${errors.about ? 'input-error' : ''}`}
          value={data.about}
          onChange={(e) => onChange({ ...data, about: e.target.value })}
          placeholder="Tell us about yourself..."
          rows={4}
        />
        {errors.about && <span className="error-text">{errors.about}</span>}
      </div>
    </div>
  );
}
