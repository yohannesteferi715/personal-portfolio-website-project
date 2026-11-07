import {
  FileText, Layers, Database, Code2,
  BookOpen, GitBranch, Shield, TrendingUp,
  Bot, Brain,
} from "lucide-react";

const PRACTICES = [
  {
    icon: Bot,
    title: "Agentic AI & RAG Architecture",
    description: "Designing autonomous multi-agent loops, semantic vector chunking, tool calling, and ground-truth evaluation to prevent hallucinations.",
  },
  {
    icon: FileText,
    title: "SRS & Software Design",
    description: "Writing formal Software Requirements Specifications (SRS) and architecture blueprints that ensure alignment and long-term maintainability.",
  },
  {
    icon: Layers,
    title: "System Architecture",
    description: "Designing clean, modular architectures with strict separation of concerns between API gateways, service layers, and data stores.",
  },
  {
    icon: Code2,
    title: "High-Performance APIs",
    description: "Engineering asynchronous FastAPI and DRF endpoints with Pydantic validation, connection pooling, and OpenAPI specs.",
  },
  {
    icon: Database,
    title: "Database Modeling & DSA",
    description: "Modeling relational schemas in PostgreSQL, vector embeddings, indexing strategies, and algorithmic performance optimization.",
  },
  {
    icon: Shield,
    title: "Security & Authorization",
    description: "Implementing JWT token rotation, OAuth2 social auth, granular role-based permissions (RBAC), and injection protection.",
  },
  {
    icon: GitBranch,
    title: "Clean Code & Modularity",
    description: "Writing readable, testable code adhering to SOLID principles, dependency injection, and comprehensive test coverage.",
  },
  {
    icon: TrendingUp,
    title: "Scalability & Resilience",
    description: "Architecting backend systems with Redis caching, Celery asynchronous task queues, Docker Compose, and reverse proxies.",
  },
];

export const Engineering = () => {
  return (
    <section id="engineering" className="py-8 md:py-12 relative overflow-hidden scroll-mt-16">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Engineering Practices
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 animate-fade-in animation-delay-100 text-secondary-foreground">
            Beyond Writing{" "}
            <span className="font-serif italic font-normal text-white">Code</span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Software engineering is more than implementation. These practices shape
            how I approach every project — from requirements to deployment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRACTICES.map((item, idx) => (
            <div
              key={idx}
              className="glass p-6 rounded-2xl animate-fade-in border border-border/40 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 cursor-default"
              style={{ animationDelay: `${(idx + 1) * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <item.icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-semibold mb-2 text-sm text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
