/**
 * Functional E2E tests for UI-PKG-005: MediaViewer (In-Tab Image Viewer).
 *
 * RED phase — every test uses `test.fixme()` until the integration wiring lands.
 *
 * The MediaViewer is a centered shadcn Dialog (per-PR-2209 / Theme 14 revision: an in-tab Drawer
 * was the original spec, now superseded by a centered Dialog so the image fills the viewport). It
 * is reached from the Media or Maps tab inside the Enhanced Resource WebView:
 *
 * 1. Open Enhanced Resource window from the main Platform.Bible menu (UI-PKG-009 wiring).
 * 2. Click an entry in the Media (Images) or Maps tab to open the side drawer.
 * 3. Click the Maximize affordance inside the drawer to promote the image into the MediaViewer Dialog.
 *
 * Selectors come from the ui-spec-media-viewer.md Test Contract and the existing presentational
 * component (`media-viewer.component.tsx`). Evidence points map to EVD-040 / EVD-041 / EVD-042.
 *
 * Coverage:
 *
 * - TS-062 (BHV-452): Close / prev / next navigation across grouped images.
 * - BHV-612: Image reference range matching (real backend data populates the grouped list).
 * - DEF-UI-005: No video controls (image-only).
 *
 * Constraints:
 *
 * - Uses `cdp.fixture` only (NOT `papi.fixture` or `app.fixture`).
 * - Navigates via visible UI; no `sendPapiCommand`.
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';
import { closeAllNonHomeDockTabs } from './test-helpers';

const SCREENSHOT_DIR = 'proofs/component-evidence/UI-PKG-005';
const ENHANCED_RESOURCE_FRAME_TITLE = 'Enhanced Resource';

test.describe('Enhanced Resources Functional Tests (UI-PKG-005: MediaViewer)', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  // ═══════════════════════════════════════════════
  // Category 1: Navigation — open ER window, reach Media tab, open MediaViewer
  // ═══════════════════════════════════════════════

  // @scenario TS-062
  test.fixme('should open MediaViewer from Media tab via Maximize button', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // Open the Enhanced Resource window from the main Platform.Bible menu (UI-PKG-009).
    await mainPage.getByRole('menuitem', { name: /Platform\.bible/i }).click();
    await mainPage.getByRole('menuitem', { name: /Enhanced Resource/i }).click();

    // The ER window appears as a dock tab.
    const erTab = mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i });
    await expect(erTab).toBeVisible({ timeout: 15_000 });

    // Switch to the WebView frame and open the Media tab.
    const frame = mainPage.frameLocator(`iframe[title="${ENHANCED_RESOURCE_FRAME_TITLE}"]`);
    await frame.getByRole('tab', { name: /Media/i }).click();

    // Click the first media entry to open the SourceLanguageIndexedList side drawer.
    const firstMediaEntry = frame.locator('[data-testid^="media-entry-row-"]').first();
    await expect(firstMediaEntry).toBeVisible({ timeout: 15_000 });
    await firstMediaEntry.click();

    // Drawer renders the MediaItemDetail body with a Maximize button.
    const maximizeButton = frame.getByRole('button', { name: /Maximize/i });
    await expect(maximizeButton).toBeVisible();
    await maximizeButton.click();

    // MediaViewer Dialog appears with the image displayed.
    const viewer = frame.locator('[data-testid="media-viewer"]');
    await expect(viewer).toBeVisible({ timeout: 5_000 });
    await expect(frame.locator('[data-testid="media-viewer-image"]')).toBeVisible();

    // EVD-040: MediaViewer overlay open with image, title, close/prev/next/zoom controls.
    await mainPage.screenshot({
      path: `${SCREENSHOT_DIR}/EVD-040-viewer-open.png`,
    });
  });

  // ═══════════════════════════════════════════════
  // Category 2: Render — all expected controls and elements visible
  // ═══════════════════════════════════════════════

  // @scenario TS-062
  test.fixme(
    'should display all expected controls (image, title, prev, next, zoom in/out, zoom percent, close)',
    async ({ mainPage }) => {
      await waitForAppReady(mainPage);

      // Open ER → Media tab → first entry → Maximize.
      await mainPage.getByRole('menuitem', { name: /Platform\.bible/i }).click();
      await mainPage.getByRole('menuitem', { name: /Enhanced Resource/i }).click();
      await expect(mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i })).toBeVisible({
        timeout: 15_000,
      });

      const frame = mainPage.frameLocator(`iframe[title="${ENHANCED_RESOURCE_FRAME_TITLE}"]`);
      await frame.getByRole('tab', { name: /Media/i }).click();
      await frame.locator('[data-testid^="media-entry-row-"]').first().click();
      await frame.getByRole('button', { name: /Maximize/i }).click();

      const viewer = frame.locator('[data-testid="media-viewer"]');
      await expect(viewer).toBeVisible({ timeout: 5_000 });

      // Required selectors from Test Contract + media-viewer.component.tsx data-testids.
      await expect(frame.locator('[data-testid="media-viewer-image"]')).toBeVisible();
      await expect(frame.locator('[data-testid="media-viewer-zoom-percent"]')).toBeVisible();
      await expect(frame.getByRole('button', { name: /Previous/i })).toBeVisible();
      await expect(frame.getByRole('button', { name: /Next/i })).toBeVisible();
      await expect(frame.getByRole('button', { name: /Zoom in/i })).toBeVisible();
      await expect(frame.getByRole('button', { name: /Zoom out/i })).toBeVisible();

      // Title is rendered via the shadcn DialogTitle slot — verify a non-empty title appears.
      const dialogTitle = viewer.locator('[role="heading"]').first();
      await expect(dialogTitle).toBeVisible();
      const titleText = (await dialogTitle.textContent())?.trim() ?? '';
      expect(titleText.length).toBeGreaterThan(0);

      // DEF-UI-005: No video controls (image-only).
      await expect(frame.locator('video')).toHaveCount(0);
    },
  );

  // ═══════════════════════════════════════════════
  // Category 3: Data Wiring — real backend image bytes, real title, real grouping
  // ═══════════════════════════════════════════════

  // @scenario TS-062
  test.fixme(
    'should render real image bytes and real title from backend (BHV-612)',
    async ({ mainPage }) => {
      await waitForAppReady(mainPage);

      await mainPage.getByRole('menuitem', { name: /Platform\.bible/i }).click();
      await mainPage.getByRole('menuitem', { name: /Enhanced Resource/i }).click();
      await expect(mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i })).toBeVisible({
        timeout: 15_000,
      });

      const frame = mainPage.frameLocator(`iframe[title="${ENHANCED_RESOURCE_FRAME_TITLE}"]`);
      await frame.getByRole('tab', { name: /Media/i }).click();
      await frame.locator('[data-testid^="media-entry-row-"]').first().click();
      await frame.getByRole('button', { name: /Maximize/i }).click();

      const image = frame.locator('[data-testid="media-viewer-image"]');
      await expect(image).toBeVisible();

      // The image src is wired to the `papi-er://images/{imageId}` protocol handler.
      // (FN-009: connect-src is intentionally NOT permitted; img-src/media-src are.)
      const src = await image.getAttribute('src');
      expect(src).toBeTruthy();
      expect(src).toMatch(/^papi-er:\/\/images\//);

      // The image has a non-empty alt text (accessibility + data wiring proof).
      const alt = await image.getAttribute('alt');
      expect((alt ?? '').trim().length).toBeGreaterThan(0);

      // Initial zoom percent reads 100% on first open (zoom resets when item changes).
      const zoomPercent = await frame
        .locator('[data-testid="media-viewer-zoom-percent"]')
        .textContent();
      expect(zoomPercent?.trim()).toBe('100%');
    },
  );

  // ═══════════════════════════════════════════════
  // Category 4: Interaction — prev/next navigation, zoom in/out, close
  // ═══════════════════════════════════════════════

  // @scenario TS-062
  test.fixme(
    'should advance to next image when Next is clicked (BHV-452)',
    async ({ mainPage }) => {
      await waitForAppReady(mainPage);

      await mainPage.getByRole('menuitem', { name: /Platform\.bible/i }).click();
      await mainPage.getByRole('menuitem', { name: /Enhanced Resource/i }).click();
      await expect(mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i })).toBeVisible({
        timeout: 15_000,
      });

      const frame = mainPage.frameLocator(`iframe[title="${ENHANCED_RESOURCE_FRAME_TITLE}"]`);
      await frame.getByRole('tab', { name: /Media/i }).click();
      await frame.locator('[data-testid^="media-entry-row-"]').first().click();
      await frame.getByRole('button', { name: /Maximize/i }).click();

      const image = frame.locator('[data-testid="media-viewer-image"]');
      await expect(image).toBeVisible();
      const initialSrc = await image.getAttribute('src');

      // Click Next — image src must change (BHV-452: cross-display-index navigation).
      await frame.getByRole('button', { name: /Next/i }).click();

      // Wait for the image src to change.
      await expect.poll(async () => image.getAttribute('src')).not.toBe(initialSrc);

      // After Next, the Previous button must be enabled (currentIndex > 0).
      await expect(frame.getByRole('button', { name: /Previous/i })).toBeEnabled();

      // Zoom must reset to 100% on navigation.
      const zoomPercent = await frame
        .locator('[data-testid="media-viewer-zoom-percent"]')
        .textContent();
      expect(zoomPercent?.trim()).toBe('100%');

      // EVD-041: Next image displayed; prev button enabled.
      await mainPage.screenshot({
        path: `${SCREENSHOT_DIR}/EVD-041-after-next.png`,
      });
    },
  );

  // @scenario TS-062
  test.fixme(
    'should return to previous image when Previous is clicked (BHV-452)',
    async ({ mainPage }) => {
      await waitForAppReady(mainPage);

      await mainPage.getByRole('menuitem', { name: /Platform\.bible/i }).click();
      await mainPage.getByRole('menuitem', { name: /Enhanced Resource/i }).click();
      await expect(mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i })).toBeVisible({
        timeout: 15_000,
      });

      const frame = mainPage.frameLocator(`iframe[title="${ENHANCED_RESOURCE_FRAME_TITLE}"]`);
      await frame.getByRole('tab', { name: /Media/i }).click();
      await frame.locator('[data-testid^="media-entry-row-"]').first().click();
      await frame.getByRole('button', { name: /Maximize/i }).click();

      const image = frame.locator('[data-testid="media-viewer-image"]');
      const firstSrc = await image.getAttribute('src');

      // Move forward then back.
      await frame.getByRole('button', { name: /Next/i }).click();
      await expect.poll(async () => image.getAttribute('src')).not.toBe(firstSrc);

      await frame.getByRole('button', { name: /Previous/i }).click();
      await expect.poll(async () => image.getAttribute('src')).toBe(firstSrc);

      // Back at index 0: Previous becomes disabled (currentIndex === 0).
      await expect(frame.getByRole('button', { name: /Previous/i })).toBeDisabled();
    },
  );

  // @scenario TS-062
  test.fixme('should zoom in when Zoom In is clicked (BHV-453)', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    await mainPage.getByRole('menuitem', { name: /Platform\.bible/i }).click();
    await mainPage.getByRole('menuitem', { name: /Enhanced Resource/i }).click();
    await expect(mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i })).toBeVisible({
      timeout: 15_000,
    });

    const frame = mainPage.frameLocator(`iframe[title="${ENHANCED_RESOURCE_FRAME_TITLE}"]`);
    await frame.getByRole('tab', { name: /Media/i }).click();
    await frame.locator('[data-testid^="media-entry-row-"]').first().click();
    await frame.getByRole('button', { name: /Maximize/i }).click();

    const zoomLabel = frame.locator('[data-testid="media-viewer-zoom-percent"]');
    await expect(zoomLabel).toHaveText(/^100%$/);

    // Zoom in once — should advance by ZOOM_STEP (0.25) -> 125%.
    await frame.getByRole('button', { name: /Zoom in/i }).click();
    await expect(zoomLabel).toHaveText(/^125%$/);

    // The img element's transform must reflect the new scale. Read the inline style attribute
    // directly to avoid an HTMLElement type assertion (Playwright's evaluate returns SVGElement |
    // HTMLElement; img is always HTMLImageElement and has a .style attribute reflected as inline
    // 'style'). Asserting via the attribute keeps the test platform-agnostic.
    const styleAttr = await frame
      .locator('[data-testid="media-viewer-image"]')
      .getAttribute('style');
    expect(styleAttr ?? '').toContain('scale(1.25)');

    // Zoom-out is enabled now that zoomLevel > 1.0.
    await expect(frame.getByRole('button', { name: /Zoom out/i })).toBeEnabled();

    // EVD-042: Zoomed image, zoom-out enabled.
    await mainPage.screenshot({
      path: `${SCREENSHOT_DIR}/EVD-042-zoomed-in.png`,
    });
  });

  // @scenario TS-062
  test.fixme('should zoom out when Zoom Out is clicked', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    await mainPage.getByRole('menuitem', { name: /Platform\.bible/i }).click();
    await mainPage.getByRole('menuitem', { name: /Enhanced Resource/i }).click();
    await expect(mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i })).toBeVisible({
      timeout: 15_000,
    });

    const frame = mainPage.frameLocator(`iframe[title="${ENHANCED_RESOURCE_FRAME_TITLE}"]`);
    await frame.getByRole('tab', { name: /Media/i }).click();
    await frame.locator('[data-testid^="media-entry-row-"]').first().click();
    await frame.getByRole('button', { name: /Maximize/i }).click();

    const zoomLabel = frame.locator('[data-testid="media-viewer-zoom-percent"]');
    const zoomInButton = frame.getByRole('button', { name: /Zoom in/i });
    const zoomOutButton = frame.getByRole('button', { name: /Zoom out/i });

    // Bring zoom to 150% then zoom out once -> 125%.
    await zoomInButton.click();
    await zoomInButton.click();
    await expect(zoomLabel).toHaveText(/^150%$/);

    await zoomOutButton.click();
    await expect(zoomLabel).toHaveText(/^125%$/);
  });

  // @scenario TS-062
  test.fixme(
    'should close MediaViewer when the Dialog close affordance is used (BHV-452)',
    async ({ mainPage }) => {
      await waitForAppReady(mainPage);

      await mainPage.getByRole('menuitem', { name: /Platform\.bible/i }).click();
      await mainPage.getByRole('menuitem', { name: /Enhanced Resource/i }).click();
      await expect(mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i })).toBeVisible({
        timeout: 15_000,
      });

      const frame = mainPage.frameLocator(`iframe[title="${ENHANCED_RESOURCE_FRAME_TITLE}"]`);
      await frame.getByRole('tab', { name: /Media/i }).click();
      await frame.locator('[data-testid^="media-entry-row-"]').first().click();
      await frame.getByRole('button', { name: /Maximize/i }).click();

      const viewer = frame.locator('[data-testid="media-viewer"]');
      await expect(viewer).toBeVisible();

      // Press Escape — shadcn Dialog closes on Escape with focus management.
      await mainPage.keyboard.press('Escape');
      await expect(viewer).toBeHidden();

      // Returning to the underlying Media tab — the entry list is still visible.
      await expect(frame.locator('[data-testid^="media-entry-row-"]').first()).toBeVisible();
    },
  );

  // ═══════════════════════════════════════════════
  // Category 5: Validation / Boundary states
  // (No VAL-XXX entries in ui-spec; boundary states from Conditional UI Rules instead.)
  // ═══════════════════════════════════════════════

  // @scenario TS-062
  test.fixme('should disable Zoom Out at 100% (zoomLevel <= 1.0)', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    await mainPage.getByRole('menuitem', { name: /Platform\.bible/i }).click();
    await mainPage.getByRole('menuitem', { name: /Enhanced Resource/i }).click();
    await expect(mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i })).toBeVisible({
      timeout: 15_000,
    });

    const frame = mainPage.frameLocator(`iframe[title="${ENHANCED_RESOURCE_FRAME_TITLE}"]`);
    await frame.getByRole('tab', { name: /Media/i }).click();
    await frame.locator('[data-testid^="media-entry-row-"]').first().click();
    await frame.getByRole('button', { name: /Maximize/i }).click();

    // Initial state: 100% — zoom-out disabled.
    await expect(frame.locator('[data-testid="media-viewer-zoom-percent"]')).toHaveText(/^100%$/);
    await expect(frame.getByRole('button', { name: /Zoom out/i })).toBeDisabled();
  });

  // @scenario TS-062
  test.fixme(
    'should disable Previous at first image (currentIndex === 0)',
    async ({ mainPage }) => {
      await waitForAppReady(mainPage);

      await mainPage.getByRole('menuitem', { name: /Platform\.bible/i }).click();
      await mainPage.getByRole('menuitem', { name: /Enhanced Resource/i }).click();
      await expect(mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i })).toBeVisible({
        timeout: 15_000,
      });

      const frame = mainPage.frameLocator(`iframe[title="${ENHANCED_RESOURCE_FRAME_TITLE}"]`);
      await frame.getByRole('tab', { name: /Media/i }).click();
      await frame.locator('[data-testid^="media-entry-row-"]').first().click();
      await frame.getByRole('button', { name: /Maximize/i }).click();

      // First image: Previous must be disabled.
      await expect(frame.getByRole('button', { name: /Previous/i })).toBeDisabled();
    },
  );

  // ═══════════════════════════════════════════════
  // Category 6: Edge Cases
  // ═══════════════════════════════════════════════

  // @scenario TS-062
  test.fixme(
    'should disable Next at last image (currentIndex === imageCount - 1)',
    async ({ mainPage }) => {
      await waitForAppReady(mainPage);

      await mainPage.getByRole('menuitem', { name: /Platform\.bible/i }).click();
      await mainPage.getByRole('menuitem', { name: /Enhanced Resource/i }).click();
      await expect(mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i })).toBeVisible({
        timeout: 15_000,
      });

      const frame = mainPage.frameLocator(`iframe[title="${ENHANCED_RESOURCE_FRAME_TITLE}"]`);
      await frame.getByRole('tab', { name: /Media/i }).click();
      await frame.locator('[data-testid^="media-entry-row-"]').first().click();
      await frame.getByRole('button', { name: /Maximize/i }).click();

      // Click Next until the button disables — at most a small bounded loop. Each iteration must
      // wait for the previous click to settle before checking enabled state, so awaits inside the
      // loop are required (Playwright UI clicks are not parallelizable on a single page).
      const nextButton = frame.getByRole('button', { name: /Next/i });
      const MAX_STEPS = 50;
      for (let i = 0; i < MAX_STEPS; i += 1) {
        // sequential UI poll — must read state after each click before deciding to click again
        // eslint-disable-next-line no-await-in-loop
        if (!(await nextButton.isEnabled())) break;
        // sequential UI click — must settle before checking enabled state on next iteration
        // eslint-disable-next-line no-await-in-loop
        await nextButton.click();
      }
      await expect(nextButton).toBeDisabled();
    },
  );

  // @scenario TS-062
  test.fixme(
    'should not crash and should disable both nav buttons for a single-image group (imageCount === 1)',
    async ({ mainPage }) => {
      await waitForAppReady(mainPage);

      await mainPage.getByRole('menuitem', { name: /Platform\.bible/i }).click();
      await mainPage.getByRole('menuitem', { name: /Enhanced Resource/i }).click();
      await expect(mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i })).toBeVisible({
        timeout: 15_000,
      });

      const frame = mainPage.frameLocator(`iframe[title="${ENHANCED_RESOURCE_FRAME_TITLE}"]`);
      await frame.getByRole('tab', { name: /Media/i }).click();

      // Find an entry whose group has exactly one image. The MediaEntryRow renders an occurrences
      // count badge — entries with `(1)` are single-image groups.
      const singletonEntry = frame
        .locator('[data-testid^="media-entry-row-"]')
        .filter({ hasText: /\(1\)/ })
        .first();

      // Skip if no single-image groups exist in this fixture.
      if ((await singletonEntry.count()) === 0) {
        test.skip(true, 'No single-image media group available in current fixture.');
      }

      await singletonEntry.click();
      await frame.getByRole('button', { name: /Maximize/i }).click();

      // imageCount === 1 -> per spec, prev/next either hidden or disabled.
      // The implementation chooses disabled (parent omits onPrev/onNext handlers).
      await expect(frame.getByRole('button', { name: /Previous/i })).toBeDisabled();
      await expect(frame.getByRole('button', { name: /Next/i })).toBeDisabled();
    },
  );
});
