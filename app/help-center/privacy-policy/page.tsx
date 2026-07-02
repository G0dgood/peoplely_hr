"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
  HiOutlinePrinter,
  HiOutlineArrowDownTray,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface PolicySection {
  id: string;
  title: string;
  content: string;
}

const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "sec-introduction",
    title: "1. Introduction",
    content: "Peoplely HR is committed to protecting your privacy and the confidentiality of your personal information. This Privacy Policy describes how we collect, use, and disclose your personal information in connection with our HR management platform. By using Peoplely HR, you consent to the collection, use, and disclosure of your personal information in accordance with this Privacy Policy.",
  },
  {
    id: "sec-collection",
    title: "2. Collection and Use of Personal Information",
    content: "We collect personal information from you when you use Peoplely HR, such as your name, contact information, employment history, bank details, and other HR-related data. We use this information to provide you with our HR management services, including payroll processing, benefits administration, employee record keeping, and performance management. This data is handled in strict compliance with local labor and digital protection acts.",
  },
  {
    id: "sec-disclosure",
    title: "3. Disclosure of Personal Information",
    content: "We may disclose your personal information to third-party service providers who assist us in providing our HR management services, such as payroll processors, benefits providers, and performance management software vendors. We may also disclose your personal information to comply with legal obligations, such as responding to subpoenas or court orders from authorized jurisdictions.",
  },
  {
    id: "sec-security",
    title: "4. Security",
    content: "We take reasonable steps to protect your personal information from unauthorized access, use, or disclosure. We use a variety of security measures, including industrial-grade AES-256 encryption and firewalls, to safeguard your personal information. However, no data transmission over the Internet can be guaranteed to be 100% secure, and we cannot ensure or warrant the security of any information you transmit to us.",
  },
  {
    id: "sec-access",
    title: "5. Access and Correction of Personal Information",
    content: "You have the right to access and correct your personal information held by us. You can do so by logging into your account on Peoplely HR or by contacting us at the contact information provided below. Administrators can edit employee records, but critical identifiers (like Social Security Numbers or bank swift codes) may undergo auditing verification before final approval.",
  },
];

export default function PrivacyPolicyPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeSection, setActiveSection] = React.useState("sec-introduction");

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Downloading Privacy Policy PDF...", {
      description: "File: Peoplely_HR_Privacy_Policy.pdf",
      icon: <HiOutlineSparkles className="text-teal-500" />,
    });
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Helper function to highlight search matches inside text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 font-extrabold px-0.5 rounded-sm">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
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
            <span className="text-gray-400">Privacy Policy</span>
          </div>
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search words in policy..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-11 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
        </div>
      </div>

      {/* Main content split panel */}
      <div className="flex flex-col lg:flex-row gap-8 items-start max-w-6xl w-full">
        
        {/* Left Side: Table of Contents Sidebar */}
        <div className="w-full lg:w-64 flex flex-col gap-5 lg:sticky lg:top-8">
          <span className="text-xs font-black text-gray-405 dark:text-gray-450 uppercase tracking-wider">
            Table of Contents
          </span>
          <Card className="p-4 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-sm rounded-2xl flex flex-col gap-1">
            {POLICY_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSection === sec.id
                    ? "bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400"
                    : "text-gray-450 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/50 dark:hover:bg-gray-900/10"
                }`}
              >
                {sec.title.split(". ")[1] || sec.title}
              </button>
            ))}
          </Card>
        </div>

        {/* Right Side: Document Text Panel */}
        <div className="flex-1 w-full flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
              <span>Privacy Policy Document</span>
              <HiOutlineInformationCircle className="text-gray-400 text-lg" />
            </div>

            {/* Utility buttons */}
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="h-9 px-3.5 bg-white border border-gray-250 dark:border-gray-800 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-850 text-gray-700 dark:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <HiOutlinePrinter className="text-sm" />
                <span>Print</span>
              </button>
              <button
                onClick={handleDownload}
                className="h-9 px-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <HiOutlineArrowDownTray className="text-sm" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          <Card className="p-6 md:p-8 flex flex-col gap-8 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-sm leading-relaxed text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium rounded-2xl">
            {/* Header info */}
            <div className="border-b border-gray-100 dark:border-gray-850 pb-5">
              <h2 className="text-base md:text-lg font-black text-gray-900 dark:text-white">
                Peoplely HR Privacy & Security Policy
              </h2>
              <p className="text-[11px] text-gray-450 dark:text-gray-500 mt-1.5 font-bold">
                Last updated: June 04, 2026 • Version 1.4
              </p>
            </div>

            {/* Render Sections with Search Highlight */}
            {POLICY_SECTIONS.map((sec) => (
              <div key={sec.id} id={sec.id} className="flex flex-col gap-3 scroll-mt-6">
                <h3 className="text-xs md:text-sm font-extrabold text-gray-900 dark:text-white">
                  {sec.title}
                </h3>
                <p className="text-[11px] md:text-xs text-gray-500 dark:text-gray-450 leading-relaxed font-semibold">
                  {highlightText(sec.content, searchQuery)}
                </p>
              </div>
            ))}

            {/* Footer warning */}
            <div className="border-t border-gray-100 dark:border-gray-850 pt-6 mt-2 flex flex-col gap-2">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                Legal Disclaimer:
              </h4>
              <p className="text-[10px] text-gray-450 dark:text-gray-550 leading-relaxed pl-4 border-l-2 border-gray-300 dark:border-gray-700">
                This document is a high-fidelity mockup generated for demonstrate interactive documentation navigation, highlighting searches, and layout setups. Actual compliance rules require coordination with local legal advisory teams.
              </p>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
