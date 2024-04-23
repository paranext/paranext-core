import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { LayoutBase } from 'rc-dock';
import { TAB_TYPE_ABOUT } from '@renderer/testing/about-panel.component';
import { TAB_TYPE_TEST } from '@renderer/testing/test-panel.component';

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
            tabs: [
              { id: 'About', tabType: TAB_TYPE_ABOUT },
              {
                id: 'Priest definitions',
                tabType: TAB_TYPE_TEST,
              },
            ] as SavedTabInfo[],
          },
        ],
      },
    ],
  },
};
/* eslint-enable */
export default testLayout;
