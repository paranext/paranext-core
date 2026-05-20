import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { LayoutBase } from 'rc-dock';
import { TAB_TYPE_WEBVIEW } from '@renderer/components/web-view.component';
import { HEADLESS_GROUP, TAB_GROUP_RESOURCES } from './platform-dock-layout-positioning.util';

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
            tabs: [
              {
                id: '0a23566d-1b2c-4dd2-8d3d-cda54b598cd2',
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  // TODO PT-3961: Replace with model text panel webViewType when implemented
                  webViewType: 'platformGetResources.home',
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
            tabs: [
              {
                id: '3cf575f0-2cc2-464b-8765-b588f216dfce',
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  webViewType: 'platformScriptureEditor.react',
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
            tabs: [
              {
                id: '27616073-bf60-4f2b-9518-922d1a7d3601',
                tabType: TAB_TYPE_WEBVIEW,
                data: {
                  // TODO PT-3962: Replace with Bible texts tab webViewType when implemented
                  webViewType: 'platformGetResources.newTab',
                  id: '27616073-bf60-4f2b-9518-922d1a7d3601',
                  contentType: 'react',
                  state: {},
                },
              },
              // TODO PT-3963: Hook up the Commentaries tab here. Left commented out (rather than
              // a second NewTab placeholder) so column 3 doesn't render two visually identical
              // tabs in the meantime. Will also need to update test at line 44 in simple-layout.data.test.ts once implemented.
              // {
              //   id: '6c950d23-f8d7-4482-a384-93ea0481698b',
              //   tabType: TAB_TYPE_WEBVIEW,
              //   data: {
              //     webViewType: '<commentaries webViewType>',
              //     id: '6c950d23-f8d7-4482-a384-93ea0481698b',
              //     contentType: 'react',
              //     state: {},
              //   },
              // },
            ] as SavedTabInfo[],
          },
        ],
      },
    ],
  },
};
/* eslint-enable no-type-assertion/no-type-assertion */
