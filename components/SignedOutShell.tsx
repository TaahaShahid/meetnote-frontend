"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function SignedOutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Keep this logic consistent with Navbar.tsx (Navbar returns null on auth routes).
  const showNavbar =
    !pathname?.startsWith("/sign-in") && !pathname?.startsWith("/sign-up");

  // The landing page already has its own top padding for the hero layout.
  // Adding a global navbar offset there makes it look pushed down.
  const needsNavbarOffset = showNavbar && pathname !== "/";

  return (
    <>
      <Navbar />
      <div className={needsNavbarOffset ? "pt-[calc(2em+60px+16px)]" : ""}>
        {children}
      </div>
    </>
  );
}
