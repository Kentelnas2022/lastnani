"use client";
import {
  CalendarDaysIcon,
  MegaphoneIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"; // ✅ outline version

export default function HomeTab({ currentUser, setActiveTab }) {
  const quickActions = [
    {
      id: "schedule",
      label: "Schedule",
      icon: <CalendarDaysIcon className="w-8 h-8 text-indigo-600" />,
    },
    {
      id: "reports",
      label: "Reports",
      icon: <MegaphoneIcon className="w-8 h-8 text-indigo-600" />,
    },
    {
      id: "feedback",
      label: "Feedback",
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8 text-indigo-600" />,
    },
    {
      id: "education",
      label: "Education",
      icon: <BookOpenIcon className="w-8 h-8 text-indigo-600" />,
    },
  ];

  return (
    <div className="space-y-8 w-full">
      {/* Greeting / Welcome */}
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-700 rounded-2xl shadow-lg p-5 sm:p-8 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent"></div>

        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold relative z-10">
          Welcome back, {currentUser?.name || "Resident"} 👋
        </h2>
        <p className="text-sm sm:text-base md:text-lg opacity-90 relative z-10 mt-1">
          Manage your waste collection easily and stay updated.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="w-full">
        <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => setActiveTab(action.id)}
              className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 hover:bg-indigo-50 transition-all duration-300 ease-in-out w-full"
            >
              {action.icon}
              <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 mt-2">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
