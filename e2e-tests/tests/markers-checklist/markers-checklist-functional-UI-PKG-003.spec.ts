/**
 * Feature: markers-checklist Work Package: UI-PKG-003 — Marker Settings Dialog (wiring phase)
 *
 * RED-phase functional tests. All tests use `test(...)` because the wiring layer that opens the
 * dialog from the tab-menu `Settings…` item and commits the result back to `useWebViewState` does
 * NOT exist yet. The presentational `MarkerSettingsDialog` component is already implemented
 * (extensions/src/platform-scripture/src/components/marker-settings-dialog.component.tsx); these
 * tests define the contract the wiring layer (checklist.web-view.tsx + menus.json) must satisfy at
 * runtime.
 *
 * Scope — BHV-312 (dialog opens w/ two fields), BHV-602 (VAL-100 `p/q` validation), BHV-603
 * (VAL-101 marker-filter normalization / backslash stripping).
 *
 * Navigation path (per ui-alignment §"Tab Menu Contribution"):
 *
 * 1. Open project (wgPIDGIN) from Home web view.
 * 2. Open Markers Checklist tool (main menu → "Open Markers Checklist" — UI-PKG-001 wiring).
 * 3. Click the three-dot tab-view menu (EllipsisVertical) in the Markers Checklist tab toolbar.
 * 4. Click the `Settings…` item → fires `platformScripture.openMarkersChecklistSettings`.
 * 5. Dialog `MarkerSettingsDialog` opens over the checklist tab.
 *
 * Evidence points EVD-009..EVD-012 captured as screenshots to
 * `.context/features/markers-checklist/proofs/e2e-evidence/`.
 *
 * Rules (from agent prompt):
 *
 * - Cdp.fixture ONLY (no papi.fixture, no app.fixture, no sendPapiCommand).
 * - Navigate via visible UI only.
 * - All assertions complete; tests skipped via `test.fixme` until wiring lands (RED phase).
 */
import type { FrameLocator, Page } from '@playwright/test';
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

// -----------------------------------------------------------------------------
// Helpers — Platform.Bible bootstrap
// -----------------------------------------------------------------------------

const EVIDENCE_DIR = '.context/features/markers-checklist/proofs/e2e-evidence/UI-PKG-003';

const PROJECT_NAME = 'wgPIDGIN';
const CHECKLIST_TAB_TITLE_PATTERN = /Markers Checklist/i;

/**
 * Open the named project from the Home tab's project list. Shared bootstrap pattern with other
 * per-feature tests (UI-PKG-002). If the project is already open in a tab we skip this step.
 */
async function openProjectByName(page: Page, projectName: string): Promise<void> {
  const existing = page.locator('.dock-tab', { hasText: projectName });
  if ((await existing.count()) > 0) return;

  // Home tab is always visible — its body is an iframe titled "Home".
  const homeFrame = page.frameLocator('iframe[title="Home"]');
  const openBtn = homeFrame.locator(`tr:has-text("${projectName}") button:has-text("Open")`);
  await openBtn.click();

  // New tab for the project appears in the dock-layout.
  await expect(page.locator('.dock-tab', { hasText: projectName })).toBeVisible({
    timeout: 15_000,
  });
}

/**
 * Open the Markers Checklist tool via the main menu for the currently active project. Uses the
 * visible UI only (menu click path — UI-PKG-001 wiring target). Waits for the dock tab to appear.
 */
async function openMarkersChecklistTool(page: Page): Promise<void> {
  const checklistTab = page.locator('.dock-tab', { hasText: CHECKLIST_TAB_TITLE_PATTERN });
  if ((await checklistTab.count()) > 0) {
    await checklistTab.first().click();
    return;
  }

  // Navigate via the scripture editor's hamburger menu. The menu item is declared in
  // platform-scripture-editor/contributions/menus.json under the inventory group, firing
  // `platformScripture.openMarkersChecklist` with the editor's webViewId as context (which is
  // how the handler resolves the active projectId).
  const editorFrame = page.frameLocator(`iframe[title*="${PROJECT_NAME}" i][title*="Editable" i]`);
  await editorFrame.locator("button[aria-label='Project']").first().click();
  await editorFrame
    .getByRole('menuitem', { name: /Markers Checklist/i })
    .first()
    .click();

  await expect(page.locator('.dock-tab', { hasText: CHECKLIST_TAB_TITLE_PATTERN })).toBeVisible({
    timeout: 30_000,
  });
}

/**
 * From an open Markers Checklist tab, click the hamburger (`View Info`) menu and pick the
 * `Settings…` item. Asserts the dialog opens (role=dialog with title "Marker Settings"). Returns a
 * `FrameLocator` for the Markers Checklist web view (the dialog renders inside the same iframe per
 * the inline-Dialog implementation pattern).
 *
 * The hamburger menu lives INSIDE the Markers Checklist iframe (Platform.Bible's web-view chrome
 * renders the `topMenu` contributions there — same pattern as the scripture editor's Project
 * hamburger). Radix portals the menu items into the iframe body, so menu items are also in-frame.
 */
async function openMarkerSettingsDialog(page: Page): Promise<FrameLocator> {
  // Ensure the Markers Checklist dock-tab is the active tab so the hamburger is available.
  const checklistTab = page.locator('.dock-tab.dock-tab-active', {
    hasText: CHECKLIST_TAB_TITLE_PATTERN,
  });
  if ((await checklistTab.count()) === 0) {
    await page.locator('.dock-tab', { hasText: CHECKLIST_TAB_TITLE_PATTERN }).first().click();
  }

  const frame = page.frameLocator('iframe[title*="Markers Checklist"]');

  // The web-view chrome renders the hamburger (`aria-label="View Info"`) inside the iframe.
  await frame.locator("button[aria-label='View Info']").first().click();

  // Settings... menu item — match exactly to disambiguate from "Open Project Settings..."
  // injected by default contributions.
  await frame.getByRole('menuitem', { name: 'Settings...', exact: true }).click();

  // Primary dialog title assertion — confirms `MarkerSettingsDialog` mounted with `open={true}`.
  await expect(
    frame
      .getByRole('dialog')
      .filter({ hasText: /Marker Settings/i })
      .first(),
  ).toBeVisible({ timeout: 10_000 });

  return frame;
}

/**
 * Convenience — from the Home state, reach "dialog open" in one helper so each test body is small
 * and expresses only its unique assertion.
 */
async function bootstrapDialogOpen(page: Page): Promise<FrameLocator> {
  await waitForAppReady(page);
  await openProjectByName(page, PROJECT_NAME);
  await openMarkersChecklistTool(page);
  return openMarkerSettingsDialog(page);
}

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

/**
 * Recursively close every non-Home dock tab. Uses recursion rather than a while-loop so we can
 * `await` in sequence without triggering `no-await-in-loop` — each iteration must re-query the DOM
 * because closing a tab may shift sibling indices.
 */
async function closeNonHomeTabs(
  page: import('@playwright/test').Page,
  remainingIterations = 20,
): Promise<void> {
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

test.describe('markers-checklist UI-PKG-003: Marker Settings Dialog', () => {
  // Close all non-Home tabs before each test so we always start from a clean dock layout. Platform
  // .Bible persists dock state across sessions, so stale tabs routinely leak between runs.
  test.beforeEach(async ({ mainPage }) => {
    await closeNonHomeTabs(mainPage);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Category 1: Navigation
  // ─────────────────────────────────────────────────────────────────────────

  // @behavior BHV-312
  test('opens the Marker Settings dialog via the hamburger-menu Settings… item', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await openProjectByName(mainPage, PROJECT_NAME);
    await openMarkersChecklistTool(mainPage);

    const frame = mainPage.frameLocator('iframe[title*="Markers Checklist"]');

    // The hamburger (`View Info`) lives INSIDE the Markers Checklist iframe — the web-view chrome
    // renders `topMenu` contributions there. Radix portals the menu into the iframe body.
    const hamburger = frame.locator("button[aria-label='View Info']");
    await expect(hamburger).toBeVisible();
    await hamburger.click();

    const settingsMenuItem = frame.getByRole('menuitem', { name: 'Settings...', exact: true });
    await expect(settingsMenuItem).toBeVisible();
    await settingsMenuItem.click();

    // The dialog mounts inside the Markers Checklist web view's iframe.
    const dialog = frame
      .getByRole('dialog')
      .filter({ hasText: /Marker Settings/i })
      .first();
    await expect(dialog).toBeVisible({ timeout: 10_000 });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Category 2: Render
  // ─────────────────────────────────────────────────────────────────────────

  // EVD-009 — dialog opens empty with both fields + OK/Cancel buttons.
  // @behavior BHV-312
  test('renders both labeled inputs, OK and Cancel buttons in a modal dialog', async ({
    mainPage,
  }) => {
    const frame = await bootstrapDialogOpen(mainPage);

    // Programmatic label→input association (spec Acc row 3): getByLabel() only resolves when the
    // shadcn `Label htmlFor` → `Input id` wiring is correct.
    const equivalentMarkersInput = frame.getByLabel(/Equivalent marker mappings/i);
    const markerFilterInput = frame.getByLabel(/Markers to be displayed \(blank for all\)/i);
    const okButton = frame.getByRole('button', { name: /^OK$/ });
    const cancelButton = frame.getByRole('button', { name: /^Cancel$/ });

    await expect(equivalentMarkersInput).toBeVisible();
    await expect(markerFilterInput).toBeVisible();
    await expect(okButton).toBeVisible();
    await expect(cancelButton).toBeVisible();

    // Dialog is modal — an overlay is present above the tab content.
    await expect(frame.getByRole('dialog').first()).toBeVisible();

    // Spec acceptance: on a fresh open (no prior persisted values) both fields are empty.
    await expect(equivalentMarkersInput).toHaveValue('');
    await expect(markerFilterInput).toHaveValue('');

    await mainPage.screenshot({ path: `${EVIDENCE_DIR}/EVD-009-settings-empty.png` });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Category 3: Seeding (data wiring from useWebViewState via parent props)
  // ─────────────────────────────────────────────────────────────────────────

  // @behavior BHV-312
  // @behavior BHV-603
  test('seeds both inputs from the parent useWebViewState slots when reopened with persisted values', async ({
    mainPage,
  }) => {
    const firstOpen = await bootstrapDialogOpen(mainPage);

    // Enter values, submit (commit to parent's useWebViewState), then reopen the dialog.
    const equivalentSeed = 'p/q q1/q2';
    const filterSeed = 'id ide toc1';

    const firstEquivalent = firstOpen.getByLabel(/Equivalent marker mappings/i);
    const firstFilter = firstOpen.getByLabel(/Markers to be displayed \(blank for all\)/i);
    await firstEquivalent.fill(equivalentSeed);
    await firstFilter.fill(filterSeed);
    await firstOpen.getByRole('button', { name: /^OK$/ }).click();

    // Dialog closes after valid submit.
    await expect(firstOpen.getByRole('dialog').first()).not.toBeVisible({ timeout: 5_000 });

    // Reopen via the tab-menu.
    const reopened = await openMarkerSettingsDialog(mainPage);

    // Fields pre-populated from the slots parent committed on the previous OK.
    await expect(reopened.getByLabel(/Equivalent marker mappings/i)).toHaveValue(equivalentSeed);
    await expect(reopened.getByLabel(/Markers to be displayed \(blank for all\)/i)).toHaveValue(
      filterSeed,
    );

    await mainPage.screenshot({ path: `${EVIDENCE_DIR}/EVD-010-settings-filled.png` });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Category 4: Validation — VAL-100 invalid equivalent markers
  // ─────────────────────────────────────────────────────────────────────────

  // EVD-011 — "p" without a `/` separator → blocking AlertDialog.
  // @behavior BHV-602 (VAL-100)
  test('shows a blocking validation AlertDialog when equivalentMarkers is missing the `/` separator', async ({
    mainPage,
  }) => {
    const frame = await bootstrapDialogOpen(mainPage);

    await frame.getByLabel(/Equivalent marker mappings/i).fill('p');
    await frame.getByRole('button', { name: /^OK$/ }).click();

    // The validation alert is a nested dialog with role="alertdialog" (component uses a Dialog
    // with `role="alertdialog"` annotation since AlertDialog primitive isn't exported yet).
    const alert = frame.getByRole('alertdialog');
    await expect(alert).toBeVisible({ timeout: 5_000 });
    await expect(alert).toContainText(/Invalid equivalent markers/i);
    await expect(alert).toContainText(/Equivalent markers need to be entered in the form: p\/q/i);

    // Parent dialog is still open (blocking behavior — PT9 parity). When the nested alertdialog
    // opens, Radix sets `aria-hidden=true` on the parent Dialog to trap focus, which removes it
    // from the a11y tree. Use a CSS selector (not getByRole) so we verify the element is
    // rendered/visible regardless of ARIA visibility.
    await expect(frame.locator('[aria-label="Marker Settings"][data-state="open"]')).toBeVisible();

    await mainPage.screenshot({
      path: `${EVIDENCE_DIR}/EVD-011-settings-validation-error.png`,
    });
  });

  // @behavior BHV-602 (VAL-100)
  test('rejects equivalentMarkers with more than one `/` in a single token (e.g. "p/q/r")', async ({
    mainPage,
  }) => {
    const frame = await bootstrapDialogOpen(mainPage);

    await frame.getByLabel(/Equivalent marker mappings/i).fill('p/q/r');
    await frame.getByRole('button', { name: /^OK$/ }).click();

    await expect(frame.getByRole('alertdialog')).toBeVisible({ timeout: 5_000 });
    // Parent dialog still open — user must correct and retry. When the nested alertdialog opens,
    // Radix sets `aria-hidden=true` on the parent Dialog to trap focus, which removes it from the
    // a11y tree. Use a CSS selector (not getByRole) so we verify the element is rendered/visible
    // regardless of ARIA visibility.
    await expect(frame.locator('[aria-label="Marker Settings"][data-state="open"]')).toBeVisible();
  });

  // @behavior BHV-602 (VAL-100)
  test('rejects equivalentMarkers with an empty side (e.g. "/q")', async ({ mainPage }) => {
    const frame = await bootstrapDialogOpen(mainPage);

    await frame.getByLabel(/Equivalent marker mappings/i).fill('/q');
    await frame.getByRole('button', { name: /^OK$/ }).click();

    await expect(frame.getByRole('alertdialog')).toBeVisible({ timeout: 5_000 });
    // CSS selector (not getByRole) because Radix sets aria-hidden=true on the parent when the
    // nested alertdialog opens — see sibling rejection tests for details.
    await expect(frame.locator('[aria-label="Marker Settings"][data-state="open"]')).toBeVisible();
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Category 5: Validation — alert dismissal returns focus to the offending input
  // ─────────────────────────────────────────────────────────────────────────

  // @behavior BHV-602
  test('dismissing the validation alert returns focus to equivalentMarkers and leaves the parent dialog open', async ({
    mainPage,
  }) => {
    const frame = await bootstrapDialogOpen(mainPage);

    await frame.getByLabel(/Equivalent marker mappings/i).fill('p');
    await frame.getByRole('button', { name: /^OK$/ }).click();

    const alert = frame.getByRole('alertdialog');
    await expect(alert).toBeVisible({ timeout: 5_000 });

    // Click the alert's OK — autoFocus is on this button (spec Acc row 4), so Enter would also
    // dismiss. Click is used for deterministic behavior.
    await alert.getByRole('button', { name: /^OK$/ }).click();

    await expect(alert).not.toBeVisible({ timeout: 5_000 });

    // Parent dialog still open.
    const parentDialog = frame.getByRole('dialog').filter({ hasText: /Marker Settings/i });
    await expect(parentDialog).toBeVisible();

    // Focus returned to the equivalentMarkers input (spec Acc row 5).
    await expect(frame.getByLabel(/Equivalent marker mappings/i)).toBeFocused();

    // User can correct and retry successfully.
    await frame.getByLabel(/Equivalent marker mappings/i).fill('p/q');
    await frame.getByRole('button', { name: /^OK$/ }).click();
    await expect(parentDialog).not.toBeVisible({ timeout: 5_000 });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Category 6: Successful submit — normalization + parent slot commit
  // ─────────────────────────────────────────────────────────────────────────

  // EVD-012 — valid submit closes the dialog and persisted values round-trip through the slots.
  // @behavior BHV-312
  // @behavior BHV-602
  test('valid submit closes the dialog and normalizes values (collapse spaces + trim filter)', async ({
    mainPage,
  }) => {
    const frame = await bootstrapDialogOpen(mainPage);

    // Extra whitespace in equivalentMarkers should be collapsed; leading/trailing whitespace in
    // markerFilter should be trimmed (VAL-100.3 + VAL-101.1).
    await frame.getByLabel(/Equivalent marker mappings/i).fill('p/q    rq/g');
    await frame.getByLabel(/Markers to be displayed \(blank for all\)/i).fill('  id ide toc1  ');

    await frame.getByRole('button', { name: /^OK$/ }).click();

    // Dialog closes (parent accepted the submit).
    await expect(frame.getByRole('dialog').first()).not.toBeVisible({ timeout: 5_000 });

    await mainPage.screenshot({ path: `${EVIDENCE_DIR}/EVD-012-settings-applied.png` });

    // Reopen — parent committed the NORMALIZED values back to useWebViewState and they round-trip.
    const reopened = await openMarkerSettingsDialog(mainPage);
    await expect(reopened.getByLabel(/Equivalent marker mappings/i)).toHaveValue('p/q rq/g');
    await expect(reopened.getByLabel(/Markers to be displayed \(blank for all\)/i)).toHaveValue(
      'id ide toc1',
    );
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Category 7: Cancel — no commit
  // ─────────────────────────────────────────────────────────────────────────

  // @behavior BHV-312
  test('Cancel closes the dialog and does NOT update the parent useWebViewState slots', async ({
    mainPage,
  }) => {
    // First open — commit a known baseline.
    const first = await bootstrapDialogOpen(mainPage);
    await first.getByLabel(/Equivalent marker mappings/i).fill('p/q');
    await first.getByLabel(/Markers to be displayed \(blank for all\)/i).fill('p');
    await first.getByRole('button', { name: /^OK$/ }).click();
    await expect(first.getByRole('dialog').first()).not.toBeVisible({ timeout: 5_000 });

    // Second open — change fields, then Cancel.
    const second = await openMarkerSettingsDialog(mainPage);
    await second.getByLabel(/Equivalent marker mappings/i).fill('SHOULD_NOT_PERSIST/x');
    await second
      .getByLabel(/Markers to be displayed \(blank for all\)/i)
      .fill('SHOULD_NOT_PERSIST');
    await second.getByRole('button', { name: /^Cancel$/ }).click();

    await expect(second.getByRole('dialog').first()).not.toBeVisible({ timeout: 5_000 });

    // Third open — baseline values are still there (Cancel did not commit).
    const third = await openMarkerSettingsDialog(mainPage);
    await expect(third.getByLabel(/Equivalent marker mappings/i)).toHaveValue('p/q');
    await expect(third.getByLabel(/Markers to be displayed \(blank for all\)/i)).toHaveValue('p');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Category 8: Keyboard
  // ─────────────────────────────────────────────────────────────────────────

  // @behavior BHV-312
  test('Enter inside an input triggers OK (form submit)', async ({ mainPage }) => {
    const frame = await bootstrapDialogOpen(mainPage);

    await frame.getByLabel(/Equivalent marker mappings/i).fill('p/q');
    await frame.getByLabel(/Equivalent marker mappings/i).press('Enter');

    // Dialog closes on valid submit.
    await expect(frame.getByRole('dialog').first()).not.toBeVisible({ timeout: 5_000 });
  });

  // @behavior BHV-312
  test('Escape triggers Cancel (does not commit changes)', async ({ mainPage }) => {
    const frame = await bootstrapDialogOpen(mainPage);

    await frame.getByLabel(/Equivalent marker mappings/i).fill('never/committed');
    await frame.getByLabel(/Equivalent marker mappings/i).press('Escape');

    // Dialog closes via the Radix Dialog Escape-handler (treated as Cancel in onOpenChange).
    await expect(frame.getByRole('dialog').first()).not.toBeVisible({ timeout: 5_000 });

    // Reopen — the Escape'd value must NOT have been committed.
    const reopened = await openMarkerSettingsDialog(mainPage);
    await expect(reopened.getByLabel(/Equivalent marker mappings/i)).not.toHaveValue(
      'never/committed',
    );
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Category 9: Edge — empty inputs are valid
  // ─────────────────────────────────────────────────────────────────────────

  // @behavior BHV-602 (VAL-100: empty string is valid)
  // @behavior BHV-603 (VAL-101: empty marker filter = show all)
  test('both inputs empty is valid — OK closes the dialog', async ({ mainPage }) => {
    const frame = await bootstrapDialogOpen(mainPage);

    await frame.getByLabel(/Equivalent marker mappings/i).fill('');
    await frame.getByLabel(/Markers to be displayed \(blank for all\)/i).fill('');

    await frame.getByRole('button', { name: /^OK$/ }).click();

    // No alert; dialog closes; parent accepted an empty commit.
    await expect(frame.getByRole('alertdialog')).not.toBeVisible();
    await expect(frame.getByRole('dialog').first()).not.toBeVisible({ timeout: 5_000 });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Category 10: Edge — backslash stripping from marker filter (VAL-101.2)
  // ─────────────────────────────────────────────────────────────────────────

  // @behavior BHV-603 (VAL-101.2 — backslash stripping from marker filter tokens)
  //
  // NOTE: The PT9 behavior is that the PARSER strips leading `\` per marker token (not the UI).
  // The dialog accepts either form (`\p \q1` or `p q1`) and the downstream parser normalizes.
  // The component today only trims the markerFilter string; token-level backslash stripping is
  // a parsing concern. This test documents the UI-layer expectation: the dialog MUST accept
  // backslash-prefixed markers without showing a validation error (since only equivalentMarkers
  // is validated for format).
  test('markerFilter accepts backslash-prefixed markers without validation error', async ({
    mainPage,
  }) => {
    const frame = await bootstrapDialogOpen(mainPage);

    await frame.getByLabel(/Equivalent marker mappings/i).fill('');
    await frame.getByLabel(/Markers to be displayed \(blank for all\)/i).fill('\\p \\q1 \\q2');

    await frame.getByRole('button', { name: /^OK$/ }).click();

    // No validation alert — markerFilter has no format rules.
    await expect(frame.getByRole('alertdialog')).not.toBeVisible();
    await expect(frame.getByRole('dialog').first()).not.toBeVisible({ timeout: 5_000 });
  });
});
