import { beforeEach, describe, expect, it, vi } from 'vitest';

// `main.ts` pulls in webpack-only `?inline` imports (the web view bundle content and its CSS) that
// only resolve under webpack, not vitest — stub them to plain strings so `main.ts` can load for
// real without dragging the React web view (and its browser-only dependencies) into this test.
vi.mock('./web-views/dictionary.web-view?inline', () => ({ default: 'mock-dictionary-web-view' }));
vi.mock('./tailwind.css?inline', () => ({ default: 'mock-tailwind-css' }));

// vi.mock factories are hoisted above imports, so anything they close over must be created via
// vi.hoisted to avoid a temporal-dead-zone reference.
const mocks = vi.hoisted(() => {
  const registeredCommands = new Map<string, (...args: unknown[]) => unknown>();
  // Set by registerWebViewProviderImpl so tests can call getWebView directly instead of only
  // exercising it indirectly through a command.
  let capturedWebViewProvider: { getWebView: (...args: unknown[]) => unknown } | undefined;
  // Minimal stand-in base class so `class X extends DataProviderEngine` in main.ts's module graph
  // can be constructed; none of the tests below exercise its behavior.
  class PapiBackendStubBase {}
  // Named so `beforeEach` can restore it after `vi.resetAllMocks()`, which strips this
  // implementation along with every other mock's — every test needs it to reach its handler.
  async function registerCommandImpl(name: string, handler: (...args: unknown[]) => unknown) {
    registeredCommands.set(name, handler);
    return async () => true;
  }
  async function registerWebViewProviderImpl(_type: string, provider: unknown) {
    // `provider` is whatever main.ts registers; narrowing it to the one method these tests call.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    capturedWebViewProvider = provider as { getWebView: (...args: unknown[]) => unknown };
    return async () => true;
  }
  return {
    registeredCommands,
    getCapturedWebViewProvider: () => capturedWebViewProvider,
    openWebView: vi.fn(async () => 'wv-1'),
    getOpenWebViewDefinition: vi.fn(async () => undefined),
    registerCommand: vi.fn(registerCommandImpl),
    registerCommandImpl,
    registerWebViewProvider: vi.fn(registerWebViewProviderImpl),
    registerWebViewProviderImpl,
    PapiBackendStubBase,
  };
});

vi.mock('@papi/backend', () => ({
  default: {
    commands: { registerCommand: mocks.registerCommand },
    webViewProviders: {
      registerWebViewProvider: mocks.registerWebViewProvider,
    },
    webViews: {
      openWebView: mocks.openWebView,
      getOpenWebViewDefinition: mocks.getOpenWebViewDefinition,
    },
    dataProviders: { registerEngine: vi.fn(async () => async () => true) },
    projectDataProviders: {
      registerProjectDataProviderEngineFactory: vi.fn(async () => async () => true),
    },
    database: {
      openDatabase: vi.fn(async () => {
        throw new Error('no database in tests');
      }),
    },
    localization: { getLocalizedString: vi.fn(async () => 'Dictionary: SDBH/SDBG') },
    settings: { get: vi.fn(async () => 'simple') },
  },
  logger: { debug: vi.fn(), warn: vi.fn(), info: vi.fn(), error: vi.fn() },
  DataProviderEngine: mocks.PapiBackendStubBase,
  BaseProjectDataProviderEngine: mocks.PapiBackendStubBase,
}));

// vi.mock declarations above are hoisted, so the imports below must come after to ensure the
// mocks are applied to the module under test.
/* eslint-disable import/first */
import { UnsubscriberAsyncList } from 'platform-bible-utils';
import papi, { logger } from '@papi/backend';
import { activate } from './main';
import { DICTIONARY_TITLE_KEY } from './utils/dictionary.utils';
/* eslint-enable import/first */

function makeContext() {
  // The mock papi only implements the subset of ExecutionActivationContext main.ts uses.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    name: 'platformLexicalTools',
    executionToken: {},
    elevatedPrivileges: {},
    registrations: new UnsubscriberAsyncList('platformLexicalTools-test'),
  } as never;
}

describe('platform lexical tools main.ts activation', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.registeredCommands.clear();
    // resetAllMocks() also strips this mock's own base implementation; restore it since every
    // test below depends on activate() populating registeredCommands.
    mocks.registerCommand.mockImplementation(mocks.registerCommandImpl);
    mocks.registerWebViewProvider.mockImplementation(mocks.registerWebViewProviderImpl);
  });

  it('showDictionaryPanel raises an open Dictionary tab without reloading it', async () => {
    await activate(makeContext());
    mocks.openWebView.mockResolvedValueOnce('dictionary-tab');
    const handler = mocks.registeredCommands.get('platformLexicalTools.showDictionaryPanel');
    expect(handler).toBeDefined();

    await expect(handler?.('editor-1')).resolves.toBe('dictionary-tab');

    expect(mocks.openWebView).toHaveBeenLastCalledWith(
      'platformLexicalTools.dictionary',
      undefined,
      {
        existingId: '?',
        createNewIfNotFound: false,
        bringToFront: true,
      },
    );
    expect(mocks.getOpenWebViewDefinition).not.toHaveBeenCalled();
  });

  it("showDictionaryPanel opens a Dictionary tab for the editor's project when none is open", async () => {
    await activate(makeContext());
    mocks.openWebView.mockResolvedValueOnce(undefined).mockResolvedValueOnce('new-dictionary-tab');
    mocks.getOpenWebViewDefinition.mockResolvedValueOnce({
      projectId: 'project-1',
      scrollGroupScrRef: 2,
    });
    const handler = mocks.registeredCommands.get('platformLexicalTools.showDictionaryPanel');

    await expect(handler?.('editor-1')).resolves.toBe('new-dictionary-tab');

    expect(mocks.getOpenWebViewDefinition).toHaveBeenCalledWith('editor-1');
    expect(mocks.openWebView).toHaveBeenLastCalledWith(
      'platformLexicalTools.dictionary',
      { type: 'tab' },
      { projectId: 'project-1', editorWebViewId: 'editor-1', editorScrollGroupId: 2 },
    );
  });

  it('showDictionaryPanel opens an unlabeled Dictionary tab when the editor web view cannot be resolved', async () => {
    await activate(makeContext());
    mocks.openWebView.mockResolvedValueOnce(undefined).mockResolvedValueOnce('new-dictionary-tab');
    // getOpenWebViewDefinition is documented to throw when no window claimed the web view and some
    // window could not be asked — that must degrade to "no project id", not reject the command.
    mocks.getOpenWebViewDefinition.mockRejectedValueOnce(new Error('no window answered'));
    const handler = mocks.registeredCommands.get('platformLexicalTools.showDictionaryPanel');

    await expect(handler?.('editor-1')).resolves.toBe('new-dictionary-tab');

    expect(mocks.openWebView).toHaveBeenLastCalledWith(
      'platformLexicalTools.dictionary',
      { type: 'tab' },
      { projectId: undefined, editorWebViewId: 'editor-1', editorScrollGroupId: undefined },
    );
    // Distinguishes this from the plain not-found path, which degrades to the same "no project id"
    // outcome without logging anything.
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('editor-1'));
  });

  it('showDictionaryPanel opens an unlabeled Dictionary tab when no triggering editor is given', async () => {
    await activate(makeContext());
    mocks.openWebView.mockResolvedValueOnce(undefined).mockResolvedValueOnce('new-dictionary-tab');
    const handler = mocks.registeredCommands.get('platformLexicalTools.showDictionaryPanel');

    await expect(handler?.(undefined)).resolves.toBe('new-dictionary-tab');

    expect(mocks.getOpenWebViewDefinition).not.toHaveBeenCalled();
    expect(mocks.openWebView).toHaveBeenLastCalledWith(
      'platformLexicalTools.dictionary',
      { type: 'tab' },
      { projectId: undefined, editorWebViewId: undefined, editorScrollGroupId: undefined },
    );
  });

  describe('getWebView', () => {
    const savedWebView = { id: 'dict-1', webViewType: 'platformLexicalTools.dictionary' };
    const getWebViewOptions = {
      projectId: undefined,
      editorScrollGroupId: undefined,
      editorWebViewId: undefined,
    };

    async function getCapturedWebView() {
      await activate(makeContext());
      const provider = mocks.getCapturedWebViewProvider();
      expect(provider).toBeDefined();
      return provider?.getWebView(savedWebView, getWebViewOptions);
    }

    it('falls back to Simple mode when reading the interface mode setting rejects', async () => {
      vi.mocked(papi.settings.get).mockRejectedValueOnce(new Error('settings service unavailable'));
      vi.mocked(papi.localization.getLocalizedString).mockResolvedValueOnce(
        'Dictionary: SDBH/SDBG',
      );

      // getWebView's real return type is a large union; narrowing to the one field this test checks.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const webView = (await getCapturedWebView()) as { shouldShowToolbar: boolean };

      expect(webView.shouldShowToolbar).toBe(false);
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('interface mode'));
    });

    it('falls back to the raw key as the tooltip when resolving the localized string rejects', async () => {
      vi.mocked(papi.settings.get).mockResolvedValueOnce('power');
      vi.mocked(papi.localization.getLocalizedString).mockRejectedValueOnce(
        new Error('localization service unavailable'),
      );

      // getWebView's real return type is a large union; narrowing to the one field this test checks.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const webView = (await getCapturedWebView()) as { tooltip: string };

      expect(webView.tooltip).toBe(DICTIONARY_TITLE_KEY);
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('tooltip'));
    });
  });
});
