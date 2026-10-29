// @vitest-environment jsdom

import { render } from '@testing-library/react';
import { createRef, Ref } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDismissOnWindowBlur } from './use-dismiss-on-window-blur.hook';

function Host({
  forwardedRef,
  open = true,
}: {
  forwardedRef?: Ref<HTMLDivElement>;
  open?: boolean;
}) {
  const contentRef = useDismissOnWindowBlur(forwardedRef);
  return (
    <section data-testid="parent">{open && <div data-testid="content" ref={contentRef} />}</section>
  );
}

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

  it('does nothing while the surface is closed (no content element)', () => {
    render(<Host open={false} />);
    window.dispatchEvent(new Event('blur'));
    expect(seen).toHaveLength(0);
  });

  it("dispatches on the content's parent so a hosting surface sees an inside press", () => {
    const { getByTestId } = render(<Host />);
    window.dispatchEvent(new Event('blur'));

    expect(seen).toHaveLength(1);
    expect(seen[0].type).toBe('pointerdown');
    expect(seen[0].target).toBe(getByTestId('parent'));
    expect(seen[0].isTrusted).toBe(false);
    // jsdom has no PointerEvent, so the hook falls back to MouseEvent there, which has no pointerType
    const expectedPointerType = typeof PointerEvent === 'undefined' ? undefined : 'mouse';
    expect(Reflect.get(seen[0], 'pointerType')).toBe(expectedPointerType);
  });

  it('does nothing once the content element has unmounted', () => {
    const { rerender } = render(<Host />);
    rerender(<Host open={false} />);
    window.dispatchEvent(new Event('blur'));
    expect(seen).toHaveLength(0);
  });

  it('stops listening after unmount', () => {
    const { unmount } = render(<Host />);
    unmount();
    window.dispatchEvent(new Event('blur'));
    expect(seen).toHaveLength(0);
  });

  it('forwards the element to a function ref, and null on unmount', () => {
    const forwardedRef = vi.fn();
    const { getByTestId, unmount } = render(<Host forwardedRef={forwardedRef} />);
    expect(forwardedRef).toHaveBeenLastCalledWith(getByTestId('content'));
    unmount();
    // React's ref API uses null as the empty value
    // eslint-disable-next-line no-null/no-null
    expect(forwardedRef).toHaveBeenLastCalledWith(null);
  });

  it('forwards the element to an object ref, and null on unmount', () => {
    const forwardedRef = createRef<HTMLDivElement>();
    const { getByTestId, unmount } = render(<Host forwardedRef={forwardedRef} />);
    expect(forwardedRef.current).toBe(getByTestId('content'));
    unmount();
    // React's ref API uses null as the empty value
    // eslint-disable-next-line no-null/no-null
    expect(forwardedRef.current).toBeNull();
  });

  it('returns a stable ref callback across renders', () => {
    const callbacks: unknown[] = [];
    function Probe({ tick }: { tick: number }) {
      callbacks.push(useDismissOnWindowBlur<HTMLDivElement>());
      return <span>{tick}</span>;
    }
    const { rerender } = render(<Probe tick={0} />);
    rerender(<Probe tick={1} />);
    expect(callbacks.length).toBeGreaterThan(1);
    expect(new Set(callbacks).size).toBe(1);
  });
});
