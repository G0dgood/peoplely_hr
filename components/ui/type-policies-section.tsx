"use client";

import * as React from "react";
import { 
  HiOutlinePencilSquare, 
  HiOutlineEllipsisVertical 
} from "react-icons/hi2";
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

export interface Policy {
  type: string;
  status: "PAID" | "UNPAID";
  policyName: string;
  description: string;
  eligibility: string;
  isEnabled: boolean;
}

export const INITIAL_POLICIES: Policy[] = [
  {
    type: "Annual",
    status: "UNPAID",
    policyName: "Annual",
    description: "-",
    eligibility: "Full-time Employees only",
    isEnabled: true
  },
  {
    type: "Engagement",
    status: "UNPAID",
    policyName: "Engagement",
    description: "-",
    eligibility: "Full-time Employees only",
    isEnabled: true
  },
  {
    type: "Maternity",
    status: "UNPAID",
    policyName: "Maternity",
    description: "-",
    eligibility: "All full-time female employees",
    isEnabled: true
  }
];

export function TypePoliciesSection({
  policies = INITIAL_POLICIES,
  onToggleEnabled
}: {
  policies?: Policy[];
  onToggleEnabled?: (index: number) => void;
}) {
  const grouped = policies.reduce((acc, policy, index) => {
    if (!acc[policy.type]) {
      acc[policy.type] = [];
    }
    acc[policy.type].push({ policy, originalIndex: index });
    return acc;
  }, {} as Record<string, Array<{ policy: Policy; originalIndex: number }>>);

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(grouped).map(([typeName, items]) => {
        const firstItem = items[0];
        const status = firstItem?.policy.status || "UNPAID";
        const isEnabled = firstItem?.policy.isEnabled ?? true;
        const originalIndex = firstItem?.originalIndex ?? 0;

        return (
          <Card key={typeName} className="p-8 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{typeName}</h3>
                <Badge variant="secondary" tinted className="text-[10px] font-bold px-2 py-0.5 rounded-lg">
                  {status}
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                {/* Custom Switch / Toggle */}
                <button 
                  onClick={() => onToggleEnabled?.(originalIndex)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${isEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${isEnabled ? 'translate-x-5' : ''}`} />
                </button>
                <HiOutlineEllipsisVertical className="text-gray-400 text-xl cursor-pointer" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-none bg-gray-50/50 dark:bg-gray-800/30 rounded-xl">
                    <TableHead className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider rounded-l-xl">Policy Name</TableHead>
                    <TableHead className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Description</TableHead>
                    <TableHead className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Eligibility</TableHead>
                    <TableHead className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right rounded-r-xl">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map(({ policy }, idx) => (
                    <TableRow key={idx} className="border-none">
                      <TableCell className="py-6 px-6 text-xs font-bold text-gray-500 dark:text-gray-400">{policy.policyName}</TableCell>
                      <TableCell className="py-6 px-6 text-xs font-bold text-gray-500 dark:text-gray-400">{policy.description}</TableCell>
                      <TableCell className="py-6 px-6 text-xs font-bold text-gray-500 dark:text-gray-400">{policy.eligibility}</TableCell>
                      <TableCell className="py-6 px-6 text-right">
                        <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          <HiOutlinePencilSquare className="text-lg" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
