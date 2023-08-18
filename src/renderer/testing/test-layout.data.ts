import { SavedTabInfo } from '@shared/data/web-view.model';
import { LayoutBase } from 'rc-dock';
import { TAB_TYPE_ABOUT } from '@renderer/testing/about-panel.component';
import { TAB_TYPE_BUTTONS } from '@renderer/testing/test-buttons-panel.component';
import { TAB_TYPE_QUICK_VERSE_HERESY } from '@renderer/testing/test-quick-verse-heresy-panel.component';
import { TAB_TYPE_TEST } from '@renderer/testing/test-panel.component';
import { TAB_TYPE_OPEN_PROJECT_DIALOG } from '@renderer/components/docking/open-project-tab.component';

export const FIRST_TAB_ID = 'About';

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
              { id: 'Test Tab Two', tabType: TAB_TYPE_TEST },
              { id: 'Test Tab One', tabType: TAB_TYPE_TEST },
            ] as SavedTabInfo[],
          },
        ],
      },
      {
        tabs: [{ id: 'Test Buttons', tabType: TAB_TYPE_BUTTONS }] as SavedTabInfo[],
      },
    ],
  },
  floatbox: {
    mode: 'float',
    children: [
      {
        tabs: [
          { id: 'Test Quick Verse Heresy', tabType: TAB_TYPE_QUICK_VERSE_HERESY },
        ] as SavedTabInfo[],
        x: 300,
        y: 170,
        w: 320,
        h: 190,
      },
      {
        tabs: [
          { id: 'Test Open Project Dialog', tabType: TAB_TYPE_OPEN_PROJECT_DIALOG },
        ] as SavedTabInfo[],
        x: 250,
        y: 170,
        w: 320,
        h: 190,
      },
    ],
  },
};
export default testLayout;
