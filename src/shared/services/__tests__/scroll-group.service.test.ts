import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SerializedVerseRef } from '@sillsdev/scripture';

const mocks = vi.hoisted(() => ({
  waitForNetworkObject: vi.fn(async () => ({ id: 'ScrollGroupService' })),
  get: vi.fn(),
}));

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: () => () => () => true,
}));
vi.mock('@shared/services/network-object-status.service', () => ({
  networkObjectStatusService: { waitForNetworkObject: mocks.waitForNetworkObject },
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.get },
}));

/** Minimal stand-in for the scroll group network object main hosts */
function makeScrollGroupObject(scrRef: SerializedVerseRef) {
  return {
    getScrRef: vi.fn(async () => scrRef),
    onDidDispose: () => () => true,
  };
}

describe('scroll group service proxy', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('resolves the host object once and reuses it', async () => {
    const genesis: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
    mocks.get.mockResolvedValue(makeScrollGroupObject(genesis));

    const { scrollGroupService } = await import('@shared/services/scroll-group.service');

    expect(await scrollGroupService.getScrRef(0)).toEqual(genesis);
    await scrollGroupService.getScrRef(1);

    // Resolving per call would put a round trip in front of every scroll group read
    expect(mocks.get).toHaveBeenCalledTimes(1);
    expect(mocks.waitForNetworkObject).toHaveBeenCalledTimes(1);
  });

  // The object is hosted in main, so it is there for as long as the app is. What can still fail is
  // asking before it has been announced, and that must not latch the service off for the session.
  it('tries again after a failed resolution', async () => {
    const genesis: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
    mocks.get.mockResolvedValueOnce(undefined).mockResolvedValue(makeScrollGroupObject(genesis));

    const { scrollGroupService } = await import('@shared/services/scroll-group.service');

    await expect(scrollGroupService.getScrRef(0)).rejects.toThrow();
    expect(await scrollGroupService.getScrRef(0)).toEqual(genesis);
  });
});
