import type { ViewOptions } from '@eten-tech-foundation/platform-editor';
import papi, { logger } from '@papi/frontend';
import type { FootnoteEditorHandle } from 'platform-bible-react';
import { useEditorContextMenu } from 'platform-bible-react/experimental';
import { getErrorMessage } from 'platform-bible-utils';
import { ReactNode, RefObject, useRef } from 'react';
import type { EditMenuActionCommand } from './edit-menu-actions.util';
import {
  createContextMenuCommandEffects,
  dispatchContextMenuPick,
  getContextMenuShowOptions,
} from './editor-context-menu-pick.util';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './platform-scripture-editor.utils';

/** The row editor's handle method behind each clipboard command the menu can pick. */
const CLIPBOARD_METHOD_BY_COMMAND: Partial<
  Record<EditMenuActionCommand, 'cut' | 'copy' | 'paste' | 'pastePlainText'>
> = {
  'platformScriptureEditor.cutSelection': 'cut',
  'platformScriptureEditor.copySelection': 'copy',
  'platformScriptureEditor.pasteAtSelection': 'paste',
  'platformScriptureEditor.pasteAsPlainTextAtSelection': 'pastePlainText',
};

/** What {@link PaneFootnoteEditorContextMenu} needs from the web view. */
export type PaneFootnoteEditorContextMenuProps = {
  /** The web view's id: the menu opens in, and picked commands are sent for, this tab. */
  webViewId: string;
  /** The project the tab shows, the source for Find; `undefined` while none is resolved. */
  projectId: string | undefined;
  /** The tab's view options, which say how the project spells a no-break space for Find. */
  viewOptions: ViewOptions | undefined;
  /** The mounted row editor, which the clipboard commands run on. */
  rowEditorRef: RefObject<FootnoteEditorHandle | null>;
  /** Tells the user a clipboard action was refused, without naming a reason. */
  notifyActionBlocked: () => void;
  /**
   * Renders the row editor. Receives whether the platform menu is claiming the keyboard right now,
   * for the row editor's own key handling to stand away from.
   */
  children: (isClaimingKeys: () => boolean) => ReactNode;
};

/**
 * Serves the footnotes pane row editor's right-click with the platform context menu. It owns ONE
 * menu hook instance whose container is the element it wraps, so it mounts and unmounts with the
 * row editing session (a menu still open at the end of the session is dismissed), and a right-click
 * anywhere else in the pane, or in the main text, never reaches it.
 *
 * The wrapper is `display: contents`: the row editor stays the layout child of its row.
 *
 * The clipboard commands run on the row editor's handle after it takes focus, because the clipboard
 * read behind Paste needs the frame focused and the menu hands focus back to its tab
 * asynchronously. Find and every other command are sent on like the main text's menu sends them.
 */
export function PaneFootnoteEditorContextMenu({
  webViewId,
  projectId,
  viewOptions,
  rowEditorRef,
  notifyActionBlocked,
  children,
}: PaneFootnoteEditorContextMenuProps) {
  // A ref starts out as null for React to be able to set it as an element ref
  // eslint-disable-next-line no-null/no-null
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { isClaimingKeys } = useEditorContextMenu({
    containerRef: wrapperRef,
    requestMenu: (request) =>
      papi.overlays.showContextMenu(
        SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        webViewId,
        getContextMenuShowOptions(request, false),
      ),
    dismissMenu: () => papi.overlays.dismissContextMenu(webViewId),
    onPick: (command, request) =>
      dispatchContextMenuPick(command, request, {
        runClipboardCommand: (clipboardCommand) => {
          const rowEditor = rowEditorRef.current;
          const method = CLIPBOARD_METHOD_BY_COMMAND[clipboardCommand];
          // Undo and Redo are not items of this menu, and the row editor has its own buttons.
          if (!method) return;
          if (!rowEditor) {
            notifyActionBlocked();
            return;
          }
          rowEditor.focus();
          try {
            rowEditor[method]();
          } catch (e) {
            // The row editor refuses Cut and Paste while it is read-only.
            logger.warn(`Footnote editor menu action failed: ${getErrorMessage(e)}`);
            notifyActionBlocked();
          }
          // The menu hands focus back to its tab as it closes; return it to the note's text.
          requestAnimationFrame(() => rowEditorRef.current?.focus());
        },
        ...createContextMenuCommandEffects({
          webViewId,
          projectId,
          viewOptions,
          editorName: 'footnote editor',
          papi,
          logger,
        }),
      }),
    onError: (error) =>
      logger.warn(`The footnote editor context menu failed: ${getErrorMessage(error)}`),
  });

  return (
    <div ref={wrapperRef} className="tw:contents">
      {children(isClaimingKeys)}
    </div>
  );
}

export default PaneFootnoteEditorContextMenu;
