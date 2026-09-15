/**
 * Standard delay, in milliseconds, before a hover reveals a tooltip. Pass it to `TooltipProvider`'s
 * `delayDuration` prop (or use it directly in a hand-rolled reveal timer, as
 * `ParagraphMarkerTooltipOverlay` does) so tooltips that opt in share one consistent feel.
 * `TooltipProvider`'s own default `delayDuration` remains 0 (instant) — most tooltips in the app
 * don't pass this constant, so it is opt-in, not automatic. Extensions can't reach app-side renderer
 * constants directly (see the repo's Security-Guide.md Module Import Restrictions), so — mirroring
 * `Z_INDEX_OVERLAY` and its siblings in `z-index.ts` — this lives here instead.
 */
export const TOOLTIP_DELAY_MS = 300;
