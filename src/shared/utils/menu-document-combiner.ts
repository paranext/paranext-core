import {
  PlatformMenus,
  ColumnsWithHeaders,
  Groups,
  MenuItemBase,
  ReferencedItem,
  menuDocumentSchema,
} from '@shared/models/menus.model';
import { DocumentCombinerEngine, JsonDocumentLike } from 'platform-bible-utils';
import Ajv2020 from 'ajv/dist/2020';

// #region Helper functions

const ajv = new Ajv2020();
const validate = ajv.compile(menuDocumentSchema);

function performSchemaValidation(document: JsonDocumentLike, docType: string): void {
  if (!validate(document))
    throw new Error(`Invalid ${docType} menu document: ${ajv.errorsText(validate.errors)}`);
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
