/**
 * Helpers for asserting on tooltips in tests.
 *
 * Radix renders tooltip content twice: the visible popper content, and a visually-hidden copy that
 * carries `role="tooltip"` for screen readers. A `getByRole('tooltip')` query therefore matches an
 * element that is present even when nothing is on screen — so it passes even if the tooltip is
 * painted behind a higher-stacking ancestor, which is exactly the bug these tests exist to catch.
 * Query the visible content instead.
 */
export const VISIBLE_TOOLTIP_SELECTOR = '[data-slot="tooltip-content"]';

/** All currently-open, visible tooltip content elements in the document. */
export function queryVisibleTooltips(): NodeListOf<HTMLElement> {
  return document.querySelectorAll<HTMLElement>(VISIBLE_TOOLTIP_SELECTOR);
}
