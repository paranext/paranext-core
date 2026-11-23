import { vi } from 'vitest';

/**
 * Jsdom environment patches shared by the Manage Books dialog's and book grid's tests. Extracted
 * because the two suites need the identical set and a verbatim second copy drifts: a fix applied to
 * one shim silently leaves the other suite on the old behavior.
 *
 * Call {@link installManageBooksJsdomShims} from `beforeAll` and the returned function from
 * `afterAll`. Everything patched here lives on a shared prototype or on `globalThis`, so leaving
 * any of it installed makes a LATER suite's failure look like it belongs to that suite.
 */
export function installManageBooksJsdomShims(): () => void {
  const originalScrollIntoView = Element.prototype.scrollIntoView;
  const originalQuerySelectorAll = Element.prototype.querySelectorAll;
  const originalMatchMedia: typeof window.matchMedia | undefined = window.matchMedia;
  const originalResizeObserver: typeof globalThis.ResizeObserver | undefined =
    globalThis.ResizeObserver;

  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // ResizeObserver constructor as a vi.fn factory satisfies the runtime contract but not
    // structural typing; we cast through unknown to adapt it to the required type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }

  // jsdom does not implement `window.matchMedia`; Sonner's Toaster (rendered inside the dialog) calls
  // it directly to pick its light/dark default. Precedent: notification-display.test.tsx.
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: undefined,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  // jsdom has no layout, so scrollIntoView is not implemented. Stub it so the grid's scroll-to-book
  // layout effect doesn't throw, and so tests can observe which element it was called on.
  Element.prototype.scrollIntoView = vi.fn();

  // BookGridSelector's column-measurement effect queries `:scope > li` on its `tw:grid` <ul>. jsdom's
  // nwsapi implements `:scope` by anchoring on the context element's class list, which chokes on
  // Tailwind v4 colon classes (e.g. `tw:grid`) — parsing `:grid` as an unknown pseudo-class (same
  // workaround as semantic-domain-viewer.test.tsx's getRowButton/getLabelButton). That effect is
  // unrelated to what these suites assert, so patch the one selector rather than production code.
  Element.prototype.querySelectorAll = function scopedQuerySelectorAll<E extends Element>(
    selectors: string,
  ) {
    if (selectors === ':scope > li') {
      const lis = Array.from(this.children).filter((child) => child.tagName === 'LI');
      // Test-only shim: NodeList is not constructible directly, and every caller of this selector only
      // iterates or indexes the result, so an array stands in faithfully.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return lis as unknown as NodeListOf<E>;
    }
    // `Element.prototype.querySelectorAll` is a generic overload; `.call` widens the return to
    // NodeListOf<Element>, so it needs re-narrowing to the caller's element type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return originalQuerySelectorAll.call(this, selectors) as NodeListOf<E>;
  };

  return function uninstallManageBooksJsdomShims() {
    Element.prototype.scrollIntoView = originalScrollIntoView;
    Element.prototype.querySelectorAll = originalQuerySelectorAll;
    if (originalMatchMedia) window.matchMedia = originalMatchMedia;
    else Reflect.deleteProperty(window, 'matchMedia');
    if (originalResizeObserver) globalThis.ResizeObserver = originalResizeObserver;
    else Reflect.deleteProperty(globalThis, 'ResizeObserver');
  };
}

/**
 * Which elements `Element.prototype.scrollIntoView` was called on, in order.
 *
 * The spy is prototype-wide, so `toHaveBeenCalled()` cannot distinguish "scrolled the right pill"
 * from "scrolled the first pill", "scrolled the wrong pill" or "scrolled a container" — every one
 * of those satisfies it. `mock.contexts` records the receiver, which is the only thing that
 * separates them.
 */
export const scrolledElements = () => vi.mocked(Element.prototype.scrollIntoView).mock.contexts;
