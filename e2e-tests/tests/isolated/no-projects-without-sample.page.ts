import type { FrameLocator, Locator, Page } from '@playwright/test';

/** `webViewType` of Home (`extensions/src/platform-get-resources/src/main.ts`). */
export const HOME_WEBVIEW_TYPE = 'platformGetResources.home';

/** The web view's iframe, re-resolved on every use so a reload of the web view cannot strand it. */
export function webViewFrame(page: Page, webViewId: string): FrameLocator {
  return page.frameLocator(`iframe[data-web-view-id="${webViewId}"]`);
}

/**
 * Locators for the Scripture editor's empty canvas (`no-project-view.component.tsx` in
 * `platform-scripture-editor`). English strings from that extension's `localizedStrings.json`; the
 * isolated fixture pins the interface language to English.
 */
export class NoProjectEditorView {
  /**
   * The no-projects guidance: the view's `role="status"` region holding the
   * `%webView_platformScriptureEditor_emptyState_noProjects_title%` heading. Matched by its title
   * only, since the description differs with the machine's Paratext registration.
   */
  readonly guidance: Locator;

  /** `%webView_platformScriptureEditor_emptyState_noProject%`, shown while presence is not `none`. */
  readonly noProjectSelected: Locator;

  constructor(frame: FrameLocator) {
    this.guidance = frame.getByRole('status').filter({
      has: frame.getByRole('heading', { name: "You don't have any projects of your own yet" }),
    });
    this.noProjectSelected = frame.getByText('No project selected', { exact: true });
  }
}

/** Home's empty list message, `%resources_noProjects%` (`home.component.tsx`). */
export function homeNothingHere(frame: FrameLocator): Locator {
  return frame.getByText('Nothing here.', { exact: true });
}
