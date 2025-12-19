"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Mic, Upload, Bot } from "lucide-react";

type Meeting = {
  id: number;
  title: string;
  time: string;
  duration: string;
  author: string;
};

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Dummy meetings (same structure as Otter UI)
  const meetings: Meeting[] = [
    {
      id: 1,
      title: "Note",
      time: "10:42 PM",
      duration: "10 sec",
      author: "Taaha Shahid",
    },
    {
      id: 2,
      title: "Taaha Shahid’s Meeting Notes",
      time: "2:01 PM",
      duration: "38 sec",
      author: "Taaha Shahid",
    },
    {
      id: 3,
      title: "Note",
      time: "1:57 PM",
      duration: "28 sec",
      author: "Taaha Shahid",
    },
  ];

  const filteredMeetings = useMemo(() => {
    if (!query.trim()) return meetings;
    return meetings.filter((meeting) =>
      meeting.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, meetings]);

  return (
    <div className="relative flex-1 bg-white">
      {/* ───────────────── Sticky Header ───────────────── */}
      <header className="sticky top-0 z-30 bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4 gap-4">
          {/* Search Bar */}
          <div className="relative w-full max-w-xl">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask or search"
              className="w-full rounded-full border border-gray-200 pl-10 pr-16 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              Ctrl K
            </span>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/extension")}
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium hover:bg-gray-50"
            >
              <Upload size={16} />
              Import
            </button>

            <button
              onClick={() => router.push("/extension")}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              <Mic size={16} />
              Record
            </button>
          </div>
        </div>
      </header>

      {/* ───────────────── Main Content ───────────────── */}
      <main className="px-6 py-6 max-w-4xl">
        {/* Date Header */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500">Today, Dec 17</h2>
        </div>

        {/* Meetings List */}
        <div className="space-y-4">
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              onClick={() => router.push("/summary")}
              className="cursor-pointer rounded-2xl border border-gray-200 p-5 hover:bg-gray-50 transition"
            >
              <h3 className="text-base font-semibold text-gray-900">
                {meeting.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {meeting.time} · {meeting.duration} · {meeting.author}
              </p>
            </div>
          ))}

          {filteredMeetings.length === 0 && (
            <p className="text-sm text-gray-400">No meetings found.</p>
          )}
        </div>
      </main>

      {/* ───────────────── Chatbot Floating Button ───────────────── */}
      <button
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex h-14 w-14 items-center justify-center rounded-full border bg-white shadow-lg hover:bg-gray-50"
        title="Chatbot (Coming Soon)"
      >
        <Bot size={22} className="text-gray-700" />
      </button>
    </div>
  );
}
