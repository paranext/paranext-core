import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
  levels: { [areaId: string]: number } = {},
): { papi: PapiLike; bound: Bound } {
  document.head.innerHTML = getContentZoomStyleElement('n', 1, levels);
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
 * Settles past the mutation observer's refresh, which the bootstrap runs directly off the
 * observer's own microtask callback (no `requestAnimationFrame` involved) — two frames is a
 * generous upper bound that also has margin for a slow CI worker.
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

/**
 * Collapses whitespace and drops an insignificant trailing `;` before `}` so a CSSOM
 * re-serialization difference (jsdom reformats spacing around `:`/`,` and adds a trailing `;` to
 * the last declaration when it echoes back an inserted rule's `cssText`) cannot fail the pinning
 * check below — the two sides are compared normalized rather than byte-for-byte.
 */
function normalizeCssRuleText(cssText: string): string {
  return cssText.replace(/\s+/g, '').replace(/;}/g, '}');
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

  it('accepts the meta key as the modifier, takes Shift only for zoom in, and ignores Alt and plain keys', () => {
    const { bound } = install('wv-3', TWO_AREAS);
    expect(key({ key: '=', metaKey: true }).defaultPrevented).toBe(true);
    // `+` is Shift+`=` on US/UK layouts, so the zoom-in chord takes Shift.
    expect(key({ key: '=', ctrlKey: true, shiftKey: true }).defaultPrevented).toBe(true);
    expect(key({ key: '+', ctrlKey: true, shiftKey: true }).defaultPrevented).toBe(true);
    // Zoom out and reset keep rejecting it, so Ctrl+Shift+- and Ctrl+Shift+0 stay free.
    expect(key({ key: '-', ctrlKey: true, shiftKey: true }).defaultPrevented).toBe(false);
    expect(key({ key: '0', ctrlKey: true, shiftKey: true }).defaultPrevented).toBe(false);
    expect(key({ key: '=', ctrlKey: true, altKey: true }).defaultPrevented).toBe(false);
    expect(key({ key: '-', ctrlKey: true, altKey: true }).defaultPrevented).toBe(false);
    expect(key({ key: '=' }).defaultPrevented).toBe(false);
    expect(bound.adjustContentZoomById.mock.calls).toEqual([
      ['wv-3', 1, 'main'],
      ['wv-3', 1, 'main'],
      ['wv-3', 1, 'main'],
    ]);
    expect(bound.resetContentZoomById).not.toHaveBeenCalled();
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

  it('leaves Ctrl+Shift+wheel and Ctrl+Alt+wheel untouched, matching the chords’ modifier rule', () => {
    const { bound } = install('wv-5b', TWO_AREAS);
    expect(
      wheel({ deltaY: -100, ctrlKey: true, shiftKey: true }, byId('verse')).defaultPrevented,
    ).toBe(false);
    expect(
      wheel({ deltaY: -100, ctrlKey: true, altKey: true }, byId('verse')).defaultPrevented,
    ).toBe(false);
    expect(bound.adjustContentZoomById).not.toHaveBeenCalled();
    // Positive control: the same gesture without the extra modifier is taken.
    expect(wheel({ deltaY: -100, ctrlKey: true }, byId('verse')).defaultPrevented).toBe(true);
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
    // showIndicator itself scans once, synchronously, to place the badge at its area's corner; the
    // count taken after it returns already includes that scan, so the delta below isolates only
    // what the observer's callback does once the write's mutation record reaches it.
    api.showIndicator('main', '120 %');
    const afterShow = markerScanCount();
    await nextFrame();
    expect(markerScanCount() - afterShow).toBe(0);
    spy.mockRestore();
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
    expect(wheel({ deltaY: -100, ctrlKey: true }, byId('note2')).defaultPrevented).toBe(true);
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

  it('anchors the indicator at inline-end: right for an LTR area, left for an RTL area', () => {
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

    api.showIndicator('main', '120 %');
    const badge = byId('platform-content-zoom-indicator');
    expect(badge.style.right).not.toBe('');
    expect(badge.style.left).toBe('');

    api.showIndicator('footnotes', '120 %');
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

declare global {
  interface Window {
    __platformContentZoom?: {
      showIndicator: (areaId: string, text: string) => void;
      destroy: () => void;
      activeArea?: string;
    };
  }
}
