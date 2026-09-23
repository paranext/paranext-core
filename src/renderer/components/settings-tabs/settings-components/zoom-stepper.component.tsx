import { Minus, Plus, RotateCcw } from 'lucide-react';
import {
  Button,
  ButtonGroup,
  cn,
  Input,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { adjustZoomFactor } from 'platform-bible-utils';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
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

/** Smallest whole percentage the field accepts; a smaller typed number is raised to it. */
const MIN_PERCENT = Math.round(MIN_ZOOM_FACTOR * 100);
/** Largest whole percentage the field accepts; a larger typed number is lowered to it. */
const MAX_PERCENT = Math.round(MAX_ZOOM_FACTOR * 100);

/**
 * Reads the percentage field's text as a factor. Whitespace — including the narrow no-break space
 * the field itself displays before `%` (a Unicode `\s`) — and one trailing `%` are ignored; what is
 * left must be whole digits. The number is clamped to the allowed range and otherwise kept as
 * typed, not snapped to the buttons' step. `undefined` means the text is not a whole percentage at
 * all.
 */
function parsePercentInput(text: string): number | undefined {
  const digits = text.replace(/\s/gu, '').replace(/%$/u, '');
  if (!/^\d+$/u.test(digits)) return undefined;
  const percent = Math.min(MAX_PERCENT, Math.max(MIN_PERCENT, Number.parseInt(digits, 10)));
  return percent / 100;
}

/** Props for {@link ZoomStepper}. */
export type ZoomStepperProps = {
  /** Current factor, e.g. `1.2` for 120 %. */
  value: number;
  /** Factor the reset button returns to; reset is disabled while the value is already here. */
  defaultValue: number;
  /** When true, every button and the percentage field are disabled. Defaults to `false`. */
  disabled?: boolean;
  /**
   * Localized strings: an accessible name for each of the three buttons and for the percentage
   * field, plus the three that explain why a press would do nothing — the two zoom bounds and the
   * reset button already sitting on `defaultValue`. Such a button's tooltip shows that string
   * instead of its name, so a press that does nothing says why rather than repeating what the
   * button is called.
   */
  labels: {
    increase: string;
    decrease: string;
    reset: string;
    atMaximum: string;
    atMinimum: string;
    atDefault: string;
    /** Accessible name of the percentage field; the outer group already names the setting. */
    percentInput: string;
  };
  /** Localized accessible name for the control as a whole — normally the setting's own label. */
  groupLabel?: string;
  /** Called with the new factor whenever a press or a typed commit changes it. Never unchanged. */
  onChange: (factor: number) => void;
  /** Additional css classes for the outer container. */
  className?: string;
};

/**
 * The platform's zoom stepper: `−`/`+` buttons, a percentage field and a reset button for editing a
 * zoom factor without typing a decimal. Its step comes from the platform's shared zoom arithmetic
 * ({@link adjustZoomFactor}) and its range from {@link MIN_ZOOM_FACTOR} / {@link MAX_ZOOM_FACTOR}, so
 * a press here moves the factor by exactly the rule every other zoom surface follows.
 * `defaultValue` is a prop because the reset target is the calling setting's own default rather
 * than a platform constant.
 *
 * The field takes any whole percentage in range, committed on Enter or when it loses focus; Escape
 * abandons the edit. The buttons always land on the 10 % grid, so from a typed 137 % `+` goes to
 * 150 % and `−` to 130 %.
 *
 * The two button groups — `[−, +]` and `[percentage, reset]` — sit side by side and wrap onto two
 * rows when their container is too narrow for both.
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

  /**
   * The percentage field's text once the user has typed into it, or `undefined` while it simply
   * shows the current value — including while it merely has focus. Only an edit sets it, so leaving
   * a field the user never typed into commits nothing and cannot write a shown value back over a
   * change made elsewhere. Kept while a write from elsewhere arrives, so a change the user did not
   * make never overwrites what they are typing.
   */
  const [draft, setDraft] = useState<string | undefined>(undefined);

  /**
   * What the visually hidden live region says: the percentage the last button press moved to. The
   * field cannot announce it itself — an input must not be a live region — and the pressed button
   * keeps focus, so nothing else would say it.
   */
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    // A prop this component never asked for is a write from elsewhere (another window, a clamp) and
    // is authoritative at once; a prop it did ask for is a confirmation, which leaves any newer
    // press still outstanding.
    if (recentlyEmittedRef.current.includes(value)) return;
    recentlyEmittedRef.current = [];
    setPending(undefined);
    // The last press no longer describes the value, and leaving its text would make a later press
    // that lands on the same percentage announce nothing.
    setAnnouncement('');
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

  /** Asks for `next`, unless it is what the control already answers with. `true` when it asked. */
  const emit = (next: number): boolean => {
    if (next === baseline) return false;
    recentlyEmittedRef.current = [next, ...recentlyEmittedRef.current].slice(0, 2);
    setPending({ factor: next, at: performance.now() });
    onChange(next);
    return true;
  };

  const press = (next: number) => {
    if (emit(next)) setAnnouncement(formatZoomPercent(next));
  };

  /**
   * Commits what the user typed, if it is a whole percentage. Text that is not a percentage commits
   * nothing, so the field falls back to the current value — there is no error to show, because the
   * field only ever settles on a valid value. The caller clears the draft afterwards.
   */
  const commitDraft = () => {
    if (draft === undefined) return;
    // The focused field shows the typed value itself, so a press's announcement is stale now.
    setAnnouncement('');
    const typed = parsePercentInput(draft);
    if (typed === undefined) return;
    emit(typed);
  };

  const handlePercentKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commitDraft();
      setDraft(undefined);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setDraft(undefined);
    }
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
      {/* Two groups rather than one so plain flex wrapping can put the percentage and reset under
          the step buttons when the row is too narrow for both; each group rounds its own outer
          corners. */}
      <div
        role="group"
        aria-label={groupLabel}
        className={cn('tw:flex tw:flex-wrap tw:gap-2', className)}
      >
        <ButtonGroup>
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
                  press(adjustZoomFactor(baseline, -1));
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
                  press(adjustZoomFactor(baseline, 1));
                }}
              >
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {increaseDisabled && !disabled ? labels.atMaximum : labels.increase}
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>
        <ButtonGroup>
          {/* Shows the press this control is still waiting on, so the number, the buttons and the
              arithmetic always agree: a write travels through a debounce before it is even sent,
              and a number that sits still for that long reads as a press the control ignored. */}
          <Input
            type="text"
            inputMode="numeric"
            aria-label={labels.percentInput}
            disabled={disabled}
            value={draft ?? formatZoomPercent(baseline)}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handlePercentKeyDown}
            onBlur={() => {
              commitDraft();
              setDraft(undefined);
            }}
            className="tw:w-16 tw:bg-muted tw:text-center tw:text-sm tw:font-medium tw:tabular-nums"
          />
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
                  press(defaultValue);
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
        <span aria-live="polite" className="tw:sr-only">
          {announcement}
        </span>
      </div>
    </TooltipProvider>
  );
}

export default ZoomStepper;
