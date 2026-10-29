// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useDismissOnWindowBlur } from './use-dismiss-on-window-blur.hook';

describe('useDismissOnWindowBlur', () => {
  let seen: Event[];
  const recordEvent = (event: Event) => seen.push(event);

  beforeEach(() => {
    seen = [];
    document.addEventListener('pointerdown', recordEvent);
  });

  afterEach(() => {
    document.removeEventListener('pointerdown', recordEvent);
  });

  it('dispatches a synthetic mouse pointerdown on body when the window blurs', () => {
    renderHook(() => useDismissOnWindowBlur(true));
    window.dispatchEvent(new Event('blur'));
    expect(seen).toHaveLength(1);
    expect(seen[0].type).toBe('pointerdown');
    expect(seen[0].target).toBe(document.body);
    expect(seen[0].isTrusted).toBe(false);
    // jsdom has no PointerEvent, so the hook falls back to MouseEvent there, which has no pointerType
    const expectedPointerType = typeof PointerEvent === 'undefined' ? undefined : 'mouse';
    expect(Reflect.get(seen[0], 'pointerType')).toBe(expectedPointerType);
  });

  it('does nothing while disabled', () => {
    renderHook(() => useDismissOnWindowBlur(false));
    window.dispatchEvent(new Event('blur'));
    expect(seen).toHaveLength(0);
  });

  it('stops listening after unmount', () => {
    const { unmount } = renderHook(() => useDismissOnWindowBlur(true));
    unmount();
    window.dispatchEvent(new Event('blur'));
    expect(seen).toHaveLength(0);
  });

  it('stops listening when disabled after being enabled', () => {
    const { rerender } = renderHook(({ isEnabled }) => useDismissOnWindowBlur(isEnabled), {
      initialProps: { isEnabled: true },
    });
    rerender({ isEnabled: false });
    window.dispatchEvent(new Event('blur'));
    expect(seen).toHaveLength(0);
  });
});
