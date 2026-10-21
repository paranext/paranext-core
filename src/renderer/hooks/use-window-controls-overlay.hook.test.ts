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

function setInnerWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true, writable: true });
}

afterEach(() => {
  // navigator's ambient type marks this readonly; deleting it here undoes installMockOverlay
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  delete (navigator as { windowControlsOverlay?: unknown }).windowControlsOverlay;
  setInnerWidth(originalInnerWidth);
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
});
