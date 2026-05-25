"use client";

import * as React from "react";
import { HiChevronLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white dark:bg-gray-950">

      {/* Left Panel - Summary (Green Background) */}
      <div className="w-full md:w-1/2 bg-[#0FAF7A] p-4 md:p-8 md:p-16 lg:p-24 flex flex-col justify-between text-white relative">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <HiChevronLeft className="text-white text-xl" />
            </button>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold opacity-90">Subscribe to Engage Plans</span>
              <div className="flex items-end gap-2">
                <span className="text-4xl lg:text-5xl font-bold">US$72,00</span>
                <div className="flex flex-col text-[10px] font-bold tracking-wider opacity-80 leading-tight pb-1.5">
                  <span>PER</span>
                  <span>TAHUN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6 text-sm">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Engage Plan</span>
                <span className="font-bold">US$72,00</span>
              </div>
              <div className="flex items-center justify-between opacity-80 text-xs">
                <span>Billed annually</span>
                <span>US$72.00 per employee</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/20 pt-6">
              <span className="font-semibold">Sub Total</span>
              <span className="font-bold">US$72,00</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold">Promo Code</span>
                <button className="px-3 py-1 rounded bg-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white/30 transition-colors">
                  Input Code
                </button>
              </div>
              <span className="font-bold">$0</span>
            </div>

            <div className="flex items-center justify-between border-t border-white/20 pt-6">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-lg">US$72,00</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20">
          <p className="text-xs font-semibold opacity-70">
            © 2025 Peoplely HR . Alrights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Payment Form (White Background) */}
      <div className="w-full md:w-1/2 p-4 md:p-8 md:p-16 lg:p-24 flex flex-col justify-center max-w-2xl mx-auto">
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pay with card</h1>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Email : <span className="text-gray-900 dark:text-white">contact@unpixel.com</span>
          </p>
        </div>

        <form className="flex flex-col gap-8">

          {/* Card Information */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Card Information <span className="text-red-500">*</span>
            </span>
            <div className="flex flex-col border border-gray-300 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
              <input
                placeholder="1234 1234 1234 1234"
                className="w-full h-12 px-4 text-sm bg-transparent border-0 border-b border-gray-300 dark:border-gray-800 focus:ring-0 focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
              />
              <div className="flex">
                <input
                  placeholder="MM/YY"
                  className="w-1/2 h-12 px-4 text-sm bg-transparent border-0 border-r border-gray-300 dark:border-gray-800 focus:ring-0 focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
                />
                <input
                  placeholder="CVC"
                  className="w-1/2 h-12 px-4 text-sm bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Name On Card */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Name On Card <span className="text-red-500">*</span>
            </span>
            <Input
              placeholder="Input your full name"
              className="border-gray-300 dark:border-gray-800"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Address <span className="text-red-500">*</span>
            </span>
            <div className="flex flex-col gap-3">
              <Dropdown
                label="Indonesia"
                options={["Indonesia", "Singapore", "United States"]}
                onSelect={() => { }}
                className="w-full h-12 rounded-xl border-gray-300 dark:border-gray-800"
              />
              <Input
                placeholder="Address"
                className="border-gray-300 dark:border-gray-800"
              />
              <Dropdown
                label="City"
                options={["Jakarta", "Bandung", "Surabaya"]}
                onSelect={() => { }}
                className="w-full h-12 rounded-xl border-gray-300 dark:border-gray-800"
              />
              <div className="flex gap-3">
                <div className="w-1/2">
                  <Dropdown
                    label="Province"
                    options={["DKI Jakarta", "West Java"]}
                    onSelect={() => { }}
                    className="w-full h-12 rounded-xl border-gray-300 dark:border-gray-800"
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    placeholder="Code"
                    className="border-gray-300 dark:border-gray-800"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex flex-col gap-4 mt-4">
            <Button className="w-full h-12 rounded-xl !bg-black dark:bg-white text-white dark:text-gray-900 font-bold text-base hover:opacity-90 transition-opacity">
              Subscribe
            </Button>
            <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 leading-relaxed text-center">
              By confirming your subscription, you authorize Peoplely HR Inc. charge your card for this payment and future payments according to their terms.
            </p>
          </div>

        </form>
      </div>

    </div>
  );
}
