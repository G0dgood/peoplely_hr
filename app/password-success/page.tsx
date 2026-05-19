"use client";

import Link from "next/link";
import { AuthWaveBackground } from "../forgot-password/page";

// Inline SVG component to render the custom check circle with floating confetti particles
function SuccessConfettiIllustration() {
  return (
    <div className="relative w-44 h-44 flex items-center justify-center select-none">
      {/* Surrounding floating confetti elements (shapes & colors matching mockup) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 176 176" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Blue Triangle Left */}
        <path d="M28 60 L38 52 L36 66 Z" fill="#3B82F6" transform="rotate(-15, 33, 59)" />
        {/* Orange crescent moon-like curved line Top Left */}
        <path d="M60 28 A 6 6 0 0 1 70 34" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        {/* Green curved line Bottom Left */}
        <path d="M30 115 A 8 8 0 0 0 42 120" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
        {/* Blue square-ish zig-zag Bottom Left */}
        <path d="M55 140 L62 136 L66 142 L72 138" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Orange triangle Top */}
        <path d="M100 24 L108 30 L98 32 Z" fill="#F59E0B" />
        {/* Blue spiral-like ribbon Top Right */}
        <path d="M136 40 Q 140 36 138 46 T 142 50" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Green Star Top Right */}
        <path d="M142 66 L144 72 L150 72 L146 76 L148 82 L142 78 L136 82 L138 76 L134 72 L140 72 Z" fill="#10B981" />
        {/* Pink dot Right */}
        <circle cx="158" cy="100" r="3.5" fill="#EC4899" />
        {/* Blue triangle Bottom Right */}
        <path d="M138 128 L148 132 L140 138 Z" fill="#3B82F6" />
      </svg>

      {/* Main Green Check Circle */}
      <div className="w-24 h-24 rounded-full border-[8px] border-[#27A376] flex items-center justify-center bg-white shadow-md transition-transform duration-500 hover:scale-105">
        <svg className="w-10 h-10 text-[#27A376]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );
}

export default function PasswordSuccessPage() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-between items-center p-6 relative overflow-hidden bg-white font-sans">
      <AuthWaveBackground />

      {/* Top Spacer */}
      <div className="hidden sm:block"></div>

      {/* Main Content Card */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6 z-10 py-12">
        
        {/* Confetti & Checkmark Illustration */}
        <SuccessConfettiIllustration />

        {/* Text Headers */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-gray-900 font-bold text-h4 tracking-tight">
            You&apos;ve successfully changed your password
          </h2>
          <p className="text-gray-500 text-body-sm max-w-xs mx-auto">
            Always remember the password for your account at HRDashboard!
          </p>
        </div>

        {/* Form Action (Redirect Back to Login) */}
        <div className="w-full flex flex-col gap-3 mt-4">
          <Link
            href="/login"
            className="w-full py-3.5 rounded-xl font-bold text-body-sm text-center bg-[#11131A] text-white hover:bg-black active:scale-[0.98] transition-all shadow-sm"
          >
            Back to Login
          </Link>
        </div>

      </div>

      {/* Footer Area */}
      <footer className="text-center text-[10px] text-gray-400 z-10 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <span>&copy; 2025 HRDashboard . Alrights reserved.</span>
          <div className="flex gap-3">
            <a href="#" className="hover:underline font-medium">Terms &amp; Conditions</a>
            <a href="#" className="hover:underline font-medium">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
