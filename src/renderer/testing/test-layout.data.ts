import { SavedTabInfo } from '@shared/data/web-view.model';
import { LayoutBase } from 'rc-dock';
import { TAB_TYPE_ABOUT } from '@renderer/testing/about-panel.component';
import { TAB_TYPE_SETTINGS_DIALOG } from '@renderer/components/settings-dialog/settings-tab.component';
import { TAB_TYPE_RUN_BASIC_CHECKS } from '@renderer/components/run-basic-checks-dialog/run-basic-checks-tab.component';
import { TAB_TYPE_BASIC_LIST } from '@renderer/components/basic-list/basic-list.component';

export const FIRST_TAB_ID = 'About';

// Using `as` here simplifies type changes.
/* eslint-disable no-type-assertion/no-type-assertion */
const testLayout: LayoutBase = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        size: 250,
        children: [
          {
            tabs: [{ id: 'About', tabType: TAB_TYPE_ABOUT }] as SavedTabInfo[],
          },
        ],
      },
      {
        tabs: [{ id: 'Basic List', tabType: TAB_TYPE_BASIC_LIST }] as SavedTabInfo[],
      },
    ],
  },
  floatbox: {
    mode: 'float',
    children: [
      {
        tabs: [{ id: 'Settings', tabType: TAB_TYPE_SETTINGS_DIALOG }] as SavedTabInfo[],
        x: 300,
        y: 170,
        w: 600,
        h: 400,
      },
      {
        tabs: [
          {
            id: 'Run Basic Checks',
            tabType: TAB_TYPE_RUN_BASIC_CHECKS,
          },
        ] as SavedTabInfo[],
        x: 300,
        y: 170,
        w: 320,
        h: 190,
      },
    ],
  },
};
/* eslint-enable */
export default testLayout;
