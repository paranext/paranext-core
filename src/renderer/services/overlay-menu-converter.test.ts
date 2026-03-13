import { describe, it, expect } from 'vitest';
import { convertContributionToContextMenuItems } from '@renderer/services/overlay-menu-converter';
import type { Localized, SingleColumnMenu } from 'platform-bible-utils';

describe('overlay-menu-converter', () => {
  describe('convertContributionToContextMenuItems', () => {
    it('should convert a simple SingleColumnMenu with 2 command items', () => {
      const menu: Localized<SingleColumnMenu> = {
        groups: {
          'ext.group1': { order: 1 },
        },
        items: [
          {
            command: 'ext.doSomething',
            group: 'ext.group1',
            label: 'Do Something',
            order: 1,
            localizeNotes: '',
          },
          {
            command: 'ext.doAnother',
            group: 'ext.group1',
            label: 'Do Another',
            order: 2,
            localizeNotes: '',
          },
        ],
      };

      const result = convertContributionToContextMenuItems(menu);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        type: 'item',
        id: 'ext.doSomething',
        label: 'Do Something',
      });
      expect(result[1]).toEqual({
        type: 'item',
        id: 'ext.doAnother',
        label: 'Do Another',
      });
    });

    it('should order items by their order field', () => {
      const menu: Localized<SingleColumnMenu> = {
        groups: {
          'ext.group1': { order: 1 },
        },
        items: [
          {
            command: 'ext.second',
            group: 'ext.group1',
            label: 'Second',
            order: 20,
            localizeNotes: '',
          },
          {
            command: 'ext.first',
            group: 'ext.group1',
            label: 'First',
            order: 10,
            localizeNotes: '',
          },
        ],
      };

      const result = convertContributionToContextMenuItems(menu);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(expect.objectContaining({ id: 'ext.first', label: 'First' }));
      expect(result[1]).toEqual(expect.objectContaining({ id: 'ext.second', label: 'Second' }));
    });

    it('should add separators between different groups', () => {
      const menu: Localized<SingleColumnMenu> = {
        groups: {
          'ext.groupA': { order: 1 },
          'ext.groupB': { order: 2 },
        },
        items: [
          {
            command: 'ext.itemA',
            group: 'ext.groupA',
            label: 'Item A',
            order: 1,
            localizeNotes: '',
          },
          {
            command: 'ext.itemB',
            group: 'ext.groupB',
            label: 'Item B',
            order: 1,
            localizeNotes: '',
          },
        ],
      };

      const result = convertContributionToContextMenuItems(menu);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(expect.objectContaining({ type: 'item', id: 'ext.itemA' }));
      expect(result[1]).toEqual({ type: 'separator' });
      expect(result[2]).toEqual(expect.objectContaining({ type: 'item', id: 'ext.itemB' }));
    });

    it('should handle submenu items with nested groups', () => {
      const menu: Localized<SingleColumnMenu> = {
        groups: {
          'ext.topGroup': { order: 1 },
          'ext.subGroup': { menuItem: 'ext.submenuItem', order: 1 },
        },
        items: [
          {
            id: 'ext.submenuItem',
            group: 'ext.topGroup',
            label: 'My Submenu',
            order: 1,
            localizeNotes: '',
          },
          {
            command: 'ext.subAction',
            group: 'ext.subGroup',
            label: 'Sub Action',
            order: 1,
            localizeNotes: '',
          },
        ],
      };

      const result = convertContributionToContextMenuItems(menu);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        type: 'submenu',
        label: 'My Submenu',
        items: [
          {
            type: 'item',
            id: 'ext.subAction',
            label: 'Sub Action',
          },
        ],
      });
    });

    it('should produce an empty array for an empty context menu', () => {
      const menu: Localized<SingleColumnMenu> = {
        groups: {},
        items: [],
      };

      const result = convertContributionToContextMenuItems(menu);

      expect(result).toEqual([]);
    });

    it('should use command field as id for MenuItemContainingCommand', () => {
      const menu: Localized<SingleColumnMenu> = {
        groups: {
          'ext.group1': { order: 1 },
        },
        items: [
          {
            command: 'myExtension.openSettings',
            group: 'ext.group1',
            label: 'Open Settings',
            order: 1,
            localizeNotes: '',
          },
        ],
      };

      const result = convertContributionToContextMenuItems(menu);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(
        expect.objectContaining({
          type: 'item',
          id: 'myExtension.openSettings',
        }),
      );
    });

    it('should order groups by their order field', () => {
      const menu: Localized<SingleColumnMenu> = {
        groups: {
          'ext.groupB': { order: 20 },
          'ext.groupA': { order: 10 },
        },
        items: [
          {
            command: 'ext.itemB',
            group: 'ext.groupB',
            label: 'Item B',
            order: 1,
            localizeNotes: '',
          },
          {
            command: 'ext.itemA',
            group: 'ext.groupA',
            label: 'Item A',
            order: 1,
            localizeNotes: '',
          },
        ],
      };

      const result = convertContributionToContextMenuItems(menu);

      // groupA (order 10) should come before groupB (order 20)
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(expect.objectContaining({ type: 'item', id: 'ext.itemA' }));
      expect(result[1]).toEqual({ type: 'separator' });
      expect(result[2]).toEqual(expect.objectContaining({ type: 'item', id: 'ext.itemB' }));
    });

    it('should handle submenu with multiple groups separated by separators', () => {
      const menu: Localized<SingleColumnMenu> = {
        groups: {
          'ext.topGroup': { order: 1 },
          'ext.subGroupA': { menuItem: 'ext.mySubmenu', order: 1 },
          'ext.subGroupB': { menuItem: 'ext.mySubmenu', order: 2 },
        },
        items: [
          {
            id: 'ext.mySubmenu',
            group: 'ext.topGroup',
            label: 'Submenu',
            order: 1,
            localizeNotes: '',
          },
          {
            command: 'ext.subA',
            group: 'ext.subGroupA',
            label: 'Sub A',
            order: 1,
            localizeNotes: '',
          },
          {
            command: 'ext.subB',
            group: 'ext.subGroupB',
            label: 'Sub B',
            order: 1,
            localizeNotes: '',
          },
        ],
      };

      const result = convertContributionToContextMenuItems(menu);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        type: 'submenu',
        label: 'Submenu',
        items: [
          { type: 'item', id: 'ext.subA', label: 'Sub A' },
          { type: 'separator' },
          { type: 'item', id: 'ext.subB', label: 'Sub B' },
        ],
      });
    });
  });
});
