import { SavedTabInfo } from '@shared/data/web-view.model';
import { LayoutBase } from 'rc-dock';
import { TAB_TYPE_ABOUT } from '@renderer/testing/about-panel.component';
import { TAB_TYPE_BUTTONS } from '@renderer/testing/test-buttons-panel.component';
// import { TAB_TYPE_QUICK_VERSE_HERESY } from '@renderer/testing/test-quick-verse-heresy-panel.component';
import { TAB_TYPE_TEST } from '@renderer/testing/test-panel.component';
// import { TAB_TYPE_OPEN_PROJECT_DIALOG } from '@renderer/components/project-dialogs/open-project-tab.component';
// import { TAB_TYPE_DOWNLOAD_UPDATE_PROJECT_DIALOG } from '@renderer/components/project-dialogs/download-update-project-tab.component';
// import { TAB_TYPE_OPEN_MULTIPLE_PROJECTS_DIALOG } from '@renderer/components/project-dialogs/open-multiple-projects-tab.component';
// import { TAB_TYPE_EXTENSION_MANAGER } from '@renderer/components/extension-manager/extension-manager-tab.component';
import { TAB_TYPE_SETTINGS_DIALOG } from '@renderer/components/settings-dialog/settings-tab.component';
import { TAB_TYPE_RUN_BASIC_CHECKS } from '@renderer/components/run-basic-checks-dialog/run-basic-checks-tab.component';

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
      //     { id: 'Open Project Dialog', tabType: TAB_TYPE_OPEN_PROJECT_DIALOG },
      //   ] as SavedTabInfo[],
      //   x: 250,
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
export default testLayout;
