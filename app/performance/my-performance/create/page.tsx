"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineChevronRight,
  HiOutlineCalendar,
  HiOutlinePlus,
  HiOutlineChevronDown,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import { useCreatePerformanceEvaluationMutation } from "@/store/services/performanceApi";
import { SVGLoaderFetch } from "@/components/ui/options";
import { toast } from "sonner";

export default function CreatePerformancePage() {
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  // Fetch employees to select manager
  const { data: empData, isLoading } = useGetEmployeesQuery(
    { companyId, limit: 1000 },
    { skip: !companyId }
  );

  const [createEvaluation] = useCreatePerformanceEvaluationMutation();

  const employees = empData?.employees || [];

  // States
  const [selectedManager, setSelectedManager] = React.useState("");
  const [evaluationDate, setEvaluationDate] = React.useState("");
  const [selectedQuarter, setSelectedQuarter] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // KPIs
  const [kpis, setKpis] = React.useState([
    { name: "CRM Satisfaction", rating: 0 },
    { name: "ERM Satisfaction", rating: 0 },
    { name: "Increase Headcount", rating: 0 },
    { name: "Recruitment Effort", rating: 0 },
    { name: "Payroll Accuracy", rating: 0 },
    { name: "TAT for response & Resolution", rating: 0 },
    { name: "Offer Letter and Onboarding", rating: 0 },
    { name: "Salary Payment", rating: 0 },
    { name: "Statutory Remittances", rating: 0 },
    { name: "Weekly Reporting", rating: 0 },
    { name: "Talent Retention Rate", rating: 0 },
  ]);

  const [newKpiName, setNewKpiName] = React.useState("");
  const [newKpiRating, setNewKpiRating] = React.useState(0);

  // Dropdown list of managers (role: MANAGER or ADMIN, or let user pick anyone)
  const managerOptions = React.useMemo(() => {
    return employees.map((emp) => emp.name);
  }, [employees]);

  // Handle rating changes
  const handleRatingChange = (index: number, rating: number) => {
    const updated = [...kpis];
    updated[index].rating = rating;
    setKpis(updated);
  };

  // Add custom KPI
  const handleAddKpi = () => {
    if (!newKpiName.trim()) {
      toast.error("Please enter a name for the performance indicator.");
      return;
    }
    setKpis([...kpis, { name: newKpiName.trim(), rating: newKpiRating }]);
    setNewKpiName("");
    setNewKpiRating(0);
    toast.success("KPI indicator added successfully!");
  };

  // Calculations
  const ratedKpis = kpis.filter(k => k.rating > 0);
  const averageRating = ratedKpis.length > 0
    ? (ratedKpis.reduce((acc, curr) => acc + curr.rating, 0) / ratedKpis.length).toFixed(1)
    : "0.0";

  const ratingText = React.useMemo(() => {
    const avg = parseFloat(averageRating);
    if (avg >= 4.5) return "Outstanding";
    if (avg >= 3.5) return "Exceed Expectation";
    if (avg >= 2.5) return "Meet Expectation";
    if (avg >= 1.5) return "Below Expectation";
    if (avg > 0) return "Unsatisfactory";
    return "No score yet";
  }, [averageRating]);

  // Submit evaluation
  const handleSubmit = async () => {
    if (!selectedManager || selectedManager === "Select your manager") {
      toast.error("Please select a manager.");
      return;
    }
    if (!selectedQuarter || selectedQuarter === "Select Quarter") {
      toast.error("Please select a quarter.");
      return;
    }
    if (ratedKpis.length === 0) {
      toast.error("Please score at least one KPI indicator.");
      return;
    }

    const myEmployeeRecord = employees.find((emp) => emp.email === currentUser?.email);

    setIsSubmitting(true);
    try {
      const avg = Math.round(parseFloat(averageRating));
      await createEvaluation({
        employeeId: myEmployeeRecord?.id || currentUser?.id || "unknown",
        employeeName: currentUser?.name || "Employee",
        employeeEmail: currentUser?.email || "",
        reviewerName: selectedManager,
        reviewPeriod: selectedQuarter,
        workQuality: avg,
        communication: avg,
        teamwork: avg,
        punctuality: avg,
        strengths: comment || "Self evaluation submitted.",
        growth: JSON.stringify(kpis), // Serialize full KPIs list here
        status: "SUBMITTED",
        companyId,
      }).unwrap();

      toast.success("Performance evaluation submitted successfully!");
      router.push("/performance/my-performance");
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to submit performance evaluation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <SVGLoaderFetch text="Loading evaluation form..." asTable={false} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-10 min-h-full bg-[#FAFCFF] dark:bg-gray-950 font-sans">

      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Performance Evaluation
          </h1>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-550 mt-2.5">
            <Link href="/help-center" className="hover:text-primary transition-colors">
              Help Center
            </Link>
            <HiOutlineChevronRight className="text-[10px]" />
            <Link href="/performance/my-performance" className="hover:text-primary transition-colors">
              Performance Evaluation
            </Link>
            <HiOutlineChevronRight className="text-[10px]" />
            <span className="text-gray-900 dark:text-white">Create</span>
          </div>
        </div>
      </div>

      {/* Top Manager / Date / Quarter Box */}
      <Card className="p-6 border border-[#E2E8F0] dark:border-gray-800 bg-white dark:bg-gray-900  rounded-xl">
        <div className="flex flex-col gap-4 max-w-xl">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Manager</label>
            <Dropdown
              label={selectedManager || "Select your manager"}
              options={managerOptions}
              onSelect={setSelectedManager}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={evaluationDate}
                  onChange={(e) => setEvaluationDate(e.target.value)}
                  className="w-full h-11 px-4 pr-10 rounded-xl border border-[#E2E8F0] dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:border-primary"
                />
                <HiOutlineCalendar className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Quarter</label>
              <Dropdown
                label={selectedQuarter || "Select Quarter"}
                options={["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026", "Mid-Year 2026", "Annual 2026"]}
                onSelect={setSelectedQuarter}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Side: KPIs List */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="p-6 border border-[#E2E8F0] dark:border-gray-800 bg-white dark:bg-gray-900  rounded-xl flex flex-col gap-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
              Key Performance Indicators (KPIs)
            </h3>

            <div className="flex flex-col gap-4">
              {kpis.map((kpi, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 border-b border-[#F1F5F9] dark:border-gray-800 pb-3 last:border-none last:pb-0">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-300">
                    {kpi.name}
                  </span>

                  {/* Rating Dropdown */}
                  <Dropdown
                    label={kpi.rating === 0 ? "Select rating" : `${kpi.rating} ★`}
                    options={["1", "2", "3", "4", "5"]}
                    onSelect={(val) => handleRatingChange(idx, parseInt(val))}
                    align="right"
                  />
                </div>
              ))}

              {/* Add Custom Indicator Row */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#F1F5F9] dark:border-gray-800">
                <Input
                  placeholder="Add Performance Indicator"
                  value={newKpiName}
                  onChange={(e) => setNewKpiName(e.target.value)}
                  containerClassName="flex-1"
                  className="h-10 text-xs"
                />
                <Dropdown
                  label={newKpiRating === 0 ? "Select rating" : `${newKpiRating} ★`}
                  options={["1", "2", "3", "4", "5"]}
                  onSelect={(val) => setNewKpiRating(parseInt(val))}
                />
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleAddKpi}
                  className="h-10"
                >
                  Add More KPI
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side: Guide, Summary, Comment */}
        <div className="flex flex-col gap-6">

          {/* Rating Guide */}
          <Card className="p-6 border border-[#E2E8F0] dark:border-gray-800 bg-white dark:bg-gray-900  rounded-xl">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Rating Guide
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-semibold text-gray-500 border-collapse">
                <tbody>
                  <tr className="border-b border-[#F1F5F9] dark:border-gray-850 h-9">
                    <td className="py-2 pr-4 font-bold text-gray-900 dark:text-white">5</td>
                    <td className="py-2">Outstanding</td>
                    <td className="py-2 text-right"></td>
                  </tr>
                  <tr className="border-b border-[#F1F5F9] dark:border-gray-855 h-9">
                    <td className="py-2 pr-4 font-bold text-gray-900 dark:text-white">4</td>
                    <td className="py-2">Exceed Expectation</td>
                    <td className="py-2 text-right">&gt;85%</td>
                  </tr>
                  <tr className="border-b border-[#F1F5F9] dark:border-gray-855 h-9">
                    <td className="py-2 pr-4 font-bold text-gray-900 dark:text-white">3</td>
                    <td className="py-2">Meet Expectation</td>
                    <td className="py-2 text-right">80% and &gt;80%</td>
                  </tr>
                  <tr className="border-b border-[#F1F5F9] dark:border-gray-855 h-9">
                    <td className="py-2 pr-4 font-bold text-gray-900 dark:text-white">2</td>
                    <td className="py-2">Below Expectation</td>
                    <td className="py-2 text-right">&lt;80%</td>
                  </tr>
                  <tr className="h-9">
                    <td className="py-2 pr-4 font-bold text-gray-900 dark:text-white">1</td>
                    <td className="py-2">Unsatisfactory</td>
                    <td className="py-2 text-right"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* KPI Summary */}
          <Card className="p-6 border border-[#E2E8F0] dark:border-gray-800 bg-white dark:bg-gray-900  rounded-xl flex flex-col gap-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1">
              KPI Summary
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
                {averageRating}
              </span>
              <span className="text-xs font-bold text-gray-400">/ 5.0</span>
            </div>
            <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
              Standing: <span className="text-blue-600 dark:text-blue-450">{ratingText}</span>
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-550 mt-1">
              Based on {ratedKpis.length} rated indicator(s)
            </p>
          </Card>

          {/* Comment */}
          <Card className="p-6 border border-[#E2E8F0] dark:border-gray-800 bg-white dark:bg-gray-900  rounded-xl flex flex-col gap-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1">
              Comment
            </h3>
            <textarea
              rows={5}
              placeholder="Add Comment here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="p-3 border border-[#E2E8F0] dark:border-gray-800 bg-transparent text-xs font-semibold rounded-xl focus:outline-none focus:border-primary resize-none leading-relaxed text-gray-800 dark:text-gray-100"
            />
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end mt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-1.5 justify-center">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block shrink-0"></span>
                  <span>Submitting...</span>
                </span>
              ) : (
                "Submit Evaluation"
              )}
            </Button>
          </div>

        </div>

      </div>

    </div>
  );
}
