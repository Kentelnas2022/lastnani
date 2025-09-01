"use client";
import { useState, useEffect } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
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

  return (
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
    </div>
  );
}