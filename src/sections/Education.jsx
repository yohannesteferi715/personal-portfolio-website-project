import { useApi } from "@/hooks/useApi";
import { Skeleton, ApiError } from "@/components/Skeleton";
import {
  GraduationCap, Globe, Binary, CheckCircle2,
  Workflow, Brain, Cloud, Database, Layers,
  Code2, MapPin, Sparkles, Clock, Laptop, BookOpen,
} from "lucide-react";

// ── Coursework metadata: icons, colors, tags & conceptual scopes ─────────────
const COURSE_META = {
  "programming fundamentals & diverse languages": {
    icon: Code2,
    color: "#06b6d4",
    tag: "Multi-Language Core",
    description: "Imperative & object-oriented foundations across Python, C++, Java & JavaScript, memory models & typing disciplines.",
  },
  "data structures & algorithms (dsa)": {
    icon: Binary,
    color: "#f5a623",
    tag: "Algorithms & Complexity",
    description: "Asymptotic complexity (Big-O), dynamic programming, tree traversals, graph theory & spatial/temporal optimization.",
  },
  "web application development": {
    icon: Globe,
    color: "#20b2a6",
    tag: "Full-Stack & APIs",
    description: "Client-server architecture, modern responsive frameworks, RESTful API design, authentication & web security.",
  },
  "software testing & qa": {
    icon: CheckCircle2,
    color: "#10b981",
    tag: "TDD & Quality Control",
    description: "Test-Driven Development (TDD), unit & integration test suites, automated test execution & code verification standards.",
  },
  "sdlc & system design": {
    icon: Workflow,
    color: "#a855f7",
    tag: "Lifecycle & SRS/SDD",
    description: "Agile & Waterfall methodologies, formal SRS/SDD specification authoring, architectural patterns & UML diagrams.",
  },
  "machine learning (ml)": {
    icon: Brain,
    color: "#ec4899",
    tag: "AI & Neural Systems",
    description: "Supervised & unsupervised models, statistical analysis, neural networks, loss functions & vector representations.",
  },
  "cloud & distributed systems": {
    icon: Cloud,
    color: "#38bdf8",
    tag: "Cloud & Microservices",
    description: "Microservice decomposition, horizontal scaling, cloud deployment models, containerization & fault tolerance.",
  },
  "database management systems": {
    icon: Database,
    color: "#3b82f6",
    tag: "SQL & Normalization",
    description: "Relational schema design, 3NF normalization, ACID transaction mechanics, indexing strategies & SQL tuning.",
  },
  "object-oriented design (ood)": {
    icon: Layers,
    color: "#f97316",
    tag: "SOLID & Abstractions",
    description: "SOLID design principles, structural & behavioral design patterns, modular architecture & clean code abstractions.",
  },
};

// Smart fallback resolver for course name variations
const getCourseMeta = (courseName = "") => {
  const normalized = courseName.toLowerCase();
  for (const [key, meta] of Object.entries(COURSE_META)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return meta;
    }
  }

  if (normalized.includes("program") || normalized.includes("language"))
    return COURSE_META["programming fundamentals & diverse languages"];
  if (normalized.includes("dsa") || normalized.includes("algorithm") || normalized.includes("data structure"))
    return COURSE_META["data structures & algorithms (dsa)"];
  if (normalized.includes("web"))
    return COURSE_META["web application development"];
  if (normalized.includes("test") || normalized.includes("qa"))
    return COURSE_META["software testing & qa"];
  if (normalized.includes("sdlc") || normalized.includes("lifecycle") || normalized.includes("system design"))
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
    description: "Comprehensive software engineering curriculum and rigorous laboratory projects.",
  };
};

const DEFAULT_EDUCATION = [
  {
    id: 1,
    institution: "Haramaya University",
    degree: "B.Sc. in Software Engineering",
    field_of_study: "Software Engineering & Computer Science",
    start_date: "5-Year",
    end_date: "Program",
    description:
      "Completed a rigorous five-year Software Engineering degree combining computer science foundations, multi-language programming paradigms, algorithmic problem solving, system architecture, database design, and end-to-end SDLC methodologies. Combined deep theoretical analysis with extensive laboratory projects, software verification & testing, and an enterprise production capstone software project.",
    coursework: [
      "Programming Fundamentals & Diverse Languages",
      "Data Structures & Algorithms (DSA)",
      "Web Application Development",
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
      <Skeleton className="w-16 h-16 rounded-2xl" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-7 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
    <Skeleton className="h-20 w-full rounded-xl" />
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <Skeleton key={i} className="h-28 rounded-xl" />
      ))}
    </div>
  </div>
);

export const Education = () => {
  const { data: education, loading, error } = useApi("/api/v1/education", DEFAULT_EDUCATION);
  const items = education && education.length > 0 ? education : DEFAULT_EDUCATION;

  return (
    <section id="education" className="py-8 md:py-12 relative overflow-hidden scroll-mt-16">
      {/* Ambient background light */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

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
            Formal 5-year engineering program establishing deep principles in computer science, algorithmic efficiency,
            diverse programming languages, and end-to-end software development lifecycles.
          </p>
        </div>

        {error && <ApiError message={error} />}

        <div className="max-w-5xl mx-auto space-y-8">
          {loading
            ? Array.from({ length: 1 }).map((_, i) => <EducationSkeleton key={i} />)
            : items.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="glass rounded-3xl p-6 sm:p-8 md:p-10 border border-border/40 hover:border-primary/40 transition-all duration-300 shadow-2xl shadow-background/60 relative overflow-hidden group"
                >
                  {/* Subtle corner ambient light */}
                  <div className="absolute -top-24 -right-24 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all duration-500" />

                  {/* ── Top Header Row ────────────────────────────────────────── */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/30">
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* University Crest / Cap Icon */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary/25 via-primary/10 to-transparent border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(32,178,166,0.35)] transition-all duration-300">
                        <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                          {edu.degree}
                        </h3>

                        <div className="flex items-center gap-2 text-sm font-medium text-foreground/80 flex-wrap">
                          <span className="text-primary font-semibold">{edu.institution}</span>
                          <span className="text-muted-foreground/40">•</span>
                          <span className="text-muted-foreground">{edu.field_of_study}</span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-0.5 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            5-Year Professional Degree Program
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-muted-foreground/80">
                            <MapPin className="w-3.5 h-3.5 text-highlight" />
                            Addis Ababa / Haramaya, Ethiopia
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Badge */}
                    <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold glass border border-primary/40 text-primary bg-primary/5">
                        Accredited Curriculum
                      </span>
                      <span className="text-[11px] text-muted-foreground">Rigorous B.Sc. Standards</span>
                    </div>
                  </div>

                  {/* ── Degree Narrative Description ───────────────────────────── */}
                  <div className="py-6 border-b border-border/20">
                    <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-surface/40 border border-border/30">
                      <div className="w-1.5 self-stretch rounded-full bg-gradient-to-b from-primary via-primary/50 to-transparent flex-shrink-0" />
                      <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
                        {edu.description ||
                          "Completed a rigorous five-year Software Engineering degree combining computer science foundations, multi-language programming paradigms, algorithmic problem solving, system architecture, database design, and end-to-end SDLC methodologies. Combined deep theoretical analysis with extensive laboratory projects, software verification & testing, and an enterprise production capstone software project."}
                      </p>
                    </div>
                  </div>

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
                          {edu.coursework.length} Foundational Disciplines
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
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
                                style={{ boxShadow: `0 0 18px ${meta.color}25` }}
                              />

                              <div>
                                <div className="flex items-center justify-between gap-2 mb-2.5">
                                  <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover/course:scale-110 flex-shrink-0"
                                    style={{ backgroundColor: `${meta.color}18` }}
                                  >
                                    <CourseIcon className="w-4 h-4" style={{ color: meta.color }} />
                                  </div>
                                  <span
                                    className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md border text-right"
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

                                <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
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
                    <div className="p-3.5 rounded-xl glass border border-border/20 hover:border-primary/20 transition-colors">
                      <div className="text-xs font-semibold text-foreground">5-Year Program</div>
                      <div className="text-[10px] text-muted-foreground">Rigorous B.Sc. Standards</div>
                    </div>
                    <div className="p-3.5 rounded-xl glass border border-border/20 hover:border-primary/20 transition-colors">
                      <div className="text-xs font-semibold text-foreground">Multi-Language Core</div>
                      <div className="text-[10px] text-muted-foreground">Python, C++, Java, JS & OOP</div>
                    </div>
                    <div className="p-3.5 rounded-xl glass border border-border/20 hover:border-primary/20 transition-colors">
                      <div className="text-xs font-semibold text-foreground">Complete SDLC & QA</div>
                      <div className="text-[10px] text-muted-foreground">SRS to Production Deploy</div>
                    </div>
                    <div className="p-3.5 rounded-xl glass border border-border/20 hover:border-primary/20 transition-colors">
                      <div className="text-xs font-semibold text-foreground">Capstone Production</div>
                      <div className="text-[10px] text-muted-foreground">End-to-End Enterprise System</div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};
