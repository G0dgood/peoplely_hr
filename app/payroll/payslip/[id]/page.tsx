"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { HiOutlineChevronLeft, HiOutlineArrowDownTray, HiOutlineEye } from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/ui/page-header";

interface PayslipSummary {
  id: string;
  period: string;
  earnings: string;
  deductions: string;
  netPay: string;
  status: "PAID" | "PENDING";
  date: string;
}

const PAST_PAYSLIPS: PayslipSummary[] = [
  {
    id: "APR-2023",
    period: "April 2023",
    earnings: "$4,529.00",
    deductions: "$500.00",
    netPay: "$4,029.00",
    status: "PAID",
    date: "25 Apr 2023",
  },
  {
    id: "MAR-2023",
    period: "March 2023",
    earnings: "$4,500.00",
    deductions: "$500.00",
    netPay: "$4,000.00",
    status: "PAID",
    date: "25 Mar 2023",
  },
  {
    id: "FEB-2023",
    period: "February 2023",
    earnings: "$4,500.00",
    deductions: "$500.00",
    netPay: "$4,000.00",
    status: "PAID",
    date: "25 Feb 2023",
  },
  {
    id: "JAN-2023",
    period: "January 2023",
    earnings: "$4,500.00",
    deductions: "$500.00",
    netPay: "$4,000.00",
    status: "PAID",
    date: "25 Jan 2023",
  },
  {
    id: "DEC-2022",
    period: "December 2022",
    earnings: "$5,500.00",
    deductions: "$500.00",
    netPay: "$5,000.00",
    status: "PAID",
    date: "25 Dec 2022",
  },
];

export default function PayslipListPage() {
  const params = useParams();
  const id = params?.id || "1";
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => router.push(`/payroll/list/${id}`)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
            >
              <HiOutlineChevronLeft className="text-lg" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Payslip History</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 pl-11">
            View all past payslips for Pristia Candra
          </p>
        </div>
      </div>

      {/* Payslips Table */}
      <Card className="p-4 md:p-8 border border-gray-300 dark:border-gray-800">
        <div className="flex flex-col gap-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-none bg-gray-50/50 dark:bg-gray-800/30 rounded-xl">
                  <TableHead className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider rounded-l-xl">
                    Pay Period
                  </TableHead>
                  <TableHead className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Paid Date
                  </TableHead>
                  <TableHead className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Total Earnings
                  </TableHead>
                  <TableHead className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Total Deductions
                  </TableHead>
                  <TableHead className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Net Pay
                  </TableHead>
                  <TableHead className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right rounded-r-xl">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PAST_PAYSLIPS.map((payslip) => (
                  <TableRow
                    key={payslip.id}
                    className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-300 dark:border-gray-800"
                  >
                    <TableCell className="py-5 px-6">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{payslip.period}</span>
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{payslip.date}</span>
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{payslip.earnings}</span>
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <span className="text-xs font-bold text-red-500 dark:text-red-400">-{payslip.deductions}</span>
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <span className="text-xs font-black text-gray-900 dark:text-white">{payslip.netPay}</span>
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Badge variant={payslip.status === "PAID" ? "success" : "warning"} tinted className="text-[10px] uppercase tracking-wider px-2.5 py-1">
                        {payslip.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* We could push to a specific payslip detail page like /payroll/payslip/${id}/${payslip.id} */}
                        <button
                          onClick={() => router.push(`/payroll/payslip/${id}/${payslip.id}`)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          <HiOutlineEye className="text-sm" /> View
                        </button>
                        <button
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 transition-colors"
                        >
                          <HiOutlineArrowDownTray className="text-sm" /> PDF
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}
