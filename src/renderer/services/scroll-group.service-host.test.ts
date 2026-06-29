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
});
