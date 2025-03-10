import { MenuItemConstructorOptions } from 'electron';
import { Localized, LocalizeKey } from 'platform-bible-utils';

// TODO: Do the "role" menu items localize? Add localized labels anyways?

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

export type MacosMenuKey =
  | 'macosMenubar.appMenu'
  | 'macosMenubar.fileMenu'
  | 'macosMenubar.editMenu'
  | 'macosMenubar.viewMenu'
  | 'macosMenubar.tabMenu'
  | 'macosMenubar.textMenu'
  | 'macosMenubar.layoutMenu'
  | 'macosMenubar.windowMenu'
  | 'macosMenubar.helpMenu'
  | 'macosMenubar.ignore';

// Cannot contribute this as is in main.ts, need to convert click strings to functions and remove the order property
const macosMenubarObject: MenuItemConstructorOptionsWithOrder[] = [
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
    role: 'fileMenu',
    id: 'macosMenubar.fileMenu',
    submenu: [{ role: 'close', id: 'close', order: 8 }],
  },
  {
    role: 'editMenu',
    id: 'macosMenubar.editMenu',
  },
  {
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
