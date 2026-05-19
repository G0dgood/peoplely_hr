"use client";

import { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { AuthWaveBackground } from "../forgot-password/page";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Criteria rules validation
  const hasEightChars = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const allCriteriaMet = hasEightChars && hasNumber && hasUppercase && hasLowercase;
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const isSubmitEnabled = allCriteriaMet && passwordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitEnabled) {
      window.location.href = "/password-success";
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col justify-between items-center p-6 relative overflow-hidden bg-white font-sans">
      <AuthWaveBackground />

      {/* Top Spacer */}
      <div className="hidden sm:block"></div>

      {/* Main Content Card */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-8 z-10 py-12">
        {/* Header Logo */}
        <div className="flex items-center gap-2">
          <div className="text-primary font-bold text-lg flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">H</div>
          <span className="font-bold text-gray-900 tracking-wide text-body-md">HR<span className="font-normal text-gray-500">Dashboard</span></span>
        </div>

        {/* Text Headers */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-gray-900 font-bold text-h4 tracking-tight">
            Update your password
          </h2>
          <p className="text-gray-500 text-body-sm max-w-xs mx-auto">
            Set your new password with minimum 8 characters with a combination of letters and numbers
          </p>
        </div>

        {/* Input Form */}
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          
          {/* New Password Input Group */}
          <div className="flex flex-col gap-1.5">
            <label className="text-body-xs font-semibold text-gray-700 uppercase tracking-wider">
              New Password <span className="text-error">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Input your password account"
                className="w-full py-3 pl-4 pr-10 text-body-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FaRegEye className="text-sm" /> : <FaRegEyeSlash className="text-sm" />}
              </button>
            </div>
          </div>

          {/* Validation Rules Indicator List (Matches layout in image7.png) */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 py-1 px-1">
            {/* 8 characters */}
            <div className="flex items-center gap-2">
              {hasEightChars ? (
                <FaCheckCircle className="text-[#10B981] text-sm shrink-0" />
              ) : (
                <FaTimesCircle className="text-red-500 text-sm shrink-0" />
              )}
              <span className={`text-[11px] font-semibold ${hasEightChars ? "text-[#10B981]" : "text-gray-500"}`}>
                8 characters
              </span>
            </div>

            {/* Number (0-9) */}
            <div className="flex items-center gap-2">
              {hasNumber ? (
                <FaCheckCircle className="text-[#10B981] text-sm shrink-0" />
              ) : (
                <FaTimesCircle className="text-red-500 text-sm shrink-0" />
              )}
              <span className={`text-[11px] font-semibold ${hasNumber ? "text-[#10B981]" : "text-gray-500"}`}>
                Number (0-9)
              </span>
            </div>

            {/* Uppercase letter */}
            <div className="flex items-center gap-2">
              {hasUppercase ? (
                <FaCheckCircle className="text-[#10B981] text-sm shrink-0" />
              ) : (
                <FaTimesCircle className="text-red-500 text-sm shrink-0" />
              )}
              <span className={`text-[11px] font-semibold ${hasUppercase ? "text-[#10B981]" : "text-gray-500"}`}>
                Uppercase letter (A-Z)
              </span>
            </div>

            {/* Lowercase letter */}
            <div className="flex items-center gap-2">
              {hasLowercase ? (
                <FaCheckCircle className="text-[#10B981] text-sm shrink-0" />
              ) : (
                <FaTimesCircle className="text-red-500 text-sm shrink-0" />
              )}
              <span className={`text-[11px] font-semibold ${hasLowercase ? "text-[#10B981]" : "text-gray-500"}`}>
                Lowercase letter (a-z)
              </span>
            </div>
          </div>

          {/* Confirm Password Input Group */}
          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-body-xs font-semibold text-gray-700 uppercase tracking-wider">
              Confirmation New Password <span className="text-error">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type your new password"
                className="w-full py-3 pl-4 pr-10 text-body-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <FaRegEye className="text-sm" /> : <FaRegEyeSlash className="text-sm" />}
              </button>
            </div>
            {confirmPassword.length > 0 && !passwordsMatch && (
              <span className="text-[10px] text-error font-medium">Passwords do not match</span>
            )}
          </div>

          {/* Action Submit Button */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              type="submit"
              disabled={!isSubmitEnabled}
              className={`w-full py-3.5 rounded-xl font-bold text-body-sm transition-all shadow-sm ${
                isSubmitEnabled
                  ? "bg-[#11131A] text-white hover:bg-black active:scale-[0.98] cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>

        </form>
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
