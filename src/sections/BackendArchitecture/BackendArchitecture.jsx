import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

import { NODES, NODE_INDEX } from "./data/architecture";
import { SCENARIOS } from "./data/scenarios";
import { useRequestAnimation } from "./hooks/useRequestAnimation";

import { ArchitectureNode } from "./components/ArchitectureNode";
import { ConnectionLine } from "./components/ConnectionLine";
import { RequestPacket } from "./components/RequestPacket";
import { StepDetails } from "./components/StepDetails";
import { AnimationControls } from "./components/AnimationControls";
import { ScenarioSelector } from "./components/ScenarioSelector";
import { LifecycleTimeline } from "./components/LifecycleTimeline";

export const BackendArchitecture = () => {
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [isVertical, setIsVertical] = useState(false);

  const containerRef = useRef(null);
  const mediaRef = useRef(null);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0];
  const steps = scenario.steps;

  const {
    currentStep,
    isPlaying,
    isFinished,
    play,
    pause,
    next,
    prev,
    replay,
    reset,
    goTo,
  } = useRequestAnimation(steps);

  const step = steps[currentStep];
  const activeNode = NODES.find((n) => n.id === step?.nodeId) ?? NODES[0];

  // Calculate packet position as a percentage along the diagram
  const packetPosition = step
    ? (NODE_INDEX[step.nodeId] / (NODES.length - 1)) * 100
    : 0;

  // Detect mobile layout for vertical packet animation
  useEffect(() => {
    const check = () => setIsVertical(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Determine which connections are active (between current and prev node)
  const prevNodeIdx = currentStep > 0 ? NODE_INDEX[steps[currentStep - 1].nodeId] : 0;
  const currNodeIdx = NODE_INDEX[step?.nodeId] ?? 0;
  const isMovingBack = currNodeIdx < prevNodeIdx;

  return (
    <section
      id="backend-architecture"
      className="py-32 relative overflow-hidden"
      aria-label="How the Backend Works"
    >
      {/* Background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Backend Architecture
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 animate-fade-in animation-delay-100 text-secondary-foreground">
            How the Backend{" "}
            <span className="font-serif italic font-normal text-white">Works</span>
          </h2>
          <p className="text-muted-foreground text-sm animate-fade-in animation-delay-200 max-w-2xl mx-auto">
            Explore how a request travels through the backend — from API entry and
            authentication to business logic, database operations, and the final response.
          </p>
        </div>

        {/* Scenario selector */}
        <div className="flex justify-center mb-8 animate-fade-in animation-delay-300">
          <ScenarioSelector
            scenarios={SCENARIOS}
            activeId={scenarioId}
            onSelect={setScenarioId}
          />
        </div>

        {/* Scenario description */}
        <div className="text-center mb-8">
          <p className="text-xs text-muted-foreground">
            <span className="font-mono text-primary">{scenario.method}</span>{" "}
            <span className="font-mono">{scenario.endpoint}</span>
            {" — "}
            {scenario.description}
          </p>
        </div>

        {/* Architecture diagram + packet */}
        <div
          ref={containerRef}
          className="relative mb-6 animate-fade-in animation-delay-400"
        >
          {/* Request packet */}
          <RequestPacket
            position={packetPosition}
            isError={step?.status === "error"}
            isVertical={isVertical}
          />

          {/* Nodes row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-start gap-2 md:gap-0 relative">
            {NODES.map((node, idx) => (
              <div key={node.id} className="contents">
                <ArchitectureNode
                  node={node}
                  isActive={step?.nodeId === node.id}
                  status={step?.status}
                  index={currentStep}
                />
                {/* Connection line between this node and the next */}
                {idx < NODES.length - 1 && (
                  <ConnectionLine
                    active={
                      step?.nodeId === node.id || step?.nodeId === NODES[idx + 1].id
                    }
                    isError={step?.status === "error"}
                    color={node.color}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step progress timeline */}
        <LifecycleTimeline steps={steps} currentStep={currentStep} onGoTo={goTo} />

        {/* Step details + controls */}
        <div className="grid lg:grid-cols-3 gap-4 animate-fade-in animation-delay-500">
          {/* Step details (takes 2 cols) */}
          <div className="lg:col-span-2">
            <StepDetails step={step} node={activeNode} />
          </div>

          {/* Controls panel */}
          <div className="glass rounded-2xl p-5 border border-border/30 flex flex-col justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Playback
              </p>
              <p className="text-sm font-medium mb-4">
                Step {currentStep + 1} of {steps.length}
              </p>
              <p className="text-xs text-muted-foreground mb-4">{step?.title}</p>
            </div>

            <AnimationControls
              isPlaying={isPlaying}
              isFinished={isFinished}
              currentStep={currentStep}
              total={steps.length}
              onPlay={play}
              onPause={pause}
              onNext={next}
              onPrev={prev}
              onReplay={replay}
              onReset={reset}
            />

            {/* Auth vs Perms explainer (shows on auth/perms steps) */}
            {(step?.nodeId === "auth" || step?.nodeId === "perms") && (
              <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10 text-xs text-muted-foreground leading-relaxed">
                <span className="text-primary font-medium">
                  {step.nodeId === "auth" ? "Authentication" : "Permissions"}
                </span>{" "}
                {step.nodeId === "auth"
                  ? "answers: who is making this request? It verifies identity via JWT."
                  : "answers: is this user allowed to perform this action? It checks authorization."}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
