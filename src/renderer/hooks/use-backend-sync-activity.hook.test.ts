import { renderHook, act } from '@testing-library/react';
import {
  resetSyncActivity,
  setSyncActivity,
  setSyncActivityUnknown,
} from '@renderer/services/sync-activity-store';
import { useBackendSyncActivity } from './use-backend-sync-activity.hook';

describe('useBackendSyncActivity', () => {
  beforeEach(() => {
    resetSyncActivity();
  });

  it('reports no sync activity before any snapshot arrives', () => {
    const { result } = renderHook(() => useBackendSyncActivity());

    expect(result.current).toBe(false);
  });

  it('reports a sync the store already held when it mounts', () => {
    // The startup service seeds the store, so a renderer that comes up mid-sync has the answer
    // before this hook ever renders. `useSyncExternalStore` re-reads on subscribe, so a snapshot
    // that landed between the first render and the subscription cannot be missed either.
    setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });

    const { result } = renderHook(() => useBackendSyncActivity());

    expect(result.current).toBe(true);
  });

  it('reports a sync that starts while it is mounted', () => {
    const { result } = renderHook(() => useBackendSyncActivity());

    act(() => setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] }));

    expect(result.current).toBe(true);
  });

  it('stays true after the sync finishes, so the indicator survives to report the outcome', () => {
    // The latch. A gate on the live flag unmounts the sync indicator in the same commit the sync
    // ends: the terminal state is never painted, the live region never announces it, and the status
    // hook's seed loop is torn down mid-flight.
    const { result } = renderHook(() => useBackendSyncActivity());

    act(() => setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] }));
    expect(result.current).toBe(true);

    act(() => setSyncActivity({ isSyncing: false, projectIds: [] }));

    expect(result.current).toBe(true);
  });

  it('stays true when the signal stops being able to answer mid-sync', () => {
    // "Could not tell" is not evidence the sync ended, and its outcome is exactly what the indicator
    // still has to report.
    const { result } = renderHook(() => useBackendSyncActivity());

    act(() => setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] }));
    act(() => setSyncActivityUnknown());

    expect(result.current).toBe(true);
  });

  it('stays false for a session whose backend never reports a sync', () => {
    // Plain Platform.Bible: the backend emits one idle baseline per start and nothing else, so the
    // indicator must not appear on the strength of that.
    const { result } = renderHook(() => useBackendSyncActivity());

    act(() => setSyncActivity({ isSyncing: false, projectIds: [] }));
    act(() => setSyncActivityUnknown());

    expect(result.current).toBe(false);
  });

  it('unsubscribes on unmount', () => {
    const { result, unmount } = renderHook(() => useBackendSyncActivity());
    unmount();

    // Nothing should throw, and the unmounted hook keeps its last value rather than tracking on.
    act(() => setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] }));

    expect(result.current).toBe(false);
  });
});
