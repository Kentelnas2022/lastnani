"use client";

export default function HomeTab({ currentUser, setActiveTab }) {
  return (
    <div className="space-y-6">
      {/* Greeting / Welcome */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-bold text-gray-800">
          Welcome back, {currentUser?.name || "Resident"} 👋
        </h2>
        <p className="text-sm text-gray-500">Manage your waste collection easily.</p>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab("schedule")}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow hover:bg-indigo-50"
          >
            📅
            <span className="text-xs mt-1">Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow hover:bg-indigo-50"
          >
            📢
            <span className="text-xs mt-1">Reports</span>
          </button>

          <button
            onClick={() => setActiveTab("feedback")}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow hover:bg-indigo-50"
          >
            💬
            <span className="text-xs mt-1">Feedback</span>
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow hover:bg-indigo-50"
          >
            📚
            <span className="text-xs mt-1">Education</span>
          </button>
        </div>
      </div>
    </div>
  );
}
