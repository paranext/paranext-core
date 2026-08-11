import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { readDirection } from '@/utils/dir-helper.util';
import { Z_INDEX_ONBOARDING_TOUR } from '../../z-index';
import { Button } from '../../shadcn-ui/button';

/** One stop in the guided tour. */
export interface TourStep {
  /**
   * CSS selector for the element to spotlight. A step whose target is absent — or present but
   * zero-size, e.g. an empty wrapper whose conditional child is not rendered — is skipped.
   */
  target: string;
  /** Heading shown in the step card. */
  title: string;
  /** Body text shown in the step card. */
  description: string;
  /**
   * Logical side of the target on which the card appears. `start`/`end` resolve to physical
   * left/right via `readDirection()`, so callers never branch on RTL. In LTR (default):
   * `start`=left, `end`=right; in RTL these are swapped.
   *
   * @default 'bottom'
   */
  side?: 'top' | 'bottom' | 'start' | 'end';
  /**
   * Padding (px) added outside the target's bounding rect on all four sides to create the spotlight
   * cutout. Use a small positive value (e.g. 1) for column panels where the rc-dock divider
   * visually extends ~7 px into the panel — `spotlightPadding: 1` places the spotlight edge at the
   * divider's visual center so neither adjacent panel bleeds into the lit area.
   *
   * @default 6
   */
  spotlightPadding?: number;
}

/** Props accepted by the {@link Tour} component. */
export interface TourProps {
  /**
   * Ordered list of steps. Steps whose target selector is not found are skipped.
   *
   * **Snapshotted at open:** the list is filtered once when `open` flips to `true`. Steps added
   * after that point — or steps whose targets mount after the tour opens — are not picked up until
   * the tour re-opens. Pass steps only after the targets you intend to spotlight are already in the
   * DOM.
   */
  steps: TourStep[];
  /** Whether the tour overlay is visible. */
  open: boolean;
  /** Called when the user finishes the last step (Done). */
  onDone: () => void;
  /** Called when the user dismisses the tour (Skip button or Escape). */
  onSkip: () => void;
  /**
   * Returns the step-counter string for the given 1-based step index and total step count. Used to
   * localize the "current / total" display. Falls back to `"{current} / {total}"` when omitted.
   */
  stepCounter?: (current: number, total: number) => string;
  /** @default 'Next' */
  nextLabel?: string;
  /** @default 'Back' */
  backLabel?: string;
  /** @default 'Skip' */
  skipLabel?: string;
  /** @default 'Done' */
  doneLabel?: string;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const CARD_WIDTH_PX = 288;
const CARD_APPROX_HEIGHT_PX = 176;
const CARD_GAP_PX = 12;
const SPOTLIGHT_PADDING_PX = 6;

/**
 * Returns the bounding rect of the first element matching `selector`, or `undefined` if absent. An
 * `undefined` return causes the step to be skipped — see {@link Tour} for skip semantics.
 */
function measureTarget(selector: string): TargetRect | undefined {
  const el = document.querySelector(selector);
  if (!el) return undefined;
  const r = el.getBoundingClientRect();
  // Skip elements that are in the DOM but have no visual area (e.g. an empty wrapper div
  // whose conditional children are not rendered). A zero-size rect produces a degenerate
  // 2×padding spotlight over an invisible point, which is misleading to the user.
  if (r.width <= 0 || r.height <= 0) return undefined;
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

/** Resolves a logical side to a physical one for the current layout direction. */
function resolvePhysicalSide(
  side: 'top' | 'bottom' | 'start' | 'end',
): 'top' | 'bottom' | 'left' | 'right' {
  if (side === 'top' || side === 'bottom') return side;
  const isRtl = readDirection() === 'rtl';
  if (side === 'start') return isRtl ? 'right' : 'left';
  return isRtl ? 'left' : 'right'; // 'end'
}

const VIEWPORT_MARGIN_PX = 8;

/**
 * Computes card position relative to the spotlight target. When the card cannot fit on the
 * requested side, it flips to the opposite side if that one fits — clamping alone would slide the
 * card over its own target. The result is always clamped into the viewport as a last resort (e.g.
 * when neither side fits).
 */
function computeCardPosition(
  rect: TargetRect,
  requestedSide: 'top' | 'bottom' | 'left' | 'right',
  cardHeightPx: number,
): { top: number; left: number } {
  const clampLeft = (l: number) =>
    Math.max(
      VIEWPORT_MARGIN_PX,
      Math.min(l, window.innerWidth - CARD_WIDTH_PX - VIEWPORT_MARGIN_PX),
    );
  const clampTop = (t: number) =>
    Math.max(
      VIEWPORT_MARGIN_PX,
      Math.min(t, window.innerHeight - cardHeightPx - VIEWPORT_MARGIN_PX),
    );
  const fits = {
    top: rect.top - CARD_GAP_PX - cardHeightPx >= VIEWPORT_MARGIN_PX,
    bottom:
      rect.top + rect.height + CARD_GAP_PX + cardHeightPx <=
      window.innerHeight - VIEWPORT_MARGIN_PX,
    left: rect.left - CARD_WIDTH_PX - CARD_GAP_PX >= VIEWPORT_MARGIN_PX,
    right:
      rect.left + rect.width + CARD_GAP_PX + CARD_WIDTH_PX <=
      window.innerWidth - VIEWPORT_MARGIN_PX,
  };
  const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' } as const;
  const physicalSide =
    !fits[requestedSide] && fits[opposite[requestedSide]] ? opposite[requestedSide] : requestedSide;
  switch (physicalSide) {
    case 'top':
      return {
        top: clampTop(rect.top - CARD_GAP_PX - cardHeightPx),
        left: clampLeft(rect.left),
      };
    case 'left':
      return { top: clampTop(rect.top), left: clampLeft(rect.left - CARD_WIDTH_PX - CARD_GAP_PX) };
    case 'right':
      return { top: clampTop(rect.top), left: clampLeft(rect.left + rect.width + CARD_GAP_PX) };
    default: // bottom
      return { top: clampTop(rect.top + rect.height + CARD_GAP_PX), left: clampLeft(rect.left) };
  }
}

/**
 * Spotlight-overlay guided tour. Renders a full-viewport SVG mask (white fill + black cutout = a
 * transparent "hole" over the target) that dims the page except around the current target element,
 * and positions a step card beside it.
 *
 * Navigated with Back / Next / Skip / Done; Escape dismisses (calls `onSkip`). Steps whose target
 * selector is not found in the DOM — or resolves to a zero-size element — when the tour opens are
 * skipped, so an absent target degrades gracefully instead of killing the overlay. Returns `null`
 * when `open` is false or no step targets resolve.
 */
export function Tour({
  steps,
  open,
  onDone,
  onSkip,
  stepCounter,
  nextLabel = 'Next',
  backLabel = 'Back',
  skipLabel = 'Skip',
  doneLabel = 'Done',
}: TourProps) {
  // Resolve which steps actually have a target in the DOM, computed when the tour opens.
  // Steps whose targets mount after open() fires are not picked up until the tour re-opens.
  const [visibleSteps, setVisibleSteps] = useState<TourStep[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<TargetRect | undefined>(undefined);
  // Tracks real card height; starts with an approximation for the first render's position math.
  const [cardHeight, setCardHeight] = useState(CARD_APPROX_HEIGHT_PX);

  // React DOM refs require null as the initial value (standard React ref convention).
  // eslint-disable-next-line no-null/no-null
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  // React DOM refs require null as the initial value (standard React ref convention).
  // eslint-disable-next-line no-null/no-null
  const cardRef = useRef<HTMLDivElement>(null);

  // Non-DOM ref: stores prior active element for focus restoration on close.
  const savedFocusRef = useRef<Element | undefined>(undefined);

  // Per-instance ids so the SVG mask stays unique and the dialog can describe its body text.
  const maskId = useId();
  const descId = useId();

  useLayoutEffect(() => {
    if (!open) {
      setVisibleSteps([]);
      setStepIndex(0);
      setTargetRect(undefined);
      return;
    }
    // Use measureTarget (not bare querySelector) so presence and measurability agree: a target
    // that exists but has zero area (e.g. an empty wrapper whose conditional child is absent)
    // would otherwise be counted as a step that can never be spotlighted.
    setVisibleSteps(steps.filter((step) => measureTarget(step.target) !== undefined));
    setStepIndex(0);
    // Snapshot steps once on open; intentionally excludes 'steps' from deps so mid-tour
    // locale updates do not reset the user back to step 1.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const currentStep = visibleSteps[stepIndex];
  // The card mounts one commit after the step becomes current (the render guard below returns
  // null until the target has been measured). Effects that reach into the card via refs must
  // re-run when the card appears, not only when the step changes.
  const isCardRendered = targetRect !== undefined;

  // Measure the current target; re-measure on resize or scroll.
  useEffect(() => {
    if (!open || !currentStep) return undefined;
    let remeasureFrameId: number | undefined;
    const measure = () => {
      const r = measureTarget(currentStep.target);
      // Keep last-known-good rect if the target momentarily can't be measured, so the overlay
      // never blanks mid-tour while other steps remain viable. Returning the previous object when
      // nothing moved skips the re-render entirely — capture-phase scroll ticks fire for scrolls
      // that don't move the target at all.
      if (r)
        setTargetRect((prev) =>
          prev &&
          prev.top === r.top &&
          prev.left === r.left &&
          prev.width === r.width &&
          prev.height === r.height
            ? prev
            : r,
        );
    };
    const scheduleRemeasure = () => {
      if (remeasureFrameId !== undefined) return;
      remeasureFrameId = requestAnimationFrame(() => {
        remeasureFrameId = undefined;
        measure();
      });
    };
    measure();
    window.addEventListener('resize', scheduleRemeasure);
    // Capture-phase passive scroll catches scrolls inside nested containers (panel columns, toolbar).
    window.addEventListener('scroll', scheduleRemeasure, { capture: true, passive: true });
    return () => {
      window.removeEventListener('resize', scheduleRemeasure);
      window.removeEventListener('scroll', scheduleRemeasure, { capture: true });
      if (remeasureFrameId !== undefined) cancelAnimationFrame(remeasureFrameId);
    };
  }, [open, currentStep]);

  // Measure real card height after step changes so position math uses the actual size rather than
  // the approximation constant. The functional setter prevents re-render loops.
  // Scoped to step changes and card mount only; card content is stable within a step.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const measured = cardRef.current?.offsetHeight;
    if (measured) setCardHeight((prev) => (prev !== measured ? measured : prev));
  }, [open, stepIndex, isCardRendered]);

  // Save focus on open; restore it on close.
  useEffect(() => {
    if (open) {
      savedFocusRef.current = document.activeElement ?? undefined;
    } else if (
      savedFocusRef.current instanceof HTMLElement ||
      savedFocusRef.current instanceof SVGElement
    ) {
      // Guard against the element being removed from the DOM while the tour was open.
      if (savedFocusRef.current.isConnected) savedFocusRef.current.focus();
      savedFocusRef.current = undefined;
    }
  }, [open]);

  // Move focus to the primary action when the step changes or the card first mounts
  // (accessibility). Without the card-mount dependency, the first open would run this effect
  // while the card is still unmounted and focus would silently stay behind the overlay.
  useEffect(() => {
    if (open && currentStep && isCardRendered) primaryButtonRef.current?.focus();
  }, [open, currentStep, isCardRendered]);

  const isLast = stepIndex === visibleSteps.length - 1;
  const isFirst = stepIndex === 0;

  const handleNext = useCallback(() => {
    if (!isLast) setStepIndex((i) => i + 1);
    else onDone();
  }, [isLast, onDone]);

  const handleBack = useCallback(() => {
    if (!isFirst) setStepIndex((i) => i - 1);
  }, [isFirst]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Capture-phase intercept prevents Escape from reaching popovers or dialogs that might be
        // open behind the overlay — the tour always wins the Escape key while visible.
        e.stopPropagation();
        onSkip();
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [open, onSkip]);

  // Focus trap: cycle Tab/Shift+Tab among the card's buttons while the dialog is open. Depends on
  // the card being mounted — on first open the card mounts a commit later than the step, and a
  // trap snapshotted before that would be a permanent no-op for step 1.
  useEffect(() => {
    if (!open || !currentStep || !isCardRendered) return undefined;
    // Query focusable elements once per step — card content is stable within a step.
    const focusable = Array.from(
      cardRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? [],
    );
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // Capture phase ensures stopPropagation inside card buttons cannot block the trap.
    document.addEventListener('keydown', trapFocus, true);
    return () => document.removeEventListener('keydown', trapFocus, true);
  }, [open, currentStep, isCardRendered]);

  // React component must return null to render nothing.
  // eslint-disable-next-line no-null/no-null
  if (!open || !currentStep || !targetRect) return null;

  const physicalSide = resolvePhysicalSide(currentStep.side ?? 'bottom');
  const cardPos = computeCardPosition(targetRect, physicalSide, cardHeight);

  const spotlightPadding = currentStep.spotlightPadding ?? SPOTLIGHT_PADDING_PX;
  const spotlightX = targetRect.left - spotlightPadding;
  const spotlightY = targetRect.top - spotlightPadding;
  const spotlightWidth = targetRect.width + spotlightPadding * 2;
  const spotlightHeight = targetRect.height + spotlightPadding * 2;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={currentStep.title}
      aria-describedby={descId}
      // Stable hook for tests: generic modal-dialog selectors also match other overlay dialogs,
      // so anything that needs to find (or avoid) specifically the tour targets this test id.
      data-testid="tour-dialog"
      className="tw:fixed tw:inset-0"
      style={{ zIndex: Z_INDEX_ONBOARDING_TOUR }}
    >
      {/* Announces step title + description to screen readers when the step changes. */}
      <p className="tw:sr-only" aria-live="polite" aria-atomic="true">
        {currentStep.title} {currentStep.description}
      </p>

      {/* SVG spotlight mask — dims the page except around the target element.
          The white rect fills the mask; the black cutout creates a transparent hole over the
          target. The SVG has pointerEvents: none so clicks fall through to the dialog below. */}
      <svg
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={spotlightX}
              y={spotlightY}
              width={spotlightWidth}
              height={spotlightHeight}
              rx="6"
              fill="black"
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.55)" mask={`url(#${maskId})`} />
      </svg>

      {/* Step card — positioned adjacent to the spotlight target.
          The overlay div intercepts pointer events over the spotlighted target; navigating via the
          card buttons is the intended interaction while the tour is open. */}
      <div
        ref={cardRef}
        className="tw:fixed tw:flex tw:flex-col tw:gap-2 tw:rounded-lg tw:border tw:border-border tw:bg-popover tw:p-4 tw:shadow-lg tw:overflow-y-auto"
        style={{
          top: cardPos.top,
          left: cardPos.left,
          width: CARD_WIDTH_PX,
          maxHeight: 'calc(100vh - 16px)',
        }}
      >
        <p className="tw:text-xs tw:text-muted-foreground">
          {stepCounter
            ? stepCounter(stepIndex + 1, visibleSteps.length)
            : `${stepIndex + 1} / ${visibleSteps.length}`}
        </p>
        <h3 className="tw:text-sm tw:font-semibold">{currentStep.title}</h3>
        <p id={descId} className="tw:text-sm tw:text-muted-foreground">
          {currentStep.description}
        </p>

        <div className="tw:flex tw:items-center tw:justify-between tw:pt-1">
          <Button variant="ghost" size="sm" onClick={onSkip}>
            {skipLabel}
          </Button>
          <div className="tw:flex tw:gap-2">
            {!isFirst && (
              <Button variant="outline" size="sm" onClick={handleBack}>
                {backLabel}
              </Button>
            )}
            <Button ref={primaryButtonRef} size="sm" onClick={handleNext}>
              {isLast ? doneLabel : nextLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
