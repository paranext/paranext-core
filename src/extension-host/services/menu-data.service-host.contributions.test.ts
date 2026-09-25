import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import menuDataObject from '@extension-host/data/menu.data.json';
import { testingMenuDataService } from '@extension-host/services/menu-data.service-host';
import { USERSNAP_SPACE_API_KEY } from '@shared/data/platform.data';
import { MenuDocumentCombiner } from '@shared/utils/menu-document-combiner';
import { JsonDocumentLike, PlatformMenus } from 'platform-bible-utils';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: {
    get: vi.fn(async () => 'power'),
    subscribe: vi.fn(async () => async () => true),
  },
}));

// Note: using resolve(__dirname, ...) instead of fileURLToPath(new URL(..., import.meta.url))
// because this test runs under jsdom where import.meta.url does not have a file: scheme.
const EXTENSIONS_DIR = resolve(__dirname, '../../../extensions/src');

/** How many application main menu items a shipped `menus.json` contributes. */
function countMainMenuItems(menus: JsonDocumentLike): number {
  if (Array.isArray(menus)) return 0;
  const { mainMenu } = menus;
  if (!mainMenu || typeof mainMenu !== 'object' || Array.isArray(mainMenu)) return 0;
  if (!('items' in mainMenu)) return 0;
  const { items } = mainMenu;
  return Array.isArray(items) ? items.length : 0;
}

/** An extension's manifest `name`, which is how `contribution.service` keys its contributions. */
function readManifestName(directory: string): string {
  const manifest: unknown = JSON.parse(
    readFileSync(resolve(EXTENSIONS_DIR, directory, 'manifest.json'), 'utf8'),
  );
  if (manifest && typeof manifest === 'object' && 'name' in manifest) {
    const { name } = manifest;
    if (typeof name === 'string') return name;
  }
  throw new Error(`Extension ${directory} contributes main menu items but has no manifest name`);
}

/**
 * Every shipped extension contributing application main menu items, as `[manifest name, menu
 * document]` pairs.
 *
 * Discovered by scanning `extensions/src` rather than listed by hand, so an extension that starts
 * contributing main menu items is covered without anyone having to remember this file — which
 * matters because the empty-group expectations below are only true of the menu as a whole.
 *
 * `contribution.service`'s combiner only ever sees `menu.data.json` under test, because extension
 * contributions are added inside the extension-load path, which does not run here. So these tests
 * read the shipped files off disk and combine them explicitly. Reading the real files (rather than
 * inlining fixtures) is what makes this track the shipped menus, and it borrows the combiner's
 * schema validation for free: a mistyped flag rejects the whole document.
 */
function getMenuContributingExtensions(): [string, JsonDocumentLike][] {
  return readdirSync(EXTENSIONS_DIR, { withFileTypes: true }).flatMap(
    (entry): [string, JsonDocumentLike][] => {
      if (!entry.isDirectory()) return [];
      const menusPath = resolve(EXTENSIONS_DIR, entry.name, 'contributions/menus.json');
      if (!existsSync(menusPath)) return [];
      const menus: JsonDocumentLike = JSON.parse(readFileSync(menusPath, 'utf8'));
      if (countMainMenuItems(menus) === 0) return [];
      return [[readManifestName(entry.name), menus]];
    },
  );
}

/**
 * The shipped platform menu document combined with every shipped extension menu contribution — i.e.
 * the main menu as a running app actually assembles it.
 *
 * Builds a fresh combiner rather than reusing `contribution.service`'s exported singleton, which
 * other suites in this process read.
 */
function getRealCombinedMenus(): PlatformMenus {
  const combiner = new MenuDocumentCombiner(menuDataObject);
  getMenuContributingExtensions().forEach(([extensionName, menus]) => {
    combiner.addOrUpdateContribution(extensionName, menus);
  });
  const combined = combiner.rawOutput;
  if (!combined) throw new Error('Platform menu document failed to combine with contributions');
  return combined;
}

async function getMainMenuInMode(mode: 'simple' | 'power') {
  const { settingsService } = await import('@shared/services/settings.service');
  vi.mocked(settingsService.get).mockResolvedValue(mode);
  const engine = testingMenuDataService.implementMenuDataDataProviderEngine(getRealCombinedMenus());
  // Let the fire-and-forget settings read in the constructor resolve
  await Promise.resolve();
  await Promise.resolve();
  return engine.getMainMenu();
}

function hasCommand(menu: Awaited<ReturnType<typeof getMainMenuInMode>>, command: string): boolean {
  return menu.items.some((item) => 'command' in item && item.command === command);
}

/** Every entry the main menu offers in `mode`, by command — or by id for a submenu root. */
function entriesIn(menu: Awaited<ReturnType<typeof getMainMenuInMode>>): string[] {
  return menu.items.map((item) => ('command' in item ? item.command : item.id)).sort();
}

describe('The shipped main menu is pinned exactly, per mode', () => {
  /**
   * The gating suites below name the items they care about, so they cannot see an item nobody
   * thought to name. Groups marked `isExtensible` accept contributions from any extension, which
   * means a new menu entry can reach Simple without this repo's menu document changing at all —
   * exactly the regression the per-item checks cannot catch. Comparing the whole list makes any
   * such addition fail here, naming the new command in the diff.
   *
   * `helloRock3.*` is in both lists deliberately: it ships main menu items with no
   * `hiddenInterfaceModes`, so it is a live example of that hazard rather than an oversight. Its
   * presence in the Simple list is the thing this test exists to make visible.
   *
   * Update these lists only alongside a deliberate decision about whether the item belongs in each
   * mode — never to make a failing run green.
   *
   * A product build that sets the Usersnap space key (Paratext 10, through its repo patch) also
   * re-adds two `platform.helpFeedback` items, so those are expected exactly when the key is set.
   * The empty `platform.helpFeedback` group and the `%mainMenu_feedbackForm_screenshot%` /
   * `%mainMenu_feedbackForm_textArea%` labels stay in core as anchors for that patch.
   */
  const PRODUCT_FEEDBACK_ITEMS = USERSNAP_SPACE_API_KEY
    ? ['platform.usersnapReportIssue', 'platform.usersnapSubmitIdea']
    : [];

  const SIMPLE_MAIN_MENU = [
    'helloRock3.createNewProject',
    'helloRock3.deleteProject',
    'helloRock3.openProject',
    'helloRock3.projectSubmenu',
    'platform.about',
    'platform.openSettings',
    'platform.quit',
    'platform.showOnboardingTour',
    ...PRODUCT_FEEDBACK_ITEMS,
    'platform.visitFAQsPage',
  ];

  const POWER_MAIN_MENU = [
    'helloRock3.createNewProject',
    'helloRock3.deleteProject',
    'helloRock3.openProject',
    'helloRock3.projectSubmenu',
    'paratextRegistration.showParatextRegistration',
    'platform.about',
    'platform.createWindow',
    'platform.openDeveloperDocumentationUrl',
    'platform.openSettings',
    'platform.quit',
    'platform.showOnboardingTour',
    ...PRODUCT_FEEDBACK_ITEMS,
    'platform.visitFAQsPage',
    'platform.visitFeatureRoadmapPage',
    'platform.visitGettingStartedPage',
    'platformEnhancedResources.openEnhancedResource',
    'platformGetResources.openHome',
    'platformLexicalTools.openDictionary',
  ];

  test('Simple offers exactly these entries', async () => {
    expect(entriesIn(await getMainMenuInMode('simple'))).toEqual(SIMPLE_MAIN_MENU);
  });

  test('Power offers exactly these entries', async () => {
    expect(entriesIn(await getMainMenuInMode('power'))).toEqual(POWER_MAIN_MENU);
  });
});

describe('Shipped menu contributions are discovered', () => {
  /**
   * Every assertion below reasons about the combined menu, so a scan that silently found nothing
   * would make each "absent in Simple" case trivially true. These name the contributors the rest of
   * the suite depends on without making the scan itself a hand-maintained list.
   */
  test.each([
    'platformGetResources',
    'platformLexicalTools',
    'platformEnhancedResources',
    'paratextRegistration',
  ])('%s is picked up from the shipped extensions', (extensionName) => {
    expect(getMenuContributingExtensions().map(([name]) => name)).toContain(extensionName);
  });
});

describe('Extension-contributed main menu items are gated for Simple mode', () => {
  /**
   * The Power half of every case is what catches an over-broad `hiddenInterfaceModes`: without it,
   * a flag that wrongly hides an item in both modes still passes.
   */
  const HIDDEN_IN_SIMPLE = [
    ['Open...', 'platformGetResources.openHome'],
    ['Open Dictionary: SDBH/SDBG', 'platformLexicalTools.openDictionary'],
    ['Open enhanced resource', 'platformEnhancedResources.openEnhancedResource'],
    ['Paratext Registration Information...', 'paratextRegistration.showParatextRegistration'],
  ] as const;

  test.each(HIDDEN_IN_SIMPLE)('"%s" is absent from the main menu in Simple', async (_, command) => {
    expect(hasCommand(await getMainMenuInMode('simple'), command)).toBe(false);
  });

  test.each(HIDDEN_IN_SIMPLE)('"%s" is still present in Power', async (_, command) => {
    expect(hasCommand(await getMainMenuInMode('power'), command)).toBe(true);
  });
});

describe('Simple main menu keeps what Saroj still needs', () => {
  /**
   * These must survive the pruning. `platform.visitFAQsPage` is relabeled to "Community support",
   * not removed, so its command is expected to still be here.
   *
   * "Show the tour" is a deliberate addition to that list: it postdates the Simple Help menu
   * screenshots this pruning follows, and an onboarding tour is aimed squarely at the newcomer
   * Simple exists to serve, so it stays visible.
   */
  const KEPT_IN_SIMPLE = [
    ['Settings', 'platform.openSettings'],
    ['Exit', 'platform.quit'],
    ['Community support', 'platform.visitFAQsPage'],
    ['Show the tour', 'platform.showOnboardingTour'],
    ['About Platform.Bible', 'platform.about'],
  ] as const;

  test.each(KEPT_IN_SIMPLE)('"%s" is present in Simple', async (_, command) => {
    expect(hasCommand(await getMainMenuInMode('simple'), command)).toBe(true);
  });
});

describe('Pruning empties menu groups but never a whole column', () => {
  /**
   * `filterItemsForInterfaceMode` prunes items only — groups and columns pass through untouched —
   * so pruning every item out of a group leaves the group behind. That is accepted here rather than
   * fixed: suppressing empty groups and columns belongs with the wider Project-menu restructure in
   * PT-4532/PT-4534. This suite pins the outcome so a later ordering change cannot quietly worsen
   * it — see the sibling `platform-menubar.component.test.tsx` for the separator half.
   */
  const EMPTIED_IN_SIMPLE = ['platform.projectResources', 'platform.helpRegistration'];

  function itemCountsByGroup(menu: Awaited<ReturnType<typeof getMainMenuInMode>>) {
    const counts = new Map<string, number>();
    menu.items.forEach((item) => {
      counts.set(item.group, (counts.get(item.group) ?? 0) + 1);
    });
    return counts;
  }

  test.each(EMPTIED_IN_SIMPLE)('group "%s" has no items left in Simple', async (group) => {
    expect(itemCountsByGroup(await getMainMenuInMode('simple')).get(group) ?? 0).toBe(0);
  });

  test.each(EMPTIED_IN_SIMPLE)('group "%s" still has items in Power', async (group) => {
    expect(itemCountsByGroup(await getMainMenuInMode('power')).get(group) ?? 0).toBeGreaterThan(0);
  });

  test('every rendered column still has at least one item in Simple', async () => {
    const menu = await getMainMenuInMode('simple');
    const counts = itemCountsByGroup(menu);

    // A column renders a trigger whether or not anything survives under it, so an emptied column
    // would show an empty dropdown. Groups naming a column that does not exist are never rendered.
    const columnKeys = Object.keys(menu.columns).filter((key) => key !== 'isExtensible');
    const itemsPerColumn = new Map(columnKeys.map((column) => [column, 0]));
    Object.entries(menu.groups).forEach(([groupKey, group]) => {
      if (!('column' in group)) return;
      const existing = itemsPerColumn.get(group.column);
      if (existing === undefined) return;
      itemsPerColumn.set(group.column, existing + (counts.get(groupKey) ?? 0));
    });

    expect(columnKeys.length).toBeGreaterThan(0);
    // A zero here means that column renders a trigger over an empty dropdown.
    const emptyColumns = [...itemsPerColumn.entries()]
      .filter(([, count]) => count === 0)
      .map(([column]) => column);
    expect(emptyColumns).toEqual([]);
  });
});
