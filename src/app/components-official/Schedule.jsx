"use client";

import { useState, useEffect } from "react";
import {
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "@/supabaseClient";

export default function Schedule() {
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [purok, setPurok] = useState("");
  const [time, setTime] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSchedules = async () => {
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .order("date");
    if (error) {
      console.error("Error fetching schedules:", error);
    } else {
      setSchedules(data);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleAddSchedule = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("schedules").insert([
      {
        day,
        date,
        purok,
        time,
      },
    ]);

    if (error) {
      console.error("Error adding schedule:", error);
      alert("Failed to add schedule");
    } else {
      setDay("");
      setDate("");
      setPurok("");
      setTime("");
      setIsModalOpen(false);
      fetchSchedules();
    }
  };

  // Format date nicely
  const formatDate = (dateStr, day) => {
    const d = new Date(dateStr);
    return `${d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })} (${day})`;
  };

  // Format time nicely
  const formatTime = (timeStr) => {
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h, 10);
    const minutes = parseInt(m, 10);
    return new Date(0, 0, 0, hour, minutes).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Color coding rows
  const getRowColor = (dateStr) => {
    const today = new Date();
    const scheduleDate = new Date(dateStr);

    today.setHours(0, 0, 0, 0);
    scheduleDate.setHours(0, 0, 0, 0);

    if (scheduleDate.getTime() === today.getTime()) {
      return "bg-green-100 border-l-4 border-green-500";
    }
    if (scheduleDate < today) {
      return "bg-gray-100 border-l-4 border-gray-400 text-gray-600";
    }
    const diffDays = Math.ceil(
      (scheduleDate - today) / (1000 * 60 * 60 * 24)
    );
    if (diffDays <= 3) {
      return "bg-yellow-100 border-l-4 border-yellow-500";
    }
    return "bg-blue-100 border-l-4 border-blue-500";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
        <CalendarDaysIcon className="w-8 h-8 text-red-600" />
        Manage Garbage Collection Schedule
      </h2>

      {/* Add Schedule Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-200"
        >
          + Add Schedule
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden border border-gray-300">
        <table className="min-w-full text-sm sm:text-base border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-red-100 to-red-200 text-red-900 border-b border-gray-300">
              <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">
                Date
              </th>
              <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">
                Purok
              </th>
              <th className="py-3 px-4 text-left font-semibold">Time</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length > 0 ? (
              schedules.map((sched) => (
                <tr
                  key={sched.schedule_id}
                  className={`${getRowColor(
                    sched.date
                  )} transition hover:scale-[1.01] hover:shadow-md border-b border-gray-300`}
                >
                  {/* Date */}
                  <td className="py-3 px-4 whitespace-nowrap align-middle">
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="w-5 h-5 text-red-600" />
                      {formatDate(sched.date, sched.day)}
                    </div>
                  </td>

                  {/* Purok */}
                  <td className="py-3 px-4 whitespace-nowrap align-middle">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Purok {sched.purok}</span>
                    </div>
                  </td>

                  {/* Time */}
                  <td className="py-3 px-4 whitespace-nowrap align-middle">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-green-600" />
                      <span>{formatTime(sched.time)}</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-6 px-2 text-center text-gray-400 text-base"
                >
                  No schedules available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 transform transition-all scale-95 animate-fadeIn">
            <h3 className="text-xl font-semibold text-red-600 mb-4">
              Add New Schedule
            </h3>
            <form onSubmit={handleAddSchedule} className="space-y-4">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Purok"
                value={purok}
                onChange={(e) => setPurok(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
              />

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold shadow"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
