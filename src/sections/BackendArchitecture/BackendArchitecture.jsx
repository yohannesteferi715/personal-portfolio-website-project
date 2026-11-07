import { useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useAnimationFrame, useReducedMotion } from "motion/react";
import { Layers, ListChecks } from "lucide-react";
import { getTechIcon } from "@/lib/techIcons";

// Canvas matches the positioned HTML nodes. Top lane is the synchronous
// request/response path. The lower lane is background work and never joins it.
const VW = 980;
const VH = 430;

const REQUEST = "#20b2a6";
const RESPONSE = "#b7ddd7";
const CACHE = "#f5a623";
const BROKER = "#e07a6a";
const TASK = "#4eae78";

const NODES = [
  {
    id: "react",
    label: "React",
    sub: "Frontend",
    x: 120,
    y: 104,
    w: 156,
    h: 72,
    accent: "#61DAFB",
    icon: "React",
    desc: "Dispatches client requests and renders interactive UI states.",
  },
  {
    id: "api",
    label: "FastAPI / DRF",
    sub: "REST API",
    x: 360,
    y: 104,
    w: 170,
    h: 72,
    accent: "#20b2a6",
    icon: "FastAPI / DRF",
    desc: "Authenticates callers, validates schemas, and routes requests via FastAPI or Django REST Framework.",
  },
  {
    id: "logic",
    label: "Services",
    sub: "Logic & AI Agents",
    x: 620,
    y: 104,
    w: 176,
    h: 72,
    accent: "#34d399",
    icon: "layers",
    desc: "Executes business logic, coordinates data stores, and orchestrates Agentic RAG pipelines.",
  },
  {
    id: "db",
    label: "PostgreSQL",
    sub: "Database & Vectors",
    x: 860,
    y: 104,
    w: 164,
    h: 72,
    accent: "#6d8cff",
    icon: "PostgreSQL",
    desc: "Persists relational schemas and vector embeddings with ACID transactions and strict data integrity.",
  },
  {
    id: "redis",
    label: "Redis",
    sub: "Cache · Broker",
    x: 360,
    y: 312,
    w: 170,
    h: 72,
    accent: "#e85d4c",
    icon: "Redis",
    desc: "Provides in-memory caching for low latency and serves as message broker for job queues.",
  },
  {
    id: "celery",
    label: "Celery",
    sub: "Worker",
    x: 620,
    y: 312,
    w: 164,
    h: 72,
    accent: "#3f9d62",
    icon: "Celery",
    desc: "Consumes asynchronous message queues and processes background workloads off the critical path.",
  },
  {
    id: "tasks",
    label: "Async Jobs",
    sub: "Tasks & Pipelines",
    x: 860,
    y: 312,
    w: 164,
    h: 72,
    accent: "#7dcea0",
    icon: "tasks",
    desc: "Handles email dispatch, batch jobs, and non-blocking vector embedding pipelines.",
  },
];

const NODE_MAP = Object.fromEntries(NODES.map((node) => [node.id, node]));

// Edge-to-edge connectors. Request and response are parallel so both stay visible.
const PATHS = {
  req1: "M 198 94 H 275",
  req2: "M 445 94 H 530",
  req3: "M 708 94 H 778",
  res1: "M 778 116 H 708",
  res2: "M 530 116 H 445",
  res3: "M 275 116 H 198",
  cacheDown: "M 332 140 C 236 188 236 236 332 276",
  cacheUp: "M 332 276 C 236 236 236 188 332 140",
  broker: "M 388 140 C 492 188 492 236 388 276",
  toWorker: "M 445 312 H 538",
  toTasks: "M 702 312 H 778",
};

const LABELS = [
  { text: "request", x: 236, y: 82, fill: REQUEST },
  { text: "response", x: 236, y: 132, fill: RESPONSE },
  { text: "cache", x: 214, y: 212, fill: CACHE, anchor: "end" },
  { text: "broker", x: 512, y: 212, fill: BROKER, anchor: "start" },
  { text: "task", x: 492, y: 302, fill: TASK },
];

// Synchronous wave: a request travels right, then the response returns.
const STREAMS = [
  { id: "req1", path: "req1", dur: 1.2, every: 5, delay: 0, color: REQUEST, r: 4.4 },
  { id: "req2", path: "req2", dur: 1.2, every: 5, delay: 0.5, color: REQUEST, r: 4.4 },
  { id: "req3", path: "req3", dur: 1.2, every: 5, delay: 1.0, color: REQUEST, r: 4.4 },
  { id: "res1", path: "res1", dur: 1.1, every: 5, delay: 1.9, color: RESPONSE, r: 3.6 },
  { id: "res2", path: "res2", dur: 1.1, every: 5, delay: 2.35, color: RESPONSE, r: 3.6 },
  { id: "res3", path: "res3", dur: 1.1, every: 5, delay: 2.8, color: RESPONSE, r: 3.6 },
  { id: "cacheA", path: "cacheDown", dur: 2.3, every: 2.3, delay: 0, color: CACHE, r: 3.2 },
  { id: "cacheB", path: "cacheDown", dur: 2.3, every: 2.3, delay: 1.15, color: CACHE, r: 3.2 },
  { id: "cacheC", path: "cacheUp", dur: 2.3, every: 2.3, delay: 0.35, color: CACHE, r: 3.2 },
  { id: "cacheD", path: "cacheUp", dur: 2.3, every: 2.3, delay: 1.5, color: CACHE, r: 3.2 },
];

// One job at a time, with a long idle gap so it is obviously not every request.
const CHAIN = {
  cycle: 8.4,
  steps: [
    { path: "broker", at: 0.15, dur: 1.5, color: BROKER },
    { path: "toWorker", at: 1.75, dur: 1.2, color: TASK },
    { path: "toTasks", at: 3.05, dur: 1.2, color: TASK },
  ],
};

function streamProgress(time, { delay, dur, every }) {
  const local = ((time - delay) % every + every) % every;
  if (local > dur) return null;
  return local / dur;
}

function chainProgress(time) {
  const local = time % CHAIN.cycle;
  for (const step of CHAIN.steps) {
    if (local >= step.at && local <= step.at + step.dur) {
      return { ...step, u: (local - step.at) / step.dur };
    }
  }
  return null;
}

function edgeFade(u) {
  if (u < 0.16) return u / 0.16;
  if (u > 0.97) return (1 - u) / 0.03;
  return 1;
}

function nearNode(x, y, node) {
  const left = node.x - node.w / 2;
  const right = node.x + node.w / 2;
  const top = node.y - node.h / 2;
  const bottom = node.y + node.h / 2;
  const cx = Math.max(left, Math.min(x, right));
  const cy = Math.max(top, Math.min(y, bottom));
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy < 20 * 20;
}

const NodeIcon = ({ name }) => {
  if (name === "layers") return <Layers className="arch-ico w-[18px] h-[18px]" />;
  if (name === "tasks") return <ListChecks className="arch-ico w-[18px] h-[18px]" />;
  const { Icon } = getTechIcon(name);
  return <Icon className="arch-ico w-[18px] h-[18px]" />;
};

const ArchNode = ({ node, active, onEnter, onLeave, onTouch, onFocus, onBlur, nodeRef }) => (
  <button
    type="button"
    ref={nodeRef}
    className="arch-node glass absolute flex items-center gap-2.5 rounded-2xl border border-border/70 px-3 text-left outline-none"
    style={{
      left: `${(node.x / VW) * 100}%`,
      top: `${(node.y / VH) * 100}%`,
      width: `${(node.w / VW) * 100}%`,
      height: `${(node.h / VH) * 100}%`,
      "--accent": node.accent,
    }}
    onPointerEnter={onEnter}
    onPointerLeave={onLeave}
    onPointerDown={onTouch}
    onFocus={onFocus}
    onBlur={onBlur}
    aria-pressed={active}
    aria-label={`${node.label}. ${node.desc}`}
  >
    <span className="arch-ico-wrap flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-muted-foreground">
      <NodeIcon name={node.icon} />
    </span>
    <span className="min-w-0">
      <span className="block truncate text-[13px] font-semibold leading-none text-foreground/90">
        {node.label}
      </span>
      <span className="mt-1 block truncate text-[10px] leading-none text-muted-foreground">
        {node.sub}
      </span>
    </span>
  </button>
);

export const BackendArchitecture = () => {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(null);
  const pathRefs = useRef({});
  const particleRefs = useRef({});
  const trailRefs = useRef({});
  const chainRef = useRef(null);
  const chainTrailRef = useRef(null);
  const nodeRefs = useRef({});
  const litUntil = useRef({});

  const place = useCallback((el, trail, pathName, u, color) => {
    const path = pathRefs.current[pathName];
    if (!path || !el) return null;
    const len = path.getTotalLength();
    const point = path.getPointAtLength(len * Math.min(1, Math.max(0, u)));
    const fade = edgeFade(u);
    el.setAttribute("cx", point.x);
    el.setAttribute("cy", point.y);
    el.setAttribute("fill", color);
    el.setAttribute("opacity", fade.toFixed(3));
    if (trail) {
      const behind = Math.max(0, u - 0.16);
      const prev = path.getPointAtLength(len * behind);
      trail.setAttribute("cx", prev.x);
      trail.setAttribute("cy", prev.y);
      trail.setAttribute("fill", color);
      trail.setAttribute("opacity", (fade * 0.4 * (u > 0.08 ? 1 : 0)).toFixed(3));
    }
    return point;
  }, []);

  useAnimationFrame((timeMs) => {
    if (reduce) return;
    const time = timeMs / 1000;
    const arrivals = {};

    const note = (point, color) => {
      if (!point) return;
      for (const node of NODES) {
        if (nearNode(point.x, point.y, node)) {
          arrivals[node.id] = color;
        }
      }
    };

    for (const stream of STREAMS) {
      const u = streamProgress(time, stream);
      const el = particleRefs.current[stream.id];
      const trail = trailRefs.current[stream.id];
      if (u == null) {
        if (el) el.setAttribute("opacity", "0");
        if (trail) trail.setAttribute("opacity", "0");
        continue;
      }
      note(place(el, trail, stream.path, u, stream.color), stream.color);
    }

    const step = chainProgress(time);
    if (!step) {
      chainRef.current?.setAttribute("opacity", "0");
      chainTrailRef.current?.setAttribute("opacity", "0");
    } else {
      note(place(chainRef.current, chainTrailRef.current, step.path, step.u, step.color), step.color);
    }

    for (const node of NODES) {
      if (arrivals[node.id]) {
        litUntil.current[node.id] = { color: arrivals[node.id], until: time + 0.42 };
      }
      const el = nodeRefs.current[node.id];
      if (!el) continue;
      const info = litUntil.current[node.id];
      const on = Boolean(info && time < info.until);
      if ((el.dataset.lit === "1") !== on) el.dataset.lit = on ? "1" : "0";
      if (on) el.style.setProperty("--lit", info.color);
    }
  });

  const hover = useCallback((id) => (event) => {
    if (event.pointerType === "touch") return;
    setActiveId(id);
  }, []);

  const leave = useCallback((id) => (event) => {
    if (event.pointerType === "touch") return;
    setActiveId((current) => (current === id ? null : current));
  }, []);

  const touch = useCallback((id) => (event) => {
    if (event.pointerType !== "touch") return;
    setActiveId((current) => (current === id ? null : id));
  }, []);

  const active = activeId ? NODE_MAP[activeId] : null;

  return (
    <section id="backend-architecture" className="relative overflow-hidden py-8 md:py-12 scroll-mt-16">
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-8 md:mb-10 max-w-2xl text-center">
          <span className="animate-fade-in text-sm font-medium tracking-wider text-secondary-foreground uppercase">
            System Architecture
          </span>
          <h2 className="animate-fade-in animation-delay-100 mt-2 mb-3 text-4xl font-bold text-secondary-foreground md:text-5xl">
            How the Backend{" "}
            <span className="font-serif font-normal text-white italic">Works</span>
          </h2>
          <p className="animate-fade-in animation-delay-200 text-sm text-muted-foreground">
            Requests move through the API to the database. Cache and background jobs run beside that path.
          </p>
        </div>

        <div className="animate-fade-in animation-delay-300 mx-auto max-w-5xl">
          {/* Mobile swipe hint */}
          <div className="md:hidden flex items-center justify-center gap-1.5 text-xs text-muted-foreground/60 mb-2">
            <span>Scroll horizontally to view diagram flow</span>
            <span className="animate-pulse">→</span>
          </div>

          <div className="overflow-x-auto pb-1">
            <div
              className="relative mx-auto min-w-[840px]"
              style={{ aspectRatio: `${VW} / ${VH}` }}
            >
              <svg
                viewBox={`0 0 ${VW} ${VH}`}
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Backend flow. React sends a request through the FastAPI / Django API and services to PostgreSQL, and the response returns. Redis caches API reads on a separate curve and brokers occasional jobs to a Celery worker."
              >
                <defs>
                  <filter id="arch-particle-glow" x="-400%" y="-400%" width="900%" height="900%">
                    <feGaussianBlur stdDeviation="2.4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {Object.entries(PATHS).map(([id, d]) => (
                  <path
                    key={id}
                    ref={(el) => {
                      pathRefs.current[id] = el;
                    }}
                    d={d}
                    fill="none"
                    stroke="#8ea0ae"
                    strokeOpacity={id.startsWith("cache") || id === "broker" ? 0.28 : 0.22}
                    strokeWidth="1.15"
                    strokeLinecap="round"
                  />
                ))}

                {LABELS.map((label) => (
                  <text
                    key={label.text}
                    x={label.x}
                    y={label.y}
                    fill={label.fill}
                    fillOpacity="0.85"
                    fontSize="11"
                    fontFamily="Inter, sans-serif"
                    textAnchor={label.anchor || "middle"}
                  >
                    {label.text}
                  </text>
                ))}

                {STREAMS.map((stream) => (
                  <g key={stream.id} className="arch-particle" filter="url(#arch-particle-glow)">
                    <circle
                      ref={(el) => {
                        trailRefs.current[stream.id] = el;
                      }}
                      r={stream.r * 0.75}
                      opacity="0"
                    />
                    <circle
                      ref={(el) => {
                        particleRefs.current[stream.id] = el;
                      }}
                      r={stream.r}
                      opacity="0"
                    />
                  </g>
                ))}

                <g className="arch-particle" filter="url(#arch-particle-glow)">
                  <circle ref={chainTrailRef} r="2.6" opacity="0" />
                  <circle ref={chainRef} r="4" opacity="0" />
                </g>
              </svg>

              {NODES.map((node) => (
                <ArchNode
                  key={node.id}
                  node={node}
                  active={activeId === node.id}
                  nodeRef={(el) => {
                    nodeRefs.current[node.id] = el;
                  }}
                  onEnter={hover(node.id)}
                  onLeave={leave(node.id)}
                  onTouch={touch(node.id)}
                  onFocus={() => setActiveId(node.id)}
                  onBlur={() => setActiveId((current) => (current === node.id ? null : current))}
                />
              ))}
            </div>
          </div>

          <div className="relative mt-4 h-14">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="pointer-events-none absolute left-1/2 w-max max-w-[90%] -translate-x-1/2 text-center"
                >
                  <p className="text-sm font-semibold" style={{ color: active.accent }}>
                    {active.label}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">{active.sub}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{active.desc}</p>
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 text-xs text-muted-foreground/50 whitespace-nowrap"
                >
                  Click or hover any component to inspect its architecture role
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
