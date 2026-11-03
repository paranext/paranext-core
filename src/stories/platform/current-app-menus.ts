/**
 * The main menu the title bar shows in each interface mode, built for Storybook from the same JSON
 * the app combines at runtime: the core `menu.data.json` plus each bundled extension's
 * `contributions/menus.json`, merged by the real `MenuDocumentCombiner`, then filtered and
 * shortcut-hinted the way `menu-data.service-host.ts` serves it. Labels are localized from the
 * English strings Storybook already loads, since the localization service has no backend here.
 *
 * Only extensions bundled in this repo contribute. Menus that a separate repository contributes in
 * the shipped product (Paratext 10 Studio's Send/Receive items, for example) are absent.
 */
import { MenuDocumentCombiner } from '@shared/utils/menu-document-combiner';
import { logger } from '@shared/services/logger.service';
import { getShortcutHintForCommand } from '@shared/utils/keyboard-shortcut-hint.util';
import type { Localized, MultiColumnMenu, PlatformMenus } from 'platform-bible-utils';
import { getLocalizedStrings } from '../../../.storybook/localization.utils';
import getResourcesMenus from '../../../extensions/src/platform-get-resources/contributions/menus.json';
import legacyCommentManagerMenus from '../../../extensions/src/legacy-comment-manager/contributions/menus.json';
import lexicalToolsMenus from '../../../extensions/src/platform-lexical-tools/contributions/menus.json';
import scriptureMenus from '../../../extensions/src/platform-scripture/contributions/menus.json';
import scriptureEditorMenus from '../../../extensions/src/platform-scripture-editor/contributions/menus.json';
import enhancedResourcesMenus from '../../../extensions/src/platform-enhanced-resources/contributions/menus.json';
import registrationMenus from '../../../extensions/src/paratext-registration/contributions/menus.json';

/**
 * The core menu document. The renderer webpack config drops any request naming an `extension-host/`
 * path (see the `IgnorePlugin` in `webpack.config.base.ts`), so this goes through a context rooted
 * AT that folder: neither the context request nor its element request contains `extension-host/`.
 * `require.context` is webpack-only and not in the Node types.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
const extensionHostContext = (require as any).context(
  '../../extension-host',
  true,
  /^\.\/data\/menu\.data\.json$/,
) as (key: string) => Parameters<MenuDocumentCombiner['addOrUpdateContribution']>[1];
const coreMenus = extensionHostContext('./data/menu.data.json');

/** Interface mode the menu is served for. */
export type CurrentAppMode = 'simple' | 'power';

/**
 * Bundled, user-facing extensions only. The `hello-*` and `quick-verse` samples are left out
 * because they are developer samples, not part of the product's menus.
 */
const EXTENSION_MENU_CONTRIBUTIONS: Record<
  string,
  Parameters<MenuDocumentCombiner['addOrUpdateContribution']>[1]
> = {
  platformGetResources: getResourcesMenus,
  legacyCommentManager: legacyCommentManagerMenus,
  platformLexicalTools: lexicalToolsMenus,
  platformScripture: scriptureMenus,
  platformScriptureEditor: scriptureEditorMenus,
  platformEnhancedResources: enhancedResourcesMenus,
  paratextRegistration: registrationMenus,
};

const EMPTY_MENU: Localized<MultiColumnMenu> = { columns: {}, groups: {}, items: [] };

/**
 * The real combiner with its JSON-schema checks of the whole document switched off; the per-
 * contribution checks (name prefixes, duplicate ids) still run. Used only when the strict combiner
 * rejects the core document, which happens when the `platform-bible-utils` build Storybook resolves
 * carries an older menu schema than this checkout's menu data (e.g. a borrowed `node_modules`).
 * Storybook only draws the menu; validating it is the app's job.
 */
class SchemaTolerantMenuDocumentCombiner extends MenuDocumentCombiner {
  // Must stay instance methods to override the base class's; they deliberately do nothing.
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  protected override validateBaseDocument(): void {}

  // Must stay an instance method to override the base class's; it deliberately does nothing.
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  protected override validateOutput(): void {}
}

function combineMainMenu(combiner: MenuDocumentCombiner): MultiColumnMenu | undefined {
  Object.entries(EXTENSION_MENU_CONTRIBUTIONS).forEach(([name, document]) => {
    try {
      combiner.addOrUpdateContribution(name, document);
    } catch (error) {
      logger.warn(`current-app-menus: skipped the ${name} menu contribution: ${error}`);
    }
  });
  const output: PlatformMenus | undefined = combiner.rawOutput;
  return output?.mainMenu;
}

let combinedMainMenu: MultiColumnMenu | undefined;

/** Combines the menus once per Storybook session; the inputs are static JSON. */
function getCombinedMainMenu(): MultiColumnMenu | undefined {
  if (combinedMainMenu) return combinedMainMenu;
  try {
    combinedMainMenu = combineMainMenu(new MenuDocumentCombiner(coreMenus));
  } catch (error) {
    logger.warn(`current-app-menus: strict menu combine failed, retrying without schema: ${error}`);
    try {
      combinedMainMenu = combineMainMenu(new SchemaTolerantMenuDocumentCombiner(coreMenus));
    } catch (innerError) {
      logger.warn(`current-app-menus: could not combine the main menu: ${innerError}`);
    }
  }
  return combinedMainMenu;
}

function localize(value: string | undefined, strings: Record<string, string>): string | undefined {
  if (value === undefined) return undefined;
  return strings[value] ?? value;
}

/**
 * The localized main menu as the menu data service would serve it in `mode`: items hidden in that
 * mode are removed and each remaining command item carries its catalogued shortcut hint (written
 * for Windows/Linux, which is what the screenshots in this repo use).
 */
export function getCurrentAppMainMenu(mode: CurrentAppMode): Localized<MultiColumnMenu> {
  const menu = getCombinedMainMenu();
  if (!menu) return EMPTY_MENU;

  const keys = new Set<string>();
  Object.values(menu.columns).forEach((column) => {
    if (typeof column === 'object' && column) keys.add(column.label);
  });
  menu.items.forEach((item) => {
    keys.add(item.label);
    if (item.tooltip) keys.add(item.tooltip);
  });
  // The key list is built from the menu's own labels, which are all localize keys.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const strings = getLocalizedStrings([...keys] as Parameters<typeof getLocalizedStrings>[0]);

  const columns = Object.fromEntries(
    Object.entries(menu.columns).map(([id, column]) => [
      id,
      typeof column === 'object' && column
        ? { ...column, label: localize(column.label, strings) ?? column.label }
        : column,
    ]),
  );

  const items = menu.items
    .filter((item) => !item.hiddenInterfaceModes?.includes(mode))
    .map((item) => {
      const shortcut =
        'command' in item && typeof item.command === 'string'
          ? getShortcutHintForCommand(item.command, 'win32')
          : undefined;
      return {
        ...item,
        label: localize(item.label, strings) ?? item.label,
        tooltip: localize(item.tooltip, strings),
        ...(shortcut ? { shortcut } : {}),
      };
    });

  // `Localized<T>` only widens the key and referenced-item string brands to `string`, which is
  // exactly what the mapping above produced.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { ...menu, columns, items } as unknown as Localized<MultiColumnMenu>;
}
