"use client";

import { useState, useEffect } from "react";
import Residents from "../components-residents/Residents";
import HomeTab from "../components-residents/HomeTab";
import ScheduleTab from "../components-residents/ScheduleTab";
import ReportsTab from "../components-residents/ReportsTab";
import FeedbackTab from "../components-residents/FeedbackTab";
import EducationTab from "../components-residents/EducationTab";
import Profile from "../components-residents/Profile";
import EmergencyModal from "../components-residents/EmergencyModal";

// 🔹 Demo users
const demoUsers = [
  { mobile: "09123456789", password: "resident123", name: "Maria Santos", purok: "Purok 1", address: "Street 5" },
  { mobile: "09987654321", password: "juan123", name: "Juan Dela Cruz", purok: "Purok 2", address: "Street 3" },
];

// 🔹 Schedules
const schedulesByPurok = {
  "Purok 1": [
    { day: "Monday", type: "Biodegradable", time: "6:00 AM", color: "green" },
    { day: "Wednesday", type: "Recyclables", time: "6:00 AM", color: "blue" },
    { day: "Friday", type: "Residual", time: "6:00 AM", color: "gray" },
  ],
  "Purok 2": [
    { day: "Tuesday", type: "Biodegradable", time: "6:00 AM", color: "green" },
    { day: "Thursday", type: "Recyclables", time: "6:00 AM", color: "blue" },
    { day: "Saturday", type: "Residual", time: "6:00 AM", color: "gray" },
  ],
};

export default function ResidentsPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [showProfile, setShowProfile] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [feedback, setFeedback] = useState([]);

  // Load from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const data = localStorage.getItem("residentData");
    if (data) {
      const parsed = JSON.parse(data);
      setCurrentUser(parsed.user);
      setReports(parsed.reports || []);
      setFeedback(parsed.feedback || []);
    } else {
      setCurrentUser({ name: "Guest User", purok: "Purok 1", mobile: "Guest", address: "Demo" });
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (currentUser) {
      localStorage.setItem("residentData", JSON.stringify({ user: currentUser, reports, feedback }));
    }
  }, [currentUser, reports, feedback]);

  return (
    <Residents>
      <main className="px-4 py-6 space-y-6">
        {activeTab === "home" && <HomeTab currentUser={currentUser} setActiveTab={setActiveTab} />}
        {activeTab === "schedule" && <ScheduleTab currentUser={currentUser} schedulesByPurok={schedulesByPurok} />}
        {activeTab === "reports" && <ReportsTab reports={reports} setReports={setReports} />}
        {activeTab === "feedback" && <FeedbackTab feedback={feedback} setFeedback={setFeedback} />}
        {activeTab === "education" && <EducationTab />}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
        {[
          { key: "home", label: "Home", icon: "🏠" },
          { key: "schedule", label: "Schedule", icon: "📅" },
          { key: "reports", label: "Reports", icon: "📢" },
          { key: "feedback", label: "Feedback", icon: "💬" },
          { key: "education", label: "Education", icon: "📚" },
        ].map(tab => (
          <button
            key={tab.key}
            className={`flex flex-col items-center p-2 ${
              activeTab === tab.key ? "text-indigo-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span>{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Modals */}
      {showProfile && <Profile user={currentUser} setUser={setCurrentUser} onClose={() => setShowProfile(false)} />}
      {showEmergency && <EmergencyModal onClose={() => setShowEmergency(false)} />}
    </Residents>
  );
}
