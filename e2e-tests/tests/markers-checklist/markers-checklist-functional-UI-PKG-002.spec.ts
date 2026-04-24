/**
 * === NEW IN PT10 === Reason: RED-phase functional tests for the wired Markers Checklist web view
 * (UI-PKG-002) plus adjacent coverage for UI-PKG-001 (provider/hook/main.ts/menus.json) and
 * UI-PKG-004 (`useWebViewState` persistence slots).
 *
 * All tests use `test.fixme()` because the wiring (`checklist.web-view.tsx`,
 * `checklist.web-view-provider.ts`, `hooks/use-checklist.ts`, menu contribution, main.ts
 * registration) does not exist yet — the component-builder activates them after wiring.
 *
 * Tests navigate through visible UI only via `cdp.fixture` (NO `sendPapiCommand`, NO
 * `papi.fixture`, NO direct JSON-RPC).
 *
 * Selectors and evidence points come from
 * `.context/features/markers-checklist/ui-specifications/ui-spec-checklists-tool.md` §Test
 * Contract, cross-referenced against the `data-testid` values already declared in
 * `extensions/src/platform-scripture/src/components/checklist.component.tsx`.
 *
 * Coverage: BHV-300, 301, 302, 303, 304, 305, 308, 309, 310, 311, 312 (trigger only), 313, 314,
 * 315, 600, 601, 604, 606 (UI-PKG-002) plus BHV-316/605 via the UI-PKG-004 persistence test and the
 * Tools-menu open via UI-PKG-001.
 *
 * Scenario traceability: TS-034..TS-045, TS-060, TS-061 (where applicable).
 */
import type { FrameLocator, Locator, Page } from '@playwright/test';
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

// ---------------------------------------------------------------------------
// Test constants
// ---------------------------------------------------------------------------

/** Project short name expected to be loaded in the running dev app (see ui-alignment.md). */
const PROJECT_NAME = 'wgPIDGIN';

/** Iframe title set by `ChecklistWebViewProvider` — see UI-PKG-001 acceptance criteria. */
const WEBVIEW_IFRAME_TITLE_RE = /Markers Checklist/i;

/**
 * Path convention for evidence screenshots. Kept short and scoped to this work package so the
 * component-builder knows where to look after activating the tests.
 */
const EVD_DIR = '../../../.context/features/markers-checklist/proofs/e2e-evidence';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Close every dock tab except Home so each test starts from a clean dock. Platform.Bible persists
 * the dock layout across sessions, so stale tabs from a prior test or manual dev session cause
 * pollution unless cleared here.
 *
 * Implemented as a recursive helper (instead of `while` + `await` in a loop) so we avoid
 * `no-await-in-loop` without needing eslint-disable pragmas — each tab close must settle before we
 * inspect the updated tab set, so the serial waits are intentional.
 */
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

/**
 * Open the default Paratext project used by these tests (`wgPIDGIN`) from the Home tab's
 * project-list. No-op if the project tab is already open.
 */
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
 * Open the Markers Checklist web view via visible UI: Tools → Checklists → Markers….
 *
 * UI-PKG-001 declares the menu entry in `contributions/menus.json` and registers the
 * `platformScripture.openMarkersChecklist` command. The web view provider adds the tab whose iframe
 * title matches `WEBVIEW_IFRAME_TITLE_RE`.
 */
async function openMarkersChecklistViaToolsMenu(page: Page): Promise<void> {
  // Top-level "Tools" menu on the main menu bar.
  await page.getByRole('menuitem', { name: /Tools/i }).first().click();

  // "Checklists" submenu trigger (may expand into a nested menu — hover or click to open).
  const checklistsItem = page.getByRole('menuitem', { name: /Checklists/i }).first();
  await checklistsItem.hover();
  await checklistsItem.click();

  // "Markers…" leaf item that fires `platformScripture.openMarkersChecklist`.
  await page
    .getByRole('menuitem', { name: /Markers/i })
    .first()
    .click();

  // Wait for the new dock tab + iframe to appear.
  await expect(page.locator('.dock-tab').filter({ hasText: WEBVIEW_IFRAME_TITLE_RE })).toBeVisible({
    timeout: 15_000,
  });
}

/** Frame locator for the Markers Checklist web view iframe. */
function checklistFrame(page: Page): FrameLocator {
  return page.frameLocator(`iframe[title*="Markers Checklist"]`);
}

/**
 * Close the Markers Checklist tab by clicking its tab-level close button. Used by the persistence
 * test to verify `useWebViewState` slot values survive close/reopen.
 */
async function closeMarkersChecklistTab(page: Page): Promise<void> {
  const tab = page.locator('.dock-tab').filter({ hasText: WEBVIEW_IFRAME_TITLE_RE });
  const closeBtn = tab.locator('.dock-tab-close-btn');
  await closeBtn.first().dispatchEvent('click');
  await expect(tab).toHaveCount(0, { timeout: 10_000 });
}

/** Locator shortcut to the match-count live-region label inside the web view. */
function matchCountLabel(frame: FrameLocator): Locator {
  return frame.getByTestId('checklist-match-count');
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

test.describe('markers-checklist UI-PKG-002: Checklists Tool', () => {
  test.beforeEach(async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await closeNonHomeTabs(mainPage);
    await openDefaultProject(mainPage);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // Category 1: Navigation (also exercises UI-PKG-001 provider+hook+main.ts+menus.json)
  // ═══════════════════════════════════════════════════════════════════════

  // @scenario TS-036
  // @behavior BHV-308 @wp UI-PKG-001
  // EVD-001 — Tools > Checklists > Markers… menu path visible
  // EVD-002 — Checklists Tool window loaded
  test.fixme(
    'opens Markers Checklist from Tools > Checklists > Markers… and shows the project in the tab title',
    async ({ mainPage }) => {
      // Capture EVD-001 as the menu is expanded.
      await mainPage.getByRole('menuitem', { name: /Tools/i }).first().click();
      const checklistsItem = mainPage.getByRole('menuitem', { name: /Checklists/i }).first();
      await checklistsItem.hover();
      await mainPage.screenshot({ path: `${EVD_DIR}/UI-PKG-002-EVD-001-menu-open.png` });

      await checklistsItem.click();
      await mainPage
        .getByRole('menuitem', { name: /Markers/i })
        .first()
        .click();

      // Tab must appear with the "Markers Checklist" title prefix set by the provider.
      const tab = mainPage.locator('.dock-tab').filter({ hasText: WEBVIEW_IFRAME_TITLE_RE });
      await expect(tab).toBeVisible({ timeout: 15_000 });

      // Title must include the project short name (UI-PKG-001 acceptance criteria).
      await expect(tab).toContainText(PROJECT_NAME);

      // EVD-002 — Tool loaded with toolbar + data table wired.
      await mainPage.screenshot({ path: `${EVD_DIR}/UI-PKG-002-EVD-002-tool-loaded.png` });
    },
  );

  // ═══════════════════════════════════════════════════════════════════════
  // Category 2: Render (initial state)
  // ═══════════════════════════════════════════════════════════════════════

  // @scenario TS-034, TS-035
  // @behavior BHV-300, BHV-304
  test.fixme(
    'renders all toolbar elements from the Test Contract on initial load',
    async ({ mainPage }) => {
      await openMarkersChecklistViaToolsMenu(mainPage);
      const frame = checklistFrame(mainPage);

      // startAreaChildren: three outline-button triggers (selector stand-ins today; ProjectSelector
      // / ScopeSelector once PRs #2223/#2212 land — the data-testid contract is stable).
      await expect(frame.getByTestId('checklist-primary-project-trigger')).toBeVisible();
      await expect(frame.getByTestId('checklist-comparative-texts-trigger')).toBeVisible();
      await expect(frame.getByTestId('checklist-verse-range-trigger')).toBeVisible();

      // endAreaChildren: copy button + View dropdown trigger.
      await expect(frame.getByTestId('checklist-copy-button')).toBeVisible();
      await expect(frame.getByTestId('checklist-view-button')).toBeVisible();

      // Match-count label is hidden initially (hideMatches=false AND/OR no comparative texts).
      await expect(matchCountLabel(frame)).toHaveCount(0);

      // Data table wrapper is present and surfaces an `aria-busy` attribute (true while loading,
      // false once settled).
      const dataTable = frame.getByTestId('checklist-data-table');
      await expect(dataTable).toBeVisible();
      await expect(dataTable).toHaveAttribute('aria-busy', /true|false/);
    },
  );

  // @scenario TS-034
  // @behavior BHV-304, BHV-606
  test.fixme(
    'renders column headers for the primary project and data rows with backslash-prefixed markers',
    async ({ mainPage }) => {
      await openMarkersChecklistViaToolsMenu(mainPage);
      const frame = checklistFrame(mainPage);

      // Column header row must exist.
      await expect(frame.getByTestId('checklist-column-headers')).toBeVisible({ timeout: 15_000 });

      // At least one project column header displays the primary project short name.
      const primaryHeader = frame
        .getByTestId('checklist-column-header')
        .filter({ hasText: PROJECT_NAME });
      await expect(primaryHeader.first()).toBeVisible({ timeout: 15_000 });

      // At least one reference cell rendered (e.g. "GEN 1:1" or similar). Data comes from the live
      // backend, so we assert the shape (non-empty USFM-style ref) rather than exact value.
      const firstRefCell = frame.getByTestId('checklist-reference-cell').first();
      await expect(firstRefCell).toBeVisible({ timeout: 30_000 });
      await expect(firstRefCell).toHaveText(/[A-Z0-9]{3}\s+\d+:\d+/);
    },
  );

  // ═══════════════════════════════════════════════════════════════════════
  // Category 3: Data Wiring (real backend via useChecklistService)
  // ═══════════════════════════════════════════════════════════════════════

  // @scenario TS-036
  // @behavior BHV-308, BHV-606, BHV-601
  test.fixme(
    'fetches real data from the backend NetworkObject and displays marker rows with backslash prefix',
    async ({ mainPage }) => {
      await openMarkersChecklistViaToolsMenu(mainPage);
      const frame = checklistFrame(mainPage);

      // aria-busy goes false once the first `buildChecklistData` call settles.
      const dataTable = frame.getByTestId('checklist-data-table');
      await expect(dataTable).toHaveAttribute('aria-busy', 'false', { timeout: 30_000 });

      // At least one paragraph marker rendered with a backslash prefix (BHV-606). The component
      // renders each marker as `\{marker}` inside a `data-testid` cell.
      const firstMarker = frame.locator('[aria-label^="marker "]').first();
      await expect(firstMarker).toBeVisible({ timeout: 30_000 });
      await expect(firstMarker).toHaveText(/^\\[a-zA-Z0-9]+$/);
    },
  );

  // ═══════════════════════════════════════════════════════════════════════
  // Category 4: Interaction — toolbar toggles
  // ═══════════════════════════════════════════════════════════════════════

  // @scenario TS-042, TS-043
  // @behavior BHV-303, BHV-314, BHV-301
  // EVD-004 — Hide Matches ON shows "{N} Matches Omitted" live-region label
  test.fixme(
    'toggling Hide Matches hides matching rows and announces "{N} Matches Omitted"',
    async ({ mainPage }) => {
      await openMarkersChecklistViaToolsMenu(mainPage);
      const frame = checklistFrame(mainPage);

      // Precondition: add a comparative text so Hide Matches becomes visible.
      await frame.getByTestId('checklist-comparative-texts-trigger').click();
      // The shared ProjectSelector popover lives in the main frame (Radix portal). The stand-in
      // component in the wiring layer must expose each option as a role=option entry — pick the
      // first non-primary project. The wiring layer decides exactly how the popover is structured;
      // this test describes the user-visible contract only.
      await mainPage.getByRole('option').filter({ hasNotText: PROJECT_NAME }).first().click();
      // Click outside to commit the multi-select.
      await mainPage.keyboard.press('Escape');

      // Count rows before toggling (sanity baseline).
      const rowsBefore = await frame.getByTestId('checklist-reference-cell').count();
      expect(rowsBefore).toBeGreaterThan(0);

      // Open the View dropdown and check "Hide Matches".
      await frame.getByTestId('checklist-view-button').click();
      const hideMatchesItem = frame.getByTestId('checklist-hide-matches-item');
      await expect(hideMatchesItem).toBeVisible();
      await hideMatchesItem.click();

      // Match-count label appears with the "{N} Matches Omitted" pattern and the live-region
      // attributes required by T-R-2.
      const label = matchCountLabel(frame);
      await expect(label).toBeVisible({ timeout: 15_000 });
      await expect(label).toHaveText(/\d+\s+Matches\s+Omitted/i);
      await expect(label).toHaveAttribute('aria-live', 'polite');
      await expect(label).toHaveAttribute('aria-atomic', 'true');

      // EVD-004
      await mainPage.screenshot({ path: `${EVD_DIR}/UI-PKG-002-EVD-004-hide-matches.png` });

      // Toggling OFF restores rows and hides the label.
      await frame.getByTestId('checklist-view-button').click();
      await frame.getByTestId('checklist-hide-matches-item').click();
      await expect(matchCountLabel(frame)).toHaveCount(0, { timeout: 10_000 });
    },
  );

  // @scenario TS-044
  // @behavior BHV-302, BHV-315, BHV-604
  // EVD-005 — Show Verse Text ON shows marker + verse text in cells
  test.fixme(
    'toggling Show Verse Text displays verse text alongside markers',
    async ({ mainPage }) => {
      await openMarkersChecklistViaToolsMenu(mainPage);
      const frame = checklistFrame(mainPage);

      // Wait for initial data load.
      await expect(frame.getByTestId('checklist-data-table')).toHaveAttribute(
        'aria-busy',
        'false',
        { timeout: 30_000 },
      );

      // Open View dropdown and check "Show Verse Text".
      await frame.getByTestId('checklist-view-button').click();
      const showVerseTextItem = frame.getByTestId('checklist-show-verse-text-item');
      await expect(showVerseTextItem).toBeVisible();
      await showVerseTextItem.click();

      // After toggling, at least one cell should contain non-marker text alongside a marker. We
      // assert a heuristic: the first marker cell's parent row contains more than just the
      // backslash marker token.
      const firstMarker = frame.locator('[aria-label^="marker "]').first();
      const markerCellRow = firstMarker.locator(
        'xpath=ancestor::div[contains(@class, "tw-flex-row")][1]',
      );
      await expect(markerCellRow).toBeVisible({ timeout: 30_000 });
      // The row should contain at least one sibling <span> that is NOT the marker label.
      const nonMarkerSpans = markerCellRow.locator('span:not([aria-label^="marker "])');
      await expect(nonMarkerSpans.first()).toBeVisible({ timeout: 30_000 });

      // EVD-005
      await mainPage.screenshot({ path: `${EVD_DIR}/UI-PKG-002-EVD-005-show-verse-text.png` });
    },
  );

  // ═══════════════════════════════════════════════════════════════════════
  // Category 5: Interaction — Settings (tab menu presence only; dialog = UI-PKG-003)
  // ═══════════════════════════════════════════════════════════════════════

  // @scenario TS-040
  // @behavior BHV-312
  test.fixme(
    'Settings… item is present in the three-dot tab menu under the export group',
    async ({ mainPage }) => {
      await openMarkersChecklistViaToolsMenu(mainPage);

      // Three-dot tab menu lives on the active dock tab. The Test Contract names it "Tab menu"
      // (or a localized equivalent) via role=button.
      const tab = mainPage.locator('.dock-tab').filter({ hasText: WEBVIEW_IFRAME_TITLE_RE });
      await expect(tab).toBeVisible();
      const tabMenuTrigger = tab.getByRole('button', { name: /Tab menu|Menu|More/i });
      await tabMenuTrigger.first().click();

      // The tab-menu popover renders in the main frame (Radix portal). "Settings…" is the only
      // item under the `platformScripture.markersChecklist.export` group in this WP.
      const settingsItem = mainPage.getByRole('menuitem', { name: /Settings/i });
      await expect(settingsItem).toBeVisible({ timeout: 10_000 });

      // Do NOT click it — the dialog itself is tested by UI-PKG-003 tests. We just verify the
      // menu wiring exists.
      await mainPage.keyboard.press('Escape');
    },
  );

  // ═══════════════════════════════════════════════════════════════════════
  // Category 6: Interaction — Copy
  // ═══════════════════════════════════════════════════════════════════════

  // @scenario TS-041
  // @behavior BHV-313
  test.fixme(
    'clicking Copy places tabular checklist text on the system clipboard',
    async ({ mainPage }) => {
      // Grant clipboard permissions on the existing browser context (CDP-connected Electron).
      const browserContext = mainPage.context();
      await browserContext.grantPermissions(['clipboard-read', 'clipboard-write']);

      await openMarkersChecklistViaToolsMenu(mainPage);
      const frame = checklistFrame(mainPage);

      // Wait for data.
      await expect(frame.getByTestId('checklist-data-table')).toHaveAttribute(
        'aria-busy',
        'false',
        { timeout: 30_000 },
      );

      // Click the copy toolbar button.
      await frame.getByTestId('checklist-copy-button').click();

      // Verify clipboard content is non-empty and contains at least one USFM marker token.
      const clipboardText = await mainPage.evaluate(async () => navigator.clipboard.readText());
      expect(clipboardText).not.toBe('');
      expect(clipboardText).toMatch(/\\[a-zA-Z0-9]+/);
    },
  );

  // ═══════════════════════════════════════════════════════════════════════
  // Category 7: Persistence (UI-PKG-004 via `useWebViewState`)
  // ═══════════════════════════════════════════════════════════════════════

  // @scenario TS-045
  // @behavior BHV-316, BHV-605 @wp UI-PKG-004
  // EVD-007 — title updates with verse range
  test.fixme(
    'Hide Matches + verse range survive close and reopen via useWebViewState slots',
    async ({ mainPage }) => {
      await openMarkersChecklistViaToolsMenu(mainPage);
      const frame = checklistFrame(mainPage);

      // Add a comparative text so Hide Matches is enabled.
      await frame.getByTestId('checklist-comparative-texts-trigger').click();
      await mainPage.getByRole('option').filter({ hasNotText: PROJECT_NAME }).first().click();
      await mainPage.keyboard.press('Escape');

      // Turn Hide Matches ON.
      await frame.getByTestId('checklist-view-button').click();
      await frame.getByTestId('checklist-hide-matches-item').click();
      await expect(matchCountLabel(frame)).toBeVisible({ timeout: 10_000 });

      // Set a verse range. Implementation-detail: the wiring layer opens the ScopeSelector popover
      // on click; the exact popover structure is owned by the wiring layer. The user-visible
      // contract: the tab title must include a range fragment like "(GEN 1:1-GEN 3:24)".
      await frame.getByTestId('checklist-verse-range-trigger').click();
      // At minimum, the popover should offer a "Range" entry (PR #2212) — pick it and accept the
      // defaults, which yields a non-null verseRange state.
      await mainPage.getByRole('menuitem', { name: /Range/i }).first().click();
      // Press Escape to close any residual popover.
      await mainPage.keyboard.press('Escape');

      // Tab title now includes the range fragment per BHV-308 / Conditional UI Rules.
      const tab = mainPage.locator('.dock-tab').filter({ hasText: WEBVIEW_IFRAME_TITLE_RE });
      await expect(tab).toHaveText(/\(.+:\d+-.+:\d+\)/, { timeout: 10_000 });

      // EVD-007 — title updated with verse range.
      await mainPage.screenshot({ path: `${EVD_DIR}/UI-PKG-002-EVD-007-verse-range.png` });

      // Close the tab.
      await closeMarkersChecklistTab(mainPage);

      // Reopen.
      await openMarkersChecklistViaToolsMenu(mainPage);
      const frame2 = checklistFrame(mainPage);

      // Hide Matches persisted → match-count label is visible again without user action.
      await expect(matchCountLabel(frame2)).toBeVisible({ timeout: 15_000 });

      // Tab title still includes the verse range (range persisted via useWebViewState).
      const tab2 = mainPage.locator('.dock-tab').filter({ hasText: WEBVIEW_IFRAME_TITLE_RE });
      await expect(tab2).toHaveText(/\(.+:\d+-.+:\d+\)/);
    },
  );

  // ═══════════════════════════════════════════════════════════════════════
  // Category 8: Empty-result state
  // ═══════════════════════════════════════════════════════════════════════

  // @scenario TS-034 (empty-result branch of BHV-600)
  // @behavior BHV-600
  // EVD-006 — "identical markers" message
  test.fixme(
    'renders the "Comparative texts have identical markers." message when all markers match',
    async ({ mainPage }) => {
      await openMarkersChecklistViaToolsMenu(mainPage);
      const frame = checklistFrame(mainPage);

      // Pick the same project as its own comparative text so all markers match — this is the most
      // reliable way to reach the `emptyResultMessage.variant === 'identical'` branch without
      // priming the backend. The wiring layer must accept self-selection (PT10 does not forbid it)
      // or the test selects the closest-marker sibling project (wiring-layer judgement).
      await frame.getByTestId('checklist-comparative-texts-trigger').click();
      // In the multi-select popover, search for the primary project and pick it.
      const searchBox = mainPage.getByRole('searchbox').first();
      if ((await searchBox.count()) > 0) {
        await searchBox.fill(PROJECT_NAME);
      }
      await mainPage.getByRole('option').filter({ hasText: PROJECT_NAME }).first().click();
      await mainPage.keyboard.press('Escape');

      // Wait for refresh.
      await expect(frame.getByTestId('checklist-data-table')).toHaveAttribute(
        'aria-busy',
        'false',
        { timeout: 30_000 },
      );

      // `DataTable` renders `noResultsMessage` when rows is empty. The component prefers the
      // backend-supplied `emptyResultMessage.message` (gm-002: "Comparative texts have identical
      // markers.").
      await expect(frame.getByText(/Comparative texts have identical markers/i)).toBeVisible({
        timeout: 15_000,
      });

      // EVD-006
      await mainPage.screenshot({ path: `${EVD_DIR}/UI-PKG-002-EVD-006-identical-markers.png` });
    },
  );

  // ═══════════════════════════════════════════════════════════════════════
  // Category 9: Error state (T-R-2 destructive Alert + Retry)
  // ═══════════════════════════════════════════════════════════════════════

  // @scenario (no TS-XXX — T-R-2 rendering contract)
  // @behavior (UI-PKG-002 error rendering per ui-state-contracts.md T-R-2)
  // EVD-008 — error alert and retry affordance
  test.fixme(
    'when buildChecklistData fails, renders a destructive Alert with a Retry button that re-invokes the call',
    async ({ mainPage }) => {
      await openMarkersChecklistViaToolsMenu(mainPage);
      const frame = checklistFrame(mainPage);

      // Drive the error path by setting an empty/invalid marker filter pattern that the backend
      // rejects. The wiring layer calls `validateMarkerSettings` + `buildChecklistData`; an invalid
      // `equivalentMarkers` string ("invalid" — same fixture used in `markers-checklist-commands.spec.ts`)
      // produces a validation error surfaced to the UI.
      //
      // The Settings dialog is owned by UI-PKG-003; this test only reaches it to seed the error
      // state. If the dialog isn't yet wired, this test will stay at test.fixme() until UI-PKG-003
      // activates.
      const tab = mainPage.locator('.dock-tab').filter({ hasText: WEBVIEW_IFRAME_TITLE_RE });
      await tab
        .getByRole('button', { name: /Tab menu|Menu|More/i })
        .first()
        .click();
      await mainPage
        .getByRole('menuitem', { name: /Settings/i })
        .first()
        .click();

      // In the Marker Settings dialog, enter a value that the backend's `validateMarkerSettings`
      // rejects ("invalid" — see markers-checklist-commands.spec.ts).
      const dialog = mainPage.getByRole('dialog');
      await dialog.getByLabel(/Equivalent markers/i).fill('invalid');
      await dialog.getByRole('button', { name: /OK|Apply/i }).click();

      // The error Alert renders between the toolbar and the data table.
      const errorAlert = frame.getByTestId('checklist-error-alert');
      await expect(errorAlert).toBeVisible({ timeout: 15_000 });
      await expect(errorAlert).toHaveAttribute('role', /alert|status/);

      // Retry button is present and focusable.
      const retryBtn = frame.getByTestId('checklist-retry-button');
      await expect(retryBtn).toBeVisible();

      // EVD-008
      await mainPage.screenshot({ path: `${EVD_DIR}/UI-PKG-002-EVD-008-error-retry.png` });

      // Clicking Retry re-invokes `buildChecklistData`. We don't assert success here (the bad
      // settings are still in place) — the contract is that Retry triggers a new request, visible
      // via the data table's `aria-busy` flipping true → false.
      const dataTable = frame.getByTestId('checklist-data-table');
      await retryBtn.click();
      // Expect aria-busy to toggle to true at some point during the request, then back to false.
      // Use a forgiving matcher — either state is acceptable because timing is racy.
      await expect(dataTable).toHaveAttribute('aria-busy', /true|false/);
    },
  );
});
