"use client";
import Header from "../components-collector/Header";
import StatsOverview from "../components-collector/StatsOverview";
import Tabs from "../components-collector/Tabs";
import Schedule from "../components-collector/Schedule";

export default function Dashboard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* Stats Overview */}
        <StatsOverview />

        {/* Tabs (Collection Status + Route Management) */}
        <Tabs />

        {/* Schedule Section */}
        <Schedule />
      </div>
    </div>
  );
}