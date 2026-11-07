import { useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { Skeleton, SkeletonText, ApiError } from "@/components/Skeleton";
import { getTechIcon } from "@/lib/techIcons";
import { Briefcase, Calendar, Sparkles } from "lucide-react";
import { TimelineConnector } from "@/components/TimelineConnector";

const DEFAULT_EXPERIENCES = [
  {
    id: 1,
    period: "2027",
    role: "High-Performance Systems & Agentic AI",
    company: "Deepening Focus & Advanced Innovation",
    description:
      "Advancing into asynchronous high-throughput architectures and autonomous agentic workflows. Engineering production-grade RAG systems, semantic vector search, LLM orchestration, and high-performance microservices with FastAPI.",
    employment_type: "Specialization & Innovation",
    technologies: ["FastAPI", "LLMs", "RAG Systems", "Agentic AI"],
    current: true,
  },
  {
    id: 2,
    period: "2026",
    role: "Modern Full-Stack & API Architecture",
    company: "Production Systems & Engineering Standards",
    description:
      "Scaled into enterprise frontend architecture and robust RESTful API design. Built reactive user interfaces with React.js and TypeScript, engineered production APIs with Django REST Framework (DRF), and authored formal Software Requirements Specifications (SRS) and software design blueprints.",
    employment_type: "Architecture & Engineering",
    technologies: ["React.js", "TypeScript", "REST APIs", "DRF", "SRS & Software Design"],
    current: false,
  },
  {
    id: 3,
    period: "2025",
    role: "Foundations & Core Backend Engineering",
    company: "Core Systems & Algorithms",
    description:
      "Established foundational computer science and engineering disciplines. Mastered data structures and algorithms (DSA), relational database schema design, and core web backend development with HTML, CSS, JavaScript, and pure Django.",
    employment_type: "Foundations & Core Systems",
    technologies: ["HTML", "CSS", "JavaScript", "Pure Django", "Database Design", "DSA"],
    current: false,
  },
];

const ExperienceSkeleton = ({ flipped }) => (
  <div className="relative grid md:grid-cols-2 gap-8">
    <div className={`pl-8 md:pl-0 ${flipped ? "md:col-start-2 md:pl-16" : "md:pr-16"}`}>
      <div className="glass p-6 rounded-2xl border border-primary/10 space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <SkeletonText lines={3} />
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const Experience = () => {
  const containerRef = useRef(null);
  const [tapSignal, setTapSignal] = useState(null);
  const { data: experiences, loading, error } = useApi("/api/v1/experience", DEFAULT_EXPERIENCES);
  const items = experiences && experiences.length > 0 ? experiences : DEFAULT_EXPERIENCES;

  const handlePulse = (idx) => {
    const ratio = idx / Math.max(1, items.length - 1);
    setTapSignal({ fromRatio: ratio, timestamp: Date.now() });
  };

  return (
    <section id="experience" className="py-8 md:py-12 relative overflow-hidden scroll-mt-16">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mb-8 md:mb-10">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 animate-fade-in animation-delay-100 text-secondary-foreground">
            Experience that{" "}
            <span className="font-serif italic font-normal text-white">
              speaks volumes.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A chronological timeline of my professional growth & technical evolution — building backend architectures,
            modern full-stack applications, and autonomous agentic AI systems.
          </p>
        </div>

        {error && <ApiError message={error} />}

        {/* Timeline */}
        <div className="relative" ref={containerRef}>
          {/* Animated SVG connector with scroll & tap-reactive glowing particles */}
          <TimelineConnector containerRef={containerRef} tapSignal={tapSignal} />

          <div className="space-y-8 md:space-y-10">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <ExperienceSkeleton key={i} flipped={i % 2 !== 0} />
                ))
              : items.map((exp, idx) => {
                  const isLeft = idx % 2 === 0;
                  const animClass = isLeft ? "animate-timeline-left" : "animate-timeline-right";

                  return (
                    <div
                      key={exp.id || idx}
                      className="relative grid md:grid-cols-2 gap-8"
                    >
                      {/* Timeline dot with interactive tap ripple */}
                      <button
                        type="button"
                        onClick={() => handlePulse(idx)}
                        className={`absolute left-0 md:left-1/2 top-0 z-10 -translate-x-1/2 group/dot cursor-pointer focus:outline-none transition-transform hover:scale-125 ${
                          exp.current ? "animate-timeline-dot-active" : "animate-timeline-dot"
                        }`}
                        style={{ animationDelay: `${idx * 200}ms` }}
                        aria-label={`Pulse timeline from ${exp.period}`}
                        title="Click to pulse energy down the line"
                      >
                        <div className="w-5 h-5 bg-primary rounded-full ring-4 ring-background relative flex items-center justify-center transition-all duration-300 group-hover/dot:ring-primary/40 group-hover/dot:shadow-[0_0_14px_#20b2a6]">
                          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_#fff]" />
                          {exp.current && (
                            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                          )}
                        </div>
                      </button>

                      {/* Card */}
                      <div
                        className={`pl-10 md:pl-0 ${animClass} ${
                          isLeft
                            ? "md:pr-14 text-left"
                            : "md:col-start-2 md:pl-14 text-left"
                        }`}
                        style={{ animationDelay: `${(idx + 1) * 200}ms` }}
                      >
                        <div
                          className="timeline-card-hover glass p-5 sm:p-6 rounded-2xl border border-primary/20 hover:border-primary/40 text-left cursor-pointer group/card transition-all"
                          onClick={() => handlePulse(idx)}
                          title="Click card to trigger energy pulse"
                        >
                          {/* Period + current badge */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span className="text-sm text-primary font-medium">
                                {exp.period}
                              </span>
                            </div>
                            {exp.current ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20 flex items-center gap-1">
                                <Sparkles className="w-3 h-3 animate-spin-slow" />
                                Current Focus
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground/50 font-mono">
                                Milestone
                              </span>
                            )}
                          </div>

                          {/* Role + company */}
                          <div className="mt-3 flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/card:bg-primary/20 transition-colors">
                              <Briefcase className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold group-hover/card:text-primary transition-colors">
                                {exp.role}
                              </h3>
                              <p className="text-muted-foreground text-sm">{exp.company}</p>
                              {exp.employment_type && (
                                <span className="text-xs text-muted-foreground/60 mt-0.5 inline-block">
                                  {exp.employment_type}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                            {exp.description}
                          </p>

                          {/* Tech tags with brand icons */}
                          {exp.technologies?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-5">
                              {exp.technologies.map((tech, i) => {
                                const { Icon, color } = getTechIcon(tech);
                                return (
                                  <span
                                    key={i}
                                    className="animate-skill-chip flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-xl text-xs border border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all duration-200"
                                    style={{ animationDelay: `${(idx + 1) * 200 + i * 50}ms` }}
                                  >
                                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                                    {tech}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
};
