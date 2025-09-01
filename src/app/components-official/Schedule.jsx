"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";

export default function Schedule() {
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [purok, setPurok] = useState("");
  const [time, setTime] = useState("");
  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = async () => {
    const { data, error } = await supabase.from("schedules").select("*").order("date");
    if (error) {
      console.error("Error fetching schedules:", error);
    } else {
      setSchedules(data);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleAddSchedule = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("schedules").insert([
      {
        day,
        date,
        purok,
        time,
      },
    ]);

    if (error) {
      console.error("Error adding schedule:", error);
      alert("Failed to add schedule");
    } else {
      setDay("");
      setDate("");
      setPurok("");
      setTime("");
      fetchSchedules(); // refresh list
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Schedule</h2>
      <form onSubmit={handleAddSchedule} className="space-y-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Purok"
          value={purok}
          onChange={(e) => setPurok(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Schedule
        </button>
      </form>

      <div className="mt-6">
        <h3 className="font-semibold">Existing Schedules</h3>
        <ul>
          {schedules.map((sched) => (
            <li key={sched.schedule_id} className="border-b py-2">
              {sched.date} - {sched.day} - {sched.purok} - {sched.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
