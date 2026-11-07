interface TabItem {
  key: string;
  label: string;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export default function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className="tab-navigation">
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.key}
          className={`tab-btn ${activeTab === tab.key ? 'tab-active' : ''}`}
          onClick={() => onTabChange(tab.key)}
          aria-pressed={activeTab === tab.key}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
