import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import * as networkService from '@shared/services/network.service';
import { logger } from '@shared/services/logger.service';
import {
  forgetUnreachableRemoteObjects,
  networkObjectService,
} from '@shared/services/network-object.service';
import type { Method } from '@shared/models/openrpc.model';
import { EVENT_NAME_ON_DID_CLOSE_WINDOW } from '@shared/data/network-event-names';

/**
 * Tests for networkObjectService.set — x-experimental fanout behavior.
 *
 * These exercise the real `networkObjectService.set` code path by mocking the network service so we
 * can capture exactly what method documentation `set` registers for the existence method and for
 * each exposed function. This verifies the actual fanout logic in the service rather than a copy of
 * it.
 */

// Mock the network service so set() can run without the RPC/WebSocket layer. vitest hoists these
// vi.mock calls above the imports above, so the mocks are in place before the service is imported.
/** Handlers the service subscribed to each network event, keyed by event name */
const { networkEventHandlers, clientDisconnectHandlers } = vi.hoisted(() => {
  const hoistedNetworkEventHandlers: Record<string, ((payload: unknown) => void)[]> = {};
  const hoistedClientDisconnectHandlers: ((event: { removedMethodNames: string[] }) => void)[] = [];
  return {
    networkEventHandlers: hoistedNetworkEventHandlers,
    clientDisconnectHandlers: hoistedClientDisconnectHandlers,
  };
});

vi.mock('@shared/services/network.service', () => ({
  initialize: vi.fn(() => Promise.resolve()),
  createCoreMultiSourceEventEmitter: vi.fn(),
  registerRequestHandler: vi.fn(),
  request: vi.fn(),
  // Evaluated at module load by the service for onDidCreateNetworkObject, and inside initialize for
  // the window-close announcement. A plain function rather than a mock so `vi.resetAllMocks` cannot
  // strip the recording the window-close tests rely on.
  getNetworkEvent: (eventName: string) => (handler: (payload: unknown) => void) => {
    networkEventHandlers[eventName] = [...(networkEventHandlers[eventName] ?? []), handler];
    return () => true;
  },
  // Subscribed to inside initialize. A plain function for the same reason as getNetworkEvent.
  onDidDisconnectClient: (handler: (event: { removedMethodNames: string[] }) => void) => {
    clientDisconnectHandlers.push(handler);
    return () => true;
  },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

/**
 * The core multi-source emitters the service holds, keyed by event name. The service resolves them
 * once, inside its one-shot `initialize`, so the mock has to hand out the same emitter for a given
 * event name every time — otherwise a later test would inspect an emitter the service never took.
 */
const coreEventEmittersByEventName: Record<string, { emit: Mock; event: Mock; dispose: Mock }> = {};

/** Method documentation as captured from a registerRequestHandler call. */
type RegisteredMethodDocs = { method?: { [key: string]: unknown; 'x-experimental'?: boolean } };
/** Captures the documentation passed to registerRequestHandler, keyed by request type. */
type RegisteredDocs = Map<string, RegisteredMethodDocs>;

/** Build a minimal valid method doc (params/result are required on the Method type). */
function methodDoc(name: string, extra?: Partial<Method>): Method {
  return {
    name,
    params: [],
    result: { name: 'return value', summary: 'result', schema: {} },
    ...extra,
  };
}

/**
 * Wire up the network service mocks and return a map that records the docs registered for each
 * request type as set() runs.
 */
function setupNetworkServiceMocks(): RegisteredDocs {
  const registeredDocs: RegisteredDocs = new Map();

  vi.mocked(networkService.createCoreMultiSourceEventEmitter).mockImplementation((eventName) => {
    if (!coreEventEmittersByEventName[eventName])
      coreEventEmittersByEventName[eventName] = {
        emit: vi.fn(),
        event: vi.fn(() => () => {}),
        dispose: vi.fn(),
      };
    const mockEmitter = coreEventEmittersByEventName[eventName];
    // Needed for testing — the real return type carries the full emitter surface.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return {
      emitter: mockEmitter,
      registeredEmitterPromise: Promise.resolve(mockEmitter),
    } as unknown as ReturnType<typeof networkService.createCoreMultiSourceEventEmitter>;
  });

  vi.mocked(networkService.registerRequestHandler).mockImplementation(
    // Capture the docs for this request type, then resolve to a no-op unsubscriber.
    (requestType, _handler, requestDocs) => {
      // requestDocs is SingleMethodDocumentation; narrow to the shape we assert on.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      registeredDocs.set(requestType, requestDocs as RegisteredMethodDocs);
      return Promise.resolve(async () => true);
    },
  );

  return registeredDocs;
}

describe('networkObjectService.set — x-experimental fanout', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('marks the existence method and every method experimental when the object is experimental', async () => {
    const registeredDocs = setupNetworkServiceMocks();

    const objectToShare = {
      doThing: async () => 1,
      doOther: async () => 2,
    };

    await networkObjectService.set('exp-obj', objectToShare, 'object', undefined, {
      'x-experimental': true,
      summary: 'An experimental object',
      methods: [methodDoc('doOther', { summary: 'Does other' })],
    });

    // The existence method (object:{id}) carries the object-level experimental marker.
    expect(registeredDocs.get('object:exp-obj')?.method?.['x-experimental']).toBe(true);
    // A method with documentation but no explicit override inherits the object-level flag.
    expect(registeredDocs.get('object:exp-obj.doOther')?.method?.['x-experimental']).toBe(true);
    // A method with no documentation at all also gets the flag fanned out onto its placeholder docs.
    expect(registeredDocs.get('object:exp-obj.doThing')?.method?.['x-experimental']).toBe(true);
  });

  it('lets a per-method x-experimental:false override the object-level true', async () => {
    const registeredDocs = setupNetworkServiceMocks();

    const objectToShare = {
      doThing: async () => 1,
      doOther: async () => 2,
    };

    await networkObjectService.set('mixed-obj', objectToShare, 'object', undefined, {
      'x-experimental': true,
      methods: [methodDoc('doThing', { summary: 'Stable', 'x-experimental': false })],
    });

    // Explicit false wins over the object-level true.
    expect(registeredDocs.get('object:mixed-obj.doThing')?.method?.['x-experimental']).toBe(false);
    // The unflagged method still inherits the object-level true.
    expect(registeredDocs.get('object:mixed-obj.doOther')?.method?.['x-experimental']).toBe(true);
  });

  it('leaves methods unflagged when the object is not experimental', async () => {
    const registeredDocs = setupNetworkServiceMocks();

    const objectToShare = { doThing: async () => 1 };

    await networkObjectService.set('plain-obj', objectToShare, 'object', undefined, {
      methods: [methodDoc('doThing', { summary: 'Does thing' })],
    });

    expect(registeredDocs.get('object:plain-obj')?.method?.['x-experimental']).toBeUndefined();
    expect(
      registeredDocs.get('object:plain-obj.doThing')?.method?.['x-experimental'],
    ).toBeUndefined();
  });

  it('warns when documentation references a method that matches no exposed function', async () => {
    setupNetworkServiceMocks();

    const objectToShare = { doThing: async () => 1 };

    await networkObjectService.set('typo-obj', objectToShare, 'object', undefined, {
      methods: [methodDoc('doThingg', { summary: 'Typo' })],
    });

    expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(expect.stringContaining('doThingg'));
  });
});

/**
 * Tests for networkObjectService.forgetUnreachableRemoteObjects.
 *
 * A window that closes never disposes the objects it hosted — it just drops its RPC connection — so
 * no dispose event is ever announced for them. Every other process keeps a registration pointing at
 * the dead window, which both serves a dead proxy to consumers and makes the object's name look
 * taken to `set`, so no surviving window can re-host it.
 */
describe('networkObjectService.forgetUnreachableRemoteObjects', () => {
  // Not cleared between tests: the service subscribes once, inside its own one-shot `initialize`
  beforeEach(() => {
    vi.resetAllMocks();
  });

  /** Cache a registration for an object hosted in another process, as `get` does */
  async function fetchRemoteObject(id: string) {
    setupNetworkServiceMocks();
    // The existence probe finds it, so `get` caches a remote registration
    vi.mocked(networkService.request).mockResolvedValue(true);
    const remoteObject = await networkObjectService.get(id);
    expect(networkObjectService.hasKnown(id)).toBe(true);
    return remoteObject;
  }

  /** Stand in for the window hosting an object going away: main no longer routes requests to it */
  function makeUnreachable() {
    vi.mocked(networkService.request).mockRejectedValue(new Error('No handler registered'));
  }

  it('drops an unreachable remote object, disposes it, and frees its ID for a new host', async () => {
    const remoteObject = await fetchRemoteObject('object-in-closed-window');
    const onDidDispose = vi.fn();
    remoteObject?.onDidDispose(onDidDispose);

    makeUnreachable();
    const forgotten = await forgetUnreachableRemoteObjects();

    expect(forgotten).toEqual(['object-in-closed-window']);
    // Consumers holding the dead proxy hear about it through the disposal they already listen for
    expect(onDidDispose).toHaveBeenCalledTimes(1);
    expect(networkObjectService.hasKnown('object-in-closed-window')).toBe(false);

    // The point of all of it: a surviving process can now host the object under the same name
    setupNetworkServiceMocks();
    await expect(
      networkObjectService.set('object-in-closed-window', { doThing: async () => 1 }),
    ).resolves.toBeDefined();
  });

  it('leaves a remote object that is still reachable alone', async () => {
    const remoteObject = await fetchRemoteObject('object-in-open-window');
    const onDidDispose = vi.fn();
    remoteObject?.onDidDispose(onDidDispose);

    // Some other window closed; this object's host is still running
    const forgotten = await forgetUnreachableRemoteObjects();

    expect(forgotten).not.toContain('object-in-open-window');
    expect(onDidDispose).not.toHaveBeenCalled();
    expect(networkObjectService.hasKnown('object-in-open-window')).toBe(true);
  });

  it('keeps serving a cached remote object whose host re-registered, because calls go by name', async () => {
    setupNetworkServiceMocks();
    vi.mocked(networkService.request).mockResolvedValue(true);
    const remoteObject = await networkObjectService.get<{ doThing: () => Promise<string> }>(
      'object-in-reloading-window',
    );

    // A window that reloads never disposes what it hosted, so nothing is announced and this process
    // keeps the registration it cached. That is not a dead endpoint, which is why the reload path
    // needs no cache invalidation: the main process drops the old page's method registrations when
    // its socket closes and the new page registers the same names, and a remote proxy captures no
    // connection — every call is a request by name, dispatched to whoever currently answers it.
    vi.mocked(networkService.request).mockResolvedValue('answer from the new page');

    await expect(remoteObject?.doThing()).resolves.toBe('answer from the new page');
    expect(networkObjectService.hasKnown('object-in-reloading-window')).toBe(true);
  });

  it('leaves objects hosted in this process alone even when the network cannot be reached', async () => {
    setupNetworkServiceMocks();
    await networkObjectService.set('object-hosted-here', { doThing: async () => 1 });
    expect(networkObjectService.hasKnown('object-hosted-here')).toBe(true);

    makeUnreachable();
    const forgotten = await forgetUnreachableRemoteObjects();

    // This process owns it; only the owner may dispose it
    expect(forgotten).not.toContain('object-hosted-here');
    expect(networkObjectService.hasKnown('object-hosted-here')).toBe(true);
  });

  it('runs when the main process announces that a window closed', async () => {
    await fetchRemoteObject('object-forgotten-on-window-close');
    makeUnreachable();

    // The payload is the closed window's id
    networkEventHandlers[EVENT_NAME_ON_DID_CLOSE_WINDOW]?.forEach((handler) => handler(7));

    await vi.waitFor(() =>
      expect(networkObjectService.hasKnown('object-forgotten-on-window-close')).toBe(false),
    );
  });

  /** Stand in for the main process announcing that a window closed */
  function announceWindowClose(windowId: number) {
    networkEventHandlers[EVENT_NAME_ON_DID_CLOSE_WINDOW]?.forEach((handler) => handler(windowId));
  }

  // The announcement is emitted from the closing window's `closed` handler, which can run before the
  // socket teardown that removes the dead renderer's methods from the central registry. A sweep
  // inside that gap still gets its probes answered, and the announcement is the only signal there
  // is, so without a retry nothing would ever probe again.
  it('sweeps once more when the close-triggered sweep found everything still reachable', async () => {
    vi.useFakeTimers();
    try {
      // `fetchRemoteObject` leaves the probe answering, standing in for the closing window still
      // being reachable when its close is announced
      await fetchRemoteObject('object-still-answering-when-the-close-was-announced');

      announceWindowClose(7);
      await vi.advanceTimersByTimeAsync(0);
      expect(
        networkObjectService.hasKnown('object-still-answering-when-the-close-was-announced'),
      ).toBe(true);

      // The closing window's connection finally goes down
      makeUnreachable();
      await vi.advanceTimersByTimeAsync(5000);

      expect(
        networkObjectService.hasKnown('object-still-answering-when-the-close-was-announced'),
      ).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not sweep again when the close-triggered sweep already dropped something', async () => {
    vi.useFakeTimers();
    try {
      await fetchRemoteObject('object-in-the-window-that-closed');
      // A second process's object, still answering, so a retry sweep would have something to probe
      await fetchRemoteObject('object-in-a-window-that-stayed');
      vi.mocked(networkService.request).mockImplementation(async (requestType: string) =>
        requestType.includes('object-in-a-window-that-stayed')
          ? true
          : Promise.reject(new Error('No handler registered')),
      );

      announceWindowClose(7);
      await vi.advanceTimersByTimeAsync(0);
      expect(networkObjectService.hasKnown('object-in-the-window-that-closed')).toBe(false);

      // The close cleaned up normally, so it costs no further probing
      const probeCountAfterSweep = vi.mocked(networkService.request).mock.calls.length;
      await vi.advanceTimersByTimeAsync(5000);

      expect(vi.mocked(networkService.request).mock.calls.length).toBe(probeCountAfterSweep);
    } finally {
      vi.useRealTimers();
    }
  });

  it('replaces a pending retry when another window closes before it runs', async () => {
    vi.useFakeTimers();
    try {
      await fetchRemoteObject('object-outliving-the-first-retry');

      // Both announcements land while the object still answers, so each schedules a retry
      announceWindowClose(7);
      await vi.advanceTimersByTimeAsync(1000);
      announceWindowClose(8);
      await vi.advanceTimersByTimeAsync(500);
      makeUnreachable();

      // Past when the first announcement's retry would have run: the second announcement took it
      // over rather than leaving two retries pending
      await vi.advanceTimersByTimeAsync(1000);
      expect(networkObjectService.hasKnown('object-outliving-the-first-retry')).toBe(true);

      await vi.advanceTimersByTimeAsync(5000);
      expect(networkObjectService.hasKnown('object-outliving-the-first-retry')).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });
});

/**
 * Tests for the dispose events the process owning the connections announces on behalf of a process
 * that went away without disposing what it hosted.
 *
 * The RPC layer reports the method names a departed process took with it and interprets none of
 * them. Network objects register a bare `object:{id}` existence method plus one
 * `object:{id}.{functionName}` per exposed function, and ids can themselves contain dots, so which
 * of those names is an object id is a question only this service can answer.
 */
describe('networkObjectService — network objects lost with a departed process', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    globalThis.processType = ProcessType.Main;
  });

  /** Stand in for the RPC layer reporting what a departed process took off the registry */
  function announceClientDisconnect(removedMethodNames: string[]) {
    clientDisconnectHandlers.forEach((handler) => handler({ removedMethodNames }));
  }

  /** The network object ids announced as disposed since the last reset */
  function announcedDisposedIds(): unknown[] {
    return (
      coreEventEmittersByEventName['object:onDidDisposeNetworkObject']?.emit.mock.calls ?? []
    ).map(([id]) => id);
  }

  /** Cache a registration for an object hosted in another process, as `get` does */
  async function fetchRemoteObject(id: string) {
    setupNetworkServiceMocks();
    vi.mocked(networkService.request).mockResolvedValue(true);
    await networkObjectService.get(id);
    expect(networkObjectService.hasKnown(id)).toBe(true);
  }

  it('announces one dispose per object, not one per registered method', async () => {
    setupNetworkServiceMocks();
    await networkObjectService.set('object-that-initializes-the-service', {});

    announceClientDisconnect([
      'object:ObjectInTheClosedWindow',
      'object:ObjectInTheClosedWindow.doThing',
      'object:ObjectInTheClosedWindow.doOtherThing',
    ]);

    expect(announcedDisposedIds()).toEqual(['ObjectInTheClosedWindow']);
  });

  it('announces objects this process never fetched, since other processes hold them', async () => {
    setupNetworkServiceMocks();
    await networkObjectService.set('another-object-that-initializes-the-service', {});
    expect(networkObjectService.hasKnown('ObjectNobodyHereEverFetched')).toBe(false);

    announceClientDisconnect(['object:ObjectNobodyHereEverFetched']);

    // Whoever was using it is the process that has to hear about it, and that is rarely this one
    expect(announcedDisposedIds()).toEqual(['ObjectNobodyHereEverFetched']);
  });

  it('keeps the dots in an id that contains them rather than splitting on the first one', async () => {
    setupNetworkServiceMocks();
    await networkObjectService.set('a-third-object-that-initializes-the-service', {});

    announceClientDisconnect([
      'object:platform.themeServiceDataProvider',
      'object:platform.themeServiceDataProvider.getCurrentTheme',
      'object:platform.themeServiceDataProvider.setCurrentTheme',
    ]);

    expect(announcedDisposedIds()).toEqual(['platform.themeServiceDataProvider']);
  });

  it('announces a nested id that this process holds, even though it reads as a method name', async () => {
    // `parent.child` is indistinguishable from a `child` function on the object `parent` by reading
    // the names alone. This process holds a registration under that exact id, which settles it.
    await fetchRemoteObject('parent.child');

    announceClientDisconnect(['object:parent', 'object:parent.child']);

    expect(announcedDisposedIds()).toEqual(['parent', 'parent.child']);
  });

  it('ignores removed method names that are not network object registrations', async () => {
    setupNetworkServiceMocks();
    await networkObjectService.set('a-fourth-object-that-initializes-the-service', {});

    announceClientDisconnect([
      'command:platform.openSettings',
      'network:registerMethod',
      'object:TheOneRealObject',
    ]);

    expect(announcedDisposedIds()).toEqual(['TheOneRealObject']);
  });

  it('announces nothing from a process that does not own the connections', async () => {
    setupNetworkServiceMocks();
    await networkObjectService.set('a-fifth-object-that-initializes-the-service', {});
    globalThis.processType = ProcessType.Renderer;

    announceClientDisconnect(['object:ObjectInTheClosedWindow']);

    // Every process hears the resulting network event; exactly one process may raise it
    expect(announcedDisposedIds()).toEqual([]);
  });
});
