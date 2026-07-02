"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineChatBubbleLeftRight,
  HiOutlineEnvelope,
  HiOutlineCheckCircle,
  HiOutlinePaperClip,
  HiOutlineXMark,
  HiOutlineChatBubbleBottomCenterText,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: string;
  description: string;
  attachmentName: string | null;
  createdAt: string;
}

export default function ContactSupportPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    category: "General Query",
    priority: "Medium",
    description: "",
  });
  
  const [attachment, setAttachment] = React.useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedTicket, setSubmittedTicket] = React.useState<SupportTicket | null>(null);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState<Array<{ sender: "user" | "bot"; text: string; time: string }>>([
    { sender: "bot", text: "Hello! How can we help you today?", time: "Just now" }
  ]);
  const [newMsg, setNewMsg] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
      toast.success(`Attached file: ${e.target.files[0].name}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `PHR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicket({
        id: ticketId,
        subject: formData.subject,
        category: formData.category,
        priority: formData.priority,
        description: formData.description,
        attachmentName: attachment ? attachment.name : null,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      toast.success("Support ticket submitted successfully!");
    }, 1200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const userMsg = newMsg;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg, time: timeStr }]);
    setNewMsg("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Thank you for your message! An HR Support Specialist will look into "${userMsg}" shortly.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950 relative">
      {/* Title area with Breadcrumbs and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help Center</h1>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-gray-500">
            <Link href="/help-center" className="hover:text-primary transition-colors">
              Help Center
            </Link>
            <span className="text-gray-300">&gt;</span>
            <span className="text-gray-400">Contact Support</span>
          </div>
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search what you need"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-11 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start max-w-6xl w-full">
        {/* Left Side: Ticket Form or Confirmation */}
        <div className="flex-1 w-full flex flex-col gap-6">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
            <span>Customer Contact Support</span>
            <HiOutlineInformationCircle className="text-gray-400 text-lg" />
          </div>

          {!submittedTicket ? (
            <Card className="p-6 md:p-8 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-sm rounded-2xl flex flex-col gap-6">
              <div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1">
                  Submit a Support Ticket
                </h3>
                <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">
                  Got technical glitches, billing errors or need system changes? File a ticket and track its status.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Your Name *</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Email Address *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john.doe@company.com"
                      className="h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all"
                    >
                      <option className="bg-white dark:bg-gray-900">General Query</option>
                      <option className="bg-white dark:bg-gray-900">Payroll & Compensation</option>
                      <option className="bg-white dark:bg-gray-900">Onboarding & Checklists</option>
                      <option className="bg-white dark:bg-gray-900">System Bug / Error</option>
                      <option className="bg-white dark:bg-gray-900">Feature Request</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Priority Level</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all"
                    >
                      <option className="bg-white dark:bg-gray-900">Low (Response in 12h)</option>
                      <option className="bg-white dark:bg-gray-900">Medium (Response in 4h)</option>
                      <option className="bg-white dark:bg-gray-900">High (Response in 2h)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Subject *</label>
                  <input
                    required
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Short description of the issue"
                    className="h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Description *</label>
                    <span className="text-[10px] font-bold text-gray-400">
                      {formData.description.length} / 1000 characters
                    </span>
                  </div>
                  <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    maxLength={1000}
                    placeholder="Please details your questions or bugs you encountered. Provide error codes if any."
                    rows={5}
                    className="p-4 rounded-xl border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Mock Attachment Upload */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-gray-405 dark:text-gray-400 uppercase">Attachments</span>
                  <div className="relative border border-dashed border-gray-300 dark:border-gray-800 hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-all rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-gray-50/20 dark:bg-gray-900/10">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <HiOutlinePaperClip className="text-gray-450 dark:text-gray-500 text-2xl" />
                    <p className="text-[10px] font-bold text-gray-500">
                      {attachment ? (
                        <span className="text-teal-600 dark:text-teal-400">Selected: {attachment.name}</span>
                      ) : (
                        <span>Drag & drop files or click to upload screenshots</span>
                      )}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-primary/95 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Support Ticket</span>
                  )}
                </button>
              </form>
            </Card>
          ) : (
            /* Ticket Confirmation Screen */
            <Card className="p-6 md:p-8 border border-emerald-500/20 dark:border-emerald-500/10 bg-white dark:bg-gray-900 shadow-md rounded-2xl flex flex-col gap-6 animate-fadeIn">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-3xl">
                  <HiOutlineCheckCircle />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Ticket Submitted Successfully</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-semibold">
                    We've registered your ticket and our staff will begin review shortly.
                  </p>
                </div>
              </div>

              <div className="border border-gray-100 dark:border-gray-850 rounded-xl p-4 bg-gray-50/50 dark:bg-gray-900/40 text-xs font-semibold flex flex-col gap-3">
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-850">
                  <span className="text-gray-400">Ticket Reference ID:</span>
                  <span className="text-gray-900 dark:text-white font-extrabold font-mono">{submittedTicket.id}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-850">
                  <span className="text-gray-400">Subject:</span>
                  <span className="text-gray-900 dark:text-white font-bold">{submittedTicket.subject}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-850">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-gray-900 dark:text-white font-bold">{submittedTicket.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-850">
                  <span className="text-gray-400">Priority:</span>
                  <span className="text-red-500 font-bold">{submittedTicket.priority}</span>
                </div>
                {submittedTicket.attachmentName && (
                  <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-850">
                    <span className="text-gray-400">Attached File:</span>
                    <span className="text-teal-600 dark:text-teal-400 font-bold">{submittedTicket.attachmentName}</span>
                  </div>
                )}
                <div className="flex flex-col gap-1 py-1">
                  <span className="text-gray-400">Description:</span>
                  <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed italic bg-white dark:bg-gray-950 p-2.5 rounded-lg border border-gray-100 dark:border-gray-850">
                    {submittedTicket.description}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSubmittedTicket(null);
                    setFormData({
                      name: "",
                      email: "",
                      subject: "",
                      category: "General Query",
                      priority: "Medium",
                      description: "",
                    });
                    setAttachment(null);
                  }}
                  className="flex-1 h-10 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-350 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Create New Ticket
                </button>
                <button
                  onClick={() => toast.success("Refreshed ticket status. Currently: In Queue")}
                  className="flex-1 h-10 bg-teal-600 text-white hover:bg-teal-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Track Live Status
                </button>
              </div>
            </Card>
          )}
        </div>

        {/* Right Side: Channels and Related Articles */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="text-base font-bold text-gray-900 dark:text-white">
            Channels & Guides
          </div>

          <Card className="p-6 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-sm rounded-2xl flex flex-col gap-6 text-xs md:text-sm text-gray-650 dark:text-gray-400">
            <p className="font-semibold text-gray-500 dark:text-gray-400 leading-normal">
              If you have any trouble getting started or during usage, please reach out to us using the following support channels.
            </p>

            {/* Intercom */}
            <div className="flex flex-col gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-850 bg-gray-50/30 dark:bg-gray-900/20">
              <div className="flex items-center gap-2">
                <HiOutlineChatBubbleLeftRight className="text-teal-600 dark:text-teal-400 text-lg" />
                <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">
                  Live Chat System
                </h4>
              </div>
              <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
                Describe your problems in our Live Chat. Response times are usually under 5 minutes. Mon-Fri, 9:00 - 18:00.
              </p>
              <button
                onClick={() => setChatOpen(true)}
                className="mt-1 h-9 bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 text-teal-600 dark:text-teal-450 hover:bg-teal-100/60 dark:hover:bg-teal-950/40 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <HiOutlineChatBubbleBottomCenterText />
                <span>Open Chat Screen</span>
              </button>
            </div>

            {/* Submit via Email */}
            <div className="flex flex-col gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-850 bg-gray-50/30 dark:bg-gray-900/20">
              <div className="flex items-center gap-2">
                <HiOutlineEnvelope className="text-brand-purple text-lg" />
                <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">
                  Send us an Email
                </h4>
              </div>
              <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
                Submit questions to{" "}
                <a
                  href="mailto:contact@peoplelyhr.com"
                  className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
                >
                  contact@peoplelyhr.com
                </a>
                . We will respond with ticket status as soon as possible.
              </p>
            </div>

            {/* Related Articles */}
            <div className="flex flex-col gap-3 border-t border-gray-100 dark:border-gray-850 pt-5">
              <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">
                Helpful Articles :
              </h4>
              <div className="flex flex-col gap-2.5 font-bold text-teal-600 dark:text-teal-400 text-xs">
                <Link href="#" className="hover:underline hover:text-teal-700 dark:hover:text-teal-350">
                  Complete Guide to Set up Peoplely HR
                </Link>
                <Link href="#" className="hover:underline hover:text-teal-700 dark:hover:text-teal-350">
                  Company Domain Activation
                </Link>
                <Link href="#" className="hover:underline hover:text-teal-700 dark:hover:text-teal-350">
                  Adding Your First Employee Record
                </Link>
                <Link href="#" className="hover:underline hover:text-teal-700 dark:hover:text-teal-350">
                  Managing Roles & Custom Permissions
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Floating Mock Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-fadeIn">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping"></div>
              <span className="text-xs font-black">Peoplely HR Live Support</span>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white hover:text-gray-200 cursor-pointer"
            >
              <HiOutlineXMark className="text-lg" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3 bg-gray-50/50 dark:bg-gray-950/40">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[80%] gap-1 ${
                  msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <div
                  className={`p-2.5 rounded-2xl text-[11px] font-semibold leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-teal-600 text-white rounded-tr-none"
                      : "bg-white dark:bg-gray-850 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-800 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] font-bold text-gray-400">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-2.5 border-t border-gray-100 dark:border-gray-850 flex gap-2 bg-white dark:bg-gray-900">
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-800 bg-transparent text-xs font-semibold rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              className="px-3 bg-teal-600 text-white rounded-xl text-[11px] font-bold hover:bg-teal-700 transition-colors cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
