import {
  Server, Database, Container, FileText,
  Code2, Shield, Layers, Rocket, Users, Lightbulb,
  Network, Boxes, Wrench, GitBranch,
} from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { Skeleton, SkeletonText, ApiError } from "@/components/Skeleton";

// Map ALL icon names that could be stored in DB to Lucide components + colors
const ICON_MAP = {
  Server:    { Icon: Server,    color: "#20b2a6" },
  Database:  { Icon: Database,  color: "#f5a623" },
  Container: { Icon: Container, color: "#2496ED" },
  FileText:  { Icon: FileText,  color: "#A78BFA" },
  Code2:     { Icon: Code2,     color: "#20b2a6" },
  Shield:    { Icon: Shield,    color: "#f5a623" },
  Layers:    { Icon: Layers,    color: "#A78BFA" },
  Rocket:    { Icon: Rocket,    color: "#FF6B6B" },
  Users:     { Icon: Users,     color: "#34D399" },
  Lightbulb: { Icon: Lightbulb, color: "#FBBF24" },
  Network:   { Icon: Network,   color: "#F472B6" },
  Boxes:     { Icon: Boxes,     color: "#A78BFA" },
  Wrench:    { Icon: Wrench,    color: "#34D399" },
  GitBranch: { Icon: GitBranch, color: "#F05032" },
};

const HighlightSkeleton = () => (
  <div className="glass p-6 rounded-2xl space-y-4">
    <Skeleton className="w-14 h-14 rounded-2xl" />
    <Skeleton className="h-5 w-2/3" />
    <SkeletonText lines={2} />
  </div>
);

export const About = () => {
  const { data: about, loading, error } = useApi("/api/v1/about");

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {error && <div className="mb-8"><ApiError message={error} /></div>}

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ── Left column — text ────────────────────────────────────────── */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              Engineering software
              <span className="font-serif italic font-normal text-white">
                {" "}that lasts.
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed animate-fade-in animation-delay-200">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonText key={i} lines={3} />
                  ))
                : about?.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {/* Mission quote card */}
            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary to-primary/20" />
              <p className="text-lg font-medium italic text-foreground pl-3">
                "{about?.mission_quote}"
              </p>
            </div>
          </div>

          {/* ── Right column — highlight cards ────────────────────────────── */}
          <div className="grid sm:grid-cols-2 gap-6" style={{ perspective: "1000px" }}>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <HighlightSkeleton key={i} />
                ))
              : about?.highlights?.map((item, idx) => {
                  const mapping = ICON_MAP[item.icon] ?? { Icon: Code2, color: "#20b2a6" };
                  const { Icon, color } = mapping;
                  const cardNum = String(idx + 1).padStart(2, "0");

                  return (
                    <div
                      key={idx}
                      className="about-card-glow animate-about-card glass rounded-2xl p-6 border border-border/30 group cursor-default"
                      style={{
                        animationDelay: `${(idx + 1) * 120}ms`,
                        "--card-color": color,
                      }}
                    >
                      {/* Card number in corner */}
                      <span
                        className="absolute top-4 right-5 text-3xl font-bold opacity-10 select-none"
                        style={{ color }}
                      >
                        {cardNum}
                      </span>

                      {/* Icon with pulsing glow ring */}
                      <div
                        className="about-card-icon w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative"
                        style={{
                          backgroundColor: `${color}15`,
                          "--card-color": `${color}40`,
                        }}
                      >
                        <Icon
                          className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
                          style={{ color }}
                        />
                      </div>

                      {/* Title + description */}
                      <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>

                      {/* Bottom accent line */}
                      <div
                        className="mt-4 h-0.5 w-12 rounded-full transition-all duration-500 group-hover:w-full"
                        style={{ backgroundColor: color, opacity: 0.4 }}
                      />
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
};
