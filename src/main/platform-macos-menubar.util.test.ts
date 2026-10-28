import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { LocalizeKey, MultiColumnMenu } from 'platform-bible-utils';
import { Menu } from 'electron';
import { localizationService } from '@shared/services/localization.service';
import { menuDataService } from '@shared/services/menu-data.service';

vi.mock('@shared/services/localization.service', () => ({
  localizationService: {
    // Identity: the combine only needs a value per requested key, and using the key itself keeps
    // the assertions below readable.
    getLocalizedStrings: vi.fn(async ({ localizeKeys }: { localizeKeys: string[] }) =>
      Object.fromEntries(localizeKeys.map((key) => [key, key])),
    ),
  },
}));
vi.mock('@shared/services/menu-data.service', () => ({
  menuDataService: { subscribeUnlocalizedMainMenu: vi.fn() },
}));
vi.mock('@shared/services/context-keys.service', () => ({
  contextKeysService: { get: vi.fn(), onDidChange: vi.fn(() => () => {}) },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));
vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('electron', () => ({
  Menu: { buildFromTemplate: vi.fn(), setApplicationMenu: vi.fn() },
}));
vi.mock('@shared/data/platform-bible-menu.commands', () => ({ handleMenuCommand: vi.fn() }));

// The module under test, imported after the mocks above are established.
// eslint-disable-next-line import/first
import {
  subscribeCurrentMacosMenubar,
  translatePlatformMenuItemsAndCombine,
} from './platform-macos-menubar.util';
// The module-level template the combine reads on every call; these tests assert it stays pristine.
// eslint-disable-next-line import/first
import { macosMenubarObject } from './platform-macos-menubar.data';

/** A contributed main menu with one column carrying the given header label. */
function menuWithContributedColumn(label: LocalizeKey): MultiColumnMenu {
  return {
    columns: {
      'test.column': { label, order: 1 },
      isExtensible: true,
    },
    groups: { 'test.group': { column: 'test.column', order: 1 } },
    items: [
      {
        label: '%test_contributedItem%',
        group: 'test.group',
        // Between the platform View menu's toggleDevTools (order 3) and the separator below it
        // (order 4), so the ordered-sequence assertion below can pin that a contributed item is
        // interleaved by order rather than appended after the platform items.
        order: 3.5,
        command: 'test.command',
        localizeNotes: 'Fixture item contributed by a test.',
      },
    ],
  };
}

/**
 * Submenu items are typed loosely enough that `.find`/`.map` resolve to a near-empty element type,
 * so reading an item's `id` or `click` goes through `unknown` and this guard rather than trusting
 * the declared type.
 */
function isRecord(candidate: unknown): candidate is Record<string, unknown> {
  return !!candidate && typeof candidate === 'object' && !Array.isArray(candidate);
}

function viewSubmenuOf(menu: { id?: string; submenu?: unknown }[]): Record<string, unknown>[] {
  const view = menu.find((column) => column.id === 'macosMenubar.viewMenu');
  const submenu: unknown = view?.submenu;
  return Array.isArray(submenu) ? submenu.filter(isRecord) : [];
}

const ZOOM_ITEM_IDS = ['contentZoomIn', 'contentZoomOut', 'contentZoomReset'];

describe('translatePlatformMenuItemsAndCombine', () => {
  beforeEach(() => vi.clearAllMocks());

  // On macOS the View menu's accelerators are the only menu route to ⌘=/⌘-/⌘0, and the platform
  // items beside them (reload, dev tools, full screen) have no other entry point either, so a
  // contributed column carrying the same header has to join them rather than take their place.
  it('combines a contributed View column with the platform’s own View items', async () => {
    const combined = await translatePlatformMenuItemsAndCombine(
      menuWithContributedColumn('%mainMenu_view%'),
    );
    const submenu = viewSubmenuOf(combined);
    // A contributed item carries no `id` (only `label`, `click` and `order` — see
    // `getMenubarColumnContent`), so falling back to `label` keeps its position in the sequence
    // readable. Asserting the full order — not just membership — pins that it is interleaved by
    // `order` rather than appended after the platform items.
    expect(submenu.map((item) => item.id ?? item.label)).toEqual([
      'reload',
      'forceReload',
      'toggleDevTools',
      '%test_contributedItem%',
      'viewSeparatorAfterDevTools',
      'contentZoomIn',
      'contentZoomInShift',
      'contentZoomInNumpad',
      'contentZoomOut',
      'contentZoomOutNumpad',
      'contentZoomReset',
      'contentZoomResetNumpad',
      'viewSeparatorBeforeFullScreen',
    ]);
  });

  // The combine writes into a per-build copy, never into the module-level template every later
  // build reads again. Compared as a whole sequence rather than for the zoom items' presence: the
  // contributed column is APPENDED to the matching menu, so a write through the template grows it —
  // the second build would carry the first build's contributed item as well as its own, and the
  // zoom items would all still be there.
  it('gives a second build the same View menu as the first, not the first build’s leftovers', async () => {
    const first = await translatePlatformMenuItemsAndCombine(
      menuWithContributedColumn('%mainMenu_view%'),
    );
    const second = await translatePlatformMenuItemsAndCombine(
      menuWithContributedColumn('%mainMenu_view%'),
    );
    expect(viewSubmenuOf(second).map((item) => item.id ?? item.label)).toEqual(
      viewSubmenuOf(first).map((item) => item.id ?? item.label),
    );
    // Positive control: the sequence compared above is the real View menu, zoom items and all.
    expect(viewSubmenuOf(second).map((item) => item.id)).toEqual(
      expect.arrayContaining(ZOOM_ITEM_IDS),
    );
  });

  it('leaves the shared template untouched', async () => {
    // Read before and after rather than against a literal, so the assertion holds wherever this
    // test runs in the file's order and still fails on an item the combine added.
    const before = viewSubmenuOf(macosMenubarObject).map((item) => item.id ?? item.label);
    expect(before).toEqual(expect.arrayContaining(ZOOM_ITEM_IDS));
    await translatePlatformMenuItemsAndCombine(menuWithContributedColumn('%mainMenu_view%'));
    expect(viewSubmenuOf(macosMenubarObject).map((item) => item.id ?? item.label)).toEqual(before);
  });

  it('does not let a contributed app-menu column grow the template', async () => {
    const appMenuLength = () => {
      const appMenu = macosMenubarObject.find((column) => column.id === 'macosMenubar.appMenu');
      return Array.isArray(appMenu?.submenu) ? appMenu.submenu.length : 0;
    };
    const before = appMenuLength();
    await translatePlatformMenuItemsAndCombine(menuWithContributedColumn('%product_shortName%'));
    await translatePlatformMenuItemsAndCombine(menuWithContributedColumn('%product_shortName%'));
    expect(appMenuLength()).toBe(before);
  });

  it('marks a disabled submenu parent item as not enabled', async () => {
    const combined = await translatePlatformMenuItemsAndCombine({
      columns: { 'test.column': { label: '%mainMenu_custom%', order: 1 }, isExtensible: true },
      groups: {
        'test.group': { column: 'test.column', order: 1 },
        'test.subGroup': { menuItem: 'test.parent', order: 1 },
      },
      items: [
        {
          label: '%test_parent%',
          group: 'test.group',
          order: 1,
          id: 'test.parent',
          disabled: true,
          localizeNotes: 'Fixture submenu parent contributed by a test.',
        },
        {
          label: '%test_child%',
          group: 'test.subGroup',
          order: 1,
          command: 'test.command',
          localizeNotes: 'Fixture submenu child contributed by a test.',
        },
      ],
    });
    const column = combined.find((menu) => menu.label === '%mainMenu_custom%');
    const submenu: unknown = column?.submenu;
    const parent = Array.isArray(submenu)
      ? submenu.filter(isRecord).find((item) => item.label === '%test_parent%')
      : undefined;
    expect(parent?.enabled).toBe(false);
    // Positive control: the parent really carries its child submenu
    expect(Array.isArray(parent?.submenu)).toBe(true);
  });

  it("keeps each zoom item's click handler callable", async () => {
    const combined = await translatePlatformMenuItemsAndCombine(
      menuWithContributedColumn('%mainMenu_file%'),
    );
    const zoomIn = viewSubmenuOf(combined).find((item) => item.id === 'contentZoomIn');
    expect(typeof zoomIn?.click).toBe('function');
  });
});

describe('subscribeCurrentMacosMenubar', () => {
  beforeEach(() => vi.clearAllMocks());

  it('skips applying a rebuild that a newer rebuild overtook', async () => {
    let onMenuChange: ((menu: MultiColumnMenu) => Promise<void>) | undefined;
    vi.mocked(menuDataService.subscribeUnlocalizedMainMenu).mockImplementation(
      async (_selector, callback) => {
        // The test only ever delivers a MultiColumnMenu
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        onMenuChange = callback as (menu: MultiColumnMenu) => Promise<void>;
        return async () => true;
      },
    );
    await subscribeCurrentMacosMenubar();

    // The first rebuild waits on localization; the second finishes while it waits
    let releaseFirstLocalization: () => void = () => {};
    vi.mocked(localizationService.getLocalizedStrings).mockImplementationOnce(
      ({ localizeKeys }) =>
        new Promise((resolve) => {
          releaseFirstLocalization = () =>
            resolve(Object.fromEntries(localizeKeys.map((key) => [key, key])));
        }),
    );
    const firstRebuild = onMenuChange?.(menuWithContributedColumn('%mainMenu_first%'));
    await onMenuChange?.(menuWithContributedColumn('%mainMenu_second%'));
    expect(Menu.setApplicationMenu).toHaveBeenCalledTimes(1);

    releaseFirstLocalization();
    await firstRebuild;
    expect(Menu.setApplicationMenu).toHaveBeenCalledTimes(1);
    // The one applied menu is the newer rebuild's, not the overtaken first one
    expect(Menu.buildFromTemplate).toHaveBeenCalledTimes(1);
    const appliedTemplate = vi.mocked(Menu.buildFromTemplate).mock.calls[0][0];
    const appliedLabels = appliedTemplate.map((menu) => menu.label);
    expect(appliedLabels).toContain('%mainMenu_second%');
    expect(appliedLabels).not.toContain('%mainMenu_first%');
  });
});
