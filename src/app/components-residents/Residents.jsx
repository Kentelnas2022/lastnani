"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient"; // <-- make sure this exists
import HomeTab from "./HomeTab";
import ScheduleTab from "./ScheduleTab";
import ReportsTab from "./ReportsTab";
import FeedbackTab from "./FeedbackTab";
import EducationTab from "./EducationTab";
import ProfileModal from "./ProfileModal";
import EmergencyModal from "./EmergencyModal";

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
  "Purok 3": [
    { day: "Monday", type: "Biodegradable", time: "6:30 AM", color: "green" },
    { day: "Thursday", type: "Recyclables", time: "6:30 AM", color: "blue" },
    { day: "Saturday", type: "Residual", time: "6:30 AM", color: "gray" },
  ],
  Commercial: [
    { day: "Tuesday", type: "Mixed Waste", time: "5:00 AM", color: "yellow" },
    { day: "Friday", type: "Mixed Waste", time: "5:00 AM", color: "yellow" },
  ],
};

export default function Residents() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [showProfile, setShowProfile] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Check session & load resident profile
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
        return;
      }

      const { data: resident, error } = await supabase
        .from("residents")
        .select("*")
        .eq("user_id", data.session.user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching resident:", error.message);
      }

      if (resident) {
        setCurrentUser(resident);

        // Role check: if the user is not an official, redirect to login
        if (resident.role !== 'official') {
          console.warn("⚠️ User is not authorized to access this page.");
          router.push("/login");
        }
      } else {
        console.warn("⚠️ No resident found for this user. Using fallback profile.");
        setCurrentUser({
          name: "Guest",
          purok: "Purok 1",
          mobile: "N/A",
          address: "N/A",
        });
      }

      setLoading(false);
    };
    loadUser();
  }, [router]);

  const getNextCollection = () => {
    if (!currentUser) return null;
    const schedule = schedulesByPurok[currentUser.purok] || [];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();

    for (let i = 0; i < 7; i++) {
      const checkDay = (today + i) % 7;
      const found = schedule.find((s) => s.day === days[checkDay]);
      if (found) {
        return {
          ...found,
          label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : found.day,
        };
      }
    }
    return null;
  };

  const nextCollection = getNextCollection();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 pb-6 pt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">🏘️</div>
            <div>
              <h1 className="text-xl font-bold">Hello, {currentUser?.name?.split(" ")[0]}</h1>
              <p className="text-white/80 text-sm">{currentUser?.purok}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowProfile(true)}
              className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
            >
              👤
            </button>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/login");
              }}
              className="px-3 py-1 bg-red-500 text-white rounded-xl text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {nextCollection && (
          <div className="bg-white/95 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between text-gray-800">
              <div>
                <p className="text-sm text-gray-600">Next Collection</p>
                <p className="text-xl font-bold text-indigo-600">
                  {nextCollection.label}, {nextCollection.time}
                </p>
                <p className="text-sm text-gray-600">{nextCollection.type}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">🗑️</div>
            </div>
          </div>
        )}
      </header>

      {/* Tabs */}
      <main className="px-4 py-6 space-y-6">
        {activeTab === "home" && <HomeTab setActiveTab={setActiveTab} />}
        {activeTab === "schedule" && (
          <ScheduleTab currentUser={currentUser} schedulesByPurok={schedulesByPurok} />
        )}
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
        ].map((tab) => (
          <button
            key={tab.key}
            className={`flex flex-col items-center p-2 ${activeTab === tab.key ? "text-indigo-600" : "text-gray-500"}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span>{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Modals */}
      {showProfile && (
        <ProfileModal user={currentUser} setUser={setCurrentUser} onClose={() => setShowProfile(false)} />
      )}
      {showEmergency && <EmergencyModal onClose={() => setShowEmergency(false)} />}
    </div>
  );
}
