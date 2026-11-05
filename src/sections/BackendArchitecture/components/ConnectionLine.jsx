import { motion } from "motion/react";

/**
 * Horizontal connection line between two adjacent nodes.
 * Glows when the packet is traveling along it.
 */
export const ConnectionLine = ({ active, isError, color }) => {
  return (
    <div className="flex-shrink-0 flex items-center justify-center w-6 md:w-10 h-full pt-5">
      <div className="relative w-full h-0.5 rounded-full bg-border/40">
        {/* Active glow overlay */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={false}
          animate={{
            opacity: active ? 1 : 0,
            scaleX: active ? 1 : 0.3,
          }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundColor: isError ? "#ef4444" : color || "#20b2a6",
            transformOrigin: "left",
            boxShadow: active
              ? `0 0 8px ${isError ? "#ef4444" : color || "#20b2a6"}`
              : "none",
          }}
        />
      </div>
    </div>
  );
};
