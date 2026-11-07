import { useApi } from "@/hooks/useApi";
import { Skeleton, SkeletonText, ApiError } from "@/components/Skeleton";
import { GraduationCap } from "lucide-react";

const EducationSkeleton = () => (
  <div className="glass p-6 rounded-2xl space-y-4 border border-primary/10">
    <Skeleton className="h-5 w-2/3" />
    <Skeleton className="h-4 w-1/2" />
    <SkeletonText lines={2} />
  </div>
);

export const Education = () => {
  const { data: education, loading, error } = useApi("/api/v1/education", []);

  return (
    <section id="education" className="py-8 md:py-12 relative overflow-hidden scroll-mt-16">
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-8 md:mb-10">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Academic Background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 animate-fade-in animation-delay-100 text-secondary-foreground">
            Education
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Formal education and academic background in software engineering.
          </p>
        </div>

        {error && <ApiError message={error} />}

        <div className="space-y-6 max-w-3xl">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => <EducationSkeleton key={i} />)
            : education?.map((edu, idx) => (
                <div
                  key={edu.id}
                  className="glass p-6 md:p-8 rounded-2xl animate-fade-in border border-primary/20 hover:border-primary/40 transition-all duration-300 relative group overflow-hidden"
                  style={{ animationDelay: `${(idx + 1) * 150}ms` }}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{edu.degree}</h3>
                        <span className="inline-flex self-start sm:self-auto px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                          {edu.start_date} — {edu.end_date}
                        </span>
                      </div>
                      <p className="text-muted-foreground font-medium">{edu.institution}</p>
                      <p className="text-xs text-secondary-foreground font-mono mt-0.5">{edu.field_of_study}</p>
                      {edu.description && (
                        <p className="text-sm text-muted-foreground/90 mt-3 leading-relaxed">{edu.description}</p>
                      )}
                      {edu.coursework?.length > 0 && (
                        <div className="pt-2">
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70 mb-2">Key Coursework</p>
                          <div className="flex flex-wrap gap-2">
                            {edu.coursework.map((c, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-surface/80 text-xs rounded-lg text-muted-foreground border border-border/50 hover:border-primary/30 hover:text-foreground transition-colors"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};
