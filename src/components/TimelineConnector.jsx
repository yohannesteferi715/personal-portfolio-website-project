import { useState, useCallback, useEffect } from "react";

// ── Particle config ──────────────────────────────────────────────────────────
// 5 traveling particles with staggered delays + 3 occasional sparks
const PARTICLES = [
  { delay: 0,   duration: 5,   size: 3,   opacity: 0.8 },
  { delay: 1.2, duration: 6,   size: 2.5, opacity: 0.6 },
  { delay: 2.5, duration: 4.5, size: 3.5, opacity: 0.7 },
  { delay: 3.8, duration: 7,   size: 2,   opacity: 0.5 },
  { delay: 5.0, duration: 5.5, size: 3,   opacity: 0.65 },
];

const SPARKS = [
  { top: "15%", delay: 0,   duration: 2.5 },
  { top: "48%", delay: 1.8, duration: 3 },
  { top: "78%", delay: 0.8, duration: 2.2 },
];

/**
 * Animated SVG timeline connector with glowing particles and sparks.
 * Replaces the plain CSS div line while preserving its exact position.
 *
 * Positioning matches the original:
 *   mobile  → left:1px  (center of the original 2px line at left:0)
 *   desktop → left:50%
 */
export const TimelineConnector = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleEnter = useCallback(() => setIsHovered(true), []);
  const handleLeave = useCallback(() => setIsHovered(false), []);

  // Touch: activate on tap, deactivate after a delay
  const handleTouchStart = useCallback((e) => {
    // Don't prevent default — allow scrolling
    setIsHovered(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    // Delay deactivation so the effect is visible
    const t = setTimeout(() => setIsHovered(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // Cleanup on unmount
  useEffect(() => () => setIsHovered(false), []);

  return (
    <div
      className="absolute left-[1px] md:left-1/2 top-0 bottom-0 w-6 -translate-x-1/2 overflow-visible z-0"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="presentation"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient for the main line */}
          <linearGradient id="timeline-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#20b2a6" stopOpacity={isHovered ? 0.95 : 0.7} />
            <stop offset="50%" stopColor="#20b2a6" stopOpacity={isHovered ? 0.6 : 0.3} />
            <stop offset="100%" stopColor="#20b2a6" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="timeline-glow-filter" x="-200%" y="-10%" width="500%" height="120%">
            <feGaussianBlur stdDeviation={isHovered ? 3 : 2} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main line */}
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="url(#timeline-grad)"
          strokeWidth={isHovered ? 2.5 : 2}
          filter="url(#timeline-glow-filter)"
          strokeLinecap="round"
          style={{ transition: "stroke-width 0.3s ease" }}
        />
      </svg>

      {/* Traveling particles (HTML divs for smooth CSS transform animation) */}
      {PARTICLES.map((p, i) => (
        <div
          key={`particle-${i}`}
          className="timeline-particle"
          style={{
            "--p-delay": `${p.delay}s`,
            "--p-duration": isHovered ? `${p.duration * 0.6}s` : `${p.duration}s`,
            "--p-size": `${p.size}px`,
            "--p-opacity": p.opacity,
          }}
        />
      ))}

      {/* Occasional sparks */}
      {SPARKS.map((s, i) => (
        <div
          key={`spark-${i}`}
          className="timeline-spark"
          style={{
            "--spark-top": s.top,
            "--spark-delay": `${s.delay}s`,
            "--spark-duration": `${s.duration}s`,
          }}
        />
      ))}

      {/* Extra sparks on hover */}
      {isHovered && (
        <>
          <div className="timeline-spark timeline-spark-extra" style={{ "--spark-top": "30%", "--spark-delay": "0s", "--spark-duration": "1.5s" }} />
          <div className="timeline-spark timeline-spark-extra" style={{ "--spark-top": "65%", "--spark-delay": "0.5s", "--spark-duration": "1.8s" }} />
          <div className="timeline-spark timeline-spark-extra" style={{ "--spark-top": "88%", "--spark-delay": "0.3s", "--spark-duration": "1.2s" }} />
        </>
      )}
    </div>
  );
};
