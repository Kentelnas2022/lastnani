"use client";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";

export default function FeedbackTab() {
  const [reports, setReports] = useState([]);

  // Load resolved reports from localStorage
  const loadReports = () => {
    const stored = JSON.parse(localStorage.getItem("officialReports") || "[]");
    setReports(stored.filter((r) => r.status === "Resolved"));
  };

  useEffect(() => {
    loadReports();
    const handleStorageChange = () => loadReports();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Submit resident feedback
  const handleSubmitFeedback = (id, message) => {
    if (!message.trim()) return;

    const updated = reports.map((r) =>
      r.id === id
        ? {
            ...r,
            residentFeedback: [
              ...(r.residentFeedback || []),
              { text: message, date: new Date().toLocaleString() },
            ],
          }
        : r
    );

    setReports(updated);

    const stored = JSON.parse(localStorage.getItem("officialReports") || "[]");
    const synced = stored.map((r) =>
      r.id === id
        ? {
            ...r,
            residentFeedback: updated.find(u => u.id === id).residentFeedback,
            rating: r.rating || 0
          }
        : r
    );
    localStorage.setItem("officialReports", JSON.stringify(synced));
  };

  // Handle resident rating
  const handleRating = (id, value) => {
    const updated = reports.map((r) =>
      r.id === id ? { ...r, rating: value } : r
    );
    setReports(updated);

    const stored = JSON.parse(localStorage.getItem("officialReports") || "[]");
    const synced = stored.map((r) =>
      r.id === id ? { ...r, rating: value } : r
    );
    localStorage.setItem("officialReports", JSON.stringify(synced));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">💬 Feedback on Resolved Reports</h2>

      {reports.length === 0 ? (
        <p className="text-gray-500">No resolved reports yet.</p>
      ) : (
        reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200 space-y-3"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {report.title} – <span className="text-green-600">Resolved</span>
            </h3>
            <p className="text-sm text-gray-600">{report.description}</p>

            {/* Admin Response */}
            {report.feedback && (
              <div className="mt-2 bg-blue-50 border-l-4 border-blue-500 p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-700">Admin Response:</h4>
                <p className="text-gray-700 text-sm">{report.feedback}</p>
              </div>
            )}

            {/* Resident Rating */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-700">My Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={`${
                    report.rating >= star
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  } cursor-pointer`}
                  onClick={() => handleRating(report.id, star)}
                />
              ))}
            </div>

            {/* Resident Feedback */}
            {report.residentFeedback?.length > 0 && (
              <div className="space-y-2 mt-2">
                <h4 className="text-sm font-semibold text-gray-700">My Feedback:</h4>
                {report.residentFeedback.map((f, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-2"
                  >
                    <p className="text-gray-800 text-sm">{f.text}</p>
                    <span className="text-xs text-gray-500">{f.date}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Submit new resident feedback */}
            <FeedbackForm onSubmit={(msg) => handleSubmitFeedback(report.id, msg)} />
          </div>
        ))
      )}
    </div>
  );
}

// Feedback form component
function FeedbackForm({ onSubmit }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-2">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your feedback..."
        className="w-full border border-gray-300 rounded-lg p-2 text-sm"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 text-sm"
      >
        Submit Feedback
      </button>
    </form>
  );
}
