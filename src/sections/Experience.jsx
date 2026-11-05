import { useApi } from "@/hooks/useApi";
import { Skeleton, SkeletonText, ApiError } from "@/components/Skeleton";
import { getTechIcon } from "@/lib/techIcons";
import { Briefcase, Calendar } from "lucide-react";

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
  const { data: experiences, loading, error } = useApi("/api/v1/experience", []);

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Experience that{" "}
            <span className="font-serif italic font-normal text-white">
              speaks volumes.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A timeline of my professional growth — building backend systems,
            designing APIs, and solving engineering problems.
          </p>
        </div>

        {error && <ApiError message={error} />}

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 timeline-glow"
          />

          <div className="space-y-16">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ExperienceSkeleton key={i} flipped={i % 2 !== 0} />
                ))
              : experiences?.map((exp, idx) => {
                  const isLeft = idx % 2 === 0;
                  const animClass = isLeft ? "animate-timeline-left" : "animate-timeline-right";

                  return (
                    <div
                      key={exp.id}
                      className="relative grid md:grid-cols-2 gap-8"
                    >
                      {/* Timeline dot with pulse */}
                      <div
                        className={`absolute left-0 md:left-1/2 top-0 z-10 ${
                          exp.current ? "animate-timeline-dot-active" : "animate-timeline-dot"
                        }`}
                        style={{ animationDelay: `${idx * 200}ms` }}
                      >
                        <div className="w-4 h-4 bg-primary rounded-full ring-4 ring-background relative">
                          {exp.current && (
                            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                          )}
                        </div>
                      </div>

                      {/* Card */}
                      <div
                        className={`pl-10 md:pl-0 ${animClass} ${
                          isLeft
                            ? "md:pr-16 md:text-right"
                            : "md:col-start-2 md:pl-16"
                        }`}
                        style={{ animationDelay: `${(idx + 1) * 200}ms` }}
                      >
                        <div className="timeline-card-hover glass p-6 rounded-2xl border border-primary/20 hover:border-primary/40">
                          {/* Period + current badge */}
                          <div className={`flex items-center gap-2 ${isLeft ? "md:justify-end" : ""} flex-wrap`}>
                            <div className={`flex items-center gap-2 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                              <Calendar className="w-4 h-4 text-primary" />
                              <span className="text-sm text-primary font-medium">
                                {exp.period}
                              </span>
                            </div>
                            {exp.current && (
                              <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                                Current
                              </span>
                            )}
                          </div>

                          {/* Role + company */}
                          <div className={`mt-3 flex items-start gap-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                            <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 ${isLeft ? "md:order-2" : ""}`}>
                              <Briefcase className="w-5 h-5 text-primary" />
                            </div>
                            <div className={isLeft ? "md:text-right" : ""}>
                              <h3 className="text-xl font-semibold">{exp.role}</h3>
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
                            <div className={`flex flex-wrap gap-2 mt-5 ${isLeft ? "md:justify-end" : ""}`}>
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
