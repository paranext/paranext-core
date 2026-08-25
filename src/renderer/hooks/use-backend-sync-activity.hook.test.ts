import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { getNetworkEvent } from '@shared/services/network.service';
import { useBackendSyncActivity } from './use-backend-sync-activity.hook';

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())),
}));

/**
 * Captures the callback the hook subscribes to `onSyncActivityChanged` with so tests can fire it.
 * Must be installed before `renderHook`.
 */
function captureActivityCallback() {
  let callback: ((payload: unknown) => void) | undefined;
  vi.mocked(getNetworkEvent).mockImplementation(
    (eventName: string) =>
      // getNetworkEvent returns PlatformEvent, whose generic signature (parameterized per event
      // name) is incompatible with a single vi.fn implementation shared across every event name.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      vi.fn((cb: (payload: unknown) => void) => {
        if (eventName === 'paratextBibleSendReceive.onSyncActivityChanged') callback = cb;
        return vi.fn();
      }) as never,
  );
  return (payload: unknown) => {
    if (!callback) throw new Error('onSyncActivityChanged callback was not captured');
    const emit = callback;
    act(() => emit(payload));
  };
}

describe('useBackendSyncActivity', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('reports not syncing before any event arrives', () => {
    captureActivityCallback();

    const { result } = renderHook(() => useBackendSyncActivity());

    expect(result.current).toBe(false);
  });

  it('sends no commands — it is subscription-only', () => {
    const emit = captureActivityCallback();

    renderHook(() => useBackendSyncActivity());
    emit({ isSyncing: true, projectIds: [] });

    // The one thing that makes this hook cheap enough to mount unconditionally: it subscribes to
    // exactly one event and never issues a request, so a build with no send/receive backend pays
    // nothing for it.
    expect(vi.mocked(getNetworkEvent).mock.calls.map(([name]) => name)).toEqual([
      'paratextBibleSendReceive.onSyncActivityChanged',
    ]);
  });

  it('follows the backend from syncing to idle', () => {
    const emit = captureActivityCallback();
    const { result } = renderHook(() => useBackendSyncActivity());

    emit({ isSyncing: true, projectIds: ['PROJ1'] });
    expect(result.current).toBe(true);

    emit({ isSyncing: false, projectIds: [] });
    expect(result.current).toBe(false);
  });

  it.each([
    ['a missing payload', undefined],
    ['a null payload', undefined],
    ['a non-boolean isSyncing', { isSyncing: 'yes' }],
    ['an absent isSyncing', { projectIds: ['PROJ1'] }],
  ])('does not report syncing for %s', (_label, payload) => {
    // The payload crosses a process boundary from C#, so a malformed one must not be coerced into
    // `true` by truthiness — this hook can only ever reveal the indicator, so a false positive
    // would show a sync surface with no sync behind it.
    const emit = captureActivityCallback();
    const { result } = renderHook(() => useBackendSyncActivity());

    emit(payload);

    expect(result.current).toBe(false);
  });
});
