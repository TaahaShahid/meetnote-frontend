"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExtensionPopup() {
  const router = useRouter();

  useEffect(() => {
    try {
      const v = localStorage.getItem("meetnote_logged_in");
      if (!v) router.push("/login");
    } catch {}
  }, [router]);

  const meetings = [
    { title: "Product Strategy Meeting", time: "Today, 2:30 PM", duration: "45 min" },
    { title: "Team Standup", time: "Yesterday, 10:00 AM", duration: "15 min" },
    { title: "Client Review Session", time: "Nov 7, 3:00 PM", duration: "1h 20m" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md bg-blue-50 rounded-3xl shadow-lg p-6 relative">
        <button className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition">
          🎙️ Start Recording
        </button>

        <button className="w-full mt-4 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:bg-blue-50 flex items-center justify-center gap-2">
          📁 Upload Audio File
        </button>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium text-gray-800">Recent Meetings</h2>
            <a href="#" className="text-blue-500 text-sm">View All</a>
          </div>

          <div className="flex flex-col gap-3">
            {meetings.map((m, i) => (
              <div key={i} className="p-4 rounded-xl border border-gray-200 bg-blue-100">
                <p className="font-medium text-gray-800">{m.title}</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <span>🕒</span>
                  <span>{m.time}</span> • <span>{m.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
