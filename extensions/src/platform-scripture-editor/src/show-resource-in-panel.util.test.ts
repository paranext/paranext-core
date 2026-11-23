import type { ResourceReferenceList } from 'platform-scripture';
import type { DblResourceData } from 'platform-bible-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  sendCommand: vi.fn(),
  getAllOpenWebViewDefinitions: vi.fn(),
  reloadWebView: vi.fn(),
  openWebView: vi.fn(),
  getMetadataForProject: vi.fn(),
  getPdp: vi.fn(),
  getUserList: vi.fn(),
  setUserList: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  notify: vi.fn(async () => 'notification-1'),
  getSetting: vi.fn(),
  setSetting: vi.fn(),
}));
vi.mock('@papi/backend', () => ({
  default: {
    commands: { sendCommand: mocks.sendCommand },
    webViews: {
      getAllOpenWebViewDefinitions: mocks.getAllOpenWebViewDefinitions,
      reloadWebView: mocks.reloadWebView,
      openWebView: mocks.openWebView,
    },
    projectLookup: { getMetadataForProject: mocks.getMetadataForProject },
    projectDataProviders: { get: mocks.getPdp },
    notifications: { send: mocks.notify },
    localization: { getLocalizedString: vi.fn(async () => "That tab couldn't be opened.") },
    settings: { get: mocks.getSetting, set: mocks.setSetting },
  },
  logger: { warn: mocks.warn, debug: vi.fn(), info: vi.fn(), error: mocks.error },
}));

// vi.mock must appear before the imports it mocks so Vitest can hoist it; eslint's import/first
// rule cannot model this Vitest-specific hoisting requirement.
// eslint-disable-next-line import/first
import {
  showResourceInReferencePanel,
  buildResourceTextPanelState,
  SHOW_DEADLINE_MS,
  type ResourceTextPanelOptions,
} from './show-resource-in-panel.util';
// Follows the vi.mock calls for the same reason as the import above.
// eslint-disable-next-line import/first
import { getStoredResourceSelection } from './resource-selection-store';
// Follows the vi.mock calls for the same reason as the import above.
// eslint-disable-next-line import/first
import type { ResourceSelectionsByPanel } from './resource-selection-state.utils';

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

const SHOWN_IN_BIBLE_TEXTS = { status: 'shown', webViewId: 'bible-texts-tab' };
const NOT_SHOWN = { status: 'notShown' };
const OPEN_ELSEWHERE = { status: 'openElsewhere' };

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

/** The value of the resource selection setting, as the settings service holds it */
let storedSelections: ResourceSelectionsByPanel;

/** Answers the resource selection setting from {@link storedSelections}. */
function settingsHoldSelections(initial: ResourceSelectionsByPanel) {
  storedSelections = initial;
  mocks.getSetting.mockImplementation(async () => storedSelections);
  mocks.setSetting.mockImplementation(async (_key: string, value: ResourceSelectionsByPanel) => {
    storedSelections = value;
  });
}

/** The selection the provider would apply when the reload asks it to build the panel. */
let selectionSeenByProvider: unknown;

/** The selection the panel is built with, given the reload's options and an earlier selection. */
async function providerSelection(options: ResourceTextPanelOptions): Promise<unknown> {
  await buildResourceTextPanelState({}, 'my-project', 'ScriptureResource', options);
  return (await getStoredResourceSelection('ScriptureResource', 'my-project')).selectedResourceId;
}

describe('showResourceInReferencePanel', () => {
  let savedUserList: ResourceReferenceList | undefined;
  let teamList: ResourceReferenceList | undefined;
  /** Whether the project the panels show is a published resource rather than a project. */
  let isPanelProjectPublished: boolean;

  beforeEach(() => {
    vi.resetAllMocks();
    savedUserList = undefined;
    selectionSeenByProvider = undefined;
    settingsHoldSelections({
      ScriptureResource: { 'my-project': { selectedResourceId: 'dbl:previous' } },
    });
    catalogHas([catalogEntry({})]);
    mocks.getAllOpenWebViewDefinitions.mockResolvedValue(OPEN_PANELS);
    mocks.getUserList.mockImplementation(async () => savedUserList);
    mocks.setUserList.mockImplementation(async (list: ResourceReferenceList) => {
      savedUserList = list;
      return true;
    });
    teamList = undefined;
    isPanelProjectPublished = false;
    mocks.getPdp.mockImplementation(async (projectInterface: string) =>
      projectInterface === 'platform.base'
        ? {
            getSetting: async (key: string) =>
              key === 'platform.isPublished' ? isPanelProjectPublished : teamList,
          }
        : {
            getUserReferencedProjectsAndResources: mocks.getUserList,
            setUserReferencedProjectsAndResources: mocks.setUserList,
          },
    );
    mocks.reloadWebView.mockImplementation(
      async (_webViewType: string, id: string, options: ResourceTextPanelOptions) => {
        selectionSeenByProvider = await providerSelection(options);
        return id;
      },
    );
  });

  it("adds a Bible text to the user's own list and selects it in Bible texts", async () => {
    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(
      SHOWN_IN_BIBLE_TEXTS,
    );

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

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual({
      status: 'shown',
      webViewId: 'commentaries-tab',
    });

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

    await expect(showResourceInReferencePanel('local-1')).resolves.toEqual(SHOWN_IN_BIBLE_TEXTS);

    expect(savedUserList?.items).toEqual([{ type: 'project', name: 'LOCAL', id: 'local-1' }]);
    expect(selectionSeenByProvider).toBe('project:local-1');
  });

  it('tells the user and saves nothing for an id no local project has', async () => {
    mocks.getMetadataForProject.mockRejectedValue(new Error('no project with id not-a-project'));

    await expect(showResourceInReferencePanel('not-a-project')).resolves.toEqual(NOT_SHOWN);

    expect(mocks.notify).toHaveBeenCalledWith(expect.objectContaining({ severity: 'warning' }));
    expect(mocks.setUserList).not.toHaveBeenCalled();
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
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

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(
      SHOWN_IN_BIBLE_TEXTS,
    );

    expect(mocks.setUserList).not.toHaveBeenCalled();
    expect(selectionSeenByProvider).toBe('project:byz-project');
  });

  it('shows but does not save a resource when the catalog cannot be read', async () => {
    mocks.sendCommand.mockImplementation(async (command: string) => {
      if (command === 'platformGetResources.getCachedResources') throw new Error('catalog offline');
      if (command === 'platformGetResources.getLocalNonDblResources') return [BYZ_AS_LOCAL];
      return undefined;
    });

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(
      SHOWN_IN_BIBLE_TEXTS,
    );

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

    await expect(show).resolves.toEqual(SHOWN_IN_BIBLE_TEXTS);
  });

  it('shows but does not save a resource when the tab is showing another resource', async () => {
    // Simple mode's reference tabs follow the middle column, which may show a resource opened in
    // its viewer: a list saved there would belong to that resource, not to any project.
    isPanelProjectPublished = true;

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(
      SHOWN_IN_BIBLE_TEXTS,
    );

    expect(mocks.setUserList).not.toHaveBeenCalled();
    expect(selectionSeenByProvider).toBe('dbl:uid-byz');
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

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(
      SHOWN_IN_BIBLE_TEXTS,
    );

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

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(
      SHOWN_IN_BIBLE_TEXTS,
    );

    expect(selectionSeenByProvider).toBe('dbl:uid-byz');
    expect(mocks.warn).toHaveBeenCalled();
  });

  it('shows the resource in its tab, unsaved, when no project is open', async () => {
    // Resources never open in the middle column; with no project there is just no list to add to.
    mocks.getAllOpenWebViewDefinitions.mockResolvedValue([
      { id: 'bible-texts-tab', webViewType: BIBLE_TEXTS, projectId: undefined },
      { id: 'commentaries-tab', webViewType: COMMENTARIES, projectId: undefined },
    ]);

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(
      SHOWN_IN_BIBLE_TEXTS,
    );

    expect(mocks.getPdp).not.toHaveBeenCalled();
    expect(mocks.setUserList).not.toHaveBeenCalled();
    expect(selectionSeenByProvider).toBe('dbl:uid-byz');
  });

  it('tells the user when the tab for its kind is not open', async () => {
    // Opening the resource some other way would put it in the middle column, where it never goes.
    mocks.getAllOpenWebViewDefinitions.mockResolvedValue([OPEN_PANELS[1]]);

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(NOT_SHOWN);

    expect(mocks.notify).toHaveBeenCalled();
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
  });

  it('answers that there is no reference tab without waiting on the catalog', async () => {
    mocks.getAllOpenWebViewDefinitions.mockResolvedValue([]);

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(OPEN_ELSEWHERE);

    expect(mocks.sendCommand).not.toHaveBeenCalled();
  });

  it('tells the user when the tab closes before it can be shown', async () => {
    mocks.reloadWebView.mockResolvedValue(undefined);

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(NOT_SHOWN);

    expect(mocks.notify).toHaveBeenCalledWith(expect.objectContaining({ severity: 'warning' }));
  });

  it('tells the user when the open tabs cannot be listed', async () => {
    mocks.getAllOpenWebViewDefinitions.mockRejectedValue(new Error('window unreachable'));

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(NOT_SHOWN);

    expect(mocks.notify).toHaveBeenCalled();
    expect(mocks.setUserList).not.toHaveBeenCalled();
  });

  it('leaves a kind of resource neither tab lists to be opened some other way', async () => {
    // A source-language text, say: it opens in its own viewer, as it always has.
    catalogHas([catalogEntry({ type: 'SourceLanguageResource' })]);

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(OPEN_ELSEWHERE);

    expect(mocks.notify).not.toHaveBeenCalled();
    expect(mocks.setUserList).not.toHaveBeenCalled();
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
  });

  it('tells the user about an unexpected failure too', async () => {
    mocks.getAllOpenWebViewDefinitions.mockResolvedValue(undefined);

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(NOT_SHOWN);

    expect(mocks.notify).toHaveBeenCalledTimes(1);
  });

  it('tells the user only once for an expected failure', async () => {
    mocks.reloadWebView.mockRejectedValue(new Error('reload failed'));

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(NOT_SHOWN);

    expect(mocks.notify).toHaveBeenCalledTimes(1);
  });

  it('still shows resources after a show has failed', async () => {
    mocks.reloadWebView.mockRejectedValueOnce(new Error('reload failed'));

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(NOT_SHOWN);
    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(
      SHOWN_IN_BIBLE_TEXTS,
    );

    expect(selectionSeenByProvider).toBe('dbl:uid-byz');
  });

  it('still shows the resource when the installed flags cannot be refreshed', async () => {
    mocks.sendCommand.mockImplementation(async (command: string) => {
      if (command === 'platformGetResources.refreshResourceFlags') throw new Error('sync failed');
      if (command === 'platformGetResources.getCachedResources')
        return { status: 'available', resources: [catalogEntry({})] };
      return [];
    });

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(
      SHOWN_IN_BIBLE_TEXTS,
    );

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

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(
      SHOWN_IN_BIBLE_TEXTS,
    );

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

    await expect(showResourceInReferencePanel('local-1')).resolves.toEqual(NOT_SHOWN);

    expect(mocks.notify).toHaveBeenCalledTimes(1);
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
    expect(mocks.setUserList).not.toHaveBeenCalled();
  });

  it("keeps the rest of the user's earlier copy, such as its Text collection flag", async () => {
    // Opening a resource moves it to the front of the user's list; it must not also drop it from
    // their Text collection.
    savedUserList = {
      dataVersion: '1',
      items: [{ type: 'dblResource', name: 'BYZ', id: 'uid-byz', isInTextCollectionForUser: true }],
    };

    await showResourceInReferencePanel('byz-project');

    expect(savedUserList.items).toEqual([
      { type: 'dblResource', name: 'BYZ', id: 'uid-byz', isInTextCollectionForUser: true },
    ]);
  });

  it("replaces the user's copy that names the resource by its project", async () => {
    // Named by its project when it was picked before the catalog had loaded; kept, the tab would
    // list the resource twice.
    savedUserList = {
      dataVersion: '1',
      items: [{ type: 'project', name: 'BYZ', id: 'byz-project', isInTextCollectionForUser: true }],
    };

    await showResourceInReferencePanel('byz-project');

    expect(savedUserList.items).toEqual([
      { type: 'dblResource', name: 'BYZ', id: 'uid-byz', isInTextCollectionForUser: true },
    ]);
  });

  it('reads the locally-installed resources only when the catalog does not cover the resource', async () => {
    await showResourceInReferencePanel('byz-project');

    const commands = mocks.sendCommand.mock.calls.map((call: unknown[]) => call[0]);
    expect(commands).not.toContain('platformGetResources.getLocalNonDblResources');
  });

  it('raises the tab, without reloading it, when it already shows the resource', async () => {
    // A reload would lose the tab's scroll position and anything in progress in it.
    settingsHoldSelections({
      ScriptureResource: { 'my-project': { selectedResourceId: 'dbl:uid-byz' } },
    });
    mocks.openWebView.mockResolvedValue('bible-texts-tab');

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(
      SHOWN_IN_BIBLE_TEXTS,
    );

    expect(mocks.reloadWebView).not.toHaveBeenCalled();
    expect(mocks.openWebView).toHaveBeenCalledWith(
      BIBLE_TEXTS,
      undefined,
      expect.objectContaining({ existingId: 'bible-texts-tab', bringToFront: true }),
    );
  });

  it('reloads the tab when it shows the resource only for another project', async () => {
    settingsHoldSelections({
      ScriptureResource: { 'other-project': { selectedResourceId: 'dbl:uid-byz' } },
    });

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(
      SHOWN_IN_BIBLE_TEXTS,
    );

    expect(mocks.reloadWebView).toHaveBeenCalledWith(
      BIBLE_TEXTS,
      'bible-texts-tab',
      expect.objectContaining({ selectedResourceId: 'dbl:uid-byz' }),
    );
  });

  it("shows but does not save a resource when the tab's project cannot be told apart", async () => {
    // Whether the tab shows a project or a resource is unknown, so the list may not be a project's.
    mocks.getPdp.mockImplementation(async (projectInterface: string) =>
      projectInterface === 'platform.base'
        ? {
            getSetting: async (key: string) => {
              if (key === 'platform.isPublished') throw new Error('setting unavailable');
              return teamList;
            },
          }
        : {
            getUserReferencedProjectsAndResources: mocks.getUserList,
            setUserReferencedProjectsAndResources: mocks.setUserList,
          },
    );

    await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(
      SHOWN_IN_BIBLE_TEXTS,
    );

    expect(mocks.setUserList).not.toHaveBeenCalled();
  });

  describe('when a show takes too long', () => {
    // A caller waits at most PAPI's request timeout. Past the deadline it has been answered, so the
    // show must not then go on to save or change the tab behind the user's back.

    /** Releases for the steps these tests hold up. */
    let held: (() => void)[] = [];
    /** A step that waits until {@link releaseHeld} lets it finish. */
    const holdUntilReleased = <T>(value: T) =>
      new Promise<T>((resolve) => {
        held.push(() => resolve(value));
      });
    /** Lets every held step finish, and lets the shows behind them run as far as they go. */
    async function releaseHeld() {
      while (held.length > 0) {
        const releases = held;
        held = [];
        releases.forEach((release) => release());
        // A released show may reach a step that is held in turn, as the next show in the queue does.
        // eslint-disable-next-line no-await-in-loop
        await vi.runAllTimersAsync();
      }
    }

    beforeEach(() => {
      vi.useFakeTimers();
      held = [];
      const catalogAnswer = mocks.sendCommand.getMockImplementation();
      mocks.sendCommand.mockImplementation(async (command: string, ...args: unknown[]) => {
        if (command === 'platformGetResources.refreshResourceFlags')
          return holdUntilReleased(undefined);
        return catalogAnswer?.(command, ...args);
      });
    });
    // The show queue is shared by every test in this file. Released here rather than in each test,
    // so a test that fails before its own release cannot leave the next one queued behind it.
    afterEach(async () => {
      await releaseHeld();
      vi.useRealTimers();
    });

    it('gives up, tells the user once, and then neither saves nor shows it', async () => {
      const show = showResourceInReferencePanel('byz-project');

      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS);
      await expect(show).resolves.toEqual(NOT_SHOWN);
      expect(mocks.notify).toHaveBeenCalledTimes(1);

      await releaseHeld();
      expect(mocks.setUserList).not.toHaveBeenCalled();
      expect(mocks.reloadWebView).not.toHaveBeenCalled();
      expect(mocks.notify).toHaveBeenCalledTimes(1);
    });

    it('counts the time a show waits behind another one', async () => {
      const first = showResourceInReferencePanel('byz-project');
      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS / 2);
      const second = showResourceInReferencePanel('byz-project');

      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS);

      await expect(first).resolves.toEqual(NOT_SHOWN);
      await expect(second).resolves.toEqual(NOT_SHOWN);
      await releaseHeld();
      expect(mocks.reloadWebView).not.toHaveBeenCalled();
    });

    it('finishes a show that had started saving when the deadline passed', async () => {
      mocks.setUserList.mockImplementation(() => holdUntilReleased(true));
      const show = showResourceInReferencePanel('byz-project');
      await vi.advanceTimersByTimeAsync(0);
      // Releases the refresh; the show then runs on until it is held saving.
      held.splice(0).forEach((release) => release());
      await vi.advanceTimersByTimeAsync(0);
      expect(mocks.setUserList).toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS);
      await releaseHeld();

      await expect(show).resolves.toEqual(SHOWN_IN_BIBLE_TEXTS);
      expect(mocks.notify).not.toHaveBeenCalled();
    });

    it('lets a retry run without waiting for the show that ran out of time', async () => {
      // The user is told to try again; the retry must not be held behind the stuck show.
      const first = showResourceInReferencePanel('byz-project');
      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS);
      await expect(first).resolves.toEqual(NOT_SHOWN);

      const catalogAnswer = mocks.sendCommand.getMockImplementation();
      mocks.sendCommand.mockImplementation(async (command: string, ...args: unknown[]) =>
        command === 'platformGetResources.refreshResourceFlags'
          ? undefined
          : catalogAnswer?.(command, ...args),
      );
      const retry = showResourceInReferencePanel('byz-project');
      await vi.advanceTimersByTimeAsync(0);

      // The first show is still held, and the retry has shown the resource regardless.
      expect(held.length).toBeGreaterThan(0);
      await expect(retry).resolves.toEqual(SHOWN_IN_BIBLE_TEXTS);
      expect(mocks.notify).toHaveBeenCalledTimes(1);
    });

    it('skips a show whose time ran out while it waited its turn', async () => {
      mocks.setUserList.mockImplementation(() => holdUntilReleased(true));
      const first = showResourceInReferencePanel('byz-project');
      await vi.advanceTimersByTimeAsync(0);
      held.splice(0).forEach((release) => release());
      await vi.advanceTimersByTimeAsync(0);
      // The first show is saving, so the second waits behind it until its own time runs out.
      const second = showResourceInReferencePanel('byz-project');
      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS);
      await expect(second).resolves.toEqual(NOT_SHOWN);

      await releaseHeld();
      await expect(first).resolves.toEqual(SHOWN_IN_BIBLE_TEXTS);
      expect(mocks.reloadWebView).toHaveBeenCalledTimes(1);
      expect(mocks.notify).toHaveBeenCalledTimes(1);
      // Not even started: only the first show looked for the tabs.
      expect(mocks.getAllOpenWebViewDefinitions).toHaveBeenCalledTimes(1);
    });

    it('does not warn later about a show that already ended', async () => {
      mocks.getAllOpenWebViewDefinitions.mockResolvedValue([]);
      await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(OPEN_ELSEWHERE);

      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS * 2);

      expect(mocks.notify).not.toHaveBeenCalled();
    });

    it('warns once, not again at the deadline, about a show that already failed', async () => {
      mocks.getAllOpenWebViewDefinitions.mockRejectedValue(new Error('window unreachable'));
      await expect(showResourceInReferencePanel('byz-project')).resolves.toEqual(NOT_SHOWN);

      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS * 2);

      expect(mocks.notify).toHaveBeenCalledTimes(1);
    });

    it('stays quiet when a show it gave up on fails later', async () => {
      // Released after the deadline, the kind can't be told: the show fails, but the user has been
      // told already.
      mocks.sendCommand.mockImplementation(async (command: string) => {
        if (command === 'platformGetResources.refreshResourceFlags')
          return holdUntilReleased(undefined);
        if (command === 'platformGetResources.getCachedResources')
          return { status: 'available', resources: [] };
        throw new Error('local list unavailable');
      });
      const show = showResourceInReferencePanel('local-1');
      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS);
      await expect(show).resolves.toEqual(NOT_SHOWN);

      await releaseHeld();

      expect(mocks.notify).toHaveBeenCalledTimes(1);
      expect(mocks.reloadWebView).not.toHaveBeenCalled();
    });

    it('logs, without warning again, an unexpected error in a show it gave up on', async () => {
      mocks.sendCommand.mockImplementation(async (command: string) => {
        if (command === 'platformGetResources.refreshResourceFlags')
          return holdUntilReleased(undefined);
        // Malformed: reading it throws a TypeError, a bug rather than an expected failure.
        if (command === 'platformGetResources.getCachedResources')
          return { status: 'available', resources: undefined };
        return [];
      });
      const show = showResourceInReferencePanel('byz-project');
      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS);
      await expect(show).resolves.toEqual(NOT_SHOWN);

      await releaseHeld();

      expect(mocks.error).toHaveBeenCalledWith(expect.stringContaining('byz-project'));
      expect(mocks.notify).toHaveBeenCalledTimes(1);
    });

    it('waits for a show that committed, even once the show between them was abandoned', async () => {
      // Two shows saving at once would race over the same personal list.
      mocks.setUserList.mockImplementation(() => holdUntilReleased(true));
      // The first show selects the resource, so the third finds the tab showing it and raises it.
      mocks.openWebView.mockResolvedValue('bible-texts-tab');
      const first = showResourceInReferencePanel('byz-project');
      await vi.advanceTimersByTimeAsync(0);
      held.splice(0).forEach((release) => release());
      await vi.advanceTimersByTimeAsync(0);
      expect(mocks.setUserList).toHaveBeenCalledTimes(1);
      const second = showResourceInReferencePanel('byz-project');
      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS);
      await expect(second).resolves.toEqual(NOT_SHOWN);

      const third = showResourceInReferencePanel('byz-project');
      await vi.advanceTimersByTimeAsync(0);

      // The first is still saving, so the third has not started.
      expect(mocks.getAllOpenWebViewDefinitions).toHaveBeenCalledTimes(1);
      // Released step by step, within the third's own deadline: the first finishes saving, then the
      // third reaches its own held steps in turn.
      for (let step = 0; step < 4; step += 1) {
        held.splice(0).forEach((release) => release());
        // Each step lets the shows run on to their next hold, so the steps cannot overlap.
        // eslint-disable-next-line no-await-in-loop
        await vi.advanceTimersByTimeAsync(0);
      }
      await expect(first).resolves.toEqual(SHOWN_IN_BIBLE_TEXTS);
      await expect(third).resolves.toEqual(SHOWN_IN_BIBLE_TEXTS);
    });

    it('shows a side-loaded resource, unsaved, while the catalog is still being fetched', async () => {
      // A profile with no catalog cached yet: the read queues behind the startup fetch, which may
      // not finish before the show's deadline.
      mocks.sendCommand.mockImplementation(async (command: string) => {
        if (command === 'platformGetResources.getCachedResources') return new Promise(() => {});
        if (command === 'platformGetResources.getLocalNonDblResources')
          return [
            catalogEntry({ dblEntryUid: 'VULGP83', projectId: 'VULGP83', displayName: 'VULGP83' }),
          ];
        return undefined;
      });
      const show = showResourceInReferencePanel('VULGP83');

      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS / 2);

      await expect(show).resolves.toEqual(SHOWN_IN_BIBLE_TEXTS);
      expect(mocks.setUserList).not.toHaveBeenCalled();
      expect(mocks.notify).not.toHaveBeenCalled();
      // Having given up on the catalog once, it does not wait for it a second time.
      expect(mocks.sendCommand).toHaveBeenCalledWith(
        'platformGetResources.getLocalNonDblResources',
        false,
        0,
      );
    });

    it("bounds the locally-installed list's wait for the catalog", async () => {
      // Waiting in full is for callers listing it beside the catalog, not for a lookup.
      catalogHas(
        [],
        [catalogEntry({ dblEntryUid: 'VULGP83', projectId: 'VULGP83', displayName: 'VULGP83' })],
      );

      await expect(showResourceInReferencePanel('VULGP83')).resolves.toEqual(SHOWN_IN_BIBLE_TEXTS);

      const localListCall = mocks.sendCommand.mock.calls.find(
        ([command]) => command === 'platformGetResources.getLocalNonDblResources',
      );
      expect(localListCall?.[2]).toBeGreaterThan(0);
    });

    it('answers, and lets the next show start, without waiting for its warning to be sent', async () => {
      // The warning invites a retry, which must not be held behind the warning itself.
      mocks.notify.mockImplementation(() => holdUntilReleased('notification-1'));
      const first = showResourceInReferencePanel('byz-project');

      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS);

      // The deadline's warning is still held: an answer that waited for it would never come.
      await expect(first).resolves.toEqual(NOT_SHOWN);

      // The retry the warning invites, made after the deadline and before the warning is sent.
      const retry = showResourceInReferencePanel('byz-project');
      await vi.advanceTimersByTimeAsync(0);
      expect(mocks.getAllOpenWebViewDefinitions).toHaveBeenCalledTimes(2);

      // It has its own deadline, and is stuck on the same held step, so it runs out of time too.
      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS);
      await releaseHeld();
      await expect(retry).resolves.toEqual(NOT_SHOWN);
      expect(mocks.notify).toHaveBeenCalledTimes(2);
    });

    it('opens nothing elsewhere for a show that finishes while its warning is being sent', async () => {
      // Told the tab could not be opened, the caller must not then open the viewer as well — even
      // when the show, stuck until now, finds while that warning is on its way that it should.
      mocks.getAllOpenWebViewDefinitions.mockImplementation(() => holdUntilReleased([]));
      mocks.notify.mockImplementation(() => holdUntilReleased('notification-1'));
      const show = showResourceInReferencePanel('byz-project');

      await vi.advanceTimersByTimeAsync(SHOW_DEADLINE_MS);
      // The tab lookup is released while the deadline's warning is still held.
      const [releaseLookup, ...stillHeld] = held;
      held = stillHeld;
      releaseLookup();
      await vi.advanceTimersByTimeAsync(0);
      await releaseHeld();

      await expect(show).resolves.toEqual(NOT_SHOWN);
      expect(mocks.notify).toHaveBeenCalledTimes(1);
    });
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
        selections.push(await providerSelection(options));
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
  beforeEach(() => {
    vi.resetAllMocks();
    settingsHoldSelections({
      ScriptureResource: {
        'project-a': { selectedResourceId: 'dbl:previous' },
        'project-c': { selectedResourceId: 'dbl:in-c', userPickedResourceId: 'dbl:in-c' },
      },
      CommentaryResource: { 'project-a': { selectedResourceId: 'dbl:commentary' } },
    });
  });

  it('builds the saved state with the kind of resource the panel lists', async () => {
    const state = await buildResourceTextPanelState(
      { other: 'kept' },
      'project-b',
      'CommentaryResource',
      {
        selectedResourceId: 'dbl:uid-byz',
      },
    );

    expect(state).toEqual({ other: 'kept', resourceType: 'CommentaryResource' });
  });

  it('stores the resource a reload asks for, in its panel, under the project it is reloaded for', async () => {
    await buildResourceTextPanelState({}, 'project-b', 'CommentaryResource', {
      selectedResourceId: 'dbl:uid-byz',
    });

    expect(await getStoredResourceSelection('CommentaryResource', 'project-b')).toEqual({
      selectedResourceId: 'dbl:uid-byz',
      userPickedResourceId: 'dbl:uid-byz',
    });
    expect(await getStoredResourceSelection('ScriptureResource', 'project-b')).toEqual({});
  });

  it('keeps every other project’s selection when a reload asks for a resource', async () => {
    await buildResourceTextPanelState({}, 'project-b', 'ScriptureResource', {
      selectedResourceId: 'dbl:uid-byz',
    });

    expect(await getStoredResourceSelection('ScriptureResource', 'project-a')).toMatchObject({
      selectedResourceId: 'dbl:previous',
    });
    expect(await getStoredResourceSelection('ScriptureResource', 'project-c')).toEqual({
      selectedResourceId: 'dbl:in-c',
      userPickedResourceId: 'dbl:in-c',
    });
    expect(await getStoredResourceSelection('CommentaryResource', 'project-a')).toMatchObject({
      selectedResourceId: 'dbl:commentary',
    });
  });

  it('records the resource a reload asks for as the user’s own pick', async () => {
    // A resource opened from Home was asked for, not fallen back to, so a configured resource must
    // not replace it — including when the show could not add it to the user's list.
    await buildResourceTextPanelState({}, 'project-c', 'ScriptureResource', {
      selectedResourceId: 'project:byz-project',
    });

    expect(await getStoredResourceSelection('ScriptureResource', 'project-c')).toEqual({
      selectedResourceId: 'project:byz-project',
      userPickedResourceId: 'project:byz-project',
    });
  });

  it('stores the resource a reload asks for with no project open', async () => {
    await buildResourceTextPanelState({}, undefined, 'ScriptureResource', {
      selectedResourceId: 'project:byz-project',
    });

    expect(await getStoredResourceSelection('ScriptureResource', undefined)).toEqual({
      selectedResourceId: 'project:byz-project',
      userPickedResourceId: 'project:byz-project',
    });
  });

  it('stores nothing when the build asks for no resource', async () => {
    // An ordinary rebuild — a project switch, a layout restore — must not touch any project's pick.
    await buildResourceTextPanelState({}, 'project-b', 'ScriptureResource', {});

    expect(mocks.setSetting).not.toHaveBeenCalled();
  });

  it('still builds the panel, and warns, when the resource cannot be stored', async () => {
    mocks.setSetting.mockRejectedValueOnce(new Error('disk full'));

    const state = await buildResourceTextPanelState({}, 'project-b', 'ScriptureResource', {
      selectedResourceId: 'dbl:uid-byz',
    });

    expect(state).toEqual({ resourceType: 'ScriptureResource' });
    expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining('disk full'));
  });
});
