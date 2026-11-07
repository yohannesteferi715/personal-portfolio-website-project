import { useApi } from "@/hooks/useApi";
import { Skeleton, ApiError } from "@/components/Skeleton";
import { getTechIcon } from "@/lib/techIcons";

import { Server, Code2, Database, Wrench, Layers, Bot } from "lucide-react";

const CATEGORY_META = {
  ai:          { label: "AI & Agentic Systems", color: "#a855f7", icon: Bot },
  backend:     { label: "Backend Architecture", color: "#20b2a6", icon: Server },
  frontend:    { label: "Frontend & UI",       color: "#61dafb", icon: Code2 },
  database:    { label: "Databases & DSA",     color: "#f5a623", icon: Database },
  devops:      { label: "DevOps & Cloud",      color: "#34d399", icon: Wrench },
  engineering: { label: "System Design & SRS", color: "#a78bfa", icon: Layers },
};

const CATEGORY_ORDER = ["ai", "backend", "frontend", "database", "devops", "engineering"];

// ── Compact animated skill chip ───────────────────────────────────────────────

const SkillChip = ({ name, delay }) => {
  const { Icon, color } = getTechIcon(name);

  return (
    <div
      className="animate-skill-chip group/chip relative flex flex-col items-center justify-center min-h-[76px] gap-1.5 px-2 py-2.5 rounded-xl glass border border-border/30 hover:border-transparent cursor-default transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover/chip:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 0 16px ${color}25` }}
      />
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/chip:scale-110"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-5 h-5 transition-transform duration-300 group-hover/chip:rotate-6" style={{ color }} />
      </div>
      {/* Name */}
      <span className="text-[11px] font-medium text-muted-foreground group-hover/chip:text-foreground transition-colors duration-200 text-center leading-tight line-clamp-2">
        {name}
      </span>
    </div>
  );
};

// ── Compact category card ─────────────────────────────────────────────────────

const CategoryCard = ({ category, skills, index }) => {
  const meta = CATEGORY_META[category] || { label: category, color: "#7a8491", icon: Code2 };
  const CatIcon = meta.icon;

  return (
    <div
      className="animate-skill-card glass rounded-2xl p-4 sm:p-5 border border-border/30 hover:border-primary/20 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 animate-skill-icon"
          style={{ backgroundColor: `${meta.color}15` }}
        >
          <CatIcon className="w-4 h-4" style={{ color: meta.color }} />
        </div>
        <h3 className="font-semibold text-xs uppercase tracking-wider" style={{ color: meta.color }}>
          {meta.label}
        </h3>
        <span className="text-[10px] text-muted-foreground/50 font-mono">{skills.length}</span>
        <div className="flex-1 h-px rounded-full" style={{ background: `linear-gradient(90deg, ${meta.color}25, transparent)` }} />
      </div>

      {/* Skill chips grid */}
      <div className="grid gap-2 sm:gap-2.5 grid-cols-2 min-[420px]:grid-cols-3 sm:grid-cols-4">
        {skills.map((skill, i) => (
          <SkillChip key={skill.id || i} name={skill.name} delay={index * 100 + i * 30} />
        ))}
      </div>
    </div>
  );
};

// ── Skeleton ──────────────────────────────────────────────────────────────────

const CardSkeleton = () => (
  <div className="glass rounded-2xl p-5 border border-border/30 space-y-4">
    <div className="flex items-center gap-2.5">
      <Skeleton className="w-8 h-8 rounded-lg" />
      <Skeleton className="h-3 w-20" />
    </div>
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-16 rounded-xl" />
      ))}
    </div>
  </div>
);

// ── Main section ──────────────────────────────────────────────────────────────

export const Skills = () => {
  const { data: skills, loading, error } = useApi("/api/v1/skills", []);

  const grouped = (skills || []).reduce((acc, s) => {
    const cat = s.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-8 md:py-12 relative overflow-hidden scroll-mt-16">
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-56 h-56 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Technical Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-3 animate-fade-in animation-delay-100 text-secondary-foreground">
            Skills &{" "}
            <span className="font-serif italic font-normal text-white">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-sm animate-fade-in animation-delay-200">
            My technical toolkit across AI & Agentic systems, backend architecture, frontend, databases, DevOps, and engineering practices.
          </p>
        </div>

        {error && <ApiError message={error} />}

        {/* Compact 2-column grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : CATEGORY_ORDER.filter((cat) => grouped[cat]?.length).map((cat, idx) => (
                <CategoryCard
                  key={cat}
                  category={cat}
                  skills={grouped[cat]}
                  index={idx}
                />
              ))}
        </div>
      </div>
    </section>
  );
};
