/**
 * A React web view's iframe keeps its element when the web view is reloaded: only its `srcdoc`
 * changes, so the iframe navigates to a new document. React is shared from the renderer
 * (`window.React = window.parent.React`), so the root the replaced document created lives on in the
 * renderer unless that document's bootstrap unmounts it. A root left mounted keeps its PAPI
 * subscriptions and keeps rendering, and its hooks are bound to the iframe's `window`, which now
 * resolves to the REPLACEMENT document's globals — undefined while that document is still loading,
 * which `WebViewErrorBoundary` reports as "crashed while rendering".
 *
 * Which render lands in that loading window is a matter of timing, so the crash itself cannot be
 * forced. What is deterministic is the leak: the replaced document's root container stays populated
 * for as long as its root stays mounted, and React empties it on unmount. That is what this spec
 * pins, plus — as a secondary check — that neither the reloads nor the tab's close log a crash or
 * React's synchronous-unmount-during-render warning for this web view.
 *
 * Setup goes through PAPI (the isolated-suite setup exception): there is no UI that reloads a web
 * view in place, which is exactly what extensions do when they re-point an open panel.
 *
 * ## How to run
 *
 * `e2e-tests/run-e2e-wsl.sh --wrap npm run test:e2e:isolated tests/isolated/web-view-lifecycle/ --
 * --workers=1`
 */
import type { Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import { closeDockTab } from '../../../fixtures/content-zoom-helpers';

/** A small React web view every build ships, whose provider answers a reload of an existing tab */
const REACT_WEB_VIEW_TYPE = 'platformGetResources.newTab';

/** Back-to-back reloads, each of which replaces the iframe's document */
const RELOAD_COUNT = 3;

/** Where the spec keeps, on the renderer's own window, the root containers of replaced documents */
const PROBE_KEY = '__staleRootUnmountProbe';

type PapiWindow = {
  papi: {
    webViews: {
      openWebView: (type: string, layout?: unknown) => Promise<string | undefined>;
      reloadWebView: (type: string, id: string) => Promise<string | undefined>;
    };
  };
  updateWebViewDefinitionById: (id: string, update: { title?: string }) => boolean;
};

function iframeSelector(webViewId: string): string {
  return `iframe[data-web-view-id="${webViewId}"]`;
}

/**
 * How many elements the iframe's CURRENT document has rendered into its React root container, or -1
 * while that document has no container yet.
 */
async function currentRootChildCount(page: Page, webViewId: string): Promise<number> {
  return page.evaluate((selector) => {
    const iframe = document.querySelector<HTMLIFrameElement>(selector);
    return iframe?.contentDocument?.getElementById('root')?.childElementCount ?? -1;
  }, iframeSelector(webViewId));
}

/** Waits until the iframe's current document has rendered its React root */
async function waitForRenderedRoot(page: Page, webViewId: string): Promise<void> {
  await expect
    .poll(() => currentRootChildCount(page, webViewId), { timeout: 60_000 })
    .toBeGreaterThan(0);
}

/**
 * Keeps a handle to the iframe's current document and its root container on the renderer's window,
 * so they can still be inspected after the iframe has navigated away from them.
 */
async function keepCurrentRoot(page: Page, webViewId: string): Promise<void> {
  await page.evaluate(
    ({ selector, probeKey }) => {
      const iframe = document.querySelector<HTMLIFrameElement>(selector);
      const doc = iframe?.contentDocument;
      const container = doc?.getElementById('root');
      if (!doc || !container) throw new Error(`no React root in ${selector}`);
      // The probe is the spec's own scratch space on the renderer's window, untyped there.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const probeWindow = window as unknown as Record<string, { doc: Document; root: Element }[]>;
      probeWindow[probeKey] ??= [];
      probeWindow[probeKey].push({ doc, root: container });
    },
    { selector: iframeSelector(webViewId), probeKey: PROBE_KEY },
  );
}

/** Reloads the web view and waits until its iframe shows a NEW document with a rendered root */
async function reloadAndWaitForNewDocument(page: Page, webViewId: string): Promise<void> {
  const reloadedId = await page.evaluate(
    async ({ type, id }) => {
      // The renderer sets `globalThis.papi`; it is untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { papi } = window as unknown as PapiWindow;
      return papi.webViews.reloadWebView(type, id);
    },
    { type: REACT_WEB_VIEW_TYPE, id: webViewId },
  );
  expect(reloadedId, 'the reload answers the same web view').toBe(webViewId);

  await expect
    .poll(
      () =>
        page.evaluate(
          ({ selector, probeKey }) => {
            const iframe = document.querySelector<HTMLIFrameElement>(selector);
            const doc = iframe?.contentDocument;
            // The probe the spec keeps on the renderer's window is untyped there.
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            const kept = (window as unknown as Record<string, { doc: Document }[]>)[probeKey] ?? [];
            if (!doc || kept.some((entry) => entry.doc === doc)) return -1;
            return doc.getElementById('root')?.childElementCount ?? -1;
          },
          { selector: iframeSelector(webViewId), probeKey: PROBE_KEY },
        ),
      { message: 'the reload replaced the iframe document and rendered it', timeout: 60_000 },
    )
    .toBeGreaterThan(0);
}

/** Element counts still rendered into each kept root container, oldest document first */
async function keptRootChildCounts(page: Page): Promise<number[]> {
  return page.evaluate((probeKey) => {
    // The probe the spec keeps on the renderer's window is untyped there.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const kept = (window as unknown as Record<string, { root: Element }[]>)[probeKey] ?? [];
    return kept.map((entry) => entry.root.childElementCount);
  }, PROBE_KEY);
}

test.use({
  // Power mode so the web view is its own dock tab with a close button; firstRunComplete because the
  // wizard is a modal that aria-hides the app. DEV_NOISY=false gives the single-Home-tab layout.
  interfaceMode: 'power',
  seedSettings: { 'platform.firstRunComplete': true },
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('web view reload', () => {
  test.setTimeout(300_000);

  test('unmounts the React root of every document it replaces', async ({ mainPage: page }) => {
    await waitForAppReady(page, { timeout: 180_000 });

    // Renderer and iframe console output both reach the page's console listener
    const consoleLines: string[] = [];
    page.on('console', (message) => consoleLines.push(message.text()));

    const webViewId = await page.evaluate(async (type) => {
      // The renderer sets `globalThis.papi`; it is untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { papi } = window as unknown as PapiWindow;
      return papi.webViews.openWebView(type, { type: 'tab' });
    }, REACT_WEB_VIEW_TYPE);
    if (!webViewId) throw new Error('openWebView answered no id');
    await waitForRenderedRoot(page, webViewId);

    for (let reload = 0; reload < RELOAD_COUNT; reload++) {
      // Sequential on purpose: each reload replaces the document the previous one produced
      // eslint-disable-next-line no-await-in-loop
      await keepCurrentRoot(page, webViewId);
      // Sequential on purpose: the next reload needs this one's document in place
      // eslint-disable-next-line no-await-in-loop
      await reloadAndWaitForNewDocument(page, webViewId);
    }

    // A definition update reaches every root still subscribed to this web view's updates, so a
    // root the reloads left mounted re-renders here rather than sitting idle
    await page.evaluate((id) => {
      // The renderer sets this global for its iframes; it is untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { updateWebViewDefinitionById } = window as unknown as PapiWindow;
      updateWebViewDefinitionById(id, { title: 'Reloaded web view' });
    }, webViewId);

    await expect
      .poll(() => keptRootChildCounts(page), {
        message: 'every replaced document has had its React root unmounted',
        timeout: 10_000,
      })
      .toEqual(Array.from({ length: RELOAD_COUNT }, () => 0));
    // Control: the live document is still rendered, so the zeros above are the old roots' unmount
    // and not every web view root reading empty
    expect(await currentRootChildCount(page, webViewId)).toBeGreaterThan(0);

    const reloadLines = [...consoleLines];

    // Closing removes the iframe inside the renderer's own React commit, which fires the same hide
    // event, so this is where an unmount that ran synchronously in the handler would warn
    await closeDockTab(page, webViewId);
    // Gives a deferred unmount, and any warning it raises, time to arrive before the log is read
    await page.waitForTimeout(1_000);
    const closeLines = consoleLines.slice(reloadLines.length);

    const crashLines = (lines: string[]) =>
      lines.filter((line) => line.includes(webViewId) && line.includes('crashed while rendering'));
    const unmountDuringRenderLines = (lines: string[]) =>
      lines.filter((line) => line.includes('Attempted to synchronously unmount a root'));
    expect.soft(crashLines(reloadLines), 'no crash reported while reloading').toEqual([]);
    expect.soft(crashLines(closeLines), 'no crash reported on close').toEqual([]);
    expect
      .soft(unmountDuringRenderLines(reloadLines), 'no unmount-during-render warning on reload')
      .toEqual([]);
    expect
      .soft(unmountDuringRenderLines(closeLines), 'no unmount-during-render warning on close')
      .toEqual([]);
  });
});
