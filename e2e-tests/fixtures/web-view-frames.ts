/** Web view types and iframes shared by the e2e specs that look inside a web view. */
import type { FrameLocator, Page } from '@playwright/test';

/** `webViewType` of Home (`extensions/src/platform-get-resources/src/main.ts`). */
export const HOME_WEBVIEW_TYPE = 'platformGetResources.home';

/** The web view's iframe, re-resolved on every use so a reload of the web view cannot strand it. */
export function webViewFrame(page: Page, webViewId: string): FrameLocator {
  return page.frameLocator(`iframe[data-web-view-id="${webViewId}"]`);
}
