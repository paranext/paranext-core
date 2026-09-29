import { vi } from 'vitest';
import { MenuDocumentCombiner } from './menu-document-combiner';

vi.mock('@shared/services/localization.service', () => ({
  localizationService: {
    // Resolves on a later task, so a caller that does not wait for localization sees raw keys
    getLocalizedStrings: vi.fn(async ({ localizeKeys }: { localizeKeys: string[] }) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
      return Object.fromEntries(localizeKeys.map((key) => [key, `localized ${key}`]));
    }),
  },
}));

const BASE_DOCUMENT = {
  mainMenu: { columns: {}, groups: {}, items: [] },
  defaultWebViewTopMenu: { columns: {}, groups: {}, items: [] },
  defaultWebViewContextMenu: { groups: {}, items: [] },
  webViewMenus: {},
};

const CONTRIBUTION = {
  webViewMenus: {
    'testExtension.webView': {
      includeDefaults: false,
      topMenu: {
        columns: { 'testExtension.column': { label: '%testExtension_column%', order: 1 } },
        groups: { 'testExtension.group': { column: 'testExtension.column', order: 1 } },
        items: [
          {
            label: '%testExtension_item%',
            localizeNotes: 'test',
            group: 'testExtension.group',
            order: 1,
            command: 'testExtension.run',
          },
        ],
      },
    },
  },
};

test('web view menus are fully localized by the time getCurrentMenus resolves', async () => {
  const combiner = new MenuDocumentCombiner(BASE_DOCUMENT);
  combiner.addOrUpdateContribution('testExtension', CONTRIBUTION);

  const menus = await combiner.getCurrentMenus();
  const topMenu = menus?.webViewMenus['testExtension.webView'].topMenu;

  expect(topMenu?.columns['testExtension.column']).toHaveProperty(
    'label',
    'localized %testExtension_column%',
  );
  expect(topMenu?.items[0].label).toBe('localized %testExtension_item%');
});
