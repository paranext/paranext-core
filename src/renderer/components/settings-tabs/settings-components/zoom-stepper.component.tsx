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
import { adjustZoomFactor } from 'platform-bible-utils';
import { useEffect, useRef, useState } from 'react';
import { MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR } from '@shared/models/content-zoom.model';
import { formatZoomPercent } from '@shared/utils/content-zoom.util';

/**
 * How long an unconfirmed press stays the baseline for the arithmetic, the buttons and the readout.
 * A press is written through a debounce and then round-trips through the platform's own
 * setting/data-provider subscription before this component sees it again, so a press inside this
 * window steps from the still-unconfirmed factor rather than re-deriving from a prop that has not
 * caught up yet. Past the window — a write that never lands at all — the baseline is the prop
 * again, so an unconfirmed press cannot pin the buttons open forever.
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

/** Props for {@link ZoomStepper}. */
export type ZoomStepperProps = {
  /** Current factor, e.g. `1.2` for 120 %. */
  value: number;
  /** Factor the reset button returns to; reset is disabled while the value is already here. */
  defaultValue: number;
  /** When true, every button is disabled. Defaults to `false`. */
  disabled?: boolean;
  /**
   * Localized strings for the three buttons: an accessible name each, plus the three that explain
   * why a press would do nothing — the two zoom bounds and the reset button already sitting on
   * `defaultValue`. Such a button's tooltip shows that string instead of its name, so a press that
   * does nothing says why rather than repeating what the button is called.
   */
  labels: {
    increase: string;
    decrease: string;
    reset: string;
    atMaximum: string;
    atMinimum: string;
    atDefault: string;
  };
  /** Localized accessible name for the group as a whole — normally the setting's own label. */
  groupLabel?: string;
  /** Called with the new factor whenever a press changes it. Never called with an unchanged value. */
  onChange: (factor: number) => void;
  /** Additional css classes for the group container. */
  className?: string;
};

/**
 * The platform's zoom stepper: a `+`/`−`/reset control for editing a zoom factor without typing a
 * decimal, displaying the factor as a percentage. Its step comes from the platform's shared zoom
 * arithmetic ({@link adjustZoomFactor}) and its range from {@link MIN_ZOOM_FACTOR} /
 * {@link MAX_ZOOM_FACTOR}, so a press here moves the factor by exactly the rule every other zoom
 * surface follows. `defaultValue` is a prop because the reset target is the calling setting's own
 * default rather than a platform constant.
 */
export function ZoomStepper({
  value,
  defaultValue,
  disabled = false,
  labels,
  groupLabel,
  onChange,
  className,
}: ZoomStepperProps) {
  /**
   * The factor this component has asked the platform for and the platform has not confirmed yet, or
   * `undefined` when the confirmed prop is the last word. State rather than a ref because the three
   * buttons and the readout are all derived from it: a press has to re-render, or `+` at 290 %
   * would stay enabled and reset would stay disabled for the whole round trip while the arithmetic
   * had already moved on.
   */
  const [pending, setPending] = useState<{ factor: number; at: number } | undefined>(undefined);

  /**
   * The last two factors emitted. A `value` that matches one of them is the platform confirming a
   * press, not a write from elsewhere — and confirming an OLDER press must not discard a newer one
   * that is still outstanding (press `+` three times quickly and the third would otherwise repeat
   * the second). The trade this makes, deliberately: a write from another window that happens to
   * equal a factor this component emitted in its last two presses is indistinguishable from a
   * confirmation, so it does not reset the baseline immediately.
   */
  const recentlyEmittedRef = useRef<number[]>([]);

  useEffect(() => {
    // A prop this component never asked for is a write from elsewhere (another window, a clamp) and
    // is authoritative at once; a prop it did ask for is a confirmation, which leaves any newer
    // press still outstanding.
    if (recentlyEmittedRef.current.includes(value)) return;
    recentlyEmittedRef.current = [];
    setPending(undefined);
  }, [value]);

  // A press that never gets confirmed must not pin the buttons' enabled state forever. Expiring on
  // a timer rather than reading the clock during render keeps the flags, the readout and the
  // arithmetic answering the same question at the same moment.
  useEffect(() => {
    if (!pending) return undefined;
    const remaining = STEP_BASELINE_WINDOW_MS - (performance.now() - pending.at);
    const timeout = setTimeout(() => setPending(undefined), Math.max(0, remaining));
    return () => clearTimeout(timeout);
  }, [pending]);

  // What the control answers with: the press it is still waiting on, or the confirmed prop.
  const baseline = pending?.factor ?? value;

  const emit = (next: number) => {
    if (next === baseline) return;
    recentlyEmittedRef.current = [next, ...recentlyEmittedRef.current].slice(0, 2);
    setPending({ factor: next, at: performance.now() });
    onChange(next);
  };

  // A bounded button stays a real, focusable `<button>` with `aria-disabled` instead of the native
  // `disabled` attribute — a native `disabled` button drops out of the tab order and can't host a
  // Radix `TooltipTrigger`, which would make the reason for the bound unreachable by keyboard.
  // `onClick` is guarded explicitly (rather than relying on the browser to withhold the click)
  // because `aria-disabled` does not stop the click event from firing.
  const decreaseDisabled = disabled || baseline <= MIN_ZOOM_FACTOR;
  const increaseDisabled = disabled || baseline >= MAX_ZOOM_FACTOR;
  const resetDisabled = disabled || baseline === defaultValue;

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
                emit(adjustZoomFactor(baseline, -1));
              }}
            >
              <Minus />
            </Button>
          </TooltipTrigger>
          {/* The bound string only when the bound itself is what stops the press: while the whole
              control is disabled, a bound button is stopped for a different reason, which these
              strings would misstate. */}
          <TooltipContent>
            {decreaseDisabled && !disabled ? labels.atMinimum : labels.decrease}
          </TooltipContent>
        </Tooltip>
        {/* The readout shows the press this control is still waiting on, so the number, the buttons
            and the arithmetic always agree: a write travels through a debounce before it is even
            sent, and a number that sits still for that long reads as a press the control ignored.
            aria-live announces the new percentage after a press; the buttons keep focus, so nothing
            else would say it. */}
        <ButtonGroupText
          aria-live="polite"
          className="tw:min-w-14 tw:justify-center tw:tabular-nums"
        >
          {formatZoomPercent(baseline)}
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
                emit(adjustZoomFactor(baseline, 1));
              }}
            >
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {increaseDisabled && !disabled ? labels.atMaximum : labels.increase}
          </TooltipContent>
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
                emit(defaultValue);
              }}
            >
              <RotateCcw />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {resetDisabled && !disabled ? labels.atDefault : labels.reset}
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </TooltipProvider>
  );
}

export default ZoomStepper;
