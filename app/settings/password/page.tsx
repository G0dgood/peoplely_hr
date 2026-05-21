"use client";

import * as React from "react";
import { HiOutlineEyeSlash, HiOutlineEye } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PasswordPage() {
  const [showOld, setShowOld] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-8 flex-1 overflow-y-auto">
        <div className="max-w-4xl flex flex-col">

          <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-8 flex flex-col gap-8 bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="pb-6 border-b border-gray-300 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Change Password
              </h2>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-6 max-w-2xl">

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  Old Password <span className="text-red-500">*</span>
                </span>
                <Input
                  type={showOld ? "text" : "password"}
                  placeholder="••••••••••"
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800"
                  rightIcon={
                    <button type="button" onClick={() => setShowOld(!showOld)} className="text-gray-400 hover:text-gray-600 transition-colors">
                      {showOld ? <HiOutlineEye className="text-lg" /> : <HiOutlineEyeSlash className="text-lg" />}
                    </button>
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  New Password <span className="text-red-500">*</span>
                </span>
                <Input
                  type={showNew ? "text" : "password"}
                  placeholder="••••••••••"
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800"
                  rightIcon={
                    <button type="button" onClick={() => setShowNew(!showNew)} className="text-gray-400 hover:text-gray-600 transition-colors">
                      {showNew ? <HiOutlineEye className="text-lg" /> : <HiOutlineEyeSlash className="text-lg" />}
                    </button>
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  Confirm Password <span className="text-red-500">*</span>
                </span>
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••••"
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800"
                  rightIcon={
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-600 transition-colors">
                      {showConfirm ? <HiOutlineEye className="text-lg" /> : <HiOutlineEyeSlash className="text-lg" />}
                    </button>
                  }
                />
              </div>

              <div className="pt-2">
                <Button className="h-12 px-8 rounded-xl !bg-black dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:opacity-90 transition-opacity">
                  Save
                </Button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
