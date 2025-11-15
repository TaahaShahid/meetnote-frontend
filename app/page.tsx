"use client";

import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-blue-50 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/MeetNote_logo.jpg"
          alt="MeetNote Logo"
          width={120}
          height={120}
          className="opacity-90"
        />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 text-center">
        Welcome to <span className="text-blue-600">MeetNote</span>
      </h1>

      <p className="mt-3 text-gray-600 text-lg">Your Smart Meeting Companion</p>

      {/* Feature Cards */}
      <div className="flex flex-col md:flex-row gap-6 mt-10">
        <Link href="/transcript">
          <div className="w-48 h-40 bg-white shadow-md rounded-2xl flex flex-col items-center justify-center hover:shadow-xl transition cursor-pointer">
            <div className="bg-blue-100 p-3 rounded-full mb-3">🎙️</div>
            <p className="font-semibold text-gray-700 text-center">
              Live Transcription
            </p>
          </div>
        </Link>

        <Link href="/summary">
          <div className="w-48 h-40 bg-white shadow-md rounded-2xl flex flex-col items-center justify-center hover:shadow-xl transition cursor-pointer">
            <div className="bg-purple-100 p-3 rounded-full mb-3">✨</div>
            <p className="font-semibold text-gray-700 text-center">
              AI Summaries
            </p>
          </div>
        </Link>
      </div>

      {/* Replace bottom CTAs with Sign In / Sign Up */}
      <SignedOut>
        <div className="mt-10 flex gap-4">
          <SignInButton mode="modal">
            <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold border border-blue-600 hover:bg-blue-50 transition shadow-md">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>
    </main>
  );
}
