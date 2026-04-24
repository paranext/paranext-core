/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { installAppZoomInput } from './app-zoom.input';

function renderIframe(): HTMLIFrameElement {
  document.body.innerHTML = `<iframe id="frame" srcdoc="<!doctype html><html></html>"></iframe>`;
  const el = document.getElementById('frame');
  if (!(el instanceof HTMLIFrameElement)) throw new Error('test setup: iframe not found');
  return el;
}

function mockService() {
  return {
    adjust: vi.fn(),
    reset: vi.fn(),
  };
}

function ctrlShift(code: string, key?: string): KeyboardEvent {
  return new KeyboardEvent('keydown', {
    code,
    key: key ?? code,
    ctrlKey: true,
    shiftKey: true,
    cancelable: true,
  });
}

describe('installAppZoomInput', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Ctrl+Shift+= zooms in', () => {
    const svc = mockService();
    const uninstall = installAppZoomInput({ service: svc });
    const ev = ctrlShift('Equal', '+');
    window.dispatchEvent(ev);
    expect(svc.adjust).toHaveBeenCalledWith(0.1);
    expect(ev.defaultPrevented).toBe(true);
    uninstall();
  });

  it('Ctrl+Shift+- zooms out (e.key is _ but e.code is Minus)', () => {
    const svc = mockService();
    const uninstall = installAppZoomInput({ service: svc });
    const ev = ctrlShift('Minus', '_');
    window.dispatchEvent(ev);
    expect(svc.adjust).toHaveBeenCalledWith(-0.1);
    expect(ev.defaultPrevented).toBe(true);
    uninstall();
  });

  it('ignores when Shift is not held', () => {
    const svc = mockService();
    const uninstall = installAppZoomInput({ service: svc });
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Equal', ctrlKey: true }));
    expect(svc.adjust).not.toHaveBeenCalled();
    uninstall();
  });

  it('ignores when Ctrl/Meta is not held', () => {
    const svc = mockService();
    const uninstall = installAppZoomInput({ service: svc });
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Equal', shiftKey: true }));
    expect(svc.adjust).not.toHaveBeenCalled();
    uninstall();
  });

  it('ignores repeated keydown events', () => {
    const svc = mockService();
    const uninstall = installAppZoomInput({ service: svc });
    window.dispatchEvent(
      new KeyboardEvent('keydown', { code: 'Equal', ctrlKey: true, shiftKey: true, repeat: true }),
    );
    expect(svc.adjust).not.toHaveBeenCalled();
    uninstall();
  });

  it('uninstall removes the listener', () => {
    const svc = mockService();
    const uninstall = installAppZoomInput({ service: svc });
    uninstall();
    window.dispatchEvent(ctrlShift('Equal', '+'));
    expect(svc.adjust).not.toHaveBeenCalled();
  });
});

describe('installAppZoomInput – iframe message forwarding', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('app-zoom adjust message from an iframe zooms in', () => {
    const svc = mockService();
    const iframe = renderIframe();
    const uninstall = installAppZoomInput({ service: svc });
    window.dispatchEvent(
      new MessageEvent('message', {
        data: { type: 'app-zoom', action: 'adjust', delta: 0.1 },
        source: iframe.contentWindow,
      }),
    );
    expect(svc.adjust).toHaveBeenCalledWith(0.1);
    uninstall();
  });

  it('app-zoom adjust message with negative delta zooms out', () => {
    const svc = mockService();
    const iframe = renderIframe();
    const uninstall = installAppZoomInput({ service: svc });
    window.dispatchEvent(
      new MessageEvent('message', {
        data: { type: 'app-zoom', action: 'adjust', delta: -0.1 },
        source: iframe.contentWindow,
      }),
    );
    expect(svc.adjust).toHaveBeenCalledWith(-0.1);
    uninstall();
  });

  it('app-zoom reset message from an iframe resets', () => {
    const svc = mockService();
    const iframe = renderIframe();
    const uninstall = installAppZoomInput({ service: svc });
    window.dispatchEvent(
      new MessageEvent('message', {
        data: { type: 'app-zoom', action: 'reset', delta: 0 },
        source: iframe.contentWindow,
      }),
    );
    expect(svc.reset).toHaveBeenCalled();
    uninstall();
  });

  it('ignores app-zoom message from unknown source', () => {
    const svc = mockService();
    const uninstall = installAppZoomInput({ service: svc });
    window.dispatchEvent(
      new MessageEvent('message', {
        data: { type: 'app-zoom', action: 'adjust', delta: 0.1 },
        source: undefined,
      }),
    );
    expect(svc.adjust).not.toHaveBeenCalled();
    uninstall();
  });

  it('ignores messages with wrong type', () => {
    const svc = mockService();
    const uninstall = installAppZoomInput({ service: svc });
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'view-zoom' } }));
    expect(svc.adjust).not.toHaveBeenCalled();
    uninstall();
  });

  it('uninstall removes the message listener', () => {
    const svc = mockService();
    const iframe = renderIframe();
    const uninstall = installAppZoomInput({ service: svc });
    uninstall();
    window.dispatchEvent(
      new MessageEvent('message', {
        data: { type: 'app-zoom', action: 'adjust', delta: 0.1 },
        source: iframe.contentWindow,
      }),
    );
    expect(svc.adjust).not.toHaveBeenCalled();
  });
});
