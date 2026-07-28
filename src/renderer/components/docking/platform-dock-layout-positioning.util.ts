import { createElement } from 'react';
import type { CSSProperties } from 'react';
import { DIALOGS } from '@renderer/components/dialogs';
import {
  FloatLayout,
  Layout,
  PanelDirection,
  SavedTabInfo,
  TabInfo,
  TAB_TYPE_WEBVIEW,
} from '@shared/models/docking-framework.model';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE, WebViewDefinition } from '@shared/models/web-view.model';
import cloneDeep from 'lodash/cloneDeep';
import { FloatPosition, FloatSize, LayoutSize, TabGroup } from 'rc-dock';
import { ChevronsUpDown } from 'lucide-react';
import { TabType } from './docking-framework-internal.model';
import { PanelExtraContent } from './panel-extra-content.component';

/**
 * The default initial size for floating tabs in CSS `px` units. Can be overridden by tabTypes'
 * initial sizes
 */
const DEFAULT_FLOAT_SIZE: FloatSize = { width: 300, height: 150 };
/** Default direction a tab will be placed from an existing tab if created as a panel */
const DEFAULT_PANEL_DIRECTION: PanelDirection = 'right';

const DOCK_FLOAT_OFFSET = 28;
/**
 * Maximum fraction of the dock layout a newly created float window may occupy. Requested
 * `floatSize`s are an ideal for large screens; on smaller windows we clamp the initial size so the
 * float never opens wider/taller than the workspace (the user can still resize it afterward).
 * Height gets a slightly larger fraction since vertical space is usually the scarcer dimension and
 * dialogs tend to scroll vertically.
 */
const MAX_FLOAT_WIDTH_FRACTION = 0.8;
const MAX_FLOAT_HEIGHT_FRACTION = 0.85;
// NOTE: 'card' is a built-in style. We can likely remove it when we create a full theme for
// Platform.
// Appears in DOM as `dock-style-card` and `dock-style-platform-bible`.
export const TAB_GROUP = 'card platform-bible';

// Simple-mode column groups. Different groups can't share a panel, so giving simple-mode columns
// distinct groups prevents tabs from being dragged between columns (rc-dock's tabLocked only blocks
// drag-to-create-new-panel, not drag-between-existing-panels). The 'card platform-bible' prefix
// preserves shared CSS styling — see the .dock-style-* selectors.
export const TAB_GROUP_RESOURCES = 'card platform-bible resources';

/**
 * Group for simple-mode columns whose tab bar should be invisible (home, editor). Tabs in this
 * group are locked and the dock-bar is hidden via CSS in `dock-layout-wrapper.component.scss`. The
 * `'platform-bible'` token keeps the shared `.dock-style-platform-bible` styling rules in play.
 */
export const HEADLESS_GROUP = 'headless platform-bible';

/**
 * Build the rc-dock group config for `TAB_GROUP`. The shape depends on `platform.interfaceMode`:
 * power mode allows new tabs (`panelExtra` "+"), simple mode locks tabs in place (`tabLocked`) and
 * drops `panelExtra`. In simple mode, also registers `HEADLESS_GROUP` (for the home and editor
 * columns, whose tab bars are hidden via CSS) and `TAB_GROUP_RESOURCES` (for the resources column,
 * which still shows its tab bar) so tabs can't be dragged across columns.
 */
export function getGroups(isPowerMode: boolean): { [key: string]: TabGroup } {
  const baseConfig: TabGroup = {
    maximizable: false, // Don't allow groups of tabs to be maximized
    floatable: false, // Don't allow tabs to be floated
    animated: false, // Don't animate tab transitions
    // TODO: Currently allowing newWindow crashes since electron doesn't seem to have window.open defined?
    // newWindow: true, // Allow floating windows to show in a native window
    moreIcon: createElement(ChevronsUpDown),
  };

  if (isPowerMode) {
    return {
      [TAB_GROUP]: {
        ...baseConfig,
        panelExtra: (panelData) => createElement(PanelExtraContent, { panelData }),
      },
    };
  }

  // Simple mode: lock tabs (no drag-to-reorder, no drag-to-split) and hide the "+" new-tab button.
  // Register `HEADLESS_GROUP` (home + editor columns) and `TAB_GROUP_RESOURCES` (resources column)
  // so tabs can't be dragged across columns. `TAB_GROUP` itself is kept as the default group for
  // floating tabs and any tab not pinned to a fixed column — see `getTabGroup`.
  const simpleConfig: TabGroup = { ...baseConfig, tabLocked: true };
  return {
    [TAB_GROUP]: simpleConfig,
    [HEADLESS_GROUP]: simpleConfig,
    [TAB_GROUP_RESOURCES]: simpleConfig,
  };
}

/**
 * WebViewTypes that make up Simple mode's fixed 3-column layout, mapped to the rc-dock group each
 * is confined to while pinned there. Kept in sync with the webViewTypes hardcoded in
 * `simple-layout.data.ts` (Columns 1/2) — Column 3 also includes `scriptureTextGrid` (Text
 * Collection), which isn't part of that static default layout but joins Column 3 at runtime once
 * enabled.
 */
const FIXED_LAYOUT_WEBVIEW_GROUPS: Record<string, string> = {
  'platformScriptureEditor.modelText': HEADLESS_GROUP,
  [SCRIPTURE_EDITOR_WEBVIEW_TYPE]: HEADLESS_GROUP,
  'platformScriptureEditor.bibleTexts': TAB_GROUP_RESOURCES,
  'platformScriptureEditor.commentaries': TAB_GROUP_RESOURCES,
  'legacyCommentManager.commentListPanel': TAB_GROUP_RESOURCES,
  'platformScriptureEditor.scriptureTextGrid': TAB_GROUP_RESOURCES,
};

/**
 * Determines the rc-dock `group` a tab should use.
 *
 * Tabs pinned to Simple mode's fixed 3-column layout (`isClosable === false`, and one of
 * {@link FIXED_LAYOUT_WEBVIEW_GROUPS}' webViewTypes) get their column's dedicated group, so
 * rc-dock's own "different groups can't share a panel" drag validation (`onDragOver` in
 * `rc-dock/es/DockTabs.js`, which rejects a drop when the dragged tab's `group` doesn't match the
 * target tab's `group`) keeps them from accepting drops from other columns or from floating tabs —
 * which always use the plain `TAB_GROUP` below.
 *
 * Everything else — floating tabs/dialogs, and these same webViewTypes when `isClosable` is `true`
 * (e.g. opened freely in Power mode, where they aren't confined to a fixed column) — gets the
 * default `TAB_GROUP`, matching pre-existing behavior.
 */
export function getTabGroup(tabInfo: TabInfo): string {
  if (tabInfo.isClosable !== false || tabInfo.tabType !== TAB_TYPE_WEBVIEW || !tabInfo.data)
    return TAB_GROUP;
  // Type assert the webview data in the web view tab (same pattern as
  // platform-dock-layout-storage.util.ts's getWebViewDefinitionFromTab).
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const { webViewType } = tabInfo.data as WebViewDefinition;
  return FIXED_LAYOUT_WEBVIEW_GROUPS[webViewType] ?? TAB_GROUP;
}

/**
 * Outer inset around the whole dock layout, relative to its positioned parent. Power mode keeps the
 * original 8px gap on every side below the main toolbar; Simple mode removes that gap on the
 * left/right/bottom (only the 48px top clearance for the main toolbar is preserved) — see
 * `docs/superpowers/specs/2026-07-20-simple-layout-styling-adjustments-design.md`, Section 7.
 */
export function getDockLayoutOuterInset(isPowerMode: boolean): CSSProperties {
  if (isPowerMode) {
    return { position: 'absolute', top: 48, bottom: 8, left: 8, right: 8 };
  }
  return { position: 'absolute', top: 48, bottom: 0, left: 0, right: 0 };
}

/** Initial sizes for each tab in CSS `px` units if created as floating tabs */
const tabInitialFloatingSize: Record<TabType, FloatSize> = Object.fromEntries(
  Object.entries(DIALOGS).map(
    ([dialogTabType, dialogDefinition]) => [dialogTabType, dialogDefinition.initialSize] as const,
  ),
);

function offsetOrOverflowAxis(
  axis: number,
  size: number,
  max: number,
  offset = DOCK_FLOAT_OFFSET,
): number {
  if (axis + size + offset >= max) return offset;
  return axis + offset;
}

/**
 * Get left & top so float windows cascade their position. Float window should not overflow the
 * layout but start cascading again.
 *
 * @param layout Specified by the WebView. Must have all values - this function assumes this layout
 *   has had default values set already
 * @param previousPosition Used with the previous float window.
 * @param layoutSize Of the whole dock layout.
 * @returns Cascaded position.
 */
export function getFloatPosition(
  layout: FloatLayout,
  previousPosition: FloatPosition,
  layoutSize: LayoutSize,
): FloatPosition {
  // Defaults are added in `layoutDefaults`. Clamp the requested size to the layout so oversized
  // floats (sized for large screens) open fitting the current window instead of overflowing it.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const requestedSize = layout.floatSize!;
  const width = Math.min(
    requestedSize.width,
    Math.floor(layoutSize.width * MAX_FLOAT_WIDTH_FRACTION),
  );
  const height = Math.min(
    requestedSize.height,
    Math.floor(layoutSize.height * MAX_FLOAT_HEIGHT_FRACTION),
  );

  let { left, top } = previousPosition;

  switch (layout.position) {
    case 'center':
      left = layoutSize.width / 2 - width / 2;
      top = layoutSize.height / 2 - height / 2;
      break;
    case 'cascade':
    default:
      left = offsetOrOverflowAxis(left, width, layoutSize.width);
      top = offsetOrOverflowAxis(top, height, layoutSize.height);
      break;
  }
  return { left, top, width, height };
}

/** Set up defaults for webview layout instructions */
export function layoutDefaults(layout: Layout, savedTabInfo: SavedTabInfo): Layout {
  const layoutDefaulted = cloneDeep(layout);
  switch (layoutDefaulted.type) {
    case 'float': {
      if (!layoutDefaulted.floatSize) {
        layoutDefaulted.floatSize =
          tabInitialFloatingSize[savedTabInfo.tabType] || DEFAULT_FLOAT_SIZE;
      } else {
        if (!layoutDefaulted.floatSize.width || layoutDefaulted.floatSize.width <= 0)
          layoutDefaulted.floatSize.width =
            tabInitialFloatingSize[savedTabInfo.tabType]?.width || DEFAULT_FLOAT_SIZE.width;

        if (!layoutDefaulted.floatSize.height || layoutDefaulted.floatSize.height <= 0)
          layoutDefaulted.floatSize.height =
            tabInitialFloatingSize[savedTabInfo.tabType]?.height || DEFAULT_FLOAT_SIZE.height;
      }

      break;
    }
    case 'panel':
      if (!layoutDefaulted.direction) layoutDefaulted.direction = DEFAULT_PANEL_DIRECTION;
      break;
    case 'tab':
    default:
    // do nothing
  }
  return layoutDefaulted;
}
