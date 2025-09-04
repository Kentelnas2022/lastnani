"use client";
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

        {/* Content Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${topic.color} text-white shadow mb-4`}
              >
                <BookOpenIcon className="w-6 h-6" />
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
