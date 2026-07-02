"use client";

import * as React from "react";
import {
  HiOutlineCog6Tooth,
  HiOutlineGlobeAlt,
  HiOutlineQrCode,
  HiOutlineCalendarDays,
  HiOutlineEllipsisVertical
} from "react-icons/hi2";
import { SettingsTabs, SettingsTabItem } from "@/components/ui/settings-tabs";
import { Card } from "@/components/ui/card";
import { Dropdown } from "@/components/ui/dropdown";
import { DatePicker } from "@/components/ui/date-picker";
import { PageHeader } from "@/components/ui/page-header";
import { QrCodeModal } from "@/components/ui/modal";
import { useAppSelector } from "@/store/hooks";
import {
  useGetAttendanceSettingsQuery,
  useUpdateAttendanceSettingsMutation
} from "@/store/services/attendanceApi";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "sonner";
import { AttendanceSettingsSkeleton } from "@/components/ui/skeleton/attendance-settings-skeleton";

type TabType = "general" | "location" | "qrcode";

export default function AttendanceSettingsPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = React.useState<TabType>("general");
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = React.useState(false);

  // Location edit states
  const [isEditingLocation, setIsEditingLocation] = React.useState(false);
  const [editOfficeName, setEditOfficeName] = React.useState("");
  const [editOfficeChannels, setEditOfficeChannels] = React.useState("");
  const [editOfficeQrCode, setEditOfficeQrCode] = React.useState("");
  const [editOfficeGeofencing, setEditOfficeGeofencing] = React.useState("");
  const [editOfficeAddress, setEditOfficeAddress] = React.useState("");
  const [editOfficeRadius, setEditOfficeRadius] = React.useState("");
  const [editOfficePolicy, setEditOfficePolicy] = React.useState("");

  // Queries & Mutations
  const { data: settingsData, isLoading, error } = useGetAttendanceSettingsQuery(
    user?.companyId || "",
    { skip: !user?.companyId }
  );

  const [updateSettings] = useUpdateAttendanceSettingsMutation();

  useApiError(!!error, error);

  const settings = settingsData?.attendanceSetting;

  React.useEffect(() => {
    if (settings) {
      setEditOfficeName(settings.officeName || "Unpixel Office");
      setEditOfficeChannels(settings.officeChannels || "Desktop, Mobile");
      setEditOfficeQrCode(settings.officeQrCode || "Yes");
      setEditOfficeGeofencing(settings.officeGeofencing || "Active");
      setEditOfficeAddress(settings.officeAddress || "100 Queen St W, Toronto, ON M5H 2N3, Kanada");
      setEditOfficeRadius(settings.officeRadius || "1 kilometers");
      setEditOfficePolicy(settings.officePolicy || "Not allow clock in/out outside the office");
    }
  }, [settings]);

  const handleUpdateSetting = async (field: string, value: string) => {
    if (!user?.companyId) return;
    try {
      await updateSettings({
        companyId: user.companyId,
        [field]: value
      }).unwrap();
      toast.success("Setting updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to update setting");
    }
  };

  const tabs: SettingsTabItem[] = [
    { id: "general", label: "General", icon: <HiOutlineCog6Tooth className="text-lg" /> },
    { id: "location", label: "Location & Policy", icon: <HiOutlineGlobeAlt className="text-lg" /> },
    { id: "qrcode", label: "QR Code", icon: <HiOutlineQrCode className="text-lg" /> },
  ];

  if (isLoading) {
    return <AttendanceSettingsSkeleton />;
  }

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full">
      {/* Header Section */}
      <PageHeader title="Setting Attendance" description="Setting your Attendance" />

      {/* Main Settings Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Left Side settings nav */}
        <SettingsTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(id) => setActiveTab(id as TabType)}
          variant="emerald"
        />

        {/* Right Side Settings Form Container */}
        <Card className="p-4 md:p-8 border border-gray-200 dark:border-gray-800 md:col-span-3">
          {activeTab === "general" && (
            <div className="flex flex-col gap-6 max-w-2xl">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">General</h2>
              </div>

              {/* Total Hours Calculation */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-900 dark:text-white">
                  Total Hours Calculation <span className="text-red-500">*</span>
                </label>
                <Dropdown
                  label={settings?.totalHoursCalculation || "Every Valid Check-in & Check-out"}
                  options={[
                    "Every Valid Check-in & Check-out",
                    "First Check-in & Last Check-out",
                    "Fixed Working Hours Only"
                  ]}
                  onSelect={(val) => handleUpdateSetting("totalHoursCalculation", val)}
                  className="w-full select-dropdown-full"
                />
              </div>

              {/* Attendance Start Date */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-900 dark:text-white">
                  Attendance Start Date <span className="text-red-500">*</span>
                </label>
                <div className="relative w-full">
                  <button
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span>{settings?.startDate || "11 Feb 2023"}</span>
                    <HiOutlineCalendarDays className="text-gray-400 text-lg ml-auto" />
                  </button>
                  <DatePicker
                    isOpen={isDatePickerOpen}
                    onClose={() => setIsDatePickerOpen(false)}
                    onSave={(date) => {
                      const formatted = date.split(" - ")[0] || date;
                      handleUpdateSetting("startDate", formatted);
                    }}
                  />
                </div>
              </div>

              {/* Attendance Approval Cycle */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-900 dark:text-white">
                  Attendance Approval Cycle <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Dropdown
                    label={settings?.approvalCycleValue || "1"}
                    options={["1", "2", "3", "4", "5", "10", "15", "20", "25", "28", "30"]}
                    onSelect={(val) => handleUpdateSetting("approvalCycleValue", val)}
                    className="w-full"
                  />
                  <Dropdown
                    label={settings?.approvalCyclePeriod || "Monthly"}
                    options={["Monthly", "Weekly", "Bi-weekly"]}
                    onSelect={(val) => handleUpdateSetting("approvalCyclePeriod", val)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Repeat On */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-900 dark:text-white">
                  Repeat On <span className="text-red-500">*</span>
                </label>
                <Dropdown
                  label={settings?.repeatOn || "Monthly on Day 11"}
                  options={[
                    "Monthly on Day 1",
                    "Monthly on Day 11",
                    "Monthly on Day 15",
                    "Monthly on Last Day"
                  ]}
                  onSelect={(val) => handleUpdateSetting("repeatOn", val)}
                  className="w-full"
                />
              </div>

              {/* Location */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-900 dark:text-white">
                  Location <span className="text-red-500">*</span>
                </label>
                <Dropdown
                  label={settings?.location || "All Offices"}
                  options={["All Offices", "Semarang Office", "Remote"]}
                  onSelect={(val) => handleUpdateSetting("location", val)}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {activeTab === "location" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Location & Policy</h2>
              </div>

              {/* Location Detail Card */}
              <Card className="border border-gray-200 dark:border-gray-800 p-0 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {isEditingLocation ? "Edit Location & Policy" : (settings?.officeName || "Unpixel Office")}
                  </h3>
                  {!isEditingLocation && (
                    <button
                      onClick={() => setIsEditingLocation(true)}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline transition-all"
                    >
                      Edit Settings
                    </button>
                  )}
                </div>

                {/* Details list */}
                <div className="flex flex-col">
                  {/* Office Name Row (only shown when editing) */}
                  {isEditingLocation && (
                    <div className="grid grid-cols-3 py-4 px-6 border-b border-gray-100 dark:border-gray-800/40 items-center">
                      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Office Name</span>
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={editOfficeName}
                          onChange={(e) => setEditOfficeName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* Row 1 */}
                  <div className="grid grid-cols-3 py-4 px-6 border-b border-gray-100 dark:border-gray-800/40 items-center">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Clocking in/out from</span>
                    {isEditingLocation ? (
                      <div className="col-span-2">
                        <Dropdown
                          label={editOfficeChannels}
                          options={["Desktop, Mobile", "Desktop Only", "Mobile Only"]}
                          onSelect={setEditOfficeChannels}
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <span className="col-span-2 text-xs font-bold text-gray-900 dark:text-white">{settings?.officeChannels || "Desktop, Mobile"}</span>
                    )}
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-3 py-4 px-6 border-b border-gray-100 dark:border-gray-800/40 items-center">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">QR Code</span>
                    {isEditingLocation ? (
                      <div className="col-span-2">
                        <Dropdown
                          label={editOfficeQrCode}
                          options={["Yes", "No"]}
                          onSelect={setEditOfficeQrCode}
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <span className="col-span-2 text-xs font-bold text-gray-900 dark:text-white">{settings?.officeQrCode || "Yes"}</span>
                    )}
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-3 py-4 px-6 border-b border-gray-100 dark:border-gray-800/40 items-center">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Geofencing</span>
                    {isEditingLocation ? (
                      <div className="col-span-2">
                        <Dropdown
                          label={editOfficeGeofencing}
                          options={["Active", "Inactive"]}
                          onSelect={setEditOfficeGeofencing}
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <span className="col-span-2 text-xs font-bold text-gray-900 dark:text-white">{settings?.officeGeofencing || "Active"}</span>
                    )}
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-3 py-4 px-6 border-b border-gray-100 dark:border-gray-800/40 items-center">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Accurate Address</span>
                    {isEditingLocation ? (
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={editOfficeAddress}
                          onChange={(e) => setEditOfficeAddress(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                      </div>
                    ) : (
                      <span className="col-span-2 text-xs font-bold text-gray-900 dark:text-white leading-normal">
                        {settings?.officeAddress || "100 Queen St W, Toronto, ON M5H 2N3, Kanada"}
                      </span>
                    )}
                  </div>

                  {/* Row 5 */}
                  <div className="grid grid-cols-3 py-4 px-6 border-b border-gray-100 dark:border-gray-800/40 items-center">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Radius</span>
                    {isEditingLocation ? (
                      <div className="col-span-2">
                        <Dropdown
                          label={editOfficeRadius}
                          options={["100 meters", "500 meters", "1 kilometers", "5 kilometers", "10 kilometers"]}
                          onSelect={setEditOfficeRadius}
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <span className="col-span-2 text-xs font-bold text-gray-900 dark:text-white">{settings?.officeRadius || "1 kilometers"}</span>
                    )}
                  </div>

                  {/* Row 6 */}
                  <div className="grid grid-cols-3 py-4 px-6 items-center">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Policy</span>
                    {isEditingLocation ? (
                      <div className="col-span-2">
                        <Dropdown
                          label={editOfficePolicy}
                          options={["Not allow clock in/out outside the office", "Allow clock in/out outside the office"]}
                          onSelect={setEditOfficePolicy}
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <span className="col-span-2 text-xs font-bold text-gray-900 dark:text-white leading-normal">
                        {settings?.officePolicy || "Not allow clock in/out outside the office"}
                      </span>
                    )}
                  </div>
                </div>

                {isEditingLocation && (
                  <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/10 border-t border-gray-100 dark:border-gray-800/40">
                    <button
                      type="button"
                      onClick={() => setIsEditingLocation(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!user?.companyId) return;
                        try {
                          await updateSettings({
                            companyId: user.companyId,
                            officeName: editOfficeName,
                            officeChannels: editOfficeChannels,
                            officeQrCode: editOfficeQrCode,
                            officeGeofencing: editOfficeGeofencing,
                            officeAddress: editOfficeAddress,
                            officeRadius: editOfficeRadius,
                            officePolicy: editOfficePolicy,
                          }).unwrap();
                          setIsEditingLocation(false);
                          toast.success("Location & policy updated successfully");
                        } catch (err: any) {
                          toast.error(err?.data?.error || "Failed to update location & policy");
                        }
                      }}
                      className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </Card>
            </div>
          )}

          {activeTab === "qrcode" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">QR Code</h2>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 leading-relaxed max-w-2xl">
                  Generate a QR code to let everyone clock in / out easily by scanning with the GroveHR app.
                  Start displaying QR Code.
                </p>
              </div>

              {/* Form fields */}
              <div className="flex flex-col gap-6 max-w-2xl">
                {/* Auto generate timer */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-900 dark:text-white">
                    Auto generate new QR code every <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Dropdown
                      label={settings?.qrAutoGenerateValue || "5"}
                      options={["5", "10", "15", "30", "60"]}
                      onSelect={(val) => handleUpdateSetting("qrAutoGenerateValue", val)}
                      className="w-full"
                    />
                    <Dropdown
                      label={settings?.qrAutoGeneratePeriod || "Second"}
                      options={["Second", "Minute"]}
                      onSelect={(val) => handleUpdateSetting("qrAutoGeneratePeriod", val)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Security Type */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-900 dark:text-white">
                    Security Type <span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    label={settings?.qrSecurityType || "Public URL for Everyone"}
                    options={[
                      "Public URL for Everyone",
                      "Restricted IP Only",
                      "Private QR Code"
                    ]}
                    onSelect={(val) => handleUpdateSetting("qrSecurityType", val)}
                    className="w-full"
                  />
                </div>

                {/* Generate Button at bottom right */}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setIsQrModalOpen(true)}
                    className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors"
                  >
                    Generate QR Code
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        companyId={user?.companyId || ""}
        qrAutoGenerateValue={settings?.qrAutoGenerateValue}
        qrAutoGeneratePeriod={settings?.qrAutoGeneratePeriod}
      />
    </div>
  );
}
