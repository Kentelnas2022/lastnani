"use client";

import { useState } from "react";
import { Pencil, Trash2, Calendar, Clock, MapPin, User, X } from "lucide-react";

export default function Schedule() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      route: "Route A - Residential",
      days: ["Monday", "Wednesday", "Friday"],
      time: "06:00 - 10:00",
      area: "Purok 1-3",
      driver: "Pedro Santos",
      status: "Active",
    },
    {
      id: 2,
      route: "Route B - Commercial",
      days: ["Tuesday", "Thursday", "Saturday"],
      time: "05:00 - 09:00",
      area: "Main Street, Market Area",
      driver: "Jose Garcia",
      status: "Active",
    },
  ]);

  const [form, setForm] = useState({
    id: null,
    route: "",
    area: "",
    days: [],
    startTime: "",
    endTime: "",
    driver: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // for delete confirmation

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Checkbox toggle for days
  const handleDayToggle = (day) => {
    setForm((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save schedule
  const handleSubmit = (e) => {
    e.preventDefault();

    const newSchedule = {
      ...form,
      time: `${form.startTime} - ${form.endTime}`,
    };

    if (isEditing) {
      setSchedules(schedules.map((s) => (s.id === form.id ? newSchedule : s)));
      setIsEditing(false);
    } else {
      setSchedules([...schedules, { ...newSchedule, id: Date.now() }]);
    }

    resetForm();
  };

  const resetForm = () => {
    setForm({
      id: null,
      route: "",
      area: "",
      days: [],
      startTime: "",
      endTime: "",
      driver: "",
      status: "Active",
    });
    setShowModal(false);
  };

  // Edit
  const handleEdit = (sched) => {
    const [start, end] = sched.time.split(" - ");
    setForm({
      ...sched,
      startTime: start,
      endTime: end,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  // Ask delete confirmation
  const handleDeleteAsk = (id) => {
    setDeleteId(id);
  };

  // Confirm delete
  const handleDeleteConfirm = () => {
    setSchedules(schedules.filter((s) => s.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Collection Schedule</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
        >
          ✨ Add New Schedule
        </button>
      </div>

      {/* Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map((sched) => (
          <div
            key={sched.id}
            className="relative bg-white rounded-xl border border-gray-100 shadow-md p-5 hover:shadow-lg transition-all"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-indigo-600">{sched.route}</h3>
              <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full">
                {sched.status}
              </span>
            </div>

            {/* Details */}
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" /> {sched.days.join(", ")}
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" /> {sched.time}
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" /> {sched.area}
              </li>
              <li className="flex items-center gap-2">
                <User size={16} className="text-gray-500" /> {sched.driver || "—"}
              </li>
            </ul>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(sched)}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                onClick={() => handleDeleteAsk(sched.id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                ✨ {isEditing ? "Edit Schedule" : "Add New Schedule"}
              </h3>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Route Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Route Name</label>
                <input
                  type="text"
                  name="route"
                  value={form.route}
                  onChange={handleChange}
                  placeholder="e.g., Route D - Industrial"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area Coverage</label>
                <input
                  type="text"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  placeholder="e.g., Purok 4-5, Industrial Zone"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Days</label>
                <div className="grid grid-cols-2 gap-2">
                  {weekDays.map((day) => (
                    <label key={day} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.days.includes(day)}
                        onChange={() => handleDayToggle(day)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={form.startTime}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={form.endTime}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {/* Driver */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver</label>
                <input
                  type="text"
                  name="driver"
                  value={form.driver}
                  onChange={handleChange}
                  placeholder="Driver name (optional)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                >
                  {isEditing ? "Update Schedule" : "✅ Add Schedule"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center">
            <h3 className="text-lg font-bold mb-4">🗑️ Delete Schedule?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this schedule?</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
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
