import type { EditorRef } from '@eten-tech-foundation/platform-editor';

/**
 * The Project menu's Edit flyout commands that the editor web view runs itself, from the menu's
 * select handler: the clipboard is only reachable while the click still counts as user activation,
 * so these cannot be PAPI commands.
 */
export const EDIT_MENU_COMMANDS = [
  'platformScriptureEditor.cutSelection',
  'platformScriptureEditor.copySelection',
  'platformScriptureEditor.pasteAtSelection',
] as const;

export type EditMenuCommand = (typeof EDIT_MENU_COMMANDS)[number];

/**
 * Every action the Edit flyout can run on the editor: the intercepted clipboard commands plus Undo
 * and Redo, which arrive as PAPI commands and share the same read-only guard.
 */
export type EditMenuActionCommand =
  | EditMenuCommand
  | 'platformScriptureEditor.undo'
  | 'platformScriptureEditor.redo';

/** The parts of the editor the Edit flyout drives. */
export type EditMenuTarget = Pick<EditorRef, 'undo' | 'redo' | 'cut' | 'copy' | 'paste'>;

export function isEditMenuCommand(command: string): command is EditMenuCommand {
  return EDIT_MENU_COMMANDS.some((editCommand) => editCommand === command);
}

/**
 * Whether the Project menu should hand focus back to its trigger as it closes after `command` was
 * selected. Not after Cut, Copy or Paste on an editable editor: {@link handleEditMenuCommand}
 * returns focus to the editor's text itself, and a return arriving after that would take it from
 * the text — and a native paste the editor has already asked for would land on the trigger. With no
 * editor, or a read-only one whose root cannot take focus, the menu keeps its own return, or focus
 * would end on nothing.
 *
 * @param command The command of the menu item that was selected
 * @param editor Whether an editor is loaded, and whether it is read-only
 */
export function shouldMenuReturnFocusAfterEditCommand(
  command: string,
  { hasEditor, isReadOnly }: { hasEditor: boolean; isReadOnly: boolean },
): boolean {
  return !(isEditMenuCommand(command) && hasEditor && !isReadOnly);
}

/**
 * Runs an Edit flyout action on the editor. For Cut, Copy and Paste, call it synchronously from the
 * menu's select handler: the clipboard is only reachable while the click still counts as user
 * activation. Undo and Redo also arrive from a command message, where there is no click to keep.
 *
 * While the editor is read-only, only Copy runs: the editor's undo and redo don't check whether
 * editing is allowed, and its cut and paste throw.
 *
 * @returns Whether the action ran
 */
export function runEditMenuAction(
  command: EditMenuActionCommand,
  editor: EditMenuTarget,
  { isReadOnly }: { isReadOnly: boolean },
): boolean {
  if (command === 'platformScriptureEditor.copySelection') {
    editor.copy();
    return true;
  }
  if (isReadOnly) return false;
  switch (command) {
    case 'platformScriptureEditor.undo':
      editor.undo();
      return true;
    case 'platformScriptureEditor.redo':
      editor.redo();
      return true;
    case 'platformScriptureEditor.cutSelection':
      editor.cut();
      return true;
    case 'platformScriptureEditor.pasteAtSelection':
      editor.paste();
      return true;
    default: {
      // Exhaustiveness guard: a command added to EditMenuActionCommand without a case above fails to
      // compile here, instead of silently telling the user the action is unavailable.
      const unhandled: never = command;
      throw new Error(`Unhandled Edit flyout command: ${String(unhandled)}`);
    }
  }
}

/** Why the editor is read-only, as far as the Edit flyout's notice needs to know. */
export type EditMenuBlockState = {
  /** Whether the editor is read-only for any reason, transient or durable */
  isReadOnly: boolean;
  /**
   * Whether it is read-only for a reason a finished Send/Receive does not clear (no permission,
   * project not editable, Preview in Power mode)
   */
  isDurablyReadOnly: boolean;
  /** Whether an automatic Send/Receive is blocking edits right now */
  isSyncBlocked: boolean;
};

/** What the Edit flyout does around the action itself. */
export type EditMenuEffects<TEditor extends EditMenuTarget> = {
  /** Tells the user the action is not available, without naming a reason */
  notifyActionBlocked: () => void;
  /** Tells the user editing is paused for Send/Receive */
  notifySyncEditBlocked: () => void;
  /** Puts back the selection the menu's focus change may have cleared */
  restoreSelectionIfLost: (editor: TEditor) => void;
  /** Reports an action that threw */
  onActionError: (error: unknown) => void;
  /** Returns focus to the editor's text */
  focusEditor: () => void;
};

/**
 * Handles an Edit flyout click: runs the action on the editor, or tells the user why it can't. Call
 * it synchronously from the menu's select handler for the clipboard actions, like
 * {@link runEditMenuAction}; Undo and Redo also arrive from a command message.
 *
 * @param command The Edit flyout command that was clicked
 * @param editor The editor to act on, or `undefined` while none is loaded
 * @param state Whether, and why, the editor is read-only
 * @param effects What to do around the action
 */
export function handleEditMenuCommand<TEditor extends EditMenuTarget>(
  command: EditMenuActionCommand,
  editor: TEditor | undefined,
  { isReadOnly, isDurablyReadOnly, isSyncBlocked }: EditMenuBlockState,
  effects: EditMenuEffects<TEditor>,
): void {
  if (!editor) {
    // The editor is unset while no project is selected, on the missing-book zero state, and while
    // USJ is still loading — none of which a Send/Receive finishing resolves, so this path always
    // uses the generic message even if a sync also happens to be in progress.
    effects.notifyActionBlocked();
    return;
  }
  effects.restoreSelectionIfLost(editor);
  try {
    // A `false` return means the action was blocked. Undo/Redo return `true` regardless of history,
    // so an empty-history click stays silent here too, matching Ctrl+Z.
    const ran = runEditMenuAction(command, editor, { isReadOnly });
    if (!ran) {
      // Only a sync is named to the user, since it is transient; a durable block takes priority,
      // because telling the user to wait for the sync would not help them.
      if (isSyncBlocked && !isDurablyReadOnly) effects.notifySyncEditBlocked();
      else effects.notifyActionBlocked();
    }
  } catch (e) {
    effects.onActionError(e);
  }
  // Return focus to the text from wherever the menu left it: its trigger, or nowhere after Cut, Copy
  // or Paste. A Paste waits for focus to come back before asking the host to paste, since the host
  // pastes into whatever has focus.
  effects.focusEditor();
}
