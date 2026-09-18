import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_ZOOM_FACTOR,
  MAX_ZOOM_FACTOR,
  MIN_ZOOM_FACTOR,
} from '@shared/models/content-zoom.model';
import { adjustZoomFactor } from '@shared/utils/content-zoom.util';
import { getContentZoomStyleElement } from './web-view-content-zoom.bootstrap-script';
import { install } from './web-view-content-zoom.bootstrap-script.test-utils';

const TWO_AREAS =
  '<div id="toolbar">bar</div>' +
  '<div data-platform-content-zoom-root id="main"><p id="verse" tabindex="0">text</p></div>' +
  '<div data-platform-content-zoom-root="footnotes" id="foot"><p id="note" tabindex="0">note</p></div>';

function key(init: KeyboardEventInit, target: EventTarget = window): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
  target.dispatchEvent(event);
  return event;
}

/**
 * Dispatches a wheel event, optionally carrying the non-standard `wheelDeltaY` Chromium sets on
 * every one of them (120 per mouse notch, sign opposite to `deltaY`). Jsdom implements no such
 * property, so a test that exercises the tick path has to put it on the event itself; a test that
 * omits it exercises the pixel fallback instead.
 */
function wheel(
  init: WheelEventInit & { wheelDeltaY?: number },
  target: EventTarget = window,
): WheelEvent {
  const { wheelDeltaY, ...eventInit } = init;
  const event = new WheelEvent('wheel', { bubbles: true, cancelable: true, ...eventInit });
  if (wheelDeltaY !== undefined)
    Object.defineProperty(event, 'wheelDeltaY', { value: wheelDeltaY });
  target.dispatchEvent(event);
  return event;
}

/**
 * Presses or releases a modifier key physically, which is the only thing that tells a real
 * Ctrl/⌘+wheel from the ctrl+wheel Chromium synthesizes for a trackpad pinch.
 */
function modifierKey(type: 'keydown' | 'keyup', physicalKey: 'Control' | 'Meta'): void {
  window.dispatchEvent(
    new KeyboardEvent(type, {
      bubbles: true,
      key: physicalKey,
      ctrlKey: physicalKey === 'Control',
      metaKey: physicalKey === 'Meta',
    }),
  );
}

/**
 * Settles past the mutation observer's refresh, which the bootstrap runs directly off the
 * observer's own microtask callback (no `requestAnimationFrame` involved) — two frames is a
 * generous upper bound that also has margin for a slow CI worker.
 *
 * This helper and {@link oneFrame} await jsdom's real `requestAnimationFrame`, so a test that puts
 * this file on full fake timers (which fake `requestAnimationFrame` too) would hang on them; the
 * indicator-timer tests below fake only what they name and never await a frame.
 */
async function nextFrame(): Promise<void> {
  await new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve(undefined)));
  });
}

/**
 * Exactly one animation frame — the boundary the wheel handler coalesces on, so a test can tell
 * "once per frame" from "once in the end". A callback the bootstrap scheduled from the task that
 * dispatched the notches was registered before this one, so it has already run when this resolves.
 */
async function oneFrame(): Promise<void> {
  await new Promise((resolve) => {
    requestAnimationFrame(() => resolve(undefined));
  });
}

function byId(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (!element) throw new Error(`missing #${id}`);
  return element;
}

/**
 * Collapses whitespace and drops an insignificant trailing `;` before `}` so a CSSOM
 * re-serialization difference (jsdom reformats spacing around `:`/`,` and adds a trailing `;` to
 * the last declaration when it echoes back an inserted rule's `cssText`) cannot fail the pinning
 * check below — the two sides are compared normalized rather than byte-for-byte.
 */
function normalizeCssRuleText(cssText: string): string {
  return cssText.replace(/\s+/g, '').replace(/;}/g, '}');
}

type ListenerRegistration = [
  type: string,
  listener: unknown,
  options?: boolean | AddEventListenerOptions,
];

/**
 * A listener comes off a target only when the event type, the listener function AND the capture
 * flag all match the registration; a removal that disagrees on any of the three is a silent no-op
 * that leaves the listener attached. Returns the `[type, capture]` pairs that were added and never
 * removed that way.
 */
function listenersLeftAttached(
  added: ListenerRegistration[],
  removed: ListenerRegistration[],
): [string, boolean][] {
  const isCapture = (options?: boolean | AddEventListenerOptions): boolean =>
    options === true || (typeof options === 'object' && options.capture === true);
  return added
    .filter(
      ([type, listener, options]) =>
        !removed.some(
          ([removedType, removedListener, removedOptions]) =>
            removedType === type &&
            removedListener === listener &&
            isCapture(removedOptions) === isCapture(options),
        ),
    )
    .map(([type, , options]) => [type, isCapture(options)]);
}

/**
 * Jsdom has no real `window.matchMedia`; stub it so `(prefers-reduced-motion: reduce)` resolves as
 * given.
 */
function stubMatchMedia(reducedMotion: boolean): void {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? reducedMotion : false,
    media: query,
    onchange: undefined,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe('content-zoom bootstrap script', () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Unwinds the bootstrap this test installed: without it the mutation observer it started
    // outlives the test environment and fires against a torn-down `document`.
    // eslint-disable-next-line no-underscore-dangle
    window.__platformContentZoom?.destroy();
    window.matchMedia = originalMatchMedia;
    vi.useRealTimers();
  });

  it('acts through the bound helpers on the area that has focus, with its own web view id, and consumes the key', () => {
    const { bound } = install('wv-1', TWO_AREAS);
    byId('verse').focus();
    expect(key({ key: '=', ctrlKey: true }).defaultPrevented).toBe(true);
    expect(key({ key: '+', ctrlKey: true }).defaultPrevented).toBe(true);
    expect(key({ key: '-', ctrlKey: true }).defaultPrevented).toBe(true);
    byId('note').focus();
    expect(key({ key: '0', ctrlKey: true }).defaultPrevented).toBe(true);
    expect(key({ key: '0', code: 'Numpad0', ctrlKey: true }).defaultPrevented).toBe(true);
    expect(bound.adjustContentZoomById.mock.calls).toEqual([
      ['wv-1', 1, 'main'],
      ['wv-1', 1, 'main'],
      ['wv-1', -1, 'main'],
    ]);
    expect(bound.resetContentZoomById.mock.calls).toEqual([
      ['wv-1', 'footnotes'],
      ['wv-1', 'footnotes'],
    ]);
  });

  it('falls back to the commands when no helper is bound', () => {
    const { papi } = install('wv-1b', TWO_AREAS, {
      adjustContentZoomById: undefined,
      resetContentZoomById: undefined,
    });
    byId('note').focus();
    key({ key: '=', ctrlKey: true });
    key({ key: '0', ctrlKey: true });
    expect(papi.commands.sendCommand.mock.calls).toEqual([
      ['platform.webViewContentZoomIn', 'wv-1b', 'footnotes'],
      ['platform.webViewContentZoomReset', 'wv-1b', 'footnotes'],
    ]);
  });

  it('with focus outside every area targets the active area: the first area, then the one last clicked or focused', () => {
    const { bound } = install('wv-2', TWO_AREAS);
    byId('toolbar').dispatchEvent(new Event('focusin', { bubbles: true }));
    key({ key: '=', ctrlKey: true });
    expect(bound.adjustContentZoomById).toHaveBeenLastCalledWith('wv-2', 1, 'main');
    // jsdom in this environment has no PointerEvent constructor; the listener only reads
    // `event.target`, so a plain MouseEvent of the same type exercises it identically.
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    expect(bound.reportContentZoomActiveAreaById).toHaveBeenLastCalledWith('wv-2', 'footnotes');
    key({ key: '=', ctrlKey: true });
    expect(bound.adjustContentZoomById).toHaveBeenLastCalledWith('wv-2', 1, 'footnotes');
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    const api = window.__platformContentZoom;
    expect(api?.activeArea).toBe('footnotes');
  });

  it('keeps the clicked area active when the click itself moves focus into another area', () => {
    const { bound } = install('wv-click-wins', TWO_AREAS);
    // The gesture a click on a footnote row is: the pointer goes down in the footnotes area, and the
    // view answers the click by putting the caret back in the editor text (`selectNote`), so focus
    // lands in `main` milliseconds later. The pointer says which area the user means.
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    byId('verse').dispatchEvent(new Event('focusin', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');
    expect(bound.reportContentZoomActiveAreaById).toHaveBeenLastCalledWith(
      'wv-click-wins',
      'footnotes',
    );
    key({ key: '0', ctrlKey: true }, byId('toolbar'));
    expect(bound.resetContentZoomById).toHaveBeenLastCalledWith('wv-click-wins', 'footnotes');
  });

  it('follows a focus change no pointer gesture is behind, so the keyboard can pick the area', () => {
    const { bound } = install('wv-keyboard-focus', TWO_AREAS);
    byId('note').dispatchEvent(new Event('focusin', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');
    expect(bound.reportContentZoomActiveAreaById).toHaveBeenLastCalledWith(
      'wv-keyboard-focus',
      'footnotes',
    );
  });

  it('follows a focus change that comes long after the last click', () => {
    // Only the monotonic clock the gesture window is measured with is faked: the bootstrap's own
    // timers, the mutation observer and rAF keep running for real, so nothing but the age of the
    // last pointer gesture changes.
    vi.useFakeTimers({ toFake: ['performance'] });
    const { bound } = install('wv-late-focus', TWO_AREAS);
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');
    vi.advanceTimersByTime(5_000);
    byId('verse').dispatchEvent(new Event('focusin', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('main');
    expect(bound.reportContentZoomActiveAreaById).toHaveBeenLastCalledWith('wv-late-focus', 'main');
  });

  it('a focus change inside the clicked area does not spend the gesture', () => {
    vi.useFakeTimers({ toFake: ['performance'] });
    const { bound } = install('wv-inside-area', TWO_AREAS);
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');

    // A focus change that lands inside the SAME area the pointer went down in (the footnote row
    // itself, milliseconds after the pointerdown on its caller) is not the click's own focus
    // change into another area, so it must not spend the gesture.
    vi.advanceTimersByTime(4);
    byId('note').dispatchEvent(new Event('focusin', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');

    // The gesture is still live: the next focus change, into a different area, is the one it
    // protects.
    vi.advanceTimersByTime(14);
    byId('verse').dispatchEvent(new Event('focusin', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');
    expect(bound.reportContentZoomActiveAreaById).not.toHaveBeenLastCalledWith(
      'wv-inside-area',
      'main',
    );
  });

  it('a focus hop through an unmarked element keeps the gesture live', () => {
    vi.useFakeTimers({ toFake: ['performance'] });
    const { bound } = install('wv-hop', TWO_AREAS);
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');

    // A focus change that lands outside every area has no area of its own to protect, so it is
    // not suppressed - but nothing was spent either, since it is not the click's own move into
    // another area.
    vi.advanceTimersByTime(4);
    byId('toolbar').dispatchEvent(new Event('focusin', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');

    // The gesture is still live: the next focus change, into a different area, is the one it
    // protects.
    vi.advanceTimersByTime(14);
    byId('verse').dispatchEvent(new Event('focusin', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');
    expect(bound.reportContentZoomActiveAreaById).not.toHaveBeenLastCalledWith('wv-hop', 'main');
  });

  it('suppresses only the first focus change after a click, not every focus change within the gesture window', () => {
    vi.useFakeTimers({ toFake: ['performance'] });
    const { bound } = install('wv-one-shot', TWO_AREAS);
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');

    vi.advanceTimersByTime(14);
    byId('verse').dispatchEvent(new Event('focusin', { bubbles: true }));
    // Still footnotes: the one focus change the click itself caused is suppressed.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');

    vi.advanceTimersByTime(150);
    byId('verse').dispatchEvent(new Event('focusin', { bubbles: true }));
    // A second focus change is accepted even though it still falls inside the gesture window: the
    // click has already spent its one suppression.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('main');
    expect(bound.reportContentZoomActiveAreaById).toHaveBeenLastCalledWith('wv-one-shot', 'main');
  });

  it('does not arm the gesture window for a click outside every area', () => {
    const { bound } = install('wv-outside-click', TWO_AREAS);
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');

    byId('toolbar').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    byId('verse').dispatchEvent(new Event('focusin', { bubbles: true }));
    // The click landed on no area at all, so it never armed a suppression window: the very next
    // focus change is accepted immediately.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('main');
    expect(bound.reportContentZoomActiveAreaById).toHaveBeenLastCalledWith(
      'wv-outside-click',
      'main',
    );
  });

  it('lets the focus a Tab moves pick the area, because the user asked for that move', () => {
    const { bound } = install('wv-tab', TWO_AREAS);
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');

    // A Tab is a deliberate focus move, so the focus change that follows it is the user's, not the
    // view's answer to the click.
    key({ key: 'Tab' });
    byId('verse').dispatchEvent(new Event('focusin', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('main');
    expect(bound.reportContentZoomActiveAreaById).toHaveBeenLastCalledWith('wv-tab', 'main');
  });

  it('does not let a zoom chord pressed after a click spend the click’s protection', () => {
    const { bound } = install('wv-chord-after-click', TWO_AREAS);
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    // Only a Tab counts: any other key — a chord pressed inside the gesture window above all —
    // would otherwise hand the click's own answering refocus the area the user just left.
    key({ key: '=', ctrlKey: true });
    byId('verse').dispatchEvent(new Event('focusin', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');
    expect(bound.reportContentZoomActiveAreaById).not.toHaveBeenLastCalledWith(
      'wv-chord-after-click',
      'main',
    );
  });

  it('leaves the active area alone when a Tab’s focus lands back inside the clicked area', () => {
    const { bound } = install('wv-tab-inside', TWO_AREAS);
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    bound.reportContentZoomActiveAreaById.mockClear();

    key({ key: 'Tab' });
    byId('note').dispatchEvent(new Event('focusin', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');
    expect(bound.reportContentZoomActiveAreaById).not.toHaveBeenCalled();
  });

  it('lets a right-click make its area active but arms no suppression window', () => {
    const { bound } = install('wv-right-click', TWO_AREAS);
    // A right-click opens a context menu; it says which area the user is pointing at, but it moves
    // no caret, so it has no focus change of its own to protect.
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true, button: 2 }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');

    byId('verse').dispatchEvent(new Event('focusin', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('main');
    expect(bound.reportContentZoomActiveAreaById).toHaveBeenLastCalledWith(
      'wv-right-click',
      'main',
    );
  });

  it('refuses to make an area the pane never reported the active one', async () => {
    const html =
      '<div id="toolbar">bar</div>' +
      '<div data-platform-content-zoom-root id="main">' +
      '<div data-platform-content-zoom-root="footnotes" id="nested"><p id="note">note</p></div>' +
      '</div>' +
      '<div data-platform-content-zoom-root="Bad Id!" id="malformed"><p id="bad">bad</p></div>';
    const { bound } = install('wv-unreported', html);
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-unreported', ['main']);

    // Both markers resolve to an area id the pane rejected: one nested inside another area, one
    // ill-formed. Neither may displace the area the pane did report.
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    byId('bad').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('main');
    expect(key({ key: '=', ctrlKey: true }).defaultPrevented).toBe(true);
    expect(bound.adjustContentZoomById).toHaveBeenLastCalledWith('wv-unreported', 1, 'main');
  });

  it('accepts the meta key as the modifier, takes Shift for every action, and ignores Alt and plain keys', () => {
    const { bound } = install('wv-3', TWO_AREAS);
    expect(key({ key: '=', metaKey: true }).defaultPrevented).toBe(true);
    // `+` is Shift+`=` on US/UK layouts, and on AZERTY and Czech layouts the top-row `0` and `-`
    // are shifted too, so every action takes Shift or reset is out of reach on those layouts.
    expect(key({ key: '=', ctrlKey: true, shiftKey: true }).defaultPrevented).toBe(true);
    expect(key({ key: '+', ctrlKey: true, shiftKey: true }).defaultPrevented).toBe(true);
    expect(key({ key: '-', ctrlKey: true, shiftKey: true }).defaultPrevented).toBe(true);
    expect(key({ key: '0', ctrlKey: true, shiftKey: true }).defaultPrevented).toBe(true);
    expect(key({ key: '=', ctrlKey: true, altKey: true }).defaultPrevented).toBe(false);
    expect(key({ key: '-', ctrlKey: true, altKey: true }).defaultPrevented).toBe(false);
    expect(key({ key: '=' }).defaultPrevented).toBe(false);
    expect(bound.adjustContentZoomById.mock.calls).toEqual([
      ['wv-3', 1, 'main'],
      ['wv-3', 1, 'main'],
      ['wv-3', 1, 'main'],
      ['wv-3', -1, 'main'],
    ]);
    expect(bound.resetContentZoomById).toHaveBeenCalledWith('wv-3', 'main');
  });

  it('leaves keys and wheel alone in a view without areas and reports an empty list', async () => {
    const { bound } = install('wv-4', '<div>text</div>');
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenCalledWith('wv-4', []);
    expect(key({ key: '=', ctrlKey: true }).defaultPrevented).toBe(false);
    expect(wheel({ deltaY: -100, ctrlKey: true }).defaultPrevented).toBe(false);
    expect(bound.adjustContentZoomById).not.toHaveBeenCalled();
  });

  it('maps Ctrl+wheel to the area under the pointer (up = in, down = out), consuming the gesture; plain wheel passes; outside every area → active area', async () => {
    const { bound } = install('wv-5', TWO_AREAS);
    // A notch per frame, so each one is its own write: notches inside one frame are coalesced.
    expect(wheel({ deltaY: -100, ctrlKey: true }, byId('note')).defaultPrevented).toBe(true);
    await oneFrame();
    expect(wheel({ deltaY: 100, ctrlKey: true }, byId('verse')).defaultPrevented).toBe(true);
    await oneFrame();
    expect(wheel({ deltaY: 100 }, byId('verse')).defaultPrevented).toBe(false);
    expect(wheel({ deltaY: -100, ctrlKey: true }, byId('toolbar')).defaultPrevented).toBe(true);
    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([
      ['wv-5', 1, 'footnotes'],
      ['wv-5', -1, 'main'],
      ['wv-5', 1, 'main'],
    ]);
  });

  it('takes one wheel notch as one zoom step on a Windows mouse, whose notch is 100 px', async () => {
    const { bound } = install('wv-notch-windows', TWO_AREAS);
    for (let i = 0; i < 10; i += 1) {
      expect(
        wheel({ deltaY: -100, ctrlKey: true, wheelDeltaY: 120 }, byId('verse')).defaultPrevented,
      ).toBe(true);
    }
    // The notches of one frame travel as a single write carrying the steps they add up to, so what
    // the tick count buys is read off that one call rather than off a call per notch.
    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-notch-windows', 10, 'main']]);
  });

  it('takes one wheel notch as one zoom step on a macOS mouse, whose notch is a few pixels, however long the pause between notches', async () => {
    const { bound } = install('wv-notch-macos', TWO_AREAS);
    let now = 1000;
    const nowSpy = vi.spyOn(performance, 'now').mockImplementation(() => now);
    // A notch this small is also the size of one frame of a trackpad pinch, so it is the modifier
    // key being physically down that tells the platform which of the two this is.
    modifierKey('keydown', 'Control');
    try {
      for (let i = 0; i < 10; i += 1) {
        now += 1000;
        wheel({ deltaY: -4, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
      }
      await oneFrame();
      expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-notch-macos', 10, 'main']]);
    } finally {
      modifierKey('keyup', 'Control');
      nowSpy.mockRestore();
    }
  });

  it('takes a macOS notch as a notch while Ctrl is held with the focus outside this iframe', async () => {
    const { bound } = install('wv-notch-unfocused', TWO_AREAS);
    // The bootstrap runs inside the web view's iframe, so keydown only reaches it while that iframe
    // has focus — but a wheel is delivered by hit test, so Ctrl held while the focus sits in another
    // pane arrives here with no key event ever seen. A pointer event carries the real physical state
    // in its own `ctrlKey`, and Chromium synthesizes no pointer events for a pinch (a pinch moves no
    // cursor), so the last thing the pointer saw stands in for the keydown that never came.
    byId('verse').dispatchEvent(new MouseEvent('pointermove', { bubbles: true, ctrlKey: true }));
    for (let i = 0; i < 10; i += 1)
      wheel({ deltaY: -4, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-notch-unfocused', 10, 'main']]);
  });

  it('lets what the pointer saw go stale, so one modified pointer event cannot outlaw pinching for good', () => {
    const { bound } = install('wv-pinch-stale', TWO_AREAS);
    let now = 1000;
    const nowSpy = vi.spyOn(performance, 'now').mockImplementation(() => now);
    try {
      // Ctrl held while the mouse moved, then released while the focus is in another pane: no keyup
      // reaches this iframe, the window never blurred, and a pinch moves no cursor — so nothing can
      // ever correct this reading. Left standing it would send every later pinch down the notch
      // path at a step a frame, which is the runaway in reverse.
      byId('verse').dispatchEvent(new MouseEvent('pointermove', { bubbles: true, ctrlKey: true }));
      now += 30000;
      for (let i = 0; i < 20; i += 1) {
        now += 16;
        wheel({ deltaY: -2, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
      }
      expect(bound.adjustContentZoomById).toHaveBeenCalledTimes(4);
    } finally {
      nowSpy.mockRestore();
    }
  });

  it('lets a real keyup overrule what the pointer saw, without waiting for that to go stale', () => {
    const { bound } = install('wv-pinch-keyup', TWO_AREAS);
    // The key really was down, and the pointer saw it — but a keyup is the event that ends a key,
    // and it is fresher than any reading taken before it. A pinch moves no cursor, so waiting for
    // a pointer event to correct this would mean waiting out the whole trust window with pinching
    // switched off.
    modifierKey('keydown', 'Control');
    byId('verse').dispatchEvent(new MouseEvent('pointermove', { bubbles: true, ctrlKey: true }));
    modifierKey('keyup', 'Control');
    for (let i = 0; i < 20; i += 1)
      wheel({ deltaY: -2, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
    expect(bound.adjustContentZoomById).toHaveBeenCalledTimes(4);
  });

  it('never takes ⌘+wheel for a pinch, since a synthesized pinch always carries Ctrl', async () => {
    const { bound } = install('wv-notch-meta', TWO_AREAS);
    // Chromium synthesizes a pinch as ctrl+wheel on every platform, never as ⌘+wheel, so a small
    // ⌘-modified delta on a Mac is a mouse notch whatever the iframe has seen of the keyboard.
    for (let i = 0; i < 10; i += 1)
      wheel({ deltaY: -4, deltaX: 0, metaKey: true, wheelDeltaY: 120 }, byId('verse'));
    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-notch-meta', 10, 'main']]);
  });

  it('takes one wheel notch as one zoom step on a Linux mouse, whose notch is 120 px', async () => {
    const { bound } = install('wv-notch-linux', TWO_AREAS);
    for (let i = 0; i < 10; i += 1)
      wheel({ deltaY: -120, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-notch-linux', 10, 'main']]);
  });

  it('takes one wheel notch as one zoom step when the system scrolls one line at a time', async () => {
    const { bound } = install('wv-notch-one-line', TWO_AREAS);
    // Windows multiplies its lines-per-notch setting by 33 px; at a setting of one line a notch
    // carries a third of the pixels it usually does, and still exactly one tick.
    for (let i = 0; i < 10; i += 1)
      wheel({ deltaY: -33, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-notch-one-line', 10, 'main']]);
  });

  it('falls back to the pixel delta, carrying what is left of a tick, when the engine reports no wheelDeltaY', async () => {
    const { bound } = install('wv-notch-fallback', TWO_AREAS);
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    await oneFrame();
    expect(bound.adjustContentZoomById).toHaveBeenCalledTimes(1);
    // Two half-ticks are one step between them, not one each and not none at all, which is only
    // true if the fraction left over by the first is still there for the second.
    wheel({ deltaY: -50, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: -50, ctrlKey: true }, byId('verse'));
    await oneFrame();
    expect(bound.adjustContentZoomById).toHaveBeenCalledTimes(2);
    expect(bound.adjustContentZoomById).toHaveBeenLastCalledWith('wv-notch-fallback', 1, 'main');
  });

  it('keeps a part of a tick through a pause of any length', async () => {
    const { bound } = install('wv-notch-pause', TWO_AREAS);
    let now = 1000;
    const nowSpy = vi.spyOn(performance, 'now').mockImplementation(() => now);
    try {
      // Moving this spy is the whole of the pause — nothing else here stands for time passing —
      // and the tick path reads no clock of its own, so what this pins is that none is reintroduced.
      // Part of a tick is a position within one notch, not a gesture that can go stale: the wheel
      // has not moved since, so waiting does not put it back where it was.
      wheel({ deltaY: -40, ctrlKey: true, wheelDeltaY: 48 }, byId('verse'));
      await oneFrame();
      expect(bound.adjustContentZoomById).not.toHaveBeenCalled();
      now += 5000;
      wheel({ deltaY: -40, ctrlKey: true, wheelDeltaY: 48 }, byId('verse'));
      await oneFrame();
      expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-notch-pause', 1, 'main']]);
    } finally {
      nowSpy.mockRestore();
    }
  });

  it('starts a new count when the wheel direction reverses', async () => {
    const { bound } = install('wv-notch-reverse', TWO_AREAS);
    // Four tenths of a tick banked one way must not have to be unwound before the other way steps.
    wheel({ deltaY: -40, ctrlKey: true, wheelDeltaY: 48 }, byId('verse'));
    await oneFrame();
    expect(bound.adjustContentZoomById).not.toHaveBeenCalled();
    wheel({ deltaY: 60, ctrlKey: true, wheelDeltaY: -72 }, byId('verse'));
    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-notch-reverse', -1, 'main']]);
  });

  it('cannot step past the width of the zoom range on one outsized delta', async () => {
    const { bound } = install('wv-notch-cap', TWO_AREAS);
    // Thirty ticks in one event is more than 0.5 → 3.0 in steps of 0.1 holds; the rest would be
    // steps asked of a parent that can move nothing.
    wheel({ deltaY: -3000, ctrlKey: true, wheelDeltaY: 3600 }, byId('verse'));
    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-notch-cap', 25, 'main']]);
  });

  it('caps what one frame of notches asks for, not just what one event does', async () => {
    const { bound } = install('wv-notch-cap-frame', TWO_AREAS);
    await nextFrame();
    // Thirty one-tick notches inside one frame: each is far under the cap on its own, so this is
    // the cap holding the frame's total rather than any single event.
    for (let index = 0; index < 30; index += 1) {
      wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    }

    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-notch-cap-frame', 25, 'main']]);
  });

  it('takes a line-mode wheel event as one step, since a tick count means nothing there', () => {
    const { bound } = install('wv-notch-line-mode', TWO_AREAS);
    // `deltaMode` 1 is lines: a handful of them, never 120 of anything.
    expect(wheel({ deltaY: -3, deltaMode: 1, ctrlKey: true }, byId('verse')).defaultPrevented).toBe(
      true,
    );
    expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-notch-line-mode', 1, 'main']]);
  });

  it('takes a trackpad pinch as travel through the zoom scale, not one step per event', () => {
    const { bound } = install('wv-pinch', TWO_AREAS);
    // Chromium synthesizes a two-finger pinch as ctrl+wheel with no key down, no horizontal
    // component, a tick of exactly ±1 and `deltaY = -100·ln(scale)` — a couple of pixels per frame
    // at 60 Hz. Twenty of them are a scale of about 1.49, which is four 10 % steps, not twenty.
    for (let i = 0; i < 20; i += 1) {
      expect(
        wheel({ deltaY: -2, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'))
          .defaultPrevented,
      ).toBe(true);
    }
    expect(bound.adjustContentZoomById.mock.calls).toEqual(
      Array.from({ length: 4 }, () => ['wv-pinch', 1, 'main']),
    );
  });

  it('starts a pinch’s travel over again when the gesture reverses', () => {
    const { bound } = install('wv-pinch-reverse', TWO_AREAS);
    for (let i = 0; i < 4; i += 1) {
      wheel({ deltaY: -2, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
    }
    expect(bound.adjustContentZoomById).not.toHaveBeenCalled();
    // The travel already banked in the other direction must not have to be unwound first.
    for (let i = 0; i < 10; i += 1) {
      wheel({ deltaY: 2, deltaX: 0, ctrlKey: true, wheelDeltaY: -120 }, byId('verse'));
    }
    expect(bound.adjustContentZoomById.mock.calls).toEqual([
      ['wv-pinch-reverse', -1, 'main'],
      ['wv-pinch-reverse', -1, 'main'],
    ]);
  });

  it('keeps reading a pinch as a pinch once its frames outgrow the scale window, and lets go when they stop', async () => {
    const { bound } = install('wv-pinch-brisk', TWO_AREAS);
    let now = 1000;
    const nowSpy = vi.spyOn(performance, 'now').mockImplementation(() => now);
    try {
      // A pinch accelerates, and Chromium clamps nothing: one that doubles in about a fifth of a
      // second carries ≈6 px a frame, which is wider than any window a single frame can be judged
      // by without swallowing a macOS mouse notch too. So the first, slow frame is what the size
      // test catches, and the gesture carries the brisk ones that follow.
      wheel({ deltaY: -2, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
      for (let i = 0; i < 20; i += 1) {
        now += 16;
        wheel({ deltaY: -6, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
      }
      // 122 px of travel at 9.53 px a step — not the one step per frame the tick path would give,
      // which is the runaway this whole branch exists to avoid.
      expect(bound.adjustContentZoomById).toHaveBeenCalledTimes(12);

      // What carries the gesture is the frames still coming, not a mode the first one switched on:
      // once they stop, the very same event is a mouse notch again.
      now += 500;
      wheel({ deltaY: -6, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
      // A notch's step is applied a frame later, unlike a pinch frame's, which is what the twelve
      // calls above are.
      await oneFrame();
      expect(bound.adjustContentZoomById).toHaveBeenCalledTimes(13);
    } finally {
      nowSpy.mockRestore();
    }
  });

  it('does not let a pinch in one area carry a notch in another', async () => {
    const { bound } = install('wv-pinch-other-area', TWO_AREAS);
    let now = 1000;
    const nowSpy = vi.spyOn(performance, 'now').mockImplementation(() => now);
    try {
      // A pinch running over the main area says nothing about a gesture over the footnotes area:
      // however close behind it arrives, that one is a gesture of its own and starts on its own
      // evidence.
      for (let i = 0; i < 4; i += 1) {
        now += 16;
        wheel({ deltaY: -2, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
      }
      now += 16;
      wheel({ deltaY: -6, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('note'));
      await oneFrame();
      expect(bound.adjustContentZoomById.mock.calls).toEqual([
        ['wv-pinch-other-area', 1, 'footnotes'],
      ]);
    } finally {
      nowSpy.mockRestore();
    }
  });

  it('takes a brisk frame with no pinch running before it as a wheel notch', async () => {
    const { bound } = install('wv-pinch-cold', TWO_AREAS);
    // 6 px is outside the window one frame is judged by on its own, and no gesture is underway to
    // carry it, so this is a notch rather than the opening frame of a pinch.
    wheel({ deltaY: -6, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-pinch-cold', 1, 'main']]);
  });

  it('takes the very same events as wheel notches while a modifier key is physically held', async () => {
    const { bound } = install('wv-pinch-key', TWO_AREAS);
    modifierKey('keydown', 'Control');
    try {
      for (let i = 0; i < 20; i += 1) {
        wheel({ deltaY: -2, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
      }
      // One tick each down the notch path, coalesced into the frame's single write — a pinch would
      // have made four steps of the same twenty events.
      await oneFrame();
      expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-pinch-key', 20, 'main']]);
    } finally {
      modifierKey('keyup', 'Control');
    }
    // Releasing the key hands the same burst back to the pinch path, so the flag is really the
    // key's state rather than a latch the first keydown set for good.
    for (let i = 0; i < 20; i += 1) {
      wheel({ deltaY: -2, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
    }
    // Four pinch steps on top of the one coalesced notch write.
    expect(bound.adjustContentZoomById).toHaveBeenCalledTimes(5);
  });

  it('forgets a modifier key the window was holding when it lost focus', () => {
    const { bound } = install('wv-pinch-blur', TWO_AREAS);
    // The keyup for a key held while focus moves away is delivered to somebody else, so a flag
    // left set here would send every later pinch down the notch path for the life of the pane.
    modifierKey('keydown', 'Control');
    window.dispatchEvent(new Event('blur'));
    for (let i = 0; i < 20; i += 1) {
      wheel({ deltaY: -2, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
    }
    expect(bound.adjustContentZoomById).toHaveBeenCalledTimes(4);
  });

  it('cancels every modified wheel over a zoom area, including one too small to step', () => {
    const { bound } = install('wv-sub-threshold', TWO_AREAS);
    // Chromium stops honouring preventDefault for the rest of a gesture whose first event was not
    // cancelled, so the events an accumulator swallows have to be cancelled all the same.
    expect(
      wheel({ deltaY: -2, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'))
        .defaultPrevented,
    ).toBe(true);
    expect(bound.adjustContentZoomById).not.toHaveBeenCalled();
    // Positive control: the same event without the modifier is left alone, so the cancellation
    // above is this handler's doing.
    expect(wheel({ deltaY: -2, deltaX: 0, wheelDeltaY: 120 }, byId('verse')).defaultPrevented).toBe(
      false,
    );
  });

  it('leaves Ctrl+Shift+wheel and Ctrl+Alt+wheel untouched, matching the chords’ modifier rule', async () => {
    const { bound } = install('wv-5b', TWO_AREAS);
    expect(
      wheel({ deltaY: -100, ctrlKey: true, shiftKey: true }, byId('verse')).defaultPrevented,
    ).toBe(false);
    expect(
      wheel({ deltaY: -100, ctrlKey: true, altKey: true }, byId('verse')).defaultPrevented,
    ).toBe(false);
    await oneFrame();
    expect(bound.adjustContentZoomById).not.toHaveBeenCalled();
    // Positive control: the same gesture without the extra modifier is taken.
    expect(wheel({ deltaY: -100, ctrlKey: true }, byId('verse')).defaultPrevented).toBe(true);
    await oneFrame();
    expect(bound.adjustContentZoomById).toHaveBeenCalledWith('wv-5b', 1, 'main');
  });

  it('keeps the non-passive wheel listener off the window while the pane marks no zoom area', async () => {
    const added = vi.spyOn(window, 'addEventListener');
    const removed = vi.spyOn(window, 'removeEventListener');
    try {
      const { bound } = install('wv-wheel-gate', '<div id="toolbar">bar</div>');
      await nextFrame();
      const wheelRegistrations = () => added.mock.calls.filter(([type]) => type === 'wheel').length;
      // Positive control: the other root listeners are registered, so a zero above is the gate and
      // not a bootstrap that installed nothing.
      expect(added.mock.calls.some(([type]) => type === 'keydown')).toBe(true);
      expect(wheelRegistrations()).toBe(0);

      const area = document.createElement('div');
      area.id = 'late-area';
      area.setAttribute('data-platform-content-zoom-root', 'main');
      document.body.appendChild(area);
      await nextFrame();
      expect(wheelRegistrations()).toBe(1);
      expect(wheel({ deltaY: -100, ctrlKey: true }, area).defaultPrevented).toBe(true);
      await oneFrame();
      expect(bound.adjustContentZoomById).toHaveBeenCalledWith('wv-wheel-gate', 1, 'main');

      area.remove();
      await nextFrame();
      expect(removed.mock.calls.some(([type]) => type === 'wheel')).toBe(true);
      expect(wheel({ deltaY: -100, ctrlKey: true }).defaultPrevented).toBe(false);
    } finally {
      added.mockRestore();
      removed.mockRestore();
    }
  });

  it('is suppressed by an inner capture handler that stops propagation (Text Collection grid rule)', async () => {
    const { bound } = install('wv-6', TWO_AREAS);
    const inner = document.createElement('div');
    byId('main').appendChild(inner);
    inner.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        e.stopPropagation();
      },
      { capture: true },
    );
    inner.dispatchEvent(
      new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -100, ctrlKey: true }),
    );
    await oneFrame();
    expect(bound.adjustContentZoomById).not.toHaveBeenCalled();
  });

  it('reports the ordered area list, ignores nested markers, and adds a rule for a named area that appears later', async () => {
    const { bound } = install('wv-7', TWO_AREAS);
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-7', [
      'main',
      'footnotes',
    ]);
    const nested = document.createElement('div');
    nested.setAttribute('data-platform-content-zoom-root', 'inner');
    byId('main').appendChild(nested);
    const late = document.createElement('aside');
    late.setAttribute('data-platform-content-zoom-root', 'sidebar');
    document.body.appendChild(late);
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-7', [
      'main',
      'footnotes',
      'sidebar',
    ]);
    const sheet = document.querySelector<HTMLStyleElement>('#platform-content-zoom-styles')?.sheet;
    const rules = sheet ? Array.from(sheet.cssRules).map((rule) => rule.cssText) : [];
    expect(
      rules.some(
        (text) =>
          text.includes('"footnotes"') && text.includes('--platform-content-zoom-footnotes'),
      ),
    ).toBe(true);
    expect(
      rules.some(
        (text) => text.includes('"sidebar"') && text.includes('--platform-content-zoom-sidebar'),
      ),
    ).toBe(true);
    expect(rules.some((text) => text.includes('"inner"'))).toBe(false);
  });

  it('takes the marker React writes for a bare JSX prop as the main area', async () => {
    // Rendered through React rather than hand-written, so this also pins the serialization a view
    // gets from `<div data-platform-content-zoom-root />` — the way the published docs say to mark
    // the main area.
    const rendered = renderToStaticMarkup(
      createElement('div', { id: 'main', 'data-platform-content-zoom-root': true }, 'text'),
    );
    expect(rendered).toContain('data-platform-content-zoom-root="true"');
    const { bound } = install(
      'wv-react',
      `${rendered}<div data-platform-content-zoom-root="footnotes" id="foot">note</div>`,
    );
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-react', [
      'main',
      'footnotes',
    ]);
    const sheet = document.querySelector<HTMLStyleElement>('#platform-content-zoom-styles')?.sheet;
    const selectors = sheet
      ? Array.from(sheet.cssRules).flatMap((rule) =>
          rule instanceof CSSStyleRule ? [rule.selectorText] : [],
        )
      : [];
    // Positive control: the named area is matched, so a miss on the React-marked element below
    // would be the missing spelling rather than an empty sheet.
    expect(selectors.some((selector) => byId('foot').matches(selector))).toBe(true);
    expect(selectors.some((selector) => byId('main').matches(selector))).toBe(true);
  });

  it('does not rescan the document when a node with no zoom marker is added', async () => {
    install('wv-no-marker-mutation', TWO_AREAS);
    await nextFrame();
    const spy = vi.spyOn(document, 'querySelectorAll');
    const markerScanCount = () =>
      spy.mock.calls.filter(([selector]) => selector === '[data-platform-content-zoom-root]')
        .length;
    try {
      const before = markerScanCount();
      // The shape a keystroke has: the view moves unmarked content around inside an area.
      byId('main').appendChild(document.createElement('span'));
      await nextFrame();
      expect(markerScanCount() - before).toBe(0);
    } finally {
      spy.mockRestore();
    }
  });

  it('reports a new area when the marker arrives inside an added subtree', async () => {
    const { bound } = install('wv-marker-in-subtree', TWO_AREAS);
    await nextFrame();
    const wrapper = document.createElement('div');
    const inner = document.createElement('aside');
    inner.setAttribute('data-platform-content-zoom-root', 'sidebar');
    wrapper.appendChild(inner);
    document.body.appendChild(wrapper);
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-marker-in-subtree', [
      'main',
      'footnotes',
      'sidebar',
    ]);
  });

  it('drops an area when the element carrying its marker is removed', async () => {
    const { bound } = install('wv-marker-removed', TWO_AREAS);
    await nextFrame();
    byId('foot').remove();
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-marker-removed', [
      'main',
    ]);
  });

  it('still rescans when the marker attribute is set on an element that had none', async () => {
    const { bound } = install('wv-marker-attribute', TWO_AREAS);
    await nextFrame();
    byId('toolbar').setAttribute('data-platform-content-zoom-root', 'sidebar');
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-marker-attribute', [
      'sidebar',
      'main',
      'footnotes',
    ]);
  });

  it("writing the indicator's text does not re-scan the document for zoom areas", async () => {
    install('wv-indicator-no-scan', TWO_AREAS);
    await nextFrame();
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    const api = window.__platformContentZoom;
    if (!api) throw new Error('indicator api missing');
    const spy = vi.spyOn(document, 'querySelectorAll');
    const markerScanCount = () =>
      spy.mock.calls.filter(([selector]) => selector === '[data-platform-content-zoom-root]')
        .length;
    // A show scans once, in the frame it places the badge at its area's corner in; the count is
    // taken after that frame so it already includes that scan, and the delta below isolates only
    // what the observer's callback does once the write's mutation record reaches it.
    api.showIndicator('main', '120 %');
    await nextFrame();
    const afterShow = markerScanCount();
    await nextFrame();
    expect(markerScanCount() - afterShow).toBe(0);
    spy.mockRestore();
  });

  it('measures the badge corner once per animation frame, however many levels arrive in one task', async () => {
    // A show is the parent's answer to a zoom change, so a level arriving per call is the zoom
    // service calling back into the pane once it has written each one.
    install('wv-show-burst', TWO_AREAS);
    await nextFrame();
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    const api = window.__platformContentZoom;
    if (!api) throw new Error('indicator api missing');
    // The two reads that force style and layout when they run in the task that wrote the zoom.
    const rects = vi.spyOn(Element.prototype, 'getBoundingClientRect');
    const computedStyles = vi.spyOn(window, 'getComputedStyle');
    let percent = 100;
    for (let index = 0; index < 5; index += 1) {
      percent += 10;
      api.showIndicator('main', `${percent} %`);
    }
    // Positive control: the shows really did land, so the counts below say that placement was
    // deferred rather than that nothing happened at all.
    expect(byId('platform-content-zoom-indicator').textContent).toBe('150 %');
    expect(computedStyles).not.toHaveBeenCalled();
    expect(rects).not.toHaveBeenCalled();

    await oneFrame();
    // One placement for the whole run of shows: one direction read, and one rect for the single
    // element the target area has.
    expect(computedStyles).toHaveBeenCalledTimes(1);
    expect(rects).toHaveBeenCalledTimes(1);
    // And it places the badge for the level the run settled on.
    const badge = byId('platform-content-zoom-indicator');
    expect(badge.textContent).toBe('150 %');
    expect(badge.dataset.area).toBe('main');
    expect(badge.style.top).not.toBe('');
    rects.mockRestore();
    computedStyles.mockRestore();
  });

  it('applies one zoom change per animation frame, carrying the net steps of the notches in it', async () => {
    const { bound } = install('wv-wheel-burst', TWO_AREAS);
    await nextFrame();
    const notches = 5;
    for (let index = 0; index < notches; index += 1) {
      // Positive control: every notch is consumed as it arrives, so the absence of a write below
      // is the coalescing and not a gesture the handler never saw.
      expect(wheel({ deltaY: -100, ctrlKey: true }, byId('verse')).defaultPrevented).toBe(true);
    }
    // Writing the level restyles the whole pane and persists it, and only the level the gesture
    // has reached by the end of a frame is ever painted.
    expect(bound.adjustContentZoomById).not.toHaveBeenCalled();

    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-wheel-burst', notches, 'main']]);
  });

  it('hands each direction of a burst its own write, rather than netting across the turn', async () => {
    const { bound } = install('wv-wheel-net', TWO_AREAS);
    await nextFrame();
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: 100, ctrlKey: true }, byId('verse'));

    await oneFrame();
    // Three notches in travel as one write, and the turn back out as another: no notch is lost, the
    // levels in between are never written, and the pair steps and clamps exactly as four separate
    // notches would.
    expect(bound.adjustContentZoomById.mock.calls).toEqual([
      ['wv-wheel-net', 3, 'main'],
      ['wv-wheel-net', -1, 'main'],
    ]);
  });

  it('lands a coalesced burst on the level the same notches would reach one at a time, clamp included', async () => {
    // A stand-in for the parent: the zoom service steps its stored level with this same helper, so
    // where a net-step write lands can be compared with where single-step writes would.
    const start = MAX_ZOOM_FACTOR - 0.2;
    let factor = start;
    const adjustContentZoomById = vi.fn((_webViewId: string, deltaSteps: number) => {
      factor = adjustZoomFactor(factor, deltaSteps);
    });
    install('wv-wheel-level', TWO_AREAS, { adjustContentZoomById });
    await nextFrame();
    const notches = 5;
    let oneAtATime = start;
    for (let index = 0; index < notches; index += 1) oneAtATime = adjustZoomFactor(oneAtATime, 1);
    // The burst asks for more than the range allows, so the comparison below is the clamp's answer
    // and not just the arithmetic's.
    expect(oneAtATime).toBe(MAX_ZOOM_FACTOR);

    for (let index = 0; index < notches; index += 1) {
      wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    }
    await oneFrame();
    expect(adjustContentZoomById).toHaveBeenCalledTimes(1);
    expect(factor).toBe(oneAtATime);
  });

  it('lands a burst that reverses at a bound where the same notches would land one at a time', async () => {
    // At a bound the parent's clamp makes the arithmetic non-linear: travel the area cannot take is
    // absorbed rather than banked, so notches back the other way start from the bound. Netting a
    // frame that reverses would hand the reversal the absorbed travel instead.
    const start = MIN_ZOOM_FACTOR;
    let factor = start;
    const adjustContentZoomById = vi.fn((_webViewId: string, deltaSteps: number) => {
      factor = adjustZoomFactor(factor, deltaSteps);
    });
    install('wv-wheel-reverse-bound', TWO_AREAS, { adjustContentZoomById });
    await nextFrame();
    const oneAtATime = [-1, -1, 1, 1, 1].reduce(
      (level, deltaSteps) => adjustZoomFactor(level, deltaSteps),
      start,
    );
    // The two notches out are absorbed by the bound, so the three back in land three steps above it.
    expect(oneAtATime).toBe(adjustZoomFactor(start, 3));

    wheel({ deltaY: 100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: 100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));

    await oneFrame();
    // One write per run of notches in one direction, not one per notch and not one for the frame.
    expect(adjustContentZoomById.mock.calls.map((call) => call[1])).toEqual([-2, 3]);
    expect(factor).toBe(oneAtATime);
  });

  it('writes once in each animation frame a burst spans', async () => {
    const { bound } = install('wv-wheel-frames', TWO_AREAS);
    await nextFrame();
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    await oneFrame();
    wheel({ deltaY: 100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: 100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: 100, ctrlKey: true }, byId('verse'));
    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([
      ['wv-wheel-frames', 2, 'main'],
      ['wv-wheel-frames', -3, 'main'],
    ]);
  });

  it('hands over a pending notch before a line-mode event in the same frame acts', async () => {
    const { bound } = install('wv-wheel-line-order', TWO_AREAS);
    await nextFrame();
    wheel({ deltaY: 100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: -3, deltaMode: 1, ctrlKey: true }, byId('verse'));
    // Arrival order is the order the parent is asked to step in: its clamp is not commutative, so
    // two steps that arrive one way round can land on a different level from the other way round.
    expect(bound.adjustContentZoomById.mock.calls).toEqual([
      ['wv-wheel-line-order', -1, 'main'],
      ['wv-wheel-line-order', 1, 'main'],
    ]);

    await oneFrame();
    expect(bound.adjustContentZoomById).toHaveBeenCalledTimes(2);
  });

  it('hands over a pending notch before a pinch in the same frame steps', async () => {
    const { bound } = install('wv-wheel-pinch-order', TWO_AREAS);
    await nextFrame();
    wheel({ deltaY: 100, ctrlKey: true }, byId('verse'));
    // Five pinch frames are one step in; the notch above is a step out and arrived first.
    for (let index = 0; index < 5; index += 1) {
      wheel({ deltaY: -2, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
    }
    expect(bound.adjustContentZoomById.mock.calls).toEqual([
      ['wv-wheel-pinch-order', -1, 'main'],
      ['wv-wheel-pinch-order', 1, 'main'],
    ]);

    await oneFrame();
    expect(bound.adjustContentZoomById).toHaveBeenCalledTimes(2);
  });

  it('hands over the notches pending in a frame before a reset chord in it acts', async () => {
    // A stand-in for the parent: a reset writes the default outright, so whichever of the two
    // writes lands last decides the level the pane is left at.
    const writes: string[] = [];
    let factor = 1.5;
    const adjustContentZoomById = vi.fn((_webViewId: string, deltaSteps: number) => {
      writes.push('adjust');
      factor = adjustZoomFactor(factor, deltaSteps);
    });
    const resetContentZoomById = vi.fn(() => {
      writes.push('reset');
      factor = DEFAULT_ZOOM_FACTOR;
    });
    install('wv-chord-reset-order', TWO_AREAS, { adjustContentZoomById, resetContentZoomById });
    await nextFrame();
    byId('verse').focus();
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    expect(key({ key: '0', ctrlKey: true }).defaultPrevented).toBe(true);
    // The chord asked for the default and arrived last, so the banked notches go first and the
    // pane is left at the default instead of two steps above it.
    expect(writes).toEqual(['adjust', 'reset']);
    expect(factor).toBe(DEFAULT_ZOOM_FACTOR);

    await oneFrame();
    expect(writes).toEqual(['adjust', 'reset']);
    expect(factor).toBe(DEFAULT_ZOOM_FACTOR);
  });

  it('lands a chord after a burst at a bound where arrival order would land it', async () => {
    // At a bound the parent's clamp absorbs the travel the area cannot take, so a step in and a
    // step out do not commute: acting on the chord before the banked notches would hand the chord
    // the level the notches have not yet moved away from.
    const start = MAX_ZOOM_FACTOR;
    let factor = start;
    const adjustContentZoomById = vi.fn((_webViewId: string, deltaSteps: number) => {
      factor = adjustZoomFactor(factor, deltaSteps);
    });
    install('wv-chord-bound-order', TWO_AREAS, { adjustContentZoomById });
    await nextFrame();
    const oneAtATime = [-1, -1, -1, 1].reduce(
      (level, deltaSteps) => adjustZoomFactor(level, deltaSteps),
      start,
    );
    // The chord's step in is only worth a step because the notches out moved the area off the
    // bound first; taken at the bound it would be absorbed entirely.
    expect(oneAtATime).toBe(adjustZoomFactor(start, -2));

    byId('verse').focus();
    wheel({ deltaY: 100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: 100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: 100, ctrlKey: true }, byId('verse'));
    expect(key({ key: '=', ctrlKey: true }).defaultPrevented).toBe(true);
    expect(adjustContentZoomById.mock.calls.map((call) => call[1])).toEqual([-3, 1]);
    expect(factor).toBe(oneAtATime);

    await oneFrame();
    expect(adjustContentZoomById).toHaveBeenCalledTimes(2);
    expect(factor).toBe(oneAtATime);
  });

  it('applies the steps pending for one area before it accumulates for another', async () => {
    const { bound } = install('wv-wheel-areas', TWO_AREAS);
    await nextFrame();
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: -100, ctrlKey: true }, byId('note'));
    // The pointer crossing into another area inside one frame hands "main" its notch straight
    // away: one area's steps are never added to another's.
    expect(bound.adjustContentZoomById.mock.calls).toEqual([['wv-wheel-areas', 1, 'main']]);

    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([
      ['wv-wheel-areas', 1, 'main'],
      ['wv-wheel-areas', 1, 'footnotes'],
    ]);
  });

  it('sends the command once per step when no helper is bound, since the command carries no count', async () => {
    const { papi } = install('wv-wheel-fallback', TWO_AREAS, {
      adjustContentZoomById: undefined,
    });
    await nextFrame();
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));
    wheel({ deltaY: -100, ctrlKey: true }, byId('verse'));

    await oneFrame();
    expect(papi.commands.sendCommand.mock.calls).toEqual([
      ['platform.webViewContentZoomIn', 'wv-wheel-fallback', 'main'],
      ['platform.webViewContentZoomIn', 'wv-wheel-fallback', 'main'],
      ['platform.webViewContentZoomIn', 'wv-wheel-fallback', 'main'],
    ]);
  });

  it('drops a wheel burst it has not applied yet when it is destroyed', async () => {
    const { bound } = install('wv-wheel-destroyed', TWO_AREAS);
    await nextFrame();
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    const api = window.__platformContentZoom;
    if (!api) throw new Error('indicator api missing');
    // Positive control: the notches were consumed, so they were pending when destroy() ran.
    expect(wheel({ deltaY: -100, ctrlKey: true }, byId('verse')).defaultPrevented).toBe(true);
    expect(wheel({ deltaY: -100, ctrlKey: true }, byId('verse')).defaultPrevented).toBe(true);

    api.destroy();
    await nextFrame();
    expect(bound.adjustContentZoomById).not.toHaveBeenCalled();
  });

  it('still rescans when a marker changes in the same task as an indicator write', async () => {
    const { bound } = install('wv-indicator-rescan', TWO_AREAS);
    await nextFrame();
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    const api = window.__platformContentZoom;
    if (!api) throw new Error('indicator api missing');
    api.showIndicator('main', '120 %');
    const late = document.createElement('aside');
    late.setAttribute('data-platform-content-zoom-root', 'sidebar');
    document.body.appendChild(late);
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-indicator-rescan', [
      'main',
      'footnotes',
      'sidebar',
    ]);
  });

  it('retries a report the parent rejected, and keeps its listeners and api when the first report throws', async () => {
    let throwsLeft = 1;
    const reportContentZoomAreasById = vi.fn((_webViewId: string, reported: string[]) => {
      if (reported.length > 0 && throwsLeft > 0) {
        throwsLeft -= 1;
        throw new Error('parent refused the report');
      }
    });
    const { bound } = install('wv-retry', TWO_AREAS, { reportContentZoomAreasById });
    // The first scan threw on the way out to the parent; the view still has its api and its
    // listeners, so a later DOM change can carry the report across.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom).toBeDefined();

    // A mutation that leaves the area list identical still retries, because a report that threw was
    // never recorded as made.
    byId('toolbar').appendChild(document.createElement('span'));
    await nextFrame();
    expect(reportContentZoomAreasById).toHaveBeenCalledTimes(2);
    expect(reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-retry', ['main', 'footnotes']);

    expect(wheel({ deltaY: -100, ctrlKey: true }, byId('verse')).defaultPrevented).toBe(true);
    await oneFrame();
    expect(bound.adjustContentZoomById).toHaveBeenCalledWith('wv-retry', 1, 'main');
  });

  it('leaves the active area unchanged when reporting it to the parent throws', () => {
    let throwsLeft = 1;
    const reportContentZoomActiveAreaById = vi.fn((_webViewId: string, areaId: string) => {
      if (areaId === 'footnotes' && throwsLeft > 0) {
        throwsLeft -= 1;
        throw new Error('parent refused the active area');
      }
    });
    const { bound, papi } = install('wv-active-throws', TWO_AREAS, {
      reportContentZoomActiveAreaById,
    });

    // The pane reported the areas and refresh() activated the first one, "main", before the
    // pointerdown below is dispatched.
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('main');
    const warnings = papi.logger.warn.mock.calls.map(([message]) => String(message));
    expect(warnings.some((message) => message.includes('reporting the active zoom area'))).toBe(
      true,
    );

    // The throw was consumed by the call above; this one succeeds.
    byId('note').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');
    expect(bound.reportContentZoomActiveAreaById).toHaveBeenLastCalledWith(
      'wv-active-throws',
      'footnotes',
    );
  });

  it('stops observing, listening and publishing itself once it is destroyed', async () => {
    const { bound } = install('wv-destroy', TWO_AREAS);
    await nextFrame();
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    const api = window.__platformContentZoom;
    if (!api) throw new Error('indicator api missing');
    // Positive controls: both paths work before the teardown, so the negatives below are real.
    expect(bound.reportContentZoomAreasById).toHaveBeenCalled();
    byId('verse').focus();
    expect(key({ key: '=', ctrlKey: true }).defaultPrevented).toBe(true);
    api.showIndicator('main', '120 %');
    expect(document.getElementById('platform-content-zoom-indicator')).not.toBeNull();
    expect(document.getElementById('platform-content-zoom-indicator-status')).not.toBeNull();

    api.destroy();
    bound.reportContentZoomAreasById.mockClear();
    bound.adjustContentZoomById.mockClear();

    const late = document.createElement('aside');
    late.setAttribute('data-platform-content-zoom-root', 'sidebar');
    document.body.appendChild(late);
    await nextFrame();
    expect(bound.reportContentZoomAreasById).not.toHaveBeenCalled();
    expect(key({ key: '=', ctrlKey: true }).defaultPrevented).toBe(false);
    expect(bound.adjustContentZoomById).not.toHaveBeenCalled();
    expect(wheel({ deltaY: -100, ctrlKey: true }, byId('verse')).defaultPrevented).toBe(false);
    expect(document.getElementById('platform-content-zoom-indicator')).toBeNull();
    expect(document.getElementById('platform-content-zoom-indicator-status')).toBeNull();
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom).toBeUndefined();
  });

  it('takes every listener it put on the window and the document back off again when it is destroyed', async () => {
    const added = vi.spyOn(window, 'addEventListener');
    const removed = vi.spyOn(window, 'removeEventListener');
    const documentAdded = vi.spyOn(document, 'addEventListener');
    const documentRemoved = vi.spyOn(document, 'removeEventListener');
    try {
      install('wv-destroy-listeners', TWO_AREAS);
      await nextFrame();
      // Positive control: the whole set really is installed, so an empty leftover list below is
      // destroy() doing its work rather than a bootstrap that attached nothing to let go of.
      expect(new Set(added.mock.calls.map(([type]) => type))).toEqual(
        new Set(['pointerdown', 'pointermove', 'focusin', 'keydown', 'keyup', 'blur', 'wheel']),
      );
      expect(documentAdded.mock.calls.some(([type]) => type === 'visibilitychange')).toBe(true);

      // The bootstrap script defines this global; the double underscore marks it as an internal
      // platform/pane contract, not a name this file invents.
      // eslint-disable-next-line no-underscore-dangle
      window.__platformContentZoom?.destroy();

      expect(listenersLeftAttached(added.mock.calls, removed.mock.calls)).toEqual([]);
      expect(listenersLeftAttached(documentAdded.mock.calls, documentRemoved.mock.calls)).toEqual(
        [],
      );
    } finally {
      added.mockRestore();
      removed.mockRestore();
      documentAdded.mockRestore();
      documentRemoved.mockRestore();
    }
  });

  it('forgets a modifier key while the application is hidden, as it does when the window blurs', () => {
    const { bound } = install('wv-pinch-hidden', TWO_AREAS);
    // `document.hidden` follows the application window — minimised, hidden, or on another desktop —
    // and NOT an rc-dock tab being switched away from, which leaves this pane's iframe mounted and
    // this document visible. So this is the window-level companion of the blur case above, never a
    // tab-activation hook.
    modifierKey('keydown', 'Control');
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    try {
      document.dispatchEvent(new Event('visibilitychange'));
      // The keyup for a key held as the application goes away is delivered to somebody else, so a
      // flag left set here would send every later pinch down the notch path at a step a frame.
      for (let i = 0; i < 20; i += 1)
        wheel({ deltaY: -2, deltaX: 0, ctrlKey: true, wheelDeltaY: 120 }, byId('verse'));
      expect(bound.adjustContentZoomById).toHaveBeenCalledTimes(4);
    } finally {
      hidden.mockRestore();
    }
  });

  it('inserts, for an area discovered after the pane loaded, a rule identical to the head-splice helper’s rule for the same area', async () => {
    // The head-splice helper's own text for area "x", read off the style string it bakes into a
    // pane's head — the same string `getContentZoomStyleElement` produces for
    // `web-view.service-shard.ts`'s initial splice.
    const baked = getContentZoomStyleElement('n', 1, { x: 1 });
    const bakedRuleMatch = baked.match(/\[data-platform-content-zoom-root="x"\][^}]*\}/);
    if (!bakedRuleMatch) throw new Error('baked rule for area "x" not found');
    const [bakedRule] = bakedRuleMatch;

    // "x" is absent from the pane's initial content, so only the bootstrap's own runtime
    // `ensureRule` — not the initial splice — can be the one that inserts its rule.
    const { bound } = install('wv-pin', TWO_AREAS);
    await nextFrame();
    const late = document.createElement('div');
    late.setAttribute('data-platform-content-zoom-root', 'x');
    document.body.appendChild(late);
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-pin', [
      'main',
      'footnotes',
      'x',
    ]);
    const sheet = document.querySelector<HTMLStyleElement>('#platform-content-zoom-styles')?.sheet;
    const inserted = sheet
      ? Array.from(sheet.cssRules).find((rule) => rule.cssText.includes('"x"'))
      : undefined;
    if (!inserted) throw new Error('runtime rule for area "x" was not inserted');
    expect(normalizeCssRuleText(inserted.cssText)).toBe(normalizeCssRuleText(bakedRule));
  });

  it('does not duplicate a rule the style element already baked in for a persisted area level', async () => {
    const { bound } = install('wv-9', TWO_AREAS, undefined, { footnotes: 0.9 });
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-9', [
      'main',
      'footnotes',
    ]);
    const sheet = document.querySelector<HTMLStyleElement>('#platform-content-zoom-styles')?.sheet;
    const footnoteRules = sheet
      ? Array.from(sheet.cssRules).filter((rule) => rule.cssText.includes('"footnotes"'))
      : [];
    expect(footnoteRules).toHaveLength(1);
  });

  it('treats multiple elements sharing one area id as a single area', async () => {
    const html =
      '<div id="toolbar">bar</div>' +
      '<div data-platform-content-zoom-root id="main"><p id="verse" tabindex="0">text</p></div>' +
      '<div data-platform-content-zoom-root="footnotes" id="foot1"><p id="note1" tabindex="0">note 1</p></div>' +
      '<div data-platform-content-zoom-root="footnotes" id="foot2"><p id="note2" tabindex="0">note 2</p></div>';
    const { bound } = install('wv-10', html);
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-10', [
      'main',
      'footnotes',
    ]);
    expect(wheel({ deltaY: -100, ctrlKey: true }, byId('note1')).defaultPrevented).toBe(true);
    await oneFrame();
    expect(wheel({ deltaY: -100, ctrlKey: true }, byId('note2')).defaultPrevented).toBe(true);
    await oneFrame();
    expect(bound.adjustContentZoomById.mock.calls).toEqual([
      ['wv-10', 1, 'footnotes'],
      ['wv-10', 1, 'footnotes'],
    ]);
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    const api = window.__platformContentZoom;
    if (!api) throw new Error('indicator api missing');
    api.showIndicator('footnotes', '120 %');
    const badge = document.getElementById('platform-content-zoom-indicator');
    expect(badge?.dataset.area).toBe('footnotes');
  });

  it('leaves pop-up content out of the reported areas and warns about none of it', async () => {
    const { bound, papi } = install('wv-popup', TWO_AREAS);
    await nextFrame();
    const popupForFootnotes = document.createElement('div');
    popupForFootnotes.setAttribute('data-platform-content-zoom-root', 'footnotes');
    popupForFootnotes.setAttribute('data-platform-content-zoom-popup', '');
    const popupOnlyArea = document.createElement('div');
    popupOnlyArea.setAttribute('data-platform-content-zoom-root', 'menu');
    popupOnlyArea.setAttribute('data-platform-content-zoom-popup', '');
    const nestedPopup = document.createElement('div');
    nestedPopup.setAttribute('data-platform-content-zoom-root', '');
    nestedPopup.setAttribute('data-platform-content-zoom-popup', '');
    byId('main').appendChild(nestedPopup);
    // Controls in the same batch: a real late pane is reported, a real nested marker still warns.
    const late = document.createElement('aside');
    late.setAttribute('data-platform-content-zoom-root', 'sidebar');
    const nestedPane = document.createElement('div');
    nestedPane.setAttribute('data-platform-content-zoom-root', 'inner');
    byId('foot').appendChild(nestedPane);
    document.body.append(popupForFootnotes, popupOnlyArea, late);
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-popup', [
      'main',
      'footnotes',
      'sidebar',
    ]);
    const warnings = papi.logger.warn.mock.calls.map(([message]) => String(message));
    expect(warnings.some((message) => message.includes('"inner"'))).toBe(true);
    expect(warnings.filter((message) => message.includes('nested'))).toHaveLength(1);
  });

  it('does not report a changed area list when a pop-up opens or closes', async () => {
    const { bound } = install('wv-popup-churn', TWO_AREAS);
    await nextFrame();
    const reportsBefore = bound.reportContentZoomAreasById.mock.calls.length;
    expect(reportsBefore).toBeGreaterThan(0);
    const popup = document.createElement('div');
    // An area id the pane never reported, so counting the pop-up as an area would change the list.
    popup.setAttribute('data-platform-content-zoom-root', 'menu');
    popup.setAttribute('data-platform-content-zoom-popup', '');
    document.body.appendChild(popup);
    await nextFrame();
    popup.remove();
    await nextFrame();
    expect(bound.reportContentZoomAreasById.mock.calls.length).toBe(reportsBefore);
  });

  it('keeps the indicator on the pane while a pop-up of the same area is open', async () => {
    install('wv-popup-corner', TWO_AREAS);
    const popup = document.createElement('div');
    popup.setAttribute('data-platform-content-zoom-root', '');
    popup.setAttribute('data-platform-content-zoom-popup', '');
    document.body.appendChild(popup);
    const rect = (top: number, left: number, right: number): DOMRect =>
      DOMRect.fromRect({ x: left, y: top, width: right - left, height: 50 });
    vi.spyOn(byId('main'), 'getBoundingClientRect').mockReturnValue(rect(100, 0, 500));
    vi.spyOn(popup, 'getBoundingClientRect').mockReturnValue(rect(10, 600, 900));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    const api = window.__platformContentZoom;
    if (!api) throw new Error('indicator api missing');
    api.showIndicator('main', '200 %');
    // A show asks for a placement rather than performing one, so the area's corner is measured in
    // the frame that follows it.
    await oneFrame();
    const badge = byId('platform-content-zoom-indicator');
    // Pane only: top 100 + 12, right edge 500 → innerWidth - 500 + 16. Including the pop-up would
    // give top 22 and a right offset from 900.
    expect(badge.style.top).toBe('112px');
    expect(badge.style.right).toBe(`${window.innerWidth - 500 + 16}px`);
  });

  it('a click or Ctrl+wheel inside a pop-up targets the area the pop-up belongs to', async () => {
    const { bound } = install('wv-popup-target', TWO_AREAS);
    await nextFrame();
    const popup = document.createElement('div');
    popup.setAttribute('data-platform-content-zoom-root', 'footnotes');
    popup.setAttribute('data-platform-content-zoom-popup', '');
    popup.innerHTML = '<p id="popup-item">item</p>';
    document.body.appendChild(popup);
    await nextFrame();
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('main');
    byId('popup-item').dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    expect(window.__platformContentZoom?.activeArea).toBe('footnotes');
    const event = wheel({ ctrlKey: true, deltaY: -120 }, byId('popup-item'));
    expect(event.defaultPrevented).toBe(true);
    // A notch adds its step to a pending total that one adjustment per frame carries over.
    await oneFrame();
    expect(bound.adjustContentZoomById).toHaveBeenLastCalledWith('wv-popup-target', 1, 'footnotes');
  });

  it('scales a top-level pop-up with its area’s rule but no rule matches a nested one', async () => {
    install('wv-popup-css', TWO_AREAS);
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.setAttribute('data-platform-content-zoom-root', 'footnotes');
    popup.setAttribute('data-platform-content-zoom-popup', '');
    document.body.appendChild(popup);
    const nested = document.createElement('div');
    nested.id = 'nestedPopup';
    nested.setAttribute('data-platform-content-zoom-root', 'footnotes');
    nested.setAttribute('data-platform-content-zoom-popup', '');
    byId('main').appendChild(nested);
    await nextFrame();
    const sheet = document.querySelector<HTMLStyleElement>('#platform-content-zoom-styles')?.sheet;
    const selectors = sheet
      ? Array.from(sheet.cssRules).flatMap((rule) =>
          rule instanceof CSSStyleRule ? [rule.selectorText] : [],
        )
      : [];
    expect(selectors.some((selector) => byId('popup').matches(selector))).toBe(true);
    expect(selectors.some((selector) => byId('nestedPopup').matches(selector))).toBe(false);
  });

  it('anchors the indicator at inline-end: right for an LTR area, left for an RTL area', async () => {
    install('wv-14', TWO_AREAS);
    // jsdom does not map the `dir` attribute to a computed `direction` the way a browser's UA
    // stylesheet does, so an explicit author rule stands in for that here.
    const rtlStyle = document.createElement('style');
    rtlStyle.textContent = '[dir="rtl"]{direction:rtl}';
    document.head.appendChild(rtlStyle);
    byId('foot').setAttribute('dir', 'rtl');
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    const api = window.__platformContentZoom;
    if (!api) throw new Error('indicator api missing');

    // A show asks for placement rather than placing the badge itself, so each corner is read in the
    // frame that follows it.
    api.showIndicator('main', '120 %');
    await nextFrame();
    const badge = byId('platform-content-zoom-indicator');
    expect(badge.style.right).not.toBe('');
    expect(badge.style.left).toBe('');

    api.showIndicator('footnotes', '120 %');
    await nextFrame();
    expect(badge.style.left).not.toBe('');
    expect(badge.style.right).toBe('');
  });

  it('shows a transient indicator on the named area', () => {
    install('wv-8', TWO_AREAS);
    // The bootstrap script defines this global; the double underscore marks it as an internal
    // platform/pane contract, not a name this file invents.
    // eslint-disable-next-line no-underscore-dangle
    const api = window.__platformContentZoom;
    if (!api) throw new Error('indicator api missing');
    api.showIndicator('footnotes', '120 %');
    const badge = document.getElementById('platform-content-zoom-indicator');
    expect(badge?.textContent).toBe('120 %');
    expect(badge?.dataset.area).toBe('footnotes');
  });

  // A pane's content commonly fills its viewport exactly, so a single pixel of overflow is the
  // difference between no scrollbar and one. A scrollbar that toggles takes its own width out of the
  // viewport as it goes, moving every right-aligned control in the pane.
  it("keeps the live region out of the document's scrollable overflow", () => {
    install('wv-live-offsets', TWO_AREAS);
    const region = byId('platform-content-zoom-indicator-status');

    expect(region.style.position).toBe('absolute');
    // Without offsets an absolutely positioned element keeps its static position, at the end of the
    // body's flow, where it still extends the document.
    expect(region.style.top).toBe('0px');
    expect(region.style.left).toBe('0px');
  });

  it('puts the announcement in a live region that is in the accessibility tree, and empty, before any zoom', () => {
    install('wv-live', TWO_AREAS);
    const region = byId('platform-content-zoom-indicator-status');
    expect(region.parentElement).toBe(document.body);
    expect(region.getAttribute('role')).toBe('status');
    expect(region.getAttribute('aria-live')).toBe('polite');
    expect(region.textContent).toBe('');
    // Visually hidden rather than display:none, which would take it out of the tree.
    expect(region.style.width).toBe('1px');
    // The visible badge carries no live-region semantics of its own: its text is rewritten on every
    // wheel notch.
    const badge = byId('platform-content-zoom-indicator');
    expect(badge.getAttribute('aria-hidden')).toBe('true');
    expect(badge.getAttribute('role')).toBeNull();
    expect(badge.getAttribute('aria-live')).toBeNull();
    expect(badge.style.opacity).toBe('0');
  });

  it('announces only the settled level, once the gesture has gone quiet', () => {
    install('wv-announce', TWO_AREAS);
    stubMatchMedia(false);
    vi.useFakeTimers();
    try {
      // The bootstrap script defines this global; the double underscore marks it as an internal
      // platform/pane contract, not a name this file invents.
      // eslint-disable-next-line no-underscore-dangle
      const api = window.__platformContentZoom;
      if (!api) throw new Error('indicator api missing');
      const region = byId('platform-content-zoom-indicator-status');
      const badge = byId('platform-content-zoom-indicator');
      ['110 %', '120 %', '130 %', '140 %', '150 %'].forEach((text, index) => {
        if (index > 0) vi.advanceTimersByTime(20);
        api.showIndicator('main', text);
      });
      // The visible badge takes every notch; the live region has said nothing yet.
      expect(badge.textContent).toBe('150 %');
      expect(region.textContent).toBe('');
      vi.advanceTimersByTime(480);
      expect(region.textContent).toBe('');
      vi.advanceTimersByTime(40);
      expect(region.textContent).toBe('150 %');
      // One announcement for the whole gesture, held for as long as the badge is up.
      vi.advanceTimersByTime(500);
      expect(region.textContent).toBe('150 %');
    } finally {
      vi.useRealTimers();
    }
  });

  it('hides the indicator by fading out after 1.1 s, keeping its text and dropping the announcement', () => {
    install('wv-11', TWO_AREAS);
    stubMatchMedia(false);
    vi.useFakeTimers();
    try {
      // The bootstrap script defines this global; the double underscore marks it as an internal
      // platform/pane contract, not a name this file invents.
      // eslint-disable-next-line no-underscore-dangle
      const api = window.__platformContentZoom;
      if (!api) throw new Error('indicator api missing');
      api.showIndicator('footnotes', '120 %');
      const badge = document.getElementById('platform-content-zoom-indicator');
      vi.advanceTimersByTime(1200);
      expect(badge?.style.opacity).toBe('0');
      expect(badge?.style.transition).not.toBe('none');
      expect(badge?.textContent).toBe('120 %');
      // The faded badge is out of sight but still in the accessibility tree, so the level it
      // announced goes with the fade.
      expect(byId('platform-content-zoom-indicator-status').textContent).toBe('');
    } finally {
      vi.useRealTimers();
    }
  });

  it('hides the indicator instantly, with no fade, under reduced motion', () => {
    install('wv-12', TWO_AREAS);
    stubMatchMedia(true);
    vi.useFakeTimers();
    try {
      // The bootstrap script defines this global; the double underscore marks it as an internal
      // platform/pane contract, not a name this file invents.
      // eslint-disable-next-line no-underscore-dangle
      const api = window.__platformContentZoom;
      if (!api) throw new Error('indicator api missing');
      api.showIndicator('footnotes', '120 %');
      const badge = document.getElementById('platform-content-zoom-indicator');
      vi.advanceTimersByTime(1200);
      expect(badge?.style.opacity).toBe('0');
      expect(badge?.style.transition).toBe('none');
      expect(badge?.textContent).toBe('120 %');
      expect(byId('platform-content-zoom-indicator-status').textContent).toBe('');
    } finally {
      vi.useRealTimers();
    }
  });

  it('bakes the default, the known levels, the base rule and the named-area rules into the style element', () => {
    const style = getContentZoomStyleElement('abc', 1.3, { main: 1.2, footnotes: 0.9 });
    expect(style).toContain('nonce="abc"');
    expect(style).toContain('id="platform-content-zoom-styles"');
    expect(style).toContain(
      ':root{--platform-content-zoom-default:1.3;--platform-content-zoom-main:1.2;--platform-content-zoom-footnotes:0.9}',
    );
    expect(style).toContain(
      '[data-platform-content-zoom-root=""]:where(:not([data-platform-content-zoom-root] [data-platform-content-zoom-root])),[data-platform-content-zoom-root="main"]:where(:not([data-platform-content-zoom-root] [data-platform-content-zoom-root])),[data-platform-content-zoom-root="true"]:where(:not([data-platform-content-zoom-root] [data-platform-content-zoom-root])){zoom:var(--platform-content-zoom-main,var(--platform-content-zoom-default,1))}',
    );
    expect(style).toContain(
      '[data-platform-content-zoom-root="footnotes"]:where(:not([data-platform-content-zoom-root] [data-platform-content-zoom-root])){zoom:var(--platform-content-zoom-footnotes,var(--platform-content-zoom-default,1))}',
    );
  });

  it('drops an out-of-range level and an ill-formed area id, and falls back to 100 % for an invalid default', () => {
    const style = getContentZoomStyleElement('abc', Number.NaN, {
      main: 99,
      footnotes: 0.9,
      'Bad Id': 1.2,
    });
    expect(style).toContain(
      ':root{--platform-content-zoom-default:1;--platform-content-zoom-footnotes:0.9}',
    );
    expect(style).not.toContain('--platform-content-zoom-main:');
    expect(style).not.toContain('Bad Id');
  });

  it('refuses a marker that claims the reserved area id, the way it refuses an ill-formed one', async () => {
    const html = `${TWO_AREAS}<div data-platform-content-zoom-root="default" id="reserved">reserved</div>`;
    const { bound, papi } = install('wv-reserved', html);
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenLastCalledWith('wv-reserved', [
      'main',
      'footnotes',
    ]);
    const warnings = papi.logger.warn.mock.calls.map(([message]) => String(message));
    expect(warnings.some((message) => message.includes('"default"'))).toBe(true);
    const sheet = document.querySelector<HTMLStyleElement>('#platform-content-zoom-styles')?.sheet;
    const selectors = sheet
      ? Array.from(sheet.cssRules).flatMap((rule) =>
          rule instanceof CSSStyleRule ? [rule.selectorText] : [],
        )
      : [];
    // The accepted areas are matched, so the miss below is the reserved id being refused rather
    // than an empty sheet.
    expect(selectors.some((selector) => byId('foot').matches(selector))).toBe(true);
    expect(selectors.some((selector) => byId('reserved').matches(selector))).toBe(false);
  });

  it('matches no rule against a nested marker or one carrying an ill-formed area id', async () => {
    install('wv-13', TWO_AREAS);
    const nested = document.createElement('div');
    nested.id = 'nested';
    nested.setAttribute('data-platform-content-zoom-root', 'inner');
    byId('main').appendChild(nested);
    const malformed = document.createElement('div');
    malformed.id = 'malformed';
    malformed.setAttribute('data-platform-content-zoom-root', 'Bad Id');
    document.body.appendChild(malformed);
    // "footnotes" and the empty (main) value each have a rule of their own already, unlike "inner"
    // above — nesting them still has to match no rule, not just an id nobody generated a rule for.
    const nestedFootnotes = document.createElement('div');
    nestedFootnotes.id = 'nestedFootnotes';
    nestedFootnotes.setAttribute('data-platform-content-zoom-root', 'footnotes');
    byId('main').appendChild(nestedFootnotes);
    const nestedMain = document.createElement('div');
    nestedMain.id = 'nestedMain';
    nestedMain.setAttribute('data-platform-content-zoom-root', '');
    byId('foot').appendChild(nestedMain);
    await nextFrame();
    const sheet = document.querySelector<HTMLStyleElement>('#platform-content-zoom-styles')?.sheet;
    const selectors = sheet
      ? Array.from(sheet.cssRules).flatMap((rule) =>
          rule instanceof CSSStyleRule ? [rule.selectorText] : [],
        )
      : [];
    // The accepted areas are matched, so a miss below means the selectors really do exclude the
    // rejected markers rather than the sheet being empty.
    expect(selectors.some((selector) => byId('main').matches(selector))).toBe(true);
    expect(selectors.some((selector) => byId('foot').matches(selector))).toBe(true);
    expect(selectors.some((selector) => byId('nested').matches(selector))).toBe(false);
    expect(selectors.some((selector) => byId('malformed').matches(selector))).toBe(false);
    expect(selectors.some((selector) => byId('nestedFootnotes').matches(selector))).toBe(false);
    expect(selectors.some((selector) => byId('nestedMain').matches(selector))).toBe(false);
  });
});
