import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';

// network-object-status.service caches its initialization via createCachedInitializer and holds the
// resolved status network object at module scope, so each test re-imports a fresh copy via
// vi.resetModules() (see loadService). The real AsyncVariable and isSubset (platform-bible-utils)
// are exercised; only network-object.service is mocked so a test can drive both the snapshot
// (getAllNetworkObjectDetails) and the onDidCreateNetworkObject event stream that
// waitForNetworkObject races against.

const { mockGet, mockUnsub, event } = vi.hoisted(() => {
  // Holds the latest waitForNetworkObject subscriber so a test can emit "object created" events
  const noopEmit: (details: NetworkObjectDetails) => void = () => {};
  return {
    event: { emit: noopEmit },
    mockGet: vi.fn(),
    mockUnsub: vi.fn(),
  };
});

vi.mock('@shared/services/network-object.service', () => ({
  __esModule: true,
  networkObjectService: { get: mockGet },
  onDidCreateNetworkObject: (callback: (details: NetworkObjectDetails) => void) => {
    event.emit = callback;
    return mockUnsub;
  },
}));

/** Re-imports the service fresh (resetting its cached initialization) and returns it. */
async function loadService() {
  vi.resetModules();
  const { networkObjectStatusService } = await import(
    '@shared/services/network-object-status.service'
  );
  return networkObjectStatusService;
}

/** Builds minimal NetworkObjectDetails; only the fields isSubset matches on are needed. */
function makeDetails(id: string, extra: Partial<NetworkObjectDetails> = {}): NetworkObjectDetails {
  return { functionNames: [], id, objectType: 'object', ...extra };
}

/** Makes networkObjectService.get resolve to a status object returning the given snapshot. */
function mockSnapshot(snapshot: Record<string, NetworkObjectDetails>) {
  mockGet.mockResolvedValue({ getAllNetworkObjectDetails: vi.fn(async () => snapshot) });
}

beforeEach(() => {
  vi.clearAllMocks();
  event.emit = () => {};
});

describe('waitForNetworkObject', () => {
  it('resolves from the snapshot when a matching object already exists', async () => {
    const service = await loadService();
    const details = makeDetails('ScrollGroupService');
    mockSnapshot({ ScrollGroupService: details, Other: makeDetails('Other') });

    await expect(service.waitForNetworkObject({ id: 'ScrollGroupService' })).resolves.toEqual(
      details,
    );
  });

  it('resolves from a creation event when the snapshot has no match', async () => {
    const service = await loadService();
    const created = makeDetails('WebViewService');
    // The object's creation event fires while the (empty) snapshot is being fetched; the stream we
    // subscribed to before fetching must still deliver it. Driving the emit from inside the fetch
    // keeps the ordering deterministic without waiting on the event loop.
    mockGet.mockResolvedValue({
      getAllNetworkObjectDetails: vi.fn(async () => {
        event.emit(created);
        return {};
      }),
    });

    await expect(service.waitForNetworkObject({ id: 'WebViewService' })).resolves.toEqual(created);
    expect(mockUnsub).toHaveBeenCalled();
  });

  it('does not let the snapshot override an event that arrived first', async () => {
    const service = await loadService();
    const fromSnapshot = makeDetails('WebViewService', { functionNames: ['fromSnapshot'] });
    mockSnapshot({ WebViewService: fromSnapshot });

    const waiting = service.waitForNetworkObject({ id: 'WebViewService' });
    // Emit synchronously, before the async snapshot fetch can resolve, so the event settles first
    const fromEvent = makeDetails('WebViewService', { functionNames: ['fromEvent'] });
    event.emit(fromEvent);

    await expect(waiting).resolves.toBe(fromEvent);
  });

  it('times out and rejects when no matching object ever appears', async () => {
    const service = await loadService();
    mockSnapshot({ Other: makeDetails('Other') });

    await expect(service.waitForNetworkObject({ id: 'Missing' }, 30)).rejects.toThrow(
      /Timeout reached/,
    );
  });

  it('ignores non-matching snapshot entries and non-matching events', async () => {
    const service = await loadService();
    mockSnapshot({ Other: makeDetails('Other') });

    const waiting = service.waitForNetworkObject({ id: 'Wanted' }, 30);
    event.emit(makeDetails('StillNotIt'));

    await expect(waiting).rejects.toThrow(/Timeout reached/);
  });

  it('propagates a failure from getAllNetworkObjectDetails', async () => {
    const service = await loadService();
    mockGet.mockRejectedValue(new Error('network object service unavailable'));

    // waitForNetworkObject rejects its internal AsyncVariable and then re-throws; that
    // AsyncVariable's promise is never returned, so its rejection surfaces (a tick later) as an
    // unhandled rejection. Capture it so it can't fail the run, and assert it carries the reason.
    const floating: unknown[] = [];
    const onUnhandled = (reason: unknown) => floating.push(reason);
    process.on('unhandledRejection', onUnhandled);
    try {
      await expect(service.waitForNetworkObject({ id: 'Anything' })).rejects.toThrow(
        'network object service unavailable',
      );
      await vi.waitFor(() => expect(floating).toHaveLength(1));
      expect(floating[0]).toMatch(/network object service unavailable/);
    } finally {
      process.off('unhandledRejection', onUnhandled);
    }
  });
});
