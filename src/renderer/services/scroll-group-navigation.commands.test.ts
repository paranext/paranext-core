import { describe, expect, test, vi, beforeEach } from 'vitest';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  navigationCommandHandlers,
  startScrollGroupNavigationCommands,
} from '@renderer/services/scroll-group-navigation.commands';

// vi.mock and vi.hoisted calls are hoisted by vitest above the imports above at transform time, so
// the static imports can be written first here to satisfy import/first.
const mocks = vi.hoisted(() => ({
  getNavigationTargetWebView: vi.fn(),
  updateWebViewDefinitionSync: vi.fn(() => true),
  getScrRefSync: vi.fn(),
  getScrRefForProject: vi.fn(),
  // Typed to accept args so tests can read written refs back out of `mock.calls`
  setScrRefSync: vi.fn<(...args: unknown[]) => boolean>(() => true),
  navigateReferenceHistoryPhysicalSync: vi.fn<(...args: unknown[]) => boolean>(() => false),
  pdpGet: vi.fn(),
}));

// Capture the handlers `startScrollGroupNavigationCommands` registers so the reference-history
// keyboard commands (registered inline there, not via `navigationCommandHandlers`) can be invoked.
const { registeredCommandHandlers } = vi.hoisted(() => ({
  registeredCommandHandlers: new Map<string, (...args: unknown[]) => Promise<unknown>>(),
}));

vi.mock('@renderer/services/window.service-shard', () => ({
  getNavigationTargetWebView: mocks.getNavigationTargetWebView,
}));
vi.mock('@renderer/services/web-view.service-shard', () => ({
  updateWebViewDefinitionSync: mocks.updateWebViewDefinitionSync,
}));
vi.mock('@renderer/services/scroll-group.service', () => ({
  getScrRefSync: mocks.getScrRefSync,
  getScrRefForProject: mocks.getScrRefForProject,
  setScrRefSync: mocks.setScrRefSync,
  navigateReferenceHistoryPhysicalSync: mocks.navigateReferenceHistoryPhysicalSync,
}));
vi.mock('@shared/services/project-data-provider.service', () => ({
  papiFrontendProjectDataProviderService: { get: mocks.pdpGet },
}));
vi.mock('@shared/services/command.service', () => ({
  registerCommand: vi.fn(
    async (name: string, handler: (...args: unknown[]) => Promise<unknown>) => {
      registeredCommandHandlers.set(name, handler);
      return () => Promise.resolve(true);
    },
  ),
}));

const GEN_5_3: SerializedVerseRef = { book: 'GEN', chapterNum: 5, verseNum: 3 };
const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

/** Stand-in for the Electron BrowserWindow ID this renderer belongs to */
const TEST_WINDOW_ID = '7';

beforeEach(() => {
  vi.clearAllMocks();
  registeredCommandHandlers.clear();
  globalThis.windowId = TEST_WINDOW_ID;
  mocks.updateWebViewDefinitionSync.mockReturnValue(true);
  mocks.setScrRefSync.mockReturnValue(true);
  mocks.navigateReferenceHistoryPhysicalSync.mockReturnValue(false);
  // No resolved navigation target by default — individual describe blocks override.
  mocks.getNavigationTargetWebView.mockReturnValue(undefined);
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
  // window.service-shard (`getNavigationTargetWebView`) — resolution-order coverage lives in
  // window.service-shard.test.ts. These tests cover the command behavior once an editor IS the
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

  test('keeps a surviving book bounds when the other book fetch fails (allSettled)', async () => {
    // goToPreviousVerse from EXO 1:0 prefetches EXO (bookNum 2, the current book) and GEN (bookNum
    // 1, the closest previous present book it rolls into). EXO's fetch rejects while GEN's succeeds
    // with 3 chapters ending 8/25/24 — GEN's surviving bounds must still drive the rollover.
    const getFinalVerseNumbersInBookPartial = vi.fn(async (bookNum: number) => {
      if (bookNum === 2) throw new Error('no verse counts for EXO');
      return [0, 8, 25, 24];
    });
    mocks.pdpGet.mockImplementation(async (projectInterface: string) => {
      if (projectInterface === 'platformScripture.Versification')
        return { getFinalVerseNumbersInBook: getFinalVerseNumbersInBookPartial };
      return { getSetting: vi.fn(async () => '11') };
    });
    mocks.getScrRefForProject.mockResolvedValue({ book: 'EXO', chapterNum: 1, verseNum: 0 });

    await navigationCommandHandlers['platform.goToPreviousVerse']();

    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      0,
      { book: 'GEN', chapterNum: 3, verseNum: 24 },
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

  test('rolls to the closest present book when the current ref is a book the project lacks', async () => {
    mocks.getNavigationTargetWebView.mockReturnValue({
      id: 'web-view-1',
      definition: { id: 'web-view-1', scrollGroupScrRef: 0, projectId: 'project-1' },
    });
    // The project has GEN and LEV present (positions 1 and 3); a shared scroll group sits at EXO
    // (absent). goToNextChapter must roll forward to LEV rather than stepping within EXO — a book
    // the project does not contain (regression guard for foreign-book navigation).
    mocks.getScrRefForProject.mockResolvedValue({ book: 'EXO', chapterNum: 5, verseNum: 1 });
    const getSetting = vi.fn(async () => '101');
    mocks.pdpGet.mockImplementation(async (projectInterface: string) => {
      if (projectInterface === 'platformScripture.Versification')
        return { getFinalVerseNumbersInBook: vi.fn(async () => [0, 10]) };
      return { getSetting };
    });

    await navigationCommandHandlers['platform.goToNextChapter']();

    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      0,
      { book: 'LEV', chapterNum: 1, verseNum: 1 },
      'project-1',
    );
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

describe('reference-history keyboard commands resolve the active toolbar scroll group', () => {
  async function getRegisteredHandler(commandName: string) {
    await startScrollGroupNavigationCommands();
    // Handlers register under this window's scoped name; the main process routes the generic one
    const scopedName = `${commandName}-${TEST_WINDOW_ID}`;
    const handler = registeredCommandHandlers.get(scopedName);
    if (!handler) throw new Error(`${scopedName} was not registered`);
    return handler;
  }

  test('navigates the scroll group the toolbar follows, not a hardcoded one', async () => {
    // The active web view (what the toolbar mirrors) follows scroll group 2
    mocks.getNavigationTargetWebView.mockReturnValue({
      id: 'web-view-1',
      definition: { scrollGroupScrRef: 2 },
    });
    mocks.navigateReferenceHistoryPhysicalSync.mockReturnValue(true);
    const handler = await getRegisteredHandler('platform.navigateLeftInReferenceHistory');

    const result = await handler();

    expect(mocks.navigateReferenceHistoryPhysicalSync).toHaveBeenCalledWith(2, 'left');
    expect(result).toBe(true);
  });

  test('defaults to scroll group 0 when there is no active target (matching the toolbar)', async () => {
    // getNavigationTargetWebView returns undefined by default → the toolbar follows scroll group 0
    const handler = await getRegisteredHandler('platform.navigateRightInReferenceHistory');

    await handler();

    expect(mocks.navigateReferenceHistoryPhysicalSync).toHaveBeenCalledWith(0, 'right');
  });

  test('no-ops when the active web view has no scroll group (a detached ref)', async () => {
    // Active web view carries its own independent ref rather than following a numbered scroll group;
    // the toolbar hides its history buttons in that case, so the keyboard command must not navigate.
    mocks.getNavigationTargetWebView.mockReturnValue({
      id: 'web-view-1',
      definition: { scrollGroupScrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 } },
    });
    const handler = await getRegisteredHandler('platform.navigateLeftInReferenceHistory');

    const result = await handler();

    expect(result).toBe(false);
    expect(mocks.navigateReferenceHistoryPhysicalSync).not.toHaveBeenCalled();
  });
});

describe('navigation commands are registered per window', () => {
  // Every navigation command acts on its own window's navigation target, so two open windows must
  // not fight over one generic name — each renderer registers scoped names and the main process
  // routes the generic name to the focused window.
  const NAVIGATION_COMMAND_NAMES = [
    'platform.goToNextChapter',
    'platform.goToPreviousChapter',
    'platform.goToNextBook',
    'platform.goToPreviousBook',
    'platform.goToNextVerse',
    'platform.goToPreviousVerse',
    'platform.navigateLeftInReferenceHistory',
    'platform.navigateRightInReferenceHistory',
  ];

  test('registers every navigation command under a window-scoped name', async () => {
    await startScrollGroupNavigationCommands();

    expect([...registeredCommandHandlers.keys()].sort()).toEqual(
      NAVIGATION_COMMAND_NAMES.map((name) => `${name}-${TEST_WINDOW_ID}`).sort(),
    );
  });

  test('registers nothing under the generic names the main process routes', async () => {
    await startScrollGroupNavigationCommands();

    NAVIGATION_COMMAND_NAMES.forEach((name) => {
      expect(registeredCommandHandlers.has(name)).toBe(false);
    });
  });

  test('scopes to whichever window the renderer belongs to', async () => {
    globalThis.windowId = '2';

    await startScrollGroupNavigationCommands();

    expect(registeredCommandHandlers.has('platform.goToNextChapter-2')).toBe(true);
  });
});
