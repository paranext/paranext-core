import { describe, expect, test, vi, beforeEach } from 'vitest';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { navigationCommandHandlers } from '@renderer/services/scroll-group-navigation.commands';

// vi.mock and vi.hoisted calls are hoisted by vitest above the imports above at transform time, so
// the static imports can be written first here to satisfy import/first.
const mocks = vi.hoisted(() => ({
  getLastSelectedScriptureNavigableWebViewId: vi.fn(),
  getSavedWebViewDefinitionSync: vi.fn(),
  getAllOpenWebViewDefinitionsSync: vi.fn(),
  updateWebViewDefinitionSync: vi.fn(() => true),
  getScrRefSync: vi.fn(),
  getScrRefForProject: vi.fn(),
  setScrRefSync: vi.fn(() => true),
  getBookChapterControlHandle: vi.fn(),
  pdpGet: vi.fn(),
  windowServiceGetFocus: vi.fn(),
}));

vi.mock('@renderer/services/window.service-host', () => ({
  getLastSelectedScriptureNavigableWebViewId: mocks.getLastSelectedScriptureNavigableWebViewId,
}));
vi.mock('@renderer/services/web-view.service-host', () => ({
  getSavedWebViewDefinitionSync: mocks.getSavedWebViewDefinitionSync,
  getAllOpenWebViewDefinitionsSync: mocks.getAllOpenWebViewDefinitionsSync,
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
  // No tracked web view and no open editor by default — individual describe blocks override.
  mocks.getLastSelectedScriptureNavigableWebViewId.mockReturnValue(undefined);
  mocks.getAllOpenWebViewDefinitionsSync.mockReturnValue([]);
  mocks.windowServiceGetFocus.mockResolvedValue(undefined);
  // No project → book list falls back to ALL_BOOK_IDS
  mocks.pdpGet.mockRejectedValue(new Error('no project'));
});

describe('go-to commands with a tracked web view', () => {
  test('no-ops when no web view is tracked and no editor is open', async () => {
    await navigationCommandHandlers['platform.goToNextVerse']();
    expect(mocks.setScrRefSync).not.toHaveBeenCalled();
    expect(mocks.updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });

  test('writes to the tracked web view scroll group with its project as source', async () => {
    mocks.getLastSelectedScriptureNavigableWebViewId.mockReturnValue('web-view-1');
    mocks.getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'web-view-1',
      scrollGroupScrRef: 2,
      projectId: 'project-1',
    });
    mocks.getScrRefForProject.mockResolvedValue(GEN_5_3);

    await navigationCommandHandlers['platform.goToNextVerse']();

    expect(mocks.getScrRefForProject).toHaveBeenCalledWith(2, 'project-1');
    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      2,
      { book: 'GEN', chapterNum: 5, verseNum: 4 },
      'project-1',
    );
    // The tracked web view resolved a target on its own — the main-editor fallback must not run.
    expect(mocks.getAllOpenWebViewDefinitionsSync).not.toHaveBeenCalled();
  });

  test('updates the web view definition when the tracked tab is detached', async () => {
    mocks.getLastSelectedScriptureNavigableWebViewId.mockReturnValue('web-view-1');
    mocks.getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'web-view-1',
      scrollGroupScrRef: GEN_5_3,
    });

    await navigationCommandHandlers['platform.goToNextVerse']();

    expect(mocks.setScrRefSync).not.toHaveBeenCalled();
    expect(mocks.updateWebViewDefinitionSync).toHaveBeenCalledWith('web-view-1', {
      scrollGroupScrRef: { book: 'GEN', chapterNum: 5, verseNum: 4 },
    });
  });

  test('goToNextBook uses the project books-present list, not the full canon', async () => {
    mocks.getLastSelectedScriptureNavigableWebViewId.mockReturnValue('web-view-1');
    mocks.getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'web-view-1',
      scrollGroupScrRef: 0,
      projectId: 'project-1',
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
    mocks.getLastSelectedScriptureNavigableWebViewId.mockReturnValue('web-view-1');
    mocks.getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'web-view-1',
      scrollGroupScrRef: 0,
    });
    mocks.getScrRefSync.mockReturnValue({ book: 'GEN', chapterNum: 5, verseNum: 3 });

    await navigationCommandHandlers['platform.goToPreviousBook']();
    expect(mocks.setScrRefSync).not.toHaveBeenCalled();
  });
});

describe('go-to commands falling back to the main project editor', () => {
  // No web view tracked in any test in this block — the tracked-web-view step (step 1) must be a
  // no-op so the main-editor fallback (step 2) actually runs.
  beforeEach(() => {
    mocks.getLastSelectedScriptureNavigableWebViewId.mockReturnValue(undefined);
  });

  test('no tracked web view + open main editor → target is the editor group and project', async () => {
    mocks.getAllOpenWebViewDefinitionsSync.mockReturnValue([
      {
        id: 'editor-1',
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'project-1',
        scrollGroupScrRef: 3,
      },
    ]);
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

  test('no tracked web view + no editor open → no-op', async () => {
    mocks.getAllOpenWebViewDefinitionsSync.mockReturnValue([]);

    await navigationCommandHandlers['platform.goToNextVerse']();

    expect(mocks.setScrRefSync).not.toHaveBeenCalled();
    expect(mocks.updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });

  test('picks the first scripture editor with a project, skipping other web view types and project-less editors', async () => {
    mocks.getAllOpenWebViewDefinitionsSync.mockReturnValue([
      { id: 'other-1', webViewType: 'someOtherType', projectId: 'project-x' },
      { id: 'editor-no-project', webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE },
      {
        id: 'editor-1',
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'project-1',
        scrollGroupScrRef: 0,
      },
    ]);
    mocks.getScrRefForProject.mockResolvedValue(GEN_5_3);

    await navigationCommandHandlers['platform.goToNextVerse']();

    expect(mocks.getScrRefForProject).toHaveBeenCalledWith(0, 'project-1');
  });

  test("writes a detached editor ref back to the editor's own web view id", async () => {
    mocks.getAllOpenWebViewDefinitionsSync.mockReturnValue([
      {
        id: 'editor-1',
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'project-1',
        scrollGroupScrRef: GEN_5_3,
      },
    ]);

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
    mocks.getLastSelectedScriptureNavigableWebViewId.mockReturnValue('web-view-1');
    mocks.getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'web-view-1',
      scrollGroupScrRef: 0,
      projectId: 'project-1',
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
