import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

// The mocked logger, so a test can assert on a warning it produced.
// eslint-disable-next-line import/first
import { logger } from '@shared/services/logger.service';
// The module under test, imported after the mock above is established.
// eslint-disable-next-line import/first
import { registerContentZoomChromeKeys } from './web-view-content-zoom.chrome-keys';

function dispatchKeyDown(target: EventTarget, init: KeyboardEventInit): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
  target.dispatchEvent(event);
  return event;
}

describe('registerContentZoomChromeKeys', () => {
  let adjustContentZoom: ReturnType<typeof vi.fn>;
  let resetContentZoom: ReturnType<typeof vi.fn>;
  let isModalOverlayOpen: ReturnType<typeof vi.fn>;
  let canContentZoomAct: ReturnType<typeof vi.fn>;
  let unsubscribe: () => void;

  beforeEach(() => {
    vi.clearAllMocks();
    adjustContentZoom = vi.fn().mockResolvedValue(undefined);
    resetContentZoom = vi.fn().mockResolvedValue(undefined);
    isModalOverlayOpen = vi.fn().mockReturnValue(false);
    canContentZoomAct = vi.fn().mockReturnValue(true);
    unsubscribe = registerContentZoomChromeKeys({
      adjustContentZoom,
      resetContentZoom,
      isModalOverlayOpen,
      canContentZoomAct,
    });
  });

  afterEach(() => {
    unsubscribe();
  });

  it('zooms in on Ctrl+=', () => {
    const event = dispatchKeyDown(document.body, { key: '=', ctrlKey: true });
    expect(adjustContentZoom).toHaveBeenCalledTimes(1);
    expect(adjustContentZoom).toHaveBeenCalledWith(undefined, 1);
    expect(event.defaultPrevented).toBe(true);
  });

  it('zooms in on Ctrl++', () => {
    const event = dispatchKeyDown(document.body, { key: '+', ctrlKey: true });
    expect(adjustContentZoom).toHaveBeenCalledWith(undefined, 1);
    expect(event.defaultPrevented).toBe(true);
  });

  it('zooms in on Ctrl+NumpadAdd', () => {
    const event = dispatchKeyDown(document.body, { code: 'NumpadAdd', ctrlKey: true });
    expect(adjustContentZoom).toHaveBeenCalledWith(undefined, 1);
    expect(event.defaultPrevented).toBe(true);
  });

  it('zooms out on Ctrl+-', () => {
    const event = dispatchKeyDown(document.body, { key: '-', ctrlKey: true });
    expect(adjustContentZoom).toHaveBeenCalledWith(undefined, -1);
    expect(event.defaultPrevented).toBe(true);
  });

  it('zooms out on Ctrl+NumpadSubtract', () => {
    const event = dispatchKeyDown(document.body, { code: 'NumpadSubtract', ctrlKey: true });
    expect(adjustContentZoom).toHaveBeenCalledWith(undefined, -1);
    expect(event.defaultPrevented).toBe(true);
  });

  it('resets on Ctrl+0', () => {
    const event = dispatchKeyDown(document.body, { key: '0', ctrlKey: true });
    expect(resetContentZoom).toHaveBeenCalledWith(undefined);
    expect(event.defaultPrevented).toBe(true);
  });

  it('resets on Ctrl+Numpad0', () => {
    const event = dispatchKeyDown(document.body, { code: 'Numpad0', ctrlKey: true });
    expect(resetContentZoom).toHaveBeenCalledWith(undefined);
    expect(event.defaultPrevented).toBe(true);
  });

  it('acts on Meta instead of Ctrl', () => {
    const event = dispatchKeyDown(document.body, { key: '=', metaKey: true });
    expect(adjustContentZoom).toHaveBeenCalledWith(undefined, 1);
    expect(event.defaultPrevented).toBe(true);
  });

  it('accepts Shift, since Ctrl+Shift+= is how many keyboards type Ctrl++', () => {
    const event = dispatchKeyDown(document.body, { key: '=', ctrlKey: true, shiftKey: true });
    expect(adjustContentZoom).toHaveBeenCalledWith(undefined, 1);
    expect(event.defaultPrevented).toBe(true);
  });

  it('does nothing on Ctrl+Shift+-, leaving it free for other uses', () => {
    const event = dispatchKeyDown(document.body, { key: '-', ctrlKey: true, shiftKey: true });
    expect(adjustContentZoom).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it('does nothing on Ctrl+Shift+0, leaving it free for other uses', () => {
    const event = dispatchKeyDown(document.body, { key: '0', ctrlKey: true, shiftKey: true });
    expect(resetContentZoom).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it('does not act when Alt is held, since Ctrl+Alt chords have their own meanings', () => {
    const event = dispatchKeyDown(document.body, { key: '=', ctrlKey: true, altKey: true });
    expect(adjustContentZoom).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it('does not act with no modifier held', () => {
    const event = dispatchKeyDown(document.body, { key: '=' });
    expect(adjustContentZoom).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it('does not act while a modal overlay is open', () => {
    isModalOverlayOpen.mockReturnValue(true);
    const event = dispatchKeyDown(document.body, { key: '=', ctrlKey: true });
    expect(adjustContentZoom).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it('leaves the key alone when nothing can zoom, so an unadapted pane does not swallow it', () => {
    canContentZoomAct.mockReturnValue(false);
    const event = dispatchKeyDown(document.body, { key: '=', ctrlKey: true });
    expect(adjustContentZoom).not.toHaveBeenCalled();
    expect(resetContentZoom).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it('does not ask whether anything can zoom for a key it would not act on anyway', () => {
    dispatchKeyDown(document.body, { key: 'k', ctrlKey: true });
    dispatchKeyDown(document.body, { key: '-', ctrlKey: true, shiftKey: true });
    expect(canContentZoomAct).not.toHaveBeenCalled();
  });

  it('acts even when a descendant stops propagation before the bubble phase', () => {
    const container = document.createElement('div');
    const child = document.createElement('div');
    container.appendChild(child);
    document.body.appendChild(container);
    // The reference box's book/chapter picker and the recent-searches list stop every keydown they
    // see, unconditionally, in exactly this shape.
    container.addEventListener('keydown', (e) => e.stopPropagation());
    const event = dispatchKeyDown(child, { key: '=', ctrlKey: true });
    expect(adjustContentZoom).toHaveBeenCalledWith(undefined, 1);
    expect(event.defaultPrevented).toBe(true);
    container.remove();
  });

  it('does not act when the event target is a web view iframe', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const event = dispatchKeyDown(iframe, { key: '=', ctrlKey: true });
    expect(adjustContentZoom).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
    iframe.remove();
  });

  it('does not act when the event target is inside an iframe', () => {
    const iframe = document.createElement('iframe');
    const inner = document.createElement('div');
    iframe.appendChild(inner);
    document.body.appendChild(iframe);
    const event = dispatchKeyDown(inner, { key: '=', ctrlKey: true });
    expect(adjustContentZoom).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
    iframe.remove();
  });

  it('does not act on an unrelated key with Ctrl held', () => {
    const event = dispatchKeyDown(document.body, { key: 'k', ctrlKey: true });
    expect(adjustContentZoom).not.toHaveBeenCalled();
    expect(resetContentZoom).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it('stops listening once the returned unsubscriber is called', () => {
    unsubscribe();
    const event = dispatchKeyDown(document.body, { key: '=', ctrlKey: true });
    expect(adjustContentZoom).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it('logs a rejected adjustContentZoom promise instead of letting it escape unhandled', async () => {
    adjustContentZoom.mockRejectedValueOnce(new Error('adjust failed'));
    dispatchKeyDown(document.body, { key: '=', ctrlKey: true });
    await vi.waitFor(() => expect(logger.warn).toHaveBeenCalled());
    expect(vi.mocked(logger.warn).mock.calls[0][0]).toContain('adjust failed');
  });
});
