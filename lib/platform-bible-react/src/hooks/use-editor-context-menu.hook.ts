import {
  ABORTED,
  FAILED_PRECONDITION,
  isPlatformError,
  RESOURCE_EXHAUSTED,
} from 'platform-bible-utils';
import { RefObject, useCallback, useEffect, useRef } from 'react';

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
   * Whether a request is open: true from the right-click until the request settles (or the user
   * clicks back into the frame). Hosts read it to keep their own key handling away from a key the
   * pending menu owns. The hook's own key claim is shorter: it lapses two seconds after the
   * right-click even while this stays true.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  isPending: () => boolean;
};

const INTERACTIVE_SELECTOR = 'button, a, input, select, textarea, [role="combobox"]';
const BARE_MODIFIER_KEYS = new Set(['Shift', 'Control', 'Alt', 'AltGraph', 'Meta']);
const QUIET_ERROR_CODES: ReadonlySet<string> = new Set([
  ABORTED,
  RESOURCE_EXHAUSTED,
  FAILED_PRECONDITION,
]);
/** Distance in pixels from the frame's edge or the container's corner for a keyboard-raised menu. */
const KEYBOARD_FALLBACK_INSET = 8;
/**
 * How long after a right-click the hook claims the keyboard. The claim covers the gap before the
 * menu takes focus, but the menu-data request behind it can stall on a busy extension host, and an
 * unbounded claim would leave the editor ignoring every key with no menu on screen. Once the menu
 * is up it holds focus in the app window, so a lapsed claim loses nothing.
 */
const KEY_CLAIM_MS = 2000;

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
    if (bounds && (bounds.width > 0 || bounds.height > 0)) return place(bounds.left, bounds.bottom);
  }

  const box = container.getBoundingClientRect();
  return place(Math.max(box.left, 0) + inset, Math.max(box.top, 0) + inset);
}

/**
 * Claims the right-click inside one editor, samples what the menu needs to know, asks the host to
 * open the platform context menu, and hands the picked command back. The library cannot reach PAPI,
 * so the host passes the two platform calls in.
 *
 * The listeners sit on the frame's own document and window and resolve `containerRef.current` when
 * an event arrives, so a container that mounts late or is rebuilt is still served. The container
 * must be the editor's own element, never a wrapper that holds other editors.
 *
 * While a request is open the keyboard belongs to the menu: every key except bare modifiers is
 * claimed on the frame's window, and Escape also closes the menu. The claim lasts until the request
 * settles or two seconds have passed, whichever comes first. A `wheel`, `touchmove` or a
 * `pointerdown` in the frame closes the menu too (a `pointerdown` also drops the request, so a late
 * pick never reaches `onPick`). Not a `scroll` listener: opening the menu blurs the editor, which
 * can scroll the frame by itself and would close the menu the moment it opens.
 *
 * A pick that resolves after `dismiss()`, after the pointer-down drop, or after unmount is ignored.
 *
 * The key claim is a capture-phase `keydown` listener on the window, registered when the hook
 * mounts. It stops listeners registered after it, but not window-capture listeners registered
 * earlier, which run first: those must gate on `isPending()` themselves.
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
  const isKeyClaimActiveRef = useRef(false);
  const keyClaimTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const reportError = useCallback((error: unknown) => {
    if (isQuietError(error)) return;
    try {
      optionsRef.current.onError?.(error);
    } catch {
      // A failing error handler must not turn into an unhandled rejection.
    }
  }, []);

  const endKeyClaim = useCallback(() => {
    isKeyClaimActiveRef.current = false;
    clearTimeout(keyClaimTimerRef.current);
    keyClaimTimerRef.current = undefined;
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
    endKeyClaim();
  }, [dismissOpenRequests, endKeyClaim]);

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

    const handleContextMenu = (event: MouseEvent) => {
      const { containerRef, isEnabled = true, hasNonTextSelection } = optionsRef.current;
      if (!isEnabled) return;
      const container = containerRef.current;
      const { target } = event;
      if (!container || !container.isConnected || !isNode(target) || !container.contains(target))
        return;
      const targetElement = isElement(target) ? target : target.parentElement;
      const interactive = targetElement?.closest(INTERACTIVE_SELECTOR);
      if (interactive && interactive !== container && container.contains(interactive)) return;

      event.preventDefault();

      // Read from the browser now: the editor learns of a selection change only after the event.
      const selection = getSelectionInside(container);
      // First version of the keyboard check: a mouse-raised event has button 2.
      const isKeyboardInvoked = event.button !== 2;
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
      isKeyClaimActiveRef.current = true;
      clearTimeout(keyClaimTimerRef.current);
      keyClaimTimerRef.current = setTimeout(() => {
        isKeyClaimActiveRef.current = false;
      }, KEY_CLAIM_MS);

      const settle = () => {
        openRequestsRef.current.delete(requestId);
        if (openRequestsRef.current.size === 0) endKeyClaim();
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

    const handlePointerDown = () => {
      if (openRequestsRef.current.size > 0) dropOpenRequests();
    };

    // Hidden-tab case: intentionally not handled. A hidden tab receives no right-click, and
    // `showContextMenu` refuses a tab that is not visible, so no request can be pending there.
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isKeyClaimActiveRef.current || BARE_MODIFIER_KEYS.has(event.key)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.key === 'Escape') dismissOpenRequests();
    };

    doc.addEventListener('contextmenu', handleContextMenu, true);
    win.addEventListener('wheel', handleUserScroll, { capture: true, passive: true });
    win.addEventListener('touchmove', handleUserScroll, { capture: true, passive: true });
    win.addEventListener('pointerdown', handlePointerDown, true);
    win.addEventListener('keydown', handleKeyDown, true);
    return () => {
      doc.removeEventListener('contextmenu', handleContextMenu, true);
      win.removeEventListener('wheel', handleUserScroll, true);
      win.removeEventListener('touchmove', handleUserScroll, true);
      win.removeEventListener('pointerdown', handlePointerDown, true);
      win.removeEventListener('keydown', handleKeyDown, true);
      // A menu still open when the editor goes away must not outlive it, nor pick into it.
      isUnmountedRef.current = true;
      if (openRequests.size > 0) dismissOpenRequests();
      endKeyClaim();
    };
  }, [dismissOpenRequests, dropOpenRequests, endKeyClaim, reportError]);

  return { dismiss, isPending };
}

export default useEditorContextMenu;
