"use client";

import * as React from "react";
import { HiOutlineChevronRight, HiCheck } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { AmountSubscriptionDrawer } from "./amount-subscription-drawer";

interface UpgradePlanDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradePlanDrawer({ isOpen, onClose }: UpgradePlanDrawerProps) {
  const [isAnnual, setIsAnnual] = React.useState(true);
  const [isAmountDrawerOpen, setIsAmountDrawerOpen] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 !bg-black/20  transition-opacity"
        onClick={onClose}
      />
      {/* Drawer Panel */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-950 h-full flex flex-col border-l border-gray-300 dark:border-gray-800 transition-transform duration-300 ease-in-out transform translate-x-0">
        {/* Dismiss slide button on left edge */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-800 hover:scale-105 transition-all cursor-pointer text-gray-700 dark:text-gray-350"
          >
            <HiOutlineChevronRight className="text-xl" />
          </button>
        </div>

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-300 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-950">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pick a Plan
          </h2>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>Monthly</span>
            <Toggle checked={isAnnual} onChange={() => setIsAnnual(!isAnnual)} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>Annual</span>
            <span className="text-[10px] font-bold text-[#FFB800] uppercase tracking-wider">Save 20%</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-white dark:bg-gray-950 flex flex-col gap-6">

          {/* Essentials Plan */}
          <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-6 flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Essentials Plan</h3>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">Start centralizing and automating your Core HR operations.</p>
              </div>
              <Button 
                onClick={() => setIsAmountDrawerOpen(true)}
                className="h-10 px-6 rounded-xl !bg-black dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Pick Plan
              </Button>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-[#0FAF7A]">${isAnnual ? '3' : '4'}</span>
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">/Employee/month</span>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              {['Core HR', 'Time Off & Attendance', 'Remote Onboarding', 'Recruitment', 'Mobile App (Employee Self-Services)', 'Integration'].map(feature => (
                <div key={feature} className="flex items-center gap-3">
                  <HiCheck className="text-lg text-[#0FAF7A]" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Perform Plan */}
          <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-6 flex flex-col gap-6 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Perform Plan</h3>
                  <span className="px-2 py-0.5 rounded bg-[#0FAF7A] text-white text-[10px] font-bold uppercase tracking-widest">Recommendation</span>
                </div>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">Start enabling your employees' performance across agile teams.</p>
              </div>
              <Button 
                onClick={() => setIsAmountDrawerOpen(true)}
                className="h-10 px-6 rounded-xl !bg-black dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Pick Plan
              </Button>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-[#0FAF7A]">${isAnnual ? '4' : '5'}</span>
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">/Employee/month</span>
            </div>

            <p className="text-xs font-bold text-gray-900 dark:text-white mt-2">Essentials plan, plus Performance Enablement features</p>
            <div className="flex flex-col gap-3">
              {['Self Reviews', 'Org-based Reviews', 'Project-based Reviews', 'Automated Review Schedule', 'Built-in Review Templates'].map(feature => (
                <div key={feature} className="flex items-center gap-3">
                  <HiCheck className="text-lg text-[#0FAF7A]" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-800/50">
              <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">14-day free trial · No credit card required</span>
            </div>
          </div>

        </div>
      </div>
      <AmountSubscriptionDrawer isOpen={isAmountDrawerOpen} onClose={() => setIsAmountDrawerOpen(false)} />
    </div>
  );
}
