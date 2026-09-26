import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { isGroupUnderColumnOrSubMenu } from 'platform-bible-react';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { describe, expect, test } from 'vitest';
// Resolvable from this project: neither a `tsc -p ./tsconfig.json` typecheck nor `vitest`'s
// module resolution treats `extensions` (excluded from the root tsconfig's `include`) any
// differently for an explicit relative import than for a file this project owns.
import { EDIT_MENU_COMMANDS } from '../../../extensions/src/platform-scripture-editor/src/edit-menu-actions.util';
import {
  EXTENSIONS_DIR,
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

describe("The scripture editor's Project menu, per mode", () => {
  /**
   * Power's menu is pinned in full so that reshaping Simple's menu — which shares this document —
   * cannot move anything in Power. Update only alongside a deliberate decision to change Power.
   */
  test('Power serves its established layout', async () => {
    expect(describeSections(await getEditorTopMenuInMode('power'))).toEqual([
      ['platform.app', ['platform.openSettings', 'platformScripture.openManageBooks']],
      ['platformScriptureEditor.edit', ['platformScripture.openFind']],
      [
        'platformScriptureEditor.options',
        [
          'platformScriptureEditor.changeView',
          'platformScriptureEditor.toggleFootnotes',
          'platformScriptureEditor.changeFootnotesPaneLocation',
          'platformScriptureEditor.toggleFootnotesAutoShow',
        ],
      ],
      [
        'platformScriptureEditor.tools',
        [
          'platformScripture.openCharactersInventory',
          'platformScripture.openRepeatedWordsInventory',
          'platformScripture.openMarkersInventory',
          'platformScripture.openPunctuationInventory',
          'platformScripture.openMarkersChecklist',
          'platformScripture.openChecksSidePanel',
          'legacyCommentManager.openCommentList',
        ],
      ],
      [
        'platformScriptureEditor.insert',
        [
          'platformScriptureEditor.insertFootnoteAtSelection',
          'platformScriptureEditor.insertCrossReferenceAtSelection',
          'platformScriptureEditor.insertCommentAtSelection',
        ],
      ],
    ]);
  });

  test('Simple serves its shipped layout', async () => {
    expect(describeSections(await getEditorTopMenuInMode('simple'))).toEqual([
      ['platform.app', ['platform.openSettings']],
      [
        'platformScriptureEditor.simpleEdit',
        [
          'platformScriptureEditor.editSubmenu ▸ platformScriptureEditor.undo, platformScriptureEditor.redo, platformScriptureEditor.cutSelection, platformScriptureEditor.copySelection, platformScriptureEditor.pasteAtSelection',
        ],
      ],
      [
        'platformScriptureEditor.zoomSection',
        [
          'platform.webViewContentZoomIn',
          'platform.webViewContentZoomOut',
          'platform.webViewContentZoomReset',
        ],
      ],
      [
        'platformScriptureEditor.simpleView',
        [
          'platformScriptureEditor.changeView',
          'platformScriptureEditor.toggleFootnotes',
          'platformScriptureEditor.changeFootnotesPaneLocation',
        ],
      ],
      [
        'platformScriptureEditor.insert',
        [
          'platformScriptureEditor.insertFootnoteAtSelection',
          'platformScriptureEditor.insertCrossReferenceAtSelection',
          'platformScriptureEditor.insertCommentAtSelection',
        ],
      ],
      [
        'platformScriptureEditor.simpleTools',
        [
          'platformScriptureEditor.showBibleTextsPanel',
          'platformScriptureEditor.showCommentariesPanel',
          'legacyCommentManager.showCommentListPanel',
          'platformScriptureEditor.showTextCollectionPanel',
          'platformScripture.openFind',
        ],
      ],
      ['platformScriptureEditor.simpleQualityChecks', ['platformScripture.openChecksSidePanel']],
    ]);
  });

  test('the served Simple menu marks only the Edit column isHeaderHidden', async () => {
    const simpleMenu = await getEditorTopMenuInMode('simple');
    const headerHiddenColumns = keyedEntries<{ isHeaderHidden?: boolean }>(simpleMenu.columns)
      .filter(([, column]) => column.isHeaderHidden)
      .map(([columnKey]) => columnKey);
    expect(headerHiddenColumns).toEqual(['platformScriptureEditor.simpleEdit']);
  });

  test("Power's served items include none of Simple's own entries", async () => {
    const powerMenu = await getEditorTopMenuInMode('power');
    const served = powerMenu.items.map((item) => ('command' in item ? item.command : item.id));
    expect(served).not.toContain('platformScriptureEditor.editSubmenu');
    expect(served).not.toContain('platformScriptureEditor.undo');
    expect(served).not.toContain('platformScriptureEditor.showBibleTextsPanel');
    // Positive control: the list is the real served menu, not an empty one
    expect(served).toContain('platformScriptureEditor.insertCommentAtSelection');
  });

  /**
   * `EDIT_MENU_COMMANDS` (in `edit-menu-actions.util.ts`) and the Edit ▸ flyout's command list in
   * `menus.json` are two independently maintained lists that must name the same commands in the
   * same order: the web view's `menuCommandHandler` intercepts a flyout click only when
   * `isEditMenuCommand` — driven off `EDIT_MENU_COMMANDS` — recognizes it, so a flyout item added
   * or reordered in `menus.json` without a matching update there falls through to a `sendCommand`
   * call for a command PAPI never registers. Comparing against the ids this test derives from the
   * served menu, rather than a third hardcoded list, is what catches that drift.
   */
  test('EDIT_MENU_COMMANDS matches the Edit flyout served commands, in order', async () => {
    const simpleMenu = await getEditorTopMenuInMode('simple');
    expect(flyoutCommandIds(simpleMenu, 'platformScriptureEditor.editSubmenu')).toEqual([
      ...EDIT_MENU_COMMANDS,
    ]);
  });

  /**
   * Guards the regression class a mode-gated menu document invites: `hiddenInterfaceModes` can drop
   * a command from Simple with nothing failing — no type error, no missing-route crash, just a menu
   * entry that silently isn't there. Every command the editor declares must reach Simple, or be
   * named below with the reason it stays Power-only, turning a silent drop into a decision someone
   * has to sign off on.
   */
  const POWER_ONLY_COMMANDS = new Set([
    // The four inventories and Markers Checklist: Simple's design keeps its quality tools to the
    // Checks side panel, under Quality checks.
    'platformScripture.openCharactersInventory',
    'platformScripture.openRepeatedWordsInventory',
    'platformScripture.openMarkersInventory',
    'platformScripture.openPunctuationInventory',
    'platformScripture.openMarkersChecklist',
    // The auto-show footnote pane toggle: Simple keeps PT9's manual footnotes pane, which Show
    // footnotes opens and which then stays open, so Simple has no automatic behavior to turn on.
    'platformScriptureEditor.toggleFootnotesAutoShow',
    // Manage books: book management is a Power-mode task; Simple's missing-book message instead
    // tells the user to ask their project administrator.
    'platformScripture.openManageBooks',
    // The Power Comments item opens a separate Comment List web view; Simple's own Comments item
    // (legacyCommentManager.showCommentListPanel) fronts the shared Column 3 tab instead.
    'legacyCommentManager.openCommentList',
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

    // Positive control: the duplicated View and Find items are among the shared commands
    expect(shared).toContain('platformScriptureEditor.changeView');
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

    // Nothing the editor declares is orphaned: every command reaches at least one mode. (The
    // served sets can be larger than `declared` — `includeDefaults: true` also serves items like
    // `platform.openSettings` that no line in this editor's own menus.json declares — so this
    // checks membership rather than set equality.)
    declared.forEach((id) => {
      expect(powerCommands.has(id) || simpleCommands.has(id)).toBe(true);
    });

    // Anything missing from Simple must be on the allow-list above, not silently absent.
    const missingFromSimple = [...declared].filter((id) => !simpleCommands.has(id));
    expect(new Set(missingFromSimple)).toEqual(POWER_ONLY_COMMANDS);
  });
});
