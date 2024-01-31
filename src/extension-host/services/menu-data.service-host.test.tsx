import { MenuData } from '@shared/services/menu-data.service-model';
import { MenuDataDataProviderEngine } from '@extension-host/services/menu-data.service-host';

const MOCK_MENU_DATA: MenuData = {
  mainMenu: {
    columns: {
      'paratext.paratext': { label: '%mainMenu_Paratext%', order: 0 },
    },
    groups: {
      'paratext.sendReceive': { column: 'paratext.paratext', order: 1 },
      'paratext.openCreate': { column: 'paratext.paratext', order: 2 },
      'paratext.saveDelete': { column: 'paratext.paratext', order: 3 },
      'paratext.misc': { column: 'paratext.paratext', order: 9999999, isExtensible: true },
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
    ],
  },
};

let menuDataProviderEngine: MenuDataDataProviderEngine;
beforeAll(() => {
  menuDataProviderEngine = new MenuDataDataProviderEngine(MOCK_MENU_DATA);
});

test('Correct menu data returned with `mainMenu` menuType', async () => {
  const result = await menuDataProviderEngine.getMenuData('mainMenu');
  expect(result).toEqual(MOCK_MENU_DATA.mainMenu);
});

test('Error is thrown with menuType that does not exist', async () => {
  await expect(menuDataProviderEngine.getMenuData('wrongMenuType')).rejects.toThrow(
    'Missing/invalid menu data',
  );
});

test('Set function throws error when called', async () => {
  await expect(
    menuDataProviderEngine.setMenuData('mainMenu', MOCK_MENU_DATA.mainMenu),
  ).rejects.toThrow('setMenuData disabled');
});
