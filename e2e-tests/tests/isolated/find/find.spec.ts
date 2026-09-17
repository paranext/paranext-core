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
 * Tabs and iframes are matched by the Find web view's `data-web-view-id`, not by their localized
 * text label — Simple mode hides the tab label entirely once the column collapses. The id is
 * resolved from the running app by web view type ({@link webViewIdForType}) and matched exactly:
 * materializing the simple layout mints every web view a fresh id, so the constants in
 * `simple-layout.data.ts` are the slot's identity in the data file and never appear in a rendered
 * attribute.
 *
 * At 1280 px not every Column 3 tab fits the visible portion of the tab bar. rc-tabs renders all
 * tab nodes at all times but clips those that overflow, so `toBeAttached()` succeeds for a clipped
 * tab while `toBeVisible()` fails. {@link activateTab} handles both cases, clicking the tab directly
 * when visible and otherwise going through the `.dock-nav-more` overflow dropdown. This mirrors
 * `clickCommentsTab` in `tests/isolated/comments-tab.spec.ts`, the proven precedent for a
 * permanent, non-closable Column 3 tab.
 */

import { ElectronApplication, Frame, FrameLocator, Locator, Page } from '@playwright/test';
import {
  test,
  expect,
  clearFindPersistedState,
  openScriptureEditor,
  waitForProjects,
  WEB_COPY_PROJECT_ID,
} from '../../../fixtures/find.fixture';
import {
  isPopoverTriggerExpanded,
  waitForAppReady,
  waitForOpenWebViewIdByType,
  PROCESS_READY_TIMEOUT,
} from '../../../fixtures/helpers';
import {
  EDITOR_HAMBURGER_SELECTOR,
  findScriptureEditorFrame,
  navigateToolbarBcv,
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

/** Web view type of the Find tab in Column 3 of the simple layout. */
const FIND_WEBVIEW_TYPE = 'platformScripture.find';

/**
 * Web view type of the Commentaries tab, the Column 3 sibling used to take activation away from
 * Find.
 */
const COMMENTARIES_WEBVIEW_TYPE = 'platformScriptureEditor.commentaries';

/**
 * The live web view id for a type in this page, resolved once and reused.
 *
 * The ids in `simple-layout.data.ts` are the slot's identity in the data file, not the runtime
 * tab's: materializing that layout mints every web view a fresh id, so no baked constant ever
 * appears in a rendered `data-web-view-id`. Asking the running app which id a type actually got is
 * the only way to name these tabs, and it is what the multi-window and comments suites do.
 *
 * Cached per page because every test in this file resolves the same two types, and the lookup polls
 * the renderer.
 */
const webViewIdsByPage = new WeakMap<Page, Map<string, Promise<string>>>();
function webViewIdForType(mainPage: Page, webViewType: string): Promise<string> {
  let idsByType = webViewIdsByPage.get(mainPage);
  if (!idsByType) {
    idsByType = new Map();
    webViewIdsByPage.set(mainPage, idsByType);
  }
  const cached = idsByType.get(webViewType);
  if (cached) return cached;
  const resolving = waitForOpenWebViewIdByType(mainPage, webViewType);
  idsByType.set(webViewType, resolving);
  return resolving;
}

/**
 * A common word present in the WEB project. Tests that need results rely on this term. If tests
 * fail with "no results found", update this term to something that appears in the test project.
 */
const COMMON_SEARCH_TERM = 'the';
/**
 * A term whose result count changes observably under each search filter, and stays under the
 * counter's 100-result cap in every state so the change is visible at all. Picking a common word
 * here silently disables the filter assertions — see the comment in the filter test for the
 * counts.
 */
const FILTER_SENSITIVE_TERM = 'LORD';

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

/** The tab-title element for a Column 3 web view, matched by its live web view id. */
function tabTitleForWebView(mainPage: Page, webViewId: string): Locator {
  return mainPage.locator(`.platform-tab-title[data-web-view-id="${webViewId}"]`);
}

/** The `.dock-tab` wrapper around a web view's tab title — this is what carries the active class. */
function dockTabForWebView(mainPage: Page, webViewId: string): Locator {
  return mainPage.locator('.dock-tab').filter({ has: tabTitleForWebView(mainPage, webViewId) });
}

/**
 * FrameLocator for the Find panel's iframe.
 *
 * Uses the `data-web-view-id` attribute (set by `web-view.component.tsx`) rather than
 * `iframe[title="Find"]`, which depends on the localization service having initialized before the
 * WebView's first `getWebView()` call. The id attribute is always present.
 */
async function findPanelFrame(mainPage: Page): Promise<FrameLocator> {
  const findId = await webViewIdForType(mainPage, FIND_WEBVIEW_TYPE);
  return mainPage.frameLocator(`iframe[data-web-view-id="${findId}"]`);
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
async function activateTab(mainPage: Page, webViewType: string): Promise<void> {
  const webViewId = await webViewIdForType(mainPage, webViewType);
  const tabTitle = tabTitleForWebView(mainPage, webViewId);
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
      .filter({ has: mainPage.locator(`[data-web-view-id="${webViewId}"]`) })
      .click({ timeout: 5_000 });
  }

  await expect(dockTabForWebView(mainPage, webViewId)).toHaveClass(/dock-tab-active/, {
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
  await activateTab(mainPage, FIND_WEBVIEW_TYPE);
  const frame = await findPanelFrame(mainPage);
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
 * {@link clearFindPersistedState}). Without this, a test's result depends on which tests ran before
 * it — and, for the history, on what earlier RUNS of the suite left behind.
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

  // Reset the filters. The filters button toggles a Radix popover open/closed, so a click here is
  // only safe once we know the popover is closed — a leftover test that failed while it was open
  // would otherwise get closed by this click instead of opened, and every field below would then
  // find nothing to interact with. Checking first makes the reset converge on "filters open" from
  // either starting point.
  //
  // The whole check-click-confirm sequence is wrapped in toPass, not just the confirmation: Radix's
  // exit animation keeps the popover content in the DOM (and isVisible()-true) while it animates
  // away. Gating the click decision on that content's visibility can land mid-close, report
  // "already open" from a pane that is about to disappear, skip the click, and leave the fields
  // below about to vanish out from under it. The trigger's `aria-expanded` flips synchronously with
  // Radix's open/closed state, unlike the content's visibility, so the decision reads that instead
  // (see `isPopoverTriggerExpanded` and `openUserProfilePopover` in internet-settings.page.ts for the
  // same pattern). toPass still wraps the sequence in case the click itself lands mid-transition.
  const filtersTrigger = frame.getByRole('button', { name: /toggle filters/i });
  const matchCase = frame.locator('#matchCase');
  await expect(async () => {
    if (!isPopoverTriggerExpanded(await filtersTrigger.getAttribute('aria-expanded')))
      await filtersTrigger.click();
    await expect(matchCase).toBeVisible({ timeout: 2_000 });
  }).toPass({ timeout: 5_000 });
  if (await matchCase.isChecked()) await matchCase.click();
  const allowRegex = frame.locator('#allowRegex');
  if (await allowRegex.isChecked()) await allowRegex.click();
  const noWordRestriction = frame.locator('#wordRestriction-none');
  if (!(await noWordRestriction.isChecked())) await noWordRestriction.click();
  const allTextType = frame.locator('#searchTextType-all');
  if (!(await allTextType.isChecked())) await allTextType.click();
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

  // Reset the scope to the whole book. Same open/closed hazard as the filters popover above,
  // including the animate-out race and the aria-expanded-over-visibility fix — see the comment
  // there.
  const scopeTrigger = frame.getByRole('button', { name: /showing/i });
  const bookScope = frame.locator('#scope-book');
  await expect(async () => {
    if (!isPopoverTriggerExpanded(await scopeTrigger.getAttribute('aria-expanded')))
      await scopeTrigger.click();
    await expect(bookScope).toBeVisible({ timeout: 2_000 });
  }).toPass({ timeout: 5_000 });
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
  await clearFindPersistedState(openedProjectId);
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

/**
 * Open the recent searches history dropdown.
 *
 * Its entries are `menuitem`s, not `option`s: the list is a Radix `DropdownMenu`. Matching on the
 * role is what scopes an assertion to the list rather than to the many result-card texts that also
 * contain the search term.
 */
async function openHistoryDropdown(frame: FrameLocator): Promise<void> {
  await expect(recentSearchesButton(frame)).toBeVisible({ timeout: 5_000 });
  await recentSearchesButton(frame).click();
}

/**
 * Wait for the result counter to read something other than `previous`, and answer what it reads.
 *
 * The counter must be present throughout: falling back to the results paragraph would accept a
 * search that FAILED, because that paragraph carries the regex error message as well as the
 * no-results one.
 */
async function waitForCounterToChangeFrom(frame: FrameLocator, previous: string | null) {
  let current = previous;
  await expect(async () => {
    current = await frame.locator('.tw\\:tabular-nums').textContent({ timeout: 1_000 });
    expect(current).not.toBe(previous);
  }).toPass({ timeout: 30_000 });
  return current;
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

/** Where a piece of chapter text sits relative to the editor's scrolling viewport. */
interface TextGeometry {
  /** Top of the text in px below the scroll viewport's top edge; negative means above it */
  matchTop: number;
  /** Bottom of the text in px below the scroll viewport's top edge */
  matchBottom: number;
  viewportHeight: number;
  viewportWidth: number;
  scrollTop: number;
}

/**
 * Finds the editor's real scroll container — the same discovery `findScrollContainer` in
 * editor-dom.util.ts does: the nearest ancestor that is styled scrollable AND overflows — and, in
 * one pass, optionally pins its scroll position and/or measures where `needle` sits inside it.
 *
 * Both browser-side actions this suite needs against the editor (pinning the scroll position for
 * {@link showEditorAt}, measuring text for {@link readTextGeometry}) start with this identical walk,
 * so it is written once here rather than twice: an `evaluate` callback cannot close over module
 * scope, so a Node-side helper the callback merely CALLED would not be shippable to the browser at
 * all — the walk has to live inside whichever function actually runs there, which means sharing it
 * means passing this same function to both callers' `evaluate` calls.
 *
 * Locates the text itself rather than reading the editor's selection or Find's highlight: the
 * editor positions its scroll from the selection, so measuring the selection would let a wrong
 * selection pass, and Find's highlight is not guaranteed to survive a chapter load. Native
 * `indexOf` over scripture text is acceptable here only because every needle this suite uses is
 * plain ASCII with no combining marks after it in the WEB text.
 *
 * @returns `undefined` when the editor has no scrolling content, or when `needle` was given but is
 *   not in the chapter; when `needle` is omitted, `undefined` on success too (there is nothing to
 *   report — {@link showEditorAt} only wants the pin performed)
 */
function locateEditorScrollerAndAct({
  pinTo,
  needle,
}: {
  pinTo?: 'top' | 'bottom';
  needle?: string;
}): TextGeometry | undefined {
  const editorContainer = document.querySelector<HTMLElement>('.editor-container');
  if (!editorContainer) return undefined;
  let scroller: HTMLElement | null = editorContainer;
  while (scroller) {
    const { overflowY } = getComputedStyle(scroller);
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      scroller.scrollHeight > scroller.clientHeight
    )
      break;
    scroller = scroller.parentElement;
  }
  if (!scroller) return undefined;

  if (pinTo) scroller.scrollTop = pinTo === 'top' ? 0 : scroller.scrollHeight;
  if (needle === undefined) return undefined;

  const walker = document.createTreeWalker(editorContainer, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node && !(node.textContent ?? '').includes(needle)) node = walker.nextNode();
  if (!node) return undefined;

  const start = (node.textContent ?? '').indexOf(needle);
  const range = document.createRange();
  range.setStart(node, start);
  range.setEnd(node, start + needle.length);
  const rect = range.getBoundingClientRect();
  const viewportTop = scroller.getBoundingClientRect().top + scroller.clientTop;
  return {
    matchTop: rect.top - viewportTop,
    matchBottom: rect.bottom - viewportTop,
    viewportHeight: scroller.clientHeight,
    viewportWidth: scroller.clientWidth,
    scrollTop: scroller.scrollTop,
  };
}

/**
 * Measures the first occurrence of `text` in the editor's chapter content against the element that
 * actually scrolls that content. See {@link locateEditorScrollerAndAct}.
 *
 * @returns `undefined` when the editor has no scrolling content or the text is not in the chapter
 */
async function readTextGeometry(
  editorFrame: Frame,
  text: string,
): Promise<TextGeometry | undefined> {
  return editorFrame.evaluate(locateEditorScrollerAndAct, { needle: text });
}

/**
 * Waits until `text` is in the chapter and has stopped moving — two reads 250 ms apart agree — and
 * answers where it came to rest. Smooth scrolling means a single read can catch the text
 * mid-flight.
 */
async function waitForGeometryToSettle(
  editorFrame: Frame,
  text: string,
  timeout = 30_000,
): Promise<TextGeometry> {
  let previous: TextGeometry | undefined;
  let settled: TextGeometry | undefined;
  await expect(async () => {
    const current = await readTextGeometry(editorFrame, text);
    const isResting =
      !!current &&
      !!previous &&
      current.scrollTop === previous.scrollTop &&
      current.matchTop === previous.matchTop;
    previous = current;
    expect(isResting).toBe(true);
    settled = current;
  }).toPass({ timeout, intervals: [250] });
  if (!settled) throw new Error(`"${text}" never settled in the editor`);
  return settled;
}

/**
 * Navigates the editor to `reference` and pins its scroll to the top or bottom of the chapter, so a
 * test starts from a known position rather than wherever the previous test's jump left it.
 *
 * @param settleText Text in the target chapter used to confirm the chapter is loaded and at rest
 */
async function showEditorAt(
  mainPage: Page,
  editorFrame: Frame,
  reference: string,
  settleText: string,
  pinTo: 'top' | 'bottom',
): Promise<TextGeometry> {
  await navigateToolbarBcv(mainPage, reference);
  await waitForGeometryToSettle(editorFrame, settleText);
  await editorFrame.evaluate(locateEditorScrollerAndAct, { pinTo });
  return waitForGeometryToSettle(editorFrame, settleText);
}

/** Asserts the text came to rest entirely inside the editor's scroll viewport. */
async function expectFullyInView(editorFrame: Frame, text: string): Promise<TextGeometry> {
  const geometry = await waitForGeometryToSettle(editorFrame, text);
  expect(geometry.matchTop).toBeGreaterThanOrEqual(0);
  expect(geometry.matchBottom).toBeLessThanOrEqual(geometry.viewportHeight);
  return geometry;
}

/**
 * How far below the scroll viewport's top edge a scrolled-to match's first line should land.
 * Mirrors `RANGE_SCROLL_TOP_OFFSET` in
 * `extensions/src/platform-scripture-editor/src/editor-dom.util.ts`.
 */
const EXPECTED_MATCH_TOP_OFFSET = 80;

/** How far the resting position may drift from that offset — a couple of lines of font metrics. */
const MATCH_TOP_TOLERANCE = 50;

/**
 * Asserts a jump that had to scroll came to rest with the MATCH's own first line just below the top
 * of the viewport — not merely somewhere on screen.
 *
 * This is what separates scrolling to the match from scrolling to the start of its verse. Both
 * leave the match "visible" whenever the verse is short, so a visibility-only assertion cannot tell
 * them apart: measured against the verse-start behaviour, a mid-verse match rests ~150 px lower
 * than this band allows, because the verse's start takes the offset instead.
 */
async function expectLandedAtTop(editorFrame: Frame, text: string): Promise<TextGeometry> {
  const geometry = await expectFullyInView(editorFrame, text);
  expect(geometry.matchTop).toBeGreaterThanOrEqual(EXPECTED_MATCH_TOP_OFFSET - MATCH_TOP_TOLERANCE);
  expect(geometry.matchTop).toBeLessThanOrEqual(EXPECTED_MATCH_TOP_OFFSET + MATCH_TOP_TOLERANCE);
  return geometry;
}

/**
 * Resizes the first app window's content area to `width`, keeping its height, and returns a
 * function that restores the original size.
 */
async function setWindowContentWidth(
  electronApp: ElectronApplication,
  width: number,
): Promise<() => Promise<void>> {
  const original = await electronApp.evaluate(({ BrowserWindow }, newWidth) => {
    const [appWindow] = BrowserWindow.getAllWindows();
    const [originalWidth, originalHeight] = appWindow.getContentSize();
    appWindow.setContentSize(newWidth, originalHeight);
    return { width: originalWidth, height: originalHeight };
  }, width);
  return async () => {
    await electronApp.evaluate(({ BrowserWindow }, size) => {
      const [appWindow] = BrowserWindow.getAllWindows();
      appWindow.setContentSize(size.width, size.height);
    }, original);
  };
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
  const projects = await waitForProjects(
    page,
    (p) =>
      p.id === preferredProjectId ||
      p.projectInterfaces?.some((iface) => iface.startsWith('platformScripture.')) === true,
  );
  // No `?? projects[0]` fallback. `waitForProjects` returns whatever it has when it times out
  // rather than throwing, so on a slow machine that list can hold some OTHER project entirely —
  // and this suite writes to whatever it opens, through `clearFindPersistedState`, whose guard
  // rejects only a falsy id and not a wrong one. Failing here names the cause; falling back
  // silently edits a project the suite does not own.
  const scriptureProject =
    projects.find((p) => p.id === preferredProjectId) ??
    projects.find((p) =>
      p.projectInterfaces?.some((iface) => iface.startsWith('platformScripture.')),
    );

  if (!scriptureProject) {
    throw new Error(
      `No scripture project was available after 90 s. These tests clear persisted Find state on ` +
        `the project they open, so they will not fall back to an unrelated one. Wanted ` +
        `${preferredProjectId} or any platformScripture.* project; found: ` +
        `${projects.map((p) => p.id).join(', ') || '(none)'}`,
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
// Failure isolation — reset the panel after every test, not only before the next one.
// ---------------------------------------------------------------------------

// replace.spec.ts's Power-mode Find tab is closable, so its equivalent afterEach closes it —
// nothing to close here (see the class doc's "permanent tab" section). The equivalent isolation for
// a permanent tab is running the same reset openFindPanel runs at the start of a test, but right
// after the test that may have dirtied the panel instead of deferred to the next test's setup. That
// timing is what buys the isolation: a reset that fails here is attributed to the test that broke
// the panel, while the same reset only running at the top of the next test's body would instead
// report as that unrelated next test failing — the "1 failed, 22 did not run" shape documented in
// no-silent-skips.reporter.ts.
//
// This does mean every test boundary resets the panel twice — here, and again in the next test's
// own openFindPanel — but each reset is close to a no-op once the panel is already clean, so the
// duplication buys the isolation above cheaply rather than doubling any real cost.
test.afterEach(async ({ mainPage }) => {
  const frame = await activateFindTab(mainPage);
  await resetFindPanel(frame);
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
    await activateTab(mainPage, COMMENTARIES_WEBVIEW_TYPE);
    const findTab = dockTabForWebView(
      mainPage,
      await webViewIdForType(mainPage, FIND_WEBVIEW_TYPE),
    );
    // Assert the tab is there before asserting it is not active, so that a selector which matched
    // nothing could not satisfy the negated check below.
    await expect(findTab).toBeAttached();
    await expect(findTab).not.toHaveClass(/dock-tab-active/);

    await invokeFindFromHamburger(mainPage);

    await expect(findTab).toHaveClass(/dock-tab-active/, { timeout: 15_000 });
    // Landing on the search box is the point of the invoke (see use-focus-search-on-invoke.hook.ts).
    const findFrame = await findPanelFrame(mainPage);
    await expect(findFrame.locator('#search-term')).toBeFocused({ timeout: 15_000 });
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
// `addToHistory` has four callers: the idle debounce, an explicit search (Enter), a search-options
// change, and unmount. Three of the four are drivable here — Find is a permanent tab in Simple
// mode, so it never unmounts, and a covering test would have to live where the panel can be closed.
// The idle-debounce and explicit-search routes are asserted below. The search-options-change route
// is also driven by the match-case test (Search Filters) and the scope-switching test (Scope
// Switching) further down, but those two never change the search term between an explicit search
// and the option change that follows it, so `addToHistory`'s own (project, term) dedupe guard makes
// every write they trigger a no-op — the third test below changes the term first, so its write is
// the only one that actually reaches history through this route.
//
// What is NOT a route matters as much here: neither clearing the box nor opening a result records
// anything, so a test asserting either would assert behaviour the panel does not have. Two such
// tests were removed rather than repaired; add one only alongside the product change that makes it
// true.
// ---------------------------------------------------------------------------

test.describe('Search History', () => {
  test('should add search term to history after 5 seconds of inactivity', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);

    const term = `histtest-debounce-${Date.now()}`;
    await frame.locator('#search-term').fill(term);

    // Wait for the 5-second debounce timer to fire (+ a small buffer)
    await mainPage.waitForTimeout(HISTORY_DEBOUNCE_MS + 500);

    await openHistoryDropdown(frame);
    await expect(frame.getByRole('menuitem', { name: term })).toBeVisible({ timeout: 5_000 });
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
    await expect(frame.getByRole('menuitem', { name: term })).toBeVisible({ timeout: 5_000 });
  });

  test('should add the term in the box to history when options change, even right after an option change already recorded a different term', async ({
    mainPage,
  }) => {
    const frame = await openFindPanel(mainPage);

    const firstTerm = `histtest-optionschange-a-${Date.now()}`;
    const secondTerm = `histtest-optionschange-b-${Date.now()}`;

    // Both terms are synthetic and match nothing in the project, so the explicit search that
    // records firstTerm always finishes as "no results" — the results counter never renders for a
    // zero-match search (only the no-results paragraph does), so waiting on it here the way
    // fillSearchAndWaitForResults does for a real search term would hang for the full search
    // timeout instead of ever proceeding.
    const searchInput = frame.locator('#search-term');
    await searchInput.fill(firstTerm);
    await searchInput.press('Enter');
    await expect(frame.getByText(/no results found/i)).toBeVisible({ timeout: SEARCH_TIMEOUT_MS });

    await openFiltersPanel(frame);

    // First option change: the box still holds firstTerm, the same term the explicit search above
    // just recorded, so the dedupe guard makes this write a no-op — the same shape the match-case
    // and scope-switching tests exercise, which is why neither of them can tell whether this
    // effect's write path actually runs.
    const wholeWordRadio = frame.locator('#wordRestriction-wholeWord');
    await expect(wholeWordRadio).toBeVisible({ timeout: 5_000 });
    await wholeWordRadio.click();
    await expect(wholeWordRadio).toBeChecked();

    // Change the term without going through either of the other two history routes (no Enter, no
    // 5s idle wait), then change a second option. Only a term change makes the dedupe key differ
    // from what is already recorded, so a write reaching history here can only be explained by the
    // options-change effect itself.
    await searchInput.fill(secondTerm);
    const matchCaseCheckbox = frame.locator('#matchCase');
    await matchCaseCheckbox.click();
    await expect(matchCaseCheckbox).toBeChecked();
    await matchCaseCheckbox.press('Escape');

    // Typing secondTerm above also (re)armed the 5-second idle debounce that writes to history on
    // its own (see "should add search term to history after 5 seconds of inactivity" above) — left
    // alone, that debounce could independently write secondTerm and pass this test even with the
    // options-change effect broken, the exact case this test exists to catch. Clearing the box
    // defuses it rather than racing it: the debounce effect is keyed off the current search term
    // and clears its pending timer on every change (find.web-view.tsx's `[searchTerm]` effect), so
    // once the box reads empty there is no armed timer left that could ever write secondTerm. The
    // options-change effect above already read secondTerm from a ref and kicked off its own write
    // before this clear runs, so that write is unaffected — only the debounce's independent route
    // is cut off. From here, a wait of any length is safe: if secondTerm reaches history, the
    // options-change effect is the only route that could have put it there.
    await searchInput.fill('');

    await openHistoryDropdown(frame);
    await expect(frame.getByRole('menuitem', { name: secondTerm })).toBeVisible({
      timeout: 5_000,
    });
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

  test('should apply match-case and whole-word filters simultaneously', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);

    // Not COMMON_SEARCH_TERM. Counted in the bundled WEB Genesis these tests search by default,
    // "the" matches 3972 times as a substring, 2375 whole-word, and 2156 whole-word and
    // case-sensitive — all far above the counter's 100-result cap, so it reads "1 of 100" in every
    // state and cannot show either filter doing anything. FILTER_SENSITIVE_TERM matches 52
    // unfiltered, 51 whole-word, and 1 with both: every value under the cap.
    //
    // The order matters, and only counting reveals why. That term matches 1 with match-case ALONE,
    // the same as with both, so applying match-case first leaves whole-word with nothing to show.
    // Whole word goes first so each filter moves the count by itself.
    await fillSearchAndWaitForResults(frame, FILTER_SENSITIVE_TERM);
    const counterUnfiltered = await frame.locator('.tw\\:tabular-nums').textContent();

    await openFiltersPanel(frame);

    // Whole word first: 52 -> 51.
    const wholeWordRadio = frame.locator('#wordRestriction-wholeWord');
    await expect(wholeWordRadio).toBeVisible({ timeout: 5_000 });
    await wholeWordRadio.click();
    await expect(wholeWordRadio).toBeChecked();
    const counterAfterWholeWord = await waitForCounterToChangeFrom(frame, counterUnfiltered);

    // Then match case: 51 -> 1. Asserting against the whole-word reading rather than the
    // unfiltered one is what makes this test fail if match-case alone stops working — comparing
    // both filters against the original passes whenever EITHER of them still does something.
    const matchCaseCheckbox = frame.locator('#matchCase');
    await expect(matchCaseCheckbox).toBeVisible({ timeout: 5_000 });
    if (!(await matchCaseCheckbox.isChecked())) await matchCaseCheckbox.click();
    await expect(matchCaseCheckbox).toBeChecked();
    await waitForCounterToChangeFrom(frame, counterAfterWholeWord);

    await matchCaseCheckbox.press('Escape');
    await expect(wholeWordRadio).not.toBeVisible({ timeout: 5_000 });
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

// ---------------------------------------------------------------------------
// Tests: jumping to a result scrolls the editor to the match
// ---------------------------------------------------------------------------

/**
 * Occurs once in the whole Bible, at the very end of Matthew 5:22 — several lines below its own
 * verse's start, in a chapter tall enough for the match to still reach the top of the viewport.
 *
 * Both properties are load-bearing. A match close to its verse start, or one near the end of a
 * chapter too short to scroll further, comes to rest in the same place whether the editor scrolls
 * to the verse or to the match, and so cannot tell the two apart.
 */
const MID_CHAPTER_TERM = 'in danger of the fire of Gehenna';
/** Occurs first in Genesis 14:1, the top of a 24-verse chapter. */
const CHAPTER_START_TERM = 'Ellasar';
/** Occurs once in Genesis, in 10:32 — the chapter's last verse. */
const CHAPTER_END_TERM = 'divided from these';
/** A name from Matthew 1, used to confirm the editor is resting on that chapter. */
const OTHER_CHAPTER_SETTLE_TERM = 'Zerubbabel';
/** Content width that squeezes the editor column well below its width at the suite's 1280 px. */
const NARROW_WINDOW_WIDTH = 960;

test.describe('Jumping to a result scrolls the editor to the match', () => {
  test('same chapter: a match below the fold scrolls into view', async ({ mainPage }) => {
    const editorFrame = await findScriptureEditorFrame(mainPage);
    const before = await showEditorAt(
      mainPage,
      editorFrame,
      'Matthew 5:1',
      MID_CHAPTER_TERM,
      'top',
    );
    // Positive control: the match starts below the viewport, so an editor that does not scroll fails.
    expect(before.matchTop).toBeGreaterThan(before.viewportHeight);

    const frame = await openFindPanel(mainPage);
    await fillSearchAndWaitForResults(frame, MID_CHAPTER_TERM);
    await firstResultCard(frame).click();

    const after = await expectLandedAtTop(editorFrame, MID_CHAPTER_TERM);
    expect(after.scrollTop).not.toBe(before.scrollTop);
  });

  test('different chapter: the match lands fully in view, not against the bottom edge', async ({
    mainPage,
  }) => {
    const editorFrame = await findScriptureEditorFrame(mainPage);
    await showEditorAt(mainPage, editorFrame, 'Matthew 1:1', OTHER_CHAPTER_SETTLE_TERM, 'top');
    // Positive control: the match's chapter is not what the editor is showing.
    expect(await readTextGeometry(editorFrame, MID_CHAPTER_TERM)).toBeUndefined();

    const frame = await openFindPanel(mainPage);
    await fillSearchAndWaitForResults(frame, MID_CHAPTER_TERM);
    await firstResultCard(frame).click();

    await expectLandedAtTop(editorFrame, MID_CHAPTER_TERM);
  });

  test('different chapter, opened with a double-click: the match lands fully in view', async ({
    mainPage,
  }) => {
    const editorFrame = await findScriptureEditorFrame(mainPage);
    await showEditorAt(mainPage, editorFrame, 'Matthew 1:1', OTHER_CHAPTER_SETTLE_TERM, 'top');
    expect(await readTextGeometry(editorFrame, MID_CHAPTER_TERM)).toBeUndefined();

    const frame = await openFindPanel(mainPage);
    await fillSearchAndWaitForResults(frame, MID_CHAPTER_TERM);
    await firstResultCard(frame).dblclick();

    await expectLandedAtTop(editorFrame, MID_CHAPTER_TERM);
  });

  test('a match at the start of a chapter scrolls up into view', async ({ mainPage }) => {
    const editorFrame = await findScriptureEditorFrame(mainPage);
    const before = await showEditorAt(
      mainPage,
      editorFrame,
      'Genesis 14:24',
      CHAPTER_START_TERM,
      'bottom',
    );
    // Positive control: the match is above the viewport.
    expect(before.matchBottom).toBeLessThan(0);

    const frame = await openFindPanel(mainPage);
    await fillSearchAndWaitForResults(frame, CHAPTER_START_TERM);
    await firstResultCard(frame).click();

    await expectFullyInView(editorFrame, CHAPTER_START_TERM);
  });

  test('a match at the end of a chapter scrolls into view', async ({ mainPage }) => {
    const editorFrame = await findScriptureEditorFrame(mainPage);
    const before = await showEditorAt(
      mainPage,
      editorFrame,
      'Genesis 10:1',
      CHAPTER_END_TERM,
      'top',
    );
    expect(before.matchTop).toBeGreaterThan(before.viewportHeight);

    const frame = await openFindPanel(mainPage);
    await fillSearchAndWaitForResults(frame, CHAPTER_END_TERM);
    await firstResultCard(frame).click();

    await expectFullyInView(editorFrame, CHAPTER_END_TERM);
  });

  test('at a narrow width, same-chapter and different-chapter matches land in view', async ({
    mainPage,
    electronApp,
  }) => {
    const editorFrame = await findScriptureEditorFrame(mainPage);
    const wide = await showEditorAt(mainPage, editorFrame, 'Matthew 5:1', MID_CHAPTER_TERM, 'top');
    const restoreWindowSize = await setWindowContentWidth(electronApp, NARROW_WINDOW_WIDTH);
    try {
      const narrow = await showEditorAt(
        mainPage,
        editorFrame,
        'Matthew 5:1',
        MID_CHAPTER_TERM,
        'top',
      );
      // Positive control: the editor really is narrower, or this only repeats the full-width case.
      expect(narrow.viewportWidth).toBeLessThan(wide.viewportWidth);
      expect(narrow.matchTop).toBeGreaterThan(narrow.viewportHeight);

      const sameChapterFrame = await openFindPanel(mainPage);
      await fillSearchAndWaitForResults(sameChapterFrame, MID_CHAPTER_TERM);
      await firstResultCard(sameChapterFrame).click();
      await expectLandedAtTop(editorFrame, MID_CHAPTER_TERM);

      await showEditorAt(mainPage, editorFrame, 'Matthew 1:1', OTHER_CHAPTER_SETTLE_TERM, 'top');
      // Positive control: the match's chapter is not what the editor is showing.
      expect(await readTextGeometry(editorFrame, MID_CHAPTER_TERM)).toBeUndefined();

      const otherChapterFrame = await openFindPanel(mainPage);
      await fillSearchAndWaitForResults(otherChapterFrame, MID_CHAPTER_TERM);
      await firstResultCard(otherChapterFrame).click();
      await expectLandedAtTop(editorFrame, MID_CHAPTER_TERM);
    } finally {
      await restoreWindowSize();
    }
  });
});
