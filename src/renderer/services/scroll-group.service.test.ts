import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY,
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
  ReferenceHistory,
  ReferenceHistoryUpdateInfo,
  ScrollGroupSnapshot,
  ScrollGroupUpdateInfo,
} from '@shared/services/scroll-group.service-model';
import { SerializedVerseRef } from '@sillsdev/scripture';

// The renderer service is a CACHE over the main-process host: it reads network events, seeds itself
// from the host's snapshot, predicts the outcome of writes locally, and reconciles against what the
// host reports. All three of those edges are stubbed here so a test can drive them independently.
const { networkEventHandlers, networkObjectGet, waitForNetworkObject, host } = vi.hoisted(() => {
  /** Handlers the service registered, keyed by the network event name they subscribed to */
  const hoistedNetworkEventHandlers: Record<string, ((payload: unknown) => void)[]> = {};
  return {
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
});
vi.mock('@shared/services/network.service', () => ({
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

const { pdpGet } = vi.hoisted(() => ({ pdpGet: vi.fn() }));
vi.mock('@shared/services/project-data-provider.service', () => ({
  papiFrontendProjectDataProviderService: { get: pdpGet },
}));

const GENESIS: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
const MARK: SerializedVerseRef = { book: 'MRK', chapterNum: 4, verseNum: 1 };
const LUKE: SerializedVerseRef = { book: 'LUK', chapterNum: 2, verseNum: 1 };

function emptySnapshot(): ScrollGroupSnapshot {
  return { scrRefs: {}, scrRefSourceProjectIds: {}, referenceHistories: {} };
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
  vi.resetModules();
  Object.keys(networkEventHandlers).forEach((key) => delete networkEventHandlers[key]);
  sendCommand.mockReset();
  pdpGet.mockReset();
  pdpGet.mockResolvedValue({
    subscribeSetting: (_key: string, callback: (value: unknown) => void) => {
      callback('versification');
      return Promise.resolve(() => {});
    },
  });
  mockReadDirection.mockReturnValue('ltr');
  waitForNetworkObject.mockResolvedValue({});
  networkObjectGet.mockResolvedValue(host);
  Object.values(host).forEach((mock) => mock.mockReset());
  host.setScrRef.mockResolvedValue(true);
  host.navigateReferenceHistory.mockResolvedValue(true);
  host.getScrollGroupSnapshot.mockResolvedValue(emptySnapshot());
  host.migrateStoredScrollGroupState.mockResolvedValue(undefined);
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
