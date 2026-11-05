import { Play, Pause, SkipBack, SkipForward, RotateCcw, RefreshCw } from "lucide-react";

const CtrlBtn = ({ onClick, disabled, label, children, active }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    title={label}
    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed ${
      active
        ? "bg-primary text-primary-foreground"
        : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
    }`}
  >
    {children}
  </button>
);

/**
 * Play / Pause / Prev / Next / Replay / Reset controls.
 */
export const AnimationControls = ({
  isPlaying,
  isFinished,
  currentStep,
  total,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReplay,
  onReset,
}) => {
  return (
    <div className="flex items-center gap-2">
      <CtrlBtn onClick={onReset} label="Reset to beginning" disabled={currentStep === 0 && !isFinished}>
        <RotateCcw className="w-4 h-4" />
      </CtrlBtn>

      <CtrlBtn onClick={onPrev} label="Previous step" disabled={currentStep === 0}>
        <SkipBack className="w-4 h-4" />
      </CtrlBtn>

      {isPlaying ? (
        <CtrlBtn onClick={onPause} label="Pause" active>
          <Pause className="w-4 h-4" />
        </CtrlBtn>
      ) : (
        <CtrlBtn onClick={onPlay} label="Play" disabled={isFinished && currentStep === total - 1}>
          <Play className="w-4 h-4" />
        </CtrlBtn>
      )}

      <CtrlBtn onClick={onNext} label="Next step" disabled={currentStep >= total - 1}>
        <SkipForward className="w-4 h-4" />
      </CtrlBtn>

      <CtrlBtn onClick={onReplay} label="Replay from start">
        <RefreshCw className="w-4 h-4" />
      </CtrlBtn>
    </div>
  );
};
