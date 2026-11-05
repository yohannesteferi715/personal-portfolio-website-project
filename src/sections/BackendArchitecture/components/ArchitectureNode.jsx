import { motion } from "motion/react";

/**
 * A single node card in the architecture diagram.
 * Highlights when active, shows error state when the step is an error.
 */
export const ArchitectureNode = ({ node, isActive, status, index, total }) => {
  const Icon = node.icon;

  return (
    <motion.div
      layout
      animate={{
        scale: isActive ? 1.05 : 1,
        opacity: isActive ? 1 : 0.55,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative flex flex-col items-center gap-2 flex-1 min-w-0"
    >
      {/* Node card */}
      <div
        className={`relative w-full max-w-[140px] flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-400 ${
          isActive
            ? status === "error"
              ? "glass border-red-500/50"
              : "glass border-primary/50 glow-border"
            : "glass border-border/30"
        }`}
        style={{
          boxShadow: isActive
            ? status === "error"
              ? "0 0 20px rgba(239,68,68,0.2)"
              : `0 0 20px ${node.color}30`
            : "none",
        }}
      >
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300"
          style={{
            backgroundColor: isActive ? `${node.color}20` : `${node.color}10`,
          }}
        >
          <Icon
            className="w-5 h-5 transition-all duration-300"
            style={{
              color: isActive ? node.color : `${node.color}80`,
            }}
          />
        </div>

        {/* Label */}
        <span
          className="text-[11px] font-medium text-center leading-tight transition-colors duration-300"
          style={{ color: isActive ? node.color : "var(--color-muted-foreground)" }}
        >
          {node.label}
        </span>

        {/* Step number indicator */}
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
            style={{
              backgroundColor: status === "error" ? "#ef4444" : node.color,
              color: "#fff",
            }}
          >
            {index + 1}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
