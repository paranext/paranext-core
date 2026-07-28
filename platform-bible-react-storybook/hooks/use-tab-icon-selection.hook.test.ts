import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  pickTabIconUrl,
  useTabIconSelection,
  type TabIconUrls,
} from './use-tab-icon-selection.hook';

const URLS: TabIconUrls = {
  dark: 'papi-extension://ext/assets/icon-dark.svg',
  lightSelected: 'papi-extension://ext/assets/icon-selected.svg',
  lightUnselected: 'papi-extension://ext/assets/icon-unselected.svg',
  lightDefault: 'papi-extension://ext/assets/icon.svg',
};

describe('pickTabIconUrl', () => {
  it('always returns the dark variant in dark theme, regardless of selection', () => {
    expect(pickTabIconUrl(true, true, URLS)).toBe(URLS.dark);
    expect(pickTabIconUrl(true, false, URLS)).toBe(URLS.dark);
    expect(pickTabIconUrl(true, undefined, URLS)).toBe(URLS.dark);
  });

  it('returns lightSelected/lightUnselected/lightDefault by selection state in light theme', () => {
    expect(pickTabIconUrl(false, true, URLS)).toBe(URLS.lightSelected);
    expect(pickTabIconUrl(false, false, URLS)).toBe(URLS.lightUnselected);
    expect(pickTabIconUrl(false, undefined, URLS)).toBe(URLS.lightDefault);
  });
});

// jsdom has no IntersectionObserver; stub it capturing the callback so tests can simulate
// selection changes (same pattern as use-view-visibility.hook.test.ts, which this hook now
// delegates its detection to — rc-dock renders exactly one tab's pane at a time, so "my pane is
// visible" and "I'm the selected tab" are the same condition).
type MinimalIntersectionCallback = (entries: { isIntersecting: boolean }[]) => void;

let intersectionCallback: MinimalIntersectionCallback | undefined;
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  intersectionCallback = undefined;
  mockObserve.mockClear();
  mockDisconnect.mockClear();
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn((callback: MinimalIntersectionCallback) => {
      intersectionCallback = callback;
      return { observe: mockObserve, disconnect: mockDisconnect };
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

/** Simulates the observer reporting a selection (visibility) change */
function simulateSelectionChange(isSelected: boolean) {
  act(() => {
    intersectionCallback?.([{ isIntersecting: isSelected }]);
  });
}

describe('useTabIconSelection', () => {
  it('resolves to lightUnselected by default (jsdom reports zero geometry, so the tab starts not-selected)', () => {
    const { result } = renderHook(() => useTabIconSelection(false, URLS));
    expect(result.current).toBe(URLS.lightUnselected);
  });

  it('resolves to lightSelected once the tab becomes the active/visible one', () => {
    const { result } = renderHook(() => useTabIconSelection(false, URLS));
    simulateSelectionChange(true);
    expect(result.current).toBe(URLS.lightSelected);
  });

  it('resolves back to lightUnselected once the tab becomes inactive again', () => {
    const { result } = renderHook(() => useTabIconSelection(false, URLS));
    simulateSelectionChange(true);
    simulateSelectionChange(false);
    expect(result.current).toBe(URLS.lightUnselected);
  });

  it('returns the dark variant immediately when isDarkTheme is true, regardless of selection', () => {
    const { result } = renderHook(() => useTabIconSelection(true, URLS));
    expect(result.current).toBe(URLS.dark);
  });
});
