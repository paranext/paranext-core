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
   * menu replaced this one, debounce, tab not visible).
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
   * Whether a request is open: true from the right-click until the request settles. Hosts read it
   * to keep their own key handling away from a key the pending menu owns.
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
/** Distance in pixels from the visible container's corner at which a keyboard-raised menu opens. */
const KEYBOARD_FALLBACK_INSET = 8;

function isQuietError(error: unknown): boolean {
  return isPlatformError(error) && error.code !== undefined && QUIET_ERROR_CODES.has(error.code);
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

/** Where a keyboard-raised menu opens: at the caret, else in the visible part of the container. */
function getKeyboardPosition(container: HTMLElement): { x: number; y: number } {
  const selection = container.ownerDocument.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    if (container.contains(range.commonAncestorContainer)) {
      const rects = range.getClientRects();
      if (rects.length > 0) {
        const last = rects[rects.length - 1];
        return { x: last.right, y: last.bottom };
      }
    }
  }
  const box = container.getBoundingClientRect();
  return {
    x: Math.max(box.left, 0) + KEYBOARD_FALLBACK_INSET,
    y: Math.max(box.top, 0) + KEYBOARD_FALLBACK_INSET,
  };
}

/**
 * Claims the right-click inside one editor, samples what the menu needs to know, asks the host to
 * open the platform context menu, and hands the picked command back. The library cannot reach PAPI,
 * so the host passes the two platform calls in.
 *
 * While a request is open the keyboard belongs to the menu: every key except bare modifiers is
 * claimed on the frame's window, and Escape also closes the menu. A `wheel` or `touchmove` closes
 * it too. Not a `scroll` listener: opening the menu blurs the editor, which can scroll the frame by
 * itself and would close the menu the moment it opens.
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
  // Listeners are attached once and read the latest options, so a host can pass inline closures.
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const isPendingRef = useRef(false);
  /** Identifies the newest request, so an older one settling cannot clear a newer one's state. */
  const latestRequestIdRef = useRef(0);

  const reportError = useCallback((error: unknown) => {
    if (!isQuietError(error)) optionsRef.current.onError?.(error);
  }, []);

  const dismissMenu = useCallback(() => {
    try {
      Promise.resolve(optionsRef.current.dismissMenu()).catch(reportError);
    } catch (error) {
      reportError(error);
    }
  }, [reportError]);

  const dismiss = useCallback(() => {
    if (isPendingRef.current) dismissMenu();
  }, [dismissMenu]);

  const isPending = useCallback(() => isPendingRef.current, []);

  const { containerRef } = options;
  useEffect(() => {
    const container = containerRef.current;
    const win = container?.ownerDocument.defaultView;
    if (!container || !win) return undefined;

    const handleContextMenu = (event: MouseEvent) => {
      const { isEnabled = true, hasNonTextSelection, requestMenu, onPick } = optionsRef.current;
      if (!isEnabled) return;
      const { target } = event;
      if (!(target instanceof Node) || !container.contains(target)) return;
      const targetElement = target instanceof Element ? target : target.parentElement;
      const interactive = targetElement?.closest(INTERACTIVE_SELECTOR);
      if (interactive && interactive !== container && container.contains(interactive)) return;

      event.preventDefault();

      // Read from the browser now: the editor learns of a selection change only after the event.
      const selection = getSelectionInside(container);
      const isKeyboardInvoked = event.button !== 2;
      const request: EditorContextMenuRequest = {
        position: isKeyboardInvoked
          ? getKeyboardPosition(container)
          : { x: event.clientX, y: event.clientY },
        hasSelection: !!selection || !!hasNonTextSelection?.(),
        selectedText: selection ? selection.toString() : '',
        isKeyboardInvoked,
      };

      latestRequestIdRef.current += 1;
      const requestId = latestRequestIdRef.current;
      isPendingRef.current = true;
      const settle = () => {
        if (latestRequestIdRef.current === requestId) isPendingRef.current = false;
      };

      const run = async () => {
        try {
          const command = await requestMenu(request);
          settle();
          if (command !== undefined) onPick(command, request);
        } catch (error) {
          settle();
          reportError(error);
        }
      };
      // `run` handles its own failures; nothing escapes to await.
      run();
    };

    const handleUserScroll = () => {
      if (isPendingRef.current) dismissMenu();
    };

    // Hidden-tab case: intentionally not handled. A hidden tab receives no right-click, and
    // `showContextMenu` refuses a tab that is not visible, so no request can be pending there.
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isPendingRef.current || BARE_MODIFIER_KEYS.has(event.key)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.key === 'Escape') dismissMenu();
    };

    container.addEventListener('contextmenu', handleContextMenu, true);
    win.addEventListener('wheel', handleUserScroll, { passive: true });
    win.addEventListener('touchmove', handleUserScroll, { passive: true });
    win.addEventListener('keydown', handleKeyDown, true);
    return () => {
      container.removeEventListener('contextmenu', handleContextMenu, true);
      win.removeEventListener('wheel', handleUserScroll);
      win.removeEventListener('touchmove', handleUserScroll);
      win.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [containerRef, dismissMenu, reportError]);

  // A menu still open when the editor goes away must not outlive it.
  useEffect(
    () => () => {
      if (isPendingRef.current) dismissMenu();
    },
    [dismissMenu],
  );

  return { dismiss, isPending };
}

export default useEditorContextMenu;
