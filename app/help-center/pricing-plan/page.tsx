"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";

export default function PricingPlanHelpPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

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
            <span className="text-gray-400">Pricing Plan</span>
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

      {/* Main Content card */}
      <div className="flex flex-col gap-6 max-w-4xl">
        <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
          <span>Pricing Plan</span>
          <HiOutlineInformationCircle className="text-gray-400 text-lg" />
        </div>

        <Card className="p-2 md:p-8 flex flex-col gap-8 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 shadow-sm leading-relaxed text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Understanding Our Pricing Plans
            </h2>
            <p>
              Peoplely HR offers flexible pricing plans tailored to meet the needs of businesses of all sizes. Whether you're a startup looking for basic HR tools or a large enterprise needing advanced features, we have a plan for you.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Available Plans
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Free Plan:</strong> Ideal for small teams up to 10 employees. Includes basic HR features, time tracking, and employee directories.</li>
              <li><strong>Perform Plan:</strong> Our most popular plan, designed for growing teams. Includes everything in the Free Plan, plus advanced reporting, custom workflows, and integrations.</li>
              <li><strong>Enterprise Plan:</strong> Designed for large organizations requiring custom solutions, dedicated support, and enterprise-grade security.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              How to Upgrade Your Plan
            </h2>
            <p>
              You can upgrade your plan at any time by visiting the <strong>Subscription</strong> section under your account settings. Upgrades take effect immediately, and any prorated charges will be applied to your next billing cycle.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
