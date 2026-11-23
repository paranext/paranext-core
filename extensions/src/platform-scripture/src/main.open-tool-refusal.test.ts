import { UnsubscriberAsyncList } from 'platform-bible-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { activate } from './main';

// Activates the real `main.ts` so the `open*` commands it registers can be called. Everything it
// registers besides those commands is out of scope here, so the modules that would drag in web
// views, data provider engines or services are replaced with inert stand-ins. Vitest hoists the
// `vi.mock` calls below above the imports, so `main.ts` loads against them.

const mocks = vi.hoisted(() => {
  const registeredCommands = new Map<string, (...args: unknown[]) => Promise<unknown>>();
  /** Stands in for every class `main.ts` constructs; none of them is exercised here. */
  class Inert {}
  /**
   * Any PAPI member `main.ts` touches during activation that these tests do not care about: every
   * property is another such member, and calling one resolves to an unsubscriber.
   */
  function makeInertApi(): unknown {
    const call = () => Promise.resolve(async () => true);
    return new Proxy(call, {
      get: (_target, property) => (property === 'then' ? undefined : makeInertApi()),
    });
  }
  return {
    registeredCommands,
    Inert,
    makeInertApi,
    registerCommand: vi.fn(
      async (name: string, handler: (...args: unknown[]) => Promise<unknown>) => {
        registeredCommands.set(name, handler);
        return async () => true;
      },
    ),
    getOpenWebViewDefinition: vi.fn(async (): Promise<unknown> => undefined),
    openWebView: vi.fn(async (): Promise<string | undefined> => 'opened-web-view'),
    reloadWebView: vi.fn(async (): Promise<string | undefined> => 'reloaded-web-view'),
    getMetadataForProject: vi.fn(async (): Promise<unknown> => ({})),
    /** Every key is registered, so the reason key itself is sent. */
    getLocalizedStrings: vi.fn(async ({ localizeKeys }: { localizeKeys: string[] }) =>
      Object.fromEntries(localizeKeys.map((key) => [key, `Localized ${key}`])),
    ),
    sendNotification: vi.fn(async (): Promise<unknown> => undefined),
  };
});

vi.mock('@papi/backend', () => ({
  default: new Proxy(
    {
      commands: { registerCommand: mocks.registerCommand },
      webViews: {
        getOpenWebViewDefinition: mocks.getOpenWebViewDefinition,
        openWebView: mocks.openWebView,
        reloadWebView: mocks.reloadWebView,
      },
      projectLookup: { getMetadataForProject: mocks.getMetadataForProject },
      localization: { getLocalizedStrings: mocks.getLocalizedStrings },
      notifications: { send: mocks.sendNotification },
    },
    {
      get: (target, property) =>
        Reflect.has(target, property) ? Reflect.get(target, property) : mocks.makeInertApi(),
    },
  ),
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('./checks-side-panel.web-view-provider', () => ({
  ChecksSidePanelWebViewProvider: mocks.Inert,
  checksSidePanelWebViewType: 'platformScripture.checksSidePanel',
}));
vi.mock('./checklist.web-view-provider', () => ({
  ChecklistWebViewProvider: mocks.Inert,
  markersChecklistWebViewType: 'platformScripture.markersChecklist',
}));
vi.mock('./find.web-view-provider', () => ({
  FindWebViewProvider: mocks.Inert,
  findWebViewType: 'platformScripture.find',
}));
vi.mock('./inventory.web-view-provider', () => ({ InventoryWebViewProvider: mocks.Inert }));
vi.mock('./manage-books.web-view-provider', () => ({
  ManageBooksWebViewProvider: mocks.Inert,
  MANAGE_BOOKS_WEB_VIEW_TYPE: 'platformScripture.manageBooks',
}));
vi.mock('./find/find-history.data-provider', () => ({
  FindHistoryDataProviderEngine: mocks.Inert,
}));
vi.mock('./project-data-provider/platform-scripture-extender-pdpe.model', () => ({
  SCRIPTURE_EXTENDER_PROJECT_INTERFACES: [],
}));
vi.mock('./project-data-provider/platform-scripture-finder-pdpe.model', () => ({
  SCRIPTURE_FINDER_PROJECT_INTERFACES: [],
}));
vi.mock('./project-data-provider/platform-scripture-extender-pdpef.model', () => ({
  SCRIPTURE_EXTENDER_PDPF_ID: 'extender',
  ScriptureExtenderProjectDataProviderEngineFactory: mocks.Inert,
}));
vi.mock('./project-data-provider/platform-scripture-finder.pdpef.model', () => ({
  SCRIPTURE_FINDER_PDPF_ID: 'finder',
  ScriptureFinderProjectDataProviderEngineFactory: mocks.Inert,
}));
vi.mock('./checks/extension-host-check-runner.service', () => ({
  checkHostingService: { initialize: vi.fn(async () => undefined), dispose: vi.fn() },
}));
vi.mock('./checks/check-aggregator.service', () => ({
  checkAggregatorService: { initialize: vi.fn(async () => undefined), dispose: vi.fn() },
  notifyCheckResultsInvalidated: vi.fn(),
}));
vi.mock('./recently-opened-projects.service', () => ({
  recentlyOpenedProjectsService: { initialize: vi.fn(async () => undefined), dispose: vi.fn() },
  RECENTLY_OPENED_PROJECTS_STORAGE_KEY: 'recentlyOpenedProjects',
}));

const REASON_KEY = '%project_unsupported_studyBibleAdditions%';

async function activateAndGetCommand(commandName: string) {
  // The stand-in context supplies only what `activate` reads.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const context = {
    name: 'platformScripture',
    executionToken: {},
    elevatedPrivileges: {},
    registrations: new UnsubscriberAsyncList('platformScripture-test'),
  } as never;
  await activate(context);
  const command = mocks.registeredCommands.get(commandName);
  if (!command) throw new Error(`${commandName} was not registered`);
  return command;
}

describe('opening a tool from a web view whose project cannot be opened', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.registeredCommands.clear();
    mocks.getOpenWebViewDefinition.mockResolvedValue({ id: 'editor-1', projectId: 'project-1' });
  });

  it('refuses the inventory and says why', async () => {
    mocks.getMetadataForProject.mockResolvedValue({ unsupportedReason: REASON_KEY });
    const openCharactersInventory = await activateAndGetCommand(
      'platformScripture.openCharactersInventory',
    );

    await expect(openCharactersInventory('editor-1')).resolves.toBe(undefined);

    expect(mocks.openWebView).not.toHaveBeenCalled();
    expect(mocks.sendNotification).toHaveBeenCalledWith({
      message: REASON_KEY,
      severity: 'warning',
    });
  });

  it('opens the inventory for a project that can be opened', async () => {
    mocks.getMetadataForProject.mockResolvedValue({});
    const openCharactersInventory = await activateAndGetCommand(
      'platformScripture.openCharactersInventory',
    );

    await expect(openCharactersInventory('editor-1')).resolves.toBe('opened-web-view');

    expect(mocks.openWebView).toHaveBeenCalledWith(
      'platformScripture.characterInventory',
      expect.anything(),
      { projectId: 'project-1' },
    );
    expect(mocks.sendNotification).not.toHaveBeenCalled();
  });

  it.each([
    'platformScripture.openChecksSidePanel',
    'platformScripture.openMarkersChecklist',
    'platformScripture.openManageBooks',
  ])('%s refuses and says why', async (commandName) => {
    mocks.getMetadataForProject.mockResolvedValue({ unsupportedReason: REASON_KEY });
    const openTool = await activateAndGetCommand(commandName);

    await expect(openTool('editor-1')).resolves.toBe(undefined);

    expect(mocks.openWebView).not.toHaveBeenCalled();
    expect(mocks.sendNotification).toHaveBeenCalledWith({
      message: REASON_KEY,
      severity: 'warning',
    });
  });

  it.each([
    'platformScripture.openChecksSidePanel',
    'platformScripture.openMarkersChecklist',
    'platformScripture.openManageBooks',
  ])('%s opens for a project that can be opened', async (commandName) => {
    mocks.getMetadataForProject.mockResolvedValue({});
    const openTool = await activateAndGetCommand(commandName);

    await expect(openTool('editor-1')).resolves.toBeTruthy();

    expect(mocks.openWebView).toHaveBeenCalledWith(
      expect.any(String),
      expect.anything(),
      expect.objectContaining({ projectId: 'project-1' }),
    );
    expect(mocks.sendNotification).not.toHaveBeenCalled();
  });
});
