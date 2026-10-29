// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useDismissOnWindowBlur } from './use-dismiss-on-window-blur.hook';

// React's ref API uses null as the empty value
// eslint-disable-next-line no-null/no-null
const createEmptyRef = () => ({ current: null });

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

  it('dispatches a synthetic mouse pointerdown on body when the ref is empty', () => {
    renderHook(() => useDismissOnWindowBlur(createEmptyRef()));
    window.dispatchEvent(new Event('blur'));
    expect(seen).toHaveLength(1);
    expect(seen[0].type).toBe('pointerdown');
    expect(seen[0].target).toBe(document.body);
    expect(seen[0].isTrusted).toBe(false);
    // jsdom has no PointerEvent, so the hook falls back to MouseEvent there, which has no pointerType
    const expectedPointerType = typeof PointerEvent === 'undefined' ? undefined : 'mouse';
    expect(Reflect.get(seen[0], 'pointerType')).toBe(expectedPointerType);
  });

  it("dispatches on the content's parent so a hosting surface sees an inside press", () => {
    const container = document.createElement('div');
    const child = document.createElement('div');
    container.appendChild(child);
    document.body.appendChild(container);

    renderHook(() => useDismissOnWindowBlur({ current: child }));
    window.dispatchEvent(new Event('blur'));

    expect(seen).toHaveLength(1);
    expect(seen[0].target).toBe(container);
    container.remove();
  });

  it('stops listening after unmount', () => {
    const { unmount } = renderHook(() => useDismissOnWindowBlur(createEmptyRef()));
    unmount();
    window.dispatchEvent(new Event('blur'));
    expect(seen).toHaveLength(0);
  });
});
