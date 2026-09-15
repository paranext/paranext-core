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

/**
 * Which input device the user most recently used, tracked document-wide.
 *
 * Radix hands focus back to a trigger when the menu or popover it opened closes (`onCloseAutoFocus`
 * / `onUnmountAutoFocus`). That fires a real `focus` event with the pointer nowhere near the
 * control, so a focus listener alone cannot tell "the user tabbed here" from "a menu just closed".
 * The distinction is the input device, not the element, so it is tracked once for the document
 * rather than per component: a listener on any one element misses the keys and clicks that land
 * elsewhere, including the Escape that Radix consumes from its own document listener.
 *
 * Starts as keyboard so a control focused before any input at all is still treated as a keyboard
 * arrival.
 */
let lastInteractionModality: 'keyboard' | 'pointer' = 'keyboard';
let isModalityTrackerRegistered = false;

/**
 * Starts tracking {@link getLastInteractionModality}. Safe to call from every consumer on every
 * render — it registers one pair of document listeners the first time and does nothing afterwards.
 */
export function trackInteractionModality() {
  if (isModalityTrackerRegistered || typeof document === 'undefined') return;
  isModalityTrackerRegistered = true;
  // Capture phase, so the modality is already correct by the time any focus handler runs.
  document.addEventListener(
    'pointerdown',
    () => {
      lastInteractionModality = 'pointer';
    },
    true,
  );
  document.addEventListener(
    'keydown',
    () => {
      lastInteractionModality = 'keyboard';
    },
    true,
  );
}

/** Reads the device behind the user's most recent interaction. See {@link trackInteractionModality}. */
export function getLastInteractionModality() {
  return lastInteractionModality;
}

/** Marks a trigger whose focus was restored by a pointer close, so its focus ring stays hidden. */
export const QUIET_FOCUS_ATTRIBUTE = 'data-quiet-focus';

/**
 * Hides the focus indicator on a trigger that a pointer-driven close just refocused. Undo with
 * {@link showFocusRing}.
 *
 * Sets {@link QUIET_FOCUS_ATTRIBUTE}, which {@link QUIET_FOCUS_RING_SUPPRESSION} keys off for the
 * ring and the border, and additionally clears `outline` inline. The inline part is not belt and
 * braces: Tailwind emits its utilities inside `@layer utilities`, and an **unlayered** rule in the
 * host document beats every layered rule whatever its specificity. A web view that styles
 * `:focus-visible` itself — the scripture editor does — would therefore win against any class we
 * could add, so the outline has to be overridden where nothing but `!important` can reach it.
 */
export function hideFocusRing(element: HTMLElement | undefined) {
  if (!element) return;
  element.setAttribute(QUIET_FOCUS_ATTRIBUTE, '');
  element.style.outline = 'none';
}

/** Restores the focus indicator hidden by {@link hideFocusRing}, giving the ring back. */
export function showFocusRing(element: HTMLElement | undefined) {
  if (!element) return;
  element.removeAttribute(QUIET_FOCUS_ATTRIBUTE);
  element.style.removeProperty('outline');
}

/**
 * Tailwind classes that hide a trigger's focus ring while it carries {@link QUIET_FOCUS_ATTRIBUTE}.
 *
 * A menu closed with the pointer still hands focus back to its trigger, because the tab order
 * depends on it — but the ring would then sit on a control the pointer is nowhere near. Browsers
 * offer no way to ask for "focus without the indicator" that the app's own Chromium understands
 * (`FocusOptions.focusVisible` only lands in Chromium 145; Electron 39 bundles 142), so the ring is
 * suppressed in CSS instead. Consumers clear the attribute on the next keydown, which is what
 * brings the ring back for keyboard users.
 *
 * Focus is drawn through three separate channels, and all three have to go. The ring and the border
 * are the obvious two. The third is `outline`: a host document may set one on `:focus-visible` —
 * the scripture editor's web view does — and because `Button` carries `tw:transition-all`, the
 * outline animates rather than switching, so even a rule whose final state is `transparent` paints
 * a visible line on its way there. `outline-none` removes the style, so nothing paints at any point
 * in that animation.
 */
export const QUIET_FOCUS_RING_SUPPRESSION =
  'tw:data-quiet-focus:focus-visible:border-transparent ' +
  'tw:data-quiet-focus:focus-visible:ring-0 ' +
  'tw:data-quiet-focus:focus-visible:outline-none';
