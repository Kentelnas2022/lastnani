"use client";
import { useEffect, useState } from "react";

export default function RoutesManagement() {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: "Main Route A",
      type: "primary",
      puroks: ["Purok 1", "Purok 2", "Purok 3"],
      roadCondition: "clear",
      duration: "2 hours",
      notes: "Standard morning collection route",
      isActive: true,
    },
    {
      id: 2,
      name: "Alternative Route B",
      type: "alternative",
      puroks: ["Purok 4", "Purok 5"],
      roadCondition: "construction",
      duration: "2.5 hours",
      notes: "Use when main road is blocked",
      isActive: false,
    },
  ]);

  const getConditionColor = (condition) => {
    switch (condition) {
      case "clear":
        return "bg-green-500";
      case "construction":
        return "bg-yellow-500";
      case "flooded":
        return "bg-blue-500";
      case "blocked":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const toggleActive = (id) => {
    setRoutes((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isActive: !r.isActive } : { ...r, isActive: false }
      )
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 10.3157, lng: 123.8854 }, // Cebu as example
        zoom: 12,
      });

      // Draw active route
      const active = routes.find((r) => r.isActive);
      if (active) {
        const pathCoordinates = [
          { lat: 10.3157, lng: 123.8854 }, // Example start
          { lat: 10.3200, lng: 123.9000 }, // Example middle
          { lat: 10.3300, lng: 123.9100 }, // Example end
        ];

        new window.google.maps.Polyline({
          path: pathCoordinates,
          geodesic: true,
          strokeColor: "#3B82F6", // blue
          strokeOpacity: 0.9,
          strokeWeight: 4,
          map,
        });
      }
    }
  }, [routes]);

  return (
    <div className="bg-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Route Management</h2>
        <p className="text-sm text-gray-500">
          View and manage collection routes with real-time conditions
        </p>
      </div>

      {/* Map */}
      <div className="p-4">
        <div id="map" className="w-full h-96 rounded-lg border border-gray-200 shadow-sm"></div>
      </div>

      {/* Route Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.map((route) => (
          <div
            key={route.id}
            className={`border rounded-lg p-4 transition-all shadow-sm ${
              route.isActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{route.name}</h3>
                <p className="text-xs text-gray-500 capitalize">
                  {route.type} Route
                </p>
              </div>
              {route.isActive && (
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              )}
            </div>

            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">Puroks:</span>{" "}
                {route.puroks.join(", ")}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Condition:</span>
                <span
                  className={`w-2 h-2 rounded-full ${getConditionColor(
                    route.roadCondition
                  )}`}
                ></span>
                <span className="capitalize">{route.roadCondition}</span>
              </p>
              <p>
                <span className="font-medium">Duration:</span> {route.duration}
              </p>
              {route.notes && (
                <p className="text-xs text-gray-500 italic">{route.notes}</p>
              )}
            </div>

            <button
              onClick={() => toggleActive(route.id)}
              className={`mt-3 w-full px-3 py-1.5 rounded text-xs font-medium transition ${
                route.isActive
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-green-50 text-green-600 hover:bg-green-100"
              }`}
            >
              {route.isActive ? "Stop Using" : "Use Route"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}