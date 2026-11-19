import type { EditorRef } from '@eten-tech-foundation/platform-editor';

/**
 * The clipboard commands the editor web view runs itself, from the Project menu's Edit flyout and
 * from the editor's context menu: the clipboard is only reachable while the click still counts as
 * user activation (and, for Paste, while the frame is focused), so these cannot be PAPI commands.
 */
export const EDIT_MENU_COMMANDS = [
  'platformScriptureEditor.cutSelection',
  'platformScriptureEditor.copySelection',
  'platformScriptureEditor.pasteAtSelection',
  'platformScriptureEditor.pasteAsPlainTextAtSelection',
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
export type EditMenuTarget = Pick<
  EditorRef,
  'undo' | 'redo' | 'cut' | 'copy' | 'paste' | 'pastePlainText'
>;

export function isEditMenuCommand(command: string): command is EditMenuCommand {
  return EDIT_MENU_COMMANDS.some((editCommand) => editCommand === command);
}

/**
 * Runs `action`, then puts the browser selection back where it was if `action` moved it.
 *
 * The editor's copy (with no clipboard event to write to) selects a hidden element it appends at
 * the end of the document, copies that way, and removes the element, which leaves the browser
 * selection at the end of the document. The `selectionchange` that follows makes a read-only editor
 * take that as its own selection, and the scroll-group reference follows it. Putting the selection
 * back in the same turn means that event finds the user's selection again.
 *
 * @param action What to run
 * @param doc The document whose selection to keep; without one, `action` just runs
 */
export function runKeepingBrowserSelection(
  action: () => void,
  doc: Document | undefined = globalThis.document,
): void {
  const selection = doc?.getSelection();
  const anchorNode = selection?.anchorNode;
  const focusNode = selection?.focusNode;
  if (!selection || !anchorNode || !focusNode) {
    action();
    return;
  }
  const { anchorOffset, focusOffset } = selection;
  try {
    action();
  } finally {
    const hasMoved =
      selection.anchorNode !== anchorNode ||
      selection.anchorOffset !== anchorOffset ||
      selection.focusNode !== focusNode ||
      selection.focusOffset !== focusOffset;
    if (hasMoved && anchorNode.isConnected && focusNode.isConnected) {
      try {
        selection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
      } catch {
        // The action changed the text under the old selection; there is nothing to put back.
      }
    }
  }
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
    runKeepingBrowserSelection(() => editor.copy());
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
    case 'platformScriptureEditor.pasteAsPlainTextAtSelection':
      editor.pastePlainText();
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
  // The menu hands focus back to its trigger as it closes; return it to the text
  effects.focusEditor();
}
