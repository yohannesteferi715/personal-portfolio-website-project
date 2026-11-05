import { motion } from "motion/react";

const METHOD_COLORS = {
  GET: "#34d399",
  DELETE: "#ef4444",
};

/**
 * Three selectable scenario tabs.
 */
export const ScenarioSelector = ({ scenarios, activeId, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {scenarios.map((s) => {
        const isActive = s.id === activeId;
        const methodColor = METHOD_COLORS[s.method] || "#20b2a6";

        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              isActive
                ? "glass border-primary/40"
                : "glass border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/20"
            }`}
          >
            {/* Method badge */}
            <span
              className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono"
              style={{
                color: methodColor,
                backgroundColor: `${methodColor}15`,
              }}
            >
              {s.method}
            </span>

            <span className={isActive ? "text-foreground" : ""}>{s.label}</span>

            {/* Status badge */}
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                s.badge.includes("200")
                  ? "text-green-400 bg-green-500/10"
                  : s.badge.includes("401")
                    ? "text-orange-400 bg-orange-500/10"
                    : "text-red-400 bg-red-500/10"
              }`}
            >
              {s.badge}
            </span>

            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="scenario-active"
                className="absolute inset-0 rounded-xl border border-primary/30 pointer-events-none"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
