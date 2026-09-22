import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import menuDataObject from '@extension-host/data/menu.data.json';
import { testingMenuDataService } from '@extension-host/services/menu-data.service-host';
import { MenuDocumentCombiner } from '@shared/utils/menu-document-combiner';
import { DEV_ONLY_EXTENSION_NAMES } from '@node/utils/locale-assets.test-helper';
import { JsonDocumentLike, PlatformMenus } from 'platform-bible-utils';
import { vi } from 'vitest';

/*
 * Shared setup for tests that build the real combined menu document (the platform's own
 * `menu.data.json` plus every shipped extension's `menus.json`) and read it back per interface
 * mode. Named `.test-utils.ts` (not `.test.ts`) so vitest does not collect it as a suite.
 *
 * `contribution.service`'s combiner only ever sees `menu.data.json` under test, because extension
 * contributions are added inside the extension-load path, which does not run here. So these tests
 * read the shipped files off disk and combine them explicitly. Reading the real files (rather than
 * inlining fixtures) is what makes this track the shipped menus, and it borrows the combiner's
 * schema validation for free: a mistyped flag rejects the whole document.
 */

vi.mock('@shared/services/settings.service', () => ({
  settingsService: {
    get: vi.fn(async () => 'power'),
    subscribe: vi.fn(async () => async () => true),
  },
}));

// resolve(__dirname, …) because jsdom's import.meta.url has no file: scheme
export const EXTENSIONS_DIR = resolve(__dirname, '../../../extensions/src');

/** An extension's manifest `name`, which is how `contribution.service` keys its contributions. */
export function readManifestName(directory: string): string {
  const manifest: unknown = JSON.parse(
    readFileSync(resolve(EXTENSIONS_DIR, directory, 'manifest.json'), 'utf8'),
  );
  if (manifest && typeof manifest === 'object' && 'name' in manifest) {
    const { name } = manifest;
    if (typeof name === 'string') return name;
  }
  throw new Error(`Extension ${directory} has a menus.json but no manifest name`);
}

/** Narrows which extensions {@link getMenuContributingExtensions} returns. */
type MenuContributionOptions = {
  /** Only extensions whose menu document passes this are included. */
  filter?: (menus: JsonDocumentLike) => boolean;
  /**
   * Excludes the dev-only sample extensions (`DEV_ONLY_EXTENSION_NAMES`), which the extension host
   * loads only in noisy dev mode and which a production user never sees. Off by default: one
   * consuming suite deliberately keeps `helloRock3` in scope as a live example of an extension that
   * ships main menu items with no `hiddenInterfaceModes` — opt in only where counting a dev-only
   * extension would vouch for a menu item no shipped build ever serves.
   */
  excludeDevOnly?: boolean;
};

/**
 * Every shipped extension's menu document, as `[manifest name, menu document]` pairs, narrowed by
 * `options`.
 *
 * Discovered by scanning `extensions/src` rather than listed by hand, so an extension that starts
 * contributing menu items is covered without anyone having to remember this file.
 */
export function getMenuContributingExtensions(
  options: MenuContributionOptions = {},
): [string, JsonDocumentLike][] {
  const { filter, excludeDevOnly = false } = options;
  return readdirSync(EXTENSIONS_DIR, { withFileTypes: true }).flatMap(
    (entry): [string, JsonDocumentLike][] => {
      if (!entry.isDirectory()) return [];
      const menusPath = resolve(EXTENSIONS_DIR, entry.name, 'contributions/menus.json');
      if (!existsSync(menusPath)) return [];
      const manifestName = readManifestName(entry.name);
      if (excludeDevOnly && DEV_ONLY_EXTENSION_NAMES.includes(manifestName)) return [];
      const menus: JsonDocumentLike = JSON.parse(readFileSync(menusPath, 'utf8'));
      if (filter && !filter(menus)) return [];
      return [[manifestName, menus]];
    },
  );
}

/**
 * The shipped platform menu document combined with every shipped extension's menu contribution that
 * passes `options` — i.e. the menu document a running app actually assembles, optionally narrowed
 * to the contributions a particular suite cares about.
 *
 * Builds a fresh combiner rather than reusing `contribution.service`'s exported singleton, which
 * other suites in this process read.
 */
export function getRealCombinedMenus(options?: MenuContributionOptions): PlatformMenus {
  const combiner = new MenuDocumentCombiner(menuDataObject);
  getMenuContributingExtensions(options).forEach(([extensionName, menus]) => {
    combiner.addOrUpdateContribution(extensionName, menus);
  });
  const combined = combiner.rawOutput;
  if (!combined) throw new Error('Platform menu document failed to combine with contributions');
  return combined;
}

/**
 * Builds a menu-data engine over `combinedMenus` with `settingsService.get` mocked to resolve
 * `mode`, and lets the engine's fire-and-forget settings read (in its constructor) resolve before
 * returning it.
 */
export async function getMenuDataEngineInMode(
  combinedMenus: PlatformMenus,
  mode: 'simple' | 'power',
): Promise<ReturnType<typeof testingMenuDataService.implementMenuDataDataProviderEngine>> {
  const { settingsService } = await import('@shared/services/settings.service');
  vi.mocked(settingsService.get).mockResolvedValue(mode);
  const engine = testingMenuDataService.implementMenuDataDataProviderEngine(combinedMenus);
  // Let the fire-and-forget settings read in the constructor resolve
  await Promise.resolve();
  await Promise.resolve();
  return engine;
}
