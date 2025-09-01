"use client";
import { useState, useEffect } from "react";
import { AlertTriangle, User, Phone, Paperclip, MessageSquare, Star } from "lucide-react";

export default function Reports() {
  const [filterType, setFilterType] = useState("All Reports");
  const [filterPriority, setFilterPriority] = useState("All Priorities");
  const [userRole] = useState("admin"); // official
  const [reports, setReports] = useState([]);

  // Load reports from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("officialReports") || "[]");
    setReports(stored);
  }, []);

  // Handle admin response
  const handleResponse = (id, text) => {
    const updatedReports = reports.map((r) =>
      r.id === id
        ? {
            ...r,
            feedback: `Admin Response: ${text}`,
            showResponseBox: false,
            residentFeedback: [
              ...(r.residentFeedback || []),
              { text: `Admin Response: ${text}`, date: new Date().toLocaleString() },
            ],
          }
        : r
    );
    setReports(updatedReports);
    localStorage.setItem("officialReports", JSON.stringify(updatedReports));
  };

  // Handle rating (for residents later)
  const handleRating = (id, rating) => {
    if (userRole !== "citizen") return;
    const updatedReports = reports.map((r) => (r.id === id ? { ...r, rating } : r));
    setReports(updatedReports);
    localStorage.setItem("officialReports", JSON.stringify(updatedReports));
  };

  // Mark as resolved
  const handleResolve = (id) => {
    const updated = reports.map((r) =>
      r.id === id ? { ...r, status: "Resolved" } : r
    );
    setReports(updated);
    localStorage.setItem("officialReports", JSON.stringify(updated));
  };

  // Simulate contacting resident
  const handleContact = (id) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isCalling: true } : r))
    );
    setTimeout(() => {
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isCalling: false } : r))
      );
    }, 3000);
  };

  // Filter
  const filteredReports = reports.filter((r) => {
    const matchesType =
      filterType === "All Reports" || r.category === filterType.toLowerCase();
    const matchesPriority =
      filterPriority === "All Priorities" || r.priority === filterPriority;
    return matchesType && matchesPriority;
  });

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Citizen Reports & Feedback
      </h2>

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
        {filteredReports.length === 0 ? (
          <p className="text-gray-500">No reports submitted yet.</p>
        ) : (
          filteredReports.map((report) => (
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
              {report.photos?.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Paperclip size={14} /> Photo Evidence:
                  </p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {report.photos.map((photo, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm"
                      >
                        {photo?.name
                          ? photo.name
                          : photo?.url
                          ? photo.url.slice(0, 15) + "..."
                          : String(photo)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Feedback */}
              {report.feedback && (
                <div className="mt-3 bg-gray-50 border-l-4 border-blue-500 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 flex gap-2 items-center">
                    <MessageSquare size={14} className="text-blue-600" />
                    {report.feedback}
                  </p>
                </div>
              )}

              {/* Citizen Rating */}
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
                      }`}
                      onClick={() =>
                        userRole === "citizen"
                          ? handleRating(report.id, star)
                          : null
                      }
                    />
                  ))}
                </div>
              )}

              {/* Resident Feedback */}
              {report.status === "Resolved" && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Resident Feedback:
                  </h3>
                  {report.residentFeedback?.length > 0 ? (
                    report.residentFeedback.map((f, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-2"
                      >
                        <p className="text-gray-800 text-sm">{f.text}</p>
                        <span className="text-xs text-gray-500">{f.date}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No feedback submitted yet.</p>
                  )}
                </div>
              )}

              {/* Contact Animation */}
              {report.isCalling && (
                <div className="mt-3 p-3 bg-green-50 border border-green-400 rounded-lg animate-pulse">
                  📞 Calling {report.contact}...
                </div>
              )}

              {/* Footer Actions */}
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
            </div>
          ))
        )}
      </div>
    </section>
  );
}
