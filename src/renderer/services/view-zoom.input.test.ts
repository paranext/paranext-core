/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { installViewZoomInput } from './view-zoom.input';

function mockService() {
  return {
    adjustZoom: vi.fn(),
    resetZoom: vi.fn(),
  };
}

function renderScene(html: string) {
  document.body.innerHTML = html;
}

describe('view-zoom.input', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Ctrl+= adjusts focused view by +1', () => {
    const svc = mockService();
    renderScene(`<div data-view-type="settings-tab" id="focused">hello</div>`);
    const uninstall = installViewZoomInput({
      service: svc,
      resolveFocusedKey: () => 'settings-tab',
    });

    const ev = new KeyboardEvent('keydown', { key: '=', ctrlKey: true, cancelable: true });
    window.dispatchEvent(ev);

    expect(svc.adjustZoom).toHaveBeenCalledWith('settings-tab', 1);
    expect(ev.defaultPrevented).toBe(true);
    uninstall();
  });

  it('Ctrl+- adjusts by -1', () => {
    const svc = mockService();
    const uninstall = installViewZoomInput({
      service: svc,
      resolveFocusedKey: () => 'k',
    });
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '-', ctrlKey: true }));
    expect(svc.adjustZoom).toHaveBeenCalledWith('k', -1);
    uninstall();
  });

  it('Ctrl+0 resets', () => {
    const svc = mockService();
    const uninstall = installViewZoomInput({
      service: svc,
      resolveFocusedKey: () => 'k',
    });
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '0', ctrlKey: true }));
    expect(svc.resetZoom).toHaveBeenCalledWith('k');
    uninstall();
  });

  it('Ctrl+wheel resolves via pointer target', () => {
    const svc = mockService();
    renderScene(`
      <div data-view-type="a">
        <div id="inner">inside</div>
      </div>
    `);
    const inner = document.getElementById('inner');
    if (!inner) throw new Error('test setup: #inner not found');
    const uninstall = installViewZoomInput({
      service: svc,
      resolveFocusedKey: () => 'should-not-use',
    });

    const ev = new WheelEvent('wheel', {
      ctrlKey: true,
      deltaY: -1,
      cancelable: true,
      bubbles: true,
    });
    inner.dispatchEvent(ev);
    expect(svc.adjustZoom).toHaveBeenCalledWith('a', 1);
    uninstall();
  });

  it('wheel without Ctrl is ignored', () => {
    const svc = mockService();
    renderScene(`<div data-view-type="a"></div>`);
    const uninstall = installViewZoomInput({
      service: svc,
      resolveFocusedKey: () => 'k',
    });
    window.dispatchEvent(new WheelEvent('wheel', { deltaY: -1 }));
    expect(svc.adjustZoom).not.toHaveBeenCalled();
    uninstall();
  });

  it('keydown without Ctrl/Meta is ignored', () => {
    const svc = mockService();
    const uninstall = installViewZoomInput({
      service: svc,
      resolveFocusedKey: () => 'k',
    });
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '=' }));
    expect(svc.adjustZoom).not.toHaveBeenCalled();
    uninstall();
  });

  it('handles forwarded zoom message from an iframe by resolving its data-view-type', () => {
    const svc = mockService();
    renderScene(`
      <div data-view-type="webview-key">
        <iframe id="frame" srcdoc="<!doctype html><html></html>"></iframe>
      </div>
    `);
    const iframe = document.getElementById('frame');
    if (!(iframe instanceof HTMLIFrameElement)) throw new Error('test setup');
    const uninstall = installViewZoomInput({
      service: svc,
      resolveFocusedKey: () => undefined,
    });

    const messageEvent = new MessageEvent('message', {
      data: { type: 'view-zoom', action: 'adjust', deltaSteps: 1, webViewId: 'wv1' },
      source: iframe.contentWindow,
    });
    window.dispatchEvent(messageEvent);
    expect(svc.adjustZoom).toHaveBeenCalledWith('webview-key', 1);

    const resetEvent = new MessageEvent('message', {
      data: { type: 'view-zoom', action: 'reset', deltaSteps: 0, webViewId: 'wv1' },
      source: iframe.contentWindow,
    });
    window.dispatchEvent(resetEvent);
    expect(svc.resetZoom).toHaveBeenCalledWith('webview-key');

    uninstall();
  });

  it('ignores messages with the wrong type', () => {
    const svc = mockService();
    const uninstall = installViewZoomInput({
      service: svc,
      resolveFocusedKey: () => undefined,
    });
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'other' } }));
    expect(svc.adjustZoom).not.toHaveBeenCalled();
    uninstall();
  });

  it('uninstall removes listeners', () => {
    const svc = mockService();
    const uninstall = installViewZoomInput({
      service: svc,
      resolveFocusedKey: () => 'k',
    });
    uninstall();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '=', ctrlKey: true }));
    expect(svc.adjustZoom).not.toHaveBeenCalled();
  });
});
