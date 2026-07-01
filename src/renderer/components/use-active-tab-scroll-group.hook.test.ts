import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Controllable focus subject the mocked useData(...).Focus() returns.
let currentFocus: unknown;
// Captures the onDidUpdateWebView handler the hook registers via useEvent.
let lastWebViewUpdateHandler: ((event: unknown) => void) | undefined;

const getSavedWebViewDefinitionSync = vi.fn();

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useData: () => ({ Focus: () => [currentFocus, vi.fn()] }),
}));

vi.mock('@renderer/services/web-view.service-host', () => ({
  getSavedWebViewDefinitionSync: (...args: unknown[]) => getSavedWebViewDefinitionSync(...args),
  onDidUpdateWebView: vi.fn(),
}));

vi.mock('@shared/services/window.service', () => ({
  windowService: { dataProviderName: 'platform.windowServiceDataProvider' },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('platform-bible-react', () => ({
  useEvent: (_event: unknown, handler: (event: unknown) => void) => {
    lastWebViewUpdateHandler = handler;
  },
}));

async function importHook() {
  return (await import('./use-active-tab-scroll-group.hook')).useActiveTabScrollGroup;
}

describe('useActiveTabScrollGroup', () => {
  beforeEach(() => {
    currentFocus = undefined;
    lastWebViewUpdateHandler = undefined;
    getSavedWebViewDefinitionSync.mockReset();
  });

  it('returns the group and project of the focused webView', async () => {
    currentFocus = { focusType: 'webView', id: 'wv1' };
    getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'wv1',
      webViewType: 'scriptureEditor',
      scrollGroupScrRef: 2,
      projectId: 'projA',
    });
    const useActiveTabScrollGroup = await importHook();

    const { result } = renderHook(() => useActiveTabScrollGroup());

    await waitFor(() =>
      expect(result.current).toEqual({ webViewId: 'wv1', scrollGroupId: 2, projectId: 'projA' }),
    );
  });

  it('treats a focused webView-type tab the same as the webView iframe', async () => {
    currentFocus = { focusType: 'tab', tabType: 'webView', id: 'wv1' };
    getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'wv1',
      webViewType: 'scriptureEditor',
      scrollGroupScrRef: 3,
      projectId: 'projA',
    });
    const useActiveTabScrollGroup = await importHook();

    const { result } = renderHook(() => useActiveTabScrollGroup());

    await waitFor(() => expect(result.current.scrollGroupId).toBe(3));
  });

  it('reports no scrollGroupId when the active tab is on an independent ref', async () => {
    currentFocus = { focusType: 'webView', id: 'wv1' };
    getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'wv1',
      webViewType: 'scriptureEditor',
      scrollGroupScrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      projectId: 'projA',
    });
    const useActiveTabScrollGroup = await importHook();

    const { result } = renderHook(() => useActiveTabScrollGroup());

    await waitFor(() => expect(result.current.webViewId).toBe('wv1'));
    expect(result.current.scrollGroupId).toBeUndefined();
    expect(result.current.projectId).toBe('projA');
  });

  it('keeps the last active tab when focus moves to "other"', async () => {
    currentFocus = { focusType: 'webView', id: 'wv1' };
    getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'wv1',
      webViewType: 'scriptureEditor',
      scrollGroupScrRef: 2,
      projectId: 'projA',
    });
    const useActiveTabScrollGroup = await importHook();

    const { result, rerender } = renderHook(() => useActiveTabScrollGroup());
    await waitFor(() => expect(result.current.scrollGroupId).toBe(2));

    // Focus leaves all tabs (e.g. user clicked the toolbar) -> keep last.
    currentFocus = { focusType: 'other' };
    rerender();

    expect(result.current).toEqual({ webViewId: 'wv1', scrollGroupId: 2, projectId: 'projA' });
  });

  it('ignores focus on a non-webview tab (keeps last)', async () => {
    currentFocus = { focusType: 'webView', id: 'wv1' };
    getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'wv1',
      webViewType: 'scriptureEditor',
      scrollGroupScrRef: 2,
      projectId: 'projA',
    });
    const useActiveTabScrollGroup = await importHook();

    const { result, rerender } = renderHook(() => useActiveTabScrollGroup());
    await waitFor(() => expect(result.current.webViewId).toBe('wv1'));

    currentFocus = { focusType: 'tab', tabType: 'someOtherType', id: 'other-tab' };
    rerender();

    expect(result.current.webViewId).toBe('wv1');
  });

  it('refreshes when the tracked webview definition updates', async () => {
    currentFocus = { focusType: 'webView', id: 'wv1' };
    getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'wv1',
      webViewType: 'scriptureEditor',
      scrollGroupScrRef: 2,
      projectId: 'projA',
    });
    const useActiveTabScrollGroup = await importHook();

    const { result } = renderHook(() => useActiveTabScrollGroup());
    await waitFor(() => expect(result.current.scrollGroupId).toBe(2));

    // The tracked tab is moved to group 4; the update event fires.
    getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'wv1',
      webViewType: 'scriptureEditor',
      scrollGroupScrRef: 4,
      projectId: 'projA',
    });
    act(() =>
      lastWebViewUpdateHandler?.({ webView: { id: 'wv1', webViewType: 'scriptureEditor' } }),
    );

    await waitFor(() => expect(result.current.scrollGroupId).toBe(4));
  });

  it('ignores update events for other webviews', async () => {
    currentFocus = { focusType: 'webView', id: 'wv1' };
    getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'wv1',
      webViewType: 'scriptureEditor',
      scrollGroupScrRef: 2,
      projectId: 'projA',
    });
    const useActiveTabScrollGroup = await importHook();

    const { result } = renderHook(() => useActiveTabScrollGroup());
    await waitFor(() => expect(result.current.scrollGroupId).toBe(2));

    getSavedWebViewDefinitionSync.mockClear();
    act(() =>
      lastWebViewUpdateHandler?.({ webView: { id: 'other', webViewType: 'scriptureEditor' } }),
    );

    // A different webview's update must not trigger a re-read of the tracked tab.
    expect(getSavedWebViewDefinitionSync).not.toHaveBeenCalled();
    expect(result.current.scrollGroupId).toBe(2);
  });

  it('does not throw when the definition read throws (dock layout not registered yet)', async () => {
    currentFocus = { focusType: 'webView', id: 'wv1' };
    getSavedWebViewDefinitionSync.mockImplementation(() => {
      throw new Error('papi dock layout has not been registered');
    });
    const useActiveTabScrollGroup = await importHook();

    const { result } = renderHook(() => useActiveTabScrollGroup());

    // webViewId still tracked; group/project simply unresolved.
    await waitFor(() => expect(result.current.webViewId).toBe('wv1'));
    expect(result.current.scrollGroupId).toBeUndefined();
  });
});
