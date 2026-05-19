"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

// Shared background component with wavy concentric curves matching mockups
export function AuthWaveBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white">
      {/* Wavy concentric arcs starting from left/top */}
      <svg className="absolute w-full h-full opacity-[0.08]" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="-100" cy="450" r="200" stroke="#27A376" strokeWidth="1.5" />
        <circle cx="-100" cy="450" r="300" stroke="#27A376" strokeWidth="1.5" />
        <circle cx="-100" cy="450" r="400" stroke="#27A376" strokeWidth="1.5" />
        <circle cx="-100" cy="450" r="500" stroke="#27A376" strokeWidth="1.5" />
        <circle cx="-100" cy="450" r="600" stroke="#27A376" strokeWidth="1.5" />
        <circle cx="-100" cy="450" r="700" stroke="#27A376" strokeWidth="1.5" />
        <circle cx="-100" cy="450" r="800" stroke="#27A376" strokeWidth="1.5" />
        <circle cx="-100" cy="450" r="900" stroke="#27A376" strokeWidth="1.5" />
        <circle cx="-100" cy="450" r="1000" stroke="#27A376" strokeWidth="1.5" />
        <circle cx="-100" cy="450" r="1100" stroke="#27A376" strokeWidth="1.5" />
        <circle cx="-100" cy="450" r="1200" stroke="#27A376" strokeWidth="1.5" />
        <circle cx="-100" cy="450" r="1300" stroke="#27A376" strokeWidth="1.5" />
        <circle cx="-100" cy="450" r="1400" stroke="#27A376" strokeWidth="1.5" />
        <circle cx="-100" cy="450" r="1500" stroke="#27A376" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const isFormFilled = email.trim().length > 0;

  return (
    <main className="min-h-screen w-full flex flex-col justify-between items-center p-6 relative overflow-hidden bg-white font-sans">
      <AuthWaveBackground />

      {/* Top Spacer */}
      <div className="hidden sm:block"></div>

      {/* Main Content Card */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-8 z-10 py-12">
        {/* Header Logo */}
        <img src="/logo/peoplely.svg" alt="Peoplely HR" className="h-7 w-auto" />

        {/* Text Headers */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-gray-900 font-bold text-h4 tracking-tight">
            Reset your password
          </h2>
          <p className="text-gray-500 text-body-sm max-w-sm mx-auto">
            Enter your email address and we&apos;ll send you password reset instructions.
          </p>
        </div>

        {/* Input Form */}
        <form className="w-full flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); window.location.href = `/otp-verify?email=${encodeURIComponent(email)}`; }}>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-body-xs font-semibold text-gray-700 uppercase tracking-wider">
              Registered Email <span className="text-error">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Input your registered email"
              className="w-full py-3 px-4 text-body-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-2">
            <button
              type="submit"
              disabled={!isFormFilled}
              className={`w-full py-3.5 rounded-xl font-bold text-body-sm transition-all shadow-sm ${
                isFormFilled
                  ? "bg-[#11131A] text-white hover:bg-black active:scale-[0.98] cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Send Reset Code
            </button>

            <Link
              href="/login"
              className="w-full py-3.5 rounded-xl font-bold text-body-sm text-center border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
            >
              Back to Login
            </Link>
          </div>

        </form>
      </div>

      {/* Footer Area */}
      <footer className="text-center text-[10px] text-gray-400 z-10 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <span>&copy; 2025 Peoplely HR. All rights reserved.</span>
          <div className="flex gap-3">
            <a href="#" className="hover:underline font-medium">Terms &amp; Conditions</a>
            <a href="#" className="hover:underline font-medium">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
