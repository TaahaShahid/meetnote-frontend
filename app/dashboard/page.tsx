"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    try { localStorage.setItem("meetnote_logged_in", "1"); } catch {}
    router.push("/extension");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-10">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-gray-50 rounded-3xl shadow-xl overflow-hidden">
        {/* Left Info */}
        <div className="flex-1 p-10 flex flex-col justify-center gap-6">
          <img src="/MeetNote_logo.png" alt="MeetNote" className="w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0" />
          <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">Welcome to MeetNote</h1>
          <p className="text-gray-600 text-center md:text-left">Your Smart Meeting Companion</p>
        </div>

        {/* Right Form */}
        <div className="flex-1 bg-white p-8 md:p-12 flex flex-col justify-center gap-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Sign In</h2>

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            Continue with Google
          </button>

          <div className="flex items-center my-4 text-gray-400 text-sm">
            <span className="flex-1 border-t border-gray-200" />
            <span className="px-3">or continue with email</span>
            <span className="flex-1 border-t border-gray-200" />
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account? <span className="text-blue-600 cursor-pointer">Sign Up</span>
          </p>
        </div>
      </div>
    </main>
  );
}
