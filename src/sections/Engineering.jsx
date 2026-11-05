import {
  FileText, Layers, Database, Code2,
  BookOpen, GitBranch, Shield, TrendingUp,
} from "lucide-react";

const PRACTICES = [
  {
    icon: FileText,
    title: "SRS & SDD",
    description: "Writing Software Requirements Specifications and Software Design Descriptions that keep projects aligned and maintainable.",
  },
  {
    icon: Layers,
    title: "System Architecture",
    description: "Designing clean, modular architectures with proper separation of concerns between API, service, and data layers.",
  },
  {
    icon: Database,
    title: "Database Modeling",
    description: "Modeling relational schemas with proper normalization, indexing strategies, and data integrity constraints.",
  },
  {
    icon: Code2,
    title: "API Design",
    description: "Designing RESTful APIs with consistent conventions, proper HTTP status codes, and OpenAPI documentation.",
  },
  {
    icon: BookOpen,
    title: "Technical Documentation",
    description: "Documenting architecture decisions, API endpoints, and setup guides so other engineers can understand and contribute.",
  },
  {
    icon: GitBranch,
    title: "Clean Code Practices",
    description: "Writing readable, testable code with clear naming, single responsibility, and minimal complexity.",
  },
  {
    icon: Shield,
    title: "Security Practices",
    description: "Implementing JWT authentication, input validation, CORS, and protection against common vulnerabilities.",
  },
  {
    icon: TrendingUp,
    title: "Maintainability & Scalability",
    description: "Making technical decisions that keep systems maintainable as they grow — from schema design to deployment strategy.",
  },
];

export const Engineering = () => {
  return (
    <section id="engineering" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Engineering Practices
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Beyond Writing{" "}
            <span className="font-serif italic font-normal text-white">Code</span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Software engineering is more than implementation. These practices shape
            how I approach every project — from requirements to deployment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRACTICES.map((item, idx) => (
            <div
              key={idx}
              className="glass p-6 rounded-2xl animate-fade-in hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${(idx + 1) * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-sm">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
