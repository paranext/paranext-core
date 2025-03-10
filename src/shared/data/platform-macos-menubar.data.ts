import { MenuItemConstructorOptions } from 'electron';
import { Localized, LocalizeKey, MacosMenuKey } from 'platform-bible-utils';

/**
 * This type extends the MenuItemConstructorOptions type from Electron to include an optional order
 * property, change the types of label and toolTip to be LocalizeKeys. Change the type of id to
 * MacosMenuKey, so that extensions can contribute menu items into our pre-existing MacOS menus.
 */
export type MenuItemConstructorOptionsWithOrder = MenuItemConstructorOptions & {
  label?: LocalizeKey;
  toolTip?: LocalizeKey;
  id?: MacosMenuKey;
  submenu?: Omit<MenuItemConstructorOptions, 'label'> &
    {
      label?: LocalizeKey;
      order?: number;
      toolTip?: LocalizeKey;
    }[];
};

export type LocalizedMacosMenubar = Localized<MenuItemConstructorOptionsWithOrder>[];

// Cannot contribute this as is in main.ts, need to convert labels and tooltips to localized strings and remove order property
const macosMenubarObject: MenuItemConstructorOptionsWithOrder[] = [
  {
    label: '%macosMenubar_app%',
    role: 'appMenu',
    id: 'macosMenubar.appMenu',
    submenu: [
      { role: 'hide', id: 'hide', order: 3 },
      { role: 'hideOthers', id: 'hideOthers', order: 4 },
      { role: 'quit', id: 'quit', order: 5 },
    ],
  },
  {
    label: '%macosMenubar_file%',
    role: 'fileMenu',
    id: 'macosMenubar.fileMenu',
    submenu: [{ role: 'close', id: 'close', order: 8 }],
  },
  {
    label: '%macosMenubar_edit%',
    role: 'editMenu',
    id: 'macosMenubar.editMenu',
  },
  {
    label: '%macosMenubar_view%',
    role: 'viewMenu',
    id: 'macosMenubar.viewMenu',
  },
  {
    label: '%macosMenubar_tab%',
    id: 'macosMenubar.tabMenu',
  },
  {
    label: '%macosMenubar_text%',
    id: 'macosMenubar.textMenu',
  },
  {
    label: '%macosMenubar_layout%',
    id: 'macosMenubar.layoutMenu',
  },
  {
    label: '%macosMenubar_window%',
    role: 'windowMenu',
    id: 'macosMenubar.windowMenu',
  },
  {
    label: '%macosMenubar_help%',
    role: 'help',
    id: 'macosMenubar.helpMenu',
    submenu: [],
  },
];

export default macosMenubarObject;
