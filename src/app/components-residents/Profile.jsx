"use client";

import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function ProfilePage({ user, setUser, onSave }) {
  const [formData, setFormData] = useState(user || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    if (onSave) onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        {/* Avatar */}
        <div className="relative mb-4">
          <UserCircleIcon className="w-24 h-24 text-indigo-400 bg-gray-100 rounded-full" />
          {/* You can add an "edit" icon overlay here if you want to allow avatar upload */}
        </div>
        {/* Editable Fields */}
        <div className="w-full space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purok</label>
            <input
              type="text"
              name="purok"
              value={formData.purok || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>
        </div>
        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-8 w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}