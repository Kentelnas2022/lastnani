"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";

export default function ScheduleTab() {
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Garbage Collection Schedule</h2>
      <ul>
        {schedules.length > 0 ? (
          schedules.map((sched) => (
            <li key={sched.schedule_id} className="border-b py-2">
              📅 {sched.date} | {sched.day} | {sched.purok} | ⏰ {sched.time}
            </li>
          ))
        ) : (
          <p>No schedules available</p>
        )}
      </ul>
    </div>
  );
}
