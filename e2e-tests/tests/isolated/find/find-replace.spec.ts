/**
 * E2E tests for the Find and Replace UI.
 *
 * These tests spin up their own isolated Electron instance and auto-open the testWEB project before
 * the suite runs. testWEB is a programmatic copy of the WEB asset with a unique project ID and
 * Editable=T, reset to a clean state before each worker run to prevent test pollution.
 *
 * Run via: `npm run test:e2e:isolated`
 */

import { Frame, FrameLocator, Locator, Page } from '@playwright/test';
import {
  test,
  expect,
  getAvailableProjects,
  openScriptureEditor,
  WEB_COPY_PROJECT_ID,
} from '../../../fixtures/find.fixture';
import { waitForAppReady, PROCESS_READY_TIMEOUT } from '../../../fixtures/helpers';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * A common word present in the WEB project. Tests that need results rely on this term. If tests
 * fail with "no results found", update this term to something that appears in the test project.
 */
const COMMON_SEARCH_TERM = 'the';

/**
 * Search term used exclusively by Replace Operations tests. Using a separate term ensures that
 * Replace All cannot deplete COMMON_SEARCH_TERM from the project and break earlier tests that
 * depend on finding results.
 */
const REPLACE_SEARCH_TERM = 'said';

/** A word unlikely to exist in any scripture project, used to test the "no results" state. */
const NO_MATCH_TERM = 'ZZZQQQXXX_NORESULT_12345';

/** History debounce delay (ms). Must match HISTORY_DEBOUNCE_DELAY_MS in find.web-view.tsx. */
const HISTORY_DEBOUNCE_MS = 5_000;

// ---------------------------------------------------------------------------
// Worker-level setup — runs once before any test in this file.
// Opens a scripture editor so the hamburger menu is available throughout
// the suite without repeating the setup in every test.
// ---------------------------------------------------------------------------

test.beforeAll(async ({ electronApp }) => {
  // The warm-up can take up to 120 s (app start + PDP cold-start); use a generous timeout so the
  // beforeAll itself never races against the default 120 s Playwright timeout.
  test.setTimeout(180_000);

  const page = await electronApp.firstWindow({ timeout: PROCESS_READY_TIMEOUT });
  await waitForAppReady(page);

  // `getMetadataForAllProjects` retries internally only during the first 30 s of process uptime.
  // On slower machines, `waitForAppReady` itself can take >30 s, after which the server-side
  // grace period expires and it returns an empty array immediately.  Poll here until the preferred
  // testWEB project or at least one platformScripture.* project appears (max 90 s total) to
  // cover that window and avoid accidentally falling back to a non-scripture project like SDBG.
  const preferredProjectId = WEB_COPY_PROJECT_ID;
  let projects: Awaited<ReturnType<typeof getAvailableProjects>> = [];
  const maxPollMs = 90_000;
  const attemptTimeoutMs = 15_000;
  const pollIntervalMs = 5_000;
  const pollDeadline = Date.now() + maxPollMs;
  const hasUsableProject = (ps: Awaited<ReturnType<typeof getAvailableProjects>>): boolean =>
    ps.some(
      (p) =>
        p.id === preferredProjectId ||
        p.projectInterfaces?.some((iface) => iface.startsWith('platformScripture.')),
    );
  while (!hasUsableProject(projects) && Date.now() < pollDeadline) {
    try {
      // Intentional sequential polling — each attempt must complete before deciding to retry
      // eslint-disable-next-line no-await-in-loop
      projects = await getAvailableProjects(attemptTimeoutMs);
    } catch {
      // Service not ready yet — try again after a short delay
    }
    if (!hasUsableProject(projects) && Date.now() < pollDeadline) {
      // Intentional sequential delay between polling attempts
      // eslint-disable-next-line no-await-in-loop
      await page.waitForTimeout(pollIntervalMs);
    }
  }
  const scriptureProject =
    projects.find((p) => p.id === preferredProjectId) ??
    projects.find((p) =>
      p.projectInterfaces?.some((iface) => iface.startsWith('platformScripture.')),
    ) ??
    projects[0];

  if (!scriptureProject) {
    throw new Error(
      'No projects found. The find tests require at least one scripture project accessible to Platform.Bible.\n' +
        'Please create or register a Paratext project before running these tests.',
    );
  }

  console.log(
    `[find tests] Opening project: ${scriptureProject.id} (interfaces: ${scriptureProject.projectInterfaces?.join(', ') ?? 'unknown'})`,
  );

  await openScriptureEditor(scriptureProject.id);

  // Wait for the editor's Project hamburger button to confirm the editor is ready.
  // We cannot use nth(0) here because other webviews (home page, helloRock3) may appear before
  // the scripture editor in the iframe list. findScriptureEditorFrame scans all frames.
  await findScriptureEditorFrame(page);

  console.log('[find tests] Scripture editor is ready');

  // Warm up the findInScripture PDP.  The PDP engine is created lazily on first request;
  // creating it requires getting five overlay PDPs from the C# backend, which can take
  // 60–120 s on a cold start.  Opening Find here and waiting for the counter kicks off that
  // initialisation early, so individual tests don't absorb the cold-start cost.
  //
  // IMPORTANT: do NOT close the Find panel here.  Closing it leaves the dock tracking a
  // "suspended" web-view; on the next open `openFind` finds that suspended view by existingId
  // but fails to bring it to front, so the dock tab never reappears.  Leave Find open —
  // test 1 (and its afterEach) will close it, and subsequent opens create fresh web views
  // that resolve the PDP quickly because the engine is already warm.
  console.log('[find tests] Warming up findInScripture PDP...');
  const editorFrame = await findScriptureEditorFrame(page);
  const hamburger = editorFrame.locator('button[aria-label="Project"]');
  await expect(hamburger).toBeVisible({ timeout: 15_000 });
  await hamburger.click();
  const findMenuItem = editorFrame.getByRole('menuitem', { name: /find\.\.\./i });
  await expect(findMenuItem).toBeVisible({ timeout: 5_000 });
  await findMenuItem.click();

  const findTab = page.locator('.dock-tab', { hasText: /^Find/i });
  await expect(findTab).toBeVisible({ timeout: 15_000 });

  const findFrame = page.frameLocator('iframe[title="Find"]');
  await findFrame.locator('#search-term').fill(COMMON_SEARCH_TERM);
  await findFrame.locator('#search-term').press('Enter');

  // Wait up to 90 s for either the counter (results found) or the results/no-results paragraph.
  await expect(
    findFrame
      .locator('.tw-tabular-nums')
      .or(findFrame.locator('p.tw-font-light.tw-text-center'))
      .first(),
  ).toBeVisible({ timeout: 90_000 });

  console.log('[find tests] findInScripture PDP is warm — leaving Find open for test 1 to close');
});

// ---------------------------------------------------------------------------
// Worker-level teardown — close any leftover Find panel between tests so that
// a failure in one test cannot pollute the next.
// ---------------------------------------------------------------------------

test.afterEach(async ({ mainPage }) => {
  const findTab = mainPage.locator('.dock-tab', { hasText: /^Find/i });
  const isOpen = await findTab.isVisible();
  if (isOpen) {
    await findTab.locator('.dock-tab-close-btn').dispatchEvent('click');
    await expect(findTab).not.toBeVisible({ timeout: 10_000 });
  }
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Find the scripture editor's frame by scanning all web-view iframes for the one that contains the
 * Project hamburger button.
 *
 * We cannot use `nth(0)` because other webviews (the home page with DEV_NOISY=false, or helloRock3
 * frames with DEV_NOISY=true) may be present before the scripture editor in the iframe list.
 */
async function findScriptureEditorFrame(page: Page, timeout = 30_000): Promise<Frame> {
  const deadline = Date.now() + timeout;

  const checkFrames = async (): Promise<Frame | undefined> =>
    // Using reduce to iterate without for-of (linter requirement). Each step checks a frame and
    // short-circuits once a match is found.
    page
      .frames()
      .filter((f) => f !== page.mainFrame())
      .reduce<Promise<Frame | undefined>>(async (accPromise, frame) => {
        const acc = await accPromise;
        if (acc) return acc;
        try {
          const isVisible = await frame.locator('button[aria-label="Project"]').isVisible();
          if (isVisible) return frame;
        } catch {
          // Frame may not be accessible yet — keep polling
        }
        return undefined;
      }, Promise.resolve(undefined));

  while (Date.now() < deadline) {
    // Polling loop: each check depends on the previous result
    // eslint-disable-next-line no-await-in-loop
    const found = await checkFrames();
    if (found) return found;
    // Polling loop: wait between frame-scan attempts must be sequential
    // eslint-disable-next-line no-await-in-loop
    await page.waitForTimeout(500);
  }
  throw new Error(`Scripture editor not found: no Project button visible after ${timeout}ms`);
}

/**
 * Open the Find panel from the first editor's hamburger menu.
 *
 * @returns A FrameLocator scoped to the Find webview iframe.
 */
async function openFindPanel(mainPage: Page): Promise<FrameLocator> {
  // The TabToolbar renders inside the scripture editor's WebView iframe (shouldShowToolbar: false
  // in the editor's main.ts means the main-page WebView component does not render an outer toolbar).
  // We must scan all web-view iframes to find the one that contains the Project button.
  const editorFrame = await findScriptureEditorFrame(mainPage);

  // Click the hamburger / project menu of the first open editor webview
  const hamburger = editorFrame.locator('button[aria-label="Project"]');
  await expect(hamburger).toBeVisible({ timeout: 15_000 });
  await hamburger.click();

  // Click "Find..." from the dropdown (the Radix DropdownMenuContent portals into the iframe body)
  const findMenuItem = editorFrame.getByRole('menuitem', { name: /find\.\.\./i });
  await expect(findMenuItem).toBeVisible({ timeout: 5_000 });
  await findMenuItem.click();

  // Wait for the Find dock tab to appear
  const findTab = mainPage.locator('.dock-tab', { hasText: /^Find/i });
  await expect(findTab).toBeVisible({ timeout: 15_000 });

  return mainPage.frameLocator('iframe[title="Find"]');
}

/** Close the Find dock tab. */
async function closeFindPanel(mainPage: Page): Promise<void> {
  const findTab = mainPage.locator('.dock-tab', { hasText: /^Find/i });
  await expect(findTab).toBeVisible({ timeout: 5_000 });
  // Use dispatchEvent since the tab may be outside the visible area on narrow viewports
  await findTab.locator('.dock-tab-close-btn').dispatchEvent('click');
  await expect(findTab).not.toBeVisible({ timeout: 10_000 });
}

/**
 * Type a search term in the search input and wait for the results counter to appear. The counter
 * shows either "N of M" or "– of M" once a search completes.
 */
async function fillSearchAndWaitForResults(frame: FrameLocator, term: string): Promise<void> {
  await frame.locator('#search-term').fill(term);
  // Press Enter to start the search immediately, bypassing the 500 ms debounce. Without this,
  // if the input already contains `term` (restored from project settings), the fill() call does
  // not change React state and the debounce never fires, so results never appear.
  await frame.locator('#search-term').press('Enter');
  // Counter matches "N of M", "– of N", or the Spanish equivalent so use a broad regex.
  // Allow up to 150 s: the findInScripture PDP factory initializes lazily on first request and
  // can take 60–120 s on a cold start while the C# backend loads project data.  Even on a warm
  // engine, a fresh web-view instance re-awaits the PDP resolution hook, so the first search in
  // each new Find panel can still take > 90 s.
  await expect(frame.locator('.tw-tabular-nums')).toBeVisible({ timeout: 150_000 });
}

/** Click the X (clear search) button in the search input. */
async function clickClearSearch(frame: FrameLocator): Promise<void> {
  const clearButton = frame.getByRole('button', { name: /clear search/i });
  await expect(clearButton).toBeVisible({ timeout: 5_000 });
  await clearButton.click();
}

/** Open the recent searches history dropdown. */
async function openHistoryDropdown(frame: FrameLocator): Promise<void> {
  const historyButton = frame.getByRole('button', { name: /show recent searches/i });
  await expect(historyButton).toBeVisible({ timeout: 5_000 });
  await historyButton.click();
}

/** Switch to Replace mode by clicking the Replace tab in the mode toggle. */
async function switchToReplaceMode(frame: FrameLocator): Promise<void> {
  // The ToggleGroup with type="single" renders items as role="radio"
  await frame.getByRole('radio', { name: /^replace$/i }).click();
  await expect(frame.locator('#replace-term')).toBeVisible({ timeout: 5_000 });
}

/**
 * Get the first search result card. Each result renders a `ResultsCard` which produces
 * `div[role="button"][aria-pressed]`. We target this directly rather than `div.pr-twp` because the
 * root panel container is also a `div.pr-twp` and would match first.
 */
function firstResultCard(frame: FrameLocator): Locator {
  return frame.locator('[role="button"][aria-pressed]').first();
}

// ---------------------------------------------------------------------------
// Tests: Panel Basics
// ---------------------------------------------------------------------------

test.describe('Find Panel Basics', () => {
  test('should open Find panel from editor hamburger menu', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);

    await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    await closeFindPanel(mainPage);
  });

  test('should render mode toggle, search input, and scope selector', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);

    // Mode toggle buttons (Radix ToggleGroup renders items as role="radio" when type="single")
    await expect(frame.getByRole('radio', { name: /^find$/i })).toBeVisible({ timeout: 10_000 });
    await expect(frame.getByRole('radio', { name: /^replace$/i })).toBeVisible();

    // Search input
    await expect(frame.locator('#search-term')).toBeVisible();

    // Note: the "show recent searches" button is only rendered when search history is non-empty,
    // so it is not checked here. See the Search History tests for history button coverage.

    // Scope selector ("Showing <book>" button)
    await expect(frame.getByRole('button', { name: /showing/i })).toBeVisible();

    await closeFindPanel(mainPage);
  });

  test('should show Replace input and controls when switching to Replace mode', async ({
    mainPage,
  }) => {
    const frame = await openFindPanel(mainPage);

    // In Find mode, replace-specific controls should not be visible
    await expect(frame.locator('#replace-term')).not.toBeVisible({ timeout: 5_000 });
    await expect(frame.locator('#preserve-case')).not.toBeVisible();

    // Switch to Replace mode
    await switchToReplaceMode(frame);

    // Replace input, Preserve Case, and action buttons should now be visible
    await expect(frame.locator('#replace-term')).toBeVisible();
    await expect(frame.locator('#preserve-case')).toBeVisible();
    await expect(frame.getByRole('button', { name: /^replace all$/i })).toBeVisible();
    // There are two "Replace" buttons in replace mode: header action button and per-result button.
    // The header one is always present in replace mode even without results.
    await expect(frame.getByRole('button', { name: /^replace$/i }).first()).toBeVisible();

    await closeFindPanel(mainPage);
  });
});

// ---------------------------------------------------------------------------
// Tests: Search Results
// ---------------------------------------------------------------------------

test.describe('Search Results', () => {
  test('should display results when a search term is entered', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);
    await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    await fillSearchAndWaitForResults(frame, COMMON_SEARCH_TERM);

    // At least one result card should appear
    await expect(firstResultCard(frame)).toBeVisible({ timeout: 20_000 });

    await closeFindPanel(mainPage);
  });

  test('should update results when the search term is modified', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);
    await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    await fillSearchAndWaitForResults(frame, COMMON_SEARCH_TERM);
    const counterFirst = await frame.locator('.tw-tabular-nums').textContent();

    // Switch to a very rare search term. "Bartholomew" appears exactly 4 times in a
    // complete NT-inclusive Bible (Matt 10:3, Mark 3:18, Luke 6:14, Acts 1:13), well below
    // the 100-result batch cap. If we used a common word like "they", it would also hit the
    // cap and produce the same "1 of 100" counter as "the" — so the counter would never change.
    //
    // NOTE: the scope defaults to "book" (current book). Bartholomew may not appear in the
    // current book (e.g. Exodus), giving 0 results. The assertion below handles both:
    //   (a) counter shows a different value (Bartholomew found in current book), or
    //   (b) counter disappears and the "no results" paragraph appears (0 results).
    // Both confirm that results were updated for the new search term.
    //
    // Press Enter after fill to ensure the search runs. When the prior fill() call matched
    // the restored search term exactly (same value → no onChange), the debounce was never
    // scheduled so the explicitSearchPending flag from the previous Enter press was never
    // cleared. The next debounce would then skip the search. Using Enter here bypasses
    // that edge case and mirrors real user behavior (type new term, press Enter).
    await frame.locator('#search-term').fill('Bartholomew');
    await frame.locator('#search-term').press('Enter');

    // Use isVisible() for non-blocking checks so the predicate never hangs waiting for an
    // element that may never reappear (counter disappears when results are cleared).
    await expect(async () => {
      const counterVisible = await frame.locator('.tw-tabular-nums').isVisible();
      if (counterVisible) {
        // Counter is visible — verify it changed from the original 'the' search
        const counterSecond = await frame
          .locator('.tw-tabular-nums')
          .textContent({ timeout: 1_000 });
        expect(counterSecond).not.toBe(counterFirst);
      } else if (await frame.locator('p.tw-font-light.tw-text-center').isVisible()) {
        // No-results paragraph appeared — search completed with 0 results (results changed)
      } else {
        // Neither visible yet — search still in progress, keep waiting
        throw new Error('Waiting for Bartholomew search to produce results');
      }
    }).toPass({ timeout: 30_000 });

    await closeFindPanel(mainPage);
  });

  test('should clear results when the clear (X) button is clicked', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);
    await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    await fillSearchAndWaitForResults(frame, COMMON_SEARCH_TERM);
    await expect(firstResultCard(frame)).toBeVisible({ timeout: 10_000 });

    // Click X to clear
    await clickClearSearch(frame);

    // Results and counter should disappear; input should be empty
    await expect(frame.locator('.tw-tabular-nums')).not.toBeVisible({ timeout: 5_000 });
    await expect(frame.locator('#search-term')).toHaveValue('');
    await expect(firstResultCard(frame)).not.toBeVisible({ timeout: 5_000 });

    await closeFindPanel(mainPage);
  });

  test('should show no-results message for a term with no matches', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);
    await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    await frame.locator('#search-term').fill(NO_MATCH_TERM);

    await expect(frame.getByText(/no results found/i)).toBeVisible({ timeout: 20_000 });

    await closeFindPanel(mainPage);
  });
});

// ---------------------------------------------------------------------------
// Tests: Search History
// ---------------------------------------------------------------------------

test.describe('Search History', () => {
  test('should add search term to history after 5 seconds of inactivity', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);
    await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    const term = `histtest-debounce-${Date.now()}`;
    await frame.locator('#search-term').fill(term);

    // Wait for the 5-second debounce timer to fire (+ a small buffer)
    await mainPage.waitForTimeout(HISTORY_DEBOUNCE_MS + 500);

    await openHistoryDropdown(frame);
    await expect(frame.getByText(term)).toBeVisible({ timeout: 5_000 });

    await closeFindPanel(mainPage);
  });

  test('should add search term to history immediately when Enter is pressed', async ({
    mainPage,
  }) => {
    const frame = await openFindPanel(mainPage);
    await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    const term = `histtest-enter-${Date.now()}`;
    const searchInput = frame.locator('#search-term');
    await searchInput.fill(term);
    await searchInput.press('Enter');

    // History updates synchronously on Enter — no debounce wait needed
    await openHistoryDropdown(frame);
    await expect(frame.getByText(term)).toBeVisible({ timeout: 5_000 });

    await closeFindPanel(mainPage);
  });

  test('should add search term to history when the clear (X) button is clicked', async ({
    mainPage,
  }) => {
    const frame = await openFindPanel(mainPage);
    await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    const term = `histtest-clear-${Date.now()}`;
    await frame.locator('#search-term').fill(term);

    // Clicking X calls onAddToHistory then clears the field
    await clickClearSearch(frame);

    await openHistoryDropdown(frame);
    await expect(frame.getByText(term)).toBeVisible({ timeout: 5_000 });

    await closeFindPanel(mainPage);
  });

  test('should add search term to history when interacting with a search result', async ({
    mainPage,
  }) => {
    const frame = await openFindPanel(mainPage);
    await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    // Use Enter to explicitly start the search (which also adds to history immediately)
    const searchInput = frame.locator('#search-term');
    await searchInput.fill(COMMON_SEARCH_TERM);
    await searchInput.press('Enter');

    // Wait for results and click the first one
    await expect(firstResultCard(frame)).toBeVisible({ timeout: 20_000 });
    await firstResultCard(frame).click();

    await openHistoryDropdown(frame);
    // Use getByRole('option') to scope the match to the history dropdown's CommandItem elements
    // (which have role="option"), not the many result card texts that also contain the search term.
    await expect(frame.getByRole('option', { name: COMMON_SEARCH_TERM })).toBeVisible({
      timeout: 5_000,
    });

    await closeFindPanel(mainPage);
  });

  test('should add search term to history when the Find panel is closed', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);
    await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    const term = `histtest-close-${Date.now()}`;
    // Type a term but do NOT press Enter — closing should save via the unmount effect
    await frame.locator('#search-term').fill(term);

    await closeFindPanel(mainPage);

    // Re-open Find and verify the term is in history
    const frame2 = await openFindPanel(mainPage);
    await expect(frame2.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    await openHistoryDropdown(frame2);
    await expect(frame2.getByText(term)).toBeVisible({ timeout: 5_000 });

    await closeFindPanel(mainPage);
  });
});

// ---------------------------------------------------------------------------
// Tests: Preserve Case
// ---------------------------------------------------------------------------

test.describe('Preserve Case in Replace Mode', () => {
  test('should display the Preserve Case checkbox in Replace mode', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);
    await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    await switchToReplaceMode(frame);

    await expect(frame.locator('#preserve-case')).toBeVisible({ timeout: 5_000 });
    await expect(frame.getByText(/preserve case/i)).toBeVisible();

    await closeFindPanel(mainPage);
  });

  test('should show replace previews in results when Preserve Case is toggled', async ({
    mainPage,
  }) => {
    const frame = await openFindPanel(mainPage);
    await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    await frame.locator('#search-term').fill(COMMON_SEARCH_TERM);
    // Press Enter to start the search immediately (bypasses the 500 ms debounce)
    await frame.locator('#search-term').press('Enter');
    await switchToReplaceMode(frame);

    await frame.locator('#replace-term').fill('a');

    // Verify results are visible before testing preserve case toggle
    await expect(firstResultCard(frame)).toBeVisible({ timeout: 20_000 });

    // Enable Preserve Case and verify the checkbox reflects the new state
    const preserveCaseCheckbox = frame.locator('#preserve-case');
    const wasChecked = await preserveCaseCheckbox.isChecked();
    if (!wasChecked) await preserveCaseCheckbox.click();
    await expect(preserveCaseCheckbox).toBeChecked();

    // Results should still be visible with preserve case enabled
    await expect(firstResultCard(frame)).toBeVisible({ timeout: 5_000 });

    // Disable Preserve Case and verify results remain visible
    await preserveCaseCheckbox.click();
    await expect(preserveCaseCheckbox).not.toBeChecked();
    await expect(firstResultCard(frame)).toBeVisible({ timeout: 5_000 });

    await closeFindPanel(mainPage);
  });

  test('should apply preserve case when a replace operation is performed', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);
    await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

    await frame.locator('#search-term').fill(COMMON_SEARCH_TERM);
    // Press Enter to start the search immediately (bypasses the 500 ms debounce)
    await frame.locator('#search-term').press('Enter');
    await switchToReplaceMode(frame);
    await frame.locator('#replace-term').fill('a');

    // Enable Preserve Case
    const preserveCaseCheckbox = frame.locator('#preserve-case');
    if (!(await preserveCaseCheckbox.isChecked())) await preserveCaseCheckbox.click();
    await expect(preserveCaseCheckbox).toBeChecked();

    // Wait for results
    await expect(firstResultCard(frame)).toBeVisible({ timeout: 20_000 });

    // Click the first result to focus it, then replace via the header Replace button
    await firstResultCard(frame).click();

    const replaceHeaderBtn = frame.getByRole('button', { name: /^replace$/i }).first();
    await expect(replaceHeaderBtn).toBeEnabled({ timeout: 5_000 });
    await replaceHeaderBtn.click();

    // The replace should succeed — the sonner toast "Replaced 1 occurrence" appears inside the
    // Find iframe and persists for several seconds, making it a more stable signal than the
    // brief isReplaced badge (which is cleared as soon as the post-replace re-search starts).
    await expect(frame.getByText(/replaced 1 occurrence/i).first()).toBeVisible({
      timeout: 10_000,
    });

    await closeFindPanel(mainPage);
  });
});

// ---------------------------------------------------------------------------
// Tests: Replace Operations
// ---------------------------------------------------------------------------

/**
 * Set up the Find panel in Replace mode with a search term and replace term, then wait for results.
 * Returns the FrameLocator.
 */
async function setupReplaceMode(
  mainPage: Page,
  searchTerm = REPLACE_SEARCH_TERM,
  replaceTerm = 'replaced',
): Promise<FrameLocator> {
  const frame = await openFindPanel(mainPage);
  await expect(frame.locator('#search-term')).toBeVisible({ timeout: 10_000 });

  await frame.locator('#search-term').fill(searchTerm);
  // Press Enter to start the search immediately (bypasses the 500 ms debounce)
  await frame.locator('#search-term').press('Enter');
  await switchToReplaceMode(frame);
  await frame.locator('#replace-term').fill(replaceTerm);

  // Wait for the first result card to appear
  await expect(firstResultCard(frame)).toBeVisible({ timeout: 20_000 });

  return frame;
}
test.describe('Replace Operations', () => {
  test('should replace the selected result when Enter is pressed on the focused result card', async ({
    mainPage,
  }) => {
    const frame = await setupReplaceMode(mainPage);

    // Click the first card to select it (makes it aria-pressed="true")
    await firstResultCard(frame).click();

    // The first card's inner ResultsCard div now has aria-pressed="true".
    // Calling .press('Enter') focuses the element then dispatches the keydown event.
    const selectedCard = frame.locator('[role="button"][aria-pressed="true"]').first();
    await expect(selectedCard).toBeVisible({ timeout: 5_000 });
    await selectedCard.press('Enter');

    // The result should show "Replaced" visual feedback
    await expect(frame.getByText(/^replaced$/i).first()).toBeVisible({ timeout: 10_000 });

    await closeFindPanel(mainPage);
  });

  test('should replace the focused result when the Replace button in the header is clicked', async ({
    mainPage,
  }) => {
    const frame = await setupReplaceMode(mainPage);

    // Select the first result
    await firstResultCard(frame).click();

    // Click the header Replace button (the first "Replace" button — the action button, not the tab)
    const replaceHeaderBtn = frame.getByRole('button', { name: /^replace$/i }).first();
    await expect(replaceHeaderBtn).toBeEnabled({ timeout: 5_000 });
    await replaceHeaderBtn.click();

    await expect(frame.getByText(/^replaced$/i).first()).toBeVisible({ timeout: 10_000 });

    await closeFindPanel(mainPage);
  });

  test('should replace when the per-result Replace button inside a result card is clicked', async ({
    mainPage,
  }) => {
    const frame = await setupReplaceMode(mainPage);

    // Click the first result to expand/select it — the per-result Replace button appears
    const card = firstResultCard(frame);
    await card.click();

    // The per-result Replace button is rendered inside the selected card
    const resultReplaceBtn = card.getByRole('button', { name: /^replace$/i });
    await expect(resultReplaceBtn).toBeVisible({ timeout: 5_000 });
    await resultReplaceBtn.click();

    await expect(frame.getByText(/^replaced$/i).first()).toBeVisible({ timeout: 10_000 });

    await closeFindPanel(mainPage);
  });

  // Replace All depletes REPLACE_SEARCH_TERM from the project — run it last so the per-result
  // replace tests above can still find results to work with.
  test('should replace all visible results when the Replace All button is clicked', async ({
    mainPage,
  }) => {
    const frame = await setupReplaceMode(mainPage);

    const replaceAllBtn = frame.getByRole('button', { name: /^replace all$/i });
    await expect(replaceAllBtn).toBeEnabled({ timeout: 5_000 });
    await replaceAllBtn.click();

    // The toast "Replaced N occurrences" is the stable signal: the per-card "Replaced" badge
    // appears only briefly before the post-replace re-search calls setResults([]), whereas the
    // toast persists for several seconds.
    await expect(frame.getByText(/replaced \d+ occurrences/i).first()).toBeVisible({
      timeout: 10_000,
    });

    await closeFindPanel(mainPage);
  });
});
