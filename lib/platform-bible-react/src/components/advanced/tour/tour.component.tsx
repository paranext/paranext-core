import { useCallback, useEffect, useRef, useState } from 'react';
import { readDirection } from '@/utils/dir-helper.util';
import { Z_INDEX_ONBOARDING_TOUR } from '../../z-index';
import { Button } from '../../shadcn-ui/button';

/** One stop in the guided tour. */
export interface TourStep {
  /** CSS selector for the element to spotlight. A step whose target is absent is skipped. */
  target: string;
  /** Heading shown in the step card. */
  title: string;
  /** Body text shown in the step card. */
  description: string;
  /**
   * Logical side of the target on which the card appears. `start`/`end` resolve to physical
   * left/right via `readDirection()`, so callers never branch on RTL.
   *
   * @default 'bottom'
   */
  side?: 'top' | 'bottom' | 'start' | 'end';
}

/** Props accepted by the {@link Tour} component. */
export interface TourProps {
  /** Ordered list of steps. Steps whose target selector is not found are skipped. */
  steps: TourStep[];
  /** Whether the tour overlay is visible. */
  open: boolean;
  /** Called when the user finishes the last step (Done). */
  onDone: () => void;
  /** Called when the user dismisses the tour (Skip button or Escape). */
  onSkip: () => void;
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

function measureTarget(selector: string): TargetRect | null {
  const el = document.querySelector(selector);
  if (!el) return null;
  const r = el.getBoundingClientRect();
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

/** Computes card position (clamped into the viewport) relative to the spotlight target. */
function computeCardPosition(
  rect: TargetRect,
  physicalSide: 'top' | 'bottom' | 'left' | 'right',
): { top: number; left: number } {
  const clampLeft = (l: number) =>
    Math.max(8, Math.min(l, window.innerWidth - CARD_WIDTH_PX - 8));
  const clampTop = (t: number) =>
    Math.max(8, Math.min(t, window.innerHeight - CARD_APPROX_HEIGHT_PX - 8));
  switch (physicalSide) {
    case 'top':
      return { top: clampTop(rect.top - CARD_GAP_PX - CARD_APPROX_HEIGHT_PX), left: clampLeft(rect.left) };
    case 'left':
      return { top: clampTop(rect.top), left: clampLeft(rect.left - CARD_WIDTH_PX - CARD_GAP_PX) };
    case 'right':
      return { top: clampTop(rect.top), left: clampLeft(rect.left + rect.width + CARD_GAP_PX) };
    default: // bottom
      return { top: clampTop(rect.top + rect.height + CARD_GAP_PX), left: clampLeft(rect.left) };
  }
}

/**
 * Spotlight-overlay guided tour. Renders a full-viewport SVG mask that dims the page while cutting
 * out the current target element, and positions a step card beside it. Navigated with
 * Back / Next / Skip / Done; Escape dismisses (calls `onSkip`). Steps whose target selector is not
 * found in the DOM when the tour opens are skipped, so an absent target degrades gracefully instead
 * of killing the overlay. Returns `null` when `open` is false or no step targets resolve.
 */
export function Tour({
  steps,
  open,
  onDone,
  onSkip,
  nextLabel = 'Next',
  backLabel = 'Back',
  skipLabel = 'Skip',
  doneLabel = 'Done',
}: TourProps) {
  // Resolve which steps actually have a target in the DOM, computed when the tour opens.
  const [visibleSteps, setVisibleSteps] = useState<TourStep[]>([]);
  const [pos, setPos] = useState(0);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    setVisibleSteps(steps.filter((step) => !!document.querySelector(step.target)));
    setPos(0);
  }, [open, steps]);

  const currentStep = visibleSteps[pos];

  // Measure the current target; re-measure on resize.
  useEffect(() => {
    if (!open || !currentStep) return undefined;
    const measure = () => setTargetRect(measureTarget(currentStep.target));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [open, currentStep]);

  // Move focus to the primary action when the step changes (accessibility).
  useEffect(() => {
    if (open && currentStep) primaryButtonRef.current?.focus();
  }, [open, currentStep]);

  const isLast = pos === visibleSteps.length - 1;
  const isFirst = pos === 0;

  const handleNext = useCallback(() => {
    if (!isLast) setPos((p) => p + 1);
    else onDone();
  }, [isLast, onDone]);

  const handleBack = useCallback(() => {
    if (!isFirst) setPos((p) => p - 1);
  }, [isFirst]);

  // Escape dismisses the tour.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onSkip();
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [open, onSkip]);

  if (!open || !currentStep || !targetRect) return null;

  const physicalSide = resolvePhysicalSide(currentStep.side ?? 'bottom');
  const cardPos = computeCardPosition(targetRect, physicalSide);

  const spotX = targetRect.left - SPOTLIGHT_PADDING_PX;
  const spotY = targetRect.top - SPOTLIGHT_PADDING_PX;
  const spotW = targetRect.width + SPOTLIGHT_PADDING_PX * 2;
  const spotH = targetRect.height + SPOTLIGHT_PADDING_PX * 2;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={currentStep.title}
      className="tw:fixed tw:inset-0"
      style={{ zIndex: Z_INDEX_ONBOARDING_TOUR }}
    >
      {/* SVG spotlight mask — dims the page except around the target element. */}
      <svg
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <defs>
          <mask id="tour-spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect x={spotX} y={spotY} width={spotW} height={spotH} rx="6" fill="black" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.55)" mask="url(#tour-spotlight-mask)" />
      </svg>

      {/* Step card — positioned adjacent to the spotlight target. */}
      <div
        className="tw:fixed tw:flex tw:flex-col tw:gap-2 tw:rounded-lg tw:border tw:border-border tw:bg-popover tw:p-4 tw:shadow-lg"
        style={{ top: cardPos.top, left: cardPos.left, width: CARD_WIDTH_PX }}
      >
        <p className="tw:text-xs tw:text-muted-foreground">
          {pos + 1} / {visibleSteps.length}
        </p>
        <h3 className="tw:text-sm tw:font-semibold">{currentStep.title}</h3>
        <p className="tw:text-sm tw:text-muted-foreground">{currentStep.description}</p>

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

export default Tour;
