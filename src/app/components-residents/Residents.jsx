"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";
import HomeTab from "./HomeTab";
import ScheduleTab from "./ScheduleTab";
import ReportsTab from "./ReportsTab";
import FeedbackTab from "./FeedbackTab";
import EducationTab from "./EducationTab";
import Profile from "./Profile";
import EmergencyModal from "./EmergencyModal";
import {
  Bars3Icon,
  HomeModernIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

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

const navTabs = [
  { key: "home", label: "Home", icon: HomeModernIcon },
  { key: "schedule", label: "Schedule", icon: CalendarDaysIcon },
  { key: "reports", label: "Reports", icon: DocumentTextIcon },
  { key: "feedback", label: "Feedback", icon: ChatBubbleLeftRightIcon },
  { key: "education", label: "Education", icon: BookOpenIcon },
  { key: "profile", label: "Profile", icon: UserCircleIcon },
];

export default function Residents() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [showEmergency, setShowEmergency] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        if (resident.role !== "official") {
          router.push("/login");
        }
      } else {
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

  if (loading) return <div className="text-center mt-10 text-black">Loading...</div>;

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="bg-white min-h-screen pb-0">
      {/* Header */}
      <header className="bg-red-600 text-white px-4 py-2 relative">
        <div className="flex items-center justify-between">
          {/* Left: Welcome */}
          <div>
            <h1 className="text-base sm:text-lg font-bold leading-tight text-white">
              Welcome back{currentUser?.name ? `, ${currentUser.name.split(" ")[0]}` : ""}
            </h1>
            <p className="text-white/80 text-xs sm:text-sm">{currentUser?.purok}</p>
            {nextCollection && (
              <p className="mt-1 text-sm sm:text-base font-semibold text-white">
                {nextCollection.label}, {nextCollection.time}
              </p>
            )}
          </div>
          {/* Right: Profile and Burger */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab("profile")}
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-600 transition"
              aria-label="Profile"
            >
              <UserCircleIcon className="w-6 h-6 text-red-600" />
            </button>
            <button
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-600 transition"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Bars3Icon className="w-6 h-6 text-red-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar for all screens */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 z-40 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="font-bold text-lg text-red-600">Menu</span>
          <button onClick={() => setSidebarOpen(false)} aria-label="Close navigation">
            <XMarkIcon className="w-7 h-7 text-black" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 mt-4">
          {navTabs.map((tab) => (
            <button
              key={tab.key}
              className={`flex items-center gap-3 px-6 py-3 text-base font-medium text-left transition ${
                activeTab === tab.key
                  ? "bg-red-100 text-red-700"
                  : "text-black hover:bg-red-50"
              }`}
              onClick={() => {
                setActiveTab(tab.key);
                setSidebarOpen(false);
              }}
            >
              <tab.icon className="w-6 h-6" />
              {tab.label}
            </button>
          ))}
          <button
            className="flex items-center gap-3 px-6 py-3 text-base font-medium text-red-600 hover:bg-red-50 mt-2"
            onClick={handleLogout}
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="px-2 py-6 space-y-6 max-w-2xl mx-auto text-black">
        {activeTab === "home" && <HomeTab setActiveTab={setActiveTab} />}
        {activeTab === "schedule" && (
          <ScheduleTab currentUser={currentUser} schedulesByPurok={schedulesByPurok} />
        )}
        {activeTab === "reports" && <ReportsTab reports={reports} setReports={setReports} />}
        {activeTab === "feedback" && <FeedbackTab feedback={feedback} setFeedback={setFeedback} />}
        {activeTab === "education" && <EducationTab />}
        {activeTab === "profile" && (
          <Profile user={currentUser} setUser={setCurrentUser} />
        )}
      </main>

      {/* Modals */}
      {showEmergency && <EmergencyModal onClose={() => setShowEmergency(false)} />}
    </div>
  );
}