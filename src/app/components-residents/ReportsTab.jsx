"use client";
import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

export default function ReportsTab({ reports = [], setReports }) {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("Garbage Overflow");
  const [filesData, setFilesData] = useState([]); // array of File objects

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    setFilesData((prev) => [...prev, ...files]);
  };

  const uploadFiles = async () => {
    if (filesData.length === 0) return [];

    const uploadedUrls = [];

    for (const file of filesData) {
      const fileName = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage
        .from("reports-files") // your bucket
        .upload(fileName, file);

      if (error) {
        console.error("File upload error:", error);
      } else {
        const { publicUrl } = supabase.storage.from("reports-files").getPublicUrl(fileName);
        uploadedUrls.push(publicUrl);
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Upload files to Supabase
    const uploadedUrls = await uploadFiles();

    const newReport = {
      id: Date.now(),
      title: `${category} - ${new Date().toLocaleDateString()}`,
      location: "Resident Submitted",
      reporter: "Resident User",
      contact: "N/A",
      description: message,
      photos: uploadedUrls,
      time: "Just now",
      category: category.toLowerCase(),
      status: "Pending",
      priority: "Medium Priority",
      feedback: null,
      rating: null,
      showResponseBox: false,
      isCalling: false,
      residentFeedback: [],
    };

    if (typeof setReports === "function") {
      setReports(Array.isArray(reports) ? [...reports, newReport] : [newReport]);
    }

    const stored = JSON.parse(localStorage.getItem("officialReports") || "[]");
    const updated = [...stored, newReport];
    localStorage.setItem("officialReports", JSON.stringify(updated));

    const { error } = await supabase.from("reports").insert([
      {
        title: newReport.title,
        location: newReport.location,
        reporter: newReport.reporter,
        contact: newReport.contact,
        description: newReport.description,
        file_urls: uploadedUrls,
        time: new Date().toISOString(),
        category: newReport.category,
        status: newReport.status,
        priority: newReport.priority,
      },
    ]);

    if (error) {
      console.error("Failed to submit report to Supabase:", error);
      alert("Saved locally, but failed to submit to official reports.");
    } else {
      alert("Report submitted successfully!");
    }

    setMessage("");
    setFilesData([]);
  };

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#b1001a] to-[#ff3b50] text-white shadow">
            <DocumentTextIcon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Report an Issue</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option>Garbage Overflow</option>
              <option>Missed Collection</option>
              <option>Illegal Dumping</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Details</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Evidence (photo/video)</label>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFiles}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {filesData.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {filesData.map((f, idx) =>
                  f.type.startsWith("video") ? (
                    <video
                      key={idx}
                      src={URL.createObjectURL(f)}
                      controls
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                  ) : (
                    <img
                      key={idx}
                      src={URL.createObjectURL(f)}
                      alt={f.name}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                  )
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-[#b1001a] to-[#ff3b50] text-white px-5 py-2 rounded-lg font-medium shadow hover:opacity-90 transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
