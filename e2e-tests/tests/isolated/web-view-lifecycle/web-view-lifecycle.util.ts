/**
 * Helpers shared by the web-view-lifecycle specs: the React web view they open, the PAPI globals
 * they reach through the renderer's window, the iframe's React root probe, and the console filters
 * for crashes and React's synchronous-unmount-during-render warning.
 */
import { type Page, expect } from '@playwright/test';

/** A small React web view every build ships, whose provider handles a reload of an existing tab */
export const REACT_WEB_VIEW_TYPE = 'platformGetResources.newTab';

/** The renderer globals these specs call; untyped in the Playwright context */
export type PapiWindow = {
  papi: {
    webViews: {
      openWebView: (type: string, layout?: unknown) => Promise<string | undefined>;
      reloadWebView: (type: string, id: string) => Promise<string | undefined>;
    };
  };
  updateWebViewDefinitionById: (id: string, update: { title?: string }) => boolean;
};

export function iframeSelector(webViewId: string): string {
  return `iframe[data-web-view-id="${webViewId}"]`;
}

/**
 * How many elements the iframe's CURRENT document has rendered into its React root container, or -1
 * while that document has no container yet.
 */
export async function currentRootChildCount(page: Page, webViewId: string): Promise<number> {
  return page.evaluate((selector) => {
    const iframe = document.querySelector<HTMLIFrameElement>(selector);
    return iframe?.contentDocument?.getElementById('root')?.childElementCount ?? -1;
  }, iframeSelector(webViewId));
}

/** Opens a {@link REACT_WEB_VIEW_TYPE} tab and waits until its document has rendered its root */
export async function openReactWebViewTab(page: Page): Promise<string> {
  const webViewId = await page.evaluate(async (type) => {
    // The renderer sets `globalThis.papi`; it is untyped in the Playwright context.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const { papi } = window as unknown as PapiWindow;
    return papi.webViews.openWebView(type, { type: 'tab' });
  }, REACT_WEB_VIEW_TYPE);
  if (!webViewId) throw new Error('openWebView returned no id');
  await expect
    .poll(() => currentRootChildCount(page, webViewId), {
      message: `web view ${webViewId} rendered its React root`,
      timeout: 60_000,
    })
    .toBeGreaterThan(0);
  return webViewId;
}

/** Console lines in which `WebViewErrorBoundary` reports one of `webViewIds` crashing */
export function crashLines(lines: string[], webViewIds: string[]): string[] {
  return lines.filter(
    (line) =>
      webViewIds.some((id) => line.includes(id)) && line.includes('crashed while rendering'),
  );
}

/** Console lines carrying React's warning for a root unmounted inside its own render or commit */
export function unmountDuringRenderLines(lines: string[]): string[] {
  return lines.filter((line) => line.includes('Attempted to synchronously unmount a root'));
}
