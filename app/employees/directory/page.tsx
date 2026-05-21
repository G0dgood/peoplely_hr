"use client";

import * as React from "react";
import { 
  HiOutlineEnvelope, 
  HiOutlinePhone 
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";

const DIRECTORY_DATA = [
  {
    name: "Angeline Beier",
    role: "Finance Manager",
    email: "angeline@gmail.com",
    phone: "0978412176",
    avatar: "https://i.pravatar.cc/150?u=angeline",
  },
  {
    name: "Alfredo George",
    role: "HR Manager",
    email: "george@gmail.com",
    phone: "089318298493",
    avatar: "https://i.pravatar.cc/150?u=alfredo",
  },
  {
    name: "Davis Levin",
    role: "IT Helpdesk",
    email: "davis@gmail.com",
    phone: "089318298493",
    avatar: "https://i.pravatar.cc/150?u=davis",
  },
  {
    name: "Carla Workman",
    role: "IT Manager",
    email: "carla@gmail.com",
    phone: "089318298493",
    avatar: "https://i.pravatar.cc/150?u=carla",
  },
  {
    name: "Rayna Calzoni",
    role: "HR Specialist",
    email: "rayna@gmail.com",
    phone: "089318298493",
    avatar: "https://i.pravatar.cc/150?u=rayna_calzoni",
  },
  {
    name: "Miracle Geidt",
    role: "Finance Specialist",
    email: "miracle@gmail.com",
    phone: "089318298493",
    avatar: "https://i.pravatar.cc/150?u=miracle_geidt",
  },
  {
    name: "Haylie Herwitz",
    role: "Account Manager",
    email: "haylie@gmail.com",
    phone: "089318298493",
    avatar: "https://i.pravatar.cc/150?u=haylie",
  },
  {
    name: "Omar Calzoni",
    role: "Admin Manager",
    email: "omar@gmail.com",
    phone: "089318298493",
    avatar: "https://i.pravatar.cc/150?u=omar_calzoni",
  },
  {
    name: "Omar Lipshutz",
    role: "Account Executive",
    email: "omar_l@gmail.com",
    phone: "089318298493",
    avatar: "https://i.pravatar.cc/150?u=omar_lipshutz",
  },
  {
    name: "Kierra Levin",
    role: "Account Executive",
    email: "kierra@gmail.com",
    phone: "089318298493",
    avatar: "https://i.pravatar.cc/150?u=kierra",
  },
  {
    name: "Roger Saris",
    role: "Account Executive",
    email: "roger@gmail.com",
    phone: "089318298493",
    avatar: "https://i.pravatar.cc/150?u=roger",
  },
  {
    name: "Phillip Press",
    role: "HR Specialist",
    email: "phillip@gmail.com",
    phone: "089318298493",
    avatar: "https://i.pravatar.cc/150?u=phillip",
  },
];

export default function DirectoryPage() {
  return (
    <div className="flex flex-col gap-8 p-8 min-h-full">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Directory</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This is director board</p>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {DIRECTORY_DATA.map((person, index) => (
          <Link key={index} href={`/dashboard/employees/${index + 1}`}>
            <Card className="p-8 flex flex-col items-center text-center group hover:border-gray-400 dark:hover:border-gray-600 transition-colors h-full cursor-pointer">
            <Avatar 
              src={person.avatar} 
              size="lg" 
              className="mb-6 ring-4 ring-gray-50 dark:ring-gray-800 group-hover:ring-primary/10 transition-all"
            />
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
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
                <span className="text-xs font-bold">{person.phone}</span>
              </div>
            </div>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
