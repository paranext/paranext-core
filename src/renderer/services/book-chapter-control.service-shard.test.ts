import { beforeEach, describe, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  networkObjectSet: vi.fn(),
  getBookChapterControlHandle: vi.fn(),
  getLastSelectedScriptureNavigableWebViewId: vi.fn(),
  windowServiceGetFocus: vi.fn(),
}));

vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: mocks.networkObjectSet, get: vi.fn() },
  onDidCreateNetworkObject: vi.fn(() => vi.fn()),
  onDidDisposeNetworkObject: vi.fn(() => vi.fn()),
}));
vi.mock('@renderer/services/book-chapter-control.registry', () => ({
  TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID: 'top-toolbar',
  getBookChapterControlHandle: mocks.getBookChapterControlHandle,
}));
vi.mock('@renderer/services/window.service-shard', () => ({
  getLastSelectedScriptureNavigableWebViewId: mocks.getLastSelectedScriptureNavigableWebViewId,
}));
vi.mock('@shared/services/window.service', () => ({
  windowService: { getFocus: mocks.windowServiceGetFocus },
}));

/** Run the shard's `open`, which is what the main process's router calls */
async function open() {
  const { testingBookChapterControlServiceShard } = await import(
    '@renderer/services/book-chapter-control.service-shard'
  );
  return testingBookChapterControlServiceShard.openBookChapterControl();
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.networkObjectSet.mockResolvedValue({ dispose: vi.fn() });
  mocks.windowServiceGetFocus.mockResolvedValue(undefined);
  mocks.getLastSelectedScriptureNavigableWebViewId.mockReturnValue(undefined);
  mocks.getBookChapterControlHandle.mockReturnValue(undefined);
  // A renderer receives its window id as a string query parameter
  globalThis.windowId = 1;
});

describe('BookChapterControl service shard registration', () => {
  test('registers under this window’s scoped name so several windows can coexist', async () => {
    const { startBookChapterControlServiceShard } = await import(
      '@renderer/services/book-chapter-control.service-shard'
    );

    await startBookChapterControlServiceShard();

    expect(mocks.networkObjectSet.mock.calls[0][0]).toBe('BookChapterControlService-1');
  });
});

describe('which BookChapterControl the window opens', () => {
  test("prefers the currently focused web view's handle over the tracked web view", async () => {
    mocks.windowServiceGetFocus.mockResolvedValue({ focusType: 'webView', id: 'focused-1' });
    mocks.getLastSelectedScriptureNavigableWebViewId.mockReturnValue('tracked-1');

    const focusedHandle = { open: vi.fn() };
    const trackedHandle = { open: vi.fn() };
    mocks.getBookChapterControlHandle.mockImplementation((ownerId: string) => {
      if (ownerId === 'focused-1') return focusedHandle;
      if (ownerId === 'tracked-1') return trackedHandle;
      return undefined;
    });

    await open();

    expect(focusedHandle.open).toHaveBeenCalled();
    expect(trackedHandle.open).not.toHaveBeenCalled();
  });

  test('treats a focused web view tab (tabType webView) the same as focus on the web view itself', async () => {
    mocks.windowServiceGetFocus.mockResolvedValue({
      focusType: 'tab',
      tabType: 'webView',
      id: 'focused-tab-1',
    });

    const focusedHandle = { open: vi.fn() };
    mocks.getBookChapterControlHandle.mockImplementation((ownerId: string) =>
      ownerId === 'focused-tab-1' ? focusedHandle : undefined,
    );

    await open();

    expect(focusedHandle.open).toHaveBeenCalled();
  });

  test("falls back to the tracked web view's handle when the focused subject has none registered", async () => {
    // Focus is on a non-web-view tab (e.g. a settings tab) — no control there
    mocks.windowServiceGetFocus.mockResolvedValue({
      focusType: 'tab',
      tabType: 'settings-tab',
      id: 'settings-1',
    });
    mocks.getLastSelectedScriptureNavigableWebViewId.mockReturnValue('tracked-1');

    const trackedHandle = { open: vi.fn() };
    mocks.getBookChapterControlHandle.mockImplementation((ownerId: string) =>
      ownerId === 'tracked-1' ? trackedHandle : undefined,
    );

    await open();

    expect(trackedHandle.open).toHaveBeenCalled();
  });

  test("falls back to the top toolbar's handle when neither the focused nor tracked web view has one", async () => {
    const toolbarHandle = { open: vi.fn() };
    mocks.getBookChapterControlHandle.mockImplementation((ownerId: string) =>
      ownerId === 'top-toolbar' ? toolbarHandle : undefined,
    );

    await open();

    expect(toolbarHandle.open).toHaveBeenCalled();
  });

  test('no-ops without throwing when no handle is registered anywhere', async () => {
    await expect(open()).resolves.toBeUndefined();
  });

  test('reads focus from this window rather than failing when focus cannot be read', async () => {
    // `windowService.getFocus()` resolves against this window's own scoped provider; a window whose
    // focus cannot be read still falls through the rest of the chain
    mocks.windowServiceGetFocus.mockRejectedValue(new Error('window is busy'));
    const toolbarHandle = { open: vi.fn() };
    mocks.getBookChapterControlHandle.mockImplementation((ownerId: string) =>
      ownerId === 'top-toolbar' ? toolbarHandle : undefined,
    );

    await open();

    expect(toolbarHandle.open).toHaveBeenCalled();
  });
});
