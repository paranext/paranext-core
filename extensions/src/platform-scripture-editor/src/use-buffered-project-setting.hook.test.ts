// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { PlatformEventHandler } from 'platform-bible-utils';
import { useProjectSetting } from '@papi/frontend/react';
import { useEvent } from 'platform-bible-react';
import { useBufferedProjectSetting } from './use-buffered-project-setting.hook';

vi.mock('@papi/frontend/react', () => ({ useProjectSetting: vi.fn() }));
vi.mock('@papi/frontend', () => ({
  default: { network: { getNetworkEvent: vi.fn(() => 'event-token') } },
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

const setRaw = (value: unknown) =>
  // `useProjectSetting`'s real return type is a specific setting-typed tuple; the mock only needs
  // to satisfy the hook's destructuring shape `[setting, setSetting, resetSetting, isLoading]`, so
  // cast the test-only tuple to `never` rather than reconstructing the full generic setter types.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  mockUseProjectSetting.mockReturnValue([value, undefined, undefined, false] as never);

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

  it('re-applies when projectId changes', () => {
    const first = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'A', id: '1' }] };
    const second = { dataVersion: '1.0.0', items: [{ type: 'project', name: 'B', id: '2' }] };
    setRaw(first);
    const { result, rerender } = renderHook(
      ({ pid }) => useBufferedProjectSetting(pid, 'platformScripture.modelTexts', DEFAULT),
      { initialProps: { pid: 'proj-1' } },
    );
    setRaw(second);
    rerender({ pid: 'proj-2' });
    expect(result.current[0]).toEqual(second);
  });

  it('subscribes to the re-arm event', () => {
    setRaw(DEFAULT);
    renderHook(() => useBufferedProjectSetting('proj-1', 'platformScripture.modelTexts', DEFAULT));
    expect(vi.mocked(useEvent)).toHaveBeenCalled();
  });
});
