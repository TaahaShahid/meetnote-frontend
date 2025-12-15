"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronFirst,
  ChevronLast,
  Home,
  SquareKanban,
  FileText,
  Layers,
  Settings,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

/* -------------------------------- Context -------------------------------- */

type SidebarContextType = {
  expanded: boolean;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("Sidebar components must be inside <Sidebar />");
  return context;
}

/* -------------------------------- Sidebar -------------------------------- */

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      data-collapsed={!expanded}
      className="peer fixed left-0 top-0 h-screen z-40"
    >
      <nav
        className={`
          h-full flex flex-col bg-white border-r shadow-sm
          transition-all duration-300
          ${expanded ? "w-64" : "w-20"}
        `}
      >
        {/* Logo + Toggle */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <Link href="/home" className="flex items-center gap-3">
            <img
              src="/new_MeetNote_logo.png"
              alt="MeetNote Logo"
              className={`transition-all overflow-hidden ${
                expanded ? "w-10" : "w-0"
              }`}
            />
            <span
              className={`text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent select-none ${
                expanded ? "w-32" : "w-0"
              }`}
            >
              MeetNote
            </span>
          </Link>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          {/* Main Links */}
          <ul className="flex-1 px-3">
            <SidebarItem icon={<Home size={20} />} text="Home" href="/home" />
            <SidebarItem
              icon={<SquareKanban size={20} />}
              text="Extension"
              href="/extension"
            />
            <SidebarItem
              icon={<FileText size={20} />}
              text="Summary"
              href="/summary"
            />
            <SidebarItem
              icon={<Layers size={20} />}
              text="Dashboard"
              href="/dashboard"
            />

            {/* Soft divider + secondary section */}
            <li className="my-2">
              <div className="border-t border-gray-200/80" />
            </li>

            <SidebarItem
              icon={<Settings size={20} />}
              text="Settings"
              href="/settings"
            />

            <li>
              <div className="relative flex items-center py-2 px-3 my-1 rounded-md text-gray-900 font-medium hover:bg-indigo-50 transition-colors group">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonTrigger:
                        "w-5 h-5 flex items-center justify-center -ml-0.5",
                      userButtonAvatarBox: "w-5 h-5",
                    },
                  }}
                />

                <span
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                  }`}
                >
                  Profile
                </span>

                {!expanded && (
                  <span
                    className="
                      absolute left-full ml-6 px-2 py-1
                      rounded-md bg-indigo-100 text-indigo-900 text-sm font-medium
                      opacity-0 invisible -translate-x-3
                      transition-all group-hover:opacity-100
                      group-hover:visible group-hover:translate-x-0
                    "
                  >
                    Profile
                  </span>
                )}
              </div>
            </li>
          </ul>

          {/* ===================== Otter Pro Section (ADDED) ===================== */}
          <div
            className={`px-4 pb-4 transition-all ${
              expanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="rounded-xl border border-gray-200 p-4 bg-white">
              <p className="text-sm font-semibold text-gray-900">Basic</p>

              <p className="mt-1 text-xs text-gray-500">
                2 of 300 monthly mins used
              </p>

              {/* Progress bar */}
              <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full w-[1%] bg-blue-500 rounded-full" />
              </div>

              <button
                className="
                  mt-4 w-full rounded-lg border border-blue-500
                  py-2 text-sm font-semibold text-blue-600
                  hover:bg-blue-50 transition
                "
              >
                Get MeetNote Pro
              </button>
            </div>
          </div>
          {/* =================================================================== */}
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

/* ------------------------------ Sidebar Item ------------------------------ */

type SidebarItemProps = {
  icon: ReactNode;
  text: string;
  href: string;
};

function SidebarItem({ icon, text, href }: SidebarItemProps) {
  const { expanded } = useSidebar();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`
          relative flex items-center py-2 px-3 my-1
          rounded-md cursor-pointer transition-colors group
          ${
            isActive
              ? "bg-indigo-100 text-indigo-900 font-medium"
              : "hover:bg-indigo-50 text-gray-900 font-medium"
          }
        `}
      >
        {icon}

        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>

        {!expanded && (
          <span
            className="
              absolute left-full ml-6 px-2 py-1
              rounded-md bg-indigo-100 text-indigo-900 text-sm font-medium
              opacity-0 invisible -translate-x-3
              transition-all group-hover:opacity-100
              group-hover:visible group-hover:translate-x-0
            "
          >
            {text}
          </span>
        )}
      </Link>
    </li>
  );
}
