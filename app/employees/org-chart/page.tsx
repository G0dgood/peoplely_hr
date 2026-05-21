"use client";

import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { HiPlus, HiMinus } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

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

const initialOrgData: OrgNodeData = {
  id: "1",
  name: "Unpixel Office",
  isRoot: true,
  isExpanded: true,
  children: [
    {
      id: "2",
      name: "Angeline Beier",
      role: "CEO",
      department: "Pixel Office",
      avatar: "https://i.pravatar.cc/150?u=angeline",
      isExpanded: false,
      children: [],
    },
    {
      id: "3",
      name: "Alfredo George",
      role: "CTO",
      department: "Pixel Office",
      avatar: "https://i.pravatar.cc/150?u=alfredo",
      isExpanded: false,
      children: [],
    },
    {
      id: "4",
      name: "Davis Levin",
      role: "CFO",
      department: "Pixel Office",
      avatar: "https://i.pravatar.cc/150?u=davis",
    },
    {
      id: "5",
      name: "Carla Workman",
      role: "CPO",
      department: "Pixel Office",
      avatar: "https://i.pravatar.cc/150?u=carla",
      isExpanded: true,
      children: [
        {
          id: "6",
          name: "Corey Lipshutz",
          role: "Project Manager",
          department: "Team Project",
          avatar: "https://i.pravatar.cc/150?u=corey",
          isExpanded: false,
          children: [],
        },
      ],
    },
  ],
};

const OrgNode = ({ node, toggleNode }: { node: OrgNodeData; toggleNode: (id: string) => void }) => {
  const hasChildren = node.children !== undefined;

  return (
    <motion.div layout className="flex flex-col items-center">
      {/* Node Card */}
      <motion.div layout className="relative">
        {node.isRoot ? (
          <div className="border border-gray-300 dark:border-gray-700 rounded-full px-6 py-2.5 text-sm font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-900 relative z-10">
            {node.name}
          </div>
        ) : (
          <div className="border border-gray-300 dark:border-gray-700 rounded-2xl p-6 w-44 flex flex-col items-center text-center bg-white dark:bg-gray-900 relative z-10">
            <Avatar src={node.avatar} size="lg" className="mb-3" />
            <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-0.5">{node.name}</h3>
            {node.role && <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2">{node.role}</p>}
            {node.department && <p className="text-[10px] font-semibold text-gray-300 dark:text-gray-600">{node.department}</p>}
          </div>
        )}

        {/* Toggle Button */}
        {hasChildren && (
          <button
            onClick={() => toggleNode(node.id)}
            className="w-5 h-5 rounded-full bg-[#0FAF7A] text-white flex items-center justify-center absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-20 border-2 border-white dark:border-gray-900 hover:scale-110 transition-transform"
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
  const [orgData, setOrgData] = React.useState<OrgNodeData>(initialOrgData);

  const toggleNodeDeep = (node: OrgNodeData, id: string): OrgNodeData => {
    if (node.id === id) {
      return { ...node, isExpanded: !node.isExpanded };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map((child) => toggleNodeDeep(child, id)),
      };
    }
    return node;
  };

  const handleToggle = (id: string) => {
    setOrgData((prev) => toggleNodeDeep(prev, id));
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-8 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-8 bg-white dark:bg-gray-900">
          
          <div className="border border-gray-300 dark:border-gray-700 rounded-2xl p-8 flex flex-col bg-white dark:bg-gray-900 min-h-[600px] overflow-x-auto">
            {/* Header */}
            <div className="pb-6 border-b border-gray-300 dark:border-gray-700 mb-12">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                ORG Chart
              </h2>
            </div>

            {/* Tree Container */}
            <div className="flex justify-center min-w-[800px] pb-16">
              <OrgNode node={orgData} toggleNode={handleToggle} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
