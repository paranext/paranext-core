import { Minus, Plus, RotateCcw } from 'lucide-react';
import { Button } from 'platform-bible-react';
import { useEffect, useRef, useState } from 'react';
import { formatZoomPercent, roundZoom } from '@shared/utils/content-zoom.util';

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
  /** When true, every button is read-only. Defaults to `false`. */
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
  // optimistically and hand control back to the prop once it agrees with what was last emitted.
  const [pendingValue, setPendingValue] = useState<number | undefined>(undefined);
  const pendingTargetRef = useRef<number | undefined>(undefined);
  const displayValue = pendingValue ?? value;

  useEffect(() => {
    // Hand control back to the prop as soon as the stored value matches the factor we last
    // emitted; until then the prop still reports the pre-press value and would rewind the display.
    if (pendingTargetRef.current !== undefined && value === pendingTargetRef.current) {
      pendingTargetRef.current = undefined;
      setPendingValue(undefined);
    }
  }, [value]);

  const clampToProps = (factor: number) => Math.min(max, Math.max(min, roundZoom(factor)));

  const emit = (candidate: number) => {
    const next = clampToProps(candidate);
    if (next === displayValue) return;
    // A write the platform rejects would leave this optimistic value showing until the next
    // accepted press. The only rejection path is the range validator, and `clampToProps` cannot
    // produce an out-of-range factor when the caller passes the platform's own bounds, so this
    // cannot fire in practice.
    pendingTargetRef.current = next;
    setPendingValue(next);
    onChange(next);
  };

  return (
    <div
      role="group"
      aria-label={groupLabel}
      className={`tw:flex tw:items-center tw:gap-1 ${className ?? ''}`}
    >
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
      {/* aria-live announces the new percentage after a press; the buttons keep focus, so nothing
          else would say it. */}
      <span aria-live="polite" className="tw:min-w-14 tw:text-center tw:tabular-nums">
        {formatZoomPercent(displayValue)}
      </span>
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
    </div>
  );
}

export default PercentStepper;
