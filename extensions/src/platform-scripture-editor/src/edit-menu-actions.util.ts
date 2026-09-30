import type { EditorRef } from '@eten-tech-foundation/platform-editor';

/** The Project menu's Edit flyout commands, which the editor web view runs itself. */
export const EDIT_MENU_COMMANDS = [
  'platformScriptureEditor.undo',
  'platformScriptureEditor.redo',
  'platformScriptureEditor.cutSelection',
  'platformScriptureEditor.copySelection',
  'platformScriptureEditor.pasteAtSelection',
] as const;

export type EditMenuCommand = (typeof EDIT_MENU_COMMANDS)[number];

/** The parts of the editor the Edit flyout drives. */
export type EditMenuTarget = Pick<EditorRef, 'undo' | 'redo' | 'cut' | 'copy' | 'paste'>;

export function isEditMenuCommand(command: string): command is EditMenuCommand {
  return EDIT_MENU_COMMANDS.some((editCommand) => editCommand === command);
}

/**
 * Runs an Edit flyout action on the editor. Call it synchronously from the menu's select handler:
 * the clipboard is only reachable while the click still counts as user activation.
 *
 * While the editor is read-only, only Copy runs: the editor's undo and redo don't check whether
 * editing is allowed, and its cut and paste throw.
 *
 * @returns Whether the action ran
 */
export function runEditMenuAction(
  command: EditMenuCommand,
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
      // Exhaustiveness guard: a command added to EDIT_MENU_COMMANDS without a case above fails to
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
   * project not editable, markers view)
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
 * it synchronously from the menu's select handler, like {@link runEditMenuAction}.
 *
 * @param command The Edit flyout command that was clicked
 * @param editor The editor to act on, or `undefined` while none is loaded
 * @param state Whether, and why, the editor is read-only
 * @param effects What to do around the action
 */
export function handleEditMenuCommand<TEditor extends EditMenuTarget>(
  command: EditMenuCommand,
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
  // The menu hands focus back to its trigger as it closes; return it to the text
  effects.focusEditor();
}
