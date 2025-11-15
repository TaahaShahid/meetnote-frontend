"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 text-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left — Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/MeetNote_logo.jpg"
            alt="MeetNote Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl font-semibold tracking-wide">MeetNote</span>
        </Link>

        {/* Center — Links */}
        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link
            href="/"
            className={`pb-1 transition ${
              isActive("/")
                ? "text-white border-b-2 border-white"
                : "hover:text-white/80"
            }`}
          >
            Home
          </Link>

          <Link
            href="/extension"
            className={`pb-1 transition ${
              isActive("/extension")
                ? "text-white border-b-2 border-white"
                : "hover:text-white/80"
            }`}
          >
            Extension Popup
          </Link>

          <Link
            href="/transcript"
            className={`pb-1 transition ${
              isActive("/transcript")
                ? "text-white border-b-2 border-white"
                : "hover:text-white/80"
            }`}
          >
            Transcript Viewer
          </Link>

          <Link
            href="/summary"
            className={`pb-1 transition ${
              isActive("/summary")
                ? "text-white border-b-2 border-white"
                : "hover:text-white/80"
            }`}
          >
            AI Summary
          </Link>

          <Link
            href="/dashboard"
            className={`pb-1 transition ${
              isActive("/dashboard")
                ? "text-white border-b-2 border-white"
                : "hover:text-white/80"
            }`}
          >
            Dashboard
          </Link>
        </div>

        {/* Right — User */}
        <div>
          <UserButton />
        </div>
      </nav>
    </header>
  );
}
