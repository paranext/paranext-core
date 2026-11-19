import type { EditorRef } from '@eten-tech-foundation/platform-editor';
import {
  useEditorContextMenu,
  type EditorContextMenuRequest,
  type UseEditorContextMenuResult,
} from 'platform-bible-react/experimental';
import { getErrorMessage } from 'platform-bible-utils';
import { RefObject } from 'react';
import { runEditMenuAction } from './edit-menu-actions.util';
import { dispatchContextMenuPick } from './editor-context-menu-pick.util';
import { focusEditorKeepingSelection } from './focus-editor-keeping-selection.util';

/**
 * What a read-only Scripture panel needs from its web view to serve the platform context menu. The
 * panel component takes these as props and never imports `@papi`, so the web view owns every
 * platform call.
 */
export type ReadOnlyPanelContextMenuCallbacks = {
  /** Opens the platform menu and resolves with the picked command, or `undefined` for none. */
  requestMenu: (request: EditorContextMenuRequest) => Promise<string | undefined>;
  /** Closes the platform menu this panel opened. */
  dismissMenu: () => void | Promise<void>;
  /** Opens Find for the text that was selected when the menu opened, as Ctrl+F does. */
  openFind: (selectedText: string) => void;
  /** Sends any other picked command, such as one another extension contributed. */
  sendCommand: (command: string) => void;
};

/** What {@link useReadOnlyPanelContextMenu} needs from the panel. */
export type UseReadOnlyPanelContextMenuOptions = {
  /**
   * The element that directly wraps the panel's editor. While it is not in the document, for
   * example because a message or a spinner is shown instead of the editor, no right-click is
   * claimed.
   */
  containerRef: RefObject<HTMLElement | null>;
  /**
   * Whether the panel claims right-clicks. Defaults to `true`; a panel whose editor stays in the
   * document while something else is shown over it passes `false` for that time.
   */
  isEnabled?: boolean;
  /** The panel's editor, which Copy runs on. */
  editorRef: RefObject<EditorRef | null>;
  /** The web view's platform calls. */
  callbacks: ReadOnlyPanelContextMenuCallbacks;
  /** Receives a failure of the menu or of a pick. */
  logger?: { warn: (message: string) => void };
};

/**
 * Serves a read-only Scripture panel's right-click with the platform context menu. Copy runs on the
 * panel's editor, so the editor's copy limit applies as it does for Ctrl+C; Find and every other
 * command go to the web view.
 *
 * Copy focuses the frame without touching the editor's selection: a read-only editor's own
 * `focus()` would put a caret at the end of the text and move the reference. The browser selection
 * is kept through the editor's copy, which would otherwise leave it on a hidden element at the
 * end.
 *
 * Hidden-tab case: intentionally not handled here. A hidden tab receives no right-click, so no
 * request can start there.
 *
 * @returns The hook's `dismiss`, for the panel to call when what it shows changes
 */
export function useReadOnlyPanelContextMenu({
  containerRef,
  isEnabled = true,
  editorRef,
  callbacks,
  logger,
}: UseReadOnlyPanelContextMenuOptions): UseEditorContextMenuResult {
  return useEditorContextMenu({
    containerRef,
    isEnabled,
    requestMenu: callbacks.requestMenu,
    dismissMenu: callbacks.dismissMenu,
    onPick: (command, request) =>
      dispatchContextMenuPick(command, request, {
        runClipboardCommand: (clipboardCommand) => {
          const editor = editorRef.current;
          if (!editor) return;
          focusEditorKeepingSelection(editor, false);
          runEditMenuAction(clipboardCommand, editor, { isReadOnly: true });
          // The menu hands focus back to its tab as it closes; return it to the frame so the
          // panel's keyboard shortcuts (Ctrl+F) keep working. Frame focus only, never the
          // editor's own `focus()`.
          requestAnimationFrame(() => focusEditorKeepingSelection(editorRef.current, false));
        },
        openFind: callbacks.openFind,
        sendCommand: callbacks.sendCommand,
      }),
    onError: (error) =>
      logger?.warn(`The read-only panel context menu failed: ${getErrorMessage(error)}`),
  });
}
