import { vi } from 'vitest';

/**
 * Mock implementation of @papi/frontend for testing purposes.
 *
 * This module provides mock implementations of the PAPI frontend services that are normally only
 * available in the renderer/web-view runtime. Individual tests typically replace these with
 * `vi.mock('@papi/frontend', ...)` factories tailored to the component under test.
 */

const noopUnsubscribe = vi.fn();

const papi = {
  webViews: {
    onDidOpenWebView: vi.fn(() => noopUnsubscribe),
    onDidUpdateWebView: vi.fn(() => noopUnsubscribe),
    onDidCloseWebView: vi.fn(() => noopUnsubscribe),
  },
};

export default papi;
