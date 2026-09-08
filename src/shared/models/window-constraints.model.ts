/**
 * Narrowest window width the app supports, in CSS pixels.
 *
 * Floor set by UX (2026-08-18): 2025 analytics show 99.83% of 11,587 users on a screen 900px or
 * wider, so nothing narrower has to be supported. It buys Simple mode three ~300px columns that fit
 * without a horizontal scrollbar — `SIMPLE_COLUMN_MIN_WIDTH_PX` in `simple-layout.data.ts` is
 * derived from this number, and `simple-layout.data.test.ts` pins that arithmetic against it.
 *
 * This lives in `src/shared/` because the two consumers sit in different processes: the main
 * process applies it as the `BrowserWindow` `minWidth`, and the renderer derives Simple mode's
 * column minimums from it. `src/node/` would not work — the renderer is not a Node process.
 *
 * TODO: Remove this temporary enforcement when https://paratextstudio.atlassian.net/browse/PT-2333
 * is implemented
 */
export const WINDOW_MIN_WIDTH_PX = 900;
