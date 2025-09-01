"use client";
import { useState, useEffect } from "react";

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
    // Also listen to custom events triggered by Education.jsx
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
        Educational Content
      </h2>

      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
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
                    className="rounded-lg border mb-4"
                  />
                )}
                {article.media && article.mediaType === "video" && (
                  <video
                    controls
                    src={article.media}
                    className="rounded-lg border mb-4 w-full"
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
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm italic">No published content yet.</p>
      )}
    </section>
  );
}
