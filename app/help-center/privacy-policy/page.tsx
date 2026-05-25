"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
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
            placeholder="Search what you need"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-11 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
        </div>
      </div>

      {/* Main Privacy Policy card */}
      <div className="flex flex-col gap-6 max-w-4xl">
        <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
          <span>Privacy Policy</span>
          <HiOutlineInformationCircle className="text-gray-400 text-lg" />
        </div>

        <Card className="p-8 flex flex-col gap-8 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 shadow-sm leading-relaxed text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
          {/* Introduction */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Introduction
            </h2>
            <p>
              Peoplely HR is committed to protecting your privacy and the confidentiality of your personal information. This Privacy Policy describes how we collect, use, and disclose your personal information in connection with our HR management platform, Peoplely HR. By using Peoplely HR, you consent to the collection, use, and disclosure of your personal information in accordance with this Privacy Policy.
            </p>
          </div>

          {/* Collection and Use */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Collection and Use of Personal Information
            </h2>
            <p>
              We collect personal information from you when you use Peoplely HR, such as your name, contact information, employment history, and other HR-related data. We use this information to provide you with our HR management services, including payroll processing, benefits administration, employee record keeping, and performance management.
            </p>
          </div>

          {/* Disclosure */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Disclosure of Personal Information
            </h2>
            <p>
              We may disclose your personal information to third-party service providers who assist us in providing our HR management services, such as payroll processors, benefits providers, and performance management software vendors. We may also disclose your personal information to comply with legal obligations, such as responding to subpoenas or court orders.
            </p>
          </div>

          {/* Security */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Security
            </h2>
            <p>
              We take reasonable steps to protect your personal information from unauthorized access, use, or disclosure. We use a variety of security measures, including encryption and firewalls, to safeguard your personal information. However, no data transmission over the Internet can be guaranteed to be 100% secure, and we cannot ensure or warrant the security of any information you transmit to us.
            </p>
          </div>

          {/* Access and Correction */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Access and Correction of Personal Information
            </h2>
            <p>
              You have the right to access and correct your personal information held by us. You can do so by logging into your account on Peoplely HR or by contacting us at the contact information provided below.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
