import type { KeyboardShortcutEntry } from '@shared/data/keyboard-shortcuts.model';
import {
  getShortcutHintForCommand,
  splitShortcutAlternatives,
} from './keyboard-shortcut-hint.util';

const ENTRIES: KeyboardShortcutEntry[] = [
  {
    id: 'insert-comment',
    purpose: 'Insert a comment',
    category: 'Editing',
    context: 'Scripture editor web view',
    keys: { macOS: '⌥⌘M', windows: 'Ctrl+Shift+N / Ctrl+Alt+M', linux: 'Ctrl+Alt+N' },
    locations: [],
    command: 'platformScriptureEditor.insertCommentAtSelection',
  },
  {
    id: 'not-joined',
    purpose: 'Something with no command',
    category: 'Editing',
    context: 'Anywhere',
    keys: { macOS: '⌘J', windows: 'Ctrl+J', linux: 'Ctrl+J' },
    locations: [],
  },
  {
    id: 'no-macos-equivalent',
    purpose: 'Open the user settings',
    category: 'Application',
    context: 'Anywhere',
    keys: { macOS: '— (no equivalent)', windows: 'Ctrl+, / Shift+F10', linux: 'Ctrl+,' },
    locations: [],
    command: 'platform.openUserSettings',
  },
];

describe('splitShortcutAlternatives', () => {
  it('splits alternatives at the separator', () => {
    expect(splitShortcutAlternatives('Ctrl+Y / Ctrl+Shift+Z')).toEqual(['Ctrl+Y', 'Ctrl+Shift+Z']);
  });

  it('returns a single chord unchanged', () => {
    expect(splitShortcutAlternatives('Ctrl+Shift+Z')).toEqual(['Ctrl+Shift+Z']);
  });
});

describe('getShortcutHintForCommand', () => {
  const command = 'platformScriptureEditor.insertCommentAtSelection';

  it('writes the shortcut the macOS way on darwin', () => {
    expect(getShortcutHintForCommand(command, 'darwin', ENTRIES)).toBe('⌥⌘M');
  });

  it('writes the shortcut the Windows way on win32, showing only the first alternative', () => {
    expect(getShortcutHintForCommand(command, 'win32', ENTRIES)).toBe('Ctrl+Shift+N');
  });

  it('writes the shortcut the Linux way on any other platform', () => {
    expect(getShortcutHintForCommand(command, 'linux', ENTRIES)).toBe('Ctrl+Alt+N');
    expect(getShortcutHintForCommand(command, 'freebsd', ENTRIES)).toBe('Ctrl+Alt+N');
  });

  it('gives no hint for a command no entry is joined to', () => {
    expect(getShortcutHintForCommand('platform.openSettings', 'win32', ENTRIES)).toBeUndefined();
  });

  it('gives no hint on an operating system the catalog marks as having no equivalent', () => {
    expect(
      getShortcutHintForCommand('platform.openUserSettings', 'darwin', ENTRIES),
    ).toBeUndefined();
    expect(getShortcutHintForCommand('platform.openUserSettings', 'win32', ENTRIES)).toBe('Ctrl+,');
  });

  it('reads the real catalog by default', () => {
    expect(getShortcutHintForCommand('platformScripture.openFind', 'darwin')).toBe('⌃F');
  });
});
