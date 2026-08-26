// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useOpenProjectTabs } from './use-open-project-tabs';

interface WebViewLike {
  id: string;
  webViewType?: string;
  projectId?: string;
  scrollGroupScrRef?: unknown;
  state?: Record<string, unknown>;
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

  it('skips webView with non-numeric, non-undefined scrollGroupScrRef', () => {
    const { result } = renderHook(() => useOpenProjectTabs());
    const handler = mockOnDidOpenWebView.mock.calls[0][0];
    act(() =>
      handler({
        webView: { id: 'wv-1', projectId: 'p-1', scrollGroupScrRef: 'not-a-number' },
      }),
    );
    expect(result.current).toEqual([]);
    act(() =>
      handler({
        // Test asserts that the hook rejects null defensively (PAPI quirk: legacy WebViews can carry null scrollGroupScrRef).
        // eslint-disable-next-line no-null/no-null
        webView: { id: 'wv-2', projectId: 'p-2', scrollGroupScrRef: null },
      }),
    );
    expect(result.current).toEqual([]);
  });

  it('treats undefined scrollGroupScrRef as scroll group 0 (default)', () => {
    const { result } = renderHook(() => useOpenProjectTabs());
    const handler = mockOnDidOpenWebView.mock.calls[0][0];
    act(() =>
      handler({
        webView: {
          id: 'wv-1',
          webViewType: 'platformScriptureEditor.react',
          projectId: 'p-1',
          // scrollGroupScrRef intentionally omitted — fresh editors don't seed it
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

  it('lowercases projectId so WebView (uppercase) matches PDP (lowercase)', () => {
    const { result } = renderHook(() => useOpenProjectTabs());
    const handler = mockOnDidOpenWebView.mock.calls[0][0];
    act(() =>
      handler({
        webView: {
          id: 'wv-1',
          webViewType: 'platformScriptureEditor.react',
          projectId: 'AbCdEf',
          scrollGroupScrRef: 0,
        },
      }),
    );
    expect(result.current).toEqual([
      {
        webViewId: 'wv-1',
        projectId: 'abcdef',
        scrollGroupId: 0,
        webViewType: 'platformScriptureEditor.react',
      },
    ]);
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

  it('filter excludes manage-books and side-panel tabs from a mixed initial seed', async () => {
    // Reproduces the manage-books bug: without the filter, every project-bound tab
    // (Manage Books itself, Checks side panel, scripture editors) would land in the list.
    // With a Scripture-Editor-only filter, only the editor entries should remain.
    mockGetAllOpenWebViewDefinitions.mockResolvedValueOnce([
      {
        id: 'wv-mb',
        webViewType: 'platformScripture.manageBooks',
        projectId: 'p-mb-target',
        scrollGroupScrRef: 0,
      },
      {
        id: 'wv-checks',
        webViewType: 'someChecks.sidePanel',
        projectId: 'p-checks-target',
        scrollGroupScrRef: 0,
      },
      {
        id: 'wv-editor',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'p-editor',
        scrollGroupScrRef: 0,
      },
    ]);
    const { result } = renderHook(() =>
      useOpenProjectTabs((wv) => wv.webViewType === 'platformScriptureEditor.react'),
    );
    await waitFor(() => expect(result.current).toHaveLength(1));
    expect(result.current[0]).toEqual({
      webViewId: 'wv-editor',
      projectId: 'p-editor',
      scrollGroupId: 0,
      webViewType: 'platformScriptureEditor.react',
    });
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
  describe('includeFocusedResourceTabs', () => {
    const BIBLE_TEXTS = 'platformScriptureEditor.bibleTexts';

    it('ignores a focused resource unless the option is passed', () => {
      const { result } = renderHook(() => useOpenProjectTabs());
      const handler = mockOnDidOpenWebView.mock.calls[0][0];
      act(() =>
        handler({
          webView: {
            id: 'wv-bible',
            webViewType: BIBLE_TEXTS,
            // Simple mode's default layout opens this panel with no container project.
            scrollGroupScrRef: 0,
            state: { focusedResourceProjectId: 'RES-1' },
          },
        }),
      );
      expect(result.current).toEqual([]);
    });

    it('surfaces a panel whose only project is its focused resource', () => {
      const { result } = renderHook(() =>
        useOpenProjectTabs(undefined, { includeFocusedResourceTabs: true }),
      );
      const handler = mockOnDidOpenWebView.mock.calls[0][0];
      act(() =>
        handler({
          webView: {
            id: 'wv-bible',
            webViewType: BIBLE_TEXTS,
            scrollGroupScrRef: 0,
            state: { focusedResourceProjectId: 'RES-1' },
          },
        }),
      );
      expect(result.current).toHaveLength(1);
      expect(result.current[0].projectId).toBe('res-1');
    });

    it('prefers the focused resource over the container project', () => {
      const { result } = renderHook(() =>
        useOpenProjectTabs(undefined, { includeFocusedResourceTabs: true }),
      );
      const handler = mockOnDidOpenWebView.mock.calls[0][0];
      act(() =>
        handler({
          webView: {
            id: 'wv-bible',
            webViewType: BIBLE_TEXTS,
            // The container project is the editable project whose reference list is shown; the
            // resource on screen is what Find must search.
            projectId: 'CONTAINER-1',
            scrollGroupScrRef: 0,
            state: { focusedResourceProjectId: 'RES-1' },
          },
        }),
      );
      expect(result.current).toHaveLength(1);
      expect(result.current[0].projectId).toBe('res-1');
    });

    it('drops the tab when its focused resource clears', () => {
      const { result } = renderHook(() =>
        useOpenProjectTabs(undefined, { includeFocusedResourceTabs: true }),
      );
      const openHandler = mockOnDidOpenWebView.mock.calls[0][0];
      act(() =>
        openHandler({
          webView: {
            id: 'wv-bible',
            webViewType: BIBLE_TEXTS,
            scrollGroupScrRef: 0,
            state: { focusedResourceProjectId: 'RES-1' },
          },
        }),
      );
      expect(result.current).toHaveLength(1);
      const updateHandler = mockOnDidUpdateWebView.mock.calls[0][0];
      act(() =>
        updateHandler({
          webView: {
            id: 'wv-bible',
            webViewType: BIBLE_TEXTS,
            scrollGroupScrRef: 0,
            state: {},
          },
        }),
      );
      expect(result.current).toEqual([]);
    });

    it('surfaces a panel whose scrollGroupScrRef is null', () => {
      // Simple mode's Bible texts and Commentaries panels carry `scrollGroupScrRef: null` — they
      // navigate independently and their provider deliberately does not force a group. The
      // defensive null rejection would otherwise drop them entirely, so the focused resource would
      // never reach Find no matter what the panel published.
      const { result } = renderHook(() =>
        useOpenProjectTabs(undefined, { includeFocusedResourceTabs: true }),
      );
      const handler = mockOnDidOpenWebView.mock.calls[0][0];
      act(() =>
        handler({
          webView: {
            id: 'wv-bible',
            webViewType: BIBLE_TEXTS,
            // `null` is exactly what these panels carry on the wire, so the test must send the
            // real value rather than `undefined` (which takes a different branch entirely).
            // eslint-disable-next-line no-null/no-null
            scrollGroupScrRef: null,
            state: { focusedResourceProjectId: 'RES-1' },
          },
        }),
      );
      expect(result.current).toHaveLength(1);
      expect(result.current[0].projectId).toBe('res-1');
      expect(result.current[0].scrollGroupId).toBe(0);
    });

    it('still rejects a null scrollGroupScrRef when there is no focused resource', () => {
      // The defensive rejection stays in place for every other tab; only a tab surfaced by its
      // focused resource gets the default-group fallback.
      const { result } = renderHook(() =>
        useOpenProjectTabs(undefined, { includeFocusedResourceTabs: true }),
      );
      const handler = mockOnDidOpenWebView.mock.calls[0][0];
      act(() =>
        handler({
          webView: {
            id: 'wv-bible',
            webViewType: BIBLE_TEXTS,
            projectId: 'CONTAINER-1',
            // `null` is exactly what these panels carry on the wire, so the test must send the
            // real value rather than `undefined` (which takes a different branch entirely).
            // eslint-disable-next-line no-null/no-null
            scrollGroupScrRef: null,
          },
        }),
      );
      expect(result.current).toEqual([]);
    });

    it('still requires a real project id on an editor tab', () => {
      const { result } = renderHook(() =>
        useOpenProjectTabs(undefined, { includeFocusedResourceTabs: true }),
      );
      const handler = mockOnDidOpenWebView.mock.calls[0][0];
      act(() =>
        handler({
          webView: {
            id: 'wv-editor',
            webViewType: 'platformScriptureEditor.react',
            scrollGroupScrRef: 0,
          },
        }),
      );
      expect(result.current).toEqual([]);
    });
  });
});
