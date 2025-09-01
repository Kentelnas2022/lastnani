"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle2, FileText, Leaf, MessageSquare, Trash2, Info, MapPin } from "lucide-react";

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(null);

  const cards = [
    {
      id: "collections",
      title: "Total Collections Today",
      value: "24",
      subtitle: "+12% vs yesterday",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      icon: <Trash2 className="w-6 h-6 text-white" />,
    },
    {
      id: "compliance",
      title: "Compliance Rate",
      value: "4.7/5",
      subtitle: "+5% this month",
      color: "green",
      gradient: "from-green-500 to-green-600",
      icon: <CheckCircle2 className="w-6 h-6 text-white" />,
    },
    {
      id: "reports",
      title: "Pending Reports",
      value: "7",
      subtitle: "Needs attention",
      color: "yellow",
      gradient: "from-yellow-500 to-yellow-600",
      icon: <Info className="w-6 h-6 text-white" />,
    },
    {
      id: "routes",
      title: "Active Routes",
      value: "5",
      subtitle: "All operational",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      icon: <MapPin className="w-6 h-6 text-white" />,
    },
  ];

  const efficiencyData = [
    { day: "Mon", efficiency: 94 },
    { day: "Tue", efficiency: 88 },
    { day: "Wed", efficiency: 91 },
    { day: "Thu", efficiency: 86 },
    { day: "Fri", efficiency: 95 },
    { day: "Sat", efficiency: 89 },
    { day: "Sun", efficiency: 92 },
  ];

  const activities = [
    {
      id: 1,
      color: "bg-green-500",
      title: "Route A completed successfully",
      time: "2 minutes ago",
    },
    {
      id: 2,
      color: "bg-blue-500",
      title: "SMS alert sent to 150 residents",
      time: "15 minutes ago",
    },
    {
      id: 3,
      color: "bg-yellow-500",
      title: "New citizen report received",
      time: "1 hour ago",
    },
  ];

  return (
    <section className="tab-content active space-y-8">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative bg-white rounded-xl shadow-md p-5 flex justify-between items-center"
          >
            {/* Left Text */}
            <div>
              <p className="text-gray-500 text-sm font-medium">{card.title}</p>
              <h2 className={`text-2xl font-bold text-${card.color}-600`}>
                {card.value}
              </h2>
              <p className={`text-${card.color}-500 text-xs font-medium`}>
                {card.subtitle}
              </p>
            </div>

            {/* Icon Badge */}
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-md`}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Activities and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
              >
                <span
                  className={`w-3 h-3 rounded-full ${activity.color}`}
                ></span>
                <div>
                  <p className="font-medium text-gray-700">{activity.title}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collection Efficiency */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Collection Efficiency
          </h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
