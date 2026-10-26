import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { isGroupUnderColumnOrSubMenu } from 'platform-bible-react';
import menuDataObject from '@extension-host/data/menu.data.json';
import { MenuDocumentCombiner } from '@shared/utils/menu-document-combiner';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { describe, expect, test } from 'vitest';
// Resolvable from this project: neither a `tsc -p ./tsconfig.json` typecheck nor `vitest`'s
// module resolution treats `extensions` (excluded from the root tsconfig's `include`) any
// differently for an explicit relative import than for a file this project owns.
import { getMenuSectionsWithItems } from '../../../lib/platform-bible-react/src/components/advanced/menus/menu.util';
import { EDIT_MENU_COMMANDS } from '../../../extensions/src/platform-scripture-editor/src/edit-menu-actions.util';
import {
  EXTENSIONS_DIR,
  getMenuContributingExtensions,
  getMenuDataEngineInMode,
  getRealCombinedMenus,
} from './menu-data.service-host.test-utils';

const SCRIPTURE_EDITOR_WEB_VIEW_TYPE = 'platformScriptureEditor.react';
const EDITOR_MENUS_PATH = resolve(
  EXTENSIONS_DIR,
  'platform-scripture-editor/contributions/menus.json',
);

/**
 * Combines every shipped extension's menu document with the platform's, not just the editor's own —
 * an extension can add items to the editor's Project section through the extensible `platform.*`
 * default groups without the editor's own file changing.
 */
async function getEditorTopMenuInMode(mode: 'simple' | 'power') {
  const engine = await getMenuDataEngineInMode(
    getRealCombinedMenus({ excludeDevOnly: true }),
    mode,
  );
  const webViewMenu = await engine.getWebViewMenu(SCRIPTURE_EDITOR_WEB_VIEW_TYPE);
  if (!webViewMenu.topMenu) throw new Error('The scripture editor serves no top menu');
  return webViewMenu.topMenu;
}

type Menu = Localized<MultiColumnMenu>;
type Item = Menu['items'][number];
type Group = Parameters<typeof isGroupUnderColumnOrSubMenu>[1];

/** Only the keyed entries of a columns/groups record, skipping collection-level flags. */
function keyedEntries<T>(record: Record<string, unknown>): [string, T][] {
  return Object.entries(record).flatMap(([key, value]) =>
    // Values are the menu model's column/group objects; flags such as `isExtensible` are booleans
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    value && typeof value === 'object' ? [[key, value as T]] : [],
  );
}

function itemsInGroup(menu: Menu, groupKey: string): Item[] {
  return menu.items.filter((item) => item.group === groupKey).sort((a, b) => a.order - b.order);
}

function describeItem(menu: Menu, item: Item): string {
  if ('command' in item) return item.command;
  const children = keyedEntries<{ menuItem?: string; order: number }>(menu.groups)
    .filter(([, group]) => group.menuItem === item.id)
    .sort(([, a], [, b]) => a.order - b.order)
    .flatMap(([groupKey]) => itemsInGroup(menu, groupKey))
    .map((child) => describeItem(menu, child));
  return `${item.id} ▸ ${children.join(', ')}`;
}

/**
 * The menu as sections, the way `TabDropdownMenu` lays it out: columns by `order`, each column's
 * groups by `order`, each group's items by `order`, and columns with no items left out — the same
 * rule as `getMenuSectionsWithItems` in platform-bible-react.
 */
function describeSections(menu: Menu): [string, string[]][] {
  const groups = keyedEntries<Group>(menu.groups);
  return keyedEntries<{ order: number }>(menu.columns)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([columnKey]): [string, string[]] => [
      columnKey,
      groups
        .filter(([groupKey, group]) => isGroupUnderColumnOrSubMenu(groupKey, group, columnKey))
        .sort(([, a], [, b]) => a.order - b.order)
        .flatMap(([groupKey]) => itemsInGroup(menu, groupKey))
        .map((item) => describeItem(menu, item)),
    ])
    .filter(([, entries]) => entries.length > 0);
}

/** The command ids a flyout item (e.g. the Edit ▸ submenu) serves, in the order it shows them. */
function flyoutCommandIds(menu: Menu, flyoutItemId: string): string[] {
  return keyedEntries<{ menuItem?: string; order: number }>(menu.groups)
    .filter(([, group]) => group.menuItem === flyoutItemId)
    .sort(([, a], [, b]) => a.order - b.order)
    .flatMap(([groupKey]) => itemsInGroup(menu, groupKey))
    .map((item) => {
      if ('command' in item) return item.command;
      throw new Error(`Expected a command item in the ${flyoutItemId} flyout, got ${item.id}`);
    });
}

/** Every command id the editor's own menus.json declares on a top-menu item, deduplicated. */
function declaredEditorCommandIds(): Set<string> {
  const menus = JSON.parse(readFileSync(EDITOR_MENUS_PATH, 'utf8'));
  const {
    topMenu: { items },
  }: { topMenu: { items: { command?: string }[] } } =
    menus.webViewMenus[SCRIPTURE_EDITOR_WEB_VIEW_TYPE];
  return new Set(items.flatMap((item) => (item.command ? [item.command] : [])));
}

/**
 * The flat set of every command id a mode's served top menu contains — `menu.items` is one flat
 * array regardless of whether an item sits in a column section or inside a flyout, so this needs no
 * separate flyout traversal the way {@link describeSections} and {@link flyoutCommandIds} do.
 */
function servedCommandIds(menu: Menu): Set<string> {
  return new Set(menu.items.flatMap((item) => ('command' in item ? [item.command] : [])));
}

/** The zoom items, served in both modes. */
const ZOOM_COMMANDS = [
  'platform.webViewContentZoomIn',
  'platform.webViewContentZoomOut',
  'platform.webViewContentZoomReset',
];
/**
 * Declared but served in neither mode (Power's editor menu and Simple's), so the flag that hides
 * them can be lifted.
 */
const HIDDEN_IN_BOTH_MODES = [
  'platformScripture.openCharactersInventory',
  'platformScripture.openRepeatedWordsInventory',
  'platformScripture.openMarkersInventory',
  'platformScripture.openPunctuationInventory',
  'platformScripture.openMarkersChecklist',
  'platformScripture.openChecksSidePanel',
];
const HIDDEN_IN_SIMPLE = [
  'platformScriptureEditor.setViewStandard',
  'platformScriptureEditor.setViewPreview',
  'platformScripture.openChecksSidePanel',
  'platformScripture.openManageBooks',
  'legacyCommentManager.openCommentList',
  'platformScripture.openCharactersInventory',
  'platformScripture.openMarkersChecklist',
];

const ENGLISH_STRING_FILES = [
  resolve(__dirname, '../../../assets/localization/en.json'),
  ...['platform-scripture-editor', 'platform-scripture', 'legacy-comment-manager'].map(
    (directory) => resolve(EXTENSIONS_DIR, directory, 'contributions/localizedStrings.json'),
  ),
];

/** The English text of a `%key%` label, read from the shipped string files. */
function labelText(label: string): string {
  const text = ENGLISH_STRING_FILES.map((file) => {
    const json = JSON.parse(readFileSync(file, 'utf8'));
    return json.localizedStrings?.en?.[label] ?? json[label];
  }).find((value) => typeof value === 'string');
  if (text === undefined) throw new Error(`No English string for ${label}`);
  return text;
}

function menuOrder(entry: object): number {
  return 'order' in entry && typeof entry.order === 'number' ? entry.order : 0;
}

describe("The scripture editor's Project menu, per mode", () => {
  /**
   * Power's menu is pinned in full so that reshaping Simple's menu — which shares this document —
   * cannot move anything in Power. Update only alongside a deliberate decision to change Power.
   */
  test('Power serves its established layout', async () => {
    expect(describeSections(await getEditorTopMenuInMode('power'))).toEqual([
      [
        'platform.app',
        ['platformScripture.openManageBooks', 'platform.openProjectSettingsForWebView'],
      ],
      [
        'platformScriptureEditor.simpleEdit',
        [
          'platformScriptureEditor.editSubmenu ▸ platformScriptureEditor.undo, platformScriptureEditor.redo, platformScriptureEditor.cutSelection, platformScriptureEditor.copySelection, platformScriptureEditor.pasteAtSelection, platformScripture.openFind',
        ],
      ],
      [
        'platformScriptureEditor.options',
        [
          'platformScriptureEditor.viewSubmenu ▸ platformScriptureEditor.setViewStandard, platformScriptureEditor.setViewPreview',
          'platform.webViewContentZoomIn',
          'platform.webViewContentZoomOut',
          'platform.webViewContentZoomReset',
          'platformScriptureEditor.toggleFootnotes',
          'platformScriptureEditor.changeFootnotesPaneLocation',
        ],
      ],
      [
        'platformScriptureEditor.insert',
        [
          'platformScriptureEditor.insertCommentAtSelection',
          'platformScriptureEditor.insertFootnoteAtSelection',
          'platformScriptureEditor.insertCrossReferenceAtSelection',
          'platformScriptureEditor.insertEndnoteAtSelection',
        ],
      ],
      ['platformScriptureEditor.tools', ['legacyCommentManager.openCommentList']],
    ]);
  });

  test('Simple serves its shipped layout', async () => {
    expect(describeSections(await getEditorTopMenuInMode('simple'))).toEqual([
      ['platform.app', ['platform.openProjectSettingsForWebView']],
      [
        'platformScriptureEditor.simpleEdit',
        [
          'platformScriptureEditor.editSubmenu ▸ platformScriptureEditor.undo, platformScriptureEditor.redo, platformScriptureEditor.cutSelection, platformScriptureEditor.copySelection, platformScriptureEditor.pasteAtSelection',
        ],
      ],
      [
        'platformScriptureEditor.options',
        [
          'platform.webViewContentZoomIn',
          'platform.webViewContentZoomOut',
          'platform.webViewContentZoomReset',
          'platformScriptureEditor.toggleFootnotes',
          'platformScriptureEditor.changeFootnotesPaneLocation',
        ],
      ],
      [
        'platformScriptureEditor.insert',
        [
          'platformScriptureEditor.insertCommentAtSelection',
          'platformScriptureEditor.insertFootnoteAtSelection',
          'platformScriptureEditor.insertCrossReferenceAtSelection',
          'platformScriptureEditor.insertEndnoteAtSelection',
        ],
      ],
      [
        'platformScriptureEditor.simpleTools',
        [
          'platformScriptureEditor.showBibleTextsPanel',
          'platformScriptureEditor.showCommentariesPanel',
          'platformLexicalTools.openDictionary',
          'platformScriptureEditor.showTextCollectionPanel',
          'platformScripture.openFind',
          'legacyCommentManager.showCommentListPanel',
        ],
      ],
    ]);
  });

  /** The section headings, in order, each mode serves: the View and Tools renames live here. */
  test.each([
    ['power', ['Project', 'View', 'Insert', 'Tools']],
    ['simple', ['Project', 'View', 'Insert', 'Tools and resources']],
  ] as const)('%s labels its sections', async (mode, expectedHeadings) => {
    const menu = await getEditorTopMenuInMode(mode);
    const served = describeSections(menu).map(([columnKey]) => columnKey);
    const headings = keyedEntries<{ label: string; isHeaderHidden?: boolean }>(menu.columns)
      .filter(([columnKey, column]) => served.includes(columnKey) && !column.isHeaderHidden)
      .sort(([, a], [, b]) => menuOrder(a) - menuOrder(b))
      .map(([, column]) => labelText(column.label));
    expect(headings).toEqual(expectedHeadings);
  });

  /**
   * The renderer draws only the sections `getMenuSectionsWithItems` returns, so a column that holds
   * no served item must not be among them: the emptied Edit column, the Info column and the other
   * mode's Tools column would otherwise render as bare headings.
   */
  test.each([
    ['power', 'platformScriptureEditor.simpleTools'],
    ['simple', 'platformScriptureEditor.tools'],
  ] as const)('%s renders no empty section', async (mode, otherModeToolsColumn) => {
    const menu = await getEditorTopMenuInMode(mode);
    const rendered = getMenuSectionsWithItems(menu).map(({ columnKey }) => columnKey);
    expect(rendered).toEqual(describeSections(menu).map(([columnKey]) => columnKey));
    // Positive control: sections do render, so the exclusions below are not vacuous
    expect(rendered).toContain('platformScriptureEditor.insert');
    expect(rendered).not.toContain('platformScriptureEditor.edit');
    expect(rendered).not.toContain('platformScriptureEditor.info');
    expect(rendered).not.toContain(otherModeToolsColumn);
  });

  /** The icon each served item must carry, per mode. */
  const ICONS_IN_BOTH_MODES: [string, string | undefined][] = [
    ['platform.openProjectSettingsForWebView', 'settings'],
    ['platformScriptureEditor.editSubmenu', 'pencil'],
    ['platformScriptureEditor.undo', undefined],
    ['platformScriptureEditor.redo', undefined],
    ['platformScriptureEditor.cutSelection', undefined],
    ['platformScriptureEditor.copySelection', undefined],
    ['platformScriptureEditor.pasteAtSelection', undefined],
    ['platform.webViewContentZoomIn', 'zoom-in'],
    ['platform.webViewContentZoomOut', 'zoom-out'],
    ['platform.webViewContentZoomReset', 'scan'],
    ['platformScriptureEditor.toggleFootnotes', 'file-text'],
    ['platformScriptureEditor.changeFootnotesPaneLocation', 'panel-bottom'],
    ['platformScriptureEditor.insertCommentAtSelection', 'message-square-plus'],
    ['platformScriptureEditor.insertFootnoteAtSelection', 'square-function'],
    ['platformScriptureEditor.insertCrossReferenceAtSelection', 'square-x'],
    ['platformScriptureEditor.insertEndnoteAtSelection', 'square-sigma'],
  ];
  const ICONS_POWER_ONLY: [string, string | undefined][] = [
    ['platformScripture.openManageBooks', 'book-copy'],
    ['platformScripture.openFind', 'search'],
    ['platformScriptureEditor.viewSubmenu', 'eye'],
    ['platformScriptureEditor.setViewStandard', undefined],
    ['platformScriptureEditor.setViewPreview', undefined],
    ['legacyCommentManager.openCommentList', 'message-square'],
  ];
  const ICONS_SIMPLE_ONLY: [string, string][] = [
    ['platformScriptureEditor.showBibleTextsPanel', 'book'],
    ['platformScriptureEditor.showCommentariesPanel', 'book-marked'],
    ['platformLexicalTools.openDictionary', 'book-a'],
    ['platformScriptureEditor.showTextCollectionPanel', 'library'],
    ['platformScripture.openFind', 'search'],
    ['legacyCommentManager.showCommentListPanel', 'message-square'],
  ];

  test.each([
    ['power', [...ICONS_IN_BOTH_MODES, ...ICONS_POWER_ONLY]],
    ['simple', [...ICONS_IN_BOTH_MODES, ...ICONS_SIMPLE_ONLY]],
  ] as const)('%s serves the specified icon on every item', async (mode, expectedIcons) => {
    const menu = await getEditorTopMenuInMode(mode);
    const served = menu.items.map((item) => ({
      key: 'command' in item ? item.command : item.id,
      icon: item.iconNameBefore,
    }));
    expect(served.length).toBeGreaterThan(0);
    // Every served item is covered by the table, so a new item cannot ship without an icon decision
    expect(served.map(({ key }) => key).sort()).toEqual(expectedIcons.map(([key]) => key).sort());
    expectedIcons.forEach(([key, icon]) => {
      expect({ key, icon: served.find((item) => item.key === key)?.icon }).toEqual({ key, icon });
    });
  });

  test.each([
    ['power', 'platform.openProjectSettingsForWebView', 'Project settings'],
    ['power', 'platformScriptureEditor.toggleFootnotes', 'Show footnotes'],
    ['power', 'platformScriptureEditor.insertEndnoteAtSelection', 'Insert end note'],
    ['power', 'legacyCommentManager.openCommentList', 'Comments'],
    ['power', 'platformScripture.openManageBooks', 'Manage books'],
    ['power', 'platformScriptureEditor.setViewStandard', 'Standard view'],
    ['power', 'platformScriptureEditor.setViewPreview', 'Preview'],
    ['simple', 'platform.openProjectSettingsForWebView', 'Project settings'],
    ['power', 'platform.webViewContentZoomReset', 'Zoom 100%'],
    ['simple', 'platform.webViewContentZoomReset', 'Zoom 100%'],
    ['simple', 'legacyCommentManager.showCommentListPanel', 'Comments'],
    ['simple', 'platformScriptureEditor.insertEndnoteAtSelection', 'Insert end note'],
  ] as const)('%s labels %s "%s"', async (mode, command, expected) => {
    const menu = await getEditorTopMenuInMode(mode);
    const item = menu.items.find(
      (candidate) => 'command' in candidate && candidate.command === command,
    );
    expect(item && labelText(item.label)).toBe(expected);
  });

  test('inventories, Markers Checklist and Basic checks are hidden in Power but stay declared', async () => {
    const power = servedCommandIds(await getEditorTopMenuInMode('power'));
    const declared = declaredEditorCommandIds();
    HIDDEN_IN_BOTH_MODES.forEach((command) => {
      expect(power.has(command)).toBe(false);
    });
    // Hidden, not deleted: the inventories, Markers Checklist and Basic checks remain declared.
    HIDDEN_IN_BOTH_MODES.forEach((command) => expect(declared.has(command)).toBe(true));
  });

  test('zoom is served in Power, in the View column between the view modes and the footnotes pane', async () => {
    const menu = await getEditorTopMenuInMode('power');
    const viewColumn = describeSections(menu).find(
      ([columnKey]) => columnKey === 'platformScriptureEditor.options',
    );
    const entries = viewColumn?.[1] ?? [];
    const zoomIndexes = ZOOM_COMMANDS.map((command) => entries.indexOf(command));
    expect(zoomIndexes).toEqual([1, 2, 3]);
    expect(entries.indexOf('platformScriptureEditor.toggleFootnotes')).toBeGreaterThan(
      zoomIndexes[2],
    );
  });

  test('Simple serves none of the Power-only items', async () => {
    const simple = servedCommandIds(await getEditorTopMenuInMode('simple'));
    HIDDEN_IN_SIMPLE.forEach((command) => expect(simple.has(command)).toBe(false));
    // Positive control: the served set is the real Simple menu
    expect(simple.has('platform.webViewContentZoomIn')).toBe(true);
  });

  test("Power's Switch Scripture view submenu is labeled and absent from Simple", async () => {
    const isViewSubmenu = (item: Item) =>
      'id' in item && item.id === 'platformScriptureEditor.viewSubmenu';
    const root = (await getEditorTopMenuInMode('power')).items.find(isViewSubmenu);
    expect(root && labelText(root.label)).toBe('Switch Scripture view');
    expect((await getEditorTopMenuInMode('simple')).items.some(isViewSubmenu)).toBe(false);
  });

  test('the served Simple menu marks only the Edit column isHeaderHidden', async () => {
    const simpleMenu = await getEditorTopMenuInMode('simple');
    const headerHiddenColumns = keyedEntries<{ isHeaderHidden?: boolean }>(simpleMenu.columns)
      .filter(([, column]) => column.isHeaderHidden)
      .map(([columnKey]) => columnKey);
    expect(headerHiddenColumns).toEqual(['platformScriptureEditor.simpleEdit']);
  });

  test('the served Power menu marks the same Edit column isHeaderHidden', async () => {
    const powerMenu = await getEditorTopMenuInMode('power');
    const headerHiddenColumns = keyedEntries<{ isHeaderHidden?: boolean }>(powerMenu.columns)
      .filter(([, column]) => column.isHeaderHidden)
      .map(([columnKey]) => columnKey);
    expect(headerHiddenColumns).toEqual(['platformScriptureEditor.simpleEdit']);
  });

  test("Power's served items include none of Simple's own entries", async () => {
    const powerMenu = await getEditorTopMenuInMode('power');
    const served = powerMenu.items.map((item) => ('command' in item ? item.command : item.id));
    expect(served).not.toContain('platformScriptureEditor.showBibleTextsPanel');
    expect(served).not.toContain('legacyCommentManager.showCommentListPanel');
    // Positive control: the list is the real served menu, not an empty one
    expect(served).toContain('platformScriptureEditor.insertCommentAtSelection');
  });

  /**
   * `EDIT_MENU_COMMANDS` (in `edit-menu-actions.util.ts`) lists the Edit flyout commands the web
   * view intercepts because they need the click's user activation (the clipboard ones). It and the
   * Edit ▸ flyout's command list in `menus.json` are two independently maintained lists: the web
   * view's `menuCommandHandler` intercepts a flyout click only when `isEditMenuCommand` recognizes
   * it, so a clipboard item added or reordered in `menus.json` without a matching update there
   * falls through to a `sendCommand` call for a command PAPI never registers. Undo and Redo are
   * registered PAPI commands, so they lead the flyout and are not on the list. Comparing against
   * the ids this test derives from the served menu, rather than a third hardcoded list, is what
   * catches that drift.
   */
  test('EDIT_MENU_COMMANDS matches the Edit flyout clipboard commands, in order', async () => {
    const registeredEditCommands = ['platformScriptureEditor.undo', 'platformScriptureEditor.redo'];
    const simpleMenu = await getEditorTopMenuInMode('simple');
    expect(flyoutCommandIds(simpleMenu, 'platformScriptureEditor.editSubmenu')).toEqual([
      ...registeredEditCommands,
      ...EDIT_MENU_COMMANDS,
    ]);
    // Power's flyout adds Find after the edit actions, which the web view routes to its own handler
    const powerMenu = await getEditorTopMenuInMode('power');
    expect(flyoutCommandIds(powerMenu, 'platformScriptureEditor.editSubmenu')).toEqual([
      ...registeredEditCommands,
      ...EDIT_MENU_COMMANDS,
      'platformScripture.openFind',
    ]);
  });

  test('the intercepted Edit flyout commands are the three clipboard ones', () => {
    expect([...EDIT_MENU_COMMANDS]).toEqual([
      'platformScriptureEditor.cutSelection',
      'platformScriptureEditor.copySelection',
      'platformScriptureEditor.pasteAtSelection',
    ]);
  });

  /**
   * A menu hint appears only for an item that runs a registered PAPI command with a catalogued
   * chord. Undo and Redo are such commands; Cut, Copy and Paste stay intercepted in the web view
   * (the clipboard needs the click's user activation), so their chords are not hinted.
   */
  test.each(['power', 'simple'] as const)(
    '%s shows shortcut hints on Undo and Redo but not on Cut, Copy or Paste',
    async (mode) => {
      const menu = await getEditorTopMenuInMode(mode);
      const shortcutOf = (command: string) => {
        const item = menu.items.find(
          (candidate) => 'command' in candidate && candidate.command === command,
        );
        if (!item) throw new Error(`${command} is not served`);
        return 'shortcut' in item ? item.shortcut : undefined;
      };
      expect(shortcutOf('platformScriptureEditor.undo')).toEqual(expect.any(String));
      expect(shortcutOf('platformScriptureEditor.redo')).toEqual(expect.any(String));
      expect(shortcutOf('platformScriptureEditor.cutSelection')).toBeUndefined();
      expect(shortcutOf('platformScriptureEditor.copySelection')).toBeUndefined();
      expect(shortcutOf('platformScriptureEditor.pasteAtSelection')).toBeUndefined();
    },
  );

  test.each(['power', 'simple'] as const)(
    '%s shows the shortcut hint on Project settings',
    async (mode) => {
      const menu = await getEditorTopMenuInMode(mode);
      const item = menu.items.find(
        (candidate) =>
          'command' in candidate && candidate.command === 'platform.openProjectSettingsForWebView',
      );
      expect(item).toHaveProperty('shortcut', expect.any(String));
    },
  );

  /**
   * Guards the regression class a mode-gated menu document invites: `hiddenInterfaceModes` can drop
   * a command from Simple with nothing failing — no type error, no missing-route crash, just a menu
   * entry that silently isn't there. Every command the editor declares must reach Simple, or be
   * named below with the reason it stays Power-only, turning a silent drop into a decision someone
   * has to sign off on.
   */
  const POWER_ONLY_COMMANDS = new Set([
    // The four inventories, Markers Checklist and Basic checks: hidden in both modes, so they stay
    // declared and return when the flag is removed. Basic checks returns to Power only: Simple's
    // quality tooling is the Checking assistant, contributed outside core.
    'platformScripture.openCharactersInventory',
    'platformScripture.openRepeatedWordsInventory',
    'platformScripture.openMarkersInventory',
    'platformScripture.openPunctuationInventory',
    'platformScripture.openMarkersChecklist',
    'platformScripture.openChecksSidePanel',
    // Manage books: book management is a Power-mode task; Simple's missing-book message instead
    // tells the user to ask their project administrator.
    'platformScripture.openManageBooks',
    // The Power Comments item opens a separate Comment List web view; Simple's own Comments item
    // (legacyCommentManager.showCommentListPanel) fronts the shared Column 3 tab instead.
    'legacyCommentManager.openCommentList',
    // Switch scripture view ▸ Standard view / Preview: Simple shows only Preview.
    'platformScriptureEditor.setViewStandard',
    'platformScriptureEditor.setViewPreview',
  ]);

  /**
   * Simple and Power serve some commands from separate copies of the same item, so a label edited
   * in one copy and not the other would show one command under different names per mode.
   */
  test('a command served in both modes has the same label in each', async () => {
    const labelsByCommand = (menu: Menu) =>
      new Map(
        menu.items.flatMap((item): [string, string][] =>
          'command' in item ? [[item.command, item.label]] : [],
        ),
      );
    const power = labelsByCommand(await getEditorTopMenuInMode('power'));
    const simple = labelsByCommand(await getEditorTopMenuInMode('simple'));
    const shared = [...simple.keys()].filter((command) => power.has(command));

    // Positive control: the per-mode Find items and the shared footnote items are among them
    expect(shared).toContain('platformScriptureEditor.toggleFootnotes');
    expect(shared).toContain('platformScripture.openFind');
    shared.forEach((command) => {
      expect({ command, label: simple.get(command) }).toEqual({
        command,
        label: power.get(command),
      });
    });
  });

  test('every command the editor declares reaches Simple, or is a documented Power-only exception', async () => {
    const declared = declaredEditorCommandIds();
    const powerCommands = servedCommandIds(await getEditorTopMenuInMode('power'));
    const simpleCommands = servedCommandIds(await getEditorTopMenuInMode('simple'));

    // Nothing the editor declares is orphaned: every command reaches at least one mode, bar the
    // ones deliberately hidden in both. (The served sets can be larger than `declared` —
    // `includeDefaults: true` also serves items like `platform.openProjectSettingsForWebView` that
    // no line in this editor's own menus.json declares — so this checks membership rather than set
    // equality.)
    [...declared]
      .filter((id) => !HIDDEN_IN_BOTH_MODES.includes(id))
      .forEach((id) => {
        expect(powerCommands.has(id) || simpleCommands.has(id)).toBe(true);
      });
    HIDDEN_IN_BOTH_MODES.forEach((id) => {
      expect(declared.has(id)).toBe(true);
      expect(powerCommands.has(id) || simpleCommands.has(id)).toBe(false);
    });

    // Anything missing from Simple must be on the allow-list above, not silently absent.
    const missingFromSimple = [...declared].filter((id) => !simpleCommands.has(id));
    expect(new Set(missingFromSimple)).toEqual(POWER_ONLY_COMMANDS);
  });

  /**
   * The checks group must stay declared, in the Tools column, and extensible even while Basic
   * checks (its own item) is hidden: another extension (here the Checking assistant, Power only)
   * adds its item to it at order 4, and a group that is missing or not extensible makes the
   * combiner throw, which drops that extension's whole menu document.
   */
  test('the checks group stays declared in the Tools column and extensible', () => {
    const menus = JSON.parse(readFileSync(EDITOR_MENUS_PATH, 'utf8'));
    expect(menus.webViewMenus[SCRIPTURE_EDITOR_WEB_VIEW_TYPE].topMenu.groups).toHaveProperty(
      ['platformScriptureEditor.checks'],
      expect.objectContaining({
        column: 'platformScriptureEditor.tools',
        order: 3,
        isExtensible: true,
      }),
    );
  });

  describe('an extension adding a tool to the checks group', () => {
    const FOREIGN_COMMAND = 'checkingAssistant.open';

    async function getMenuWithForeignChecksItem(mode: 'simple' | 'power') {
      const combiner = new MenuDocumentCombiner(menuDataObject);
      getMenuContributingExtensions({ excludeDevOnly: true }).forEach(([name, menus]) => {
        combiner.addOrUpdateContribution(name, menus);
      });
      combiner.addOrUpdateContribution('checkingAssistant', {
        webViewMenus: {
          [SCRIPTURE_EDITOR_WEB_VIEW_TYPE]: {
            topMenu: {
              items: [
                {
                  label: '%checkingAssistant_menu_open%',
                  group: 'platformScriptureEditor.checks',
                  order: 4,
                  command: FOREIGN_COMMAND,
                  hiddenInterfaceModes: ['simple'],
                },
              ],
            },
          },
        },
      });
      if (!combiner.rawOutput) throw new Error('The menu document failed to combine');
      const engine = await getMenuDataEngineInMode(combiner.rawOutput, mode);
      const webViewMenu = await engine.getWebViewMenu(SCRIPTURE_EDITOR_WEB_VIEW_TYPE);
      if (!webViewMenu.topMenu) throw new Error('The scripture editor serves no top menu');
      return webViewMenu.topMenu;
    }

    test('Power serves it after Comments in the Tools column, with Basic checks hidden', async () => {
      const menu = await getMenuWithForeignChecksItem('power');
      const tools = describeSections(menu).find(
        ([columnKey]) => columnKey === 'platformScriptureEditor.tools',
      );
      expect(tools?.[1]).toEqual(['legacyCommentManager.openCommentList', FOREIGN_COMMAND]);
    });

    test('Simple does not serve it', async () => {
      const menu = await getMenuWithForeignChecksItem('simple');
      expect(servedCommandIds(menu).has(FOREIGN_COMMAND)).toBe(false);
      // Positive control: the combined menu is the real Simple menu
      expect(servedCommandIds(menu).has('platform.webViewContentZoomIn')).toBe(true);
    });
  });
});
