import type { EditorContextMenuRequest } from 'platform-bible-react/experimental';
import { EditMenuActionCommand, isEditMenuCommand } from './edit-menu-actions.util';

/** What a picked context-menu command does to the editor that was clicked. */
export type ContextMenuPickEffects = {
  /** Runs a clipboard command on the clicked editor, focusing that editor first. */
  runClipboardCommand: (command: EditMenuActionCommand) => void;
  /** Opens Find, searching for the text that was selected when the menu opened. */
  openFind: (selectedText: string) => void;
  /** Sends any other command, with the clicked tab's web view id. */
  sendCommand: (command: string) => void;
};

/**
 * Routes the command picked in an editor's context menu. Clipboard commands need the right-click's
 * user activation and the editor's own selection handling, so they run on the editor; Find carries
 * the selection that was current when the menu opened; every other command, including those other
 * extensions contribute to the menu, is sent on.
 *
 * @param command The command id the user picked
 * @param request What the editor reported when the menu opened
 * @param effects What each kind of command does
 */
export function dispatchContextMenuPick(
  command: string,
  request: EditorContextMenuRequest,
  effects: ContextMenuPickEffects,
): void {
  if (isEditMenuCommand(command)) {
    effects.runClipboardCommand(command);
    return;
  }
  if (command === 'platformScripture.openFind') {
    effects.openFind(request.selectedText);
    return;
  }
  effects.sendCommand(command);
}

/** The request key the menu's `when` and `enabledWhen` read for "something is selected". */
export const CONTEXT_MENU_HAS_SELECTION_KEY = 'platformScriptureEditor.contextMenu.hasSelection';

/** The request key the menu's `when` reads for "this is the main Scripture text". */
export const CONTEXT_MENU_IS_MAIN_EDITOR_KEY = 'platformScriptureEditor.contextMenu.isMainEditor';

/**
 * The options `papi.overlays.showContextMenu` gets for one editor right-click: where to open, the
 * facts the menu's conditions read, and no command run by the platform (the editor runs what was
 * picked itself, see {@link dispatchContextMenuPick}).
 *
 * @param request What the editor reported for the right-click
 * @param isMainEditor Whether the click was in the main Scripture text rather than a note editor
 */
export function getContextMenuShowOptions(
  request: EditorContextMenuRequest,
  isMainEditor: boolean,
) {
  return {
    position: request.position,
    shouldRunCommand: false,
    contextKeys: {
      [CONTEXT_MENU_HAS_SELECTION_KEY]: request.hasSelection,
      [CONTEXT_MENU_IS_MAIN_EDITOR_KEY]: isMainEditor,
    },
  };
}
