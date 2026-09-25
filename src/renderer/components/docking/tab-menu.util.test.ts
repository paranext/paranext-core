import { describe, expect, test } from 'vitest';
import type { Localized, SingleColumnMenu } from 'platform-bible-utils';
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';
import {
  buildTabMenuItems,
  filterTabMenuToGroup,
  getMoveTargetWindowId,
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

const zoomInItem: OverlayContextMenuItem = {
  type: 'item',
  id: 'platform.webViewContentZoomIn',
  label: 'Zoom in',
};
const zoomOutItem: OverlayContextMenuItem = {
  type: 'item',
  id: 'platform.webViewContentZoomOut',
  label: 'Zoom out',
};
const resetZoomItem: OverlayContextMenuItem = {
  type: 'item',
  id: 'platform.webViewContentZoomReset',
  label: 'Reset zoom',
};

const CONTRIBUTED = [floatItem, moveToNewWindowItem, moveToWindowSubmenu];
const ZOOM_ITEMS = [zoomInItem, zoomOutItem, resetZoomItem];

const context = (overrides: Partial<TabMenuContext> = {}): TabMenuContext => ({
  webViewId: 'tab-1',
  otherWindows: [{ windowId: '2', label: 'Biblical Terms', isMain: false }],
  isOnlyTabInWindowThatWouldClose: false,
  isContentZoomable: true,
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

  test('drops the zoom items from a tab hosting no web view', () => {
    // A dialog or an error tab has no content the zoom commands can reach
    const result = buildTabMenuItems(ZOOM_ITEMS, context({ webViewId: undefined }), 'Empty window');

    expect(idsOf(result)).toEqual([]);
  });

  test('keeps the zoom items on a tab hosting a web view', () => {
    // The positive control for the case above
    const result = buildTabMenuItems(ZOOM_ITEMS, context(), 'Empty window');

    expect(idsOf(result)).toEqual([
      'platform.webViewContentZoomIn',
      'platform.webViewContentZoomOut',
      'platform.webViewContentZoomReset',
    ]);
  });

  test('prunes a stray separator left once the zoom items are removed', () => {
    const grouped = [{ type: 'separator' } as const, ...ZOOM_ITEMS, { type: 'separator' } as const];

    const result = buildTabMenuItems(grouped, context({ webViewId: undefined }), 'Empty window');

    expect(idsOf(result)).toEqual([]);
  });

  test('removes the zoom items from a tab whose pane is not zoomable, keeping the rest of the menu', () => {
    const grouped = [...ZOOM_ITEMS, { type: 'separator' } as const, floatItem];

    const result = buildTabMenuItems(
      grouped,
      context({ isContentZoomable: false }),
      'Empty window',
    );

    expect(idsOf(result)).toEqual(['platform.floatTab']);
  });

  test('keeps the zoom items, enabled, on a tab whose pane is zoomable', () => {
    // The positive control for the case above
    const grouped = [...ZOOM_ITEMS, { type: 'separator' } as const, floatItem];

    const result = buildTabMenuItems(grouped, context({ isContentZoomable: true }), 'Empty window');

    expect(idsOf(result)).toEqual([
      'platform.webViewContentZoomIn',
      'platform.webViewContentZoomOut',
      'platform.webViewContentZoomReset',
      '---',
      'platform.floatTab',
    ]);
    expect(result.every((item) => item.type !== 'item' || !item.disabled)).toBe(true);
  });
});

describe('filterTabMenuToGroup', () => {
  const zoomGroupDetail = { order: 50, isExtensible: false };
  const windowGroupDetail = { order: 100, isExtensible: true };

  const menu: Localized<SingleColumnMenu> = {
    groups: {
      'platform.tabZoom': zoomGroupDetail,
      'platform.tabWindow': windowGroupDetail,
    },
    items: [
      {
        label: 'Zoom in',
        localizeNotes: 'Tab context menu > Zoom in',
        group: 'platform.tabZoom',
        order: 100,
        command: 'platform.webViewContentZoomIn',
      },
      {
        label: 'Zoom out',
        localizeNotes: 'Tab context menu > Zoom out',
        group: 'platform.tabZoom',
        order: 200,
        command: 'platform.webViewContentZoomOut',
      },
      {
        label: 'Float tab',
        localizeNotes: 'Tab context menu > Float tab',
        group: 'platform.tabWindow',
        order: 100,
        command: 'platform.floatTab',
      },
    ],
  };

  test('keeps only the requested group and its items, in contributed order', () => {
    const result = filterTabMenuToGroup(menu, 'platform.tabZoom');

    expect(result.groups).toEqual({ 'platform.tabZoom': zoomGroupDetail });
    expect(result.items.map((item) => item.label)).toEqual(['Zoom in', 'Zoom out']);
  });

  test('returns an empty menu when the requested group is not defined', () => {
    const result = filterTabMenuToGroup(menu, 'someExtension.notDefined');

    expect(result).toEqual({ groups: {}, items: [] });
  });

  test('does not mutate the input menu', () => {
    filterTabMenuToGroup(menu, 'platform.tabZoom');

    expect(Object.keys(menu.groups)).toEqual(['platform.tabZoom', 'platform.tabWindow']);
    expect(menu.items).toHaveLength(3);
  });
});

describe('getMoveTargetWindowId', () => {
  const WINDOW_ID = '11111111-1111-4111-8111-111111111111';

  test('reads the window id back out of a generated target', () => {
    expect(getMoveTargetWindowId(`${MOVE_TO_WINDOW_TARGET_ID_PREFIX}${WINDOW_ID}`)).toBe(WINDOW_ID);
  });

  test('accepts a window id written in upper-case hex', () => {
    // The shape pattern carries the `i` flag deliberately — see WINDOW_ID_SHAPE_PATTERN_SOURCE —
    // so a case-sensitive rewrite of this check would refuse ids it must accept, and would do it
    // silently: the move would simply stop finding its target.
    const upper = WINDOW_ID.toUpperCase();

    expect(getMoveTargetWindowId(`${MOVE_TO_WINDOW_TARGET_ID_PREFIX}${upper}`)).toBe(upper);
  });

  test('ignores an item id that is not a generated target', () => {
    expect(getMoveTargetWindowId('platform.floatTab')).toBeUndefined();
  });

  test('refuses a suffix that is not shaped like a window id', () => {
    // Everything under this prefix is generated from a live window's own id, so a suffix of any
    // other shape did not come from that generation and names no window. The empty one matters
    // most: without the check it would be handed on as a target that resolves to nothing.
    expect(getMoveTargetWindowId(MOVE_TO_WINDOW_TARGET_ID_PREFIX)).toBeUndefined();
    expect(getMoveTargetWindowId(`${MOVE_TO_WINDOW_TARGET_ID_PREFIX}2`)).toBeUndefined();
    expect(
      getMoveTargetWindowId(`${MOVE_TO_WINDOW_TARGET_ID_PREFIX} ${WINDOW_ID} `),
    ).toBeUndefined();
    expect(
      getMoveTargetWindowId(`${MOVE_TO_WINDOW_TARGET_ID_PREFIX}${WINDOW_ID}-extra`),
    ).toBeUndefined();
    expect(
      getMoveTargetWindowId(`${MOVE_TO_WINDOW_TARGET_ID_PREFIX}not-a-window-id`),
    ).toBeUndefined();
  });
});
