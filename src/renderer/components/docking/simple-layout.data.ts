import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { LayoutBase } from 'rc-dock';
import { TAB_TYPE_WEBVIEW } from '@renderer/components/web-view.component';

// Stable tab IDs for the four tabs that make up the simple layout. `simple-layout.builder` keeps
// the same IDs (duplicated to avoid a dependency cycle) — keep them in sync if they ever change.
const MODEL_TEXT_TAB_ID = '0a23566d-1b2c-4dd2-8d3d-cda54b598cd2';
const SCRIPTURE_EDITOR_TAB_ID = '3cf575f0-2cc2-464b-8765-b588f216dfce';
const BIBLE_TEXTS_TAB_ID = '27616073-bf60-4f2b-9518-922d1a7d3601';
const COMMENTARIES_TAB_ID = '6c950d23-f8d7-4482-a384-93ea0481698b';

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
                id: MODEL_TEXT_TAB_ID,
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  webViewType: 'platformScriptureEditor.modelText',
                  id: MODEL_TEXT_TAB_ID,
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
                id: SCRIPTURE_EDITOR_TAB_ID,
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  webViewType: 'platformScriptureEditor.react',
                  id: SCRIPTURE_EDITOR_TAB_ID,
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
                id: BIBLE_TEXTS_TAB_ID,
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  webViewType: 'platformScriptureEditor.bibleTexts',
                  id: BIBLE_TEXTS_TAB_ID,
                  contentType: 'react',
                  state: {},
                },
              },
              {
                id: COMMENTARIES_TAB_ID,
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  webViewType: 'platformScriptureEditor.commentaries',
                  id: COMMENTARIES_TAB_ID,
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
