import { describe, expect, it, vi, beforeEach } from 'vitest';

// The host module reads localStorage and creates a network emitter at import time; stub those.
vi.mock('@shared/services/network.service', () => ({
  createBufferedNetworkEventEmitter: () => ({ emit: vi.fn() }),
  getNetworkEvent: () => vi.fn(),
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: vi.fn() },
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { set: vi.fn(), subscribe: vi.fn() },
}));
vi.mock('@shared/services/logger.service', () => ({ logger: { warn: vi.fn(), error: vi.fn() } }));

const sendCommand = vi.fn();
vi.mock('@shared/services/command.service', () => ({
  sendCommand: (...args: unknown[]) => sendCommand(...args),
}));

describe('scroll-group.service-host source project tracking', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetModules();
    sendCommand.mockReset();
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

  it('falls back to the raw ref and stops retrying when conversion fails for a non-scripture target', async () => {
    sendCommand.mockRejectedValue(new Error('not a scripture project'));
    const host = await import('@renderer/services/scroll-group.service-host');
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sourceProj');

    const first = await host.getScrRefForProject(0, 'lexiconProj');
    expect(first).toEqual({ book: 'PSA', chapterNum: 147, verseNum: 1 }); // raw fallback, no throw
    expect(sendCommand).toHaveBeenCalledTimes(1);

    // A later navigation to a different verse must not re-fire the failing conversion.
    host.setScrRefSync(0, { book: 'PSA', chapterNum: 148, verseNum: 1 }, 'sourceProj');
    sendCommand.mockClear();
    const second = await host.getScrRefForProject(0, 'lexiconProj');
    expect(second).toEqual({ book: 'PSA', chapterNum: 148, verseNum: 1 });
    expect(sendCommand).not.toHaveBeenCalled(); // suppressed after the first failure for this target
  });
});
