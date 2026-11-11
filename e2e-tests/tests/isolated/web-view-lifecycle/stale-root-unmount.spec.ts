/**
 * A React web view's iframe keeps its element when the web view is reloaded: only its `srcdoc`
 * changes, so the iframe navigates to a new document. React is shared from the renderer
 * (`window.React = window.parent.React`), so the root the replaced document created lives on in the
 * renderer unless something unmounts it. A root left mounted keeps its PAPI subscriptions and keeps
 * rendering, and its hooks are bound to the iframe's `window`, which now resolves to the
 * REPLACEMENT document's globals — undefined while that document is still loading, which
 * `WebViewErrorBoundary` reports as "crashed while rendering".
 *
 * Which render lands in that loading window is a matter of timing, so the crash itself cannot be
 * forced. What is deterministic is the leak: the replaced document's root container stays populated
 * for as long as its root stays mounted, and React empties it on unmount. The first step pins that:
 * every replaced document's root ends up unmounted, whether by the replaced document's bootstrap
 * `unload` handler or by the component's load-time fallback (`handleLoadIframe` in
 * `web-view.component.tsx`). It does not tell the two apart. As a secondary check, neither the
 * reloads nor the tab's close log a crash or React's synchronous-unmount-during-render warning for
 * this web view.
 *
 * The second step pins the bootstrap's own ordering: a web view's own `pagehide` and `unload`
 * listeners still run before its root unmounts when the web view reloads, even ones the web view
 * removes in an effect cleanup. The bootstrap unmounts a replaced document's React root while that
 * document is torn down, and unmounting runs every effect cleanup. If that ran during `pagehide`, a
 * listener the web view had registered in an effect and removes in its cleanup would be removed
 * before the browser reached it, and a web view saving its last edit from that listener would lose
 * it. The bootstrap therefore unmounts on the old document's `unload`, from a listener it adds
 * during `pagehide`, so after every `pagehide` listener and every `unload` listener the web view
 * added earlier, and still while that document is current.
 *
 * The ordering probe wraps the New Tab web view's component, in the iframe's own realm, with a
 * child whose effect adds two `pagehide` listeners — one removed in the effect's cleanup, one never
 * removed — and an `unload` listener removed in the cleanup, and records each listener's call and
 * the cleanup into an array that lives on the renderer's window, so the record survives the
 * document it came from.
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
import {
  type PapiWindow,
  crashLines,
  currentRootChildCount,
  iframeSelector,
  openReactWebViewTab,
  reloadReactWebView,
  unmountDuringRenderLines,
} from './web-view-lifecycle.util';

/** Back-to-back reloads, each of which replaces the iframe's document */
const RELOAD_COUNT = 3;

/** Where the spec keeps, on the renderer's own window, the root containers of replaced documents */
const PROBE_KEY = '__staleRootUnmountProbe';

/** Where the ordering probe records, on the renderer's own window, what ran during the reload */
const LOG_KEY = '__extensionTeardownListenersProbe';

/** Where the ordering step keeps, on the renderer's own window, the document the reload replaces */
const REPLACED_DOCUMENT_KEY = '__extensionTeardownReplacedDocument';

/** The budget of the test's first step, which includes the cold app start */
const COLD_START_TIMEOUT_MS = 300_000;

/** The budget of a step after the first: the app is already up, so the config's default */
const WARM_STEP_TIMEOUT_MS = 120_000;

/** One record of the ordering probe */
type ProbeEntry = { event: string; rootRendered?: boolean; whileOwnDocumentCurrent?: boolean };

/** The part of the renderer's React the ordering probe component uses inside the iframe */
type ReactInFrame = {
  Fragment: unknown;
  createElement: (type: unknown, props?: unknown, ...children: unknown[]) => unknown;
  useEffect: (effect: () => () => void, deps: unknown[]) => void;
};

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
  await reloadReactWebView(page, webViewId);

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
  // The cold start, plus the ordering step on the app that start left running
  test.setTimeout(COLD_START_TIMEOUT_MS + WARM_STEP_TIMEOUT_MS);

  test('unmounts the React root of every document it replaces, after its own teardown listeners ran', async ({
    mainPage: page,
  }) => {
    await waitForAppReady(page, { timeout: 180_000 });

    await test.step('unmounts the React root of every document it replaces', async () => {
      // Renderer and iframe console output both reach the page's console listener
      const consoleLines: string[] = [];
      page.on('console', (message) => consoleLines.push(message.text()));

      const webViewId = await openReactWebViewTab(page);

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

      // Closing removes the iframe inside the renderer's own React commit, which fires the old
      // document's `pagehide` and `unload` there, so this is where an unmount run inline from the
      // bootstrap's listeners would warn
      await closeDockTab(page, webViewId);
      await expect(page.locator(iframeSelector(webViewId))).toHaveCount(0, { timeout: 10_000 });
      // The web view component unmounts a closed web view's root from a zero-delay timer, so two
      // timer turns after the iframe is gone, that unmount and any warning it raises have been logged
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 0);
        });
        await new Promise((resolve) => {
          setTimeout(resolve, 0);
        });
      });
      const closeLines = consoleLines.slice(reloadLines.length);

      expect
        .soft(crashLines(reloadLines, [webViewId]), 'no crash reported while reloading')
        .toEqual([]);
      expect.soft(crashLines(closeLines, [webViewId]), 'no crash reported on close').toEqual([]);
      expect
        .soft(unmountDuringRenderLines(reloadLines), 'no unmount-during-render warning on reload')
        .toEqual([]);
      expect
        .soft(unmountDuringRenderLines(closeLines), 'no unmount-during-render warning on close')
        .toEqual([]);
    });

    await test.step("runs the web view's own pagehide and unload listeners before unmounting its root", async () => {
      const webViewId = await openReactWebViewTab(page);
      const selector = iframeSelector(webViewId);

      // The bootstrap deletes the iframe's `window.parent`, so hand the iframe a renderer-realm array
      // to record into, and keep the document the reload will replace
      await page.evaluate(
        ({ iframe, logKey, documentKey }) => {
          // The probe is the spec's own scratch space on both windows, untyped there.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          const renderer = window as unknown as Record<string, unknown>;
          const contentWindow = document.querySelector<HTMLIFrameElement>(iframe)?.contentWindow;
          if (!contentWindow) throw new Error(`no window in ${iframe}`);
          renderer[logKey] = [];
          renderer[documentKey] = contentWindow.document;
          // The iframe's window is untyped scratch space here too.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          (contentWindow as unknown as Record<string, unknown>)[logKey] = renderer[logKey];
        },
        { iframe: selector, logKey: LOG_KEY, documentKey: REPLACED_DOCUMENT_KEY },
      );

      const frame = await (await page.locator(selector).elementHandle())?.contentFrame();
      if (!frame) throw new Error(`no frame for ${selector}`);
      await frame.evaluate((logKey) => {
        // This runs in the iframe's realm against the bootstrap's untyped globals: `React` (the
        // renderer's) and the extension's `webViewComponent`.
        /* eslint-disable no-type-assertion/no-type-assertion */
        const iframeWindow = window as unknown as Record<string, unknown>;
        const log = iframeWindow[logKey] as ProbeEntry[];
        const ReactInFrame = iframeWindow.React as ReactInFrame;
        const Original = iframeWindow.webViewComponent;
        /* eslint-enable no-type-assertion/no-type-assertion */
        const rootRendered = () => (document.getElementById('root')?.childElementCount ?? 0) > 0;
        function Probe() {
          ReactInFrame.useEffect(() => {
            const mountedDocument = document;
            const removedInCleanup = () =>
              log.push({ event: 'removed-in-cleanup listener ran', rootRendered: rootRendered() });
            const neverRemoved = () =>
              log.push({ event: 'never-removed listener ran', rootRendered: rootRendered() });
            const unloadRemovedInCleanup = () =>
              log.push({ event: 'unload listener ran', rootRendered: rootRendered() });
            window.addEventListener('pagehide', removedInCleanup);
            window.addEventListener('pagehide', neverRemoved);
            window.addEventListener('unload', unloadRemovedInCleanup);
            log.push({ event: 'effect mounted' });
            return () => {
              log.push({
                event: 'effect cleanup ran',
                whileOwnDocumentCurrent: window.document === mountedDocument,
              });
              window.removeEventListener('pagehide', removedInCleanup);
              window.removeEventListener('unload', unloadRemovedInCleanup);
            };
          }, []);
          return undefined;
        }
        iframeWindow.webViewComponent = (props: object) =>
          ReactInFrame.createElement(
            ReactInFrame.Fragment,
            undefined,
            // The extension's component, rendered as the bootstrap renders it
            ReactInFrame.createElement(Original, props),
            ReactInFrame.createElement(Probe),
          );
      }, LOG_KEY);

      const readLog = () =>
        page.evaluate(
          // The probe's record on the renderer's window is untyped there.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          (logKey) => [...((window as unknown as Record<string, ProbeEntry[]>)[logKey] ?? [])],
          LOG_KEY,
        );

      // A definition update re-renders the root with the wrapped component, mounting the probe
      await page.evaluate((id) => {
        // The renderer sets this global for its iframes; it is untyped in the Playwright context.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const { updateWebViewDefinitionById } = window as unknown as PapiWindow;
        updateWebViewDefinitionById(id, { title: 'Probed web view' });
      }, webViewId);
      await expect
        .poll(readLog, { message: 'the probe mounted', timeout: 10_000 })
        .toEqual([{ event: 'effect mounted' }]);

      await reloadReactWebView(page, webViewId);
      await expect
        .poll(
          () =>
            page.evaluate(
              ({ iframe, documentKey }) => {
                const doc = document.querySelector<HTMLIFrameElement>(iframe)?.contentDocument;
                // The kept document on the renderer's window is untyped there.
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                const replaced = (window as unknown as Record<string, unknown>)[documentKey];
                if (!doc || doc === replaced) return -1;
                return doc.getElementById('root')?.childElementCount ?? -1;
              },
              { iframe: selector, documentKey: REPLACED_DOCUMENT_KEY },
            ),
          { message: 'the reload replaced the iframe document and rendered it', timeout: 60_000 },
        )
        .toBeGreaterThan(0);

      // Every listener the web view added runs while the old root is still rendered, and only then
      // does the unmount run the cleanup — before the replacement document becomes current
      await expect
        .poll(readLog, {
          message: 'what ran while the reload replaced the document',
          timeout: 10_000,
        })
        .toEqual([
          { event: 'effect mounted' },
          { event: 'removed-in-cleanup listener ran', rootRendered: true },
          { event: 'never-removed listener ran', rootRendered: true },
          { event: 'unload listener ran', rootRendered: true },
          { event: 'effect cleanup ran', whileOwnDocumentCurrent: true },
        ]);
    });
  });
});
