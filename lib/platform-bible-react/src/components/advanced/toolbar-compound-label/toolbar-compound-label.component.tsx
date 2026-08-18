import { ReactNode, useCallback, useState } from 'react';
import { cn } from '@/utils/shadcn-ui/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { useTruncationTooltip } from '@/hooks/use-truncation-tooltip.hook';

export type ToolbarCompoundLabelProps = {
  /**
   * The field that must survive at every width — a book abbreviation, a project short name, a
   * marker code. Never truncates and is never dropped.
   */
  primary: ReactNode;
  /**
   * The field that gives way when space runs short: clipped with an ellipsis first, then dropped
   * entirely once {@link ToolbarCompoundLabelProps.showSecondary} goes false.
   */
  secondary?: ReactNode;
  /**
   * Render `secondary` before `primary`. Needed where the flexible field reads first — a project
   * selector shows `Translation Project 1 (TP1)`, so the full name precedes the short name it
   * degrades to.
   */
  secondaryFirst?: boolean;
  /** Whether the secondary field is shown at all. Defaults to `true`. */
  showSecondary?: boolean;
  /** The complete, untruncated label. Shown in the tooltip whenever the rendered form is partial. */
  fullText: string;
  /** Additional classes for the label's flex row. */
  className?: string;
};

/**
 * A two-field toolbar label that degrades predictably as its slot narrows: the secondary field
 * clips with an ellipsis, then disappears, leaving the primary field alone. A tooltip carries the
 * complete text whenever what is rendered is not the whole thing.
 *
 * This encodes the rule that the second field is always the truncation target, so the toolbar items
 * that follow it — scripture reference, project selector, paragraph style — cannot drift apart.
 *
 * The ellipsis step needs no JavaScript: `primary` is `shrink-0` and `secondary` is `min-w-0
 * truncate`, so the flex algorithm clips the secondary field and nothing else as the slot narrows.
 * Only the _dropped_ step needs a caller-supplied flag.
 */
export function ToolbarCompoundLabel({
  primary,
  secondary,
  secondaryFirst = false,
  showSecondary = true,
  fullText,
  className,
}: ToolbarCompoundLabelProps) {
  // Clip-driven tooltip: opens only when the secondary field's text actually overflows its box, so
  // a label that already fits gets no redundant tooltip.
  const {
    ref: secondaryRef,
    open: isClippedHovered,
    onPointerEnter: onClipPointerEnter,
    onPointerLeave: onClipPointerLeave,
  } = useTruncationTooltip<HTMLSpanElement>();

  // Dropped-field tooltip: with the secondary field removed from the DOM there is nothing to
  // measure, yet the label is definitively incomplete — so hover alone opens it. Same two-source
  // pattern `project-selector.component.tsx` uses for rows carrying non-visible information.
  const [isIncompleteHovered, setIsIncompleteHovered] = useState(false);

  const isSecondaryRendered = showSecondary && secondary !== undefined;

  const handlePointerEnter = useCallback(() => {
    if (isSecondaryRendered) onClipPointerEnter();
    else setIsIncompleteHovered(true);
  }, [isSecondaryRendered, onClipPointerEnter]);

  const handlePointerLeave = useCallback(() => {
    setIsIncompleteHovered(false);
    onClipPointerLeave();
  }, [onClipPointerLeave]);

  // These labels sit inside popover and select triggers. Without this, clicking the trigger leaves
  // the tooltip open on top of the popover that just opened, because the pointer never "leaves".
  const handlePointerDown = useCallback(() => {
    setIsIncompleteHovered(false);
    onClipPointerLeave();
  }, [onClipPointerLeave]);

  const primaryNode = (
    <span key="primary" className="tw:shrink-0 tw:whitespace-nowrap">
      {primary}
    </span>
  );

  const secondaryNode = isSecondaryRendered ? (
    <span key="secondary" ref={secondaryRef} className="tw:min-w-0 tw:truncate">
      {secondary}
    </span>
  ) : undefined;

  return (
    // Carrying our own TooltipProvider means this works in any host, including toolbars that never
    // set one up. Nested providers are harmless in Radix.
    <TooltipProvider>
      <Tooltip open={isClippedHovered || isIncompleteHovered}>
        <TooltipTrigger asChild>
          <span
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            className={cn('tw:flex tw:min-w-0 tw:items-baseline tw:gap-1', className)}
          >
            {secondaryFirst ? [secondaryNode, primaryNode] : [primaryNode, secondaryNode]}
          </span>
        </TooltipTrigger>
        <TooltipContent>{fullText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ToolbarCompoundLabel;
