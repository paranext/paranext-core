import { describe, it, expect, vi } from 'vitest';
import type { IDisposableDataProvider } from '@papi/core';
import type { IRecentlyOpenedProjectsService } from 'platform-scripture';
import {
  MAX_RECENT_PROJECTS,
  RecentlyOpenedProjectsDataProviderEngine,
} from './recently-opened-projects.service';

type Fakes = {
  readRaw: ReturnType<typeof vi.fn<() => Promise<string>>>;
  writeRaw: ReturnType<typeof vi.fn<(data: string) => Promise<void>>>;
};

function createFakes(initial: string = '[]'): Fakes {
  let stored = initial;
  const readRaw = vi.fn<() => Promise<string>>().mockImplementation(async () => stored);
  const writeRaw = vi.fn<(data: string) => Promise<void>>().mockImplementation(async (data) => {
    stored = data;
  });
  return { readRaw, writeRaw };
}

describe('RecentlyOpenedProjectsDataProviderEngine', () => {
  it('returns [] when storage is empty / missing', async () => {
    const { readRaw, writeRaw } = createFakes('[]');
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);

    const result = await engine.getRecentProjects();

    expect(result).toEqual([]);
    expect(writeRaw).not.toHaveBeenCalled();
  });

  it('returns the persisted list when storage holds a valid array', async () => {
    const { readRaw, writeRaw } = createFakes(JSON.stringify(['A', 'B', 'C']));
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);

    const result = await engine.getRecentProjects();

    expect(result).toEqual(['A', 'B', 'C']);
    expect(writeRaw).not.toHaveBeenCalled();
  });

  it('returns [] when storage contains invalid JSON', async () => {
    const { readRaw, writeRaw } = createFakes('not-json{{');
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);

    const result = await engine.getRecentProjects();

    expect(result).toEqual([]);
    expect(writeRaw).not.toHaveBeenCalled();
  });

  it('returns [] when storage contains a non-array value', async () => {
    const { readRaw, writeRaw } = createFakes(JSON.stringify({ not: 'an array' }));
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);

    expect(await engine.getRecentProjects()).toEqual([]);
    expect(writeRaw).not.toHaveBeenCalled();
  });

  it('strips non-string and empty-string entries on read', async () => {
    // Deliberate null in the fixture to verify the filter discards non-string entries.
    // eslint-disable-next-line no-null/no-null
    const { readRaw, writeRaw } = createFakes(JSON.stringify(['A', 42, '', 'B', null]));
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);

    expect(await engine.getRecentProjects()).toEqual(['A', 'B']);
    expect(writeRaw).not.toHaveBeenCalled();
  });

  it('caps the returned list at MAX_RECENT_PROJECTS even when storage holds more', async () => {
    const stored = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const { readRaw, writeRaw } = createFakes(JSON.stringify(stored));
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);

    const result = await engine.getRecentProjects();

    expect(result).toEqual(stored.slice(0, MAX_RECENT_PROJECTS));
    expect(result).toHaveLength(MAX_RECENT_PROJECTS);
    expect(writeRaw).not.toHaveBeenCalled();
  });

  it('caches after first read — only one readRaw call across many getRecentProjects', async () => {
    const { readRaw, writeRaw } = createFakes(JSON.stringify(['A']));
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);

    await engine.getRecentProjects();
    await engine.getRecentProjects();
    await engine.getRecentProjects();

    expect(readRaw).toHaveBeenCalledTimes(1);
  });

  it('treats readRaw rejection as empty list and caches the empty state', async () => {
    const readRaw = vi.fn<() => Promise<string>>().mockRejectedValueOnce(new Error('disk gone'));
    const writeRaw = vi.fn<(data: string) => Promise<void>>();
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);

    expect(await engine.getRecentProjects()).toEqual([]);
    // Second call must not re-attempt the read — the empty state should be cached.
    expect(await engine.getRecentProjects()).toEqual([]);
    expect(readRaw).toHaveBeenCalledTimes(1);
    expect(writeRaw).not.toHaveBeenCalled();
  });

  it('recordProjectOpened on an empty list yields [projectId] and persists it', async () => {
    const { readRaw, writeRaw } = createFakes('[]');
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);

    await engine.recordProjectOpened('A');

    expect(await engine.getRecentProjects()).toEqual(['A']);
    expect(writeRaw).toHaveBeenCalledTimes(1);
    expect(writeRaw).toHaveBeenCalledWith(JSON.stringify(['A']));
  });

  it('recordProjectOpened with a new ID pushes it to the front of the existing list', async () => {
    const { readRaw, writeRaw } = createFakes(JSON.stringify(['A']));
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);

    await engine.recordProjectOpened('B');

    expect(await engine.getRecentProjects()).toEqual(['B', 'A']);
    expect(writeRaw).toHaveBeenCalledTimes(1);
    expect(writeRaw).toHaveBeenCalledWith(JSON.stringify(['B', 'A']));
  });

  it('notifies subscribers when the list changes', async () => {
    const { readRaw, writeRaw } = createFakes('[]');
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);
    const notifySpy = vi.spyOn(engine, 'notifyUpdate');

    await engine.recordProjectOpened('A');

    expect(notifySpy).toHaveBeenCalledWith('RecentProjects');
    expect(notifySpy).toHaveBeenCalledTimes(1);
  });

  it('moves an existing ID to the front without changing the list length', async () => {
    const { readRaw, writeRaw } = createFakes(JSON.stringify(['B', 'A']));
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);

    await engine.recordProjectOpened('A');

    expect(await engine.getRecentProjects()).toEqual(['A', 'B']);
    expect(writeRaw).toHaveBeenCalledTimes(1);
    expect(writeRaw).toHaveBeenCalledWith(JSON.stringify(['A', 'B']));
  });

  it('caps the list at MAX_RECENT_PROJECTS, dropping the oldest entries', async () => {
    const { readRaw, writeRaw } = createFakes('[]');
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);

    await engine.recordProjectOpened('A');
    await engine.recordProjectOpened('B');
    await engine.recordProjectOpened('C');
    await engine.recordProjectOpened('D');
    await engine.recordProjectOpened('E');
    await engine.recordProjectOpened('F');

    const result = await engine.getRecentProjects();
    expect(result).toEqual(['F', 'E', 'D', 'C', 'B']);
    expect(result).toHaveLength(MAX_RECENT_PROJECTS);
  });

  it('re-recording the already-most-recent ID is a no-op (no write, no notify)', async () => {
    const { readRaw, writeRaw } = createFakes(JSON.stringify(['A', 'B']));
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);
    // Prime the cache so the first call doesn't write either.
    await engine.getRecentProjects();
    const notifySpy = vi.spyOn(engine, 'notifyUpdate');

    await engine.recordProjectOpened('A');

    expect(await engine.getRecentProjects()).toEqual(['A', 'B']);
    expect(writeRaw).not.toHaveBeenCalled();
    expect(notifySpy).not.toHaveBeenCalled();
  });

  it.each(['', '   ', '\t', '\n'])(
    'silently rejects empty / whitespace projectId (%j) — no write, no notify',
    async (projectId) => {
      const { readRaw, writeRaw } = createFakes('[]');
      const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);
      const notifySpy = vi.spyOn(engine, 'notifyUpdate');

      await engine.recordProjectOpened(projectId);

      expect(await engine.getRecentProjects()).toEqual([]);
      expect(writeRaw).not.toHaveBeenCalled();
      expect(notifySpy).not.toHaveBeenCalled();
    },
  );

  it('setRecentProjects throws — external set is unsupported', async () => {
    const { readRaw, writeRaw } = createFakes('[]');
    const engine = new RecentlyOpenedProjectsDataProviderEngine(readRaw, writeRaw);

    expect(() => engine.setRecentProjects()).toThrow(/not supported/i);
  });
});

describe('recentlyOpenedProjectsService initialization', () => {
  // The tests only need a truthy provider object back from registerEngine
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const fakeDataProvider = {
    getRecentProjects: vi.fn(),
  } as unknown as IDisposableDataProvider<IRecentlyOpenedProjectsService>;

  // initialize caches module-level state, so load a fresh copy for each test
  async function importFreshService() {
    vi.resetModules();
    const { default: papi } = await import('@papi/backend');
    const { recentlyOpenedProjectsService } = await import('./recently-opened-projects.service');
    return {
      recentlyOpenedProjectsService,
      registerEngine: vi.mocked(papi.dataProviders.registerEngine),
    };
  }

  it('throws when the service object is used before initialization', async () => {
    const { recentlyOpenedProjectsService } = await importFreshService();

    await expect(
      recentlyOpenedProjectsService.serviceObject.getRecentProjects(undefined),
    ).rejects.toThrow(/not initialized/);
  });

  it('retries registerEngine after a failed initialization', async () => {
    const { recentlyOpenedProjectsService, registerEngine } = await importFreshService();
    const { readRaw, writeRaw } = createFakes();
    registerEngine
      .mockRejectedValueOnce(new Error('transient failure'))
      .mockResolvedValue(fakeDataProvider);

    await expect(recentlyOpenedProjectsService.initialize(readRaw, writeRaw)).rejects.toThrow(
      'transient failure',
    );
    await expect(
      recentlyOpenedProjectsService.initialize(readRaw, writeRaw),
    ).resolves.toBeUndefined();
    expect(registerEngine).toHaveBeenCalledTimes(2);
  });

  it('shares one registration across concurrent and subsequent initialize calls', async () => {
    const { recentlyOpenedProjectsService, registerEngine } = await importFreshService();
    const { readRaw, writeRaw } = createFakes();
    registerEngine.mockResolvedValue(fakeDataProvider);

    await Promise.all([
      recentlyOpenedProjectsService.initialize(readRaw, writeRaw),
      recentlyOpenedProjectsService.initialize(readRaw, writeRaw),
    ]);
    await recentlyOpenedProjectsService.initialize(readRaw, writeRaw);

    expect(registerEngine).toHaveBeenCalledTimes(1);
  });
});
