import type { WebViewProps } from '@papi/core';
import { render } from '@testing-library/react';
import { useState, type ComponentType } from 'react';

/**
 * A `sendCommand` implementation that answers `getCachedResources` from `serveCatalog` and holds
 * the flag refresh the web view runs once per mount in flight. That refresh refetches the list when
 * it settles, which re-renders the table under a click and retries a failed fetch before the test
 * can, so hold it unless the test is about it.
 */
export function serveCatalogHoldingFlagRefresh(serveCatalog: () => Promise<unknown>) {
  return async (command: string) => {
    if (command === 'platformGetResources.getCachedResources') return serveCatalog();
    if (command === 'platformGetResources.refreshResourceFlags') return new Promise(() => {});
    return undefined;
  };
}

/**
 * Renders the Get Resources web view, with web view state backed by real React state so a write to
 * it shows up in what renders.
 *
 * The calling test file must import `./get-resources.web-view` after its `vi.mock` calls: that
 * import is what defines the component read here.
 *
 * @param savedState Values already in the web view's state, by key, as a dialog restored with its
 *   layout would have them. A key not given starts at the web view's own default.
 */
export function renderGetResourcesWebView(savedState: Record<string, unknown> = {}) {
  // globalThis is a special interface; cast to read the property the web view file added at runtime.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const GetResourcesWebView = (globalThis as Record<string, unknown>)
    .webViewComponent as ComponentType<WebViewProps>;
  // Only the props this web view reads; the double cast avoids restating every optional field.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const props = {
    useWebViewState: (key: string, defaultValue: unknown) =>
      useState(savedState[key] ?? defaultValue),
  } as unknown as WebViewProps;
  return render(<GetResourcesWebView {...props} />);
}
