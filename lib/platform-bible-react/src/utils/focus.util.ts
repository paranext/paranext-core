/** Defines HTML elements that can be focusable by keyboard as a CSS selector string */
const FOCUSABLE_SELECTOR = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [contenteditable],
  tr:not([disabled])
`;

/** Returns true if the element is visible in the DOM */
function isVisible(el: HTMLElement): boolean {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

/**
 * Finds all focusable elements in the given container. Focusable elements are all HTML elements
 * that can receive keyboard focus, and are not disabled or hidden from screen readers.
 *
 * @param container The container element to search for focusable elements.
 * @param uniqueQuerySelector An optional CSS selector to filter the focusable elements by.
 * @returns An array of focusable elements.
 */
export function getFocusableElements(
  container: HTMLElement,
  uniqueQuerySelector?: string,
): HTMLElement[] {
  const query = uniqueQuerySelector
    ? `${FOCUSABLE_SELECTOR}, ${uniqueQuerySelector}`
    : FOCUSABLE_SELECTOR;
  return Array.from(container.querySelectorAll<HTMLElement>(query)).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden') && isVisible(el),
  );
}

/**
 * Tailwind classes for the keyboard focus ring on the currently highlighted list or grid item.
 *
 * Uses shadcn's standard focus-ring color token (`ring-ring/50`), but triggers on `data-selected`
 * rather than `:focus-visible`: cmdk list items are never DOM-focused (the list container owns
 * focus and items only carry `data-selected`), so `:focus-visible` can never match them.
 * `ring-inset` keeps the ring from being clipped by the scrolling list.
 *
 * `ring-2` rather than the heavier `ring-3` some controls use: these items sit in a dense grid of
 * 32px cells separated by a 4px gap, where a 3px ring on adjacent cells reads as a merged block
 * rather than a highlight on one cell.
 *
 * Consumers rendering the item on a filled background (e.g. `bg-primary` for a current chapter)
 * should override the ring color with one that contrasts against that fill — `cn` merges the later
 * `ring-*` color and drops this one, so argument order decides rather than CSS output order.
 *
 * Tailwind implements `ring-*` as a `box-shadow`, and CSS Color Adjust forces `box-shadow: none`
 * under `forced-colors: active` (Windows High Contrast). Consumers of this constant suppress the
 * `data-selected` background they would otherwise fall back on, so without the `outline` below the
 * highlight would vanish entirely there and arrowing through a list would move nothing visible.
 * `Highlight` is a system color, so it tracks whichever high-contrast theme the user has chosen.
 */
export const LIST_ITEM_KEYBOARD_FOCUS_RING =
  'tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset ' +
  'tw:forced-colors:data-selected:outline-2 ' +
  'tw:forced-colors:data-selected:outline-[color:Highlight] ' +
  'tw:forced-colors:data-selected:-outline-offset-2';
