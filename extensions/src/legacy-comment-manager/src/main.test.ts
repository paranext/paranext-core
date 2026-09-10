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
  return {
    registeredCommands,
    openWebView: vi.fn(async () => 'wv-1'),
    onDidCloseWebView: vi.fn(() => () => {}),
    registerCommand: vi.fn(async (name: string, handler: (...args: unknown[]) => unknown) => {
      registeredCommands.set(name, handler);
      return async () => true;
    }),
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
      getOpenWebViewDefinition: vi.fn(async () => undefined),
      getWebViewController: vi.fn(async () => undefined),
      reloadWebView: vi.fn(async () => undefined),
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
    vi.clearAllMocks();
    mocks.registeredCommands.clear();
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
});
