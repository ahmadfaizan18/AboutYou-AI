import type { ContactInfo } from '../types/profile';

interface ContactSectionProps {
  data: ContactInfo;
  onChange: (updated: ContactInfo) => void;
  errors: Record<string, string>;
}

export default function ContactSection({
  data,
  onChange,
  errors,
}: ContactSectionProps) {
  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Contact Information</h2>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="email"
          className={`form-input ${errors.email ? 'input-error' : ''}`}
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          placeholder="name@example.com"
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Phone Number</label>
        <input
          type="tel"
          className={`form-input ${errors.phone ? 'input-error' : ''}`}
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          placeholder="+1-555-0123"
        />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>
    </div>
  );
}
