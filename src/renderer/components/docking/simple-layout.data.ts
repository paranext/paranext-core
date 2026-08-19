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

// Using `as` here simplifies type changes.
/* eslint-disable no-type-assertion/no-type-assertion */
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
