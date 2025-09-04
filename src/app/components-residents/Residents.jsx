"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import Image from "next/image";
import { supabase } from "@/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

=======
import { supabase } from "@/supabaseClient";
>>>>>>> c5b789782ef6c73f8b74e240b9aa12e5e7497d3e
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

import {
  HomeModernIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

// --- schedules by purok ---
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
<<<<<<< HEAD
      const { data: resident } = await supabase
=======
      const { data: resident, error } = await supabase
>>>>>>> c5b789782ef6c73f8b74e240b9aa12e5e7497d3e
        .from("residents")
        .select("*")
        .eq("user_id", data.session.user.id)
        .maybeSingle();

      if (resident) {
        setCurrentUser(resident);
<<<<<<< HEAD
=======
        if (resident.role !== "official") {
          router.push("/login");
        }
>>>>>>> c5b789782ef6c73f8b74e240b9aa12e5e7497d3e
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

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // --- Weekly schedule navbar ---
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayIndex = new Date().getDay();
  const schedule = schedulesByPurok[currentUser?.purok] || [];

<<<<<<< HEAD
  const getDaySchedule = (day) => schedule.find((s) => s.day === day);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (desktop only) */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h2 className="font-bold text-lg text-[#b1001a]">Tambacan</h2>
          </div>
        </div>
        <nav className="flex-1 flex flex-col mt-4">
          {navTabs.map((tab) => (
            <button
              key={tab.key}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition
                ${
                  activeTab === tab.key
                    ? "bg-[#b1001a]/10 text-[#b1001a] border-l-4 border-[#b1001a]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 mt-auto text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#8b0014] to-[#b1001a] text-white px-6 py-4 shadow flex justify-between items-center">
          <h1 className="text-xl font-bold">Barangay Tambacan</h1>
          {/* Desktop: button, Mobile: icon */}
          <button
            onClick={() => setActiveTab("profile")}
            className="hidden md:block bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition"
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className="md:hidden bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
          >
            <UserCircleIcon className="w-6 h-6" />
          </button>
        </header>

        {/* Weekly Schedule Navbar */}
        <nav className="bg-white/95 backdrop-blur-md shadow border-b border-gray-200 overflow-x-auto">
          <ul className="flex gap-3 px-4 py-3 min-w-max snap-x">
            {days.map((day, idx) => {
              const sched = getDaySchedule(day);
              const isToday = idx === todayIndex;
              const isTomorrow = idx === (todayIndex + 1) % 7;

              return (
                <li
                  key={day}
                  className={`px-4 py-2 rounded-xl shadow-sm border text-sm flex flex-col items-center min-w-[110px] snap-start
                    ${
                      isToday
                        ? "bg-green-100 border-green-400 text-green-800 font-semibold"
                        : isTomorrow
                        ? "bg-blue-100 border-blue-400 text-blue-800 font-semibold"
                        : "bg-white border-gray-200 text-gray-700"
                    }`}
                >
                  <span>{day}</span>
                  {sched ? (
                    <span
                      className={`mt-1 text-xs px-2 py-0.5 rounded-full bg-${sched.color}-100 text-${sched.color}-700`}
                    >
                      {sched.type} • {sched.time}
                    </span>
                  ) : (
                    <span className="mt-1 text-xs text-gray-400">
                      No pickup
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Tab Content */}
        <main className="flex-1 p-6 pb-28 md:pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl p-6 min-h-[400px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === "home" && (
                <HomeTab currentUser={currentUser} setActiveTab={setActiveTab} />
              )}
              {activeTab === "schedule" && (
                <ScheduleTab
                  currentUser={currentUser}
                  schedulesByPurok={schedulesByPurok}
                />
              )}
              {activeTab === "reports" && (
                <ReportsTab reports={reports} setReports={setReports} />
              )}
              {activeTab === "feedback" && (
                <FeedbackTab feedback={feedback} setFeedback={setFeedback} />
              )}
              {activeTab === "education" && <EducationTab />}
              {activeTab === "profile" && (
                <Profile user={currentUser} setUser={setCurrentUser} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating SOS button */}
      <motion.button
        onClick={() => setShowEmergency(true)}
        className="fixed bottom-24 md:bottom-6 right-6 bg-gradient-to-r from-red-600 to-red-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-red-400/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 15px #b1001a",
            "0 0 30px #b1001a",
            "0 0 15px #b1001a",
          ],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ExclamationTriangleIcon className="w-8 h-8" />
      </motion.button>

      {/* Emergency Modal */}
      {showEmergency && (
        <EmergencyModal onClose={() => setShowEmergency(false)} />
      )}

      {/* Bottom Navigation (mobile only) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner flex justify-around py-1 md:hidden">
        {navTabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex flex-col items-center text-xs px-3 py-2 rounded-lg transition ${
              activeTab === tab.key
                ? "text-[#b1001a] bg-[#b1001a]/10"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <tab.icon className="w-6 h-6 mb-0.5" />
            <span className="text-[11px]">{tab.label}</span>
          </button>
        ))}
      </nav>
=======
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
>>>>>>> c5b789782ef6c73f8b74e240b9aa12e5e7497d3e
    </div>
  );
}