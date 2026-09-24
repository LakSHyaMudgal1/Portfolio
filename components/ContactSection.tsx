"use client";

import React, { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { PERSONAL_INFO } from "@/lib/data";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  CheckCircle2, 
  Copy, 
  Mail, 
  MapPin, 
  MessageSquare 
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    // Client-side validation
    if (!formState.name.trim()) {
      setStatus("error");
      setStatusMessage("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email.trim())) {
      setStatus("error");
      setStatusMessage("Please provide a valid email address.");
      return;
    }

    if (formState.message.trim().length < 10) {
      setStatus("error");
      setStatusMessage("Please enter a message of at least 10 characters.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      let data: { error?: string; message?: string } = {};
      try {
        data = await res.json();
      } catch {
        throw new Error("Server returned an invalid response. Please try emailing directly.");
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setStatusMessage(data.message || "Message sent successfully! I'll get back to you promptly.");
      setFormState({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      const messageText = err instanceof Error ? err.message : "";
      if (!messageText || messageText.includes("Failed to fetch") || messageText.includes("NetworkError")) {
        setStatusMessage(`Could not connect to service. Please try again or email directly at ${PERSONAL_INFO.socials.email}`);
      } else {
        setStatusMessage(messageText);
      }
    }
  };

  return (
    <section id="contact" className="py-28 md:py-36 relative border-t border-white/[0.06] bg-[#050608]">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          number="// 09"
          eyebrow="COMMUNICATION & INQUIRIES"
          title="Let's build something."
          description="Have an opportunity, idea, or interesting problem? I'd love to hear about it."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct channels and availability */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed font-light">
              I am actively looking for software engineering roles and high-impact teams. Feel free to reach out directly through email, LinkedIn, or the contact form.
            </p>

            {/* Email Card with Quick Copy */}
            <div className="p-5 rounded-2xl bg-[#090b10] border border-white/[0.08] flex items-center justify-between group hover:border-white/20 transition-all shadow-xl">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Direct Email
                  </div>
                  <a
                    href={`mailto:${PERSONAL_INFO.socials.email}`}
                    className="text-sm sm:text-base font-medium text-white hover:text-sky-300 transition-colors"
                  >
                    {PERSONAL_INFO.socials.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all cursor-pointer border border-white/5"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Channels Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-[#090b10] border border-white/[0.08] hover:border-white/20 hover:bg-[#0c0f16] transition-all flex items-center justify-between group shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-white">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-[#090b10] border border-white/[0.08] hover:border-white/20 hover:bg-[#0c0f16] transition-all flex items-center justify-between group shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-slate-300">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-white">GitHub</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Academic affiliation */}
            <div className="p-4 rounded-xl bg-[#090b10] border border-white/[0.06] flex items-center gap-3 text-xs font-mono text-slate-400">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <span>IIIT Una, Himachal Pradesh, India</span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#090b10] border border-white/[0.08] relative shadow-2xl">
              {/* Top hairline highlight */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />

              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  <span>DIRECT INQUIRY DISPATCH</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Endpoint Online</span>
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-[11px] font-mono text-slate-300 uppercase tracking-widest mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex Vance"
                    className="w-full px-4 py-3 rounded-xl bg-[#050608] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-400/80 transition-all text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[11px] font-mono text-slate-300 uppercase tracking-widest mb-2 font-medium">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#050608] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-400/80 transition-all text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-mono text-slate-300 uppercase tracking-widest mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your opportunity, project or inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-[#050608] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-400/80 transition-all text-sm resize-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {statusMessage && (
                  <div
                    className={`p-3.5 rounded-xl text-xs font-mono flex items-center gap-2 ${
                      status === "success"
                        ? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-300"
                        : "bg-rose-500/10 border border-rose-500/25 text-rose-300"
                    }`}
                  >
                    {status === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : null}
                    <span>{statusMessage}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto btn-primary-tactile px-7 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <span>Dispatching Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto btn-secondary-tactile px-5 py-3.5 rounded-xl text-xs font-mono flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
