import { describe, expect, it } from 'vitest';
import type { ColumnsWithHeaders, Localized, MultiColumnMenu } from 'platform-bible-utils';
import {
  buildMenuTree,
  getColumnGroupKeys,
  getItemsInGroups,
  getLeadingIconSlot,
  getMenuSectionsWithItems,
  getSortedMenuColumns,
  getSubMenuGroupKeysForMenuItemId,
  joinGroupsWithSeparators,
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

  it('reserves the same icon slot when only image paths are used', () => {
    expect(getLeadingIconSlot([{}, { iconPathBefore: 'https://example.test/a.svg' }])).toBe('icon');
  });

  it('reserves one icon slot when both kinds appear', () => {
    expect(
      getLeadingIconSlot([
        { iconPathBefore: 'https://example.test/a.svg' },
        { iconNameBefore: 'search' },
      ]),
    ).toBe('icon');
  });

  it('treats an unknown icon name as no icon', () => {
    expect(getLeadingIconSlot([{ iconNameBefore: 'not-a-known-icon' }])).toBe('none');
  });

  it('falls back to the image path beside an unknown icon name', () => {
    expect(
      getLeadingIconSlot([
        { iconNameBefore: 'not-a-known-icon', iconPathBefore: 'https://example.test/a.svg' },
      ]),
    ).toBe('icon');
  });

  it('reserves the icon slot when any item is a checkbox item', () => {
    expect(getLeadingIconSlot([{}, { checked: false }])).toBe('icon');
    expect(getLeadingIconSlot([{}, { checked: true }])).toBe('icon');
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

describe('joinGroupsWithSeparators', () => {
  const join = (groups: [string, string[]][]) =>
    joinGroupsWithSeparators(
      groups.map(([groupKey, items]) => ({ groupKey, items })),
      (groupKey) => `--${groupKey}`,
    );

  it('puts one separator between two groups that have items', () => {
    expect(
      join([
        ['a', ['a1', 'a2']],
        ['b', ['b1']],
      ]),
    ).toEqual(['a1', 'a2', '--b', 'b1']);
  });

  /** Each case: a description, the groups as `[groupKey, items]`, and the joined result */
  const emptiedGroupCases: [string, [string, string[]][], string[]][] = [
    [
      'a leading group',
      [
        ['a', []],
        ['b', ['b1']],
        ['c', ['c1']],
      ],
      ['b1', '--c', 'c1'],
    ],
    [
      'a middle group',
      [
        ['a', ['a1']],
        ['b', []],
        ['c', ['c1']],
      ],
      ['a1', '--c', 'c1'],
    ],
    [
      'a trailing group',
      [
        ['a', ['a1']],
        ['b', ['b1']],
        ['c', []],
      ],
      ['a1', '--b', 'b1'],
    ],
  ];

  it.each(emptiedGroupCases)(
    'leaves no stray separator for %s with no items',
    (_, groups, expected) => {
      expect(join(groups)).toEqual(expected);
    },
  );

  it('returns nothing when every group is empty', () => {
    expect(
      join([
        ['a', []],
        ['b', []],
      ]),
    ).toEqual([]);
    expect(join([])).toEqual([]);
  });
});

describe('buildMenuTree', () => {
  const command = (label: string, group: string, order: number) => ({
    label,
    localizeNotes: '',
    group,
    order,
    command: `cmd.${label}`,
  });
  const submenu = (label: string, group: string, order: number, id: string) => ({
    label,
    localizeNotes: '',
    group,
    order,
    id,
  });

  const MENU: Localized<MultiColumnMenu> = {
    columns: {
      'col.b': { label: 'B', order: 2 },
      isExtensible: true,
      'col.a': { label: 'A', order: 1 },
    },
    groups: {
      'group.a2': { column: 'col.a', order: 2 },
      'group.a1': { column: 'col.a', order: 1 },
      'group.b': { column: 'col.b', order: 1 },
      'group.sub': { menuItem: 'item.submenu', order: 1 },
      'group.subSub': { menuItem: 'item.subSubmenu', order: 1 },
    },
    items: [
      command('A2', 'group.a2', 1),
      command('A1second', 'group.a1', 2),
      command('A1first', 'group.a1', 1),
      submenu('Submenu', 'group.b', 1, 'item.submenu'),
      command('SubItem', 'group.sub', 2),
      submenu('SubSub', 'group.sub', 1, 'item.subSubmenu'),
      command('Deep', 'group.subSub', 1),
      command('Orphan', 'group.unknown', 1),
    ],
  };

  it('sorts columns, groups and items', () => {
    const tree = buildMenuTree(MENU);
    expect(tree.columns.map(({ columnKey }) => columnKey)).toEqual(['col.a', 'col.b']);
    expect(tree.columns[0].groups.map(({ groupKey }) => groupKey)).toEqual([
      'group.a1',
      'group.a2',
    ]);
    expect(tree.columns[0].groups[0].items.map(({ item }) => item.label)).toEqual([
      'A1first',
      'A1second',
    ]);
  });

  it('resolves submenu groups recursively', () => {
    const tree = buildMenuTree(MENU);
    const submenuNode = tree.columns[1].groups[0].items[0];
    expect(submenuNode.subGroups?.map(({ groupKey }) => groupKey)).toEqual(['group.sub']);
    const subItems = submenuNode.subGroups?.[0].items;
    expect(subItems?.map(({ item }) => item.label)).toEqual(['SubSub', 'SubItem']);
    expect(subItems?.[0].subGroups?.[0].items.map(({ item }) => item.label)).toEqual(['Deep']);
    expect(subItems?.[1].subGroups).toBeUndefined();
  });

  it('drops an item whose group is unknown', () => {
    const labels = buildMenuTree(MENU)
      .columns.flatMap(({ groups }) => groups)
      .flatMap(({ items }) => items.map(({ item }) => item.label));
    expect(labels).not.toContain('Orphan');
  });

  it('gives an empty tree for undefined menu data', () => {
    expect(buildMenuTree(undefined)).toEqual({ columns: [] });
  });
});
