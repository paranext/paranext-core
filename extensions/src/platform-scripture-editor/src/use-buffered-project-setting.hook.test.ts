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
import { useBufferedProjectSetting } from './use-buffered-project-setting.hook';

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

describe('useBufferedProjectSetting', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    capturedHandler = undefined;
  });

  it('applies the raw value on mount', () => {
    const first = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'A', id: '1' }] };
    setRaw(first);
    const { result } = renderHook(() =>
      useBufferedProjectSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    expect(result.current[0]).toEqual(first);
  });

  it('does not lock in the loading placeholder — applies the value once it finishes loading', () => {
    const real = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'A', id: '1' }] };
    // Initial mount: still loading, so `useProjectSetting` returns the default placeholder.
    setRaw(DEFAULT, true);
    const { result, rerender } = renderHook(() =>
      useBufferedProjectSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
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
      useBufferedProjectSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
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
      useBufferedProjectSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
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
      useBufferedProjectSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    setRaw(second);
    rerender();
    act(() => capturedHandler?.({ projectId: 'other-proj' }));
    expect(result.current[0]).toEqual(first);
  });

  it('handles an undefined projectId without applying or throwing', () => {
    setRaw(DEFAULT);
    const { result } = renderHook(() =>
      useBufferedProjectSetting(undefined, 'platformScripture.modelTexts', DEFAULT),
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
      useBufferedProjectSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    expect(result.current[0]).toBe(error);
  });

  it('warns when projectId changes in place (the unsupported no-remount case)', () => {
    setRaw(DEFAULT);
    const { rerender } = renderHook(
      ({ pid }) => useBufferedProjectSetting(pid, 'platformScripture.modelTexts', DEFAULT),
      { initialProps: { pid: 'proj-1' } },
    );
    expect(vi.mocked(logger.warn)).not.toHaveBeenCalled();
    rerender({ pid: 'proj-2' });
    expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
  });

  it('does not warn on a stable projectId across rerenders', () => {
    setRaw(DEFAULT);
    const { rerender } = renderHook(() =>
      useBufferedProjectSetting('proj-1', 'platformScripture.modelTexts', DEFAULT),
    );
    rerender();
    rerender();
    expect(vi.mocked(logger.warn)).not.toHaveBeenCalled();
  });
});
