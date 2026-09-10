import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getContentZoomBootstrapScript,
  getContentZoomStyleElement,
} from './web-view-content-zoom.bootstrap-script';

type PapiLike = {
  commands: { sendCommand: ReturnType<typeof vi.fn> };
  logger: { warn: ReturnType<typeof vi.fn> };
};
type Bound = {
  adjustContentZoomById: ReturnType<typeof vi.fn>;
  resetContentZoomById: ReturnType<typeof vi.fn>;
  reportContentZoomAreasById: ReturnType<typeof vi.fn>;
  reportContentZoomActiveAreaById: ReturnType<typeof vi.fn>;
};

const TWO_AREAS =
  '<div id="toolbar">bar</div>' +
  '<div data-platform-content-zoom-root id="main"><p id="verse" tabindex="0">text</p></div>' +
  '<div data-platform-content-zoom-root="footnotes" id="foot"><p id="note" tabindex="0">note</p></div>';

function install(
  webViewId: string,
  html: string,
  bound?: Partial<Bound>,
): { papi: PapiLike; bound: Bound } {
  document.head.innerHTML = getContentZoomStyleElement('n', 1, {});
  document.body.innerHTML = html;
  const papi: PapiLike = {
    commands: { sendCommand: vi.fn(async () => undefined) },
    logger: { warn: vi.fn() },
  };
  const allBound: Bound = {
    adjustContentZoomById: vi.fn(),
    resetContentZoomById: vi.fn(),
    reportContentZoomAreasById: vi.fn(),
    reportContentZoomActiveAreaById: vi.fn(),
    ...bound,
  };
  Object.assign(window, { papi, webViewId, __platformContentZoom: undefined, ...allBound });
  // Exercises the bootstrap exactly as it runs inside a web view: injected as source text and
  // evaluated, not imported as a module.
  // eslint-disable-next-line no-new-func
  new Function(getContentZoomBootstrapScript(webViewId))();
  return { papi, bound: allBound };
}

function key(init: KeyboardEventInit, target: EventTarget = window): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
  target.dispatchEvent(event);
  return event;
}

function wheel(init: WheelEventInit, target: EventTarget = window): WheelEvent {
  const event = new WheelEvent('wheel', { bubbles: true, cancelable: true, ...init });
  target.dispatchEvent(event);
  return event;
}

/**
 * Two frames: the mutation observer schedules its refresh on the frame after the mutation's
 * microtask.
 */
async function nextFrame(): Promise<void> {
  await new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve(undefined)));
  });
}

function byId(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (!element) throw new Error(`missing #${id}`);
  return element;
}

describe('content-zoom bootstrap script', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
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

  it('accepts the meta key as the modifier and ignores Shift/Alt combinations and plain keys', () => {
    const { bound } = install('wv-3', TWO_AREAS);
    expect(key({ key: '=', metaKey: true }).defaultPrevented).toBe(true);
    expect(key({ key: '=', ctrlKey: true, shiftKey: true }).defaultPrevented).toBe(false);
    expect(key({ key: '=', ctrlKey: true, altKey: true }).defaultPrevented).toBe(false);
    expect(key({ key: '=' }).defaultPrevented).toBe(false);
    expect(bound.adjustContentZoomById).toHaveBeenCalledTimes(1);
  });

  it('leaves keys and wheel alone in a view without areas and reports an empty list', async () => {
    const { bound } = install('wv-4', '<div>text</div>');
    await nextFrame();
    expect(bound.reportContentZoomAreasById).toHaveBeenCalledWith('wv-4', []);
    expect(key({ key: '=', ctrlKey: true }).defaultPrevented).toBe(false);
    expect(wheel({ deltaY: -100, ctrlKey: true }).defaultPrevented).toBe(false);
    expect(bound.adjustContentZoomById).not.toHaveBeenCalled();
  });

  it('maps Ctrl+wheel to the area under the pointer (up = in, down = out), consuming the gesture; plain wheel passes; outside every area → active area', () => {
    const { bound } = install('wv-5', TWO_AREAS);
    expect(wheel({ deltaY: -100, ctrlKey: true }, byId('note')).defaultPrevented).toBe(true);
    expect(wheel({ deltaY: 100, ctrlKey: true }, byId('verse')).defaultPrevented).toBe(true);
    expect(wheel({ deltaY: 100 }, byId('verse')).defaultPrevented).toBe(false);
    expect(wheel({ deltaY: -100, ctrlKey: true }, byId('toolbar')).defaultPrevented).toBe(true);
    expect(bound.adjustContentZoomById.mock.calls).toEqual([
      ['wv-5', 1, 'footnotes'],
      ['wv-5', -1, 'main'],
      ['wv-5', 1, 'main'],
    ]);
  });

  it('is suppressed by an inner capture handler that stops propagation (Text Collection grid rule)', () => {
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
    expect(badge?.getAttribute('aria-live')).toBe('polite');
    expect(badge?.dataset.area).toBe('footnotes');
  });

  it('bakes the default, the known levels, the base rule and the named-area rules into the style element', () => {
    const style = getContentZoomStyleElement('abc', 1.3, { main: 1.2, footnotes: 0.9 });
    expect(style).toContain('nonce="abc"');
    expect(style).toContain('id="platform-content-zoom-styles"');
    expect(style).toContain(
      ':root{--platform-content-zoom-default:1.3;--platform-content-zoom-main:1.2;--platform-content-zoom-footnotes:0.9}',
    );
    expect(style).toContain(
      '[data-platform-content-zoom-root]{zoom:var(--platform-content-zoom-main,var(--platform-content-zoom-default,1))}',
    );
    expect(style).toContain(
      '[data-platform-content-zoom-root="footnotes"]{zoom:var(--platform-content-zoom-footnotes,var(--platform-content-zoom-default,1))}',
    );
  });
});

declare global {
  interface Window {
    __platformContentZoom?: {
      showIndicator: (areaId: string, text: string) => void;
      activeArea?: string;
    };
  }
}
