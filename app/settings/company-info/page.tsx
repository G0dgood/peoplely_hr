"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { HiCheck } from "react-icons/hi2";

export default function CompanyInfoPage() {
  const [name, setName] = React.useState("Unpixel Studio");
  const [website, setWebsite] = React.useState("www.unpixel.co");
  const [countryCode, setCountryCode] = React.useState("+62");
  const [phone, setPhone] = React.useState("83843578300");
  const [email, setEmail] = React.useState("contact@unpixel.com");
  const [overview, setOverview] = React.useState(
    "Unpixel Studio could be a creative agency that offers a range of services such as branding, graphic design, web development, and digital marketing. With a team of talented and experienced designers, developers, and marketers, Dummy Studio would work closely with clients to develop unique and effective solutions to their branding and marketing needs."
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-300 dark:border-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Company Info
        </h2>
      </div>

      {/* Form Content */}
      <div className="p-4 md:p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Company Website"
            required
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            rightIcon={<HiCheck className="text-gray-900 dark:text-white text-lg" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-body-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
              Contact Number
              <span className="text-error">*</span>
            </label>
            <div className="flex gap-3">
              <Dropdown
                label={countryCode}
                options={["+1", "+44", "+62", "+91"]}
                onSelect={(val) => setCountryCode(val)}
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 h-12 rounded-xl text-body-md bg-white border border-gray-300 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors dark:bg-gray-800 dark:text-white placeholder:text-gray-400 pl-4"
              />
            </div>
          </div>
          <Input
            label="Contact Email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-body-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
            Company Overview
          </label>
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            rows={5}
            className="w-full rounded-xl text-body-md bg-white border border-gray-300 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors dark:bg-gray-800 dark:text-white placeholder:text-gray-400 p-4 resize-none leading-relaxed"
          />
        </div>

        <div>
          <button className="h-12 px-8 bg-[#11131A] dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
