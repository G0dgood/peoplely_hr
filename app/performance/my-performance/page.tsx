"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
 HiOutlineMagnifyingGlass,
 HiOutlineFunnel,
 HiOutlineXMark,
 HiOutlineStar,
 HiOutlineCheckCircle,
 HiOutlineUserCircle,
 HiOutlineClock,
 HiOutlineSparkles,
 HiOutlineChevronRight,
 HiOutlinePlus,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useGetPerformanceEvaluationsQuery } from "@/store/services/performanceApi";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";
import { toast } from "sonner";

export default function MyPerformancePage() {
 const router = useRouter();
 const currentUser = useAppSelector(selectCurrentUser);
 const companyId = currentUser?.companyId ?? "";

 // Fetch evaluations matching the current user
 const { data: perfData, isLoading: isLoadingPerf } = useGetPerformanceEvaluationsQuery(
  {
   companyId: companyId || undefined,
   employeeEmail: currentUser?.email || undefined,
  },
  { skip: !currentUser?.email }
 );

 // Fetch all employees to look up Role and Department details
 const { data: empData, isLoading: isLoadingEmps } = useGetEmployeesQuery(
  { companyId, limit: 1000 },
  { skip: !companyId }
 );

 const [searchQuery, setSearchQuery] = React.useState("");
 const [selectedReview, setSelectedReview] = React.useState<any>(null);
 const [selectedRatingFilter, setSelectedRatingFilter] = React.useState<number | null>(null);
 const [acknowledgements, setAcknowledgements] = React.useState<Record<string, boolean>>({});

 const evaluations = perfData?.evaluations || [];
 const employees = empData?.employees || [];

 const handleAcknowledge = (id: string) => {
  setAcknowledgements((prev) => ({ ...prev, [id]: true }));
  toast.success("Review acknowledged!", {
   description: "Your acknowledgement has been logged and shared with your manager.",
   icon: <HiOutlineCheckCircle className="text-teal-500 w-5 h-5" />,
  });
 };

 // Find user's employee details
 const myEmployeeRecord = employees.find((emp) => emp.email === currentUser?.email);
 const myRole = myEmployeeRecord?.role || "Employee";
 const myDepartment = myEmployeeRecord?.department || "Operations";

 // Filtered reviews
 const filteredEvaluations = evaluations.filter((item) => {
  const avg = (item.workQuality + item.communication + item.teamwork + item.punctuality) / 4;
  const matchesSearch =
   item.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
   item.reviewPeriod.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesRating = selectedRatingFilter === null || Math.floor(avg) === selectedRatingFilter;

  return matchesSearch && matchesRating;
 });

 // Check if selected review has custom KPIs serialized in the growth field
 const parsedKpis = React.useMemo(() => {
  if (!selectedReview?.growth) return null;
  try {
   if (selectedReview.growth.startsWith("[")) {
    return JSON.parse(selectedReview.growth);
   }
  } catch (e) {
   // Not JSON
  }
  return null;
 }, [selectedReview]);

 const isLoading = isLoadingPerf || isLoadingEmps;

 if (isLoading) {
  return (
   <div className="flex items-center justify-center min-h-[400px]">
    <SVGLoaderFetch text="Loading your performance reviews..." asTable={false} />
   </div>
  );
 }

 return (
  <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950 font-sans">

   {/* Header & Breadcrumbs matching other report pages */}
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
      <span className="text-gray-900 dark:text-white">Performance Evaluation</span>
     </div>
    </div>

    <div className="flex items-center gap-3 self-end sm:self-auto">
     <Button
      variant="primary"
      size="md"
      leftIcon={<HiOutlinePlus />}
      onClick={() => router.push("/performance/my-performance/create")}
      className="px-6"
     >
      Create Performance
     </Button>
    </div>
   </div>

   {/* Main card with Filters and Table to match the global admin-table pattern */}
   <Card className="p-6">
    <div className="flex flex-col gap-6">

     {/* Filters Row */}
     <div className="flex flex-wrap items-center gap-4">
      <Input
       placeholder="Search"
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
       leftIcon={<HiOutlineMagnifyingGlass className="text-lg text-[#94A3B8]" />}
       containerClassName="w-full max-w-sm"
       className="h-10 bg-gray-55/30 dark:bg-gray-800/50"
      />

      <Dropdown
       label={selectedRatingFilter === null ? "Filter" : `${selectedRatingFilter}.0 Rating`}
       options={["All Ratings", "5.0 Rating", "4.0 Rating", "3.0 Rating", "2.0 Rating", "1.0 Rating"]}
       onSelect={(opt) => {
        if (opt === "All Ratings") {
         setSelectedRatingFilter(null);
        } else {
         setSelectedRatingFilter(parseInt(opt));
        }
       }}
       align="right"
      />
     </div>

     {/* Custom Admin Table Pattern */}
     <div className="admin-table-container">
      <table>
       <thead>
        <tr>
         <th>Employee</th>
         <th>Role</th>
         <th>Department</th>
         <th>Manager</th>
         <th>Overall Rating</th>
         <th className="text-right">Action</th>
        </tr>
       </thead>
       <tbody>
        {filteredEvaluations.length === 0 ? (
         <NoRecordFound colSpan={6} text="No performance evaluation records found." asTable={true} />
        ) : (
         filteredEvaluations.map((item) => {
          const avg = (item.workQuality + item.communication + item.teamwork + item.punctuality) / 4;

          return (
           <tr key={item.id} className="group">
            <td>
             <p className="text-xs font-bold text-gray-900 dark:text-white">
              {currentUser?.name || item.employeeName}
             </p>
            </td>
            <td>{myRole}</td>
            <td>{myDepartment}</td>
            <td>{item.reviewerName}</td>
            <td>
             <span className="font-semibold text-gray-900 dark:text-white">
              {avg.toFixed(1)}
             </span>
            </td>
            <td className="text-right">
             <button
              onClick={() => setSelectedReview(item)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer text-xs"
             >
              View Details
             </button>
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

   {/* Details View Modal */}
   {selectedReview && (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
     <div className="w-full max-w-xl bg-white dark:bg-gray-900 border border-[#E2E8F0] dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-zoomIn">

      {/* Modal Header */}
      <div className="p-6 border-b border-[#F1F5F9] dark:border-gray-855 flex items-center justify-between">
       <div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
         Performance Evaluation Detail
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-550 mt-1">
         Review period: {selectedReview.reviewPeriod} • Status: {selectedReview.status}
        </p>
       </div>
       <button
        onClick={() => setSelectedReview(null)}
        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-855 rounded-full cursor-pointer text-gray-400 transition-colors"
       >
        <HiOutlineXMark className="text-xl" />
       </button>
      </div>

      {/* Modal Body */}
      <div className="p-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto">

       {/* Scoring Section */}
       <div className="flex flex-col gap-4">
        <span className="text-xs font-bold text-gray-450 dark:text-gray-400 uppercase tracking-wider">
         Metrics Breakdowns
        </span>

        {parsedKpis ? (
         // Custom KPIs Table format
         <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto border border-[#E2E8F0] dark:border-gray-800 rounded-xl p-4 bg-slate-50/10 dark:bg-gray-950/20">
          {parsedKpis.map((kpi: any, idx: number) => (
           <div key={idx} className="flex items-center justify-between gap-4 border-b border-[#F1F5F9] dark:border-gray-800 pb-2 last:border-none last:pb-0 text-xs">
            <span className="font-semibold text-gray-700 dark:text-gray-300">{kpi.name}</span>
            <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
             <span>{kpi.rating > 0 ? `${kpi.rating} ★` : "Unrated"}</span>
             {kpi.rating > 0 && (
              <div className="flex gap-0.5 text-yellow-450">
               {Array.from({ length: 5 }).map((_, i) => (
                <HiOutlineStar
                 key={i}
                 className={`w-3 h-3 ${i < kpi.rating ? "fill-yellow-450 text-yellow-450" : "text-gray-255 dark:text-gray-700"}`}
                />
               ))}
              </div>
             )}
            </div>
           </div>
          ))}
         </div>
        ) : (
         // Default 4 metrics breakdowns
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
          {/* Work Quality */}
          <div className="flex flex-col gap-1.5 p-3.5 bg-gray-50/50 dark:bg-gray-950/40 border border-[#F1F5F9] dark:border-gray-855 rounded-xl">
           <span className="text-gray-500">Work Quality</span>
           <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-base font-black text-blue-600 dark:text-blue-400">
             {selectedReview.workQuality}
            </span>
            <span className="text-[10px] text-gray-400">/ 5.0</span>
            <div className="flex gap-0.5 ml-auto text-yellow-450">
             {Array.from({ length: 5 }).map((_, i) => (
              <HiOutlineStar
               key={i}
               className={`w-3.5 h-3.5 ${i < selectedReview.workQuality ? "fill-yellow-450 text-yellow-450" : "text-gray-255 dark:text-gray-700"
                }`}
              />
             ))}
            </div>
           </div>
          </div>

          {/* Communication */}
          <div className="flex flex-col gap-1.5 p-3.5 bg-gray-50/50 dark:bg-gray-950/40 border border-[#F1F5F9] dark:border-gray-855 rounded-xl">
           <span className="text-gray-500">Communication</span>
           <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-base font-black text-blue-600 dark:text-blue-400">
             {selectedReview.communication}
            </span>
            <span className="text-[10px] text-gray-400">/ 5.0</span>
            <div className="flex gap-0.5 ml-auto text-yellow-450">
             {Array.from({ length: 5 }).map((_, i) => (
              <HiOutlineStar
               key={i}
               className={`w-3.5 h-3.5 ${i < selectedReview.communication ? "fill-yellow-450 text-yellow-450" : "text-gray-255 dark:text-gray-700"
                }`}
              />
             ))}
            </div>
           </div>
          </div>

          {/* Teamwork */}
          <div className="flex flex-col gap-1.5 p-3.5 bg-gray-50/50 dark:bg-gray-950/40 border border-[#F1F5F9] dark:border-gray-855 rounded-xl">
           <span className="text-gray-500">Teamwork</span>
           <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-base font-black text-blue-600 dark:text-blue-400">
             {selectedReview.teamwork}
            </span>
            <span className="text-[10px] text-gray-400">/ 5.0</span>
            <div className="flex gap-0.5 ml-auto text-yellow-450">
             {Array.from({ length: 5 }).map((_, i) => (
              <HiOutlineStar
               key={i}
               className={`w-3.5 h-3.5 ${i < selectedReview.teamwork ? "fill-yellow-450 text-yellow-450" : "text-gray-255 dark:text-gray-700"
                }`}
              />
             ))}
            </div>
           </div>
          </div>

          {/* Punctuality */}
          <div className="flex flex-col gap-1.5 p-3.5 bg-gray-50/50 dark:bg-gray-950/40 border border-[#F1F5F9] dark:border-gray-855 rounded-xl">
           <span className="text-gray-500">Punctuality</span>
           <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-base font-black text-blue-600 dark:text-blue-400">
             {selectedReview.punctuality}
            </span>
            <span className="text-[10px] text-gray-400">/ 5.0</span>
            <div className="flex gap-0.5 ml-auto text-yellow-450">
             {Array.from({ length: 5 }).map((_, i) => (
              <HiOutlineStar
               key={i}
               className={`w-3.5 h-3.5 ${i < selectedReview.punctuality ? "fill-yellow-450 text-yellow-450" : "text-gray-255 dark:text-gray-700"
                }`}
              />
             ))}
            </div>
           </div>
          </div>
         </div>
        )}
       </div>

       {/* Text Feedback */}
       <div className="flex flex-col gap-4 text-xs font-semibold leading-relaxed">
        {/* Strengths / Comment */}
        <div className="flex flex-col gap-2">
         <span className="text-[10px] text-blue-650 dark:text-blue-400 uppercase font-black flex items-center gap-1.5">
          <HiOutlineSparkles /> {parsedKpis ? "Evaluator Comment" : "Strengths & Accomplishments"}
         </span>
         <p className="p-4 bg-gray-50/50 dark:bg-gray-950/40 border border-[#F1F5F9] dark:border-gray-850 rounded-xl text-gray-600 dark:text-gray-400 font-medium">
          {selectedReview.strengths || "No comments written."}
         </p>
        </div>

        {/* Growth */}
        {!parsedKpis && (
         <div className="flex flex-col gap-2">
          <span className="text-[10px] text-amber-600 dark:text-amber-450 uppercase font-black flex items-center gap-1.5">
           <HiOutlineClock /> Development Opportunities
          </span>
          <p className="p-4 bg-gray-50/50 dark:bg-gray-950/40 border border-[#F1F5F9] dark:border-gray-850 rounded-xl text-gray-600 dark:text-gray-400 font-medium">
           {selectedReview.growth || "No comments written."}
          </p>
         </div>
        )}
       </div>

       {/* Reviewer signature */}
       <div className="flex items-center gap-2 text-xs text-gray-500 border-t border-[#F1F5F9] dark:border-gray-855 pt-4 mt-2">
        <HiOutlineUserCircle className="text-base text-gray-400" />
        <span>Reviewed by <strong>{selectedReview.reviewerName}</strong></span>
       </div>
      </div>

      {/* Modal Footer */}
      <div className="p-4 border-t border-[#F1F5F9] dark:border-gray-850 bg-gray-50/50 dark:bg-gray-950/50 flex justify-end gap-3">
       {acknowledgements[selectedReview.id] ? (
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2.5 rounded-lg flex items-center gap-1.5">
         <HiOutlineCheckCircle className="text-base" /> Acknowledged
        </span>
       ) : (
        <Button
         onClick={() => handleAcknowledge(selectedReview.id)}
         leftIcon={<HiOutlineCheckCircle className="text-base" />}
         className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm"
        >
         Acknowledge Evaluation
        </Button>
       )}
      </div>

     </div>
    </div>
   )}

  </div>
 );
}
