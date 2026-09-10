// @vitest-environment jsdom
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOpenFindShortcut } from './use-open-find-shortcut.hook';

// Hoisted so the vi.mock factory below can reference them (the factory is hoisted above imports).
const { sendCommand, warn, debug } = vi.hoisted(() => ({
  sendCommand: vi.fn().mockResolvedValue(undefined),
  warn: vi.fn(),
  debug: vi.fn(),
}));
vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand } },
  logger: { warn, debug },
}));

/** Dispatch a keydown and report whether anything called `preventDefault` on it. */
function pressKey(key: string, ctrlKey = true, extraModifiers: KeyboardEventInit = {}) {
  const event = new KeyboardEvent('keydown', {
    key,
    ctrlKey,
    cancelable: true,
    ...extraModifiers,
  });
  window.dispatchEvent(event);
  return event.defaultPrevented;
}

describe('useOpenFindShortcut', () => {
  beforeEach(() => {
    sendCommand.mockClear();
    warn.mockClear();
    debug.mockClear();
  });

  it('opens Find for the tab’s scripture on Ctrl+F', () => {
    renderHook(() => useOpenFindShortcut('wv-1', 'resource-proj'));
    expect(pressKey('f')).toBe(true);
    expect(sendCommand).toHaveBeenCalledWith(
      'platformScripture.openFind',
      'wv-1',
      expect.any(String),
      'resource-proj',
    );
  });

  it('logs and leaves the keystroke alone while no scripture is resolved', () => {
    renderHook(() => useOpenFindShortcut('wv-1', undefined));
    // Not swallowed: Find never goes silent, and the reason is diagnosable in the log.
    expect(pressKey('f')).toBe(false);
    expect(sendCommand).not.toHaveBeenCalled();
    expect(debug).toHaveBeenCalled();
  });

  it('ignores keys other than Ctrl+F', () => {
    renderHook(() => useOpenFindShortcut('wv-1', 'resource-proj'));
    pressKey('g');
    pressKey('f', false);
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('leaves Ctrl+F combined with another modifier for whoever binds it', () => {
    // The hook runs in every scripture tab, so a loose match would swallow these app-wide.
    renderHook(() => useOpenFindShortcut('wv-1', 'resource-proj'));
    expect(pressKey('f', true, { shiftKey: true })).toBe(false);
    expect(pressKey('f', true, { altKey: true })).toBe(false);
    expect(pressKey('f', true, { metaKey: true })).toBe(false);
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('removes the keydown listener on unmount', () => {
    const { unmount } = renderHook(() => useOpenFindShortcut('wv-1', 'resource-proj'));
    unmount();
    pressKey('f');
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('trims the selection so a double-click trailing space does not narrow the search', () => {
    // This hook is the single Ctrl+F implementation for every scripture tab type, so trimming here
    // covers the Scripture editor as well as the read-only reference panels.
    // Only toString() is exercised by the hook; a full Selection cannot be constructed here.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const fakeSelection = { toString: () => 'grace ' } as unknown as Selection;
    vi.spyOn(window, 'getSelection').mockReturnValue(fakeSelection);
    renderHook(() => useOpenFindShortcut('wv-1', 'resource-proj'));
    pressKey('f');
    expect(sendCommand).toHaveBeenCalledWith(
      'platformScripture.openFind',
      'wv-1',
      'grace',
      'resource-proj',
    );
    vi.restoreAllMocks();
  });
});
