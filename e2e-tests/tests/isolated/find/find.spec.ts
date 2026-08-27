/**
 * E2E tests for the Find UI in Simple interface mode.
 *
 * These tests spin up their own isolated Electron instance and auto-open the testWEB project before
 * the suite runs. testWEB is a programmatic copy of the WEB asset with a unique project ID and
 * Editable=T, reset to a clean state before each worker run to prevent test pollution.
 *
 * Run via: `npm run test:e2e:isolated find`
 *
 * OR by path: `npm run test:e2e:isolated tests/isolated/find/find.spec.ts`
 *
 * ## Simple mode, declared rather than inherited
 *
 * `find.fixture` pins `platform.interfaceMode: 'simple'`, `platform.interfaceLanguage: ['en']` and
 * the window size before launch. All three change what this suite sees: Simple mode hides the
 * Find/Replace mode toggle and the entire Replace surface (`hideModeToggle`), every text-based
 * selector here is English-only, and the tab bar's overflow behaviour depends on window width.
 *
 * Replace is therefore untestable from here. It is covered by `replace.spec.ts` in this directory,
 * which pins Power interface mode for exactly that reason.
 *
 * ## A permanent tab, not a panel you open and close
 *
 * In Simple mode Find is seeded into the static layout as a permanent Column 3 tab with
 * `isClosable: false`, so:
 *
 * - There is no close button. Any teardown that waits for `.dock-tab-close-btn` waits forever.
 * - The panel never unmounts, so its state (search term, filters, scope) LEAKS between tests. Every
 *   test starts by calling {@link openFindPanel}, which activates the tab and resets that state.
 * - The search history leaks FURTHER than that. It is not panel state at all: the find WebView reads
 *   and writes it through the `platformScripture.findHistory` data provider, which persists it in
 *   extension user data, so it also survives the Electron process and every previous run of this
 *   suite on the same machine. {@link resetFindPanel} empties it through the data provider — the
 *   panel offers no clear-history control.
 * - "Opening" Find fronts the tab that already exists. A test that asserts the Find tab is _visible_
 *   therefore proves nothing — it is visible from startup. Assertions key off tab ACTIVATION
 *   (`.dock-tab-active`) or in-panel state instead.
 *
 * ## Stable selectors
 *
 * Tabs and iframes are matched by the fixed UUID the simple layout assigns the Find web view
 * ({@link FIND_WEB_VIEW_UUID}), via the `data-web-view-id` attribute, not by their localized text
 * label — Simple mode hides the tab label entirely once the column collapses. Match the UUID as a
 * PREFIX: the renderer suffixes every web view id from a shared layout with the window it was
 * loaded into (`-w1`, `-w2`, ...), so the rendered attribute is the UUID plus that suffix.
 *
 * At 1280 px not every Column 3 tab fits the visible portion of the tab bar. rc-tabs renders all
 * tab nodes at all times but clips those that overflow, so `toBeAttached()` succeeds for a clipped
 * tab while `toBeVisible()` fails. {@link activateTab} handles both cases, clicking the tab directly
 * when visible and otherwise going through the `.dock-nav-more` overflow dropdown. This mirrors
 * `clickCommentsTab` in `tests/isolated/comments-tab.spec.ts`, the proven precedent for a
 * permanent, non-closable Column 3 tab.
 */

import { Frame, FrameLocator, Locator, Page } from '@playwright/test';
import {
  test,
  expect,
  clearFindHistory,
  getAvailableProjects,
  openScriptureEditor,
  WEB_COPY_PROJECT_ID,
} from '../../../fixtures/find.fixture';
import { waitForAppReady, PROCESS_READY_TIMEOUT } from '../../../fixtures/helpers';
import {
  EDITOR_HAMBURGER_SELECTOR,
  findScriptureEditorFrame,
} from '../../../fixtures/scripture-editor-helpers';

// The layout this suite's assertions are written against — in particular the Column 3 tab overflow
// behaviour that activateTab has to cope with.
test.use({ windowSize: { width: 1280, height: 800 } });

// Every test activates the Find tab, resets the panel, and then runs a search that can take a long
// time on a loaded worker. Give them all the same generous budget rather than sprinkling
// per-describe overrides.
test.describe.configure({ timeout: 180_000 });

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Fixed UUID for the Find tab in Column 3 of the simple layout. Source:
 * src/renderer/components/docking/simple-layout.data.ts
 */
const FIND_WEB_VIEW_UUID = 'f1e2d3c4-b5a6-4789-9c0d-1e2f3a4b5c6d';

/**
 * Fixed UUID for the Commentaries tab, the Column 3 sibling used to take activation away from Find.
 * Source: src/renderer/components/docking/simple-layout.data.ts
 */
const COMMENTARIES_WEB_VIEW_UUID = '6c950d23-f8d7-4482-a384-93ea0481698b';

/**
 * A common word present in the WEB project. Tests that need results rely on this term. If tests
 * fail with "no results found", update this term to something that appears in the test project.
 */
const COMMON_SEARCH_TERM = 'the';

/**
 * A rare term whose result count stays under the 100-result batch cap, so its counter is
 * distinguishable from a common word's capped "1 of 100".
 */
const RARE_SEARCH_TERM = 'Bartholomew';

/** A word unlikely to exist in any scripture project, used to test the "no results" state. */
const NO_MATCH_TERM = 'ZZZQQQXXX_NORESULT_12345';

/** History debounce delay (ms). Must match HISTORY_DEBOUNCE_DELAY_MS in find.web-view.tsx. */
const HISTORY_DEBOUNCE_MS = 5_000;

/**
 * Accessible name of the X button in the search input. Matched exactly: the component library also
 * defines a "Clear search results" label, which a substring match would pick up too.
 */
const CLEAR_SEARCH_LABEL = 'Clear search';

/**
 * How long to wait for a search to produce results. The findInScripture PDP factory initializes
 * lazily on first request and can take 60–120 s on a cold start while the C# backend loads project
 * data; `beforeAll` warms it, but a loaded worker can still be slow.
 */
const SEARCH_TIMEOUT_MS = 150_000;

// ---------------------------------------------------------------------------
// Suite state
// ---------------------------------------------------------------------------

/**
 * The project this suite opened a scripture editor for, set in `beforeAll`.
 *
 * The find WebView keys its history by the scroll group's source project, which is this one, so
 * this is the project whose history {@link resetFindPanel} has to clear for the panel to see the
 * change.
 */
let openedProjectId: string | undefined;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** The tab-title element for a Column 3 web view, matched by its layout UUID prefix. */
function tabTitleForWebView(mainPage: Page, uuid: string): Locator {
  return mainPage.locator(`.platform-tab-title[data-web-view-id^="${uuid}"]`);
}

/** The `.dock-tab` wrapper around a web view's tab title — this is what carries the active class. */
function dockTabForWebView(mainPage: Page, uuid: string): Locator {
  return mainPage.locator('.dock-tab').filter({ has: tabTitleForWebView(mainPage, uuid) });
}

/**
 * FrameLocator for the Find panel's iframe.
 *
 * Uses the UUID-based `data-web-view-id` attribute (set by `web-view.component.tsx`) rather than
 * `iframe[title="Find"]`, which depends on the localization service having initialized before the
 * WebView's first `getWebView()` call. The UUID attribute is always present.
 */
function findPanelFrame(mainPage: Page): FrameLocator {
  return mainPage.frameLocator(`iframe[data-web-view-id^="${FIND_WEB_VIEW_UUID}"]`);
}

/**
 * The status-bar paragraph under the results list. Carries the result count, the "No results found"
 * message, and the regex error message.
 *
 * `role="status"` is excluded deliberately. The three results-area placeholders (idle,
 * no-open-projects, invalid-query) render through `EmptyState`, which adds `role="status"` and is
 * given the same `tw:text-center tw:font-light` classes by `ResultsPlaceholder` — so without this
 * the idle placeholder would satisfy every "a search finished" assertion in the file.
 */
function resultsMessage(frame: FrameLocator): Locator {
  return frame.locator('p:not([role="status"]).tw\\:font-light.tw\\:text-center');
}

/**
 * Activate a Column 3 tab, coping with rc-tabs overflow.
 *
 * If the tab title is scrolled outside the visible portion of the tab bar, hover the
 * `.dock-nav-more` overflow button to open the dropdown and activate it from there.
 */
async function activateTab(mainPage: Page, uuid: string): Promise<void> {
  const tabTitle = tabTitleForWebView(mainPage, uuid);
  await expect(tabTitle).toBeAttached({ timeout: 120_000 });

  if (await tabTitle.isVisible()) {
    await tabTitle.click();
  } else {
    // Tab is outside the visible scroll area — open the overflow dropdown and activate it.
    const dockBar = mainPage.locator('.dock-bar').filter({ has: tabTitle });
    await dockBar.locator('.dock-nav-more').hover();
    // rc-tabs re-renders the tab title (including data-web-view-id) in the overflow popup.
    await mainPage
      .locator('[role="listbox"] [role="option"]')
      .filter({ has: mainPage.locator(`[data-web-view-id^="${uuid}"]`) })
      .click({ timeout: 5_000 });
  }

  await expect(dockTabForWebView(mainPage, uuid)).toHaveClass(/dock-tab-active/, {
    timeout: 10_000,
  });
}

/**
 * Bring the Find tab to the front.
 *
 * Asserts the tab became ACTIVE rather than merely visible: in Simple mode the Find tab exists and
 * is visible from startup, so a visibility check would pass even if the activation did nothing.
 */
async function activateFindTab(mainPage: Page): Promise<FrameLocator> {
  await activateTab(mainPage, FIND_WEB_VIEW_UUID);
  const frame = findPanelFrame(mainPage);
  await expect(frame.locator('#search-term')).toBeVisible({ timeout: 30_000 });
  return frame;
}

/**
 * Invoke Find the way a user does, from the scripture editor's hamburger ("Project") menu.
 *
 * The hamburger button and its Radix menu both render INSIDE the editor's iframe (the menu portals
 * to the iframe body), while Find itself is a tab at main-page level.
 */
async function invokeFindFromHamburger(mainPage: Page): Promise<void> {
  const editorFrame = await findScriptureEditorFrame(mainPage);

  const hamburger = editorFrame.locator(EDITOR_HAMBURGER_SELECTOR);
  await expect(hamburger).toBeVisible({ timeout: 15_000 });
  await hamburger.click();

  // Anchored to the exact label "Find" (%webView_platformScriptureEditor_openFind%).
  const findMenuItem = editorFrame.getByRole('menuitem', { name: /^find$/i });
  await expect(findMenuItem).toBeVisible({ timeout: 5_000 });
  await findMenuItem.click();
}

/**
 * Return the Find panel to a known state: empty search term, default filters, book scope, and empty
 * search history.
 *
 * The panel is a permanent tab that never unmounts, so the search term, the filters, and the scope
 * all survive from one test to the next, and the history survives even longer (see the note on
 * {@link clearFindHistory}). Without this, a test's result depends on which tests ran before it —
 * and, for the history, on what earlier RUNS of the suite left behind.
 *
 * Must run while the tab is ACTIVE: an inactive rc-dock pane is `display: none`, and clicks into a
 * hidden subtree do nothing.
 */
async function resetFindPanel(frame: FrameLocator): Promise<void> {
  // Clear the search term. The X button only exists while the input is non-empty, so an
  // already-empty panel needs no click.
  const clearButton = frame.getByRole('button', { name: CLEAR_SEARCH_LABEL, exact: true });
  if (await clearButton.isVisible()) await clearButton.click();
  await expect(frame.locator('#search-term')).toHaveValue('');

  // Reset the filters.
  await frame.getByRole('button', { name: /toggle filters/i }).click();
  const matchCase = frame.locator('#matchCase');
  await expect(matchCase).toBeVisible({ timeout: 5_000 });
  if (await matchCase.isChecked()) await matchCase.click();
  const allowRegex = frame.locator('#allowRegex');
  if (await allowRegex.isChecked()) await allowRegex.click();
  const noWordRestriction = frame.locator('#wordRestriction-none');
  if (!(await noWordRestriction.isChecked())) await noWordRestriction.click();
  // Every toggle in the filters panel has to be listed here, not just the ones a test happens to
  // use today: the panel belongs to a worker-scoped app, so anything left on leaks into every later
  // test in the file. A toggle added to the panel and not added here is invisible until some future
  // test sets it, and then presents as that test corrupting its neighbours rather than as a gap in
  // this reset.
  const ignoreWhitespace = frame.locator('#ignoreWhitespaceDifferences');
  if (await ignoreWhitespace.isChecked()) await ignoreWhitespace.click();
  const ignoreDiacritics = frame.locator('#ignoreDiacritics');
  if (await ignoreDiacritics.isChecked()) await ignoreDiacritics.click();
  await matchCase.press('Escape');
  await expect(matchCase).not.toBeVisible({ timeout: 5_000 });

  // Reset the scope to the whole book.
  await frame.getByRole('button', { name: /showing/i }).click();
  const bookScope = frame.locator('#scope-book');
  await expect(bookScope).toBeVisible({ timeout: 5_000 });
  if (!(await bookScope.isChecked())) await bookScope.click();
  await bookScope.press('Escape');
  await expect(bookScope).not.toBeVisible({ timeout: 5_000 });

  // The idle placeholder is the panel's "no search has run" state, and it is only reached once
  // `searchStatus` is back to undefined — which is exactly what the X button's `onStopSearch(true)`
  // does. Waiting for it therefore confirms both that the clear landed AND that the catch-up search
  // which fires when the tab is activated (see `useRunWhenVisible` in find.web-view.tsx) is gone
  // rather than still in flight and about to overwrite the search this test is about to run.
  //
  // A short timeout on purpose: clearing is synchronous state, so this resolves in seconds or not
  // at all. Waiting a full search timeout here would turn one systemic breakage into half an hour
  // of identical timeouts.
  await expect(frame.locator('[data-testid="find-idle-placeholder"]')).toBeVisible({
    timeout: 30_000,
  });

  // Empty the search history LAST, once the search term is already blank. Clearing the term above
  // cancels the pending 5 s history debounce (the effect re-runs with an empty term and clears its
  // timer), so nothing left over from the previous test can push an entry back in after this point.
  await clearFindHistory(openedProjectId);
  // The panel is subscribed to the history data provider, so waiting for its button to disappear
  // confirms the empty list actually reached the panel rather than just landing in storage.
  await expect(recentSearchesButton(frame)).toHaveCount(0, { timeout: 15_000 });
}

/**
 * Standard per-test entry point: bring Find to the front and reset it to a known state.
 *
 * The reset has to follow the activation (a hidden pane cannot be clicked), so the activation's
 * catch-up search may briefly run with the previous test's term. `resetFindPanel` waits for the
 * idle placeholder, which is only reached once that search is gone.
 */
async function openFindPanel(mainPage: Page): Promise<FrameLocator> {
  const frame = await activateFindTab(mainPage);
  await resetFindPanel(frame);
  return frame;
}

/**
 * Type a search term in the search input and wait for the results counter to appear. The counter
 * shows either "N of M" or "– of M" once a search completes.
 */
async function fillSearchAndWaitForResults(frame: FrameLocator, term: string): Promise<void> {
  await frame.locator('#search-term').fill(term);
  // Press Enter to start the search immediately, bypassing the 500 ms debounce.
  await frame.locator('#search-term').press('Enter');
  await expect(frame.locator('.tw\\:tabular-nums')).toBeVisible({ timeout: SEARCH_TIMEOUT_MS });
}

/** Click the X (clear search) button in the search input. */
async function clickClearSearch(frame: FrameLocator): Promise<void> {
  const clearButton = frame.getByRole('button', { name: CLEAR_SEARCH_LABEL, exact: true });
  await expect(clearButton).toBeVisible({ timeout: 5_000 });
  await clearButton.click();
}

/**
 * The button that opens the recent searches dropdown.
 *
 * `RecentSearches` renders nothing at all while the history is empty, so this locator matching
 * nothing means "the history is empty", not "the button is hidden".
 */
function recentSearchesButton(frame: FrameLocator): Locator {
  return frame.getByRole('button', { name: /show recent searches/i });
}

/** Open the recent searches history dropdown. */
async function openHistoryDropdown(frame: FrameLocator): Promise<void> {
  await expect(recentSearchesButton(frame)).toBeVisible({ timeout: 5_000 });
  await recentSearchesButton(frame).click();
}

/** Open the filters dropdown (the SlidersHorizontal / Toggle filters button). */
async function openFiltersPanel(frame: FrameLocator): Promise<void> {
  const filtersBtn = frame.getByRole('button', { name: /toggle filters/i });
  await expect(filtersBtn).toBeVisible({ timeout: 5_000 });
  await filtersBtn.click();
}

/**
 * Get the first search result card. Each result renders a `ResultsCard` which produces
 * `div[role="button"][aria-pressed]`. We target this directly rather than `div.pr-twp` because the
 * root panel container is also a `div.pr-twp` and would match first.
 */
function firstResultCard(frame: FrameLocator): Locator {
  return frame.locator('[role="button"][aria-pressed]').first();
}

/**
 * Every term this suite types into the search box. A selection equal to one of these would let the
 * pre-fill assertion in "Editor selection to Find" pass without the selection ever reaching Find,
 * because the panel restores the project's last search term into an empty box on mount.
 */
const SEARCHED_TERMS = [COMMON_SEARCH_TERM, RARE_SEARCH_TERM, NO_MATCH_TERM];

/**
 * Select the first word in the editor's text that is long enough to be distinctive and is not one
 * of `excludedWords`, and return the selected text. A programmatic Range keeps the setup
 * deterministic — a positional double-click can land on a verse number or whitespace — while still
 * producing the real DOM selection the Find triggers read.
 */
async function selectDistinctiveWordInEditor(
  editorFrame: Frame,
  excludedWords: string[],
): Promise<string> {
  return editorFrame.evaluate((excluded: string[]) => {
    const content = document.querySelector('.editor-input');
    if (!content) throw new Error('Editor content (.editor-input) not found');
    const isExcluded = (word: string) =>
      excluded.some((candidate) => candidate.toLowerCase() === word.toLowerCase());
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
    const wordPattern = /\p{L}{6,}/gu;
    let node = walker.nextNode();
    while (node) {
      const text = node.textContent ?? '';
      wordPattern.lastIndex = 0;
      let match = wordPattern.exec(text);
      while (match) {
        if (!isExcluded(match[0])) {
          const range = document.createRange();
          range.setStart(node, match.index);
          range.setEnd(node, match.index + match[0].length);
          const selection = window.getSelection();
          if (!selection) throw new Error('No selection object available in the editor frame');
          selection.removeAllRanges();
          selection.addRange(range);
          // Collapsed footnotes live inside `.editor-input` but are `display: none`, and
          // `Selection.toString()` is empty over hidden content. Keep walking rather than handing
          // back a word the user could not have selected.
          if (selection.toString().trim()) return selection.toString();
          selection.removeAllRanges();
        }
        match = wordPattern.exec(text);
      }
      node = walker.nextNode();
    }
    throw new Error(
      'No distinctive word (6+ letters, visible, not an excluded search term) found in the editor',
    );
  }, excludedWords);
}

/**
 * Undo {@link selectDistinctiveWordInEditor} so no selection leaks into later tests: drop the
 * document selection, and press inside the editor's text content, which is what clears the tab's
 * pointer-press selection snapshot.
 */
async function clearEditorSelection(editorFrame: Frame): Promise<void> {
  await editorFrame.evaluate(() => {
    window.getSelection()?.removeAllRanges();
    document
      .querySelector('.editor-input')
      ?.dispatchEvent(new Event('pointerdown', { bubbles: true }));
  });
}

// ---------------------------------------------------------------------------
// Worker-level setup — runs once before any test in this file.
// Opens a scripture editor so the hamburger menu is available throughout
// the suite, and warms the findInScripture PDP.
// ---------------------------------------------------------------------------

test.beforeAll(async ({ electronApp }) => {
  // The warm-up can take up to 120 s (app start + PDP cold-start); use a generous timeout so the
  // beforeAll itself never races against the default 120 s Playwright timeout.  On retried workers
  // the Electron process must restart from scratch, which can push the total close-to-240 s.
  test.setTimeout(240_000);

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

  openedProjectId = scriptureProject.id;
  await openScriptureEditor(scriptureProject.id);

  // Wait for the editor's Project hamburger button to confirm the editor is ready.
  // We cannot use nth(0) here because other webviews (home page, helloRock3) may appear before
  // the scripture editor in the iframe list. findScriptureEditorFrame scans all frames.
  await findScriptureEditorFrame(page);

  console.log('[find tests] Scripture editor is ready');

  // Warm up the findInScripture PDP: it initializes lazily on first request (60–120 s cold
  // start while the C# backend loads five overlay PDPs), so kick it off here rather than
  // making the first test absorb the cost.
  console.log('[find tests] Warming up findInScripture PDP...');
  const findFrame = await activateFindTab(page);
  await findFrame.locator('#search-term').fill(COMMON_SEARCH_TERM);
  await findFrame.locator('#search-term').press('Enter');

  // Wait for either the counter (results found) or the results/no-results paragraph.
  await expect(
    findFrame.locator('.tw\\:tabular-nums').or(resultsMessage(findFrame)).first(),
  ).toBeVisible({ timeout: SEARCH_TIMEOUT_MS });

  console.log('[find tests] findInScripture PDP is warm');
});

// ---------------------------------------------------------------------------
// Tests: Panel Basics
// ---------------------------------------------------------------------------

test.describe('Find Panel Basics', () => {
  test('should activate the Find tab and focus the search box when invoked from the editor hamburger menu', async ({
    mainPage,
  }) => {
    // Take activation away from Find first. In Simple mode the Find tab always exists and is
    // always visible, so the only thing an invoke can change is which Column 3 tab is active and
    // where the caret lands — assert on those, not on the tab's existence.
    await openFindPanel(mainPage);
    await activateTab(mainPage, COMMENTARIES_WEB_VIEW_UUID);
    const findTab = dockTabForWebView(mainPage, FIND_WEB_VIEW_UUID);
    // Assert the tab is there before asserting it is not active, so that a selector which matched
    // nothing could not satisfy the negated check below.
    await expect(findTab).toBeAttached();
    await expect(findTab).not.toHaveClass(/dock-tab-active/);

    await invokeFindFromHamburger(mainPage);

    await expect(findTab).toHaveClass(/dock-tab-active/, { timeout: 15_000 });
    // Landing on the search box is the point of the invoke (see use-focus-search-on-invoke.hook.ts).
    await expect(findPanelFrame(mainPage).locator('#search-term')).toBeFocused({ timeout: 15_000 });
  });

  test('should render the search input and scope selector', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);

    // Search input
    await expect(frame.locator('#search-term')).toBeVisible();

    // Note: the "show recent searches" button is only rendered when search history is non-empty,
    // so it is not checked here. See the Search History tests for history button coverage.

    // Scope selector ("Showing <book>" button)
    await expect(frame.getByRole('button', { name: /showing/i })).toBeVisible();

    // The Find/Replace mode toggle is hidden in Simple mode (`hideModeToggle` in
    // find.component.tsx), which is what makes Replace untestable from this suite. Assert its
    // absence so that re-introducing it here does not go unnoticed.
    await expect(frame.getByRole('radio', { name: /^replace$/i })).toHaveCount(0);
    await expect(frame.getByRole('radio', { name: /^find$/i })).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// Tests: Selection carried into Find
// ---------------------------------------------------------------------------

test.describe('Editor selection to Find', () => {
  // Longer than the file-wide 180 s: this test waits for editor text (60 s) on top of a panel
  // reset and a cold-start search (SEARCH_TIMEOUT_MS), which can sum past the file default.
  test.describe.configure({ timeout: 300_000 });

  test('pre-fills and searches the editor selection when Find is invoked from the editor menu', async ({
    mainPage,
  }) => {
    // Reset before selecting anything. With the box empty and the history cleared, a pre-filled
    // value can only have come from the selection — the panel has no earlier term left to restore,
    // so the assertion below cannot pass vacuously.
    const frame = await openFindPanel(mainPage);

    const editorFrame = await findScriptureEditorFrame(mainPage);
    // Wait for verse text to populate, not just for the container to exist — the helper needs real
    // words to select.
    await expect(editorFrame.locator('.editor-input')).toContainText(/\p{L}{6,}/u, {
      timeout: 60_000,
    });

    const selectedText = (await selectDistinctiveWordInEditor(editorFrame, SEARCHED_TERMS)).trim();
    // A word rendered inside a collapsed footnote is `display: none`, and `Selection.toString()`
    // returns '' over hidden content. Assert the selection is real before using it, or the
    // `toHaveValue(selectedText)` check below passes vacuously against an empty search box.
    expect(selectedText).not.toBe('');

    try {
      await invokeFindFromHamburger(mainPage);

      await expect(frame.locator('#search-term')).toHaveValue(selectedText, { timeout: 15_000 });
      // The panel searches the pre-filled term immediately; the results counter proves it ran.
      await expect(frame.locator('.tw\\:tabular-nums')).toBeVisible({
        timeout: SEARCH_TIMEOUT_MS,
      });
    } finally {
      // Leave no selection behind, including when an assertion above threw. Nothing else in this
      // suite reaches into the editor iframe, so without this the selection — and the pointer-press
      // snapshot built from it — would pre-fill every later Find invoke in this file and kick off an
      // unintended search before those tests type their own term.
      await clearEditorSelection(editorFrame);
    }
  });
});

// ---------------------------------------------------------------------------
// Tests: Search Results
// ---------------------------------------------------------------------------

test.describe('Search Results', () => {
  test('should display results when a search term is entered', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);

    await fillSearchAndWaitForResults(frame, COMMON_SEARCH_TERM);

    // At least one result card should appear
    await expect(firstResultCard(frame)).toBeVisible({ timeout: 20_000 });
  });

  test('should update results when the search term is modified', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);

    await fillSearchAndWaitForResults(frame, COMMON_SEARCH_TERM);
    const counterFirst = await frame.locator('.tw\\:tabular-nums').textContent();

    // Switch to a rare term: "Bartholomew" (4 occurrences) stays under the 100-result batch
    // cap, so its counter must differ — another common word would cap at "1 of 100" like the
    // first term and the counter would never change. Scope defaults to the current book, which
    // may contain 0 matches, so the assertion below accepts either a changed counter or the
    // "no results" paragraph; both confirm the results updated.
    await frame.locator('#search-term').fill(RARE_SEARCH_TERM);
    await frame.locator('#search-term').press('Enter');

    // Use isVisible() for non-blocking checks so the predicate never hangs waiting for an
    // element that may never reappear (counter disappears when results are cleared).
    await expect(async () => {
      const counterVisible = await frame.locator('.tw\\:tabular-nums').isVisible();
      if (counterVisible) {
        // Counter is visible — verify it changed from the original 'the' search
        const counterSecond = await frame
          .locator('.tw\\:tabular-nums')
          .textContent({ timeout: 1_000 });
        expect(counterSecond).not.toBe(counterFirst);
      } else if (await resultsMessage(frame).isVisible()) {
        // No-results paragraph appeared — search completed with 0 results (results changed)
      } else {
        // Neither visible yet — search still in progress, keep waiting
        throw new Error('Waiting for Bartholomew search to produce results');
      }
    }).toPass({ timeout: 30_000 });
  });

  test('should clear results when the clear (X) button is clicked', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);

    await fillSearchAndWaitForResults(frame, COMMON_SEARCH_TERM);
    await expect(firstResultCard(frame)).toBeVisible({ timeout: 10_000 });

    // Click X to clear
    await clickClearSearch(frame);

    // Results and counter should disappear; input should be empty
    await expect(frame.locator('.tw\\:tabular-nums')).not.toBeVisible({ timeout: 5_000 });
    await expect(frame.locator('#search-term')).toHaveValue('');
    await expect(firstResultCard(frame)).not.toBeVisible({ timeout: 5_000 });
  });

  test('should show no-results message for a term with no matches', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);

    await frame.locator('#search-term').fill(NO_MATCH_TERM);

    await expect(frame.getByText(/no results found/i)).toBeVisible({ timeout: 20_000 });
  });
});

// ---------------------------------------------------------------------------
// Tests: Search History
//
// Two things commit a term to the recent-searches list, and only two: pressing Enter, and five
// seconds of inactivity. `addToHistory` has exactly four callers — unmount, the idle debounce, a
// search-options change, and an explicit search — so neither clearing the box nor opening a result
// records anything, and a test asserting either would be asserting behaviour the panel does not
// have. Add one only alongside the product change that makes it true.
// ---------------------------------------------------------------------------

test.describe('Search History', () => {
  test('should add search term to history after 5 seconds of inactivity', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);

    const term = `histtest-debounce-${Date.now()}`;
    await frame.locator('#search-term').fill(term);

    // Wait for the 5-second debounce timer to fire (+ a small buffer)
    await mainPage.waitForTimeout(HISTORY_DEBOUNCE_MS + 500);

    await openHistoryDropdown(frame);
    await expect(frame.getByRole('option', { name: term })).toBeVisible({ timeout: 5_000 });
  });

  test('should add search term to history immediately when Enter is pressed', async ({
    mainPage,
  }) => {
    const frame = await openFindPanel(mainPage);

    const term = `histtest-enter-${Date.now()}`;
    const searchInput = frame.locator('#search-term');
    await searchInput.fill(term);
    await searchInput.press('Enter');

    // History updates synchronously on Enter — no debounce wait needed
    await openHistoryDropdown(frame);
    await expect(frame.getByRole('option', { name: term })).toBeVisible({ timeout: 5_000 });
  });
});

// ---------------------------------------------------------------------------
// Tests: Search Filters
//
// No Replace-mode tests belong here. Simple mode hides the Find/Replace toggle and renders no
// Replace surface at all (`hideModeToggle`), so mode switching, Preserve Case, per-result replace
// and Replace All have nothing to drive. They live in `replace.spec.ts`, which pins Power mode.
// ---------------------------------------------------------------------------

test.describe('Search Filters', () => {
  test('should show an error message when an invalid regex pattern is entered in regex mode', async ({
    mainPage,
  }) => {
    const frame = await openFindPanel(mainPage);

    // Enable regex mode via the filters panel
    await openFiltersPanel(frame);
    const regexCheckbox = frame.locator('#allowRegex');
    await expect(regexCheckbox).toBeVisible({ timeout: 5_000 });
    if (!(await regexCheckbox.isChecked())) await regexCheckbox.click();
    await expect(regexCheckbox).toBeChecked();
    // Close the filters panel (Escape moves focus back to the trigger)
    await regexCheckbox.press('Escape');

    // Enter an invalid regex pattern (unclosed bracket) and submit
    await frame.locator('#search-term').fill('[unclosed');
    await frame.locator('#search-term').press('Enter');

    // The UI should display an error, not crash or hang
    await expect(frame.getByText(/an error occurred/i)).toBeVisible({ timeout: 20_000 });
  });

  test('should apply match-case and whole-word filters simultaneously without crashing', async ({
    mainPage,
  }) => {
    const frame = await openFindPanel(mainPage);

    // Search with defaults first so there is a current term to re-search when filters change
    await fillSearchAndWaitForResults(frame, COMMON_SEARCH_TERM);

    // Open filters and enable Match Case
    await openFiltersPanel(frame);
    const matchCaseCheckbox = frame.locator('#matchCase');
    await expect(matchCaseCheckbox).toBeVisible({ timeout: 5_000 });
    if (!(await matchCaseCheckbox.isChecked())) await matchCaseCheckbox.click();
    await expect(matchCaseCheckbox).toBeChecked();

    // Also enable Whole Word (radio button)
    const wholeWordRadio = frame.locator('#wordRestriction-wholeWord');
    await expect(wholeWordRadio).toBeVisible({ timeout: 5_000 });
    await wholeWordRadio.click();
    await expect(wholeWordRadio).toBeChecked();

    // Close filters panel
    await matchCaseCheckbox.press('Escape');

    // After both filters are applied the search re-runs automatically. Either the counter
    // updates (different result count) or the no-results paragraph appears — either confirms
    // both filters are honoured without a crash.
    await expect(frame.locator('.tw\\:tabular-nums').or(resultsMessage(frame)).first()).toBeVisible(
      { timeout: 30_000 },
    );
  });
});

// ---------------------------------------------------------------------------
// Tests: Scope Switching
// ---------------------------------------------------------------------------

test.describe('Scope Switching', () => {
  test('should re-search and update results when the scope is changed', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);

    // Run an initial search with the default book scope
    await fillSearchAndWaitForResults(frame, COMMON_SEARCH_TERM);

    // Open the scope selector and switch to chapter scope
    const scopeBtn = frame.getByRole('button', { name: /showing/i });
    await expect(scopeBtn).toBeVisible({ timeout: 5_000 });
    const initialScopeText = await scopeBtn.textContent();
    await scopeBtn.click();

    const chapterRadio = frame.locator('#scope-chapter');
    await expect(chapterRadio).toBeVisible({ timeout: 5_000 });
    await chapterRadio.click();

    // Close the scope popover so the counter is unobscured
    await chapterRadio.press('Escape');

    // The search re-runs for the new (chapter) scope. Verify by checking:
    // 1. The scope button display updated to show a chapter (e.g. "Genesis 1")
    // 2. A search completed — either results are visible or the no-results message appears.
    //
    // Note: we do not compare the result counter value here because COMMON_SEARCH_TERM ('the')
    // is frequent enough to hit the 100-result batch cap in both book and chapter scopes, which
    // would make the counter identical in both cases and cause a false failure.
    await expect(async () => {
      // Scope button should now show a chapter display (different from the initial book text)
      const newScopeText = await scopeBtn.textContent();
      expect(newScopeText).not.toBe(initialScopeText);

      // A search should have completed with results or no-results
      const counterVisible = await frame.locator('.tw\\:tabular-nums').isVisible();
      if (counterVisible) return;
      if (await resultsMessage(frame).isVisible()) return;
      throw new Error('Waiting for scope-change search to complete');
    }).toPass({ timeout: 30_000 });
  });
});
