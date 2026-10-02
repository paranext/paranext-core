// @vitest-environment jsdom

import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import papi from '@papi/frontend';
import {
  LOOKUP_RETRY_DELAY_MS,
  MAX_LOOKUP_RETRIES,
  PDP_FACTORY_REGISTRATION_DEBOUNCE_MS,
  SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  SYNC_ACTIVITY_SEED_RETRY_DELAY_MS,
  useProjectPresence,
} from './use-project-presence.hook';

vi.mock('@papi/frontend', () => ({
  default: {
    projectLookup: { getMetadataForAllProjects: vi.fn() },
    commands: { sendCommand: vi.fn() },
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

const getMetadataForAllProjects = vi.mocked(papi.projectLookup.getMetadataForAllProjects);
const sendCommand = vi.mocked(papi.commands.sendCommand);

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
// What the lookup reports for the sample project core installs when it finds no projects.
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
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useProjectPresence', () => {
  it('stays unknown for an empty answer, since core always installs the sample project', async () => {
    getMetadataForAllProjects.mockResolvedValue([]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() =>
      expect(getMetadataForAllProjects).toHaveBeenCalledWith({
        includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
      }),
    );
    await act(async () => {});
    expect(result.current).toBe('unknown');
  });

  it('answers some when the lookup finds a project', async () => {
    getMetadataForAllProjects.mockResolvedValue([PROJECT]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('some'));
  });

  it('does not count the sample project core installs when the user has none', async () => {
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('none'));
  });

  it('does not count published resources as projects', async () => {
    getMetadataForAllProjects.mockResolvedValue([RESOURCE]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('none'));
  });

  it('recognizes the sample project by its ID whatever the case', async () => {
    getMetadataForAllProjects.mockResolvedValue([
      { ...SAMPLE_WEB, id: SAMPLE_WEB.id.toLowerCase() },
    ]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('none'));
  });

  it('counts a real project that is locked against editing', async () => {
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB, { ...PROJECT, isEditable: false }]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('some'));
  });

  it('counts a project whose factory does not report isPublished', async () => {
    getMetadataForAllProjects.mockResolvedValue([
      { id: 'p1', projectInterfaces: [], pdpFactoryInfo: {} },
    ]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(result.current).toBe('some'));
  });

  it('stays unknown when the lookup fails', async () => {
    getMetadataForAllProjects.mockRejectedValue(new Error('lookup failed'));

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(getMetadataForAllProjects).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toBe('unknown');
  });

  it('withdraws an earlier none when a later lookup fails', async () => {
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await waitFor(() => expect(result.current).toBe('none'));

    getMetadataForAllProjects.mockRejectedValue(new Error('lookup failed'));
    fire('platform.onDidChangeProjects');

    await waitFor(() => expect(result.current).toBe('unknown'));
  });

  it('stays unknown while a sync is running, then answers none when it finishes', async () => {
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
    answerSyncActivity(true);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));

    await waitFor(() => expect(sendCommand).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toBe('unknown');

    fire('paratextBibleSendReceive.onSyncActivityChanged', { isSyncing: false, projectIds: [] });

    await waitFor(() => expect(result.current).toBe('none'));
  });

  it('does not look up projects while a sync is running, and looks again once it ends', async () => {
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
    answerSyncActivity(true);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await waitFor(() => expect(sendCommand).toHaveBeenCalled());
    await act(async () => {});
    expect(getMetadataForAllProjects).not.toHaveBeenCalled();

    getMetadataForAllProjects.mockResolvedValue([PROJECT]);
    fire('paratextBibleSendReceive.onSyncActivityChanged', { isSyncing: false, projectIds: [] });

    await waitFor(() => expect(result.current).toBe('some'));
    expect(getMetadataForAllProjects).toHaveBeenCalledTimes(1);
  });

  it('drops an earlier none when a sync starts, since the sync may bring a project', async () => {
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await waitFor(() => expect(result.current).toBe('none'));

    fire('paratextBibleSendReceive.onSyncActivityChanged', { isSyncing: true, projectIds: [] });
    expect(result.current).toBe('unknown');

    // Between the sync ending and the fresh lookup answering, the old none must not come back.
    let resolveFreshLookup: (value: (typeof PROJECT)[]) => void = () => {};
    getMetadataForAllProjects.mockReturnValueOnce(
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
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
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
    expect(getMetadataForAllProjects).not.toHaveBeenCalled();
  });

  it('re-reads the sync activity while a sync runs, in case its end was missed', async () => {
    vi.useFakeTimers();
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
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
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
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

  it('stops re-reading the sync activity once the sync has ended', async () => {
    vi.useFakeTimers();
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
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
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
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
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
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

    expect(getMetadataForAllProjects).not.toHaveBeenCalled();
  });

  it('retries a failed lookup after a delay', async () => {
    vi.useFakeTimers();
    getMetadataForAllProjects.mockRejectedValueOnce(new Error('a factory timed out'));
    getMetadataForAllProjects.mockResolvedValue([PROJECT]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});
    expect(result.current).toBe('unknown');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(LOOKUP_RETRY_DELAY_MS);
    });

    expect(getMetadataForAllProjects).toHaveBeenCalledTimes(2);
    expect(result.current).toBe('some');
  });

  it('stops retrying a lookup that keeps failing', async () => {
    vi.useFakeTimers();
    getMetadataForAllProjects.mockRejectedValue(new Error('lookup failed'));
    renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});

    // One act per delay, in sequence: each retry is a re-render, which React applies only when the
    // act ends.
    await Array.from({ length: MAX_LOOKUP_RETRIES + 3 }).reduce<Promise<void>>(async (previous) => {
      await previous;
      await act(async () => {
        await vi.advanceTimersByTimeAsync(LOOKUP_RETRY_DELAY_MS);
      });
    }, Promise.resolve());

    expect(getMetadataForAllProjects).toHaveBeenCalledTimes(1 + MAX_LOOKUP_RETRIES);
  });

  it('gives a lookup triggered by a new event a fresh retry budget', async () => {
    vi.useFakeTimers();
    getMetadataForAllProjects.mockRejectedValue(new Error('lookup failed'));
    renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});
    await Array.from({ length: MAX_LOOKUP_RETRIES }).reduce<Promise<void>>(async (previous) => {
      await previous;
      await act(async () => {
        await vi.advanceTimersByTimeAsync(LOOKUP_RETRY_DELAY_MS);
      });
    }, Promise.resolve());
    expect(getMetadataForAllProjects).toHaveBeenCalledTimes(1 + MAX_LOOKUP_RETRIES);

    fire('platform.onDidChangeProjects');
    await act(async () => {});
    await act(async () => {
      await vi.advanceTimersByTimeAsync(LOOKUP_RETRY_DELAY_MS);
    });

    // The event's own lookup, then a retry of it
    expect(getMetadataForAllProjects).toHaveBeenCalledTimes(1 + MAX_LOOKUP_RETRIES + 2);
  });

  it('ignores a malformed sync-activity snapshot', async () => {
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await waitFor(() => expect(result.current).toBe('none'));

    fire('paratextBibleSendReceive.onSyncActivityChanged', { projectIds: [] });
    await act(async () => {});

    expect(result.current).toBe('none');
  });

  it('refetches when the set of projects changes', async () => {
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await waitFor(() => expect(result.current).toBe('none'));

    getMetadataForAllProjects.mockResolvedValue([PROJECT]);
    fire('platform.onDidChangeProjects');

    await waitFor(() => expect(result.current).toBe('some'));
  });

  it('refetches once, debounced, when project data provider factories register', async () => {
    vi.useFakeTimers();
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});
    expect(result.current).toBe('none');
    expect(getMetadataForAllProjects).toHaveBeenCalledTimes(1);

    getMetadataForAllProjects.mockResolvedValue([PROJECT]);
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

    expect(getMetadataForAllProjects).toHaveBeenCalledTimes(2);
    expect(result.current).toBe('some');
  });

  it('does not refetch when some other kind of network object is created', async () => {
    vi.useFakeTimers();
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
    renderHook(() => useProjectPresence({ enabled: true }));
    await act(async () => {});

    fire('object:onDidCreateNetworkObject', { id: 'x', objectType: 'pdp', functionNames: [] });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(PDP_FACTORY_REGISTRATION_DEBOUNCE_MS);
    });

    expect(getMetadataForAllProjects).toHaveBeenCalledTimes(1);
  });

  it('does not reuse an answer from before it was disabled', async () => {
    getMetadataForAllProjects.mockResolvedValue([SAMPLE_WEB]);
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => useProjectPresence({ enabled }),
      { initialProps: { enabled: true } },
    );
    await waitFor(() => expect(result.current).toBe('none'));

    // Switching to Power mode and back disables and re-enables the hook in place. The fresh lookup
    // is held open so the answer in between is observable.
    rerender({ enabled: false });
    let resolveFreshLookup: (value: (typeof PROJECT)[]) => void = () => {};
    getMetadataForAllProjects.mockReturnValueOnce(
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

    expect(getMetadataForAllProjects).not.toHaveBeenCalled();
    expect(sendCommand).not.toHaveBeenCalled();
    expect(result.current).toBe('unknown');
  });

  it('ignores a lookup answer that a newer lookup has superseded', async () => {
    let resolveFirst: (value: (typeof PROJECT)[]) => void = () => {};
    getMetadataForAllProjects.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFirst = resolve;
      }),
    );
    getMetadataForAllProjects.mockResolvedValueOnce([PROJECT]);

    const { result } = renderHook(() => useProjectPresence({ enabled: true }));
    await waitFor(() => expect(getMetadataForAllProjects).toHaveBeenCalledTimes(1));
    fire('platform.onDidChangeProjects');
    await waitFor(() => expect(result.current).toBe('some'));

    await act(async () => resolveFirst([SAMPLE_WEB]));

    expect(result.current).toBe('some');
  });
});
