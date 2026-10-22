import { beforeEach, describe, expect, it, vi } from 'vitest';

// `main.ts` pulls in webpack-only `?inline` imports (the web view bundle content and its CSS) that
// only resolve under webpack, not vitest — stub them to plain strings so `main.ts` can load for
// real without dragging the React web view (and its browser-only dependencies) into this test.
vi.mock('./comment-list.web-view?inline', () => ({ default: 'mock-comment-list-web-view' }));
vi.mock('./tailwind.css?inline', () => ({ default: 'mock-tailwind-css' }));

// vi.mock factories are hoisted above imports, so anything they close over must be created via
// vi.hoisted to avoid a temporal-dead-zone reference.
const mocks = vi.hoisted(() => {
  const registeredCommands = new Map<string, (...args: unknown[]) => unknown>();
  // Minimal stand-in base class so `class X extends WebViewFactory/LayeringProjectDataProviderEngineFactory`
  // and `class Y extends ProjectDataProviderEngine` in main.ts's module graph can be constructed; none
  // of the tests below exercise their behavior, so one shared no-op base serves all three exports.
  // A class with no declared constructor silently accepts (and ignores) whatever args a subclass's
  // `super(...)` call passes, so this needs no constructor of its own.
  class PapiBackendStubBase {}
  // Named so `beforeEach` can restore it after `vi.resetAllMocks()`, which strips this
  // implementation along with every other mock's — every test needs it to reach its handler.
  async function registerCommandImpl(name: string, handler: (...args: unknown[]) => unknown) {
    registeredCommands.set(name, handler);
    return async () => true;
  }
  return {
    registeredCommands,
    openWebView: vi.fn(async () => 'wv-1'),
    onDidCloseWebView: vi.fn(() => () => {}),
    getOpenWebViewDefinition: vi.fn<
      (webViewId: string) => Promise<{ projectId?: string } | undefined>
    >(async () => undefined),
    reloadWebView: vi.fn(async (): Promise<string | undefined> => undefined),
    getWebViewController: vi.fn(
      async (): Promise<{ selectThread: (threadId: string) => Promise<void> } | undefined> =>
        undefined,
    ),
    setPendingCommentListPanelProjectId: vi.fn(),
    registerCommand: vi.fn(registerCommandImpl),
    registerCommandImpl,
    PapiBackendStubBase,
  };
});

vi.mock('@papi/backend', () => ({
  default: {
    commands: { registerCommand: mocks.registerCommand },
    webViewProviders: {
      registerWebViewProvider: vi.fn(async () => async () => true),
      postMessageToWebView: vi.fn(async () => {}),
    },
    webViews: {
      openWebView: mocks.openWebView,
      onDidCloseWebView: mocks.onDidCloseWebView,
      getOpenWebViewDefinition: mocks.getOpenWebViewDefinition,
      getWebViewController: mocks.getWebViewController,
      reloadWebView: mocks.reloadWebView,
    },
    projectDataProviders: {
      get: vi.fn(async () => ({ getSetting: vi.fn(async () => undefined) })),
      registerProjectDataProviderEngineFactory: vi.fn(async () => async () => true),
    },
    localization: { getLocalizedString: vi.fn(async () => 'Comments') },
    settings: { get: vi.fn(async () => 'simple') },
  },
  logger: { debug: vi.fn(), warn: vi.fn(), info: vi.fn(), error: vi.fn() },
  WebViewFactory: mocks.PapiBackendStubBase,
  LayeringProjectDataProviderEngineFactory: mocks.PapiBackendStubBase,
  ProjectDataProviderEngine: mocks.PapiBackendStubBase,
}));

// Spied so the tests can see which project a panel reload is pointed at; the rest of the factory
// module stays real.
vi.mock('./comment-list-panel-web-view.factory', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./comment-list-panel-web-view.factory')>()),
  setPendingCommentListPanelProjectId: mocks.setPendingCommentListPanelProjectId,
}));

// vi.mock declarations above are hoisted, so the imports below must come after to ensure the
// mocks are applied to the module under test.
/* eslint-disable import/first */
import { UnsubscriberAsyncList } from 'platform-bible-utils';
import { logger } from '@papi/backend';
import { activate } from './main';
/* eslint-enable import/first */

function makeContext() {
  // The mock papi only implements the subset of ExecutionActivationContext main.ts uses.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    name: 'legacyCommentManager',
    executionToken: {},
    elevatedPrivileges: {},
    registrations: new UnsubscriberAsyncList('legacyCommentManager-test'),
  } as never;
}

describe('legacy comment manager main.ts activation', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.registeredCommands.clear();
    // resetAllMocks() also strips this mock's own base implementation; restore it since every
    // test below depends on activate() populating registeredCommands.
    mocks.registerCommand.mockImplementation(mocks.registerCommandImpl);
  });

  it('opening a comment list for a project reuses the existing one via the reuse search', async () => {
    await activate(makeContext());
    const openCommentList = mocks.registeredCommands.get('legacyCommentManager.openCommentList');
    expect(openCommentList).toBeDefined();

    await openCommentList?.(undefined, { projectId: 'proj-1' });

    // The reuse-or-create open must be a single call that lets the dock layouts find the project's
    // list wherever it lives — not a remembered id from a local map.
    expect(mocks.openWebView).toHaveBeenCalledTimes(1);
    expect(mocks.openWebView).toHaveBeenCalledWith(
      'legacyCommentManager.commentList',
      expect.objectContaining({ type: 'panel', direction: 'right' }),
      expect.objectContaining({
        existingId: '?',
        existingProjectId: 'proj-1',
        bringToFront: true,
        createNewIfNotFound: true,
      }),
    );
    // Never a concrete remembered id — only ever the '?' reuse search.
    const callOptions = mocks.openWebView.mock.calls[0][2];
    expect(callOptions.existingId).toBe('?');
  });

  it('no map survives: closing a comment list requires no bookkeeping', async () => {
    await activate(makeContext());

    // The module must not subscribe to web view close events to evict tracking — there is no
    // local map left for a close event to clean up.
    expect(mocks.onDidCloseWebView).not.toHaveBeenCalled();
  });

  it('showCommentListPanel raises an open Comments tab without reloading it', async () => {
    await activate(makeContext());
    mocks.openWebView.mockResolvedValueOnce('comments-tab');
    const handler = mocks.registeredCommands.get('legacyCommentManager.showCommentListPanel');
    await expect(handler?.('editor-1')).resolves.toBe('comments-tab');
    expect(mocks.openWebView).toHaveBeenLastCalledWith(
      'legacyCommentManager.commentListPanel',
      undefined,
      { existingId: '?', createNewIfNotFound: false, bringToFront: true },
    );
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
  });

  it("showCommentListPanel opens a Comments tab for the editor's project when none is open", async () => {
    await activate(makeContext());
    mocks.openWebView.mockResolvedValueOnce(undefined).mockResolvedValueOnce('new-comments-tab');
    mocks.getOpenWebViewDefinition.mockResolvedValueOnce({ projectId: 'project-1' });
    const handler = mocks.registeredCommands.get('legacyCommentManager.showCommentListPanel');
    await expect(handler?.('editor-1')).resolves.toBe('new-comments-tab');
    expect(mocks.getOpenWebViewDefinition).toHaveBeenCalledWith('editor-1');
    expect(mocks.openWebView).toHaveBeenLastCalledWith(
      'legacyCommentManager.commentListPanel',
      { type: 'tab' },
      { projectId: 'project-1' },
    );
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
  });

  it('showCommentListPanel opens an unlabeled Comments tab when the editor web view cannot be resolved', async () => {
    await activate(makeContext());
    mocks.openWebView.mockResolvedValueOnce(undefined).mockResolvedValueOnce('new-comments-tab');
    // getOpenWebViewDefinition is documented to throw when no window claimed the web view and some
    // window could not be asked — that must degrade to "no project id", not reject the command.
    mocks.getOpenWebViewDefinition.mockRejectedValueOnce(new Error('no window answered'));
    const handler = mocks.registeredCommands.get('legacyCommentManager.showCommentListPanel');
    await expect(handler?.('editor-1')).resolves.toBe('new-comments-tab');
    expect(mocks.openWebView).toHaveBeenLastCalledWith(
      'legacyCommentManager.commentListPanel',
      { type: 'tab' },
      { projectId: undefined },
    );
    // Distinguishes this from the plain not-found path, which degrades to the same "no project id"
    // outcome without logging anything.
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('editor-1'));
  });

  describe('selectCommentThreadInPanel', () => {
    const selectThread = vi.fn(async () => {});

    /**
     * Panel `comments-tab` is open and shows `panelProjectId`; editor `editor-1` shows
     * `editorProjectId`.
     */
    function arrange(panelProjectId: string | undefined, editorProjectId: string | undefined) {
      mocks.openWebView.mockResolvedValue('comments-tab');
      // A successful reload resolves to the reloaded web view's ID
      mocks.reloadWebView.mockResolvedValue('comments-tab');
      mocks.getWebViewController.mockResolvedValue({ selectThread });
      mocks.getOpenWebViewDefinition.mockImplementation(async (id: string) => {
        if (id === 'comments-tab') return { projectId: panelProjectId };
        if (id === 'editor-1') return { projectId: editorProjectId };
        return undefined;
      });
    }

    async function select(...args: unknown[]) {
      await activate(makeContext());
      const handler = mocks.registeredCommands.get(
        'legacyCommentManager.selectCommentThreadInPanel',
      );
      return handler?.(...args);
    }

    it("re-points a panel showing another project at the editor's project before selecting", async () => {
      arrange('project-A', 'project-B');

      await expect(select('thread-1', true, 'editor-1')).resolves.toBe('comments-tab');

      expect(mocks.setPendingCommentListPanelProjectId).toHaveBeenCalledWith('project-B');
      expect(mocks.reloadWebView).toHaveBeenCalledWith(
        'legacyCommentManager.commentListPanel',
        'comments-tab',
        expect.objectContaining({ bringToFront: false }),
      );
      expect(selectThread).toHaveBeenCalledWith('thread-1');
      // The reload must be issued before the selection, or the selection lands in the old project.
      expect(mocks.reloadWebView.mock.invocationCallOrder[0]).toBeLessThan(
        selectThread.mock.invocationCallOrder[0],
      );
    });

    it("selects without reloading when the panel already shows the editor's project", async () => {
      arrange('project-A', 'project-A');

      await select('thread-1', true, 'editor-1');

      expect(mocks.reloadWebView).not.toHaveBeenCalled();
      expect(mocks.setPendingCommentListPanelProjectId).not.toHaveBeenCalled();
      expect(selectThread).toHaveBeenCalledWith('thread-1');
    });

    it('selects without reloading when no editor is given', async () => {
      arrange('project-A', 'project-B');

      await select('thread-1', false);

      expect(mocks.getOpenWebViewDefinition).not.toHaveBeenCalled();
      expect(mocks.reloadWebView).not.toHaveBeenCalled();
      expect(selectThread).toHaveBeenCalledWith('thread-1');
    });

    it.each([
      ['rejects', () => mocks.reloadWebView.mockRejectedValueOnce(new Error('window closing'))],
      ['returns no web view', () => mocks.reloadWebView.mockResolvedValueOnce(undefined)],
    ])(
      'rejects without selecting, and clears the pending project, when the panel reload %s',
      async (_outcome, arrangeReload) => {
        arrange('project-A', 'project-B');
        arrangeReload();

        await expect(select('thread-1', true, 'editor-1')).rejects.toThrow('project-B');

        // The panel is known to show another project, where the thread can't be found; selecting
        // it there would leave the list's pending selection stuck.
        expect(selectThread).not.toHaveBeenCalled();
        // A pending project the reload never consumed would be picked up by a later, unrelated
        // panel load.
        expect(mocks.setPendingCommentListPanelProjectId).toHaveBeenLastCalledWith(undefined);
      },
    );

    it("selects without reloading when the editor's project cannot be resolved", async () => {
      arrange('project-A', undefined);
      mocks.getOpenWebViewDefinition.mockRejectedValueOnce(new Error('no window answered'));

      await select('thread-1', true, 'editor-1');

      expect(mocks.reloadWebView).not.toHaveBeenCalled();
      expect(selectThread).toHaveBeenCalledWith('thread-1');
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('editor-1'));
    });
  });
});
