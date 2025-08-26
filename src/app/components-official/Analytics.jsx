"use client";
import { useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function Analytics() {
  useEffect(() => {
    let volumeChart, complianceChart;

    const ctx1 = document.getElementById("volumeChart");
    if (ctx1) {
      if (Chart.getChart(ctx1)) Chart.getChart(ctx1).destroy();
      volumeChart = new Chart(ctx1, {
        type: "bar",
        data: {
          labels: ["Purok 1", "Purok 2", "Purok 3", "Commercial"],
          datasets: [
            {
              label: "Weekly Volume (kg)",
              data: [300, 260, 350, 180],
              backgroundColor: ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"],
              borderRadius: 10,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, ticks: { stepSize: 50 } },
          },
        },
      });
    }

    const ctx2 = document.getElementById("complianceChart");
    if (ctx2) {
      if (Chart.getChart(ctx2)) Chart.getChart(ctx2).destroy();
      complianceChart = new Chart(ctx2, {
        type: "doughnut",
        data: {
          labels: ["Purok 1 (95%)", "Purok 2 (82%)", "Purok 3 (88%)", "Commercial (79%)"],
          datasets: [
            {
              data: [95, 82, 88, 79],
              backgroundColor: ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6"],
              borderWidth: 2,
              hoverOffset: 12,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom", labels: { boxWidth: 14, padding: 15 } },
          },
        },
      });
    }

    return () => {
      if (volumeChart) volumeChart.destroy();
      if (complianceChart) complianceChart.destroy();
    };
  }, []);

  return (
    <section className="space-y-10">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Waste Volume Trends */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-lg">
              📊
            </span>
            Waste Volume Trends
          </h3>
          <div className="relative h-64">
            <canvas id="volumeChart"></canvas>
          </div>
        </div>

        {/* Compliance Rates */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-lg">
              ✅
            </span>
            Compliance Rates by Area
          </h3>
          <div className="relative h-64 flex items-center justify-center w-full">
            <canvas id="complianceChart" className="max-w-[280px]"></canvas>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Detailed Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Collection Efficiency */}
          <div className="p-4 rounded-xl hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mx-auto mb-3 text-xl">
              📦
            </div>
            <h4 className="font-medium text-gray-700">Collection Efficiency</h4>
            <p className="text-2xl font-bold text-blue-600 mt-2">94.2%</p>
            <p className="text-sm text-gray-500">Average completion rate</p>
          </div>

          {/* Citizen Participation */}
          <div className="p-4 rounded-xl hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto mb-3 text-xl">
              🏠
            </div>
            <h4 className="font-medium text-gray-700">Citizen Participation</h4>
            <p className="text-2xl font-bold text-green-600 mt-2">87.5%</p>
            <p className="text-sm text-gray-500">Active households</p>
          </div>

          {/* Waste Reduction */}
          <div className="p-4 rounded-xl hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mx-auto mb-3 text-xl">
              ♻️
            </div>
            <h4 className="font-medium text-gray-700">Waste Reduction</h4>
            <p className="text-2xl font-bold text-purple-600 mt-2">23.1%</p>
            <p className="text-sm text-gray-500">Compared to last year</p>
          </div>
        </div>
      </div>
    </section>
  );
}
