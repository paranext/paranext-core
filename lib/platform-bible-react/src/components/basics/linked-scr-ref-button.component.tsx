import { MouseEventHandler, ReactNode } from 'react';
import { cn } from '@/utils/shadcn-ui/utils';
import { Button } from '@/components/shadcn-ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';

/**
 * Props for {@link LinkedScrRefButton}.
 *
 * The component renders a scripture reference (or any short label) as a shadcn `Button` variant
 * `link`, wrapped in a tooltip. Used when a scripture reference should double as a navigation
 * affordance — clicking the reference text takes the user to that location in scripture.
 *
 * @experimental This component is expected to be removed once
 *   [`LinkedScrRefDisplay`](https://github.com/paranext/paranext-core/pull/1949) lands. That
 *   richer component is built around `SerializedVerseRef` and the formatted-range utilities in
 *   `platform-bible-utils` and supersedes this button for consumers that have structured
 *   `SerializedVerseRef` data. Until PR #1949 merges, this button covers the
 *   "string-already-formatted" case (e.g. the markers-checklist Reference column). **Do not depend
 *   on this component long-term — migrate to `LinkedScrRefDisplay` as soon as it is available.**
 */
export type LinkedScrRefButtonProps = {
  /**
   * The scripture reference (or any short label) to render as link text. Already-formatted — no
   * internal formatting is applied. Pass an empty string to render nothing.
   */
  scrRef: string;
  /** Click handler. Receives the standard mouse event. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Tooltip content displayed on hover. Typical usage: a localized "Go to {scrRef}" string built by
   * the consumer. Pass a `ReactNode` to surface complex content if needed.
   */
  tooltipContent?: ReactNode;
  /**
   * Optional accessible name override. When omitted, the button's text content (the scripture ref)
   * provides the accessible name.
   */
  ariaLabel?: string;
  /** Optional class name appended to the button's class list. */
  className?: string;
  /**
   * Optional `data-testid` for the button. The default `'linked-scr-ref-button'` is rarely unique
   * enough — pass a feature-scoped value when the button appears in tested flows.
   */
  testId?: string;
};

/**
 * Renders a scripture reference as a clickable shadcn link-button with a hover tooltip. Designed
 * for table cells / row affordances where the reference string itself is the navigation target —
 * e.g. the first column of the markers-checklist data table, where clicking `GEN 1:1` navigates the
 * active scripture editor to that verse.
 *
 * The button uses `variant="link"` styling, so it inherits the foreground color and
 * underline-on-hover treatment without the chrome of a standard button. Wrap in a parent that
 * controls layout (the button itself is `inline-flex`).
 *
 * If no `onClick` is provided, the button is disabled and the tooltip still surfaces (useful for
 * read-only contexts where the reference should not be navigable but should still be readable).
 */
export function LinkedScrRefButton({
  scrRef,
  onClick,
  tooltipContent,
  ariaLabel,
  className,
  testId = 'linked-scr-ref-button',
}: LinkedScrRefButtonProps) {
  if (scrRef === '') return undefined;

  const button = (
    <Button
      type="button"
      variant="link"
      onClick={onClick}
      disabled={!onClick}
      aria-label={ariaLabel}
      className={cn(
        // Tight, inline link-button styling — no extra padding / height. Consumers can override
        // typography (font, size) via the `className` prop.
        'tw:h-auto tw:p-0 tw:text-start tw:font-mono tw:text-sm',
        className,
      )}
      data-testid={testId}
    >
      {scrRef}
    </Button>
  );

  if (!tooltipContent) return button;

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default LinkedScrRefButton;
