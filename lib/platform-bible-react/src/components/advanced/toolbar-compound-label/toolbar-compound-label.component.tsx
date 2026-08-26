import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/shadcn-ui/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { useTruncationTooltip } from '@/hooks/use-truncation-tooltip.hook';

/**
 * Which input device the user most recently used, tracked document-wide.
 *
 * Radix hands focus back to a trigger when the popover or select it opened closes
 * (`onCloseAutoFocus` / `onUnmountAutoFocus`). That fires a real `focus` event with the pointer
 * nowhere near the control, so a focus listener alone cannot tell "the user tabbed here" from "a
 * menu just closed" — and treating the second as the first pops a tooltip over the toolbar that no
 * pointer event will ever close. The distinction is the input device, not the element, so it is
 * tracked once for the document rather than per label. `:focus-visible` encodes the same idea, but
 * it is unreliable under test: jsdom reports it false for a programmatic `focus()`, which is how
 * keyboard focus is simulated.
 *
 * Starts as keyboard so a label focused before any input at all still explains itself.
 */
let lastInteractionModality: 'keyboard' | 'pointer' = 'keyboard';
let isModalityTrackerRegistered = false;

function trackInteractionModality() {
  if (isModalityTrackerRegistered || typeof document === 'undefined') return;
  isModalityTrackerRegistered = true;
  // Capture phase, so the modality is already correct by the time any focus handler runs.
  document.addEventListener(
    'pointerdown',
    () => {
      lastInteractionModality = 'pointer';
    },
    true,
  );
  document.addEventListener(
    'keydown',
    () => {
      lastInteractionModality = 'keyboard';
    },
    true,
  );
}

export type ToolbarCompoundLabelProps = {
  /** The field that identifies the item — a book abbreviation, project short name, marker code. */
  primary: ReactNode;
  /** The field that gives way first: clipped with an ellipsis, then dropped entirely. */
  secondary?: ReactNode;
  /**
   * Text placed between the two fields. Rendered as a real text node, so it survives into
   * `textContent` where a CSS `gap` would not — assertions and screen readers both read it.
   */
  separator?: string;
  /**
   * Render `secondary` before `primary`, for labels that read that way round — a project selector
   * shows `Translation Project 1 (TP1)`, full name first, short name last.
   */
  secondaryFirst?: boolean;
  /** Whether the secondary field is rendered at all. Defaults to `true`. */
  showSecondary?: boolean;
  /**
   * Whether what is rendered is only part of {@link ToolbarCompoundLabelProps.fullText}, so the
   * tooltip should open on hover even though nothing is visibly clipped. Set this when the primary
   * field is an abbreviation — `GEN` for `Genesis` — which CSS cannot detect.
   *
   * Defaults to true whenever the secondary field has been dropped.
   */
  isPartial?: boolean;
  /** The complete label. Shown in the tooltip whenever the rendered form is not the whole thing. */
  fullText: string;
  /** Additional classes for the label row. */
  className?: string;
};

/**
 * A two-field toolbar label that degrades predictably as its slot narrows: the secondary field
 * clips with an ellipsis, then disappears, leaving the primary field alone. A tooltip carries the
 * complete text whenever what is rendered is not all of it.
 *
 * The ellipsis step needs no JavaScript. Both fields can shrink, but the secondary is weighted to
 * absorb ~all of it, so it clips to nothing before the primary gives up a character — and the
 * primary keeps an ellipsis of its own rather than being cut mid-glyph by the trigger's
 * `overflow-hidden`. Only the abbreviation and dropped steps need the caller to say so.
 */
export function ToolbarCompoundLabel({
  primary,
  secondary,
  separator = ' ',
  secondaryFirst = false,
  showSecondary = true,
  isPartial,
  fullText,
  className,
}: ToolbarCompoundLabelProps) {
  // Opens only when a field's text actually overflows its box, so a label that fits gets no
  // redundant tooltip. Both fields are watched: the secondary is weighted to give way first, but
  // once it has nothing left the primary is what clips, and that is exactly when the full text is
  // most worth offering.
  const {
    ref: secondaryRef,
    open: isSecondaryClipHovered,
    onPointerEnter: onSecondaryClipPointerEnter,
    onPointerLeave: onSecondaryClipPointerLeave,
  } = useTruncationTooltip<HTMLSpanElement>();
  const {
    ref: primaryRef,
    open: isPrimaryClipHovered,
    onPointerEnter: onPrimaryClipPointerEnter,
    onPointerLeave: onPrimaryClipPointerLeave,
  } = useTruncationTooltip<HTMLSpanElement>();

  // An abbreviated or dropped field is incomplete without being measurably clipped, so hover alone
  // has to open the tooltip. Same two-source pattern `project-selector.component.tsx` uses.
  const [isIncompleteHovered, setIsIncompleteHovered] = useState(false);

  // Keyboard reveal. These labels render inside a button or select trigger, so focus lands on that
  // ancestor and never on the span below — a React `onFocus` here would not fire. Without this the
  // shortened text is a pointer-only affordance: a keyboard user tabbing to an abbreviated
  // reference has no way at all to see what it stands for.
  const [isFocusRevealed, setIsFocusRevealed] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(
    // React's ref API requires `null` as the initial value for DOM refs.
    // eslint-disable-next-line no-null/no-null
    null,
  );

  const isSecondaryRendered = showSecondary && secondary !== undefined;
  const isShowingPartialLabel = isPartial ?? (secondary !== undefined && !showSecondary);

  useEffect(() => {
    trackInteractionModality();
    const focusable = rootRef.current?.closest('button, [role="combobox"], [tabindex]');
    if (!focusable) return undefined;

    const isClipped = (element: HTMLSpanElement | null) =>
      !!element && element.scrollWidth > element.clientWidth;

    const reveal = () => {
      // Only a keyboard arrival reveals — see `lastInteractionModality`. A pointer user who just
      // dismissed a menu gets focus back without asking for an explanation of a label they can see.
      if (lastInteractionModality === 'pointer') return;
      // Same two sources as hover: a label that is short by construction, or one CSS has clipped.
      // Anything that already reads in full needs no tooltip on focus either.
      if (isShowingPartialLabel || isClipped(primaryRef.current) || isClipped(secondaryRef.current))
        setIsFocusRevealed(true);
    };
    const hide = () => setIsFocusRevealed(false);

    focusable.addEventListener('focus', reveal);
    focusable.addEventListener('blur', hide);
    return () => {
      focusable.removeEventListener('focus', reveal);
      focusable.removeEventListener('blur', hide);
    };
  }, [isShowingPartialLabel, primaryRef, secondaryRef]);

  const handlePointerEnter = useCallback(() => {
    if (isShowingPartialLabel) setIsIncompleteHovered(true);
    onPrimaryClipPointerEnter();
    if (isSecondaryRendered) onSecondaryClipPointerEnter();
  }, [
    isShowingPartialLabel,
    isSecondaryRendered,
    onPrimaryClipPointerEnter,
    onSecondaryClipPointerEnter,
  ]);

  // Wired to both pointer-leave and pointer-down. The press case is not redundant: these labels sit
  // inside popover and select triggers, and without it the tooltip stays open on top of the popover
  // the click just opened, because the pointer never "leaves".
  const closeTooltip = useCallback(() => {
    setIsIncompleteHovered(false);
    setIsFocusRevealed(false);
    onPrimaryClipPointerLeave();
    onSecondaryClipPointerLeave();
  }, [onPrimaryClipPointerLeave, onSecondaryClipPointerLeave]);

  // The open state is latched at event time, so a label that grows back to its full form while the
  // tooltip is up would otherwise keep showing a tooltip that now just repeats what is on screen.
  // Widening is exactly when that happens: the shrink step drops and `showSecondary` flips back on
  // under a pointer or focus that never moved.
  useEffect(() => {
    if (!isShowingPartialLabel) setIsIncompleteHovered(false);
  }, [isShowingPartialLabel]);

  const primaryNode = (
    <span key="primary" ref={primaryRef} className="tw:min-w-0 tw:shrink tw:truncate">
      {primary}
    </span>
  );

  const secondaryNode = isSecondaryRendered ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    <span key="secondary" ref={secondaryRef} className="tw:min-w-0 tw:shrink-[9999] tw:truncate">
      {secondary}
    </span>
  ) : undefined;

  const [first, second] = secondaryFirst
    ? [secondaryNode, primaryNode]
    : [primaryNode, secondaryNode];

  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    <TooltipProvider>
      {/* `onOpenChange` is what makes this dismissable. A controlled Radix tooltip routes every
          close it decides on — Escape, an outside pointer press — through this callback, so
          without it the tooltip's own dismiss handler is a no-op AND its dismissable layer still
          calls `preventDefault()` on that Escape, swallowing the keypress from whatever popover
          sits underneath. Only closes are honoured; opening stays ours to decide. */}
      <Tooltip
        open={
          isPrimaryClipHovered || isSecondaryClipHovered || isIncompleteHovered || isFocusRevealed
        }
        onOpenChange={(isOpen) => {
          if (!isOpen) closeTooltip();
        }}
      >
        <TooltipTrigger asChild>
          <span
            ref={rootRef}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={closeTooltip}
            onPointerDown={closeTooltip}
            // Centred, not baseline-aligned. A field whose content is an `inline-block` with
            // `overflow: hidden` — which the paragraph label's fixed marker slot is — takes its
            // bottom margin edge as its baseline rather than its text baseline, so baseline
            // alignment hangs the marker off the wrong edge and it sits visibly high next to the
            // style name. How far off depends on the font's metrics, so it shows on some platforms
            // and not others. Both fields here are the same size, so centring costs nothing.
            className={cn('tw:flex tw:min-w-0 tw:items-center', className)}
          >
            {first}
            {/* Only between two rendered fields — never leading or trailing, which is what a
                naive "is there a second slot" check produces once one field is dropped. */}
            {first && second && (
              <span key="separator" className="tw:shrink-0 tw:whitespace-pre">
                {separator}
              </span>
            )}
            {second}
          </span>
        </TooltipTrigger>
        <TooltipContent>{fullText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ToolbarCompoundLabel;
