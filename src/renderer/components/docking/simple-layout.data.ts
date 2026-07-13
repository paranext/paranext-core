import { SavedTabInfo, TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import { LayoutBase } from 'rc-dock';

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
            ] as SavedTabInfo[],
          },
        ],
      },
    ],
  },
};
/* eslint-enable no-type-assertion/no-type-assertion */
