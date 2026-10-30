import { describe, expect, it, vi } from 'vitest';
import type { SelectionRange } from '@eten-tech-foundation/platform-editor';
import {
  EDIT_MENU_COMMANDS,
  handleEditMenuCommand,
  isEditMenuCommand,
  runEditMenuAction,
  shouldMenuReturnFocusAfterEditCommand,
} from './edit-menu-actions.util';
import { restoreSelectionIfLost } from './platform-scripture-editor.web-view.utils';

function makeEditor() {
  return { undo: vi.fn(), redo: vi.fn(), cut: vi.fn(), copy: vi.fn(), paste: vi.fn() };
}

describe('Edit menu actions', () => {
  it('intercepts only the clipboard commands, which need the click’s user activation', () => {
    EDIT_MENU_COMMANDS.forEach((command) => expect(isEditMenuCommand(command)).toBe(true));
    expect([...EDIT_MENU_COMMANDS]).toEqual([
      'platformScriptureEditor.cutSelection',
      'platformScriptureEditor.copySelection',
      'platformScriptureEditor.pasteAtSelection',
    ]);
    expect(isEditMenuCommand('platformScriptureEditor.undo')).toBe(false);
    expect(isEditMenuCommand('platformScriptureEditor.redo')).toBe(false);
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

  it('does not restore an older caret while a paragraph marker is selected', () => {
    // Wired as the web view wires it: the real restore, over an editor whose gutter marker is
    // selected. A selected marker has no text range, and the caret captured before it was selected
    // is in another paragraph — restoring it would paste the text there instead.
    const olderCaret: SelectionRange = {
      start: { jsonPath: '$.content[2].content[1]', offset: 5 },
    };
    const editor = {
      ...makeEditor(),
      getSelection: () => undefined,
      getSelectedParaMarker: () => 'q1',
      setSelection: vi.fn(),
    };
    const effects = {
      ...makeEffects(),
      restoreSelectionIfLost: (target: typeof editor) => restoreSelectionIfLost(target, olderCaret),
    };

    handleEditMenuCommand(PASTE, editor, EDITABLE, effects);

    expect(editor.setSelection).not.toHaveBeenCalled();
    expect(editor.paste).toHaveBeenCalledTimes(1);
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

  it.each(['platformScriptureEditor.undo', 'platformScriptureEditor.redo'] as const)(
    '%s is refused and the user told while the editor is read-only',
    (command) => {
      const editor = makeEditor();
      const effects = makeEffects();
      handleEditMenuCommand(
        command,
        editor,
        { isReadOnly: true, isDurablyReadOnly: true, isSyncBlocked: false },
        effects,
      );
      Object.values(editor).forEach((method) => expect(method).not.toHaveBeenCalled());
      expect(effects.notifyActionBlocked).toHaveBeenCalledTimes(1);
      expect(effects.focusEditor).toHaveBeenCalledTimes(1);
    },
  );

  it('names Send/Receive when a sync is the only reason undo is blocked', () => {
    const editor = makeEditor();
    const effects = makeEffects();
    handleEditMenuCommand(
      'platformScriptureEditor.undo',
      editor,
      { isReadOnly: true, isDurablyReadOnly: false, isSyncBlocked: true },
      effects,
    );
    expect(editor.undo).not.toHaveBeenCalled();
    expect(effects.notifySyncEditBlocked).toHaveBeenCalledTimes(1);
    expect(effects.notifyActionBlocked).not.toHaveBeenCalled();
  });

  it('runs redo on an editable editor after restoring the selection', () => {
    const editor = makeEditor();
    const effects = makeEffects();
    handleEditMenuCommand('platformScriptureEditor.redo', editor, EDITABLE, effects);
    expect(effects.restoreSelectionIfLost).toHaveBeenCalledWith(editor);
    expect(editor.redo).toHaveBeenCalledTimes(1);
    expect(effects.notifyActionBlocked).not.toHaveBeenCalled();
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

describe('shouldMenuReturnFocusAfterEditCommand', () => {
  const editable = { hasEditor: true, isReadOnly: false };

  it('leaves focus to the editor after Cut, Copy and Paste in an editable editor', () => {
    EDIT_MENU_COMMANDS.forEach((command) =>
      expect(shouldMenuReturnFocusAfterEditCommand(command, editable)).toBe(false),
    );
  });

  // `handleEditMenuCommand` focuses no editor when there is none, and a read-only editor's root
  // cannot take focus, so declining the menu's return would leave focus on the frame's body
  it('returns focus to the trigger when there is no editor or it is read-only', () => {
    EDIT_MENU_COMMANDS.forEach((command) => {
      expect(
        shouldMenuReturnFocusAfterEditCommand(command, { hasEditor: false, isReadOnly: false }),
      ).toBe(true);
      expect(
        shouldMenuReturnFocusAfterEditCommand(command, { hasEditor: true, isReadOnly: true }),
      ).toBe(true);
    });
  });

  it('returns focus to the trigger after every other menu command', () => {
    expect(shouldMenuReturnFocusAfterEditCommand('platformScripture.openFind', editable)).toBe(
      true,
    );
    expect(shouldMenuReturnFocusAfterEditCommand('platformScriptureEditor.undo', editable)).toBe(
      true,
    );
  });
});
