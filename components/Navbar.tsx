"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="w-full bg-white shadow-lg backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 rounded-b-xl">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/MeetNote_logo.png"
            alt="MeetNote Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-2xl font-bold text-black tracking-wide">MeetNote</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-black font-bold text-sm">
          {["/", "/extension", "/transcript", "/summary", "/dashboard"].map(
            (href, idx) => (
              <Link
                key={idx}
                href={href}
                className={`pb-1 transition ${
                  isActive(href) ? "border-b-2 border-black" : "hover:text-gray-700"
                }`}
              >
                {["Home", "Extension", "Transcript", "Summary", "Dashboard"][idx]}
              </Link>
            )
          )}
        </div>

        {/* User */}
        <div>
          <UserButton />
        </div>

      </nav>
    </header>
  );
}
