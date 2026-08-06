import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY,
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
} from '@shared/services/scroll-group.service-model';
import { SerializedVerseRef } from '@sillsdev/scripture';

// The host reads localStorage and creates network emitters at import time; stub those. Emitters are
// captured by event name so a test can assert on one specific event.
const { emitters, networkObjectSet } = vi.hoisted(() => {
  const hoistedEmitters: Record<string, { emit: ReturnType<typeof vi.fn> }> = {};
  return { emitters: hoistedEmitters, networkObjectSet: vi.fn() };
});
vi.mock('@shared/services/network.service', () => ({
  createBufferedNetworkEventEmitter: (eventName: string) => {
    const emitter = { emit: vi.fn() };
    emitters[eventName] = emitter;
    return emitter;
  },
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: networkObjectSet },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const sendCommand = vi.fn();
vi.mock('@shared/services/command.service', () => ({
  sendCommand: (...args: unknown[]) => sendCommand(...args),
}));

beforeEach(() => {
  localStorage.clear();
  vi.resetModules();
  sendCommand.mockReset();
  networkObjectSet.mockReset();
  networkObjectSet.mockResolvedValue({ onDidDispose: vi.fn() });
  Object.keys(emitters).forEach((key) => delete emitters[key]);
});

describe('scroll group service host source project tracking', () => {
  it('records and returns the source project id set with a scrRef', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    await host.setScrRef(2, { book: 'PSA', chapterNum: 23, verseNum: 1 }, 'projABC');
    const snapshot = await host.getScrollGroupSnapshot();
    expect(snapshot.scrRefSourceProjectIds[2]).toBe('projABC');
  });

  it('returns undefined source for a group never set', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    const snapshot = await host.getScrollGroupSnapshot();
    expect(snapshot.scrRefSourceProjectIds[4]).toBeUndefined();
  });

  it('persists the source project id across a restart', async () => {
    const host1 = await import('@main/services/scroll-group.service-host');
    await host1.setScrRef(3, { book: 'PSA', chapterNum: 23, verseNum: 1 }, 'projReload');

    // Simulate an app restart: drop the module cache but KEEP the store.
    vi.resetModules();

    const host2 = await import('@main/services/scroll-group.service-host');
    const snapshot = await host2.getScrollGroupSnapshot();
    expect(snapshot.scrRefSourceProjectIds[3]).toBe('projReload');
  });

  it('updates the source project when a same-numbered ref is set by a different project', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    const ref = { book: 'PSA', chapterNum: 3, verseNum: 1 };
    await host.setScrRef(1, ref, 'projA');

    const changed = await host.setScrRef(1, { ...ref }, 'projB'); // same numbers, different source

    expect(changed).toBe(true);
    const snapshot = await host.getScrollGroupSnapshot();
    expect(snapshot.scrRefSourceProjectIds[1]).toBe('projB');
  });

  it('does not clobber a known source when a same-numbered ref is set with no source', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    const ref = { book: 'PSA', chapterNum: 3, verseNum: 1 };
    await host.setScrRef(1, ref, 'projA');

    const changed = await host.setScrRef(1, { ...ref }); // undefined source, same numbers

    expect(changed).toBe(false);
    const snapshot = await host.getScrollGroupSnapshot();
    expect(snapshot.scrRefSourceProjectIds[1]).toBe('projA');
  });

  it('converts the stored ref into the target project versification', async () => {
    const converted = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };
    sendCommand.mockResolvedValue(converted);
    const host = await import('@main/services/scroll-group.service-host');
    await host.setScrRef(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sourceProj');

    const result = await host.getScrRefForProject(0, 'targetProj');

    expect(result).toEqual(converted);
    expect(sendCommand).toHaveBeenCalledWith(
      'platformScripture.mapVerseRefBetweenProjects',
      { book: 'PSA', chapterNum: 147, verseNum: 1 },
      'sourceProj',
      'targetProj',
    );
  });

  // Uncached on purpose (see getScrRefForProject): nothing in this process would know to invalidate
  // a cached conversion when a project's versification changes, so a repeat asks again.
  it('asks again rather than serving a repeated conversion from a cache', async () => {
    sendCommand.mockResolvedValue({ book: 'PSA', chapterNum: 146, verseNum: 1 });
    const host = await import('@main/services/scroll-group.service-host');
    await host.setScrRef(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sourceProj');

    await host.getScrRefForProject(0, 'targetProj');
    await host.getScrRefForProject(0, 'targetProj');

    expect(sendCommand).toHaveBeenCalledTimes(2);
  });

  it('returns the raw ref without converting when source equals target', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    await host.setScrRef(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sameProj');

    const result = await host.getScrRefForProject(0, 'sameProj');

    expect(result).toEqual({ book: 'PSA', chapterNum: 147, verseNum: 1 });
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('returns the raw ref without converting when the source frame is unknown', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    // No source project stamped: an unknown frame must not be assumed English and converted.
    await host.setScrRef(0, { book: 'PSA', chapterNum: 147, verseNum: 1 });

    const result = await host.getScrRefForProject(0, 'targetProj');

    expect(result).toEqual({ book: 'PSA', chapterNum: 147, verseNum: 1 });
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('falls back to the raw ref on conversion failure without suppressing the project', async () => {
    sendCommand.mockRejectedValue(new Error('conversion command not ready'));
    const host = await import('@main/services/scroll-group.service-host');
    await host.setScrRef(0, { book: 'PSA', chapterNum: 147, verseNum: 1 }, 'sourceProj');

    const first = await host.getScrRefForProject(0, 'targetProj');
    expect(first).toEqual({ book: 'PSA', chapterNum: 147, verseNum: 1 }); // raw fallback, no throw

    // A transient failure must NOT permanently suppress the project: a later call tries again.
    sendCommand.mockClear();
    await host.getScrRefForProject(0, 'targetProj');
    expect(sendCommand).toHaveBeenCalledTimes(1);
  });
});

describe('reference history', () => {
  it('setScrRef records history seeded with the starting reference', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    await host.setScrRef(1, { book: 'MRK', chapterNum: 4, verseNum: 1 });
    const history = await host.getReferenceHistory(1);
    // Seeded with the group's starting ref (default GEN 1:1); MRK 4 is now current, GEN 1:1 is back
    expect(history.current).toEqual({
      scrRef: { book: 'MRK', chapterNum: 4, verseNum: 1 },
      sourceProjectId: undefined,
    });
    expect(history.back).toEqual([
      { scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, sourceProjectId: undefined },
    ]);
    expect(history.forward).toEqual([]);
  });

  it('navigateReferenceHistory(-1) restores the previous ref without re-recording', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    await host.setScrRef(1, { book: 'MRK', chapterNum: 4, verseNum: 1 });
    const didNavigate = await host.navigateReferenceHistory(1, -1);
    expect(didNavigate).toBe(true);
    expect(await host.getScrRef(1)).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    const history = await host.getReferenceHistory(1);
    expect(history.current).toEqual({
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      sourceProjectId: undefined,
    });
    expect(history.back).toEqual([]);
    expect(history.forward).toEqual([
      { scrRef: { book: 'MRK', chapterNum: 4, verseNum: 1 }, sourceProjectId: undefined },
    ]);
  });

  it('navigateReferenceHistory returns false when there is nothing to navigate to', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    expect(await host.navigateReferenceHistory(1, -1)).toBe(false);
    expect(await host.navigateReferenceHistory(1, 1)).toBe(false);
  });

  it('a multi-step jump onto a same-numbers entry applies the destination source frame', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    // Build history whose oldest back entry is the seeded GEN 1:1 with an UNKNOWN source, while the
    // current stored ref is a same-numbers GEN 1:1 with a KNOWN source:
    //   seed GEN 1:1 (source undefined) -> MAT (projNT) -> GEN 1:1 (projOT)
    await host.setScrRef(0, { book: 'MAT', chapterNum: 1, verseNum: 1 }, 'projNT');
    await host.setScrRef(0, { book: 'GEN', chapterNum: 1, verseNum: 1 }, 'projOT');
    expect((await host.getScrollGroupSnapshot()).scrRefSourceProjectIds[0]).toBe('projOT');

    // Jump back two entries, landing on the sourceless GEN 1:1. Its numbers equal the current stored
    // ref, which would trip setScrRef's no-op guard and leave the source frame lagging at 'projOT'.
    // Writing through the un-guarded low-level write applies the destination frame.
    expect(await host.navigateReferenceHistory(0, -2)).toBe(true);
    expect(await host.getScrRef(0)).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    expect((await host.getScrollGroupSnapshot()).scrRefSourceProjectIds[0]).toBeUndefined();
  });

  it('histories are per scroll group', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    await host.setScrRef(1, { book: 'MRK', chapterNum: 4, verseNum: 1 });
    await host.setScrRef(2, { book: 'LUK', chapterNum: 2, verseNum: 1 });
    expect((await host.getReferenceHistory(1)).current?.scrRef.book).toBe('MRK');
    expect((await host.getReferenceHistory(2)).current?.scrRef.book).toBe('LUK');
    expect((await host.getReferenceHistory(1)).back).toHaveLength(1);
  });

  it('getReferenceHistory returns copies, not live state', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    await host.setScrRef(1, { book: 'MRK', chapterNum: 4, verseNum: 1 });
    const history = await host.getReferenceHistory(1);
    history.back.length = 0;
    expect((await host.getReferenceHistory(1)).back).toHaveLength(1);
  });

  it('emits the reference-history-changed event on record and on navigation', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    const { emit } = emitters[EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY];

    await host.setScrRef(1, { book: 'MRK', chapterNum: 4, verseNum: 1 });
    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenLastCalledWith({
      scrollGroupId: 1,
      history: {
        current: {
          scrRef: { book: 'MRK', chapterNum: 4, verseNum: 1 },
          sourceProjectId: undefined,
        },
        back: [{ scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, sourceProjectId: undefined }],
        forward: [],
      },
    });

    await host.navigateReferenceHistory(1, -1);
    expect(emit).toHaveBeenCalledTimes(2);
    expect(emit).toHaveBeenLastCalledWith({
      scrollGroupId: 1,
      history: {
        current: {
          scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
          sourceProjectId: undefined,
        },
        back: [],
        forward: [
          { scrRef: { book: 'MRK', chapterNum: 4, verseNum: 1 }, sourceProjectId: undefined },
        ],
      },
    });
  });
});

describe('registration', () => {
  it('registers the network object under the app-global name with the experimental methods marked', async () => {
    const host = await import('@main/services/scroll-group.service-host');

    await host.startScrollGroupServiceHost();

    expect(networkObjectSet).toHaveBeenCalledTimes(1);
    const [name, , , , documentation] = networkObjectSet.mock.calls[0];
    expect(name).toBe('ScrollGroupService');
    const experimentalMethodNames = documentation.methods
      .filter((method: { 'x-experimental'?: boolean }) => method['x-experimental'])
      .map((method: { name: string }) => method.name);
    expect(experimentalMethodNames).toEqual([
      'getReferenceHistory',
      'navigateReferenceHistory',
      'getScrollGroupSnapshot',
      'migrateStoredScrollGroupState',
    ]);
  });
});

// Before the host existed, this state lived in a renderer's own localStorage, which this process
// cannot read. A window that still has it offers it once at startup.
describe('adopting previously stored state', () => {
  const previouslyStored = {
    scrRefs: { 0: { book: 'MRK', chapterNum: 4, verseNum: 1 } },
    scrRefSourceProjectIds: { 0: 'projOld' },
  };

  it('adopts an offer when it has nothing of its own', async () => {
    const host = await import('@main/services/scroll-group.service-host');

    await host.migrateStoredScrollGroupState(previouslyStored);

    expect(await host.getScrRef(0)).toEqual({ book: 'MRK', chapterNum: 4, verseNum: 1 });
    expect((await host.getScrollGroupSnapshot()).scrRefSourceProjectIds[0]).toBe('projOld');
  });

  it('adopts without recording it as navigation or announcing it as a change', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    const scrRefEmit = emitters[EVENT_NAME_ON_DID_UPDATE_SCR_REF].emit;
    const historyEmit = emitters[EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY].emit;

    await host.migrateStoredScrollGroupState(previouslyStored);

    expect(scrRefEmit).not.toHaveBeenCalled();
    expect(historyEmit).not.toHaveBeenCalled();
    // The adopted reference is where the history starts, not somewhere it was navigated to
    const history = await host.getReferenceHistory(0);
    expect(history.back).toEqual([]);
    expect(history.current).toEqual({
      scrRef: { book: 'MRK', chapterNum: 4, verseNum: 1 },
      sourceProjectId: 'projOld',
    });
  });

  it('ignores every offer after the first', async () => {
    const host = await import('@main/services/scroll-group.service-host');

    await host.migrateStoredScrollGroupState(previouslyStored);
    await host.migrateStoredScrollGroupState({
      scrRefs: { 0: { book: 'LUK', chapterNum: 2, verseNum: 1 } },
      scrRefSourceProjectIds: { 0: 'projOther' },
    });

    expect(await host.getScrRef(0)).toEqual({ book: 'MRK', chapterNum: 4, verseNum: 1 });
  });

  it('refuses an offer once it has state of its own, even having never adopted one', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    // The app has been used since the offer that never arrived
    await host.setScrRef(0, { book: 'LUK', chapterNum: 2, verseNum: 1 }, 'projNew');

    await host.migrateStoredScrollGroupState(previouslyStored);

    expect(await host.getScrRef(0)).toEqual({ book: 'LUK', chapterNum: 2, verseNum: 1 });
  });

  it('brings a reference forward from the older bookNum shape', async () => {
    const host = await import('@main/services/scroll-group.service-host');

    await host.migrateStoredScrollGroupState({
      // The shape stored before references carried a book id
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      scrRefs: { 0: { bookNum: 41, chapterNum: 4, verseNum: 1 } as unknown as SerializedVerseRef },
      scrRefSourceProjectIds: {},
    });

    expect(await host.getScrRef(0)).toEqual({ book: 'MRK', chapterNum: 4, verseNum: 1 });
  });
});
