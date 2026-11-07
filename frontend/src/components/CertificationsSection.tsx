import type { CertificationsData, CertificationEntry } from '../types/profile';

interface CertificationsSectionProps {
  data: CertificationsData;
  onChange: (updated: CertificationsData) => void;
  errors: Record<string, string>;
}

function createEmptyEntry(): CertificationEntry {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
  };
}

export default function CertificationsSection({
  data,
  onChange,
  errors,
}: CertificationsSectionProps) {
  const handleAddEntry = () => {
    onChange({ entries: [...data.entries, createEmptyEntry()] });
  };

  const handleRemoveEntry = (id: string) => {
    onChange({
      entries: data.entries.filter((e) => e.id !== id),
    });
  };

  const handleEntryChange = (id: string, field: keyof CertificationEntry, value: string) => {
    onChange({
      entries: data.entries.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Certifications</h2>
      <div className="dynamic-list">
        {data.entries.map((cert) => (
          <div className="dynamic-entry" key={cert.id}>
            <div className="entry-header">
              <h4 className="entry-title">Certification</h4>
              <button
                type="button"
                className="btn-remove"
                onClick={() => handleRemoveEntry(cert.id)}
                aria-label="Remove certification"
              >
                &times;
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Certification Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={cert.name}
                  onChange={(e) => handleEntryChange(cert.id, 'name', e.target.value)}
                  placeholder="Certification name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={cert.description}
                  onChange={(e) =>
                    handleEntryChange(cert.id, 'description', e.target.value)
                  }
                  placeholder="Optional description"
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={handleAddEntry}>
          + Add Certification
        </button>
        {errors.certifications && <span className="error-text">{errors.certifications}</span>}
      </div>
    </div>
  );
}
