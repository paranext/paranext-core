// @vitest-environment jsdom

import { act, fireEvent, render } from '@testing-library/react';
import { useRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ABORTED,
  FAILED_PRECONDITION,
  newPlatformError,
  type PlatformErrorCode,
  RESOURCE_EXHAUSTED,
} from 'platform-bible-utils';
import {
  useEditorContextMenu,
  type EditorContextMenuRequest,
  type UseEditorContextMenuOptions,
} from './use-editor-context-menu.hook';

type HostProps = Partial<UseEditorContextMenuOptions> & {
  requestMenu: UseEditorContextMenuOptions['requestMenu'];
  onApi?: (api: ReturnType<typeof useEditorContextMenu>) => void;
};

function Host({ onApi, ...options }: HostProps) {
  // React's ref object type starts as null, which `undefined` cannot stand in for
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  const api = useEditorContextMenu({
    containerRef,
    dismissMenu: () => {},
    onPick: () => {},
    ...options,
  });
  onApi?.(api);
  return (
    <div>
      <p data-testid="outside">outside text</p>
      <div ref={containerRef} data-testid="container">
        <p data-testid="text">some editor text</p>
        <button type="button" data-testid="button">
          control
        </button>
      </div>
    </div>
  );
}

/** A promise whose settlement the test controls. */
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { promise, resolve, reject };
}

function selectNodeContents(node: Node) {
  const range = document.createRange();
  range.selectNodeContents(node);
  addRangeAsSelection(range);
}

function addRangeAsSelection(range: Range) {
  const selection = window.getSelection();
  if (!selection) throw new Error('jsdom has no selection');
  selection.removeAllRanges();
  selection.addRange(range);
}

/** Right-click: a mouse-raised `contextmenu` has button 2. */
function rightClick(target: Element, clientX = 40, clientY = 50) {
  const event = new MouseEvent('contextmenu', {
    bubbles: true,
    cancelable: true,
    button: 2,
    clientX,
    clientY,
  });
  act(() => {
    target.dispatchEvent(event);
  });
  return event;
}

/** Jsdom has no layout, so `Range` has no `getClientRects`; the stub is removed after each test. */
function stubRangeClientRects(rects: object[]) {
  Object.defineProperty(Range.prototype, 'getClientRects', {
    configurable: true,
    writable: true,
    value: () => rects,
  });
}

function stubRangeBoundingRect(rect: DOMRect) {
  Object.defineProperty(Range.prototype, 'getBoundingClientRect', {
    configurable: true,
    writable: true,
    value: () => rect,
  });
}

async function flush() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

describe('useEditorContextMenu', () => {
  beforeEach(() => {
    window.getSelection()?.removeAllRanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // @ts-expect-error ts(2790) - removing the stub installed by stubRangeClientRects
    delete Range.prototype.getClientRects;
    // @ts-expect-error ts(2790) - removing the stub installed by stubRangeBoundingRect
    delete Range.prototype.getBoundingClientRect;
    window.getSelection()?.removeAllRanges();
  });

  describe('claiming the right-click', () => {
    it('claims a right-click on text and requests the menu at the click position', () => {
      const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);

      const event = rightClick(getByTestId('text'), 12, 34);

      expect(event.defaultPrevented).toBe(true);
      expect(requestMenu).toHaveBeenCalledTimes(1);
      expect(requestMenu).toHaveBeenCalledWith({
        position: { x: 12, y: 34 },
        hasSelection: false,
        selectedText: '',
        isKeyboardInvoked: false,
      });
    });

    it('reports a non-collapsed selection inside the container and its text', () => {
      const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);
      selectNodeContents(getByTestId('text'));

      rightClick(getByTestId('text'));

      expect(requestMenu).toHaveBeenCalledWith(
        expect.objectContaining({ hasSelection: true, selectedText: 'some editor text' }),
      );
    });

    it('ignores a selection outside the container', () => {
      const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);
      selectNodeContents(getByTestId('outside'));

      rightClick(getByTestId('text'));

      expect(requestMenu).toHaveBeenCalledWith(
        expect.objectContaining({ hasSelection: false, selectedText: '' }),
      );
    });

    it('reports hasSelection when the host says a non-text selection exists', () => {
      const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
      const { getByTestId } = render(
        <Host requestMenu={requestMenu} hasNonTextSelection={() => true} />,
      );

      rightClick(getByTestId('text'));

      expect(requestMenu).toHaveBeenCalledWith(
        expect.objectContaining({ hasSelection: true, selectedText: '' }),
      );
    });

    it('does not claim a right-click on an interactive control inside the container', () => {
      const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);

      const event = rightClick(getByTestId('button'));

      expect(event.defaultPrevented).toBe(false);
      expect(requestMenu).not.toHaveBeenCalled();
    });

    it('does not claim a right-click outside the container', () => {
      const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);

      // The listener is on the container, so the event never reaches it; the control is that
      // the same request inside the container does go through.
      const event = rightClick(getByTestId('outside'));
      expect(event.defaultPrevented).toBe(false);
      expect(requestMenu).not.toHaveBeenCalled();

      rightClick(getByTestId('text'));
      expect(requestMenu).toHaveBeenCalledTimes(1);
    });

    it('does not claim when disabled', () => {
      const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
      const { getByTestId } = render(<Host requestMenu={requestMenu} isEnabled={false} />);

      const event = rightClick(getByTestId('text'));

      expect(event.defaultPrevented).toBe(false);
      expect(requestMenu).not.toHaveBeenCalled();
    });
  });

  describe('the pick and errors', () => {
    it('hands a picked command to onPick in the same microtask chain as the resolve', async () => {
      const order: string[] = [];
      const pending = deferred<string | undefined>();
      const onPick = vi.fn((command: string, request: EditorContextMenuRequest) => {
        order.push(`pick:${command}:${request.position.x}`);
      });
      const { getByTestId } = render(<Host requestMenu={() => pending.promise} onPick={onPick} />);
      rightClick(getByTestId('text'), 7, 8);

      pending.resolve('cmd');
      order.push('resolved');
      await flush();
      order.push('after-flush');

      expect(onPick).toHaveBeenCalledTimes(1);
      expect(onPick.mock.calls[0][1].position).toEqual({ x: 7, y: 8 });
      expect(order).toEqual(['resolved', 'pick:cmd:7', 'after-flush']);
    });

    it('does not call onPick when the menu closes without a pick', async () => {
      const onPick = vi.fn();
      const { getByTestId } = render(
        <Host requestMenu={() => Promise.resolve(undefined)} onPick={onPick} />,
      );
      rightClick(getByTestId('text'));

      await flush();

      expect(onPick).not.toHaveBeenCalled();
    });

    it.each<PlatformErrorCode>([ABORTED, RESOURCE_EXHAUSTED, FAILED_PRECONDITION])(
      'keeps a %s rejection quiet',
      async (code) => {
        const onError = vi.fn();
        const { getByTestId } = render(
          <Host
            requestMenu={() => Promise.reject(newPlatformError('expected', code))}
            onError={onError}
          />,
        );
        rightClick(getByTestId('text'));

        await flush();

        expect(onError).not.toHaveBeenCalled();
      },
    );

    it('reports any other rejection to onError', async () => {
      const onError = vi.fn();
      const failure = newPlatformError('boom', 'INTERNAL');
      const { getByTestId } = render(
        <Host requestMenu={() => Promise.reject(failure)} onError={onError} />,
      );
      rightClick(getByTestId('text'));

      await flush();

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(failure);
    });

    it('reports a plain error to onError', async () => {
      const onError = vi.fn();
      const { getByTestId } = render(
        <Host requestMenu={() => Promise.reject(new Error('plain'))} onError={onError} />,
      );
      rightClick(getByTestId('text'));

      await flush();

      expect(onError).toHaveBeenCalledTimes(1);
    });
  });

  describe('isPending', () => {
    it('is true from the right-click until the request resolves', async () => {
      const pending = deferred<string | undefined>();
      let api!: ReturnType<typeof useEditorContextMenu>;
      const { getByTestId } = render(
        <Host
          requestMenu={() => pending.promise}
          onApi={(value) => {
            api = value;
          }}
        />,
      );
      expect(api.isPending()).toBe(false);

      rightClick(getByTestId('text'));
      expect(api.isPending()).toBe(true);

      pending.resolve(undefined);
      await flush();
      expect(api.isPending()).toBe(false);
    });

    it('is false again after the request rejects', async () => {
      const pending = deferred<string | undefined>();
      let api!: ReturnType<typeof useEditorContextMenu>;
      const { getByTestId } = render(
        <Host
          requestMenu={() => pending.promise}
          onError={() => {}}
          onApi={(value) => {
            api = value;
          }}
        />,
      );
      rightClick(getByTestId('text'));
      expect(api.isPending()).toBe(true);

      pending.reject(new Error('x'));
      await flush();

      expect(api.isPending()).toBe(false);
    });
  });

  describe('closing on a user scroll', () => {
    it('dismisses on wheel and touchmove while pending, and not on a scroll event alone', () => {
      const dismissMenu = vi.fn();
      const { getByTestId } = render(
        <Host
          requestMenu={() => new Promise<string | undefined>(() => {})}
          dismissMenu={dismissMenu}
        />,
      );
      rightClick(getByTestId('text'));

      fireEvent.scroll(window);
      fireEvent.scroll(getByTestId('container'));
      expect(dismissMenu).not.toHaveBeenCalled();

      fireEvent.wheel(window);
      expect(dismissMenu).toHaveBeenCalledTimes(1);

      fireEvent(window, new Event('touchmove', { bubbles: true }));
      expect(dismissMenu).toHaveBeenCalledTimes(2);
    });

    it('ignores wheel and touchmove while no request is pending', () => {
      const dismissMenu = vi.fn();
      render(
        <Host
          requestMenu={() => new Promise<string | undefined>(() => {})}
          dismissMenu={dismissMenu}
        />,
      );

      fireEvent.wheel(window);
      fireEvent(window, new Event('touchmove', { bubbles: true }));

      expect(dismissMenu).not.toHaveBeenCalled();
    });
  });

  describe('the keyboard belongs to the pending menu', () => {
    function keydown(key: string, init: KeyboardEventInit = {}) {
      const event = new KeyboardEvent('keydown', {
        key,
        bubbles: true,
        cancelable: true,
        ...init,
      });
      act(() => {
        document.body.dispatchEvent(event);
      });
      return event;
    }

    it('claims every key but bare modifiers before a later window listener sees it', () => {
      const dismissMenu = vi.fn();
      const later = vi.fn();
      const { getByTestId } = render(
        <Host
          requestMenu={() => new Promise<string | undefined>(() => {})}
          dismissMenu={dismissMenu}
        />,
      );
      // Registered after the hook's own listener, on the same window, capture phase.
      window.addEventListener('keydown', later, true);
      rightClick(getByTestId('text'));

      const a = keydown('a');
      const enter = keydown('Enter');
      const shift = keydown('Shift');

      expect(a.defaultPrevented).toBe(true);
      expect(enter.defaultPrevented).toBe(true);
      expect(shift.defaultPrevented).toBe(false);
      expect(
        later.mock.calls.map(([event]) => (event instanceof KeyboardEvent ? event.key : '')),
      ).toEqual(['Shift']);
      expect(dismissMenu).not.toHaveBeenCalled();

      window.removeEventListener('keydown', later, true);
    });

    it('also dismisses the menu on Escape', () => {
      const dismissMenu = vi.fn();
      const { getByTestId } = render(
        <Host
          requestMenu={() => new Promise<string | undefined>(() => {})}
          dismissMenu={dismissMenu}
        />,
      );
      rightClick(getByTestId('text'));

      const escape = keydown('Escape');

      expect(escape.defaultPrevented).toBe(true);
      expect(dismissMenu).toHaveBeenCalledTimes(1);
    });

    it('leaves keys alone while nothing is pending', () => {
      const later = vi.fn();
      const dismissMenu = vi.fn();
      render(
        <Host
          requestMenu={() => new Promise<string | undefined>(() => {})}
          dismissMenu={dismissMenu}
        />,
      );
      window.addEventListener('keydown', later, true);

      const a = keydown('a');
      const escape = keydown('Escape');

      expect(a.defaultPrevented).toBe(false);
      expect(escape.defaultPrevented).toBe(false);
      expect(later).toHaveBeenCalledTimes(2);
      expect(dismissMenu).not.toHaveBeenCalled();

      window.removeEventListener('keydown', later, true);
    });
  });

  describe('a keyboard-raised contextmenu', () => {
    function keyboardContextMenu(target: Element) {
      const event = new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        button: 0,
        clientX: 0,
        clientY: 0,
      });
      act(() => {
        target.dispatchEvent(event);
      });
      return event;
    }

    it('positions the menu at the last client rect of the selection range', () => {
      const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);
      selectNodeContents(getByTestId('text'));
      const rects = [
        { left: 10, top: 20, right: 30, bottom: 40, width: 20, height: 20 },
        { left: 55, top: 60, right: 75, bottom: 80, width: 20, height: 20 },
      ];
      stubRangeClientRects(rects);

      keyboardContextMenu(getByTestId('container'));

      expect(requestMenu).toHaveBeenCalledWith(
        expect.objectContaining({
          isKeyboardInvoked: true,
          position: { x: 75, y: 80 },
        }),
      );
    });

    it('uses the range bounding rect when a collapsed caret has no client rects', () => {
      const requestMenu = vi.fn<UseEditorContextMenuOptions['requestMenu']>(
        () => new Promise(() => {}),
      );
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);
      const range = document.createRange();
      range.setStart(getByTestId('text'), 0);
      range.collapse(true);
      addRangeAsSelection(range);
      stubRangeClientRects([]);
      stubRangeBoundingRect(new DOMRect(100, 200, 2, 18));

      keyboardContextMenu(getByTestId('container'));

      expect(requestMenu.mock.calls[0][0].position).toEqual({ x: 102, y: 218 });
    });

    it('falls back to the container rect clipped to the viewport plus an inset', () => {
      const requestMenu = vi.fn<UseEditorContextMenuOptions['requestMenu']>(
        () => new Promise(() => {}),
      );
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);
      const container = getByTestId('container');
      const range = document.createRange();
      range.setStart(getByTestId('text'), 0);
      range.collapse(true);
      addRangeAsSelection(range);
      stubRangeClientRects([]);
      stubRangeBoundingRect(new DOMRect(0, 0, 0, 0));
      // Container starts above and left of the viewport: its visible part begins at 0,0.
      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(
        new DOMRect(-100, -200, 500, 900),
      );

      keyboardContextMenu(container);

      const [{ position, isKeyboardInvoked }] = requestMenu.mock.calls[0];
      expect(isKeyboardInvoked).toBe(true);
      expect(position.x).toBeGreaterThan(0);
      expect(position.x).toBeLessThan(40);
      expect(position.y).toBeGreaterThan(0);
      expect(position.y).toBeLessThan(40);
      // Same inset on both axes: the clip put both corners at the viewport origin.
      expect(position.x).toBe(position.y);
    });
  });

  it('dismisses a pending menu on unmount, and not when nothing is pending', () => {
    const dismissMenu = vi.fn();
    const idle = render(
      <Host
        requestMenu={() => new Promise<string | undefined>(() => {})}
        dismissMenu={dismissMenu}
      />,
    );
    idle.unmount();
    expect(dismissMenu).not.toHaveBeenCalled();

    const open = render(
      <Host
        requestMenu={() => new Promise<string | undefined>(() => {})}
        dismissMenu={dismissMenu}
      />,
    );
    rightClick(open.getByTestId('text'));
    open.unmount();

    expect(dismissMenu).toHaveBeenCalledTimes(1);
  });

  it('keeps the newest request pending when an older one settles', async () => {
    const first = deferred<string | undefined>();
    const second = deferred<string | undefined>();
    const queue = [first, second];
    let api!: ReturnType<typeof useEditorContextMenu>;
    const { getByTestId } = render(
      <Host
        requestMenu={() => queue.shift()?.promise ?? Promise.resolve(undefined)}
        onApi={(value) => {
          api = value;
        }}
      />,
    );
    rightClick(getByTestId('text'));
    rightClick(getByTestId('text'));

    first.resolve(undefined);
    await flush();
    expect(api.isPending()).toBe(true);

    second.resolve(undefined);
    await flush();
    expect(api.isPending()).toBe(false);
  });

  it('sends a failure thrown by onPick to onError even when it carries an expected code', async () => {
    const onError = vi.fn();
    const failure = newPlatformError('pick failed', ABORTED);
    const { getByTestId } = render(
      <Host
        requestMenu={() => Promise.resolve('cmd')}
        onPick={() => {
          throw failure;
        }}
        onError={onError}
      />,
    );
    rightClick(getByTestId('text'));

    await flush();

    expect(onError).toHaveBeenCalledWith(failure);
  });

  it('dismiss() closes a pending menu through dismissMenu', () => {
    const dismissMenu = vi.fn();
    let api!: ReturnType<typeof useEditorContextMenu>;
    const { getByTestId } = render(
      <Host
        requestMenu={() => new Promise<string | undefined>(() => {})}
        dismissMenu={dismissMenu}
        onApi={(value) => {
          api = value;
        }}
      />,
    );
    rightClick(getByTestId('text'));

    act(() => api.dismiss());

    expect(dismissMenu).toHaveBeenCalledTimes(1);
  });
});
