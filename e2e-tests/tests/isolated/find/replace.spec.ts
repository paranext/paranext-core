/**
 * E2E tests for Find's Replace mode, which exists only in Power interface mode.
 *
 * Run via: `npm run test:e2e:isolated find`, or by path: `npm run test:e2e:isolated
 * tests/isolated/find/replace.spec.ts`
 *
 * ## Why this is a separate suite from find.spec.ts
 *
 * Simple mode passes `hideModeToggle` to the Find component, so the Find/Replace toggle, the
 * replace input, Preserve Case, the per-result Replace buttons and Replace All are not rendered at
 * all — not hidden, absent. Nothing here can be driven from a Simple-mode suite, which is why these
 * tests live in their own file with `interfaceMode: 'power'` rather than alongside the Find tests.
 *
 * The two modes also differ in how the panel is reached. In Simple mode Find is seeded into the
 * static layout as a permanent, non-closable Column 3 tab. In Power mode it is not seeded at all:
 * `find.web-view-provider.ts` yields `isClosable: true`, so the panel is opened from the editor's
 * hamburger menu and closed again, which is the model these tests use.
 *
 * ## These tests write to scripture
 *
 * A replace operation edits the project. `find.fixture` points the app at a throwaway project root
 * via `PLATFORM_BIBLE_PROJECT_ROOT_FOLDER` and seeds a fresh, editable copy of the WEB asset for
 * each worker run, so this never reads or writes the developer's real projects, and one run's
 * replacements cannot affect the next. Do not run these against a fixture that lacks that
 * isolation.
 */
import { FrameLocator, Locator, Page } from '@playwright/test';
import {
  test,
  expect,
  openScriptureEditor,
  waitForProjects,
  WEB_COPY_PROJECT_ID,
} from '../../../fixtures/find.fixture';
import { waitForAppReady, PROCESS_READY_TIMEOUT } from '../../../fixtures/helpers';
import {
  EDITOR_HAMBURGER_SELECTOR,
  findScriptureEditorFrame,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  // Replace has no UI at all in Simple mode. The fixture pins this before launch and then asserts
  // it took, so a pin that silently failed reports itself here rather than as a missing toggle.
  interfaceMode: 'power',
  // The layout these assertions were written against; the fixture asserts the real window matches.
  windowSize: { width: 1280, height: 800 },
});

/**
 * A word common enough to return results in the seeded WEB copy, and distinct from the terms
 * find.spec.ts uses so the two suites cannot influence one another through shared project state.
 */
const REPLACE_SEARCH_TERM = 'said';

/** A word with mixed-case occurrences, for exercising Preserve Case. */
const PRESERVE_CASE_TERM = 'the';

/** How long a search may take: the findInScripture PDP initializes lazily on first use. */
const SEARCH_TIMEOUT_MS = 150_000;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get the first search result card. Each result renders `div[role="button"][aria-pressed]`. */
function firstResultCard(frame: FrameLocator): Locator {
  return frame.locator('[role="button"][aria-pressed]').first();
}

/** The Find dock tab, which in Power mode is a normal closable tab rather than a fixed one. */
function findTab(mainPage: Page): Locator {
  return mainPage.locator('.dock-tab', { hasText: /^Find/i });
}

/**
 * Open the Find panel the way a user does, from the scripture editor's hamburger ("Project") menu.
 *
 * The hamburger and its Radix menu both render INSIDE the editor's iframe (the menu portals to the
 * iframe body), while Find opens as a tab at main-page level.
 */
async function openFindPanel(mainPage: Page): Promise<FrameLocator> {
  const editorFrame = await findScriptureEditorFrame(mainPage);

  const hamburger = editorFrame.locator(EDITOR_HAMBURGER_SELECTOR);
  await expect(hamburger).toBeVisible({ timeout: 15_000 });
  await hamburger.click();

  // Anchored to the exact label "Find" (%webView_platformScriptureEditor_openFind%).
  const findMenuItem = editorFrame.getByRole('menuitem', { name: /^find$/i });
  await expect(findMenuItem).toBeVisible({ timeout: 5_000 });
  await findMenuItem.click();

  await expect(findTab(mainPage)).toBeVisible({ timeout: 15_000 });
  const frame = mainPage.frameLocator('iframe[title="Find"]');
  await expect(frame.locator('#search-term')).toBeVisible({ timeout: 30_000 });
  return frame;
}

/**
 * Close the Find panel, so the next test opens a fresh one rather than inheriting this test's
 * search term, replace term, mode and filters.
 *
 * The app is worker-scoped, so without this every later test in the file would start from whatever
 * state the previous one left — the failure mode that made the old combined suite
 * non-deterministic.
 */
async function closeFindPanel(mainPage: Page): Promise<void> {
  const tab = findTab(mainPage);
  await expect(tab).toBeVisible({ timeout: 5_000 });
  // dispatchEvent rather than click: on a crowded Power-mode tab strip the close button can sit
  // outside the visible area, where a real click would miss.
  await tab.locator('.dock-tab-close-btn').dispatchEvent('click');
  await expect(tab).not.toBeVisible({ timeout: 10_000 });
}

/** Switch the panel from Find to Replace. The ToggleGroup renders its items as `role="radio"`. */
async function switchToReplaceMode(frame: FrameLocator): Promise<void> {
  await frame.getByRole('radio', { name: /^replace$/i }).click();
  await expect(frame.locator('#replace-term')).toBeVisible({ timeout: 5_000 });
}

/** Open the filters dropdown (the "Toggle filters" button). */
async function openFiltersPanel(frame: FrameLocator): Promise<void> {
  const filtersBtn = frame.getByRole('button', { name: /toggle filters/i });
  await expect(filtersBtn).toBeVisible({ timeout: 5_000 });
  await filtersBtn.click();
}

/** The header's Replace action button — `.first()` because result cards render one each too. */
function headerReplaceButton(frame: FrameLocator): Locator {
  return frame.getByRole('button', { name: /^replace$/i }).first();
}

/**
 * Open Find, search, switch to Replace and fill the replacement, then wait for results.
 *
 * Enter is pressed rather than waiting on the 500 ms input debounce, so the search starts at a
 * point the test controls.
 */
async function setupReplaceMode(
  mainPage: Page,
  searchTerm = REPLACE_SEARCH_TERM,
  replaceTerm = 'replaced',
): Promise<FrameLocator> {
  const frame = await openFindPanel(mainPage);

  await frame.locator('#search-term').fill(searchTerm);
  await frame.locator('#search-term').press('Enter');
  await switchToReplaceMode(frame);
  await frame.locator('#replace-term').fill(replaceTerm);

  await expect(firstResultCard(frame)).toBeVisible({ timeout: SEARCH_TIMEOUT_MS });
  return frame;
}

// ---------------------------------------------------------------------------
// Worker-level setup
// ---------------------------------------------------------------------------

/**
 * Open a scripture editor before any test runs.
 *
 * Required, not merely convenient: every test here reaches Find through the editor's hamburger
 * menu, and in Power mode nothing is seeded into the layout — the app starts on the Home tab with
 * no editor open at all. Without this the whole suite fails identically at "Scripture editor not
 * found: no Project button visible", which says nothing about Replace.
 */
test.beforeAll(async ({ electronApp }) => {
  // App start plus the project-lookup poll below; a retried worker restarts Electron from scratch.
  test.setTimeout(240_000);

  const page = await electronApp.firstWindow({ timeout: PROCESS_READY_TIMEOUT });
  await waitForAppReady(page);

  // `getMetadataForAllProjects` only retries internally during the process's first 30 s, and
  // `waitForAppReady` can eat that window on a slow machine — after which it returns an empty
  // array immediately rather than waiting. Poll here instead of trusting a single call.
  //
  // Poll for the seeded copy specifically, never merely for a non-empty list: projects register one
  // at a time, and a non-scripture project (SDBG) is routinely visible before testWEB is, so a poll
  // that stops at the first project returns a list the strict lookup below then rejects.
  //
  // The seeded, editable WEB copy specifically. Replace WRITES to the project, so falling back to
  // whatever project happened to be available could edit something this suite does not own.
  const projects = await waitForProjects(page, (candidate) => candidate.id === WEB_COPY_PROJECT_ID);
  const project = projects.find((candidate) => candidate.id === WEB_COPY_PROJECT_ID);

  if (!project) {
    throw new Error(
      `The seeded testWEB copy (${WEB_COPY_PROJECT_ID}) was not available after 90 s. These tests ` +
        `perform real replace operations, so they will not fall back to another project. Found: ` +
        `${projects.map((candidate) => candidate.id).join(', ') || '(none)'}`,
    );
  }

  await openScriptureEditor(project.id);
  // Confirms the editor is actually mounted and its hamburger reachable, which is what every test
  // here depends on.
  await findScriptureEditorFrame(page);
});

// Top-level (not inside any describe below) so it covers every test in the file: the Electron app
// is worker-scoped and shared across all of them, so a test that throws before its own trailing
// closeFindPanel() leaves the panel open for whichever test runs next — a failure in one test
// reading as an unrelated failure in another. Cannot just call closeFindPanel() again — it asserts
// the tab is visible first and would itself throw on the (overwhelmingly common) case where the
// test already closed it cleanly. isVisible() is a non-throwing snapshot, safe either way.
test.afterEach(async ({ mainPage }) => {
  if (await findTab(mainPage).isVisible()) await closeFindPanel(mainPage);
});

// ---------------------------------------------------------------------------
// Tests: the Replace surface exists in Power mode
// ---------------------------------------------------------------------------

test.describe('Replace mode', () => {
  // openFindPanel can take ~90 s on a cold worker before a search even starts.
  test.describe.configure({ timeout: 300_000 });

  test('shows the replace input and controls when switching to Replace mode', async ({
    mainPage,
  }) => {
    const frame = await openFindPanel(mainPage);

    // The toggle itself is the thing Simple mode removes, so assert it is present before using it.
    await expect(frame.getByRole('radio', { name: /^replace$/i })).toBeVisible({ timeout: 5_000 });
    await switchToReplaceMode(frame);

    await expect(frame.locator('#replace-term')).toBeVisible();
    await expect(frame.getByRole('button', { name: /^replace all$/i })).toBeVisible();

    await closeFindPanel(mainPage);
  });
});

// ---------------------------------------------------------------------------
// Tests: Preserve Case
// ---------------------------------------------------------------------------

test.describe('Preserve Case', () => {
  test.describe.configure({ timeout: 300_000 });

  test('displays the Preserve Case checkbox in Replace mode', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);
    await switchToReplaceMode(frame);

    await expect(frame.locator('#preserve-case')).toBeVisible({ timeout: 5_000 });
    await expect(frame.getByText(/preserve case/i)).toBeVisible();

    await closeFindPanel(mainPage);
  });

  test('keeps results visible while Preserve Case is toggled on and off', async ({ mainPage }) => {
    const frame = await setupReplaceMode(mainPage, PRESERVE_CASE_TERM, 'a');

    const preserveCase = frame.locator('#preserve-case');
    if (!(await preserveCase.isChecked())) await preserveCase.click();
    await expect(preserveCase).toBeChecked();
    await expect(firstResultCard(frame)).toBeVisible({ timeout: 20_000 });

    await preserveCase.click();
    await expect(preserveCase).not.toBeChecked();
    await expect(firstResultCard(frame)).toBeVisible({ timeout: 20_000 });

    await closeFindPanel(mainPage);
  });

  test('replaces with Preserve Case enabled', async ({ mainPage }) => {
    const frame = await setupReplaceMode(mainPage, PRESERVE_CASE_TERM, 'a');

    const preserveCase = frame.locator('#preserve-case');
    if (!(await preserveCase.isChecked())) await preserveCase.click();
    await expect(preserveCase).toBeChecked();

    await firstResultCard(frame).click();
    const replaceBtn = headerReplaceButton(frame);
    await expect(replaceBtn).toBeEnabled({ timeout: 5_000 });
    await replaceBtn.click();

    // The toast, not the per-card "Replaced" badge: the badge is cleared as soon as the
    // post-replace re-search starts, while the toast persists for several seconds.
    await expect(frame.getByText(/replaced 1 occurrence/i).first()).toBeVisible({
      timeout: 10_000,
    });

    await closeFindPanel(mainPage);
  });
});

// ---------------------------------------------------------------------------
// Tests: Replace operations
// ---------------------------------------------------------------------------

test.describe('Replace operations', () => {
  test.describe.configure({ timeout: 300_000 });

  test('replaces the focused result when Enter is pressed on its card', async ({ mainPage }) => {
    const frame = await setupReplaceMode(mainPage);

    await firstResultCard(frame).click();
    const selectedCard = frame.locator('[role="button"][aria-pressed="true"]').first();
    await expect(selectedCard).toBeVisible({ timeout: 5_000 });
    await selectedCard.press('Enter');

    await expect(frame.getByText(/replaced 1 occurrence/i).first()).toBeVisible({
      timeout: 10_000,
    });

    await closeFindPanel(mainPage);
  });

  test('replaces the focused result from the header Replace button', async ({ mainPage }) => {
    const frame = await setupReplaceMode(mainPage);

    await firstResultCard(frame).click();
    const replaceBtn = headerReplaceButton(frame);
    await expect(replaceBtn).toBeEnabled({ timeout: 5_000 });
    await replaceBtn.click();

    await expect(frame.getByText(/replaced 1 occurrence/i).first()).toBeVisible({
      timeout: 10_000,
    });

    await closeFindPanel(mainPage);
  });

  test('replaces from the Replace button inside a result card', async ({ mainPage }) => {
    const frame = await setupReplaceMode(mainPage);

    const card = firstResultCard(frame);
    await card.click();

    const cardReplaceBtn = card.getByRole('button', { name: /^replace$/i });
    await expect(cardReplaceBtn).toBeVisible({ timeout: 5_000 });
    await cardReplaceBtn.click();

    await expect(frame.getByText(/replaced 1 occurrence/i).first()).toBeVisible({
      timeout: 10_000,
    });

    await closeFindPanel(mainPage);
  });

  test('replaces a result found by a regex search', async ({ mainPage }) => {
    const frame = await openFindPanel(mainPage);

    // Regex has to be enabled BEFORE searching, so the search itself runs as a pattern.
    await openFiltersPanel(frame);
    const regexCheckbox = frame.locator('#allowRegex');
    await expect(regexCheckbox).toBeVisible({ timeout: 5_000 });
    if (!(await regexCheckbox.isChecked())) await regexCheckbox.click();
    await expect(regexCheckbox).toBeChecked();
    await regexCheckbox.press('Escape');

    await frame.locator('#search-term').fill(REPLACE_SEARCH_TERM);
    await frame.locator('#search-term').press('Enter');
    await switchToReplaceMode(frame);
    await frame.locator('#replace-term').fill('spoke');

    await expect(firstResultCard(frame)).toBeVisible({ timeout: SEARCH_TIMEOUT_MS });

    await firstResultCard(frame).click();
    const replaceBtn = headerReplaceButton(frame);
    await expect(replaceBtn).toBeEnabled({ timeout: 5_000 });
    await replaceBtn.click();

    await expect(frame.getByText(/replaced 1 occurrence/i).first()).toBeVisible({
      timeout: 10_000,
    });

    await closeFindPanel(mainPage);
  });

  // Last on purpose: Replace All consumes the remaining occurrences of REPLACE_SEARCH_TERM in the
  // seeded project, so the single-result tests above would have nothing left to act on. The seeded
  // copy is rebuilt per worker run, so this does not leak into the next run.
  test('replaces every visible result from Replace All', async ({ mainPage }) => {
    const frame = await setupReplaceMode(mainPage);

    const replaceAllBtn = frame.getByRole('button', { name: /^replace all$/i });
    await expect(replaceAllBtn).toBeEnabled({ timeout: 5_000 });
    await replaceAllBtn.click();

    await expect(frame.getByText(/replaced \d+ occurrences?/i).first()).toBeVisible({
      timeout: 10_000,
    });

    await closeFindPanel(mainPage);
  });
});
