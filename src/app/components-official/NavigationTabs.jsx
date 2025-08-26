"use client";

export default function NavigationTabs({ activeTab, onTabChange }) {
  const tabs = [
    "Dashboard",
    "Schedule",
    "Routes",
    "SMS Alerts",
    "Reports",
    "Education",
    "Analytics",
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex gap-4 px-6 py-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-indigo-500 text-white shadow-md"
                : "text-gray-600 hover:text-indigo-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
