"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineLink,
  HiOutlineXMark,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  FaSlack,
  FaGoogle,
  FaMicrosoft,
  FaDollarSign,
  FaVideo,
} from "react-icons/fa";

interface IntegrationItem {
  id: string;
  name: string;
  category: "Communication" | "Productivity" | "Finance";
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  connected: boolean;
  isSyncing?: boolean;
}

const INITIAL_INTEGRATIONS: IntegrationItem[] = [
  {
    id: "int-slack",
    name: "Slack Integration",
    category: "Communication",
    description: "Receive instant notifications for time-off requests, task completion, and announcements directly in channels.",
    icon: <FaSlack className="text-white text-xl" />,
    iconBg: "bg-red-500",
    connected: true,
  },
  {
    id: "int-google",
    name: "Google Workspace",
    category: "Productivity",
    description: "Sync company meetings with Google Calendar, manage drive files, and automatically import profile avatars.",
    icon: <FaGoogle className="text-white text-lg" />,
    iconBg: "bg-blue-600",
    connected: false,
  },
  {
    id: "int-teams",
    name: "Microsoft Teams",
    category: "Communication",
    description: "Broadcast checklist milestones and recruiter comments straight into MS Teams conversations.",
    icon: <FaMicrosoft className="text-white text-lg" />,
    iconBg: "bg-indigo-600",
    connected: false,
  },
  {
    id: "int-quickbooks",
    name: "QuickBooks Finance",
    category: "Finance",
    description: "Export processed monthly timesheets and payroll allowances to QuickBooks journals automatically.",
    icon: <FaDollarSign className="text-white text-lg" />,
    iconBg: "bg-emerald-600",
    connected: false,
  },
  {
    id: "int-gusto",
    name: "Gusto Payroll",
    category: "Finance",
    description: "Sync your candidate details, active employee statuses, and tax codes directly for monthly salaries.",
    icon: <FaDollarSign className="text-white text-lg" />,
    iconBg: "bg-orange-500",
    connected: false,
  },
  {
    id: "int-zoom",
    name: "Zoom Video Meetings",
    category: "Productivity",
    description: "Schedule candidate screenings and onboarding training sessions with automatically generated meeting links.",
    icon: <FaVideo className="text-white text-sm" />,
    iconBg: "bg-sky-500",
    connected: false,
  },
];

export default function IntegrationsHelpPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [integrations, setIntegrations] = React.useState<IntegrationItem[]>(INITIAL_INTEGRATIONS);
  
  // Modal state for disconnecting
  const [confirmDisconnectItem, setConfirmDisconnectItem] = React.useState<IntegrationItem | null>(null);
  const [isDisconnecting, setIsDisconnecting] = React.useState(false);

  const handleConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, isSyncing: true };
        }
        return item;
      })
    );

    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            toast.success(`Successfully connected to ${item.name}!`);
            return { ...item, isSyncing: false, connected: true };
          }
          return item;
        })
      );
    }, 1200);
  };

  const triggerDisconnectConfirm = (item: IntegrationItem) => {
    setConfirmDisconnectItem(item);
  };

  const handleDisconnect = () => {
    if (!confirmDisconnectItem) return;
    setIsDisconnecting(true);

    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((item) => {
          if (item.id === confirmDisconnectItem.id) {
            toast.info(`Disconnected ${item.name}`);
            return { ...item, connected: false };
          }
          return item;
        })
      );
      setIsDisconnecting(false);
      setConfirmDisconnectItem(null);
    }, 800);
  };

  const categories = ["All", "Communication", "Productivity", "Finance"];

  const filteredIntegrations = integrations.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <span className="text-gray-400">Integrations</span>
          </div>
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search third-party integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-11 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start max-w-6xl w-full">
        {/* Left Side: Integrations Grid Sandbox */}
        <div className="flex-1 w-full flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
              <span>Third-Party Integrations Sandbox</span>
              <HiOutlineLink className="text-teal-600 dark:text-teal-400 text-lg" />
            </div>

            {/* Category selection filters */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-all cursor-pointer border ${
                    selectedCategory === cat
                      ? "bg-teal-600 border-teal-700 text-white shadow-sm"
                      : "bg-white border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-900 dark:bg-gray-900 dark:text-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredIntegrations.map((item) => (
              <Card
                key={item.id}
                className="p-5 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center shadow-sm`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <h3 className="text-xs md:text-sm font-extrabold text-gray-900 dark:text-white leading-none">
                        {item.name}
                      </h3>
                      {item.connected ? (
                        <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-md flex items-center gap-0.5 animate-fadeIn">
                          <HiOutlineCheckCircle /> Connected
                        </span>
                      ) : (
                        <span className="text-[9px] font-extrabold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                          Not Connected
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-405 dark:text-gray-500 leading-relaxed font-semibold">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-50 dark:border-gray-850 pt-4">
                  {item.connected ? (
                    <>
                      <button
                        onClick={() => triggerDisconnectConfirm(item)}
                        className="px-3 h-8 border border-red-200 dark:border-red-950 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 rounded-lg text-[10px] font-black transition-all cursor-pointer"
                      >
                        Disconnect
                      </button>
                      <button
                        onClick={() => toast.success(`${item.name} settings updated.`)}
                        className="px-3 h-8 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-850 dark:hover:bg-gray-800 dark:text-white rounded-lg text-[10px] font-black transition-all cursor-pointer"
                      >
                        Configure
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleConnect(item.id)}
                      disabled={item.isSyncing}
                      className="px-4.5 h-8 bg-teal-650 hover:bg-teal-700 disabled:opacity-50 text-white rounded-lg text-[10px] font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      {item.isSyncing ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Connecting...</span>
                        </>
                      ) : (
                        <span>Connect</span>
                      )}
                    </button>
                  )}
                </div>
              </Card>
            ))}

            {filteredIntegrations.length === 0 && (
              <div className="col-span-2 text-center py-12 text-xs font-semibold text-gray-400 dark:text-gray-500">
                No integrations match your filter.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Informational Documentation */}
        <div className="w-full xl:w-80 flex flex-col gap-6">
          <div className="text-base font-bold text-gray-900 dark:text-white">
            Connection Guide
          </div>

          <Card className="p-6 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-sm leading-relaxed text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium rounded-2xl flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h4 className="text-xs md:text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                Connecting Third-Party Services
              </h4>
              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450">
                Peoplely HR supports seamless integrations with a variety of third-party applications to streamline your workflows. By connecting your tools, you can automate data syncing and reduce manual entry.
              </p>
            </div>

            <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-850 pt-4">
              <h4 className="text-xs md:text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                Setup Directions
              </h4>
              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450 mb-1">
                To set up a new integration:
              </p>
              <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-gray-500 dark:text-gray-450 font-bold">
                <li>Navigate to <strong className="text-teal-600">Settings &gt; Integrations</strong>.</li>
                <li>Find the target tool in the list.</li>
                <li>Click <strong className="text-teal-650">Connect</strong> to launch the authorization popup.</li>
                <li>Log in to grant read/write directory permissions.</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>

      {/* Disconnect Confirmation Modal */}
      {confirmDisconnectItem && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <Card className="max-w-md w-full p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl flex flex-col gap-5 animate-scaleUp">
            <div className="flex justify-between items-start">
              <h3 className="text-sm md:text-base font-extrabold text-gray-900 dark:text-white">
                Disconnect {confirmDisconnectItem.name}?
              </h3>
              <button
                onClick={() => setConfirmDisconnectItem(null)}
                className="text-gray-400 hover:text-gray-650 cursor-pointer"
              >
                <HiOutlineXMark className="text-lg" />
              </button>
            </div>

            <p className="text-xs text-gray-455 dark:text-gray-500 font-semibold leading-relaxed">
              Are you sure you want to sever this connection? Severing it will disable immediate automatic synchronization of payroll databases, time-off requests, and applicant stages for this platform.
            </p>

            <div className="flex justify-end gap-3 border-t border-gray-50 dark:border-gray-850 pt-4">
              <button
                onClick={() => setConfirmDisconnectItem(null)}
                className="px-4.5 h-10 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white rounded-xl text-xs font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDisconnect}
                disabled={isDisconnecting}
                className="px-4.5 h-10 bg-red-600 hover:bg-red-750 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isDisconnecting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Disconnecting...</span>
                  </>
                ) : (
                  <span>Disconnect Integration</span>
                )}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
