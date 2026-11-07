import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { Skeleton, SkeletonText, ApiError } from "@/components/Skeleton";

const TestimonialSkeleton = () => (
  <div className="glass p-8 rounded-3xl md:p-12 glow-border space-y-6">
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-1 flex-1 rounded-full" />
      ))}
    </div>
    <SkeletonText lines={3} />
    <div className="flex items-center gap-4">
      <Skeleton className="w-14 h-14 rounded-full flex-shrink-0" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  </div>
);

export const Testimonials = () => {
  const { data: testimonials, loading, error } = useApi("/api/v1/testimonials", []);
  const [activeIdx, setActiveIdx] = useState(0);

  const count = testimonials?.length ?? 0;
  const current = testimonials?.[activeIdx] ?? null;

  const next = () => setActiveIdx((prev) => (prev + 1) % count);
  const previous = () => setActiveIdx((prev) => (prev - 1 + count) % count);

  return (
    <section id="testimonials" className="py-8 md:py-12 relative overflow-hidden scroll-mt-16">
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            What People Say
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 animate-fade-in animation-delay-100 text-secondary-foreground">
            Kind words from{" "}
            <span className="font-serif italic font-normal text-white">
              amazing people.
            </span>
          </h2>
        </div>

        {error && <ApiError message={error} />}

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <TestimonialSkeleton />
          ) : (
            <div className="relative">
              {/* Main testimonial card */}
              <div
                key={activeIdx}
                className="glass p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl glow-border animate-fade-in"
              >
                <div className="absolute -top-4 left-6 sm:left-8 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-primary flex items-center justify-center">
                  <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>

                <blockquote className="text-base sm:text-xl md:text-2xl font-medium leading-relaxed mb-6 sm:mb-8 pt-3 sm:pt-4">
                  "{current?.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  {current?.avatar_url ? (
                    <img
                      src={current.avatar_url}
                      alt={current?.author || "Author"}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg ring-2 ring-primary/20">
                      {current?.author?.charAt(0) || "U"}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">{current?.author}</div>
                    <div className="text-sm text-muted-foreground">{current?.role}</div>
                  </div>
                </div>
              </div>

              {/* Navigation — only show when there is more than 1 testimonial */}
              {count > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    onClick={previous}
                    aria-label="Previous testimonial"
                    className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
                  >
                    <ChevronLeft />
                  </button>

                  <div className="flex gap-2">
                    {testimonials?.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        aria-label={`Go to testimonial ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === activeIdx
                            ? "w-8 bg-primary"
                            : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
                  >
                    <ChevronRight />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
