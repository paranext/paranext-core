//----------------------------------------------------------------------------------------------
// NOTE: If you change any of the types, make sure the JSON schema at the end of this file gets
// changed so they align.
//----------------------------------------------------------------------------------------------

import { ReplaceType } from './util';

/** Identifier for a string that will be localized in a menu based on the user's UI language */
export type LocalizeKey = `%${string}%`;

/** Name of some UI element (i.e., tab, column, group, menu item) or some PAPI object (i.e., command) */
export type ReferencedItem = `${string}.${string}`;

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
  | 'macosMenubar.helpMenu'
  | 'macosMenubar.ignore';

export type OrderedItem = {
  /** Relative order of this item compared to other items in the same parent/scope (sorted ascending) */
  order: number;
};

export type OrderedExtensibleContainer = OrderedItem & {
  /** Determines whether other items can be added to this after it has been defined */
  isExtensible?: boolean;
};

/** Group of menu items that belongs in a column */
export type MenuGroupDetailsInColumn = OrderedExtensibleContainer & {
  /** ID of column in which this group resides */
  column: ReferencedItem;
};

/** Group of menu items that belongs in a submenu */
export type MenuGroupDetailsInSubMenu = OrderedExtensibleContainer & {
  /** ID of menu item hosting the submenu in which this group resides */
  menuItem: ReferencedItem;
};

/** Column that includes header text in a menu */
export type MenuColumnWithHeader = OrderedExtensibleContainer & {
  /** Key that represents the text of the header text of the column */
  label: LocalizeKey;
};

export type MenuItemBase = OrderedItem & {
  /** Menu group to which this menu item belongs */
  group: ReferencedItem;
  /** Key that represents the text of this menu item to display */
  label: LocalizeKey;
  /** Key that represents words the platform should reference when users are searching for menu items */
  searchTerms?: LocalizeKey;
  /** Key that represents the text to display if a mouse pointer hovers over the menu item */
  tooltip?: LocalizeKey;
  /** Additional information provided by developers to help people who perform localization */
  localizeNotes: string;
  /** Key of the menu in the MacOS menu bar to add this item to */
  macosMenuKey?: ReferencedItem;
};

/** Menu item that hosts a submenu */
export type MenuItemContainingSubmenu = MenuItemBase & {
  /** ID for this menu item that holds a submenu */
  id: ReferencedItem;
};

/** Menu item that runs a command */
export type MenuItemContainingCommand = MenuItemBase & {
  /** Name of the PAPI command to run when this menu item is selected. */
  command: ReferencedItem;
  /**
   * Uri path to the icon to display after the menu text. Ex:
   * `papi-extension://helloWorld/assets/icon.png`
   */
  iconPathAfter?: string;
  /**
   * Uri path to the icon to display before the menu text. Ex:
   * `papi-extension://helloWorld/assets/icon.png`
   */
  iconPathBefore?: string;
};

/**
 * Group of menu items that can be combined with other groups to form a single context menu/submenu.
 * Groups are separated using a line within the menu/submenu.
 */
export type GroupsInSingleColumnMenu = {
  /** Named menu group */
  [property: ReferencedItem]: OrderedExtensibleContainer | MenuGroupDetailsInSubMenu;
};

/**
 * Group of menu items that can be combined with other groups to form a single menu/submenu within a
 * multi-column menu. Groups are separated using a line within the menu/submenu.
 */
export type GroupsInMultiColumnMenu = {
  /** Named menu group */
  [property: ReferencedItem]: MenuGroupDetailsInColumn | MenuGroupDetailsInSubMenu;
};

/** Group of columns that can be combined with other columns to form a multi-column menu */
export type ColumnsWithHeaders = {
  /** Named column of a menu */
  [property: ReferencedItem]: MenuColumnWithHeader;
  /** Defines whether columns can be added to this multi-column menu */
  isExtensible?: boolean;
};

/** Menu that contains a column without a header */
export type SingleColumnMenu = {
  /** Groups that belong in this menu */
  groups: GroupsInSingleColumnMenu;
  /** List of menu items that belong in this menu */
  items: (MenuItemContainingCommand | MenuItemContainingSubmenu)[];
};

/** Menu that contains multiple columns with headers */
export type MultiColumnMenu = {
  /** Columns that belong in this menu */
  columns: ColumnsWithHeaders;
  /** Groups that belong in this menu */
  groups: GroupsInMultiColumnMenu;
  /** List of menu items that belong in this menu */
  items: (MenuItemContainingCommand | MenuItemContainingSubmenu)[];
};

/** Menus for one single web view */
export type WebViewMenu = {
  /** Indicates whether the platform default menus should be included for this webview */
  includeDefaults: boolean | undefined;
  /** Menu that opens when you click on the top left corner of a tab */
  topMenu: MultiColumnMenu | undefined;
  /** Menu that opens when you right click on the main body/area of a tab */
  contextMenu: SingleColumnMenu | undefined;
};

/** Menus for all web views */
export type WebViewMenus = {
  /** Named web view */
  [property: ReferencedItem]: WebViewMenu;
};

/** Platform.Bible menus before they are localized */
export type PlatformMenus = {
  /** Top level menu for the application */
  mainMenu: MultiColumnMenu;
  /** Menus that apply per web view in the application */
  webViewMenus: WebViewMenus;
  /** Default context menu for web views that don't specify their own */
  defaultWebViewContextMenu: SingleColumnMenu;
  /** Default top menu for web views that don't specify their own */
  defaultWebViewTopMenu: MultiColumnMenu;
};

/**
 * Type that converts any menu type before it is localized to what it is after it is localized. This
 * can be applied to any menu type as needed.
 */
export type Localized<T> = ReplaceType<ReplaceType<T, LocalizeKey, string>, ReferencedItem, string>;

//----------------------------------------------------------------------------------------------
// NOTE: If you change the schema below, make sure the TS types above get changed so they align.
//----------------------------------------------------------------------------------------------
/** JSON schema object that aligns with the PlatformMenus type */
export const menuDocumentSchema = {
  title: 'Platform.Bible menus',
  type: 'object',
  properties: {
    mainMenu: {
      description: 'Top level menu for the application',
      $ref: '#/$defs/multiColumnMenu',
    },
    defaultWebViewTopMenu: {
      description: "Default top menu for web views that don't specify their own",
      $ref: '#/$defs/multiColumnMenu',
    },
    defaultWebViewContextMenu: {
      description: "Default context menu for web views that don't specify their own",
      $ref: '#/$defs/singleColumnMenu',
    },
    webViewMenus: {
      description: 'Menus that apply per web view in the application',
      type: 'object',
      patternProperties: {
        '^[\\w\\-]+\\.[\\w\\-]+$': {
          $ref: '#/$defs/menusForOneWebView',
        },
      },
      additionalProperties: false,
    },
  },
  required: ['mainMenu', 'defaultWebViewTopMenu', 'defaultWebViewContextMenu', 'webViewMenus'],
  additionalProperties: false,
  $defs: {
    localizeKey: {
      description:
        "Identifier for a string that will be localized in a menu based on the user's UI language",
      type: 'string',
      pattern: '^%[\\w\\-\\.]+%$',
    },
    referencedItem: {
      description:
        'Name of some UI element (i.e., tab, column, group, menu item) or some PAPI object (i.e., command)',
      type: 'string',
      pattern: '^[\\w\\-]+\\.[\\w\\-]+$',
    },
    columnsWithHeaders: {
      description:
        'Group of columns that can be combined with other columns to form a multi-column menu',
      type: 'object',
      patternProperties: {
        '^[\\w\\-]+\\.[\\w\\-]+$': {
          description: 'Single column with a header string',
          type: 'object',
          properties: {
            label: {
              description: 'Header text for this this column in the UI',
              $ref: '#/$defs/localizeKey',
            },
            localizeNotes: {
              description:
                'Additional information provided by developers to help people who perform localization',
              type: 'string',
            },
            order: {
              description:
                'Relative order of this column compared to other columns (sorted ascending)',
              type: 'number',
            },
            isExtensible: {
              description:
                'Defines whether contributions are allowed to add menu groups to this column',
              type: 'boolean',
            },
          },
          required: ['label', 'order'],
          additionalProperties: false,
        },
      },
      properties: {
        isExtensible: {
          description:
            'Defines whether contributions are allowed to add columns to this multi-column menu',
          type: 'boolean',
        },
      },
    },
    menuGroups: {
      description:
        'Group of menu items that can be combined with other groups to form a single menu/submenu. Groups are separated using a line within the menu/submenu.',
      type: 'object',
      patternProperties: {
        '^[\\w\\-]+\\.[\\w\\-]+$': {
          description: 'Single group that contains menu items',
          type: 'object',
          oneOf: [
            {
              properties: {
                column: {
                  description:
                    'Column where this group belongs, not required for single column menus',
                  $ref: '#/$defs/referencedItem',
                },
                order: {
                  description:
                    'Relative order of this group compared to other groups in the same column or submenu (sorted ascending)',
                  type: 'number',
                },
                isExtensible: {
                  description:
                    'Defines whether contributions are allowed to add menu items to this menu group',
                  type: 'boolean',
                },
              },
              required: ['order'],
              additionalProperties: false,
            },
            {
              properties: {
                menuItem: {
                  description: 'Menu item that anchors the submenu where this group belongs',
                  $ref: '#/$defs/referencedItem',
                },
                order: {
                  description:
                    'Relative order of this group compared to other groups in the same column or submenu (sorted ascending)',
                  type: 'number',
                },
                isExtensible: {
                  description:
                    'Defines whether contributions are allowed to add menu items to this menu group',
                  type: 'boolean',
                },
              },
              required: ['menuItem', 'order'],
              additionalProperties: false,
            },
          ],
        },
      },
      additionalProperties: false,
    },
    menuItem: {
      description:
        'Single item in a menu that can be clicked on to take an action or can be the parent of a submenu',
      type: 'object',
      oneOf: [
        {
          properties: {
            id: {
              description: 'ID for this menu item that holds a submenu',
              $ref: '#/$defs/referencedItem',
            },
          },
          required: ['id'],
        },
        {
          properties: {
            command: {
              description: 'Name of the PAPI command to run when this menu item is selected.',
              $ref: '#/$defs/referencedItem',
            },
            iconPathBefore: {
              description:
                'Uri path to the icon to display before the menu text. Ex: `papi-extension://helloWorld/assets/icon.png`',
              type: 'string',
            },
            iconPathAfter: {
              description:
                'Uri path to the icon to display after the menu text. Ex: `papi-extension://helloWorld/assets/icon.png`',
              type: 'string',
            },
          },
          required: ['command'],
        },
      ],
      properties: {
        label: {
          description: 'Key that represents the text of this menu item to display',
          $ref: '#/$defs/localizeKey',
        },
        tooltip: {
          description:
            'Key that represents the text to display if a mouse pointer hovers over the menu item',
          $ref: '#/$defs/localizeKey',
        },
        searchTerms: {
          description:
            'Key that represents additional words the platform should reference when users are searching for menu items',
          $ref: '#/$defs/localizeKey',
        },
        localizeNotes: {
          description:
            'Additional information provided by developers to help people who perform localization',
          type: 'string',
        },
        group: {
          description: 'Group to which this menu item belongs',
          $ref: '#/$defs/referencedItem',
        },
        order: {
          description:
            'Relative order of this menu item compared to other menu items in the same group (sorted ascending)',
          type: 'number',
        },
        macosMenuKey: {
          description: 'Key of the menu in the MacOS menu bar to add this item to',
          $ref: '#/$defs/referencedItem',
        },
      },
      required: ['label', 'group', 'order'],
      unevaluatedProperties: false,
    },
    groupsAndItems: {
      description: 'Core schema for a column',
      type: 'object',
      properties: {
        groups: {
          description: 'Groups that belong in this menu',
          $ref: '#/$defs/menuGroups',
        },
        items: {
          description: 'List of menu items that belong in this menu',
          type: 'array',
          items: { $ref: '#/$defs/menuItem' },
          uniqueItems: true,
        },
      },
      required: ['groups', 'items'],
    },
    singleColumnMenu: {
      description: 'Menu that contains a column without a header',
      type: 'object',
      allOf: [{ $ref: '#/$defs/groupsAndItems' }],
      unevaluatedProperties: false,
    },
    multiColumnMenu: {
      description: 'Menu that can contain multiple columns with headers',
      type: 'object',
      allOf: [
        { $ref: '#/$defs/groupsAndItems' },
        {
          properties: {
            columns: {
              description: 'Columns that belong in this menu',
              $ref: '#/$defs/columnsWithHeaders',
            },
          },
          required: ['columns'],
        },
      ],
      unevaluatedProperties: false,
    },
    menusForOneWebView: {
      description: 'Set of menus that are associated with a single tab',
      type: 'object',
      properties: {
        includeDefaults: {
          description:
            'Indicates whether the platform default menus should be included for this webview',
          type: 'boolean',
        },
        topMenu: {
          description: 'Menu that opens when you click on the top left corner of a tab',
          $ref: '#/$defs/multiColumnMenu',
        },
        contextMenu: {
          description: 'Menu that opens when you right click on the main body/area of a tab',
          $ref: '#/$defs/singleColumnMenu',
        },
      },
      additionalProperties: false,
    },
  },
};

Object.freeze(menuDocumentSchema);
