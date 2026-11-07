import { useState, useCallback, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";

// Staggered ambient beads traveling between milestone years
const AMBIENT_BEADS = [
  { delay: 0,   duration: 4.8, size: 3.5, color: "#20b2a6" },
  { delay: 1.6, duration: 5.4, size: 3.0, color: "#61dafb" },
  { delay: 3.2, duration: 4.4, size: 3.2, color: "#a855f7" },
];

/**
 * Animated timeline connector with scroll-reactive glowing points and tap surge pulses.
 * Connects the milestone years (2027 → 2026 → 2025) with dynamic data flow.
 */
export const TimelineConnector = ({ containerRef, tapSignal }) => {
  const shouldReduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [tapPulses, setTapPulses] = useState([]);
  const lineRef = useRef(null);

  // Scroll tracking across the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.3,
    restDelta: 0.001,
  });

  const pointTop = useTransform(smoothProgress, [0, 1], ["2%", "98%"]);
  const fillHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const triggerPulse = useCallback((fromRatio = 0) => {
    if (shouldReduce) return;
    const id = Date.now() + Math.random();
    setTapPulses((prev) => [...prev.slice(-3), { id, startRatio: fromRatio }]);
    setTimeout(() => {
      setTapPulses((prev) => prev.filter((p) => p.id !== id));
    }, 1200);
  }, [shouldReduce]);

  // Trigger from outside signal (e.g. clicking a year dot or card)
  useEffect(() => {
    if (tapSignal && tapSignal.timestamp) {
      triggerPulse(tapSignal.fromRatio ?? 0);
    }
  }, [tapSignal, triggerPulse]);

  // Click / tap directly on the line
  const handleLineClick = (e) => {
    if (!lineRef.current) return;
    const rect = lineRef.current.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    triggerPulse(clickRatio);
  };

  return (
    <div
      ref={lineRef}
      onClick={handleLineClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute left-[1px] md:left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 overflow-visible z-0 cursor-pointer group/line"
      title="Tap or click to send energy pulse through the timeline"
      role="presentation"
    >
      {/* ── Base Track (Subtle guide line between years) ─────────── */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/30 via-primary/20 to-transparent transition-colors duration-300 group-hover/line:bg-primary/40" />

      {/* ── Scroll-Linked Dynamic Progress Line ─────────────────────── */}
      {!shouldReduce && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2.5px] rounded-full origin-top pointer-events-none"
          style={{
            height: fillHeight,
            background: "linear-gradient(to bottom, #20b2a6, #61dafb, #a855f7)",
            boxShadow: isHovered
              ? "0 0 12px 1px rgba(97, 218, 251, 0.8)"
              : "0 0 8px 1px rgba(32, 178, 166, 0.5)",
          }}
        />
      )}

      {/* ── Scroll-Driven Radiant Energy Point (Travels as you scroll) */}
      {!shouldReduce && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
          style={{ top: pointTop }}
        >
          <div className="relative flex items-center justify-center">
            {/* Outer halo */}
            <span className="absolute w-5 h-5 rounded-full bg-primary/30 blur-[3px] animate-pulse" />
            {/* Glowing core */}
            <span className="w-3.5 h-3.5 rounded-full bg-white border-2 border-primary shadow-[0_0_12px_3px_#20b2a6] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </span>
          </div>
        </motion.div>
      )}

      {/* ── Tap Surge Packets (Point shoots down line on tap) ──────── */}
      {tapPulses.map((pulse) => (
        <motion.div
          key={pulse.id}
          initial={{ top: `${pulse.startRatio * 100}%`, opacity: 1, scale: 0.9 }}
          animate={{
            top: `${Math.min(100, (pulse.startRatio + 0.6) * 100)}%`,
            opacity: [0.9, 1, 0],
            scale: [1, 1.4, 0.6],
          }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
        >
          <div className="relative flex flex-col items-center">
            {/* Radiant photon point */}
            <div className="w-4 h-4 rounded-full bg-cyan-300 shadow-[0_0_18px_4px_#38bdf8] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#fff]" />
            </div>
            {/* Trailing light streak */}
            <div className="w-[2px] h-12 -mt-12 bg-gradient-to-t from-cyan-400 via-primary/60 to-transparent blur-[0.5px]" />
          </div>
        </motion.div>
      ))}

      {/* ── Ambient Traveling Beads (Continuous data flow) ─────────── */}
      {!shouldReduce &&
        AMBIENT_BEADS.map((bead, i) => (
          <div
            key={`ambient-bead-${i}`}
            className="timeline-ambient-bead"
            style={{
              "--bead-delay": `${bead.delay}s`,
              "--bead-duration": isHovered ? `${bead.duration * 0.6}s` : `${bead.duration}s`,
              "--bead-size": `${bead.size}px`,
              "--bead-color": bead.color,
            }}
          />
        ))}

      {/* ── Micro Sparks on hover / tap ────────────────────────────── */}
      {isHovered && (
        <>
          <div className="timeline-spark timeline-spark-extra" style={{ "--spark-top": "25%", "--spark-delay": "0s", "--spark-duration": "1.2s" }} />
          <div className="timeline-spark timeline-spark-extra" style={{ "--spark-top": "50%", "--spark-delay": "0.3s", "--spark-duration": "1.4s" }} />
          <div className="timeline-spark timeline-spark-extra" style={{ "--spark-top": "75%", "--spark-delay": "0.6s", "--spark-duration": "1.3s" }} />
        </>
      )}
    </div>
  );
};
