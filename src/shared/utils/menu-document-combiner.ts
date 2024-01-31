import {
  PlatformMenus,
  ColumnsWithHeaders,
  Groups,
  MenuItemBase,
  ReferencedItem,
  menuDocumentSchema,
  MenuItemContainingSubmenu,
  MenuItemContainingCommand,
} from '@shared/models/menus.model';
import { DocumentCombinerEngine, JsonDocumentLike } from 'platform-bible-utils';
import Ajv2020 from 'ajv/dist/2020';

// From https://stackoverflow.com/questions/61132262/typescript-deep-partial
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

// #region Helper functions

const ajv = new Ajv2020();
const validate = ajv.compile(menuDocumentSchema);

function performSchemaValidation(document: JsonDocumentLike, docType: string): void {
  if (!validate(document))
    throw new Error(`Invalid ${docType} menu document: ${ajv.errorsText(validate.errors)}`);
}

function checkNewColumns(
  newColumns: DeepPartial<ColumnsWithHeaders> | undefined,
  namePrefix: string,
  currentColumns: ColumnsWithHeaders | undefined,
) {
  if (!newColumns) return;
  Object.getOwnPropertyNames(newColumns).forEach((columnName: string) => {
    if (!columnName) return;
    if (!columnName.startsWith(namePrefix))
      throw new Error(`Column name ${columnName} does not start with ${namePrefix}`);
    if (!!currentColumns && currentColumns.isExtensible !== true)
      throw new Error(`Cannot add new column ${columnName} because isExtensible is not set`);
  });
}

function checkNewGroups(
  newGroups: DeepPartial<Groups> | undefined,
  namePrefix: string,
  currentColumns: ColumnsWithHeaders | undefined,
) {
  if (!newGroups) return;
  Object.getOwnPropertyNames(newGroups).forEach((groupName: string) => {
    // TS doesn't allow `groupName` above to be a ReferencedItem even though the type says it is
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const group = newGroups[groupName as ReferencedItem];
    if (!group) return;
    if (!groupName.startsWith(namePrefix))
      throw new Error(`Group name ${groupName} does not start with ${namePrefix}`);
    if ('column' in group && group.column) {
      if (!currentColumns) return;
      const targetColumn = currentColumns[group.column];
      if (targetColumn && targetColumn.isExtensible !== true)
        throw new Error(`Cannot add new group ${groupName} because isExtensible is not set`);
    } else if ('menuItem' in group && group.menuItem) {
      const targetMenuItemName = group.menuItem;
      if (!targetMenuItemName.startsWith(namePrefix))
        throw new Error(`Cannot add new group ${groupName} to a submenu owned by something else`);
    }
  });
}

function checkNewMenuItems(
  newMenuItems: DeepPartial<(MenuItemContainingCommand | MenuItemContainingSubmenu)[]> | undefined,
  namePrefix: string,
  currentGroups: Groups | undefined,
) {
  if (!newMenuItems) return;
  newMenuItems.forEach((menuItem) => {
    if (!menuItem) return;
    if ('id' in menuItem && menuItem.id && !menuItem.id.startsWith(namePrefix))
      throw new Error(`Menu item ID ${menuItem.id} does not start with ${namePrefix}`);
    const targetGroupName = menuItem.group;
    if (targetGroupName && !targetGroupName.startsWith(namePrefix)) {
      if (!currentGroups) return;
      const targetGroup = currentGroups[targetGroupName];
      if (targetGroup.isExtensible !== true)
        throw new Error(
          `Cannot add new menu item ${menuItem.label} to group ${targetGroupName} because isExtensible is not set`,
        );
    }
  });
}

function checkColumnsForDuplicateOrdering(columns: ColumnsWithHeaders | undefined) {
  if (!columns) return;
  const columnNumbers = new Set<number>();
  Object.getOwnPropertyNames(columns).forEach((columnName: string) => {
    // TS doesn't allow `columnName` above to be a ReferencedItem even though the type says it is
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const column = columns[columnName as ReferencedItem];
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
    // TS doesn't allow `groupName` above to be a ReferencedItem even though the type says it is
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const group = groups[groupName as ReferencedItem];
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
  protected validateContribution(documentName: string, document: JsonDocumentLike): void {
    const { currentMenus } = this;

    // Type assert all menu properties as partial to make it easier to work with
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const newMenus = document as DeepPartial<PlatformMenus>;
    const namePrefix = `${documentName}.`;

    checkNewColumns(newMenus.mainMenu?.columns, namePrefix, currentMenus?.mainMenu.columns);
    checkNewGroups(newMenus.mainMenu?.groups, namePrefix, currentMenus?.mainMenu.columns);
    checkNewMenuItems(newMenus.mainMenu?.items, namePrefix, currentMenus?.mainMenu.groups);
    checkNewColumns(
      newMenus.defaultWebViewTopMenu?.columns,
      namePrefix,
      currentMenus?.defaultWebViewTopMenu.columns,
    );
    checkNewGroups(
      newMenus.defaultWebViewTopMenu?.groups,
      namePrefix,
      currentMenus?.defaultWebViewTopMenu.columns,
    );
    checkNewMenuItems(
      newMenus.defaultWebViewTopMenu?.items,
      namePrefix,
      currentMenus?.defaultWebViewTopMenu.groups,
    );
    checkNewGroups(newMenus.defaultWebViewContextMenu?.groups, namePrefix, undefined);
    checkNewMenuItems(
      newMenus.defaultWebViewContextMenu?.items,
      namePrefix,
      currentMenus?.defaultWebViewContextMenu.groups,
    );
    const newWebViewMenus = newMenus?.webViewMenus;
    if (!newWebViewMenus) return;
    Object.getOwnPropertyNames(newWebViewMenus).forEach((webViewName: string) => {
      // TS doesn't allow `webViewName` above to be a ReferencedItem even though the type says it is
      /* eslint-disable no-type-assertion/no-type-assertion */
      const newWebView = newWebViewMenus[webViewName as ReferencedItem];
      const currentWebView = currentMenus?.webViewMenus[webViewName as ReferencedItem];
      /* eslint-enable no-type-assertion/no-type-assertion */

      if (!currentWebView && !webViewName.startsWith(namePrefix))
        throw new Error(`Cannot add a new web view unless it starts with ${namePrefix}`);

      checkNewColumns(newWebView?.topMenu?.columns, namePrefix, currentWebView?.topMenu?.columns);
      checkNewGroups(newWebView?.topMenu?.groups, namePrefix, currentWebView?.topMenu?.columns);
      checkNewMenuItems(newWebView?.topMenu?.items, namePrefix, currentWebView?.topMenu?.groups);
      checkNewGroups(newWebView?.contextMenu?.groups, namePrefix, undefined);
      checkNewMenuItems(
        newWebView?.contextMenu?.items,
        namePrefix,
        currentWebView?.contextMenu?.groups,
      );
    });

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
      // TS doesn't allow `webViewName` above to be a ReferencedItem even though the type says it is
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const webViewMenu = allMenus.webViewMenus[webViewName as ReferencedItem];
      checkColumnsForDuplicateOrdering(webViewMenu.topMenu?.columns);
      checkMenuGroupsForDuplicateOrdering(webViewMenu.topMenu?.groups);
      checkMenuItemsForDuplicateOrdering(webViewMenu.topMenu?.items);
      checkMenuGroupsForDuplicateOrdering(webViewMenu.contextMenu?.groups);
      checkMenuItemsForDuplicateOrdering(webViewMenu.contextMenu?.items);
    });
  }
}
