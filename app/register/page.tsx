"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash, FaGoogle, FaApple, FaExclamationCircle, FaArrowLeft } from "react-icons/fa";
import { AuthFooter } from "@/components/ui/auth-footer";
import { DemoHelper } from "@/components/ui/demo-helper";
import { toast } from "sonner";

import { useRegisterMutation, useCreateCompanyMutation } from "@/store/services/authApi";
import { useApiError } from "@/hooks/useApiError";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/features/authSlice";
import { SVGLoader } from "@/components/ui/options";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const [step, setStep] = useState(1);
  const [company, setCompany] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [createCompany, { isLoading: isCompanyLoading, error: companyError }] = useCreateCompanyMutation();
  const [registerUser, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();

  useApiError(!!companyError, companyError, "Company creation failed");
  useApiError(!!registerError, registerError, "Registration failed");

  const isStep1Valid = company.trim().length > 0;
  const isStep2Valid = name.trim().length > 0 && email.trim().length > 0 && password.length > 0 && companyId.length > 0;

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1Valid || isCompanyLoading) return;

    try {
      const res = await createCompany({ name: company }).unwrap();
      if (res.success && res.company) {
        setCompanyId(res.company.id);
        setStep(2);
        toast.success(`Company "${res.company.name}" created successfully!`);
      }
    } catch (err) {
      // Error handled by useApiError hook
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep2Valid || isRegisterLoading) return;

    try {
      const data = await registerUser({ name, email, password, companyId }).unwrap();
      toast.success("Admin account created successfully!");
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(setCredentials({ user: data.user, accessToken: "" }));
      }
      router.push("/dashboard");
    } catch (err) {
      // Error handled by useApiError hook
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const activeError = step === 1 ? companyError : registerError;
  const isFormFilled = step === 1 ? isStep1Valid : isStep2Valid;
  const isLoading = step === 1 ? isCompanyLoading : isRegisterLoading;

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-white overflow-hidden font-sans relative">

      {/* LEFT PANEL: HERO BANNER (Matches Login Page Layout) */}
      <section className="w-full lg:w-1/2 bg-[#0F1116] flex flex-col justify-between p-4 md:p-8 lg:p-12 relative">
        {/* Banner image layout */}
        <div className="w-full flex-1 flex flex-col rounded-2xl overflow-hidden bg-cover bg-center min-h-[300px] lg:min-h-0"
          style={{ backgroundImage: `url('/login_banner.png')` }}>
        </div>

        {/* Text Details Area */}
        <div className="mt-8 flex flex-col gap-4">
          <img src="/logo/peoplely.svg" alt="Peoplely HR" className="h-7 w-auto self-start brightness-0 invert" />

          <div className="flex flex-col gap-2">
            <h1 className="text-white text-h5 font-bold leading-tight lg:text-h4">
              Let&apos;s empower your employees today.
            </h1>
            <p className="text-gray-400 text-body-sm">
              We help to complete all your conveyancing needs easily
            </p>
          </div>
        </div>
      </section>

      {/* RIGHT PANEL: SIGNUP FORM */}
      <section className="w-full lg:w-1/2 flex flex-col justify-between p-4 md:p-8 lg:p-12 bg-white">

        {/* Top Spacer or helper for vertical centering */}
        <div className="hidden lg:block"></div>

        {/* Form Main Area */}
        <div className="w-full max-w-md mx-auto flex flex-col gap-8 py-8 lg:py-0">
          <div className="text-center lg:text-left">
            <h2 className="text-gray-900 font-bold text-h5 tracking-tight">
              {step === 1 ? "Create your Company" : "Setup Admin Account"}
            </h2>
            <p className="text-gray-500 text-body-sm mt-1">
              {step === 1 
                ? "First, tell us about your company to get started." 
                : `Registering as administrator for ${company}`
              }
            </p>
          </div>

          {step === 1 ? (
            <form className="flex flex-col gap-5" onSubmit={handleStep1Submit}>
              {/* Company Name Input Group */}
              <div className="flex flex-col gap-1.5">
                <label className="text-body-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Company Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Input your company name"
                  className="w-full py-3 px-4 text-body-sm rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>


              {/* Step 1 Submit Button */}
              <button
                type="submit"
                disabled={!isStep1Valid || isLoading}
                className={`w-full py-3.5 rounded-xl font-bold text-body-sm transition-all shadow-sm flex items-center justify-center gap-2 ${isStep1Valid && !isLoading
                  ? "bg-[#11131A] text-white hover:bg-black active:scale-[0.98] cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {isLoading ? (
                  <>
                    <SVGLoader width={18} height={18} color="#9CA3AF" />
                    <span>Creating Company...</span>
                  </>
                ) : (
                  "Continue to Admin Setup"
                )}
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-5" onSubmit={handleStep2Submit}>
              {/* Back Button */}
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-body-xs font-bold self-start cursor-pointer mb-2 animate-pulse"
              >
                <FaArrowLeft className="text-xs" />
                <span>Back to Company Setup</span>
              </button>

              {/* Name Input Group */}
              <div className="flex flex-col gap-1.5">
                <label className="text-body-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Full Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Input your full name"
                  className="w-full py-3 px-4 text-body-sm rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Role Input Group */}
              <div className="flex flex-col gap-1.5">
                <label className="text-body-xs font-semibold text-gray-700 uppercase tracking-wider text-gray-500">
                  Role
                </label>
                <input
                  type="text"
                  value="Admin"
                  readOnly
                  disabled
                  className="w-full py-3 px-4 text-body-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-400 font-semibold cursor-not-allowed focus:outline-none"
                />
              </div>

              {/* Email Input Group */}
              <div className="flex flex-col gap-1.5">
                <label className="text-body-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Work Email <span className="text-error">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@company.com"
                  className="w-full py-3 px-4 text-body-sm rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
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


              {/* Step 2 Submit Button */}
              <button
                type="submit"
                disabled={!isStep2Valid || isLoading}
                className={`w-full py-3.5 rounded-xl font-bold text-body-sm transition-all shadow-sm flex items-center justify-center gap-2 ${isStep2Valid && !isLoading
                  ? "bg-[#11131A] text-white hover:bg-black active:scale-[0.98] cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {isLoading ? (
                  <>
                    <SVGLoader width={18} height={18} color="#9CA3AF" />
                    <span>Creating Admin Account...</span>
                  </>
                ) : (
                  "Create Admin Account"
                )}
              </button>
            </form>
          )}

          {/* Or Separator */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-[1px] bg-gray-100"></div>
            <span className="text-body-xs font-semibold text-gray-400 uppercase tracking-wider">Or register with</span>
            <div className="flex-1 h-[1px] bg-gray-100"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2.5 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all font-semibold text-gray-800 text-body-sm shadow-sm"
            >
              <FaGoogle className="text-red-500 text-sm" />
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2.5 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all font-semibold text-gray-800 text-body-sm shadow-sm"
            >
              <FaApple className="text-black text-base" />
              <span>Apple</span>
            </button>
          </div>

          {/* Login Suggestion */}
          <div className="text-center text-body-xs font-semibold text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#10B981] hover:underline font-bold">
              Login Here
            </Link>
          </div>
          {/* Quick Demo Helper */}
          <DemoHelper className="mt-4" />
        </div>

        {/* Footer Area */}
        <AuthFooter className="py-4 lg:py-0 border-t lg:border-t-0 border-gray-50 mt-8 w-full max-w-xl" />

      </section>

    </main>
  );
}
