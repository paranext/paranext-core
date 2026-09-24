// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useEffect, useReducer } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useResourceContentZoom } from './use-resource-content-zoom.hook';

const { mockSendCommand, mockWarn, mockUseSetting } = vi.hoisted(() => ({
  mockSendCommand: vi.fn(),
  mockWarn: vi.fn(),
  mockUseSetting: vi.fn(),
}));

vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand: mockSendCommand } },
  logger: { warn: mockWarn },
}));
vi.mock('@papi/frontend/react', () => ({
  useSetting: (...args: unknown[]) => mockUseSetting(...args),
}));

/**
 * Stands in for `WebViewProps['useWebViewState']`: every slot reads one shared state record, and
 * `writeState` plays the platform writing it, re-rendering every reader as the real hook does.
 */
function makeWebViewState(initial: Record<string, unknown>) {
  let webViewState = initial;
  const listeners = new Set<() => void>();
  function useFakeWebViewState<T>(
    key: string,
    defaultValue: T,
  ): [T, (value: T) => void, () => void] {
    const [, rerender] = useReducer((count: number) => count + 1, 0);
    useEffect(() => {
      listeners.add(rerender);
      return () => {
        listeners.delete(rerender);
      };
    }, []);
    // The record holds whatever the platform wrote under `key`; the real hook hands it back typed
    // as the caller's `T` the same way, with no runtime check.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const value = (key in webViewState ? webViewState[key] : defaultValue) as T;
    return [value, () => {}, () => {}];
  }
  const writeState = (next: Record<string, unknown>) => {
    webViewState = next;
    listeners.forEach((listener) => listener());
  };
  return { useFakeWebViewState, writeState };
}

function renderController(levels: Record<string, unknown> = {}) {
  const { useFakeWebViewState, writeState } = makeWebViewState({
    'platform.contentZoomLevels': levels,
  });
  const rendered = renderHook(() => useResourceContentZoom('wv-grid', useFakeWebViewState));
  return { ...rendered, writeState };
}

beforeEach(() => {
  vi.clearAllMocks();
  mockSendCommand.mockResolvedValue(undefined);
  mockUseSetting.mockReturnValue([1, vi.fn(), vi.fn(), false]);
});

describe('useResourceContentZoom', () => {
  it('reads a resource’s own level from the pane’s content zoom levels, by its area id', () => {
    const { result } = renderController({ 'resource-abc': 1.4 });
    expect(result.current.getZoom('ABC')).toBe(1.4);
    expect(result.current.hasOwnLevel('ABC')).toBe(true);
  });

  it('gives a resource without a level of its own the Tab content default zoom', () => {
    mockUseSetting.mockReturnValue([1.2, vi.fn(), vi.fn(), false]);
    const { result } = renderController({ 'resource-abc': 1.4 });
    expect(mockUseSetting).toHaveBeenCalledWith('platform.webViewContentZoom', 1);
    expect(result.current.getZoom('def')).toBe(1.2);
    expect(result.current.hasOwnLevel('def')).toBe(false);
  });

  it('follows the platform writing a new level', () => {
    const { result, writeState } = renderController();
    expect(result.current.getZoom('abc')).toBe(1);
    act(() => writeState({ 'platform.contentZoomLevels': { 'resource-abc': 1.7 } }));
    expect(result.current.getZoom('abc')).toBe(1.7);
    expect(result.current.hasOwnLevel('abc')).toBe(true);
  });

  it('treats an unreadable default setting as 100 %', () => {
    mockUseSetting.mockReturnValue([
      { platformErrorVersion: 1, message: 'settings not ready' },
      vi.fn(),
      vi.fn(),
      false,
    ]);
    const { result } = renderController();
    expect(result.current.getZoom('abc')).toBe(1);
  });

  it('ignores a stored level that is not a finite number', () => {
    mockUseSetting.mockReturnValue([1.3, vi.fn(), vi.fn(), false]);
    const { result } = renderController({ 'resource-abc': 'big', 'resource-def': Number.NaN });
    expect(result.current.getZoom('abc')).toBe(1.3);
    expect(result.current.hasOwnLevel('abc')).toBe(false);
    expect(result.current.getZoom('def')).toBe(1.3);
    expect(result.current.hasOwnLevel('def')).toBe(false);
  });

  it('ignores a stored level outside the zoom range, as the platform does', () => {
    mockUseSetting.mockReturnValue([1.3, vi.fn(), vi.fn(), false]);
    const { result } = renderController({ 'resource-abc': 0.4, 'resource-def': 3.1 });
    expect(result.current.getZoom('abc')).toBe(1.3);
    expect(result.current.hasOwnLevel('abc')).toBe(false);
    expect(result.current.getZoom('def')).toBe(1.3);
    expect(result.current.hasOwnLevel('def')).toBe(false);
  });

  it('treats a stored levels value that is not a map as no levels at all', () => {
    mockUseSetting.mockReturnValue([1.3, vi.fn(), vi.fn(), false]);
    // Web view state is JSON, so `null` is a value the stored map can really hold.
    // eslint-disable-next-line no-null/no-null
    const { useFakeWebViewState } = makeWebViewState({ 'platform.contentZoomLevels': null });
    const { result } = renderHook(() => useResourceContentZoom('wv-grid', useFakeWebViewState));
    expect(result.current.getZoom('abc')).toBe(1.3);
    expect(result.current.hasOwnLevel('abc')).toBe(false);
  });

  it('sends the platform’s zoom commands with the tab’s web view id and the resource’s area', () => {
    const { result } = renderController();
    act(() => {
      result.current.adjustZoom('ABC', 1);
      result.current.adjustZoom('ABC', -1);
      result.current.resetZoom('ABC');
    });
    expect(mockSendCommand.mock.calls).toEqual([
      ['platform.webViewContentZoomIn', 'wv-grid', 'resource-abc'],
      ['platform.webViewContentZoomOut', 'wv-grid', 'resource-abc'],
      ['platform.webViewContentZoomReset', 'wv-grid', 'resource-abc'],
    ]);
  });

  it('uses the pane-wide area for a resource whose id yields no area id', () => {
    const { result } = renderController({ 'text-collection': 1.5 });
    expect(result.current.getZoom('日本語')).toBe(1.5);
    act(() => result.current.adjustZoom('日本語', 1));
    expect(mockSendCommand).toHaveBeenLastCalledWith(
      'platform.webViewContentZoomIn',
      'wv-grid',
      'text-collection',
    );
  });

  it('logs a rejected command instead of throwing it into the menu', async () => {
    mockSendCommand.mockRejectedValueOnce(new Error('unknown area'));
    const { result } = renderController();
    expect(() => act(() => result.current.adjustZoom('abc', 1))).not.toThrow();
    await waitFor(() => expect(mockWarn).toHaveBeenCalledTimes(1));
    expect(String(mockWarn.mock.calls[0][0])).toContain('unknown area');
    expect(String(mockWarn.mock.calls[0][0])).toContain('resource-abc');
  });
});
