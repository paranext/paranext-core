import { describe, it, expect, vi, beforeEach } from 'vitest';
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
vi.mock('@shared/services/network.service', () => ({
  initialize: vi.fn(() => Promise.resolve()),
  createCoreMultiSourceEventEmitter: vi.fn(),
  registerRequestHandler: vi.fn(),
  request: vi.fn(),
  // Evaluated at module load by the service for onDidCreateNetworkObject; return a no-op subscriber.
  getNetworkEvent: vi.fn(() => () => () => {}),
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
