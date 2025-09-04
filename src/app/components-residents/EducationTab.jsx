"use client";

import { useState, useEffect } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function EducationTab() {
  const [articles, setArticles] = useState([]);

  // Static fallback topics
  const fallbackTopics = [
    {
      id: 1,
      title: "Waste Segregation Guide",
      description:
        "Learn how to properly separate biodegradable, recyclable, and residual waste.",
      link: "#",
      color: "from-green-500 to-green-600",
    },
    {
      id: 2,
      title: "Recycling Tips",
      description:
        "Discover simple ways to recycle at home and reduce environmental impact.",
      link: "#",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 3,
      title: "Community Clean-up",
      description:
        "Find out how you can join upcoming barangay clean-up drives and events.",
      link: "#",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: 4,
      title: "Health & Safety",
      description:
        "Understand the importance of proper waste disposal for your family's health.",
      link: "#",
      color: "from-red-500 to-red-600",
    },
  ];

  useEffect(() => {
    const loadArticles = () => {
      const stored = localStorage.getItem("educationalContents");
      if (stored) {
        const parsed = JSON.parse(stored);
        setArticles(parsed.filter((c) => c.status === "Published"));
      }
    };

    loadArticles();

    // Real-time updates
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

  const contentToShow = articles.length > 0 ? articles : fallbackTopics;

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 border-b pb-2">
        <BookOpenIcon className="w-7 h-7 text-[#b1001a]" />
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Education Hub
        </h2>
      </div>

      {/* Content Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        {contentToShow.map((item) => (
          <div
            key={item.id}
            className="bg-white/90 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between"
          >
            <div>
              {/* Dynamic or Fallback Header */}
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${
                  item.color || "from-blue-500 to-blue-600"
                } text-white shadow mb-4`}
              >
                <BookOpenIcon className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Media Support */}
              {item.media && item.mediaType === "image" && (
                <img
                  src={item.media}
                  alt="Article visual"
                  className="rounded-lg border mb-4 w-full object-cover max-h-48"
                />
              )}
              {item.media && item.mediaType === "video" && (
                <video
                  controls
                  src={item.media}
                  className="rounded-lg border mb-4 w-full max-h-48"
                />
              )}
              {item.media && item.mediaType === "pdf" && (
                <iframe
                  src={item.media}
                  className="w-full h-64 rounded-lg border mb-4"
                  title="PDF Preview"
                />
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-2 mt-2">
              <span>Category: {item.category || "General"}</span>
              {item.link && (
                <a
                  href={item.link}
                  className="text-[#b1001a] hover:underline font-medium"
                >
                  Learn More →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
