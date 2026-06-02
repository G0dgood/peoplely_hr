"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { HiCheck } from "react-icons/hi2";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useGetCompanyQuery, useUpdateCompanyMutation } from "@/store/services/companyApi";
import { SVGLoaderFetch, SVGLoader } from "@/components/ui/options";

export default function CompanyInfoPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const { data, isLoading, error } = useGetCompanyQuery(companyId, {
    skip: !companyId,
  });

  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();

  const [name, setName] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("+62");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [overview, setOverview] = React.useState("");

  // Initialize form state when data is loaded
  React.useEffect(() => {
    if (data?.company) {
      setName(data.company.name || "");
      setWebsite(data.company.website || "");
      setEmail(data.company.email || "");
      setOverview(data.company.overview || "");

      const fullPhone = data.company.phone || "";
      let matchedCode = "+234";
      let phoneNum = fullPhone;

      const prefixes = ["+1", "+44", "+234", "+91"];
      for (const prefix of prefixes) {
        if (fullPhone.startsWith(prefix)) {
          matchedCode = prefix;
          phoneNum = fullPhone.substring(prefix.length).trim();
          break;
        }
      }
      setCountryCode(matchedCode);
      setPhone(phoneNum);
    }
  }, [data]);

  // Display error toast if company fetch fails
  React.useEffect(() => {
    if (error) {
      toast.error("Failed to load company details");
    }
  }, [error]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId) {
      toast.error("Company ID not found. Please log in again.");
      return;
    }

    if (!name.trim()) {
      toast.error("Company Name is required");
      return;
    }

    try {
      const fullPhone = phone.trim() ? `${countryCode} ${phone.trim()}` : "";
      await updateCompany({
        id: companyId,
        body: {
          name: name.trim(),
          website: website.trim(),
          phone: fullPhone,
          email: email.trim(),
          overview: overview.trim(),
        },
      }).unwrap();
      toast.success("Company info updated successfully!");
    } catch (err: any) {
      const errMsg = err?.data?.error || "Failed to update company info";
      toast.error(errMsg);
    }
  };

  if (!companyId) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-gray-500">Please log in to manage your company information.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <SVGLoaderFetch text="Loading company info..." asTable={false} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-300 dark:border-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Company Info
        </h2>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="p-4 md:p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Company Website"
            required
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            rightIcon={<HiCheck className="text-gray-900 dark:text-white text-lg" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-body-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
              Contact Number
              <span className="text-error">*</span>
            </label>
            <div className="flex gap-3">
              <Dropdown
                label={countryCode}
                options={["+1", "+44", "+62", "+91"]}
                onSelect={(val) => setCountryCode(val)}
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 h-12 rounded-xl text-body-md bg-white border border-gray-300 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors dark:bg-gray-800 dark:text-white placeholder:text-gray-400 pl-4"
              />
            </div>
          </div>
          <Input
            label="Contact Email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-body-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
            Company Overview
          </label>
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            rows={5}
            className="w-full rounded-xl text-body-md bg-white border border-gray-300 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors dark:bg-gray-800 dark:text-white placeholder:text-gray-400 p-4 resize-none leading-relaxed"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isUpdating}
            className="h-12 px-8 bg-[#11131A] dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isUpdating ? (
              <>
                <SVGLoader width={16} height={16} color="currentColor" />
                <span>Saving...</span>
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
