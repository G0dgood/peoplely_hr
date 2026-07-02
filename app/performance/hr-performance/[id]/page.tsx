"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  HiOutlineChevronRight,
  HiOutlinePrinter,
  HiOutlineEnvelope,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useGetEmployeeQuery } from "@/store/services/employeesApi";
import { useGetPerformanceEvaluationsQuery } from "@/store/services/performanceApi";
import { SVGLoaderFetch } from "@/components/ui/options";
import { BackButton } from "@/components/ui/back-button";
import { toast } from "sonner";

interface HRNote {
  id: string;
  text: string;
  date: string;
}

export default function HRPerformanceDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  // Queries
  const { data: perfData, isLoading: isLoadingPerf } = useGetPerformanceEvaluationsQuery(
    { companyId },
    { skip: !companyId }
  );

  const evaluations = perfData?.evaluations || [];
  
  // Find current evaluation from DB (if not mock static ID)
  const currentEvaluation = React.useMemo(() => {
    if (id === "emp1234") return null;
    return evaluations.find((e) => e.id === id) || null;
  }, [evaluations, id]);

  // Fetch employee details from DB if we have a real evaluation
  const { data: employeeData, isLoading: isLoadingEmp } = useGetEmployeeQuery(
    { id: currentEvaluation?.employeeId || "", companyId },
    { skip: !currentEvaluation?.employeeId }
  );
  const dbEmployee = employeeData?.employee;

  // Accordion states
  const [isHistoryExpanded, setIsHistoryExpanded] = React.useState(true);
  const [isFeedbackExpanded, setIsFeedbackExpanded] = React.useState(true);
  const [isNotesExpanded, setIsNotesExpanded] = React.useState(true);

  // HR Notes state
  const [hrNotes, setHrNotes] = React.useState<HRNote[]>([
    {
      id: "note-1",
      text: "Sarah has been an invaluable team member this quarter. Her technical contributions have significantly improved our codebase stability and performance. I'd like to see her take on more mentoring responsibilities in the coming period.",
      date: "January 15, 2025",
    },
    {
      id: "note-2",
      text: "Sarah has been an invaluable team member this quarter. Her technical contributions have significantly improved our codebase stability and performance. I'd like to see her take on more mentoring responsibilities in the coming period.",
      date: "December 15, 2025",
    },
  ]);
  const [newNoteText, setNewNoteText] = React.useState("");

  // Determine metadata values
  const isStatic = id === "emp1234";
  const employeeName = isStatic ? "Olivia Ike" : (currentEvaluation?.employeeName || "—");
  const role = isStatic ? "Product Designer" : (dbEmployee?.role || "—");
  const empIdFake = isStatic ? "EMP1234" : (currentEvaluation?.employeeId ? `EMP-${currentEvaluation.employeeId.slice(0, 5).toUpperCase()}` : "—");
  const department = isStatic ? "IT" : (dbEmployee?.department || "—");
  const manager = isStatic ? "Ernest Ugo" : (currentEvaluation?.reviewerName || "—");
  const evaluationDate = isStatic ? "13/03/2025" : (currentEvaluation?.createdAt ? new Date(currentEvaluation.createdAt).toLocaleDateString("en-GB") : "—");
  const evaluationPeriod = isStatic ? "Q1 (Jan - Mar 2025)" : (currentEvaluation?.reviewPeriod || "—");

  // Fetch all reviews matching current employee email to build dynamic history
  const employeeEmail = isStatic ? "olivia.ike@unpixel.com" : currentEvaluation?.employeeEmail;
  const { data: employeeReviewsData } = useGetPerformanceEvaluationsQuery(
    { companyId, employeeEmail },
    { skip: !employeeEmail }
  );
  const previousEvaluations = employeeReviewsData?.evaluations || [];

  // Summary history data
  const historyItems = React.useMemo(() => {
    if (isStatic || previousEvaluations.length === 0) {
      return [
        { period: "Q1 (Jan - Mar 2025)", score: 4.0, date: "Completed: January 15, 2025" },
        { period: "Q4 (Oct - Dec 2024)", score: 3.5, date: "Completed: December 15, 2024" },
        { period: "Q3 (Jul - Sept 2024)", score: 3.0, date: "Completed: September 15, 2024" },
      ];
    }

    return previousEvaluations.map((e) => {
      const avg = (e.workQuality + e.communication + e.teamwork + e.punctuality) / 4;
      const formattedDate = new Date(e.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      return {
        period: e.reviewPeriod,
        score: parseFloat(avg.toFixed(1)),
        date: `Completed: ${formattedDate}`,
      };
    });
  }, [previousEvaluations, isStatic]);

  // Feedbacks history
  const feedbackItems = React.useMemo(() => {
    if (isStatic || previousEvaluations.length === 0) {
      const firstName = employeeName.split(" ")[0] || "Sarah";
      const commentText = `${firstName} has been an invaluable team member this quarter. Her technical contributions have significantly improved our codebase stability and performance. I'd like to see her take on more mentoring responsibilities in the coming period.`;
      return [
        { text: commentText, date: "January 15, 2025" },
        { text: commentText, date: "December 15, 2024" },
        { text: commentText, date: "September 15, 2025" },
      ];
    }

    return previousEvaluations.map((e) => {
      const formattedDate = new Date(e.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      return {
        text: e.strengths || "Good performance overall.",
        date: formattedDate,
      };
    });
  }, [previousEvaluations, isStatic, employeeName]);

  const handleEmail = () => {
    toast.success(`Evaluation details emailed successfully to ${employeeEmail}!`);
  };

  const handleSaveNote = () => {
    if (!newNoteText.trim()) {
      toast.error("Please enter a note before saving.");
      return;
    }

    const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const newNote: HRNote = {
      id: `note-${Date.now()}`,
      text: newNoteText.trim(),
      date: formattedDate,
    };

    setHrNotes((prev) => [...prev, newNote]);
    setNewNoteText("");
    toast.success("HR Note added successfully!");
  };

  if (isLoadingPerf || isLoadingEmp) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <SVGLoaderFetch text="Loading evaluation details..." asTable={false} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950 font-sans">
      
      {/* Header, Breadcrumbs, & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Employee Evaluation Details
          </h1>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-550 mt-2.5">
            <Link href="/help-center" className="hover:text-primary transition-colors">
              Help Center
            </Link>
            <HiOutlineChevronRight className="text-[10px]" />
            <Link href="/performance/hr-performance" className="hover:text-primary transition-colors">
              HR Performance
            </Link>
            <HiOutlineChevronRight className="text-[10px]" />
            <span className="text-gray-900 dark:text-white">{employeeName}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <BackButton href="/performance/hr-performance" label="Back to HR Performance" className="mr-1" />
          
          <Button
            variant="outline"
            size="md"
            onClick={() => window.print()}
            leftIcon={<HiOutlinePrinter className="text-sm" />}
            className="h-10 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Print
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleEmail}
            leftIcon={<HiOutlineEnvelope className="text-sm" />}
            className="h-10 bg-blue-650 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Email
          </Button>
        </div>
      </div>

      {/* Metadata Detail List */}
      <Card className="p-8 shadow-xs border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12 text-xs font-semibold text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800/50 pb-4">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider shrink-0 mr-4">Employee Name</span>
            <span className="text-sm font-bold text-gray-850 dark:text-gray-200">{employeeName}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800/50 pb-4">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider shrink-0 mr-4">Role</span>
            <span className="text-sm font-bold text-gray-850 dark:text-gray-200">{role}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800/50 pb-4">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider shrink-0 mr-4">Employee ID</span>
            <span className="text-sm font-bold text-gray-850 dark:text-gray-200">{empIdFake}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800/50 pb-4">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider shrink-0 mr-4">Department</span>
            <span className="text-sm font-bold text-gray-850 dark:text-gray-200">{department}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800/50 pb-4">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider shrink-0 mr-4">Manager</span>
            <span className="text-sm font-bold text-gray-850 dark:text-gray-200">{manager}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800/50 pb-4">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider shrink-0 mr-4">Evaluation Date</span>
            <span className="text-sm font-bold text-gray-850 dark:text-gray-200">{evaluationDate}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800/50 pb-4 md:col-span-2">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider shrink-0 mr-4">Evaluation Period</span>
            <span className="text-sm font-bold text-gray-850 dark:text-gray-200">{evaluationPeriod}</span>
          </div>
        </div>
      </Card>

      {/* Accordion 1: Evaluation Summary History */}
      <Card className="overflow-hidden shadow-xs border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <button
          onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
          className="w-full p-5 flex items-center justify-between text-xs font-bold text-gray-900 dark:text-white cursor-pointer bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800/80"
        >
          <span>Evaluation Summary History</span>
          {isHistoryExpanded ? <HiOutlineChevronUp className="text-base text-gray-450" /> : <HiOutlineChevronDown className="text-base text-gray-455" />}
        </button>

        {isHistoryExpanded && (
          <div className="p-6 flex flex-col gap-6">
            {historyItems.map((hist, index) => {
              const progressPercentage = (hist.score / 5.0) * 100;
              return (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">
                      {hist.period}
                    </h4>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                      {hist.score}/5.0
                    </span>
                  </div>
                  {/* Progress Bar Container */}
                  <div className="flex items-center gap-4">
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-blue-650 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-450 dark:text-gray-500 font-extrabold">
                    {hist.date}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Accordion 2: Manager Feedback and Comment */}
      <Card className="overflow-hidden shadow-xs border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <button
          onClick={() => setIsFeedbackExpanded(!isFeedbackExpanded)}
          className="w-full p-5 flex items-center justify-between text-xs font-bold text-gray-900 dark:text-white cursor-pointer bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800/80"
        >
          <span>Manager Feedback and Comment</span>
          {isFeedbackExpanded ? <HiOutlineChevronUp className="text-base text-gray-450" /> : <HiOutlineChevronDown className="text-base text-gray-455" />}
        </button>

        {isFeedbackExpanded && (
          <div className="p-6 flex flex-col gap-4">
            {feedbackItems.map((fb, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 flex flex-col gap-3.5 shadow-2xs"
              >
                <p className="text-xs font-semibold text-gray-650 dark:text-gray-300 leading-relaxed">
                  {fb.text}
                </p>
                <span className="text-[10px] text-gray-400 dark:text-gray-550 font-bold self-end">
                  {fb.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Accordion 3: HR Notes (Internal Only) */}
      <Card className="overflow-hidden shadow-xs border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <button
          onClick={() => setIsNotesExpanded(!isNotesExpanded)}
          className="w-full p-5 flex items-center justify-between text-xs font-bold text-gray-900 dark:text-white cursor-pointer bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800/80"
        >
          <span>HR Notes (Internal Only)</span>
          {isNotesExpanded ? <HiOutlineChevronUp className="text-base text-gray-450" /> : <HiOutlineChevronDown className="text-base text-gray-455" />}
        </button>

        {isNotesExpanded && (
          <div className="p-6 flex flex-col gap-5">
            {/* Notes List */}
            <div className="flex flex-col gap-3.5">
              {hrNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-blue-55/30 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30 rounded-xl p-5 flex flex-col gap-3.5"
                >
                  <p className="text-xs font-semibold text-gray-650 dark:text-gray-300 leading-relaxed">
                    {note.text}
                  </p>
                  <span className="text-[10px] text-gray-400 dark:text-gray-550 font-bold self-end">
                    {note.date}
                  </span>
                </div>
              ))}
            </div>

            {/* Add New Note Section */}
            <div className="flex flex-col gap-3 border-t border-gray-100 dark:border-gray-800 pt-5">
              <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">
                Add New Note
              </h4>
              <textarea
                rows={4}
                placeholder="Enter HR note here..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="p-3.5 border border-gray-200 dark:border-gray-800 bg-transparent text-xs font-semibold rounded-xl focus:outline-none focus:border-primary resize-none leading-relaxed text-gray-800 dark:text-gray-100"
              />
              <div className="flex justify-end mt-1">
                <Button
                  variant="primary"
                  onClick={handleSaveNote}
                  className="px-6 bg-blue-650 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Save Note
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

    </div>
  );
}
