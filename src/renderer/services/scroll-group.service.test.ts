import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY,
  EVENT_NAME_ON_DID_CHANGE_VERSIFICATION,
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
  PersistedScrollGroupState,
  ReferenceHistory,
  ReferenceHistoryUpdateInfo,
  SCR_REF_SOURCE_PROJECT_IDS_STORAGE_KEY,
  SCR_REFS_STORAGE_KEY,
  ScrollGroupSnapshot,
  ScrollGroupUpdateInfo,
} from '@shared/services/scroll-group.service-model';
import { SCROLL_GROUP_STATE_QUERY_PARAMETER } from '@shared/data/platform.data';
import { logger } from '@shared/services/logger.service';
import { SerializedVerseRef } from '@sillsdev/scripture';

// The renderer service is a CACHE over the main-process host: it reads network events, seeds itself
// from the host's snapshot, predicts the outcome of writes locally, and reconciles against what the
// host reports. All three of those edges are stubbed here so a test can drive them independently.
const { emitters, networkEventHandlers, networkObjectGet, waitForNetworkObject, host } = vi.hoisted(
  () => {
    /** Emitters the service created, keyed by the network event name they emit */
    const hoistedEmitters: Record<string, { emit: ReturnType<typeof vi.fn> }> = {};
    /** Handlers the service registered, keyed by the network event name they subscribed to */
    const hoistedNetworkEventHandlers: Record<string, ((payload: unknown) => void)[]> = {};
    return {
      emitters: hoistedEmitters,
      networkEventHandlers: hoistedNetworkEventHandlers,
      networkObjectGet: vi.fn(),
      waitForNetworkObject: vi.fn(),
      host: {
        getScrRef: vi.fn(),
        setScrRef: vi.fn(),
        getScrRefForProject: vi.fn(),
        getReferenceHistory: vi.fn(),
        navigateReferenceHistory: vi.fn(),
        getScrollGroupSnapshot: vi.fn(),
        migrateStoredScrollGroupState: vi.fn(),
      },
    };
  },
);
vi.mock('@shared/services/network.service', () => ({
  createBufferedNetworkEventEmitter: (eventName: string) => {
    const emitter = { emit: vi.fn() };
    emitters[eventName] = emitter;
    return emitter;
  },
  getNetworkEvent: (eventName: string) => (handler: (payload: unknown) => void) => {
    networkEventHandlers[eventName] = [...(networkEventHandlers[eventName] ?? []), handler];
    return () => true;
  },
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: networkObjectGet },
}));
vi.mock('@shared/services/network-object-status.service', () => ({
  networkObjectStatusService: { waitForNetworkObject },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const sendCommand = vi.fn();
vi.mock('@shared/services/command.service', () => ({
  sendCommand: (...args: unknown[]) => sendCommand(...args),
}));

// The physical left/right keyboard direction resolves to a logical back/forward using the current UI
// layout direction. Mock it so tests can drive the RTL swap.
const { mockReadDirection } = vi.hoisted(() => ({
  mockReadDirection: vi.fn((): 'ltr' | 'rtl' => 'ltr'),
}));
vi.mock('platform-bible-react/experimental', () => ({
  readDirection: () => mockReadDirection(),
}));

// Conversions read each project's versification via a base-PDP setting subscription. Mock it: by
// default every project reports a unique versification (its own id) so conversions fire; a test sets
// `projectVersifications[id]` to make projects share a base versification identifier, or to make one
// unresolvable (undefined).
const { pdpGet, projectVersifications } = vi.hoisted(() => {
  const versifications: Record<string, string | undefined> = {};
  return { pdpGet: vi.fn(), projectVersifications: versifications };
});
vi.mock('@shared/services/project-data-provider.service', () => ({
  papiFrontendProjectDataProviderService: { get: pdpGet },
}));

const GENESIS: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
const MARK: SerializedVerseRef = { book: 'MRK', chapterNum: 4, verseNum: 1 };
const LUKE: SerializedVerseRef = { book: 'LUK', chapterNum: 2, verseNum: 1 };

function emptySnapshot(): ScrollGroupSnapshot {
  return { scrRefs: {}, scrRefSourceProjectIds: {}, referenceHistories: {} };
}

/**
 * Put a scroll group state on this window's URL, the way main does when it creates a window. Must
 * run before the service module is imported — the module reads it while it is being evaluated.
 */
function createWindowWithScrollGroupState(state: PersistedScrollGroupState | string) {
  const serialized = typeof state === 'string' ? state : JSON.stringify(state);
  window.history.replaceState(
    {},
    '',
    `/?${SCROLL_GROUP_STATE_QUERY_PARAMETER}=${encodeURIComponent(serialized)}`,
  );
}

/** Put previously stored state in this window's own `localStorage`, as a pre-host profile has */
function storePreviouslyStoredState(state: PersistedScrollGroupState) {
  localStorage.setItem(SCR_REFS_STORAGE_KEY, JSON.stringify(state.scrRefs));
  localStorage.setItem(
    SCR_REF_SOURCE_PROJECT_IDS_STORAGE_KEY,
    JSON.stringify(state.scrRefSourceProjectIds),
  );
}

/** Deliver a network event to every handler the service subscribed with */
function deliverNetworkEvent(eventName: string, payload: unknown) {
  (networkEventHandlers[eventName] ?? []).forEach((handler) => handler(payload));
}

/** Import the service and run its startup, seeding it from `snapshot` */
async function startService(snapshot: ScrollGroupSnapshot = emptySnapshot()) {
  host.getScrollGroupSnapshot.mockResolvedValue(snapshot);
  const service = await import('@renderer/services/scroll-group.service');
  await service.startScrollGroupService();
  return service;
}

/** Let queued promise callbacks (the fire-and-forget host writes) run */
async function settlePendingWork() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState({}, '', '/');
  vi.resetModules();
  Object.values(logger).forEach((logMock) => vi.mocked(logMock).mockClear());
  Object.keys(networkEventHandlers).forEach((key) => delete networkEventHandlers[key]);
  sendCommand.mockReset();
  Object.keys(projectVersifications).forEach((key) => {
    delete projectVersifications[key];
  });
  Object.keys(emitters).forEach((key) => delete emitters[key]);
  pdpGet.mockReset();
  pdpGet.mockImplementation(async (_projectInterface: string, projectId: string) => ({
    subscribeSetting: (_key: string, callback: (value: unknown) => void) => {
      // Default: each project has a unique versification (its own id) unless a test overrides it.
      callback(projectId in projectVersifications ? projectVersifications[projectId] : projectId);
      return Promise.resolve(() => {});
    },
  }));
  mockReadDirection.mockReturnValue('ltr');
  waitForNetworkObject.mockResolvedValue({});
  networkObjectGet.mockResolvedValue(host);
  Object.values(host).forEach((mock) => mock.mockReset());
  host.setScrRef.mockResolvedValue(true);
  host.navigateReferenceHistory.mockResolvedValue(true);
  host.getScrollGroupSnapshot.mockResolvedValue(emptySnapshot());
  host.migrateStoredScrollGroupState.mockResolvedValue(undefined);
});

// React renders before any of this window's services have started, and every `*Sync` reader is
// called during that render, so what can be known without asking has to be known at module load.
describe('the state a window is created with', () => {
  it('serves what main handed the window before anything has asked the host', async () => {
    createWindowWithScrollGroupState({
      scrRefs: { 0: MARK },
      scrRefSourceProjectIds: { 0: 'projA' },
    });

    // Imported, NOT started: this is what the very first render sees.
    const service = await import('@renderer/services/scroll-group.service');

    expect(service.getScrRefSync(0)).toEqual(MARK);
    expect(service.getScrRefSourceProjectIdSync(0)).toBe('projA');
  });

  it("falls back to this window's own store on the one start where main has nothing yet", async () => {
    storePreviouslyStoredState({ scrRefs: { 0: LUKE }, scrRefSourceProjectIds: { 0: 'projOld' } });

    const service = await import('@renderer/services/scroll-group.service');

    expect(service.getScrRefSync(0)).toEqual(LUKE);
    expect(service.getScrRefSourceProjectIdSync(0)).toBe('projOld');
  });

  it('prefers what main handed over to what this window has left over', async () => {
    storePreviouslyStoredState({ scrRefs: { 0: LUKE }, scrRefSourceProjectIds: {} });
    createWindowWithScrollGroupState({ scrRefs: { 0: MARK }, scrRefSourceProjectIds: {} });

    const service = await import('@renderer/services/scroll-group.service');

    // Main's copy is the app's live state; the leftover store is only ever as new as the last start
    // before the host existed.
    expect(service.getScrRefSync(0)).toEqual(MARK);
  });

  it('starts on the default when there is nothing to seed from', async () => {
    const service = await import('@renderer/services/scroll-group.service');

    expect(service.getScrRefSync(0)).toEqual(GENESIS);
  });

  it('still loads when what it was handed cannot be read', async () => {
    createWindowWithScrollGroupState('{not serialized state');

    // This runs while the module is being evaluated, where a throw takes the whole window down.
    const service = await import('@renderer/services/scroll-group.service');

    expect(service.getScrRefSync(0)).toEqual(GENESIS);
  });

  it('skips a stored reference from before references carried a book id', async () => {
    localStorage.setItem(
      SCR_REFS_STORAGE_KEY,
      JSON.stringify({ 0: { bookNum: 41, chapterNum: 4 } }),
    );

    const service = await import('@renderer/services/scroll-group.service');

    // The host brings that shape forward when it adopts it; serving it to the UI unconverted would
    // hand a renderer a reference with no book.
    expect(service.getScrRefSync(0)).toEqual(GENESIS);
  });
});

// A reload replays the URL main built when the window was created, and by then this window's own
// leftover store has been cleared, so the URL is the only thing a reloaded document can seed from —
// which is why it is kept as current as the cache instead of being left as old as the window.
describe('the state a reloaded document seeds from', () => {
  it('seeds from the reference the window last heard, not the one it opened on', async () => {
    createWindowWithScrollGroupState({ scrRefs: { 0: GENESIS }, scrRefSourceProjectIds: {} });
    await startService();

    deliverNetworkEvent(EVENT_NAME_ON_DID_UPDATE_SCR_REF, {
      scrollGroupId: 0,
      scrRef: MARK,
      sourceProjectId: 'projA',
    });

    // The window reloads: same URL, fresh module evaluation
    vi.resetModules();
    const service = await import('@renderer/services/scroll-group.service');

    expect(service.getScrRefSync(0)).toEqual(MARK);
    expect(service.getScrRefSourceProjectIdSync(0)).toBe('projA');
  });

  it('seeds from a reference this window predicted before the host confirmed it', async () => {
    createWindowWithScrollGroupState({ scrRefs: { 0: GENESIS }, scrRefSourceProjectIds: {} });
    const started = await startService();

    started.setScrRefSync(0, MARK);

    vi.resetModules();
    const service = await import('@renderer/services/scroll-group.service');

    expect(service.getScrRefSync(0)).toEqual(MARK);
  });

  it('leaves every other query parameter alone', async () => {
    window.history.replaceState({}, '', '/?windowId=3&logLevel=info');
    await startService();

    deliverNetworkEvent(EVENT_NAME_ON_DID_UPDATE_SCR_REF, {
      scrollGroupId: 0,
      scrRef: MARK,
      sourceProjectId: undefined,
    });

    // The window id and the log level travel on the same URL, and a reload has to find them too
    const params = new URLSearchParams(window.location.search);
    expect(params.get('windowId')).toBe('3');
    expect(params.get('logLevel')).toBe('info');
  });
});

describe('startup seed', () => {
  it('seeds the cache from the host snapshot', async () => {
    const service = await startService({
      scrRefs: { 0: MARK },
      scrRefSourceProjectIds: { 0: 'projA' },
      referenceHistories: {
        0: { current: { scrRef: MARK, sourceProjectId: 'projA' }, back: [], forward: [] },
      },
    });

    expect(service.getScrRefSync(0)).toEqual(MARK);
    expect(service.getScrRefSourceProjectIdSync(0)).toBe('projA');
    expect(service.getReferenceHistorySync(0).current).toEqual({
      scrRef: MARK,
      sourceProjectId: 'projA',
    });
  });

  it('announces the seeded state so a consumer that mounted first catches up', async () => {
    const service = await import('@renderer/services/scroll-group.service');
    const seen: ScrollGroupUpdateInfo[] = [];
    service.onDidUpdateScrRef((update) => seen.push(update));
    host.getScrollGroupSnapshot.mockResolvedValue({
      scrRefs: { 2: LUKE },
      scrRefSourceProjectIds: { 2: 'projB' },
      referenceHistories: {},
    });

    await service.startScrollGroupService();

    expect(seen).toEqual([{ scrollGroupId: 2, scrRef: LUKE, sourceProjectId: 'projB' }]);
  });

  it('announces the seeded reference histories too', async () => {
    const service = await import('@renderer/services/scroll-group.service');
    const seen: ReferenceHistoryUpdateInfo[] = [];
    service.onDidChangeReferenceHistory((update) => seen.push(update));
    const hostHistory: ReferenceHistory = {
      current: { scrRef: LUKE, sourceProjectId: undefined },
      back: [{ scrRef: MARK, sourceProjectId: undefined }],
      forward: [],
    };
    host.getScrollGroupSnapshot.mockResolvedValue({
      scrRefs: { 0: LUKE },
      scrRefSourceProjectIds: {},
      referenceHistories: { 0: hostHistory },
    });

    await service.startScrollGroupService();

    // The toolbar's back/forward buttons read the history once when they mount, which in a window
    // opened mid-session is before this; without the announcement they show an empty trail while
    // another window plainly shows a full one.
    expect(seen).toEqual([{ scrollGroupId: 0, history: hostHistory }]);
  });

  it('still starts when the seed fails', async () => {
    const service = await import('@renderer/services/scroll-group.service');
    host.getScrollGroupSnapshot.mockRejectedValue(new Error('host unreachable'));

    // The seed is a cache warm-up; failing startup over it would take down the unrelated services
    // that start in the same batch.
    await expect(service.startScrollGroupService()).resolves.toBeUndefined();
    expect(logger.error).toHaveBeenCalled();
  });
});

// Before the host existed, this state lived in this window's own localStorage. The host cannot read
// that store, so a profile that predates it has to offer what it has.
describe('handing over previously stored state', () => {
  it('offers what this window has stored before seeding from the host', async () => {
    localStorage.setItem('scroll-group.service-host.scrRefs', JSON.stringify({ 0: MARK }));
    localStorage.setItem(
      'scroll-group.service-host.scrRefSourceProjectIds',
      JSON.stringify({ 0: 'projOld' }),
    );

    await startService();

    expect(host.migrateStoredScrollGroupState).toHaveBeenCalledWith({
      scrRefs: { 0: MARK },
      scrRefSourceProjectIds: { 0: 'projOld' },
    });
    // The offer has to land before the snapshot, or the first seed misses what was just adopted
    expect(host.migrateStoredScrollGroupState.mock.invocationCallOrder[0]).toBeLessThan(
      host.getScrollGroupSnapshot.mock.invocationCallOrder[0],
    );
  });

  it('offers nothing when this window has nothing stored', async () => {
    await startService();

    expect(host.migrateStoredScrollGroupState).not.toHaveBeenCalled();
  });

  /** Restart the service the way a later start of the app does, and report whether it offered */
  async function didOfferOnALaterStart() {
    vi.resetModules();
    host.migrateStoredScrollGroupState.mockClear();
    host.migrateStoredScrollGroupState.mockResolvedValue(true);
    await startService();
    return host.migrateStoredScrollGroupState.mock.calls.length > 0;
  }

  it('stops offering what it offered once the host has adopted it', async () => {
    storePreviouslyStoredState({ scrRefs: { 0: MARK }, scrRefSourceProjectIds: { 0: 'projOld' } });
    host.migrateStoredScrollGroupState.mockResolvedValue(true);

    await startService();

    // Left offerable these are re-offered by every window on every start forever, and a profile
    // whose main-process store is ever cleared silently resurrects a reference from before the host.
    expect(await didOfferOnALaterStart()).toBe(false);
  });

  it('leaves the handed-over keys in place for a build that has no host', async () => {
    // Deleting them is what makes a downgrade start broken: an older build reads these keys and
    // nothing else, so it would come up at the default reference rather than where the user left
    // off. A marker is what stops the re-offer, and an old build ignores markers it never heard of.
    storePreviouslyStoredState({ scrRefs: { 0: MARK }, scrRefSourceProjectIds: { 0: 'projOld' } });
    host.migrateStoredScrollGroupState.mockResolvedValue(true);

    await startService();

    expect(localStorage.getItem(SCR_REFS_STORAGE_KEY)).not.toBeNull();
    expect(localStorage.getItem(SCR_REF_SOURCE_PROJECT_IDS_STORAGE_KEY)).not.toBeNull();
  });

  it('stops offering what it offered when the host refuses it', async () => {
    storePreviouslyStoredState({ scrRefs: { 0: MARK }, scrRefSourceProjectIds: {} });
    host.migrateStoredScrollGroupState.mockResolvedValue(false);

    await startService();

    // Refused means the host has state that beats this copy, so this copy is finished either way.
    expect(await didOfferOnALaterStart()).toBe(false);
  });

  it('keeps what it offered when the offer never lands', async () => {
    storePreviouslyStoredState({ scrRefs: { 0: MARK }, scrRefSourceProjectIds: {} });
    host.migrateStoredScrollGroupState.mockRejectedValue(new Error('host unreachable'));

    await startService();

    // The one case where this copy is still the only durable one.
    expect(localStorage.getItem(SCR_REFS_STORAGE_KEY)).not.toBeNull();
  });

  it('still starts when the offer fails', async () => {
    localStorage.setItem('scroll-group.service-host.scrRefs', JSON.stringify({ 0: MARK }));
    host.migrateStoredScrollGroupState.mockRejectedValue(new Error('host unreachable'));
    host.getScrollGroupSnapshot.mockResolvedValue({
      scrRefs: { 0: LUKE },
      scrRefSourceProjectIds: {},
      referenceHistories: {},
    });

    const service = await import('@renderer/services/scroll-group.service');
    await expect(service.startScrollGroupService()).resolves.toBeUndefined();

    expect(service.getScrRefSync(0)).toEqual(LUKE);
  });
});

describe('optimistic scr ref writes', () => {
  it('returns the cache-based prediction and forwards the write to the host', async () => {
    const service = await startService();

    expect(service.setScrRefSync(1, MARK, 'projA')).toBe(true);
    // The prediction is available before the host has answered anything
    expect(service.getScrRefSync(1)).toEqual(MARK);
    expect(service.getScrRefSourceProjectIdSync(1)).toBe('projA');

    await settlePendingWork();
    expect(host.setScrRef).toHaveBeenCalledWith(1, MARK, 'projA');
  });

  it('returns false and skips the host write when the cache says nothing changed', async () => {
    const service = await startService({
      scrRefs: { 1: MARK },
      scrRefSourceProjectIds: { 1: 'projA' },
      referenceHistories: {},
    });

    expect(service.setScrRefSync(1, { ...MARK }, 'projA')).toBe(false);

    await settlePendingWork();
    expect(host.setScrRef).not.toHaveBeenCalled();
  });

  it('sends a write the cache calls a no-op until this window has caught up with the host', async () => {
    // Imported but NOT started: the cache holds only what came with the window, so "nothing changed"
    // is a statement about this window rather than about the host.
    const service = await import('@renderer/services/scroll-group.service');
    host.setScrRef.mockResolvedValue(true);

    expect(service.setScrRefSync(1, GENESIS)).toBe(false);

    await settlePendingWork();
    // Acting on the local verdict would discard the user's navigation with nothing left to correct
    // it: the reconcile only ever runs on a write that was sent.
    expect(host.setScrRef).toHaveBeenCalledWith(1, GENESIS, undefined);
  });

  it('stops sending no-op writes once it has caught up with the host', async () => {
    const service = await startService({
      scrRefs: { 1: MARK },
      scrRefSourceProjectIds: {},
      referenceHistories: {},
    });

    expect(service.setScrRefSync(1, { ...MARK })).toBe(false);

    await settlePendingWork();
    expect(host.setScrRef).not.toHaveBeenCalled();
  });

  it('resyncs the group when the host reports the write changed nothing', async () => {
    const service = await startService();
    host.setScrRef.mockResolvedValue(false);
    host.getScrollGroupSnapshot.mockResolvedValue({
      scrRefs: { 1: LUKE },
      scrRefSourceProjectIds: { 1: 'projHost' },
      referenceHistories: {
        1: { current: { scrRef: LUKE, sourceProjectId: 'projHost' }, back: [], forward: [] },
      },
    });

    service.setScrRefSync(1, MARK, 'projA');
    await settlePendingWork();

    expect(service.getScrRefSync(1)).toEqual(LUKE);
    expect(service.getScrRefSourceProjectIdSync(1)).toBe('projHost');
  });
});

describe('reference history optimistic navigation', () => {
  it('predicts the navigation from the cached history without waiting for the host', async () => {
    const service = await startService();
    // Never settles: the prediction must not depend on the host answering
    host.navigateReferenceHistory.mockReturnValue(new Promise(() => {}));
    service.setScrRefSync(1, MARK);

    expect(service.navigateReferenceHistorySync(1, -1)).toBe(true);
    expect(service.getScrRefSync(1)).toEqual(GENESIS);
  });

  it('applies the destination entry to the cached history immediately', async () => {
    const service = await startService();
    service.setScrRefSync(1, MARK);

    service.navigateReferenceHistorySync(1, -1);

    const history = service.getReferenceHistorySync(1);
    expect(history.current).toEqual({ scrRef: GENESIS, sourceProjectId: undefined });
    expect(history.back).toEqual([]);
    expect(history.forward).toEqual([{ scrRef: MARK, sourceProjectId: undefined }]);
  });

  it('forwards the same offset to the host', async () => {
    const service = await startService();
    service.setScrRefSync(1, MARK);
    service.setScrRefSync(1, LUKE);

    service.navigateReferenceHistorySync(1, -2);
    await settlePendingWork();

    expect(host.navigateReferenceHistory).toHaveBeenCalledWith(1, -2);
  });

  it('returns false and skips the host call when the cached history cannot move', async () => {
    const service = await startService();

    expect(service.navigateReferenceHistorySync(1, -1)).toBe(false);
    expect(service.navigateReferenceHistorySync(1, 1)).toBe(false);

    await settlePendingWork();
    expect(host.navigateReferenceHistory).not.toHaveBeenCalled();
  });

  it('records a set reference in the cached history so a back navigation is immediately predictable', async () => {
    const service = await startService();

    service.setScrRefSync(1, MARK, 'projA');

    const history = service.getReferenceHistorySync(1);
    expect(history.current).toEqual({ scrRef: MARK, sourceProjectId: 'projA' });
    expect(history.back).toEqual([{ scrRef: GENESIS, sourceProjectId: undefined }]);
    expect(service.navigateReferenceHistorySync(1, -1)).toBe(true);
  });

  it('returns copies of the cached history, not the live state', async () => {
    const service = await startService();
    service.setScrRefSync(1, MARK);

    const history = service.getReferenceHistorySync(1);
    history.back.length = 0;

    expect(service.getReferenceHistorySync(1).back).toHaveLength(1);
  });
});

describe('reference history reconcile against the host', () => {
  it('replaces the cached history wholesale with what the host announces', async () => {
    const service = await startService();
    service.setScrRefSync(1, MARK);
    // Optimistically predicted; the host is authoritative and says something different
    service.navigateReferenceHistorySync(1, -1);

    const authoritative: ReferenceHistory = {
      current: { scrRef: LUKE, sourceProjectId: 'projHost' },
      back: [{ scrRef: MARK, sourceProjectId: undefined }],
      forward: [],
    };
    deliverNetworkEvent(EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY, {
      scrollGroupId: 1,
      history: authoritative,
    });

    expect(service.getReferenceHistorySync(1)).toEqual(authoritative);
  });

  it('re-announces an incoming history change to local consumers', async () => {
    const service = await startService();
    const seen: ReferenceHistoryUpdateInfo[] = [];
    service.onDidChangeReferenceHistory((update) => seen.push(update));
    const authoritative: ReferenceHistory = {
      current: { scrRef: LUKE, sourceProjectId: undefined },
      back: [],
      forward: [],
    };

    deliverNetworkEvent(EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY, {
      scrollGroupId: 3,
      history: authoritative,
    });

    expect(seen).toEqual([{ scrollGroupId: 3, history: authoritative }]);
  });

  it('applies an incoming scr ref update to the cache', async () => {
    const service = await startService();

    deliverNetworkEvent(EVENT_NAME_ON_DID_UPDATE_SCR_REF, {
      scrollGroupId: 2,
      scrRef: LUKE,
      sourceProjectId: 'projRemote',
    });

    expect(service.getScrRefSync(2)).toEqual(LUKE);
    expect(service.getScrRefSourceProjectIdSync(2)).toBe('projRemote');
  });

  it('resyncs the group from the host when the host declines the navigation', async () => {
    const service = await startService();
    service.setScrRefSync(1, MARK);
    // The host's history disagrees with the local prediction, so it does not navigate
    host.navigateReferenceHistory.mockResolvedValue(false);
    const hostHistory: ReferenceHistory = {
      current: { scrRef: LUKE, sourceProjectId: 'projHost' },
      back: [],
      forward: [],
    };
    host.getScrollGroupSnapshot.mockResolvedValue({
      scrRefs: { 1: LUKE },
      scrRefSourceProjectIds: { 1: 'projHost' },
      referenceHistories: { 1: hostHistory },
    });

    expect(service.navigateReferenceHistorySync(1, -1)).toBe(true);
    await settlePendingWork();

    expect(service.getScrRefSync(1)).toEqual(LUKE);
    expect(service.getReferenceHistorySync(1)).toEqual(hostHistory);
  });

  it('resyncs the group when the host navigation call fails', async () => {
    const service = await startService();
    service.setScrRefSync(1, MARK);
    host.navigateReferenceHistory.mockRejectedValue(new Error('host unreachable'));
    const hostHistory: ReferenceHistory = {
      current: { scrRef: MARK, sourceProjectId: undefined },
      back: [{ scrRef: GENESIS, sourceProjectId: undefined }],
      forward: [],
    };
    host.getScrollGroupSnapshot.mockResolvedValue({
      scrRefs: { 1: MARK },
      scrRefSourceProjectIds: {},
      referenceHistories: { 1: hostHistory },
    });

    service.navigateReferenceHistorySync(1, -1);
    await settlePendingWork();

    expect(service.getScrRefSync(1)).toEqual(MARK);
    expect(service.getReferenceHistorySync(1)).toEqual(hostHistory);
  });
});

// Conversion lives in this process because the consumer that converts on every navigation is here,
// which is also why it is the only copy that is cached and invalidated.
describe('versification conversion', () => {
  const PSALM_147: SerializedVerseRef = { book: 'PSA', chapterNum: 147, verseNum: 1 };
  const PSALM_146_CONVERTED = {
    book: 'PSA',
    chapterNum: 146,
    verseNum: 1,
    versificationStr: '4',
  };

  it('converts the stored ref into the target project versification and caches it', async () => {
    sendCommand.mockResolvedValue(PSALM_146_CONVERTED);
    const service = await startService();
    service.setScrRefSync(0, PSALM_147, 'sourceProj');

    const result = await service.getScrRefForProject(0, 'targetProj');

    expect(result).toEqual(PSALM_146_CONVERTED);
    expect(sendCommand).toHaveBeenCalledWith(
      'platformScripture.mapVerseRefBetweenProjects',
      PSALM_147,
      'sourceProj',
      'targetProj',
    );

    sendCommand.mockClear();
    expect(await service.getScrRefForProject(0, 'targetProj')).toEqual(PSALM_146_CONVERTED);
    expect(sendCommand).not.toHaveBeenCalled(); // second call served from cache
  });

  it('still converts when source and target report the same base versification identifier', async () => {
    // The platformScripture.versification setting carries only the base ScrVersType (e.g. "4"), not
    // custom.vrs content, so two projects reporting the same identifier can still differ. The base
    // identifier must NOT skip conversion; the C# command decides with the real ScrVers.
    projectVersifications.sourceProj = 'shared';
    projectVersifications.targetProj = 'shared';
    sendCommand.mockResolvedValue(PSALM_146_CONVERTED);
    const service = await startService();
    service.setScrRefSync(0, PSALM_147, 'sourceProj');

    const result = await service.getScrRefForProject(0, 'targetProj');

    expect(result).toEqual(PSALM_146_CONVERTED);
    expect(sendCommand).toHaveBeenCalledTimes(1); // round-trip fired despite equal base identifiers
  });

  it('coalesces concurrent identical conversions into a single round-trip', async () => {
    sendCommand.mockResolvedValue(PSALM_146_CONVERTED);
    const service = await startService();
    service.setScrRefSync(0, PSALM_147, 'sourceProj');

    const [first, second] = await Promise.all([
      service.getScrRefForProject(0, 'targetProj'),
      service.getScrRefForProject(0, 'targetProj'),
    ]);

    expect(first).toEqual(PSALM_146_CONVERTED);
    expect(second).toEqual(PSALM_146_CONVERTED);
    expect(sendCommand).toHaveBeenCalledTimes(1); // shared in-flight promise, one round-trip
  });

  it('clears a failed versification subscription so a later navigation retries it', async () => {
    // The retry is observable as a SECOND subscription attempt: if the failed setup promise were
    // kept, the project's PDP would never be requested again.
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
    sendCommand.mockResolvedValue(PSALM_146_CONVERTED);
    const service = await startService();
    service.setScrRefSync(0, PSALM_147, 'sourceProj');

    await service.getScrRefForProject(0, 'targetProj'); // first attempt: sourceProj subscribe throws
    await service.getScrRefForProject(0, 'targetProj'); // second navigation retries the failed project

    expect(pdpAttempts.sourceProj).toBe(2); // retried, not latched off for the session
  });

  it('getScrRefForProjectSync returns a cached conversion, else the raw ref', async () => {
    sendCommand.mockResolvedValue(PSALM_146_CONVERTED);
    const service = await startService();
    service.setScrRefSync(0, PSALM_147, 'sourceProj');

    // Before any conversion is cached, the sync getter returns the raw ref.
    expect(service.getScrRefForProjectSync(0, 'targetProj')).toEqual(PSALM_147);

    // After an async conversion caches the result, the sync getter returns it.
    await service.getScrRefForProject(0, 'targetProj');
    expect(service.getScrRefForProjectSync(0, 'targetProj')).toEqual(PSALM_146_CONVERTED);
  });

  it('evicts the oldest cached conversion once past the size cap', async () => {
    // Each conversion echoes its input ref with a marker, so a cache hit is distinguishable from the
    // raw (unconverted) ref returned on a miss.
    sendCommand.mockImplementation(async (_command: string, ref: object) => ({
      ...ref,
      versificationStr: 'converted',
    }));
    const service = await startService();

    // Distinct refs whose numbers stay within a single field's range: verse in 1..100, chapter in
    // 1..11, so no value saturates the BBBCCCVVV encoding that setScrRefSync's no-op guard compares.
    // Each successive ref is strictly greater, so setScrRefSync always advances.
    const refForIndex = (i: number) => ({
      book: 'PSA',
      chapterNum: Math.floor((i - 1) / 100) + 1,
      verseNum: ((i - 1) % 100) + 1,
    });

    const CAP = 1000; // must match CONVERSION_CACHE_MAX_SIZE in the service
    // Fill the cache to exactly the cap with distinct refs (distinct ref => distinct cache key).
    for (let i = 1; i <= CAP; i += 1) {
      service.setScrRefSync(0, refForIndex(i), 'sourceProj');
      // Sequential await is intentional: eviction is insertion-ordered, so entries must be cached
      // one at a time in a deterministic order — Promise.all would race that order and make the
      // "oldest evicted" assertion nondeterministic.
      // eslint-disable-next-line no-await-in-loop
      await service.getScrRefForProject(0, 'targetProj');
    }

    // One more distinct conversion tips the cache over the cap and must evict the oldest entry (i=1).
    service.setScrRefSync(0, refForIndex(CAP + 1), 'sourceProj');
    await service.getScrRefForProject(0, 'targetProj');

    // The oldest (i=1) conversion was evicted: its sync lookup now misses and returns the raw ref.
    service.setScrRefSync(0, refForIndex(1), 'sourceProj');
    expect(service.getScrRefForProjectSync(0, 'targetProj')).toEqual(refForIndex(1));

    // A newer entry (the last one cached before eviction) is still present: only the oldest was dropped.
    service.setScrRefSync(0, refForIndex(CAP), 'sourceProj');
    expect(service.getScrRefForProjectSync(0, 'targetProj')).toEqual({
      ...refForIndex(CAP),
      versificationStr: 'converted',
    });
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
    sendCommand.mockResolvedValue(PSALM_146_CONVERTED);
    const service = await startService();
    service.setScrRefSync(0, PSALM_147, 'sourceProj');
    await service.getScrRefForProject(0, 'targetProj'); // establishes subscriptions for both projects

    const { emit } = emitters[EVENT_NAME_ON_DID_CHANGE_VERSIFICATION];
    expect(emit).not.toHaveBeenCalled(); // initial retrieveDataImmediately load must NOT emit

    callbacks.sourceProj('a-different-versification'); // genuine mid-session change
    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith({ projectId: 'sourceProj' });
  });
});

describe('recovering from a failed resync', () => {
  it('retries before giving up', async () => {
    const service = await startService();
    host.setScrRef.mockResolvedValue(false);
    host.getScrollGroupSnapshot.mockRejectedValueOnce(new Error('host busy')).mockResolvedValue({
      scrRefs: { 1: LUKE },
      scrRefSourceProjectIds: {},
      referenceHistories: {},
    });

    service.setScrRefSync(1, MARK);
    await vi.waitFor(() => expect(service.getScrRefSync(1)).toEqual(LUKE), { timeout: 5000 });
  });

  it('tries again when the host is next heard from', async () => {
    const service = await startService();
    host.setScrRef.mockResolvedValue(false);
    host.getScrollGroupSnapshot.mockRejectedValue(new Error('host unreachable'));

    service.setScrRefSync(1, MARK);
    // Every attempt fails, so the group is parked rather than left stale for the session.
    await vi.waitFor(() => expect(logger.error).toHaveBeenCalled(), { timeout: 5000 });

    host.getScrollGroupSnapshot.mockResolvedValue({
      scrRefs: { 1: LUKE },
      scrRefSourceProjectIds: {},
      referenceHistories: {},
    });
    // Anything the host says is proof it is reachable again.
    deliverNetworkEvent(EVENT_NAME_ON_DID_UPDATE_SCR_REF, {
      scrollGroupId: 4,
      scrRef: GENESIS,
      sourceProjectId: undefined,
    });

    await vi.waitFor(() => expect(service.getScrRefSync(1)).toEqual(LUKE), { timeout: 5000 });
  });

  it('drops a history it recorded optimistically when the host has none', async () => {
    const service = await startService();
    service.setScrRefSync(1, MARK);
    // The host declines: its reference already matched, so it never recorded a history for the group
    host.setScrRef.mockResolvedValue(false);
    host.getScrollGroupSnapshot.mockResolvedValue({
      scrRefs: { 1: LUKE },
      scrRefSourceProjectIds: {},
      referenceHistories: {},
    });

    service.setScrRefSync(1, GENESIS);
    await settlePendingWork();

    // Keeping the optimistic entry would offer a "back" the host refuses.
    const history = service.getReferenceHistorySync(1);
    expect(history.back).toEqual([]);
    expect(history.current).toEqual({ scrRef: LUKE, sourceProjectId: undefined });
  });
});

describe('reference history physical (keyboard) navigation', () => {
  it('resolves left = back and right = forward in LTR', async () => {
    const service = await startService();
    service.setScrRefSync(1, MARK);

    expect(service.navigateReferenceHistoryPhysicalSync(1, 'left')).toBe(true);
    expect(service.getScrRefSync(1)).toEqual(GENESIS);

    expect(service.navigateReferenceHistoryPhysicalSync(1, 'right')).toBe(true);
    expect(service.getScrRefSync(1)).toEqual(MARK);
  });

  it('swaps the pair in RTL: right = back and left = forward', async () => {
    mockReadDirection.mockReturnValue('rtl');
    const service = await startService();
    service.setScrRefSync(1, MARK);

    expect(service.navigateReferenceHistoryPhysicalSync(1, 'right')).toBe(true);
    expect(service.getScrRefSync(1)).toEqual(GENESIS);

    expect(service.navigateReferenceHistoryPhysicalSync(1, 'left')).toBe(true);
    expect(service.getScrRefSync(1)).toEqual(MARK);
  });

  it('returns false when there is no history in the resolved direction', async () => {
    const service = await startService();

    expect(service.navigateReferenceHistoryPhysicalSync(3, 'left')).toBe(false);
    expect(service.navigateReferenceHistoryPhysicalSync(3, 'right')).toBe(false);
  });
});
