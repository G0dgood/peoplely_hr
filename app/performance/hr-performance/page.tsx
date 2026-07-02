"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
 HiOutlineMagnifyingGlass,
 HiOutlinePlus,
 HiOutlineTrash,
 HiOutlineCheckCircle,
 HiOutlineXMark,
 HiOutlineStar,
 HiOutlinePresentationChartLine,
 HiOutlineChevronRight,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import {
 useGetPerformanceEvaluationsQuery,
 useCreatePerformanceEvaluationMutation,
 useUpdatePerformanceEvaluationMutation,
 useDeletePerformanceEvaluationMutation,
} from "@/store/services/performanceApi";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";
import { TableActions } from "@/components/ui/table-actions";
import { toast } from "sonner";

export default function HRPerformancePage() {
 const router = useRouter();
 const currentUser = useAppSelector(selectCurrentUser);
 const companyId = currentUser?.companyId ?? "";

 const { data: empData, isLoading: isLoadingEmps } = useGetEmployeesQuery(
  { companyId, limit: 1000 },
  { skip: !companyId }
 );

 const { data: perfData, isLoading: isLoadingPerf } = useGetPerformanceEvaluationsQuery(
  { companyId },
  { skip: !companyId }
 );

 const [createEvaluation] = useCreatePerformanceEvaluationMutation();
 const [updateEvaluation] = useUpdatePerformanceEvaluationMutation();
 const [deleteEvaluation] = useDeletePerformanceEvaluationMutation();

 const [searchQuery, setSearchQuery] = React.useState("");
 const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

 // Form states for new review
 const [formEmployeeId, setFormEmployeeId] = React.useState("");
 const [formReviewerName, setFormReviewerName] = React.useState(currentUser?.name || "");
 const [formReviewPeriod, setFormReviewPeriod] = React.useState("Q1 2026");
 const [formWorkQuality, setFormWorkQuality] = React.useState(5);
 const [formCommunication, setFormCommunication] = React.useState(5);
 const [formTeamwork, setFormTeamwork] = React.useState(5);
 const [formPunctuality, setFormPunctuality] = React.useState(5);
 const [formStrengths, setFormStrengths] = React.useState("");
 const [formGrowth, setFormGrowth] = React.useState("");
 const [isSubmitting, setIsSubmitting] = React.useState(false);

 const employees = empData?.employees || [];
 const dbEvaluations = perfData?.evaluations || [];

 const evaluations = React.useMemo(() => {
  const staticOlivia = {
   id: "emp1234",
   employeeId: "static-olivia-ike",
   employeeName: "Olivia Ike",
   employeeEmail: "olivia.ike@unpixel.com",
   reviewerName: "Ernest Ugo",
   reviewPeriod: "Q1 (Jan - Mar 2025)",
   workQuality: 4,
   communication: 4,
   teamwork: 4,
   punctuality: 4,
   status: "APPROVED",
   companyId,
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
   avatar: "https://i.pravatar.cc/150?u=olivia"
  };
  return [staticOlivia, ...dbEvaluations];
 }, [dbEvaluations, companyId]);

 const handleCreateEvaluation = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formEmployeeId) {
   toast.error("Please select an employee.");
   return;
  }

  const selectedEmp = employees.find((emp) => emp.id === formEmployeeId);
  if (!selectedEmp) return;

  setIsSubmitting(true);
  try {
   await createEvaluation({
    employeeId: selectedEmp.id,
    employeeName: selectedEmp.name,
    employeeEmail: selectedEmp.email,
    reviewerName: formReviewerName,
    reviewPeriod: formReviewPeriod,
    workQuality: formWorkQuality,
    communication: formCommunication,
    teamwork: formTeamwork,
    punctuality: formPunctuality,
    strengths: formStrengths,
    growth: formGrowth,
    status: "SUBMITTED",
    companyId,
   }).unwrap();

   toast.success("Performance evaluation submitted successfully!");
   setIsDrawerOpen(false);

   // Reset form
   setFormEmployeeId("");
   setFormStrengths("");
   setFormGrowth("");
   setFormWorkQuality(5);
   setFormCommunication(5);
   setFormTeamwork(5);
   setFormPunctuality(5);
  } catch (err: any) {
   toast.error(err?.data?.error || "Failed to submit evaluation.");
  } finally {
   setIsSubmitting(false);
  }
 };

 const handleApprove = async (id: string) => {
  try {
   await updateEvaluation({
    id,
    body: { status: "APPROVED" },
   }).unwrap();
   toast.success("Evaluation approved!");
  } catch (err) {
   toast.error("Failed to approve evaluation.");
  }
 };

 const handleDelete = async (id: string) => {
  if (id === "emp1234") {
   toast.error("Static evaluation records cannot be deleted.");
   return;
  }
  if (!confirm("Are you sure you want to delete this evaluation record?")) return;
  try {
   await deleteEvaluation(id).unwrap();
   toast.success("Evaluation deleted.");
  } catch (err) {
   toast.error("Failed to delete evaluation.");
  }
 };

  const filteredEvaluations = evaluations.filter((item) => {
   return (
    item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.employeeEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.reviewPeriod.toLowerCase().includes(searchQuery.toLowerCase())
   );
  });


 return (
  <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950 font-sans relative">

   {/* Header & Breadcrumbs matching other performance pages */}
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
      <span className="text-gray-900 dark:text-white">HR Performance</span>
     </div>
    </div>
   </div>

   {/* Main card with Filters and Table to match the global admin-table pattern */}
   <Card className="p-6">
    <div className="flex flex-col gap-6">

     {/* Filters Row */}
     <div className="flex flex-wrap items-center justify-between gap-4">
      <Input
       placeholder="Search"
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
       leftIcon={<HiOutlineMagnifyingGlass className="text-lg text-[#94A3B8]" />}
       containerClassName="w-full max-w-sm"
       className="h-10 bg-gray-55/30 dark:bg-gray-800/50"
      />


     </div>

     {/* Custom Admin Table Pattern */}
     <div className="admin-table-container">
      <table>
       <thead>
        <tr>
         <th>Employee</th>
         <th>Reviewer</th>
         <th>Period</th>
         <th>Score</th>
         <th>Status</th>
         <th className="text-right">Actions</th>
        </tr>
       </thead>
       <tbody>
        {isLoadingEmps || isLoadingPerf ? (
         <SVGLoaderFetch colSpan={6} text="Loading evaluations ledger..." asTable={true} />
        ) : filteredEvaluations.length === 0 ? (
         <NoRecordFound colSpan={6} text="No performance evaluation records found." asTable={true} />
        ) : (
         filteredEvaluations.map((item) => {
          const avg = (item.workQuality + item.communication + item.teamwork + item.punctuality) / 4;
          const empInfo = employees.find((e) => e.id === item.employeeId);
          const avatarUrl = ("avatar" in item ? (item as any).avatar : null) || empInfo?.avatar;

          return (
           <tr key={item.id} className="group">
            <td>
             <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
               {avatarUrl ? (
                <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
               ) : (
                item.employeeName.charAt(0).toUpperCase()
               )}
              </div>
              <div className="flex flex-col gap-0.5">
               <span className="text-xs font-bold text-gray-900 dark:text-white">{item.employeeName}</span>
               <span className="text-[9px] font-semibold text-gray-455 dark:text-gray-555">{item.employeeEmail}</span>
              </div>
             </div>
            </td>
            <td>{item.reviewerName}</td>
            <td>
             <span className="font-semibold text-gray-900 dark:text-white">
              {item.reviewPeriod}
             </span>
            </td>
            <td>
             <div className="flex items-center gap-1">
              <span className="font-semibold text-teal-600 dark:text-teal-400">
               {avg.toFixed(1)}
              </span>
              <HiOutlineStar className="text-[10px] text-teal-600 fill-teal-600" />
             </div>
            </td>
            <td>
             <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${item.status === "APPROVED"
              ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-455"
              : "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-455 animate-pulse"
              }`}>
              {item.status}
             </span>
            </td>
            <td className="text-right">
             <div className="flex items-center justify-end gap-2">
              <TableActions
               onView={() => router.push(`/performance/hr-performance/${item.id}`)}
               onDelete={() => handleDelete(item.id)}
              />
              {item.status === "SUBMITTED" && (
               <button
                onClick={() => handleApprove(item.id)}
                className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
                title="Approve Evaluation"
               >
                <HiOutlineCheckCircle className="text-lg" />
               </button>
              )}
             </div>
            </td>
           </tr>
          );
         })
        )}
       </tbody>
      </table>
     </div>

    </div>
   </Card>

   {/* Side-out Creation Drawer */}
   {isDrawerOpen && (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-end animate-fadeIn">
     <div className="w-full max-w-lg h-full bg-white dark:bg-gray-950 border-l border-gray-250 dark:border-gray-800 shadow-2xl flex flex-col justify-between animate-slideLeft">

      {/* Drawer Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-855 flex items-center justify-between">
       <div>
        <h3 className="text-sm md:text-base font-black text-gray-900 dark:text-white flex items-center gap-1.5">
         <HiOutlinePresentationChartLine className="text-teal-650" /> Write Performance Evaluation
        </h3>
        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-550 mt-0.5">
         Score skills and write feedback summaries.
        </p>
       </div>
       <button
        onClick={() => setIsDrawerOpen(false)}
        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full cursor-pointer text-gray-400 transition-colors"
       >
        <HiOutlineXMark className="text-lg" />
       </button>
      </div>

      {/* Form scrollable area */}
      <div className="flex-1 overflow-y-auto p-6">
       <form id="eval-form" onSubmit={handleCreateEvaluation} className="flex flex-col gap-5 text-xs font-semibold">

        {/* Employee choice */}
        <div className="flex flex-col gap-1.5">
         <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Employee evaluated *</label>
         <select
          required
          value={formEmployeeId}
          onChange={(e) => setFormEmployeeId(e.target.value)}
          className="h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500"
         >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
           <option key={emp.id} value={emp.id}>
            {emp.name} ({emp.department})
           </option>
          ))}
         </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
         {/* Reviewer Name */}
         <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Reviewer Name *</label>
          <input
           required
           type="text"
           value={formReviewerName}
           onChange={(e) => setFormReviewerName(e.target.value)}
           className="h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-teal-500"
          />
         </div>
         {/* Review Period */}
         <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Review Period *</label>
          <select
           value={formReviewPeriod}
           onChange={(e) => setFormReviewPeriod(e.target.value)}
           className="h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500"
          >
           <option>Q1 2026</option>
           <option>Q2 2026</option>
           <option>Mid-Year 2026</option>
           <option>Annual 2026</option>
          </select>
         </div>
        </div>

        {/* Star Sliders Ratings */}
        <div className="flex flex-col gap-4 border-t border-gray-50 dark:border-gray-855 pt-4">
         <span className="text-[10px] font-black text-gray-455 dark:text-gray-450 uppercase tracking-wider">
          Metrics Scoring (1 - 5 stars)
         </span>

         {/* Quality */}
         <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-[11px] mb-1">
           <span className="text-gray-700 dark:text-gray-300">Work Quality</span>
           <span className="text-teal-650 font-extrabold">{formWorkQuality} ★</span>
          </div>
          <input
           type="range"
           min={1}
           max={5}
           step={1}
           value={formWorkQuality}
           onChange={(e) => setFormWorkQuality(Number(e.target.value))}
           className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-teal-650"
          />
         </div>

         {/* Communication */}
         <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-[11px] mb-1">
           <span className="text-gray-700 dark:text-gray-300">Communication</span>
           <span className="text-teal-600 font-extrabold">{formCommunication} ★</span>
          </div>
          <input
           type="range"
           min={1}
           max={5}
           step={1}
           value={formCommunication}
           onChange={(e) => setFormCommunication(Number(e.target.value))}
           className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-teal-655"
          />
         </div>

         {/* Teamwork */}
         <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-[11px] mb-1">
           <span className="text-gray-700 dark:text-gray-300">Teamwork</span>
           <span className="text-teal-600 font-extrabold">{formTeamwork} ★</span>
          </div>
          <input
           type="range"
           min={1}
           max={5}
           step={1}
           value={formTeamwork}
           onChange={(e) => setFormTeamwork(Number(e.target.value))}
           className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-teal-655"
          />
         </div>

         {/* Punctuality */}
         <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-[11px] mb-1">
           <span className="text-gray-700 dark:text-gray-300">Punctuality</span>
           <span className="text-teal-600 font-extrabold">{formPunctuality} ★</span>
          </div>
          <input
           type="range"
           min={1}
           max={5}
           step={1}
           value={formPunctuality}
           onChange={(e) => setFormPunctuality(Number(e.target.value))}
           className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-teal-655"
          />
         </div>
        </div>

        {/* Feedback Box */}
        <div className="flex flex-col gap-1.5">
         <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Accomplishments & Strengths</label>
         <textarea
          rows={3}
          placeholder="Identify highlights, completed milestones, or exemplary behaviors."
          value={formStrengths}
          onChange={(e) => setFormStrengths(e.target.value)}
          className="p-3.5 border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold rounded-xl focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
         />
        </div>

        <div className="flex flex-col gap-1.5">
         <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Growth Areas</label>
         <textarea
          rows={3}
          placeholder="Focus areas for Q3, technical skill updates needed, etc."
          value={formGrowth}
          onChange={(e) => setFormGrowth(e.target.value)}
          className="p-3.5 border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold rounded-xl focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
         />
        </div>

       </form>
      </div>

      {/* Sticky Actions using custom Button components */}
      <div className="p-4 border-t border-gray-150 dark:border-gray-855 bg-gray-50/50 dark:bg-gray-950 flex gap-3">
       <Button
        variant="outline"
        type="button"
        onClick={() => setIsDrawerOpen(false)}
        className="flex-1 h-11"
       >
        Cancel
       </Button>
       <Button
        variant="primary"
        type="submit"
        form="eval-form"
        disabled={isSubmitting}
        className="flex-1 h-11 bg-teal-650 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
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
   )}
  </div>
 );
}
