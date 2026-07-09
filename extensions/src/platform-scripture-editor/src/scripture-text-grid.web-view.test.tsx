// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import type { WebViewProps } from '@papi/core';

const { mockUseProjectDataProvider, mockLoggerError } = vi.hoisted(() => ({
  mockUseProjectDataProvider: vi.fn(),
  mockLoggerError: vi.fn(),
}));

vi.mock('@papi/frontend', () => ({ logger: { error: mockLoggerError } }));
vi.mock('@papi/frontend/react', () => ({
  useProjectDataProvider: (...a: unknown[]) => mockUseProjectDataProvider(...a),
  useLocalizedStrings: () => [
    {
      '%webView_scriptureTextGrid_title_single%': 'Scripture text',
      '%webView_scriptureTextGrid_title_multiple%': 'Text Collection',
    },
    false,
  ],
}));

// Importing the module registers the component on globalThis (the web-view convention).
await import('./scripture-text-grid.web-view');

function getWebViewComponent() {
  const WebView = globalThis.webViewComponent;
  if (!WebView) throw new Error('scripture-text-grid.web-view did not register webViewComponent');
  return WebView;
}

function makeProps() {
  const useWebViewState = vi.fn().mockReturnValue([[], vi.fn()]);
  const props = {
    projectId: 'p1',
    updateWebViewDefinition: vi.fn(),
    useWebViewState,
  };
  // The component only reads the three props above; building the full WebViewProps surface would
  // mean stubbing every saved-web-view field irrelevant to this behavior.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return props as unknown as WebViewProps;
}

/** A fresh PDP object per call so the init effect's `textConnectionPdp` dependency changes. */
function makePdp(initializeShownByDefaultOverlay: () => Promise<boolean>) {
  return { initializeShownByDefaultOverlay };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ScriptureTextGridWebView first-open overlay init', () => {
  it('retries init on a later effect run after a failure (local guard is released)', async () => {
    const WebView = getWebViewComponent();
    const init = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(true);
    mockUseProjectDataProvider.mockReturnValue(makePdp(init));

    const props = makeProps();
    const { rerender } = render(<WebView {...props} />);
    await waitFor(() => expect(mockLoggerError).toHaveBeenCalledTimes(1));
    expect(init).toHaveBeenCalledTimes(1);

    // New PDP identity re-runs the effect (e.g. the provider reconnects after being offline).
    mockUseProjectDataProvider.mockReturnValue(makePdp(init));
    rerender(<WebView {...props} />);
    await waitFor(() => expect(init).toHaveBeenCalledTimes(2));
  });

  it('does not re-init on a later effect run after a success (guard holds)', async () => {
    const WebView = getWebViewComponent();
    const init = vi.fn().mockResolvedValue(true);
    mockUseProjectDataProvider.mockReturnValue(makePdp(init));

    const props = makeProps();
    const { rerender } = render(<WebView {...props} />);
    await waitFor(() => expect(init).toHaveBeenCalledTimes(1));

    mockUseProjectDataProvider.mockReturnValue(makePdp(init));
    rerender(<WebView {...props} />);
    // Flush the effect re-run, then confirm no second round-trip was made.
    await waitFor(() => expect(mockUseProjectDataProvider.mock.calls.length).toBeGreaterThan(1));
    expect(init).toHaveBeenCalledTimes(1);
    expect(mockLoggerError).not.toHaveBeenCalled();
  });
});
