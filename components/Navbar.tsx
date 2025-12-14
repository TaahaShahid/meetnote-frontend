"use client";

import { usePathname } from "next/navigation";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import CardNav, { CardNavItem } from "./CardNav";

export default function Navbar() {
  const pathname = usePathname();

  // Hide navbar on auth pages
  if (pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up")) {
    return null;
  }

  const items: CardNavItem[] = [
    {
      label: "About",
      bgColor: "#0B0B14",
      textColor: "#ffffff",
      links: [
        {
          label: "Company",
          href: "/about",
          ariaLabel: "About company",
        },
        {
          label: "Careers",
          href: "/careers",
          ariaLabel: "Careers",
        },
      ],
    },
    {
      label: "Projects",
      bgColor: "#160F2E",
      textColor: "#ffffff",
      links: [
        {
          label: "Featured",
          href: "/projects",
          ariaLabel: "Featured projects",
        },
        {
          label: "Case Studies",
          href: "/case-studies",
          ariaLabel: "Case studies",
        },
      ],
    },
    {
      label: "Contact",
      bgColor: "#241B3A",
      textColor: "#ffffff",
      links: [
        {
          label: "Email",
          href: "/contact",
          ariaLabel: "Email us",
        },
        {
          label: "Twitter",
          href: "https://twitter.com",
          ariaLabel: "Twitter",
        },
        {
          label: "LinkedIn",
          href: "https://linkedin.com",
          ariaLabel: "LinkedIn",
        },
      ],
    },
  ];

  return (
    <div className="relative z-50">
      <CardNav
        logo="/new_MeetNote_logo.png"
        logoAlt="MeetNote"
        brand={
          <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent select-none">
            MeetNote
          </span>
        }
        items={items}
        baseColor="#ffffff"
        menuColor="#000000"
        className="mx-auto"
        cta={
          <SignedOut>
            <SignInButton forceRedirectUrl="/home">
              <button type="button" className="card-nav-cta-button">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
        }
      />
    </div>
  );
}
