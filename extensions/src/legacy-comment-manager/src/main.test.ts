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
    getOpenWebViewDefinition: vi.fn(async () => undefined),
    reloadWebView: vi.fn(async () => undefined),
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
      getWebViewController: vi.fn(async () => undefined),
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
});
