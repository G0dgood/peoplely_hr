"use client";

import * as React from "react";
import { 
  HiOutlinePlus, 
  HiOutlineTrash,
  HiOutlineDocumentText
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DocumentsSection() {
  const personalDocuments = [
    { name: "CV_Lincoln_v1.pdf" },
  ];

  const payslips = [
    { name: "Payslips_20 Aug.pdf" },
    { name: "Payslips_20 Oct.pdf" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Personal Documents Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Personal Documents</h3>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <HiOutlinePlus className="text-xl" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-50 dark:border-gray-800">
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Document Name</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {personalDocuments.map((doc, index) => (
                <TableRow key={index} className="border-b border-gray-50 dark:border-gray-800">
                  <TableCell className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">{doc.name}</TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        <HiOutlineDocumentText className="text-lg" />
                      </button>
                      <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        <HiOutlineTrash className="text-lg" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Payslips Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payslips</h3>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <HiOutlinePlus className="text-xl" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-50 dark:border-gray-800">
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Document Name</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payslips.map((doc, index) => (
                <TableRow key={index} className="border-b border-gray-50 dark:border-gray-800">
                  <TableCell className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">{doc.name}</TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        <HiOutlineDocumentText className="text-lg" />
                      </button>
                      <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        <HiOutlineTrash className="text-lg" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
