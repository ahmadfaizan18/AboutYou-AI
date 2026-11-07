import type { ProjectsData, ProjectEntry, TechStackEntry } from '../types/profile';

interface ProjectsSectionProps {
  data: ProjectsData;
  onChange: (updated: ProjectsData) => void;
  errors: Record<string, string>;
}

function createEmptyProject(): ProjectEntry {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    link: '',
    techStack: [],
  };
}

function createEmptyTechStack(): TechStackEntry {
  return { id: crypto.randomUUID(), name: '' };
}

export default function ProjectsSection({
  data,
  onChange,
  errors,
}: ProjectsSectionProps) {
  const handleAddProject = () => {
    onChange({ entries: [...data.entries, createEmptyProject()] });
  };

  const handleRemoveProject = (id: string) => {
    onChange({
      entries: data.entries.filter((e) => e.id !== id),
    });
  };

  const handleProjectChange = (id: string, field: keyof ProjectEntry, value: string | TechStackEntry[]) => {
    onChange({
      entries: data.entries.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  const handleAddTechStack = (projectId: string) => {
    onChange({
      entries: data.entries.map((e) =>
        e.id === projectId
          ? { ...e, techStack: [...e.techStack, createEmptyTechStack()] }
          : e
      ),
    });
  };

  const handleRemoveTechStack = (projectId: string, techId: string) => {
    onChange({
      entries: data.entries.map((e) =>
        e.id === projectId
          ? { ...e, techStack: e.techStack.filter((t) => t.id !== techId) }
          : e
      ),
    });
  };

  const handleTechStackChange = (projectId: string, techId: string, field: 'name', value: string) => {
    onChange({
      entries: data.entries.map((e) => {
        if (e.id !== projectId) return e;
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
      <h2 className="admin-section-title">Projects</h2>
      <div className="dynamic-list">
        {data.entries.map((project) => (
          <div className="dynamic-entry" key={project.id}>
            <div className="entry-header">
              <h4 className="entry-title">Project</h4>
              <button
                type="button"
                className="btn-remove"
                onClick={() => handleRemoveProject(project.id)}
                aria-label="Remove project"
              >
                &times;
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={project.name}
                  onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                  placeholder="Project name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Project Link (Optional)</label>
                <input
                  type="url"
                  className="form-input"
                  value={project.link}
                  onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                value={project.description}
                onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                placeholder="Describe your project..."
                rows={3}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tech Stack</label>
              <div className="tech-stack-list">
                {project.techStack.map((tech) => (
                  <div className="tech-stack-entry" key={tech.id}>
                    <input
                      type="text"
                      className="form-input"
                      value={tech.name}
                      onChange={(e) =>
                        handleTechStackChange(project.id, tech.id, 'name', e.target.value)
                      }
                      placeholder="Technology"
                    />
                    <button
                      type="button"
                      className="btn-remove-small"
                      onClick={() => handleRemoveTechStack(project.id, tech.id)}
                      aria-label="Remove tech stack entry"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn-add-small"
                  onClick={() => handleAddTechStack(project.id)}
                >
                  + Add Tech
                </button>
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={handleAddProject}>
          + Add Project
        </button>
        {errors.projects && <span className="error-text">{errors.projects}</span>}
      </div>
    </div>
  );
}
