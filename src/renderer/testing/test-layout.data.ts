import { TAB_TYPE_ABOUT } from '@renderer/testing/about-panel.component';
import { TAB_TYPE_BUTTONS } from '@renderer/testing/test-buttons-panel.component';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { LayoutBase } from 'rc-dock';
// import { TAB_TYPE_QUICK_VERSE_HERESY } from '@renderer/testing/test-quick-verse-heresy-panel.component';
import { TAB_TYPE_TEST } from '@renderer/testing/test-panel.component';
// import { TAB_TYPE_DOWNLOAD_UPDATE_PROJECT_DIALOG } from '@renderer/components/project-dialogs/download-update-project-tab.component';
// import { TAB_TYPE_OPEN_MULTIPLE_PROJECTS_DIALOG } from '@renderer/components/project-dialogs/open-multiple-projects-tab.component';
// import { TAB_TYPE_EXTENSION_MANAGER } from '@renderer/components/extension-manager/extension-manager-tab.component';
import { LOREM_IPSUM } from './lorem-ipsum';

export const FIRST_TAB_ID = 'About';

// Using `as` here simplifies type changes.
/* eslint-disable no-type-assertion/no-type-assertion */
export const testLayout: LayoutBase = globalThis.isNoisyDevModeEnabled
  ? {
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
                  {
                    id: 'Lorem Ipsum',
                    tabType: TAB_TYPE_TEST,
                    data: { content: LOREM_IPSUM },
                  },
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
          // {
          //   tabs: [
          //     { id: 'Test Quick Verse Heresy', tabType: TAB_TYPE_QUICK_VERSE_HERESY },
          //   ] as SavedTabInfo[],
          //   x: 300,
          //   y: 170,
          //   w: 320,
          //   h: 190,
          // },
          // {
          //   tabs: [
          //     {
          //       id: 'Download/Update Project Dialog',
          //       tabType: TAB_TYPE_DOWNLOAD_UPDATE_PROJECT_DIALOG,
          //     },
          //   ] as SavedTabInfo[],
          //   x: 350,
          //   y: 170,
          //   w: 320,
          //   h: 190,
          // },
          // {
          //   tabs: [
          //     {
          //       id: 'Open Multiple Projects Dialog',
          //       tabType: TAB_TYPE_OPEN_MULTIPLE_PROJECTS_DIALOG,
          //     },
          //   ] as SavedTabInfo[],
          //   x: 400,
          //   y: 170,
          //   w: 320,
          //   h: 190,
          // },
          // {
          //   tabs: [
          //     {
          //       id: 'Extension Toggle',
          //       tabType: TAB_TYPE_EXTENSION_MANAGER,
          //     },
          //   ] as SavedTabInfo[],
          //   x: 300,
          //   y: 170,
          //   w: 320,
          //   h: 190,
          // },
        ],
      },
    }
  : {
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
        ],
      },
    };
/* eslint-enable */
export default testLayout;
