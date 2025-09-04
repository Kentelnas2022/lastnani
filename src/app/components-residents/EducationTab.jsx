"use client";
<<<<<<< HEAD
import { BookOpenIcon } from "@heroicons/react/24/solid";

export default function EducationTab() {
  // Example educational content (can be fetched from DB later)
  const topics = [
    {
      id: 1,
      title: "Waste Segregation Guide",
      description: "Learn how to properly separate biodegradable, recyclable, and residual waste.",
      link: "#",
      color: "from-green-500 to-green-600",
    },
    {
      id: 2,
      title: "Recycling Tips",
      description: "Discover simple ways to recycle at home and reduce environmental impact.",
      link: "#",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 3,
      title: "Community Clean-up",
      description: "Find out how you can join upcoming barangay clean-up drives and events.",
      link: "#",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: 4,
      title: "Health & Safety",
      description: "Understand the importance of proper waste disposal for your family's health.",
      link: "#",
      color: "from-red-500 to-red-600",
    },
  ];

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#b1001a] to-[#ff3b50] text-white shadow">
            <BookOpenIcon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Education Hub</h2>
        </div>
=======
import { useState, useEffect } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function EducationTab() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = () => {
      const stored = localStorage.getItem("educationalContents");
      if (stored) {
        const parsed = JSON.parse(stored);
        setArticles(parsed.filter((c) => c.status === "Published"));
      }
    };

    loadArticles();

    // Real-time updates (cross-tab and same-tab)
    const handleStorageChange = (e) => {
      if (!e || e.key === "educationalContents") {
        loadArticles();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-6 border-b pb-2">
        <BookOpenIcon className="w-7 h-7 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Educational Content
        </h2>
      </div>
>>>>>>> c5b789782ef6c73f8b74e240b9aa12e5e7497d3e

        {/* Content Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <div
<<<<<<< HEAD
              key={topic.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${topic.color} text-white shadow mb-4`}
              >
                <BookOpenIcon className="w-6 h-6" />
=======
              key={article.id}
              className="bg-white/90 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {article.description}
                </p>
                {article.media && article.mediaType === "image" && (
                  <img
                    src={article.media}
                    alt="Article visual"
                    className="rounded-lg border mb-4 w-full object-cover max-h-48"
                  />
                )}
                {article.media && article.mediaType === "video" && (
                  <video
                    controls
                    src={article.media}
                    className="rounded-lg border mb-4 w-full max-h-48"
                  />
                )}
                {article.media && article.mediaType === "pdf" && (
                  <iframe
                    src={article.media}
                    className="w-full h-64 rounded-lg border mb-4"
                    title="PDF Preview"
                  />
                )}
              </div>
              <div className="text-xs text-gray-500 border-t pt-2 mt-2">
                Category: {article.category || "General"}
>>>>>>> c5b789782ef6c73f8b74e240b9aa12e5e7497d3e
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {topic.title}
              </h3>
              <p className="text-sm text-gray-600 flex-1">{topic.description}</p>
              <a
                href={topic.link}
                className="mt-4 inline-block text-sm font-medium text-[#b1001a] hover:underline"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}