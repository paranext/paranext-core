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
  'platform.webViewContentZoomIn': {
    hints: { darwin: '⌘=', win32: 'Ctrl++', linux: 'Ctrl++' },
    menus: [
      'platform: defaultWebViewTabMenu',
      'platform-scripture-editor: webViewMenus.platformScriptureEditor.react.topMenu',
    ],
  },
  'platform.webViewContentZoomOut': {
    hints: { darwin: '⌘-', win32: 'Ctrl+-', linux: 'Ctrl+-' },
    menus: [
      'platform: defaultWebViewTabMenu',
      'platform-scripture-editor: webViewMenus.platformScriptureEditor.react.topMenu',
    ],
  },
  'platform.webViewContentZoomReset': {
    hints: { darwin: '⌘0', win32: 'Ctrl+0', linux: 'Ctrl+0' },
    menus: [
      'platform: defaultWebViewTabMenu',
      'platform-scripture-editor: webViewMenus.platformScriptureEditor.react.topMenu',
    ],
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
 * Entries whose `command` may keep a chord that the main process also handles, with the command the
 * main-process handler runs and the main-process locations allowed for it.
 * `platform-macos-menubar.data.ts` binds the macOS View menu's accelerators to that command, so the
 * menu hint names the command the chord runs (though not necessarily in the same tab: the View menu
 * zooms the focused window's last focused tab). `web-view.service-router.ts` implements the
 * command; it is not a key handler.
 */
type SameCommandMainProcessHandler = { command: string; locations: string[] };

const CONTENT_ZOOM_MAIN_PROCESS_LOCATIONS = [
  'src/main/platform-macos-menubar.data.ts',
  'src/main/services/web-view.service-router.ts',
];

const SAME_COMMAND_MAIN_PROCESS_LOCATIONS: Record<string, SameCommandMainProcessHandler> = {
  'content-zoom-in': {
    command: 'platform.webViewContentZoomIn',
    locations: CONTENT_ZOOM_MAIN_PROCESS_LOCATIONS,
  },
  'content-zoom-out': {
    command: 'platform.webViewContentZoomOut',
    locations: CONTENT_ZOOM_MAIN_PROCESS_LOCATIONS,
  },
  'content-zoom-reset': {
    command: 'platform.webViewContentZoomReset',
    locations: CONTENT_ZOOM_MAIN_PROCESS_LOCATIONS,
  },
};

/**
 * Every way an entry with a `command` could show a menu hint for a chord the main process claims
 * for something else: a chord it shares with a different main-process entry, or a main-process
 * location of its own that `sameCommandLocations` does not allow for that entry.
 */
function findMainProcessChordClashes(
  entries: KeyboardShortcutEntry[],
  sameCommandHandlers: Record<string, SameCommandMainProcessHandler>,
): string[] {
  const mainProcessEntries = entries.filter(isHandledInMainProcess);
  return entries
    .filter((entry) => entry.command)
    .flatMap((entry) => {
      const handler = sameCommandHandlers[entry.id];
      // An allowance covers only the command it names, so changing the entry's `command` revokes it
      const allowed = handler?.command === entry.command ? handler.locations : [];
      const ownClashes = entry.locations
        .filter((location) => location.startsWith(MAIN_PROCESS_LOCATION_PREFIX))
        .filter((location) => !allowed.includes(location))
        .map((location) => `${entry.id} is handled in the main process at ${location}`);
      const chords = getOsTaggedChords(entry);
      const otherClashes = mainProcessEntries
        .filter((other) => other !== entry)
        .flatMap((other) => {
          const otherChords = new Set(getOsTaggedChords(other));
          return chords
            .filter((chord) => otherChords.has(chord))
            .map((chord) => `${entry.id} ${chord} is also handled by ${other.id}`);
        });
      return [...ownClashes, ...otherClashes];
    });
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

  it('no command shares a chord with a main-process handler that runs something else', () => {
    // TODO(PT-4143): revisit once main-process chords stop claiming keys regardless of focus.
    // Misses different spellings of the same keys (`Ctrl+Down` for `Ctrl+↓`) and main-process
    // handlers that match more loosely than their entry (e.g. F12 with any modifier).
    expect(rootKeyboardShortcuts.filter(isHandledInMainProcess).length).toBeGreaterThan(0);
    expect(
      findMainProcessChordClashes(rootKeyboardShortcuts, SAME_COMMAND_MAIN_PROCESS_LOCATIONS),
    ).toEqual([]);
  });

  it.each(Object.entries(SAME_COMMAND_MAIN_PROCESS_LOCATIONS))(
    '%s, allowed to share a chord with its own main-process handler, runs that command there',
    (id, handler) => {
      const entry = rootKeyboardShortcuts.find((candidate) => candidate.id === id);
      expect(entry?.command).toBe(handler.command);
      expect(entry?.locations).toEqual(expect.arrayContaining(handler.locations));
    },
  );
});

describe('findMainProcessChordClashes', () => {
  function fixtureEntry(overrides: Partial<KeyboardShortcutEntry>): KeyboardShortcutEntry {
    return {
      id: 'fixture',
      purpose: 'Fixture',
      category: 'Fixture',
      context: 'Fixture',
      keys: { macOS: '⌘X', windows: 'Ctrl+X', linux: 'Ctrl+X' },
      locations: ['src/renderer/fixture.ts'],
      ...overrides,
    };
  }

  it('reports a command whose chord a DIFFERENT main-process entry handles', () => {
    const entries = [
      fixtureEntry({ id: 'menu-entry', command: 'platform.webViewContentZoomIn' }),
      fixtureEntry({ id: 'main-entry', locations: ['src/main/fixture.ts'] }),
    ];
    expect(findMainProcessChordClashes(entries, {})).toEqual(
      expect.arrayContaining(['menu-entry windows:Ctrl+X is also handled by main-entry']),
    );
  });

  it('reports a command whose own main-process location is not on the allowlist', () => {
    const entries = [
      fixtureEntry({
        id: 'menu-entry',
        command: 'platform.webViewContentZoomIn',
        locations: ['src/renderer/fixture.ts', 'src/main/fixture.ts'],
      }),
    ];
    expect(findMainProcessChordClashes(entries, {})).toEqual([
      'menu-entry is handled in the main process at src/main/fixture.ts',
    ]);
  });

  it('accepts a command whose own main-process location is on the allowlist for that entry', () => {
    const entries = [
      fixtureEntry({
        id: 'menu-entry',
        command: 'platform.webViewContentZoomIn',
        locations: ['src/renderer/fixture.ts', 'src/main/fixture.ts'],
      }),
    ];
    expect(
      findMainProcessChordClashes(entries, {
        'menu-entry': {
          command: 'platform.webViewContentZoomIn',
          locations: ['src/main/fixture.ts'],
        },
      }),
    ).toEqual([]);
  });

  it('reports an allowlisted main-process location once the entry runs a different command', () => {
    const entries = [
      fixtureEntry({
        id: 'menu-entry',
        command: 'platform.webViewContentZoomOut',
        locations: ['src/main/fixture.ts'],
      }),
    ];
    expect(
      findMainProcessChordClashes(entries, {
        'menu-entry': {
          command: 'platform.webViewContentZoomIn',
          locations: ['src/main/fixture.ts'],
        },
      }),
    ).toEqual(['menu-entry is handled in the main process at src/main/fixture.ts']);
  });

  it('still reports a DIFFERENT main-process entry when the command is on the allowlist', () => {
    const entries = [
      fixtureEntry({
        id: 'menu-entry',
        command: 'platform.webViewContentZoomIn',
        locations: ['src/main/fixture.ts'],
      }),
      fixtureEntry({ id: 'main-entry', locations: ['src/main/other.ts'] }),
    ];
    expect(
      findMainProcessChordClashes(entries, {
        'menu-entry': {
          command: 'platform.webViewContentZoomIn',
          locations: ['src/main/fixture.ts'],
        },
      }),
    ).toEqual(expect.arrayContaining(['menu-entry windows:Ctrl+X is also handled by main-entry']));
  });
});

/**
 * The four handlers that implement the content-zoom chords; every Zoom-category chord entry must
 * cite all of them.
 */
const CONTENT_ZOOM_CHORD_LOCATIONS = [
  'src/renderer/services/web-view-content-zoom.bootstrap-script.ts',
  'src/renderer/services/web-view-content-zoom.chrome-keys.ts',
  'src/main/platform-macos-menubar.data.ts',
  'src/main/services/web-view.service-router.ts',
];

function zoomEntries() {
  return rootKeyboardShortcuts.filter((entry) => entry.category === 'Zoom');
}

/** All (entry id, location) pairs across the Zoom category, for a per-pair existence check. */
function zoomEntryLocationPairs(): [entryId: string, location: string][] {
  return zoomEntries().flatMap((entry) =>
    entry.locations.map((location): [string, string] => [entry.id, location]),
  );
}

describe('keyboard-shortcuts.data Zoom category', () => {
  it('has no leftover app-wide zoom entries for the removed main-process chords', () => {
    const ids = zoomEntries().map((entry) => entry.id);
    expect(ids).not.toContain('zoom-in');
    expect(ids).not.toContain('zoom-out');
    expect(ids).not.toContain('reset-zoom');
  });

  it.each(['content-zoom-in', 'content-zoom-out', 'content-zoom-reset'])(
    'documents all four content-zoom chord handlers on %s',
    (id) => {
      const entry = zoomEntries().find((zoomEntry) => zoomEntry.id === id);
      expect(entry?.locations).toEqual(expect.arrayContaining(CONTENT_ZOOM_CHORD_LOCATIONS));
    },
  );

  it.each(zoomEntryLocationPairs())('%s location "%s" resolves to a real file', (_id, location) => {
    expect(existsSync(path.join(process.cwd(), location))).toBe(true);
  });
});
