import {
  ABORTED,
  FAILED_PRECONDITION,
  isPlatformError,
  RESOURCE_EXHAUSTED,
} from 'platform-bible-utils';
import { RefObject, useCallback, useEffect, useRef } from 'react';
import { isMacOs } from '@/utils/platform.util';

/**
 * What the platform context menu needs to know about one right-click (or keyboard-raised context
 * menu) in an editor.
 *
 * @experimental This type is unstable and may change shape or disappear without notice
 */
export type EditorContextMenuRequest = {
  /**
   * Frame-relative position the menu opens at, in the coordinates `showContextMenu` expects.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  position: { x: number; y: number };
  /**
   * Whether the browser selection is non-collapsed and inside the container, or the host reports a
   * non-text selection.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  hasSelection: boolean;
  /**
   * Text of the browser selection when it is inside the container, `''` otherwise.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  selectedText: string;
  /**
   * Whether the context menu came from the keyboard (Shift+F10, the Menu key) rather than a mouse
   * click.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  isKeyboardInvoked: boolean;
};

/**
 * Options for {@link useEditorContextMenu}.
 *
 * @experimental This type is unstable and may change shape or disappear without notice
 */
export type UseEditorContextMenuOptions = {
  /**
   * The editor's own element. Never a wrapper that holds other editors: a right-click anywhere
   * inside it is claimed.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  containerRef: RefObject<HTMLElement | null>;
  /**
   * Whether right-clicks are claimed. Defaults to `true`.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  isEnabled?: boolean;
  /**
   * Reports a selection that is not a browser range (for example a selected paragraph marker), so
   * Copy stays enabled for it.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  hasNonTextSelection?: () => boolean;
  /**
   * Opens the platform menu and resolves with the picked command, or `undefined` when the menu
   * closed without a pick.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  requestMenu: (request: EditorContextMenuRequest) => Promise<string | undefined>;
  /**
   * Closes the open platform menu.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  dismissMenu: () => void | Promise<void>;
  /**
   * Runs synchronously in the continuation of `requestMenu` when the user picked a command.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  onPick: (command: string, request: EditorContextMenuRequest) => void;
  /**
   * Receives any rejection of `requestMenu` or `dismissMenu` other than the expected ones (a newer
   * menu replaced this one, debounce, tab not visible), and anything `onPick` throws. The hook
   * swallows an unexpected failure only when this is absent, and never lets a throwing `onError`
   * escape.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  onError?: (error: unknown) => void;
};

/**
 * What {@link useEditorContextMenu} hands back.
 *
 * @experimental This type is unstable and may change shape or disappear without notice
 */
export type UseEditorContextMenuResult = {
  /**
   * Closes the pending menu, if any. For the host's own reasons (a book or chapter change).
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  dismiss: () => void;
  /**
   * Whether a request is open: true from the right-click until the request settles, is dismissed or
   * dropped (the user clicks back into the frame), or the hook unmounts.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  isPending: () => boolean;
};

const INTERACTIVE_SELECTOR = 'button, a, input, select, textarea, [role="combobox"]';
const QUIET_ERROR_CODES: ReadonlySet<string> = new Set([
  ABORTED,
  RESOURCE_EXHAUSTED,
  FAILED_PRECONDITION,
]);
/** Distance in pixels from the frame's edge or the container's corner for a keyboard-raised menu. */
const KEYBOARD_FALLBACK_INSET = 8;

function isQuietError(error: unknown): boolean {
  return isPlatformError(error) && error.code !== undefined && QUIET_ERROR_CODES.has(error.code);
}

// Duck-typed rather than `instanceof`: a target from another realm (an iframe) fails the check
// against this realm's `Node` and `Element`.
function isNode(value: unknown): value is Node {
  return typeof value === 'object' && !!value && 'nodeType' in value;
}

function isElement(node: Node): node is Element {
  return node.nodeType === 1;
}

/**
 * Whether a `contextmenu` event came from the keyboard. Shift+F10 and the Menu key send `button`
 * -1, a right-click sends 2, and a macOS Ctrl+click sends 0 with `ctrlKey`, which is a mouse
 * right-click too. Anything else counts as keyboard-raised. That includes a touch long-press, which
 * sends button 0 without Ctrl, so its menu opens at the caret rather than under the finger;
 * `pointerType` cannot tell them apart (the keys report `"mouse"` too).
 */
function isKeyboardRaised(event: MouseEvent): boolean {
  return event.button !== 2 && !isCtrlPrimaryClick(event);
}

/** Whether a mouse event is a primary-button press with Ctrl held: a right-click on macOS. */
function isCtrlPrimaryClick(event: MouseEvent): boolean {
  return event.button === 0 && event.ctrlKey;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

/** The browser selection when it is non-collapsed and lies inside the container. */
function getSelectionInside(container: HTMLElement): Selection | undefined {
  const selection = container.ownerDocument.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return undefined;
  if (!selection.anchorNode || !selection.focusNode) return undefined;
  if (!container.contains(selection.anchorNode) || !container.contains(selection.focusNode))
    return undefined;
  return selection;
}

/**
 * Where a keyboard-raised menu opens: at the caret (the selection's focus, which is the right end
 * for a backward selection and in right-to-left text), else in the visible part of the container.
 * Always inside the frame's viewport.
 */
function getKeyboardPosition(container: HTMLElement): { x: number; y: number } {
  const inset = KEYBOARD_FALLBACK_INSET;
  const place = (x: number, y: number) => ({
    x: clamp(x, inset, window.innerWidth - inset),
    y: clamp(y, inset, window.innerHeight - inset),
  });

  const doc = container.ownerDocument;
  const selection = doc.getSelection();
  const { focusNode } = selection ?? {};
  if (selection && focusNode && selection.rangeCount > 0 && container.contains(focusNode)) {
    try {
      const caret = doc.createRange();
      caret.setStart(focusNode, selection.focusOffset);
      caret.collapse(true);
      const rects = caret.getClientRects();
      if (rects.length > 0) {
        const last = rects[rects.length - 1];
        return place(last.left, last.bottom);
      }
      // A collapsed caret often has no client rect list but does have a bounding rect.
      const bounds = caret.getBoundingClientRect?.();
      if (bounds && (bounds.width > 0 || bounds.height > 0))
        return place(bounds.left, bounds.bottom);
    } catch {
      // An offset that went stale in the same turn cannot be measured; use the container instead.
    }
  }

  let box = container.getBoundingClientRect();
  // A `display: contents` container has no box of its own; its first child with one stands in.
  if (box.width === 0 && box.height === 0) {
    const sizedChild = Array.from(container.children)
      .map((child) => child.getBoundingClientRect())
      .find((childBox) => childBox.width > 0 || childBox.height > 0);
    if (sizedChild) box = sizedChild;
  }
  return place(Math.max(box.left, 0) + inset, Math.max(box.top, 0) + inset);
}

/**
 * Claims the right-click inside one editor, samples what the menu needs to know, asks the host to
 * open the platform context menu, and hands the picked command back. The library cannot reach PAPI,
 * so the host passes the two platform calls in.
 *
 * The listeners sit on the frame's own document and window and resolve `containerRef.current` when
 * an event arrives, so a container that mounts late or is rebuilt is still served. The container
 * must be the editor's own element, never a wrapper that holds other editors, and must live in the
 * document the hook runs in.
 *
 * A `wheel`, `touchmove` or a `pointerdown` in the frame closes the open menu (a `pointerdown` also
 * drops the request, so a late pick never reaches `onPick`, except the right-click the hook itself
 * claims). Not a `scroll` listener: opening the menu blurs the editor, which can scroll the frame
 * by itself and would close the menu the moment it opens.
 *
 * A pick that resolves after `dismiss()`, after the pointer-down drop, or after unmount is ignored.
 *
 * One instance per editor.
 *
 * @param options See {@link UseEditorContextMenuOptions}
 * @returns `dismiss` and `isPending`, see {@link UseEditorContextMenuResult}
 * @experimental This hook is unstable and may change shape or disappear without notice
 */
export function useEditorContextMenu(
  options: UseEditorContextMenuOptions,
): UseEditorContextMenuResult {
  // Everything reads the latest options at the time it is used, so a host can pass inline closures.
  const optionsRef = useRef(options);
  optionsRef.current = options;

  /** Ids of the requests whose `requestMenu` promise has not settled and was not dropped. */
  const openRequestsRef = useRef(new Set<number>());
  /** Ids of requests that were dismissed or dropped: their pick must not reach `onPick`. */
  const dismissedRequestsRef = useRef(new Set<number>());
  const nextRequestIdRef = useRef(0);
  const isUnmountedRef = useRef(false);

  const reportError = useCallback((error: unknown) => {
    if (isQuietError(error)) return;
    try {
      optionsRef.current.onError?.(error);
    } catch {
      // A failing error handler must not turn into an unhandled rejection.
    }
  }, []);

  const callDismissMenu = useCallback(() => {
    try {
      Promise.resolve(optionsRef.current.dismissMenu()).catch(reportError);
    } catch (error) {
      reportError(error);
    }
  }, [reportError]);

  /** Closes the menu; a pick for any request open right now will be ignored. */
  const dismissOpenRequests = useCallback(() => {
    openRequestsRef.current.forEach((id) => dismissedRequestsRef.current.add(id));
    callDismissMenu();
  }, [callDismissMenu]);

  /** Closes the menu and forgets the open requests, as when the user clicks back into the frame. */
  const dropOpenRequests = useCallback(() => {
    dismissOpenRequests();
    openRequestsRef.current.clear();
  }, [dismissOpenRequests]);

  const dismiss = useCallback(() => {
    if (openRequestsRef.current.size > 0) dismissOpenRequests();
  }, [dismissOpenRequests]);

  const isPending = useCallback(() => openRequestsRef.current.size > 0, []);

  useEffect(() => {
    isUnmountedRef.current = false;
    const openRequests = openRequestsRef.current;
    // The hook runs in the web view's own frame, so these globals are the frame's document and
    // window. The container is resolved per event: it may not exist yet, or be rebuilt later.
    const doc = document;
    const win = window;

    /** The container when this event's target is somewhere the hook claims a right-click. */
    const findClaimingContainer = (target: EventTarget | null): HTMLElement | undefined => {
      const { containerRef, isEnabled = true } = optionsRef.current;
      if (!isEnabled) return undefined;
      const container = containerRef.current;
      if (!container || !container.isConnected || !isNode(target) || !container.contains(target))
        return undefined;
      const targetElement = isElement(target) ? target : target.parentElement;
      const interactive = targetElement?.closest(INTERACTIVE_SELECTOR);
      if (interactive && interactive !== container && container.contains(interactive))
        return undefined;
      return container;
    };

    const handleContextMenu = (event: MouseEvent) => {
      const container = findClaimingContainer(event.target);
      if (!container) return;
      const { hasNonTextSelection } = optionsRef.current;

      event.preventDefault();

      // Read from the browser now: the editor learns of a selection change only after the event.
      const selection = getSelectionInside(container);
      const isKeyboardInvoked = isKeyboardRaised(event);
      const request: EditorContextMenuRequest = {
        position: isKeyboardInvoked
          ? getKeyboardPosition(container)
          : { x: event.clientX, y: event.clientY },
        hasSelection: !!selection || !!hasNonTextSelection?.(),
        selectedText: selection ? selection.toString() : '',
        isKeyboardInvoked,
      };

      nextRequestIdRef.current += 1;
      const requestId = nextRequestIdRef.current;
      openRequestsRef.current.add(requestId);

      const settle = () => {
        openRequestsRef.current.delete(requestId);
        return dismissedRequestsRef.current.delete(requestId) || isUnmountedRef.current;
      };

      const run = async () => {
        let command: string | undefined;
        try {
          command = await optionsRef.current.requestMenu(request);
        } catch (error) {
          settle();
          reportError(error);
          return;
        }
        const isIgnored = settle();
        if (command === undefined || isIgnored) return;
        try {
          optionsRef.current.onPick(command, request);
        } catch (error) {
          // A failing pick is the host's own bug, never one of the expected quiet rejections.
          try {
            optionsRef.current.onError?.(error);
          } catch {
            // A failing error handler must not turn into an unhandled rejection.
          }
        }
      };
      // `run` handles every failure itself; nothing escapes to await.
      run();
    };

    const handleUserScroll = () => {
      if (openRequestsRef.current.size > 0) dismissOpenRequests();
    };

    const handlePointerDown = (event: PointerEvent) => {
      // A right-click the hook will claim (a macOS Ctrl+click included) replaces the open menu with
      // its own request, so it must not also dismiss. Any other pointerdown, a right-click
      // elsewhere included, closes the menu. Only macOS turns a Ctrl+click into a `contextmenu`;
      // elsewhere it is an ordinary click and closes the menu like any other.
      const isRightClickPress = event.button === 2 || (isCtrlPrimaryClick(event) && isMacOs());
      if (isRightClickPress && findClaimingContainer(event.target)) return;
      if (openRequestsRef.current.size > 0) dropOpenRequests();
    };

    // Hidden-tab case: intentionally not handled. A hidden tab receives no right-click, and
    // `showContextMenu` refuses a tab that is not visible, so no request can be pending there.
    doc.addEventListener('contextmenu', handleContextMenu, true);
    win.addEventListener('wheel', handleUserScroll, { capture: true, passive: true });
    win.addEventListener('touchmove', handleUserScroll, { capture: true, passive: true });
    win.addEventListener('pointerdown', handlePointerDown, true);
    return () => {
      doc.removeEventListener('contextmenu', handleContextMenu, true);
      win.removeEventListener('wheel', handleUserScroll, true);
      win.removeEventListener('touchmove', handleUserScroll, true);
      win.removeEventListener('pointerdown', handlePointerDown, true);
      // A menu still open when the editor goes away must not outlive it, nor pick into it.
      isUnmountedRef.current = true;
      if (openRequests.size > 0) dismissOpenRequests();
    };
  }, [dismissOpenRequests, dropOpenRequests, reportError]);

  return { dismiss, isPending };
}

export default useEditorContextMenu;
