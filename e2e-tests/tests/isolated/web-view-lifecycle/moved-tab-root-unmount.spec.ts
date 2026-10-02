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
 * ## How to run
 *
 * `e2e-tests/run-e2e-wsl.sh --wrap npm run test:e2e:isolated tests/isolated/web-view-lifecycle/ --
 * --workers=1`
 */
import type { Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';

/** A small React web view every build ships */
const REACT_WEB_VIEW_TYPE = 'platformGetResources.newTab';

/** Where the spec keeps, on the renderer's own window, each web view's documents and containers */
const PROBE_KEY = '__movedTabRootUnmountProbe';

/** Appended to `<body>` by rc-dock's drag manager for the duration of a tab drag */
const DRAGGING_LAYER = 'body > .dragging-layer';

type PapiWindow = {
  papi: {
    webViews: {
      openWebView: (type: string, layout?: unknown) => Promise<string | undefined>;
    };
  };
  updateWebViewDefinitionById: (id: string, update: { title?: string }) => boolean;
};

/** One kept document of a web view, as the probe reports it back */
type KeptRoot = {
  webViewId: string;
  /** Whether the web view's iframe has since loaded a different document */
  replaced: boolean;
  /** Elements still rendered into the kept document's React root container */
  childCount: number;
};

function iframeSelector(webViewId: string): string {
  return `iframe[data-web-view-id="${webViewId}"]`;
}

/** The web view ids of each dock panel's tabs, in tab order, keyed by panel id */
async function readBars(page: Page): Promise<{ panelId: string; tabIds: string[] }[]> {
  return page.locator('.dock-panel[data-dockid]').evaluateAll((panels) =>
    panels.map((panel) => ({
      panelId: panel.getAttribute('data-dockid') ?? '',
      tabIds: Array.from(
        panel.querySelectorAll('.dock-nav-list .platform-tab-title[data-web-view-id]'),
      ).map((title) => title.getAttribute('data-web-view-id') ?? ''),
    })),
  );
}

async function openNewTab(page: Page): Promise<string> {
  const webViewId = await page.evaluate(async (type) => {
    // The renderer sets `globalThis.papi`; it is untyped in the Playwright context.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const { papi } = window as unknown as PapiWindow;
    return papi.webViews.openWebView(type, { type: 'tab' });
  }, REACT_WEB_VIEW_TYPE);
  if (!webViewId) throw new Error('openWebView answered no id');
  await expect
    .poll(
      () =>
        page.evaluate((selector) => {
          const iframe = document.querySelector<HTMLIFrameElement>(selector);
          return iframe?.contentDocument?.getElementById('root')?.childElementCount ?? -1;
        }, iframeSelector(webViewId)),
      { message: `web view ${webViewId} rendered its React root`, timeout: 60_000 },
    )
    .toBeGreaterThan(0);
  return webViewId;
}

/** Keeps each web view's current document and root container on the renderer's window */
async function keepCurrentRoots(page: Page, webViewIds: string[]): Promise<void> {
  await page.evaluate(
    ({ ids, probeKey }) => {
      // The probe is the spec's own scratch space on the renderer's window, untyped there.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const probeWindow = window as unknown as Record<
        string,
        { webViewId: string; doc: Document; root: Element }[]
      >;
      probeWindow[probeKey] = ids.map((webViewId) => {
        const iframe = document.querySelector<HTMLIFrameElement>(
          `iframe[data-web-view-id="${webViewId}"]`,
        );
        const doc = iframe?.contentDocument;
        const root = doc?.getElementById('root');
        if (!doc || !root) throw new Error(`no React root in web view ${webViewId}`);
        return { webViewId, doc, root };
      });
    },
    { ids: webViewIds, probeKey: PROBE_KEY },
  );
}

async function readKeptRoots(page: Page): Promise<KeptRoot[]> {
  return page.evaluate((probeKey) => {
    // The probe the spec keeps on the renderer's window is untyped there.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const probeWindow = window as unknown as Record<
      string,
      { webViewId: string; doc: Document; root: Element }[]
    >;
    return probeWindow[probeKey].map(({ webViewId, doc, root }) => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        `iframe[data-web-view-id="${webViewId}"]`,
      );
      return {
        webViewId,
        replaced: iframe?.contentDocument !== doc,
        childCount: root.childElementCount,
      };
    });
  }, PROBE_KEY);
}

/** Element counts rendered into each web view's CURRENT document's root, -1 while it has none */
async function liveRootChildCounts(page: Page, webViewIds: string[]): Promise<number[]> {
  return page.evaluate(
    (ids) =>
      ids.map(
        (webViewId) =>
          document
            .querySelector<HTMLIFrameElement>(`iframe[data-web-view-id="${webViewId}"]`)
            ?.contentDocument?.getElementById('root')?.childElementCount ?? -1,
      ),
    webViewIds,
  );
}

/**
 * Drags a tab onto its own bar's empty space after the tabs, which makes it the panel's last tab.
 * rc-dock listens to pointer events and starts a drag only after a few pixels of movement, and the
 * "+" button moves once a drag starts, so the target is measured only after that.
 */
async function dragTabToEndOfItsBar(page: Page, webViewId: string, panelId: string) {
  const panel = `.dock-panel[data-dockid="${panelId}"]`;
  const tabButton = page.locator('.dock-tab-btn', {
    has: page.locator(`.platform-tab-title[data-web-view-id="${webViewId}"]`),
  });
  const box = await tabButton.boundingBox();
  if (!box) throw new Error(`tab ${webViewId} has no box`);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  try {
    await page.mouse.move(box.x + box.width / 2 + 6, box.y + box.height / 2, { steps: 3 });
    await expect(page.locator(DRAGGING_LAYER)).toBeAttached({ timeout: 5_000 });
    const target = await page.evaluate((panelSelector) => {
      const rect = (selector: string) => {
        const element = document.querySelector(`${panelSelector} ${selector}`);
        if (!element) throw new Error(`no ${selector} in ${panelSelector}`);
        return element.getBoundingClientRect();
      };
      const zone = rect('.platform-tab-bar-drop-zone');
      const plus = rect('.new-tab-button');
      const bar = rect('.dock-bar');
      return { x: zone.left + 0.75 * (plus.left - zone.left), y: (bar.top + bar.bottom) / 2 };
    }, panel);
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

    const moved = await openNewTab(page);
    const stayed = await openNewTab(page);
    const webViewIds = [moved, stayed];

    const panelId = (await readBars(page)).find((bar) => bar.tabIds.includes(moved))?.panelId;
    if (!panelId) throw new Error(`web view ${moved} is in no panel`);
    const tabsBefore = (await readBars(page)).find((bar) => bar.panelId === panelId)?.tabIds ?? [];
    expect(tabsBefore, 'both web views share one panel').toContain(stayed);
    expect(tabsBefore.at(-1), 'the tab to move is not already last').not.toBe(moved);

    await keepCurrentRoots(page, webViewIds);
    const linesBeforeMove = consoleLines.length;

    await dragTabToEndOfItsBar(page, moved, panelId);
    await expect
      .poll(
        async () => (await readBars(page)).find((bar) => bar.panelId === panelId)?.tabIds.at(-1),
        { message: 'the dragged tab is now its panel last', timeout: 10_000 },
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
    const keptAfter = await readKeptRoots(page);
    // Control: a document the move did not replace is still rendered, and so is every live one, so
    // the zeros above are the replaced roots' unmount and not every web view root reading empty
    expect(
      keptAfter.filter((kept) => !kept.replaced).every((kept) => kept.childCount > 0),
      'documents the move did not replace are still rendered',
    ).toBe(true);
    expect(Math.min(...(await liveRootChildCounts(page, webViewIds)))).toBeGreaterThan(0);

    const moveLines = consoleLines.slice(linesBeforeMove);
    expect
      .soft(
        moveLines.filter(
          (line) =>
            webViewIds.some((id) => line.includes(id)) && line.includes('crashed while rendering'),
        ),
        'no crash reported while moving',
      )
      .toEqual([]);
    expect
      .soft(
        moveLines.filter((line) => line.includes('Attempted to synchronously unmount a root')),
        'no unmount-during-render warning while moving',
      )
      .toEqual([]);
  });
});
