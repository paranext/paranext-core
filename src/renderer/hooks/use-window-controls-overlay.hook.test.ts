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

afterEach(() => {
  // navigator's ambient type marks this readonly; deleting it here undoes installMockOverlay
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  delete (navigator as { windowControlsOverlay?: unknown }).windowControlsOverlay;
});

describe('useWindowControlsOverlay', () => {
  it('returns undefined when the Window Controls Overlay API is unavailable', () => {
    const { result } = renderHook(() => useWindowControlsOverlay());

    expect(result.current).toBeUndefined();
  });

  it('returns the titlebar rect immediately when the overlay is visible at mount', () => {
    const rect = new DOMRect(0, 0, 860, 32);
    installMockOverlay(true, rect);

    const { result } = renderHook(() => useWindowControlsOverlay());

    expect(result.current).toBe(rect);
  });

  it('returns undefined when the overlay exists but is not currently visible', () => {
    installMockOverlay(false, new DOMRect(0, 0, 860, 32));

    const { result } = renderHook(() => useWindowControlsOverlay());

    expect(result.current).toBeUndefined();
  });

  it('updates when a geometrychange event reports a new rect', () => {
    const { fireGeometryChange } = installMockOverlay(true, new DOMRect(0, 0, 860, 32));
    const { result } = renderHook(() => useWindowControlsOverlay());

    const narrowerRect = new DOMRect(0, 0, 700, 32);
    act(() => fireGeometryChange(true, narrowerRect));

    expect(result.current).toBe(narrowerRect);
  });

  it('returns undefined after a geometrychange event reports the overlay went invisible', () => {
    const { fireGeometryChange } = installMockOverlay(true, new DOMRect(0, 0, 860, 32));
    const { result } = renderHook(() => useWindowControlsOverlay());

    act(() => fireGeometryChange(false, new DOMRect(0, 0, 860, 32)));

    expect(result.current).toBeUndefined();
  });

  it('removes its geometrychange listener on unmount', () => {
    const { overlay } = installMockOverlay(true, new DOMRect(0, 0, 860, 32));
    const { unmount } = renderHook(() => useWindowControlsOverlay());

    unmount();

    expect(overlay.removeEventListener).toHaveBeenCalledWith(
      'geometrychange',
      expect.any(Function),
    );
  });
});
