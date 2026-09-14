/**
 * Standard hover delay (ms) before a tooltip reveals, shared across the app and extensions so every
 * tooltip has one consistent feel. Extensions can't reach app-side renderer constants directly (see
 * the repo's Security-Guide.md Module Import Restrictions), so — mirroring `Z_INDEX_OVERLAY` and
 * its siblings in `z-index.ts` — this lives here instead.
 */
export const TOOLTIP_DELAY = 300;
