"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineCalendarDays,
  HiOutlineHandThumbUp,
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  updatedAt: string;
  likes: number;
  hasLiked?: boolean;
}

const INITIAL_FAQS: FAQItem[] = [
  {
    id: 1,
    question: "What is an HR management platform?",
    answer: "An HR management platform is a software solution designed to streamline and automate various HR-related tasks such as payroll processing, employee record keeping, benefits administration, and performance management.",
    updatedAt: "Updated over a week ago",
    likes: 30,
  },
  {
    id: 2,
    question: "What are the benefits of using an HR management platform?",
    answer: "Using an HR management platform can help save time, reduce errors, and improve efficiency in HR operations. It can also improve communication between employees and HR, enhance compliance with regulations, and provide insights into HR metrics.",
    updatedAt: "Updated over a week ago",
    likes: 44,
  },
  {
    id: 3,
    question: "How do I choose the right HR management platform for my organization?",
    answer: "When choosing an HR management platform, consider your organization's specific needs, budget, and goals. Evaluate different platforms based on features, ease of use, customer support, security, and integration with other systems.",
    updatedAt: "Updated over a week ago",
    likes: 52,
  },
  {
    id: 4,
    question: "How do I implement an HR management platform?",
    answer: "Implementing an HR management platform typically involves setting up the software, configuring settings, migrating data, and training employees on how to navigate the dashboard features.",
    updatedAt: "Updated over a week ago",
    likes: 18,
  },
];

export default function FAQPage() {
  const [faqs, setFaqs] = React.useState<FAQItem[]>(INITIAL_FAQS);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleLike = (id: number) => {
    setFaqs((prev) =>
      prev.map((faq) => {
        if (faq.id === id) {
          const hasLiked = !faq.hasLiked;
          return {
            ...faq,
            likes: hasLiked ? faq.likes + 1 : faq.likes - 1,
            hasLiked,
          };
        }
        return faq;
      })
    );
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <span className="text-gray-400">FAQ&apos;s</span>
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

      {/* Main FAQ list wrapper */}
      <div className="flex flex-col gap-6 max-w-4xl">
        <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
          <span>Frequently Asked Questions</span>
          <HiOutlineInformationCircle className="text-gray-400 text-lg" />
        </div>

        <div className="flex flex-col gap-4">
          {filteredFaqs.map((faq) => (
            <Card
              key={faq.id}
              className="p-6 flex flex-col gap-5 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2.5 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800/60 pt-4 mt-1">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 dark:text-gray-550">
                  <HiOutlineCalendarDays className="text-lg text-gray-400 dark:text-gray-500" />
                  <span>{faq.updatedAt}</span>
                </div>

                <button
                  onClick={() => handleLike(faq.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    faq.hasLiked
                      ? "bg-primary/5 text-primary"
                      : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <HiOutlineHandThumbUp className="text-sm" />
                  <span>{faq.likes}</span>
                </button>
              </div>
            </Card>
          ))}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
              No matching questions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
