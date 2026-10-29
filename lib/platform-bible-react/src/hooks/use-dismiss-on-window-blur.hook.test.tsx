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
  const { ref } = useDismissOnWindowBlur({ ref: forwardedRef });
  return <section data-testid="parent">{open && <div data-testid="content" ref={ref} />}</section>;
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
      callbacks.push(useDismissOnWindowBlur<HTMLDivElement>({}).ref);
      return <span>{tick}</span>;
    }
    const { rerender } = render(<Probe tick={0} />);
    rerender(<Probe tick={1} />);
    expect(callbacks.length).toBeGreaterThan(1);
    expect(new Set(callbacks).size).toBe(1);
  });

  describe('close-auto-focus', () => {
    function renderProbe(callerHandler?: (event: Event) => void) {
      let handler: ((event: Event) => void) | undefined;
      function Probe() {
        const blurDismissal = useDismissOnWindowBlur<HTMLDivElement>({
          onCloseAutoFocus: callerHandler,
        });
        handler = blurDismissal.onCloseAutoFocus;
        return (
          <section>
            <div ref={blurDismissal.ref} />
          </section>
        );
      }
      render(<Probe />);
      return (event: Event) => handler?.(event);
    }
    const cancelable = () => new Event('focus', { cancelable: true });

    it('prevents close-auto-focus while a blur dismissal is in flight', () => {
      const onCloseAutoFocus = renderProbe();
      window.dispatchEvent(new Event('blur'));
      const event = cancelable();
      onCloseAutoFocus(event);
      expect(event.defaultPrevented).toBe(true);
    });

    it('stops preventing close-auto-focus once the blur dismissal task has ended', async () => {
      const onCloseAutoFocus = renderProbe();
      window.dispatchEvent(new Event('blur'));
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
      const event = cancelable();
      onCloseAutoFocus(event);
      expect(event.defaultPrevented).toBe(false);
    });

    it('leaves close-auto-focus alone otherwise', () => {
      const onCloseAutoFocus = renderProbe();
      const event = cancelable();
      onCloseAutoFocus(event);
      expect(event.defaultPrevented).toBe(false);
    });

    it("calls the caller's onCloseAutoFocus first", () => {
      const order: string[] = [];
      const callerHandler = vi.fn(() => order.push('caller'));
      const onCloseAutoFocus = renderProbe(callerHandler);
      const event = cancelable();
      event.preventDefault = vi.fn(() => order.push('hook'));
      window.dispatchEvent(new Event('blur'));
      onCloseAutoFocus(event);
      expect(callerHandler).toHaveBeenCalledWith(event);
      expect(order).toEqual(['caller', 'hook']);
    });

    it('does not undo a default the caller already prevented', () => {
      const callerHandler = vi.fn((event: Event) => event.preventDefault());
      const onCloseAutoFocus = renderProbe(callerHandler);
      const event = cancelable();
      onCloseAutoFocus(event);
      expect(callerHandler).toHaveBeenCalledTimes(1);
      expect(event.defaultPrevented).toBe(true);
    });
  });
});
