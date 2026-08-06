import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import * as networkService from '@shared/services/network.service';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import type { Method } from '@shared/models/openrpc.model';

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

  // A page that reloads takes its socket down like any other departure and comes back registering
  // the same names. Every holder is told the objects went away and resolves the new page's objects
  // on its next call, rather than keeping proxies whose registration is a page old.
  it('announces the objects of a process that is only reloading', async () => {
    setupNetworkServiceMocks();
    await networkObjectService.set('an-object-that-initializes-the-service-for-reloads', {});

    announceClientDisconnect(['object:WebViewService-1', 'object:WebViewService-1.openWebView']);

    expect(announcedDisposedIds()).toEqual(['WebViewService-1']);
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
