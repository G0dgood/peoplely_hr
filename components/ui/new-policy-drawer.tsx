"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewPolicyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  types: string[];
  onAdd?: (policy: {
    policyName: string;
    type: string;
    description: string;
    eligibility: string;
  }) => void;
}

export function NewPolicyDrawer({ isOpen, onClose, types, onAdd }: NewPolicyDrawerProps) {
  const [policyName, setPolicyName] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [assignDate, setAssignDate] = React.useState("Upon join date");
  const [frequency, setFrequency] = React.useState("Yearly");
  const [entitlement, setEntitlement] = React.useState("3 (Days per year)");
  const [maxCarryOver, setMaxCarryOver] = React.useState("3 (Days per year)");
  const [expirationMonth, setExpirationMonth] = React.useState("Dec");
  const [expirationDay, setExpirationDay] = React.useState("31");
  const [isHourly, setIsHourly] = React.useState(true);

  React.useEffect(() => {
    if (types.length > 0 && !selectedType) {
      setSelectedType(types[0]);
    }
  }, [types, selectedType]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyName.trim() || !selectedType) return;
    onAdd?.({
      policyName,
      type: selectedType,
      description: description || "-",
      eligibility: `Full-time Employees only. Entitlement: ${entitlement}. Expiration: ${expirationMonth} ${expirationDay}`
    });
    setPolicyName("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <form 
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 h-full border-l border-gray-100 dark:border-gray-800 flex flex-col"
      >
        <div className="p-8 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
            Create Policy
          </h2>

          <div className="flex flex-col gap-6">
            {/* Name and Type Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Policy Name <span className="text-red-500">*</span>
                </label>
                <Input 
                  value={policyName}
                  onChange={(e) => setPolicyName(e.target.value)}
                  placeholder="Annual" 
                  className="h-12 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-xs font-semibold"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary"
                  required
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Description <span className="text-red-500">*</span>
              </label>
              <Input 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Input description about policy" 
                className="h-12 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-xs font-semibold"
                required
              />
            </div>

            {/* Accrual Section */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-50 dark:border-gray-800 pb-2">
                Accrual
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Assign Date <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={assignDate}
                    onChange={(e) => setAssignDate(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary"
                  >
                    <option value="Upon join date">Upon join date</option>
                    <option value="Start of calendar year">Start of calendar year</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Accrual Frequency <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary"
                    >
                      <option value="Yearly">Yearly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Weekly">Weekly</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Entitlement <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={entitlement}
                      onChange={(e) => setEntitlement(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary"
                    >
                      <option value="3 (Days per year)">3 (Days per year)</option>
                      <option value="10 (Days per year)">10 (Days per year)</option>
                      <option value="15 (Days per year)">15 (Days per year)</option>
                      <option value="20 (Days per year)">20 (Days per year)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Carry Over Section */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-50 dark:border-gray-800 pb-2">
                Carry Over
              </h3>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Maximum Carry Over <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={maxCarryOver}
                      onChange={(e) => setMaxCarryOver(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary"
                    >
                      <option value="3 (Days per year)">3 (Days per year)</option>
                      <option value="5 (Days per year)">5 (Days per year)</option>
                      <option value="None">None</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Carry Over Expiration <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={expirationMonth}
                        onChange={(e) => setExpirationMonth(e.target.value)}
                        className="w-full h-12 px-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary"
                      >
                        <option value="Dec">Dec</option>
                        <option value="Jan">Jan</option>
                        <option value="Jun">Jun</option>
                      </select>
                      <select
                        value={expirationDay}
                        onChange={(e) => setExpirationDay(e.target.value)}
                        className="w-full h-12 px-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary"
                      >
                        <option value="31">31</option>
                        <option value="15">15</option>
                        <option value="1">1</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Duration Allowed Section */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-50 dark:border-gray-800 pb-2">
                Duration Allowed
              </h3>
              <button
                type="button"
                onClick={() => setIsHourly(!isHourly)}
                className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                  isHourly 
                    ? "border-primary bg-white dark:bg-gray-900" 
                    : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                }`}
              >
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-1">Hourly</h4>
                  <p className="text-[10px] text-gray-400 leading-normal">
                    Employee can book time off by hours which will be calculated to days based on standard working hours. Ex: Standard working hours = 8 hours/day, 3 hours off = 0.375 days
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all mt-1 ${
                  isHourly 
                    ? "border-primary animate-scaleIn" 
                    : "border-gray-200 dark:border-gray-800"
                }`}>
                  {isHourly && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
          <button
            type="button"
            className="text-xs font-bold text-primary hover:underline"
            onClick={() => {
              handleSubmit({ preventDefault: () => {} } as React.FormEvent);
            }}
          >
            Save & Assign Employee
          </button>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="font-bold h-12 px-6"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="font-bold h-12 px-6 bg-[#11131A] dark:bg-white dark:text-gray-900">
              Create
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
