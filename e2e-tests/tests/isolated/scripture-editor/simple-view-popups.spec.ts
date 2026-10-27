/**
 * Pop-ups of Simple mode's formatted view: the inline marker menu on `\` in the main text. Simple
 * mode's one view is an EDITABLE formatted view, so this spec needs no view switch. Power mode has
 * no such view: Standard view opens the platform's command palette on `\`, and its formatted
 * rendering is the read-only Preview, where `\` opens nothing.
 *
 * - With the editor's right-click menu open, the menu's own document-capture listener claims `\`
 *   before it can reach the web view's guard (`isEditorContextMenuOpen` inside `handleKeyDown`), so
 *   no inline marker menu opens over it. A positive control (the same key with the menu closed)
 *   shows the check is falsifiable.
 * - The inline marker menu stays at interface scale and beside the text it was opened on while the
 *   text is zoomed and scrolled.
 *
 * Jonah 1 verse 2 holds "that great city" (`c-sharp/assets/WEB/32JONengWEBUS.SFM`).
 *
 * ONE test() per spec file (isolated-fixture constraint — see standard-default-power-mode.spec.ts).
 * Run: `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { sleep, waitForAppReady } from '../../../fixtures/helpers';
import {
  boxOf,
  expectPopupBesideTriggerAndInsideFrame,
  expectSettledBeside,
  readCaretBox,
  scrollTextKeepingVisible,
  scrollTriggerNearPaneTop,
  zoomAreaTo,
} from '../../../fixtures/content-zoom-helpers';
import {
  getEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
} from '../../../fixtures/scripture-editor-helpers';

/**
 * Budget for the double-rAF settle wait below, mirroring `WINDOW_WIDTH_RAF_SETTLE_TIMEOUT_MS` in
 * `helpers.ts`: Chromium's `backgroundThrottling` stops `requestAnimationFrame` entirely for a
 * hidden or occluded window, and `page.evaluate` (here, `Locator.evaluate`) carries no timeout of
 * its own, so this wait needs its own bound rather than relying on the test's overall timeout to
 * end it.
 */
const RAF_SETTLE_TIMEOUT_MS = 2_000;

// DEV_NOISY=false: the noisy dev test layout replaces the normal layouts (see
// scroll-group-sync.spec.ts).
test.use({
  interfaceMode: 'simple',
  // Past first run, so Simple mode starts in the app rather than the setup wizard.
  seedSettings: { 'platform.firstRunComplete': true },
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('scripture editor pop-ups in the Simple-mode view', () => {
  test('the inline marker menu stays at interface scale, and the backslash respects the right-click menu', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, several zoom gestures
    // each waiting on a debounced write). Give it Playwright's 3x "slow" budget for headroom.
    test.slow();

    // This is a Simple-mode spec, so the onboarding tour opens on its own; suppress it before its
    // full-screen overlay can intercept the BCV trigger click below.
    await waitForAppReady(mainPage);
    // No `waitForHomeTab` here: simple mode loads the static simpleLayout, which has NO Home tab
    // (simple-layout.data.ts). The open helper below carries its own app-readiness gates.
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    const editorContainer = editorFrame.locator('.editor-container').first();
    await editorContainer.waitFor({ timeout: 60_000 });

    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    const mainInput = editorFrame.locator('.editor-input').first();
    await expect(mainInput).toContainText('word came to Jonah', { timeout: 60_000 });
    // The view every step below depends on: Simple mode's formatted view (`marker-hidden`), not
    // Standard view (`marker-editable`), whose `\` opens the platform's command palette instead.
    await expect(mainInput).toHaveClass(/\bmarker-hidden\b/, { timeout: 20_000 });

    await test.step('the backslash does not open the inline markers menu while the context menu is open', async () => {
      const contextMenu = editorFrame.locator('.typeahead-popover.auto-embed-menu');
      // A body paragraph that holds a verse and no note: a click at its centre moves the caret
      // rather than landing on a note caller, which would select that note in the footnotes pane.
      const versePara = editorContainer
        .locator('p.usfm_p:has(span.verse):not(:has(span.note))')
        .first();
      await expect(versePara).toBeVisible({ timeout: 30_000 });
      await versePara.click();
      // ContextMenuPlugin suppresses the menu when the right-click target IS the content-editable
      // root, so aim at a paragraph inside it.
      await versePara.click({ button: 'right' });
      await expect(contextMenu).toBeAttached({ timeout: 15_000 });

      // The inline markers menu's search input (`.marker-menu-search`, the one class unique to this
      // popover's `CommandInput`) is the DOM signal to watch for: its `Popover` has no
      // `forceMount`, so nothing of it exists until React actually opens it. Watched inside the
      // EDITOR frame's own document — this popover renders there, not in the main page.
      await editorContainer.evaluate(() => {
        // Stashed on `window` so the disconnect-and-check call below can find the same observer and
        // flag; neither is part of the standard DOM typings.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const w = window as unknown as {
          strayMarkerMenuObserver?: MutationObserver;
          strayMarkerMenuSeen?: boolean;
        };
        const markIfPresent = () => {
          if (document.querySelector('.marker-menu-search')) w.strayMarkerMenuSeen = true;
        };
        w.strayMarkerMenuSeen = false;
        markIfPresent();
        const observer = new MutationObserver(markIfPresent);
        observer.observe(document, { childList: true, subtree: true });
        w.strayMarkerMenuObserver = observer;
      });

      await mainPage.keyboard.press('\\');

      // The open is a synchronous React state update from a discrete keydown handler, so it has
      // committed (or not) by the time two animation frames inside the editor frame have run.
      // Raced against a bounded sleep, not awaited outright: a hidden/occluded window suspends
      // requestAnimationFrame indefinitely (see RAF_SETTLE_TIMEOUT_MS), so this must fail fast
      // instead of hanging — mirrors `setWindowWidth` in `helpers.ts`. `Promise.race` never cancels
      // its loser, so the `.catch(() => {})` keeps the abandoned `evaluate` call from surfacing as
      // an unhandled rejection once the window becomes visible again after the race has settled.
      await Promise.race([
        editorContainer
          .evaluate(
            () =>
              new Promise<void>((resolve) => {
                requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
              }),
          )
          .catch(() => {}),
        sleep(RAF_SETTLE_TIMEOUT_MS),
      ]);

      const strayMarkerMenuSeen = await editorContainer.evaluate(() => {
        // See the install call above for why this cast is needed.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const w = window as unknown as {
          strayMarkerMenuObserver?: MutationObserver;
          strayMarkerMenuSeen?: boolean;
        };
        w.strayMarkerMenuObserver?.disconnect();
        w.strayMarkerMenuObserver = undefined;
        const result = w.strayMarkerMenuSeen;
        w.strayMarkerMenuSeen = undefined;
        return result;
      });
      expect(strayMarkerMenuSeen).toBe(false);
      await expect(contextMenu).toBeAttached();

      // Positive control: the same backslash DOES open the inline markers menu once the context
      // menu is out of the way — proof the check above is falsifiable rather than vacuously true
      // because this view never opens that menu at all.
      await mainPage.keyboard.press('Escape');
      await expect(contextMenu).not.toBeAttached({ timeout: 15_000 });
      await versePara.click();
      await mainPage.keyboard.press('\\');
      const markerMenuSearch = editorFrame.locator('.marker-menu-search');
      await expect(markerMenuSearch).toBeVisible({ timeout: 15_000 });
      await mainPage.keyboard.press('Escape');
      await expect(markerMenuSearch).not.toBeVisible({ timeout: 15_000 });
    });

    await test.step('the inline marker menu stays at interface scale and follows the text', async () => {
      const text = mainInput.getByText('that great city', { exact: false }).first();
      const markerMenu = editorFrame.locator('[data-slot="popover-content"]').filter({
        has: editorFrame.locator('input'),
      });

      // The pop-up is anchored to the text caret, so its box is the trigger.
      const openMarkerMenu = async () => {
        await text.click();
        const caret = await scrollTriggerNearPaneTop(editorFrame, await readCaretBox(editorFrame));
        await mainPage.keyboard.press('\\');
        await expect(markerMenu).toBeVisible();
        await expect(markerMenu).not.toHaveAttribute('data-platform-content-zoom-root', /.*/);
        await expectSettledBeside(editorFrame, markerMenu, caret);
        return caret;
      };
      const closeMarkerMenu = async () => {
        await mainPage.keyboard.press('Escape');
        await expect(markerMenu).toBeHidden();
      };

      // The pop-up has a fixed width (500 px), so at interface scale its painted width is the same
      // at every text zoom.
      const widths = new Map<number, number>();
      // Sequential: each zoom level's pop-up must be opened, measured and closed before the next.
      /* eslint-disable no-await-in-loop */
      const factors = [1, 1.5, 2];
      for (let i = 0; i < factors.length; i += 1) {
        const factor = factors[i];
        await zoomAreaTo(mainPage, editorFrame, editorId, 'main', factor);
        await openMarkerMenu();
        widths.set(factor, (await boxOf(markerMenu)).width);
        await closeMarkerMenu();
      }
      /* eslint-enable no-await-in-loop */
      const atDefault = widths.get(1);
      if (!atDefault) throw new Error('No 100 % width recorded');
      [1.5, 2].forEach((factor) => {
        expect((widths.get(factor) ?? 0) / atDefault).toBeCloseTo(1, 1);
      });

      // Still at 200 %: scroll after opening, and the pop-up moves with its caret. The text
      // scrolls back up (a negative delta), which moves the trigger down: the trigger is parked
      // near the top of the pane, so scrolling the other way would take it out of the pane and
      // leave nothing to compare the pop-up's position against.
      const caretForMenu = await openMarkerMenu();
      const moved = await scrollTextKeepingVisible(editorFrame, -60, caretForMenu);
      await expect(async () =>
        expectPopupBesideTriggerAndInsideFrame(editorFrame, markerMenu, {
          ...caretForMenu,
          y: caretForMenu.y - moved,
        }),
      ).toPass({ timeout: 5_000 });
      await closeMarkerMenu();
    });
  });
});
