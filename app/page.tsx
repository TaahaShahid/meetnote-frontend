"use client";

import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-blue-50 to-blue-100 flex flex-col items-center justify-center px-4 py-10">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/new_MeetNote_logo.png"
          alt="MeetNote Logo"
          width={160}
          height={160}
          className="rounded-2xl shadow-lg"
        />
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
        Welcome to <span className="text-blue-600">MeetNote</span>
      </h1>
      <p className="mt-3 text-gray-600 text-lg md:text-xl text-center max-w-xl">
        Your Smart Meeting Companion
      </p>

      {/* Feature Cards */}
      <div className="flex flex-col md:flex-row gap-8 mt-10">
        {/* Live Transcription */}
        <Link href="/transcript">
          <div className="w-56 h-48 bg-linear-to-tr from-blue-100 to-blue-200 shadow-lg rounded-3xl flex flex-col items-center justify-center transition transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
            <div className="text-3xl mb-4 transition-transform transform hover:scale-110">
              🎙️
            </div>
            <p className="font-semibold text-gray-800 text-center text-lg">
              Live Transcription
            </p>
          </div>
        </Link>

        {/* AI Summaries */}
        <Link href="/summary">
          <div className="w-56 h-48 bg-linear-to-tr from-purple-100 to-purple-200 shadow-lg rounded-3xl flex flex-col items-center justify-center transition transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
            <div className="text-3xl mb-4 transition-transform transform hover:scale-110">
              ✨
            </div>
            <p className="font-semibold text-gray-800 text-center text-lg">
              AI Summaries
            </p>
          </div>
        </Link>
      </div>

      {/* Sign In / Sign Up */}
      <SignedOut>
        <div className="mt-12 flex flex-col md:flex-row gap-4">
          <SignInButton mode="modal">
            <button className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg transform hover:-translate-y-0.5">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="px-8 py-3 rounded-2xl bg-white text-blue-700 font-semibold border border-blue-600 hover:bg-blue-50 transition shadow-lg transform hover:-translate-y-0.5">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>
    </main>
  );
}
