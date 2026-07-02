"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineUserCircle,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function EmployeeProfileHelpPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeGuideTab, setActiveGuideTab] = React.useState<"personal" | "docs" | "contacts" | "payment">("personal");
  
  // Mock form states
  const [profileForm, setProfileForm] = React.useState({
    fullName: "Marcus Vance",
    email: "marcus.vance@unpixel.co",
    ssn: "000-12-3456",
    emergencyName: "Sarah Jenkins",
    emergencyPhone: "555-019-2834",
    bankNumber: "1029384756",
  });

  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "fullName" && !value.trim()) {
      error = "Full legal name is required.";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Please enter a valid corporate email.";
    } else if (name === "ssn" && !/^\d{3}-\d{2}-\d{4}$/.test(value)) {
      error = "SSN must follow XXX-XX-XXXX digit format.";
    } else if (name === "emergencyPhone" && !/^\+?[\d-]{7,15}$/.test(value)) {
      error = "Phone must be a valid numerical sequence.";
    } else if (name === "bankNumber" && (!/^\d+$/.test(value) || value.length < 8)) {
      error = "Account number must be numerical (min 8 digits).";
    }
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check all fields
    const errors: Record<string, string> = {};
    Object.keys(profileForm).forEach((key) => {
      const val = (profileForm as any)[key];
      validateField(key, val);
    });

    const hasErrors = Object.values(formErrors).some((err) => err !== "") || Object.keys(errors).length > 0;

    if (hasErrors) {
      toast.error("Please resolve the validation errors before saving.");
      return;
    }

    toast.success("Profile Changes Saved Successfully!", {
      description: "Changes to sensitive fields (SSN & Bank Details) have been queued for HR Administrator approval.",
      icon: <HiOutlineSparkles className="text-teal-500" />,
    });
  };

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Title area with Breadcrumbs and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help Center</h1>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-gray-500">
            <Link href="/help-center" className="hover:text-primary transition-colors">
              Help Center
            </Link>
            <span className="text-gray-300">&gt;</span>
            <span className="text-gray-400">Employee Profile</span>
          </div>
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search profile guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-11 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start max-w-6xl w-full">
        {/* Left Side: Mock Profile sandbox */}
        <div className="flex-1 w-full flex flex-col gap-6">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
            <span>Employee Profile Form Sandbox</span>
            <HiOutlineUserCircle className="text-teal-600 dark:text-teal-400 text-lg" />
          </div>

          <Card className="p-6 md:p-8 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-sm rounded-2xl flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                  Try Editing Your Profile Details
                </h3>
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  <HiOutlineShieldCheck /> Encrypted
                </span>
              </div>
              <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">
                Observe how the system validates format types. Critical adjustments require automated HR workflow signs.
              </p>
            </div>

            <form onSubmit={handleSaveForm} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-50 dark:border-gray-850 pb-5">
                <div className="col-span-2 text-[10px] font-black text-teal-600 dark:text-teal-450 uppercase tracking-wider">
                  Personal Information
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Full Legal Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileForm.fullName}
                    onChange={handleFieldChange}
                    className={`h-11 px-4 rounded-xl border bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none transition-all ${
                      formErrors.fullName ? "border-red-500" : "border-gray-300 dark:border-gray-800 focus:border-primary"
                    }`}
                  />
                  {formErrors.fullName && <span className="text-[9px] text-red-500 font-extrabold">{formErrors.fullName}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Corporate Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleFieldChange}
                    className={`h-11 px-4 rounded-xl border bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none transition-all ${
                      formErrors.email ? "border-red-500" : "border-gray-300 dark:border-gray-800 focus:border-primary"
                    }`}
                  />
                  {formErrors.email && <span className="text-[9px] text-red-500 font-extrabold">{formErrors.email}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">SSN (Social Security Number) *</label>
                  <input
                    type="text"
                    name="ssn"
                    value={profileForm.ssn}
                    onChange={handleFieldChange}
                    placeholder="XXX-XX-XXXX"
                    className={`h-11 px-4 rounded-xl border bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none transition-all ${
                      formErrors.ssn ? "border-red-500" : "border-gray-300 dark:border-gray-800 focus:border-primary"
                    }`}
                  />
                  {formErrors.ssn && <span className="text-[9px] text-red-500 font-extrabold">{formErrors.ssn}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-50 dark:border-gray-850 pb-5">
                <div className="col-span-2 text-[10px] font-black text-brand-purple uppercase tracking-wider">
                  Emergency Contact & Banking
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Contact Name</label>
                  <input
                    type="text"
                    name="emergencyName"
                    value={profileForm.emergencyName}
                    onChange={handleFieldChange}
                    className="h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Contact Phone</label>
                  <input
                    type="text"
                    name="emergencyPhone"
                    value={profileForm.emergencyPhone}
                    onChange={handleFieldChange}
                    className={`h-11 px-4 rounded-xl border bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none transition-all ${
                      formErrors.emergencyPhone ? "border-red-500" : "border-gray-300 dark:border-gray-800 focus:border-primary"
                    }`}
                  />
                  {formErrors.emergencyPhone && <span className="text-[9px] text-red-500 font-extrabold">{formErrors.emergencyPhone}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Bank Account Number *</label>
                  <input
                    type="text"
                    name="bankNumber"
                    value={profileForm.bankNumber}
                    onChange={handleFieldChange}
                    className={`h-11 px-4 rounded-xl border bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none transition-all ${
                      formErrors.bankNumber ? "border-red-500" : "border-gray-300 dark:border-gray-800 focus:border-primary"
                    }`}
                  />
                  {formErrors.bankNumber && <span className="text-[9px] text-red-500 font-extrabold">{formErrors.bankNumber}</span>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-teal-650 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-sm"
              >
                Save Profile Adjustments
              </button>
            </form>
          </Card>
        </div>

        {/* Right Side: Informational Documentation */}
        <div className="w-full xl:w-96 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
            <span>Guide & Instructions</span>
            <HiOutlineInformationCircle className="text-gray-400 text-lg" />
          </div>

          <Card className="p-6 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-sm leading-relaxed text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium rounded-2xl flex flex-col gap-6">
            
            {/* Guide Tabs */}
            <div className="flex border-b border-gray-100 dark:border-gray-850 gap-4">
              <button
                onClick={() => setActiveGuideTab("personal")}
                className={`pb-2.5 text-[10px] font-black uppercase transition-all border-b-2 cursor-pointer ${
                  activeGuideTab === "personal"
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-450 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Personal Info
              </button>
              <button
                onClick={() => setActiveGuideTab("docs")}
                className={`pb-2.5 text-[10px] font-black uppercase transition-all border-b-2 cursor-pointer ${
                  activeGuideTab === "docs"
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-450 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Docs Vault
              </button>
              <button
                onClick={() => setActiveGuideTab("contacts")}
                className={`pb-2.5 text-[10px] font-black uppercase transition-all border-b-2 cursor-pointer ${
                  activeGuideTab === "contacts"
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-450 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Banking
              </button>
            </div>

            {/* Tab Contents */}
            {activeGuideTab === "personal" && (
              <div className="flex flex-col gap-3 animate-fadeIn">
                <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
                  Managing Your Profile Details
                </h4>
                <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450">
                  Your Employee Profile is the central hub for all your personal, employment, and emergency contact details. Keeping this information updated ensures accurate tax filings and communications.
                </p>
                <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450">
                  To update your avatar, simply click on the circular thumbnail inside the main profile dashboard.
                </p>
              </div>
            )}

            {activeGuideTab === "docs" && (
              <div className="flex flex-col gap-3 animate-fadeIn">
                <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
                  Viewing Employment Documents
                </h4>
                <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450">
                  Your profile stores your signed offer letter, direct deposit authority, NDA, and performance reviews.
                </p>
                <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450">
                  These files reside inside the <strong className="text-teal-600">Documents</strong> tab on your dashboard and are exportable as encrypted PDFs.
                </p>
              </div>
            )}

            {activeGuideTab === "contacts" && (
              <div className="flex flex-col gap-3 animate-fadeIn">
                <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
                  Updating Banking Details
                </h4>
                <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450">
                  Changing direct deposit routing requires secure bank validation. Please verify both routing number and account digits carefully.
                </p>
                <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450 font-bold border-l-2 border-teal-500 pl-3">
                  Note: Edits to banking cards trigger a temporary notification email to safeguard against payroll fraud.
                </p>
              </div>
            )}

            {/* Static HR approval info */}
            <div className="border-t border-gray-100 dark:border-gray-850 pt-4 mt-1 flex flex-col gap-1.5">
              <h4 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-wider">
                HR Audits & Approvals
              </h4>
              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-455">
                Note that changes to sensitive records, such as your legal name, social security number, or payment routing digits, will go into a pending queue for HR review before becoming permanent.
              </p>
            </div>

          </Card>
        </div>
      </div>
    </div>
  );
}
