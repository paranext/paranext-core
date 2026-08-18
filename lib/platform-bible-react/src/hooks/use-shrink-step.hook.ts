import { useEffect, useState } from 'react';

/**
 * Extra width, in pixels, a container must regain before a shrink step is relaxed. Sub-pixel
 * `ResizeObserver` deliveries around a threshold would otherwise flip a label back and forth while
 * the user drags the window edge. Narrowing is never delayed — only widening.
 */
export const SHRINK_STEP_HYSTERESIS_PX = 8;

/**
 * Picks the shrink step for a container width.
 *
 * `thresholds` is ordered widest-first: step 0 applies at or above `thresholds[0]`, step 1 between
 * `thresholds[1]` and `thresholds[0]`, and so on. A width below every threshold yields
 * `thresholds.length`, the narrowest step. A higher number means narrower.
 *
 * @param width Current inline size of the observed container, in pixels.
 * @param thresholds Widest-first list of pixel breakpoints.
 * @param previousStep The step currently applied, used to apply hysteresis when widening.
 * @returns The step to apply.
 */
export function getShrinkStep(
  width: number,
  thresholds: readonly number[],
  previousStep: number,
): number {
  const matchedIndex = thresholds.findIndex((threshold) => width >= threshold);
  // `findIndex` returns -1 when the width is below every threshold: that is the narrowest step.
  const nextStep = matchedIndex === -1 ? thresholds.length : matchedIndex;

  // Narrowing (or holding) applies at once; only widening waits out the hysteresis band. Delaying a
  // narrow step would leave text visibly clipped for the duration of the drag.
  if (nextStep >= previousStep) return nextStep;

  const thresholdToClear = thresholds[nextStep];
  return width >= thresholdToClear + SHRINK_STEP_HYSTERESIS_PX ? nextStep : previousStep;
}

/**
 * Observes an element's inline size and reports a discrete shrink step for it.
 *
 * Takes the element itself rather than a ref: mutating `ref.current` does not re-run an effect, so
 * a ref-based version would silently never observe a node that attaches after mount. Callers keep
 * the node in state behind a callback ref.
 *
 * `thresholds` must be a stable reference (a module-level constant). A fresh array on every render
 * would tear down and rebuild the observer on every render.
 *
 * Hidden views: rc-dock keeps an inactive tab's web view mounted with `display: none`, where the
 * observed width reads 0 and the step pins to the narrowest value. That is harmless and
 * self-correcting — `ResizeObserver` fires again with the real width when the tab is shown, before
 * paint, so the correct step is applied without any catch-up mechanism. This is a deliberate
 * decision rather than an unexamined default; see `.claude/rules/cross-view-sync-hidden-views.md`.
 *
 * @param element The container to observe, or `undefined` before it mounts.
 * @param thresholds Widest-first list of pixel breakpoints.
 * @returns The current shrink step; `0` (widest) until the first measurement lands.
 */
export function useShrinkStep(
  element: HTMLElement | undefined,
  thresholds: readonly number[],
): number {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // The `typeof` guard keeps this a no-op in jsdom, which ships no `ResizeObserver`: consumers'
    // render tests then simply stay at the widest step instead of throwing.
    if (!element || typeof ResizeObserver === 'undefined') return undefined;

    const applyWidth = (width: number) => {
      setStep((previousStep) => getShrinkStep(width, thresholds, previousStep));
    };

    applyWidth(element.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[entries.length - 1];
      if (entry) applyWidth(entry.contentRect.width);
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [element, thresholds]);

  return step;
}

export default useShrinkStep;
