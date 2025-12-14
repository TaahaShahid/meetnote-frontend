"use client";

import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { useEffect, useState } from "react";
import { Calendar, Video, Plus, LogIn } from "lucide-react";

export default function Home() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-[#262728] text-white">
      {/* MAIN CONTENT (shifted to make space for sidebar) */}
      <main className="ml-64 p-10 h-full overflow-auto">
        {/* Top Banner */}
        <div
          className="relative rounded-2xl p-8 mb-8 shadow-lg overflow-hidden bg-cover bg-center min-h-[450px]"
          style={{ backgroundImage: "url('/home.jpg')" }}
        >
          {/* Lighter overlay so the image is more visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

          <div className="relative flex flex-col justify-center h-full">
            <p className="text-gray-300 mb-2 text-sm bg-[#2A2B2F] px-4 py-1 rounded-full w-fit">
              Upcoming Meeting at: 12:30 PM
            </p>

            <h1 className="text-6xl font-bold">{time}</h1>
            <p className="mt-2 text-lg text-gray-400">{date}</p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <DashboardCard
            title="start recording"
            subtitle="Start an instant meeting"
            icon={<Plus size={40} />}
            color="bg-[#FF6B2C]"
            href="/extension"
          />
          <DashboardCard
            title="Meetings"
            subtitle="Meeting recordings"
            icon={<Video size={40} />}
            color="bg-[#F2B233]"
            href="/dashboard"
          />
          <DashboardCard
            title="view Action items"
            subtitle="Plan your meeting"
            icon={<Calendar size={40} />}
            color="bg-[#7E3FF2]"
            href="/summary"
          />
        </div>
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  subtitle,
  icon,
  color,
  href,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}) {
  return (
    <Link href={href} className="block">
      <div
        className={`p-6 rounded-2xl cursor-pointer hover:opacity-90 transition shadow-lg ${color}`}
      >
        {icon}
        <h2 className="mt-4 text-xl font-bold">{title}</h2>
        <p className="text-sm opacity-90">{subtitle}</p>
      </div>
    </Link>
  );
}
