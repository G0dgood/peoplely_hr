"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineClipboardDocumentCheck,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface ChecklistTask {
  id: string;
  text: string;
  assignee: string;
  tag: "Mandatory" | "Recommended" | "Optional";
  completed: boolean;
}

const INITIAL_ONBOARDING: ChecklistTask[] = [
  { id: "on-1", text: "Submit signed offer letter and tax forms", assignee: "New Hire", tag: "Mandatory", completed: true },
  { id: "on-2", text: "Set up corporate email and Slack credentials", assignee: "IT Department", tag: "Mandatory", completed: true },
  { id: "on-3", text: "Conduct HR welcome briefing & handbook review", assignee: "HR Team", tag: "Mandatory", completed: false },
  { id: "on-4", text: "Assign hardware workstation & software licenses", assignee: "IT Department", tag: "Mandatory", completed: false },
  { id: "on-5", text: "Schedule 1-on-1 meeting with team leader", assignee: "Manager", tag: "Recommended", completed: false },
  { id: "on-6", text: "Complete security awareness training course", assignee: "New Hire", tag: "Optional", completed: false },
];

const INITIAL_OFFBOARDING: ChecklistTask[] = [
  { id: "off-1", text: "Submit written resignation notice", assignee: "Employee", tag: "Mandatory", completed: true },
  { id: "off-2", text: "Confirm last day details & final salary calculations", assignee: "HR Team", tag: "Mandatory", completed: true },
  { id: "off-3", text: "Schedule and conduct exit interview", assignee: "HR Team", tag: "Recommended", completed: false },
  { id: "off-4", text: "Revoke network, VPN, and application accounts", assignee: "IT Department", tag: "Mandatory", completed: false },
  { id: "off-5", text: "Return laptop, badges, and company accessories", assignee: "Employee", tag: "Mandatory", completed: false },
];

export default function ChecklistsHelpPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"onboarding" | "offboarding">("onboarding");
  const [onboardingTasks, setOnboardingTasks] = React.useState<ChecklistTask[]>(INITIAL_ONBOARDING);
  const [offboardingTasks, setOffboardingTasks] = React.useState<ChecklistTask[]>(INITIAL_OFFBOARDING);
  
  const [newTaskText, setNewTaskText] = React.useState("");
  const [newTaskAssignee, setNewTaskAssignee] = React.useState("New Hire");
  const [newTaskTag, setNewTaskTag] = React.useState<"Mandatory" | "Recommended" | "Optional">("Mandatory");

  const currentTasks = activeTab === "onboarding" ? onboardingTasks : offboardingTasks;
  const setTasks = activeTab === "onboarding" ? setOnboardingTasks : setOffboardingTasks;

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const nextCompleted = !task.completed;
          if (nextCompleted) {
            toast.success(`Task completed: "${task.text}"`, {
              icon: <HiOutlineSparkles className="text-teal-500" />,
            });
          }
          return { ...task, completed: nextCompleted };
        }
        return task;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: ChecklistTask = {
      id: `custom-${Date.now()}`,
      text: newTaskText.trim(),
      assignee: newTaskAssignee,
      tag: newTaskTag,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskText("");
    toast.success("New checklist task added successfully!");
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.info("Task removed from template.");
  };

  const completedCount = currentTasks.filter((t) => t.completed).length;
  const totalCount = currentTasks.length;
  const percentCompleted = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Filter tasks for the search query
  const filteredTasks = currentTasks.filter(
    (t) =>
      t.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Title area with Breadcrumbs and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help Center</h1>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-gray-500">
            <Link href="/help-center" className="hover:text-primary transition-colors">
              Help Center
            </Link>
            <span className="text-gray-300">&gt;</span>
            <span className="text-gray-400">Checklists - On/offboarding</span>
          </div>
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search checklists guide..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-11 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start max-w-6xl w-full">
        {/* Left Side: Interactive Checklist Editor Sandbox */}
        <div className="flex-1 w-full flex flex-col gap-6">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
            <span>Interactive Checklist Builder Sandbox</span>
            <HiOutlineClipboardDocumentCheck className="text-teal-600 dark:text-teal-400 text-lg" />
          </div>

          <Card className="p-6 md:p-8 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-sm rounded-2xl flex flex-col gap-6">
            {/* Checklist Tabs */}
            <div className="flex border-b border-gray-100 dark:border-gray-850 gap-6">
              <button
                onClick={() => {
                  setActiveTab("onboarding");
                  setNewTaskAssignee("New Hire");
                }}
                className={`pb-3 text-xs font-extrabold transition-all border-b-2 cursor-pointer ${
                  activeTab === "onboarding"
                    ? "border-teal-600 text-teal-600 dark:text-teal-400"
                    : "border-transparent text-gray-450 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Onboarding Checklist
              </button>
              <button
                onClick={() => {
                  setActiveTab("offboarding");
                  setNewTaskAssignee("Employee");
                }}
                className={`pb-3 text-xs font-extrabold transition-all border-b-2 cursor-pointer ${
                  activeTab === "offboarding"
                    ? "border-teal-600 text-teal-600 dark:text-teal-400"
                    : "border-transparent text-gray-450 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Offboarding Checklist
              </button>
            </div>

            {/* Checklist Progress Summary */}
            <div className="flex flex-col gap-2 p-4 bg-gray-50/50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-850 rounded-xl">
              <div className="flex justify-between items-center text-xs font-black">
                <span className="text-gray-900 dark:text-white">
                  Template Progress
                </span>
                <span className="text-teal-600 dark:text-teal-400">
                  {completedCount} of {totalCount} Completed ({percentCompleted}%)
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500 rounded-full"
                  style={{ width: `${percentCompleted}%` }}
                ></div>
              </div>
            </div>

            {/* Interactive Checklist Task List */}
            <div className="flex flex-col gap-3.5">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-start md:items-center justify-between p-3.5 border rounded-xl transition-all ${
                    task.completed
                      ? "border-teal-500/10 bg-teal-500/[0.02] dark:bg-teal-950/[0.05]"
                      : "border-gray-100 dark:border-gray-850 hover:bg-gray-50/20 dark:hover:bg-gray-900/10"
                  }`}
                >
                  <div className="flex items-start md:items-center gap-3.5 flex-1 pr-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className="mt-0.5 md:mt-0 w-4.5 h-4.5 rounded border-gray-300 dark:border-gray-800 text-teal-600 focus:ring-teal-500/30 cursor-pointer"
                    />
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <span
                        className={`text-xs font-bold transition-all leading-normal ${
                          task.completed
                            ? "line-through text-gray-400 dark:text-gray-550"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {task.text}
                      </span>
                      <div className="flex gap-1.5 items-center">
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                          {task.assignee}
                        </span>
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                            task.tag === "Mandatory"
                              ? "bg-red-50 dark:bg-red-950/20 text-red-500 dark:text-red-400"
                              : task.tag === "Recommended"
                              ? "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-450"
                              : "bg-gray-150 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {task.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <HiOutlineTrash className="text-sm" />
                  </button>
                </div>
              ))}

              {filteredTasks.length === 0 && (
                <div className="text-center py-10 text-xs text-gray-400 dark:text-gray-500 font-semibold">
                  No tasks matched your search.
                </div>
              )}
            </div>

            {/* Quick Task Creation Form */}
            <form onSubmit={handleAddTask} className="flex flex-col gap-4 border-t border-gray-100 dark:border-gray-850 pt-5 mt-3">
              <span className="text-[10px] font-black text-gray-405 dark:text-gray-450 uppercase">
                Add Task to Template
              </span>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  required
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="e.g. Set up direct deposit details"
                  className="flex-1 h-10 px-4 text-xs font-semibold rounded-xl border border-gray-300 dark:border-gray-800 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 transition-all"
                />
                <div className="flex gap-2">
                  <select
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="h-10 px-3 text-xs font-bold rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-white focus:outline-none"
                  >
                    <option>New Hire</option>
                    <option>HR Team</option>
                    <option>IT Department</option>
                    <option>Manager</option>
                    <option>Employee</option>
                  </select>
                  <select
                    value={newTaskTag}
                    onChange={(e) => setNewTaskTag(e.target.value as any)}
                    className="h-10 px-3 text-xs font-bold rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-white focus:outline-none"
                  >
                    <option value="Mandatory">Mandatory</option>
                    <option value="Recommended">Recommended</option>
                    <option value="Optional">Optional</option>
                  </select>
                  <button
                    type="submit"
                    className="h-10 px-4 bg-teal-600 text-white hover:bg-teal-700 transition-colors rounded-xl text-xs font-extrabold cursor-pointer flex items-center justify-center gap-1"
                  >
                    <HiOutlinePlus /> Add
                  </button>
                </div>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Side: Informational Documentation Guide */}
        <div className="w-full xl:w-96 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
            <span>Process Documentation</span>
            <HiOutlineInformationCircle className="text-gray-400 text-lg" />
          </div>

          <Card className="p-6 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-sm leading-relaxed text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium rounded-2xl flex flex-col gap-6">
            {/* Introduction */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xs md:text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                Introduction
              </h2>
              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450">
                Checklists are essential tools for standardizing your company's processes, particularly during the critical periods of employee onboarding and offboarding. They ensure that every necessary step is completed efficiently, providing a smooth experience for the employee and compliance for your organization.
              </p>
            </div>

            {/* Onboarding Checklists */}
            <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-850 pt-4">
              <h2 className="text-xs md:text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                Onboarding Checklists
              </h2>
              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450 mb-1.5">
                An effective onboarding checklist helps new hires integrate into your company culture and operations rapidly. To create an onboarding checklist:
              </p>
              <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-gray-500 dark:text-gray-450 font-bold">
                <li>Navigate to the Checklist module from dashboard.</li>
                <li>Click on the <strong className="text-teal-600">Create New Checklist</strong> button.</li>
                <li>Select Onboarding as the checklist type.</li>
                <li>Add tasks like equipment setup and welcome briefings.</li>
                <li>Assign tasks to specific departments or the hire.</li>
              </ul>
            </div>

            {/* Offboarding Checklists */}
            <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-850 pt-4">
              <h2 className="text-xs md:text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                Offboarding Checklists
              </h2>
              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450 mb-1.5">
                Offboarding checklists ensure a secure and amicable departure for leaving employees, helping recover company assets and revoking system access. To manage offboarding:
              </p>
              <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-gray-500 dark:text-gray-450 font-bold">
                <li>Create a checklist of type Offboarding.</li>
                <li>Include asset recovery, key handovers, and final payslips.</li>
                <li>Ensure all tasks are checked off before the final day.</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
