/**
 * Keyboard-chord cases for content zoom (Ctrl+`=`/`+`, Ctrl+`-`, Ctrl+`0`), written and gated.
 *
 * SKIPPED — two independent reasons, both real on this branch:
 *
 * 1. Product behavior: on Windows and Linux, `src/main/main.ts` (around line 1507) claims
 *    Ctrl+`=`/`+`, Ctrl+`-` and Ctrl+`0` app-wide in its `before-input-event` handler and routes
 *    them to the app-wide `zoomIn`/`zoomOut`/`resetZoomFactor`, so a real user's chord over a
 *    Scripture editor pane never reaches the web view's own bootstrap-script listener at all.
 *    PT-4577 (PR #2809) is the work that makes that claim area-aware; it is not in this branch's
 *    history.
 * 2. Harness limitation, independent of (1): even once PT-4577 lands, Playwright drives the keyboard
 *    through CDP's `Input.dispatchKeyEvent`, which injects at the renderer level and never passes
 *    through `before-input-event` (documented at `src/main/main.ts` around line 1473, and in the
 *    skipped keyboard test in
 *    `e2e-tests/tests/isolated/navigation-history/navigation-history.spec.ts` around line 212). So
 *    these cases would go GREEN on this branch while the product is broken — a false positive,
 *    worse than a skip, since Playwright's injection never exercises the code path the fix changes
 *    either way.
 *
 * Re-enable once PT-4577 lands AND OS-level key injection (e.g. xdotool into the Xvfb display) is
 * available to actually drive the chord through the OS input path `before-input-event` listens on.
 * Until then, the same code paths (the bootstrap's `onWheel`/`onKeyDown` handlers and the command
 * path) are covered by the wheel and command steps in `content-zoom.spec.ts`.
 *
 * `e2e-tests/reporters/no-silent-skips.reporter.ts` only fails a run for a test whose
 * `expectedStatus` is not `skipped`, so this describe-scope `test.skip` is accepted and does not
 * fail a run (`wasLost`, around line 34).
 *
 * Do NOT delete the test bodies below: they document the intended end-to-end behavior and are ready
 * to re-enable once both blockers lift.
 */
import { type Frame, type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

async function getEditorFrame(page: Page, webViewId: string): Promise<Frame> {
  const handle = await page.locator(`iframe[data-web-view-id="${webViewId}"]`).elementHandle();
  const frame = await handle?.contentFrame();
  if (!frame) throw new Error(`Editor iframe ${webViewId} has no content frame`);
  return frame;
}

/** See content-zoom.spec.ts's helper of the same name for the full rationale. */
async function readFactor(frame: Frame, areaId: string): Promise<number> {
  const value = await frame.evaluate(
    (variableName) =>
      getComputedStyle(document.documentElement).getPropertyValue(variableName).trim(),
    `--platform-content-zoom-${areaId || 'main'}`,
  );
  return Number(value);
}

/** Sends `platformScriptureEditor.toggleFootnotes` for the given web view. */
async function sendToggleFootnotes(page: Page, webViewId: string): Promise<void> {
  await page.evaluate((id) => {
    // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as
    // scripture-text-grid-zoom.spec.ts's afterEach cleanup).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as {
      papi: { commands: { sendCommand: (c: string, ...a: unknown[]) => Promise<unknown> } };
    };
    return win.papi.commands.sendCommand('platformScriptureEditor.toggleFootnotes', id);
  }, webViewId);
}

/**
 * Shows the footnotes pane, tolerating that it may already be visible: Power mode's footnotes
 * auto-show/hide shows the pane by itself for any chapter that has notes — which Jonah 1 does, by
 * design (see the file docblock) — so sending `toggleFootnotes` unconditionally would just as often
 * HIDE an already-auto-shown pane.
 */
async function ensureFootnotesVisible(page: Page, frame: Frame, webViewId: string): Promise<void> {
  const footnotesRoot = frame.locator('[data-platform-content-zoom-root="footnotes"]');
  if ((await footnotesRoot.count()) === 0) await sendToggleFootnotes(page, webViewId);
  await footnotesRoot.waitFor({ state: 'attached', timeout: 20_000 });
}

test.describe('scripture editor content zoom — keyboard chords', () => {
  // See the file docblock for the two independent reasons this whole file is gated.
  test.skip(
    true,
    'Ctrl+=/-/0 are claimed app-wide by main.ts before-input-event (PT-4577 makes this area-aware; ' +
      'not on this branch) AND Playwright cannot drive before-input-event at all (CDP injects at ' +
      'the renderer level) — these cases would pass on this branch while the product is broken.',
  );

  test('Ctrl+= zooms the text area in two steps, Ctrl+- zooms out, Ctrl+0 resets', async ({
    mainPage,
  }) => {
    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    const verseLocator = editorFrame
      .locator('.editor-container span[data-marker="v"][data-number="1"]')
      .first();
    await expect(verseLocator).toBeVisible({ timeout: 60_000 });
    await verseLocator.click();

    await mainPage.keyboard.press('Control+=');
    await expect.poll(() => readFactor(editorFrame, '')).toBe(1.1);

    await mainPage.keyboard.press('Control+=');
    await expect.poll(() => readFactor(editorFrame, '')).toBe(1.2);

    await mainPage.keyboard.press('Control+-');
    await expect.poll(() => readFactor(editorFrame, '')).toBe(1.1);

    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(editorFrame, '')).toBe(1);
  });

  test('the same chords affect only the footnotes area when the caret is in a footnote', async ({
    mainPage,
  }) => {
    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');

    await ensureFootnotesVisible(mainPage, editorFrame, editorId);
    const footnotesRoot = editorFrame.locator('[data-platform-content-zoom-root="footnotes"]');
    await footnotesRoot.click({ force: true });

    await mainPage.keyboard.press('Control+=');
    await expect.poll(() => readFactor(editorFrame, 'footnotes')).toBe(1.1);
    expect(await readFactor(editorFrame, '')).toBe(1);

    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(editorFrame, 'footnotes')).toBe(1);
  });
});
