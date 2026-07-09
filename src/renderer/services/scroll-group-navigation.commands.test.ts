import { describe, expect, test, vi, beforeEach } from 'vitest';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { navigationCommandHandlers } from '@renderer/services/scroll-group-navigation.commands';

// vi.mock and vi.hoisted calls are hoisted by vitest above the imports above at transform time, so
// the static imports can be written first here to satisfy import/first.
const mocks = vi.hoisted(() => ({
  getLastSelectedScriptureNavigableWebViewId: vi.fn(),
  getNavigationTargetWebView: vi.fn(),
  updateWebViewDefinitionSync: vi.fn(() => true),
  getScrRefSync: vi.fn(),
  getScrRefForProject: vi.fn(),
  // Typed to accept args so tests can read written refs back out of `mock.calls`
  setScrRefSync: vi.fn<(...args: unknown[]) => boolean>(() => true),
  getBookChapterControlHandle: vi.fn(),
  pdpGet: vi.fn(),
  windowServiceGetFocus: vi.fn(),
}));

vi.mock('@renderer/services/window.service-host', () => ({
  getLastSelectedScriptureNavigableWebViewId: mocks.getLastSelectedScriptureNavigableWebViewId,
  getNavigationTargetWebView: mocks.getNavigationTargetWebView,
}));
vi.mock('@renderer/services/web-view.service-host', () => ({
  updateWebViewDefinitionSync: mocks.updateWebViewDefinitionSync,
}));
vi.mock('@renderer/services/scroll-group.service-host', () => ({
  getScrRefSync: mocks.getScrRefSync,
  getScrRefForProject: mocks.getScrRefForProject,
  setScrRefSync: mocks.setScrRefSync,
}));
vi.mock('@renderer/services/book-chapter-control.registry', () => ({
  TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID: 'top-toolbar',
  getBookChapterControlHandle: mocks.getBookChapterControlHandle,
}));
vi.mock('@shared/services/project-data-provider.service', () => ({
  papiFrontendProjectDataProviderService: { get: mocks.pdpGet },
}));
vi.mock('@shared/services/command.service', () => ({
  registerCommand: vi.fn(async () => () => Promise.resolve(true)),
}));
vi.mock('@shared/services/window.service', () => ({
  windowService: { getFocus: mocks.windowServiceGetFocus },
}));

const GEN_5_3: SerializedVerseRef = { book: 'GEN', chapterNum: 5, verseNum: 3 };
const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

beforeEach(() => {
  vi.clearAllMocks();
  mocks.updateWebViewDefinitionSync.mockReturnValue(true);
  mocks.setScrRefSync.mockReturnValue(true);
  // No resolved navigation target by default — individual describe blocks override.
  mocks.getNavigationTargetWebView.mockReturnValue(undefined);
  mocks.getLastSelectedScriptureNavigableWebViewId.mockReturnValue(undefined);
  mocks.windowServiceGetFocus.mockResolvedValue(undefined);
  // No project → book list falls back to ALL_BOOK_IDS
  mocks.pdpGet.mockRejectedValue(new Error('no project'));
});

describe('go-to commands with a tracked web view target', () => {
  test('no-ops when there is no navigation target', async () => {
    await navigationCommandHandlers['platform.goToNextVerse']();
    expect(mocks.setScrRefSync).not.toHaveBeenCalled();
    expect(mocks.updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });

  test('writes to the target web view scroll group with its project as source', async () => {
    mocks.getNavigationTargetWebView.mockReturnValue({
      id: 'web-view-1',
      definition: { id: 'web-view-1', scrollGroupScrRef: 2, projectId: 'project-1' },
    });
    mocks.getScrRefForProject.mockResolvedValue(GEN_5_3);

    await navigationCommandHandlers['platform.goToNextVerse']();

    expect(mocks.getScrRefForProject).toHaveBeenCalledWith(2, 'project-1');
    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      2,
      { book: 'GEN', chapterNum: 5, verseNum: 4 },
      'project-1',
    );
  });

  test('updates the web view definition when the target tab is detached', async () => {
    mocks.getNavigationTargetWebView.mockReturnValue({
      id: 'web-view-1',
      definition: { id: 'web-view-1', scrollGroupScrRef: GEN_5_3 },
    });

    await navigationCommandHandlers['platform.goToNextVerse']();

    expect(mocks.setScrRefSync).not.toHaveBeenCalled();
    expect(mocks.updateWebViewDefinitionSync).toHaveBeenCalledWith('web-view-1', {
      scrollGroupScrRef: { book: 'GEN', chapterNum: 5, verseNum: 4 },
    });
  });

  test('goToNextBook uses the project books-present list, not the full canon', async () => {
    mocks.getNavigationTargetWebView.mockReturnValue({
      id: 'web-view-1',
      definition: { id: 'web-view-1', scrollGroupScrRef: 0, projectId: 'project-1' },
    });
    mocks.getScrRefForProject.mockResolvedValue({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    // Books present = GEN and LEV (positions 1 and 3); EXO is absent
    const getSetting = vi.fn(async () => '101');
    mocks.pdpGet.mockResolvedValue({ getSetting });

    await navigationCommandHandlers['platform.goToNextBook']();

    expect(mocks.pdpGet).toHaveBeenCalledWith('platform.base', 'project-1');
    expect(getSetting).toHaveBeenCalledWith('platformScripture.booksPresent');
    // LEV, not EXO — proves the constrained book list was actually used
    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      0,
      { book: 'LEV', chapterNum: 1, verseNum: 1 },
      'project-1',
    );
  });

  test('goToPreviousBook no-ops at the first book', async () => {
    mocks.getNavigationTargetWebView.mockReturnValue({
      id: 'web-view-1',
      definition: { id: 'web-view-1', scrollGroupScrRef: 0 },
    });
    mocks.getScrRefSync.mockReturnValue({ book: 'GEN', chapterNum: 5, verseNum: 3 });

    await navigationCommandHandlers['platform.goToPreviousBook']();
    expect(mocks.setScrRefSync).not.toHaveBeenCalled();
  });
});

describe('go-to commands with a main-editor target', () => {
  // The resolution chain that picks the main project editor when no web view is tracked lives in
  // window.service-host (`getNavigationTargetWebView`) — resolution-order coverage lives in
  // window.service-host.test.ts. These tests cover the command behavior once an editor IS the
  // resolved target.

  test("uses the editor's own scroll group and project", async () => {
    mocks.getNavigationTargetWebView.mockReturnValue({
      id: 'editor-1',
      definition: {
        id: 'editor-1',
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'project-1',
        scrollGroupScrRef: 3,
      },
    });
    mocks.getScrRefForProject.mockResolvedValue(GEN_5_3);

    await navigationCommandHandlers['platform.goToNextVerse']();

    // Resolved the editor's own scroll group (3), not group 0
    expect(mocks.getScrRefForProject).toHaveBeenCalledWith(3, 'project-1');
    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      3,
      { book: 'GEN', chapterNum: 5, verseNum: 4 },
      'project-1',
    );
  });

  test("writes a detached editor ref back to the editor's own web view id", async () => {
    mocks.getNavigationTargetWebView.mockReturnValue({
      id: 'editor-1',
      definition: {
        id: 'editor-1',
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'project-1',
        scrollGroupScrRef: GEN_5_3,
      },
    });

    await navigationCommandHandlers['platform.goToNextVerse']();

    expect(mocks.setScrRefSync).not.toHaveBeenCalled();
    expect(mocks.updateWebViewDefinitionSync).toHaveBeenCalledWith('editor-1', {
      scrollGroupScrRef: { book: 'GEN', chapterNum: 5, verseNum: 4 },
    });
  });
});

describe('versification-aware rollover', () => {
  // Non-English verse counts (English GEN 1 ends at 31): GEN = 3 chapters ending 8/25/24,
  // anything else = 1 chapter ending 10. Proves project versification is used, not a static table.
  const getFinalVerseNumbersInBook = vi.fn(async (bookNum: number) =>
    bookNum === 1 ? [0, 8, 25, 24] : [0, 10],
  );

  beforeEach(() => {
    mocks.getNavigationTargetWebView.mockReturnValue({
      id: 'web-view-1',
      definition: { id: 'web-view-1', scrollGroupScrRef: 0, projectId: 'project-1' },
    });
    getFinalVerseNumbersInBook.mockClear();
    mocks.pdpGet.mockImplementation(async (projectInterface: string) => {
      if (projectInterface === 'platformScripture.Versification')
        return { getFinalVerseNumbersInBook };
      // platform.base for books present: GEN and EXO
      return { getSetting: vi.fn(async () => '11') };
    });
  });

  test('goToNextVerse rolls to the next chapter at the project versification last verse', async () => {
    mocks.getScrRefForProject.mockResolvedValue({ book: 'GEN', chapterNum: 1, verseNum: 8 });

    await navigationCommandHandlers['platform.goToNextVerse']();

    expect(getFinalVerseNumbersInBook).toHaveBeenCalledWith(1);
    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      0,
      { book: 'GEN', chapterNum: 2, verseNum: 1 },
      'project-1',
    );
  });

  test('goToPreviousVerse rolls to the previous chapter last verse', async () => {
    mocks.getScrRefForProject.mockResolvedValue({ book: 'GEN', chapterNum: 2, verseNum: 1 });

    await navigationCommandHandlers['platform.goToPreviousVerse']();

    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      0,
      { book: 'GEN', chapterNum: 1, verseNum: 8 },
      'project-1',
    );
  });

  test('goToPreviousVerse goes to verse 0 at chapter 1 verse 1, matching Paratext 9', async () => {
    mocks.getScrRefForProject.mockResolvedValue({ book: 'GEN', chapterNum: 1, verseNum: 1 });

    await navigationCommandHandlers['platform.goToPreviousVerse']();

    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      0,
      { book: 'GEN', chapterNum: 1, verseNum: 0 },
      'project-1',
    );
  });

  test('goToPreviousVerse rolls into the previous book from chapter 1 verse 0', async () => {
    mocks.getScrRefForProject.mockResolvedValue({ book: 'EXO', chapterNum: 1, verseNum: 0 });

    await navigationCommandHandlers['platform.goToPreviousVerse']();

    // The previous available book (GEN) is prefetched because the current chapter is 1
    expect(getFinalVerseNumbersInBook).toHaveBeenCalledWith(1);
    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      0,
      { book: 'GEN', chapterNum: 3, verseNum: 24 },
      'project-1',
    );
  });

  test('falls back to unbounded verse navigation when the versification provider fails', async () => {
    mocks.pdpGet.mockImplementation(async (projectInterface: string) => {
      if (projectInterface === 'platformScripture.Versification')
        throw new Error('no versification');
      return { getSetting: vi.fn(async () => '11') };
    });
    mocks.getScrRefForProject.mockResolvedValue({ book: 'GEN', chapterNum: 1, verseNum: 8 });

    await navigationCommandHandlers['platform.goToNextVerse']();

    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      0,
      { book: 'GEN', chapterNum: 1, verseNum: 9 },
      'project-1',
    );
  });

  test('book navigation does not fetch the versification bounds it never uses', async () => {
    mocks.getScrRefForProject.mockResolvedValue({ book: 'GEN', chapterNum: 1, verseNum: 1 });

    await navigationCommandHandlers['platform.goToNextBook']();

    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      0,
      { book: 'EXO', chapterNum: 1, verseNum: 1 },
      'project-1',
    );
    expect(mocks.pdpGet).not.toHaveBeenCalledWith('platformScripture.Versification', 'project-1');
  });

  test('keeps the current-book bounds when the previous-book prefetch fails', async () => {
    // GEN (bookNum 1) fetch rejects; EXO (bookNum 2) has 2 chapters ending 8/25. The current
    // chapter is 1, so GEN is prefetched and fails — the EXO bounds must survive.
    const getFinalVerseNumbersInBookPartial = vi.fn(async (bookNum: number) => {
      if (bookNum === 1) throw new Error('no verse counts for GEN');
      return [0, 8, 25];
    });
    mocks.pdpGet.mockImplementation(async (projectInterface: string) => {
      if (projectInterface === 'platformScripture.Versification')
        return { getFinalVerseNumbersInBook: getFinalVerseNumbersInBookPartial };
      return { getSetting: vi.fn(async () => '11') };
    });
    mocks.getScrRefForProject.mockResolvedValue({ book: 'EXO', chapterNum: 1, verseNum: 8 });

    await navigationCommandHandlers['platform.goToNextVerse']();

    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      0,
      { book: 'EXO', chapterNum: 2, verseNum: 1 },
      'project-1',
    );
  });
});

describe('books-present handling', () => {
  test('goToNextBook does not substitute the full canon when booksPresent marks no books', async () => {
    mocks.getNavigationTargetWebView.mockReturnValue({
      id: 'web-view-1',
      definition: { id: 'web-view-1', scrollGroupScrRef: 0, projectId: 'project-1' },
    });
    mocks.getScrRefForProject.mockResolvedValue({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    // All-zeros = the project genuinely has no books (the C# provider returns a fixed-width flag
    // string). The book picker shows an empty list for this value, so the command must agree and
    // no-op rather than navigating the full canon.
    const getSetting = vi.fn(async () => '000');
    mocks.pdpGet.mockImplementation(async () => ({ getSetting }));

    await navigationCommandHandlers['platform.goToNextBook']();

    expect(getSetting).toHaveBeenCalledWith('platformScripture.booksPresent');
    expect(mocks.setScrRefSync).not.toHaveBeenCalled();
    expect(mocks.updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });
});

describe('command serialization', () => {
  test('overlapping invocations run one after another so each press advances exactly one step', async () => {
    mocks.getNavigationTargetWebView.mockReturnValue({
      id: 'web-view-1',
      definition: { id: 'web-view-1', scrollGroupScrRef: 2, projectId: 'project-1' },
    });
    // Stateful current ref: each read returns the last written ref, so the assertions can tell
    // whether the second run read the first run's result (serialized) or the original ref (raced)
    mocks.getScrRefForProject.mockImplementation(async () => {
      const lastWrite = mocks.setScrRefSync.mock.calls.at(-1);
      return lastWrite ? lastWrite[1] : GEN_5_3;
    });

    await Promise.all([
      navigationCommandHandlers['platform.goToNextVerse'](),
      navigationCommandHandlers['platform.goToNextVerse'](),
    ]);

    expect(mocks.setScrRefSync).toHaveBeenNthCalledWith(
      1,
      2,
      { book: 'GEN', chapterNum: 5, verseNum: 4 },
      'project-1',
    );
    expect(mocks.setScrRefSync).toHaveBeenNthCalledWith(
      2,
      2,
      { book: 'GEN', chapterNum: 5, verseNum: 5 },
      'project-1',
    );
  });
});

describe('platform.openBookChapterControl', () => {
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

    await navigationCommandHandlers['platform.openBookChapterControl']();

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

    await navigationCommandHandlers['platform.openBookChapterControl']();

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

    await navigationCommandHandlers['platform.openBookChapterControl']();

    expect(trackedHandle.open).toHaveBeenCalled();
  });

  test("falls back to the top toolbar's handle when neither the focused nor tracked web view has one", async () => {
    mocks.windowServiceGetFocus.mockResolvedValue(undefined);
    mocks.getLastSelectedScriptureNavigableWebViewId.mockReturnValue(undefined);

    const toolbarHandle = { open: vi.fn() };
    mocks.getBookChapterControlHandle.mockImplementation((ownerId: string) =>
      ownerId === 'top-toolbar' ? toolbarHandle : undefined,
    );

    await navigationCommandHandlers['platform.openBookChapterControl']();

    expect(toolbarHandle.open).toHaveBeenCalled();
  });

  test('no-ops without throwing when no handle is registered anywhere', async () => {
    mocks.windowServiceGetFocus.mockResolvedValue(undefined);
    mocks.getLastSelectedScriptureNavigableWebViewId.mockReturnValue(undefined);
    mocks.getBookChapterControlHandle.mockReturnValue(undefined);

    await expect(
      navigationCommandHandlers['platform.openBookChapterControl'](),
    ).resolves.toBeUndefined();
  });
});
