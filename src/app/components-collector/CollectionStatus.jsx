"use client";
import { useState } from "react";
import { StatusModal } from "./Modals"; // ✅ corrected path

export default function CollectionStatus() {
  // ✅ Weekly schedule
  const [schedule] = useState([
    { id: 1, day: "Monday", puroks: ["Purok 1", "Purok 2"], time: "7:00 AM - 11:00 AM" },
    { id: 2, day: "Tuesday", puroks: ["Purok 3"], time: "7:00 AM - 11:00 AM" },
    { id: 3, day: "Wednesday", puroks: ["Purok 4", "Purok 5"], time: "7:00 AM - 11:00 AM" },
    { id: 4, day: "Thursday", puroks: ["Purok 6"], time: "7:00 AM - 11:00 AM" },
    { id: 5, day: "Friday", puroks: ["Purok 7", "Purok 8"], time: "7:00 AM - 11:00 AM" },
  ]);

  // ✅ Each purok gets a status + last collection
  const [statuses, setStatuses] = useState([
    { id: 1, purok: "Purok 1", location: "North District", status: "not-started", lastCollection: "—" },
    { id: 2, purok: "Purok 2", location: "East District", status: "ongoing", lastCollection: "2025-08-25 09:15 AM" },
    { id: 3, purok: "Purok 3", location: "South District", status: "completed", lastCollection: "2025-08-26 10:00 AM" },
    { id: 4, purok: "Purok 4", location: "West District", status: "not-started", lastCollection: "—" },
    { id: 5, purok: "Purok 5", location: "Central District", status: "ongoing", lastCollection: "2025-08-27 07:45 AM" },
    { id: 6, purok: "Purok 6", location: "Mountain District", status: "not-started", lastCollection: "—" },
    { id: 7, purok: "Purok 7", location: "Coastal District", status: "completed", lastCollection: "2025-08-28 08:30 AM" },
    { id: 8, purok: "Purok 8", location: "Valley District", status: "not-started", lastCollection: "—" },
  ]);

  const [selected, setSelected] = useState(null);

  const getStatusClasses = (status) => {
    if (status === "not-started") return "bg-red-100 text-red-700";
    if (status === "ongoing") return "bg-yellow-100 text-yellow-700";
    if (status === "completed") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
  };

  const handleUpdate = (updated) => {
    // update status and record last collection time if completed
    setStatuses((prev) =>
      prev.map((p) =>
        p.purok === updated.purok
          ? {
              ...p,
              ...updated,
              lastCollection:
                updated.status === "completed"
                  ? new Date().toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : p.lastCollection,
            }
          : p
      )
    );
    setSelected(null);
  };

  // Helper to find schedule time for a purok
  const getScheduleTime = (purokName) => {
    const sched = schedule.find((day) => day.puroks.includes(purokName));
    return sched ? `${sched.day}, ${sched.time}` : "—";
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Purok Collection Status
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Organized collection tracking by schedule
        </p>
      </div>

      <div className="p-3 sm:p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Purok Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Scheduled Time</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Collection</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="py-3 px-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{p.purok}</td>
                <td className="py-3 px-4">{p.location}</td>
                <td className="py-3 px-4">{getScheduleTime(p.purok)}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{p.lastCollection}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusClasses(
                      p.status
                    )}`}
                  >
                    {p.status.replace("-", " ")}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setSelected(p)}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {selected && (
          <StatusModal
            key={selected?.id}
            purok={selected}
            onClose={() => setSelected(null)}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}