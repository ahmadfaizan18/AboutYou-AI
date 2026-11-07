import type { ExperienceData, ExperienceEntry } from '../types/profile';

interface ExperienceSectionProps {
  data: ExperienceData;
  onChange: (updated: ExperienceData) => void;
  errors: Record<string, string>;
}

function createEmptyEntry(): ExperienceEntry {
  return {
    id: crypto.randomUUID(),
    companyName: '',
    startDate: '',
    endDate: null,
    isCurrent: false,
    role: '',
    responsibilities: '',
  };
}

export default function ExperienceSection({
  data,
  onChange,
  errors,
}: ExperienceSectionProps) {
  const handleAddEntry = () => {
    onChange({ entries: [...data.entries, createEmptyEntry()] });
  };

  const handleRemoveEntry = (id: string) => {
    onChange({
      entries: data.entries.filter((e) => e.id !== id),
    });
  };

  const handleEntryChange = (id: string, field: keyof ExperienceEntry, value: string | null) => {
    onChange({
      entries: data.entries.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  const handleToggleCurrent = (id: string) => {
    const entry = data.entries.find((e) => e.id === id);
    if (!entry) return;
    const isCurrent = !entry.isCurrent;
    onChange({
      entries: data.entries.map((e) =>
        e.id === id ? { ...e, isCurrent, endDate: isCurrent ? null : e.endDate } : e
      ),
    });
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Experience</h2>
      <div className="dynamic-list">
        {data.entries.map((entry) => (
          <div className="dynamic-entry" key={entry.id}>
            <div className="entry-header">
              <h4 className="entry-title">Experience Entry</h4>
              <button
                type="button"
                className="btn-remove"
                onClick={() => handleRemoveEntry(entry.id)}
                aria-label="Remove experience entry"
              >
                &times;
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className={`form-input ${errors.company ? 'input-error' : ''}`}
                  value={entry.companyName}
                  onChange={(e) => handleEntryChange(entry.id, 'companyName', e.target.value)}
                  placeholder="Company name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-input"
                  value={entry.role}
                  onChange={(e) => handleEntryChange(entry.id, 'role', e.target.value)}
                  placeholder="Job title"
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={entry.startDate}
                  onChange={(e) => handleEntryChange(entry.id, 'startDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className={`form-input ${entry.isCurrent ? 'input-disabled' : ''}`}
                  value={entry.endDate ?? ''}
                  onChange={(e) =>
                    handleEntryChange(entry.id, 'endDate', e.target.value || null)
                  }
                  disabled={entry.isCurrent}
                />
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    checked={entry.isCurrent}
                    onChange={() => handleToggleCurrent(entry.id)}
                  />
                  Currently working here
                </label>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Responsibilities</label>
              <textarea
                className="form-textarea"
                value={entry.responsibilities}
                onChange={(e) =>
                  handleEntryChange(entry.id, 'responsibilities', e.target.value)
                }
                placeholder="Key responsibilities"
                rows={3}
              />
            </div>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={handleAddEntry}>
          + Add Experience
        </button>
        {errors.experience && <span className="error-text">{errors.experience}</span>}
      </div>
    </div>
  );
}
