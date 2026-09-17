import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { LocalizeKey, MultiColumnMenu } from 'platform-bible-utils';

vi.mock('@shared/services/localization.service', () => ({
  localizationService: {
    // Identity: the combine only needs a value per requested key, and using the key itself keeps
    // the assertions below readable.
    getLocalizedStrings: vi.fn(async ({ localizeKeys }: { localizeKeys: string[] }) =>
      Object.fromEntries(localizeKeys.map((key) => [key, key])),
    ),
  },
}));
vi.mock('@shared/services/menu-data.service', () => ({ menuDataService: {} }));
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
import { translatePlatformMenuItemsAndCombine } from './platform-macos-menubar.util';
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
        order: 1,
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

  it('a contributed View column does not delete the built-in zoom items', async () => {
    await translatePlatformMenuItemsAndCombine(menuWithContributedColumn('%mainMenu_view%'));
    const second = await translatePlatformMenuItemsAndCombine(
      menuWithContributedColumn('%mainMenu_file%'),
    );
    const ids = viewSubmenuOf(second).map((item) => item.id);
    expect(ids).toEqual(expect.arrayContaining(ZOOM_ITEM_IDS));
  });

  it('leaves the shared template untouched', async () => {
    await translatePlatformMenuItemsAndCombine(menuWithContributedColumn('%mainMenu_view%'));
    const ids = viewSubmenuOf(macosMenubarObject).map((item) => item.id);
    expect(ids).toEqual(expect.arrayContaining(ZOOM_ITEM_IDS));
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

  it("keeps each zoom item's click handler callable", async () => {
    const combined = await translatePlatformMenuItemsAndCombine(
      menuWithContributedColumn('%mainMenu_file%'),
    );
    const zoomIn = viewSubmenuOf(combined).find((item) => item.id === 'contentZoomIn');
    expect(typeof zoomIn?.click).toBe('function');
  });
});
