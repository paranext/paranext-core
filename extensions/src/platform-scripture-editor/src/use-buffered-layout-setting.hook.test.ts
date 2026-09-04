// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  newPlatformError,
  type PlatformError,
  type PlatformEventHandler,
} from 'platform-bible-utils';
import { logger } from '@papi/frontend';
import { useProjectDataProviderState, useProjectSetting } from '@papi/frontend/react';
import { useEvent } from 'platform-bible-react';
import { useBufferedLayoutSetting } from './use-buffered-layout-setting.hook';

vi.mock('@papi/frontend/react', () => ({
  useProjectSetting: vi.fn(),
  useProjectDataProviderState: vi.fn(),
}));
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
const mockUseProjectDataProviderState = vi.mocked(useProjectDataProviderState);

/** A stable stand-in provider; identity must not change per render or the gate cannot be tested. */
const A_PROVIDER = { forProject: 'proj-1' };
const B_PROVIDER = { forProject: 'proj-2' };

/** Serves a provider as `ready`, or `undefined` as `loading` (an unresolved lookup). */
function setProvider(pdp: object | undefined) {
  mockUseProjectDataProviderState.mockReturnValue(
    // The mock only needs the discriminant and payload the hook reads.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    (pdp ? { status: 'ready', networkObject: pdp } : { status: 'loading' }) as never,
  );
}
const DEFAULT = { dataVersion: '1.0.0', items: [] };

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
    vi.clearAllMocks();
    capturedHandler = undefined;
    setProvider(A_PROVIDER);
  });

  it('applies the raw value on mount', () => {
    const first = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'A', id: '1' }] };
    setRaw(first);
    const { result } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    expect(result.current[0]).toEqual(first);
  });

  it('does not lock in the loading placeholder — applies the value once it finishes loading', () => {
    const real = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'A', id: '1' }] };
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

  it('holds a later raw change until re-armed', () => {
    const first = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'A', id: '1' }] };
    const second = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'B', id: '2' }] };
    setRaw(first);
    const { result, rerender } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    setRaw(second);
    rerender();
    expect(result.current[0]).toEqual(first);
  });

  it('applies the raw value when the re-arm event fires for the matching project', () => {
    const first = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'A', id: '1' }] };
    const second = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'B', id: '2' }] };
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
    const first = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'A', id: '1' }] };
    const second = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'B', id: '2' }] };
    setRaw(first);
    const { result, rerender } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    setRaw(second);
    rerender();
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
    const other = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'X', id: '9' }] };
    setRaw(other);
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
    const real = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'A', id: '1' }] };

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
    const real = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'A', id: '1' }] };
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

  it('does not warn on a stable projectId across rerenders', () => {
    setRaw(DEFAULT);
    const { rerender } = renderHook(() =>
      useBufferedLayoutSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    rerender();
    rerender();
    expect(vi.mocked(logger.warn)).not.toHaveBeenCalled();
  });

  it('drops the outgoing project’s value when projectId changes in place', () => {
    const projectOneValue = {
      dataVersion: '1.0.0',
      items: [{ type: 'project', name: 'A', id: '1' }],
    };
    setRaw(projectOneValue);
    const { result, rerender } = renderHook(
      ({ pid }) => useBufferedLayoutSetting(pid, 'platformScripture.modelTexts', DEFAULT),
      { initialProps: { pid: 'proj-1' } },
    );
    expect(result.current[0]).toEqual(projectOneValue);

    // The switching commit, with the timing the real stack produces: the provider for the incoming
    // project has not resolved, while the setting still reports proj-1's value as settled (it
    // raises `isLoading` from an effect, a commit later). Re-applying it here is the trap.
    setProvider(undefined);
    rerender({ pid: 'proj-2' });

    expect(result.current[0]).toEqual(DEFAULT);
    expect(result.current[1]).toBe(true);
  });

  it('applies the incoming project’s value once its provider resolves and it loads', () => {
    const projectTwoValue = {
      dataVersion: '1.0.0',
      items: [{ type: 'project', name: 'B', id: '2' }],
    };
    setRaw({ dataVersion: '1.0.0', items: [{ type: 'project', name: 'A', id: '1' }] });
    const { result, rerender } = renderHook(
      ({ pid }) => useBufferedLayoutSetting(pid, 'platformScripture.modelTexts', DEFAULT),
      { initialProps: { pid: 'proj-1' } },
    );

    setProvider(undefined);
    rerender({ pid: 'proj-2' });
    setProvider(B_PROVIDER);
    setRaw(DEFAULT, true);
    rerender({ pid: 'proj-2' });
    setRaw(projectTwoValue);
    rerender({ pid: 'proj-2' });

    expect(result.current[0]).toEqual(projectTwoValue);
  });

  it('applies the incoming value even when the setting was already loading at the switch', () => {
    // The grid's ordinary startup: the scroll group stamps a project in place (`undefined` ->
    // 'proj-1') while the setting is still loading, so `isLoading` never transitions again. Gating
    // on a flag that waits for that transition would pin the held copy on the placeholder forever.
    const value = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'A', id: '1' }] };
    const initialProps: { pid: string | undefined } = { pid: undefined };
    setProvider(undefined);
    setRaw(DEFAULT, true);
    const { result, rerender } = renderHook(
      ({ pid }: { pid: string | undefined }) =>
        useBufferedLayoutSetting(pid, 'platformScripture.modelTexts', DEFAULT),
      { initialProps },
    );

    setProvider(A_PROVIDER);
    rerender({ pid: 'proj-1' });
    setRaw(value);
    rerender({ pid: 'proj-1' });

    expect(result.current[0]).toEqual(value);
  });
});
