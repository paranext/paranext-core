/**
 * Moving a web view's tab within its window reloads the tab's iframe without the web view itself
 * going anywhere. rc-tabs renders a panel's tab panes as keyed siblings, so reordering tabs makes
 * React re-insert the moved pane's DOM node, and an iframe re-inserted into the DOM loads a new
 * document. The web view component stays mounted throughout, so its close-time unmount never runs
 * for the replaced document, and that document's own hide handler runs while its realm is being
 * torn down. React is shared from the renderer (`window.React = window.parent.React`), so the root
 * the replaced document created lives on in the renderer unless something still alive unmounts it.
 *
 * As in `stale-root-unmount.spec.ts`, what is deterministic is the leak: the replaced document's
 * root container stays populated for as long as its root stays mounted, and React empties it on
 * unmount. The move is a real drag through rc-dock's drag manager, released on the tab bar's empty
 * space after the tabs so the dragged tab becomes the panel's last.
 *
 * That this spec goes red without the web view component's load-handler unmount relies on Chromium
 * dropping the replaced document's queued unmount along with that document; the component's unit
 * tests (`web-view.component.test.tsx`) pin the load-handler unmount whatever the browser does, and
 * this spec is the end-to-end proof.
 *
 * ## How to run
 *
 * `e2e-tests/run-e2e-wsl.sh --wrap npm run test:e2e:isolated tests/isolated/web-view-lifecycle/ --
 * --workers=1`
 */
import type { Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import {
  DRAGGING_LAYER,
  panelSelector,
  readBars,
  startDrag,
} from '../../../fixtures/dock-tab-helpers';
import {
  type PapiWindow,
  crashLines,
  currentRootChildCount,
  iframeSelector,
  openReactWebViewTab,
  unmountDuringRenderLines,
} from './web-view-lifecycle.util';

/** Where the spec keeps, on the renderer's own window, each web view's documents and containers */
const PROBE_KEY = '__movedTabRootUnmountProbe';

/** One kept document of a web view, as the probe reports it back */
type KeptRoot = {
  webViewId: string;
  /** Whether the web view's iframe has since loaded a different document */
  replaced: boolean;
  /** Elements still rendered into the kept document's React root container */
  childCount: number;
};

/** What the probe keeps on the renderer's window for one web view */
type KeptDocument = { webViewId: string; selector: string; doc: Document; root: Element };

/** Keeps each web view's current document and root container on the renderer's window */
async function keepCurrentRoots(page: Page, webViewIds: string[]): Promise<void> {
  await page.evaluate(
    ({ webViews, probeKey }) => {
      // The probe is the spec's own scratch space on the renderer's window, untyped there.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const probeWindow = window as unknown as Record<string, KeptDocument[]>;
      probeWindow[probeKey] = webViews.map(({ webViewId, selector }) => {
        const doc = document.querySelector<HTMLIFrameElement>(selector)?.contentDocument;
        const root = doc?.getElementById('root');
        if (!doc || !root) throw new Error(`no React root in web view ${webViewId}`);
        return { webViewId, selector, doc, root };
      });
    },
    {
      webViews: webViewIds.map((webViewId) => ({ webViewId, selector: iframeSelector(webViewId) })),
      probeKey: PROBE_KEY,
    },
  );
}

async function readKeptRoots(page: Page): Promise<KeptRoot[]> {
  return page.evaluate((probeKey) => {
    // The probe the spec keeps on the renderer's window is untyped there.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const probeWindow = window as unknown as Record<string, KeptDocument[]>;
    return probeWindow[probeKey].map(({ webViewId, selector, doc, root }) => ({
      webViewId,
      replaced: document.querySelector<HTMLIFrameElement>(selector)?.contentDocument !== doc,
      childCount: root.childElementCount,
    }));
  }, PROBE_KEY);
}

/** Element counts rendered into each web view's CURRENT document's root, -1 while it has none */
async function liveRootChildCounts(page: Page, webViewIds: string[]): Promise<number[]> {
  return Promise.all(webViewIds.map((webViewId) => currentRootChildCount(page, webViewId)));
}

/**
 * Drags a tab onto its own bar's empty space after the tabs, which makes it the panel's last tab.
 * The "+" button moves once a drag starts, so the target is measured only after that.
 */
async function dragTabToEndOfItsBar(page: Page, webViewId: string, panelId: string) {
  try {
    await startDrag(page, webViewId);
    const target = await page.evaluate((panel) => {
      const rect = (selector: string) => {
        const element = document.querySelector(`${panel} ${selector}`);
        if (!element) throw new Error(`no ${selector} in ${panel}`);
        return element.getBoundingClientRect();
      };
      const zone = rect('.platform-tab-bar-drop-zone');
      const plus = rect('.new-tab-button');
      const bar = rect('.dock-bar');
      return { x: zone.left + 0.75 * (plus.left - zone.left), y: (bar.top + bar.bottom) / 2 };
    }, panelSelector(panelId));
    await page.mouse.move(target.x, target.y, { steps: 10 });
  } finally {
    await page.mouse.up();
  }
  await expect(page.locator(DRAGGING_LAYER)).toHaveCount(0, { timeout: 5_000 });
}

test.use({
  // Power mode so each web view is its own dock tab; firstRunComplete because the wizard is a modal
  // that aria-hides the app. DEV_NOISY=false gives the single-Home-tab layout.
  interfaceMode: 'power',
  seedSettings: { 'platform.firstRunComplete': true },
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('web view tab moved within its window', () => {
  test.setTimeout(300_000);

  test('unmounts the React root of the document its iframe replaced', async ({
    mainPage: page,
  }) => {
    await waitForAppReady(page, { timeout: 180_000 });

    const consoleLines: string[] = [];
    page.on('console', (message) => consoleLines.push(message.text()));

    const moved = await openReactWebViewTab(page);
    const stayed = await openReactWebViewTab(page);
    const webViewIds = [moved, stayed];

    const barsBefore = await readBars(page);
    const panelId = barsBefore.find((bar) => bar.tabIds.includes(moved))?.panelId;
    if (!panelId) throw new Error(`web view ${moved} is in no panel`);
    const tabsBefore = barsBefore.find((bar) => bar.panelId === panelId)?.tabIds ?? [];
    expect(tabsBefore, 'both web views share one panel').toContain(stayed);
    expect(tabsBefore.at(-1), 'the tab to move is not already last').not.toBe(moved);

    await keepCurrentRoots(page, webViewIds);
    const linesBeforeMove = consoleLines.length;

    await dragTabToEndOfItsBar(page, moved, panelId);
    await expect
      .poll(
        async () => (await readBars(page)).find((bar) => bar.panelId === panelId)?.tabIds.at(-1),
        { message: "the dragged tab is now its panel's last tab", timeout: 10_000 },
      )
      .toBe(moved);

    // Precondition: the move re-inserted the moved tab's pane, so its iframe has a new document,
    // and every web view's live document has rendered
    await expect
      .poll(
        async () =>
          (await readKeptRoots(page)).find((kept) => kept.webViewId === moved)?.replaced ?? false,
        { message: "the move replaced the moved tab's document", timeout: 30_000 },
      )
      .toBe(true);
    await expect
      .poll(async () => Math.min(...(await liveRootChildCounts(page, webViewIds))), {
        message: 'every live document rendered its React root',
        timeout: 60_000,
      })
      .toBeGreaterThan(0);

    // A definition update reaches every root still subscribed to these web views' updates, so a
    // root the move left mounted re-renders here rather than sitting idle
    await page.evaluate((ids) => {
      // The renderer sets this global for its iframes; it is untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { updateWebViewDefinitionById } = window as unknown as PapiWindow;
      ids.forEach((id) => updateWebViewDefinitionById(id, { title: 'Moved web view' }));
    }, webViewIds);

    // Replaced documents whose root container still holds elements, as `id: count`
    await expect
      .poll(
        async () =>
          (await readKeptRoots(page))
            .filter((kept) => kept.replaced && kept.childCount > 0)
            .map((kept) => `${kept.webViewId}: ${kept.childCount}`),
        { message: 'every replaced document has had its React root unmounted', timeout: 10_000 },
      )
      .toEqual([]);
    // Control: the tab that stayed kept its document, which is still rendered, and so is every live
    // one, so the zeros above are the replaced roots' unmount and not every web view root reading
    // empty. Moving a tab to the end of its bar makes React re-insert only that tab's pane.
    const stayedKept = (await readKeptRoots(page)).find((kept) => kept.webViewId === stayed);
    expect(
      stayedKept?.replaced,
      'the move did not replace the document of the tab that stayed',
    ).toBe(false);
    expect(stayedKept?.childCount, 'the tab that stayed is still rendered').toBeGreaterThan(0);
    expect(Math.min(...(await liveRootChildCounts(page, webViewIds)))).toBeGreaterThan(0);

    const moveLines = consoleLines.slice(linesBeforeMove);
    expect.soft(crashLines(moveLines, webViewIds), 'no crash reported while moving').toEqual([]);
    expect
      .soft(unmountDuringRenderLines(moveLines), 'no unmount-during-render warning while moving')
      .toEqual([]);
  });
});
