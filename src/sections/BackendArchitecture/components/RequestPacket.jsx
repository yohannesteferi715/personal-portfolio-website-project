import { motion } from "motion/react";

/**
 * Animated request packet that travels between nodes.
 * On desktop it moves horizontally (left), on mobile vertically (top).
 */
export const RequestPacket = ({ position, isError, isVertical }) => {
  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      initial={false}
      animate={
        isVertical
          ? { top: `${position}%`, left: "50%", translateX: "-50%" }
          : { left: `${position}%`, top: "50%", translateY: "-50%" }
      }
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-3.5 h-3.5 rounded-full"
        style={{
          backgroundColor: isError ? "#ef4444" : "#20b2a6",
          boxShadow: `0 0 12px 3px ${isError ? "#ef4444" : "#20b2a6"}`,
        }}
      />
    </motion.div>
  );
};
