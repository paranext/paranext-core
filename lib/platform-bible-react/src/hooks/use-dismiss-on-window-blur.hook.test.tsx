// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import { createRef, ReactNode, Ref } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import {
  focusUnlessSuppressed,
  isRunningInWebView,
  isWindowBlurPress,
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

describe('focusUnlessSuppressed', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('runs the focus move when focus return is not suppressed', () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);
    const focus = vi.fn();
    focusUnlessSuppressed(focus);
    expect(focus).toHaveBeenCalledTimes(1);
  });

  it('skips the focus move in an unfocused web view', () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(false);
    vi.stubGlobal('top', {});
    const focus = vi.fn();
    focusUnlessSuppressed(focus);
    expect(focus).not.toHaveBeenCalled();
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
    expect(isWindowBlurPress(seen[0])).toBe(true);
    expect(isWindowBlurPress(new Event('pointerdown'))).toBe(false);
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

    /**
     * Renders `trigger` beside a `<section>` holding the content element that carries the hook's
     * ref, so the handler can look the trigger up from the content the way a Radix surface sees
     * it.
     */
    function renderTriggeredProbe(
      trigger: ReactNode = (
        <button type="button" aria-controls="c">
          trigger
        </button>
      ),
      content: { id?: string; labelledBy?: string; children?: ReactNode } = { id: 'c' },
    ) {
      let handler: ((event: Event) => void) | undefined;
      function Probe({
        triggerMarkup,
        showContent = true,
      }: {
        triggerMarkup: ReactNode;
        showContent?: boolean;
      }) {
        const blurDismissal = useDismissOnWindowBlur<HTMLDivElement>({});
        handler = blurDismissal.onCloseAutoFocus;
        return (
          <>
            {triggerMarkup}
            <section>
              {showContent && (
                <div id={content.id} aria-labelledby={content.labelledBy} ref={blurDismissal.ref}>
                  {content.children}
                </div>
              )}
            </section>
          </>
        );
      }
      let currentTrigger: ReactNode = trigger;
      const { rerender } = render(<Probe triggerMarkup={trigger} />);
      return {
        onCloseAutoFocus: (event: Event) => handler?.(event),
        rerenderTrigger: (nextTrigger: ReactNode) => {
          currentTrigger = nextTrigger;
          rerender(<Probe triggerMarkup={nextTrigger} />);
        },
        /** Unmounts the content, as Radix does on close before it runs close-auto-focus */
        detachContent: () => rerender(<Probe triggerMarkup={currentTrigger} showContent={false} />),
      };
    }

    // The main document is its own top window, so an unfocused document there means the OS window
    // was deactivated
    it("leaves Radix's default alone when no trigger controls the content", () => {
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

    it('restores focus to the trigger whose aria-controls names the content, in an unfocused main document', () => {
      const { onCloseAutoFocus } = renderTriggeredProbe();
      const button = screen.getByRole('button', { name: 'trigger' });
      expect(button).not.toHaveFocus();
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      const event = cancelable();
      onCloseAutoFocus(event);

      expect(button).toHaveFocus();
      expect(event.defaultPrevented).toBe(true);
    });

    it("falls back to the element the content's aria-labelledby names", () => {
      const { onCloseAutoFocus } = renderTriggeredProbe(
        <button type="button" id="t">
          trigger
        </button>,
        { labelledBy: 't' },
      );
      const button = screen.getByRole('button', { name: 'trigger' });
      expect(button).not.toHaveFocus();
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      const event = cancelable();
      onCloseAutoFocus(event);

      expect(button).toHaveFocus();
      expect(event.defaultPrevented).toBe(true);
    });

    it('ignores an aria-labelledby that names an element inside the content', () => {
      const { onCloseAutoFocus } = renderTriggeredProbe(undefined, {
        labelledBy: 'h',
        children: <span id="h" tabIndex={-1} />,
      });
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      const event = cancelable();
      onCloseAutoFocus(event);

      expect(document.activeElement).toBe(document.body);
      expect(event.defaultPrevented).toBe(false);
    });

    it('does not match an empty aria-controls when the content has no id', () => {
      const { onCloseAutoFocus } = renderTriggeredProbe(
        <button type="button" aria-controls="">
          trigger
        </button>,
        {},
      );
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      const event = cancelable();
      onCloseAutoFocus(event);

      expect(screen.getByRole('button', { name: 'trigger' })).not.toHaveFocus();
      expect(event.defaultPrevented).toBe(false);
    });

    it('does not take focus from an element the user focused elsewhere', () => {
      const { onCloseAutoFocus } = renderTriggeredProbe(
        <>
          <button type="button" aria-controls="c">
            trigger
          </button>
          <input aria-label="elsewhere" />
        </>,
      );
      const input = screen.getByRole('textbox', { name: 'elsewhere' });
      input.focus();
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      const event = cancelable();
      onCloseAutoFocus(event);

      expect(input).toHaveFocus();
      expect(event.defaultPrevented).toBe(false);
    });

    it('finds a trigger that was replaced after the content attached', () => {
      const triggerWithKey = (key: string) => (
        <button key={key} type="button" aria-controls="c">
          trigger
        </button>
      );
      const { onCloseAutoFocus, rerenderTrigger } = renderTriggeredProbe(triggerWithKey('first'));
      const firstButton = screen.getByRole('button', { name: 'trigger' });
      rerenderTrigger(triggerWithKey('second'));
      const secondButton = screen.getByRole('button', { name: 'trigger' });
      expect(secondButton).not.toBe(firstButton);
      expect(secondButton).not.toHaveFocus();
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      const event = cancelable();
      onCloseAutoFocus(event);

      expect(secondButton).toHaveFocus();
      expect(event.defaultPrevented).toBe(true);
    });

    it('restores nothing inside a web view', () => {
      // A web view's `top` is its host window, not itself; the hook reads it once, on mount
      vi.stubGlobal('top', {});
      const { onCloseAutoFocus } = renderTriggeredProbe();
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      const event = cancelable();
      onCloseAutoFocus(event);

      expect(screen.getByRole('button', { name: 'trigger' })).not.toHaveFocus();
      expect(event.defaultPrevented).toBe(true);
    });

    it('does not focus a trigger that is no longer in the document', () => {
      const { onCloseAutoFocus, rerenderTrigger } = renderTriggeredProbe();
      const button = screen.getByRole('button', { name: 'trigger' });
      // Removed through React, which would otherwise fail to unmount a node taken out behind its back
      rerenderTrigger(undefined);
      expect(button.isConnected).toBe(false);
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      const event = cancelable();
      onCloseAutoFocus(event);

      expect(document.activeElement).toBe(document.body);
      expect(event.defaultPrevented).toBe(false);
    });

    it("prefers the trigger found on attach to an outside element the content's aria-labelledby names", () => {
      const triggerMarkup = (isOpen: boolean) => (
        <>
          <button type="button" aria-controls={isOpen ? 'c' : undefined}>
            trigger
          </button>
          <span id="label" tabIndex={-1}>
            label
          </span>
        </>
      );
      const { onCloseAutoFocus, rerenderTrigger } = renderTriggeredProbe(triggerMarkup(true), {
        id: 'c',
        labelledBy: 'label',
      });
      // A menu trigger drops `aria-controls` once the menu closes
      rerenderTrigger(triggerMarkup(false));
      const button = screen.getByRole('button', { name: 'trigger' });
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      const event = cancelable();
      onCloseAutoFocus(event);

      expect(button).toHaveFocus();
      expect(event.defaultPrevented).toBe(true);
    });

    it('leaves the default to Radix when the trigger cannot take focus', () => {
      const { onCloseAutoFocus } = renderTriggeredProbe(
        <button type="button" aria-controls="c" disabled>
          trigger
        </button>,
      );
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      const event = cancelable();
      onCloseAutoFocus(event);

      expect(document.activeElement).toBe(document.body);
      expect(event.defaultPrevented).toBe(false);
    });

    it('does not rescan the document when the same content element re-attaches', () => {
      function InlineRefProbe({ tick }: { tick: number }) {
        // An inline ref gives the hook's ref callback a new identity on every render, so React
        // detaches and re-attaches the same element each time
        const blurDismissal = useDismissOnWindowBlur<HTMLDivElement>({ ref: () => {} });
        return (
          <>
            <button type="button" aria-controls="c">
              {tick}
            </button>
            <section>
              <div id="c" ref={blurDismissal.ref} />
            </section>
          </>
        );
      }
      const querySelectorAll = vi.spyOn(document, 'querySelectorAll');
      const { rerender } = render(<InlineRefProbe tick={0} />);
      const scansOf = () =>
        querySelectorAll.mock.calls.filter(([selector]) => selector === '[aria-controls]').length;
      // Control: the first attach scans
      expect(scansOf()).toBe(1);

      rerender(<InlineRefProbe tick={1} />);
      rerender(<InlineRefProbe tick={2} />);

      expect(scansOf()).toBe(1);
    });

    it('releases the content and trigger it kept once close-auto-focus has run for a detached content', () => {
      const { onCloseAutoFocus, detachContent } = renderTriggeredProbe();
      const button = screen.getByRole('button', { name: 'trigger' });
      detachContent();
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      const first = cancelable();
      onCloseAutoFocus(first);
      // Control: the close that the kept content belongs to restores the trigger
      expect(button).toHaveFocus();
      expect(first.defaultPrevented).toBe(true);

      button.blur();
      const second = cancelable();
      onCloseAutoFocus(second);

      expect(document.activeElement).toBe(document.body);
      expect(second.defaultPrevented).toBe(false);
    });
  });
});
