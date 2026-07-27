import { Fragment } from 'react';
import { formatReplacementStringToArray } from 'platform-bible-utils';
import { cn } from '@/utils/shadcn-ui/utils';
import { Kbd } from '@/components/shadcn-ui/kbd';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';

/** Props for {@link DestructiveKeyConfirmation}. */
export type DestructiveKeyConfirmationProps = {
  /** Whether the confirmation hint is currently showing. */
  open: boolean;
  /**
   * Position and size of the invisible anchor, in the coordinates of the nearest `position:
   * relative` ancestor. Typically the bounding rect of the element the hint should point at (e.g. a
   * verse marker), recomputed by the caller as it moves/scrolls.
   */
  anchorRect: { top: number; left: number; width: number; height: number };
  /** Localized message to display. Include a `{key}` placeholder where the confirming key belongs. */
  message: string;
  /**
   * Localized/display label for the key that confirms the action on a second press (e.g.
   * "Backspace").
   */
  confirmingKeyLabel: string;
  /** Tooltip placement side. Defaults to `'bottom'`. */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Tooltip placement alignment. Defaults to `'start'`. */
  align?: 'start' | 'center' | 'end';
  /** Whether to render the pointer arrow. Defaults to `true`. */
  showArrow?: boolean;
};

/**
 * A destructive-styled "press again to confirm" hint, anchored to an arbitrary point (`anchorRect`)
 * rather than a rendered trigger element. Built for two-step destructive actions (e.g. deleting a
 * verse marker on a second Backspace/Delete) where the caller owns detecting the "armed" state and
 * this component only renders the hint.
 */
export function DestructiveKeyConfirmation({
  open,
  anchorRect,
  message,
  confirmingKeyLabel,
  side = 'bottom',
  align = 'start',
  showArrow = true,
}: DestructiveKeyConfirmationProps) {
  return (
    <TooltipProvider>
      {/* onOpenChange no-op satisfies Radix's controlled-component contract and silences the dev warning */}
      <Tooltip open={open} onOpenChange={() => {}}>
        <TooltipTrigger
          aria-hidden="true"
          tabIndex={-1}
          className={cn(
            'tw:absolute tw:opacity-0 tw:pointer-events-none',
            'tw:p-0 tw:border-0 tw:bg-transparent tw:cursor-default tw:min-w-0 tw:min-h-0',
          )}
          style={{
            top: anchorRect.top,
            left: anchorRect.left,
            width: anchorRect.width,
            height: anchorRect.height,
          }}
        />
        <TooltipContent
          side={side}
          align={align}
          showArrow={showArrow}
          // Radix defaults arrowPadding to 0, letting the arrow slide all the way to a rounded
          // corner. The clip-path/border trick above assumes the arrow meets a *straight* stretch of
          // the content's border — right at a corner, the border curves away, so the straight-edged
          // clipped arrow would either gap from or cut across the curve. Keep the arrow at least the
          // content's border-radius (rounded-md = 6px) away from every corner so it always lands on a
          // straight edge; a couple of px of margin avoids a razor-thin straight segment.
          arrowPadding={8}
          // Padding moves onto the inner div below so its tint background can reach the tooltip's
          // rounded edges instead of leaving an untinted padding gutter. Also zero out
          // TooltipContent's has-data-[slot=kbd]:pe-1.5 (the Kbd we render always matches it) — that
          // :has() selector otherwise out-specificities a plain tw:p-0 and leaves a gap on the
          // trailing edge.
          className={cn(
            // Rely on TooltipContent's default tw:max-w-xs (320px) and normal wrapping: this hint's
            // text is short and usually fits on one line, but locale length varies (e.g. Spanish runs
            // longer than English), so allow it to wrap rather than force tw:whitespace-nowrap, which
            // could clip or overflow on a narrow webview.
            'tw:p-0 tw:has-data-[slot=kbd]:pe-0 tw:bg-background tw:text-destructive tw:border tw:border-destructive',
          )}
          // The arrow's polygon paints via the SVG `fill` property, and opacity-modified fill-*
          // classes (fill-destructive/10) don't generate real CSS here — bake the same tint as an
          // explicit color-mix() instead, which also avoids depending on whatever is behind the
          // arrow (tooltip.tsx's side-aware clip-path/translate keeps only the outward-facing half
          // visible, so the un-clipped half's fill never gets a chance to mismatch the content box).
          //
          // KNOWN LIMITATION: the border is only added for side="top"/"bottom" — verified correct
          // (including the arrowPadding-vs-rounded-corner interaction above) via DOM measurement and
          // visual inspection. side="left"/"right" use the exact same clip-path/translate-x
          // mechanism in tooltip.tsx, but that math has NOT been gotten right yet (the arrow
          // disconnects from the content edge) and needs its own investigation. Since this component
          // always defaults to side="bottom" in production, left/right only come up via Storybook's
          // `side` control, so — rather than ship a visibly broken border — fall back to the
          // borderless, same-tint-fill look (identical to the default non-destructive arrow) for
          // those two sides until the clip math is fixed.
          arrowClassName={cn(
            'tw:bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:fill-[color-mix(in_oklab,var(--destructive)_10%,var(--background))]',
            (side === 'top' || side === 'bottom') && 'tw:border tw:border-destructive',
          )}
        >
          {open ? (
            <div className="tw:inline-flex tw:w-full tw:h-full tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5">
              {formatReplacementStringToArray(message, {
                key: (
                  <Kbd
                    className={cn(
                      // Kbd's base styling sets text-muted-foreground (unconditioned) plus
                      // in-data-[slot=tooltip-content]:text-background (for the default dark
                      // tooltip). Override both forms explicitly so tailwind-merge drops both base
                      // rules instead of leaving the winner up to CSS cascade order.
                      'tw:border tw:border-destructive tw:in-data-[slot=tooltip-content]:text-destructive',
                    )}
                  >
                    {confirmingKeyLabel}
                  </Kbd>
                ),
              }).map((part, index) => (
                // The array is static per render (one fixed localized string + one kbd), so index is
                // a stable, safe key — mirrors the about-dialog.component.tsx precedent.
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={`key-${index}`}>{part}</Fragment>
              ))}
            </div>
          ) : undefined}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default DestructiveKeyConfirmation;
