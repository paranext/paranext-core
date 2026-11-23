import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useWindowControlsOverlay } from './use-window-controls-overlay.hook';

type GeometryChangeListener = (event: unknown) => void;

function installMockOverlay(initialVisible: boolean, initialRect: DOMRect) {
  const listeners: GeometryChangeListener[] = [];
  const overlay = {
    visible: initialVisible,
    getTitlebarAreaRect: vi.fn(() => initialRect),
    addEventListener: vi.fn((_type: string, listener: GeometryChangeListener) => {
      listeners.push(listener);
    }),
    removeEventListener: vi.fn((_type: string, listener: GeometryChangeListener) => {
      const index = listeners.indexOf(listener);
      if (index !== -1) listeners.splice(index, 1);
    }),
  };
  Object.defineProperty(navigator, 'windowControlsOverlay', {
    value: overlay,
    configurable: true,
  });

  return {
    overlay,
    fireGeometryChange: (visible: boolean, rect: DOMRect) => {
      overlay.visible = visible;
      overlay.getTitlebarAreaRect.mockReturnValue(rect);
      listeners.forEach((listener) => listener({}));
    },
  };
}

const originalInnerWidth = window.innerWidth;
const originalMatchMedia = window.matchMedia;

function setInnerWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true, writable: true });
}

function setVisibilityState(state: DocumentVisibilityState) {
  Object.defineProperty(document, 'visibilityState', { value: state, configurable: true });
}

const originalDevicePixelRatio = window.devicePixelRatio;

function setDevicePixelRatio(ratio: number) {
  Object.defineProperty(window, 'devicePixelRatio', {
    value: ratio,
    configurable: true,
    writable: true,
  });
}

/**
 * Replaces the setup file's inert `matchMedia` stub with one that behaves like Chromium's
 * `resolution` queries: a change to `devicePixelRatio` (a zoom or display-scale change) notifies
 * only the queries whose match it flips, that is, those naming the old or the new ratio.
 */
function installMockResolutionQueries() {
  setDevicePixelRatio(1);
  const listeners: { query: string; listener: () => void }[] = [];
  // Defined rather than assigned, as vitest.setup.ts does, so the mock needs only the members the
  // hook uses instead of a whole MediaQueryList
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: true,
      media: query,
      addEventListener: (_type: string, listener: () => void) => {
        listeners.push({ query, listener });
      },
      removeEventListener: (_type: string, listener: () => void) => {
        const index = listeners.findIndex((entry) => entry.listener === listener);
        if (index !== -1) listeners.splice(index, 1);
      },
    }),
  });

  return {
    listeners,
    changeDevicePixelRatio: (ratio: number) => {
      const flipped = [
        `(resolution: ${window.devicePixelRatio}dppx)`,
        `(resolution: ${ratio}dppx)`,
      ];
      setDevicePixelRatio(ratio);
      [...listeners]
        .filter((entry) => flipped.includes(entry.query))
        .forEach((entry) => entry.listener());
    },
  };
}

afterEach(() => {
  // navigator's ambient type marks this readonly; deleting it here undoes installMockOverlay
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  delete (navigator as { windowControlsOverlay?: unknown }).windowControlsOverlay;
  setInnerWidth(originalInnerWidth);
  Object.defineProperty(window, 'matchMedia', { writable: true, value: originalMatchMedia });
  setDevicePixelRatio(originalDevicePixelRatio);
  // Deleting the own property uncovers jsdom's prototype getter again
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  delete (document as { visibilityState?: unknown }).visibilityState;
});

describe('useWindowControlsOverlay', () => {
  it('returns undefined when the Window Controls Overlay API is unavailable', () => {
    const { result } = renderHook(() => useWindowControlsOverlay());

    expect(result.current).toBeUndefined();
  });

  it('returns the space the window controls take at each edge immediately when the overlay is visible at mount', () => {
    setInnerWidth(1000);
    installMockOverlay(true, new DOMRect(0, 0, 860, 32));

    const { result } = renderHook(() => useWindowControlsOverlay());

    expect(result.current).toEqual({ left: 0, right: 140 });
  });

  it('reports the controls on the left when the titlebar area starts after them (e.g., RTL locales)', () => {
    setInnerWidth(1000);
    installMockOverlay(true, new DOMRect(140, 0, 860, 32));

    const { result } = renderHook(() => useWindowControlsOverlay());

    expect(result.current).toEqual({ left: 140, right: 0 });
  });

  it('returns undefined when the overlay exists but is not currently visible', () => {
    installMockOverlay(false, new DOMRect(0, 0, 860, 32));

    const { result } = renderHook(() => useWindowControlsOverlay());

    expect(result.current).toBeUndefined();
  });

  it('updates when a geometrychange event reports a new rect', () => {
    setInnerWidth(1000);
    const { fireGeometryChange } = installMockOverlay(true, new DOMRect(0, 0, 860, 32));
    const { result } = renderHook(() => useWindowControlsOverlay());

    act(() => fireGeometryChange(true, new DOMRect(0, 0, 800, 32)));

    expect(result.current).toEqual({ left: 0, right: 200 });
  });

  it('settles on the correct insets once the window has resized, though geometrychange arrives before the window width updates', () => {
    // Chromium sends geometrychange for a maximize with the new titlebar area while
    // window.innerWidth still holds the old width; the resize event follows once it has updated
    setInnerWidth(900);
    const { fireGeometryChange } = installMockOverlay(true, new DOMRect(0, 0, 764, 32));
    const { result } = renderHook(() => useWindowControlsOverlay());

    act(() => fireGeometryChange(true, new DOMRect(0, 0, 1400, 32)));
    act(() => {
      setInnerWidth(1536);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ left: 0, right: 136 });
  });

  it('reports no space rather than negative space while the window width lags a maximize', () => {
    setInnerWidth(900);
    const { fireGeometryChange } = installMockOverlay(true, new DOMRect(0, 0, 764, 32));
    const { result } = renderHook(() => useWindowControlsOverlay());

    act(() => fireGeometryChange(true, new DOMRect(0, 0, 1400, 32)));

    expect(result.current).toEqual({ left: 0, right: 0 });
  });

  it('keeps the same insets object across a resize that moves nothing', () => {
    setInnerWidth(1000);
    installMockOverlay(true, new DOMRect(0, 0, 860, 32));
    const { result } = renderHook(() => useWindowControlsOverlay());
    const before = result.current;

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(before);
    expect(before).toEqual({ left: 0, right: 140 });
  });

  it('measures again when the page zoom or display scale changes, though neither geometrychange nor resize reports it', () => {
    // The interface-scaling zoom is applied once the hidden window has painted, and a window
    // restored onto a monitor with a different scale factor changes scale while it starts; a
    // measurement taken before either is stale until something measures again
    setInnerWidth(1000);
    const { overlay } = installMockOverlay(true, new DOMRect(0, 0, 860, 32));
    const { changeDevicePixelRatio } = installMockResolutionQueries();
    const { result } = renderHook(() => useWindowControlsOverlay());

    act(() => {
      setInnerWidth(800);
      overlay.getTitlebarAreaRect.mockReturnValue(new DOMRect(0, 0, 688, 32));
      changeDevicePixelRatio(1.25);
    });

    expect(result.current).toEqual({ left: 0, right: 112 });
  });

  it('keeps measuring on every later scale change, not only the first', () => {
    // A `resolution` query names one ratio, so a listener left on the starting ratio hears
    // 1 → 1.25 but not 1.25 → 1.75 (moving the window between a 125 % and a 175 % monitor)
    setInnerWidth(1000);
    const { overlay } = installMockOverlay(true, new DOMRect(0, 0, 860, 32));
    const { changeDevicePixelRatio } = installMockResolutionQueries();
    const { result } = renderHook(() => useWindowControlsOverlay());

    act(() => {
      setInnerWidth(800);
      overlay.getTitlebarAreaRect.mockReturnValue(new DOMRect(0, 0, 688, 32));
      changeDevicePixelRatio(1.25);
    });
    act(() => {
      setInnerWidth(572);
      overlay.getTitlebarAreaRect.mockReturnValue(new DOMRect(0, 0, 492, 32));
      changeDevicePixelRatio(1.75);
    });

    expect(result.current).toEqual({ left: 0, right: 80 });
  });

  it('measures again when a window that started hidden is first shown', () => {
    setVisibilityState('hidden');
    setInnerWidth(1000);
    const { overlay } = installMockOverlay(true, new DOMRect(0, 0, 300, 32));
    const { result } = renderHook(() => useWindowControlsOverlay());
    expect(result.current).toEqual({ left: 0, right: 700 });

    act(() => {
      overlay.getTitlebarAreaRect.mockReturnValue(new DOMRect(0, 0, 860, 32));
      setVisibilityState('visible');
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current).toEqual({ left: 0, right: 140 });
  });

  it('returns undefined after a geometrychange event reports the overlay went invisible', () => {
    const { fireGeometryChange } = installMockOverlay(true, new DOMRect(0, 0, 860, 32));
    const { result } = renderHook(() => useWindowControlsOverlay());

    act(() => fireGeometryChange(false, new DOMRect(0, 0, 860, 32)));

    expect(result.current).toBeUndefined();
  });

  it('stops listening for geometrychange and resize on unmount', () => {
    const { overlay } = installMockOverlay(true, new DOMRect(0, 0, 860, 32));
    const removeWindowListener = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useWindowControlsOverlay());

    unmount();

    expect(overlay.removeEventListener).toHaveBeenCalledWith(
      'geometrychange',
      expect.any(Function),
    );
    expect(removeWindowListener).toHaveBeenCalledWith('resize', expect.any(Function));
    removeWindowListener.mockRestore();
  });

  it('stops listening for scale and visibility changes on unmount', () => {
    installMockOverlay(true, new DOMRect(0, 0, 860, 32));
    const { listeners } = installMockResolutionQueries();
    const removeDocumentListener = vi.spyOn(document, 'removeEventListener');
    const { unmount } = renderHook(() => useWindowControlsOverlay());
    expect(listeners.some((entry) => entry.query.includes('resolution'))).toBe(true);

    unmount();

    expect(listeners).toHaveLength(0);
    expect(removeDocumentListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    removeDocumentListener.mockRestore();
  });
});
