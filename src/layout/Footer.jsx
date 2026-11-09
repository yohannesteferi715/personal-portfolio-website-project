import { ArrowUp, Terminal, Mail, MapPin, Send, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { SiGithub, SiX, SiTelegram } from "@icons-pack/react-simple-icons";
import { useApi } from "@/hooks/useApi";

// Inline LinkedIn SVG
const SiLinkedin = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ICON_MAP = { github: SiGithub, x: SiX, linkedin: SiLinkedin, telegram: SiTelegram };

export const Footer = () => {
  const { data: profile } = useApi("/api/v1/profile");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#backend-architecture", label: "Architecture" },
    { href: "#skills", label: "Skills & Stack" },
    { href: "#projects", label: "Featured Work" },
    { href: "#experience", label: "Career Journey" },
    { href: "#education", label: "Academic Core" },
    { href: "#contact", label: "Get In Touch" },
  ];

  const focusAreas = [
    "High-Throughput APIs (FastAPI & DRF)",
    "Autonomous Agentic AI & RAG",
    "PostgreSQL & Vector Embeddings",
    "Async Caching & Queues (Redis/Celery)",
    "Full-Stack React & TypeScript",
  ];

  return (
    <footer className="relative border-t border-border/50 bg-background/90 backdrop-blur-xl pt-14 pb-8 mt-16 overflow-hidden">
      {/* Top subtle gradient highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/3 w-96 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-28 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* ── Brand & Engineering Bio (Col 1 — 5 columns) ─────────── */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-flex items-center gap-3 group cursor-pointer"
              aria-label="Back to top"
            >
              <div className="w-9 h-9 rounded-xl glass border border-primary/30 flex items-center justify-center font-mono font-bold text-sm text-primary group-hover:border-primary group-hover:shadow-[0_0_16px_rgba(32,178,166,0.35)] transition-all">
                YT
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                  Yohannes Teferi
                </span>
                <span className="text-xs text-primary font-mono tracking-wide">
                  {profile?.title || "Backend-Heavy Full-Stack & Agentic AI Engineer"}
                </span>
              </div>
            </a>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Architecting high-efficiency backends, robust REST APIs, and autonomous agentic AI workflows with full-stack execution and precision.
            </p>

            {/* Live Availability Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border/60 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for high-impact engineering roles & consulting</span>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-2.5 pt-1">
              {profile?.social_links?.map((link, idx) => {
                const Icon = ICON_MAP[link.platform] ?? SiGithub;
                return (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Yohannes on ${link.platform}`}
                    className="w-9 h-9 rounded-xl glass border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:scale-105 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Engineering Specializations (Col 2 — 3 columns) ───────── */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Core Pillars</span>
            </h4>
            <ul className="space-y-2">
              {focusAreas.map((item, i) => (
                <li key={i} className="text-xs text-muted-foreground/90 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Navigation (Col 3 — 2 columns) ───────────────────────── */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-foreground hover:translate-x-0.5 transition-all inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Direct Channels (Col 4 — 2 columns) ──────────────────── */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
              Direct Channels
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile?.email || "yteferi964@gmail.com")}&su=${encodeURIComponent("Portfolio Inquiry - Yohannes Teferi")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors group"
                  title="Compose email directly in Gmail"
                >
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>{profile?.email || "yteferi964@gmail.com"}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/yoni715"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors group"
                >
                  <Send className="w-3.5 h-3.5 text-primary" />
                  <span>@yoni715</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/yohannesteferi715"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors group"
                >
                  <SiGithub className="w-3.5 h-3.5 text-primary" />
                  <span>yohannesteferi715</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li className="flex items-center gap-2 pt-1 text-muted-foreground/80">
                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar / Copyright ─────────────────────────────────── */}
        <div className="border-t border-border/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span>
              &copy; {new Date().getFullYear()} {profile?.name || "Yohannes Teferi"}. All rights reserved.
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="text-muted-foreground/80 flex items-center justify-center sm:justify-start gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>Architected with FastAPI, PostgreSQL & React</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface/60 border border-border/40 text-[11px] font-mono text-muted-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>API v4.0.0</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl glass hover:text-primary hover:border-primary/40 transition-all cursor-pointer text-xs font-medium group"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
