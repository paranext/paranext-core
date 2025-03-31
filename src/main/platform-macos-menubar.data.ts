import { MenuItemConstructorOptions } from 'electron';
import { Localized, LocalizeKey } from 'platform-bible-utils';

/**
 * A group of ReferencedItems specific to the predefined menus in the MacOS menu bar. If they set
 * their macosMenuKey to 'macosMenubar.ignore', the item will not be added to the MacOS menubar.
 */
export type MacosMenuKey =
  | 'macosMenubar.appMenu'
  | 'macosMenubar.fileMenu'
  | 'macosMenubar.editMenu'
  | 'macosMenubar.viewMenu'
  | 'macosMenubar.tabMenu'
  | 'macosMenubar.textMenu'
  | 'macosMenubar.layoutMenu'
  | 'macosMenubar.windowMenu'
  | 'macosMenubar.helpMenu';

/**
 * This type extends the MenuItemConstructorOptions type from Electron to include an optional order
 * property, change the types of label and toolTip to be LocalizeKeys. Change the type of id to
 * MacosMenuKey, so that extensions can contribute menu items into our pre-existing MacOS menus.
 */
export type MenuItemConstructorOptionsWithOrder = MenuItemConstructorOptions & {
  label?: LocalizeKey;
  toolTip?: LocalizeKey;
  id?: MacosMenuKey;
  order?: number;
  submenu?: Omit<MenuItemConstructorOptions, 'label'> &
    {
      label?: LocalizeKey;
      order?: number;
      toolTip?: LocalizeKey;
    }[];
};

export type LocalizedMacosMenubar = Localized<MenuItemConstructorOptionsWithOrder>[];

// Cannot contribute this as is in main.ts, need to convert labels and tooltips to localized strings and remove order property
export const macosMenubarObject: MenuItemConstructorOptionsWithOrder[] = [
  {
    role: 'appMenu',
    id: 'macosMenubar.appMenu',
    submenu: [
      { role: 'hide', id: 'hide', order: 3 },
      { role: 'hideOthers', id: 'hideOthers', order: 4 },
      { role: 'quit', id: 'quit', order: 5 },
    ],
  },
  {
    label: '%mainMenu_file%',
    role: 'fileMenu',
    id: 'macosMenubar.fileMenu',
    submenu: [{ role: 'close', id: 'close', order: 8 }],
  },
  {
    label: '%mainMenu_edit%',
    role: 'editMenu',
    id: 'macosMenubar.editMenu',
  },
  {
    label: '%mainMenu_view%',
    role: 'viewMenu',
    id: 'macosMenubar.viewMenu',
  },
  {
    label: '%mainMenu_tab%',
    id: 'macosMenubar.tabMenu',
  },
  {
    label: '%mainMenu_text%',
    id: 'macosMenubar.textMenu',
  },
  {
    label: '%mainMenu_layout%',
    id: 'macosMenubar.layoutMenu',
  },
  {
    label: '%mainMenu_window%',
    role: 'windowMenu',
    id: 'macosMenubar.windowMenu',
  },
  {
    label: '%mainMenu_help%',
    role: 'help',
    id: 'macosMenubar.helpMenu',
    submenu: [],
  },
];
