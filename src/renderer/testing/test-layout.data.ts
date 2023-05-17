import { LayoutBase } from 'rc-dock';
import { serializeTabId } from '@shared/utils/papi-util';

const ABOUT_TAB_ID = serializeTabId('about', 'About');
const TEST_TAB_TWO_ID = serializeTabId('tab', 'Test Tab Two');
const TEST_TAB_ONE_ID = serializeTabId('tab', 'Test Tab One');
const TEST_BUTTONS_TAB_ID = serializeTabId('buttons', 'Test Buttons');
const TEST_QUICK_VERSE_TAB_ID = serializeTabId('quick-verse-heresy', 'Test Quick Verse Heresy');

export const FIRST_TAB_ID = ABOUT_TAB_ID;

const testLayout: LayoutBase = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        size: 250,
        children: [
          {
            tabs: [{ id: ABOUT_TAB_ID }, { id: TEST_TAB_TWO_ID }, { id: TEST_TAB_ONE_ID }],
          },
        ],
      },
      {
        tabs: [{ id: TEST_BUTTONS_TAB_ID }],
      },
    ],
  },
  floatbox: {
    mode: 'float',
    children: [
      {
        tabs: [{ id: TEST_QUICK_VERSE_TAB_ID }],
        x: 300,
        y: 170,
        w: 320,
        h: 190,
      },
    ],
  },
};
export default testLayout;
