import { motion, AnimatePresence } from "motion/react";

/**
 * Step progress bar at the top of the diagram.
 * Shows dots for each step, with the current one highlighted.
 */
export const LifecycleTimeline = ({ steps, currentStep, onGoTo }) => {
  return (
    <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1">
      {steps.map((step, idx) => {
        const isCurrent = idx === currentStep;
        const isPast = idx < currentStep;
        const isError = step.status === "error" && (isCurrent || isPast);

        return (
          <button
            key={idx}
            onClick={() => onGoTo(idx)}
            className="group flex items-center gap-1.5 flex-shrink-0"
            aria-label={`Step ${idx + 1}: ${step.title}`}
          >
            {/* Dot */}
            <div
              className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isCurrent ? "scale-125" : ""
              }`}
              style={{
                backgroundColor: isError
                  ? "#ef4444"
                  : isCurrent
                    ? "#20b2a6"
                    : isPast
                      ? "#20b2a680"
                      : "#3a4451",
              }}
            >
              {isCurrent && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ backgroundColor: isError ? "#ef4444" : "#20b2a6" }}
                />
              )}
            </div>

            {/* Connector line between dots */}
            {idx < steps.length - 1 && (
              <div
                className="w-6 h-px rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isPast ? "#20b2a660" : "#2a3540",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
