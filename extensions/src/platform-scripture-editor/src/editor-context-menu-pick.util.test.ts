import { describe, expect, it, vi } from 'vitest';
import type { EditorContextMenuRequest } from 'platform-bible-react/experimental';
import {
  dispatchContextMenuPick,
  getContextMenuShowOptions,
} from './editor-context-menu-pick.util';
import { EDIT_MENU_COMMANDS } from './edit-menu-actions.util';

const REQUEST: EditorContextMenuRequest = {
  position: { x: 4, y: 5 },
  hasSelection: true,
  selectedText: 'grace',
  isKeyboardInvoked: false,
};

function makeEffects() {
  return { runClipboardCommand: vi.fn(), openFind: vi.fn(), sendCommand: vi.fn() };
}

describe('dispatchContextMenuPick', () => {
  it.each(EDIT_MENU_COMMANDS)('runs %s as a clipboard command', (command) => {
    const effects = makeEffects();

    dispatchContextMenuPick(command, REQUEST, effects);

    expect(effects.runClipboardCommand).toHaveBeenCalledExactlyOnceWith(command);
    expect(effects.openFind).not.toHaveBeenCalled();
    expect(effects.sendCommand).not.toHaveBeenCalled();
  });

  it('opens Find with the selected text the request carries', () => {
    const effects = makeEffects();

    dispatchContextMenuPick('platformScripture.openFind', REQUEST, effects);

    expect(effects.openFind).toHaveBeenCalledExactlyOnceWith('grace');
    expect(effects.runClipboardCommand).not.toHaveBeenCalled();
    expect(effects.sendCommand).not.toHaveBeenCalled();
  });

  it.each([
    'platformScriptureEditor.insertFootnoteAtSelection',
    'platformScriptureEditor.insertCommentAtSelection',
    'someOtherExtension.theirCommand',
  ])('sends %s on as a command', (command) => {
    const effects = makeEffects();

    dispatchContextMenuPick(command, REQUEST, effects);

    expect(effects.sendCommand).toHaveBeenCalledExactlyOnceWith(command);
    expect(effects.runClipboardCommand).not.toHaveBeenCalled();
    expect(effects.openFind).not.toHaveBeenCalled();
  });

  it('does not treat Undo or Redo as a clipboard command', () => {
    const effects = makeEffects();

    dispatchContextMenuPick('platformScriptureEditor.undo', REQUEST, effects);

    expect(effects.runClipboardCommand).not.toHaveBeenCalled();
    expect(effects.sendCommand).toHaveBeenCalledExactlyOnceWith('platformScriptureEditor.undo');
  });
});

describe('getContextMenuShowOptions', () => {
  it('opens at the click, runs nothing itself and reports the selection and the main editor', () => {
    expect(getContextMenuShowOptions(REQUEST, true)).toEqual({
      position: { x: 4, y: 5 },
      shouldRunCommand: false,
      contextKeys: {
        'platformScriptureEditor.contextMenu.hasSelection': true,
        'platformScriptureEditor.contextMenu.isMainEditor': true,
      },
    });
  });

  it('reports no selection and a note editor when that is what was clicked', () => {
    const { contextKeys } = getContextMenuShowOptions({ ...REQUEST, hasSelection: false }, false);

    expect(contextKeys).toEqual({
      'platformScriptureEditor.contextMenu.hasSelection': false,
      'platformScriptureEditor.contextMenu.isMainEditor': false,
    });
  });
});
