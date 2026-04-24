/**
 * Feature: markers-checklist — Cross-WP Journey Tests (RED phase)
 *
 * Journey tests exercise flows that span two or more UI work packages so that the user story is
 * validated end-to-end. Per-WP functional tests (UI-PKG-002, UI-PKG-003) already cover
 * element-level behavior in isolation; this file covers cross-screen data flow that can only be
 * verified once all four WPs are wired together:
 *
 * UI-PKG-001: Menu entry point + provider + `useChecklistService` + tab-menu command plumbing
 * UI-PKG-002: Checklists Tool web view (TabToolbar + DataTable + View dropdown) UI-PKG-003: Marker
 * Settings dialog (two fields + VAL-100 validation) UI-PKG-004: Six `useWebViewState` persistence
 * slots
 *
 * All tests are `test.fixme(...)` — wiring does not exist yet. Activation happens in `mode=verify`
 * once every participating WP has a PASS verdict.
 *
 * Rules:
 *
 * - `cdp.fixture` only — NO `papi.fixture`, NO `sendPapiCommand`.
 * - Navigate via visible UI only.
 * - Selectors mirror those in `markers-checklist-functional-UI-PKG-002.spec.ts` and
 *   `markers-checklist-functional-UI-PKG-003.spec.ts` for consistency.
 *
 * Evidence screenshots are captured at key decision points into
 * `.context/features/markers-checklist/proofs/e2e-evidence/journey/`.
 */
import type { FrameLocator, Page } from '@playwright/test';
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

// ---------------------------------------------------------------------------
// Constants (aligned with per-WP functional tests)
// ---------------------------------------------------------------------------

/** Default Paratext project loaded in the running dev app. */
const PROJECT_NAME = 'wgPIDGIN';

/** Iframe title pattern set by `ChecklistWebViewProvider` (UI-PKG-001). */
const WEBVIEW_IFRAME_TITLE_RE = /Markers Checklist/i;

/** Evidence screenshot directory, relative to the test file location. */
const EVD_DIR = '../../../.context/features/markers-checklist/proofs/e2e-evidence/journey';

// ---------------------------------------------------------------------------
// Helpers — mirror the helpers in the per-WP functional tests for selector parity.
// Kept inline here (rather than extracted to a shared helper module) to keep the
// journey file self-contained during the RED phase, since the helper API is still
// in flux pending wiring.
// ---------------------------------------------------------------------------

/** Close every dock tab except Home so each test starts from a clean dock. */
async function closeNonHomeTabs(page: Page, remainingIterations = 20): Promise<void> {
  const staleCloseBtn = page
    .locator('.dock-tab')
    .filter({ hasNotText: 'Home' })
    .locator('.dock-tab-close-btn');
  if (remainingIterations <= 0) return;
  const count = await staleCloseBtn.count();
  if (count === 0) return;
  await staleCloseBtn.first().dispatchEvent('click');
  await page.waitForTimeout(300);
  await closeNonHomeTabs(page, remainingIterations - 1);
}

/** Open the default Paratext project (`wgPIDGIN`) from Home if not already open. */
async function openDefaultProject(page: Page): Promise<void> {
  const existingProjectTab = page.locator('.dock-tab', { hasText: new RegExp(PROJECT_NAME, 'i') });
  if ((await existingProjectTab.count()) > 0) return;

  const homeFrame = page.frameLocator('iframe[title="Home"]');
  const openButton = homeFrame
    .locator('tr', { hasText: new RegExp(PROJECT_NAME, 'i') })
    .locator('button', { hasText: /Open/i });
  await openButton.click();
  await expect(page.locator('.dock-tab', { hasText: new RegExp(PROJECT_NAME, 'i') })).toBeVisible({
    timeout: 15_000,
  });
}

/**
 * Open the Markers Checklist web view via the main `Tools → Checklists → Markers…` menu path. No-op
 * if the tab is already open (clicks back to activate instead).
 */
async function openMarkersChecklistViaToolsMenu(page: Page): Promise<void> {
  const existing = page.locator('.dock-tab').filter({ hasText: WEBVIEW_IFRAME_TITLE_RE });
  if ((await existing.count()) > 0) {
    await existing.first().click();
    return;
  }

  await page.getByRole('menuitem', { name: /Tools/i }).first().click();

  const checklistsItem = page.getByRole('menuitem', { name: /Checklists/i }).first();
  await checklistsItem.hover();
  await checklistsItem.click();

  await page
    .getByRole('menuitem', { name: /Markers/i })
    .first()
    .click();

  await expect(page.locator('.dock-tab').filter({ hasText: WEBVIEW_IFRAME_TITLE_RE })).toBeVisible({
    timeout: 15_000,
  });
}

/** FrameLocator for the Markers Checklist iframe. */
function checklistFrame(page: Page): FrameLocator {
  return page.frameLocator('iframe[title*="Markers Checklist"]');
}

/**
 * Close the Markers Checklist tab. The tab `.dock-tab-close-btn` is a div (not a real button), so
 * we dispatch a click event directly — the pattern used by the per-WP functional tests.
 */
async function closeMarkersChecklistTab(page: Page): Promise<void> {
  const tab = page.locator('.dock-tab').filter({ hasText: WEBVIEW_IFRAME_TITLE_RE });
  const closeBtn = tab.locator('.dock-tab-close-btn');
  await closeBtn.first().dispatchEvent('click');
  await expect(tab).toHaveCount(0, { timeout: 10_000 });
}

/**
 * Open the Marker Settings dialog via the three-dot tab-view menu (`Settings…` item). Matches the
 * navigation used by the UI-PKG-003 functional tests.
 */
async function openMarkerSettingsDialog(page: Page): Promise<FrameLocator> {
  const tab = page.locator('.dock-tab').filter({ hasText: WEBVIEW_IFRAME_TITLE_RE });
  // Activate the checklist tab if some other tab is currently foreground.
  if ((await tab.locator('.dock-tab-active').count()) === 0) {
    await tab.first().click();
  }
  const tabViewMenuTrigger = page.getByRole('button', { name: /View Info|Tab menu|Menu|More/i });
  await tabViewMenuTrigger.first().click();

  await page
    .getByRole('menuitem', { name: /Settings…|Settings\.\.\./i })
    .first()
    .click();

  const frame = page.frameLocator('iframe[title*="Markers Checklist"]');
  await expect(
    frame
      .getByRole('dialog')
      .filter({ hasText: /Marker Settings/i })
      .first(),
  ).toBeVisible({ timeout: 10_000 });
  return frame;
}

/**
 * Wait for the data table's `aria-busy` attribute to settle to `'false'`. Used to bracket
 * data-refresh transitions so we can observe cross-WP effects without races.
 */
async function waitForDataTableSettled(frame: FrameLocator, timeout = 30_000): Promise<void> {
  await expect(frame.getByTestId('checklist-data-table')).toHaveAttribute('aria-busy', 'false', {
    timeout,
  });
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

test.describe('markers-checklist Journey Tests (cross-WP)', () => {
  test.beforeEach(async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await closeNonHomeTabs(mainPage);
    await openDefaultProject(mainPage);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // Journey 1: Adjust marker settings and observe data refresh + persistence
  // Spans UI-PKG-001 + UI-PKG-002 + UI-PKG-003 + UI-PKG-004
  // ═══════════════════════════════════════════════════════════════════════

  // @scenario TS-040, TS-045
  // @behavior BHV-105, BHV-312, BHV-602
  // @spans UI-PKG-001, UI-PKG-002, UI-PKG-003, UI-PKG-004
  test.fixme(
    'adjust marker settings via Settings dialog, verify data refresh, close and reopen, verify settings persisted',
    async ({ mainPage }) => {
      // ── Step 1 (UI-PKG-001): Open Markers Checklist via Tools → Checklists → Markers… ──
      await openMarkersChecklistViaToolsMenu(mainPage);
      const frame = checklistFrame(mainPage);

      // ── Step 2 (UI-PKG-002): Initial data load settles. ──
      await waitForDataTableSettled(frame);

      // Sanity — at least one marker row rendered (backslash-prefixed) so the refresh below has a
      // baseline to invalidate.
      const firstMarkerBefore = frame.locator('[aria-label^="marker "]').first();
      await expect(firstMarkerBefore).toBeVisible({ timeout: 30_000 });
      await expect(firstMarkerBefore).toHaveText(/^\\[a-zA-Z0-9]+$/);
      const initialMarkerCount = await frame.locator('[aria-label^="marker "]').count();
      expect(initialMarkerCount).toBeGreaterThan(0);

      // ── Step 3 (UI-PKG-002 + UI-PKG-003): Open Settings dialog via tab-view menu. ──
      const dialogFrame = await openMarkerSettingsDialog(mainPage);

      // Dialog fields start empty (fresh open; UI-PKG-004 slots default to empty strings).
      await expect(dialogFrame.getByLabel(/Equivalent marker mappings/i)).toHaveValue('');

      // ── Step 4 (UI-PKG-003): Enter a valid equivalent marker mapping. ──
      await dialogFrame.getByLabel(/Equivalent marker mappings/i).fill('p/q');

      // OK passes VAL-100 because `p/q` is a single valid pair — dialog closes.
      await dialogFrame.getByRole('button', { name: /^OK$/ }).click();

      // No blocking alertdialog raised (VAL-100 passes for `p/q`).
      await expect(dialogFrame.getByRole('alertdialog')).not.toBeVisible();

      // Dialog closes.
      await expect(
        dialogFrame
          .getByRole('dialog')
          .filter({ hasText: /Marker Settings/i })
          .first(),
      ).not.toBeVisible({ timeout: 5_000 });

      // ── Step 5 (UI-PKG-002 + UI-PKG-001): Data table refreshes. ──
      // The commit writes `p/q` into the `checklistEquivalentMarkers` useWebViewState slot, which
      // triggers a buildChecklistData call (BHV-105 mapping applied). We observe the busy cycle.
      await waitForDataTableSettled(frame);

      // After refresh, data table is still populated (p/q is a syntactically valid mapping; no
      // empty-result message should appear).
      await expect(frame.getByText(/Comparative texts have identical markers/i)).not.toBeVisible();

      // Capture evidence that the settings were applied and the tool is in a good state.
      await mainPage.screenshot({
        path: `${EVD_DIR}/JEVD-001-settings-applied.png`,
      });

      // ── Step 6 (UI-PKG-001 + UI-PKG-004): Close and reopen the tool. ──
      await closeMarkersChecklistTab(mainPage);
      await openMarkersChecklistViaToolsMenu(mainPage);
      const frameReopened = checklistFrame(mainPage);
      await waitForDataTableSettled(frameReopened);

      // ── Step 7 (UI-PKG-003 + UI-PKG-004): Reopen Settings dialog; p/q is pre-populated. ──
      const dialogFrameReopened = await openMarkerSettingsDialog(mainPage);
      await expect(dialogFrameReopened.getByLabel(/Equivalent marker mappings/i)).toHaveValue(
        'p/q',
      );

      // Evidence: persistence round-trip through UI-PKG-004 slot.
      await mainPage.screenshot({
        path: `${EVD_DIR}/JEVD-002-settings-persisted.png`,
      });

      // Clean up — close the dialog so subsequent tests start from a known state.
      await dialogFrameReopened.getByRole('button', { name: /^Cancel$/ }).click();
    },
  );

  // ═══════════════════════════════════════════════════════════════════════
  // Journey 2: Toggle Hide Matches + Show Verse Text, persist across reopen
  // Spans UI-PKG-001 + UI-PKG-002 + UI-PKG-004
  // ═══════════════════════════════════════════════════════════════════════

  // @scenario TS-042, TS-044, TS-045
  // @behavior BHV-314, BHV-315, BHV-316, BHV-605
  // @spans UI-PKG-001, UI-PKG-002, UI-PKG-004
  test.fixme(
    'toggle Hide Matches and Show Verse Text, close and reopen, verify both toggles persisted',
    async ({ mainPage }) => {
      // ── Step 1 (UI-PKG-001): Open Markers Checklist. ──
      await openMarkersChecklistViaToolsMenu(mainPage);
      const frame = checklistFrame(mainPage);
      await waitForDataTableSettled(frame);

      // ── Step 2 (UI-PKG-002): Add a comparative text so Hide Matches becomes meaningful. ──
      // The comparative-texts trigger opens a popover in the main frame (Radix portal). Pick the
      // first non-primary project option, then commit with Escape.
      await frame.getByTestId('checklist-comparative-texts-trigger').click();
      await mainPage.getByRole('option').filter({ hasNotText: PROJECT_NAME }).first().click();
      await mainPage.keyboard.press('Escape');

      // Wait for the refresh triggered by the comparative-texts change.
      await waitForDataTableSettled(frame);

      // ── Step 3 (UI-PKG-002 + UI-PKG-004): Toggle Hide Matches. ──
      await frame.getByTestId('checklist-view-button').click();
      await frame.getByTestId('checklist-hide-matches-item').click();

      // Match-count label appears with live-region attributes.
      const matchCount = frame.getByTestId('checklist-match-count');
      await expect(matchCount).toBeVisible({ timeout: 15_000 });
      await expect(matchCount).toHaveText(/\d+\s+Matches\s+Omitted/i);
      await expect(matchCount).toHaveAttribute('aria-live', 'polite');
      await expect(matchCount).toHaveAttribute('aria-atomic', 'true');

      // ── Step 4 (UI-PKG-002 + UI-PKG-004): Toggle Show Verse Text. ──
      await frame.getByTestId('checklist-view-button').click();
      await frame.getByTestId('checklist-show-verse-text-item').click();

      // At least one non-marker span appears in a marker-cell row.
      const firstMarker = frame.locator('[aria-label^="marker "]').first();
      const markerRow = firstMarker.locator(
        'xpath=ancestor::div[contains(@class, "tw-flex-row")][1]',
      );
      await expect(markerRow).toBeVisible({ timeout: 30_000 });
      const nonMarkerSpans = markerRow.locator('span:not([aria-label^="marker "])');
      await expect(nonMarkerSpans.first()).toBeVisible({ timeout: 30_000 });

      await mainPage.screenshot({
        path: `${EVD_DIR}/JEVD-003-both-toggles-on.png`,
      });

      // ── Step 5 (UI-PKG-001 + UI-PKG-004): Close the tab, then reopen. ──
      await closeMarkersChecklistTab(mainPage);
      await openMarkersChecklistViaToolsMenu(mainPage);
      const frameReopened = checklistFrame(mainPage);
      await waitForDataTableSettled(frameReopened);

      // ── Step 6 (UI-PKG-004): Both toggles still ON without any user action. ──
      // Hide Matches persisted: match-count label is visible again.
      const matchCountAfter = frameReopened.getByTestId('checklist-match-count');
      await expect(matchCountAfter).toBeVisible({ timeout: 15_000 });
      await expect(matchCountAfter).toHaveText(/\d+\s+Matches\s+Omitted/i);

      // Show Verse Text persisted: at least one non-marker span appears in the first marker row.
      const firstMarkerAfter = frameReopened.locator('[aria-label^="marker "]').first();
      const markerRowAfter = firstMarkerAfter.locator(
        'xpath=ancestor::div[contains(@class, "tw-flex-row")][1]',
      );
      await expect(markerRowAfter).toBeVisible({ timeout: 30_000 });
      const nonMarkerSpansAfter = markerRowAfter.locator('span:not([aria-label^="marker "])');
      await expect(nonMarkerSpansAfter.first()).toBeVisible({ timeout: 30_000 });

      await mainPage.screenshot({
        path: `${EVD_DIR}/JEVD-004-toggles-persisted.png`,
      });
    },
  );
});
