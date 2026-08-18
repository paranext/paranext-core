import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  isProjectBlocked,
  subscribeToAutoSyncBlocking,
} from '@renderer/services/auto-sync-blocking-store';
import { useIsProjectAutoSyncBlocked } from './use-is-project-auto-sync-blocked.hook';

vi.mock('@renderer/services/auto-sync-blocking-store', () => ({
  isProjectBlocked: vi.fn(),
  subscribeToAutoSyncBlocking: vi.fn(),
}));

describe('useIsProjectAutoSyncBlocked', () => {
  /** The store listener the hook registers, captured so tests can drive a change. */
  let storeListener: (() => void) | undefined;
  let unsub: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    storeListener = undefined;
    unsub = vi.fn();
    vi.mocked(subscribeToAutoSyncBlocking).mockImplementation((listener) => {
      storeListener = listener;
      return unsub;
    });
    vi.mocked(isProjectBlocked).mockReturnValue(false);
  });

  it('returns true when the given project is blocked', () => {
    vi.mocked(isProjectBlocked).mockImplementation((id) => id === 'projA');
    const { result } = renderHook(() => useIsProjectAutoSyncBlocked('projA'));
    expect(result.current).toBe(true);
    expect(isProjectBlocked).toHaveBeenCalledWith('projA');
  });

  it('returns false for a project that is not blocked', () => {
    vi.mocked(isProjectBlocked).mockImplementation((id) => id === 'projA');
    const { result } = renderHook(() => useIsProjectAutoSyncBlocked('projB'));
    expect(result.current).toBe(false);
  });

  it('returns false for an undefined project id', () => {
    const { result } = renderHook(() => useIsProjectAutoSyncBlocked(undefined));
    expect(result.current).toBe(false);
  });

  it('reactively updates when the store notifies a change', () => {
    vi.mocked(isProjectBlocked).mockReturnValue(false);
    const { result } = renderHook(() => useIsProjectAutoSyncBlocked('projA'));
    expect(result.current).toBe(false);

    // The project becomes blocked; the store fires its listener → the hook re-reads the snapshot.
    vi.mocked(isProjectBlocked).mockReturnValue(true);
    act(() => {
      if (!storeListener) throw new Error('store listener not registered');
      storeListener();
    });
    expect(result.current).toBe(true);
  });

  it('unsubscribes from the store on unmount', () => {
    const { unmount } = renderHook(() => useIsProjectAutoSyncBlocked('projA'));
    expect(subscribeToAutoSyncBlocking).toHaveBeenCalledTimes(1);
    unmount();
    expect(unsub).toHaveBeenCalledTimes(1);
  });
});
