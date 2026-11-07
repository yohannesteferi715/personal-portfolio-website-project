import { Button } from "@/components/Button";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { SiGithub, SiX, SiTelegram } from "@icons-pack/react-simple-icons";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { Skeleton, SkeletonText, ApiError } from "@/components/Skeleton";
import { useApi } from "@/hooks/useApi";
import { getTechIcon } from "@/lib/techIcons";

// Inline LinkedIn SVG — not available in this package version
const SiLinkedin = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ICON_MAP = { github: SiGithub, x: SiX, linkedin: SiLinkedin, telegram: SiTelegram };

// Floating particles — stable between renders
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 7) % 100}%`,
  top: `${(i * 53 + 13) % 100}%`,
  duration: `${15 + (i % 20)}s`,
  delay: `${(i % 5)}s`,
}));

export const Hero = () => {
  const { data: profile, loading: profileLoading, error: profileError } = useApi("/api/v1/profile");
  const { data: skills, loading: skillsLoading } = useApi("/api/v1/skills", []);

  const skillNames = skills?.map((s) => s.name) ?? [];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/12 w-96 h-96 bg-primary/12 rounded-full blur-3xl pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20B2A6",
              left: p.left,
              top: p.top,
              animation: `slow-drift ${p.duration} ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-14 md:pb-16 relative z-10">
        {profileError && (
          <div className="mb-6">
            <ApiError message={profileError} />
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left column */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="animate-fade-in">
              {profileLoading ? (
                <Skeleton className="h-9 w-64 rounded-full" />
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  {profile?.title ?? "Backend & Agentic AI Engineer"}
                </span>
              )}
            </div>

            {/* Headline */}
            <div className="space-y-4">
              {profileLoading ? (
                <>
                  <Skeleton className="h-14 sm:h-16 w-full" />
                  <Skeleton className="h-14 sm:h-16 w-5/6" />
                  <Skeleton className="h-14 sm:h-16 w-4/6" />
                </>
              ) : (
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                  {profile?.headline_prefix ?? "Building"}{" "}
                  <span className="text-primary glow-text">
                    {profile?.headline_highlight ?? "scalable"}
                  </span>
                  <br />
                  {profile?.headline_suffix ?? "backend & agentic systems with"}
                  <br />
                  <span className="font-serif italic font-normal text-white">
                    {profile?.headline_italic ?? "precision."}
                  </span>
                </h1>
              )}

              {profileLoading ? (
                <SkeletonText lines={2} className="max-w-lg" />
              ) : (
                <p className="text-base sm:text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                  {profile?.bio ??
                    "Backend-focused full-stack and AI systems engineer specialized in Python (FastAPI, Django, DRF), React, and autonomous Agentic RAG architectures."}
                </p>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <Button size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Contact Me <ArrowRight className="w-5 h-5" />
              </Button>
              {profile?.cv_url ? (
                <a href={profile.cv_url} download>
                  <AnimatedBorderButton>
                    <Download className="w-5 h-5" />
                    Download CV
                  </AnimatedBorderButton>
                </a>
              ) : (
                <AnimatedBorderButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                  <Download className="w-5 h-5" />
                  Request CV
                </AnimatedBorderButton>
              )}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
              <span className="text-sm text-muted-foreground">Follow me:</span>
              {profileLoading
                ? Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} className="w-9 h-9 rounded-full" />
                  ))
                : profile?.social_links?.map((link, idx) => {
                    const Icon = ICON_MAP[link.platform] ?? SiGithub;
                    return (
                      <a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.platform}
                        className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
            </div>
          </div>

          {/* Right column — profile photo */}
          <div className="animate-fade-in animation-delay-300">
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-br from-primary/50 via-primary/25 to-highlight/15 blur-2xl opacity-90 animate-pulse" />
              <div className="relative glass rounded-3xl p-2 glow-border">
                {profileLoading ? (
                  <Skeleton className="w-full aspect-[4/5] rounded-2xl" />
                ) : (
                  <img
                    src={profile?.profile_photo_url ?? "/profile-photo.jpg"}
                    alt={profile?.name ?? "Profile"}
                    className="w-full aspect-[4/5] object-cover rounded-2xl"
                  />
                )}

                {/* Availability badge */}
                {!profileLoading && (
                  <>
                    <div className="absolute -bottom-3 sm:-bottom-4 -right-2 sm:-right-4 glass rounded-xl px-3 sm:px-4 py-2 sm:py-3 animate-float shadow-lg">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div
                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full animate-pulse ${
                            profile?.available_for_work
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        />
                        <span className="text-xs sm:text-sm font-medium">
                          {profile?.available_for_work
                            ? "Available for work"
                            : "Not available"}
                        </span>
                      </div>
                    </div>

                    <div className="absolute -top-3 sm:-top-4 -left-2 sm:-left-4 glass rounded-xl px-3 sm:px-4 py-2 sm:py-3 animate-float animation-delay-500 shadow-lg">
                      <div className="text-xl sm:text-2xl font-bold text-primary leading-tight">
                        {profile?.years_experience ?? 2}+
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Years Exp.</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tech marquee with icons */}
        <div className="mt-12 md:mt-14 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Technologies I work with
          </p>
          {skillsLoading ? (
            <div className="flex gap-8 overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-28 flex-shrink-0 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="marquee-pause relative overflow-hidden">
              {/* Edge fade */}
              <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

              <div className="flex animate-marquee-icons w-max">
                {[...skillNames, ...skillNames].map((skill, idx) => {
                  const { Icon, color } = getTechIcon(skill);
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 px-6 py-3 mx-2 rounded-2xl glass flex-shrink-0 hover:border-primary/30 hover:scale-105 transition-all duration-300 cursor-default"
                    >
                      <Icon
                        className="w-7 h-7 flex-shrink-0"
                        style={{ color }}
                      />
                      <span className="text-lg font-semibold text-muted-foreground/70 whitespace-nowrap">
                        {skill}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-800">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
