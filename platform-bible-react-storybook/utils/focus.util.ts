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
