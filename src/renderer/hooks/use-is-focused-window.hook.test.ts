import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getIsThisWindowFocused,
  onDidChangeIsThisWindowFocused,
} from '@renderer/services/window.service-shard';
import { useIsFocusedWindow } from './use-is-focused-window.hook';

vi.mock('@renderer/services/window.service-shard', () => ({
  getIsThisWindowFocused: vi.fn(),
  onDidChangeIsThisWindowFocused: vi.fn(),
}));

describe('useIsFocusedWindow', () => {
  /** The listener the hook registers, captured so tests can drive a change. */
  let storeListener: ((newValue: boolean) => void) | undefined;
  let unsub: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    storeListener = undefined;
    unsub = vi.fn();
    vi.mocked(onDidChangeIsThisWindowFocused).mockImplementation((listener) => {
      storeListener = listener;
      return unsub;
    });
    vi.mocked(getIsThisWindowFocused).mockReturnValue(false);
  });

  it('returns the current focused state', () => {
    vi.mocked(getIsThisWindowFocused).mockReturnValue(true);
    const { result } = renderHook(() => useIsFocusedWindow());
    expect(result.current).toBe(true);
  });

  it('returns false when this window is not the focused one', () => {
    vi.mocked(getIsThisWindowFocused).mockReturnValue(false);
    const { result } = renderHook(() => useIsFocusedWindow());
    expect(result.current).toBe(false);
  });

  it('reactively updates when the store notifies a change', () => {
    vi.mocked(getIsThisWindowFocused).mockReturnValue(false);
    const { result } = renderHook(() => useIsFocusedWindow());
    expect(result.current).toBe(false);

    vi.mocked(getIsThisWindowFocused).mockReturnValue(true);
    act(() => {
      if (!storeListener) throw new Error('store listener not registered');
      storeListener(true);
    });
    expect(result.current).toBe(true);
  });

  it('unsubscribes from the store on unmount', () => {
    const { unmount } = renderHook(() => useIsFocusedWindow());
    expect(onDidChangeIsThisWindowFocused).toHaveBeenCalledTimes(1);
    unmount();
    expect(unsub).toHaveBeenCalledTimes(1);
  });
});
