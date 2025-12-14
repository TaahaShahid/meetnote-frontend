"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  SquareKanban,
  FileText,
  Layers,
  Star,
  Settings,
  LogOut,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function Sidebar() {
  const pathname = usePathname();

  const mainLinks = [
    { label: "Home", href: "/home", icon: <Home size={20} /> },
    {
      label: "Extension",
      href: "/extension",
      icon: <SquareKanban size={20} />,
    },
    { label: "Summary", href: "/summary", icon: <FileText size={20} /> },
    { label: "Dashboard", href: "/dashboard", icon: <Layers size={20} /> },
  ];

  const supportLinks = [
    { label: "Settings", href: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#262728] border-r shadow-sm flex flex-col z-40 border-gray-500">
      {/* Logo + User */}
      <div className="p-6 border-b flex items-center justify-between border-gray-500">
        <Link href="/home" className="flex items-center gap-3">
          <img
            src="/new_MeetNote_logo.png"
            alt="MeetNote Logo"
            className="w-15 h-15 object-contain"
          />
          <span className="text-3xl font-bold tracking-wide bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 text-transparent bg-clip-text animate-gradient bg-[length:200%_200%]">
            MeetNote
          </span>
        </Link>
      </div>

      {/* --- Main Navigation --- */}
      <div className="px-4 py-4 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {mainLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                pathname === item.href
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-6 mb-3">
          <hr className="border-gray-500" />
        </div>

        {/* --- Support Section --- */}
        <p className="px-3 mb-2 text-gray-500 text-xs font-semibold tracking-wide">
          SUPPORT
        </p>

        <div className="space-y-1">
          {supportLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                pathname === item.href
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}

          {/* Profile row with UserButton aligned like Settings */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg transition text-gray-400 hover:bg-gray-100">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8",
                },
              }}
            />
            <span className="font-medium">Profile</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
