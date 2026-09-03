import { useLayoutEffect, useRef, useState } from 'react';

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
 * @param previousStep The step currently applied, used to apply hysteresis when widening. Pass
 *   `undefined` when there is no meaningful previous measurement to be sticky about — a first
 *   measurement, or the one after the element was hidden — and the width is taken at face value.
 * @returns The step to apply.
 */
export function getShrinkStep(
  width: number,
  thresholds: readonly number[],
  previousStep?: number,
): number {
  const matchedIndex = thresholds.findIndex((threshold) => width >= threshold);
  // `findIndex` returns -1 when the width is below every threshold: that is the narrowest step.
  const nextStep = matchedIndex === -1 ? thresholds.length : matchedIndex;

  // Hysteresis damps a drag. With no previous measurement there is no drag, so nothing to damp.
  if (previousStep === undefined) return nextStep;

  // Narrowing (or holding) applies at once; only widening waits out the hysteresis band. Delaying a
  // narrow step would leave text visibly clipped for the duration of the drag.
  if (nextStep >= previousStep) return nextStep;

  // Widening: relax to the widest step whose band this width actually clears, rather than not at
  // all, so a drag that crosses several bands in one delivery is not left partway. `relaxedStep` is
  // never narrower than `nextStep` — clearing `threshold + 8` implies clearing `threshold` — so it
  // alone is the answer, bounded by the step already applied.
  const relaxedStep = thresholds.findIndex(
    (threshold) => width >= threshold + SHRINK_STEP_HYSTERESIS_PX,
  );
  if (relaxedStep === -1) return previousStep;
  return Math.min(previousStep, relaxedStep);
}

/**
 * Observes an element's inline size and reports a discrete shrink step for it.
 *
 * Takes the element itself rather than a ref: mutating `ref.current` does not re-run an effect, so
 * a ref-based version would silently never observe a node that attaches after mount. Callers keep
 * the node in state behind a callback ref.
 *
 * Observe the element whose box IS the space available to content — a padding-free inner row rather
 * than a wrapper that reserves space with padding. The measurement is a border box, so padding on
 * the observed element counts as usable width; where a toolbar's reserved space lives can differ
 * between platforms for the same window, which would otherwise make the steps platform-dependent.
 *
 * `thresholds` must be a stable reference (a module-level constant). A fresh array on every render
 * would tear down and rebuild the observer on every render.
 *
 * Hidden views: rc-dock keeps an inactive tab's web view mounted with `display: none`, where the
 * width reads 0 and the step pins to the narrowest value. `ResizeObserver` fires again with the
 * real width when the tab is shown, so no catch-up mechanism is needed — but a width of 0 is not a
 * measurement, and the step taken from it must not make the next real one sticky. Being shown again
 * is a reveal, not a drag, so hysteresis is skipped for that first width. Without this a consumer
 * with a single threshold has no other band to relax into and stays at its narrowest form at a
 * width where it should not be. See `.claude/rules/cross-view-sync-hidden-views.md`.
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
  // Width of the last delivery, so the next one can tell a drag from a reveal. A hidden element
  // reports 0, which is an absence of layout rather than a width worth being sticky about.
  const previousWidthRef = useRef<number | undefined>(undefined);

  // Layout effect, not a passive one: a passive effect runs after paint, so a toolbar mounted into
  // a narrow panel would paint its full-width form for a frame and then snap — the layout jump this
  // whole mechanism exists to remove.
  useLayoutEffect(() => {
    // The `typeof` guard keeps this a no-op in jsdom, which ships no `ResizeObserver`: consumers'
    // render tests then simply stay at the widest step instead of throwing.
    if (!element || typeof ResizeObserver === 'undefined') return undefined;

    // Always re-measure the element rather than reading the observer entry: `contentRect` is the
    // content box while this seed reads the border box, so mixing the two would shift the
    // thresholds by the observed element's padding between mount and the first resize.
    const measure = () => {
      const { width } = element.getBoundingClientRect();
      const previousWidth = previousWidthRef.current;
      previousWidthRef.current = width;
      const isFirstRealWidth = previousWidth === undefined || previousWidth === 0;
      setStep((previousStep) =>
        getShrinkStep(width, thresholds, isFirstRealWidth ? undefined : previousStep),
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, [element, thresholds]);

  return step;
}

export default useShrinkStep;
