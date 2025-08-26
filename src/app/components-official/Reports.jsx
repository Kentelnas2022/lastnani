"use client";
import { useState } from "react";
import {
  AlertTriangle,
  User,
  Phone,
  Paperclip,
  MessageSquare,
  Star,
} from "lucide-react";

export default function Reports() {
  const [filterType, setFilterType] = useState("All Reports");
  const [filterPriority, setFilterPriority] = useState("All Priorities");

  // 👤 Role (switch between "admin" or "citizen")
  const [userRole] = useState("admin"); 

  // Reports with response + rating
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Missed Collection - Purok 2",
      location: "Purok 2, Street 5",
      reporter: "Maria Santos",
      contact: "09123456789",
      description:
        "Collection truck did not pass by Street 5 yesterday. Multiple households affected. This has happened twice this month already.",
      photos: ["photo1.jpg", "photo2.jpg"],
      time: "2 hours ago",
      category: "missed collection",
      status: "Pending",
      priority: "High Priority",
      feedback: null,
      rating: null,
      showResponseBox: false,
      isCalling: false,
    },
    {
      id: 2,
      title: "Improper Segregation by Neighbor",
      location: "Purok 1, House #16",
      reporter: "Juan Dela Cruz",
      contact: "09234567890",
      description:
        "My neighbor at House #15 keeps mixing all waste types in a single black bag. This attracts stray animals and creates a mess.",
      photos: ["photo3.jpg"],
      time: "3 hours ago",
      category: "improper segregation",
      status: "In Progress",
      priority: "Medium Priority",
      feedback:
        "Admin Response: Please coordinate with your zone leader for proper segregation monitoring.",
      rating: 4,
      showResponseBox: false,
      isCalling: false,
    },
    {
      id: 3,
      title: "Overflowing Garbage Bin",
      location: "Purok 4, Street 10",
      reporter: "Ana Dela Cruz",
      contact: "09987654321",
      description:
        "The garbage bin in front of Barangay Hall is overflowing and has not been collected for 3 days.",
      photos: ["photo4.jpg"],
      time: "6 hours ago",
      category: "overflowing bin",
      status: "Pending",
      priority: "High Priority",
      feedback: null,
      rating: null,
      showResponseBox: false,
      isCalling: false,
    },
    {
      id: 4,
      title: "Truck Passed Early",
      location: "Purok 3, Street 8",
      reporter: "Pedro Ramirez",
      contact: "09112223344",
      description:
        "Collection truck passed too early at 5 AM, most households missed the schedule.",
      photos: [],
      time: "1 day ago",
      category: "early collection",
      status: "Resolved",
      priority: "Low Priority",
      feedback: "Admin Response: We will adjust the schedule to 7 AM onwards.",
      rating: 5,
      showResponseBox: false,
      isCalling: false,
    },
  ]);

  // Stats
  const totalReports = reports.length;
  const pendingReports = reports.filter((r) => r.status === "Pending").length;
  const satisfactionRate =
    reports.filter((r) => r.rating !== null).length > 0
      ? (
          reports.reduce(
            (sum, r) => sum + (r.rating || 0),
            0
          ) / reports.filter((r) => r.rating !== null).length
        ).toFixed(1) + "/5"
      : "No ratings yet";

  // Filters
  const filteredReports = reports.filter((r) => {
    const matchesType =
      filterType === "All Reports" || r.category === filterType.toLowerCase();
    const matchesPriority =
      filterPriority === "All Priorities" || r.priority === filterPriority;
    return matchesType && matchesPriority;
  });

  // Handle admin response
  const handleResponse = (id, text) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, feedback: `Admin Response: ${text}`, showResponseBox: false }
          : r
      )
    );
  };

  // Handle rating
  const handleRating = (id, rating) => {
    if (userRole !== "citizen") return; // ⛔ only citizens can rate
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, rating } : r))
    );
  };

  // Handle mark resolved
  const handleResolve = (id) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Resolved" } : r
      )
    );
  };

  // Handle contact animation
  const handleContact = (id) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isCalling: true } : r
      )
    );
    setTimeout(() => {
      setReports((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, isCalling: false } : r
        )
      );
    }, 3000); // animation lasts 3 sec
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Citizen Reports & Feedback
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800">Total Reports</h3>
          <p className="text-3xl font-bold text-blue-600">{totalReports}</p>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800">Pending Action</h3>
          <p className="text-3xl font-bold text-yellow-600">{pendingReports}</p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800">Satisfaction Rate</h3>
          <p className="text-3xl font-bold text-green-600">
            {satisfactionRate}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-end gap-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option>All Reports</option>
          <option>missed collection</option>
          <option>improper segregation</option>
          <option>overflowing bin</option>
          <option>early collection</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option>All Priorities</option>
          <option>High Priority</option>
          <option>Medium Priority</option>
          <option>Low Priority</option>
        </select>
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <AlertTriangle className="text-yellow-600" size={18} />
                  {report.title}
                </h4>
                <p className="text-sm text-gray-600 flex gap-2 items-center flex-wrap">
                  📍 {report.location} •{" "}
                  <span className="flex items-center gap-1">
                    <User size={14} /> {report.reporter}
                  </span>{" "}
                  • <Phone size={14} /> {report.contact}
                </p>
              </div>
              <div className="text-right space-y-1">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    report.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : report.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {report.status}
                </span>
                <br />
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    report.priority === "High Priority"
                      ? "bg-red-100 text-red-800"
                      : report.priority === "Medium Priority"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {report.priority}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-3">{report.description}</p>

            {/* Photos */}
            {report.photos.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Paperclip size={14} /> Photo Evidence:
                </p>
                <div className="flex gap-2 mt-1">
                  {report.photos.map((photo, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm"
                    >
                      {photo}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback */}
            {report.feedback && (
              <div className="mt-3 bg-gray-50 border-l-4 border-blue-500 p-3 rounded-lg">
                <p className="text-sm text-gray-700 flex gap-2 items-center">
                  <MessageSquare size={14} className="text-blue-600" />
                  {report.feedback}
                </p>
              </div>
            )}

            {/* Response Box */}
            {report.showResponseBox && (
              <div className="mt-3">
                <textarea
                  id={`response-${report.id}`}
                  placeholder="Type your response..."
                  className="w-full border rounded-lg p-2 mb-2 text-sm"
                ></textarea>
                <button
                  onClick={() =>
                    handleResponse(
                      report.id,
                      document.getElementById(`response-${report.id}`).value
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Send Response
                </button>
              </div>
            )}

            {/* Citizen Rating (if Resolved) */}
            {report.status === "Resolved" && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-gray-700">Citizen Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`${
                      report.rating >= star
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    } ${
                      userRole === "citizen"
                        ? "cursor-pointer hover:scale-110"
                        : "cursor-default"
                    }`}
                    onClick={() =>
                      userRole === "citizen" ? handleRating(report.id, star) : null
                    }
                  />
                ))}
              </div>
            )}

            {/* Contact Animation */}
            {report.isCalling && (
              <div className="mt-3 p-3 bg-green-50 border border-green-400 rounded-lg animate-pulse">
                📞 Calling {report.contact}...
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-xs text-gray-500">
                Reported {report.time} • Category: {report.category}
              </p>
              <div className="flex gap-2">
                {report.status !== "Resolved" && (
                  <button
                    onClick={() => handleResolve(report.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Mark Resolved
                  </button>
                )}
                <button
                  onClick={() =>
                    setReports((prev) =>
                      prev.map((r) =>
                        r.id === report.id
                          ? { ...r, showResponseBox: !r.showResponseBox }
                          : r
                      )
                    )
                  }
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Respond
                </button>
                <button
                  onClick={() => handleContact(report.id)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
