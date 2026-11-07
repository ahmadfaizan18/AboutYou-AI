import type { OpenSourceData, OpenSourceEntry, TechStackEntry } from '../types/profile';

interface OpenSourceSectionProps {
  data: OpenSourceData;
  onChange: (updated: OpenSourceData) => void;
  errors: Record<string, string>;
}

function createEmptyEntry(): OpenSourceEntry {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    githubLink: '',
    techStack: [],
  };
}

function createEmptyTechStack(): TechStackEntry {
  return { id: crypto.randomUUID(), name: '' };
}

export default function OpenSourceSection({
  data,
  onChange,
  errors,
}: OpenSourceSectionProps) {
  const handleAddEntry = () => {
    onChange({ entries: [...data.entries, createEmptyEntry()] });
  };

  const handleRemoveEntry = (id: string) => {
    onChange({
      entries: data.entries.filter((e) => e.id !== id),
    });
  };

  const handleEntryChange = (id: string, field: keyof OpenSourceEntry, value: string | TechStackEntry[]) => {
    onChange({
      entries: data.entries.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  const handleAddTechStack = (entryId: string) => {
    onChange({
      entries: data.entries.map((e) =>
        e.id === entryId
          ? { ...e, techStack: [...e.techStack, createEmptyTechStack()] }
          : e
      ),
    });
  };

  const handleRemoveTechStack = (entryId: string, techId: string) => {
    onChange({
      entries: data.entries.map((e) =>
        e.id === entryId
          ? { ...e, techStack: e.techStack.filter((t) => t.id !== techId) }
          : e
      ),
    });
  };

  const handleTechStackChange = (entryId: string, techId: string, field: 'name', value: string) => {
    onChange({
      entries: data.entries.map((e) => {
        if (e.id !== entryId) return e;
        return {
          ...e,
          techStack: e.techStack.map((t) =>
            t.id === techId ? { ...t, [field]: value } : t
          ),
        };
      }),
    });
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Open Source Contributions</h2>
      <div className="dynamic-list">
        {data.entries.map((entry) => (
          <div className="dynamic-entry" key={entry.id}>
            <div className="entry-header">
              <h4 className="entry-title">Contribution</h4>
              <button
                type="button"
                className="btn-remove"
                onClick={() => handleRemoveEntry(entry.id)}
                aria-label="Remove open source entry"
              >
                &times;
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Contribution Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={entry.name}
                  onChange={(e) => handleEntryChange(entry.id, 'name', e.target.value)}
                  placeholder="Project or repository name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">GitHub Link (Mandatory)</label>
                <input
                  type="url"
                  className={`form-input ${errors.github ? 'input-error' : ''}`}
                  value={entry.githubLink}
                  onChange={(e) => handleEntryChange(entry.id, 'githubLink', e.target.value)}
                  placeholder="https://github.com/user/repo"
                />
                {errors.github && <span className="error-text">{errors.github}</span>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                value={entry.description}
                onChange={(e) => handleEntryChange(entry.id, 'description', e.target.value)}
                placeholder="Describe your contribution..."
                rows={3}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tech Stack</label>
              <div className="tech-stack-list">
                {entry.techStack.map((tech) => (
                  <div className="tech-stack-entry" key={tech.id}>
                    <input
                      type="text"
                      className="form-input"
                      value={tech.name}
                      onChange={(e) =>
                        handleTechStackChange(entry.id, tech.id, 'name', e.target.value)
                      }
                      placeholder="Technology"
                    />
                    <button
                      type="button"
                      className="btn-remove-small"
                      onClick={() => handleRemoveTechStack(entry.id, tech.id)}
                      aria-label="Remove tech stack entry"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn-add-small"
                  onClick={() => handleAddTechStack(entry.id)}
                >
                  + Add Tech
                </button>
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={handleAddEntry}>
          + Add Open Source Contribution
        </button>
        {errors.openSource && <span className="error-text">{errors.openSource}</span>}
      </div>
    </div>
  );
}
