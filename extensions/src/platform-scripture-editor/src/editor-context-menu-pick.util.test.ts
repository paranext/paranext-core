import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { EditorContextMenuRequest } from 'platform-bible-react/experimental';
import {
  createContextMenuCommandEffects,
  dispatchContextMenuPick,
  getContextMenuShowOptions,
} from './editor-context-menu-pick.util';
import { EDIT_MENU_COMMANDS } from './edit-menu-actions.util';
import { getEditorViewOptions } from './editor-view-options.util';
import { getEditorOpenFindArgs } from './find-trigger.util';

vi.mock('./find-trigger.util', async (importOriginal) => {
  const original = await importOriginal<typeof import('./find-trigger.util')>();
  return { ...original, getEditorOpenFindArgs: vi.fn(original.getEditorOpenFindArgs) };
});

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

describe('createContextMenuCommandEffects', () => {
  beforeEach(() => {
    vi.mocked(getEditorOpenFindArgs).mockClear();
  });

  // Standard view with invisible characters allowed holds a stored no-break space as U+001A.
  const STAND_IN = '\u001A';
  const NBSP = '\u00A0';
  const allowing = getEditorViewOptions('standard', true, true);

  function setup(overrides: Partial<Parameters<typeof createContextMenuCommandEffects>[0]> = {}) {
    const sendCommand = vi.fn().mockResolvedValue(undefined);
    const warn = vi.fn();
    const effects = createContextMenuCommandEffects({
      webViewId: 'wv-1',
      projectId: 'proj',
      viewOptions: allowing,
      editorName: 'editor',
      papi: { commands: { sendCommand } },
      logger: { warn },
      ...overrides,
    });
    return { effects, sendCommand, warn };
  }

  it('sends Find the arguments Ctrl+F sends, the selection respelled through the view options', () => {
    const { effects, sendCommand } = setup();

    effects.openFind(`Mr.${STAND_IN}Abraham `);

    expect(sendCommand).toHaveBeenCalledExactlyOnceWith(
      'platformScripture.openFind',
      'wv-1',
      `Mr.${NBSP}Abraham`,
      'proj',
    );
  });

  it('hands the tab’s view options to the respelling, which decides what a no-break space is', () => {
    // The respelling of a no-break space is the editor package's; what this pins is that the tab's
    // own view options reach it, not an unrelated default.
    const { effects } = setup();

    effects.openFind('grace');

    expect(vi.mocked(getEditorOpenFindArgs)).toHaveBeenCalledExactlyOnceWith(
      'wv-1',
      'proj',
      'grace',
      allowing,
    );
  });

  it('sends nothing for Find while no project is resolved', () => {
    const { effects, sendCommand } = setup({ projectId: undefined });

    effects.openFind('grace');

    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('sends any other command with the web view id', () => {
    const { effects, sendCommand } = setup();

    effects.sendCommand('someOtherExtension.theirCommand');

    expect(sendCommand).toHaveBeenCalledExactlyOnceWith('someOtherExtension.theirCommand', 'wv-1');
  });

  it('logs a command that could not be sent, naming the editor', async () => {
    const { effects, sendCommand, warn } = setup({ editorName: 'footnote editor' });
    sendCommand.mockRejectedValue(new Error('no such command'));

    effects.sendCommand('someOtherExtension.theirCommand');
    await vi.waitFor(() => expect(warn).toHaveBeenCalledTimes(1));

    expect(warn.mock.calls[0][0]).toContain('footnote editor');
    expect(warn.mock.calls[0][0]).toContain('no such command');
  });
});
