import { Fragment, useState } from 'react';
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
  /**
   * Tooltip placement side. Defaults to `'bottom'`.
   *
   * Only `'top'`/`'bottom'` are supported — the bordered arrow this component renders relies on
   * clip-path/translate math in `tooltip.tsx` that has only been worked out for those two sides;
   * the equivalent math for `'left'`/`'right'` was tried and found visibly broken (see
   * tooltip.tsx), so those two values are omitted from this component's public API rather than
   * silently degrading to a borderless arrow.
   */
  side?: 'top' | 'bottom';
  /** Tooltip placement alignment. Defaults to `'start'`. */
  align?: 'start' | 'center' | 'end';
  /** Whether to render the pointer arrow. Defaults to `true`. */
  showArrow?: boolean;
};

/**
 * Returns `value` while `open` is true. Once `open` goes false, keeps returning whatever `value`
 * was the moment `open` was last true, instead of tracking further changes to it.
 *
 * For a caller that resets its props to "closed" defaults in the very same render that `open` flips
 * false (as `DestructiveKeyConfirmation`'s caller does), this lets consumers keep rendering the
 * last real content instead of going blank while something else — e.g. Radix `Presence`,
 * mid-exit-animation — keeps the element mounted a while longer.
 */
export function useFrozenWhileClosed<T>(open: boolean, value: T): T {
  const [wasOpen, setWasOpen] = useState(open);
  const [frozen, setFrozen] = useState(value);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setFrozen(value);
  }
  return open ? value : frozen;
}

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
  // The TooltipTrigger below is aria-hidden and never receives hover/focus (arming is driven by the
  // caller's own DOM detection, not pointer/focus events), so the visual tooltip is invisible to
  // assistive tech. Announce the same message through a separate visually-hidden live region: a
  // plain-text render of `message` (the Kbd's styling doesn't matter for a screen reader) that
  // becomes non-empty only while armed, so its change is what triggers the announcement.
  const srMessage = open
    ? formatReplacementStringToArray<string>(message, { key: confirmingKeyLabel }).join('')
    : '';

  // The caller typically flips anchorRect/message/confirmingKeyLabel/showArrow back to their
  // "unarmed" values (e.g. an empty confirmingKeyLabel, a zeroed anchorRect) in the very same
  // render that `open` goes false. TooltipContent, though, stays mounted for its Radix
  // fade-out-0/zoom-out-95 exit animation (tooltip.tsx), so rendering directly off current props
  // during that animation would shrink an already-empty, wrongly-positioned box. Freeze the last
  // armed snapshot while `open` is true and keep rendering from it once `open` goes false, so the
  // exit animation fades the real hint away instead of an empty box.
  const {
    anchorRect: displayAnchorRect,
    message: displayMessage,
    confirmingKeyLabel: displayConfirmingKeyLabel,
    showArrow: displayShowArrow,
  } = useFrozenWhileClosed(open, { anchorRect, message, confirmingKeyLabel, showArrow });

  return (
    <TooltipProvider>
      <span role="status" className="tw:sr-only">
        {srMessage}
      </span>
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
            top: displayAnchorRect.top,
            left: displayAnchorRect.left,
            width: displayAnchorRect.width,
            height: displayAnchorRect.height,
          }}
        />
        <TooltipContent
          side={side}
          align={align}
          showArrow={displayShowArrow}
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
          // The border is unconditional here because `side` only ever admits 'top'/'bottom' (see the
          // TSDoc on the `side` prop) — verified correct, including the arrowPadding-vs-rounded-corner
          // interaction above, via DOM measurement and visual inspection.
          arrowClassName="tw:bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:fill-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:border tw:border-destructive"
        >
          {/* Rendered unconditionally (not gated on `open`) so the frozen armedSnapshot content
              above stays mounted through Radix's exit animation instead of vanishing to an empty
              box the instant `open` goes false — see the freezing comment above. Before the hint
              is ever armed once, TooltipContent itself isn't in the DOM yet (Radix's Presence
              doesn't mount it until the first `open`), so there's nothing to render prematurely. */}
          <div className="tw:inline-flex tw:w-full tw:h-full tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5">
            {formatReplacementStringToArray(displayMessage, {
              key: (
                <Kbd
                  className={cn(
                    // Kbd's base styling sets text-muted-foreground (unconditioned) plus
                    // in-data-[slot=tooltip-content]:text-background (for the default dark
                    // tooltip). Override both forms explicitly so tailwind-merge drops both base
                    // rules instead of leaving the winner up to CSS cascade order.
                    'tw:border tw:border-destructive tw:in-data-[slot=tooltip-content]:text-destructive',
                    // Kbd's own tw:min-w-5 (20px) is smaller than a localized key label like
                    // "Retroceso" can need, and that explicit min-width overrides the flex item's
                    // content-based automatic minimum. Without shrink-0, once the sibling message
                    // text item wraps and the row runs out of width, flexbox shrinks the Kbd down
                    // toward that 20px floor instead of the message, clipping the key label. Pin
                    // Kbd to its fit-content width and let the message text (which wraps freely)
                    // absorb the shrink instead.
                    'tw:shrink-0',
                  )}
                >
                  {displayConfirmingKeyLabel}
                </Kbd>
              ),
            }).map((part, index) => (
              // The array is static per render (one fixed localized string + one kbd), so index is
              // a stable, safe key — same rationale as source-language-indexed-list.component.tsx's
              // disable.
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={`key-${index}`}>{part}</Fragment>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default DestructiveKeyConfirmation;
