import { describe, expect, it } from 'vitest';
import type { ColumnsWithHeaders, Localized, MultiColumnMenu } from 'platform-bible-utils';
import { getMenuSectionsWithItems, getSortedMenuColumns } from './menu.util';

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
