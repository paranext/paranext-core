import {
  PanelDirection,
  TabType,
  Layout,
  SavedTabInfo,
  FloatLayout,
} from '@shared/models/docking-framework.model';
import { FloatPosition, FloatSize, LayoutSize, TabGroup } from 'rc-dock';
import cloneDeep from 'lodash/cloneDeep';
import DIALOGS from '../dialogs';

/**
 * The default initial size for floating tabs in CSS `px` units. Can be overridden by tabTypes'
 * initial sizes
 */
const DEFAULT_FLOAT_SIZE: FloatSize = { width: 300, height: 150 };
/** Default direction a tab will be placed from an existing tab if created as a panel */
const DEFAULT_PANEL_DIRECTION: PanelDirection = 'right';

const DOCK_FLOAT_OFFSET = 28;
// NOTE: 'card' is a built-in style. We can likely remove it when we create a full theme for
// Platform.
export const TAB_GROUP = 'card platform-bible';

export const GROUPS: { [key: string]: TabGroup } = {
  [TAB_GROUP]: {
    maximizable: true, // Allow groups of tabs to be maximized
    floatable: true, // Allow tabs to be floated
    animated: false, // Don't animate tab transitions
    // TODO: Currently allowing newWindow crashes since electron doesn't seem to have window.open defined?
    // newWindow: true, // Allow floating windows to show in a native window
  },
};

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
  // Defaults are added in `layoutDefaults`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const { width, height } = layout.floatSize!;

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
