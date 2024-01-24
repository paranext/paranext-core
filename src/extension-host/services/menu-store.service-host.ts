import {
  MenuDataType,
  MenuStoreServiceType,
  menuStoreServiceNetworkObjectName,
} from '@shared/services/menu-store.service-model';
import networkObjectService from '@shared/services/network-object.service';
// import IDataProviderEngine from '@shared/models/data-provider-engine.model';
import { DataProviderDataType } from '@shared/models/data-provider.model';
import { deserialize } from 'platform-bible-utils';
import { logger } from './papi-backend.service';
// import { DataProviderEngine } from './papi-backend.service';

// Data Type to initialize data provider engine with
export type MenuStoreDataTypes = {
  MenuData: DataProviderDataType<string, {}, {}>;
};

/**
 * Function returns the full menu json in string form to simulate nodeFs.readFileText which returns
 * a string
 */
function retrieveMenuDataString(): string {
  return `"mainMenu": {
    "columns": {
      "paratext.paratext": { "label": "%mainMenu_Paratext%", "order": 0 },
      "platform.window": { "label": "%mainMenu_Window%", "order": 1 },
      "platform.layout": { "label": "%mainMenu_Layout%", "order": 2 },
      "platform.help": { "label": "%mainMenu_Help%", "order": 3, "isExtensible": true },
      "isExtensible": true
    },
    "groups": {
      "paratext.sendReceive": { "column": "paratext.paratext", "order": 1 },
      "paratext.openCreate": { "column": "paratext.paratext", "order": 2 },
      "paratext.saveDelete": { "column": "paratext.paratext", "order": 3 },
      "paratext.misc": { "column": "paratext.paratext", "order": 9999999, "isExtensible": true },
      "platform.windowGroup1": { "column": "platform.window", "order": 1 },
      "platform.windowGroup2": { "column": "platform.window", "order": 2 },
      "platform.layoutSaveDelete": { "column": "platform.layout", "order": 1 },
      "platform.helpGroup1": { "column": "platform.help", "order": 1 },
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
      },
      {
        "label": "%video_AddParatextVideo%",
        "localizeNotes": "Main application menu > Paratext column > Add Video",
        "group": "paratext.misc",
        "order": 1,
        "command": "videoExtension.addParatextVideo"
      }
    ]
  },
  "defaultWebViewTopMenu": {
    "columns": {
      "platform.project": { "label": "%webView_Project%", "order": 1 },
      "platform.edit": { "label": "%webView_Edit%", "order": 2, "isExtensible": true }
    },
    "groups": {
      "platform.projectTop": { "column": "platform.project", "order": 1 },
      "platform.manageBooks": { "column": "platform.project", "order": 2 },
      "platform.deleteProject": { "column": "platform.project", "order": 3 },
      "platform.projectDetails": { "column": "platform.project", "order": 4, "isExtensible": true },
      "platform.undoRedo": { "column": "platform.edit", "order": 1 },
      "platform.cutCopyPaste": { "column": "platform.edit", "order": 2 }
    },
    "items": [
      {
        "label": "%projectSendReceive%",
        "localizeNotes": "Web view main menu > Project > Send/Receive this project",
        "group": "platform.projectTop",
        "order": 1,
        "command": "platform.sendReceiveProject"
      },
      {
        "label": "%projectAssignmentsAndProgress%",
        "localizeNotes": "Web view main menu > Project > Assignments and progress...",
        "group": "platform.projectTop",
        "order": 2,
        "command": "platform.assignments"
      }
    ]
  },
  "defaultWebViewContextMenu": {
    "groups": {
      "platform.insert": { "order": 1, "isExtensible": true },
      "platform.wordList": { "order": 2, "isExtensible": true }
    },
    "items": [
      {
        "label": "%insertNote%",
        "localizeNotes": "Web view context menu > Insert note...",
        "group": "platform.insert",
        "order": 1,
        "command": "platform.insertNote"
      },
      {
        "label": "%wordList%",
        "localizeNotes": "Web view context menu > Word list...",
        "group": "platform.wordList",
        "order": 1,
        "command": "platform.openWordList"
      }
    ]
  },
  "webViewMenus": {
    "videoExtension.playEditWebView": {
      "includeDefaults": false,
      "topMenu": {
        "columns": {
          "videoExtension.video": { "label": "%video%", "order": 1 }
        },
        "groups": {
          "videoExtension.videoTop": { "column": "videoExtension.project", "order": 1 }
        },
        "items": [
          {
            "label": "%playVideo%",
            "group": "videoExtension.videoTop",
            "order": 1,
            "command": "videoExtension.playVideo"
          },
          {
            "label": "%editVideo%",
            "group": "videoExtension.videoTop",
            "order": 2,
            "command": "videoExtension.editVideo"
          }
        ]
      },
      "contextMenu": {
        "groups": {},
        "items": []
      }
    }
  }`;
}

/** Convert contents of a specific menu json file to an object */
function convertToMenuData(jsonString: string): MenuDataType {
  const menuData: MenuDataType = deserialize(jsonString);
  if (typeof menuData !== 'object') throw new Error(`Menu data is invalid`);
  return menuData;
}

/** Map of menu type to menu object */
const menuDataMap = new Map<string, {}>();

/** Load the contents of the whole menu json */
async function loadAllMenuData(): Promise<Map<string, {}>> {
  menuDataMap.clear();
  try {
    const menuDataJsonString = retrieveMenuDataString();
    const convertedMenuData = convertToMenuData(menuDataJsonString);

    Object.keys(convertedMenuData).forEach((menuType) => {
      menuDataMap.set(menuType, convertedMenuData[menuType]);
    });
  } catch (error) {
    logger.warn(error);
  }

  return menuDataMap;
}

// class MenuStoreDataProviderEngine
//   extends DataProviderEngine<MenuStoreDataTypes>
//   implements IDataProviderEngine<MenuStoreDataTypes>
// {
//   // eslint-disable-next-line @typescript-eslint/no-useless-constructor
//   constructor(menuData: {}) {
//     const menuDataMap: Map<string, {}> = this.generateMap(menuData);
//     super();
//   }

//   #generateMap(menuData: {}) {
//     const menuDataMap: Map<string, {}> = menuData.map((menuType) => {
//       menuDataMap.set(menuType, menuData[menuType]);
//     });
//   }

//   async getMenuData(menuKey: string) {}

//   async setMenuData(menuKey: string, menuData: {}) {}
// }

// let engine: MenuStoreDataProviderEngine;
// async function initalizeMenuStoreDataProvider() {
//   if (!engine) engine = new MenuStoreDataProviderEngine(retrieveMenuData());
//   return engine;
// }

// initialize the service and load all the menu data
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          await loadAllMenuData();
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

// function to get the menu data for a specific menuType
async function getMenuData(menuType: string): Promise<{}> {
  await initialize();
  if (!menuDataMap || !menuDataMap.get(menuType))
    throw new Error(`Missing/invalid menu data ${menuDataMap.size}`);
  return !menuDataMap.get(menuType);
}

// async function setMenuData(menuKey: string, menuData: {}) {
//   await initialize();
// }

// async function subscribeMenuData() {
//   await initialize();
//   return engine.notifyUpdate();
// }

const menuStoreService: MenuStoreServiceType = {
  getMenuData,
  // setMenuData,
  // subscribeMenuData,
};

/** This is an internal-only export for testing purposes, and should not be used in development */
export const testingMenuStoreService = {
  menuStoreService,
};

/** Register the network object that backs the PAPI localization service */
// This doesn't really represent this service module, so we're not making it default. To use this
// service, you should use `localization.service.ts`
// eslint-disable-next-line import/prefer-default-export
export async function startMenuStoreService(): Promise<void> {
  await initialize();
  await networkObjectService.set<MenuStoreServiceType>(
    menuStoreServiceNetworkObjectName,
    menuStoreService,
  );
}
