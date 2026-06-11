import { vi } from 'vitest';
import * as networkService from '@shared/services/network.service';
import { ProcessType } from '@shared/global-this.model';
import { PlatformEventEmitter } from 'platform-bible-utils';
import {
  initialize as initializeSharedStore,
  resetForTesting,
} from '@shared/services/shared-store.service';
import { contextKeysService, papiContextKeysService } from './context-keys.service';

vi.mock('@shared/services/network.service', () => ({
  createNetworkEventEmitter: vi.fn(),
  createCoreMultiSourceEventEmitter: vi.fn(),
  getNetworkEvent: vi.fn(),
  request: vi.fn(),
  registerRequestHandler: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

describe('contextKeysService', () => {
  const mockEmitter = {
    emit: vi.fn(),
    event: vi.fn(),
    subscribe: vi.fn(),
    subscribeOnce: vi.fn(),
    dispose: vi.fn(),
    emitLocal: vi.fn(),
  };
  const originalProcessType = globalThis.processType;

  beforeEach(async () => {
    vi.resetAllMocks();
    vi.mocked(networkService.createNetworkEventEmitter).mockReturnValue(
      // Mock emitter shape needed for testing
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      mockEmitter as unknown as PlatformEventEmitter<unknown>,
    );
    // The shared store subscribes to remote changes through this emitter's `event`
    vi.mocked(networkService.createCoreMultiSourceEventEmitter).mockReturnValue(
      // Mock emitter shape needed for testing
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      {
        emitter: mockEmitter,
        registeredEmitterPromise: Promise.resolve(mockEmitter),
      } as unknown as ReturnType<typeof networkService.createCoreMultiSourceEventEmitter>,
    );
    globalThis.processType = ProcessType.Main;
    await initializeSharedStore(networkService);
  });

  afterEach(() => {
    globalThis.processType = originalProcessType;
    resetForTesting();
  });

  it('should round-trip values through set and get', () => {
    contextKeysService.set('testExt.someFlag', true);
    expect(contextKeysService.get('testExt.someFlag')).toBe(true);
    contextKeysService.set('testExt.someFlag', false);
    expect(contextKeysService.get('testExt.someFlag')).toBe(false);
    contextKeysService.set('testExt.viewMode', 'formatted');
    expect(contextKeysService.get('testExt.viewMode')).toBe('formatted');
  });

  it('should store values under the contextKeys. prefix in the shared store', () => {
    contextKeysService.set('testExt.someFlag', true);
    expect(mockEmitter.emit).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'contextKeys.testExt.someFlag', value: true }),
    );
  });

  it('should return undefined for keys that were never set', () => {
    expect(contextKeysService.get('testExt.neverSet')).toBeUndefined();
  });

  it('should throw on invalid key formats', () => {
    expect(() => contextKeysService.set('singleSegment', true)).toThrow(/Invalid context key/);
    expect(() => contextKeysService.set('bad key.x', true)).toThrow(/Invalid context key/);
    expect(() => contextKeysService.get('singleSegment')).toThrow(/Invalid context key/);
    expect(() => contextKeysService.remove('singleSegment')).toThrow(/Invalid context key/);
  });

  it('should throw on invalid value types', () => {
    // Testing the runtime guard against non-scalar values requires defeating the type system
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    expect(() => contextKeysService.set('testExt.bad', { a: 1 } as unknown as string)).toThrow(
      /Invalid context key value/,
    );
  });

  it('should return undefined after a key is removed', () => {
    contextKeysService.set('testExt.someFlag', true);
    contextKeysService.remove('testExt.someFlag');
    expect(contextKeysService.get('testExt.someFlag')).toBeUndefined();
  });

  it('should fire onDidChange with the unprefixed key for context key changes', () => {
    const handler = vi.fn();
    const unsubscribe = contextKeysService.onDidChange(handler);
    contextKeysService.set('testExt.someFlag', true);
    expect(handler).toHaveBeenCalledWith({ key: 'testExt.someFlag', value: true });
    unsubscribe();
  });

  it('should fire onDidChange with an undefined value when a context key is removed', () => {
    contextKeysService.set('testExt.someFlag', true);
    const handler = vi.fn();
    const unsubscribe = contextKeysService.onDidChange(handler);
    contextKeysService.remove('testExt.someFlag');
    expect(handler).toHaveBeenCalledWith({ key: 'testExt.someFlag', value: undefined });
    unsubscribe();
  });

  it('should not fire onDidChange for non-contextKeys shared store changes', () => {
    const handler = vi.fn();
    const unsubscribe = contextKeysService.onDidChange(handler);
    const changeEventHandler = vi.mocked(mockEmitter.event).mock.calls[0][0];
    changeEventHandler({
      key: 'platform.customNetworkTimeoutMs.test',
      value: 9,
      clock: { counter: 50, processId: 'other-process' },
    });
    expect(handler).not.toHaveBeenCalled();
    unsubscribe();
  });

  it('should expose only set/get/remove on the PAPI subset', () => {
    expect(Object.keys(papiContextKeysService).sort()).toEqual(['get', 'remove', 'set']);
  });
});
