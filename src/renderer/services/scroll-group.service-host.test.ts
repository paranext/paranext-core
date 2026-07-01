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

describe('scroll-group.service-host source project tracking', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetModules();
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
});
