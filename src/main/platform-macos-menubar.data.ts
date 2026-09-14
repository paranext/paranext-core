import { CONTENT_ZOOM_COMMANDS } from '@shared/models/content-zoom.model';
import * as commandService from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { MenuItemConstructorOptions } from 'electron';
import { getErrorMessage, Localized, LocalizeKey } from 'platform-bible-utils';

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
      isLabelFormatString?: boolean;
    }[];
};

export type LocalizedMacosMenubar = Localized<MenuItemConstructorOptionsWithOrder>[];

/**
 * Sends one content-zoom command from a macOS View menu click, logging rather than throwing on
 * failure.
 */
function sendContentZoomCommand(
  command: (typeof CONTENT_ZOOM_COMMANDS)[keyof typeof CONTENT_ZOOM_COMMANDS],
): void {
  commandService
    .sendCommand(command)
    .catch((e) => logger.warn(`macOS View menu: ${command} failed: ${getErrorMessage(e)}`));
}

// Cannot contribute this as is in main.ts, need to convert labels and tooltips to localized strings and remove order property
export const macosMenubarObject: MenuItemConstructorOptionsWithOrder[] = [
  {
    role: 'appMenu',
    id: 'macosMenubar.appMenu',
    submenu: [
      {
        label: '%mainMenu_hideProductName%',
        role: 'hide',
        id: 'hide',
        order: 3,
        isLabelFormatString: true,
      },
      { role: 'hideOthers', id: 'hideOthers', order: 4 },
      {
        label: '%mainMenu_quitProductName%',
        role: 'quit',
        id: 'quit',
        order: 5,
        isLabelFormatString: true,
      },
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
    // Explicit submenu, not `role: 'viewMenu'`'s default items: on macOS the app menu owns ⌘
    // chords, and Electron's built-in zoomIn/zoomOut/resetZoom roles would claim ⌘+/⌘-/⌘0 before
    // the content-zoom commands ever saw them.
    submenu: [
      { role: 'reload', id: 'reload', order: 1 },
      { role: 'forceReload', id: 'forceReload', order: 2 },
      { role: 'toggleDevTools', id: 'toggleDevTools', order: 3 },
      { type: 'separator', id: 'viewSeparatorAfterDevTools', order: 4 },
      {
        label: '%mainMenu_view_zoomIn%',
        id: 'contentZoomIn',
        order: 5,
        accelerator: 'CommandOrControl+=',
        click: () => sendContentZoomCommand(CONTENT_ZOOM_COMMANDS.in),
      },
      {
        label: '%mainMenu_view_zoomOut%',
        id: 'contentZoomOut',
        order: 6,
        accelerator: 'CommandOrControl+-',
        click: () => sendContentZoomCommand(CONTENT_ZOOM_COMMANDS.out),
      },
      {
        label: '%mainMenu_view_resetZoom%',
        id: 'contentZoomReset',
        order: 7,
        accelerator: 'CommandOrControl+0',
        click: () => sendContentZoomCommand(CONTENT_ZOOM_COMMANDS.reset),
      },
      // Hidden duplicates carrying the numpad accelerators: Electron allows only one accelerator
      // per menu item, so the numpad chords need their own (invisible) items rather than a second
      // accelerator on the items above.
      {
        label: '%mainMenu_view_zoomIn%',
        id: 'contentZoomInNumpad',
        order: 8,
        accelerator: 'CommandOrControl+numadd',
        visible: false,
        click: () => sendContentZoomCommand(CONTENT_ZOOM_COMMANDS.in),
      },
      {
        label: '%mainMenu_view_zoomOut%',
        id: 'contentZoomOutNumpad',
        order: 9,
        accelerator: 'CommandOrControl+numsub',
        visible: false,
        click: () => sendContentZoomCommand(CONTENT_ZOOM_COMMANDS.out),
      },
      {
        label: '%mainMenu_view_resetZoom%',
        id: 'contentZoomResetNumpad',
        order: 10,
        accelerator: 'CommandOrControl+num0',
        visible: false,
        click: () => sendContentZoomCommand(CONTENT_ZOOM_COMMANDS.reset),
      },
      { type: 'separator', id: 'viewSeparatorBeforeFullScreen', order: 11 },
      { role: 'togglefullscreen', id: 'togglefullscreen', order: 12 },
    ],
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
