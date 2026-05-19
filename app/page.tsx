import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Sidebar, SidebarItem, SidebarGroup } from "@/components/ui/sidebar";
import { ModalShowcase } from "@/components/ui/modal-showcase";
import { Alert } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio } from "@/components/ui/radio";
import { FaEye, FaEyeSlash, FaCheckCircle, FaPlus, FaGoogle, FaApple, FaMoon, FaSun, FaBookmark, FaEllipsisH, FaBriefcase, FaEnvelope, FaChevronRight, FaChartPie, FaUsers, FaClock, FaCalendarCheck, FaMoneyBillWave, FaChartLine, FaQuestionCircle, FaCog, FaChevronDown, FaBuilding, FaSearch, FaBell, FaMinus, FaEdit, FaTrash, FaSort, FaThLarge, FaAngleDoubleLeft, FaShieldAlt, FaCompass, FaUserCheck, FaRocket, FaCheck, FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { NotificationItem, NotificationCard } from "@/components/ui/notification";
import { TaskBoard, TaskItem } from "@/components/ui/task-board";
import { TaskAccordionItem } from "@/components/ui/task-accordion";
import { TreeConnector } from "@/components/ui/tree-connector";
import Link from "next/link";

interface TreeSubmenuItemProps {
  type: "T" | "L" | "I";
  active?: boolean;
  children: React.ReactNode;
  theme?: "light" | "dark";
}

function TreeSubmenuItem({ type, active, children, theme = "light" }: TreeSubmenuItemProps) {
  const isDark = theme === "dark";
  return (
    <div className="flex items-stretch select-none h-10">
      <div className="flex flex-col items-center shrink-0 w-8">
        <TreeConnector type={type} className={isDark ? "stroke-gray-800" : "stroke-gray-200"} />
      </div>
      <div className="flex-1 flex items-center gap-2">
        {active && (
          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
        )}
        <span className={`text-body-sm font-semibold transition-colors ${
          active 
            ? "text-primary" 
            : isDark 
              ? "text-gray-400 hover:text-white" 
              : "text-gray-500 hover:text-gray-900"
        }`}>
          {children}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const demoTasks: TaskItem[] = [
    {
      id: "1",
      title: "Please read through company welcome presentation slides",
      dueDate: "24 Feb 2023",
      assignee: { name: "Jennifer Lane", avatar: "https://i.pravatar.cc/150?u=jennifer" },
      completed: true
    },
    {
      id: "2",
      title: "Provide your personal details",
      dueDate: "24 Feb 2023",
      assignee: { name: "Evelyn Phillips", avatar: "https://i.pravatar.cc/150?u=evelyn" },
      completed: false
    },
    {
      id: "3",
      title: "Upload details of address",
      dueDate: "26 Feb 2023",
      assignee: { name: "Michelle Flores", avatar: "https://i.pravatar.cc/150?u=michelle" },
      completed: false
    },
    {
      id: "4",
      title: "Personal bank details",
      dueDate: "26 Feb 2023",
      assignee: { name: "Diane Curtis", avatar: "https://i.pravatar.cc/150?u=diane" },
      completed: false
    },
    {
      id: "5",
      title: "Submit Document: Emergency Contact",
      dueDate: "26 Feb 2023",
      assignee: { name: "Christian Phillips", avatar: "https://i.pravatar.cc/150?u=christian" },
      completed: false
    },
    {
      id: "6",
      title: "Online Assessment - Phase II",
      dueDate: "26 Feb 2023",
      assignee: { name: "Charlie Smith", avatar: "https://i.pravatar.cc/150?u=charlie" },
      completed: false
    },
    {
      id: "7",
      title: "Review internal communication policy",
      dueDate: "26 Feb 2023",
      assignee: { name: "Austin Colbert", avatar: "https://i.pravatar.cc/150?u=austin" },
      completed: false
    },
    {
      id: "8",
      title: "Setup workstation preferences",
      dueDate: "26 Feb 2023",
      assignee: { name: "Harrison Cobb", avatar: "https://i.pravatar.cc/150?u=harrison" },
      completed: false
    },
    {
      id: "9",
      title: "Provide your tax declaration",
      dueDate: "26 Feb 2023",
      assignee: { name: "Jared Lane", avatar: "https://i.pravatar.cc/150?u=jared" },
      completed: false
    },
    {
      id: "10",
      title: "Provide your Emergency Contact",
      dueDate: "26 Feb 2023",
      assignee: { name: "Marilyn Alcantara", avatar: "https://i.pravatar.cc/150?u=marilyn" },
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black p-8 sm:p-20 font-sans">
      <main className="max-w-4xl mx-auto flex flex-col gap-12">
        <header className="border-b pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="h1 mb-2">Design System</h1>
            <p className="text-body-xl text-gray-500">
              Typography and Colors style guide.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="px-5 py-2.5 rounded-xl bg-[#11131A] text-white hover:bg-black font-bold text-body-sm transition-colors shadow-sm">
              View Login Screen
            </Link>
            <Link href="/register" className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold text-body-sm transition-colors shadow-sm bg-white">
              View Register Screen
            </Link>
          </div>
        </header>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Colors</h2>

          <div className="flex flex-col gap-8">
            <div>
              <h3 className="h3 mb-4">Main</h3>
              <div className="flex flex-wrap gap-4">
                <div className="w-32 h-32 rounded-lg bg-primary shadow-sm flex items-end p-2">
                  <span className="text-white text-body-xs font-bold bg-black/20 px-2 py-1 rounded">Primary</span>
                </div>
                <div className="w-32 h-32 rounded-lg bg-secondary shadow-sm flex items-end p-2">
                  <span className="text-black text-body-xs font-bold bg-white/50 px-2 py-1 rounded">Secondary</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="h3 mb-4">Alerts</h3>
              <div className="flex flex-wrap gap-4">
                <div className="w-32 h-32 rounded-lg bg-success shadow-sm flex items-end p-2">
                  <span className="text-white text-body-xs font-bold bg-black/20 px-2 py-1 rounded">Success</span>
                </div>
                <div className="w-32 h-32 rounded-lg bg-warning shadow-sm flex items-end p-2">
                  <span className="text-black text-body-xs font-bold bg-white/50 px-2 py-1 rounded">Warning</span>
                </div>
                <div className="w-32 h-32 rounded-lg bg-error shadow-sm flex items-end p-2">
                  <span className="text-white text-body-xs font-bold bg-black/20 px-2 py-1 rounded">Error</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="h3 mb-4">Greyscale</h3>
              <div className="flex flex-wrap gap-4">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className={`w-20 h-20 rounded-lg shadow-sm flex items-end p-2 bg-gray-${shade}`}>
                    <span className={`text-body-xs font-bold px-1 rounded ${shade > 400 ? 'text-white bg-black/20' : 'text-black bg-white/50'}`}>{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="h3 mb-4">Additional Colors</h3>
              <div className="flex flex-wrap gap-4">
                <div className="w-24 h-24 rounded-lg bg-white border shadow-sm flex items-end p-2">
                  <span className="text-black text-body-xs font-bold bg-gray-100 px-2 py-1 rounded">White</span>
                </div>
                <div className="w-24 h-24 rounded-lg bg-brand-orange shadow-sm flex items-end p-2">
                  <span className="text-white text-body-xs font-bold bg-black/20 px-2 py-1 rounded">Orange</span>
                </div>
                <div className="w-24 h-24 rounded-lg bg-brand-blue shadow-sm flex items-end p-2">
                  <span className="text-white text-body-xs font-bold bg-black/20 px-2 py-1 rounded">Blue</span>
                </div>
                <div className="w-24 h-24 rounded-lg bg-brand-purple shadow-sm flex items-end p-2">
                  <span className="text-white text-body-xs font-bold bg-black/20 px-2 py-1 rounded">Purple</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Typography</h2>
          <h2 className="h2">Manrope</h2>
          <p className="text-body-lg text-gray-500">
            Download Font: <a href="https://fonts.google.com/specimen/Manrope" className="underline">https://fonts.google.com/specimen/Manrope</a>
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            {['Bold', 'Semibold', 'Medium', 'Regular'].map((weight) => (
              <div key={weight} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-32 flex flex-col items-center justify-center gap-2">
                <span className={`text-4xl ${weight === 'Bold' ? 'font-bold' :
                  weight === 'Semibold' ? 'font-semibold' :
                    weight === 'Medium' ? 'font-medium' : 'font-normal'
                  }`}>Aa</span>
                <div className="text-center">
                  <p className="text-body-xs font-semibold">Manrope</p>
                  <p className="text-body-xs text-gray-500">{weight}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h3 className="h3 border-b pb-4">Heading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h1 className="h1 mb-2">Heading 1</h1>
              <p className="text-body-xs text-gray-500">Heading 1 / Bold / 48px</p>
            </div>
            <div>
              <h2 className="h2 mb-2">Heading 2</h2>
              <p className="text-body-xs text-gray-500">Heading 2 / Bold / 40px</p>
            </div>
            <div>
              <h3 className="h3 mb-2">Heading 3</h3>
              <p className="text-body-xs text-gray-500">Heading 3 / Bold / 32px</p>
            </div>
            <div>
              <h4 className="h4 mb-2">Heading 4</h4>
              <p className="text-body-xs text-gray-500">Heading 4 / Bold / 24px</p>
            </div>
            <div>
              <h5 className="h5 mb-2">Heading 5</h5>
              <p className="text-body-xs text-gray-500">Heading 5 / Bold / 20px</p>
            </div>
            <div>
              <h6 className="h6 mb-2">Heading 6</h6>
              <p className="text-body-xs text-gray-500">Heading 6 / Bold / 18px</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h3 className="h3 border-b pb-4">Body</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-body-xl font-bold mb-2">Body XLarge</p>
              <p className="text-body-xl mb-2 text-gray-600">The quick brown fox jumps over the lazy dog</p>
              <p className="text-body-xs text-gray-400">Body XLarge / Bold / 18px</p>
            </div>
            <div>
              <p className="text-body-lg font-bold mb-2">Body Large</p>
              <p className="text-body-lg mb-2 text-gray-600">The quick brown fox jumps over the lazy dog</p>
              <p className="text-body-xs text-gray-400">Body Large / Bold / 16px</p>
            </div>
            <div>
              <p className="text-body-md font-bold mb-2">Body Medium</p>
              <p className="text-body-md mb-2 text-gray-600">The quick brown fox jumps over the lazy dog</p>
              <p className="text-body-xs text-gray-400">Body Medium / Bold / 14px</p>
            </div>
            <div>
              <p className="text-body-sm font-bold mb-2">Body Small</p>
              <p className="text-body-sm mb-2 text-gray-600">The quick brown fox jumps over the lazy dog</p>
              <p className="text-body-xs text-gray-400">Body Small / Bold / 12px</p>
            </div>
            <div>
              <p className="text-body-xs font-bold mb-2">Body XSmall</p>
              <p className="text-body-xs mb-2 text-gray-600">The quick brown fox jumps over the lazy dog</p>
              <p className="text-body-xs text-gray-400">Body XSmall / Bold / 10px</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div>
            <h2 className="h2 border-b pb-4">Form & Button</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="flex flex-col gap-6">
                <h3 className="h3">General Form</h3>
                <Input label="Title Field *" placeholder="Input area" rightIcon={<FaEyeSlash />} />
                <Input label="Title Field *" placeholder="Input area" rightIcon={<FaEyeSlash />} className="border-primary ring-1 ring-primary" />
                <Input label="Title Field *" placeholder="Input area" rightIcon={<FaCheckCircle className="text-success" />} className="border-success" />
                <Input label="Title Field *" placeholder="Input area" rightIcon={<FaEyeSlash />} error="The email you entered is not registered, please check again." />
                <Input label="Title Field *" type="password" defaultValue="••••••••••" rightIcon={<FaEyeSlash />} />
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="h3">General Button</h3>
                <div className="flex flex-col gap-4 max-w-sm">
                  <Button variant="primary" leftIcon={<FaPlus />} rightIcon={<FaPlus />}>Label Name</Button>
                  <Button variant="outline" leftIcon={<FaPlus />} rightIcon={<FaPlus />}>Label Name</Button>
                  <Button variant="ghost" leftIcon={<FaPlus />} rightIcon={<FaPlus />}>Label Name</Button>
                </div>

                <h3 className="h3 mt-8">Other Button</h3>
                <div className="flex flex-col gap-4 max-w-sm">
                  <Button variant="outline" className="justify-center" leftIcon={<FaGoogle className="text-red-500" />}>Google</Button>
                  <Button variant="outline" className="justify-center" leftIcon={<FaApple />}>Apple</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Components & Variants</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col gap-6">
              <h3 className="h3">Avatar</h3>
              <div className="flex items-center gap-4">
                <Avatar size="sm" fallback="SM" />
                <Avatar size="md" fallback="MD" />
                <Avatar size="lg" fallback="LG" />
                <Avatar size="xl" fallback="XL" />
              </div>
              <div className="flex items-center gap-4">
                <Avatar size="sm" src="https://i.pravatar.cc/150?u=1" />
                <Avatar size="md" src="https://i.pravatar.cc/150?u=2" />
                <Avatar size="lg" src="https://i.pravatar.cc/150?u=3" />
                <Avatar size="xl" src="https://i.pravatar.cc/150?u=4" />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="h3">Chips</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="gray">Gray</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="primary" tinted>Primary</Badge>
                  <Badge variant="success" tinted>Success</Badge>
                  <Badge variant="warning" tinted>Warning</Badge>
                  <Badge variant="error" tinted>Error</Badge>
                  <Badge variant="gray" tinted>Gray</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Other</h2>

          <div className="flex flex-col gap-12">
            <div>
              <h3 className="h3 mb-6">Component Label</h3>
              <div className="flex flex-col gap-4 max-w-sm">
                <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900">
                    <FaSun />
                  </div>
                  <span className="font-bold text-gray-900 text-body-lg">Light Mode</span>
                </div>
                <div className="flex items-center gap-4 bg-gray-900 rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                    <FaMoon />
                  </div>
                  <span className="font-bold text-white text-body-lg">Dark Mode</span>
                </div>
                <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900">
                    <FaBookmark />
                  </div>
                  <span className="font-bold text-gray-900 text-body-lg">Label</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="h3 mb-6">Header Title</h3>
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <div>
                    <h1 className="h1">Header Title</h1>
                    <p className="text-gray-500 text-body-sm mt-2">The style guide provides to change stylistic for your design site.</p>
                  </div>
                  <Badge variant="gray">www.website.co</Badge>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <div>
                    <h2 className="h4 font-bold">HR Management Platform</h2>
                    <p className="text-gray-500 text-body-xs mt-1">12,000+ active users</p>
                  </div>
                  <Badge variant="gray">www.peoplely.co</Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="h3 mb-6">Marketing Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Card: Amazing Platform! */}
                <div className="relative h-[600px] overflow-hidden shadow-lg group">
                  {/* Note: Using an Unsplash placeholder for demonstration */}
                  <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="People working together" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] via-[#11131A]/60 to-transparent opacity-90" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-[#10B981] font-bold text-lg">H</div>
                      <span className="text-white text-body-xs font-semibold tracking-wide">HRDashboard</span>
                    </div>
                    <h2 className="text-white text-4xl font-bold mb-4">Amazing Platform!</h2>
                    <p className="text-gray-300 text-body-sm leading-relaxed mb-8">
                      "The human resource platform helped streamline our hiring process and saved us a significant amount of time and effort."
                    </p>

                    {/* Carousel Indicators */}
                    <div className="flex gap-2 mb-8">
                      <div className="h-1 flex-1 bg-white rounded-full"></div>
                      <div className="h-1 flex-1 bg-white/30 rounded-full"></div>
                      <div className="h-1 flex-1 bg-white/30 rounded-full"></div>
                      <div className="h-1 flex-1 bg-white/30 rounded-full"></div>
                    </div>

                    {/* Profile */}
                    <div className="flex items-center gap-3">
                      <Avatar size="md" src="https://i.pravatar.cc/150?u=katie" fallback="KW" />
                      <div>
                        <p className="text-white text-body-sm font-bold">Katie Waters</p>
                        <p className="text-gray-400 text-xs">Head Resource Management Fintech Company</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Card: Let's empower... */}
                <div className="relative h-[600px] overflow-hidden shadow-lg flex flex-col group">
                  <div className="flex-1 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="People laughing" />
                  </div>
                  <div className="h-1.5 bg-[#10B981] w-full" />
                  <div className="bg-[#11131A] p-10 flex flex-col justify-center h-72">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="text-[#10B981] font-bold text-lg">H</div>
                      <span className="text-white text-body-xs font-semibold tracking-wide">HRDashboard</span>
                    </div>
                    <h2 className="text-white text-3xl font-bold leading-tight mb-4">
                      Let's empower your<br />employees today.
                    </h2>
                    <p className="text-gray-400 text-body-sm">
                      We help to complete all your conveyancing needs easily
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Profile Card */}
            <div className="flex flex-col gap-4">
              <h3 className="h3">Profile Card</h3>
              <Card className="max-w-sm">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <Avatar size="lg" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                  <div className="flex flex-col flex-1">
                    <CardTitle className="text-body-lg font-bold">Guy Watson</CardTitle>
                    <CardDescription className="text-body-sm text-gray-500">guy.watson@example.com</CardDescription>
                  </div>
                  <Button variant="ghost" className="p-2 h-auto text-gray-400">
                    <FaEllipsisH />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-body-sm text-gray-600">
                      <FaBriefcase className="text-gray-400" />
                      <span>Senior Product Designer</span>
                    </div>
                    <div className="flex items-center gap-3 text-body-sm text-gray-600">
                      <FaEnvelope className="text-gray-400" />
                      <span>Product Team</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-gray-100">
                  <Button variant="outline" className="w-full justify-center">View Profile</Button>
                </CardFooter>
              </Card>
            </div>

            {/* List Item Card */}
            <div className="flex flex-col gap-4">
              <h3 className="h3">List Row Card</h3>
              <Card className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <Avatar size="md" fallback="JD" />
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-body-sm">Jane Doe</span>
                    <span className="text-gray-500 text-body-xs">Frontend Engineer</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="success" tinted>Active</Badge>
                  <Button variant="ghost" className="p-2 h-auto text-gray-400 rounded-full">
                    <FaChevronRight />
                  </Button>
                </div>
              </Card>

              {/* Dark Mode Variation */}
              <Card className="flex items-center justify-between p-4 bg-gray-900 border-gray-800 text-white">
                <div className="flex items-center gap-4">
                  <Avatar size="md" fallback="JD" />
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-body-sm">Jane Doe</span>
                    <span className="text-gray-400 text-body-xs">Frontend Engineer</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="success" tinted>Active</Badge>
                  <Button variant="ghost" className="p-2 h-auto text-gray-500 hover:text-white hover:bg-gray-800 rounded-full">
                    <FaChevronRight />
                  </Button>
                </div>
              </Card>
            </div>

            {/* Action/Summary Card */}
            <div className="flex flex-col gap-4">
              <h3 className="h3">Summary Card</h3>
              <Card className="max-w-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl">
                      <FaBriefcase />
                    </div>
                    <Badge variant="primary" tinted>Full Time</Badge>
                  </div>
                  <h4 className="h4 font-bold mb-1">Senior UX Researcher</h4>
                  <p className="text-body-sm text-gray-500 mb-6">San Francisco, CA • Remote</p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="gray" tinted>Design</Badge>
                    <Badge variant="gray" tinted>Research</Badge>
                    <Badge variant="gray" tinted>Senior</Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 p-6 flex gap-3">
                  <Button variant="primary" className="flex-1 justify-center">Apply Now</Button>
                  <Button variant="outline" className="flex-1 justify-center">Save Job</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Sidebar & Menus</h2>

          <div className="flex flex-wrap gap-8 items-start justify-start xl:flex-nowrap overflow-x-auto pb-4">
            
            {/* COLUMN 1: SIDEBAR */}
            <div className="flex flex-col gap-4 shrink-0">
              <h3 className="text-body-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">Sidebar</h3>
              <div className="flex gap-6 items-start">
                
                {/* Light Mode Sidebar */}
                <div className="h-[800px] w-60 shadow-xl rounded-2xl overflow-hidden border border-gray-200 bg-white flex flex-col transition-all duration-300 hover:shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="text-primary font-bold text-lg flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">H</div>
                      <span className="font-bold tracking-wide text-gray-900 text-body-md">HR<span className="font-normal text-gray-500">Dashboard</span></span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50">
                      <FaAngleDoubleLeft />
                    </button>
                  </div>

                  <div className="px-4 py-3">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-2xl transition-colors shadow-sm text-body-sm">
                      <FaPlus className="text-xs" />
                      <span>Dashboard</span>
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-1">
                    <SidebarItem icon={<FaUsers />} hasSubmenu className="bg-transparent hover:bg-gray-50">Employees</SidebarItem>
                    <SidebarItem icon={<FaClock />} className="bg-transparent hover:bg-gray-50">Attendance</SidebarItem>
                    <SidebarItem icon={<FaCalendarCheck />} hasSubmenu className="bg-transparent hover:bg-gray-50">Time Off</SidebarItem>
                    <SidebarItem icon={<FaEllipsisH />} className="bg-transparent hover:bg-gray-50">Other menu</SidebarItem>
                    <SidebarItem icon={<FaMoneyBillWave />} hasSubmenu className="bg-transparent hover:bg-gray-50">Payroll</SidebarItem>
                    <SidebarItem icon={<FaChartLine />} hasSubmenu className="bg-transparent hover:bg-gray-50">Performance</SidebarItem>
                    <SidebarItem icon={<FaBriefcase />} hasSubmenu className="bg-transparent hover:bg-gray-50">Recruitment</SidebarItem>
                  </div>

                  <div className="mt-auto p-4 border-t border-gray-100 flex flex-col gap-2">
                    <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                      <div className="flex items-center gap-3">
                        <FaQuestionCircle className="text-lg" />
                        <span>Help Center</span>
                      </div>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-error text-white text-[10px] font-bold">1</span>
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm font-semibold rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                      <div className="flex items-center gap-3">
                        <FaCog className="text-lg" />
                        <span>Setting</span>
                      </div>
                    </button>
                    
                    {/* Light/Dark Toggle */}
                    <div className="flex items-center bg-gray-100 rounded-full p-1 mt-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-full text-xs font-bold bg-white text-gray-900 shadow-sm">
                        <FaSun className="text-amber-500" /> Light
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-full text-xs font-semibold text-gray-400 hover:text-gray-600">
                        <FaMoon /> Dark
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dark Mode Sidebar */}
                <div className="h-[800px] w-60 shadow-xl rounded-2xl overflow-hidden border border-gray-800 bg-[#11131A] text-white flex flex-col transition-all duration-300 hover:shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800/60">
                    <div className="flex items-center gap-2">
                      <div className="text-primary font-bold text-lg flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">H</div>
                      <span className="font-bold tracking-wide text-white text-body-sm">HR<span className="font-normal text-gray-400">Dashboard</span></span>
                    </div>
                    <button className="text-gray-500 hover:text-gray-300 transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800">
                      <FaAngleDoubleLeft />
                    </button>
                  </div>

                  <div className="px-4 py-3">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-2xl transition-colors shadow-sm text-body-sm">
                      <FaPlus className="text-xs" />
                      <span>Dashboard</span>
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-1">
                    <SidebarItem icon={<FaUsers />} hasSubmenu className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Employees</SidebarItem>
                    <SidebarItem icon={<FaClock />} className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Attendance</SidebarItem>
                    <SidebarItem icon={<FaCalendarCheck />} hasSubmenu className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Time Off</SidebarItem>
                    <SidebarItem icon={<FaEllipsisH />} className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Other menu</SidebarItem>
                    <SidebarItem icon={<FaMoneyBillWave />} hasSubmenu className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Payroll</SidebarItem>
                    <SidebarItem icon={<FaChartLine />} hasSubmenu className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Performance</SidebarItem>
                    <SidebarItem icon={<FaBriefcase />} hasSubmenu className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Recruitment</SidebarItem>
                  </div>

                  <div className="mt-auto p-4 border-t border-gray-800/60 flex flex-col gap-2">
                    <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold rounded-2xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                      <div className="flex items-center gap-3">
                        <FaQuestionCircle className="text-lg" />
                        <span>Help Center</span>
                      </div>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-error text-white text-[10px] font-bold">1</span>
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm font-semibold rounded-2xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                      <div className="flex items-center gap-3">
                        <FaCog className="text-lg" />
                        <span>Setting</span>
                      </div>
                    </button>
                    
                    {/* Light/Dark Toggle */}
                    <div className="flex items-center bg-gray-800 rounded-full p-1 mt-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-full text-xs font-semibold text-gray-400 hover:text-white">
                        <FaSun /> Light
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-full text-xs font-bold bg-gray-700 text-white shadow-sm">
                        <FaMoon className="text-amber-400" /> Dark
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* COLUMN 2: OTHER MENU */}
            <div className="flex flex-col gap-4 shrink-0">
              <h3 className="text-body-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">Other Menu</h3>
              <div className="flex gap-6 items-start">
                
                {/* Light Mode Other Menu */}
                <div className="w-60 shadow-xl rounded-2xl overflow-hidden border border-gray-100 bg-white p-4 flex flex-col gap-1 transition-all duration-300 hover:shadow-2xl">
                  <SidebarItem icon={<FaBuilding />} className="bg-transparent hover:bg-gray-50">Company Info</SidebarItem>
                  <SidebarItem icon={<FaBuilding />} className="bg-transparent hover:bg-gray-50">Offices</SidebarItem>
                  <SidebarItem icon={<FaEnvelope />} className="bg-transparent hover:bg-gray-50">Departments</SidebarItem>
                  <SidebarItem icon={<FaBriefcase />} className="bg-transparent hover:bg-gray-50">Job Titles</SidebarItem>
                  <SidebarItem icon={<FaCreditCard />} className="bg-transparent hover:bg-gray-50">Pay & Grade scale</SidebarItem>
                  <SidebarItem icon={<FaShieldAlt />} className="bg-transparent hover:bg-gray-50">Permissions</SidebarItem>
                  <SidebarItem icon={<FaPlus />} className="bg-transparent hover:bg-gray-50">Integrations</SidebarItem>
                  <SidebarItem icon={<FaCompass />} className="bg-transparent hover:bg-gray-50">Discovery Jobs</SidebarItem>
                  <SidebarItem icon={<FaUserCheck />} className="bg-transparent hover:bg-gray-50">Recruited</SidebarItem>
                  <SidebarItem icon={<FaRocket />} className="bg-transparent hover:bg-gray-50">Full Features</SidebarItem>
                </div>

                {/* Dark Mode Other Menu */}
                <div className="w-60 shadow-xl rounded-2xl overflow-hidden border border-gray-800 bg-[#11131A] text-white p-4 flex flex-col gap-1 transition-all duration-300 hover:shadow-2xl">
                  <SidebarItem icon={<FaBuilding />} className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Company Info</SidebarItem>
                  <SidebarItem icon={<FaBuilding />} className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Offices</SidebarItem>
                  <SidebarItem icon={<FaEnvelope />} className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Departments</SidebarItem>
                  <SidebarItem icon={<FaBriefcase />} className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Job Titles</SidebarItem>
                  <SidebarItem icon={<FaCreditCard />} className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Pay & Grade scale</SidebarItem>
                  <SidebarItem icon={<FaShieldAlt />} className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Permissions</SidebarItem>
                  <SidebarItem icon={<FaPlus />} className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Integrations</SidebarItem>
                  <SidebarItem icon={<FaCompass />} className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Discovery Jobs</SidebarItem>
                  <SidebarItem icon={<FaUserCheck />} className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Recruited</SidebarItem>
                  <SidebarItem icon={<FaRocket />} className="bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white">Full Features</SidebarItem>
                </div>

              </div>
            </div>

            {/* COLUMN 3: COMPONENT MENU */}
            <div className="flex flex-col gap-4 shrink-0 w-60">
              <h3 className="text-body-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">Component Menu</h3>
              
              <div className="flex flex-col gap-6">
                
                {/* Light Option 1: Selected / Checked state */}
                <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-md flex flex-col gap-1">
                  <button className="w-full flex items-center justify-between px-3 py-2.5 text-body-sm font-semibold rounded-xl text-gray-400 hover:bg-gray-50">
                    <span>Menu</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 text-body-sm font-bold rounded-xl bg-gray-50 text-gray-900">
                    <span>Menu</span>
                    <FaCheck className="text-primary text-xs" />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 text-body-sm font-semibold rounded-xl text-gray-400 hover:bg-gray-50">
                    <span>Menu</span>
                  </button>
                </div>

                {/* Light Option 2: Badge and Dot states */}
                <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-md flex flex-col gap-1">
                  <button className="w-full flex items-center justify-between px-3 py-2.5 text-body-sm font-semibold rounded-xl text-gray-700 bg-gray-50/50">
                    <span>Menu</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-error text-white text-[10px] font-bold">1</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 text-body-sm font-semibold rounded-xl text-gray-700 hover:bg-gray-50">
                    <span>Menu</span>
                    <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 text-body-sm font-semibold rounded-xl text-gray-700 hover:bg-gray-50">
                    <span>Menu</span>
                    <span className="w-2 h-2 rounded-full bg-error"></span>
                  </button>
                </div>

                {/* Dark Option 1: Selected / Checked state */}
                <div className="bg-[#11131A] border border-gray-800 rounded-2xl p-3 shadow-md flex flex-col gap-1 text-white">
                  <button className="w-full flex items-center justify-between px-3 py-2.5 text-body-sm font-semibold rounded-xl text-gray-500 hover:bg-gray-800">
                    <span>Menu</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 text-body-sm font-bold rounded-xl bg-gray-800 text-white">
                    <span>Menu</span>
                    <FaCheck className="text-primary text-xs" />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 text-body-sm font-semibold rounded-xl text-gray-500 hover:bg-gray-800">
                    <span>Menu</span>
                  </button>
                </div>

                {/* Dark Option 2: Badge and Dot states */}
                <div className="bg-[#11131A] border border-gray-800 rounded-2xl p-3 shadow-md flex flex-col gap-1 text-white">
                  <button className="w-full flex items-center justify-between px-3 py-2.5 text-body-sm font-semibold rounded-xl text-gray-300 bg-gray-800/50">
                    <span>Menu</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-error text-white text-[10px] font-bold">1</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 text-body-sm font-semibold rounded-xl text-gray-300 hover:bg-gray-800">
                    <span>Menu</span>
                    <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 text-body-sm font-semibold rounded-xl text-gray-300 hover:bg-gray-800">
                    <span>Menu</span>
                    <span className="w-2 h-2 rounded-full bg-error"></span>
                  </button>
                </div>

              </div>
            </div>

            {/* COLUMN 4: MENUS NAME */}
            <div className="flex flex-col gap-4 shrink-0 w-60">
              <h3 className="text-body-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">Menus Name</h3>
              
              <div className="flex flex-col gap-6">
                
                {/* Employees Submenu (Light) */}
                <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-md flex flex-col">
                  <div className="flex items-center justify-between px-3 py-2 text-body-sm font-bold text-gray-900 border-b border-gray-50 pb-2">
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-gray-500 text-base" />
                      <span>Employees</span>
                    </div>
                    <FaChevronDown className="text-xs text-gray-400 rotate-180" />
                  </div>
                  <div className="flex flex-col mt-1">
                    <TreeSubmenuItem type="T" active theme="light">Employees</TreeSubmenuItem>
                    <TreeSubmenuItem type="T" theme="light">Manage Employees</TreeSubmenuItem>
                    <TreeSubmenuItem type="T" theme="light">Directory</TreeSubmenuItem>
                    <TreeSubmenuItem type="L" theme="light">Org Chart</TreeSubmenuItem>
                  </div>
                </div>

                {/* Time Off Submenu (Light) */}
                <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-md flex flex-col">
                  <div className="flex items-center justify-between px-3 py-2 text-body-sm font-bold text-gray-900 border-b border-gray-50 pb-2">
                    <div className="flex items-center gap-2">
                      <FaCalendarCheck className="text-gray-500 text-base" />
                      <span>Time Off</span>
                    </div>
                    <FaChevronDown className="text-xs text-gray-400 rotate-180" />
                  </div>
                  <div className="flex flex-col mt-1">
                    <TreeSubmenuItem type="T" active theme="light">Time Off</TreeSubmenuItem>
                    <TreeSubmenuItem type="T" theme="light">My Time Off</TreeSubmenuItem>
                    <TreeSubmenuItem type="T" theme="light">Team Time Off</TreeSubmenuItem>
                    <TreeSubmenuItem type="T" theme="light">Employee Time Off</TreeSubmenuItem>
                    <TreeSubmenuItem type="L" theme="light">Settings</TreeSubmenuItem>
                  </div>
                </div>

                {/* Attendance Submenu (Dark) */}
                <div className="bg-[#11131A] border border-gray-800 rounded-2xl p-3 shadow-md flex flex-col text-white">
                  <div className="flex items-center justify-between px-3 py-2 text-body-sm font-bold text-white border-b border-gray-800/60 pb-2">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-400 text-base" />
                      <span>Attendance</span>
                    </div>
                    <FaChevronDown className="text-xs text-gray-500 rotate-180" />
                  </div>
                  <div className="flex flex-col mt-1 animate-fadeIn">
                    <TreeSubmenuItem type="T" active theme="dark">Attendance</TreeSubmenuItem>
                    <TreeSubmenuItem type="T" theme="dark">My Attendance</TreeSubmenuItem>
                    <TreeSubmenuItem type="T" theme="dark">Team Attendance</TreeSubmenuItem>
                    <TreeSubmenuItem type="T" theme="dark">Employee Attendance</TreeSubmenuItem>
                    <TreeSubmenuItem type="L" theme="dark">Settings</TreeSubmenuItem>
                  </div>
                </div>

                {/* Payroll Submenu (Dark) */}
                <div className="bg-[#11131A] border border-gray-800 rounded-2xl p-3 shadow-md flex flex-col text-white">
                  <div className="flex items-center justify-between px-3 py-2 text-body-sm font-bold text-white border-b border-gray-800/60 pb-2">
                    <div className="flex items-center gap-2">
                      <FaCreditCard className="text-gray-400 text-base" />
                      <span>Payroll</span>
                    </div>
                    <FaChevronDown className="text-xs text-gray-500 rotate-180" />
                  </div>
                  <div className="flex flex-col mt-1">
                    <TreeSubmenuItem type="T" active theme="dark">Payroll</TreeSubmenuItem>
                    <TreeSubmenuItem type="T" theme="dark">Employee Payroll</TreeSubmenuItem>
                    <TreeSubmenuItem type="L" theme="dark">Settings</TreeSubmenuItem>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Header Variants</h2>

          <div className="flex flex-col gap-12 bg-gray-50 dark:bg-[#11131A]/50 p-4 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800">

            {/* Variant 1: Full Dark Header */}
            <header className="w-full h-20 bg-[#11131A] text-white px-6 sm:px-8 flex items-center justify-between rounded-2xl shadow-md border border-gray-800">
              <div className="flex items-center gap-12">
                <div className="flex items-center gap-2">
                  <div className="text-[#10B981] font-bold text-xl">H</div>
                  <span className="font-bold tracking-wide hidden sm:block">HRDashboard</span>
                </div>
                <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
                  <a href="#" className="text-white">Dashboard</a>
                  <a href="#" className="text-gray-400 hover:text-white">Team</a>
                  <a href="#" className="text-gray-400 hover:text-white">Reports</a>
                  <a href="#" className="text-gray-400 hover:text-white">Settings</a>
                </nav>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-48 sm:w-64 hidden md:block">
                  <Input
                    placeholder="Search anything..."
                    leftIcon={<FaSearch />}
                    className="bg-gray-800 border-gray-700 text-white focus:bg-gray-800 h-10"
                    containerClassName="mb-0"
                  />
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <button className="hover:text-white"><FaPlus /></button>
                  <button className="hover:text-white relative">
                    <FaBell />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full border border-[#11131A]"></span>
                  </button>
                </div>
                <Avatar size="sm" src="https://i.pravatar.cc/150?u=katie" className="ml-0 sm:ml-2" />
              </div>
            </header>

            {/* Variant 2: Full Light Header */}
            <header className="w-full h-20 bg-white text-gray-900 px-6 sm:px-8 flex items-center justify-between rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-12">
                <div className="flex items-center gap-2">
                  <div className="text-[#10B981] font-bold text-xl">H</div>
                  <span className="font-bold tracking-wide hidden sm:block">HRDashboard</span>
                </div>
                <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
                  <a href="#" className="text-gray-900">Dashboard</a>
                  <a href="#" className="text-gray-500 hover:text-gray-900">Team</a>
                  <a href="#" className="text-gray-500 hover:text-gray-900">Reports</a>
                  <a href="#" className="text-gray-500 hover:text-gray-900">Settings</a>
                </nav>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-48 sm:w-64 hidden md:block">
                  <Input
                    placeholder="Search anything..."
                    leftIcon={<FaSearch />}
                    className="bg-gray-50 border-transparent focus:bg-white h-10"
                    containerClassName="mb-0"
                  />
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <button className="hover:text-gray-900"><FaPlus /></button>
                  <button className="hover:text-gray-900 relative">
                    <FaBell />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full border border-white"></span>
                  </button>
                </div>
                <Avatar size="sm" src="https://i.pravatar.cc/150?u=katie" className="ml-0 sm:ml-2" />
              </div>
            </header>

            {/* Variant 3: Dark Search Left */}
            <header className="w-full h-20 bg-[#11131A] text-white px-6 sm:px-8 flex items-center justify-between rounded-2xl shadow-md border border-gray-800">
              <div className="flex items-center gap-8 flex-1">
                <div className="w-48 sm:w-64">
                  <Input
                    placeholder="Search anything..."
                    leftIcon={<FaSearch />}
                    className="bg-gray-800 border-gray-700 text-white h-10"
                    containerClassName="mb-0"
                  />
                </div>
                <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
                  <a href="#" className="text-white">Dashboard</a>
                  <a href="#" className="text-gray-400 hover:text-white">Team</a>
                  <a href="#" className="text-gray-400 hover:text-white">Reports</a>
                  <a href="#" className="text-gray-400 hover:text-white">Settings</a>
                </nav>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-4 text-gray-400">
                  <button className="hover:text-white"><FaPlus /></button>
                  <button className="hover:text-white relative">
                    <FaBell />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full border border-[#11131A]"></span>
                  </button>
                </div>
                <Avatar size="sm" src="https://i.pravatar.cc/150?u=katie" className="ml-0 sm:ml-2" />
              </div>
            </header>

          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Modals & Drawers</h2>
          <ModalShowcase />
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Alerts & Banners</h2>
          <div className="flex flex-col gap-4 max-w-4xl">
            <Alert variant="error" dismissible>
              Scheduled maintenance planned for 12:00 AM - 4:00 PM AEST. Expect system outages.
            </Alert>
            <Alert variant="success" dismissible>
              Scheduled maintenance planned for 12:00 AM - 4:00 PM AEST. Expect system outages.
            </Alert>
            <Alert variant="info" dismissible>
              Scheduled maintenance planned for 12:00 AM - 4:00 PM AEST. Expect system outages.
            </Alert>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Form Controls & Social Buttons</h2>
          <div className="flex flex-wrap gap-12 items-start">

            {/* Switches */}
            <div className="flex flex-col gap-6">
              <h3 className="h3">Toggles (Switch)</h3>
              <div className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex gap-4">
                  <Switch defaultChecked />
                  <Switch />
                </div>
                <div className="flex gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800">
                  <Switch defaultChecked />
                  <Switch />
                </div>
                {/* Toggles with Icons */}
                <div className="flex gap-4">
                  <Switch defaultChecked icon={<FaCheckCircle className="text-[12px]" />} />
                  <Switch icon={<FaMinus className="text-[12px]" />} />
                </div>
                <div className="flex gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800">
                  <Switch defaultChecked icon={<FaCheckCircle className="text-[12px]" />} />
                  <Switch icon={<FaMinus className="text-[12px]" />} />
                </div>
              </div>
            </div>

            {/* Checkboxes & Radios */}
            <div className="flex flex-col gap-6">
              <h3 className="h3">Selection</h3>
              <div className="flex flex-col gap-6 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex gap-4 items-center">
                  <Radio name="radio-demo" />
                  <Radio name="radio-demo" defaultChecked />
                </div>
                <div className="flex gap-4 items-center">
                  <Checkbox />
                  <Checkbox defaultChecked />
                </div>

                <div className="flex gap-4 items-center bg-gray-900 p-4 rounded-xl border border-gray-800">
                  <Checkbox />
                  <Checkbox defaultChecked />
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-6 w-full max-w-sm">
              <h3 className="h3">Social Login Buttons</h3>
              <div className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <Button variant="outline" className="w-full justify-center text-gray-900 dark:text-gray-900 bg-white hover:bg-gray-50">
                  <FaGoogle className="text-[#EA4335] text-lg mr-2" /> Google
                </Button>
                <Button variant="outline" className="w-full justify-center text-gray-900 dark:text-gray-900 bg-white hover:bg-gray-50">
                  <FaApple className="text-gray-900 text-lg mr-2" /> Apple
                </Button>

                <div className="flex flex-col gap-4 bg-gray-900 p-6 rounded-xl mt-4 border border-gray-800">
                  <Button variant="outline" className="w-full justify-center bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
                    <FaGoogle className="text-[#EA4335] text-lg mr-2" /> Google
                  </Button>
                  <Button variant="outline" className="w-full justify-center bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
                    <FaApple className="text-white text-lg mr-2" /> Apple
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Table Builder</h2>

          <div className="bg-white dark:bg-[#11131A] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm max-w-6xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"><Checkbox /></TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2 cursor-pointer">
                      Employee <FaSort className="text-gray-400" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Notification</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

                {/* Row 1 */}
                <TableRow>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                      <div className="flex flex-col">
                        <span className="font-bold">Tony Reichert</span>
                        <span className="text-xs text-gray-500">tony@example.com</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="success">ACTIVE</Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">CEO</TableCell>
                  <TableCell><Switch defaultChecked /></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20"><FaEye /></button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"><FaEdit /></button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-error/10 text-error hover:bg-error/20"><FaTrash /></button>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Row 2 */}
                <TableRow>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                      <div className="flex flex-col">
                        <span className="font-bold">Zoey Lang</span>
                        <span className="text-xs text-gray-500">zoey@example.com</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="error">INACTIVE</Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">Technical Lead</TableCell>
                  <TableCell><Switch /></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20"><FaEye /></button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"><FaEdit /></button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-error/10 text-error hover:bg-error/20"><FaTrash /></button>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Skeleton Row */}
                <TableRow>
                  <TableCell><div className="w-5 h-5 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                      <div className="flex flex-col gap-2">
                        <div className="w-32 h-4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                        <div className="w-24 h-3 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><div className="w-16 h-6 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div></TableCell>
                  <TableCell><div className="w-20 h-4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div></TableCell>
                  <TableCell><div className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                    </div>
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </div>

        </section>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Checklist & Task Boards</h2>
          <div className="flex flex-col gap-6 max-w-6xl">
            <TaskBoard 
              employeeName="Jennifer Lane"
              role="UI Designer"
              joinDate="23 Feb 2023"
              avatar="https://i.pravatar.cc/150?u=jennifer"
              progressPercent={70}
              tasks={demoTasks}
              defaultExpanded={true}
            />
            <TaskBoard 
              employeeName="Jennifer Lane"
              role="UI Designer"
              joinDate="23 Feb 2023"
              avatar="https://i.pravatar.cc/150?u=jennifer"
              progressPercent={70}
              tasks={demoTasks}
              defaultExpanded={false}
            />

            <div className="flex flex-col gap-4 mt-4">
              <h3 className="h3">Task Details Accordions</h3>
              <div className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <TaskAccordionItem 
                  title="Prepare company welcome kit"
                  status="draft"
                  assigneeRole="Line manager"
                  dueDateOffset="1 day before join date"
                  description={`Please ensure that your new team member have a prepared workstation with:
1. Laptop
2. Work email
3. Intranet/Team sites access`}
                />
                <TaskAccordionItem 
                  title="Prepare company welcome kit"
                  status="completed"
                  assigneeRole="Line manager"
                  dueDateOffset="1 day before join date"
                  description={`Please ensure that your new team member have a prepared workstation with:
1. Laptop
2. Work email
3. Intranet/Team sites access`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <h3 className="h3">Tree Connections (Hierarchy)</h3>
              <div className="flex flex-col bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                
                {/* Parent Row */}
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#11131A] rounded-xl border border-gray-100 dark:border-gray-800 font-bold text-body-sm text-gray-950 dark:text-white">
                  📁 Onboarding Tasks (Parent Checklist)
                </div>

                {/* Subtask 1 */}
                <div className="flex items-stretch">
                  <div className="flex flex-col items-center shrink-0">
                    <TreeConnector type="T" />
                  </div>
                  <div className="flex-1 py-2">
                    <TaskAccordionItem 
                      title="Step 1: Welcome Kit Preparation"
                      status="completed"
                      assigneeRole="Line Manager"
                      dueDateOffset="1 day before join"
                      description="Ensure desk is set up with equipment, laptop, and onboarding manual."
                    />
                  </div>
                </div>

                {/* Subtask 2 */}
                <div className="flex items-stretch">
                  <div className="flex flex-col items-center shrink-0">
                    <TreeConnector type="T" />
                  </div>
                  <div className="flex-1 py-2">
                    <TaskAccordionItem 
                      title="Step 2: IT Account Setup"
                      status="ongoing"
                      assigneeRole="IT Support"
                      dueDateOffset="On join date"
                      description="Create domain credentials, email address, slack account, and VPN access configurations."
                    />
                  </div>
                </div>

                {/* Subtask 3 (Last item) */}
                <div className="flex items-stretch">
                  <div className="flex flex-col items-center shrink-0">
                    <TreeConnector type="L" />
                  </div>
                  <div className="flex-1 py-2">
                    <TaskAccordionItem 
                      title="Step 3: Security Briefing Session"
                      status="draft"
                      assigneeRole="Security Officer"
                      dueDateOffset="2 days after join"
                      description="Schedule the security briefing session and NDA contract signatures review."
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Tabs & Pagination</h2>
          
          <div className="flex flex-col gap-12 bg-gray-50 dark:bg-gray-900/50 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 max-w-6xl">
            
            {/* Date / Day Selection variants */}
            <div className="flex flex-col gap-4">
              <h3 className="h3">Calendar Day Selection</h3>
              <div className="flex flex-wrap gap-2 items-center bg-white dark:bg-[#11131A] p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg text-body-md font-medium text-gray-900 dark:text-white relative hover:bg-gray-100 dark:hover:bg-gray-800">
                  22
                  <span className="absolute bottom-1 w-1.5 h-1.5 bg-primary rounded-full"></span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg text-body-md font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">22</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg text-body-md font-semibold bg-primary text-white">22</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg text-body-md font-medium text-gray-300 dark:text-gray-600 cursor-not-allowed" disabled>22</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg text-body-md font-medium bg-primary/10 text-primary">22</button>
                <div className="flex bg-primary/10 rounded-lg">
                  <button className="w-10 h-10 flex items-center justify-center text-body-md font-medium text-primary">22</button>
                  <button className="w-10 h-10 flex items-center justify-center text-body-md font-medium text-primary border-l border-primary/20">22</button>
                </div>
              </div>
            </div>

            {/* Tab variants */}
            <div className="flex flex-col gap-4">
              <h3 className="h3">Tabs</h3>
              <div className="bg-white dark:bg-[#11131A] p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                <Tabs>
                  <TabsTrigger active>TITLE</TabsTrigger>
                  <TabsTrigger>TITLE</TabsTrigger>
                  <TabsTrigger>TITLE</TabsTrigger>
                </Tabs>
              </div>
            </div>

            {/* Pagination variations */}
            <div className="flex flex-col gap-6">
              <h3 className="h3">Pagination</h3>
              
              {/* Light Mode - Full */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col gap-6">
                <Pagination>
                  <div className="flex items-center gap-2">
                    <span className="text-body-sm text-gray-500">Showing 1 to 8 of 50 entries</span>
                    <select className="px-3 py-1.5 text-body-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none">
                      <option>Show 8</option>
                      <option>Show 16</option>
                      <option>Show 32</option>
                    </select>
                  </div>
                  <PaginationContent>
                    <PaginationItem><PaginationPrevious /></PaginationItem>
                    <PaginationItem><PaginationLink isActive>1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink>2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationEllipsis /></PaginationItem>
                    <PaginationItem><PaginationLink>10</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationNext /></PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>

              {/* Dark Mode - Full */}
              <div className="bg-[#11131A] p-6 rounded-xl border border-gray-800 flex flex-col gap-6 text-white">
                <Pagination>
                  <div className="flex items-center gap-2">
                    <span className="text-body-sm text-gray-400">Showing 1 to 8 of 50 entries</span>
                    <select className="px-3 py-1.5 text-body-sm bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none">
                      <option>Show 8</option>
                      <option>Show 16</option>
                      <option>Show 32</option>
                    </select>
                  </div>
                  <PaginationContent>
                    <PaginationItem><PaginationPrevious className="bg-gray-800 border-gray-700 text-white" /></PaginationItem>
                    <PaginationItem><PaginationLink isActive>1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink className="text-gray-300 hover:bg-gray-800">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink className="text-gray-300 hover:bg-gray-800">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationEllipsis className="text-gray-500" /></PaginationItem>
                    <PaginationItem><PaginationLink className="text-gray-300 hover:bg-gray-800">10</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationNext className="bg-gray-800 border-gray-700 text-white" /></PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>

              {/* Light Mode - Simple */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col gap-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem><PaginationPrevious /></PaginationItem>
                    <PaginationItem><PaginationLink isActive>1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationNext /></PaginationItem>
                  </PaginationContent>
                  <span className="text-body-sm text-gray-500 font-medium">3 Result</span>
                </Pagination>
              </div>

              {/* Dark Mode - Simple */}
              <div className="bg-[#11131A] p-6 rounded-xl border border-gray-800 flex flex-col gap-6 text-white">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem><PaginationPrevious className="bg-gray-800 border-gray-700 text-white" /></PaginationItem>
                    <PaginationItem><PaginationLink isActive>1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationNext className="bg-gray-800 border-gray-700 text-white" /></PaginationItem>
                  </PaginationContent>
                  <span className="text-body-sm text-gray-400 font-medium">3 Result</span>
                </Pagination>
              </div>

            </div>

          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="h2 border-b pb-4">Notifications</h2>
          
          <div className="flex flex-wrap gap-8 items-start max-w-6xl">
            
            {/* Dynamic single toasts */}
            <div className="flex flex-col gap-6 w-full max-w-md">
              <h3 className="h3">Single Item Toasts</h3>
              <div className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                {/* Light Mode Toast */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden">
                  <NotificationItem 
                    icon={<FaCog className="text-gray-500" />} 
                    title="New Notif" 
                    description="This is description for notification" 
                    time="Now" 
                    unread 
                  />
                </div>
                {/* Dark Mode Toast */}
                <div className="bg-[#11131A] rounded-2xl border border-gray-800 shadow-xl text-white overflow-hidden">
                  <NotificationItem 
                    icon={<FaCog className="text-gray-400" />} 
                    title="New Notif" 
                    description="This is description for notification" 
                    time="Now" 
                    unread 
                  />
                </div>
              </div>
            </div>

            {/* Dropdown Card - Light Mode */}
            <div className="flex flex-col gap-6 w-full max-w-md">
              <h3 className="h3">Notification Drawer (Light)</h3>
              <NotificationCard>
                <NotificationItem 
                  icon={<FaBell className="text-[#EA4335]" />} 
                  iconBg="bg-[#EA4335]/10"
                  title="Training session reminder" 
                  description="Don't forget to join our upcoming training session on the..." 
                  time="Now" 
                  unread 
                />
                <NotificationItem 
                  icon={<FaCog className="text-[#4285F4]" />} 
                  iconBg="bg-[#4285F4]/10"
                  title="New integration announcement" 
                  description="Our HR Management Dashboard now integrates with..." 
                  time="9:00 AM" 
                  unread 
                />
                <NotificationItem 
                  icon={<FaUsers className="text-[#34A853]" />} 
                  iconBg="bg-[#34A853]/10"
                  title="User feedback survey" 
                  description="We want to hear from you! Take our quick user feedback..." 
                  time="1 Oct 2022" 
                  unread 
                />
              </NotificationCard>
            </div>

            {/* Dropdown Card - Dark Mode */}
            <div className="flex flex-col gap-6 w-full max-w-md">
              <h3 className="h3">Notification Drawer (Dark)</h3>
              <NotificationCard className="bg-[#11131A] border-gray-800 text-white shadow-2xl">
                <NotificationItem 
                  icon={<FaBell className="text-[#EA4335]" />} 
                  iconBg="bg-[#EA4335]/10"
                  title="Training session reminder" 
                  description="Don't forget to join our upcoming training session on the..." 
                  time="Now" 
                  unread 
                />
                <NotificationItem 
                  icon={<FaCog className="text-[#4285F4]" />} 
                  iconBg="bg-[#4285F4]/10"
                  title="New integration announcement" 
                  description="Our HR Management Dashboard now integrates with..." 
                  time="9:00 AM" 
                  unread 
                />
                <NotificationItem 
                  icon={<FaUsers className="text-[#34A853]" />} 
                  iconBg="bg-[#34A853]/10"
                  title="User feedback survey" 
                  description="We want to hear from you! Take our quick user feedback..." 
                  time="1 Oct 2022" 
                  unread 
                />
              </NotificationCard>
            </div>

          </div>
        </section>
      </main>
    </div >
  );
}
