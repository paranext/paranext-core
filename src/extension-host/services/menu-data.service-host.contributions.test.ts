import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import menuDataObject from '@extension-host/data/menu.data.json';
import { testingMenuDataService } from '@extension-host/services/menu-data.service-host';
import { MenuDocumentCombiner } from '@shared/utils/menu-document-combiner';
import { JsonDocumentLike, PlatformMenus } from 'platform-bible-utils';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: {
    get: vi.fn(async () => 'power'),
    subscribe: vi.fn(async () => async () => true),
  },
}));

/**
 * Extensions that contribute application main menu items, by manifest `name` — the same key
 * `contribution.service` uses when it registers each extension's menu document.
 *
 * `contribution.service`'s combiner only ever sees `menu.data.json` under test, because extension
 * contributions are added inside the extension-load path, which does not run here. So these tests
 * read the shipped manifests off disk and combine them explicitly. Reading the real files (rather
 * than inlining fixtures) is what makes this track the shipped menus, and it borrows the combiner's
 * schema validation for free: a mistyped flag rejects the whole document.
 */
const MENU_CONTRIBUTING_EXTENSIONS: Record<string, string> = {
  platformGetResources: 'platform-get-resources',
  platformLexicalTools: 'platform-lexical-tools',
  platformEnhancedResources: 'platform-enhanced-resources',
  paratextRegistration: 'paratext-registration',
};

// Note: using resolve(__dirname, ...) instead of fileURLToPath(new URL(..., import.meta.url))
// because this test runs under jsdom where import.meta.url does not have a file: scheme.
function readShippedMenuContribution(directory: string): JsonDocumentLike {
  const path = resolve(__dirname, `../../../extensions/src/${directory}/contributions/menus.json`);
  return JSON.parse(readFileSync(path, 'utf8'));
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
  Object.entries(MENU_CONTRIBUTING_EXTENSIONS).forEach(([extensionName, directory]) => {
    combiner.addOrUpdateContribution(extensionName, readShippedMenuContribution(directory));
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
   * not removed, so its command is expected to still be here. The two Usersnap items are
   * load-bearing for PT-4558, which refines them.
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
    ['Submit an idea', 'platform.usersnapSubmitIdea'],
    ['Report a bug / Send feedback', 'platform.usersnapReportIssue'],
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
