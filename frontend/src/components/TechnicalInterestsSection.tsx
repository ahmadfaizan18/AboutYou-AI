import type { TechnicalInterestsData, TechnicalInterestEntry } from '../types/profile';

interface TechnicalInterestsSectionProps {
  data: TechnicalInterestsData;
  onChange: (updated: TechnicalInterestsData) => void;
  errors: Record<string, string>;
}

function createEmptyEntry(): TechnicalInterestEntry {
  return {
    id: crypto.randomUUID(),
    name: '',
  };
}

export default function TechnicalInterestsSection({
  data,
  onChange,
  errors,
}: TechnicalInterestsSectionProps) {
  const handleAddEntry = () => {
    onChange({ entries: [...data.entries, createEmptyEntry()] });
  };

  const handleRemoveEntry = (id: string) => {
    onChange({
      entries: data.entries.filter((e) => e.id !== id),
    });
  };

  const handleEntryChange = (id: string, field: keyof TechnicalInterestEntry, value: string) => {
    onChange({
      entries: data.entries.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Technical Interests</h2>
      <div className="dynamic-list">
        {data.entries.map((interest) => (
          <div className="dynamic-entry" key={interest.id}>
            <input
              type="text"
              className="form-input"
              value={interest.name}
              onChange={(e) =>
                handleEntryChange(interest.id, 'name', e.target.value)
              }
              placeholder="Technical interest"
            />
            <button
              type="button"
              className="btn-remove"
              onClick={() => handleRemoveEntry(interest.id)}
              aria-label="Remove technical interest"
            >
              &times;
            </button>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={handleAddEntry}>
          + Add Technical Interest
        </button>
        {errors.technicalInterests && (
          <span className="error-text">{errors.technicalInterests}</span>
        )}
      </div>
    </div>
  );
}
