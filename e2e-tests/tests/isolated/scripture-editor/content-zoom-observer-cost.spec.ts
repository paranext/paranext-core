/**
 * Measures the bootstrap content-zoom `MutationObserver`'s per-batch scan cost inside a real
 * Scripture editor under a sustained typing load (PT-4581, epic PT-4575).
 *
 * `web-view-content-zoom.bootstrap-script.ts`'s `start()` observes `document.documentElement` with
 * `{ childList: true, subtree: true, attributes: true, attributeFilter:
 * [CONTENT_ZOOM_ROOT_ATTRIBUTE] }` and runs `collectAreas()` — a
 * `document.querySelectorAll('[data-platform-content-zoom-root]')` plus a
 * `parentElement.closest(...)` per hit — on every mutation batch. That observer already runs in
 * every non-URL web view, marked or not; the Scripture editor only changes how many elements the
 * scan matches (two: `main` and, once shown, `footnotes`). So the number worth reporting is a PAIR
 * measured over the identical mutation batches: the scan as it now runs (2 matches) against the
 * same scan's 0-match baseline. The difference between the two isolates the editor's marginal cost
 * from the pre-existing observer's own cost, which this item does not own.
 *
 * Two independent `MutationObserver`s are installed inside the editor frame with the bootstrap's
 * exact observe() options, so both fire on the same mutation batches: one times `collectAreas`'s
 * real selector, the other times a selector that can never match
 * (`[data-platform-content-zoom-root-none]`), replicating the same per-hit `closest()` walk (a
 * no-op when nothing matched). Real typing (`pressSequentially`, matching
 * `type-through-save-echo.spec.ts`) drives the mutation batches, once with the footnotes pane
 * hidden and once with it shown, so the reported numbers reflect the editor's real DOM churn rather
 * than a synthetic mutation.
 *
 * ONE test() per spec file on purpose (the isolated fixture is test-scoped, and a second Electron
 * instance against the shared renderer dev server has a documented dock-tab failure mode — see
 * standard-default-power-mode.spec.ts). The two pane-visibility measurements are test.step()s
 * sharing the one instance.
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
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

/**
 * The attribute the bootstrap's observer filters on and `collectAreas` selects by
 * (`CONTENT_ZOOM_ROOT_ATTRIBUTE`, `web-view.model.ts`). Restated here as a literal, matching
 * `content-zoom.spec.ts`'s own convention: `e2e-tests/tsconfig.json` has no path aliases, so core's
 * `@shared/*` modules are not importable from this package.
 */
const CONTENT_ZOOM_ROOT_ATTRIBUTE = 'data-platform-content-zoom-root';

/** A selector matching the same attribute name but a value nothing in any pane ever carries. */
const ZERO_MATCH_ATTRIBUTE = `${CONTENT_ZOOM_ROOT_ATTRIBUTE}-none`;

/** Duration of the typing burst that drives mutation batches for one measurement. */
const TYPING_BURST_MS = 5_000;
/** Per-character delay for the typing burst (matches `type-through-save-echo.spec.ts`). */
const TYPING_DELAY_MS = 50;
/** Distinctive token, long enough at {@link TYPING_DELAY_MS} to span {@link TYPING_BURST_MS}. */
const TYPING_BURST = 'Z'.repeat(Math.ceil(TYPING_BURST_MS / TYPING_DELAY_MS));
/**
 * The PDP save is a TRAILING debounce reset on every keystroke (`PDP_SAVE_DEBOUNCE_MS`,
 * `platform-scripture-editor.web-view.tsx`): a continuous burst at {@link TYPING_DELAY_MS} never
 * leaves the 700ms gap the debounce needs, so within the burst itself no save (and so no
 * childList-mutating echo) fires — the bootstrap's observer genuinely sees nothing until typing
 * stops. This buffer keeps the probe attached past the burst long enough for that trailing
 * save/echo round trip to land, so the measurement includes the mutation the typing load actually
 * produces rather than stopping one tick before it.
 */
const SAVE_ROUND_TRIP_BUFFER_MS = 3_000;

/** One selector's aggregated timing over a probe window. */
interface ScanTiming {
  /** Number of mutation batches the observer's callback ran for. */
  batches: number;
  /** Sum of every batch's scan time, in milliseconds. */
  totalMs: number;
  /** Slowest single batch, in milliseconds. */
  maxMs: number;
  /** Mean scan time per batch, in microseconds (derived from `totalMs`/`batches`). */
  meanUs: number;
}

/** Result of one probe window: the real selector's timing, the 0-match baseline, and DOM size. */
interface ObserverCostResult {
  marked: ScanTiming;
  zero: ScanTiming;
  nodeCount: number;
}

/**
 * The `iframe[data-web-view-id]` element's content frame — a real `Frame`, not a `FrameLocator`, so
 * `evaluate` can install `MutationObserver`s and read `window` state inside the pane (same pattern
 * as `content-zoom.spec.ts`'s `getEditorFrame`).
 */
async function getEditorFrame(page: Page, webViewId: string): Promise<Frame> {
  const handle = await page.locator(`iframe[data-web-view-id="${webViewId}"]`).elementHandle();
  const frame = await handle?.contentFrame();
  if (!frame) throw new Error(`Editor iframe ${webViewId} has no content frame`);
  return frame;
}

/**
 * Installs the two timing `MutationObserver`s inside the editor frame and stashes their running
 * state on `window`, so a later call (after the typing burst) can disconnect them and read the
 * result. Split into start/stop rather than one blocking `evaluate` because the typing burst that
 * drives the mutations runs from the OUTER page (Playwright's own keyboard), not from inside the
 * frame.
 */
async function startObserverProbe(frame: Frame): Promise<void> {
  await frame.evaluate(
    ([markedAttr, zeroAttr]) => {
      const makeTiming = () => ({ batches: 0, totalMs: 0, maxMs: 0 });
      const marked = makeTiming();
      const zero = makeTiming();
      // Times `collectAreas`'s exact shape: a scan by attribute, then one `closest()` walk per hit
      // (a no-op for the zero-match selector, since its `forEach` never runs).
      const scan = (timing: ReturnType<typeof makeTiming>, selector: string) => {
        const start = performance.now();
        document.querySelectorAll(`[${selector}]`).forEach((element) => {
          if (element.parentElement) element.parentElement.closest(`[${selector}]`);
        });
        const elapsed = performance.now() - start;
        timing.batches += 1;
        timing.totalMs += elapsed;
        timing.maxMs = Math.max(timing.maxMs, elapsed);
      };
      // The bootstrap's exact observe() options (`web-view-content-zoom.bootstrap-script.ts`,
      // `start()`): both probes observe the SAME attribute filter, so both fire on the same
      // mutation batches — only the selector each callback scans for differs.
      const options: MutationObserverInit = {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: [markedAttr],
      };
      const markedObserver = new MutationObserver(() => scan(marked, markedAttr));
      const zeroObserver = new MutationObserver(() => scan(zero, zeroAttr));
      markedObserver.observe(document.documentElement, options);
      zeroObserver.observe(document.documentElement, options);
      // The double underscore marks this as an internal test-only probe global, not a platform
      // contract, and `window` has no typed slot for it.
      // eslint-disable-next-line no-underscore-dangle, no-type-assertion/no-type-assertion
      (window as unknown as { __zoomObserverCostProbe?: unknown }).__zoomObserverCostProbe = {
        markedObserver,
        zeroObserver,
        marked,
        zero,
      };
    },
    [CONTENT_ZOOM_ROOT_ATTRIBUTE, ZERO_MATCH_ATTRIBUTE] as const,
  );
}

/** Disconnects the probe's observers and resolves the aggregated result. */
async function stopObserverProbe(frame: Frame): Promise<ObserverCostResult> {
  return frame.evaluate(() => {
    interface Timing {
      batches: number;
      totalMs: number;
      maxMs: number;
    }
    interface Probe {
      markedObserver: MutationObserver;
      zeroObserver: MutationObserver;
      marked: Timing;
      zero: Timing;
    }
    // The double underscore marks this as an internal test-only probe global, not a platform
    // contract, and `window` has no typed slot for it.
    // eslint-disable-next-line no-underscore-dangle, no-type-assertion/no-type-assertion
    const probe = (window as unknown as { __zoomObserverCostProbe?: Probe })
      .__zoomObserverCostProbe;
    if (!probe) throw new Error('Observer-cost probe was not started');
    probe.markedObserver.disconnect();
    probe.zeroObserver.disconnect();
    const toResult = (timing: Timing) => ({
      ...timing,
      meanUs: timing.batches > 0 ? (timing.totalMs * 1000) / timing.batches : 0,
    });
    return {
      marked: toResult(probe.marked),
      zero: toResult(probe.zero),
      nodeCount: document.querySelectorAll('*').length,
    };
  });
}

/**
 * Runs one probe window: install the observers, type a ~5 s burst into the focused editor, then
 * disconnect and collect the result. `editorInput` must already be focused with the caret parked
 * (the caller clicks and presses `End` beforehand, as `type-through-save-echo.spec.ts` does).
 */
async function measureObserverCost(
  frame: Frame,
  editorInput: ReturnType<Frame['locator']>,
): Promise<ObserverCostResult> {
  await startObserverProbe(frame);
  await editorInput.pressSequentially(TYPING_BURST, { delay: TYPING_DELAY_MS });
  // Deliberate wait, not a flaky sleep-for-luck: gives the trailing 700ms debounced save and its
  // echo (see SAVE_ROUND_TRIP_BUFFER_MS) time to land before the probe disconnects. A raw
  // `setTimeout` rather than Playwright's `waitForTimeout` because this waits on the PDP round
  // trip through a `Frame`, which has no `waitForTimeout` of its own.
  await new Promise((resolve) => {
    setTimeout(resolve, SAVE_ROUND_TRIP_BUFFER_MS);
  });
  return stopObserverProbe(frame);
}

test.describe('scripture editor content-zoom observer cost', () => {
  test('reports the bootstrap observer scan cost, marked vs 0-match, footnotes hidden vs shown', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, two ~5s typing bursts each awaited by real
    // mutation batches). Give it Playwright's 3x "slow" budget for headroom.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    // Jonah 1 carries footnote callers (c-sharp/assets/WEB/32JONengWEBUS.SFM), so navigating here
    // gives the footnotes pane real content once shown.
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    const editorInput = editorFrame.locator('.editor-input.marker-editable');
    await expect(editorInput).toBeAttached({ timeout: 60_000 });

    let hiddenResult: ObserverCostResult | undefined;
    let shownResult: ObserverCostResult | undefined;

    /**
     * Sends `platformScriptureEditor.toggleFootnotes` from the renderer, exactly as a menu entry
     * would (same pattern as `content-zoom.spec.ts`'s `sendCommandWithId`).
     */
    const toggleFootnotes = () =>
      mainPage.evaluate(
        ([webViewId]) => {
          // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as
          // content-zoom.spec.ts's sendCommandWithId).
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          const win = window as unknown as {
            papi: { commands: { sendCommand: (c: string, ...a: unknown[]) => Promise<unknown> } };
          };
          return win.papi.commands.sendCommand(
            'platformScriptureEditor.toggleFootnotes',
            webViewId,
          );
        },
        [editorId] as const,
      );
    const footnotesRoot = editorFrame.locator(`[${CONTENT_ZOOM_ROOT_ATTRIBUTE}="footnotes"]`);

    await test.step('footnotes pane hidden — main area only', async () => {
      // Jonah 1 carries notes, so Power mode's footnotes auto-show/hide
      // (`resolveFootnotesPaneAutoVisibility`) may already have the pane open — hide it explicitly
      // rather than assume the default, so this step measures the genuinely-hidden state.
      if ((await footnotesRoot.count()) > 0) {
        await toggleFootnotes();
        await footnotesRoot.waitFor({ state: 'detached', timeout: 20_000 });
      }

      await editorInput.click();
      await editorInput.press('End');
      hiddenResult = await measureObserverCost(editorFrame, editorInput);
    });

    await test.step('footnotes pane shown — main and footnotes both marked', async () => {
      if ((await footnotesRoot.count()) === 0) {
        await toggleFootnotes();
      }
      await footnotesRoot.waitFor({ state: 'attached', timeout: 20_000 });

      await editorInput.click();
      await editorInput.press('End');
      shownResult = await measureObserverCost(editorFrame, editorInput);
    });

    if (!hiddenResult || !shownResult) throw new Error('Both probe windows must have run');
    const result = { hidden: hiddenResult, shown: shownResult };

    // Prints the numbers table for a local run; `e2e-tests/.eslintrc.json` turns `no-console` off
    // for this package.
    console.log('content-zoom observer cost:', JSON.stringify(result, undefined, 2));
    await test.info().attach('observer-cost', {
      body: JSON.stringify(result, undefined, 2),
      contentType: 'application/json',
    });

    // Loose smoke guards only — this measures a specific machine's timing under a specific typing
    // load, not a performance budget. A tight threshold here would turn ordinary hardware variance
    // into a red build; the actual numbers belong in the PR body, read by a human.
    expect(result.hidden.marked.maxMs).toBeLessThan(50);
    expect(result.hidden.marked.meanUs).toBeLessThan(2000);
    expect(result.shown.marked.maxMs).toBeLessThan(50);
    expect(result.shown.marked.meanUs).toBeLessThan(2000);
  });
});
