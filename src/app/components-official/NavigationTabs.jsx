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
    <nav className="bg-white shadow-sm border-b border-red-200">
      <div className="container mx-auto flex gap-4 px-6 py-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-red-600 text-white shadow-md"
                : "text-gray-700 hover:text-red-600 hover:bg-red-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
