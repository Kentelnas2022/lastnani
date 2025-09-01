"use client";
import { useState } from "react";
import { supabase } from "@/supabaseClient";

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
      const { data, error } = await supabase.storage
        .from("reports-files") // <-- your bucket name
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

    // 1️⃣ Save files to Supabase
    const uploadedUrls = await uploadFiles();

    // 2️⃣ Prepare report object
    const newReport = {
      id: Date.now(),
      title: `${category} - ${new Date().toLocaleDateString()}`,
      location: "Resident Submitted",
      reporter: "Resident User",
      contact: "N/A",
      description: message,
      photos: uploadedUrls, // save Supabase URLs
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

    // 3️⃣ Update parent state
    if (typeof setReports === "function") {
      setReports(Array.isArray(reports) ? [...reports, newReport] : [newReport]);
    }

    // 4️⃣ Save to localStorage
    const stored = JSON.parse(localStorage.getItem("officialReports") || "[]");
    const updated = [...stored, newReport];
    localStorage.setItem("officialReports", JSON.stringify(updated));

    // 5️⃣ Insert into Supabase table
    const { error } = await supabase.from("reports").insert([{
      title: newReport.title,
      location: newReport.location,
      reporter: newReport.reporter,
      contact: newReport.contact,
      description: newReport.description,
      file_urls: uploadedUrls, // column in Supabase
      time: new Date().toISOString(),
      category: newReport.category,
      status: newReport.status,
      priority: newReport.priority,
    }]);

    if (error) {
      console.error("Failed to submit report to Supabase:", error);
      alert("Saved locally, but failed to submit to official reports.");
    } else {
      alert("Report submitted successfully (localStorage + Supabase)!");
    }

    // 6️⃣ Reset form
    setMessage("");
    setFilesData([]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">📢 Report an Issue</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md space-y-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
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
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Evidence (photo/video) - optional</label>
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
                  <video key={idx} src={URL.createObjectURL(f)} controls className="w-24 h-24 object-cover rounded" />
                ) : (
                  <img key={idx} src={URL.createObjectURL(f)} alt={f.name} className="w-24 h-24 object-cover rounded" />
                )
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
