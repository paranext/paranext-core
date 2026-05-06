// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useOpenProjectTabs } from './use-open-project-tabs';

interface WebViewLike {
  id: string;
  webViewType?: string;
  projectId?: string;
  scrollGroupScrRef?: unknown;
}
type WebViewEventHandler = (event: { webView: WebViewLike }) => void;

const mockOnDidOpenWebView = vi.fn<(handler: WebViewEventHandler) => () => void>();
const mockOnDidUpdateWebView = vi.fn<(handler: WebViewEventHandler) => () => void>();
const mockOnDidCloseWebView = vi.fn<(handler: WebViewEventHandler) => () => void>();
const mockGetAllOpenWebViewDefinitions = vi.fn<() => Promise<WebViewLike[]>>();
const mockUnsubOpen = vi.fn();
const mockUnsubUpdate = vi.fn();
const mockUnsubClose = vi.fn();

vi.mock('@papi/frontend', () => ({
  default: {
    webViews: {
      onDidOpenWebView: (h: WebViewEventHandler) => {
        mockOnDidOpenWebView(h);
        return mockUnsubOpen;
      },
      onDidUpdateWebView: (h: WebViewEventHandler) => {
        mockOnDidUpdateWebView(h);
        return mockUnsubUpdate;
      },
      onDidCloseWebView: (h: WebViewEventHandler) => {
        mockOnDidCloseWebView(h);
        return mockUnsubClose;
      },
      getAllOpenWebViewDefinitions: () => mockGetAllOpenWebViewDefinitions(),
    },
  },
}));

beforeEach(() => {
  mockOnDidOpenWebView.mockClear();
  mockOnDidUpdateWebView.mockClear();
  mockOnDidCloseWebView.mockClear();
  mockGetAllOpenWebViewDefinitions.mockReset();
  mockGetAllOpenWebViewDefinitions.mockResolvedValue([]);
  mockUnsubOpen.mockClear();
  mockUnsubUpdate.mockClear();
  mockUnsubClose.mockClear();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('useOpenProjectTabs', () => {
  it('subscribes on mount and unsubscribes on unmount', () => {
    const { unmount } = renderHook(() => useOpenProjectTabs());
    expect(mockOnDidOpenWebView).toHaveBeenCalledTimes(1);
    expect(mockOnDidUpdateWebView).toHaveBeenCalledTimes(1);
    expect(mockOnDidCloseWebView).toHaveBeenCalledTimes(1);
    unmount();
    expect(mockUnsubOpen).toHaveBeenCalledTimes(1);
    expect(mockUnsubUpdate).toHaveBeenCalledTimes(1);
    expect(mockUnsubClose).toHaveBeenCalledTimes(1);
  });

  it('upserts tab on open event with valid project + scrollGroupScrRef', () => {
    const { result } = renderHook(() => useOpenProjectTabs());
    const handler = mockOnDidOpenWebView.mock.calls[0][0];
    act(() =>
      handler({
        webView: {
          id: 'wv-1',
          webViewType: 'platformScriptureEditor.react',
          projectId: 'p-1',
          scrollGroupScrRef: 0,
        },
      }),
    );
    expect(result.current).toEqual([
      {
        webViewId: 'wv-1',
        projectId: 'p-1',
        scrollGroupId: 0,
        webViewType: 'platformScriptureEditor.react',
      },
    ]);
  });

  it('skips webView without projectId', () => {
    const { result } = renderHook(() => useOpenProjectTabs());
    const handler = mockOnDidOpenWebView.mock.calls[0][0];
    act(() =>
      handler({
        webView: {
          id: 'wv-1',
          webViewType: 'platformScriptureEditor.react',
          scrollGroupScrRef: 0,
        },
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('skips webView with non-numeric scrollGroupScrRef', () => {
    const { result } = renderHook(() => useOpenProjectTabs());
    const handler = mockOnDidOpenWebView.mock.calls[0][0];
    act(() =>
      handler({
        webView: { id: 'wv-1', projectId: 'p-1', scrollGroupScrRef: 'not-a-number' },
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('removes tab on close event', () => {
    const { result } = renderHook(() => useOpenProjectTabs());
    const openH = mockOnDidOpenWebView.mock.calls[0][0];
    const closeH = mockOnDidCloseWebView.mock.calls[0][0];
    act(() =>
      openH({
        webView: { id: 'wv-1', webViewType: 'foo', projectId: 'p-1', scrollGroupScrRef: 0 },
      }),
    );
    expect(result.current).toHaveLength(1);
    act(() => closeH({ webView: { id: 'wv-1' } }));
    expect(result.current).toEqual([]);
  });

  it('filter excludes non-matching webViewType', () => {
    const { result } = renderHook(() =>
      useOpenProjectTabs((wv) => wv.webViewType === 'platformScriptureEditor.react'),
    );
    const handler = mockOnDidOpenWebView.mock.calls[0][0];
    act(() =>
      handler({
        webView: {
          id: 'wv-1',
          webViewType: 'someOther.webViewType',
          projectId: 'p-1',
          scrollGroupScrRef: 0,
        },
      }),
    );
    expect(result.current).toEqual([]);
    act(() =>
      handler({
        webView: {
          id: 'wv-2',
          webViewType: 'platformScriptureEditor.react',
          projectId: 'p-2',
          scrollGroupScrRef: 1,
        },
      }),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].webViewId).toBe('wv-2');
  });

  it('seeds initial state from getAllOpenWebViewDefinitions on mount', async () => {
    mockGetAllOpenWebViewDefinitions.mockResolvedValueOnce([
      {
        id: 'wv-seed-1',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'p-1',
        scrollGroupScrRef: 0,
      },
      {
        id: 'wv-seed-2',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'p-2',
        scrollGroupScrRef: 1,
      },
    ]);
    const { result } = renderHook(() => useOpenProjectTabs());
    await waitFor(() => expect(result.current).toHaveLength(2));
    expect(result.current.map((t) => t.webViewId).sort()).toEqual(['wv-seed-1', 'wv-seed-2']);
  });

  it('does not duplicate when an open event arrives for an already-seeded id', async () => {
    mockGetAllOpenWebViewDefinitions.mockResolvedValueOnce([
      {
        id: 'wv-1',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'p-1',
        scrollGroupScrRef: 0,
      },
      {
        id: 'wv-2',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'p-2',
        scrollGroupScrRef: 1,
      },
    ]);
    const { result } = renderHook(() => useOpenProjectTabs());
    await waitFor(() => expect(result.current).toHaveLength(2));
    const handler = mockOnDidOpenWebView.mock.calls[0][0];
    act(() =>
      handler({
        webView: {
          id: 'wv-1',
          webViewType: 'platformScriptureEditor.react',
          projectId: 'p-1',
          scrollGroupScrRef: 0,
        },
      }),
    );
    expect(result.current).toHaveLength(2);
  });

  it('falls back to live events when getAllOpenWebViewDefinitions rejects', async () => {
    mockGetAllOpenWebViewDefinitions.mockRejectedValueOnce(new Error('papi unavailable'));
    const { result } = renderHook(() => useOpenProjectTabs());
    // Wait one microtask flush so the rejection settles before we drive a live event.
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current).toEqual([]);
    const handler = mockOnDidOpenWebView.mock.calls[0][0];
    act(() =>
      handler({
        webView: {
          id: 'wv-live',
          webViewType: 'platformScriptureEditor.react',
          projectId: 'p-1',
          scrollGroupScrRef: 0,
        },
      }),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].webViewId).toBe('wv-live');
  });
});
