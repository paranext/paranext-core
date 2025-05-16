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
  [tabindex]:not([tabindex="-1"]),
  [contenteditable]
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
 * @returns An array of focusable elements.
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden') && isVisible(el),
  );
}

/**
 * Gets the current table section where the row is located.
 *
 * The section is determined by the parent element of the row. If the parent element is a `<thead>`,
 * `<tbody>`, or `<tfoot>`, the corresponding tag name is returned. Otherwise, `null` is returned.
 *
 * This utility can be used to determine whether a row is in the table header, body, or footer.
 *
 * @param rowRef A reference to the table row.
 * @returns The current section of the table row, or `null`.
 */
export function getCurrentTableSection(currentRow: HTMLTableRowElement) {
  return currentRow?.parentElement?.tagName.toLowerCase();
}
