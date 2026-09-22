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
