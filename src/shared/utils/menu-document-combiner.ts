import {
  DocumentCombiner,
  DocumentCombinerOptions,
  JsonDocumentLike,
  deepClone,
  PlatformMenus,
  MultiColumnMenu,
  SingleColumnMenu,
  ColumnsWithHeaders,
  GroupsInSingleColumnMenu,
  GroupsInMultiColumnMenu,
  MenuItemBase,
  MenuItemContainingSubmenu,
  MenuItemContainingCommand,
  ReferencedItem,
  menuDocumentSchema,
  NonValidatingDocumentCombiner,
  DeepPartial,
  Localized,
  startsWith,
  substring,
} from 'platform-bible-utils';
import Ajv2020 from 'ajv/dist/2020';
import localizationService from '@shared/services/localization.service';

export type LocalizedMenus = Localized<PlatformMenus>;

// #region Helper functions

const ajv = new Ajv2020();
const validate = ajv.compile(menuDocumentSchema);

function performSchemaValidation(document: JsonDocumentLike, docType: string): void {
  if (!validate(document))
    throw new Error(`Invalid ${docType} menu document: ${ajv.errorsText(validate.errors)}`);
}

/** Remove '%' from the beginning and ending of the input string */
function removePercentSigns(localizeKey: string): string {
  return substring(localizeKey, 1, localizeKey.length - 1);
}

function checkNewColumns(
  newColumns: DeepPartial<ColumnsWithHeaders> | undefined,
  namePrefix: string,
  currentColumns: ColumnsWithHeaders | undefined,
) {
  if (!newColumns) return;
  Object.getOwnPropertyNames(newColumns).forEach((columnName: string) => {
    if (!columnName) return;
    if (!startsWith(columnName, namePrefix))
      throw new Error(`Column name ${columnName} does not start with ${namePrefix}`);
    if (!!currentColumns && currentColumns.isExtensible !== true)
      throw new Error(`Cannot add new column ${columnName} because isExtensible is not set`);
  });
}

function checkNewGroups(
  newGroups: DeepPartial<GroupsInMultiColumnMenu | GroupsInSingleColumnMenu> | undefined,
  namePrefix: string,
  currentColumns: ColumnsWithHeaders | undefined,
) {
  if (!newGroups) return;
  Object.getOwnPropertyNames(newGroups).forEach((groupName: string) => {
    // TS doesn't allow `groupName` above to be a ReferencedItem even though the type says it is
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const group = newGroups[groupName as ReferencedItem];
    if (!group) return;
    if (!startsWith(groupName, namePrefix))
      throw new Error(`Group name ${groupName} does not start with ${namePrefix}`);
    if ('column' in group && group.column) {
      if (!currentColumns) return;
      const targetColumn = currentColumns[group.column];
      if (targetColumn && targetColumn.isExtensible !== true)
        throw new Error(`Cannot add new group ${groupName} because isExtensible is not set`);
    } else if ('menuItem' in group && group.menuItem) {
      const targetMenuItemName = group.menuItem;
      if (!startsWith(targetMenuItemName, namePrefix))
        throw new Error(`Cannot add new group ${groupName} to a submenu owned by something else`);
    }
  });
}

function checkNewMenuItems(
  newMenuItems: DeepPartial<(MenuItemContainingCommand | MenuItemContainingSubmenu)[]> | undefined,
  namePrefix: string,
  currentGroups: GroupsInSingleColumnMenu | GroupsInMultiColumnMenu | undefined,
) {
  if (!newMenuItems) return;
  newMenuItems.forEach((menuItem) => {
    if (!menuItem) return;
    if ('id' in menuItem && menuItem.id && !startsWith(menuItem.id, namePrefix))
      throw new Error(`Menu item ID ${menuItem.id} does not start with ${namePrefix}`);
    const targetGroupName = menuItem.group;
    if (targetGroupName && !startsWith(targetGroupName, namePrefix)) {
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

function checkMenuGroupsForDuplicateOrdering(
  groups: GroupsInSingleColumnMenu | GroupsInMultiColumnMenu | undefined,
) {
  if (!groups) return;
  const menuGroupsInColumns = new Map<string, Set<number>>();
  const menuGroupsInSubmenus = new Map<string, Set<number>>();
  Object.getOwnPropertyNames(groups).forEach((groupName: string) => {
    // TS doesn't allow `groupName` above to be a ReferencedItem even though the type says it is
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const group = groups[groupName as ReferencedItem];
    let groupSet: Set<number> | undefined;
    if ('column' in group) groupSet = getOrAssign(menuGroupsInColumns, group.column);
    else if ('menuItem' in group) groupSet = getOrAssign(menuGroupsInSubmenus, group.menuItem);
    // Single column menus don't reference a column name
    else groupSet = getOrAssign(menuGroupsInColumns, '__SINGLE_COLUMN__');
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

async function localizeColumns(columns: Localized<ColumnsWithHeaders> | undefined) {
  if (!columns) return;
  let strings: string[] = [];
  Object.getOwnPropertyNames(columns).forEach((columnName: string) => {
    // TS doesn't allow `columnName` above to be a ReferencedItem even though the type says it is
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const column = columns[columnName as ReferencedItem];
    if (!!column && typeof column === 'object')
      strings = strings.concat([removePercentSigns(column.label)]);
  });
  if (strings.length <= 0) return;

  const newStrings = await localizationService.getLocalizedStrings(strings);
  Object.getOwnPropertyNames(columns).forEach((columnName: string) => {
    // TS doesn't allow `columnName` above to be a ReferencedItem even though the type says it is
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const column = columns[columnName as ReferencedItem];
    if (!!column && typeof column === 'object')
      column.label = newStrings[removePercentSigns(column.label)];
  });
}

async function localizeMenuItems(menuItems: Localized<MenuItemBase>[] | undefined) {
  if (!menuItems) return;
  let strings: string[] = [];
  menuItems.forEach((menuItem) => {
    strings = strings.concat([removePercentSigns(menuItem.label)]);
    if (menuItem.tooltip) strings = strings.concat([removePercentSigns(menuItem.tooltip)]);
    if (menuItem.searchTerms) strings = strings.concat([removePercentSigns(menuItem.searchTerms)]);
  });
  if (strings.length <= 0) return;

  const newStrings = await localizationService.getLocalizedStrings(strings);
  menuItems.forEach((menuItem) => {
    menuItem.label = newStrings[removePercentSigns(menuItem.label)];
    if (menuItem.tooltip) menuItem.tooltip = newStrings[removePercentSigns(menuItem.tooltip)];
    if (menuItem.searchTerms)
      menuItem.searchTerms = newStrings[removePercentSigns(menuItem.searchTerms)];
  });
}

// #endregion

/**
 * Provides the ability to combine a set of JSON documents (in the form of JS objects) that
 * represent menus in Platform.Bible. The starting document is expected to be provided by the
 * platform, and all the contribution documents are expected to be provided by extensions.
 */
export default class MenuDocumentCombiner extends DocumentCombiner {
  private localizedOutput: LocalizedMenus | undefined;
  private originalOutputThatWasLocalized: JsonDocumentLike | undefined;

  constructor(baseDocument: JsonDocumentLike) {
    super(baseDocument, {
      copyDocuments: false,
      ignoreDuplicateProperties: false,
      ignoreDuplicateArrayItems: false,
    });
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

  // We don't need `this` on this override method
  // eslint-disable-next-line class-methods-use-this
  protected override validateBaseDocument(baseDocument: JsonDocumentLike): void {
    // The starting document has to validate against the output schema, too
    performSchemaValidation(baseDocument, 'starting');
  }

  protected override validateContribution(documentName: string, document: JsonDocumentLike): void {
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

      if (!currentWebView && !startsWith(webViewName, namePrefix))
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

  // We don't need `this` on this override method
  // eslint-disable-next-line class-methods-use-this
  protected override validateOutput(output: JsonDocumentLike): void {
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
  // We don't need `this` on this override method
  // eslint-disable-next-line class-methods-use-this
  protected override transformFinalOutputBeforeValidation(
    finalOutput: JsonDocumentLike,
  ): JsonDocumentLike {
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
        ignoreDuplicateArrayItems: false,
      };

      const startingTopMenu = webViewMenu.topMenu ?? {};
      const topMenuCombiner = new NonValidatingDocumentCombiner(startingTopMenu, options);
      topMenuCombiner.addOrUpdateContribution('', retVal.defaultWebViewTopMenu);
      // Assert the type that schema validation should have already sorted out
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      webViewMenu.topMenu = topMenuCombiner.output as MultiColumnMenu | undefined;

      const startingContextMenu = webViewMenu.contextMenu ?? {};
      const contextMenuCombiner = new NonValidatingDocumentCombiner(startingContextMenu, options);
      contextMenuCombiner.addOrUpdateContribution('', retVal.defaultWebViewContextMenu);
      // Assert the type that schema validation should have already sorted out
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      webViewMenu.contextMenu = contextMenuCombiner.output as SingleColumnMenu | undefined;
    });
    return retVal;
  }
}
