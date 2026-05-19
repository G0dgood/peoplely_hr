"use client";

import * as React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Card } from "@/components/ui/card";

export function PersonalSection() {
  return (
    <div className="flex flex-col gap-6">
      {/* Personal Info Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Personal Info</h3>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <HiOutlinePencilSquare className="text-xl" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          {[
            { label: "Full Name", value: "Pristia Candra Nelson" },
            { label: "Gender", value: "Female" },
            { label: "Date of Birth", value: "23 May 1997" },
            { label: "Marital Status", value: "-" },
            { label: "Nationality", value: "Indonesia" },
            { label: "Personal Tax ID", value: "-" },
            { label: "Email Address", value: "lincoln@gmail.com" },
            { label: "Social Insurance", value: "-" },
            { label: "Health Insurance", value: "Axa Insurance" },
            { label: "Phone Number", value: "089318298493" },
          ].map((item) => (
            <div key={item.label} className="flex items-center border-b border-gray-50 dark:border-gray-800/50 pb-4">
              <span className="w-32 text-xs font-bold text-gray-400 tracking-wider shrink-0">{item.label}</span>
              <span className="text-xs font-bold text-gray-900 dark:text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Address Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Address</h3>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <HiOutlinePencilSquare className="text-xl" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          {[
            { label: "Primary address", value: "Banyumanik Street, Central Java. Semarang Indonesia" },
            { label: "Country", value: "Indonesia" },
            { label: "State/Province", value: "Central Java" },
            { label: "City", value: "Semarang" },
            { label: "Post Code", value: "03125" },
          ].map((item) => (
            <div key={item.label} className="flex items-center border-b border-gray-50 dark:border-gray-800/50 pb-4">
              <span className="w-32 text-xs font-bold text-gray-400 tracking-wider shrink-0">{item.label}</span>
              <span className="text-xs font-bold text-gray-900 dark:text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Emergency Contact Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Emergency Contact</h3>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <HiOutlinePencilSquare className="text-xl" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          {[
            { label: "Full Name", value: "Albert Jhonson" },
            { label: "Phone Number", value: "089839140011" },
            { label: "Relationship", value: "Father" },
          ].map((item) => (
            <div key={item.label} className="flex items-center border-b border-gray-50 dark:border-gray-800/50 pb-4">
              <span className="w-32 text-xs font-bold text-gray-400 tracking-wider shrink-0">{item.label}</span>
              <span className="text-xs font-bold text-gray-900 dark:text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
