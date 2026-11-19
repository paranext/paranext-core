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
  /** Whether the container element is rendered at all (default true). */
  showContainer?: boolean;
  /** Changing it rebuilds the container element, as a remounting editor wrapper does. */
  containerKey?: string;
};

function Host({ onApi, showContainer = true, containerKey = 'a', ...options }: HostProps) {
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
      {showContainer && (
        <div ref={containerRef} data-testid="container" key={containerKey}>
          <p data-testid="text">some editor text</p>
          <button type="button" data-testid="button">
            control
          </button>
          <a href="#x" data-testid="a">
            link
          </a>
          <input data-testid="input" />
          <select data-testid="select">
            <option>one</option>
          </select>
          <textarea data-testid="textarea" />
          <div
            role="combobox"
            aria-expanded="false"
            aria-controls="none"
            aria-label="combobox"
            data-testid="combobox"
          />
        </div>
      )}
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
function stubRangeClientRects(rects: object[] | ((range: Range) => object[])) {
  Object.defineProperty(Range.prototype, 'getClientRects', {
    configurable: true,
    writable: true,
    value(this: Range) {
      return typeof rects === 'function' ? rects(this) : rects;
    },
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

      // Registered after the hook's own continuation: runs first only if the pick is delayed.
      pending.promise.then(() => order.push('later-then')).catch(() => {});
      pending.resolve('cmd');
      order.push('resolved');
      await flush();
      order.push('after-flush');

      expect(onPick).toHaveBeenCalledTimes(1);
      expect(onPick.mock.calls[0][1].position).toEqual({ x: 7, y: 8 });
      expect(order).toEqual(['resolved', 'pick:cmd:7', 'later-then', 'after-flush']);
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

    it('positions the menu at the caret: the focus end of the selection', () => {
      const requestMenu = vi.fn<UseEditorContextMenuOptions['requestMenu']>(
        () => new Promise(() => {}),
      );
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);
      const textNode = getByTestId('text').firstChild;
      if (!textNode) throw new Error('missing text node');
      // A backward selection: anchor at 9, focus at 2. The caret is where the focus is.
      window.getSelection()?.setBaseAndExtent(textNode, 9, textNode, 2);
      stubRangeClientRects((range) =>
        range.collapsed
          ? [{ left: range.startOffset * 10, top: 1, right: 0, bottom: 80, width: 0, height: 19 }]
          : [{ left: 999, top: 999, right: 999, bottom: 999, width: 0, height: 0 }],
      );

      keyboardContextMenu(getByTestId('container'));

      expect(requestMenu).toHaveBeenCalledWith(
        expect.objectContaining({ isKeyboardInvoked: true, position: { x: 20, y: 80 } }),
      );
    });

    it('falls back to the container when the selection focus offset cannot be measured', () => {
      const requestMenu = vi.fn<UseEditorContextMenuOptions['requestMenu']>(
        () => new Promise(() => {}),
      );
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);
      selectNodeContents(getByTestId('text'));
      stubRangeClientRects(() => {
        throw new Error('IndexSizeError');
      });
      vi.spyOn(getByTestId('container'), 'getBoundingClientRect').mockReturnValue(
        new DOMRect(50, 60, 200, 200),
      );

      const event = keyboardContextMenu(getByTestId('container'));

      expect(event.defaultPrevented).toBe(true);
      expect(requestMenu.mock.calls[0][0].position).toEqual({ x: 58, y: 68 });
    });

    it('ignores a selection outside the container and uses the container fallback', () => {
      const requestMenu = vi.fn<UseEditorContextMenuOptions['requestMenu']>(
        () => new Promise(() => {}),
      );
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);
      selectNodeContents(getByTestId('outside'));
      stubRangeClientRects([{ left: 300, top: 300, right: 300, bottom: 300, width: 0, height: 0 }]);
      vi.spyOn(getByTestId('container'), 'getBoundingClientRect').mockReturnValue(
        new DOMRect(50, 60, 200, 200),
      );

      keyboardContextMenu(getByTestId('container'));

      expect(requestMenu.mock.calls[0][0].position).toEqual({ x: 58, y: 68 });
    });

    it('keeps a caret that is scrolled out of the frame inside the viewport', () => {
      const requestMenu = vi.fn<UseEditorContextMenuOptions['requestMenu']>(
        () => new Promise(() => {}),
      );
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);
      selectNodeContents(getByTestId('text'));
      stubRangeClientRects([
        { left: 99999, top: 0, right: 99999, bottom: 99999, width: 0, height: 0 },
      ]);

      keyboardContextMenu(getByTestId('container'));

      const { x, y } = requestMenu.mock.calls[0][0].position;
      expect(x).toBeLessThan(window.innerWidth);
      expect(y).toBeLessThan(window.innerHeight);
    });

    it('clips the container fallback to the viewport on the far sides too', () => {
      const requestMenu = vi.fn<UseEditorContextMenuOptions['requestMenu']>(
        () => new Promise(() => {}),
      );
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);
      vi.spyOn(getByTestId('container'), 'getBoundingClientRect').mockReturnValue(
        new DOMRect(window.innerWidth + 500, window.innerHeight + 500, 300, 300),
      );

      keyboardContextMenu(getByTestId('container'));

      const { x, y } = requestMenu.mock.calls[0][0].position;
      expect(x).toBeLessThan(window.innerWidth);
      expect(y).toBeLessThan(window.innerHeight);
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

      expect(requestMenu.mock.calls[0][0].position).toEqual({ x: 100, y: 218 });
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

  describe('a container that appears or changes after mount', () => {
    it('claims a right-click once a container that mounted late exists', () => {
      const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
      const { getByTestId, rerender } = render(
        <Host requestMenu={requestMenu} showContainer={false} />,
      );
      const before = rightClick(getByTestId('outside'));
      expect(before.defaultPrevented).toBe(false);

      rerender(<Host requestMenu={requestMenu} showContainer />);
      const after = rightClick(getByTestId('text'));

      expect(after.defaultPrevented).toBe(true);
      expect(requestMenu).toHaveBeenCalledTimes(1);
    });

    it('claims a right-click in a container that was rebuilt, and in none that was removed', () => {
      const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
      const { getByTestId, rerender } = render(<Host requestMenu={requestMenu} containerKey="a" />);
      const oldText = getByTestId('text');

      rerender(<Host requestMenu={requestMenu} containerKey="b" />);
      expect(oldText.isConnected).toBe(false);
      const claimed = rightClick(getByTestId('text'));
      expect(claimed.defaultPrevented).toBe(true);
      expect(requestMenu).toHaveBeenCalledTimes(1);

      rerender(<Host requestMenu={requestMenu} showContainer={false} />);
      const gone = rightClick(getByTestId('outside'));
      expect(gone.defaultPrevented).toBe(false);
      expect(requestMenu).toHaveBeenCalledTimes(1);
    });

    it('claims a target whose realm differs from the frame', () => {
      const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      const foreign = iframe.contentDocument?.createElement('span');
      if (!foreign) throw new Error('jsdom iframe has no document');
      getByTestId('container').appendChild(foreign);
      // Precondition: the host realm's `Node` does not recognise this element.
      expect(foreign instanceof Node).toBe(false);

      const event = rightClick(foreign);

      expect(event.defaultPrevented).toBe(true);
      expect(requestMenu).toHaveBeenCalledTimes(1);
      iframe.remove();
    });
  });

  describe('target rule details', () => {
    it.each(['button', 'a', 'input', 'select', 'textarea', 'combobox'])(
      'does not claim a right-click on the interactive %s',
      (testId) => {
        const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
        const { getByTestId } = render(<Host requestMenu={requestMenu} />);

        const event = rightClick(getByTestId(testId));

        expect(event.defaultPrevented).toBe(false);
        expect(requestMenu).not.toHaveBeenCalled();
      },
    );

    it('claims text inside the container after the options changed by a rerender', () => {
      const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
      const { getByTestId, rerender } = render(<Host requestMenu={requestMenu} />);

      rerender(<Host requestMenu={requestMenu} isEnabled={false} />);
      const event = rightClick(getByTestId('text'));

      expect(event.defaultPrevented).toBe(false);
      expect(requestMenu).not.toHaveBeenCalled();
    });

    it('does not report a selection whose focus is outside the container', () => {
      const requestMenu = vi.fn(() => new Promise<string | undefined>(() => {}));
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);
      const inside = getByTestId('text').firstChild;
      const outside = getByTestId('outside').firstChild;
      if (!inside || !outside) throw new Error('missing text nodes');
      window.getSelection()?.setBaseAndExtent(inside, 0, outside, 3);

      rightClick(getByTestId('text'));

      expect(requestMenu).toHaveBeenCalledWith(
        expect.objectContaining({ hasSelection: false, selectedText: '' }),
      );
    });
  });

  describe('open requests', () => {
    it('stays pending while a first request is open and a second is rejected by the debounce', async () => {
      const first = deferred<string | undefined>();
      const second = deferred<string | undefined>();
      const queue = [first, second];
      const dismissMenu = vi.fn();
      let api!: ReturnType<typeof useEditorContextMenu>;
      const { getByTestId } = render(
        <Host
          requestMenu={() => queue.shift()?.promise ?? Promise.resolve(undefined)}
          dismissMenu={dismissMenu}
          onApi={(value) => {
            api = value;
          }}
        />,
      );
      rightClick(getByTestId('text'));
      rightClick(getByTestId('text'));

      second.reject(newPlatformError('debounced', RESOURCE_EXHAUSTED));
      await flush();
      expect(api.isPending()).toBe(true);
      fireEvent.wheel(window);
      expect(dismissMenu).toHaveBeenCalledTimes(1);

      first.resolve(undefined);
      await flush();
      expect(api.isPending()).toBe(false);
    });

    it('does not pick after dismiss() was called while the request was open', async () => {
      const pending = deferred<string | undefined>();
      const onPick = vi.fn();
      let api!: ReturnType<typeof useEditorContextMenu>;
      const { getByTestId } = render(
        <Host
          requestMenu={() => pending.promise}
          onPick={onPick}
          onApi={(value) => {
            api = value;
          }}
        />,
      );
      rightClick(getByTestId('text'));

      act(() => api.dismiss());
      pending.resolve('cmd');
      await flush();

      expect(onPick).not.toHaveBeenCalled();
    });

    it('does not pick after unmount', async () => {
      const pending = deferred<string | undefined>();
      const onPick = vi.fn();
      const { getByTestId, unmount } = render(
        <Host requestMenu={() => pending.promise} onPick={onPick} />,
      );
      rightClick(getByTestId('text'));

      unmount();
      pending.resolve('cmd');
      await flush();

      expect(onPick).not.toHaveBeenCalled();
    });

    it('picks with the latest onPick, not the one from the right-click', async () => {
      const pending = deferred<string | undefined>();
      const oldPick = vi.fn();
      const newPick = vi.fn();
      const { getByTestId, rerender } = render(
        <Host requestMenu={() => pending.promise} onPick={oldPick} />,
      );
      rightClick(getByTestId('text'));

      rerender(<Host requestMenu={() => pending.promise} onPick={newPick} />);
      pending.resolve('cmd');
      await flush();

      expect(oldPick).not.toHaveBeenCalled();
      expect(newPick).toHaveBeenCalledTimes(1);
    });

    it('does not turn a throwing onError into an unhandled rejection', async () => {
      const onError = vi.fn(() => {
        throw new Error('handler failed');
      });
      const { getByTestId } = render(
        <Host requestMenu={() => Promise.reject(new Error('boom'))} onError={onError} />,
      );
      rightClick(getByTestId('text'));

      await flush();

      expect(onError).toHaveBeenCalledTimes(1);
    });

    it('swallows an unexpected failure when there is no onError', async () => {
      const requestMenu = vi.fn(() => Promise.reject(new Error('boom')));
      const { getByTestId } = render(<Host requestMenu={requestMenu} />);
      rightClick(getByTestId('text'));

      await flush();

      expect(requestMenu).toHaveBeenCalledTimes(1);
    });
  });

  describe('the key claim is bounded', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    function keydownOnBody(key: string) {
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
      act(() => {
        document.body.dispatchEvent(event);
      });
      return event;
    }

    it('claims keys until two seconds after the right-click, while the request stays pending', () => {
      let api!: ReturnType<typeof useEditorContextMenu>;
      const { getByTestId } = render(
        <Host
          requestMenu={() => new Promise<string | undefined>(() => {})}
          onApi={(value) => {
            api = value;
          }}
        />,
      );
      rightClick(getByTestId('text'));

      act(() => {
        vi.advanceTimersByTime(1900);
      });
      expect(keydownOnBody('a').defaultPrevented).toBe(true);

      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(keydownOnBody('a').defaultPrevented).toBe(false);
      expect(api.isPending()).toBe(true);
    });

    it('ends the claim when the request settles, well before two seconds', async () => {
      const pending = deferred<string | undefined>();
      const { getByTestId } = render(<Host requestMenu={() => pending.promise} />);
      rightClick(getByTestId('text'));

      act(() => {
        vi.advanceTimersByTime(500);
      });
      pending.resolve(undefined);
      await flush();

      expect(keydownOnBody('a').defaultPrevented).toBe(false);
    });

    it('keeps the claim while a second request is still open after the first settles', async () => {
      const first = deferred<string | undefined>();
      const second = deferred<string | undefined>();
      const queue = [first, second];
      const { getByTestId } = render(
        <Host requestMenu={() => queue.shift()?.promise ?? Promise.resolve(undefined)} />,
      );
      rightClick(getByTestId('text'));
      rightClick(getByTestId('text'));

      first.reject(newPlatformError('replaced', ABORTED));
      await flush();

      expect(keydownOnBody('a').defaultPrevented).toBe(true);
    });

    it('drops the open request on a pointerdown in the frame', async () => {
      const pending = deferred<string | undefined>();
      const dismissMenu = vi.fn();
      const onPick = vi.fn();
      let api!: ReturnType<typeof useEditorContextMenu>;
      const { getByTestId } = render(
        <Host
          requestMenu={() => pending.promise}
          dismissMenu={dismissMenu}
          onPick={onPick}
          onApi={(value) => {
            api = value;
          }}
        />,
      );
      rightClick(getByTestId('text'));

      fireEvent.pointerDown(getByTestId('outside'));

      expect(dismissMenu).toHaveBeenCalledTimes(1);
      expect(api.isPending()).toBe(false);
      expect(keydownOnBody('a').defaultPrevented).toBe(false);
      pending.resolve('cmd');
      await flush();
      expect(onPick).not.toHaveBeenCalled();
    });

    function rightButtonPointerDown(target: Element) {
      // Jsdom lacks PointerEvent; the hook reads only `button`, which a MouseEvent carries.
      fireEvent(
        target,
        new MouseEvent('pointerdown', { bubbles: true, cancelable: true, button: 2 }),
      );
    }

    it('keeps the request open on the pointerdown of a right-click the hook will claim', async () => {
      const first = deferred<string | undefined>();
      const second = deferred<string | undefined>();
      const queue = [first, second];
      const dismissMenu = vi.fn();
      const onPick = vi.fn();
      let api!: ReturnType<typeof useEditorContextMenu>;
      const { getByTestId } = render(
        <Host
          requestMenu={() => queue.shift()?.promise ?? Promise.resolve(undefined)}
          dismissMenu={dismissMenu}
          onPick={onPick}
          onApi={(value) => {
            api = value;
          }}
        />,
      );
      rightClick(getByTestId('text'));

      rightButtonPointerDown(getByTestId('text'));
      expect(dismissMenu).not.toHaveBeenCalled();
      expect(api.isPending()).toBe(true);
      rightClick(getByTestId('text'));
      first.reject(newPlatformError('replaced', ABORTED));
      second.resolve('cmd');
      await flush();

      expect(onPick).toHaveBeenCalledTimes(1);
    });

    it('drops the open request on the pointerdown of a right-click outside the container', () => {
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

      rightButtonPointerDown(getByTestId('outside'));

      expect(dismissMenu).toHaveBeenCalledTimes(1);
      expect(api.isPending()).toBe(false);
    });

    it('drops the open request on the pointerdown of a right-click on an interactive control', () => {
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

      rightButtonPointerDown(getByTestId('a'));

      expect(dismissMenu).toHaveBeenCalledTimes(1);
      expect(api.isPending()).toBe(false);
    });

    it('drops the open request on the pointerdown of a right-click once the hook is disabled', () => {
      const dismissMenu = vi.fn();
      const requestMenu = () => new Promise<string | undefined>(() => {});
      let api!: ReturnType<typeof useEditorContextMenu>;
      const onApi = (value: ReturnType<typeof useEditorContextMenu>) => {
        api = value;
      };
      const { getByTestId, rerender } = render(
        <Host requestMenu={requestMenu} dismissMenu={dismissMenu} onApi={onApi} />,
      );
      rightClick(getByTestId('text'));

      rerender(
        <Host
          requestMenu={requestMenu}
          dismissMenu={dismissMenu}
          onApi={onApi}
          isEnabled={false}
        />,
      );
      rightButtonPointerDown(getByTestId('text'));

      expect(dismissMenu).toHaveBeenCalledTimes(1);
      expect(api.isPending()).toBe(false);
    });

    it('ignores a pointerdown while nothing is pending', () => {
      const dismissMenu = vi.fn();
      const { getByTestId } = render(
        <Host
          requestMenu={() => new Promise<string | undefined>(() => {})}
          dismissMenu={dismissMenu}
        />,
      );

      fireEvent.pointerDown(getByTestId('outside'));

      expect(dismissMenu).not.toHaveBeenCalled();
    });
  });

  describe('wheel dismissal in the capture phase', () => {
    it('still dismisses when something inside the editor stops the wheel event', () => {
      const dismissMenu = vi.fn();
      const { getByTestId } = render(
        <Host
          requestMenu={() => new Promise<string | undefined>(() => {})}
          dismissMenu={dismissMenu}
        />,
      );
      getByTestId('text').addEventListener('wheel', (event) => event.stopPropagation());
      rightClick(getByTestId('text'));

      fireEvent.wheel(getByTestId('text'));

      expect(dismissMenu).toHaveBeenCalledTimes(1);
    });
  });

  describe('bare modifier keys', () => {
    it.each(['Shift', 'Control', 'Alt', 'AltGraph', 'Meta'])(
      'does not claim a bare %s key while pending',
      (key) => {
        const { getByTestId } = render(
          <Host requestMenu={() => new Promise<string | undefined>(() => {})} />,
        );
        rightClick(getByTestId('text'));
        const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });

        act(() => {
          document.body.dispatchEvent(event);
        });

        expect(event.defaultPrevented).toBe(false);
      },
    );
  });

  it('does not call dismissMenu from dismiss() while idle', () => {
    const dismissMenu = vi.fn();
    let api!: ReturnType<typeof useEditorContextMenu>;
    render(
      <Host
        requestMenu={() => new Promise<string | undefined>(() => {})}
        dismissMenu={dismissMenu}
        onApi={(value) => {
          api = value;
        }}
      />,
    );

    act(() => api.dismiss());

    expect(dismissMenu).not.toHaveBeenCalled();
  });

  describe('isClaimingKeys', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    function renderPending() {
      const pending = deferred<string | undefined>();
      let api!: ReturnType<typeof useEditorContextMenu>;
      const utils = render(
        <Host
          requestMenu={() => pending.promise}
          onApi={(value) => {
            api = value;
          }}
        />,
      );
      return { pending, getApi: () => api, ...utils };
    }

    it('is false before any right-click and true right after one', () => {
      const { getApi, getByTestId } = renderPending();
      expect(getApi().isClaimingKeys()).toBe(false);

      rightClick(getByTestId('text'));

      expect(getApi().isClaimingKeys()).toBe(true);
    });

    it('is false once the request settles', async () => {
      const { pending, getApi, getByTestId } = renderPending();
      rightClick(getByTestId('text'));
      expect(getApi().isClaimingKeys()).toBe(true);

      pending.resolve(undefined);
      await flush();

      expect(getApi().isClaimingKeys()).toBe(false);
    });

    it('is false after two seconds while the request is still pending', () => {
      const { getApi, getByTestId } = renderPending();
      rightClick(getByTestId('text'));

      act(() => {
        vi.advanceTimersByTime(1900);
      });
      expect(getApi().isClaimingKeys()).toBe(true);
      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(getApi().isClaimingKeys()).toBe(false);
      expect(getApi().isPending()).toBe(true);
    });

    it('is false after a pointerdown drops the request', () => {
      const { getApi, getByTestId } = renderPending();
      rightClick(getByTestId('text'));

      fireEvent.pointerDown(getByTestId('outside'));

      expect(getApi().isClaimingKeys()).toBe(false);
    });

    it('is false after dismiss()', () => {
      const { getApi, getByTestId } = renderPending();
      rightClick(getByTestId('text'));

      act(() => getApi().dismiss());

      expect(getApi().isClaimingKeys()).toBe(false);
    });

    it('is false after unmount', () => {
      const { getApi, getByTestId, unmount } = renderPending();
      rightClick(getByTestId('text'));
      const { isClaimingKeys } = getApi();

      unmount();

      expect(isClaimingKeys()).toBe(false);
    });
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
