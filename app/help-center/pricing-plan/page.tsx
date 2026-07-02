"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineCheck,
  HiOutlineSparkles,
  HiOutlineXMark,
  HiOutlineCreditCard,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function PricingPlanHelpPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAnnual, setIsAnnual] = React.useState(true);
  const [employeeCount, setEmployeeCount] = React.useState(25);
  
  // Checkout modal state
  const [selectedPlanName, setSelectedPlanName] = React.useState<string | null>(null);
  const [isCheckoutProcessing, setIsCheckoutProcessing] = React.useState(false);
  const [checkoutCard, setCheckoutCard] = React.useState({ number: "", expiry: "", cvv: "" });

  const performMonthlyRate = 8;
  const performAnnualRate = 6.4; // 20% discount on 8
  
  const enterpriseMonthlyRate = 15;
  const enterpriseAnnualRate = 12.0; // 20% discount on 15

  const activePerformRate = isAnnual ? performAnnualRate : performMonthlyRate;
  const activeEnterpriseRate = isAnnual ? enterpriseAnnualRate : enterpriseMonthlyRate;

  const performTotal = employeeCount * activePerformRate;
  const enterpriseTotal = employeeCount * activeEnterpriseRate;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeCount(parseInt(e.target.value, 10));
  };

  const triggerCheckout = (planName: string) => {
    if (planName === "Free" && employeeCount > 10) {
      toast.error("Free plan is limited to maximum 10 employees.", {
        description: "Please scale down your employees count or select the Perform Plan."
      });
      return;
    }
    setSelectedPlanName(planName);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutCard.number || !checkoutCard.expiry || !checkoutCard.cvv) {
      toast.error("Please fill in card details.");
      return;
    }

    setIsCheckoutProcessing(true);

    setTimeout(() => {
      setIsCheckoutProcessing(false);
      setSelectedPlanName(null);
      setCheckoutCard({ number: "", expiry: "", cvv: "" });
      toast.success("Payment completed successfully!", {
        description: "Your workspace has been upgraded. Receipt sent to administrator.",
        icon: <HiOutlineSparkles className="text-teal-500" />,
      });
    }, 1500);
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
            <span className="text-gray-400">Pricing Plan</span>
          </div>
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search pricing FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-11 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
        </div>
      </div>

      <div className="flex flex-col gap-6 max-w-6xl w-full">
        <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
          <span>Subscription Plans & Estimator</span>
          <HiOutlineInformationCircle className="text-gray-400 text-lg" />
        </div>

        {/* Pricing Switch & Slider sandbox */}
        <Card className="p-6 md:p-8 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-sm rounded-2xl flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1 w-full flex flex-col gap-5">
            <div>
              <p className="text-xs font-black text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                Plan Calculator
              </p>
              <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                Drag to estimate cost for your team
              </h3>
            </div>

            {/* Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-extrabold text-gray-700 dark:text-gray-300">
                <span>Employee Seats:</span>
                <span className="px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-450 border border-teal-150/40 text-xs font-black">
                  {employeeCount} Employees
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={250}
                step={5}
                value={employeeCount}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 dark:bg-gray-850 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-550 font-bold">
                <span>5 Hires</span>
                <span>125 Hires</span>
                <span>250 Hires</span>
              </div>
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="flex flex-col items-center gap-3 p-4 bg-gray-50/50 dark:bg-gray-950/30 border border-gray-100 dark:border-gray-850 rounded-2xl w-full md:w-auto min-w-64">
            <span className="text-[10px] font-black text-gray-405 dark:text-gray-450 uppercase">
              Billing Cycle
            </span>
            <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-1 border border-gray-250 dark:border-gray-800 rounded-xl">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-3.5 py-1.5 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  !isAnnual
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-450 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-3.5 py-1.5 text-xs font-black rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  isAnnual
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-450 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span>Annual</span>
                <span className="px-1.5 py-0.5 bg-yellow-400 text-gray-900 text-[9px] font-black rounded-md leading-none animate-pulse">
                  -20%
                </span>
              </button>
            </div>
            <p className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 text-center">
              Annual billing saves up to two months of subscription charges.
            </p>
          </div>
        </Card>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Free Plan */}
          <Card className={`p-6 border bg-white dark:bg-gray-900 rounded-2xl flex flex-col justify-between shadow-sm relative ${
            employeeCount > 10 ? "border-gray-200 dark:border-gray-800 opacity-60" : "border-gray-200 dark:border-gray-800 hover:shadow-md"
          }`}>
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-gray-950 dark:text-white">Free Plan</h3>
                <p className="text-[11px] text-gray-450 dark:text-gray-500 font-semibold mt-1">For small teams getting started.</p>
              </div>

              <div className="flex items-baseline gap-1 py-2">
                <span className="text-2xl font-black text-gray-900 dark:text-white">$0</span>
                <span className="text-xs font-bold text-gray-400">/ forever</span>
              </div>

              <ul className="flex flex-col gap-2.5 text-xs font-medium text-gray-650 dark:text-gray-400 border-t border-gray-50 dark:border-gray-850 pt-4">
                <li className="flex items-center gap-2">
                  <HiOutlineCheck className="text-teal-650 text-sm flex-shrink-0" />
                  <span>Up to 10 employees</span>
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineCheck className="text-teal-650 text-sm flex-shrink-0" />
                  <span>Basic Check-in/out</span>
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineCheck className="text-teal-650 text-sm flex-shrink-0" />
                  <span>Informational checklists</span>
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineCheck className="text-teal-650 text-sm flex-shrink-0" />
                  <span>Standard documents vault</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => triggerCheckout("Free")}
              disabled={employeeCount > 10}
              className="mt-6 w-full h-11 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-white rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              {employeeCount > 10 ? "Limit Exceeded (Max 10)" : "Deploy Free"}
            </button>
          </Card>

          {/* Perform Plan (Recommended) */}
          <Card className="p-6 border-2 border-teal-600 dark:border-teal-500 bg-white dark:bg-gray-900 rounded-2xl flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-600 text-white text-[9px] font-black rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <HiOutlineSparkles /> Most Popular
            </span>

            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-gray-950 dark:text-white">Perform Plan</h3>
                <p className="text-[11px] text-gray-450 dark:text-gray-500 font-semibold mt-1">Full scale package for growing teams.</p>
              </div>

              <div className="flex flex-col py-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-gray-900 dark:text-white">
                    ${activePerformRate.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-gray-400">/ seat / mo</span>
                </div>
                <span className="text-[10px] font-extrabold text-teal-600 dark:text-teal-400 mt-1">
                  Estimated Total: ${performTotal.toLocaleString()}/{isAnnual ? "yr" : "mo"}
                </span>
              </div>

              <ul className="flex flex-col gap-2.5 text-xs font-medium text-gray-650 dark:text-gray-400 border-t border-gray-50 dark:border-gray-850 pt-4">
                <li className="flex items-center gap-2">
                  <HiOutlineCheck className="text-teal-650 text-sm flex-shrink-0" />
                  <span>Unlimited employees</span>
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineCheck className="text-teal-650 text-sm flex-shrink-0" />
                  <span>Automated Payroll Adjustments</span>
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineCheck className="text-teal-650 text-sm flex-shrink-0" />
                  <span>Custom On/Offboarding checklists</span>
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineCheck className="text-teal-650 text-sm flex-shrink-0" />
                  <span>Slack & MS Teams integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineCheck className="text-teal-650 text-sm flex-shrink-0" />
                  <span>Full HR Reports dashboard</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => triggerCheckout("Perform")}
              className="mt-6 w-full h-11 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-sm"
            >
              Upgrade to Perform
            </button>
          </Card>

          {/* Enterprise Plan */}
          <Card className="p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative">
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-gray-950 dark:text-white">Enterprise Plan</h3>
                <p className="text-[11px] text-gray-450 dark:text-gray-500 font-semibold mt-1">Advanced management and governance.</p>
              </div>

              <div className="flex flex-col py-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-gray-900 dark:text-white">
                    ${activeEnterpriseRate.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-gray-400">/ seat / mo</span>
                </div>
                <span className="text-[10px] font-extrabold text-teal-600 dark:text-teal-400 mt-1">
                  Estimated Total: ${enterpriseTotal.toLocaleString()}/{isAnnual ? "yr" : "mo"}
                </span>
              </div>

              <ul className="flex flex-col gap-2.5 text-xs font-medium text-gray-650 dark:text-gray-400 border-t border-gray-50 dark:border-gray-850 pt-4">
                <li className="flex items-center gap-2">
                  <HiOutlineCheck className="text-teal-650 text-sm flex-shrink-0" />
                  <span>Dedicated accounts representative</span>
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineCheck className="text-teal-650 text-sm flex-shrink-0" />
                  <span>Custom Single Sign-on (SSO)</span>
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineCheck className="text-teal-650 text-sm flex-shrink-0" />
                  <span>Unlimited API calls</span>
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineCheck className="text-teal-650 text-sm flex-shrink-0" />
                  <span>99.99% network uptime SLA</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => triggerCheckout("Enterprise")}
              className="mt-6 w-full h-11 bg-gray-900 text-white dark:bg-gray-850 dark:hover:bg-gray-800 hover:bg-gray-855 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Contact Sales / Upgrade
            </button>
          </Card>

        </div>

        {/* Informational Section on Billing FAQ */}
        <div className="flex flex-col gap-4 border-t border-gray-150 dark:border-gray-850 pt-8 mt-4">
          <h4 className="text-xs md:text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
            Pricing Plans FAQ&apos;s
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed text-xs">
            <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-gray-100 dark:border-gray-850">
              <h5 className="font-extrabold text-gray-900 dark:text-white">Can I change plans at any time?</h5>
              <p className="text-gray-500 dark:text-gray-450 font-semibold leading-normal">
                Yes, you can upgrade, downgrade, or cancel your subscription plan at any time through the workspace settings panel. Plan changes trigger immediate calculations.
              </p>
            </div>
            <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-gray-100 dark:border-gray-850">
              <h5 className="font-extrabold text-gray-900 dark:text-white">How is seat pricing calculated?</h5>
              <p className="text-gray-500 dark:text-gray-450 font-semibold leading-normal">
                Subscriptions calculate dynamically according to the number of active employee records within your database. Inactive or terminated records do not count toward pricing totals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Mock Checkout Modal */}
      {selectedPlanName && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <Card className="max-w-md w-full p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl flex flex-col gap-5 animate-scaleUp">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-gray-900 dark:text-white">
                  Confirm Subscription Upgrade
                </h3>
                <p className="text-[10px] font-bold text-teal-600 dark:text-teal-400 mt-0.5">
                  Upgrading to {selectedPlanName} Plan ({isAnnual ? "Annual Billing" : "Monthly Billing"})
                </p>
              </div>
              <button
                onClick={() => setSelectedPlanName(null)}
                className="text-gray-400 hover:text-gray-650 cursor-pointer"
              >
                <HiOutlineXMark className="text-lg" />
              </button>
            </div>

            {/* Price Calculations */}
            <div className="p-4 border border-gray-100 dark:border-gray-850 rounded-xl bg-gray-50/50 dark:bg-gray-950/40 text-xs font-semibold flex flex-col gap-2.5">
              <div className="flex justify-between">
                <span className="text-gray-400">Calculated Seats:</span>
                <span className="text-gray-950 dark:text-white font-bold">{employeeCount} Employees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Rate per Employee:</span>
                <span className="text-gray-950 dark:text-white font-bold">
                  ${selectedPlanName === "Perform" ? activePerformRate.toFixed(2) : activeEnterpriseRate.toFixed(2)}/mo
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-100 dark:border-gray-850 pt-2.5 mt-1">
                <span className="text-gray-900 dark:text-white font-extrabold">Total Price Billed:</span>
                <span className="text-teal-600 dark:text-teal-400 font-black text-sm">
                  ${(selectedPlanName === "Perform" ? performTotal : enterpriseTotal).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  <span className="text-[10px] font-bold text-gray-400">/{isAnnual ? "year" : "month"}</span>
                </span>
              </div>
            </div>

            {/* Card Information Input */}
            <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-gray-405 dark:text-gray-450 uppercase tracking-wider">
                  Credit Card Number
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="4000 1234 5678 9010"
                    maxLength={19}
                    value={checkoutCard.number}
                    onChange={(e) => setCheckoutCard({ ...checkoutCard, number: e.target.value })}
                    className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                  <HiOutlineCreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-gray-405 dark:text-gray-455 uppercase tracking-wider">
                    Expiry Date
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={checkoutCard.expiry}
                    onChange={(e) => setCheckoutCard({ ...checkoutCard, expiry: e.target.value })}
                    className="h-10 px-3.5 rounded-xl border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-gray-405 dark:text-gray-455 uppercase tracking-wider">
                    Security Code (CVV)
                  </label>
                  <input
                    required
                    type="password"
                    placeholder="•••"
                    maxLength={4}
                    value={checkoutCard.cvv}
                    onChange={(e) => setCheckoutCard({ ...checkoutCard, cvv: e.target.value })}
                    className="h-10 px-3.5 rounded-xl border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isCheckoutProcessing}
                className="mt-2 w-full h-11 bg-teal-650 hover:bg-teal-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                {isCheckoutProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <span>Process Payment</span>
                )}
              </button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
