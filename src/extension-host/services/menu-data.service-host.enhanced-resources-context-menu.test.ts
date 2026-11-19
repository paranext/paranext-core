import menuDataObject from '@extension-host/data/menu.data.json';
import { MenuDocumentCombiner } from '@shared/utils/menu-document-combiner';
import { JsonDocumentLike, PlatformMenus } from 'platform-bible-utils';
import { describe, expect, test } from 'vitest';
import {
  getMenuContributingExtensions,
  getMenuDataEngineInMode,
} from './menu-data.service-host.test-utils';

/*
 * The Enhanced Resources web view gets a right-click menu from its menus.json. Its `webViewMenus`
 * entry has no `includeDefaults` and no `topMenu`, so adding a `contextMenu` must not change the
 * top menu or the tab menu the web view type is served, or the tab would gain or lose items as a
 * side effect of getting a context menu.
 */

const EXTENSION_NAME = 'platformEnhancedResources';
const WEB_VIEW_TYPE = 'platformEnhancedResources.enhancedResource';

type MenusDocument = JsonDocumentLike & { webViewMenus: Record<string, unknown> };

/** Every shipped extension's menus combined with the platform's, this one's through `edit`. */
function combine(edit: (menus: MenusDocument) => void): PlatformMenus {
  const combiner = new MenuDocumentCombiner(menuDataObject);
  getMenuContributingExtensions({ excludeDevOnly: true }).forEach(([extensionName, menus]) => {
    if (extensionName === EXTENSION_NAME) {
      // The contribution is read from disk afresh on every call, so editing it leaks nowhere
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      edit(menus as MenusDocument);
    }
    combiner.addOrUpdateContribution(extensionName, menus);
  });
  const combined = combiner.rawOutput;
  if (!combined) throw new Error('Platform menu document failed to combine with contributions');
  return combined;
}

describe('Enhanced Resources context menu contribution', () => {
  const withoutContextMenu = combine((menus) => {
    const entry: { contextMenu?: unknown } = menus.webViewMenus[WEB_VIEW_TYPE];
    // The control test below fails if this stripped nothing: it expects no served context menu
    delete entry.contextMenu;
  });
  const withContextMenu = combine(() => {});

  test('the shipped menus.json gives the web view type a context menu with items (control)', async () => {
    const served = await (
      await getMenuDataEngineInMode(withContextMenu, 'power')
    ).getWebViewMenu(WEB_VIEW_TYPE);
    expect(served.contextMenu?.items.length).toBeGreaterThan(0);
    const servedWithout = await (
      await getMenuDataEngineInMode(withoutContextMenu, 'power')
    ).getWebViewMenu(WEB_VIEW_TYPE);
    expect(servedWithout.contextMenu).toBeUndefined();
  });

  test.each(['simple', 'power'] as const)(
    'serves the same top menu and tab menu with the context menu as without it in %s mode',
    async (mode) => {
      const before = await (
        await getMenuDataEngineInMode(withoutContextMenu, mode)
      ).getWebViewMenu(WEB_VIEW_TYPE);
      const after = await (
        await getMenuDataEngineInMode(withContextMenu, mode)
      ).getWebViewMenu(WEB_VIEW_TYPE);
      expect(after.topMenu).toEqual(before.topMenu);
      expect(after.tabMenu).toEqual(before.tabMenu);
      // The tab menu is not empty, so equality above compares something
      expect(before.tabMenu?.items.length).toBeGreaterThan(0);
    },
  );
});
