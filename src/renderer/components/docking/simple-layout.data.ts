import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { LayoutBase } from 'rc-dock';
import { TAB_TYPE_WEBVIEW } from '@renderer/components/web-view.component';
import { SIMPLE_LAYOUT_TAB_ID } from './simple-layout.tab-ids';

const {
  modelText: MODEL_TEXT_TAB_ID,
  scriptureEditor: SCRIPTURE_EDITOR_TAB_ID,
  bibleTexts: BIBLE_TEXTS_TAB_ID,
  commentaries: COMMENTARIES_TAB_ID,
} = SIMPLE_LAYOUT_TAB_ID;

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
