import { useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { SkeletonCard, ApiError } from "@/components/Skeleton";
import { useApi } from "@/hooks/useApi";
import { getTechIcon } from "@/lib/techIcons";

const FILTERS = [
  { label: "All", value: null },
  { label: "Backend", value: "backend" },
  { label: "Frontend", value: "frontend" },
  { label: "Full-Stack", value: "full-stack" },
  { label: "DevOps", value: "devops" },
];

// Tech tag chip with brand icon
const TechTag = ({ tag, delay }) => {
  const { Icon, color } = getTechIcon(tag);
  return (
    <span
      className="animate-skill-chip skill-chip-hover flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground cursor-default"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon className="w-3.5 h-3.5" style={{ color }} />
      {tag}
    </span>
  );
};

export const Projects = () => {
  const { data: projects, loading, error } = useApi("/api/v1/projects", []);
  const [filter, setFilter] = useState(null);

  const filtered = filter
    ? (projects || []).filter((p) => p.category === filter)
    : projects || [];

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mx-auto max-w-3xl mb-12">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Projects that{" "}
            <span className="font-serif italic font-normal text-white">
              solve real problems
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A selection of projects demonstrating backend engineering capabilities,
            API design, and full-stack development.
          </p>
        </div>

        {/* Filter buttons */}
        {!loading && (projects || []).length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10 animate-fade-in animation-delay-300">
            {FILTERS.map((f) => (
              <button
                key={f.value || "all"}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === f.value
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="mb-8">
            <ApiError message={error} />
          </div>
        )}

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8" style={{ perspective: "1200px" }}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((project, idx) => (
                <article
                  key={project.id}
                  className="animate-project-card project-card-hover group glass rounded-2xl overflow-hidden border border-border/30"
                  style={{ animationDelay: `${(idx + 1) * 120}ms` }}
                >
                  {/* Image with zoom + overlay */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Hover action buttons */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-90">
                      {project.live_url && project.live_url !== "#" && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} live`}
                          className="p-4 rounded-full glass-strong hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {project.github_url && project.github_url !== "#" && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} on GitHub`}
                          className="p-4 rounded-full glass-strong hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                        >
                          <SiGithub className="w-5 h-5" />
                        </a>
                      )}
                    </div>

                    {/* Category badge */}
                    {project.category && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-strong text-xs font-medium text-primary border border-primary/20">
                        {project.category}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0" />
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {project.approach && (
                      <div className="space-y-1 p-3 rounded-xl bg-surface/50 border-l-2 border-primary/30">
                        <p className="text-xs text-primary font-medium uppercase tracking-wider">Approach</p>
                        <p className="text-sm text-muted-foreground">{project.approach}</p>
                      </div>
                    )}

                    {/* Tech tags with brand icons */}
                    {project.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag, i) => (
                          <TechTag
                            key={i}
                            tag={tag}
                            delay={(idx + 1) * 120 + i * 50}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
        </div>

        {!loading && filtered.length === 0 && !error && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
};
