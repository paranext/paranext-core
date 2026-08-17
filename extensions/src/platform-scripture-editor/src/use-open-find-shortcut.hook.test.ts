// @vitest-environment jsdom
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOpenFindShortcut } from './use-open-find-shortcut.hook';

// Hoisted so the vi.mock factory below can reference them (the factory is hoisted above imports).
const { sendCommand, warn } = vi.hoisted(() => ({
  sendCommand: vi.fn().mockResolvedValue(undefined),
  warn: vi.fn(),
}));
vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand } },
  logger: { warn },
}));

function pressKey(key: string, ctrlKey = true) {
  window.dispatchEvent(new KeyboardEvent('keydown', { key, ctrlKey }));
}

describe('useOpenFindShortcut', () => {
  beforeEach(() => {
    sendCommand.mockClear();
    warn.mockClear();
  });

  it('opens Find for the displayed resource on Ctrl+F', () => {
    renderHook(() => useOpenFindShortcut('wv-1', 'resource-proj'));
    pressKey('f');
    expect(sendCommand).toHaveBeenCalledWith(
      'platformScripture.openFind',
      'wv-1',
      expect.any(String),
      'resource-proj',
    );
  });

  it('is a no-op while no resource is displayed', () => {
    renderHook(() => useOpenFindShortcut('wv-1', undefined));
    pressKey('f');
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('ignores keys other than Ctrl+F', () => {
    renderHook(() => useOpenFindShortcut('wv-1', 'resource-proj'));
    pressKey('g');
    pressKey('f', false);
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('removes the keydown listener on unmount', () => {
    const { unmount } = renderHook(() => useOpenFindShortcut('wv-1', 'resource-proj'));
    unmount();
    pressKey('f');
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('trims the selection so a double-click trailing space does not narrow the search', () => {
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
