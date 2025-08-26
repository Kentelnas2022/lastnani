"use client";
import { useState } from "react";

export default function SMS() {
  const [recipientGroup, setRecipientGroup] = useState("all");
  const [messageType, setMessageType] = useState("custom");
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [schedule, setSchedule] = useState(false);
  const [scheduleTime, setScheduleTime] = useState("");
  const [history, setHistory] = useState([]);
  const [sentToday, setSentToday] = useState(0);
  const [totalRecipients, setTotalRecipients] = useState(0);

  // Message templates (like in Official.html)
  const messageTemplates = {
    custom: "",
    collection: "Reminder: Waste collection will happen today. Please place your garbage outside before 6:00 AM.",
    delay: "Notice: Waste collection is delayed due to unforeseen circumstances. We apologize for the inconvenience.",
    education: "Eco Tip: Segregate your biodegradable and non-biodegradable waste to help keep our barangay clean.",
    emergency: "⚠️ Emergency Alert: Please be advised of an urgent waste-related announcement from Barangay Tambacan.",
  };

  // Handle message type selection
  const handleTypeChange = (e) => {
    const type = e.target.value;
    setMessageType(type);
    setMessage(messageTemplates[type]);
    setCharCount(messageTemplates[type].length);
  };

  // Handle message change manually
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setCharCount(e.target.value.length);
  };

  // Submit SMS
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Please enter a message before sending.");
      return;
    }

    const timestamp = new Date().toLocaleString();
    const newEntry = {
      recipientGroup,
      messageType,
      message,
      schedule: schedule ? scheduleTime : "Now",
      timestamp,
    };

    setHistory([newEntry, ...history]); // add to history
    setSentToday(sentToday + 1);
    setTotalRecipients(totalRecipients + 1); // demo: +1 per send

    // Reset message box
    setMessage("");
    setCharCount(0);
    setSchedule(false);
    setScheduleTime("");
    setMessageType("custom");
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Send SMS */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send SMS Alert</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Recipient Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Group
            </label>
            <select
              value={recipientGroup}
              onChange={(e) => setRecipientGroup(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Residents (150 contacts)</option>
              <option value="purok1">Purok 1 (45 contacts)</option>
              <option value="purok2">Purok 2 (35 contacts)</option>
              <option value="purok3">Purok 3 (50 contacts)</option>
              <option value="commercial">Commercial Establishments (20 contacts)</option>
            </select>
          </div>

          {/* Message Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message Type
            </label>
            <select
              value={messageType}
              onChange={handleTypeChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="custom">Custom Message</option>
              <option value="collection">Collection Reminder</option>
              <option value="delay">Collection Delay</option>
              <option value="education">Educational Tip</option>
              <option value="emergency">Emergency Alert</option>
            </select>
          </div>

          {/* Message Box */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={handleMessageChange}
              rows="4"
              maxLength="160"
              placeholder="Enter your message here..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Character count: {charCount}/160
            </p>
          </div>

          {/* Schedule */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={schedule}
              onChange={(e) => setSchedule(e.target.checked)}
              className="rounded"
            />
            <label className="text-sm text-gray-700">Schedule for later</label>
          </div>

          {schedule && (
            <div>
              <input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
          >
            📱 Send SMS Alert
          </button>
        </form>
      </div>

      {/* SMS History */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent SMS History</h3>
        <div className="space-y-4" id="smsHistory">
          {history.length === 0 ? (
            <p className="text-gray-500 italic">No messages yet...</p>
          ) : (
            history.map((entry, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">To:</span> {entry.recipientGroup}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Type:</span> {entry.messageType}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Message:</span> {entry.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Sent: {entry.timestamp} ({entry.schedule})
                </p>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📊 SMS Statistics</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Messages Sent Today</p>
              <p className="text-2xl font-bold text-blue-600">{sentToday}</p>
            </div>
            <div>
              <p className="text-gray-600">Total Recipients</p>
              <p className="text-2xl font-bold text-green-600">{totalRecipients}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
