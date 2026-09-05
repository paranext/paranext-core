// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  newPlatformError,
  type PlatformError,
  type PlatformEventHandler,
} from 'platform-bible-utils';
import { logger } from '@papi/frontend';
import { useProjectSetting } from '@papi/frontend/react';
import { useEvent } from 'platform-bible-react';
import { useBufferedLayoutSetting } from './use-buffered-layout-setting.hook';
import { CURRENT_DATA_VERSION } from './resource-reference-list.const';

vi.mock('@papi/frontend/react', () => ({ useProjectSetting: vi.fn() }));
vi.mock('@papi/frontend', () => ({
  default: { network: { getNetworkEvent: vi.fn(() => 'event-token') } },
  logger: { warn: vi.fn() },
}));

// Capture the useEvent handler so the test can fire the re-arm event on demand.
let capturedHandler: PlatformEventHandler<{ projectId: string }> | undefined;
vi.mock('platform-bible-react', () => ({
  useEvent: vi.fn((_event, handler) => {
    capturedHandler = handler;
  }),
}));

const mockUseProjectSetting = vi.mocked(useProjectSetting);

// This hook never inspects the setting's contents, so these fixtures only need to be distinguishable
// from one another. They take their version from the production constant anyway, so they cannot
// drift into describing a shape the app no longer writes.
const DEFAULT = { dataVersion: CURRENT_DATA_VERSION, items: [] };

/** A settings value holding one entry, for distinguishing one project's value from another's. */
const oneProjectList = (name: string, id: string) => ({
  dataVersion: CURRENT_DATA_VERSION,
  items: [{ type: 'project', name, id }],
});

/**
 * Set the value the mocked `useProjectSetting` returns. `isLoading` defaults to `false` (the
 * settled state); pass `true` to simulate the initial loading phase before the real value arrives.
 */
const setRaw = (value: unknown, isLoading = false) =>
  // `useProjectSetting`'s real return type is a specific setting-typed tuple; the mock only needs
  // to satisfy the hook's destructuring shape `[setting, setSetting, resetSetting, isLoading]`, so
  // cast the test-only tuple to `never` rather than reconstructing the full generic setter types.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  mockUseProjectSetting.mockReturnValue([value, undefined, undefined, isLoading] as never);

describe('useBufferedLayoutSetting', () => {
  beforeEach(() => {
    // Reset rather than clear: `clearAllMocks` leaves `mockReturnValue` in place, so a test that
    // forgot `setRaw` would silently inherit the previous test's raw value. `mockReset` restores
    // the implementations passed to `vi.fn(impl)` above, so the handler capture survives.
    vi.resetAllMocks();
    capturedHandler = undefined;
  });

  // The held copy is seeded from the raw value by `useState`, so a settled mount returns it whether
  // or not the apply effect runs. That the effect runs is pinned by `does not lock in the loading
  // placeholder`; that it then disarms, by `holds a later raw change until re-armed`.
  it('returns the settled value it mounted with', () => {
    const first = oneProjectList('A', '1');
    setRaw(first);
    const { result } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    expect(result.current[0]).toEqual(first);
  });

  it('does not lock in the loading placeholder — applies the value once it finishes loading', () => {
    const real = oneProjectList('A', '1');
    // Initial mount: still loading, so `useProjectSetting` returns the default placeholder.
    setRaw(DEFAULT, true);
    const { result, rerender } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    // The subscription resolves: the real value arrives and loading finishes.
    setRaw(real, false);
    rerender();
    expect(result.current[0]).toEqual(real);
  });

  it('reports the provider loading state independently of the buffer', () => {
    const real = oneProjectList('A', '1');
    setRaw(DEFAULT, true);
    const { result, rerender } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    expect(result.current[1]).toBe(true);

    setRaw(real, false);
    rerender();
    expect(result.current[1]).toBe(false);

    // A re-read reports loading again even though the buffer has disarmed and goes on serving the
    // held value. Consumers drive their load window off this channel; what they show meanwhile is
    // theirs to decide — both current ones replace their content rather than keep rendering it.
    setRaw(DEFAULT, true);
    rerender();
    expect(result.current[1]).toBe(true);
    expect(result.current[0]).toEqual(real);
  });

  it('holds a later raw change until re-armed', () => {
    const first = oneProjectList('A', '1');
    const second = oneProjectList('B', '2');
    setRaw(first);
    const { result, rerender } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    setRaw(second);
    rerender();
    expect(result.current[0]).toEqual(first);
  });

  it('applies the raw value when the re-arm event fires for the matching project', () => {
    const first = oneProjectList('A', '1');
    const second = oneProjectList('B', '2');
    setRaw(first);
    const { result, rerender } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    // Subscribing to the re-arm event is what makes this apply possible.
    expect(vi.mocked(useEvent)).toHaveBeenCalled();
    setRaw(second);
    rerender();
    act(() => capturedHandler?.({ projectId: 'proj-1' }));
    expect(result.current[0]).toEqual(second);
  });

  it('ignores the re-arm event for a different project', () => {
    const first = oneProjectList('A', '1');
    const second = oneProjectList('B', '2');
    setRaw(first);
    const { result, rerender } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    setRaw(second);
    rerender();
    // Guarded because the assertion below is a negative: a broken capture would make the event a
    // no-op and the test would pass without ever exercising the mismatched-project branch.
    expect(capturedHandler).toBeDefined();
    act(() => capturedHandler?.({ projectId: 'other-proj' }));
    expect(result.current[0]).toEqual(first);
  });

  it('handles an undefined projectId without applying or throwing', () => {
    setRaw(DEFAULT);
    const { result } = renderHook(() =>
      useBufferedLayoutSetting(undefined, 'platformScripture.modelTexts', DEFAULT),
    );
    expect(result.current[0]).toEqual(DEFAULT);
    // A re-arm event for some real project must not affect an undefined-projectId hold.
    const other = oneProjectList('X', '9');
    setRaw(other);
    expect(capturedHandler).toBeDefined();
    act(() => capturedHandler?.({ projectId: 'proj-1' }));
    expect(result.current[0]).toEqual(DEFAULT);
  });

  it('passes a held PlatformError value through unchanged', () => {
    const error: PlatformError = newPlatformError('boom');
    setRaw(error);
    const { result } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    expect(result.current[0]).toBe(error);
  });

  it('stays armed through a read error so a later real value still lands', () => {
    const error: PlatformError = newPlatformError('boom');
    const real = oneProjectList('A', '1');

    // Mount while the setting is still loading, so nothing is latched yet.
    setRaw(DEFAULT, true);
    const { result, rerender } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );

    // The setting resolves to a read error. Applying it and disarming here is what made the
    // failure permanent: only an unrelated `onSharedLayoutApply` could ever re-arm the hook.
    setRaw(error);
    rerender();

    // The setting becomes readable. The real value must land on its own — no re-arm event.
    setRaw(real);
    rerender();

    expect(result.current[0]).toEqual(real);
  });

  it('reports the error while the setting is unreadable and nothing has been applied yet', () => {
    const error: PlatformError = newPlatformError('boom');

    setRaw(DEFAULT, true);
    const { result, rerender } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );

    setRaw(error);
    rerender();

    // The held copy is still the placeholder here, so this channel is the ONLY way a consumer can
    // tell "unreadable" from "configured with nothing" — `useTextCollectionSources` and
    // `useEffectiveResourceReferenceList` both depend on it.
    expect(result.current[2]).toBe(error);
  });

  it('keeps an applied value and reports no error when a later read fails', () => {
    const real = oneProjectList('A', '1');
    const error: PlatformError = newPlatformError('boom');

    setRaw(DEFAULT, true);
    const { result, rerender } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );

    setRaw(real);
    rerender();
    expect(result.current[0]).toEqual(real);

    // A read fails AFTER a real value was applied. Holding a good value across a failed re-read is
    // the whole point of the buffer, so the panel must keep showing it rather than swap working
    // content for an error message.
    setRaw(error);
    rerender();

    expect(result.current[0]).toEqual(real);
    expect(result.current[2]).toBeUndefined();
  });

  it('warns when projectId changes in place (the unsupported no-remount case)', () => {
    setRaw(DEFAULT);
    const { rerender } = renderHook(
      ({ pid }) => useBufferedLayoutSetting(pid, 'platformScripture.modelTexts', DEFAULT),
      { initialProps: { pid: 'proj-1' } },
    );
    expect(vi.mocked(logger.warn)).not.toHaveBeenCalled();
    rerender({ pid: 'proj-2' });
    expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
  });

  it('does not warn on a stable projectId across rerenders', () => {
    setRaw(DEFAULT);
    const { rerender } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    rerender();
    rerender();
    expect(vi.mocked(logger.warn)).not.toHaveBeenCalled();
  });

  // The tripwire above only warns; the next two cover what happens to the held value, which is why
  // it warns. The hook disarms after its first apply, so an in-place project change keeps serving
  // the previous project's value until a re-arm for the incoming one arrives. A consumer that
  // switches in place must therefore re-arm or reset its own held state. The two differ only by
  // that re-arm, so read them together.
  it('holds the previous project value when projectId changes in place with no re-arm', () => {
    const first = oneProjectList('A', '1');
    const second = oneProjectList('B', '2');
    setRaw(first);
    const { result, rerender } = renderHook(
      ({ pid }) => useBufferedLayoutSetting(pid, 'platformScripture.modelTexts', DEFAULT),
      { initialProps: { pid: 'proj-1' } },
    );
    expect(result.current[0]).toEqual(first);

    // The incoming project's provider subscribes: briefly loading, then its own value arrives.
    setRaw(DEFAULT, true);
    rerender({ pid: 'proj-2' });
    setRaw(second, false);
    rerender({ pid: 'proj-2' });

    // Positive control: this assertion restates the one above, so on its own it would also pass if
    // the projectId change had never reached the hook. The tripwire firing proves it did, and that
    // the old value was held anyway. (The companion test below shows `second` is reachable through
    // the same setup, which is what rules out the second `setRaw` having gone nowhere.)
    expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toEqual(first);
  });

  // The other half of the same contract: `hasAppliedRealValue` is set once and never reset, so an
  // unreadable setting on the incoming project is not reported either. The consumer sees the
  // outgoing project's value with no error to tell it apart from a healthy read.
  it('reports no error for the incoming project when projectId changes in place', () => {
    const first = oneProjectList('A', '1');
    const error: PlatformError = newPlatformError('boom');
    setRaw(first);
    const { result, rerender } = renderHook(
      ({ pid }) => useBufferedLayoutSetting(pid, 'platformScripture.modelTexts', DEFAULT),
      { initialProps: { pid: 'proj-1' } },
    );
    expect(result.current[2]).toBeUndefined();

    setRaw(error);
    rerender({ pid: 'proj-2' });

    expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
    expect(result.current[2]).toBeUndefined();
    expect(result.current[0]).toEqual(first);
  });

  // The tripwire is coarser than the defect it looks for: it fires on any in-place change, but a
  // change that lands while the hook is still armed applies the incoming value correctly. A warning
  // on its own is therefore not evidence of staleness — the hook has to have disarmed first.
  it('warns but still applies the incoming value when the change lands while armed', () => {
    const second = oneProjectList('B', '2');
    setRaw(DEFAULT, true);
    const { result, rerender } = renderHook(
      ({ pid }) => useBufferedLayoutSetting(pid, 'platformScripture.modelTexts', DEFAULT),
      { initialProps: { pid: 'proj-1' } },
    );

    // Switch before anything has applied, so `shouldApply` is still true.
    setRaw(second, false);
    rerender({ pid: 'proj-2' });

    expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toEqual(second);
  });

  it('applies the new project value when a re-arm follows an in-place change', () => {
    const first = oneProjectList('A', '1');
    const second = oneProjectList('B', '2');
    setRaw(first);
    const { result, rerender } = renderHook(
      ({ pid }) => useBufferedLayoutSetting(pid, 'platformScripture.modelTexts', DEFAULT),
      { initialProps: { pid: 'proj-1' } },
    );
    expect(result.current[0]).toEqual(first);

    setRaw(DEFAULT, true);
    rerender({ pid: 'proj-2' });
    setRaw(second, false);
    rerender({ pid: 'proj-2' });
    // Guard the capture: without it a broken `useEvent` mock would make the re-arm a silent no-op
    // and this test would fail as though the hook were at fault.
    expect(capturedHandler).toBeDefined();
    act(() => capturedHandler?.({ projectId: 'proj-2' }));

    expect(result.current[0]).toEqual(second);
  });

  // An unbound consumer — a panel opened from the default layout, whose tab carries no projectId —
  // has no data provider, so nothing delivers and `isLoading` stays true, which keeps the hook armed
  // (`create-use-data-hook.util.ts`; supplied by the mock here, so this test pins the hook's
  // response to it rather than the premise). That is what makes it safe to supply a project after
  // mount rather than at it, and this is the only test that reaches the tripwire's `!== undefined`
  // branch.
  it('stays armed while unbound so a projectId arriving later still applies', () => {
    const arrived = oneProjectList('A', '1');
    setRaw(DEFAULT, true);
    // Annotated because `renderHook` infers its props type from this value; `{ pid: undefined }`
    // alone would fix `pid` at `undefined` and reject the rerender below.
    const initialProps: { pid: string | undefined } = { pid: undefined };
    const { result, rerender } = renderHook(
      ({ pid }) => useBufferedLayoutSetting(pid, 'platformScripture.modelTexts', DEFAULT),
      { initialProps },
    );
    expect(result.current[0]).toEqual(DEFAULT);

    setRaw(arrived, false);
    rerender({ pid: 'proj-1' });

    expect(result.current[0]).toEqual(arrived);
    // Binding an unbound consumer is a supported transition, so the tripwire's `!== undefined`
    // guard must stay quiet for it — this is the only test that reaches that branch.
    expect(vi.mocked(logger.warn)).not.toHaveBeenCalled();
  });
});
