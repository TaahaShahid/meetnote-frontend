"use client";

import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-7xl bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Section - Placeholder Image */}
        <div className="relative h-[450px] md:h-auto">
          <Image
            src="/lp.jpg" // put any placeholder image in public/
            alt="Placeholder"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="p-10 md:p-16 text-white flex flex-col justify-center">
          {/* Logo Placeholder */}
          <div>
            <img
              src="/new_MeetNote_logo.png"
              alt="App Logo"
              className="w-30 h-30  object-contain"
            />
          </div>
          {/* <img
            src="/new_MeetNote_logo.png"
            alt="App Logo"
            className="w-30 h-30 mb-6 object-contain"
          /> */}

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Turn Every Meeting <br />
            Into Actionable <br />
            Insights
          </h1>

          <ul className="space-y-4 mb-8 text-lg">
            <li className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-white"></span>
              AI-powered speech transcription
            </li>
            <li className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-white"></span>
              Smart summaries delivered instantly through email
            </li>
            <li className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-white"></span>
              Understands and translate every language
            </li>
          </ul>

          {/* Email Input + Button */}
          {/* <div className="flex items-center gap-3 mb-10">
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl shadow-lg hover:bg-gray-300 transition">
              SIGN-UP AND START NOW
            </button>
            <button className="px-6 py-3 bg-black text-white font-semibold rounded-xl shadow-lg hover:bg-gray-800 transition">
              LOGIN
            </button>
          </div> */}
          <SignedOut>
            <div className="flex items-center gap-3 mb-10">
              <SignUpButton mode="modal" forceRedirectUrl="/home">
                <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl shadow-lg hover:bg-gray-300 transition">
                  SIGNUP AND START NOW
                </button>
              </SignUpButton>

              <SignInButton mode="modal" forceRedirectUrl="/home">
                <button className="px-6 py-3 bg-black text-white font-semibold rounded-xl shadow-lg hover:bg-gray-800 transition">
                  LOGIN
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <p className="text-sm md:text-base max-w-md opacity-90">
            Save time. Stay organized. Never miss a detail again.
            <br />
            Focus on talking, let MeetNote handle the notes.
            <br />
          </p>
        </div>
      </div>
    </main>
  );
}
