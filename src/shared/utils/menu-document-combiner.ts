import {
  PlatformMenus,
  MultiColumnMenu,
  SingleColumnMenu,
  ColumnsWithHeaders,
  Groups,
  MenuItemBase,
  MenuItemContainingSubmenu,
  MenuItemContainingCommand,
  ReferencedItem,
  LocalizeKey,
  menuDocumentSchema,
} from '@shared/models/menus.model';
import {
  DocumentCombinerEngine,
  DocumentCombinerOptions,
  JsonDocumentLike,
  deepClone,
} from 'platform-bible-utils';
import Ajv2020 from 'ajv/dist/2020';
import localizationService from '@shared/services/localization.service';
import NonValidatingDocumentCombiner from './non-validating-document-combiner';

/** Within type T, recursively change all properties to be optional */
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

/** Within type T, recursively change properties that were of type A to be of type B */
type ReplaceType<T, A, B> = T extends A
  ? B
  : T extends object
    ? { [K in keyof T]: ReplaceType<T[K], A, B> }
    : T;

export type LocalizedMenus = ReplaceType<PlatformMenus, LocalizeKey, string>;

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

async function localizeColumns(
  columns: ReplaceType<ColumnsWithHeaders, LocalizeKey, string> | undefined,
) {
  if (!columns) return;
  const strings: string[] = [];
  Object.getOwnPropertyNames(columns).forEach((columnName: string) => {
    // TS doesn't allow `columnName` above to be a ReferencedItem even though the type says it is
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const column = columns[columnName as ReferencedItem];
    if (!!column && typeof column === 'object') strings.concat([column.label]);
  });
  if (strings.length <= 0) return;

  const newStrings = await localizationService.getLocalizedStrings(strings);
  Object.getOwnPropertyNames(columns).forEach((columnName: string) => {
    // TS doesn't allow `columnName` above to be a ReferencedItem even though the type says it is
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const column = columns[columnName as ReferencedItem];
    if (!!column && typeof column === 'object') column.label = newStrings[column.label];
  });
}

async function localizeMenuItems(
  menuItems: ReplaceType<MenuItemBase, LocalizeKey, string>[] | undefined,
) {
  if (!menuItems) return;
  const strings: string[] = [];
  menuItems.forEach((menuItem) => {
    strings.concat([menuItem.label]);
    if (menuItem.tooltip) strings.concat([menuItem.tooltip]);
    if (menuItem.searchTerms) strings.concat([menuItem.searchTerms]);
  });
  if (strings.length <= 0) return;

  const newStrings = await localizationService.getLocalizedStrings(strings);
  menuItems.forEach((menuItem) => {
    menuItem.label = newStrings[menuItem.label];
    if (menuItem.tooltip) menuItem.tooltip = newStrings[menuItem.tooltip];
    if (menuItem.searchTerms) menuItem.searchTerms = newStrings[menuItem.searchTerms];
  });
}

// #endregion

/**
 * Provides the ability to combine a set of JSON documents (in the form of JS objects) that
 * represent menus in Platform.Bible. The starting document is expected to be provided by the
 * platform, and all the contribution documents are expected to be provided by extensions.
 */
export default class MenuDocumentCombiner extends DocumentCombinerEngine {
  private localizedOutput: LocalizedMenus | undefined;
  private originalOutputThatWasLocalized: JsonDocumentLike | undefined;

  constructor(baseDocument: JsonDocumentLike) {
    super(baseDocument, { copyDocuments: false, ignoreDuplicateProperties: false });
  }

  /**
   * Get the latest menu document without replacing any LocalizeKey values with their localized
   * strings. Document composition and validation has been completed with this output.
   *
   * Use `getCurrentMenus` instead if you want the final menu document including localizations.
   */
  get rawOutput(): PlatformMenus | undefined {
    // TS type should be valid since schema validation has been completed
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return this.latestOutput as PlatformMenus;
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
  async getCurrentMenus(): Promise<LocalizedMenus | undefined> {
    if (!this.latestOutput) return undefined;
    if (this.originalOutputThatWasLocalized === this.latestOutput) return this.localizedOutput;

    this.originalOutputThatWasLocalized = this.latestOutput;
    // Assert the output type we are transforming the combined document into
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const retVal = deepClone(this.originalOutputThatWasLocalized) as LocalizedMenus;

    await Promise.all([
      localizeColumns(retVal.mainMenu.columns),
      localizeMenuItems(retVal.mainMenu.items),
      localizeColumns(retVal.defaultWebViewTopMenu.columns),
      localizeMenuItems(retVal.defaultWebViewTopMenu.items),
      localizeMenuItems(retVal.defaultWebViewContextMenu.items),
      Object.getOwnPropertyNames(retVal.webViewMenus).map(async (webViewName: string) => {
        // TS doesn't allow `webViewName` above to be a ReferencedItem even though the type says it is
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const typedWebViewName = webViewName as ReferencedItem;
        const webViewMenu = retVal.webViewMenus[typedWebViewName];
        await Promise.all([
          localizeColumns(webViewMenu.topMenu?.columns),
          localizeMenuItems(webViewMenu.topMenu?.items),
          localizeMenuItems(webViewMenu.contextMenu?.items),
        ]);
      }),
    ]);

    // Save the transformed output in case someone asks for it again
    this.localizedOutput = retVal;
    return retVal;
  }

  // We have to implement abstract methods but don't need to use `this`
  // eslint-disable-next-line class-methods-use-this
  protected validateStartingDocument(baseDocument: JsonDocumentLike): void {
    // The starting document has to validate against the output schema, too
    performSchemaValidation(baseDocument, 'starting');
  }

  protected validateContribution(documentName: string, document: JsonDocumentLike): void {
    // We know that latestOutput matches the type due to schema validation
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const currentMenus = this.latestOutput as PlatformMenus;

    // Type assert all menu properties as partial to make it easier to work with
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const newMenus = document as DeepPartial<PlatformMenus>;
    const namePrefix = documentName ? `${documentName}.` : '';

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

  // Combine the webview menu defaults for any web views that indicate that is desired
  // We have to implement abstract methods but don't need to use `this`
  // eslint-disable-next-line class-methods-use-this
  protected transformFinalOutput(finalOutput: JsonDocumentLike): JsonDocumentLike {
    // The document given to us should be of this type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const retVal = finalOutput as PlatformMenus;
    Object.getOwnPropertyNames(retVal.webViewMenus).forEach((webViewName: string) => {
      // TS doesn't allow `webViewName` above to be a ReferencedItem even though the type says it is
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const typedWebViewName = webViewName as ReferencedItem;
      const webViewMenu = retVal.webViewMenus[typedWebViewName];

      // Check if we need to fold the default menus into this web view's menus
      if (!webViewMenu.includeDefaults) return;
      const options: DocumentCombinerOptions = {
        copyDocuments: false,
        ignoreDuplicateProperties: true,
      };

      const startingTopMenu = webViewMenu.topMenu ?? {};
      const topMenuCombiner = new NonValidatingDocumentCombiner(startingTopMenu, options);
      topMenuCombiner.addOrUpdateContribution('', retVal.defaultWebViewTopMenu);
      // Assert that type that schema validation should have already sorted out
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      webViewMenu.topMenu = topMenuCombiner.output as MultiColumnMenu | undefined;

      const startingContextMenu = webViewMenu.contextMenu ?? {};
      const contextMenuCombiner = new NonValidatingDocumentCombiner(startingContextMenu, options);
      contextMenuCombiner.addOrUpdateContribution('', retVal.defaultWebViewContextMenu);
      // Assert that type that schema validation should have already sorted out
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      webViewMenu.contextMenu = contextMenuCombiner.output as SingleColumnMenu | undefined;
    });
    return retVal;
  }
}
