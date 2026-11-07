import { useApi } from "@/hooks/useApi";
import { Skeleton, ApiError } from "@/components/Skeleton";
import {
  GraduationCap, Globe, Binary, CheckCircle2,
  Workflow, Brain, Cloud, Database, Layers,
  Calendar, MapPin, Award, BookOpen, Sparkles, ShieldCheck,
} from "lucide-react";

// ── Coursework metadata: icons, colors, tags & concept scopes ────────────────
const COURSE_META = {
  "web application development": {
    icon: Globe,
    color: "#20b2a6",
    tag: "Full-Stack & APIs",
    description: "Client-server architecture, responsive frameworks, RESTful APIs, session management & web security.",
  },
  "data structures & algorithms (dsa)": {
    icon: Binary,
    color: "#f5a623",
    tag: "Complexity & Trees",
    description: "Asymptotic complexity (Big-O), dynamic programming, tree traversals, graph theory & optimization.",
  },
  "software testing & qa": {
    icon: CheckCircle2,
    color: "#10b981",
    tag: "TDD & Verification",
    description: "Test-Driven Development (TDD), unit/integration suites, automated pipelines & quality assurance standards.",
  },
  "sdlc & system design": {
    icon: Workflow,
    color: "#a855f7",
    tag: "Lifecycle & SRS/SDD",
    description: "Agile & Waterfall models, formal SRS/SDD specification authoring, architectural patterns & UML modeling.",
  },
  "machine learning (ml)": {
    icon: Brain,
    color: "#ec4899",
    tag: "AI & Neural Models",
    description: "Supervised and unsupervised models, statistical learning, neural networks, loss functions & vector spaces.",
  },
  "cloud & distributed systems": {
    icon: Cloud,
    color: "#38bdf8",
    tag: "Cloud & Scaling",
    description: "Microservice decomposition, horizontal scaling, cloud deployment models, containerization & resilience.",
  },
  "database management systems": {
    icon: Database,
    color: "#3b82f6",
    tag: "SQL & Normalization",
    description: "Relational schema design, 3NF normalization, ACID transaction mechanics, indexing & SQL tuning.",
  },
  "object-oriented design (ood)": {
    icon: Layers,
    color: "#f97316",
    tag: "SOLID Principles",
    description: "Encapsulation, polymorphism, structural design patterns, loose coupling & clean modular abstractions.",
  },
};

// Smart fallback course metadata resolver
const getCourseMeta = (courseName = "") => {
  const normalized = courseName.toLowerCase();
  for (const [key, meta] of Object.entries(COURSE_META)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return meta;
    }
  }

  // Keyword-based fallback matching
  if (normalized.includes("web")) return COURSE_META["web application development"];
  if (normalized.includes("dsa") || normalized.includes("algorithm") || normalized.includes("data structure"))
    return COURSE_META["data structures & algorithms (dsa)"];
  if (normalized.includes("test") || normalized.includes("qa"))
    return COURSE_META["software testing & qa"];
  if (normalized.includes("sdlc") || normalized.includes("lifecycle") || normalized.includes("software engineering"))
    return COURSE_META["sdlc & system design"];
  if (normalized.includes("machine") || normalized.includes("ml") || normalized.includes("ai"))
    return COURSE_META["machine learning (ml)"];
  if (normalized.includes("cloud") || normalized.includes("distributed"))
    return COURSE_META["cloud & distributed systems"];
  if (normalized.includes("data") || normalized.includes("sql") || normalized.includes("dbms"))
    return COURSE_META["database management systems"];
  if (normalized.includes("object") || normalized.includes("design") || normalized.includes("ood"))
    return COURSE_META["object-oriented design (ood)"];

  return {
    icon: BookOpen,
    color: "#20b2a6",
    tag: "Core Engineering",
    description: "Foundational software engineering curriculum and practical laboratory projects.",
  };
};

const DEFAULT_EDUCATION = [
  {
    id: 1,
    institution: "Haramaya University",
    degree: "B.Sc. in Software Engineering",
    field_of_study: "Software Engineering & Computer Science",
    start_date: "2019",
    end_date: "2023",
    description:
      "Completed an intensive four-year Software Engineering degree covering computer science fundamentals, algorithmic problem solving, system architecture, database design, and end-to-end SDLC methodologies. Combined deep theoretical analysis with extensive laboratory projects, software verification & testing, and an enterprise capstone software project.",
    coursework: [
      "Web Application Development",
      "Data Structures & Algorithms (DSA)",
      "Software Testing & QA",
      "SDLC & System Design",
      "Machine Learning (ML)",
      "Cloud & Distributed Systems",
      "Database Management Systems",
      "Object-Oriented Design (OOD)",
    ],
  },
];

const EducationSkeleton = () => (
  <div className="glass p-8 rounded-3xl space-y-6 border border-primary/20">
    <div className="flex gap-4 items-center">
      <Skeleton className="w-14 h-14 rounded-2xl" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
    <Skeleton className="h-16 w-full rounded-xl" />
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-24 rounded-xl" />
      ))}
    </div>
  </div>
);

export const Education = () => {
  const { data: education, loading, error } = useApi("/api/v1/education", DEFAULT_EDUCATION);
  const items = education && education.length > 0 ? education : DEFAULT_EDUCATION;

  return (
    <section id="education" className="py-8 md:py-12 relative overflow-hidden scroll-mt-16">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mb-8 md:mb-10 text-center mx-auto">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Academic Background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 animate-fade-in animation-delay-100 text-secondary-foreground">
            Education &{" "}
            <span className="font-serif italic font-normal text-white">
              Foundations
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200 text-sm max-w-2xl mx-auto">
            Formal degree program establishing rigorous principles in computer science, algorithmic efficiency,
            system architecture, and end-to-end software development lifecycles.
          </p>
        </div>

        {error && <ApiError message={error} />}

        <div className="max-w-5xl mx-auto space-y-8">
          {loading
            ? Array.from({ length: 1 }).map((_, i) => <EducationSkeleton key={i} />)
            : items.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="glass rounded-3xl p-6 sm:p-8 md:p-10 border border-border/40 hover:border-primary/40 transition-all duration-300 shadow-xl shadow-background/50 relative overflow-hidden group"
                >
                  {/* Subtle corner ambient glow */}
                  <div className="absolute -top-20 -right-20 w-52 h-52 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all duration-500" />

                  {/* ── Top Header Row ────────────────────────────────────────── */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/30">
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(32,178,166,0.3)] transition-all duration-300">
                        <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {edu.degree}
                          </h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Degree Conferred
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium text-foreground/80 flex-wrap">
                          <span className="text-primary font-semibold">{edu.institution}</span>
                          <span className="text-muted-foreground/40">•</span>
                          <span className="text-muted-foreground">{edu.field_of_study}</span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1 flex-wrap">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            {edu.start_date} — {edu.end_date}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-highlight" />
                            Addis Ababa / Haramaya, Ethiopia
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Badge */}
                    <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-medium glass border border-primary/30 text-primary">
                        4-Year Engineering Program
                      </span>
                      <span className="text-[11px] text-muted-foreground">Accredited B.Sc. Curriculum</span>
                    </div>
                  </div>

                  {/* ── Degree Narrative Description ───────────────────────────── */}
                  {edu.description && (
                    <div className="py-5 text-sm sm:text-base text-muted-foreground leading-relaxed border-b border-border/20">
                      <p>{edu.description}</p>
                    </div>
                  )}

                  {/* ── Key Coursework & Academic Pillars ───────────────────────── */}
                  {edu.coursework?.length > 0 && (
                    <div className="pt-6">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Key Courses & Academic Pillars
                          </h4>
                        </div>
                        <span className="text-xs text-muted-foreground/60 font-mono">
                          {edu.coursework.length} Core Subjects
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                        {edu.coursework.map((course, i) => {
                          const meta = getCourseMeta(course);
                          const CourseIcon = meta.icon;

                          return (
                            <div
                              key={i}
                              className="group/course relative glass p-4 rounded-xl border border-border/30 hover:border-transparent transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                            >
                              {/* Hover Glow */}
                              <div
                                className="absolute inset-0 rounded-xl opacity-0 group-hover/course:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{ boxShadow: `0 0 16px ${meta.color}25` }}
                              />

                              <div>
                                <div className="flex items-center justify-between gap-2 mb-2.5">
                                  <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover/course:scale-110"
                                    style={{ backgroundColor: `${meta.color}18` }}
                                  >
                                    <CourseIcon className="w-4 h-4" style={{ color: meta.color }} />
                                  </div>
                                  <span
                                    className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md border"
                                    style={{
                                      color: meta.color,
                                      borderColor: `${meta.color}30`,
                                      backgroundColor: `${meta.color}0c`,
                                    }}
                                  >
                                    {meta.tag}
                                  </span>
                                </div>

                                <h5 className="font-semibold text-xs text-foreground group-hover/course:text-primary transition-colors leading-snug mb-1.5">
                                  {course}
                                </h5>

                                <p className="text-[11px] text-muted-foreground/80 leading-relaxed line-clamp-3">
                                  {meta.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── Academic Pillars Strip (Bottom) ────────────────────────── */}
                  <div className="mt-8 pt-5 border-t border-border/30 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 rounded-xl glass border border-border/20">
                      <div className="text-xs font-semibold text-foreground">4-Year Degree</div>
                      <div className="text-[10px] text-muted-foreground">Rigorous B.Sc. Standards</div>
                    </div>
                    <div className="p-3 rounded-xl glass border border-border/20">
                      <div className="text-xs font-semibold text-foreground">DSA & Algorithms</div>
                      <div className="text-[10px] text-muted-foreground">Mathematical Foundations</div>
                    </div>
                    <div className="p-3 rounded-xl glass border border-border/20">
                      <div className="text-xs font-semibold text-foreground">Full SDLC & QA</div>
                      <div className="text-[10px] text-muted-foreground">SRS to Production Deploy</div>
                    </div>
                    <div className="p-3 rounded-xl glass border border-border/20">
                      <div className="text-xs font-semibold text-foreground">Cloud, Web & ML</div>
                      <div className="text-[10px] text-muted-foreground">Applied Modern Computing</div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};
