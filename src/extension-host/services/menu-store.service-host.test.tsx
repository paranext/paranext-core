import { MultiColumnMenu } from '@shared/schemas/menu-data.types';
import { MenuData } from '@shared/services/menu-store.service-model';
import { MenuStoreDataProviderEngine } from './menu-store.service-host';

// Mocks come from menu contribution design proposal document sample JSON contributed from extension called "paratext"
const MOCK_MENU_DATA_STRING: string = `{
  "mainMenu": {
    "columns": {
      "paratext.paratext": { "label": "%mainMenu_Paratext%", "order": 0 }
    },
    "groups": {
      "paratext.sendReceive": { "column": "paratext.paratext", "order": 1 },
      "paratext.openCreate": { "column": "paratext.paratext", "order": 2 },
      "paratext.saveDelete": { "column": "paratext.paratext", "order": 3 },
      "paratext.misc": { "column": "paratext.paratext", "order": 9999999, "isExtensible": true },
      "paratext.helpGroup": { "column": "platform.help", "order": 100 },
      "paratext.helpSubgroup": { "menuItem": "paratext.helpRoot", "order": 1 }
    },
    "items": [
      {
        "label": "%sendReceiveProjects%",
        "tooltip": "%sendReceiveProjects_tooltip%",
        "localizeNotes": "Main application menu > Paratext column > Send/Receive Projects",
        "group": "paratext.sendReceive",
        "order": 1,
        "command": "paratext.sendReceiveProjects"
      },
      {
        "label": "%downloadInstallResources%",
        "tooltip": "%downloadInstallResources_tooltip%",
        "localizeNotes": "Main application menu > Paratext column > Download/Install Resources",
        "group": "paratext.sendReceive",
        "order": 2,
        "command": "paratext.downloadInstallResources"
      },
      {
        "label": "%newProject%",
        "tooltip": "%newProject_tooltip%",
        "localizeNotes": "Main application menu > Paratext column > New Project",
        "group": "paratext.openCreate",
        "order": 1,
        "command": "paratext.createNewProject"
      },
      {
        "label": "%openProject%",
        "tooltip": "%openProject_tooltip%",
        "localizeNotes": "Main application menu > Paratext column > Open Project",
        "group": "paratext.openCreate",
        "order": 2,
        "command": "paratext.openProject"
      },
      {
        "label": "%openTextCollection%",
        "localizeNotes": "Main application menu > Paratext column > Open Text Collection",
        "group": "paratext.openCreate",
        "order": 3,
        "command": "paratext.openTextCollection"
      },
      {
        "label": "%paratext_help%",
        "localizeNotes": "Main application menu > Help column > Paratext",
        "group": "paratext.helpGroup",
        "order": 100,
        "id": "paratext.helpRoot"
      },
      {
        "label": "%paratext_helpVideos%",
        "localizeNotes": "Main application menu > Help column > Paratext > Videos",
        "group": "paratext.helpSubgroup",
        "order": 1,
        "command": "paratext.showHelpVideos"
      },
      {
        "label": "%paratext_helpGuide%",
        "localizeNotes": "Main application menu > Help column > Paratext > Guide",
        "group": "paratext.helpSubgroup",
        "order": 1,
        "command": "paratext.showHelpGuide"
      }
    ]
  }
}
`;

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

const MAIN_MENU_CONTENT: MultiColumnMenu = {
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
};

let menuDataProviderEngine: MenuStoreDataProviderEngine;
beforeAll(() => {
  menuDataProviderEngine = new MenuStoreDataProviderEngine(MOCK_MENU_DATA);
});

jest.mock('@node/services/node-file-system.service', () => ({
  readFileText: () => {
    return Promise.resolve(MOCK_MENU_DATA_STRING);
  },
}));

test('Correct menu data returned with `mainMenu` menuType', async () => {
  const result = await menuDataProviderEngine.getMenuData('mainMenu');
  expect(result).toEqual(MAIN_MENU_CONTENT);
});

test('Error is thrown with menuType that does not exist', async () => {
  await expect(menuDataProviderEngine.getMenuData('wrongMenuType')).rejects.toThrow(
    'Missing/invalid menu data',
  );
});

// TODO: Update this test, and add more for edge cases, when the function is complete
test('Menu content at `mainMenu` menuType set successfully', async () => {
  const result = await menuDataProviderEngine.setMenuData('mainMenu', MAIN_MENU_CONTENT);
  expect(result).toEqual(true);
});
