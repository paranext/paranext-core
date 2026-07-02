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

  it('clears a failed versification subscription so a later navigation retries it', async () => {
    // Both projects share a versification ONCE their subscription succeeds, so a successful retry
    // engages the same-versification fast path (no round-trip). That skipped round-trip is the
    // observable proof the failed subscription entry was cleared rather than latched off for the
    // session: if the `catch`'s `versificationSubscriptions.delete` were removed, the second
    // navigation would reuse the failed (resolved-void) setup promise, never learn the shared
    // versification, and fire another conversion — failing the final assertion below.
    projectVersifications.sourceProj = 'shared';
    projectVersifications.targetProj = 'shared';

    // Reject the first subscribe attempt per project (e.g. project still loading), then succeed.
    const pdpAttempts: Record<string, number> = {};
    pdpGet.mockImplementation(async (_projectInterface: string, projectId: string) => {
      pdpAttempts[projectId] = (pdpAttempts[projectId] ?? 0) + 1;
      if (pdpAttempts[projectId] === 1) throw new Error('project still loading');
      return {
        subscribeSetting: (_key: string, callback: (value: unknown) => void) => {
          callback(projectVersifications[projectId]);
          return Promise.resolve(() => {});
        },
      };
    });

    const converted = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };
    sendCommand.mockResolvedValue(converted);
    const host = await import('@renderer/services/scroll-group.service-host');
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sourceProj');

    // First navigation: both subscriptions fail, so versifications stay unknown and the host cannot
    // take the fast path — it conservatively fires the conversion round-trip rather than throwing.
    const first = await host.getScrRefForProject(0, 'targetProj');
    expect(first).toEqual(converted);
    expect(sendCommand).toHaveBeenCalledTimes(1);

    // Second navigation (new verse => fresh cache key): the cleared entries let the subscriptions
    // retry and succeed; source and target now report the same versification, so the fast path skips
    // the round-trip entirely.
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 148, verseNum: 1 }, 'sourceProj');
    sendCommand.mockClear();
    const second = await host.getScrRefForProject(0, 'targetProj');
    expect(second).toEqual({ book: 'PSA', chapterNum: 148, verseNum: 1 });
    expect(sendCommand).not.toHaveBeenCalled(); // subscription retried and fast path engaged
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

  it('evicts the oldest cached conversion once past the size cap', async () => {
    // Each conversion echoes its input ref with a marker, so a cache hit is distinguishable from the
    // raw (unconverted) ref returned on a miss.
    sendCommand.mockImplementation(async (_command: string, ref: object) => ({
      ...ref,
      versificationStr: 'converted',
    }));
    const host = await import('@renderer/services/scroll-group.service-host');

    // Distinct refs whose numbers stay within a single field's range: verse in 1..100, chapter in
    // 1..11, so no value saturates the BBBCCCVVV encoding that setScrRefSync's no-op guard compares.
    // (Pushing verseNum past ~999 would collide adjacent refs and the stored ref would stop
    // advancing.) Each successive ref is strictly greater, so setScrRefSync always advances.
    const refForIndex = (i: number) => ({
      book: 'PSA',
      chapterNum: Math.floor((i - 1) / 100) + 1,
      verseNum: ((i - 1) % 100) + 1,
    });

    const CAP = 1000; // must match CONVERSION_CACHE_MAX_SIZE in the host
    // Fill the cache to exactly the cap with distinct refs (distinct ref => distinct cache key).
    // Sequential (not Promise.all) on purpose: eviction is insertion-ordered, so the order these are
    // cached in is exactly what the test asserts on.
    for (let i = 1; i <= CAP; i += 1) {
      host.setScrRefSync(0, refForIndex(i), 'sourceProj');
      // Sequential await is intentional: eviction is insertion-ordered, so entries must be cached
      // one at a time in a deterministic order — Promise.all would race that order and make the
      // "oldest evicted" assertion nondeterministic.
      // eslint-disable-next-line no-await-in-loop
      await host.getScrRefForProject(0, 'targetProj');
    }

    // One more distinct conversion tips the cache over the cap and must evict the oldest entry (i=1).
    host.setScrRefSync(0, refForIndex(CAP + 1), 'sourceProj');
    await host.getScrRefForProject(0, 'targetProj');

    // The oldest (i=1) conversion was evicted: its sync lookup now misses and returns the raw ref.
    host.setScrRefSync(0, refForIndex(1), 'sourceProj');
    expect(host.getScrRefForProjectSync(0, 'targetProj')).toEqual(refForIndex(1));

    // A newer entry (the last one cached before eviction) is still present: only the oldest was dropped.
    host.setScrRefSync(0, refForIndex(CAP), 'sourceProj');
    expect(host.getScrRefForProjectSync(0, 'targetProj')).toEqual({
      ...refForIndex(CAP),
      versificationStr: 'converted',
    });
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
