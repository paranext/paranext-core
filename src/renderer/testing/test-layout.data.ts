import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { LayoutBase } from 'rc-dock';
import { TAB_TYPE_BUTTONS } from '@renderer/testing/test-buttons-panel.component';
// import { TAB_TYPE_QUICK_VERSE_HERESY } from '@renderer/testing/test-quick-verse-heresy-panel.component';
import { TAB_TYPE_TEST } from '@renderer/testing/test-panel.component';
// import { TAB_TYPE_DOWNLOAD_UPDATE_PROJECT_DIALOG } from '@renderer/components/project-dialogs/download-update-project-tab.component';
// import { TAB_TYPE_OPEN_MULTIPLE_PROJECTS_DIALOG } from '@renderer/components/project-dialogs/open-multiple-projects-tab.component';
// import { TAB_TYPE_EXTENSION_MANAGER } from '@renderer/components/extension-manager/extension-manager-tab.component';
import { TAB_TYPE_SETTINGS_DIALOG } from '@renderer/components/settings-dialog/settings-tab.component';
import { TAB_TYPE_RUN_BASIC_CHECKS } from '@renderer/components/run-basic-checks-dialog/run-basic-checks-tab.component';
import { ScriptureItemDetail } from 'platform-bible-react';
import TAB_TYPE_CHECKING_RESULTS_LIST from '@renderer/components/checking-results-list/checking-results-list.constants';
import LOREM_IPSUM from './lorem-ipsum';

function generateRandomCheckingData(details: string[]): ScriptureItemDetail[] {
  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const numberOfResults = getRandomNumber(1, 10);
  const results: ScriptureItemDetail[] = [];

  for (let i = 0; i < numberOfResults; i++) {
    const randomOffset = getRandomNumber(0, 300);
    const randomBookNum = getRandomNumber(1, 66);
    const randomChapterNum = getRandomNumber(1, 150);
    const randomVerseNum = getRandomNumber(1, 175);
    const randomDetail = details[getRandomNumber(0, details.length - 1)];

    results.push({
      start: {
        jsonPath: '',
        offset: randomOffset,
        bookNum: randomBookNum,
        chapterNum: randomChapterNum,
        verseNum: randomVerseNum,
      },
      detail: randomDetail,
    });
  }

  return results;
}

export const FIRST_TAB_ID = 'Test Tab One';

function createTestCheck(id: string, displayName: string, possibleErrors: string[]) {
  const check = {
    id: `test.${id}`,
    displayName,
  };

  let data = generateRandomCheckingData(possibleErrors);

  return {
    source: check,
    data,
    reRun() {
      data = generateRandomCheckingData(possibleErrors);
      this.data = data; // Update the data property
    },
  };
}

export const badLeftoversCheck = createTestCheck('badLeftovers', 'Bad Leftovers', [
  'Moldy lasagna',
  'Iffy meatloaf',
  'Dried out chicken',
  'Stinky cheese',
]);

export const engineProblemsCheck = createTestCheck('engineProblems', 'Engine problems', [
  'Dirty spark plugs',
  'Low oil',
  'Stuck valves',
]);

// Using `as` here simplifies type changes.
/* eslint-disable no-type-assertion/no-type-assertion */
const testLayout: LayoutBase = globalThis.isNoisyDevModeEnabled
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
          {
            tabs: [
              {
                id: 'Checking Results List',
                tabType: TAB_TYPE_CHECKING_RESULTS_LIST,
                data: {
                  sources: undefined,
                  project: 'Dummy project',
                  onRerun: undefined,
                },
              },
            ] as SavedTabInfo[],
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
                tabs: [{ id: 'Test Tab One', tabType: TAB_TYPE_TEST }] as SavedTabInfo[],
              },
            ],
          },
        ],
      },
    };
/* eslint-enable */
export default testLayout;
