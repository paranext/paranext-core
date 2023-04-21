import { serializeTabId } from '@shared/utils/papi-util';
import { LayoutBase } from 'rc-dock';

export const WEBVIEW_PLACEHOLDER_TAB_ID = serializeTabId('webview', 'WebView Placeholder');
const ABOUT_TAB_ID = serializeTabId('about', 'About');
const TEST_TAB_TWO_ID = serializeTabId('tab', 'Test Tab Two');
const TEST_TAB_ONE_ID = serializeTabId('tab', 'Test Tab One');
const TEST_BUTTONS_TAB_ID = serializeTabId('buttons', 'Test Buttons');
const TEST_QUICK_VERSE_TAB_ID = serializeTabId('quick-verse-heresy', 'Test Quick Verse Heresy');

const testLayout: LayoutBase = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        size: 200,
        children: [
          {
            tabs: [{ id: WEBVIEW_PLACEHOLDER_TAB_ID }],
          },
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
        x: 360,
        y: 60,
        w: 320,
        h: 300,
      },
    ],
  },
};
export default testLayout;
