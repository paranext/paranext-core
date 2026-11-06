/**
 * A web view's own `pagehide` and `unload` listeners still run before its root unmounts when the
 * web view reloads, even ones the web view removes in an effect cleanup.
 *
 * The bootstrap unmounts a replaced document's React root while that document is torn down, and
 * unmounting runs every effect cleanup. If that ran during `pagehide`, a listener the web view had
 * registered in an effect and removes in its cleanup would be removed before the browser reached
 * it, and a web view saving its last edit from that listener would lose it. The bootstrap therefore
 * unmounts on the old document's `unload`, from a listener it adds during `pagehide`, so after
 * every `pagehide` listener and every `unload` listener the web view added earlier, and still while
 * that document is current. This spec pins that order on a real reload.
 *
 * The probe wraps the New Tab web view's component, in the iframe's own realm, with a child whose
 * effect adds two `pagehide` listeners — one removed in the effect's cleanup, one never removed —
 * and an `unload` listener removed in the cleanup, and records each listener's call and the cleanup
 * into an array that lives on the renderer's window, so the record survives the document it came
 * from.
 *
 * ## How to run
 *
 * `e2e-tests/run-e2e-wsl.sh --wrap npm run test:e2e:isolated tests/isolated/web-view-lifecycle/ --
 * --workers=1`
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import {
  type PapiWindow,
  REACT_WEB_VIEW_TYPE,
  iframeSelector,
  openReactWebViewTab,
} from './web-view-lifecycle.util';

/** Where the probe records, on the renderer's own window, what ran during the reload */
const LOG_KEY = '__extensionTeardownListenersProbe';

/** Where the spec keeps, on the renderer's own window, the document the reload replaces */
const REPLACED_DOCUMENT_KEY = '__extensionTeardownReplacedDocument';

/** One record of the probe */
type ProbeEntry = { event: string; rootRendered?: boolean; whileOwnDocumentCurrent?: boolean };

/** The part of the renderer's React the probe component uses inside the iframe */
type ReactInFrame = {
  Fragment: unknown;
  createElement: (type: unknown, props?: unknown, ...children: unknown[]) => unknown;
  useEffect: (effect: () => () => void, deps: unknown[]) => void;
};

test.use({
  // Power mode so the web view is its own dock tab; firstRunComplete because the wizard is a modal
  // that aria-hides the app. DEV_NOISY=false gives the single-Home-tab layout.
  interfaceMode: 'power',
  seedSettings: { 'platform.firstRunComplete': true },
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('web view reload', () => {
  test.setTimeout(300_000);

  test("runs the web view's own pagehide and unload listeners before unmounting its root", async ({
    mainPage: page,
  }) => {
    await waitForAppReady(page, { timeout: 180_000 });
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

    const reloadedId = await page.evaluate(
      async ({ type, id }) => {
        // The renderer sets `globalThis.papi`; it is untyped in the Playwright context.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const { papi } = window as unknown as PapiWindow;
        return papi.webViews.reloadWebView(type, id);
      },
      { type: REACT_WEB_VIEW_TYPE, id: webViewId },
    );
    expect(reloadedId, 'the reload returns the same web view').toBe(webViewId);
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
