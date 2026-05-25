"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash, FaCheck, FaGoogle, FaApple, FaExclamationCircle } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Derive form state matching mockup validations:
  // - pristia@gmail.com -> valid state (checkmark)
  // - duarte@gmail.com -> error state (red border & alert message)
  const isPristia = email.trim().toLowerCase() === "pristia@gmail.com";
  const isDuarte = email.trim().toLowerCase() === "duarte@gmail.com";

  const hasEmail = email.trim().length > 0;
  const hasPassword = password.length > 0;
  const isFormFilled = hasEmail && hasPassword;

  const emailHasError = isDuarte;
  const emailIsValidated = isPristia;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormFilled && !emailHasError) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white overflow-hidden font-sans">

      {/* LEFT PANEL: HERO BANNER */}
      <section className="w-full lg:w-1/2 bg-[#0F1116] flex flex-col justify-between p-4 md:p-8 lg:p-12 relative">
        {/* Banner image layout */}
        <div className="w-full flex-1 flex flex-col rounded-2xl overflow-hidden bg-cover bg-center min-h-[300px] lg:min-h-0"
          style={{ backgroundImage: `url('/login_banner.png')` }}>
        </div>

        {/* Text Details Area */}
        <div className="mt-8 flex flex-col gap-4">
          <img src="/logo/peoplely.svg" alt="Peoplely HR" className="h-7 w-auto self-start brightness-0 invert" />

          <div className="flex flex-col gap-2">
            <h1 className="text-white text-h4 font-bold leading-tight lg:text-h3">
              Let&apos;s empower your employees today.
            </h1>
            <p className="text-gray-400 text-body-sm">
              We help to complete all your conveyancing needs easily
            </p>
          </div>
        </div>
      </section>

      {/* RIGHT PANEL: LOGIN FORM */}
      <section className="w-full lg:w-1/2 flex flex-col justify-between p-4 md:p-8 lg:p-12 bg-white">

        {/* Top Spacer or helper for vertical centering */}
        <div className="hidden lg:block"></div>

        {/* Form Main Area */}
        <div className="w-full max-w-md mx-auto flex flex-col gap-8 py-8 lg:py-0">
          <div className="text-center lg:text-left">
            <h2 className="text-gray-900 font-bold text-h4 tracking-tight">
              Login first to your account
            </h2>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

            {/* Email Input Group */}
            <div className="flex flex-col gap-1.5">
              <label className="text-body-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email Address <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Input your registered email"
                  className={`w-full py-3 pl-4 pr-10 text-body-sm rounded-xl border bg-white text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 ${emailHasError
                      ? "border-error focus:ring-error/20 focus:border-error"
                      : emailIsValidated
                        ? "border-[#10B981] focus:ring-primary/20 focus:border-primary"
                        : "border-gray-300 focus:ring-primary/20 focus:border-primary"
                    }`}
                />
                {emailIsValidated && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#10B981] flex items-center justify-center">
                    <FaCheck className="text-sm" />
                  </div>
                )}
              </div>
              {emailHasError && (
                <div className="flex items-center gap-1.5 text-error mt-1">
                  <FaExclamationCircle className="text-xs shrink-0" />
                  <span className="text-body-xs font-medium">The email you entered is not registered, please check again</span>
                </div>
              )}
            </div>

            {/* Password Input Group */}
            <div className="flex flex-col gap-1.5">
              <label className="text-body-xs font-semibold text-gray-700 uppercase tracking-wider">
                Password <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Input your password account"
                  className="w-full py-3 pl-4 pr-10 text-body-sm rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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

            {/* Checkbox and Forgot Link */}
            <div className="flex items-center justify-between text-body-xs select-none">
              <label
                className="flex items-center gap-2 font-semibold text-gray-600 cursor-pointer"
                onClick={() => setRememberMe(!rememberMe)}
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${rememberMe
                    ? "bg-[#10B981] border-[#10B981] text-white"
                    : "border-gray-300 hover:border-gray-300 bg-white"
                  }`}>
                  {rememberMe && <FaCheck className="text-[10px]" />}
                </div>
                <span>Remember Me</span>
              </label>
              <Link href="/forgot-password" className="font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                Forgot Password
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormFilled}
              className={`w-full py-3.5 rounded-xl font-bold text-body-sm transition-all ${isFormFilled
                  ? "bg-[#11131A] text-white hover:bg-black active:scale-[0.98] cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              Login
            </button>

            {/* Or Separator */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-[1px] bg-gray-100"></div>
              <span className="text-body-xs font-semibold text-gray-400 uppercase tracking-wider">Or login with</span>
              <div className="flex-1 h-[1px] bg-gray-100"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2.5 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all font-semibold text-gray-800 text-body-sm"
              >
                <FaGoogle className="text-red-500 text-sm" />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2.5 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all font-semibold text-gray-800 text-body-sm"
              >
                <FaApple className="text-black text-base" />
                <span>Apple</span>
              </button>
            </div>

          </form>

          {/* Signup Suggestion */}
          <div className="text-center text-body-xs font-semibold text-gray-600">
            You&apos;re new in here?{" "}
            <Link href="/register" className="text-[#10B981] hover:underline font-bold">
              Create Account
            </Link>
          </div>

          {/* Quick Demo Helper */}
          <div className="bg-gray-50 border border-gray-300 rounded-xl p-3 flex flex-col gap-1 text-[11px] text-gray-500">
            <span className="font-bold text-gray-700">Quick Test Inputs:</span>
            <span>Type <strong className="text-primary select-all">pristia@gmail.com</strong> for a valid state mockup.</span>
            <span>Type <strong className="text-error select-all">duarte@gmail.com</strong> for an error state mockup.</span>
          </div>
        </div>

        {/* Footer Area */}
        <footer className="text-center text-[10px] text-gray-400 py-4 lg:py-0 border-t lg:border-t-0 border-gray-50 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span>&copy; 2025 Peoplely HR. All rights reserved.</span>
            <div className="flex gap-3">
              <a href="#" className="hover:underline font-medium">Terms &amp; Conditions</a>
              <a href="#" className="hover:underline font-medium">Privacy Policy</a>
            </div>
          </div>
        </footer>

      </section>

    </div>
  );
}
