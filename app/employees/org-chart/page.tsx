"use client";

import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { HiPlus, HiMinus } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { useGetEmployeesQuery, Employee } from "@/store/services/employeesApi";
import { useGetOfficesQuery } from "@/store/services/officeApi";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useApiError } from "@/hooks/useApiError";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";
import { Dropdown } from "@/components/ui/dropdown";

type OrgNodeData = {
  id: string;
  name: string;
  role?: string;
  department?: string;
  avatar?: string;
  isExpanded?: boolean;
  isRoot?: boolean;
  children?: OrgNodeData[];
};

const OrgNode = ({ node, toggleNode }: { node: OrgNodeData; toggleNode: (id: string) => void }) => {
  const hasChildren = node.children !== undefined && node.children.length > 0;

  return (
    <motion.div layout className="flex flex-col items-center">
      {/* Node Card */}
      <motion.div layout className="relative">
        {node.isRoot ? (
          <div className="border border-gray-300 dark:border-gray-700 rounded-full px-6 py-2.5 text-sm font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-900 relative z-10">
            {node.name}
          </div>
        ) : (
          <div className="border border-gray-300 dark:border-gray-700 rounded-2xl p-6 w-44 flex flex-col items-center text-center bg-white dark:bg-gray-900 relative z-10 shadow-xs">
            <Avatar src={node.avatar} fallback={node.name.split(" ").map(n => n[0]).join("")} size="lg" className="mb-3" />
            <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-0.5 truncate max-w-full" title={node.name}>{node.name}</h3>
            {node.role && <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2 truncate max-w-full" title={node.role}>{node.role}</p>}
            {node.department && <p className="text-[10px] font-semibold text-[#0FAF7A] dark:text-[#0FAF7A] truncate max-w-full" title={node.department}>{node.department}</p>}
          </div>
        )}

        {/* Toggle Button */}
        {hasChildren && (
          <button
            onClick={() => toggleNode(node.id)}
            className="w-5 h-5 rounded-full bg-[#0FAF7A] text-white flex items-center justify-center absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-20 border-2 border-white dark:border-gray-900 hover:scale-110 transition-transform cursor-pointer"
          >
            {node.isExpanded ? <HiMinus className="text-[10px] stroke-2" /> : <HiPlus className="text-[10px] stroke-2" />}
          </button>
        )}
      </motion.div>

      {/* Children Tree */}
      <AnimatePresence>
        {hasChildren && node.isExpanded && node.children && node.children.length > 0 && (
          <motion.div
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="org-tree-children relative pt-8 flex justify-center origin-top"
          >
            {/* Vertical line from parent to horizontal line */}
            <motion.div layout className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-300 dark:bg-gray-700"></motion.div>

            {node.children.map((child, index) => (
              <motion.div layout key={child.id} className="org-tree-node relative px-2 sm:px-4 pt-8 flex flex-col items-center">

                {/* Horizontal line connections */}
                {node.children!.length > 1 && (
                  <>
                    {index !== 0 && (
                      <motion.div layout className="absolute top-0 left-0 w-1/2 h-px bg-gray-300 dark:bg-gray-700"></motion.div>
                    )}
                    {index !== node.children!.length - 1 && (
                      <motion.div layout className="absolute top-0 right-0 w-1/2 h-px bg-gray-300 dark:bg-gray-700"></motion.div>
                    )}
                  </>
                )}

                {/* Vertical line to child */}
                <motion.div layout className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-300 dark:bg-gray-700"></motion.div>

                <OrgNode node={child} toggleNode={toggleNode} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function OrgChartPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const { data, isLoading: isEmployeesLoading, error } = useGetEmployeesQuery({ limit: 100, companyId });
  const employees = data?.employees || [];

  const { data: officeData, isLoading: isOfficesLoading, error: officesError } = useGetOfficesQuery({ companyId });
  const offices = officeData?.offices || [];

  const [selectedOffice, setSelectedOffice] = React.useState<string>("");

  React.useEffect(() => {
    if (offices.length > 0 && !selectedOffice) {
      setSelectedOffice(offices[0].name);
    }
  }, [offices, selectedOffice]);

  useApiError(!!error, error, "Failed to load employees for ORG chart");
  useApiError(!!officesError, officesError, "Failed to load offices for ORG chart");

  const [expandedNodes, setExpandedNodes] = React.useState<Record<string, boolean>>({});

  const handleToggle = (id: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isLoading = isEmployeesLoading || isOfficesLoading;

  const officeEmployeesEmpty = React.useMemo(() => {
    if (!selectedOffice) return true;
    return !employees.some(e => e.office.toLowerCase() === selectedOffice.toLowerCase());
  }, [employees, selectedOffice]);

  // Build the hierarchical tree data structure
  const orgData = React.useMemo(() => {
    if (!selectedOffice) {
      return {
        id: "office-root",
        name: "Select Office",
        isRoot: true,
        isExpanded: true,
        children: []
      };
    }

    const officeEmployees = employees.filter(e => e.office.toLowerCase() === selectedOffice.toLowerCase());

    if (officeEmployees.length === 0) {
      return {
        id: "office-root",
        name: selectedOffice,
        isRoot: true,
        isExpanded: true,
        children: []
      };
    }

    const empMap = new Map<string, Employee>();
    officeEmployees.forEach(emp => empMap.set(emp.name.toLowerCase().trim(), emp));

    const subordinatesMap = new Map<string, Employee[]>();
    officeEmployees.forEach(emp => {
      const managerName = emp.manager ? emp.manager.toLowerCase().trim() : "";
      if (managerName) {
        if (!subordinatesMap.has(managerName)) {
          subordinatesMap.set(managerName, []);
        }
        subordinatesMap.get(managerName)!.push(emp);
      }
    });

    const rootEmployees = officeEmployees.filter(emp => {
      const managerName = emp.manager ? emp.manager.toLowerCase().trim() : "";
      return !managerName || !empMap.has(managerName);
    });

    const buildNode = (emp: Employee): OrgNodeData => {
      const nameLower = emp.name.toLowerCase().trim();
      const subs = subordinatesMap.get(nameLower) || [];
      const isExpanded = expandedNodes[emp.id] !== undefined ? expandedNodes[emp.id] : true;
      return {
        id: emp.id,
        name: emp.name,
        role: emp.role,
        department: emp.department,
        avatar: emp.avatar,
        isExpanded,
        children: subs.length > 0 ? subs.map(sub => buildNode(sub)) : undefined
      };
    };

    return {
      id: "office-root",
      name: selectedOffice,
      isRoot: true,
      isExpanded: true,
      children: rootEmployees.map(emp => buildNode(emp))
    };
  }, [employees, selectedOffice, expandedNodes]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-2 md:p-4 md:p-8 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-8 bg-white dark:bg-gray-900">

          <div className="border border-gray-300 dark:border-gray-700 rounded-2xl p-4 md:p-8 flex flex-col bg-white dark:bg-gray-900 min-h-[600px] overflow-x-auto">
            {/* Header */}
            <div className="pb-6 border-b border-gray-300 dark:border-gray-700 mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                ORG Chart
              </h2>
              {offices.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Office:</span>
                  <Dropdown
                    label={selectedOffice || "Select Office"}
                    options={offices.map(o => o.name)}
                    onSelect={(val) => setSelectedOffice(val)}
                    align="right"
                  />
                </div>
              )}
            </div>

            {/* Tree Container */}
            <div className="flex justify-center min-w-[800px] pb-16">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <SVGLoaderFetch colSpan={1} text="Loading ORG Chart..." asTable={false} />
                </div>
              ) : officeEmployeesEmpty ? (
                <div className="flex justify-center py-12">
                  <NoRecordFound colSpan={1} text="No employees found in this office." asTable={false} />
                </div>
              ) : (
                <OrgNode node={orgData} toggleNode={handleToggle} />
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
