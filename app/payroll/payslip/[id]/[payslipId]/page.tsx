"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HiOutlineChevronLeft, HiOutlineArrowDownTray, HiOutlinePrinter } from "react-icons/hi2";

export default function PayslipDetailPage() {
  const params = useParams();
  const id = params?.id || "1";
  const payslipId = params?.payslipId || "APR-2023";

  // Mock data for the payslip
  const payslip = {
    employeeName: "Pristia Candra",
    employeeId: "UN001",
    designation: "UI/UX Designer",
    department: "Design",
    joiningDate: "16 Feb 2020",
    payPeriod: String(payslipId).replace("-", " "), // basic formatting
    paidDays: 22,
    bankName: "Bank Central Asia",
    accountNumber: "**** **** 0034",
    status: "PAID" as const,
    earnings: [
      { description: "Basic Salary", amount: 3500 },
      { description: "House Rent Allowance (HRA)", amount: 800 },
      { description: "Conveyance", amount: 200 },
      { description: "Special Allowance", amount: 229 },
    ],
    deductions: [
      { description: "Tax Deducted at Source (TDS)", amount: 350 },
      { description: "Provident Fund (PF)", amount: 100 },
      { description: "Health Insurance", amount: 50 },
    ],
  };

  const totalEarnings = payslip.earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = payslip.deductions.reduce((sum, item) => sum + item.amount, 0);
  const netPay = totalEarnings - totalDeductions;

  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payslip Details</h1>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 mt-2.5">
            <Link href={`/payroll/payslip/${id}`} className="hover:text-primary transition-colors flex items-center gap-1">
              <HiOutlineChevronLeft className="text-[10px]" /> Back to History
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 px-6 bg-white dark:bg-gray-900" leftIcon={<HiOutlinePrinter className="text-lg" />}>
            Print
          </Button>
          <Button variant="primary" className="h-11 px-6 bg-[#11131A] dark:bg-white dark:text-gray-900" leftIcon={<HiOutlineArrowDownTray className="text-lg" />}>
            Download PDF
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <Card className="p-10 border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm relative overflow-hidden">
          {/* Decorative Top Border */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[#0FAF7A]"></div>

          {/* Payslip Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 dark:border-gray-800 pb-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center p-3 border border-gray-100 dark:border-gray-700">
                <img src="/logo/peoplelyHalf.svg" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-1">Peoplely HR</h2>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">123 Business Avenue, Suite 100<br/>San Francisco, CA 94107</p>
              </div>
            </div>
            
            <div className="text-left md:text-right flex flex-col items-start md:items-end">
              <h1 className="text-3xl font-black text-gray-200 dark:text-gray-800 uppercase tracking-widest mb-2">Payslip</h1>
              <Badge variant="success" tinted className="px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
                {payslip.status}
              </Badge>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Pay Period: <span className="text-[#0FAF7A]">{payslip.payPeriod}</span></p>
            </div>
          </div>

          {/* Employee Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-black text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Employee Details</h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Employee Name:</div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">{payslip.employeeName}</div>
                
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Employee ID:</div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">{payslip.employeeId}</div>
                
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Designation:</div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">{payslip.designation}</div>
                
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Department:</div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">{payslip.department}</div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-black text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Payment Details</h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Joining Date:</div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">{payslip.joiningDate}</div>
                
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Paid Days:</div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">{payslip.paidDays}</div>
                
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Bank Name:</div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">{payslip.bankName}</div>
                
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Account No:</div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">{payslip.accountNumber}</div>
              </div>
            </div>
          </div>

          {/* Salary Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Earnings */}
            <div className="flex flex-col">
              <div className="bg-[#E8FAF4] dark:bg-[#0FAF7A]/10 border border-[#0FAF7A]/20 px-4 py-3 rounded-t-xl">
                <h3 className="text-xs font-bold text-[#0FAF7A] dark:text-[#0FAF7A] uppercase tracking-wider">Earnings</h3>
              </div>
              <div className="border border-t-0 border-gray-200 dark:border-gray-800 rounded-b-xl overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {payslip.earnings.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100 dark:border-gray-800/60 last:border-0">
                        <td className="py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">{item.description}</td>
                        <td className="py-3 px-4 text-xs font-bold text-gray-900 dark:text-white text-right">${item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deductions */}
            <div className="flex flex-col">
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 px-4 py-3 rounded-t-xl">
                <h3 className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">Deductions</h3>
              </div>
              <div className="border border-t-0 border-gray-200 dark:border-gray-800 rounded-b-xl overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {payslip.deductions.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100 dark:border-gray-800/60 last:border-0">
                        <td className="py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">{item.description}</td>
                        <td className="py-3 px-4 text-xs font-bold text-gray-900 dark:text-white text-right">${item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Totals Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-8 w-full md:w-auto">
              <div>
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total Earnings</p>
                <p className="text-lg font-bold text-[#0FAF7A] dark:text-[#0FAF7A]">${totalEarnings.toLocaleString()}</p>
              </div>
              <div className="w-px h-10 bg-gray-300 dark:bg-gray-700"></div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total Deductions</p>
                <p className="text-lg font-bold text-red-500 dark:text-red-400">${totalDeductions.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="w-full md:w-auto bg-[#0FAF7A] text-white rounded-xl px-6 py-4 flex flex-col items-start md:items-end shadow-md">
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-1">Net Pay</p>
              <h2 className="text-3xl font-black tracking-tight">${netPay.toLocaleString()}</h2>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center pt-8 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
              This is a computer-generated document. No signature is required.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
