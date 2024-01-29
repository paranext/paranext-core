import {
  PlatformMenus,
  ColumnsWithHeaders,
  Groups,
  MenuItemBase,
} from '@shared/models/menus-model';
import { DocumentCombinerEngine, JsonDocumentLike } from 'platform-bible-utils';
import Ajv2020 from 'ajv/dist/2020';

// #region JSON schema

const outputDocumentSchema = {
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
              description: 'Path to the icon to display on the left side of the menu text',
              type: 'string',
            },
            iconPathAfter: {
              description: 'Path to the icon to display on the right side of the menu text',
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

// #endregion

// #region Helper functions

const ajv = new Ajv2020();
const validate = ajv.compile(outputDocumentSchema);

function performSchemaValidation(document: JsonDocumentLike, docType: string): void {
  if (!validate(document))
    throw new Error(`Invalid ${docType} menu document: ${ajv.errorsText(validate.errors)}`);
}

function checkColumnsForDuplicateOrdering(columns: ColumnsWithHeaders | undefined) {
  if (!columns) return;
  const columnNumbers = new Set<number>();
  Object.getOwnPropertyNames(columns).forEach((columnName: string) => {
    const column = columns[columnName];
    if (!column || typeof column !== 'object') return;
    if (columnNumbers.has(column.order)) throw new Error(`Duplicate column order: ${columnName}`);
    columnNumbers.add(column.order);
  });
}

function getOrAssign(map: Map<string, Set<number>>, key: string): Set<number> {
  let mySet = map.get(key);
  if (mySet) return mySet;
  mySet = new Set<number>();
  map.set(key, mySet);
  return mySet;
}

function checkMenuGroupsForDuplicateOrdering(groups: Groups | undefined) {
  if (!groups) return;
  const menuGroupsInColumns = new Map<string, Set<number>>();
  const menuGroupsInSubmenus = new Map<string, Set<number>>();
  Object.getOwnPropertyNames(groups).forEach((groupName: string) => {
    const group = groups[groupName];
    const groupSet =
      'column' in group
        ? getOrAssign(menuGroupsInColumns, group.column)
        : getOrAssign(menuGroupsInSubmenus, group.menuItem);
    if (groupSet.has(group.order)) throw new Error(`Duplicate group order: ${groupName}`);
    groupSet.add(group.order);
  });
}

function checkMenuItemsForDuplicateOrdering(menuItems: MenuItemBase[] | undefined) {
  if (!menuItems) return;
  const menuItemsInGroups = new Map<string, Set<number>>();
  menuItems.forEach((menuItem: MenuItemBase) => {
    const setForMenuItem = getOrAssign(menuItemsInGroups, menuItem.group);
    if (setForMenuItem.has(menuItem.order))
      throw new Error(`Duplicate menu item order: ${menuItem.label}`);
    setForMenuItem.add(menuItem.order);
  });
}

// #endregion

/**
 * Provides the ability to combine a set of JSON documents (in the form of JS objects) that
 * represent menus in Platform.Bible. The starting document is expected to be provided by the
 * platform, and all the contribution documents are expected to be provided by extensions.
 */
export default class MenuDocumentCombiner extends DocumentCombinerEngine {
  constructor(startingDocument: JsonDocumentLike) {
    super(startingDocument, false);
  }

  /**
   * Get the current set of menus given all the input documents.
   *
   * NOTE: If the input documents might have changed since the last time the menus were retrieved,
   * you can call `rebuild` to incorporate those document changes before calling this getter. For
   * example, if one of the input document objects changed and `addOrUpdateContribution` wasn't
   * called explicitly, those document changes will not be seen in the current set of menus. If all
   * the input documents are static, then there is no need to ever rebuild once all the documents
   * have been contributed to this combiner.
   */
  get currentMenus(): PlatformMenus | undefined {
    // If the output has something stored it in, then it has been validated to match the menu type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    if (this.latestOutput) return this.latestOutput as PlatformMenus;
    return undefined;
  }

  // We have to implement abstract methods but don't need to use `this`
  // eslint-disable-next-line class-methods-use-this
  protected validateStartingDocument(startingDocument: JsonDocumentLike): void {
    // The starting document has to validate against the output schema, too
    performSchemaValidation(startingDocument, 'starting');
  }

  // Extension contributions are subsets of the whole schema, so don't do normal schema validation
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected validateContribution(_documentName: string, _document: JsonDocumentLike): void {
    // TODO: Validate that new items added start with the extension names and a dot
    // TODO: Validate that extensions only add to objects that are marked as extensible
  }

  // We have to implement abstract methods but don't need to use `this`
  // eslint-disable-next-line class-methods-use-this
  protected validateOutput(output: JsonDocumentLike): void {
    performSchemaValidation(output, 'output');
    // Once the schema has been validated, we know the type should match
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const allMenus = output as PlatformMenus;
    checkColumnsForDuplicateOrdering(allMenus.mainMenu.columns);
    checkMenuGroupsForDuplicateOrdering(allMenus.mainMenu.groups);
    checkMenuItemsForDuplicateOrdering(allMenus.mainMenu.items);
    checkColumnsForDuplicateOrdering(allMenus.defaultWebViewTopMenu.columns);
    checkMenuGroupsForDuplicateOrdering(allMenus.defaultWebViewTopMenu.groups);
    checkMenuItemsForDuplicateOrdering(allMenus.defaultWebViewTopMenu.items);
    checkMenuGroupsForDuplicateOrdering(allMenus.defaultWebViewContextMenu.groups);
    checkMenuItemsForDuplicateOrdering(allMenus.defaultWebViewContextMenu.items);
    Object.getOwnPropertyNames(allMenus.webViewMenus).forEach((webViewName: string) => {
      const webViewMenu = allMenus.webViewMenus[webViewName];
      checkColumnsForDuplicateOrdering(webViewMenu.topMenu?.columns);
      checkMenuGroupsForDuplicateOrdering(webViewMenu.topMenu?.groups);
      checkMenuItemsForDuplicateOrdering(webViewMenu.topMenu?.items);
      checkMenuGroupsForDuplicateOrdering(webViewMenu.contextMenu?.groups);
      checkMenuItemsForDuplicateOrdering(webViewMenu.contextMenu?.items);
    });
  }
}
