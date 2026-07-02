"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineHeart,
  HiOutlineShare,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineXMark,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  tag: "Milestone" | "Culture" | "Event" | "Product Update";
  date: string;
  readTime: string;
  likes: number;
  likedByUser?: boolean;
  comments: Array<{ name: string; text: string; time: string }>;
  imageGradient: string;
}

const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: "art-1",
    title: "Welcome Marcus Vance, our new Chief Technology Officer!",
    summary: "We are thrilled to announce Marcus Vance is joining us to lead our global engineering scaling efforts and technical direction.",
    content: "Marcus brings over 18 years of tech leadership from companies like Stripe and Netflix. As our new CTO, Marcus will oversee the product, engineering, and infrastructure departments. He will focus on expanding our real-time collaboration tools and securing our database compliance architectures. Please join us in welcoming Marcus in the #announcements channel on Slack!",
    tag: "Milestone",
    date: "June 01, 2026",
    readTime: "3 min read",
    likes: 24,
    comments: [
      { name: "Sarah Jenkins", text: "Welcome Marcus! Thrilled to have you on board.", time: "2 days ago" },
      { name: "David Chen", text: "Exciting times ahead for the engineering team!", time: "1 day ago" }
    ],
    imageGradient: "from-blue-500 to-indigo-600"
  },
  {
    id: "art-2",
    title: "Annual Company Retreat 2026: Bali Awaits!",
    summary: "Get your suitcases ready! Our annual retreat itinerary has been finalized. Read on for flight bookings and schedule details.",
    content: "This year, we are heading to Nusa Dua, Bali, for five days of relaxation, planning sessions, and team-bonding sports. Flights are scheduled for departure on October 12, 2026. The company will cover accommodation at the Grand Hyatt, round-trip flight tickets, and all dining. Please submit your passport expiration dates to the HR portal by the end of this month.",
    tag: "Event",
    date: "May 20, 2026",
    readTime: "5 min read",
    likes: 48,
    comments: [
      { name: "John Doe", text: "Bali!! Let's go! 🌴✈️", time: "2 weeks ago" }
    ],
    imageGradient: "from-amber-400 to-orange-500"
  },
  {
    id: "art-3",
    title: "Q3 Product Roadmap Review: What's next in Peoplely HR?",
    summary: "Highlights of the upcoming payroll dashboard, automated timesheet compliance, and Slack integration enhancements.",
    content: "Our Product management team has compiled the Q3 roadmap deliverables. Key features include: 1) Advanced payroll adjustments engine with localized tax code mappings, 2) Automatic notifications for leave status sync directly into Slack channels, and 3) Custom workflows engine allowing custom triggers for onboarding checklist builders. Join the Townhall next Wednesday for a live demo.",
    tag: "Product Update",
    date: "May 12, 2026",
    readTime: "4 min read",
    likes: 19,
    comments: [],
    imageGradient: "from-teal-400 to-emerald-600"
  },
  {
    id: "art-4",
    title: "Promoting Workplace Wellbeing: Mental Health Week",
    summary: "Free subscriptions to Headspace premium, weekly mindfulness sessions, and guidelines on maintaining work-life balance.",
    content: "At Peoplely HR, our team's mental health is our top priority. Starting next week, we are launching weekly mindfulness check-ins every Thursday morning. Additionally, all employees are now eligible for a fully-sponsored subscription to Headspace or Calm. We also encourage everyone to configure Slack snooze schedules after 18:30 to maintain a healthy work-life boundary.",
    tag: "Culture",
    date: "May 02, 2026",
    readTime: "2 min read",
    likes: 31,
    comments: [
      { name: "Emily Watson", text: "Thank you HR! The mindfulness sessions are great.", time: "3 weeks ago" }
    ],
    imageGradient: "from-purple-500 to-pink-500"
  }
];

export default function CompanyNewsHelpPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState<string>("All");
  const [articles, setArticles] = React.useState<NewsArticle[]>(INITIAL_ARTICLES);
  const [activeArticle, setActiveArticle] = React.useState<NewsArticle | null>(null);
  
  // Comment input state inside modal
  const [newCommentName, setNewCommentName] = React.useState("");
  const [newCommentText, setNewCommentText] = React.useState("");

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const liked = !art.likedByUser;
          if (liked) {
            toast.success("Post liked!");
          }
          return {
            ...art,
            likedByUser: liked,
            likes: liked ? art.likes + 1 : art.likes - 1,
          };
        }
        return art;
      })
    );
  };

  const handleShare = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const mockUrl = `https://peoplelyhr.com/news/${id}`;
    navigator.clipboard.writeText(mockUrl);
    toast.success("Share link copied to clipboard!", {
      description: title,
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim() || !activeArticle) return;

    const newComment = {
      name: newCommentName.trim(),
      text: newCommentText.trim(),
      time: "Just now",
    };

    const updatedArticles = articles.map((art) => {
      if (art.id === activeArticle.id) {
        const nextComments = [...art.comments, newComment];
        // Sync open article reference
        setTimeout(() => {
          setActiveArticle((current) => current ? { ...current, comments: nextComments } : null);
        }, 0);
        return { ...art, comments: nextComments };
      }
      return art;
    });

    setArticles(updatedArticles);
    setNewCommentText("");
    toast.success("Comment added!");
  };

  const tags = ["All", "Milestone", "Culture", "Event", "Product Update"];

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || art.tag === selectedTag;
    return matchesSearch && matchesTag;
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
            <span className="text-gray-400">Company News</span>
          </div>
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search news articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-11 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
        </div>
      </div>

      {/* Main Grid: Live Feed on left, documentation on right */}
      <div className="flex flex-col xl:flex-row gap-8 items-start max-w-6xl w-full">
        <div className="flex-1 w-full flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
              <span>Interactive Company News Feed</span>
              <HiOutlineInformationCircle className="text-gray-400 text-lg" />
            </div>

            {/* Tag Selection Filters */}
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-all cursor-pointer border ${
                    selectedTag === tag
                      ? "bg-teal-600 border-teal-700 text-white shadow-sm"
                      : "bg-white border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-900 dark:bg-gray-900 dark:text-gray-400"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Feed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((art) => (
              <Card
                key={art.id}
                onClick={() => {
                  setActiveArticle(art);
                  setNewCommentName("");
                  setNewCommentText("");
                }}
                className="overflow-hidden border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1 rounded-2xl flex flex-col h-full"
              >
                {/* Visual Thumbnail Gradient */}
                <div className={`h-36 w-full bg-gradient-to-tr ${art.imageGradient} p-4 flex flex-col justify-between text-white relative`}>
                  <span className="self-start text-[9px] font-black uppercase tracking-wider px-2 py-1 bg-white/20 backdrop-blur-md rounded-md">
                    {art.tag}
                  </span>
                  <div>
                    <div className="flex items-center gap-2.5 text-[9px] font-extrabold text-white/80">
                      <span className="flex items-center gap-1"><HiOutlineCalendar /> {art.date}</span>
                      <span className="flex items-center gap-1"><HiOutlineClock /> {art.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs md:text-sm font-extrabold text-gray-900 dark:text-white line-clamp-2 leading-relaxed transition-colors group-hover:text-teal-600">
                      {art.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 line-clamp-3 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-850 pt-3">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleLike(art.id, e)}
                        className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-lg transition-all ${
                          art.likedByUser
                            ? "bg-red-50 text-red-500 dark:bg-red-950/20"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <HiOutlineHeart className="text-xs" />
                        <span>{art.likes}</span>
                      </button>
                      <button
                        onClick={(e) => handleShare(art.id, art.title, e)}
                        className="flex items-center gap-1 text-[10px] font-black text-gray-400 hover:text-teal-600 px-2.5 py-1 rounded-lg transition-all"
                      >
                        <HiOutlineShare className="text-xs" />
                        <span>Share</span>
                      </button>
                    </div>
                    <span className="text-[10px] font-black text-teal-600 dark:text-teal-400 group-hover:underline">
                      Read More &rarr;
                    </span>
                  </div>
                </div>
              </Card>
            ))}

            {filteredArticles.length === 0 && (
              <div className="col-span-2 text-center py-14 text-xs font-semibold text-gray-400 dark:text-gray-500">
                No news articles match your selection.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Informational Documentation */}
        <div className="w-full xl:w-80 flex flex-col gap-6">
          <div className="text-base font-bold text-gray-900 dark:text-white">
            News Help Guide
          </div>

          <Card className="p-6 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-sm leading-relaxed text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium rounded-2xl flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h4 className="text-xs md:text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                Staying Informed
              </h4>
              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450">
                The Company News feature allows organizations to broadcast important announcements, updates, and milestones directly to all employees. It ensures that everyone in the company is on the same page.
              </p>
            </div>

            <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-850 pt-4">
              <h4 className="text-xs md:text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                Publishing News
              </h4>
              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450 mb-1">
                Administrators and HR managers have the ability to create news posts. To publish:
              </p>
              <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-gray-500 dark:text-gray-450">
                <li>Navigate to dashboard and select <strong className="text-teal-600">News</strong>.</li>
                <li>Click <strong className="text-teal-650">Create News</strong>.</li>
                <li>Upload title, markdown content, and header cover images.</li>
                <li>Publish now or schedule for later notifications.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-850 pt-4">
              <h4 className="text-xs md:text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                Employee Notifications
              </h4>
              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-450">
                When a new company news article is published, employees will receive an in-app notification and an email summary, ensuring that critical information reaches everyone promptly.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Slide-out News Reader Modal/Drawer Overlay */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-end animate-fadeIn">
          {/* Drawer Panel */}
          <div className="w-full max-w-xl h-full bg-white dark:bg-gray-900 border-l border-gray-250 dark:border-gray-800 shadow-2xl flex flex-col justify-between animate-slideLeft">
            
            {/* Header / Cover Area */}
            <div>
              <div className={`h-48 w-full bg-gradient-to-tr ${activeArticle.imageGradient} p-6 flex flex-col justify-between text-white relative`}>
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-white/20 backdrop-blur-md rounded-md">
                    {activeArticle.tag}
                  </span>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-1.5 bg-black/20 hover:bg-black/40 rounded-full text-white cursor-pointer transition-colors"
                  >
                    <HiOutlineXMark className="text-lg" />
                  </button>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-extrabold text-white/80 mb-2">
                    <span className="flex items-center gap-1"><HiOutlineCalendar /> {activeArticle.date}</span>
                    <span className="flex items-center gap-1"><HiOutlineClock /> {activeArticle.readTime}</span>
                  </div>
                  <h2 className="text-sm md:text-base font-black text-white leading-normal line-clamp-2">
                    {activeArticle.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Scrollable Contents: Body & Comments */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {/* Article Content */}
              <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed space-y-4">
                <p>{activeArticle.content}</p>
                <p>
                  For further questions regarding this announcement, please coordinate with our communications department or post in the corresponding dashboard channels. We will keep this section updated as progress continues.
                </p>
                <blockquote className="border-l-4 border-teal-500 pl-4 py-1 italic text-gray-500 bg-gray-50/50 dark:bg-gray-850/30 rounded-r-lg">
                  "Empowering transparency and collective alignment makes a healthier workspace for everyone." - Communications Dept.
                </blockquote>
              </div>

              {/* Comments Section */}
              <div className="border-t border-gray-100 dark:border-gray-850 pt-5 flex flex-col gap-4">
                <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
                  Discussion Comments ({activeArticle.comments.length})
                </h4>

                <div className="flex flex-col gap-3">
                  {activeArticle.comments.map((c, i) => (
                    <div key={i} className="p-3 border border-gray-100 dark:border-gray-850 rounded-xl bg-gray-50/30 dark:bg-gray-900/10 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-extrabold text-gray-900 dark:text-white">{c.name}</span>
                        <span className="text-[9px] font-bold text-gray-400">{c.time}</span>
                      </div>
                      <p className="text-gray-650 dark:text-gray-400 leading-normal font-medium">{c.text}</p>
                    </div>
                  ))}
                  {activeArticle.comments.length === 0 && (
                    <p className="text-[11px] italic text-gray-400 dark:text-gray-550 text-center py-2">
                      No comments yet. Start the conversation!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky Comment Submit Form */}
            <form onSubmit={handleAddComment} className="p-4 border-t border-gray-150 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-950 flex flex-col gap-3">
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="w-full md:w-1/3 h-9 px-3 rounded-lg border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
                <div className="flex-1 flex gap-2">
                  <input
                    required
                    type="text"
                    placeholder="Write a supportive comment..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="flex-1 h-9 px-3 rounded-lg border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 bg-teal-650 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center cursor-pointer text-xs font-bold"
                  >
                    <HiOutlinePaperAirplane className="rotate-45 text-sm" />
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
