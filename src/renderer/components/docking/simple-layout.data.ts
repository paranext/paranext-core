import { SavedTabInfo, TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import { FIND_WEBVIEW_TYPE, SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import { LayoutBase } from 'rc-dock';
import { HEADLESS_GROUP, TAB_GROUP_RESOURCES } from './platform-dock-layout-positioning.util';

/**
 * Width rc-dock adds per divider when it computes a box's minimum width (`box.minWidth +=
 * (children.length - 1) * 4` in its `Algorithm`). Hard-coded in its JS and unrelated to the 2px the
 * Simple-mode stylesheet paints, so it has to be budgeted for separately — leave it out and three
 * "300px" columns silently demand 902px inside a 900px window.
 */
export const RC_DOCK_DIVIDER_MIN_WIDTH_RESERVE_PX = 4;

/**
 * Minimum width of each Simple-mode column. UX asked for roughly 300 inside a 900px window; 297 is
 * the largest value that actually fits once rc-dock's per-divider reserve is counted: `3 × 297 + 2
 * × 4 = 899`. At 300 the total is 902 and the dock overflows into a horizontal scrollbar.
 *
 * This floor is not what makes the columns responsive — rc-dock renders each as `flex: (size) (size
 * × 1e6) (size)px`, so the `size` weights already scale them with the window in pure CSS. It only
 * stops a splitter drag from collapsing a column to nothing.
 *
 * `simple-layout.data.test.ts` pins the arithmetic against the window minimum in `main.ts`.
 */
export const SIMPLE_COLUMN_MIN_WIDTH_PX = 297;

/** Rc-dock panel IDs for the Simple-mode layout. Used by the onboarding tour to locate panels. */
export const SIMPLE_PANEL_ID_MODEL_TEXT = 'simple-panel-model-text';
export const SIMPLE_PANEL_ID_PROJECT = 'simple-panel-project';
export const SIMPLE_PANEL_ID_RESOURCES = 'simple-panel-resources';

// Using `as` here simplifies type changes.
/* eslint-disable no-type-assertion/no-type-assertion */
/**
 * Simple mode's fixed 3-column layout.
 *
 * Every tab here declares `isClosable: false`, duplicating what each web view provider computes
 * from `platform.interfaceMode`. The duplication is load-bearing, not redundant: `loadWebViewTab`
 * seeds `TabInfo.isClosable` from this saved data and `createRCDockTabFromTabInfo` treats a missing
 * value as closable, so without it every fixed tab renders with a close button until its provider's
 * async round-trip lands. Closing one in that window is unrecoverable — Simple mode never persists
 * layout, so nothing restores the tab, and re-invoking the feature falls through to its create
 * branch and builds a new panel outside the 3-column layout. Declaring it here also means
 * `getTabGroup` routes each tab to its column's group from the first render instead of flipping
 * groups mid-startup.
 *
 * This layout is only ever loaded in Simple mode, so the value is unconditional here; the providers
 * still need their per-mode computation for the Power-mode case.
 */
export const simpleLayout: LayoutBase = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        // Column 1: Model Text
        mode: 'vertical',
        size: 1,
        children: [
          {
            id: SIMPLE_PANEL_ID_MODEL_TEXT,
            group: HEADLESS_GROUP,
            panelLock: { minWidth: SIMPLE_COLUMN_MIN_WIDTH_PX },
            tabs: [
              {
                id: '0a23566d-1b2c-4dd2-8d3d-cda54b598cd2',
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  webViewType: 'platformScriptureEditor.modelText',
                  id: '0a23566d-1b2c-4dd2-8d3d-cda54b598cd2',
                  contentType: 'react',
                  isClosable: false,
                  state: {},
                },
              },
            ] as SavedTabInfo[],
          },
        ],
      },
      {
        // Column 2: Scripture Editor
        mode: 'vertical',
        size: 2,
        children: [
          {
            id: SIMPLE_PANEL_ID_PROJECT,
            group: HEADLESS_GROUP,
            panelLock: { minWidth: SIMPLE_COLUMN_MIN_WIDTH_PX },
            tabs: [
              {
                id: '3cf575f0-2cc2-464b-8765-b588f216dfce',
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
                  id: '3cf575f0-2cc2-464b-8765-b588f216dfce',
                  contentType: 'react',
                  isClosable: false,
                  state: {},
                },
              },
            ] as SavedTabInfo[],
          },
        ],
      },
      {
        // Column 3: Resources & Tools
        mode: 'vertical',
        size: 1,
        children: [
          {
            id: SIMPLE_PANEL_ID_RESOURCES,
            group: TAB_GROUP_RESOURCES,
            panelLock: { minWidth: SIMPLE_COLUMN_MIN_WIDTH_PX },
            tabs: [
              {
                id: '27616073-bf60-4f2b-9518-922d1a7d3601',
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  webViewType: 'platformScriptureEditor.bibleTexts',
                  id: '27616073-bf60-4f2b-9518-922d1a7d3601',
                  contentType: 'react',
                  isClosable: false,
                  state: {},
                },
              },
              {
                id: '6c950d23-f8d7-4482-a384-93ea0481698b',
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  webViewType: 'platformScriptureEditor.commentaries',
                  id: '6c950d23-f8d7-4482-a384-93ea0481698b',
                  contentType: 'react',
                  isClosable: false,
                  state: {},
                },
              },
              {
                id: 'c7e4a8b2-3d91-4f06-8e5a-1b2c9d0e7f83',
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  webViewType: 'legacyCommentManager.commentListPanel',
                  id: 'c7e4a8b2-3d91-4f06-8e5a-1b2c9d0e7f83',
                  contentType: 'react',
                  isClosable: false,
                  state: {},
                },
              },
              {
                id: 'f1e2d3c4-b5a6-4789-9c0d-1e2f3a4b5c6d',
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  webViewType: FIND_WEBVIEW_TYPE,
                  id: 'f1e2d3c4-b5a6-4789-9c0d-1e2f3a4b5c6d',
                  contentType: 'react',
                  isClosable: false,
                  state: {},
                },
              },
            ] as SavedTabInfo[],
          },
        ],
      },
    ],
  },
};
/* eslint-enable no-type-assertion/no-type-assertion */
