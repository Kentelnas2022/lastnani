"use client";
import { useState } from "react";

export default function Schedule() {
  const [schedule, setSchedule] = useState([
    {
      id: 1,
      day: "Monday",
      puroks: ["Purok 1", "Purok 2"],
      time: "7:00 AM - 11:00 AM",
    },
    {
      id: 2,
      day: "Tuesday",
      puroks: ["Purok 3"],
      time: "7:00 AM - 11:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      puroks: ["Purok 4", "Purok 5"],
      time: "7:00 AM - 11:00 AM",
    },
    {
      id: 4,
      day: "Thursday",
      puroks: ["Purok 6"],
      time: "7:00 AM - 11:00 AM",
    },
    {
      id: 5,
      day: "Friday",
      puroks: ["Purok 7", "Purok 8"],
      time: "7:00 AM - 11:00 AM",
    },
  ]);

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 border-b border-gray-200 bg-gray-50">
        <h2 className="text-sm sm:text-base font-semibold text-gray-900">
          Weekly Collection Schedule
        </h2>
      </div>

      {/* Grid */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedule.map((day) => (
          <div
            key={day.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <h3 className="text-sm font-semibold text-gray-900">{day.day}</h3>
            <p className="mt-1 text-xs text-gray-600">
              {day.puroks.join(", ")}
            </p>
            <p className="mt-2 text-xs font-medium text-gray-700">{day.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}