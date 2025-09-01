"use client";

export default function EmergencyModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80">
        <h2 className="text-xl font-bold text-red-600 mb-2">🚨 Emergency Alert</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to send an emergency alert? This will notify the authorities immediately.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert("🚨 Emergency alert has been sent!");
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Send Alert
          </button>
        </div>
      </div>
    </div>
  );
}
