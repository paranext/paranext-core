/**
 * Scroll-group synchronization e2e tests.
 *
 * Regression guard for the scroll-into-view defect diagnosed 2026-07-09: a reference change from
 * another source must scroll the scripture editor's content, not just update the BCV controls (the
 * scroll utilities used to target `.editor-container`, which layout wrappers had made
 * non-scrollable, so every programmatic scroll silently no-oped).
 *
 * Runs against an isolated project root, so the only project is the bundled sample WEB (installed
 * by the C# backend into the empty root). Any developer can run this suite: `npm run
 * test:e2e:isolated scroll-groups`. No machine-local projects are read or written.
 *
 * Both scenarios run in ONE test() on purpose: the isolated fixture is test-scoped, and a SECOND
 * Electron instance launched against the shared webpack renderer dev server has a documented
 * failure mode where new dock tabs never render (see comment.fixture.ts and isolated.fixture.ts).
 * One test = one Electron instance per spec file, matching every other isolated-fixture suite.
 *
 * Book choice: Obadiah — single chapter (21 verses, ~2 screens tall in the 1280x800 test window),
 * so the tested navigations (1:1 -> 1:21 external change, 1:1 -> 1:15 click-follow) never cross a
 * chapter/book boundary and no document reload races with the scroll.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  SAMPLE_WEB_PROJECT_ID,
  sendPapiCommandWhenRegistered,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

// The option fixture is named `electronLaunchOptions`, not `launchOptions` — Playwright's base
// `test` already registers a worker-scoped `launchOptions` option fixture (browser launch
// options), so reusing that name throws "Fixture ... has already been registered as a
// { scope: 'worker' } fixture". See e2e-tests/fixtures/isolated.fixture.ts.
//
// DEV_NOISY=false (fixture default is true): in noisy dev mode the renderer uses the test layout
// (src/renderer/testing/test-layout.data.ts), which has NO Home tab — app-ready detection and a
// clean single-pane layout for the viewport assertions both need the normal Home layout. Same
// approach as comment.fixture.ts.
//
// The fixture's default `interfaceMode: 'power'` (required for the Home-tab layout this suite
// waits on) now means the editor opens in Standard view by default (PT-4190). The verse selectors
// below survive that: `VerseNode` renders `data-marker="v"`/`data-number` in every view, and in
// Standard view the visible `\v N` marker text lives INSIDE the verse span (no separate glyph
// element is inserted), so the `+ span` marker/text adjacency and the click-in-verse-text gesture
// behave the same as in the formatted view.
test.use({
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('scroll group sync', () => {
  test('an external BCV change scrolls the verse into view, and clicking a verse reports it to the scroll group (PT9-style click-follow)', async ({
    mainPage,
  }) => {
    await waitForHomeTab(mainPage);

    // ── Scenario 1: an external BCV change scrolls the verse into view ──────────────────────

    // Open the sample WEB project read-only; the new tab becomes the active, visible one.
    await sendPapiCommandWhenRegistered(
      'platformScriptureEditor.openResourceViewer',
      SAMPLE_WEB_PROJECT_ID,
    );
    const resourceFrame = mainPage.frameLocator('iframe[title*="WEB"]:not([title*="Editable"])');
    await resourceFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    // Load Obadiah at its top; wait for the chapter content (last verse marker attached).
    await navigateToolbarBcv(mainPage, 'Obadiah 1:1');
    const lastVerse = resourceFrame.locator('span[data-marker="v"][data-number="21"]');
    await expect(lastVerse).toBeAttached({ timeout: 60_000 });

    // Falsifiability precondition: the target verse starts outside the visible pane. Target the
    // LAST verse (21), a full screen below the fold at 1280x800 — verse 15 (the design doc's
    // first pick) sits exactly at the fold and flakes on pixel-level layout differences.
    await expect(lastVerse).not.toBeInViewport();

    // The regression under test: a same-book reference change from another source (the main
    // toolbar drives scroll group A) must scroll the content, not just the BCV controls.
    await navigateToolbarBcv(mainPage, 'Obadiah 1:21');
    await expect(lastVerse).toBeInViewport({ timeout: 15_000 });

    // ── Scenario 2: clicking a verse reports it to the scroll group ─────────────────────────

    // Click-follow requires a truly editable editor (read-only Lexical ignores caret placement).
    await makeSampleProjectEditable();

    // Opens a second, editable view of the project as a new dock tab (power mode never reuses a
    // tab whose read-only mode differs); the new tab becomes the active, visible one.
    await sendPapiCommandWhenRegistered(
      'platformScriptureEditor.openScriptureEditor',
      SAMPLE_WEB_PROJECT_ID,
    );
    const editorFrame = mainPage.frameLocator('iframe[title*="Editable"]');
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    // Return to the book's top and wait for the scroll to settle there (verse 1 visible) so the
    // content cannot shift under the pointer between the manual scroll below and the click.
    await navigateToolbarBcv(mainPage, 'Obadiah 1:1');
    await expect(editorFrame.locator('span[data-marker="v"][data-number="21"]')).toBeAttached({
      timeout: 60_000,
    });
    await expect(editorFrame.locator('span[data-marker="v"][data-number="1"]')).toBeInViewport({
      timeout: 15_000,
    });

    // Manually bring verse 15 on screen WITHOUT changing the reference, then click it. The
    // editor must report the caret move so the shared scroll group (main toolbar BCV) follows.
    // Click the verse TEXT, not the verse number: the number is an immutable Lexical node, so
    // clicking it does not move the caret — the PT9-style gesture is clicking in the verse's
    // text anyway. The `+ span` selector assumes the marker's immediate element sibling is the
    // verse's Lexical text span, i.e. no footnote/xref decorator sits directly after the marker —
    // verified for the pinned Obadiah 1:15 in the bundled sample WEB text.
    const verse15Text = editorFrame.locator('span[data-marker="v"][data-number="15"] + span');
    await verse15Text.scrollIntoViewIfNeeded();
    await verse15Text.click();

    await expect(
      mainPage.locator('button[aria-label="book-chapter-trigger"]').first(),
    ).toContainText('Obadiah 1:15', { timeout: 15_000 });
  });
});
