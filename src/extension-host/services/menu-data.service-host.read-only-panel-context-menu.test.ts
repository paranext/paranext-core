import menuDataObject from '@extension-host/data/menu.data.json';
import { MenuDocumentCombiner } from '@shared/utils/menu-document-combiner';
import { JsonDocumentLike, PlatformMenus } from 'platform-bible-utils';
import { describe, expect, test } from 'vitest';
import {
  getMenuContributingExtensions,
  getMenuDataEngineInMode,
} from './menu-data.service-host.test-utils';

/*
 * The Bible Texts, Commentaries and Model text panels each get a right-click menu from the scripture
 * editor's menus.json. A web view type that has no `webViewMenus` entry is served an empty top menu
 * and the default tab menu; adding an entry must not change either of those, or the panel's tab
 * would gain or lose menu items as a side effect of getting a context menu.
 */

const EDITOR_EXTENSION_NAME = 'platformScriptureEditor';
const PANEL_WEB_VIEW_TYPES = [
  'platformScriptureEditor.bibleTexts',
  'platformScriptureEditor.commentaries',
  'platformScriptureEditor.modelText',
] as const;

type MenusDocument = JsonDocumentLike & { webViewMenus: Record<string, unknown> };

/** Every shipped extension's menus combined with the platform's, the editor's through `edit`. */
function combine(edit: (editorMenus: MenusDocument) => void): PlatformMenus {
  const combiner = new MenuDocumentCombiner(menuDataObject);
  getMenuContributingExtensions({ excludeDevOnly: true }).forEach(([extensionName, menus]) => {
    if (extensionName === EDITOR_EXTENSION_NAME) {
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

async function getServedMenus(combined: PlatformMenus, mode: 'simple' | 'power') {
  const engine = await getMenuDataEngineInMode(combined, mode);
  return Promise.all(PANEL_WEB_VIEW_TYPES.map((type) => engine.getWebViewMenu(type)));
}

describe('read-only panel context menu contribution', () => {
  const withoutEntries = combine((menus) => {
    PANEL_WEB_VIEW_TYPES.forEach((type) => {
      delete menus.webViewMenus[type];
    });
  });
  const withEntries = combine(() => {});

  test('the shipped menus.json gives each panel type a context menu with items (control)', async () => {
    const served = await getServedMenus(withEntries, 'power');
    served.forEach((menu) => {
      expect(menu.contextMenu?.items.length).toBeGreaterThan(0);
    });
    const servedWithout = await getServedMenus(withoutEntries, 'power');
    servedWithout.forEach((menu) => expect(menu.contextMenu).toBeUndefined());
  });

  test.each(['simple', 'power'] as const)(
    'serves the same top menu and tab menu with the entries as without them in %s mode',
    async (mode) => {
      const before = await getServedMenus(withoutEntries, mode);
      const after = await getServedMenus(withEntries, mode);
      before.forEach((menu, index) => {
        expect(after[index].topMenu).toEqual(menu.topMenu);
        expect(after[index].tabMenu).toEqual(menu.tabMenu);
        // The tab menu is not empty, so equality above compares something
        expect(menu.tabMenu?.items.length).toBeGreaterThan(0);
      });
    },
  );
});
