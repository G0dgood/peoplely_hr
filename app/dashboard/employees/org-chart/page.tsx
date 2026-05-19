"use client";

import * as React from "react";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface OrgNodeProps {
  name: string;
  role: string;
  office: string;
  avatar: string;
  isRoot?: boolean;
  hasChildren?: boolean;
  isExpanded?: boolean;
}

function OrgNode({ name, role, office, avatar, isRoot, hasChildren, isExpanded = true }: OrgNodeProps) {
  return (
    <div className="flex flex-col items-center relative">
      {/* Top Connector */}
      {!isRoot && (
        <div className="w-px h-8 bg-gray-200 dark:bg-gray-800 mb-2" />
      )}

      <div className="relative group">
        <Card className={`p-6 flex flex-col items-center text-center min-w-[200px] border-gray-100 dark:border-gray-800 shadow-sm transition-all ${isRoot ? 'bg-white dark:bg-gray-900 border-2' : ''}`}>
          <Avatar src={avatar} size="lg" className="mb-4 ring-2 ring-gray-50 dark:ring-gray-800" />
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{name}</h4>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{role}</p>
          <p className="text-[10px] text-gray-400">{office}</p>
        </Card>

        {/* Bottom Expand/Collapse Toggle */}
        {hasChildren && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
            <button className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-gray-900">
              {isExpanded ? <HiOutlineMinus className="text-xs" /> : <HiOutlinePlus className="text-xs" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrgChartPage() {
  return (
    <div className="flex flex-col gap-8 p-8 min-h-full">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ORG Chart</h1>
      </div>

      <Card className="flex-1 p-12 bg-white dark:bg-gray-900/50 flex flex-col items-center overflow-auto">
        {/* Office Node */}
        <div className="mb-12 flex flex-col items-center relative">
          <div className="px-6 py-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 shadow-sm relative z-10">
            Unpixel Office
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
            <button className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-gray-900">
              <HiOutlineMinus className="text-xs" />
            </button>
          </div>
          <div className="w-px h-16 bg-gray-200 dark:bg-gray-800 mt-2" />
        </div>

        {/* Root Level Tree */}
        <div className="relative flex flex-col items-center">
          {/* Horizontal Line for Level 1 */}
          <div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-gray-200 dark:bg-gray-800" />
          
          <div className="flex gap-12 relative">
            <OrgNode 
              name="Angeline Beier" 
              role="CEO" 
              office="Pixel Office" 
              avatar="https://i.pravatar.cc/150?u=angeline" 
              hasChildren 
            />
            <OrgNode 
              name="Alfredo George" 
              role="CTO" 
              office="Pixel Office" 
              avatar="https://i.pravatar.cc/150?u=alfredo" 
              hasChildren 
            />
            <OrgNode 
              name="Davis Levin" 
              role="CFO" 
              office="Pixel Office" 
              avatar="https://i.pravatar.cc/150?u=davis" 
              hasChildren 
            />
            
            {/* Branch with child */}
            <div className="flex flex-col items-center">
              <OrgNode 
                name="Carla Workman" 
                role="CPO" 
                office="Pixel Office" 
                avatar="https://i.pravatar.cc/150?u=carla" 
                hasChildren 
              />
              
              {/* Level 2 child */}
              <div className="mt-8 flex flex-col items-center">
                <OrgNode 
                  name="Corey Lipshutz" 
                  role="Project Manager" 
                  office="Team Project" 
                  avatar="https://i.pravatar.cc/150?u=corey" 
                  hasChildren={false} 
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
