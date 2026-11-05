import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const STATUS_CONFIG = {
  processing: { Icon: Loader2, color: "#20b2a6", label: "Processing", spin: true },
  success: { Icon: CheckCircle, color: "#34d399", label: "Success", spin: false },
  error: { Icon: XCircle, color: "#ef4444", label: "Error", spin: false },
};

/**
 * Displays the current step's details: title, description, and a code snippet.
 */
export const StepDetails = ({ step, node }) => {
  if (!step || !node) return null;

  const config = STATUS_CONFIG[step.status] || STATUS_CONFIG.processing;
  const StatusIcon = config.Icon;

  return (
    <div className="glass rounded-2xl p-5 border border-border/30 min-h-[280px] flex flex-col">
      {/* Header: node name + status badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${node.color}15` }}
          >
            <node.icon className="w-4.5 h-4.5" style={{ color: node.color }} />
          </div>
          <div>
            <h4 className="text-sm font-semibold" style={{ color: node.color }}>
              {node.label}
            </h4>
            <p className="text-[10px] text-muted-foreground">{node.responsibility}</p>
          </div>
        </div>

        {/* Status badge */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
          style={{
            color: config.color,
            backgroundColor: `${config.color}10`,
            borderColor: `${config.color}30`,
          }}
        >
          <StatusIcon className={`w-3 h-3 ${config.spin ? "animate-spin" : ""}`} />
          {config.label}
          {step.httpStatus && (
            <span className="ml-1 opacity-70">{step.httpStatus}</span>
          )}
        </div>
      </div>

      {/* Title */}
      <AnimatePresence mode="wait">
        <motion.h5
          key={step.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-base font-semibold mb-2"
        >
          {step.title}
        </motion.h5>
      </AnimatePresence>

      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={step.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-muted-foreground leading-relaxed mb-4"
        >
          {step.description}
        </motion.p>
      </AnimatePresence>

      {/* Code snippet */}
      {step.codeSnippet && (
        <AnimatePresence mode="wait">
          <motion.pre
            key={step.codeSnippet}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 overflow-x-auto rounded-xl bg-background/80 border border-border/40 p-4 text-xs font-mono leading-relaxed text-muted-foreground"
          >
            <code>{step.codeSnippet}</code>
          </motion.pre>
        </AnimatePresence>
      )}
    </div>
  );
};
