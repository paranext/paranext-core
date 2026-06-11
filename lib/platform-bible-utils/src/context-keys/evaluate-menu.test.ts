import { vi } from 'vitest';
import { MultiColumnMenu, SingleColumnMenu } from '../extension-contributions/menus.model';
import { ContextKeyValue } from './context-keys.model';
import { evaluateMenu } from './evaluate-menu';

function makeLookup(values: Record<string, ContextKeyValue | undefined>) {
  return (key: string) => values[key];
}

function makeMultiColumnMenu(): MultiColumnMenu {
  return {
    columns: {
      'test.colA': { label: '%colA%', order: 1 },
      'test.colB': { label: '%colB%', order: 2 },
    },
    groups: {
      'test.groupA': { column: 'test.colA', order: 1 },
      'test.groupB': { column: 'test.colB', order: 1 },
      'test.submenuGroup': { menuItem: 'test.submenu', order: 1 },
    },
    items: [
      {
        label: '%plain%',
        group: 'test.groupA',
        order: 1,
        command: 'test.plain',
        localizeNotes: '',
      },
      {
        label: '%conditional%',
        group: 'test.groupA',
        order: 2,
        command: 'test.conditional',
        localizeNotes: '',
        when: 'test.showIt',
      },
      {
        label: '%toggleable%',
        group: 'test.groupA',
        order: 3,
        command: 'test.toggle',
        localizeNotes: '',
        enabledWhen: 'test.canToggle',
        checkedWhen: 'test.isToggled',
      },
      {
        label: '%submenu%',
        group: 'test.groupB',
        order: 1,
        id: 'test.submenu',
        localizeNotes: '',
      },
      {
        label: '%inSubmenu%',
        group: 'test.submenuGroup',
        order: 1,
        command: 'test.inSubmenu',
        localizeNotes: '',
        when: 'test.showSubmenuItem',
      },
    ],
  };
}

describe('evaluateMenu', () => {
  it('keeps items without expressions and conditionally visible items', () => {
    const result = evaluateMenu(
      makeMultiColumnMenu(),
      makeLookup({ 'test.showIt': true, 'test.showSubmenuItem': true }),
    );
    const labels = result.items.map((item) => item.label);
    expect(labels).toContain('%plain%');
    expect(labels).toContain('%conditional%');
    expect(labels).toContain('%submenu%');
  });

  it('does not mutate the input menu', () => {
    const menu = makeMultiColumnMenu();
    const itemCountBefore = menu.items.length;
    evaluateMenu(menu, makeLookup({}));
    expect(menu.items.length).toBe(itemCountBefore);
    expect(menu.items.some((item) => item.when !== undefined)).toBe(true);
  });

  it('hides items whose when evaluates falsy and strips expression fields', () => {
    const result = evaluateMenu(
      makeMultiColumnMenu(),
      makeLookup({ 'test.showSubmenuItem': true }),
    );
    const labels = result.items.map((item) => item.label);
    expect(labels).not.toContain('%conditional%');
    expect(result.items.every((item) => item.when === undefined)).toBe(true);
    expect(result.items.every((item) => item.enabledWhen === undefined)).toBe(true);
  });

  it('sets disabled from enabledWhen and checked from checkedWhen', () => {
    const result = evaluateMenu(
      makeMultiColumnMenu(),
      makeLookup({ 'test.canToggle': false, 'test.isToggled': true, 'test.showSubmenuItem': true }),
    );
    const toggleable = result.items.find((item) => item.label === '%toggleable%');
    expect(toggleable?.disabled).toBe(true);
    // checked only exists on command items
    expect(toggleable && 'checked' in toggleable && toggleable.checked).toBe(true);
    const plain = result.items.find((item) => item.label === '%plain%');
    expect(plain?.disabled).toBeUndefined();
    expect(plain && 'checked' in plain ? plain.checked : undefined).toBeUndefined();
  });

  it('prunes submenu items whose submenus have no visible items, and empty groups/columns', () => {
    // showSubmenuItem falsy -> %inSubmenu% hidden -> submenu pruned -> groupB empty -> colB pruned
    const result = evaluateMenu(makeMultiColumnMenu(), makeLookup({ 'test.showIt': true }));
    const labels = result.items.map((item) => item.label);
    expect(labels).not.toContain('%inSubmenu%');
    expect(labels).not.toContain('%submenu%');
    expect(Object.keys(result.groups)).not.toContain('test.submenuGroup');
    expect(Object.keys(result.groups)).not.toContain('test.groupB');
    expect(Object.keys(result.columns)).not.toContain('test.colB');
    expect(Object.keys(result.columns)).toContain('test.colA');
  });

  it('leaves submenus, groups, and columns that have no items in the document alone', () => {
    // A submenu with no items in the document may be filled at open time (the tab menu's
    // move-to-window list), so only containers that evaluation emptied are pruned
    const menu: MultiColumnMenu = {
      columns: {
        'test.col': { label: '%col%', order: 1 },
        'test.emptyCol': { label: '%emptyCol%', order: 2 },
      },
      groups: {
        'test.group': { column: 'test.col', order: 1 },
        'test.emptyGroup': { column: 'test.col', order: 2 },
        'test.groupInEmptyCol': { column: 'test.emptyCol', order: 1 },
      },
      items: [
        {
          label: '%dynamicSubmenu%',
          group: 'test.group',
          order: 1,
          id: 'test.dynamicSubmenu',
          localizeNotes: '',
        },
      ],
    };
    const result = evaluateMenu(menu, makeLookup({}));
    expect(result.items.map((item) => item.label)).toEqual(['%dynamicSubmenu%']);
    expect(Object.keys(result.groups)).toEqual([
      'test.group',
      'test.emptyGroup',
      'test.groupInEmptyCol',
    ]);
    expect(Object.keys(result.columns)).toEqual(['test.col', 'test.emptyCol']);
  });

  it('prunes multi-level nested submenus bottom-up when the deepest item is hidden', () => {
    const menu: SingleColumnMenu = {
      groups: {
        'test.topGroup': { order: 1 },
        'test.outerSubmenuGroup': { menuItem: 'test.outerSubmenu', order: 1 },
        'test.innerSubmenuGroup': { menuItem: 'test.innerSubmenu', order: 1 },
      },
      items: [
        {
          label: '%outerSubmenu%',
          group: 'test.topGroup',
          order: 1,
          id: 'test.outerSubmenu',
          localizeNotes: '',
        },
        {
          label: '%innerSubmenu%',
          group: 'test.outerSubmenuGroup',
          order: 1,
          id: 'test.innerSubmenu',
          localizeNotes: '',
        },
        {
          label: '%deepLeaf%',
          group: 'test.innerSubmenuGroup',
          order: 1,
          command: 'test.deepLeaf',
          localizeNotes: '',
          when: 'test.showLeaf',
        },
      ],
    };
    // Leaf hidden -> inner submenu empties (pass 1) -> outer submenu empties (pass 2)
    const hidden = evaluateMenu(menu, makeLookup({}));
    expect(hidden.items).toEqual([]);
    expect(Object.keys(hidden.groups)).toEqual([]);
    // Leaf visible -> the whole chain stays
    const visible = evaluateMenu(menu, makeLookup({ 'test.showLeaf': true }));
    expect(visible.items.map((item) => item.label)).toEqual([
      '%outerSubmenu%',
      '%innerSubmenu%',
      '%deepLeaf%',
    ]);
  });

  it('passes template vars through to expression evaluation', () => {
    const menu: SingleColumnMenu = {
      groups: { 'test.group': { order: 1 } },
      items: [
        {
          label: '%scoped%',
          group: 'test.group',
          order: 1,
          command: 'test.scoped',
          localizeNotes: '',
          when: 'test.webView.{webViewId}.visible',
        },
      ],
    };
    const lookup = makeLookup({ 'test.webView.wv1.visible': true });
    expect(evaluateMenu(menu, lookup, { webViewId: 'wv1' }).items.length).toBe(1);
    expect(evaluateMenu(menu, lookup, { webViewId: 'wv2' }).items.length).toBe(0);
    expect(evaluateMenu(menu, lookup, {}).items.length).toBe(0);
  });

  it('fails safe on invalid expressions and reports via onError', () => {
    const menu: SingleColumnMenu = {
      groups: { 'test.group': { order: 1 } },
      items: [
        {
          label: '%broken%',
          group: 'test.group',
          order: 1,
          command: 'test.broken',
          localizeNotes: '',
          when: 'this is && not valid ((',
        },
        {
          label: '%brokenEnabled%',
          group: 'test.group',
          order: 2,
          command: 'test.brokenEnabled',
          localizeNotes: '',
          enabledWhen: '))((',
        },
      ],
    };
    const onError = vi.fn();
    const result = evaluateMenu(menu, makeLookup({}), {}, onError);
    // when error -> hidden; enabledWhen error -> disabled
    expect(result.items.map((item) => item.label)).toEqual(['%brokenEnabled%']);
    expect(result.items[0].disabled).toBe(true);
    expect(onError).toHaveBeenCalledTimes(2);
  });
});
