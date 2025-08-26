"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Trash2,
  Pencil,
  Plus,
  X,
  Home,
  Star,
  Ruler,
} from "lucide-react";

export default function Routes() {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: "Route A",
      area: "Purok 1-2",
      distance: "12.5",
      time: "3.2",
      type: "Residential",
      priority: "High Priority",
    },
    {
      id: 2,
      name: "Route B",
      area: "Purok 3-4",
      distance: "15.8",
      time: "4.1",
      type: "Residential",
      priority: "Medium Priority",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    id: null,
    name: "",
    area: "",
    distance: "",
    time: "",
    type: "",
    priority: "High Priority",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (form.id) {
      setRoutes(routes.map((r) => (r.id === form.id ? form : r)));
    } else {
      setRoutes([...routes, { ...form, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      area: "",
      distance: "",
      time: "",
      type: "",
      priority: "High Priority",
    });
    setShowModal(false);
  };

  const handleEdit = (route) => {
    setForm(route);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    setRoutes(routes.filter((r) => r.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🚚 Route Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl flex items-center gap-2 transition"
        >
          <Plus size={20} /> Add New Route
        </button>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Routes */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Current Routes</h3>
          <div className="space-y-4">
            {routes.map((route) => (
              <div
                key={route.id}
                className=" rounded-xl p-4 shadow-sm hover:shadow-md transition bg-gradient-to-br from-white to-gray-50"
              >
                <h4 className="font-bold text-gray-800">{route.name}</h4>

                {/* Details */}
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-rose-500" />
                    <span>{route.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler size={16} className="text-indigo-500" />
                    <span>Distance: {route.distance} km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-emerald-500" />
                    <span>Time: {route.time} hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home size={16} className="text-orange-500" />
                    <span>Type: {route.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-500" />
                    <span>Priority: {route.priority}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setViewModal(route)}
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg text-sm shadow-sm transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(route)}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-1 shadow-sm transition"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(route.id)}
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-1 shadow-sm transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Route Map Placeholder */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Route Map</h3>
          <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">🗺️ Interactive Map View</p>
              <p className="text-sm text-gray-400">
                Route visualization will appear here
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl relative">
            <div className="flex justify-between items-center border-b pb-3 mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                {form.id ? "✏️ Edit Route" : "🗺️ Add New Route"}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleAddOrEdit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Route Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Route E"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coverage Area
                </label>
                <input
                  type="text"
                  name="area"
                  placeholder="e.g., Purok 6-7"
                  value={form.area}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Distance (km)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="distance"
                    value={form.distance}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Est. Time (hours)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Route Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                >
                  <option value="">Select type</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option>High Priority</option>
                  <option>Medium Priority</option>
                  <option>Low Priority</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-semibold shadow-md"
                >
                  {form.id ? "Update Route" : "Add Route"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MapPin size={20} className="text-indigo-500" /> {viewModal.name}
              </h3>
              <button
                onClick={() => setViewModal(null)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={22} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-rose-500" />
                <span><b>Area:</b> {viewModal.area}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler size={18} className="text-indigo-500" />
                <span><b>Distance:</b> {viewModal.distance} km</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-emerald-500" />
                <span><b>Time:</b> {viewModal.time} hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Home size={18} className="text-orange-500" />
                <span><b>Type:</b> {viewModal.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="text-yellow-500" />
                <span><b>Priority:</b> {viewModal.priority}</span>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mt-6">
              <p className="text-gray-500">🗺️ Route Map Preview</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setViewModal(null)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
              <Trash2 size={20} className="text-rose-500" /> Delete Route?
            </h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-indigo-600">
                {routes.find((r) => r.id === deleteId)?.name}
              </span>
              ?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleDeleteConfirm}
                className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-lg font-semibold shadow-sm transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg font-semibold shadow-sm transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
