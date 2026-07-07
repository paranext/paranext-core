import { describe, expect, test, vi, beforeEach } from 'vitest';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { navigationCommandHandlers } from '@renderer/services/scroll-group-navigation.commands';

// vi.mock and vi.hoisted calls are hoisted by vitest above the imports above at transform time, so
// the static imports can be written first here to satisfy import/first.
const mocks = vi.hoisted(() => ({
  getLastSelectedWebViewId: vi.fn(),
  getSavedWebViewDefinitionSync: vi.fn(),
  updateWebViewDefinitionSync: vi.fn(() => true),
  getScrRefSync: vi.fn(),
  getScrRefForProject: vi.fn(),
  setScrRefSync: vi.fn(() => true),
  settingsGet: vi.fn(),
  getBookChapterControlHandle: vi.fn(),
  pdpGet: vi.fn(),
}));

vi.mock('@renderer/services/window.service-host', () => ({
  getLastSelectedWebViewId: mocks.getLastSelectedWebViewId,
}));
vi.mock('@renderer/services/web-view.service-host', () => ({
  getSavedWebViewDefinitionSync: mocks.getSavedWebViewDefinitionSync,
  updateWebViewDefinitionSync: mocks.updateWebViewDefinitionSync,
}));
vi.mock('@renderer/services/scroll-group.service-host', () => ({
  getScrRefSync: mocks.getScrRefSync,
  getScrRefForProject: mocks.getScrRefForProject,
  setScrRefSync: mocks.setScrRefSync,
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: mocks.settingsGet },
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

const GEN_5_3: SerializedVerseRef = { book: 'GEN', chapterNum: 5, verseNum: 3 };

beforeEach(() => {
  vi.clearAllMocks();
  mocks.updateWebViewDefinitionSync.mockReturnValue(true);
  mocks.setScrRefSync.mockReturnValue(true);
  // No project → book list falls back to ALL_BOOK_IDS
  mocks.pdpGet.mockRejectedValue(new Error('no project'));
});

describe('go-to commands in simple mode', () => {
  beforeEach(() => {
    mocks.settingsGet.mockResolvedValue('simple');
    mocks.getScrRefSync.mockReturnValue(GEN_5_3);
  });

  test('goToNextVerse writes verse+1 to scroll group 0', async () => {
    await navigationCommandHandlers['platform.goToNextVerse']();
    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      0,
      { book: 'GEN', chapterNum: 5, verseNum: 4 },
      undefined,
    );
  });

  test('goToNextChapter writes chapter+1 verse 1 to scroll group 0', async () => {
    await navigationCommandHandlers['platform.goToNextChapter']();
    expect(mocks.setScrRefSync).toHaveBeenCalledWith(
      0,
      { book: 'GEN', chapterNum: 6, verseNum: 1 },
      undefined,
    );
  });
});

describe('go-to commands in power mode', () => {
  beforeEach(() => {
    mocks.settingsGet.mockResolvedValue('power');
  });

  test('no-ops when no web view is selected', async () => {
    mocks.getLastSelectedWebViewId.mockReturnValue(undefined);
    await navigationCommandHandlers['platform.goToNextVerse']();
    expect(mocks.setScrRefSync).not.toHaveBeenCalled();
    expect(mocks.updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });

  test('writes to the active web view scroll group with its project as source', async () => {
    mocks.getLastSelectedWebViewId.mockReturnValue('web-view-1');
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
  });

  test('updates the web view definition when the active tab is detached', async () => {
    mocks.getLastSelectedWebViewId.mockReturnValue('web-view-1');
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

  test('goToPreviousBook no-ops at the first book', async () => {
    mocks.getLastSelectedWebViewId.mockReturnValue('web-view-1');
    mocks.getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'web-view-1',
      scrollGroupScrRef: 0,
    });
    mocks.getScrRefSync.mockReturnValue({ book: 'GEN', chapterNum: 5, verseNum: 3 });

    await navigationCommandHandlers['platform.goToPreviousBook']();
    expect(mocks.setScrRefSync).not.toHaveBeenCalled();
  });
});

describe('platform.openBookChapterControl', () => {
  test('prefers the active tab handle, falls back to top toolbar', async () => {
    mocks.settingsGet.mockResolvedValue('power');
    mocks.getLastSelectedWebViewId.mockReturnValue('web-view-1');

    const tabHandle = { open: vi.fn() };
    mocks.getBookChapterControlHandle.mockImplementation((ownerId: string) =>
      ownerId === 'web-view-1' ? tabHandle : undefined,
    );
    await navigationCommandHandlers['platform.openBookChapterControl']();
    expect(tabHandle.open).toHaveBeenCalled();

    const toolbarHandle = { open: vi.fn() };
    mocks.getBookChapterControlHandle.mockImplementation((ownerId: string) =>
      ownerId === 'top-toolbar' ? toolbarHandle : undefined,
    );
    await navigationCommandHandlers['platform.openBookChapterControl']();
    expect(toolbarHandle.open).toHaveBeenCalled();
  });
});
