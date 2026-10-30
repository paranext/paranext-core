// @vitest-environment jsdom

import { render } from '@testing-library/react';
import { createRef, Ref } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  isRunningInWebView,
  shouldSuppressFocusReturn,
  useDismissOnWindowBlur,
} from './use-dismiss-on-window-blur.hook';

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

describe('isRunningInWebView', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('is false in the main document, which is its own top window', () => {
    expect(isRunningInWebView()).toBe(false);
  });

  it('is true when top is another window', () => {
    vi.stubGlobal('top', {});
    expect(isRunningInWebView()).toBe(true);
  });

  it('is true when top cannot be read as a window', () => {
    vi.stubGlobal('top', undefined);
    expect(isRunningInWebView()).toBe(true);
  });
});

describe('shouldSuppressFocusReturn', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.querySelectorAll('iframe').forEach((iframe) => iframe.remove());
  });

  const focusIframe = () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.focus();
    expect(document.activeElement).toBe(iframe);
  };

  it('does not suppress when the document is focused and no iframe is active', () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);
    expect(shouldSuppressFocusReturn(document, false)).toBe(false);
    expect(shouldSuppressFocusReturn(document, true)).toBe(false);
  });

  it('suppresses when an iframe is active, in the main document or a web view', () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);
    focusIframe();
    expect(shouldSuppressFocusReturn(document, false)).toBe(true);
    expect(shouldSuppressFocusReturn(document, true)).toBe(true);
  });

  it('suppresses an unfocused document inside a web view only', () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(false);
    expect(shouldSuppressFocusReturn(document, true)).toBe(true);
    expect(shouldSuppressFocusReturn(document, false)).toBe(false);
  });
});

describe('useDismissOnWindowBlur', () => {
  let seen: Event[];
  const recordEvent = (event: Event) => seen.push(event);

  beforeEach(() => {
    seen = [];
    document.addEventListener('pointerdown', recordEvent);
  });

  afterEach(() => {
    document.removeEventListener('pointerdown', recordEvent);
    vi.restoreAllMocks();
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

  it('does nothing while the content animates out (data-state="closed")', () => {
    const { getByTestId } = render(<Host />);
    getByTestId('content').dataset.state = 'closed';
    window.dispatchEvent(new Event('blur'));
    expect(seen).toHaveLength(0);
  });

  it('does nothing once the content element has unmounted', () => {
    const { rerender } = render(<Host />);
    rerender(<Host open={false} />);
    window.dispatchEvent(new Event('blur'));
    expect(seen).toHaveLength(0);
  });

  it('removes its window blur listener on unmount', () => {
    const add = vi.spyOn(window, 'addEventListener');
    const remove = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<Host />);
    const handler = add.mock.calls.find(([type]) => type === 'blur')?.[1];
    expect(handler).toBeDefined();
    unmount();
    expect(remove).toHaveBeenCalledWith('blur', handler);
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

  it("runs a function ref's returned cleanup on unmount instead of calling it with null", () => {
    const cleanup = vi.fn();
    const forwardedRef = vi.fn(() => cleanup);
    const { getByTestId, unmount } = render(<Host forwardedRef={forwardedRef} />);
    expect(forwardedRef).toHaveBeenCalledTimes(1);
    expect(forwardedRef).toHaveBeenCalledWith(getByTestId('content'));
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(forwardedRef).toHaveBeenCalledTimes(1);
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

    afterEach(() => {
      vi.restoreAllMocks();
      vi.unstubAllGlobals();
      document.querySelectorAll('iframe').forEach((iframe) => iframe.remove());
    });

    // The main document is its own top window, so an unfocused document there means the OS window
    // was deactivated
    it('restores focus in the main document even when the document is not focused', () => {
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);
      expect(isRunningInWebView()).toBe(false);
      const onCloseAutoFocus = renderProbe();
      const event = cancelable();
      onCloseAutoFocus(event);
      expect(event.defaultPrevented).toBe(false);
    });

    it('prevents close-auto-focus in a web view whose document is not focused', () => {
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);
      // A web view's `top` is its host window, not itself
      vi.stubGlobal('top', {});
      const onCloseAutoFocus = renderProbe();
      const event = cancelable();
      onCloseAutoFocus(event);
      expect(event.defaultPrevented).toBe(true);
    });

    it('prevents close-auto-focus when focus is inside an iframe', () => {
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      iframe.focus();
      expect(document.activeElement).toBe(iframe);
      const onCloseAutoFocus = renderProbe();
      const event = cancelable();
      onCloseAutoFocus(event);
      expect(event.defaultPrevented).toBe(true);
    });

    it('leaves close-auto-focus alone when the document is focused and focus is not in an iframe', () => {
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);
      const onCloseAutoFocus = renderProbe();
      const event = cancelable();
      onCloseAutoFocus(event);
      expect(event.defaultPrevented).toBe(false);
    });

    it("calls the caller's handler first and does not undo a default it already prevented", () => {
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);
      const callerHandler = vi.fn((event: Event) => event.preventDefault());
      const onCloseAutoFocus = renderProbe(callerHandler);
      const event = cancelable();
      const preventDefault = vi.spyOn(event, 'preventDefault');
      onCloseAutoFocus(event);
      expect(callerHandler).toHaveBeenCalledWith(event);
      // Only the caller's call: the hook sees the default already prevented and leaves it alone
      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(event.defaultPrevented).toBe(true);
    });
  });
});
