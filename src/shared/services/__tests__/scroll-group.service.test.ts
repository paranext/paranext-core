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

/** Minimal stand-in for the scroll group network object whichever window publishes it serves */
function makePublishedScrollGroupObject(scrRef: SerializedVerseRef) {
  const disposeCallbacks: (() => void)[] = [];
  return {
    object: {
      getScrRef: vi.fn(async () => scrRef),
      onDidDispose: (callback: () => void) => {
        disposeCallbacks.push(callback);
        return () => true;
      },
    },
    /**
     * Stand in for the publishing window closing: every process forgets the object it can no longer
     * reach, which fires this dispose and revokes the proxy that was standing in for it.
     */
    close: () => {
      disposeCallbacks.forEach((callback) => callback());
    },
  };
}

// Exactly one renderer publishes the scroll group network object, and another window takes the name
// over when that one closes. Consumers of this service live in every process, so they have to follow
// the handover rather than hold the closed window's proxy.
describe('scroll group service across a publishing window closing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('resolves the object again after the window publishing it closed', async () => {
    const genesis: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
    const mark: SerializedVerseRef = { book: 'MRK', chapterNum: 4, verseNum: 1 };
    const publishedFirst = makePublishedScrollGroupObject(genesis);
    const publishedAfterTakeover = makePublishedScrollGroupObject(mark);
    mocks.get
      .mockResolvedValueOnce(publishedFirst.object)
      .mockResolvedValueOnce(publishedAfterTakeover.object);

    const { scrollGroupService } = await import('@shared/services/scroll-group.service');

    expect(await scrollGroupService.getScrRef(0)).toEqual(genesis);
    expect(mocks.get).toHaveBeenCalledTimes(1);

    publishedFirst.close();
    // Calling the closed window's object now throws "proxy has been revoked", so a consumer that
    // kept it would be dead for the rest of the session
    publishedFirst.object.getScrRef.mockRejectedValue(
      new TypeError("Cannot perform 'get' on a proxy that has been revoked"),
    );

    expect(await scrollGroupService.getScrRef(0)).toEqual(mark);
    expect(mocks.get).toHaveBeenCalledTimes(2);
  });

  it('keeps using the same object while the window publishing it is still there', async () => {
    const genesis: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
    const published = makePublishedScrollGroupObject(genesis);
    mocks.get.mockResolvedValue(published.object);

    const { scrollGroupService } = await import('@shared/services/scroll-group.service');

    await scrollGroupService.getScrRef(0);
    await scrollGroupService.getScrRef(1);

    // Resolving per call would put a round trip in front of every scroll group read
    expect(mocks.get).toHaveBeenCalledTimes(1);
    expect(mocks.waitForNetworkObject).toHaveBeenCalledTimes(1);
  });
});
