"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CheckCircle2,
  Trash2,
  Info,
  MapPin,
  MessageSquare,
  FileText,
} from "lucide-react";

export default function Dashboard() {
  const cards = [
    {
      id: "collections",
      title: "Total Collections Today",
      value: "24",
      subtitle: "+12% vs yesterday",
      border: "border-blue-500",
      bg: "from-blue-50 to-blue-100",
      icon: <Trash2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
      subtitleColor: "text-blue-600",
    },
    {
      id: "compliance",
      title: "Compliance Rate",
      value: "4.7/5",
      subtitle: "+5% this month",
      border: "border-green-500",
      bg: "from-green-50 to-green-100",
      icon: <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
      subtitleColor: "text-green-600",
    },
    {
      id: "reports",
      title: "Pending Reports",
      value: "7",
      subtitle: "Needs attention",
      border: "border-yellow-500",
      bg: "from-yellow-50 to-yellow-100",
      icon: <Info className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />,
      subtitleColor: "text-yellow-600",
    },
    {
      id: "routes",
      title: "Active Routes",
      value: "5",
      subtitle: "All operational",
      border: "border-purple-500",
      bg: "from-purple-50 to-purple-100",
      icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />,
      subtitleColor: "text-purple-600",
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
      color: "text-green-600",
      title: "Route A completed successfully",
      time: "2 minutes ago",
      icon: CheckCircle2,
    },
    {
      id: 2,
      color: "text-blue-600",
      title: "SMS alert sent to 150 residents",
      time: "15 minutes ago",
      icon: MessageSquare,
    },
    {
      id: 3,
      color: "text-yellow-600",
      title: "New citizen report received",
      time: "1 hour ago",
      icon: FileText,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6 relative overflow-hidden">
      {/* Floating Background Blobs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 floating-icon"></div>
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-20 floating-icon"></div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`hover-lift rounded-xl sm:rounded-2xl shadow-xl p-5 border ${card.border}
                        bg-gradient-to-br ${card.bg} backdrop-blur-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-medium">{card.title}</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {card.value}
                </h2>
                <p className={`text-xs font-medium ${card.subtitleColor}`}>
                  {card.subtitle}
                </p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activities + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 relative z-10">
        {/* Recent Activities */}
        <div className="glass-card hover-lift rounded-xl sm:rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-bold gradient-text">
              Recent Activities
            </h3>
          </div>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="activity-item flex items-center gap-3 p-3 rounded-lg"
              >
                {/* Up/Down Animated Icon */}
                <activity.icon
                  className={`w-6 h-6 ${activity.color} animate-bounce`}
                />
                <div>
                  <p className="font-medium text-gray-700">{activity.title}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collection Efficiency */}
        <div className="glass-card hover-lift rounded-xl sm:rounded-2xl shadow-2xl p-6 card-hover-effect">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-bold gradient-text">
              Collection Efficiency
            </h3>
            <div className="floating-icon">📊</div>
          </div>
          <div className="chart-container h-60">
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
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#6366f1" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
