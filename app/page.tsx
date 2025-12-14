"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Video, Mic, Sparkles, CheckCircle } from "lucide-react";
import AnimatedHeroWord from "@/components/AnimatedHeroWord";
import SpotlightCard from "@/components/SpotlightCard";
// import FloatingLines from "@/components/FloatingLines";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* ───────────── Hero Section ───────────── */}
      <section className="relative overflow-hidden">
        {/* Animated Background
        <FloatingLines
          linesGradient={["#3b82f6", "#8b5cf6", "#ec4899"]}
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[6, 5, 4]}
          animationSpeed={0.8}
          parallax
          interactive
        /> */}

        {/* Gradient Blob */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 opacity-40 blur-3xl rounded-full z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20 md:pt-40 md:pb-24 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Brand */}
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/new_MeetNote_logo.png"
                alt="MeetNote"
                className="w-20 h-20 md:w-24 md:h-24 object-contain"
              />
              <div className="leading-tight">
                <p className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                  MeetNote
                </p>
                <p className="mt-1 text-sm md:text-base text-gray-500">
                  AI meeting notes, instantly
                </p>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Turn conversations <br /> into <AnimatedHeroWord />
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              MeetNote is the AI notetaker that automatically records,
              transcribes, and summarizes your meetings so your team never
              misses a detail.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/sign-up"
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Start for free
              </Link>

              <Link
                href="/sign-in"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
              >
                Login
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/40"
                className="w-10 h-10 rounded-full"
                alt="User"
              />
              <p className="text-sm text-gray-600">
                “I use MeetNote almost every day — it feels like a superpower.”
                <br />
                <span className="font-medium text-black">
                  — Product Manager
                </span>
              </p>
            </div>
          </div>

          {/* Right Floating Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -16, 0],
                rotate: [0, 1.2, 0],
                scale: [1, 1.015, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                y: -20,
                rotate: 2,
                scale: 1.03,
              }}
              className="bg-white rounded-2xl shadow-xl p-6 border max-w-md will-change-transform"
            >
              <p className="text-sm text-gray-500 mb-2">Kickoff Meeting</p>

              <h3 className="font-semibold mb-2">AI-generated Summary</h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                Amanda kicked off the meeting by aligning goals. John discussed
                deliverables and timelines while AI captured action items
                automatically.
              </p>

              <div className="mt-4 flex gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle size={14} /> Summary
                </span>
                <span className="flex items-center gap-1">
                  <Mic size={14} /> Transcript
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles size={14} /> AI Notes
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ───────────── Features ───────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            Everything you need for smarter meetings
          </h2>

          <div className="mt-12 grid md:grid-cols-4 gap-6">
            <Feature
              icon={<Mic />}
              title="Live Transcription"
              text="Accurate speech-to-text in real time."
            />
            <Feature
              icon={<Sparkles />}
              title="AI Summaries"
              text="Instant highlights and action items."
            />
            <Feature
              icon={<Calendar />}
              title="Auto Meeting Detection"
              text="Detects meetings from your calendar."
            />
            <Feature
              icon={<Video />}
              title="Platform Integrations"
              text="Works with Zoom, Meet, and Teams."
            />
          </div>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <h2 className="text-4xl font-bold">
          Start turning meetings into knowledge
        </h2>
        <p className="mt-4 opacity-90">
          Join thousands of professionals using MeetNote.
        </p>
        <Link
          href="/sign-up"
          className="inline-block mt-8 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:opacity-90 transition"
        >
          Start for free
        </Link>
      </section>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <SpotlightCard className="bg-white rounded-2xl shadow hover:shadow-lg transition">
      <div className="p-6">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{text}</p>
      </div>
    </SpotlightCard>
  );
}
