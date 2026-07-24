import { testingMenuDataService } from '@extension-host/services/menu-data.service-host';
import { PlatformMenus, ReferencedItem, WebViewMenus } from 'platform-bible-utils';
import { vi } from 'vitest';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: {
    get: vi.fn(async () => 'power'),
    subscribe: vi.fn(async () => async () => true),
  },
}));

const EXTENSION_NAME: ReferencedItem = 'videoExtension.playEditWebView';
const MOCK_MENU_DATA: PlatformMenus = {
  mainMenu: {
    columns: {
      'paratext.paratext': { label: '%mainMenu_Paratext%', order: 0 },
      'platform.window': { label: '%mainMenu_window%', order: 1 },
      'platform.layout': { label: '%mainMenu_layout%', order: 2 },
      'platform.help': { label: '%mainMenu_help%', order: 3, isExtensible: true },
      isExtensible: true,
    },
    groups: {
      'paratext.sendReceive': { column: 'paratext.paratext', order: 1 },
      'paratext.openCreate': { column: 'paratext.paratext', order: 2 },
      'paratext.saveDelete': { column: 'paratext.paratext', order: 3 },
      'paratext.misc': { column: 'paratext.paratext', order: 9999999, isExtensible: true },
      'platform.windowGroup1': { column: 'platform.window', order: 1 },
      'platform.windowGroup2': { column: 'platform.window', order: 2 },
      'platform.layoutSaveDelete': { column: 'platform.layout', order: 1 },
      'platform.helpGroup1': { column: 'platform.help', order: 1 },
      'paratext.helpGroup': { column: 'platform.help', order: 100 },
      'paratext.helpSubgroup': { menuItem: 'paratext.helpRoot', order: 1 },
    },
    items: [
      {
        label: '%sendReceiveProjects%',
        tooltip: '%sendReceiveProjects_tooltip%',
        localizeNotes: 'Main application menu > Paratext column > Send/Receive Projects',
        group: 'paratext.sendReceive',
        order: 1,
        command: 'paratext.sendReceiveProjects',
      },
      {
        label: '%downloadInstallResources%',
        tooltip: '%downloadInstallResources_tooltip%',
        localizeNotes: 'Main application menu > Paratext column > Download/Install Resources',
        group: 'paratext.sendReceive',
        order: 2,
        command: 'paratext.downloadInstallResources',
      },
      {
        label: '%newProject%',
        tooltip: '%newProject_tooltip%',
        localizeNotes: 'Main application menu > Paratext column > New Project',
        group: 'paratext.openCreate',
        order: 1,
        command: 'paratext.createNewProject',
      },
      {
        label: '%openProject%',
        tooltip: '%openProject_tooltip%',
        localizeNotes: 'Main application menu > Paratext column > Open Project',
        group: 'paratext.openCreate',
        order: 2,
        command: 'paratext.openProject',
      },
      {
        label: '%openTextCollection%',
        localizeNotes: 'Main application menu > Paratext column > Open Text Collection',
        group: 'paratext.openCreate',
        order: 3,
        command: 'paratext.openTextCollection',
      },
      {
        label: '%paratext_help%',
        localizeNotes: 'Main application menu > Help column > Paratext',
        group: 'paratext.helpGroup',
        order: 100,
        id: 'paratext.helpRoot',
      },
      {
        label: '%paratext_helpVideos%',
        localizeNotes: 'Main application menu > Help column > Paratext > Videos',
        group: 'paratext.helpSubgroup',
        order: 1,
        command: 'paratext.showHelpVideos',
      },
      {
        label: '%paratext_helpGuide%',
        localizeNotes: 'Main application menu > Help column > Paratext > Guide',
        group: 'paratext.helpSubgroup',
        order: 1,
        command: 'paratext.showHelpGuide',
      },
      {
        label: '%video_AddParatextVideo%',
        localizeNotes: 'Main application menu > Paratext column > Add Video',
        group: 'paratext.misc',
        order: 1,
        command: 'videoExtension.addParatextVideo',
      },
    ],
  },
  defaultWebViewTopMenu: {
    columns: {
      'platform.app': { label: '%webView_project%', order: 1 },
      'platform.edit': { label: '%webView_edit%', order: 2, isExtensible: true },
    },
    groups: {
      'platform.projectTop': { column: 'platform.app', order: 1 },
      'platform.manageBooks': { column: 'platform.app', order: 2 },
      'platform.deleteProject': { column: 'platform.app', order: 3 },
      'platform.projectDetails': { column: 'platform.app', order: 4, isExtensible: true },
      'platform.undoRedo': { column: 'platform.edit', order: 1 },
      'platform.cutCopyPaste': { column: 'platform.edit', order: 2 },
    },
    items: [
      {
        label: '%projectSendReceive%',
        localizeNotes: 'Web view main menu > Project > Send/Receive this project',
        group: 'platform.projectTop',
        order: 1,
        command: 'platform.sendReceiveProject',
      },
      {
        label: '%projectAssignmentsAndProgress%',
        localizeNotes: 'Web view main menu > Project > Assignments and progress...',
        group: 'platform.projectTop',
        order: 2,
        command: 'platform.assignments',
      },
    ],
  },
  defaultWebViewContextMenu: {
    groups: {
      'platform.insert': { order: 1, isExtensible: true, menuItem: 'platform.insert' },
      'platform.wordList': { order: 2, isExtensible: true, menuItem: 'platform.insert' },
    },
    items: [
      {
        label: '%insertNote%',
        localizeNotes: 'Web view context menu > Insert note...',
        group: 'platform.insert',
        order: 1,
        command: 'platform.insertNote',
      },
      {
        label: '%menuItemName_wordList%',
        localizeNotes: 'Web view context menu > Word list...',
        group: 'platform.wordList',
        order: 1,
        command: 'platform.openWordList',
      },
    ],
  },
  webViewMenus: {
    'videoExtension.playEditWebView': {
      includeDefaults: false,
      topMenu: {
        columns: {
          'videoExtension.video': { label: '%video%', order: 1 },
        },
        groups: {
          'videoExtension.videoTop': { column: 'videoExtension.project', order: 1 },
        },
        items: [
          {
            label: '%playVideo%',
            localizeNotes: 'Example localize Notes',
            group: 'videoExtension.videoTop',
            order: 1,
            command: 'videoExtension.playVideo',
          },
          {
            label: '%editVideo%',
            localizeNotes: 'Example localize Notes',
            group: 'videoExtension.videoTop',
            order: 2,
            command: 'videoExtension.editVideo',
          },
        ],
      },
      contextMenu: {
        groups: {},
        items: [],
      },
    },
  },
};

const menuDataProviderEngine =
  testingMenuDataService.implementMenuDataDataProviderEngine(MOCK_MENU_DATA);

test('Get main menu data', async () => {
  const result = await menuDataProviderEngine.getMainMenu();
  expect(result).toEqual(MOCK_MENU_DATA.mainMenu);
});

test('Setting main menu data throws', async () => {
  await expect(menuDataProviderEngine.setMainMenu()).rejects.toThrow('setMainMenu disabled');
});

test('Get web view menu data for videoExtension', async () => {
  const result = await menuDataProviderEngine.getWebViewMenu(EXTENSION_NAME);
  // If I do not specify the type for this object it will not let me index with EXTENSION_NAME
  // eslint-disable-next-line prefer-destructuring
  const webViewMenus: WebViewMenus = MOCK_MENU_DATA.webViewMenus;
  expect(result).toEqual(webViewMenus[EXTENSION_NAME]);
});

test('Setting web view menu data throws', async () => {
  await expect(menuDataProviderEngine.setWebViewMenu()).rejects.toThrow('setWebViewMenu disabled');
});

// Add tests for unlocalized main menu data
test('Get unlocalized main menu data', async () => {
  const result = await menuDataProviderEngine.getUnlocalizedMainMenu();
  expect(result).toEqual(MOCK_MENU_DATA.mainMenu);
});

test('Setting unlocalized main menu data throws', async () => {
  await expect(menuDataProviderEngine.setUnlocalizedMainMenu()).rejects.toThrow(
    'setUnlocalizedMainMenu disabled',
  );
});

describe('Simple-mode menu item filtering', () => {
  const MOCK_MENU_DATA_WITH_HIDDEN_ITEM: PlatformMenus = {
    ...MOCK_MENU_DATA,
    mainMenu: {
      ...MOCK_MENU_DATA.mainMenu,
      items: [
        ...MOCK_MENU_DATA.mainMenu.items,
        {
          label: '%test_hiddenMainMenuItem%',
          localizeNotes: 'Test item hidden in simple mode',
          group: 'paratext.sendReceive',
          order: 99,
          command: 'test.hiddenMainMenuCommand',
          isHiddenInSimple: true,
        },
      ],
    },
    webViewMenus: (() => {
      // Indexing MOCK_MENU_DATA.webViewMenus directly with EXTENSION_NAME doesn't type-check
      // (same TS quirk noted in the file's existing 'Get web view menu data' test above) — go
      // through a WebViewMenus-typed local first.
      // eslint-disable-next-line prefer-destructuring
      const webViewMenus: WebViewMenus = MOCK_MENU_DATA.webViewMenus;
      return {
        [EXTENSION_NAME]: {
          ...webViewMenus[EXTENSION_NAME],
          topMenu: {
            ...webViewMenus[EXTENSION_NAME].topMenu,
            items: [
              ...(webViewMenus[EXTENSION_NAME].topMenu?.items ?? []),
              {
                label: '%test_hiddenWebViewMenuItem%',
                localizeNotes: 'Test item hidden in simple mode',
                group: 'videoExtension.videoTop',
                order: 99,
                command: 'test.hiddenWebViewMenuCommand',
                isHiddenInSimple: true,
              },
            ],
          },
          contextMenu: {
            ...webViewMenus[EXTENSION_NAME].contextMenu,
            items: [
              ...(webViewMenus[EXTENSION_NAME].contextMenu?.items ?? []),
              {
                label: '%test_hiddenWebViewContextMenuItem%',
                localizeNotes: 'Test item hidden in simple mode',
                group: 'platform.insert',
                order: 99,
                command: 'test.hiddenWebViewContextMenuCommand',
                isHiddenInSimple: true,
              },
            ],
          },
        },
      };
    })(),
  };

  test('getMainMenu excludes isHiddenInSimple items when platform.interfaceMode is simple', async () => {
    const { settingsService } = await import('@shared/services/settings.service');
    vi.mocked(settingsService.get).mockResolvedValue('simple');
    const engine = testingMenuDataService.implementMenuDataDataProviderEngine(
      MOCK_MENU_DATA_WITH_HIDDEN_ITEM,
    );
    // Let the fire-and-forget settings read in the constructor resolve
    await Promise.resolve();
    await Promise.resolve();

    const result = await engine.getMainMenu();
    expect(
      result.items.some(
        (item) => 'command' in item && item.command === 'test.hiddenMainMenuCommand',
      ),
    ).toBe(false);
    // Unflagged items are unaffected
    expect(
      result.items.some(
        (item) => 'command' in item && item.command === 'paratext.sendReceiveProjects',
      ),
    ).toBe(true);
  });

  test('getMainMenu includes isHiddenInSimple items when platform.interfaceMode is power', async () => {
    const { settingsService } = await import('@shared/services/settings.service');
    vi.mocked(settingsService.get).mockResolvedValue('power');
    const engine = testingMenuDataService.implementMenuDataDataProviderEngine(
      MOCK_MENU_DATA_WITH_HIDDEN_ITEM,
    );
    await Promise.resolve();
    await Promise.resolve();

    const result = await engine.getMainMenu();
    expect(
      result.items.some(
        (item) => 'command' in item && item.command === 'test.hiddenMainMenuCommand',
      ),
    ).toBe(true);
  });

  test('getWebViewMenu excludes isHiddenInSimple items from topMenu when platform.interfaceMode is simple', async () => {
    const { settingsService } = await import('@shared/services/settings.service');
    vi.mocked(settingsService.get).mockResolvedValue('simple');
    const engine = testingMenuDataService.implementMenuDataDataProviderEngine(
      MOCK_MENU_DATA_WITH_HIDDEN_ITEM,
    );
    await Promise.resolve();
    await Promise.resolve();

    const result = await engine.getWebViewMenu(EXTENSION_NAME);
    expect(
      result.topMenu?.items.some(
        (item) => 'command' in item && item.command === 'test.hiddenWebViewMenuCommand',
      ),
    ).toBe(false);
    expect(
      result.topMenu?.items.some(
        (item) => 'command' in item && item.command === 'videoExtension.playVideo',
      ),
    ).toBe(true);
  });

  test('getWebViewMenu excludes isHiddenInSimple items from contextMenu when platform.interfaceMode is simple', async () => {
    const { settingsService } = await import('@shared/services/settings.service');
    vi.mocked(settingsService.get).mockResolvedValue('simple');
    const engine = testingMenuDataService.implementMenuDataDataProviderEngine(
      MOCK_MENU_DATA_WITH_HIDDEN_ITEM,
    );
    await Promise.resolve();
    await Promise.resolve();

    const result = await engine.getWebViewMenu(EXTENSION_NAME);
    expect(
      result.contextMenu?.items.some(
        (item) => 'command' in item && item.command === 'test.hiddenWebViewContextMenuCommand',
      ),
    ).toBe(false);
  });

  test('getWebViewMenu includes isHiddenInSimple contextMenu items when platform.interfaceMode is power', async () => {
    const { settingsService } = await import('@shared/services/settings.service');
    vi.mocked(settingsService.get).mockResolvedValue('power');
    const engine = testingMenuDataService.implementMenuDataDataProviderEngine(
      MOCK_MENU_DATA_WITH_HIDDEN_ITEM,
    );
    await Promise.resolve();
    await Promise.resolve();

    const result = await engine.getWebViewMenu(EXTENSION_NAME);
    expect(
      result.contextMenu?.items.some(
        (item) => 'command' in item && item.command === 'test.hiddenWebViewContextMenuCommand',
      ),
    ).toBe(true);
  });

  test('menu data updates live when platform.interfaceMode changes after subscribe resolves', async () => {
    const { settingsService } = await import('@shared/services/settings.service');
    vi.mocked(settingsService.get).mockResolvedValue('power');
    let subscribedCallback: ((newMode: string) => void) | undefined;
    vi.mocked(settingsService.subscribe).mockImplementation(async (_key, callback) => {
      // subscribe's generic callback type is inferred as SettingTypes[SettingName] | PlatformError;
      // narrow it to the concrete signature this test invokes it with below.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      subscribedCallback = callback as (newMode: string) => void;
      return async () => true;
    });

    const engine = testingMenuDataService.implementMenuDataDataProviderEngine(
      MOCK_MENU_DATA_WITH_HIDDEN_ITEM,
    );
    await Promise.resolve();
    await Promise.resolve();

    const beforeChange = await engine.getMainMenu();
    expect(
      beforeChange.items.some(
        (item) => 'command' in item && item.command === 'test.hiddenMainMenuCommand',
      ),
    ).toBe(true);

    expect(subscribedCallback).toBeDefined();
    if (!subscribedCallback) throw new Error('subscribedCallback was not set by mock');
    subscribedCallback('simple');

    const afterChange = await engine.getMainMenu();
    expect(
      afterChange.items.some(
        (item) => 'command' in item && item.command === 'test.hiddenMainMenuCommand',
      ),
    ).toBe(false);
  });
});
