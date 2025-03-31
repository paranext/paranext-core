import { testingMenuDataService } from '@extension-host/services/menu-data.service-host';
import { PlatformMenus, ReferencedItem, WebViewMenus } from 'platform-bible-utils';

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
      'platform.project': { label: '%webView_project%', order: 1 },
      'platform.edit': { label: '%webView_edit%', order: 2, isExtensible: true },
    },
    groups: {
      'platform.projectTop': { column: 'platform.project', order: 1 },
      'platform.manageBooks': { column: 'platform.project', order: 2 },
      'platform.deleteProject': { column: 'platform.project', order: 3 },
      'platform.projectDetails': { column: 'platform.project', order: 4, isExtensible: true },
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
