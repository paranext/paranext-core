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
import { useEffect, useRef, useState } from 'react';
import { formatZoomPercent } from '@shared/utils/content-zoom.util';

/** Props for {@link PercentStepper}. */
export type PercentStepperProps = {
  /** Current factor, e.g. `1.2` for 120 %. */
  value: number;
  /** Smallest factor the stepper will emit. */
  min: number;
  /** Largest factor the stepper will emit. */
  max: number;
  /** Amount one `+` / `−` press moves the factor. */
  step: number;
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
 * A `+`/`−`/reset control for editing a zoom-style factor without typing a decimal. Displays the
 * factor as a percentage and clamps every step to the caller's own `min`/`max`/`step`, so the
 * bounds are not hard-coded to any one feature's zoom range.
 */
export function PercentStepper({
  value,
  min,
  max,
  step,
  defaultValue,
  disabled = false,
  labels,
  groupLabel,
  onChange,
  className,
}: PercentStepperProps) {
  // The stored value round-trips through the platform's own setting/data-provider subscription
  // before this component sees it again, so two quick presses would both read the same stale
  // `value` prop and the second would re-emit the first press's factor. Show the pending value
  // optimistically and hand control back to the prop as soon as it moves at all — whether that
  // move is the platform confirming this component's own press or something else's write to the
  // same setting (e.g. another window) arriving first.
  const [pendingValue, setPendingValue] = useState<number | undefined>(undefined);
  const pendingTargetRef = useRef<number | undefined>(undefined);
  const displayValue = pendingValue ?? value;

  useEffect(() => {
    // The incoming prop is authoritative: this effect only runs when `value` has actually changed
    // from the previous render, so any such change — the platform confirming our own press, or
    // another window writing the same setting first — hands control back to the prop. Keeping the
    // optimistic value only while the prop hasn't moved avoids the display rewinding to a stale
    // pre-press value between the press and the platform round-trip.
    if (pendingTargetRef.current !== undefined) {
      pendingTargetRef.current = undefined;
      setPendingValue(undefined);
    }
  }, [value]);

  // The shared platform helper rounds to a tenth because that is the platform's own zoom step;
  // `min`/`max`/`step` are the contract this component actually offers callers, so rounding must
  // follow the caller's `step` instead — otherwise any step other than a tenth would have its
  // output silently snapped to the wrong precision. `step.toString()` can render in exponential
  // notation for small values (e.g. `1e-2`), which has no `.` for the split below to find, so count
  // decimals by scaling the value up by 10 until it lands on an integer instead of parsing the string.
  const stepDecimals = (() => {
    let decimals = 0;
    let scaled = step;
    while (!Number.isInteger(scaled) && decimals < 10) {
      scaled *= 10;
      decimals += 1;
    }
    return decimals;
  })();
  const roundToStep = (factor: number) => Number(factor.toFixed(stepDecimals));

  const clampToProps = (factor: number) => Math.min(max, Math.max(min, roundToStep(factor)));

  const emit = (candidate: number) => {
    const next = clampToProps(candidate);
    if (next === displayValue) return;
    // A write the platform rejects leaves this optimistic value showing until the prop's next
    // change — the effect above treats any change to the prop as authoritative, so the stale
    // optimistic value is dropped as soon as something (a retry, another window) writes next.
    pendingTargetRef.current = next;
    setPendingValue(next);
    onChange(next);
  };

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
              disabled={disabled || displayValue <= min}
              onClick={() => emit(displayValue - step)}
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
          {formatZoomPercent(displayValue)}
        </ButtonGroupText>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={labels.increase}
              disabled={disabled || displayValue >= max}
              onClick={() => emit(displayValue + step)}
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
              disabled={disabled || displayValue === defaultValue}
              onClick={() => emit(defaultValue)}
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
