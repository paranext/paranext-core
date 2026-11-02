import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  newPlatformError,
  type LocalizeKey,
  type MultiColumnMenu,
  type PlatformError,
} from 'platform-bible-utils';
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
const { mockKeyValues, keyListeners } = vi.hoisted(() => ({
  mockKeyValues: new Map<string, string | number | boolean>(),
  keyListeners: new Set<(event: { key: string; value: unknown }) => void>(),
}));
vi.mock('@shared/services/context-keys.service', () => ({
  contextKeysService: {
    get: (key: string) => mockKeyValues.get(key),
    onDidChange: (listener: (event: { key: string; value: unknown }) => void) => {
      keyListeners.add(listener);
      return () => keyListeners.delete(listener);
    },
  },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));
vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn().mockResolvedValue(undefined),
}));
/** Minimal stand-in for an Electron Menu: item state by id, mutable like the real items */
const { fakeMenuFromTemplate } = vi.hoisted(() => {
  type Template = { id?: string; enabled?: boolean; checked?: boolean; submenu?: unknown };
  function isTemplate(candidate: unknown): candidate is Template {
    return !!candidate && typeof candidate === 'object';
  }
  return {
    fakeMenuFromTemplate: (template: unknown[]) => {
      const items = new Map<string, { enabled: boolean; checked: boolean }>();
      const walk = (entries: unknown[]) =>
        entries.filter(isTemplate).forEach((entry) => {
          if (entry.id)
            items.set(entry.id, {
              enabled: entry.enabled ?? true,
              checked: entry.checked ?? false,
            });
          if (Array.isArray(entry.submenu)) walk(entry.submenu);
        });
      walk(template);
      return { getMenuItemById: (id: string) => items.get(id) };
    },
  };
});
vi.mock('electron', () => ({
  Menu: {
    buildFromTemplate: vi.fn((template: unknown[]) => fakeMenuFromTemplate(template)),
    setApplicationMenu: vi.fn(),
  },
}));
vi.mock('@shared/data/platform-bible-menu.commands', () => ({ handleMenuCommand: vi.fn() }));

// The module under test, imported after the mocks above are established.
// eslint-disable-next-line import/first
import {
  getMacosMenuItemId,
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
    // A contributed item carries the id `getMacosMenuItemId` gives it. Asserting the full order —
    // not just membership — pins that it is interleaved by `order` rather than appended after the
    // platform items.
    expect(submenu.map((item) => item.id ?? item.label)).toEqual([
      'reload',
      'forceReload',
      'toggleDevTools',
      'platformMenu:test.group:test.command',
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

/** Fixture with one item per kind of when-expression, all reading a distinct key */
function menuWithGatedItems(extraItems: MultiColumnMenu['items'] = []): MultiColumnMenu {
  return {
    columns: { 'test.column': { label: '%mainMenu_custom%', order: 1 }, isExtensible: true },
    groups: { 'test.group': { column: 'test.column', order: 1 } },
    items: [
      {
        label: '%test_gated%',
        group: 'test.group',
        order: 1,
        command: 'test.gated',
        localizeNotes: 'Fixture item gated by enabledWhen.',
        enabledWhen: 'test.flag',
      },
      {
        label: '%test_checked%',
        group: 'test.group',
        order: 2,
        command: 'test.checked',
        localizeNotes: 'Fixture item with checkedWhen.',
        checkedWhen: 'test.checkFlag',
      },
      {
        label: '%test_shown%',
        group: 'test.group',
        order: 3,
        command: 'test.shown',
        localizeNotes: 'Fixture item with a visibility condition.',
        when: 'test.showFlag',
      },
      ...extraItems,
    ],
  };
}

/** Finds the template entry with the given id, searching submenus */
function findTemplateEntry(entries: unknown[], id: string): Record<string, unknown> | undefined {
  const records = entries.filter(isRecord);
  const direct = records.find((entry) => entry.id === id);
  if (direct) return direct;
  return records
    .map((entry) =>
      Array.isArray(entry.submenu) ? findTemplateEntry(entry.submenu, id) : undefined,
    )
    .find((found) => found !== undefined);
}

function emitKey(key: string, value: unknown) {
  keyListeners.forEach((listener) => listener({ key, value }));
}

/** Lets fire-and-forget rebuilds started by a key listener finish */
async function flushRebuilds() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('getMacosMenuItemId', () => {
  it('derives the id from the group and the command or submenu id', () => {
    expect(
      getMacosMenuItemId({
        label: '%a%',
        group: 'g.one',
        order: 1,
        command: 'c.one',
        localizeNotes: '',
      }),
    ).toBe('platformMenu:g.one:c.one');
    expect(
      getMacosMenuItemId({
        label: '%a%',
        group: 'g.one',
        order: 1,
        id: 'sub.one',
        localizeNotes: '',
      }),
    ).toBe('platformMenu:g.one:sub.one');
  });
});

describe('subscribeCurrentMacosMenubar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    keyListeners.clear();
    mockKeyValues.clear();
  });

  async function subscribe() {
    let onMenuChange: ((menu: MultiColumnMenu | PlatformError) => Promise<void>) | undefined;
    vi.mocked(menuDataService.subscribeUnlocalizedMainMenu).mockImplementation(
      async (_selector, callback) => {
        // The test only ever delivers a MultiColumnMenu or a PlatformError
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        onMenuChange = callback as (menu: MultiColumnMenu | PlatformError) => Promise<void>;
        return async () => true;
      },
    );
    await subscribeCurrentMacosMenubar();
    return (menu: MultiColumnMenu | PlatformError) => onMenuChange?.(menu);
  }

  function lastAppliedMenu() {
    const { results } = vi.mocked(Menu.buildFromTemplate).mock;
    return results.at(-1)?.value;
  }

  it('updates enabled in place when a key it reads changes', async () => {
    const deliver = await subscribe();
    await deliver(menuWithGatedItems());
    const applied = lastAppliedMenu();
    expect(applied.getMenuItemById('platformMenu:test.group:test.gated').enabled).toBe(false);

    mockKeyValues.set('test.flag', true);
    emitKey('test.flag', true);
    await flushRebuilds();

    expect(applied.getMenuItemById('platformMenu:test.group:test.gated').enabled).toBe(true);
    expect(Menu.setApplicationMenu).toHaveBeenCalledTimes(1);
    expect(Menu.buildFromTemplate).toHaveBeenCalledTimes(1);
  });

  it('updates checked in place', async () => {
    const deliver = await subscribe();
    await deliver(menuWithGatedItems());
    const applied = lastAppliedMenu();
    expect(applied.getMenuItemById('platformMenu:test.group:test.checked').checked).toBe(false);

    mockKeyValues.set('test.checkFlag', true);
    emitKey('test.checkFlag', true);
    await flushRebuilds();

    expect(applied.getMenuItemById('platformMenu:test.group:test.checked').checked).toBe(true);
    expect(Menu.setApplicationMenu).toHaveBeenCalledTimes(1);
    expect(Menu.buildFromTemplate).toHaveBeenCalledTimes(1);
  });

  it('rebuilds when a visibility key changes', async () => {
    const deliver = await subscribe();
    await deliver(menuWithGatedItems());
    expect(Menu.buildFromTemplate).toHaveBeenCalledTimes(1);

    mockKeyValues.set('test.showFlag', true);
    emitKey('test.showFlag', true);
    await flushRebuilds();

    expect(Menu.buildFromTemplate).toHaveBeenCalledTimes(2);
    const lastTemplate = vi.mocked(Menu.buildFromTemplate).mock.calls[1][0];
    expect(JSON.stringify(lastTemplate)).toContain('%test_shown%');
  });

  it('ignores a key the menu did not read', async () => {
    const deliver = await subscribe();
    await deliver(menuWithGatedItems());

    emitKey('other.key', true);
    await flushRebuilds();

    expect(Menu.buildFromTemplate).toHaveBeenCalledTimes(1);
    expect(Menu.setApplicationMenu).toHaveBeenCalledTimes(1);
  });

  it('rebuilds instead of updating in place while a rebuild is pending', async () => {
    const deliver = await subscribe();
    await deliver(menuWithGatedItems());

    let releasePending: () => void = () => {};
    vi.mocked(localizationService.getLocalizedStrings).mockImplementationOnce(
      ({ localizeKeys }) =>
        new Promise((resolve) => {
          releasePending = () => resolve(Object.fromEntries(localizeKeys.map((key) => [key, key])));
        }),
    );
    const pending = deliver(menuWithGatedItems());
    mockKeyValues.set('test.flag', true);
    emitKey('test.flag', true);
    await flushRebuilds();
    releasePending();
    await pending;
    await flushRebuilds();

    const lastTemplate = vi.mocked(Menu.buildFromTemplate).mock.calls.at(-1)?.[0] ?? [];
    expect(findTemplateEntry(lastTemplate, 'platformMenu:test.group:test.gated')?.enabled).toBe(
      true,
    );
  });

  it('rebuilds when two items share an id', async () => {
    const deliver = await subscribe();
    await deliver(
      menuWithGatedItems([
        {
          label: '%test_gatedTwin%',
          group: 'test.group',
          order: 4,
          command: 'test.gated',
          localizeNotes: 'Fixture item sharing an id with the first.',
        },
      ]),
    );
    expect(Menu.buildFromTemplate).toHaveBeenCalledTimes(1);

    mockKeyValues.set('test.flag', true);
    emitKey('test.flag', true);
    await flushRebuilds();

    expect(Menu.buildFromTemplate).toHaveBeenCalledTimes(2);
  });

  it('keeps tracking keys after an overtaken rebuild fails', async () => {
    const deliver = await subscribe();
    let rejectFirst: (reason: Error) => void = () => {};
    vi.mocked(localizationService.getLocalizedStrings).mockImplementationOnce(
      () =>
        new Promise((_resolve, reject) => {
          rejectFirst = reject;
        }),
    );
    const first = deliver(menuWithGatedItems());
    await deliver(menuWithGatedItems());
    rejectFirst(new Error('localization failed'));
    await first;
    await flushRebuilds();

    mockKeyValues.set('test.flag', true);
    emitKey('test.flag', true);
    await flushRebuilds();

    expect(lastAppliedMenu().getMenuItemById('platformMenu:test.group:test.gated').enabled).toBe(
      true,
    );
  });

  it('rebuilds on a read key after the only rebuild fell back to the default menubar', async () => {
    const deliver = await subscribe();
    vi.mocked(localizationService.getLocalizedStrings).mockRejectedValueOnce(
      new Error('localization failed'),
    );
    await deliver(menuWithGatedItems());
    expect(Menu.buildFromTemplate).toHaveBeenCalledTimes(1);

    mockKeyValues.set('test.flag', true);
    emitKey('test.flag', true);
    await flushRebuilds();

    expect(Menu.buildFromTemplate).toHaveBeenCalledTimes(2);
    const lastTemplate = vi.mocked(Menu.buildFromTemplate).mock.calls.at(-1)?.[0] ?? [];
    expect(findTemplateEntry(lastTemplate, 'platformMenu:test.group:test.gated')?.enabled).toBe(
      true,
    );
  });

  it('the default fallback reads no keys', async () => {
    const deliver = await subscribe();
    await deliver(newPlatformError('test failure'));
    expect(Menu.buildFromTemplate).toHaveBeenCalledTimes(1);

    emitKey('test.flag', true);
    await flushRebuilds();

    expect(Menu.buildFromTemplate).toHaveBeenCalledTimes(1);
  });

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
