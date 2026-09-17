import { Minus, Plus, RotateCcw } from 'lucide-react';
import {
  Button,
  ButtonGroup,
  ButtonGroupText,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { useEffect, useRef } from 'react';
import { MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR } from '@shared/models/content-zoom.model';
import { adjustZoomFactor, formatZoomPercent } from '@shared/utils/content-zoom.util';

/**
 * How long a just-emitted factor stays available as the arithmetic baseline for the next press. The
 * stored value round-trips through the platform's own setting/data-provider subscription before
 * this component sees it again — tens of milliseconds in practice — so a second press inside this
 * window steps from the still-unconfirmed factor rather than re-deriving from a prop that hasn't
 * caught up yet. Past the window (or once the prop catches up), the baseline is simply the prop
 * again.
 */
const STEP_BASELINE_WINDOW_MS = 1500;

/**
 * Classes shared by all three stepper buttons so a bound press reads as inert, not merely faded.
 * The shared Button's `outline`/`ghost` variants gate their hover treatment on native `:disabled`
 * only, so without this a bound button — real and focusable, with `aria-disabled` rather than
 * `disabled` — would still highlight and show a pointer cursor on hover as if the press would do
 * something. `pointer-events-none` is deliberately not part of this: killing pointer events would
 * also stop the Radix `TooltipTrigger` from ever seeing the hover, and a reachable tooltip
 * explaining the bound is the reason this component uses `aria-disabled` in the first place.
 */
const BOUND_BUTTON_CLASSNAME =
  'tw:aria-disabled:opacity-50 tw:aria-disabled:cursor-default tw:aria-disabled:hover:bg-background tw:aria-disabled:hover:text-inherit';

/** Props for {@link PercentStepper}. */
export type PercentStepperProps = {
  /** Current factor, e.g. `1.2` for 120 %. */
  value: number;
  /** Factor the reset button returns to; reset is disabled while the value is already here. */
  defaultValue: number;
  /** When true, every button is disabled. Defaults to `false`. */
  disabled?: boolean;
  /** Localized accessible names for the three buttons. */
  labels: { increase: string; decrease: string; reset: string };
  /** Localized accessible name for the group as a whole — normally the setting's own label. */
  groupLabel?: string;
  /** Called with the new factor whenever a press changes it. Never called with an unchanged value. */
  onChange: (factor: number) => void;
  /** Additional css classes for the group container. */
  className?: string;
};

/**
 * The platform's zoom stepper: a `+`/`−`/reset control for editing a zoom factor without typing a
 * decimal, displaying the factor as a percentage. Its step and its range come from the platform's
 * shared zoom arithmetic ({@link adjustZoomFactor}), so a press here moves the factor by exactly the
 * rule every other zoom surface follows. `defaultValue` stays a prop because the reset target is
 * the calling setting's own default.
 */
export function PercentStepper({
  value,
  defaultValue,
  disabled = false,
  labels,
  groupLabel,
  onChange,
  className,
}: PercentStepperProps) {
  // The displayed value is always the confirmed prop — never an optimistic guess — because there
  // is no way to tell a write the platform is still applying from one it silently rejected or
  // clamped, and showing the wrong guess is worse than a tens-of-milliseconds lag behind a press.
  // What still needs help is the arithmetic for a rapid second press: without a baseline, it would
  // step from the same stale `value` twice (1.1, 1.1 instead of 1.1, 1.2). `lastEmittedRef` records
  // the most recent press so the next one can step from it while the round trip is in flight.
  const lastEmittedRef = useRef<{ factor: number; at: number } | undefined>(undefined);

  useEffect(() => {
    // Any change to the prop — whether it is the platform confirming the press this component made,
    // or a write from elsewhere (another window, a clamp) — makes `value` the right baseline again.
    // Clearing on every change (not only a matching one) is what makes a foreign write win
    // immediately instead of being masked by a baseline the platform never confirmed.
    lastEmittedRef.current = undefined;
  }, [value]);

  const emit = (candidate: (baseline: number) => number) => {
    // Step from the last emitted factor while it is still fresh — the effect above already clears it
    // as soon as the prop moves for any reason, confirmed or not, so a surviving ref here means the
    // round trip for that press is still outstanding.
    const last = lastEmittedRef.current;
    const stillFresh = last !== undefined && performance.now() - last.at < STEP_BASELINE_WINDOW_MS;
    const baseline = stillFresh ? last.factor : value;
    const next = candidate(baseline);
    if (next === baseline) return;
    lastEmittedRef.current = { factor: next, at: performance.now() };
    onChange(next);
  };

  // A bounded button stays a real, focusable `<button>` with `aria-disabled` instead of the native
  // `disabled` attribute — a native `disabled` button drops out of the tab order and can't host a
  // Radix `TooltipTrigger`, which would make the reason for the bound unreachable by keyboard.
  // `onClick` is guarded explicitly (rather than relying on the browser to withhold the click)
  // because `aria-disabled` does not stop the click event from firing.
  const decreaseDisabled = disabled || value <= MIN_ZOOM_FACTOR;
  const increaseDisabled = disabled || value >= MAX_ZOOM_FACTOR;
  const resetDisabled = disabled || value === defaultValue;

  return (
    <TooltipProvider>
      <ButtonGroup aria-label={groupLabel} className={className}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={labels.decrease}
              aria-disabled={decreaseDisabled || undefined}
              className={BOUND_BUTTON_CLASSNAME}
              onClick={() => {
                if (decreaseDisabled) return;
                emit((baseline) => adjustZoomFactor(baseline, -1));
              }}
            >
              <Minus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{labels.decrease}</TooltipContent>
        </Tooltip>
        {/* aria-live announces the new percentage after a press; the buttons keep focus, so nothing
            else would say it. */}
        <ButtonGroupText
          aria-live="polite"
          className="tw:min-w-14 tw:justify-center tw:tabular-nums"
        >
          {formatZoomPercent(value)}
        </ButtonGroupText>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={labels.increase}
              aria-disabled={increaseDisabled || undefined}
              className={BOUND_BUTTON_CLASSNAME}
              onClick={() => {
                if (increaseDisabled) return;
                emit((baseline) => adjustZoomFactor(baseline, 1));
              }}
            >
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{labels.increase}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={labels.reset}
              aria-disabled={resetDisabled || undefined}
              className={BOUND_BUTTON_CLASSNAME}
              onClick={() => {
                if (resetDisabled) return;
                emit(() => defaultValue);
              }}
            >
              <RotateCcw />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{labels.reset}</TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </TooltipProvider>
  );
}

export default PercentStepper;
