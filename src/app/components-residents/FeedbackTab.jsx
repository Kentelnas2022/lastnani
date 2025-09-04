"use client";
import { useState, useEffect } from "react";
import { StarIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";

export default function FeedbackTab() {
  const [resolvedReports, setResolvedReports] = useState([]);
  const [feedbacks, setFeedbacks] = useState({}); // { reportId: { text, rating } }

  // Load resolved reports from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("officialReports") || "[]");
    const resolved = stored.filter((r) => r.status === "Resolved");
    setResolvedReports(resolved);
  }, []);

  const handleFeedbackSubmit = (reportId) => {
    if (!feedbacks[reportId]?.text) return;

    const updated = resolvedReports.map((r) =>
      r.id === reportId ? { ...r, residentFeedback: feedbacks[reportId] } : r
    );

    setResolvedReports(updated);
    localStorage.setItem("officialReports", JSON.stringify(updated));

    alert("Feedback submitted successfully!");
  };

  const setRating = (reportId, rating) => {
    setFeedbacks((prev) => ({
      ...prev,
      [reportId]: { ...prev[reportId], rating },
    }));
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#b1001a] to-[#ff3b50] text-white shadow">
            <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Your Feedback</h2>
        </div>

        {resolvedReports.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No resolved reports available for feedback.
          </p>
        ) : (
          <div className="space-y-6">
            {resolvedReports.map((report) => (
              <div
                key={report.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {report.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{report.description}</p>

                {/* Star Rating */}
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      onClick={() => setRating(report.id, star)}
                      className={`w-6 h-6 cursor-pointer transition ${
                        feedbacks[report.id]?.rating >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Feedback Text */}
                <textarea
                  placeholder="Write your feedback..."
                  value={feedbacks[report.id]?.text || ""}
                  onChange={(e) =>
                    setFeedbacks((prev) => ({
                      ...prev,
                      [report.id]: { ...prev[report.id], text: e.target.value },
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-3"
                />

                <button
                  onClick={() => handleFeedbackSubmit(report.id)}
                  className="bg-gradient-to-r from-[#b1001a] to-[#ff3b50] text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
                >
                  Submit Feedback
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
