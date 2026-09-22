import { USERSNAP_SPACE_API_KEY } from '@shared/data/platform.data';
import { JsonDocumentLike } from 'platform-bible-utils';
import { describe, expect, test } from 'vitest';
import {
  getMenuContributingExtensions,
  getMenuDataEngineInMode,
  getRealCombinedMenus,
} from './menu-data.service-host.test-helper';

/** How many application main menu items a shipped `menus.json` contributes. */
function countMainMenuItems(menus: JsonDocumentLike): number {
  if (Array.isArray(menus)) return 0;
  const { mainMenu } = menus;
  if (!mainMenu || typeof mainMenu !== 'object' || Array.isArray(mainMenu)) return 0;
  if (!('items' in mainMenu)) return 0;
  const { items } = mainMenu;
  return Array.isArray(items) ? items.length : 0;
}

/**
 * Extensions contributing at least one application main menu item — the empty-group expectations
 * below are only true of the menu as a whole, so this file narrows to just those extensions.
 */
function hasMainMenuItems(menus: JsonDocumentLike): boolean {
  return countMainMenuItems(menus) > 0;
}

async function getMainMenuInMode(mode: 'simple' | 'power') {
  const engine = await getMenuDataEngineInMode(
    getRealCombinedMenus({ filter: hasMainMenuItems }),
    mode,
  );
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
    expect(
      getMenuContributingExtensions({ filter: hasMainMenuItems }).map(([name]) => name),
    ).toContain(extensionName);
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

describe("The Scripture editor's hamburger offers zoom in Simple mode only", () => {
  const ZOOM_COMMANDS = [
    'platform.webViewContentZoomIn',
    'platform.webViewContentZoomOut',
    'platform.webViewContentZoomReset',
  ];

  /**
   * The editor's top menu as the menu data service serves it in `mode`. The editor contributes no
   * main-menu item, so `getMenuContributingExtensions` skips it and its document is combined here
   * explicitly.
   */
  async function getEditorTopMenuInMode(mode: 'simple' | 'power') {
    const { settingsService } = await import('@shared/services/settings.service');
    vi.mocked(settingsService.get).mockResolvedValue(mode);
    const combiner = new MenuDocumentCombiner(menuDataObject);
    const editorMenus: JsonDocumentLike = JSON.parse(
      readFileSync(
        resolve(EXTENSIONS_DIR, 'platform-scripture-editor/contributions/menus.json'),
        'utf8',
      ),
    );
    combiner.addOrUpdateContribution(readManifestName('platform-scripture-editor'), editorMenus);
    const combined = combiner.rawOutput;
    if (!combined)
      throw new Error('Platform menu document failed to combine with the editor menus');
    const engine = testingMenuDataService.implementMenuDataDataProviderEngine(combined);
    // Let the fire-and-forget settings read in the constructor resolve
    await Promise.resolve();
    await Promise.resolve();
    return (await engine.getWebViewMenu('platformScriptureEditor.react')).topMenu;
  }

  function zoomCommandsIn(topMenu: Awaited<ReturnType<typeof getEditorTopMenuInMode>>): string[] {
    return (topMenu?.items ?? []).flatMap((item) =>
      'command' in item && ZOOM_COMMANDS.includes(item.command) ? [item.command] : [],
    );
  }

  test('Power mode: no zoom item in the hamburger', async () => {
    const topMenu = await getEditorTopMenuInMode('power');
    // Positive control: the editor's own menu was served, so the absence below is the mode filter.
    expect(
      topMenu?.items.some(
        (item) => 'command' in item && item.command === 'platformScriptureEditor.toggleFootnotes',
      ),
    ).toBe(true);
    expect(zoomCommandsIn(topMenu)).toEqual([]);
  });

  test('Simple mode: all three zoom items in the hamburger', async () => {
    expect(zoomCommandsIn(await getEditorTopMenuInMode('simple')).sort()).toEqual(
      [...ZOOM_COMMANDS].sort(),
    );
  });
});
