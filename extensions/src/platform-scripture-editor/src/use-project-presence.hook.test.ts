// @vitest-environment jsdom

import { readFileSync } from 'fs';
import path from 'path';
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import papi from '@papi/frontend';
import type { NetworkObjectDetails } from '@papi/core';
import {
  LOOKUP_RETRY_DELAY_MS,
  MAX_LOOKUP_RETRIES,
  PARATEXT_PDP_FACTORY_ID,
  PDP_FACTORY_REGISTRATION_DEBOUNCE_MS,
  SAMPLE_PROJECT_ID,
  SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  SYNC_ACTIVITY_SEED_RETRY_DELAY_MS,
  useProjectPresence,
} from './use-project-presence.hook';

vi.mock('@papi/frontend', () => ({
  default: {
    projectLookup: {
      getMetadataForAllProjects: vi.fn(),
      getMetadataForAllProjectsWithoutRetries: vi.fn(),
    },
    commands: { sendCommand: vi.fn() },
    networkObjectStatus: { getAllNetworkObjectDetails: vi.fn() },
    // The event's name doubles as its token, so the `useEvent` mock below can route by name.
    network: { getNetworkEvent: vi.fn((eventName: string) => eventName) },
  },
  logger: { warn: vi.fn(), debug: vi.fn() },
}));

// The latest handler the hook registered for each event, so a test can fire that event.
const eventHandlers = new Map<string, (payload: unknown) => void>();
vi.mock('platform-bible-react', () => ({
  useEvent: vi.fn((event: string, handler: (payload: unknown) => void) => {
    eventHandlers.set(event, handler);
  }),
}));

const lookUpProjects = vi.mocked(papi.projectLookup.getMetadataForAllProjectsWithoutRetries);
const retryingLookup = vi.mocked(papi.projectLookup.getMetadataForAllProjects);
const sendCommand = vi.mocked(papi.commands.sendCommand);
const getAllNetworkObjectDetails = vi.mocked(papi.networkObjectStatus.getAllNetworkObjectDetails);

// The C# factory for the user's Paratext projects, which registers only once it has scanned the
// projects folder.
const PARATEXT_PDP_FACTORY: NetworkObjectDetails = {
  id: 'platform.Paratext-pdpf',
  objectType: 'pdpFactory',
  functionNames: [],
  attributes: { projectInterfaces: ['platform.base'] },
};
// The Scripture Extender factory (platform-scripture), which layers the interface the Scripture
// editor opens projects with.
const SCRIPTURE_EXTENDER_PDP_FACTORY: NetworkObjectDetails = {
  id: 'platformScripture.scriptureExtenderPdpf-pdpf',
  objectType: 'pdpFactory',
  functionNames: [],
  attributes: {
    projectInterfaces: ['platformScripture.USJ_Chapter', 'platformScripture.USX_Book'],
  },
};

/**
 * Advances through `count` lookup retry delays, one `act` each: React applies a retry's re-render
 * only when its act ends.
 */
async function advanceThroughRetryDelays(count: number) {
  await Array.from({ length: count }).reduce<Promise<void>>(async (previous) => {
    await previous;
    await act(async () => {
      await vi.advanceTimersByTimeAsync(LOOKUP_RETRY_DELAY_MS);
    });
  }, Promise.resolve());
}

function registerNetworkObjects(...details: NetworkObjectDetails[]) {
  getAllNetworkObjectDetails.mockResolvedValue(
    Object.fromEntries(details.map((detail) => [detail.id, detail])),
  );
}

const PROJECT = {
  id: 'p1',
  projectInterfaces: [],
  pdpFactoryInfo: {},
  isPublished: false,
  isEditable: true,
};
// Resources are always non-editable (`ScrTextExtensions.GetIsEditable` in C#).
const RESOURCE = {
  id: 'r1',
  projectInterfaces: [],
  pdpFactoryInfo: {},
  isPublished: true,
  isEditable: false,
};
// What the lookup reports for the sample project core installs into an empty projects folder in
// development runs.
const SAMPLE_WEB = {
  id: '32664DC3288A28DF2E2BB75DED887FC8F17A15FB',
  name: 'WEB',
  projectInterfaces: [],
  pdpFactoryInfo: {},
  isPublished: false,
  isEditable: false,
};

function answerSyncActivity(isSyncing: boolean) {
  sendCommand.mockResolvedValue({ isSyncing, projectIds: [] });
}

function fire(eventName: string, payload?: unknown) {
  const handler = eventHandlers.get(eventName);
  if (!handler) throw new Error(`The hook did not subscribe to ${eventName}`);
  act(() => handler(payload));
}

beforeEach(() => {
  vi.clearAllMocks();
  eventHandlers.clear();
  answerSyncActivity(false);
  registerNetworkObjects();
});

afterEach(() => {
  vi.useRealTimers();
});

// Nothing else ties the hook's copy of the ID to the sample core installs, and a mismatch would
// count the sample as the user's own project, hiding the guidance from everyone it is for.
describe('SAMPLE_PROJECT_ID', () => {
  it('is the ID of the sample project core installs', () => {
    const settingsXml = readFileSync(
      path.resolve(__dirname, '../../../../c-sharp/assets/WEB/Settings.xml'),
      'utf-8',
    );
    const sampleGuid = /<Guid>\s*([^<\s]+)\s*<\/Guid>/.exec(settingsXml)?.[1];

    expect(sampleGuid?.toUpperCase()).toBe(SAMPLE_PROJECT_ID);
  });
});

// A mismatch would never trust an empty answer, so a user with no projects would never see the
// guidance.
describe('PARATEXT_PDP_FACTORY_ID', () => {
  it('is the ID the C# Paratext project factory registers under', () => {
    const readCSharp = (file: string) =>
      readFileSync(path.resolve(__dirname, '../../../../c-sharp/Projects', file), 'utf-8');
    const pdpfName = /PDPF_NAME\s*=\s*"([^"]+)"/.exec(
      readCSharp('ParatextProjectDataProviderFactory.cs'),
    )?.[1];
    const idTemplate = /\$"([^"]*)\{_pdpfName\}([^"]*)"/.exec(
      readCSharp('ProjectDataProviderFactory.cs'),
    );

    expect(PARATEXT_PDP_FACTORY_ID).toBe(`${idTemplate?.[1]}${pdpfName}${idTemplate?.[2]}`);
  });
});

describe('useProjectPresence', () => {
  it('asks the lookup that does not retry an empty answer itself', async () => {
    lookUpProjects.mockResolvedValue([PROJECT]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('some'));
    expect(lookUpProjects).toHaveBeenCalledWith({
      includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
    });
    expect(retryingLookup).not.toHaveBeenCalled();
  });

  it('answers none for an empty answer when both project factories had registered before the lookup', async () => {
    registerNetworkObjects(PARATEXT_PDP_FACTORY, SCRIPTURE_EXTENDER_PDP_FACTORY);
    lookUpProjects.mockResolvedValue([]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('none'));
  });

  it.each<[scenario: string, networkObjects: NetworkObjectDetails[]]>([
    ['before the project factories have registered', []],
    ['when only the Paratext project factory had registered', [PARATEXT_PDP_FACTORY]],
    ['when only the Scripture Extender factory had registered', [SCRIPTURE_EXTENDER_PDP_FACTORY]],
    [
      // A project data provider carries the same `projectInterfaces` attribute as its factory.
      'when only a project data provider, not a factory, serves the Scripture interface',
      [
        PARATEXT_PDP_FACTORY,
        { ...SCRIPTURE_EXTENDER_PDP_FACTORY, id: 'abc-pdp', objectType: 'pdp' },
      ],
    ],
  ])('stays unknown for an empty answer %s', async (_scenario, networkObjects) => {
    registerNetworkObjects(...networkObjects);
    lookUpProjects.mockResolvedValue([]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(lookUpProjects).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toBe('unknown');
  });

  it('stays unknown for an empty answer when the factories registered only after the lookup began', async () => {
    lookUpProjects.mockImplementation(async () => {
      registerNetworkObjects(PARATEXT_PDP_FACTORY, SCRIPTURE_EXTENDER_PDP_FACTORY);
      return [];
    });

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(lookUpProjects).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toBe('unknown');
    expect(getAllNetworkObjectDetails.mock.invocationCallOrder[0]).toBeLessThan(
      lookUpProjects.mock.invocationCallOrder[0],
    );
  });

  it('answers none once the project factories register after an empty answer', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockResolvedValue([]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});
    expect(result.current).toBe('unknown');

    registerNetworkObjects(PARATEXT_PDP_FACTORY, SCRIPTURE_EXTENDER_PDP_FACTORY);
    fire('object:onDidCreateNetworkObject', PARATEXT_PDP_FACTORY);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(PDP_FACTORY_REGISTRATION_DEBOUNCE_MS);
    });

    expect(result.current).toBe('none');
  });

  it('stays unknown for an empty answer when the network objects could not be listed', async () => {
    getAllNetworkObjectDetails.mockRejectedValue(new Error('status service unavailable'));
    lookUpProjects.mockResolvedValue([]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(lookUpProjects).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toBe('unknown');
  });

  it('answers some when the network objects could not be listed but the lookup finds a project', async () => {
    getAllNetworkObjectDetails.mockRejectedValue(new Error('status service unavailable'));
    lookUpProjects.mockResolvedValue([PROJECT]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('some'));
  });

  it('retries an empty answer whose network objects could not be listed', async () => {
    vi.useFakeTimers();
    getAllNetworkObjectDetails.mockRejectedValueOnce(new Error('status service unavailable'));
    registerNetworkObjects(PARATEXT_PDP_FACTORY, SCRIPTURE_EXTENDER_PDP_FACTORY);
    lookUpProjects.mockResolvedValue([]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});
    expect(result.current).toBe('unknown');

    await advanceThroughRetryDelays(1);

    expect(lookUpProjects).toHaveBeenCalledTimes(2);
    expect(result.current).toBe('none');
  });

  it('stops retrying an empty answer whose network objects keep failing to list', async () => {
    vi.useFakeTimers();
    getAllNetworkObjectDetails.mockRejectedValue(new Error('status service unavailable'));
    lookUpProjects.mockResolvedValue([]);
    renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});

    await advanceThroughRetryDelays(MAX_LOOKUP_RETRIES + 3);

    expect(lookUpProjects).toHaveBeenCalledTimes(1 + MAX_LOOKUP_RETRIES);
  });

  it('does not retry an empty answer from before the project factories have registered', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockResolvedValue([]);
    renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});

    await advanceThroughRetryDelays(2);

    expect(lookUpProjects).toHaveBeenCalledTimes(1);
  });

  it('answers some when the lookup finds a project', async () => {
    lookUpProjects.mockResolvedValue([PROJECT]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('some'));
  });

  it('does not count the sample project core installs when the user has none', async () => {
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('none'));
  });

  it('does not count published resources as projects', async () => {
    lookUpProjects.mockResolvedValue([RESOURCE]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('none'));
  });

  it('does not count a project that cannot be opened, so its owner is shown how to get one', async () => {
    lookUpProjects.mockResolvedValue([
      { ...PROJECT, unsupportedReason: '%project_unsupported_studyBibleAdditions%' },
    ]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('none'));
  });

  it('recognizes the sample project by its ID whatever the case', async () => {
    lookUpProjects.mockResolvedValue([{ ...SAMPLE_WEB, id: SAMPLE_WEB.id.toLowerCase() }]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('none'));
  });

  it('counts a real project that is locked against editing', async () => {
    lookUpProjects.mockResolvedValue([SAMPLE_WEB, { ...PROJECT, isEditable: false }]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('some'));
  });

  it('counts a project whose factory does not report isPublished', async () => {
    lookUpProjects.mockResolvedValue([{ id: 'p1', projectInterfaces: [], pdpFactoryInfo: {} }]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('some'));
  });

  it('stays unknown when the lookup fails', async () => {
    lookUpProjects.mockRejectedValue(new Error('lookup failed'));

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(lookUpProjects).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toBe('unknown');
  });

  it('withdraws an earlier none when a later lookup fails', async () => {
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await waitFor(() => expect(result.current).toBe('none'));

    lookUpProjects.mockRejectedValue(new Error('lookup failed'));
    fire('platform.onDidChangeProjects');

    await waitFor(() => expect(result.current).toBe('unknown'));
  });

  it('stays unknown while a sync is running, then answers none when it finishes', async () => {
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    answerSyncActivity(true);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(sendCommand).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toBe('unknown');

    fire('paratextBibleSendReceive.onSyncActivityChanged', { isSyncing: false, projectIds: [] });

    await waitFor(() => expect(result.current).toBe('none'));
  });

  it('does not look up projects while a sync is running, and looks again once it ends', async () => {
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    answerSyncActivity(true);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await waitFor(() => expect(sendCommand).toHaveBeenCalled());
    await act(async () => {});
    expect(lookUpProjects).not.toHaveBeenCalled();

    lookUpProjects.mockResolvedValue([PROJECT]);
    fire('paratextBibleSendReceive.onSyncActivityChanged', { isSyncing: false, projectIds: [] });

    await waitFor(() => expect(result.current).toBe('some'));
    expect(lookUpProjects).toHaveBeenCalledTimes(1);
  });

  it('drops an earlier none when a sync starts, since the sync may bring a project', async () => {
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await waitFor(() => expect(result.current).toBe('none'));

    fire('paratextBibleSendReceive.onSyncActivityChanged', { isSyncing: true, projectIds: [] });
    expect(result.current).toBe('unknown');

    // Between the sync ending and the fresh lookup answering, the old none must not come back.
    let resolveFreshLookup: (value: (typeof PROJECT)[]) => void = () => {};
    lookUpProjects.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFreshLookup = resolve;
      }),
    );
    fire('paratextBibleSendReceive.onSyncActivityChanged', { isSyncing: false, projectIds: [] });
    expect(result.current).toBe('unknown');

    await act(async () => resolveFreshLookup([PROJECT]));
    expect(result.current).toBe('some');
  });

  it('lets a sync event win over an older sync-activity answer that arrives after it', async () => {
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    let resolveSeed: (value: { isSyncing: boolean; projectIds: string[] }) => void = () => {};
    sendCommand.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveSeed = resolve;
      }),
    );

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await waitFor(() => expect(sendCommand).toHaveBeenCalled());

    fire('paratextBibleSendReceive.onSyncActivityChanged', { isSyncing: true, projectIds: [] });
    await act(async () => resolveSeed({ isSyncing: false, projectIds: [] }));

    expect(result.current).toBe('unknown');
    expect(lookUpProjects).not.toHaveBeenCalled();
  });

  it('re-reads the sync activity while a sync runs, in case its end was missed', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    answerSyncActivity(true);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});
    expect(result.current).toBe('unknown');

    answerSyncActivity(false);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_ACTIVITY_RECHECK_INTERVAL_MS);
    });

    expect(result.current).toBe('none');
  });

  it('retries the sync-activity seed after a rejection instead of assuming idle', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    sendCommand.mockRejectedValueOnce(new Error('not registered yet'));
    sendCommand.mockResolvedValueOnce({ isSyncing: false, projectIds: [] });

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await act(async () => {});
    expect(result.current).toBe('unknown');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_ACTIVITY_SEED_RETRY_DELAY_MS);
    });

    expect(sendCommand).toHaveBeenCalledTimes(2);
    expect(result.current).toBe('none');
  });

  it('stops retrying the sync-activity seed once a sync event has answered', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    sendCommand.mockRejectedValue(new Error('not registered yet'));
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});
    expect(sendCommand).toHaveBeenCalledTimes(1);

    fire('paratextBibleSendReceive.onSyncActivityChanged', { isSyncing: false, projectIds: [] });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_ACTIVITY_SEED_RETRY_DELAY_MS * 3);
    });

    expect(sendCommand).toHaveBeenCalledTimes(1);
    expect(result.current).toBe('none');
  });

  it('keeps re-reading the sync activity after the seed gives up, until it is known', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    // The first read plus every seed retry
    for (let i = 0; i < 11; i += 1) sendCommand.mockRejectedValueOnce(new Error('not registered'));
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_ACTIVITY_SEED_RETRY_DELAY_MS * 10);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_ACTIVITY_RECHECK_INTERVAL_MS);
    });

    expect(result.current).toBe('none');
  });

  it('stops re-reading the sync activity once the sync has ended', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    answerSyncActivity(true);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});

    answerSyncActivity(false);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_ACTIVITY_RECHECK_INTERVAL_MS);
    });
    expect(result.current).toBe('none');
    const readsWhenSyncEnded = sendCommand.mock.calls.length;

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_ACTIVITY_RECHECK_INTERVAL_MS * 2);
    });
    expect(sendCommand).toHaveBeenCalledTimes(readsWhenSyncEnded);
  });

  it('keeps re-reading the sync activity for as long as the sync runs', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    answerSyncActivity(true);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_ACTIVITY_RECHECK_INTERVAL_MS);
    });
    expect(result.current).toBe('unknown');

    answerSyncActivity(false);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_ACTIVITY_RECHECK_INTERVAL_MS);
    });
    expect(result.current).toBe('none');
  });

  it('ignores a sync-activity read that finishes after the hook was disabled', async () => {
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    let resolveStaleRead: (value: { isSyncing: boolean; projectIds: string[] }) => void = () => {};
    sendCommand.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveStaleRead = resolve;
      }),
    );
    const { rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => useProjectPresence({ enabled }),
      { initialProps: { enabled: true } },
    );
    await waitFor(() => expect(sendCommand).toHaveBeenCalledTimes(1));

    rerender({ enabled: false });
    await act(async () => resolveStaleRead({ isSyncing: false, projectIds: [] }));
    // Re-enabled with a fresh read that never answers: only a stale read could make the hook idle.
    sendCommand.mockReturnValueOnce(new Promise(() => {}));
    rerender({ enabled: true });
    await act(async () => {});

    expect(lookUpProjects).not.toHaveBeenCalled();
  });

  it('retries a failed lookup after a delay', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockRejectedValueOnce(new Error('a factory timed out'));
    lookUpProjects.mockResolvedValue([PROJECT]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});
    expect(result.current).toBe('unknown');

    await advanceThroughRetryDelays(1);

    expect(lookUpProjects).toHaveBeenCalledTimes(2);
    expect(result.current).toBe('some');
  });

  it('stops retrying a lookup that keeps failing', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockRejectedValue(new Error('lookup failed'));
    renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});

    await advanceThroughRetryDelays(MAX_LOOKUP_RETRIES + 3);

    expect(lookUpProjects).toHaveBeenCalledTimes(1 + MAX_LOOKUP_RETRIES);
  });

  it('gives a lookup triggered by a new event a fresh retry budget', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockRejectedValue(new Error('lookup failed'));
    renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});
    await advanceThroughRetryDelays(MAX_LOOKUP_RETRIES);
    expect(lookUpProjects).toHaveBeenCalledTimes(1 + MAX_LOOKUP_RETRIES);

    fire('platform.onDidChangeProjects');
    await act(async () => {});
    await advanceThroughRetryDelays(1);

    // The event's own lookup, then a retry of it
    expect(lookUpProjects).toHaveBeenCalledTimes(1 + MAX_LOOKUP_RETRIES + 2);
  });

  it('gives lookups a fresh retry budget when they resume after a sync', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockRejectedValue(new Error('lookup failed'));
    renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});
    await advanceThroughRetryDelays(MAX_LOOKUP_RETRIES);
    expect(lookUpProjects).toHaveBeenCalledTimes(1 + MAX_LOOKUP_RETRIES);

    fire('paratextBibleSendReceive.onSyncActivityChanged', { isSyncing: true, projectIds: [] });
    fire('paratextBibleSendReceive.onSyncActivityChanged', { isSyncing: false, projectIds: [] });
    await act(async () => {});
    await advanceThroughRetryDelays(1);

    // The resumed lookup, then a retry of it
    expect(lookUpProjects).toHaveBeenCalledTimes(1 + MAX_LOOKUP_RETRIES + 2);
  });

  it('ignores a malformed sync-activity snapshot', async () => {
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await waitFor(() => expect(result.current).toBe('none'));

    fire('paratextBibleSendReceive.onSyncActivityChanged', { projectIds: [] });
    await act(async () => {});

    expect(result.current).toBe('none');
  });

  it('refetches when the set of projects changes', async () => {
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await waitFor(() => expect(result.current).toBe('none'));

    lookUpProjects.mockResolvedValue([PROJECT]);
    fire('platform.onDidChangeProjects');

    await waitFor(() => expect(result.current).toBe('some'));
  });

  it('refetches once, debounced, when project data provider factories register', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});
    expect(result.current).toBe('none');
    expect(lookUpProjects).toHaveBeenCalledTimes(1);

    lookUpProjects.mockResolvedValue([PROJECT]);
    fire('object:onDidCreateNetworkObject', {
      id: 'a',
      objectType: 'pdpFactory',
      functionNames: [],
    });
    fire('object:onDidCreateNetworkObject', {
      id: 'b',
      objectType: 'pdpFactory',
      functionNames: [],
    });
    // The second registration replaced the first one's timer rather than adding its own.
    expect(vi.getTimerCount()).toBe(1);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(PDP_FACTORY_REGISTRATION_DEBOUNCE_MS);
    });

    expect(lookUpProjects).toHaveBeenCalledTimes(2);
    expect(result.current).toBe('some');
  });

  it('does not refetch when some other kind of network object is created', async () => {
    vi.useFakeTimers();
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});

    fire('object:onDidCreateNetworkObject', { id: 'x', objectType: 'pdp', functionNames: [] });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(PDP_FACTORY_REGISTRATION_DEBOUNCE_MS);
    });

    expect(lookUpProjects).toHaveBeenCalledTimes(1);
  });

  it('does not reuse an answer from before it was disabled', async () => {
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => useProjectPresence({ enabled }),
      { initialProps: { enabled: true } },
    );
    await waitFor(() => expect(result.current).toBe('none'));

    // Switching to Power mode and back disables and re-enables the hook in place. The fresh lookup
    // is held open so the answer in between is observable.
    rerender({ enabled: false });
    let resolveFreshLookup: (value: (typeof PROJECT)[]) => void = () => {};
    lookUpProjects.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFreshLookup = resolve;
      }),
    );
    rerender({ enabled: true });

    expect(result.current).toBe('unknown');
    await act(async () => resolveFreshLookup([PROJECT]));
    expect(result.current).toBe('some');
  });

  it('makes no requests and stays unknown while disabled', async () => {
    const { result } = renderHook(() => useProjectPresence({ enabled: false }));
    await act(async () => {});

    fire('platform.onDidChangeProjects');
    await act(async () => {});

    expect(lookUpProjects).not.toHaveBeenCalled();
    expect(sendCommand).not.toHaveBeenCalled();
    expect(result.current).toBe('unknown');
  });

  it('ignores a lookup answer that a newer lookup has superseded', async () => {
    let resolveFirst: (value: (typeof PROJECT)[]) => void = () => {};
    lookUpProjects.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFirst = resolve;
      }),
    );
    lookUpProjects.mockResolvedValueOnce([PROJECT]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await waitFor(() => expect(lookUpProjects).toHaveBeenCalledTimes(1));
    fire('platform.onDidChangeProjects');
    await waitFor(() => expect(result.current).toBe('some'));

    await act(async () => resolveFirst([SAMPLE_WEB]));

    expect(result.current).toBe('some');
  });
});
