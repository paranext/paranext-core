import { act, renderHook } from '@testing-library/react';
import { useTruncationTooltip } from './use-truncation-tooltip.hook';

describe('useTruncationTooltip', () => {
  test('exposes a ref, a closed initial open state, and both pointer handlers', () => {
    const { result } = renderHook(() => useTruncationTooltip<HTMLSpanElement>());

    expect(result.current.open).toBe(false);
    expect(result.current.ref).toHaveProperty('current');
    expect(result.current.ref.current).toBeNull();
    expect(typeof result.current.onPointerEnter).toBe('function');
    expect(typeof result.current.onPointerLeave).toBe('function');
  });

  test('stays closed on pointer enter when the element is not attached', () => {
    const { result } = renderHook(() => useTruncationTooltip<HTMLSpanElement>());

    act(() => result.current.onPointerEnter());

    expect(result.current.open).toBe(false);
  });

  test('stays closed on pointer enter when the text is not clipped', () => {
    const { result } = renderHook(() => useTruncationTooltip<HTMLSpanElement>());

    // Not clipped: content fits within the visible box (scrollWidth <= clientWidth). In jsdom
    // layout metrics are 0 by default, which already models the not-clipped case; set them
    // explicitly so the intent is clear and robust to any environment defaults.
    const element = document.createElement('span');
    Object.defineProperty(element, 'scrollWidth', { configurable: true, value: 100 });
    Object.defineProperty(element, 'clientWidth', { configurable: true, value: 100 });
    result.current.ref.current = element;

    act(() => result.current.onPointerEnter());

    expect(result.current.open).toBe(false);
  });

  test('opens on pointer enter when the text is clipped, then closes on pointer leave', () => {
    const { result } = renderHook(() => useTruncationTooltip<HTMLSpanElement>());

    // Clipped: content overflows the visible box (scrollWidth > clientWidth).
    const element = document.createElement('span');
    Object.defineProperty(element, 'scrollWidth', { configurable: true, value: 200 });
    Object.defineProperty(element, 'clientWidth', { configurable: true, value: 100 });
    result.current.ref.current = element;

    act(() => result.current.onPointerEnter());
    expect(result.current.open).toBe(true);

    act(() => result.current.onPointerLeave());
    expect(result.current.open).toBe(false);
  });
});
