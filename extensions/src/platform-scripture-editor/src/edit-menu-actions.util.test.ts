import { describe, expect, it, vi } from 'vitest';
import { EDIT_MENU_COMMANDS, isEditMenuCommand, runEditMenuAction } from './edit-menu-actions.util';

function makeEditor() {
  return { undo: vi.fn(), redo: vi.fn(), cut: vi.fn(), copy: vi.fn(), paste: vi.fn() };
}

describe('Edit menu actions', () => {
  it('recognizes only the Edit flyout commands', () => {
    EDIT_MENU_COMMANDS.forEach((command) => expect(isEditMenuCommand(command)).toBe(true));
    expect(isEditMenuCommand('platformScripture.openFind')).toBe(false);
  });

  it.each([
    ['platformScriptureEditor.undo', 'undo'],
    ['platformScriptureEditor.redo', 'redo'],
    ['platformScriptureEditor.cutSelection', 'cut'],
    ['platformScriptureEditor.copySelection', 'copy'],
    ['platformScriptureEditor.pasteAtSelection', 'paste'],
  ] as const)('%s runs the editor’s %s', (command, method) => {
    const editor = makeEditor();
    expect(runEditMenuAction(command, editor, { isReadOnly: false })).toBe(true);
    expect(editor[method]).toHaveBeenCalledTimes(1);
  });

  it.each([
    'platformScriptureEditor.undo',
    'platformScriptureEditor.redo',
    'platformScriptureEditor.cutSelection',
    'platformScriptureEditor.pasteAtSelection',
  ] as const)('%s changes nothing while the editor is read-only', (command) => {
    const editor = makeEditor();
    expect(runEditMenuAction(command, editor, { isReadOnly: true })).toBe(false);
    Object.values(editor).forEach((method) => expect(method).not.toHaveBeenCalled());
  });

  it('still copies while the editor is read-only', () => {
    const editor = makeEditor();
    expect(
      runEditMenuAction('platformScriptureEditor.copySelection', editor, { isReadOnly: true }),
    ).toBe(true);
    expect(editor.copy).toHaveBeenCalledTimes(1);
  });
});
