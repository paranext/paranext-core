import { SavedTabInfo, TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import { FIND_WEBVIEW_TYPE, SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import { LayoutBase } from 'rc-dock';
import { HEADLESS_GROUP, TAB_GROUP_RESOURCES } from './platform-dock-layout-positioning.util';

/**
 * Minimum width of each Simple-mode column, derived from the smallest window the app allows so the
 * three columns can never total more than the window that holds them.
 *
 * UX asked for "roughly 300 each inside a 900px window" (2026-08-18). 298 rather than a literal 300
 * because rc-dock's two dividers are real layout width — `flex: 0 0 2px` each in Simple mode
 * (dock-layout-wrapper.simple-mode.scss), and the dock spans the full window with no horizontal
 * inset (getDockLayoutOuterInset returns left/right 0 in Simple). A literal 300 would need 904px
 * inside 900 and reintroduce the very scrollbar this removes.
 *
 * The columns do not need a floor to rescale: rc-dock renders each as `flex: (size) (size × 1e6)
 * (size)px` (DockBox.js), so the `size` weights already make them proportional to the window in
 * pure CSS. This floor only stops a splitter drag from collapsing a column to nothing.
 *
 * Shaving 2px off 300 does NOT by itself make the row fit. rc-dock sizes the one flexible column as
 * `container - (floored columns) - 2` while Simple mode has two 2px dividers, so the row overruns
 * by a constant 2px whenever the floors bind — at any floor value, measured in the running app.
 * That remainder is clipped in `dock-layout-wrapper.simple-mode.scss` (SIMPLE-MODE DIVIDER
 * ROUNDING), which carries the measurements. Keeping this at 298 rather than 300 only means 2px
 * gets clipped there instead of 4.
 */
export const SIMPLE_COLUMN_MIN_WIDTH_PX = 298;

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
