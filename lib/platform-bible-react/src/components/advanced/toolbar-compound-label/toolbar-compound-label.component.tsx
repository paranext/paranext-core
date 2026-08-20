import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/shadcn-ui/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { useTruncationTooltip } from '@/hooks/use-truncation-tooltip.hook';

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
  // Opens only when the secondary field's text actually overflows its box, so a label that fits
  // gets no redundant tooltip.
  const {
    ref: secondaryRef,
    open: isClippedHovered,
    onPointerEnter: onClipPointerEnter,
    onPointerLeave: onClipPointerLeave,
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
    const focusable = rootRef.current?.closest('button, [role="combobox"], [tabindex]');
    if (!focusable) return undefined;

    const reveal = () => {
      // Same two sources as hover: a label that is short by construction, or one CSS has clipped.
      // Anything that already reads in full needs no tooltip on focus either.
      const secondaryElement = secondaryRef.current;
      const isClipped =
        !!secondaryElement && secondaryElement.scrollWidth > secondaryElement.clientWidth;
      if (isShowingPartialLabel || isClipped) setIsFocusRevealed(true);
    };
    const hide = () => setIsFocusRevealed(false);

    focusable.addEventListener('focus', reveal);
    focusable.addEventListener('blur', hide);
    return () => {
      focusable.removeEventListener('focus', reveal);
      focusable.removeEventListener('blur', hide);
    };
  }, [isShowingPartialLabel, secondaryRef]);

  const handlePointerEnter = useCallback(() => {
    if (isShowingPartialLabel) setIsIncompleteHovered(true);
    if (isSecondaryRendered) onClipPointerEnter();
  }, [isShowingPartialLabel, isSecondaryRendered, onClipPointerEnter]);

  // Wired to both pointer-leave and pointer-down. The press case is not redundant: these labels sit
  // inside popover and select triggers, and without it the tooltip stays open on top of the popover
  // the click just opened, because the pointer never "leaves".
  const closeTooltip = useCallback(() => {
    setIsIncompleteHovered(false);
    setIsFocusRevealed(false);
    onClipPointerLeave();
  }, [onClipPointerLeave]);

  const primaryNode = (
    <span key="primary" className="tw:min-w-0 tw:shrink tw:truncate">
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
      <Tooltip open={isClippedHovered || isIncompleteHovered || isFocusRevealed}>
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
