import type { CourseworkData } from '../types/profile';

interface CourseworkSectionProps {
  data: CourseworkData;
  onChange: (updated: CourseworkData) => void;
  errors: Record<string, string>;
}

export default function CourseworkSection({
  data,
  onChange,
  errors,
}: CourseworkSectionProps) {
  const handleAddCourse = () => {
    onChange({ entries: [...data.entries, ''] });
  };

  const handleRemoveCourse = (index: number) => {
    onChange({
      entries: data.entries.filter((_, i) => i !== index),
    });
  };

  const handleCourseChange = (index: number, value: string) => {
    const updated = [...data.entries];
    updated[index] = value;
    onChange({ entries: updated });
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Coursework</h2>
      <div className="dynamic-list">
        {data.entries.map((course, index) => (
          <div className="dynamic-entry" key={index}>
            <input
              type="text"
              className="form-input"
              value={course}
              onChange={(e) => handleCourseChange(index, e.target.value)}
              placeholder="Course name"
            />
            <button
              type="button"
              className="btn-remove"
              onClick={() => handleRemoveCourse(index)}
              aria-label="Remove course"
            >
              &times;
            </button>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={handleAddCourse}>
          + Add Coursework
        </button>
        {errors.coursework && (
          <span className="error-text">{errors.coursework}</span>
        )}
      </div>
    </div>
  );
}
