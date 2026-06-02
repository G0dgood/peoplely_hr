"use client";

import * as React from "react";
import { 
  HiOutlinePlus, 
  HiOutlineTrash,
  HiOutlineDocumentText
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";

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
          <table>
            <thead>
              <tr >
                <th >Document Name</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {personalDocuments.map((doc, index) => (
                <tr key={index} >
                  <td className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">{doc.name}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        <HiOutlineDocumentText className="text-lg" />
                      </button>
                      <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        <HiOutlineTrash className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <table>
            <thead>
              <tr >
                <th >Document Name</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {payslips.map((doc, index) => (
                <tr key={index} >
                  <td className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">{doc.name}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        <HiOutlineDocumentText className="text-lg" />
                      </button>
                      <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        <HiOutlineTrash className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
