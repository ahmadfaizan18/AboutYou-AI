import type { ProfileLinks } from '../types/profile';

interface ProfilesSectionProps {
  data: ProfileLinks;
  onChange: (updated: ProfileLinks) => void;
  errors: Record<string, string>;
}

const PLATFORMS: Array<{ key: keyof ProfileLinks; label: string; placeholder: string }> = [
  { key: 'leetcode', label: 'LeetCode Link', placeholder: 'https://leetcode.com/user/' },
  { key: 'github', label: 'GitHub Link', placeholder: 'https://github.com/' },
  { key: 'linkedin', label: 'LinkedIn Link', placeholder: 'https://linkedin.com/in/' },
  { key: 'codechef', label: 'CodeChef Link', placeholder: 'https://www.codechef.com/users/' },
];

export default function ProfilesSection({
  data,
  onChange,
  errors,
}: ProfilesSectionProps) {
  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Coding and Professional Profiles</h2>
      <div className="form-grid">
        {PLATFORMS.map(({ key, label, placeholder }) => {
          const value = data[key];
          const error = errors[key];
          return (
            <div className="form-group" key={key}>
              <label className="form-label">{label}</label>
              <input
                type="url"
                className={`form-input ${error ? 'input-error' : ''}`}
                value={value}
                onChange={(e) =>
                  onChange({ ...data, [key]: e.target.value })
                }
                placeholder={placeholder}
              />
              {error && <span className="error-text">{error}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
