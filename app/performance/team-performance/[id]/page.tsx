"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  HiOutlineChevronRight,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineXMark,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useGetEmployeeQuery } from "@/store/services/employeesApi";
import {
  useGetPerformanceEvaluationsQuery,
  useCreatePerformanceEvaluationMutation,
} from "@/store/services/performanceApi";
import { SVGLoaderFetch } from "@/components/ui/options";
import { BackButton } from "@/components/ui/back-button";
import { EmployeePerformanceDetailSkeleton } from "@/components/ui/skeleton/employee-performance-detail-skeleton";
import { toast } from "sonner";

export default function EmployeePerformanceDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  // Queries
  const { data: employeeData, isLoading: isLoadingEmp } = useGetEmployeeQuery(
    { id, companyId },
    { skip: !id }
  );
  const employee = employeeData?.employee;

  const { data: employeeReviewsData, isLoading: isLoadingReviews } = useGetPerformanceEvaluationsQuery(
    { companyId, employeeEmail: employee?.email },
    { skip: !employee?.email }
  );
  const previousEvaluations = employeeReviewsData?.evaluations || [];

  const [createEvaluation] = useCreatePerformanceEvaluationMutation();

  // Form states for manager rating view
  const [kpiRows, setKpiRows] = React.useState([
    { name: "CRM Satisfaction", weight: 10, employeeRating: 4, managerRating: 5 },
    { name: "ERM Satisfaction", weight: 10, employeeRating: 3, managerRating: 4 },
    { name: "Increase Headcount", weight: 10, employeeRating: 3, managerRating: 4 },
    { name: "Recruitment Effort", weight: 10, employeeRating: 3, managerRating: 4 },
    { name: "Payroll Accuracy", weight: 10, employeeRating: 3, managerRating: 4 },
    { name: "TAT for response & Resolution", weight: 10, employeeRating: 3, managerRating: 4 },
    { name: "Offer Letter and Onboarding", weight: 10, employeeRating: 3, managerRating: 4 },
    { name: "Salary Payment", weight: 10, employeeRating: 3, managerRating: 4 },
    { name: "Statutory Remittances", weight: 10, employeeRating: 3, managerRating: 3 },
    { name: "Weekly Reporting", weight: 5, employeeRating: 3, managerRating: 3 },
    { name: "Talent Retention Rate", weight: 5, employeeRating: 3, managerRating: 4 },
  ]);

  const [managerComment, setManagerComment] = React.useState("");
  const [employeeComment] = React.useState("I need more training");
  const [evaluationPeriod] = React.useState("Q1 (Jan - Mar 2025)");
  const [evaluationDate] = React.useState("13/03/2025");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Accordion and modal state
  const [isHistoryExpanded, setIsHistoryExpanded] = React.useState(true);
  const [historyDetailReview, setHistoryDetailReview] = React.useState<any>(null);

  // Fallback mock evaluations matching the mockup layout and values
  const displayPreviousEvaluations = React.useMemo(() => {
    if (previousEvaluations && previousEvaluations.length > 0) {
      return previousEvaluations;
    }
    const firstName = employee?.name?.split(" ")[0] || "Sarah";
    return [
      {
        id: "mock-1",
        reviewPeriod: "Q4 (Oct - Dec 2024)",
        workQuality: 4,
        communication: 4,
        teamwork: 3,
        punctuality: 4,
        strengths: `${firstName} continues to demonstrate excellent communication skills and creative problem-solving abilities. Her initiative in proposing new marketing approaches has been particularly valuable. While she works well with the team, I would like to see her take on more leadership opportunities in collaborative projects.`,
        status: "APPROVED"
      },
      {
        id: "mock-2",
        reviewPeriod: "Q3 (Jul - Sept 2023)",
        workQuality: 4,
        communication: 3,
        teamwork: 4,
        punctuality: 4,
        strengths: `${firstName} continues to demonstrate excellent communication skills and creative problem-solving abilities. Her initiative in proposing new marketing approaches has been particularly valuable. While she works well with the team, I would like to see her take on more leadership opportunities in collaborative projects.`,
        status: "APPROVED"
      }
    ];
  }, [previousEvaluations, employee]);

  // Detailed view calculations
  const totalScore = React.useMemo(() => {
    const sum = kpiRows.reduce((acc, row) => {
      return acc + (row.managerRating * (row.weight / 100));
    }, 0);
    return parseFloat(sum.toFixed(2));
  }, [kpiRows]);

  const ratingStanding = React.useMemo(() => {
    if (totalScore >= 4.5) return "Outstanding";
    if (totalScore >= 3.5) return "Exceeds Expectations";
    if (totalScore >= 2.5) return "Meets Expectations";
    if (totalScore >= 1.5) return "Below Expectations";
    if (totalScore > 0) return "Unsatisfactory";
    return "No Rating";
  }, [totalScore]);

  // Handlers
  const handleWeightChange = (index: number, val: string) => {
    const updated = [...kpiRows];
    updated[index].weight = parseFloat(val.replace("%", ""));
    setKpiRows(updated);
  };

  const handleManagerRatingChange = (index: number, val: string) => {
    const updated = [...kpiRows];
    updated[index].managerRating = parseInt(val);
    setKpiRows(updated);
  };

  const handleSubmitEvaluation = async () => {
    if (!employee) return;

    setIsSubmitting(true);
    try {
      const avg = Math.round(totalScore);
      await createEvaluation({
        employeeId: employee.id,
        employeeName: employee.name,
        employeeEmail: employee.email,
        reviewerName: currentUser?.name || "Manager",
        reviewPeriod: evaluationPeriod,
        workQuality: avg,
        communication: avg,
        teamwork: avg,
        punctuality: avg,
        strengths: managerComment || "Good performance overall.",
        growth: JSON.stringify(kpiRows), // Serialize custom weight/score details
        status: "APPROVED",
        companyId,
      }).unwrap();

      toast.success("Performance evaluation submitted successfully!");
      router.push("/performance/team-performance");
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to submit performance evaluation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingEmp || isLoadingReviews) {
    return <EmployeePerformanceDetailSkeleton />;
  }

  if (!employee) {
    return (
      <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Performance Evaluation
            </h1>
          </div>
          <BackButton href="/performance/team-performance" label="Back to Team List" />
        </div>
        <Card className="p-8 text-center text-gray-500 dark:text-gray-400 font-semibold">
          Employee not found.
        </Card>
      </div>
    );
  }

  const empIdFake = employee.id ? `EMP-${employee.id.slice(0, 5).toUpperCase()}` : "EMP-XXXXX";

  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950 font-sans">

      {/* Back and Title */}
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
            <Link href="/performance/team-performance" className="hover:text-primary transition-colors">
              Team Performance
            </Link>
            <HiOutlineChevronRight className="text-[10px]" />
            <span className="text-gray-900 dark:text-white">{employee.name}</span>
          </div>
        </div>
        <BackButton href="/performance/team-performance" label="Back to Team List" />
      </div>

      {/* Profile Details & Score Card */}
      <Card className="overflow-hidden ">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
          {/* Left side: Metadata */}
          <div className="md:col-span-2 p-8 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-y-5 gap-x-8 text-xs font-semibold">
              <div className="flex flex-col gap-1.5">
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Employee Name</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{employee.name}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Role</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{employee.role}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Employee ID:</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{empIdFake}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Department</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{employee.department}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Evaluation Date</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{evaluationDate}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Evaluation Period</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{evaluationPeriod}</span>
              </div>
            </div>
          </div>

          {/* Right side: Overall Performance score */}
          <div className="p-8 flex flex-col items-center justify-center text-center gap-3">
            <span className="text-xs font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider">
              Overall Performance
            </span>
            <span className="text-5xl font-black text-blue-650 dark:text-blue-400">
              {totalScore}
            </span>
            <span className="text-xs font-extrabold text-gray-900 dark:text-white">
              {ratingStanding}
            </span>
          </div>
        </div>
      </Card>

      {/* Performance Metrics Stack */}
      <div className="flex flex-col gap-3">
        <div className="px-1">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
            Performance Metrics
          </h3>
          <p className="text-[10px] font-semibold text-gray-450 dark:text-gray-500 mb-2">
            Rate the employee on the following key performance indicators (scale 1-5)
          </p>
        </div>

        {/* Table Header Row */}
        <div className="grid grid-cols-12 gap-4 px-6 py-2 text-[10px] font-bold text-gray-405 dark:text-gray-500 uppercase tracking-wider items-center">
          <div className="col-span-5">Key Performance Indicator</div>
          <div className="col-span-2 text-center">Weight (%)</div>
          <div className="col-span-2 text-center">Employee Rating (1-5)</div>
          <div className="col-span-2 text-center">Manager Rating (1-5)</div>
          <div className="col-span-1 text-right">Score</div>
        </div>

        {/* KPI Card List */}
        <div className="flex flex-col gap-2.5">
          {kpiRows.map((row, idx) => {
            const score = parseFloat((row.managerRating * (row.weight / 100)).toFixed(2));
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 grid grid-cols-12 gap-4 items-center  hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                {/* KPI Name */}
                <div className="col-span-5">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-350">
                    {row.name}
                  </span>
                </div>

                {/* Weight Dropdown */}
                <div className="col-span-2 flex justify-center">
                  <Dropdown
                    label={`${row.weight}%`}
                    options={["5%", "9.09%", "10%", "15%", "20%"]}
                    onSelect={(val) => handleWeightChange(idx, val)}
                    className="w-24 h-9"
                  />
                </div>

                {/* Employee Rating - Read-only display box */}
                <div className="col-span-2 flex justify-center">
                  <div className="h-9 w-24 border border-gray-200 dark:border-gray-800 bg-gray-55/50 dark:bg-gray-800/30 rounded-xl text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center justify-center">
                    {row.employeeRating}
                  </div>
                </div>

                {/* Manager Rating Dropdown */}
                <div className="col-span-2 flex justify-center">
                  <Dropdown
                    label={`${row.managerRating}`}
                    options={["1", "2", "3", "4", "5"]}
                    onSelect={(val) => handleManagerRatingChange(idx, val)}
                    className="w-24 h-9"
                  />
                </div>

                {/* Score */}
                <div className="col-span-1 text-right">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    {score.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Total Row */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 grid grid-cols-12 gap-4 items-center  mt-1">
            <div className="col-span-11 text-right text-xs font-extrabold text-gray-455 uppercase tracking-wider pr-4">
              Total
            </div>
            <div className="col-span-1 text-right text-sm font-black text-blue-650 dark:text-blue-400">
              {totalScore}
            </div>
          </div>
        </div>
      </div>

      {/* Comments section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col gap-2">
          <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1">
            Employee's Comment
          </h3>
          <textarea
            rows={4}
            value={employeeComment}
            readOnly={true}
            className="p-3.5 border border-gray-200 dark:border-gray-800 bg-gray-55/20 dark:bg-gray-950/20 text-xs font-semibold rounded-xl focus:outline-none leading-relaxed text-gray-500 dark:text-gray-400 resize-none"
          />
        </Card>

        <Card className="p-6 flex flex-col gap-2">
          <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1">
            Manager's Comment
          </h3>
          <textarea
            rows={4}
            placeholder="Add Comment here"
            value={managerComment}
            onChange={(e) => setManagerComment(e.target.value)}
            className="p-3.5 border border-gray-200 dark:border-gray-800 bg-transparent text-xs font-semibold rounded-xl focus:outline-none focus:border-primary resize-none leading-relaxed text-gray-800 dark:text-gray-100"
          />
        </Card>
      </div>

      {/* Actions Button */}
      <div className="flex justify-end gap-4 mt-2">
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push("/performance/team-performance")}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleSubmitEvaluation}
          disabled={isSubmitting}
          className="px-8 bg-blue-650 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
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

      {/* Previous Evaluations expandable section */}
      <Card className="overflow-hidden mt-4">
        <button
          onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
          className="w-full p-5 flex items-center justify-between text-xs font-bold text-gray-900 dark:text-white cursor-pointer bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800/80"
        >
          <span>Previous Evaluation</span>
          {isHistoryExpanded ? <HiOutlineChevronUp className="text-base text-gray-450" /> : <HiOutlineChevronDown className="text-base text-gray-455" />}
        </button>

        {isHistoryExpanded && (
          <div className="p-6 flex flex-col gap-6">
            {displayPreviousEvaluations.map((hist) => {
              const histAvg = (hist.workQuality + hist.communication + hist.teamwork + hist.punctuality) / 4;
              const histStanding = histAvg >= 4.5 ? "Outstanding" : histAvg >= 3.5 ? "Exceeds Expectations" : "Meets Expectations";
              return (
                <div key={hist.id} className="border-b border-[#F1F5F9] dark:border-gray-800 pb-5 last:border-none last:pb-0 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">
                      {hist.reviewPeriod}
                    </h4>
                    <button
                      onClick={() => setHistoryDetailReview(hist)}
                      className="text-xs font-bold text-blue-650 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-450 dark:text-gray-500 font-extrabold">
                    Overall Rating: <span className="font-black text-blue-655 dark:text-blue-400">{histAvg.toFixed(1)} ({histStanding})</span>
                  </p>
                  <p className="text-[11px] font-semibold text-gray-600 dark:text-gray-400 leading-relaxed mt-1">
                    <strong>Manager's Comment:</strong> {hist.strengths}
                  </p>
                </div>
              );
            })}

            {displayPreviousEvaluations.length === 0 && (
              <div className="text-center py-6 text-xs text-gray-450 dark:text-gray-550 font-bold italic">
                No historical reviews logged for this employee.
              </div>
            )}
          </div>
        )}
      </Card>

      {/* History Detail Modal */}
      {historyDetailReview && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-xl bg-white dark:bg-gray-900 border border-[#E2E8F0] dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-zoomIn">
            <div className="p-6 border-b border-[#F1F5F9] dark:border-gray-855 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Historical Evaluation Details
                </h3>
                <p className="text-xs text-gray-450 dark:text-gray-550 mt-1">
                  Review period: {historyDetailReview.reviewPeriod}
                </p>
              </div>
              <button
                onClick={() => setHistoryDetailReview(null)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-855 rounded-full cursor-pointer text-gray-400 transition-colors"
              >
                <HiOutlineXMark className="text-xl" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
              <div className="flex flex-col gap-4 text-xs font-semibold">
                <span className="text-[10px] text-gray-450 uppercase font-black tracking-wider">Metrics Breakdown</span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 bg-gray-55/50 dark:bg-gray-950/20 border border-[#F1F5F9] dark:border-gray-800 rounded-xl flex flex-col gap-1">
                    <span className="text-gray-400">Quality Score</span>
                    <span className="text-base font-black text-blue-650 dark:text-blue-400">{historyDetailReview.workQuality} / 5</span>
                  </div>
                  <div className="p-3.5 bg-gray-55/50 dark:bg-gray-950/20 border border-[#F1F5F9] dark:border-gray-800 rounded-xl flex flex-col gap-1">
                    <span className="text-gray-400">Communication Score</span>
                    <span className="text-base font-black text-blue-650 dark:text-blue-400">{historyDetailReview.communication} / 5</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-xs font-semibold">
                <span className="text-[10px] text-blue-655 uppercase font-black">Manager's Comments</span>
                <p className="p-4 bg-gray-55/50 dark:bg-gray-950/20 border border-[#F1F5F9] dark:border-gray-800 rounded-xl text-gray-600 dark:text-gray-450 leading-relaxed">
                  {historyDetailReview.strengths}
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-[#F1F5F9] dark:border-gray-800 bg-gray-55/50 dark:bg-gray-950/50 flex justify-end">
              <Button variant="outline" onClick={() => setHistoryDetailReview(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
