import type { ResourceReferenceList } from 'platform-scripture';
import type { DblResourceData } from 'platform-bible-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  sendCommand: vi.fn(),
  getAllOpenWebViewDefinitions: vi.fn(),
  reloadWebView: vi.fn(),
  getMetadataForProject: vi.fn(),
  getPdp: vi.fn(),
  getUserList: vi.fn(),
  setUserList: vi.fn(),
  warn: vi.fn(),
  notify: vi.fn(async () => 'notification-1'),
}));
vi.mock('@papi/backend', () => ({
  default: {
    commands: { sendCommand: mocks.sendCommand },
    webViews: {
      getAllOpenWebViewDefinitions: mocks.getAllOpenWebViewDefinitions,
      reloadWebView: mocks.reloadWebView,
    },
    projectLookup: { getMetadataForProject: mocks.getMetadataForProject },
    projectDataProviders: { get: mocks.getPdp },
    notifications: { send: mocks.notify },
    localization: { getLocalizedString: vi.fn(async () => "That tab couldn't be opened.") },
  },
  logger: { warn: mocks.warn, debug: vi.fn(), info: vi.fn(), error: vi.fn() },
}));

// vi.mock must appear before the imports it mocks so Vitest can hoist it; eslint's import/first
// rule cannot model this Vitest-specific hoisting requirement.
// eslint-disable-next-line import/first
import {
  showResourceInReferencePanel,
  buildResourceTextPanelState,
  type ResourceTextPanelOptions,
} from './show-resource-in-panel.util';

const BIBLE_TEXTS = 'platformScriptureEditor.bibleTexts';
const COMMENTARIES = 'platformScriptureEditor.commentaries';

const catalogEntry = (overrides: Partial<DblResourceData>): DblResourceData => ({
  dblEntryUid: 'uid-byz',
  displayName: 'BYZ',
  fullName: 'Byzantine Text',
  bestLanguageName: 'Greek',
  type: 'ScriptureResource',
  size: 100,
  installed: true,
  updateAvailable: false,
  projectId: 'byz-project',
  ...overrides,
});

const OPEN_PANELS = [
  { id: 'bible-texts-tab', webViewType: BIBLE_TEXTS, projectId: 'my-project' },
  { id: 'commentaries-tab', webViewType: COMMENTARIES, projectId: 'my-project' },
];

/** Answers the two catalog commands the way `platformGetResources` would. */
function catalogHas(dblEntries: DblResourceData[], localEntries: DblResourceData[] = []) {
  mocks.sendCommand.mockImplementation(async (command: string) => {
    if (command === 'platformGetResources.getCachedResources')
      return { status: 'available', resources: dblEntries };
    if (command === 'platformGetResources.getLocalNonDblResources') return localEntries;
    if (command === 'platformGetResources.refreshResourceFlags') return undefined;
    throw new Error(`unexpected command ${command}`);
  });
}

/** The selection the provider would apply when the reload asks it to build the panel. */
let selectionSeenByProvider: unknown;

/** The selection the panel is built with, given the reload's options and an earlier selection. */
function providerSelection(options: ResourceTextPanelOptions): unknown {
  return buildResourceTextPanelState(
    { selectedResourceId: 'dbl:previous' },
    'ScriptureResource',
    options,
  ).selectedResourceId;
}

describe('showResourceInReferencePanel', () => {
  let savedUserList: ResourceReferenceList | undefined;
  let teamList: ResourceReferenceList | undefined;

  beforeEach(() => {
    vi.resetAllMocks();
    savedUserList = undefined;
    selectionSeenByProvider = undefined;
    catalogHas([catalogEntry({})]);
    mocks.getAllOpenWebViewDefinitions.mockResolvedValue(OPEN_PANELS);
    mocks.getUserList.mockImplementation(async () => savedUserList);
    mocks.setUserList.mockImplementation(async (list: ResourceReferenceList) => {
      savedUserList = list;
      return true;
    });
    teamList = undefined;
    mocks.getPdp.mockImplementation(async (projectInterface: string) =>
      projectInterface === 'platform.base'
        ? { getSetting: async () => teamList }
        : {
            getUserReferencedProjectsAndResources: mocks.getUserList,
            setUserReferencedProjectsAndResources: mocks.setUserList,
          },
    );
    mocks.reloadWebView.mockImplementation(
      async (_webViewType: string, id: string, options: ResourceTextPanelOptions) => {
        selectionSeenByProvider = providerSelection(options);
        return id;
      },
    );
  });

  it("adds a Bible text to the user's own list and selects it in Bible texts", async () => {
    await expect(showResourceInReferencePanel('byz-project')).resolves.toBe('bible-texts-tab');

    expect(mocks.getPdp).toHaveBeenCalledWith(
      'platformScripture.textConnectionSettings',
      'my-project',
    );
    expect(savedUserList?.items).toEqual([{ type: 'dblResource', name: 'BYZ', id: 'uid-byz' }]);
    expect(mocks.reloadWebView).toHaveBeenCalledWith(
      BIBLE_TEXTS,
      'bible-texts-tab',
      expect.objectContaining({ bringToFront: true }),
    );
    expect(selectionSeenByProvider).toBe('dbl:uid-byz');
  });

  it('leaves the tab on whichever project it shows when the reload lands', async () => {
    // A project switch during the show reloads the tab onto the new project first.
    await showResourceInReferencePanel('byz-project');

    expect(mocks.reloadWebView.mock.calls[0][2]).not.toHaveProperty('projectId');
  });

  it('sends a commentary to the Commentaries tab', async () => {
    catalogHas([catalogEntry({ type: 'CommentaryResource' })]);

    await expect(showResourceInReferencePanel('byz-project')).resolves.toBe('commentaries-tab');

    expect(mocks.reloadWebView).toHaveBeenCalledWith(
      COMMENTARIES,
      'commentaries-tab',
      expect.objectContaining({ bringToFront: true }),
    );
  });

  it('puts the resource first, without duplicating it, in a list that already has it', async () => {
    savedUserList = {
      dataVersion: '1',
      items: [
        { type: 'dblResource', name: 'Other', id: 'uid-other' },
        { type: 'dblResource', name: 'BYZ', id: 'uid-byz' },
      ],
    };

    await showResourceInReferencePanel('byz-project');

    expect(savedUserList.items).toEqual([
      { type: 'dblResource', name: 'BYZ', id: 'uid-byz' },
      { type: 'dblResource', name: 'Other', id: 'uid-other' },
    ]);
  });

  it('stores a locally-installed non-DBL resource as a project reference', async () => {
    catalogHas(
      [],
      [catalogEntry({ dblEntryUid: 'VULGP83', projectId: 'VULGP83', displayName: 'VULGP83' })],
    );

    await showResourceInReferencePanel('VULGP83');

    expect(savedUserList?.items).toEqual([{ type: 'project', name: 'VULGP83', id: 'VULGP83' }]);
    expect(selectionSeenByProvider).toBe('project:VULGP83');
  });

  it('lists a resource the catalog does not have as a project, named from its metadata', async () => {
    mocks.getMetadataForProject.mockResolvedValue({ id: 'local-1', name: 'LOCAL' });

    await expect(showResourceInReferencePanel('local-1')).resolves.toBe('bible-texts-tab');

    expect(savedUserList?.items).toEqual([{ type: 'project', name: 'LOCAL', id: 'local-1' }]);
    expect(selectionSeenByProvider).toBe('project:local-1');
  });

  /** The catalog as it answers before it has loaded, or in a build with no DBL access at all. */
  function catalogUnavailable(
    reason: 'notReady' | 'notConfigured',
    localEntries: DblResourceData[],
  ) {
    mocks.sendCommand.mockImplementation(async (command: string) => {
      if (command === 'platformGetResources.getCachedResources')
        return { status: 'unavailable', reason };
      // Built without the catalog, so a DBL resource comes back here as a non-DBL one.
      if (command === 'platformGetResources.getLocalNonDblResources') return localEntries;
      return undefined;
    });
  }
  const BYZ_AS_LOCAL = catalogEntry({ dblEntryUid: 'byz-project', displayName: 'BYZ' });

  it('shows but does not save a resource while the catalog has not loaded', async () => {
    // Saved now, BYZ would be identified by its project, and once added properly by its DBL entry
    // it would be listed twice.
    catalogUnavailable('notReady', [BYZ_AS_LOCAL]);

    await expect(showResourceInReferencePanel('byz-project')).resolves.toBe('bible-texts-tab');

    expect(mocks.setUserList).not.toHaveBeenCalled();
    expect(selectionSeenByProvider).toBe('project:byz-project');
  });

  it('shows but does not save a resource when the catalog cannot be read', async () => {
    mocks.sendCommand.mockImplementation(async (command: string) => {
      if (command === 'platformGetResources.getCachedResources') throw new Error('catalog offline');
      if (command === 'platformGetResources.getLocalNonDblResources') return [BYZ_AS_LOCAL];
      return undefined;
    });

    await expect(showResourceInReferencePanel('byz-project')).resolves.toBe('bible-texts-tab');

    expect(mocks.setUserList).not.toHaveBeenCalled();
    expect(selectionSeenByProvider).toBe('project:byz-project');
  });

  it('saves a resource by its project in a build with no DBL catalog', async () => {
    catalogUnavailable('notConfigured', [BYZ_AS_LOCAL]);

    await showResourceInReferencePanel('byz-project');

    expect(savedUserList?.items).toEqual([{ type: 'project', name: 'BYZ', id: 'byz-project' }]);
  });

  it('reads the catalog only once the installed flags are up to date', async () => {
    let finishRefresh: () => void = () => {};
    const commands: string[] = [];
    mocks.sendCommand.mockImplementation(async (command: string) => {
      commands.push(command);
      if (command === 'platformGetResources.refreshResourceFlags')
        return new Promise<void>((resolve) => {
          finishRefresh = resolve;
        });
      if (command === 'platformGetResources.getCachedResources')
        return { status: 'available', resources: [catalogEntry({})] };
      return [];
    });

    const show = showResourceInReferencePanel('byz-project');
    await vi.waitFor(() => expect(commands).toContain('platformGetResources.refreshResourceFlags'));
    expect(commands).not.toContain('platformGetResources.getCachedResources');
    finishRefresh();

    await expect(show).resolves.toBe('bible-texts-tab');
  });

  it("selects the team's own copy, without saving another, when the team already has it", async () => {
    // The team list may spell a DBL entry UID in other casing than the catalog does.
    teamList = { dataVersion: '1', items: [{ type: 'dblResource', name: 'BYZ', id: 'UID-BYZ' }] };

    await showResourceInReferencePanel('byz-project');

    expect(mocks.setUserList).not.toHaveBeenCalled();
    expect(selectionSeenByProvider).toBe('dbl:UID-BYZ');
  });

  it("selects the team's copy when the team names the resource by its project", async () => {
    teamList = {
      dataVersion: '1',
      items: [{ type: 'project', name: 'BYZ', id: 'byz-project' }],
    };

    await showResourceInReferencePanel('byz-project');

    expect(mocks.setUserList).not.toHaveBeenCalled();
    expect(selectionSeenByProvider).toBe('project:byz-project');
  });

  it("ignores a malformed item in the team's list", async () => {
    // The team list arrives through send/receive unvalidated.
    teamList = JSON.parse(
      '{ "dataVersion": "1", "items": [null, "text", { "type": "dblResource", "name": "Bad", "id": 7 }] }',
    );

    await expect(showResourceInReferencePanel('byz-project')).resolves.toBe('bible-texts-tab');

    expect(savedUserList?.items).toEqual([{ type: 'dblResource', name: 'BYZ', id: 'uid-byz' }]);
  });

  it("replaces the user's copy of a resource spelled in other casing", async () => {
    savedUserList = {
      dataVersion: '1',
      items: [{ type: 'dblResource', name: 'BYZ', id: 'UID-BYZ' }],
    };

    await showResourceInReferencePanel('byz-project');

    expect(savedUserList.items).toEqual([{ type: 'dblResource', name: 'BYZ', id: 'uid-byz' }]);
  });

  it('still shows the resource when the personal list cannot be saved', async () => {
    mocks.setUserList.mockRejectedValue(new Error('read-only settings'));

    await expect(showResourceInReferencePanel('byz-project')).resolves.toBe('bible-texts-tab');

    expect(selectionSeenByProvider).toBe('dbl:uid-byz');
    expect(mocks.warn).toHaveBeenCalled();
  });

  it('does nothing when no tab is showing a project, and says so by resolving empty', async () => {
    mocks.getAllOpenWebViewDefinitions.mockResolvedValue([
      { id: 'bible-texts-tab', webViewType: BIBLE_TEXTS, projectId: undefined },
    ]);

    await expect(showResourceInReferencePanel('byz-project')).resolves.toBeUndefined();

    expect(mocks.setUserList).not.toHaveBeenCalled();
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
  });

  it('tells the user and rejects when only the other reference tab shows a project', async () => {
    // Not the no-project case, so opening the resource some other way would replace the project.
    mocks.getAllOpenWebViewDefinitions.mockResolvedValue([OPEN_PANELS[1]]);

    await expect(showResourceInReferencePanel('byz-project')).rejects.toThrow();

    expect(mocks.notify).toHaveBeenCalled();
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
  });

  it('answers that no project is open without waiting on the catalog', async () => {
    mocks.getAllOpenWebViewDefinitions.mockResolvedValue([
      { id: 'bible-texts-tab', webViewType: BIBLE_TEXTS, projectId: undefined },
      { id: 'commentaries-tab', webViewType: COMMENTARIES, projectId: undefined },
    ]);

    await expect(showResourceInReferencePanel('byz-project')).resolves.toBeUndefined();

    expect(mocks.sendCommand).not.toHaveBeenCalled();
  });

  it('tells the user and rejects when the tab closes before it can be shown', async () => {
    mocks.reloadWebView.mockResolvedValue(undefined);

    await expect(showResourceInReferencePanel('byz-project')).rejects.toThrow();

    expect(mocks.notify).toHaveBeenCalledWith(expect.objectContaining({ severity: 'warning' }));
  });

  it('tells the user and rejects when the open tabs cannot be listed', async () => {
    mocks.getAllOpenWebViewDefinitions.mockRejectedValue(new Error('window unreachable'));

    await expect(showResourceInReferencePanel('byz-project')).rejects.toThrow();

    expect(mocks.notify).toHaveBeenCalled();
    expect(mocks.setUserList).not.toHaveBeenCalled();
  });

  it('leaves a kind of resource neither tab lists to be opened some other way', async () => {
    // A source-language text, say: it opens in its own viewer, as it always has.
    catalogHas([catalogEntry({ type: 'SourceLanguageResource' })]);

    await expect(showResourceInReferencePanel('byz-project')).resolves.toBeUndefined();

    expect(mocks.notify).not.toHaveBeenCalled();
    expect(mocks.setUserList).not.toHaveBeenCalled();
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
  });

  it('tells the user about an unexpected failure too', async () => {
    mocks.getAllOpenWebViewDefinitions.mockResolvedValue(undefined);

    await expect(showResourceInReferencePanel('byz-project')).rejects.toThrow();

    expect(mocks.notify).toHaveBeenCalledTimes(1);
  });

  it('tells the user only once for an expected failure', async () => {
    mocks.reloadWebView.mockRejectedValue(new Error('reload failed'));

    await expect(showResourceInReferencePanel('byz-project')).rejects.toThrow();

    expect(mocks.notify).toHaveBeenCalledTimes(1);
  });

  it('still shows resources after a show has failed', async () => {
    mocks.reloadWebView.mockRejectedValueOnce(new Error('reload failed'));

    await expect(showResourceInReferencePanel('byz-project')).rejects.toThrow();
    await expect(showResourceInReferencePanel('byz-project')).resolves.toBe('bible-texts-tab');

    expect(selectionSeenByProvider).toBe('dbl:uid-byz');
  });

  it('still shows the resource when the installed flags cannot be refreshed', async () => {
    mocks.sendCommand.mockImplementation(async (command: string) => {
      if (command === 'platformGetResources.refreshResourceFlags') throw new Error('sync failed');
      if (command === 'platformGetResources.getCachedResources')
        return { status: 'available', resources: [catalogEntry({})] };
      return [];
    });

    await expect(showResourceInReferencePanel('byz-project')).resolves.toBe('bible-texts-tab');

    expect(selectionSeenByProvider).toBe('dbl:uid-byz');
  });

  it("shows but does not save a resource when the team's list cannot be read", async () => {
    // Saved blind, it could be a second copy of the team's own reference to it.
    mocks.getPdp.mockImplementation(async (projectInterface: string) => {
      if (projectInterface === 'platform.base') throw new Error('settings unavailable');
      return {
        getUserReferencedProjectsAndResources: mocks.getUserList,
        setUserReferencedProjectsAndResources: mocks.setUserList,
      };
    });

    await expect(showResourceInReferencePanel('byz-project')).resolves.toBe('bible-texts-tab');

    expect(mocks.setUserList).not.toHaveBeenCalled();
    expect(selectionSeenByProvider).toBe('dbl:uid-byz');
  });

  it("tells the user and opens nothing when an uncatalogued resource's kind cannot be told", async () => {
    // It may be a non-DBL commentary: guessed to be a Bible text, the Bible texts tab could not list
    // it and would show an unrelated text in its place.
    mocks.sendCommand.mockImplementation(async (command: string) => {
      if (command === 'platformGetResources.getCachedResources')
        return { status: 'available', resources: [] };
      if (command === 'platformGetResources.getLocalNonDblResources')
        throw new Error('local list unavailable');
      return undefined;
    });
    mocks.getMetadataForProject.mockResolvedValue({ id: 'local-1', name: 'LOCAL' });

    await expect(showResourceInReferencePanel('local-1')).rejects.toThrow();

    expect(mocks.notify).toHaveBeenCalledTimes(1);
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
    expect(mocks.setUserList).not.toHaveBeenCalled();
  });

  it('shows the later of two quick opens, and saves both', async () => {
    catalogHas([
      catalogEntry({}),
      catalogEntry({ dblEntryUid: 'uid-web', displayName: 'WEBBE', projectId: 'web-project' }),
    ]);
    const selections: unknown[] = [];
    mocks.reloadWebView.mockImplementation(
      async (_webViewType: string, id: string, options: ResourceTextPanelOptions) => {
        // Let the other open run as far as it can before this build reads its selection.
        await new Promise((resolve) => {
          setTimeout(resolve, 0);
        });
        selections.push(providerSelection(options));
        return id;
      },
    );

    await Promise.all([
      showResourceInReferencePanel('byz-project'),
      showResourceInReferencePanel('web-project'),
    ]);

    expect(selections).toEqual(['dbl:uid-byz', 'dbl:uid-web']);
    expect(savedUserList?.items.map((item) => ('id' in item ? item.id : undefined))).toEqual([
      'uid-web',
      'uid-byz',
    ]);
  });
});

describe('buildResourceTextPanelState', () => {
  it('selects the resource a reload asks for, keeping the rest of the saved state', () => {
    expect(
      buildResourceTextPanelState(
        { selectedResourceId: 'dbl:previous', other: 'kept' },
        'CommentaryResource',
        { selectedResourceId: 'dbl:uid-byz' },
      ),
    ).toEqual({
      selectedResourceId: 'dbl:uid-byz',
      other: 'kept',
      resourceType: 'CommentaryResource',
    });
  });

  it('keeps the saved selection when the build asks for none', () => {
    // An ordinary rebuild — a project switch, a layout restore — must not lose the user's pick.
    expect(
      buildResourceTextPanelState({ selectedResourceId: 'dbl:previous' }, 'ScriptureResource', {}),
    ).toEqual({ selectedResourceId: 'dbl:previous', resourceType: 'ScriptureResource' });
  });
});
