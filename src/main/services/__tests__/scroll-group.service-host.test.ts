import { afterEach, describe, expect, it, vi, beforeEach } from 'vitest';
import {
  EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY,
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
  SCR_REFS_STORAGE_KEY,
} from '@shared/services/scroll-group.service-model';
import { logger } from '@shared/services/logger.service';
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
  // The host writes its store on a debounce timer, so every test in this file runs on a clock it
  // controls: without that, a write scheduled by one test lands in the middle of another.
  vi.useFakeTimers();
  localStorage.clear();
  vi.resetModules();
  sendCommand.mockReset();
  networkObjectSet.mockReset();
  networkObjectSet.mockResolvedValue({ onDidDispose: vi.fn() });
  Object.values(logger).forEach((logMock) => vi.mocked(logMock).mockClear());
  Object.keys(emitters).forEach((key) => delete emitters[key]);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
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
    host1.flushPersistedScrollGroupState();

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

// Main's event loop is the JSON-RPC server every other process talks through, and each store write
// is a synchronous fsync on it, so the store is written lazily and memory is what everything reads.
describe('persisting the state', () => {
  it('writes once for a run of navigations rather than once per navigation', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    await host.setScrRef(0, { book: 'MRK', chapterNum: 4, verseNum: 1 });
    await host.setScrRef(0, { book: 'MRK', chapterNum: 5, verseNum: 1 });
    await host.setScrRef(0, { book: 'MRK', chapterNum: 6, verseNum: 1 });

    // Each write is a synchronous fsync on the event loop every other process talks through, so
    // holding a next-verse key down must not put one between them and the platform per verse.
    expect(setItem).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(setItem.mock.calls.filter(([key]) => key === SCR_REFS_STORAGE_KEY)).toHaveLength(1);
    expect(localStorage.getItem(SCR_REFS_STORAGE_KEY)).toContain('"chapterNum":6');
  });

  it('writes the current state when the app is shutting down', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    await host.setScrRef(0, { book: 'LUK', chapterNum: 2, verseNum: 1 });

    // Quitting right after navigating is something users do on purpose, so the lag the debounce
    // introduces has to be closed on the way down rather than lost.
    host.flushPersistedScrollGroupState();

    expect(localStorage.getItem(SCR_REFS_STORAGE_KEY)).toContain('LUK');
  });

  it('keeps announcing changes when the store cannot be written', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    const scrRefEmit = emitters[EVENT_NAME_ON_DID_UPDATE_SCR_REF].emit;
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('disk full');
    });

    await host.setScrRef(0, { book: 'LUK', chapterNum: 2, verseNum: 1 });

    // The broadcast is what stops other windows from silently showing a different verse, so it must
    // not be a casualty of a store that cannot be written.
    expect(scrRefEmit).toHaveBeenCalledTimes(1);
    expect(() => vi.advanceTimersByTime(1000)).not.toThrow();
    expect(logger.error).toHaveBeenCalled();
  });
});

describe('starting with an unreadable store', () => {
  it('starts on the default rather than stopping the app from starting', async () => {
    localStorage.setItem(SCR_REFS_STORAGE_KEY, '{ this is not serialized state');

    // This module is evaluated inside main.ts's import graph, before any window or error dialog, so
    // a throw here is an app that does not start with nothing to tell the user why.
    const host = await import('@main/services/scroll-group.service-host');

    expect(await host.getScrRef(0)).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    expect(logger.error).toHaveBeenCalled();
  });

  it('lets a window hand over the state the unreadable store lost', async () => {
    localStorage.setItem(SCR_REFS_STORAGE_KEY, '{ this is not serialized state');
    const host = await import('@main/services/scroll-group.service-host');

    const didAdopt = await host.migrateStoredScrollGroupState({
      scrRefs: { 0: { book: 'MRK', chapterNum: 4, verseNum: 1 } },
      scrRefSourceProjectIds: {},
    });

    expect(didAdopt).toBe(true);
  });
});

// A window is handed the state main holds on its URL so its first render is right; main omits it
// when it has nothing to hand over.
describe('state for a new window', () => {
  it('has nothing to hand a window before anything has been navigated', async () => {
    const host = await import('@main/services/scroll-group.service-host');

    expect(host.getScrollGroupStateForNewWindow()).toBeUndefined();
  });

  it('hands over a navigation that has not reached the store yet', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    await host.setScrRef(0, { book: 'MRK', chapterNum: 4, verseNum: 1 }, 'projA');

    // Deliberately no flush: a window created moments after a navigation must still be told about
    // it, so this reads memory rather than the store.
    expect(host.getScrollGroupStateForNewWindow()).toEqual({
      scrRefs: { 0: { book: 'MRK', chapterNum: 4, verseNum: 1 } },
      scrRefSourceProjectIds: { 0: 'projA' },
    });
  });

  it('hands over what it adopted from a window that had stored state', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    await host.migrateStoredScrollGroupState({
      scrRefs: { 0: { book: 'LUK', chapterNum: 2, verseNum: 1 } },
      scrRefSourceProjectIds: {},
    });

    expect(host.getScrollGroupStateForNewWindow()?.scrRefs[0]).toEqual({
      book: 'LUK',
      chapterNum: 2,
      verseNum: 1,
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

  it('tells the offering window whether the offer was taken', async () => {
    const host = await import('@main/services/scroll-group.service-host');

    // The answer is what lets the window know its copy is finished with, so it stops offering it on
    // every start forever.
    expect(await host.migrateStoredScrollGroupState(previouslyStored)).toBe(true);
    expect(await host.migrateStoredScrollGroupState(previouslyStored)).toBe(false);
  });

  it('does not consume the one-time adoption when storing what it adopted fails', async () => {
    const host = await import('@main/services/scroll-group.service-host');
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('disk full');
    });

    // Rejects rather than answering "refused": the offering window's copy is still the only durable
    // one, so it has to keep it and offer again.
    await expect(host.migrateStoredScrollGroupState(previouslyStored)).rejects.toThrow();
    setItem.mockRestore();

    // A later start offers again and is adopted — the failure must not have latched the profile into
    // "already migrated" with nothing migrated.
    vi.resetModules();
    const hostAfterRestart = await import('@main/services/scroll-group.service-host');
    expect(await hostAfterRestart.migrateStoredScrollGroupState(previouslyStored)).toBe(true);
    expect(await hostAfterRestart.getScrRef(0)).toEqual({
      book: 'MRK',
      chapterNum: 4,
      verseNum: 1,
    });
  });

  it('does not consume the one-time adoption when only the second of the two writes fails', async () => {
    // The store is one file per key with no atomicity across them, so a failure between them leaves
    // one written and the other not. The key backing the "do I already have state of my own?" gate
    // has to be the one written LAST, or a half-written migration reads at the next start as a
    // finished one: the retry is refused, the offering window deletes its copy on being told so,
    // and the half that never landed is gone for good.
    const host = await import('@main/services/scroll-group.service-host');
    const realSetItem = Storage.prototype.setItem;
    let writeCount = 0;
    const setItem = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(function failAfterTheFirst(this: Storage, key: string, value: string) {
        writeCount += 1;
        if (writeCount > 1) throw new Error('disk full');
        realSetItem.call(this, key, value);
      });

    await expect(host.migrateStoredScrollGroupState(previouslyStored)).rejects.toThrow();
    setItem.mockRestore();

    vi.resetModules();
    const hostAfterRestart = await import('@main/services/scroll-group.service-host');
    expect(await hostAfterRestart.migrateStoredScrollGroupState(previouslyStored)).toBe(true);
    // The versification the reference is expressed in is what a stranded first write loses, and
    // losing it silently reinterprets the reference against the wrong project
    const snapshot = await hostAfterRestart.getScrollGroupSnapshot();
    expect(snapshot.scrRefSourceProjectIds[0]).toBe('projOld');
  });

  it('ignores an offered entry that is not shaped like a reference', async () => {
    const host = await import('@main/services/scroll-group.service-host');

    await host.migrateStoredScrollGroupState({
      scrRefs: {
        // This arrives over the network from another process's store and is about to become this
        // store's contents for the life of the profile.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        0: { chapterNum: 'not a number' } as unknown as SerializedVerseRef,
        1: { book: 'LUK', chapterNum: 2, verseNum: 1 },
      },
      scrRefSourceProjectIds: {},
    });

    expect(await host.getScrRef(0)).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    expect(await host.getScrRef(1)).toEqual({ book: 'LUK', chapterNum: 2, verseNum: 1 });
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
