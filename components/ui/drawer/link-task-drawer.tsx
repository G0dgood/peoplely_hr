import * as React from "react";
import { HiOutlineXMark, HiOutlineMagnifyingGlass, HiOutlineChevronRight } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface LinkTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  templateName?: string;
  onSave?: (selectedTaskIds: string[]) => void;
}

const AVAILABLE_TASKS = [
  { id: "t1", name: "Prepare company welcome kit", tag: "CHECKLIST" },
  { id: "t2", name: "Prepare Workstation", tag: "CHECKLIST" },
  { id: "t3", name: "Submit Document - Soft copy of ID card", tag: "UPLOAD" },
  { id: "t4", name: "Learn team members faces before joining", tag: "UPLOAD" },
  { id: "t5", name: "Provide your Home Address", tag: "EMPLOYEE INFORMATION" },
  { id: "t6", name: "Collect Documents - Hard Copies", tag: "UPLOAD" },
  { id: "t7", name: "IT Security Training", tag: "CHECKLIST" },
  { id: "t8", name: "Bank Account Details", tag: "EMPLOYEE INFORMATION" },
];

export function LinkTaskDrawer({ isOpen, onClose, templateName, onSave }: LinkTaskDrawerProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTasks, setSelectedTasks] = React.useState<string[]>([]);

  const filteredTasks = AVAILABLE_TASKS.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTask = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave(selectedTasks);
    }
    onClose();
    // Reset state after closing
    setTimeout(() => {
      setSelectedTasks([]);
      setSearchQuery("");
    }, 300);
  };

  const getTagStyle = (tag: string) => {
    if (tag === "CHECKLIST") return "bg-[#E8FAF4] text-[#0FAF7A] dark:bg-[#0FAF7A]/15 dark:text-[#0FAF7A]";
    if (tag === "UPLOAD") return "bg-[#FFF2E8] text-[#FA541C] dark:bg-[#FA541C]/15 dark:text-[#FA541C]";
    return "bg-[#E6F7FF] text-[#1890FF] dark:bg-[#1890FF]/15 dark:text-[#1890FF]";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 "
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full flex flex-col shadow-2xl transition-all duration-300">

        {/* Dismiss button on left edge */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer text-gray-700 dark:text-gray-350"
          >
            <HiOutlineChevronRight className="text-xl" />
          </button>
        </div>

        <div className="flex items-center justify-between p-8 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Link Tasks</h2>
            {templateName && (
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-1">
                to {templateName}
              </p>
            )}
          </div>
        </div>

        <div className="p-8 flex-1 overflow-y-auto">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-gray-50 dark:bg-gray-800/50 border-transparent focus:border-primary text-xs font-semibold rounded-xl"
            containerClassName="mb-6"
            rightIcon={<HiOutlineMagnifyingGlass className="text-gray-400 text-lg" />}
          />

          <div className="flex flex-col gap-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-colors ${selectedTasks.includes(task.id)
                  ? "border-primary bg-primary/5 dark:bg-primary/10"
                  : "border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
              >
                <div className="pointer-events-none">
                  <Checkbox checked={selectedTasks.includes(task.id)} onChange={() => { }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{task.name}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider shrink-0 ${getTagStyle(task.tag)}`}>
                  {task.tag}
                </span>
              </div>
            ))}

            {filteredTasks.length === 0 && (
              <div className="text-center py-10 text-xs font-semibold text-gray-400">
                No tasks found.
              </div>
            )}
          </div>
        </div>

        <div className="p-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900">
          <span className="text-xs font-bold text-gray-500">
            {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose} className="px-6 font-bold h-12 border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} className="px-6 font-bold h-12 bg-[#11131A] dark:bg-white text-white dark:text-gray-900 hover:opacity-90" disabled={selectedTasks.length === 0}>
              Link Tasks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
