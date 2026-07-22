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

describe('useTabIconSelection', () => {
  let frameElement: HTMLElement | undefined;

  beforeEach(() => {
    vi.useFakeTimers();
    frameElement = document.createElement('iframe');
    Object.defineProperty(window, 'frameElement', {
      configurable: true,
      get: () => frameElement,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('falls back to lightDefault before the first selection poll resolves anything conclusive', () => {
    // No offsetParent getter defined on frameElement yet: offsetParent reads as null/undefined-ish,
    // but frameElement itself is a valid HTMLElement, so the very first poll (fired synchronously by
    // the effect) already resolves a concrete false. This case models frameElement being entirely
    // unavailable (e.g. not inside an iframe), which the hook treats as "selection unknown".
    frameElement = undefined;
    const { result } = renderHook(() => useTabIconSelection(false, URLS));
    expect(result.current).toBe(URLS.lightDefault);
  });

  it('resolves to lightSelected once the iframe has an offsetParent', () => {
    Object.defineProperty(frameElement, 'offsetParent', {
      configurable: true,
      value: document.createElement('div'),
    });
    const { result } = renderHook(() => useTabIconSelection(false, URLS));
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe(URLS.lightSelected);
  });

  it('resolves to lightUnselected once the iframe has no offsetParent', () => {
    Object.defineProperty(frameElement, 'offsetParent', {
      configurable: true,
      // Testing the case where offsetParent is null (element hidden with display: none)
      // eslint-disable-next-line no-null/no-null
      value: null,
    });
    const { result } = renderHook(() => useTabIconSelection(false, URLS));
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe(URLS.lightUnselected);
  });

  it('returns the dark variant immediately when isDarkTheme is true, regardless of selection polling', () => {
    Object.defineProperty(frameElement, 'offsetParent', {
      configurable: true,
      // Testing with null offsetParent (hidden element)
      // eslint-disable-next-line no-null/no-null
      value: null,
    });
    const { result } = renderHook(() => useTabIconSelection(true, URLS));
    expect(result.current).toBe(URLS.dark);
  });
});
