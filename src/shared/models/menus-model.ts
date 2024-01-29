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
  column: string;
};

/** Group of menu items that belongs in a submenu */
export type MenuGroupDetailsInSubMenu = OrderedExtensibleContainer & {
  /** ID of menu item hosting the submenu in which this group resides */
  menuItem: string;
};

/** Column that includes header text in a menu */
export type MenuColumnWithHeader = OrderedExtensibleContainer & {
  /** Key that represents the text of the header text of the column */
  label: string;
};

export type MenuItemBase = OrderedItem & {
  /** Menu group to which this menu item belongs */
  group: string;
  /** Key that represents the text of this menu item to display */
  label: string;
  /** Key that represents words the platform should reference when users are searching for menu items */
  searchTerms?: string;
  /** Key that represents the text to display if a mouse pointer hovers over the menu item */
  tooltip?: string;
};

/** Menu item that hosts a submenu */
export type MenuItemContainingSubmenu = MenuItemBase & {
  /** ID for this menu item that holds a submenu */
  id: string;
};

/** Menu item that runs a command */
export type MenuItemContainingCommand = MenuItemBase & {
  /** Name of the PAPI command to run when this menu item is selected. */
  command: string;
  /** Path to the icon to display on the right side of the menu text */
  iconPathAfter?: string;
  /** Path to the icon to display on the left side of the menu text */
  iconPathBefore?: string;
};

/**
 * Group of menu items that can be combined with other groups to form a single menu/submenu. Groups
 * are separated using a line within the menu/submenu.
 */
export type Groups = {
  /** Named menu group */
  [property: string]: MenuGroupDetailsInColumn | MenuGroupDetailsInSubMenu;
};

/** Group of columns that can be combined with other columns to form a multi-column menu */
export type ColumnsWithHeaders = {
  /** Named column of a menu */
  [property: string]: MenuColumnWithHeader | boolean | undefined;
  /** Defines whether columns can be added to this multi-column menu */
  isExtensible?: boolean;
};

/** Menu that contains a column without a header */
export type SingleColumnMenu = {
  /** Groups that belong in this menu */
  groups: Groups;
  /** List of menu items that belong in this menu */
  items: [MenuItemContainingCommand | MenuItemContainingSubmenu];
};

/** Menu that contains multiple columns with headers */
export type MultiColumnMenu = SingleColumnMenu & {
  /** Columns that belong in this menu */
  columns: ColumnsWithHeaders;
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
  [property: string]: WebViewMenu;
};

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
