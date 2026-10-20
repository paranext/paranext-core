import { describe, expect, it } from 'vitest';
import type { ColumnsWithHeaders, Localized, MultiColumnMenu } from 'platform-bible-utils';
import {
  getColumnGroupKeys,
  getItemsInGroups,
  getLeadingIconSlot,
  getMenuSectionsWithItems,
  getSortedMenuColumns,
  getSubMenuGroupKeysForMenuItemId,
} from './menu.util';

/** Columns carrying the extensibility flags a served menu puts alongside the columns themselves */
const COLUMNS_WITH_FLAGS: Localized<ColumnsWithHeaders> = {
  'platformScriptureEditor.insert': { label: 'Insert', order: 5 },
  isExtensible: true,
  'platform.app': { label: 'Project', order: 1 },
  isExperimental: false,
};

/**
 * A menu whose Tools column holds one submenu item, plus the submenu's own group. The submenu group
 * names its host item rather than a column.
 */
const MENU_WITH_SUBMENU: Localized<MultiColumnMenu> = {
  columns: {
    'platform.app': { label: 'Project', order: 1 },
    'platformScriptureEditor.tools': { label: 'Tools', order: 4 },
  },
  groups: {
    'platform.projectTop': { column: 'platform.app', order: 1 },
    'platformScriptureEditor.inventories': { column: 'platformScriptureEditor.tools', order: 1 },
    'platformScriptureEditor.inventoriesSubmenu': {
      menuItem: 'platformScriptureEditor.inventoriesMenuItem',
      order: 1,
    },
  },
  items: [
    {
      label: 'Open Project Settings…',
      localizeNotes: '',
      group: 'platform.projectTop',
      order: 1,
      command: 'platform.openSettings',
    },
    {
      label: 'Inventories',
      localizeNotes: '',
      group: 'platformScriptureEditor.inventories',
      order: 1,
      id: 'platformScriptureEditor.inventoriesMenuItem',
    },
    {
      label: 'Markers',
      localizeNotes: '',
      group: 'platformScriptureEditor.inventoriesSubmenu',
      order: 1,
      command: 'platformScripture.openMarkersInventory',
    },
  ],
};

describe('getSortedMenuColumns', () => {
  it('sorts the columns by `order`', () => {
    expect(getSortedMenuColumns(COLUMNS_WITH_FLAGS).map(({ columnKey }) => columnKey)).toEqual([
      'platform.app',
      'platformScriptureEditor.insert',
    ]);
  });

  it('leaves out the boolean flags kept alongside the columns', () => {
    const columnKeys = getSortedMenuColumns(COLUMNS_WITH_FLAGS).map(({ columnKey }) => columnKey);

    expect(columnKeys).not.toContain('isExtensible');
    expect(columnKeys).not.toContain('isExperimental');
    expect(columnKeys).toHaveLength(2);
  });
});

describe('getMenuSectionsWithItems', () => {
  it('leaves the boolean flags out of the sections', () => {
    const sections = getMenuSectionsWithItems({
      ...MENU_WITH_SUBMENU,
      columns: { ...MENU_WITH_SUBMENU.columns, isExtensible: true },
    });

    expect(sections.map(({ columnKey }) => columnKey)).toEqual([
      'platform.app',
      'platformScriptureEditor.tools',
    ]);
  });

  it('gives a section to each column with items, labeled and sorted by `order`', () => {
    expect(getMenuSectionsWithItems(MENU_WITH_SUBMENU)).toEqual([
      { columnKey: 'platform.app', label: 'Project', isHeaderHidden: false },
      { columnKey: 'platformScriptureEditor.tools', label: 'Tools', isHeaderHidden: false },
    ]);
  });

  it("carries a column's isHeaderHidden into its section", () => {
    const sections = getMenuSectionsWithItems({
      ...MENU_WITH_SUBMENU,
      columns: {
        ...MENU_WITH_SUBMENU.columns,
        'platformScriptureEditor.tools': {
          ...MENU_WITH_SUBMENU.columns['platformScriptureEditor.tools'],
          isHeaderHidden: true,
        },
      },
    });

    expect(sections.map(({ isHeaderHidden }) => isHeaderHidden)).toEqual([false, true]);
  });

  it('gives no section of its own to a submenu group, whose items belong to no column', () => {
    // Emptying the column group leaves Tools with only its submenu group's items, which sit inside
    // the submenu rather than in the column
    const sections = getMenuSectionsWithItems({
      ...MENU_WITH_SUBMENU,
      items: MENU_WITH_SUBMENU.items.filter(
        (item) => item.group !== 'platformScriptureEditor.inventories',
      ),
    });

    expect(sections.map(({ columnKey }) => columnKey)).toEqual(['platform.app']);
  });

  it('gives a section to a column that a group of the same key fills, as the menu renders it', () => {
    // `TabDropdownMenu` renders a group whose KEY is the column key under that column, so a column
    // filled only that way still has something to show
    const sections = getMenuSectionsWithItems({
      ...MENU_WITH_SUBMENU,
      groups: {
        ...MENU_WITH_SUBMENU.groups,
        'platformScriptureEditor.tools': {
          order: 2,
          menuItem: 'platformScriptureEditor.unusedMenuItem',
        },
      },
      items: [
        ...MENU_WITH_SUBMENU.items.filter(
          (item) => item.group !== 'platformScriptureEditor.inventories',
        ),
        {
          label: 'Open Markers Inventory…',
          localizeNotes: '',
          group: 'platformScriptureEditor.tools',
          order: 1,
          command: 'platformScripture.openMarkersInventory',
        },
      ],
    });

    expect(sections.map(({ columnKey }) => columnKey)).toEqual([
      'platform.app',
      'platformScriptureEditor.tools',
    ]);
  });
});

describe('getColumnGroupKeys', () => {
  it('returns the groups that name the column or are keyed by it, sorted by `order`', () => {
    // Stored out of order, so the result can only be right by sorting
    const groups: Localized<MultiColumnMenu>['groups'] = {
      'test.second': { column: 'test.column', order: 2 },
      'test.elsewhere': { column: 'test.otherColumn', order: 1 },
      'test.column': { menuItem: 'test.unusedMenuItem', order: 3 },
      'test.first': { column: 'test.column', order: 1 },
    };

    expect(getColumnGroupKeys(groups, 'test.column')).toEqual([
      'test.first',
      'test.second',
      'test.column',
    ]);
  });

  it('returns an empty list when no group belongs to the column', () => {
    expect(getColumnGroupKeys(MENU_WITH_SUBMENU.groups, 'test.unknown')).toEqual([]);
  });
});

describe('getSubMenuGroupKeysForMenuItemId', () => {
  it('returns every group that points at the submenu item, sorted by `order`', () => {
    // Stored out of order, so the result can only be right by sorting
    const groups: Localized<MultiColumnMenu>['groups'] = {
      'test.editFind': { menuItem: 'test.editSubmenu', order: 2 },
      'test.other': { menuItem: 'test.otherSubmenu', order: 1 },
      'test.top': { column: 'test.project', order: 1 },
      'test.editActions': { menuItem: 'test.editSubmenu', order: 1 },
    };

    expect(getSubMenuGroupKeysForMenuItemId(groups, 'test.editSubmenu')).toEqual([
      'test.editActions',
      'test.editFind',
    ]);
  });

  it('returns the single group of a submenu that has one', () => {
    expect(
      getSubMenuGroupKeysForMenuItemId(
        MENU_WITH_SUBMENU.groups,
        'platformScriptureEditor.inventoriesMenuItem',
      ),
    ).toEqual(['platformScriptureEditor.inventoriesSubmenu']);
  });

  it('returns an empty list when no group points at the item', () => {
    expect(getSubMenuGroupKeysForMenuItemId(MENU_WITH_SUBMENU.groups, 'test.unknown')).toEqual([]);
  });
});

describe('getLeadingIconSlot', () => {
  it('reserves no slot for an empty list or a list without leading icons', () => {
    expect(getLeadingIconSlot([])).toBe('none');
    expect(getLeadingIconSlot([{}, { iconNameBefore: undefined }])).toBe('none');
  });

  it('reserves an icon slot when any item has a named leading icon', () => {
    expect(getLeadingIconSlot([{}, { iconNameBefore: 'search' }])).toBe('icon');
  });

  it('reserves an image slot when only image paths are used', () => {
    expect(getLeadingIconSlot([{}, { iconPathBefore: 'https://example.test/a.svg' }])).toBe(
      'image',
    );
  });

  it('prefers the named icon when both kinds appear, as MenuItemIcon does', () => {
    expect(
      getLeadingIconSlot([
        { iconPathBefore: 'https://example.test/a.svg' },
        { iconNameBefore: 'search' },
      ]),
    ).toBe('icon');
  });

  it('ignores trailing icons', () => {
    const trailingOnly = [
      { iconNameBefore: undefined, iconNameAfter: 'search' },
      { iconNameBefore: undefined, iconPathAfter: 'x.svg' },
    ];
    expect(getLeadingIconSlot(trailingOnly)).toBe('none');
  });
});

describe('getItemsInGroups', () => {
  it('keeps only the items of the given groups', () => {
    const items = [
      { group: 'a', id: 1 },
      { group: 'b', id: 2 },
      { group: 'c', id: 3 },
    ];
    expect(getItemsInGroups(items, ['a', 'c']).map((item) => item.id)).toEqual([1, 3]);
    expect(getItemsInGroups(items, [])).toEqual([]);
  });
});
