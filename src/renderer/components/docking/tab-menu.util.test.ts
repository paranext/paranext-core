import { describe, expect, test } from 'vitest';
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';
import {
  buildTabMenuItems,
  MOVE_TO_WINDOW_TARGET_ID_PREFIX,
  type TabMenuContext,
} from '@renderer/components/docking/tab-menu.util';

const floatItem: OverlayContextMenuItem = {
  type: 'item',
  id: 'platform.floatTab',
  label: 'Float tab',
};
const moveToNewWindowItem: OverlayContextMenuItem = {
  type: 'item',
  id: 'platform.moveWebViewToNewWindow',
  label: 'Move tab to new window',
};
const moveToWindowSubmenu: OverlayContextMenuItem = {
  type: 'submenu',
  id: 'platform.moveTabToWindow',
  label: 'Move tab to window',
  items: [],
};

const CONTRIBUTED = [floatItem, moveToNewWindowItem, moveToWindowSubmenu];

const context = (overrides: Partial<TabMenuContext> = {}): TabMenuContext => ({
  webViewId: 'tab-1',
  otherWindows: [{ windowId: '2', label: 'Biblical Terms', isMain: false }],
  isOnlyTabInWindowThatWouldClose: false,
  ...overrides,
});

const idsOf = (items: OverlayContextMenuItem[]) =>
  items.map((item) => (item.type === 'separator' ? '---' : (item.id ?? item.label)));

const labelsOf = (items: OverlayContextMenuItem[]) =>
  items.map((item) => (item.type === 'separator' ? '---' : item.label));

describe('buildTabMenuItems', () => {
  test('keeps every item when the tab can do everything', () => {
    expect(idsOf(buildTabMenuItems(CONTRIBUTED, context(), 'Empty window'))).toEqual([
      'platform.floatTab',
      'platform.moveWebViewToNewWindow',
      'platform.moveTabToWindow',
    ]);
  });

  test('offers each other window as a target', () => {
    const result = buildTabMenuItems(
      CONTRIBUTED,
      context({
        otherWindows: [
          { windowId: '2', label: 'Biblical Terms', isMain: false },
          { windowId: '3', label: 'MRK — wgPIDGIN', isMain: true },
        ],
      }),
      'Empty window',
    );

    const submenu = result.find((item) => item.type === 'submenu');
    expect(submenu?.type === 'submenu' && idsOf(submenu.items)).toEqual([
      `${MOVE_TO_WINDOW_TARGET_ID_PREFIX}2`,
      `${MOVE_TO_WINDOW_TARGET_ID_PREFIX}3`,
    ]);
    expect(submenu?.type === 'submenu' && labelsOf(submenu.items)).toEqual([
      'Biblical Terms',
      'MRK — wgPIDGIN',
    ]);
  });

  test('names a window showing nothing titled', () => {
    const result = buildTabMenuItems(
      CONTRIBUTED,
      context({ otherWindows: [{ windowId: '2', label: '', isMain: false }] }),
      'Empty window',
    );

    const submenu = result.find((item) => item.type === 'submenu');
    expect(submenu?.type === 'submenu' && labelsOf(submenu.items)).toEqual(['Empty window']);
  });

  test('drops both move actions on a tab that hosts no web view', () => {
    const result = buildTabMenuItems(
      CONTRIBUTED,
      context({ webViewId: undefined }),
      'Empty window',
    );

    expect(idsOf(result)).toEqual(['platform.floatTab']);
  });

  test('drops move-to-new-window when the tab is alone in a window that would close', () => {
    // Paratext 9 hides its float item in the same situation: the action would build an identical
    // window and empty the one the tab is in
    const result = buildTabMenuItems(
      CONTRIBUTED,
      context({ isOnlyTabInWindowThatWouldClose: true }),
      'Empty window',
    );

    expect(idsOf(result)).toEqual(['platform.floatTab', 'platform.moveTabToWindow']);
  });

  test('drops the submenu when no other window is open', () => {
    const result = buildTabMenuItems(CONTRIBUTED, context({ otherWindows: [] }), 'Empty window');

    expect(idsOf(result)).toEqual(['platform.floatTab', 'platform.moveWebViewToNewWindow']);
  });

  test('leaves items it does not recognize alone', () => {
    const extensionItem: OverlayContextMenuItem = {
      type: 'item',
      id: 'someExtension.doThing',
      label: 'Do thing',
    };

    const result = buildTabMenuItems([...CONTRIBUTED, extensionItem], context(), 'Empty window');

    expect(idsOf(result)).toContain('someExtension.doThing');
  });

  test('does not leave a separator stranded once a group empties out', () => {
    const grouped = [floatItem, { type: 'separator' } as const, moveToNewWindowItem];

    const result = buildTabMenuItems(grouped, context({ webViewId: undefined }), 'Empty window');

    expect(idsOf(result)).toEqual(['platform.floatTab']);
  });

  test('keeps a separator that still divides two groups', () => {
    // The positive control for the case above: separators are pruned, not removed wholesale
    const grouped = [floatItem, { type: 'separator' } as const, moveToNewWindowItem];

    expect(idsOf(buildTabMenuItems(grouped, context(), 'Empty window'))).toEqual([
      'platform.floatTab',
      '---',
      'platform.moveWebViewToNewWindow',
    ]);
  });
});
