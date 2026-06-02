"use client";

import * as React from "react";
import {
  HiOutlineEnvelope,
  HiOutlinePhone
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useApiError } from "@/hooks/useApiError";
import { DirectorySkeleton } from "@/components/ui/skeleton/directory-skeleton";

export default function DirectoryPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const { data, isLoading, error } = useGetEmployeesQuery({ limit: 100, companyId });
  const employees = data?.employees || [];

  useApiError(!!error, error, "Failed to load directory");

  if (isLoading) {
    return <DirectorySkeleton />;
  }

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full">
      {/* Header Section */}
      <PageHeader title="Directory" description="This is director board" />

      {/* Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {employees.map((person) => (
          <Link key={person.id} href={`/employees/${person.id}`}>
            <Card className="p-4 md:p-8 flex flex-col items-center text-center group hover:border-primary dark:hover:border-primary hover:shadow-md transition-all h-full cursor-pointer">
              <Avatar
                src={person.avatar}
                fallback={person.name.split(" ").map(n => n[0]).join("")}
                size="lg"
                className="mb-6 ring-4 ring-gray-50 dark:ring-gray-800 group-hover:ring-primary/10 transition-all"
              />

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                {person.name}
              </h3>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-6">
                {person.role}
              </p>

              <div className="w-full flex flex-col gap-3 pt-6 border-t border-gray-50 dark:border-gray-800 text-left">
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                  <HiOutlineEnvelope className="text-lg shrink-0" />
                  <span className="text-xs font-bold truncate">{person.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                  <HiOutlinePhone className="text-lg shrink-0" />
                  <span className="text-xs font-bold">089318298493</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
