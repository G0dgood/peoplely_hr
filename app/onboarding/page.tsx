"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaLock, FaGlobe, FaCheck } from "react-icons/fa";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form state
  const [companyName, setCompanyName] = useState("Unpixel");
  const [companyDomain, setCompanyDomain] = useState("unpixel");
  const [companySize, setCompanySize] = useState("1-10");
  const [industry, setIndustry] = useState("Crypto");
  const [role, setRole] = useState("Other");
  const [otherRole, setOtherRole] = useState("Lead Designer");
  const [needs, setNeeds] = useState("Onboarding new employees");

  const companySizes = ["1-10", "11-50", "51-100", "101-200", "201-500", "500+"];
  const industries = ["Crypto", "E-Commerce", "Fintech", "Health Tech", "Software Outsourcing"];
  const roles = ["CEO/Owner/Founder", "HR Manager", "HR Staff", "IT/Tech Manager", "IT/Tech Staff", "Other"];

  const needsOptions = [
    {
      id: "Onboarding new employees",
      title: "Onboarding new employees",
      desc: "I want to onboard a lot of new employees in a consistent and systematic way.",
    },
    {
      id: "Online time tracking",
      title: "Online time tracking",
      desc: "I want to track and approve time attendance and time off online, from anywhere.",
    },
    {
      id: "Performance management",
      title: "Performance management",
      desc: "I want to manage and maintain employee performance in a continuous and objective way.",
    },
    {
      id: "Employee engagement",
      title: "Employee engagement",
      desc: "I want to keep my employees happy, engaged, active, and motivated.",
    },
    {
      id: "Recruitment",
      title: "Recruitment",
      desc: "I want to hire the best talents to improve business performance and employer branding.",
    },
  ];

  const handleContinue = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Top Navbar Header */}
      <header className="w-full h-16 border-b border-gray-100 px-6 sm:px-12 flex items-center shrink-0">
        <img src="/logo/peoplely.svg" alt="Peoplely HR" className="h-6 w-auto" />
      </header>

      {/* Main Split Screen */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column (Wizard Info Panel) */}
        <div className="lg:col-span-5 px-6 py-12 sm:px-16 flex flex-col justify-start border-r border-gray-100 bg-white">
          <div className="flex flex-col gap-8 max-w-md">
            {/* Step indicators */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${num <= step ? "bg-primary" : "bg-gray-100"
                      }`}
                  />
                ))}
              </div>
              <span className="text-body-xs font-bold uppercase tracking-wider text-primary">
                Step {step} of 4
              </span>
            </div>

            {/* Dynamic Step Headings */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <h1 className="text-h3 font-bold text-gray-900 leading-tight">
                  We need some of your Company Information
                </h1>
                <p className="text-body-md text-gray-500">
                  This data is needed so that we can easily provide solutions according to your company&apos;s capacity
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-4">
                <h1 className="text-h3 font-bold text-gray-900 leading-tight">
                  We can now create a workspace for your team.
                </h1>
                <p className="text-body-md text-gray-500">
                  This data is needed so that we can easily provide solutions according to your company&apos;s capacity
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-4">
                <h1 className="text-h3 font-bold text-gray-900 leading-tight">
                  What is your role in your company?
                </h1>
                <p className="text-body-md text-gray-500">
                  This data is needed so that we can easily provide solutions according to your company&apos;s capacity
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-4">
                <h1 className="text-h3 font-bold text-gray-900 leading-tight">
                  What will you mainly use Peoplely HR for?
                </h1>
                <p className="text-body-md text-gray-500">
                  This data is needed so that we can easily provide solutions according to your company&apos;s capacity
                </p>
              </div>
            )}

            {/* Action buttons on desktop */}
            <div className="hidden lg:flex items-center gap-4 mt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 justify-center"
              >
                {step === 1 ? "Cancel" : "Go Back"}
              </Button>
              <Button
                variant="primary"
                onClick={handleContinue}
                className="flex-1 justify-center"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column (Interactive Forms Panel) */}
        <div className="lg:col-span-7 bg-[#F8F9FA] px-6 py-12 sm:px-12 md:px-16 flex flex-col justify-center items-center">
          <div className="w-full max-w-xl bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 shadow-sm animate-fadeIn">
            {/* Step 1 Form */}
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-body-lg font-bold text-gray-900">
                  Type the name of your company
                </h2>

                <Input
                  label="Company Name"
                  required
                  placeholder="e.g. Unpixel"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />

                <div className="flex flex-col gap-2">
                  <label className="text-body-sm font-bold text-gray-900 flex items-center gap-1">
                    Company Domain name
                  </label>
                  <div className="flex h-12 rounded-xl overflow-hidden border border-gray-200 bg-white hover:border-gray-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors">
                    <input
                      className="flex-1 px-4 text-body-md outline-none bg-white placeholder:text-gray-400 border-none"
                      value={companyDomain}
                      onChange={(e) => setCompanyDomain(e.target.value)}
                      placeholder="domain"
                    />
                    <div className="bg-gray-50 border-l border-gray-200 px-4 flex items-center text-body-md text-gray-500 font-semibold select-none">
                      .peoplelyhr.com
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">
                    We will create a unique company URL for you to log into Peoplely HR
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-body-sm font-bold text-gray-950">
                    What is the size of your company
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {companySizes.map((size) => {
                      const isSelected = companySize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setCompanySize(size)}
                          className={`flex items-center justify-between h-12 px-4 rounded-xl border text-left cursor-pointer transition-all ${isSelected
                            ? "border-primary bg-primary/5 font-semibold text-gray-900"
                            : "border-gray-200 hover:border-gray-300 bg-white text-gray-600"
                            }`}
                        >
                          <span className="text-body-sm">{size}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${isSelected
                              ? "border-primary bg-primary"
                              : "border-gray-300"
                              }`}
                          >
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 Form */}
            {step === 2 && (
              <div className="flex flex-col gap-6">
                <Input
                  label="Domain Name"
                  required
                  disabled
                  value={`${companyDomain}.peoplelyhr.com`}
                  rightIcon={<FaLock className="text-gray-400" />}
                />

                <div className="flex flex-col gap-3">
                  <label className="text-body-sm font-bold text-gray-950">
                    What is your industry?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {industries.map((ind) => {
                      const isSelected = industry === ind;
                      return (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => setIndustry(ind)}
                          className={`flex items-center justify-between h-12 px-4 rounded-xl border text-left cursor-pointer transition-all ${isSelected
                            ? "border-primary bg-primary/5 font-semibold text-gray-900"
                            : "border-gray-200 hover:border-gray-300 bg-white text-gray-600"
                            }`}
                        >
                          <span className="text-body-sm">{ind}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${isSelected
                              ? "border-primary bg-primary"
                              : "border-gray-300"
                              }`}
                          >
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 Form */}
            {step === 3 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Domain Name</span>
                  <span className="text-body-sm font-bold text-gray-900 flex items-center gap-2">
                    <FaGlobe className="text-gray-400 text-xs" /> {companyDomain}.peoplelyhr.com
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-body-sm font-bold text-gray-950">
                    Choose role
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {roles.map((r) => {
                      const isSelected = role === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`flex items-center justify-between h-12 px-4 rounded-xl border text-left cursor-pointer transition-all ${isSelected
                            ? "border-primary bg-primary/5 font-semibold text-gray-900"
                            : "border-gray-200 hover:border-gray-300 bg-white text-gray-600"
                            }`}
                        >
                          <span className="text-body-sm">{r}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${isSelected
                              ? "border-primary bg-primary"
                              : "border-gray-300"
                              }`}
                          >
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {role === "Other" && (
                  <Input
                    label="Input Your Role"
                    required
                    placeholder="e.g. Lead Designer"
                    value={otherRole}
                    onChange={(e) => setOtherRole(e.target.value)}
                  />
                )}
              </div>
            )}

            {/* Step 4 Form */}
            {step === 4 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Domain Name</span>
                  <span className="text-body-sm font-bold text-gray-900 flex items-center gap-2">
                    <FaGlobe className="text-gray-400 text-xs" /> {companyDomain}.peoplelyhr.com
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-body-sm font-bold text-gray-950">
                    Choose according to your needs
                  </label>
                  <div className="flex flex-col gap-3">
                    {needsOptions.map((opt) => {
                      const isSelected = needs === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setNeeds(opt.id)}
                          className={`flex items-start gap-4 p-4 rounded-2xl border text-left cursor-pointer transition-all ${isSelected
                            ? "border-primary bg-primary/5"
                            : "border-gray-150 hover:border-gray-250 bg-white"
                            }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${isSelected
                              ? "border-primary bg-primary text-white"
                              : "border-gray-300"
                              }`}
                          >
                            {isSelected && <FaCheck className="text-[10px]" />}
                          </span>
                          <div className="flex flex-col gap-1">
                            <span
                              className={`text-body-sm font-bold ${isSelected ? "text-gray-900" : "text-gray-700"
                                }`}
                            >
                              {opt.title}
                            </span>
                            <span className="text-body-xs text-gray-500 font-medium leading-relaxed">
                              {opt.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons on mobile/tablet */}
          <div className="flex lg:hidden items-center gap-4 w-full max-w-xl mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1 justify-center"
            >
              {step === 1 ? "Cancel" : "Go Back"}
            </Button>
            <Button
              variant="primary"
              onClick={handleContinue}
              className="flex-1 justify-center"
            >
              Continue
            </Button>
          </div>

          {/* Footer inside right panel */}
          <footer className="text-center text-[10px] text-gray-400 mt-12 w-full max-w-xl">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <span>&copy; 2025 Peoplely HR. All rights reserved.</span>
              <div className="flex gap-3">
                <a href="#" className="hover:underline font-medium">Terms &amp; Conditions</a>
                <a href="#" className="hover:underline font-medium">Privacy Policy</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
