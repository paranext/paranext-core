import { describe, it, expect, vi, beforeEach } from 'vitest';
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
const { networkEventHandlers } = vi.hoisted(() => {
  const hoistedNetworkEventHandlers: Record<string, ((payload: unknown) => void)[]> = {};
  return { networkEventHandlers: hoistedNetworkEventHandlers };
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
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

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

  const mockEmitter = {
    emit: vi.fn(),
    event: vi.fn(() => () => {}),
    dispose: vi.fn(),
  };
  vi.mocked(networkService.createCoreMultiSourceEventEmitter).mockReturnValue(
    // Needed for testing — the real return type carries the full emitter surface.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    {
      emitter: mockEmitter,
      registeredEmitterPromise: Promise.resolve(mockEmitter),
    } as unknown as ReturnType<typeof networkService.createCoreMultiSourceEventEmitter>,
  );

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
});
