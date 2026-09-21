import { existsSync, readdirSync, readFileSync } from 'fs';
import path from 'path';
import {
  getShortcutHintForCommand,
  splitShortcutAlternatives,
} from '@shared/utils/keyboard-shortcut-hint.util';
import { rootKeyboardShortcuts } from './keyboard-shortcuts.data';
import type { KeyboardShortcutEntry } from './keyboard-shortcuts.model';

const MAIN_PROCESS_LOCATION_PREFIX = 'src/main/';
const OPERATING_SYSTEMS = ['macOS', 'windows', 'linux'] as const;
const PLATFORMS = ['darwin', 'win32', 'linux'] as const;
const PLATFORM_MENU_FILE = 'src/extension-host/data/menu.data.json';

/**
 * Every catalog entry with a `command`: the hint each OS shows and the menus that show it. A new
 * `command`, or an existing one reused in another menu, must be added here after checking the chord
 * works in that menu (see .claude/rules/keyboard-shortcuts-catalog.md).
 */
const EXPECTED_MENU_HINTS: Record<
  string,
  { hints: Record<(typeof PLATFORMS)[number], string>; menus: string[] }
> = {
  'platformScripture.openFind': {
    hints: { darwin: '⌃F', win32: 'Ctrl+F', linux: 'Ctrl+F' },
    menus: ['platform-scripture-editor: webViewMenus.platformScriptureEditor.react.topMenu'],
  },
  'platformScriptureEditor.insertCommentAtSelection': {
    hints: { darwin: '⌥⌘M', win32: 'Ctrl+Shift+N', linux: 'Ctrl+Shift+N' },
    menus: ['platform-scripture-editor: webViewMenus.platformScriptureEditor.react.topMenu'],
  },
};

const entriesWithCommand = rootKeyboardShortcuts.filter((entry) => entry.command);

function isHandledInMainProcess(entry: KeyboardShortcutEntry): boolean {
  return entry.locations.some((location) => location.startsWith(MAIN_PROCESS_LOCATION_PREFIX));
}

/** Each alternative chord of an entry, tagged with its operating system, e.g. `windows:Ctrl+B` */
function getOsTaggedChords(entry: KeyboardShortcutEntry): string[] {
  return OPERATING_SYSTEMS.flatMap((os) =>
    splitShortcutAlternatives(entry.keys[os]).map((chord) => `${os}:${chord}`),
  );
}

/**
 * Maps each command to the menus that run it, across the platform's and bundled extensions' menu
 * files. A menu is written `<manifest>: <path to the menu>`, where the manifest is `platform` or an
 * extension's folder name, e.g. `platform-scripture-editor:
 * webViewMenus.platformScriptureEditor.react.topMenu`.
 */
function getMenuLocationsByCommand(): Map<string, Set<string>> {
  // Resolved from the repo root (Vitest runs with the repo root as cwd)
  const extensionsDirectory = path.resolve(process.cwd(), 'extensions/src');
  if (!existsSync(extensionsDirectory))
    throw new Error(
      `Expected the repo root's "extensions/src" at ${extensionsDirectory}. This test resolves menu files from the current working directory, which is ${process.cwd()}; run it with the repo root as the working directory.`,
    );
  const menuFiles = [
    { manifest: 'platform', file: path.resolve(process.cwd(), PLATFORM_MENU_FILE) },
    ...readdirSync(extensionsDirectory)
      .map((extension) => ({
        manifest: extension,
        file: path.join(extensionsDirectory, extension, 'contributions', 'menus.json'),
      }))
      .filter(({ file }) => existsSync(file)),
  ];

  const locationsByCommand = new Map<string, Set<string>>();
  const visit = (node: unknown, manifest: string, keys: string[]): void => {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return;
    if ('items' in node && Array.isArray(node.items)) {
      node.items.forEach((item: unknown) => {
        if (!item || typeof item !== 'object') return;
        if (!('command' in item) || typeof item.command !== 'string') return;
        const locations = locationsByCommand.get(item.command) ?? new Set<string>();
        locations.add(`${manifest}: ${keys.join('.')}`);
        locationsByCommand.set(item.command, locations);
      });
    }
    Object.entries(node).forEach(([key, child]) => visit(child, manifest, [...keys, key]));
  };
  menuFiles.forEach(({ manifest, file }) =>
    visit(JSON.parse(readFileSync(file, 'utf8')), manifest, []),
  );
  return locationsByCommand;
}

describe('keyboard shortcuts catalog', () => {
  it('commands match the expected menu hints', () => {
    // Sorted arrays rather than sets, so a `command` on two entries also fails
    const commands = entriesWithCommand.map((entry) => entry.command ?? '');
    expect(commands.sort()).toEqual(Object.keys(EXPECTED_MENU_HINTS).sort());
  });

  it.each(Object.entries(EXPECTED_MENU_HINTS))(
    '%s is in the expected menus',
    (command, expected) => {
      const locations = [...(getMenuLocationsByCommand().get(command) ?? [])];
      expect(locations.sort()).toEqual([...expected.menus].sort());
    },
  );

  it.each(Object.entries(EXPECTED_MENU_HINTS))('%s has the expected hints', (command, expected) => {
    PLATFORMS.forEach((platform) =>
      expect(getShortcutHintForCommand(command, platform)).toBe(expected.hints[platform]),
    );
  });

  it('no command shares a chord with a main-process entry', () => {
    // TODO(PT-4143): revisit once main-process chords stop claiming keys regardless of focus.
    // Misses different spellings of the same keys (`Ctrl+Down` for `Ctrl+↓`) and main-process
    // handlers that match more loosely than their entry (e.g. F12 with any modifier).
    const mainProcessChords = new Set(
      rootKeyboardShortcuts.filter(isHandledInMainProcess).flatMap(getOsTaggedChords),
    );
    expect(mainProcessChords.size).toBeGreaterThan(0);
    entriesWithCommand.forEach((entry) =>
      getOsTaggedChords(entry).forEach((chord) => expect(mainProcessChords).not.toContain(chord)),
    );
  });
});
