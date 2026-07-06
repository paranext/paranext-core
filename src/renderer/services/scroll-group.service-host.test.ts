import { describe, expect, it, vi, beforeEach } from 'vitest';
import { EVENT_NAME_ON_DID_CHANGE_VERSIFICATION } from '@shared/services/scroll-group.service-model';

// The host module reads localStorage and creates a network emitter at import time; stub those.
// Emitters are captured by event name so tests can assert on a specific event (e.g.
// onDidChangeVersification) without conflating it with the pre-existing onDidUpdateScrRef emitter.
const { emitters } = vi.hoisted(() => {
  const hoistedEmitters: Record<string, { emit: ReturnType<typeof vi.fn> }> = {};
  return { emitters: hoistedEmitters };
});
vi.mock('@shared/services/network.service', () => ({
  createBufferedNetworkEventEmitter: (eventName: string) => {
    const emitter = { emit: vi.fn() };
    emitters[eventName] = emitter;
    return emitter;
  },
  getNetworkEvent: () => vi.fn(),
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: vi.fn() },
}));
const { settingsSet, verseRefSubscriberRef } = vi.hoisted(() => {
  // Captures the callback the host registers for the `platform.verseRef` setting so tests can drive
  // its echoes directly.
  const capturedVerseRefSubscriber: { current: ((value: unknown) => void) | undefined } = {
    current: undefined,
  };
  return { settingsSet: vi.fn(), verseRefSubscriberRef: capturedVerseRefSubscriber };
});
vi.mock('@shared/services/settings.service', () => ({
  settingsService: {
    set: (...args: unknown[]) => settingsSet(...args),
    subscribe: vi.fn(async (key: string, callback: (value: unknown) => void) => {
      if (key === 'platform.verseRef') verseRefSubscriberRef.current = callback;
      return () => {};
    }),
  },
}));
vi.mock('@shared/services/logger.service', () => ({ logger: { warn: vi.fn(), error: vi.fn() } }));

const sendCommand = vi.fn();
vi.mock('@shared/services/command.service', () => ({
  sendCommand: (...args: unknown[]) => sendCommand(...args),
}));

// getScrRefForProject reads each project's versification via a base-PDP setting subscription. Mock
// it: by default every project reports a unique versification (its own id) so conversions fire;
// tests set `projectVersifications[id]` to make projects share a base versification identifier, or
// to be unresolvable (undefined).
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
    Object.keys(emitters).forEach((key) => delete emitters[key]);
    verseRefSubscriberRef.current = undefined;
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

  it('still converts when source and target report the same base versification identifier', async () => {
    // The platformScripture.versification setting carries only the base ScrVersType (e.g. "4"), not
    // custom.vrs content, so two projects reporting the same identifier can still differ. The base
    // identifier must NOT skip conversion; the C# command decides with the real ScrVers.
    projectVersifications.sourceProj = 'shared';
    projectVersifications.targetProj = 'shared';
    const converted = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };
    sendCommand.mockResolvedValue(converted);
    const host = await import('@renderer/services/scroll-group.service-host');
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sourceProj');

    const result = await host.getScrRefForProject(0, 'targetProj');

    expect(result).toEqual(converted);
    expect(sendCommand).toHaveBeenCalledTimes(1); // round-trip fired despite equal base identifiers
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
    // The retry is observable as a SECOND subscription attempt: if the catch's
    // `versificationSubscriptions.delete` were removed, the failed (resolved-void) setup promise would
    // be reused and the project's PDP would never be requested again.
    const pdpAttempts: Record<string, number> = {};
    pdpGet.mockImplementation(async (_projectInterface: string, projectId: string) => {
      pdpAttempts[projectId] = (pdpAttempts[projectId] ?? 0) + 1;
      if (pdpAttempts[projectId] === 1) throw new Error('project still loading');
      return {
        subscribeSetting: (_key: string, callback: (value: unknown) => void) => {
          callback(projectId);
          return Promise.resolve(() => {});
        },
      };
    });
    sendCommand.mockResolvedValue({ book: 'PSA', chapterNum: 146, verseNum: 1 });
    const host = await import('@renderer/services/scroll-group.service-host');
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sourceProj');

    await host.getScrRefForProject(0, 'targetProj'); // first attempt: sourceProj subscribe throws
    await host.getScrRefForProject(0, 'targetProj'); // second navigation retries the failed project

    expect(pdpAttempts.sourceProj).toBe(2); // retried, not latched off for the session
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

  it('emits a versification-changed event only when a tracked versification actually changes', async () => {
    const callbacks: Record<string, (value: unknown) => void> = {};
    pdpGet.mockImplementation(async (_pi: string, projectId: string) => ({
      subscribeSetting: (_key: string, callback: (value: unknown) => void) => {
        callbacks[projectId] = callback;
        callback(projectId); // initial value (unique per project)
        return Promise.resolve(() => {});
      },
    }));
    sendCommand.mockResolvedValue({ book: 'PSA', chapterNum: 146, verseNum: 1 });
    const host = await import('@renderer/services/scroll-group.service-host');
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sourceProj');
    await host.getScrRefForProject(0, 'targetProj'); // establishes subscriptions for both projects

    const { emit } = emitters[EVENT_NAME_ON_DID_CHANGE_VERSIFICATION];
    expect(emit).not.toHaveBeenCalled(); // initial retrieveDataImmediately load must NOT emit

    callbacks.sourceProj('a-different-versification'); // genuine mid-session change
    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith({ projectId: 'sourceProj' });
  });

  it('ignores its own platform.verseRef mirror echoes so a stale echo cannot clear a known source', async () => {
    const host = await import('@renderer/services/scroll-group.service-host');
    await host.startScrollGroupService();
    const verseRefEcho = verseRefSubscriberRef.current;
    expect(verseRefEcho).toBeDefined();
    if (!verseRefEcho) throw new Error('verseRef subscriber was not captured');

    // A group-0 navigation stamps a source and mirrors the ref out to platform.verseRef.
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 40, verseNum: 5 }, 'projSource');
    // A second group-0 write (e.g. the editor settling on the chapter after a scroll) moves the ref
    // and re-mirrors it. Both writes carry a known source.
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 40, verseNum: 0 }, 'projSource');
    expect(host.getScrRefSourceProjectIdSync(0)).toBe('projSource');

    // The setting echoes arrive out of order. Previously the STALE echo (40:5) — no longer matching
    // the stored 40:0 — was treated as an external, frame-unknown change and CLEARED the source,
    // leaving followers unable to convert (both panels show the raw ref). Both echoes are ours and
    // must be ignored.
    verseRefEcho({ book: 'PSA', chapterNum: 40, verseNum: 5 });
    verseRefEcho({ book: 'PSA', chapterNum: 40, verseNum: 0 });

    expect(host.getScrRefSourceProjectIdSync(0)).toBe('projSource'); // source preserved
    expect(host.getScrRefSync(0)).toEqual({ book: 'PSA', chapterNum: 40, verseNum: 0 });
  });

  it('still applies a genuine external platform.verseRef change it never mirrored', async () => {
    const host = await import('@renderer/services/scroll-group.service-host');
    await host.startScrollGroupService();
    const verseRefEcho = verseRefSubscriberRef.current;
    if (!verseRefEcho) throw new Error('verseRef subscriber was not captured');

    host.setScrRefSync(0, { book: 'PSA', chapterNum: 40, verseNum: 5 }, 'projSource');

    // An external writer sets a reference this host never mirrored: it must still take effect, and
    // (frame unknown) clear the source so followers do not mis-frame it — the documented behavior.
    verseRefEcho({ book: 'GEN', chapterNum: 1, verseNum: 1 });

    expect(host.getScrRefSync(0)).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    expect(host.getScrRefSourceProjectIdSync(0)).toBeUndefined();
  });
});
