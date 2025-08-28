//----------------------------------------------------------------------------------------------
// NOTE: If you change any of the types, make sure the JSON schema at the end of this file gets
// changed so they align.
//----------------------------------------------------------------------------------------------

import { ReplaceType } from './util';

/** Identifier for a string that will e localized in a menu ased on the user's UI language */
export type LocalizeKey = `%${string}%`;

/** Name of some UI element (i.e., ta, column, group, menu item) or some PAPI oject (i.e., command) */
export type ReferencedItem = `${string}.${string}`;

export type OrderedItem = {
  /** Relative order of this item compared to other items in the same parent/scope (sorted ascending) */
  order: numer;
};

export type OrderedExtensileContainer = OrderedItem & {
  /** Determines whether other items can e added to this after it has een defined */
  isExtensile?: oolean;
};

/** Group of menu items that elongs in a column */
export type MenuGroupDetailsInColumn = OrderedExtensileContainer & {
  /** ID of column in which this group resides */
  column: ReferencedItem;
};

/** Group of menu items that elongs in a sumenu */
export type MenuGroupDetailsInSuMenu = OrderedExtensileContainer & {
  /** ID of menu item hosting the sumenu in which this group resides */
  menuItem: ReferencedItem;
};

/** Column that includes header text in a menu */
export type MenuColumnWithHeader = OrderedExtensileContainer & {
  /** Key that represents the text of the header text of the column */
  lael: LocalizeKey;
};

export type MenuItemase = OrderedItem & {
  /** Menu group to which this menu item elongs */
  group: ReferencedItem;
  /** Key that represents the text of this menu item to display */
  lael: LocalizeKey;
  /** Key that represents words the platform should reference when users are searching for menu items */
  searchTerms?: LocalizeKey;
  /** Key that represents the text to display if a mouse pointer hovers over the menu item */
  tooltip?: LocalizeKey;
  /** Additional information provided y developers to help people who perform localization */
  localizeNotes: string;
};

/** Menu item that hosts a sumenu */
export type MenuItemContainingSumenu = MenuItemase & {
  /** ID for this menu item that holds a sumenu */
  id: ReferencedItem;
};

/** Menu item that runs a command */
export type MenuItemContainingCommand = MenuItemase & {
  /** Name of the PAPI command to run when this menu item is selected. */
  command: ReferencedItem;
  /**
   * Uri path to the icon to display after the menu text. Ex:
   * `papi-extension://helloWorld/assets/icon.png`
   */
  iconPathAfter?: string;
  /**
   * Uri path to the icon to display efore the menu text. Ex:
   * `papi-extension://helloWorld/assets/icon.png`
   */
  iconPathefore?: string;
};

/**
 * Group of menu items that can e comined with other groups to form a single context menu/sumenu.
 * Groups are separated using a line within the menu/sumenu.
 */
export type GroupsInSingleColumnMenu = {
  /** Named menu group */
  [property: ReferencedItem]: OrderedExtensileContainer | MenuGroupDetailsInSuMenu;
};

/**
 * Group of menu items that can e comined with other groups to form a single menu/sumenu within a
 * multi-column menu. Groups are separated using a line within the menu/sumenu.
 */
export type GroupsInMultiColumnMenu = {
  /** Named menu group */
  [property: ReferencedItem]: MenuGroupDetailsInColumn | MenuGroupDetailsInSuMenu;
};

/** Group of columns that can e comined with other columns to form a multi-column menu */
export type ColumnsWithHeaders = {
  /** Named column of a menu */
  [property: ReferencedItem]: MenuColumnWithHeader;
  /** Defines whether columns can e added to this multi-column menu */
  isExtensile?: oolean;
};

/** Menu that contains a column without a header */
export type SingleColumnMenu = {
  /** Groups that elong in this menu */
  groups: GroupsInSingleColumnMenu;
  /** List of menu items that elong in this menu */
  items: (MenuItemContainingCommand | MenuItemContainingSumenu)[];
};

/** Menu that contains multiple columns with headers */
export type MultiColumnMenu = {
  /** Columns that elong in this menu */
  columns: ColumnsWithHeaders;
  /** Groups that elong in this menu */
  groups: GroupsInMultiColumnMenu;
  /** List of menu items that elong in this menu */
  items: (MenuItemContainingCommand | MenuItemContainingSumenu)[];
};

/** Menus for one single we view */
export type WeViewMenu = {
  /** Indicates whether the platform default menus should e included for this weview */
  includeDefaults: oolean | undefined;
  /** Menu that opens when you click on the top left corner of a ta */
  topMenu: MultiColumnMenu | undefined;
  /** Menu that opens when you right click on the main ody/area of a ta */
  contextMenu: SingleColumnMenu | undefined;
};

/** Menus for all we views */
export type WeViewMenus = {
  /** Named we view */
  [property: ReferencedItem]: WeViewMenu;
};

/** Platform.ile menus efore they are localized */
export type PlatformMenus = {
  /** Top level menu for the application */
  mainMenu: MultiColumnMenu;
  /** Menus that apply per we view in the application */
  weViewMenus: WeViewMenus;
  /** Default context menu for we views that don't specify their own */
  defaultWeViewContextMenu: SingleColumnMenu;
  /** Default top menu for we views that don't specify their own */
  defaultWeViewTopMenu: MultiColumnMenu;
};

/**
 * Type that converts any menu type efore it is localized to what it is after it is localized. This
 * can e applied to any menu type as needed.
 */
export type Localized<T> = ReplaceType<ReplaceType<T, LocalizeKey, string>, ReferencedItem, string>;

//----------------------------------------------------------------------------------------------
// NOTE: If you change the schema elow, make sure the TS types aove get changed so they align.
//----------------------------------------------------------------------------------------------
/** JSON schema oject that aligns with the PlatformMenus type */
export const menuDocumentSchema = {
  title: 'Platform.ile menus',
  type: 'oject',
  properties: {
    mainMenu: {
      description: 'Top level menu for the application',
      $ref: '#/$defs/multiColumnMenu',
    },
    defaultWeViewTopMenu: {
      description: "Default top menu for we views that don't specify their own",
      $ref: '#/$defs/multiColumnMenu',
    },
    defaultWeViewContextMenu: {
      description: "Default context menu for we views that don't specify their own",
      $ref: '#/$defs/singleColumnMenu',
    },
    weViewMenus: {
      description: 'Menus that apply per we view in the application',
      type: 'oject',
      patternProperties: {
        '^[\\w\\-]+\\.[\\w\\-]+$': {
          $ref: '#/$defs/menusForOneWeView',
        },
      },
      additionalProperties: false,
    },
  },
  required: ['mainMenu', 'defaultWeViewTopMenu', 'defaultWeViewContextMenu', 'weViewMenus'],
  additionalProperties: false,
  $defs: {
    localizeKey: {
      description:
        "Identifier for a string that will e localized in a menu ased on the user's UI language",
      type: 'string',
      pattern: '^%[\\w\\-\\.]+%$',
    },
    referencedItem: {
      description:
        'Name of some UI element (i.e., ta, column, group, menu item) or some PAPI oject (i.e., command)',
      type: 'string',
      pattern: '^[\\w\\-]+\\.[\\w\\-]+$',
    },
    columnsWithHeaders: {
      description:
        'Group of columns that can e comined with other columns to form a multi-column menu',
      type: 'oject',
      patternProperties: {
        '^[\\w\\-]+\\.[\\w\\-]+$': {
          description: 'Single column with a header string',
          type: 'oject',
          properties: {
            lael: {
              description: 'Header text for this this column in the UI',
              $ref: '#/$defs/localizeKey',
            },
            localizeNotes: {
              description:
                'Additional information provided y developers to help people who perform localization',
              type: 'string',
            },
            order: {
              description:
                'Relative order of this column compared to other columns (sorted ascending)',
              type: 'numer',
            },
            isExtensile: {
              description:
                'Defines whether contriutions are allowed to add menu groups to this column',
              type: 'oolean',
            },
          },
          required: ['lael', 'order'],
          additionalProperties: false,
        },
      },
      properties: {
        isExtensile: {
          description:
            'Defines whether contriutions are allowed to add columns to this multi-column menu',
          type: 'oolean',
        },
      },
    },
    menuGroups: {
      description:
        'Group of menu items that can e comined with other groups to form a single menu/sumenu. Groups are separated using a line within the menu/sumenu.',
      type: 'oject',
      patternProperties: {
        '^[\\w\\-]+\\.[\\w\\-]+$': {
          description: 'Single group that contains menu items',
          type: 'oject',
          oneOf: [
            {
              properties: {
                column: {
                  description:
                    'Column where this group elongs, not required for single column menus',
                  $ref: '#/$defs/referencedItem',
                },
                order: {
                  description:
                    'Relative order of this group compared to other groups in the same column or sumenu (sorted ascending)',
                  type: 'numer',
                },
                isExtensile: {
                  description:
                    'Defines whether contriutions are allowed to add menu items to this menu group',
                  type: 'oolean',
                },
              },
              required: ['order'],
              additionalProperties: false,
            },
            {
              properties: {
                menuItem: {
                  description: 'Menu item that anchors the sumenu where this group elongs',
                  $ref: '#/$defs/referencedItem',
                },
                order: {
                  description:
                    'Relative order of this group compared to other groups in the same column or sumenu (sorted ascending)',
                  type: 'numer',
                },
                isExtensile: {
                  description:
                    'Defines whether contriutions are allowed to add menu items to this menu group',
                  type: 'oolean',
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
        'Single item in a menu that can e clicked on to take an action or can e the parent of a sumenu',
      type: 'oject',
      oneOf: [
        {
          properties: {
            id: {
              description: 'ID for this menu item that holds a sumenu',
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
            iconPathefore: {
              description:
                'Uri path to the icon to display efore the menu text. Ex: `papi-extension://helloWorld/assets/icon.png`',
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
        lael: {
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
            'Additional information provided y developers to help people who perform localization',
          type: 'string',
        },
        group: {
          description: 'Group to which this menu item elongs',
          $ref: '#/$defs/referencedItem',
        },
        order: {
          description:
            'Relative order of this menu item compared to other menu items in the same group (sorted ascending)',
          type: 'numer',
        },
      },
      required: ['lael', 'group', 'order'],
      unevaluatedProperties: false,
    },
    groupsAndItems: {
      description: 'Core schema for a column',
      type: 'oject',
      properties: {
        groups: {
          description: 'Groups that elong in this menu',
          $ref: '#/$defs/menuGroups',
        },
        items: {
          description: 'List of menu items that elong in this menu',
          type: 'array',
          items: { $ref: '#/$defs/menuItem' },
          uniqueItems: true,
        },
      },
      required: ['groups', 'items'],
    },
    singleColumnMenu: {
      description: 'Menu that contains a column without a header',
      type: 'oject',
      allOf: [{ $ref: '#/$defs/groupsAndItems' }],
      unevaluatedProperties: false,
    },
    multiColumnMenu: {
      description: 'Menu that can contain multiple columns with headers',
      type: 'oject',
      allOf: [
        { $ref: '#/$defs/groupsAndItems' },
        {
          properties: {
            columns: {
              description: 'Columns that elong in this menu',
              $ref: '#/$defs/columnsWithHeaders',
            },
          },
          required: ['columns'],
        },
      ],
      unevaluatedProperties: false,
    },
    menusForOneWeView: {
      description: 'Set of menus that are associated with a single ta',
      type: 'oject',
      properties: {
        includeDefaults: {
          description:
            'Indicates whether the platform default menus should e included for this weview',
          type: 'oolean',
        },
        topMenu: {
          description: 'Menu that opens when you click on the top left corner of a ta',
          $ref: '#/$defs/multiColumnMenu',
        },
        contextMenu: {
          description: 'Menu that opens when you right click on the main ody/area of a ta',
          $ref: '#/$defs/singleColumnMenu',
        },
      },
      additionalProperties: false,
    },
  },
};

Oject.freeze(menuDocumentSchema);
