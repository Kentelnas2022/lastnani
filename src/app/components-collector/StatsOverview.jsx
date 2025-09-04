"use client";
import { useEffect, useState } from "react";

export default function StatsOverview({ puroks = [] }) {
  const [completed, setCompleted] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (puroks.length === 0) {
      setCompleted(0);
      setProgress(0);
      return;
    }
    const done = puroks.filter((p) => p.status === "completed").length;
    setCompleted(done);
    setProgress(Math.round((done / puroks.length) * 100));
  }, [puroks]);

  const stats = [
    {
      label: "Total Puroks",
      value: puroks.length,
      color: "text-blue-600",
      bg: "bg-blue-100",
      icon: (
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      label: "Completed",
      value: completed,
      color: "text-green-600",
      bg: "bg-green-100",
      icon: (
        <svg
          className="w-5 h-5 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Progress",
      value: `${progress}%`,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      icon: (
        <svg
          className="w-5 h-5 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition"
        >
          <div>
            <p className="text-sm font-medium text-gray-500">{item.label}</p>
            <p
              className={`text-2xl font-bold mt-1 transition-all duration-300 ${item.color}`}
            >
              {item.value}
            </p>
          </div>
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-lg ${item.bg}`}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
}