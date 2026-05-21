"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";

export default function ContactSupportPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Title area with Breadcrumbs and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help Center</h1>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-gray-500">
            <Link href="/dashboard/help-center" className="hover:text-primary transition-colors">
              Help Center
            </Link>
            <span className="text-gray-300">&gt;</span>
            <span className="text-gray-400">Contact Support</span>
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

      {/* Main content wrapper */}
      <div className="flex flex-col gap-6 max-w-4xl">
        <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
          <span>Customer Contact Support</span>
          <HiOutlineInformationCircle className="text-gray-400 text-lg" />
        </div>

        <Card className="p-8 flex flex-col gap-8 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 shadow-sm leading-relaxed text-xs md:text-sm text-gray-650 dark:text-gray-400">
          <p className="font-semibold text-gray-500 dark:text-gray-400">
            If you have any trouble getting started or during usage, please reach out to us using the following support channels.
          </p>

          {/* Intercom */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Intercom Live Chat System
            </h2>
            <p className="font-medium text-gray-500 dark:text-gray-400">
              Please describe your problems in the Live Chat, our chat specialists will answer your questions. We work from 9:00 to 18:00 (GMT +7), Monday to Friday. You are welcome to leave us messages if our specialists are not online.
            </p>
          </div>

          {/* Submit a Ticket */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Submit a Ticket
            </h2>
            <p className="font-medium text-gray-500 dark:text-gray-400">
              Send your concerns or question in the email{" "}
              <a
                href="mailto:contact@peoplelyhr.com"
                className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
              >
                contact@peoplelyhr.com
              </a>
              , our Customer Support team will get back to you as soon as possible.
            </p>
          </div>

          {/* Related Articles */}
          <div className="flex flex-col gap-3 border-t border-gray-50 dark:border-gray-850 pt-6">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Relate :
            </h2>
            <div className="flex flex-col gap-2.5 font-bold text-teal-600 dark:text-teal-400">
              <Link href="#" className="hover:underline hover:text-teal-700 dark:hover:text-teal-350">
                Complete Guide to Set up Peoplely HR
              </Link>
              <Link href="#" className="hover:underline hover:text-teal-700 dark:hover:text-teal-350">
                Company Domain
              </Link>
              <Link href="#" className="hover:underline hover:text-teal-700 dark:hover:text-teal-350">
                Activate Account
              </Link>
              <Link href="#" className="hover:underline hover:text-teal-700 dark:hover:text-teal-350">
                About Peoplely HR
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
