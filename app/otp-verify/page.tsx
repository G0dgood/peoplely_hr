"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AuthWaveBackground } from "../forgot-password/page";

export default function OtpVerifyPage() {
  const [email, setEmail] = useState("pristia@gmail.com");
  const [otp, setOtp] = useState(["", "", "", ""]);
  
  // Use ref list for inputs
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Read email from query parameter if available
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const val = element.value.replace(/[^0-9]/g, ""); // Allow digits only
    if (val.length === 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    // Take only the last character entered
    const digit = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Focus next input automatically
    if (index < 3 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        // If current box is empty, focus previous box and delete value there
        if (index > 0 && inputsRef.current[index - 1]) {
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
          inputsRef.current[index - 1]?.focus();
        }
      } else {
        // Delete current box value
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{4}$/.test(pastedData)) return; // Only process exactly 4 digits

    const digits = pastedData.split("");
    setOtp(digits);
    // Focus last input
    inputsRef.current[3]?.focus();
  };

  const isFormFilled = otp.every((val) => val !== "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormFilled) {
      window.location.href = `/update-password?email=${encodeURIComponent(email)}`;
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
        <img src="/logo/peoplely.svg" alt="Peoplely HR" className="h-7 w-auto" />

        {/* Text Headers */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-gray-900 font-bold text-h4 tracking-tight">
            OTP Verification
          </h2>
          <p className="text-gray-500 text-body-sm max-w-sm mx-auto">
            We have sent a verification code to email address <span className="font-bold text-gray-800">{email}</span>.{" "}
            <Link href="/forgot-password" className="text-[#10B981] hover:underline font-bold">
              Wrong Email?
            </Link>
          </p>
        </div>

        {/* Input Form */}
        <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit}>
          
          {/* OTP Digit Inputs */}
          <div className="flex justify-center gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => { inputsRef.current[index] = el; }}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-14 h-14 border border-gray-200 rounded-xl text-center text-xl font-bold text-gray-900 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981]"
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={!isFormFilled}
              className={`w-full py-3.5 rounded-xl font-bold text-body-sm transition-all shadow-sm ${
                isFormFilled
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
