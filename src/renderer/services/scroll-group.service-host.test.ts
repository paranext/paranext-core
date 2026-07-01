import { describe, expect, it, vi, beforeEach } from 'vitest';

// The host module reads localStorage and creates a network emitter at import time; stub those.
vi.mock('@shared/services/network.service', () => ({
  createBufferedNetworkEventEmitter: () => ({ emit: vi.fn() }),
  getNetworkEvent: () => vi.fn(),
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: vi.fn() },
}));
const settingsSet = vi.fn();
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { set: (...args: unknown[]) => settingsSet(...args), subscribe: vi.fn() },
}));
vi.mock('@shared/services/logger.service', () => ({ logger: { warn: vi.fn(), error: vi.fn() } }));

const sendCommand = vi.fn();
vi.mock('@shared/services/command.service', () => ({
  sendCommand: (...args: unknown[]) => sendCommand(...args),
}));

// getScrRefForProject reads each project's versification via a base-PDP setting subscription. Mock
// it: by default every project reports a unique versification (its own id) so conversions fire;
// tests set `projectVersifications[id]` to make projects share a versification (fast path) or to be
// unresolvable (undefined).
const { pdpGet, projectVersifications } = vi.hoisted(() => {
  const versifications: Record<string, string | undefined> = {};
  return { pdpGet: vi.fn(), projectVersifications: versifications };
});
vi.mock('@shared/services/project-data-provider.service', () => ({
  papiFrontendProjectDataProviderService: { get: pdpGet },
}));

describe('scroll-group.service-host source project tracking', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetModules();
    sendCommand.mockReset();
    settingsSet.mockReset();
    Object.keys(projectVersifications).forEach((key) => {
      delete projectVersifications[key];
    });
    pdpGet.mockReset();
    pdpGet.mockImplementation(async (_projectInterface: string, projectId: string) => ({
      subscribeSetting: (_key: string, callback: (value: unknown) => void) => {
        // Default: each project has a unique versification (its own id) unless a test overrides it.
        callback(projectId in projectVersifications ? projectVersifications[projectId] : projectId);
        return Promise.resolve(() => {});
      },
    }));
  });

  it('records and returns the source project id set with a scrRef', async () => {
    const host = await import('@renderer/services/scroll-group.service-host');
    host.setScrRefSync(2, { book: 'PSA', chapterNum: 23, verseNum: 1 }, 'projABC');
    expect(host.getScrRefSourceProjectIdSync(2)).toBe('projABC');
  });

  it('returns undefined source for a group never set', async () => {
    const host = await import('@renderer/services/scroll-group.service-host');
    expect(host.getScrRefSourceProjectIdSync(4)).toBeUndefined();
  });

  it('persists the source project id across a reload', async () => {
    const host1 = await import('@renderer/services/scroll-group.service-host');
    host1.setScrRefSync(3, { book: 'PSA', chapterNum: 23, verseNum: 1 }, 'projReload');

    // Simulate an app reload: drop the module cache but KEEP localStorage.
    vi.resetModules();

    const host2 = await import('@renderer/services/scroll-group.service-host');
    expect(host2.getScrRefSourceProjectIdSync(3)).toBe('projReload');
  });

  it('updates the source project when a same-numbered ref is set by a different project', async () => {
    const host = await import('@renderer/services/scroll-group.service-host');
    const ref = { book: 'PSA', chapterNum: 3, verseNum: 1 };
    host.setScrRefSync(1, ref, 'projA');

    const changed = host.setScrRefSync(1, { ...ref }, 'projB'); // same numbers, different source

    expect(changed).toBe(true);
    expect(host.getScrRefSourceProjectIdSync(1)).toBe('projB');
  });

  it('does not clobber a known source when a same-numbered ref is set with no source (verseRef echo)', async () => {
    const host = await import('@renderer/services/scroll-group.service-host');
    const ref = { book: 'PSA', chapterNum: 3, verseNum: 1 };
    host.setScrRefSync(1, ref, 'projA');

    const changed = host.setScrRefSync(1, { ...ref }); // undefined source, same numbers

    expect(changed).toBe(false);
    expect(host.getScrRefSourceProjectIdSync(1)).toBe('projA');
  });

  it('converts the stored ref into the target project versification and caches it', async () => {
    const converted = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };
    sendCommand.mockResolvedValue(converted);
    const host = await import('@renderer/services/scroll-group.service-host');
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sourceProj');

    const result = await host.getScrRefForProject(0, 'targetProj');

    expect(result).toEqual(converted);
    expect(sendCommand).toHaveBeenCalledWith(
      'platformScripture.mapVerseRefBetweenProjects',
      { book: 'PSA', chapterNum: 147, verseNum: 1 },
      'sourceProj',
      'targetProj',
    );

    sendCommand.mockClear();
    const again = await host.getScrRefForProject(0, 'targetProj');
    expect(again).toEqual(converted);
    expect(sendCommand).not.toHaveBeenCalled(); // second call served from cache
  });

  it('returns the raw ref without converting when source equals target', async () => {
    const host = await import('@renderer/services/scroll-group.service-host');
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sameProj');

    const result = await host.getScrRefForProject(0, 'sameProj');

    expect(result).toEqual({ book: 'PSA', chapterNum: 147, verseNum: 1 });
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('returns the raw ref without converting when the source frame is unknown', async () => {
    const host = await import('@renderer/services/scroll-group.service-host');
    // No source project stamped: an unknown frame must not be assumed English and converted.
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 147, verseNum: 1 });

    const result = await host.getScrRefForProject(0, 'targetProj');

    expect(result).toEqual({ book: 'PSA', chapterNum: 147, verseNum: 1 });
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('skips the round-trip when source and target share a versification', async () => {
    projectVersifications.sourceProj = 'shared';
    projectVersifications.targetProj = 'shared';
    const host = await import('@renderer/services/scroll-group.service-host');
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sourceProj');

    const result = await host.getScrRefForProject(0, 'targetProj');

    expect(result).toEqual({ book: 'PSA', chapterNum: 147, verseNum: 1 });
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('coalesces concurrent identical conversions into a single round-trip', async () => {
    const converted = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };
    sendCommand.mockResolvedValue(converted);
    const host = await import('@renderer/services/scroll-group.service-host');
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sourceProj');

    const [first, second] = await Promise.all([
      host.getScrRefForProject(0, 'targetProj'),
      host.getScrRefForProject(0, 'targetProj'),
    ]);

    expect(first).toEqual(converted);
    expect(second).toEqual(converted);
    expect(sendCommand).toHaveBeenCalledTimes(1); // shared in-flight promise, one round-trip
  });

  it('falls back to the raw ref on conversion failure and retries on a later navigation', async () => {
    sendCommand.mockRejectedValue(new Error('conversion command not ready'));
    const host = await import('@renderer/services/scroll-group.service-host');
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sourceProj');

    const first = await host.getScrRefForProject(0, 'targetProj');
    expect(first).toEqual({ book: 'PSA', chapterNum: 147, verseNum: 1 }); // raw fallback, no throw
    expect(sendCommand).toHaveBeenCalledTimes(1);

    // A transient failure must NOT permanently suppress the project: a later navigation retries.
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 148, verseNum: 1 }, 'sourceProj');
    sendCommand.mockClear();
    const second = await host.getScrRefForProject(0, 'targetProj');
    expect(second).toEqual({ book: 'PSA', chapterNum: 148, verseNum: 1 });
    expect(sendCommand).toHaveBeenCalledTimes(1); // retried, not suppressed
  });

  it('getScrRefForProjectSync returns a cached conversion, else the raw ref', async () => {
    const converted = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };
    sendCommand.mockResolvedValue(converted);
    const host = await import('@renderer/services/scroll-group.service-host');
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sourceProj');

    // Before any conversion is cached, the sync getter returns the raw ref.
    expect(host.getScrRefForProjectSync(0, 'targetProj')).toEqual({
      book: 'PSA',
      chapterNum: 147,
      verseNum: 1,
    });

    // After an async conversion caches the result, the sync getter returns it.
    await host.getScrRefForProject(0, 'targetProj');
    expect(host.getScrRefForProjectSync(0, 'targetProj')).toEqual(converted);
  });

  it('rewrites the platform.verseRef setting when the verse numbers change on group 0', async () => {
    const host = await import('@renderer/services/scroll-group.service-host');
    settingsSet.mockClear();

    host.setScrRefSync(0, { book: 'PSA', chapterNum: 23, verseNum: 1 }, 'projA');

    // The write happens synchronously inside setScrRefSync (no await before settingsService.set).
    expect(settingsSet).toHaveBeenCalledWith('platform.verseRef', {
      book: 'PSA',
      chapterNum: 23,
      verseNum: 1,
    });
  });

  it('does NOT rewrite platform.verseRef on a source-only change to group 0', async () => {
    const host = await import('@renderer/services/scroll-group.service-host');
    const ref = { book: 'PSA', chapterNum: 23, verseNum: 1 };
    host.setScrRefSync(0, ref, 'projA');
    settingsSet.mockClear();

    // Same numbers, different source: must still emit for followers (changed === true) but must not
    // rewrite the frame-blind setting, which would fan out an identical-value notification app-wide.
    const changed = host.setScrRefSync(0, { ...ref }, 'projB');

    expect(changed).toBe(true);
    expect(host.getScrRefSourceProjectIdSync(0)).toBe('projB');
    expect(settingsSet).not.toHaveBeenCalled();
  });
});
