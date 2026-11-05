import { useCallback, useEffect, useRef, useState } from "react";

const STEP_DURATION = 2800; // ms per step

/**
 * Animation state machine for the request lifecycle.
 *
 * @param {Array} steps - scenario step array
 * @returns {{
 *   currentStep: number,
 *   isPlaying: boolean,
 *   isFinished: boolean,
 *   play: () => void,
 *   pause: () => void,
 *   next: () => void,
 *   prev: () => void,
 *   replay: () => void,
 *   reset: () => void,
 *   goTo: (i: number) => void,
 * }}
 */
export function useRequestAnimation(steps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);

  const total = steps.length;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Auto-advance when playing
  useEffect(() => {
    if (!isPlaying) return;

    // If we're at the last step, stop
    if (currentStep >= total - 1) {
      setIsPlaying(false);
      setIsFinished(true);
      return;
    }

    clearTimer();
    timerRef.current = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, STEP_DURATION);

    return clearTimer;
  }, [isPlaying, currentStep, total, clearTimer]);

  // Cleanup on unmount
  useEffect(() => clearTimer, [clearTimer]);

  // Reset when steps array changes (scenario switch)
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsFinished(false);
    clearTimer();
  }, [steps, clearTimer]);

  const play = useCallback(() => {
    if (isFinished) {
      // Restart from beginning
      setCurrentStep(0);
      setIsFinished(false);
    }
    setIsPlaying(true);
  }, [isFinished]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearTimer();
  }, [clearTimer]);

  const next = useCallback(() => {
    setIsPlaying(false);
    clearTimer();
    setCurrentStep((prev) => Math.min(prev + 1, total - 1));
    setIsFinished(false);
  }, [total, clearTimer]);

  const prev = useCallback(() => {
    setIsPlaying(false);
    clearTimer();
    setCurrentStep((p) => Math.max(p - 1, 0));
    setIsFinished(false);
  }, [clearTimer]);

  const replay = useCallback(() => {
    clearTimer();
    setCurrentStep(0);
    setIsFinished(false);
    setIsPlaying(true);
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setCurrentStep(0);
    setIsPlaying(false);
    setIsFinished(false);
  }, [clearTimer]);

  const goTo = useCallback(
    (i) => {
      setIsPlaying(false);
      clearTimer();
      setCurrentStep(Math.max(0, Math.min(i, total - 1)));
      setIsFinished(false);
    },
    [total, clearTimer],
  );

  return {
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
  };
}
