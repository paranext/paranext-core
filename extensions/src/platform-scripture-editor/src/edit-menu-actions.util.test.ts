import { describe, expect, it, vi } from 'vitest';
import {
  EDIT_MENU_COMMANDS,
  handleEditMenuCommand,
  isEditMenuCommand,
  runEditMenuAction,
} from './edit-menu-actions.util';

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

describe('handleEditMenuCommand', () => {
  const PASTE = 'platformScriptureEditor.pasteAtSelection';
  const EDITABLE = { isReadOnly: false, isDurablyReadOnly: false, isSyncBlocked: false };

  function makeEffects() {
    return {
      notifyActionBlocked: vi.fn(),
      notifySyncEditBlocked: vi.fn(),
      restoreSelectionIfLost: vi.fn(),
      onActionError: vi.fn(),
      focusEditor: vi.fn(),
    };
  }

  it('restores the selection, runs the action and refocuses the editor without a notice', () => {
    const editor = makeEditor();
    const effects = makeEffects();
    handleEditMenuCommand(PASTE, editor, EDITABLE, effects);
    expect(effects.restoreSelectionIfLost).toHaveBeenCalledWith(editor);
    expect(editor.paste).toHaveBeenCalledTimes(1);
    expect(effects.focusEditor).toHaveBeenCalledTimes(1);
    expect(effects.notifyActionBlocked).not.toHaveBeenCalled();
    expect(effects.notifySyncEditBlocked).not.toHaveBeenCalled();
  });

  it('names Send/Receive when a sync is the only reason editing is blocked', () => {
    const editor = makeEditor();
    const effects = makeEffects();
    handleEditMenuCommand(
      PASTE,
      editor,
      { isReadOnly: true, isDurablyReadOnly: false, isSyncBlocked: true },
      effects,
    );
    expect(editor.paste).not.toHaveBeenCalled();
    expect(effects.notifySyncEditBlocked).toHaveBeenCalledTimes(1);
    expect(effects.notifyActionBlocked).not.toHaveBeenCalled();
    expect(effects.focusEditor).toHaveBeenCalledTimes(1);
  });

  it('gives the generic notice for a durable block, even while a sync is running', () => {
    const effects = makeEffects();
    handleEditMenuCommand(
      PASTE,
      makeEditor(),
      { isReadOnly: true, isDurablyReadOnly: true, isSyncBlocked: true },
      effects,
    );
    expect(effects.notifyActionBlocked).toHaveBeenCalledTimes(1);
    expect(effects.notifySyncEditBlocked).not.toHaveBeenCalled();
  });

  it('gives the generic notice and touches nothing else when no editor is loaded', () => {
    const effects = makeEffects();
    handleEditMenuCommand(
      PASTE,
      undefined,
      { isReadOnly: true, isDurablyReadOnly: false, isSyncBlocked: true },
      effects,
    );
    expect(effects.notifyActionBlocked).toHaveBeenCalledTimes(1);
    expect(effects.notifySyncEditBlocked).not.toHaveBeenCalled();
    expect(effects.restoreSelectionIfLost).not.toHaveBeenCalled();
    expect(effects.focusEditor).not.toHaveBeenCalled();
  });

  it('reports an action that throws and still refocuses the editor', () => {
    const editor = makeEditor();
    const error = new Error('clipboard denied');
    editor.paste.mockImplementation(() => {
      throw error;
    });
    const effects = makeEffects();
    handleEditMenuCommand(PASTE, editor, EDITABLE, effects);
    expect(effects.onActionError).toHaveBeenCalledWith(error);
    expect(effects.focusEditor).toHaveBeenCalledTimes(1);
  });
});
