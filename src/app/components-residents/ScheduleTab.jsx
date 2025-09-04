"use client";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import {
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
=======
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
>>>>>>> c5b789782ef6c73f8b74e240b9aa12e5e7497d3e
import { supabase } from "@/supabaseClient";

export default function ScheduleTab() {
  const [schedules, setSchedules] = useState([]);

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

  // Format date nicely
  const formatDate = (dateStr, day) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString("en-US", {
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

  // Color coding for rows
  const getRowColor = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime())
      return "bg-green-100 border-l-4 border-green-500";
    if (date < today)
      return "bg-gray-100 border-l-4 border-gray-400 text-gray-600";
    const diffDays = (date - today) / (1000 * 60 * 60 * 24);
    if (diffDays > 0 && diffDays <= 7)
      return "bg-yellow-100 border-l-4 border-yellow-500";
    return "bg-blue-100 border-l-4 border-blue-500";
  };

  return (
<<<<<<< HEAD
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
        <CalendarDaysIcon className="w-8 h-8 text-red-600" />
        Garbage Collection Schedule
      </h2>

      {schedules.length > 0 ? (
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
              {schedules.map((sched) => (
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
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-400 py-10 text-lg">
          No schedules available
        </div>
      )}
=======
    <div className="max-w-xl w-full mx-auto px-2 py-4 mt-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6 border-b pb-2 justify-center">
          <CalendarDaysIcon className="w-7 h-7 text-blue-500" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
            Garbage Collection Schedule
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg text-sm sm:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900">
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left font-semibold">Date</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left font-semibold">Day</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left font-semibold">Purok</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {schedules.length > 0 ? (
                schedules.map((sched, idx) => (
                  <tr
                    key={sched.schedule_id}
                    className={`transition ${
                      idx % 2 === 0
                        ? "bg-white/80"
                        : "bg-blue-50/70"
                    } hover:bg-blue-100/80`}
                  >
                    <td className="py-1 px-2 sm:py-2 sm:px-4">{sched.date}</td>
                    <td className="py-1 px-2 sm:py-2 sm:px-4">{sched.day}</td>
                    <td className="py-1 px-2 sm:py-2 sm:px-4">{sched.purok}</td>
                    <td className="py-1 px-2 sm:py-2 sm:px-4">{sched.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-6 px-2 text-center text-gray-400 text-base"
                  >
                    No schedules available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
>>>>>>> c5b789782ef6c73f8b74e240b9aa12e5e7497d3e
    </div>
  );
}