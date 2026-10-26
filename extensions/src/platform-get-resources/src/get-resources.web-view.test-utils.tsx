import type { WebViewProps } from '@papi/core';
import { render } from '@testing-library/react';
import { useState, type ComponentType } from 'react';
// Defines `globalThis.webViewComponent` as a side effect. Vitest hoists each test file's `vi.mock`
// calls above all of its imports, this one included, so the web view still loads with the mocks.
import './get-resources.web-view';

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
 * The calling test file must still declare its own `vi.mock` calls for `@papi/frontend` and
 * `@papi/frontend/react`: Vitest only hoists them within the file that declares them.
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
    // Returns the same `[value, set, reset]` shape as the real hook, which the cast hides.
    useWebViewState: (key: string, defaultValue: unknown) => {
      const [value, setValue] = useState(savedState[key] ?? defaultValue);
      return [value, setValue, () => setValue(defaultValue)];
    },
  } as unknown as WebViewProps;
  return render(<GetResourcesWebView {...props} />);
}
