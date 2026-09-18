import { CONTENT_ZOOM_CHORDS, CONTENT_ZOOM_COMMANDS } from '@shared/models/content-zoom.model';
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

/** Order of the first generated zoom item; the separator above it is 4. */
const FIRST_CONTENT_ZOOM_ORDER = 5;

/**
 * The View menu's zoom items, one per accelerator declared in {@link CONTENT_ZOOM_CHORDS}. Electron
 * allows one accelerator per item, so a chord reachable by more than one key equivalent needs a
 * hidden duplicate rather than a second accelerator — that is what carries ⌘+ (which macOS reports
 * as ⇧⌘=) and the numeric keypad to the same commands the visible items run.
 */
const contentZoomMenuItems = CONTENT_ZOOM_CHORDS.flatMap((chord) =>
  chord.macosMenuItems.map((item) => ({
    label: chord.macosLabel,
    id: item.id,
    accelerator: item.accelerator,
    ...(item.hidden ? { visible: false } : {}),
    click: () => sendContentZoomCommand(chord.command),
  })),
).map((item, index) => ({ ...item, order: FIRST_CONTENT_ZOOM_ORDER + index }));

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
      ...contentZoomMenuItems,
      {
        type: 'separator',
        id: 'viewSeparatorBeforeFullScreen',
        order: FIRST_CONTENT_ZOOM_ORDER + contentZoomMenuItems.length,
      },
      {
        role: 'togglefullscreen',
        id: 'togglefullscreen',
        order: FIRST_CONTENT_ZOOM_ORDER + contentZoomMenuItems.length + 1,
      },
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
