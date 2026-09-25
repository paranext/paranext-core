/**
 * E2E for "only zoomable panes zoom, and only they offer zoom".
 *
 * - A pane that shows no project text (Home) is never scaled by content zoom, whatever the Settings
 *   default.
 * - Its tab menu has no zoom items, and the zoom chord inside it changes nothing.
 * - In Simple mode such a tab has no tab menu at all, by mouse or by Shift+F10.
 * - Each mode has a declared pane as its positive control: a Scripture editor in Power mode, and Find
 *   in Simple mode's Column 3.
 *
 * Home is the non-zoomable tab in both modes. Every fixed Simple Column-3 tab is declared zoomable,
 * and `platformGetResources.openHome` opens Home as a floating tab in Simple mode.
 *
 * Run with the e2e run recipe, spec-path form: `tests/isolated/content-zoom-tab-menu/`.
 */
import { type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady, waitForOpenWebViewIdByType } from '../../../fixtures/helpers';
import {
  getEditorFrame,
  openScriptureEditorForProject,
  readFactor,
  SAMPLE_WEB_PROJECT_ID,
  sendPapiCommandWhenRegistered,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

/** `webViewType` of Home (`extensions/src/platform-get-resources/src/main.ts`). */
const HOME_WEBVIEW_TYPE = 'platformGetResources.home';
/** `webViewType` of Find (`FIND_WEBVIEW_TYPE` in `src/shared/models/web-view.model.ts`). */
const FIND_WEBVIEW_TYPE = 'platformScripture.find';
/** The Settings default seeded before launch: far enough from 100 % that a scaled Home is obvious. */
const SEEDED_DEFAULT = 1.5;

/** Writes the Settings default through the renderer's PAPI, as a Settings change would. */
async function setDefaultZoomSetting(page: Page, factor: number): Promise<void> {
  await page.evaluate((value) => {
    // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as
    // `readContentZoomMemory` in content-zoom-helpers.ts).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as {
      papi: { settings: { set: (key: string, value: number) => Promise<boolean> } };
    };
    return win.papi.settings.set('platform.webViewContentZoom', value);
  }, factor);
}

/** The CSS `zoom` on a pane's host `<iframe>` element: `''` when content zoom never scaled it. */
async function hostZoomOf(page: Page, webViewId: string): Promise<string> {
  return page
    .locator(`iframe[data-web-view-id="${webViewId}"]`)
    .evaluate((element) => element.style.zoom);
}

test.describe('Power mode', () => {
  test.use({
    interfaceMode: 'power',
    seedSettings: { 'platform.webViewContentZoom': SEEDED_DEFAULT },
    electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
  });
  test.setTimeout(300_000);

  test('Home is never scaled and offers no zoom; a Scripture editor offers it', async ({
    mainPage,
  }) => {
    test.slow();
    await waitForHomeTab(mainPage);
    const homeId = await waitForOpenWebViewIdByType(mainPage, HOME_WEBVIEW_TYPE);
    const homeTab = mainPage.locator(`.platform-tab-title[data-web-view-id="${homeId}"]`);
    const homeFrame = await getEditorFrame(mainPage, homeId);
    const homeInput = homeFrame.locator('input').first();
    await homeInput.waitFor();

    const editorId = await openScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    // The editor may open over Home in the same tab stack; Home's geometry reads need it shown.
    await homeTab.click();
    await homeInput.waitFor();

    await test.step('the seeded default reached the declared pane (control)', async () => {
      await expect.poll(() => readFactor(editorFrame, '')).toBe(SEEDED_DEFAULT);
    });

    await test.step('Home renders at 100 % content zoom although the default is 150 %', async () => {
      // Home loaded at launch, long before the editor above, so any delayed whole-view scale (the
      // one-second stale-area wait) would have landed by now.
      expect(await hostZoomOf(mainPage, homeId)).toBe('');
      const before = await homeInput.boundingBox();
      expect(before).not.toBeNull();
      await setDefaultZoomSetting(mainPage, 1);
      // Control: the change reached a zoomable pane, so an unchanged Home below is the rule at work.
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1);
      expect((await homeInput.boundingBox())?.height).toBe(before?.height);
      expect(await hostZoomOf(mainPage, homeId)).toBe('');
    });

    await test.step('Ctrl+= inside Home changes nothing', async () => {
      await homeInput.click();
      const before = await homeInput.boundingBox();
      expect(before).not.toBeNull();
      await mainPage.keyboard.press('Control+Equal');
      expect(await hostZoomOf(mainPage, homeId)).toBe('');
      expect((await homeInput.boundingBox())?.height).toBe(before?.height);
    });

    await test.step("the Scripture editor's tab menu offers the zoom items (control)", async () => {
      await mainPage
        .locator(`.platform-tab-title[data-web-view-id="${editorId}"]`)
        .click({ button: 'right' });
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom in' })).toBeVisible();
      await mainPage.keyboard.press('Escape');
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom in' })).toHaveCount(0);
    });

    await test.step("Home's tab menu has no zoom items and still offers Float tab", async () => {
      await homeTab.click({ button: 'right' });
      await expect(mainPage.getByRole('menuitem', { name: 'Float tab' })).toBeVisible();
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom in' })).toHaveCount(0);
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom out' })).toHaveCount(0);
      await expect(mainPage.getByRole('menuitem', { name: 'Reset zoom to default' })).toHaveCount(
        0,
      );
      await mainPage.keyboard.press('Escape');
    });
  });
});

test.describe('Simple mode', () => {
  test.use({
    interfaceMode: 'simple',
    seedSettings: { 'platform.webViewContentZoom': SEEDED_DEFAULT },
    electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } },
  });
  test.setTimeout(300_000);

  test('a Home tab has no tab menu and is never scaled; Find in Column 3 offers zoom', async ({
    mainPage,
  }) => {
    test.slow();
    // Simple mode shows the onboarding tour over the whole window; this suppresses it and waits out
    // the initialization overlay, either of which would intercept every click below.
    await waitForAppReady(mainPage, { timeout: 180_000 });
    const findId = await waitForOpenWebViewIdByType(mainPage, FIND_WEBVIEW_TYPE);
    const findTab = mainPage.locator(`.platform-tab-title[data-web-view-id="${findId}"]`);

    await test.step('the declared Find tab opens a menu holding the zoom items (control)', async () => {
      await findTab.click();
      await findTab.click({ button: 'right' });
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom in' })).toBeVisible();
      await mainPage.keyboard.press('Escape');
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom in' })).toHaveCount(0);
    });

    await sendPapiCommandWhenRegistered('platformGetResources.openHome');
    const homeId = await waitForOpenWebViewIdByType(mainPage, HOME_WEBVIEW_TYPE);
    const homeTab = mainPage.locator(`.platform-tab-title[data-web-view-id="${homeId}"]`);
    await homeTab.waitFor();

    await test.step('Home renders at 100 % content zoom although the default is 150 %', async () => {
      const homeFrame = await getEditorFrame(mainPage, homeId);
      await homeFrame.locator('input').first().waitFor();
      // Home marks no area and is not declared, so no whole-iframe zoom is ever applied to it —
      // this poll's first sample already shows that; the timeout only bounds how long we wait for
      // the frame to render at all.
      await expect
        .poll(async () => hostZoomOf(mainPage, homeId), { intervals: [1_500], timeout: 5_000 })
        .toBe('');
    });

    await test.step('right-clicking the Home tab opens nothing', async () => {
      await homeTab.click({ button: 'right' });
      await expect(mainPage.getByRole('menu')).toHaveCount(0);
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom in' })).toHaveCount(0);
    });

    await test.step('Shift+F10 on the focused Home tab opens nothing', async () => {
      await mainPage.locator('.dock-tab-btn', { has: homeTab }).focus();
      await mainPage.keyboard.press('Shift+F10');
      await expect(mainPage.getByRole('menu')).toHaveCount(0);
    });
  });
});
