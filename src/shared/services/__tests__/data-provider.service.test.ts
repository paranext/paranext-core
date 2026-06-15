import { describe, it, expect, expectTypeOf, vi, beforeEach } from 'vitest';
import type { NetworkObjectDocumentation } from '@shared/models/openrpc.model';
import * as networkService from '@shared/services/network.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { dataProviderService } from '@shared/services/data-provider.service';
import type { registerEngineByType } from '@shared/services/data-provider.service';

/**
 * Tests for dataProviderService.registerEngine and registerEngineByType —
 * NetworkObjectDocumentation parameter.
 *
 * The type-level tests confirm the new `documentation` parameter exists on the public signatures.
 * The runtime test confirms `registerEngine` actually forwards that documentation through to
 * `networkObjectService.set`, where the OpenRPC fanout happens.
 */

// Mock the boundaries registerEngine touches so it can run without the RPC/WebSocket layer.
vi.mock('@shared/services/network.service', () => ({
  initialize: vi.fn(() => Promise.resolve()),
  createNetworkEventEmitterAsync: vi.fn(),
}));

vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: {
    hasKnown: vi.fn(() => false),
    set: vi.fn(),
    get: vi.fn(),
  },
  overrideDispose: vi.fn(),
}));

vi.mock('@shared/services/notification.service', () => ({ notificationService: {} }));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// ---------------------------------------------------------------------------
// Type-level tests
// ---------------------------------------------------------------------------

describe('dataProviderService.registerEngine — documentation parameter', () => {
  it('accepts NetworkObjectDocumentation as a trailing parameter (compile-time)', () => {
    type Sig = Parameters<typeof dataProviderService.registerEngine>;
    // The 5th parameter (index 4) is the optional documentation parameter.
    expectTypeOf<Sig[4]>().toEqualTypeOf<NetworkObjectDocumentation | undefined>();
  });
});

describe('registerEngineByType — documentation parameter', () => {
  it('accepts NetworkObjectDocumentation as a trailing parameter (compile-time)', () => {
    type Sig = Parameters<typeof registerEngineByType>;
    expectTypeOf<Sig[4]>().toEqualTypeOf<NetworkObjectDocumentation | undefined>();
  });
});

// ---------------------------------------------------------------------------
// Runtime test: documentation is forwarded to networkObjectService.set
// ---------------------------------------------------------------------------

describe('dataProviderService.registerEngine — documentation forwarding', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // A networked update emitter with the surface buildDataProvider/registerEngine use.
    const mockEmitter = { emit: vi.fn(), event: vi.fn(() => () => {}), dispose: vi.fn() };
    vi.mocked(networkService.createNetworkEventEmitterAsync).mockResolvedValue(
      // Needed for testing — the real return carries the full emitter surface.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      mockEmitter as unknown as Awaited<
        ReturnType<typeof networkService.createNetworkEventEmitterAsync>
      >,
    );

    // set() returns the disposable network object; get() must return a truthy proxy so the
    // registration's AsyncVariable resolves.
    const disposable = { dispose: vi.fn(async () => true) };
    // The mocks stand in for the full disposable/proxy types; cast the minimal test doubles.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(networkObjectService.set).mockResolvedValue(disposable as never);
    // The mocks stand in for the full disposable/proxy types; cast the minimal test doubles.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(networkObjectService.get).mockResolvedValue({ getData: vi.fn() } as never);
  });

  it('forwards the documentation argument through to networkObjectService.set', async () => {
    // Minimal engine with matching get/set functions so buildDataProvider validates.
    const engine = {
      getData: async () => 1,
      setData: async () => true,
    };
    const documentation: NetworkObjectDocumentation = { 'x-experimental': true };

    await dataProviderService.registerEngine(
      // The name/engine are generic in this test context; cast to satisfy the typed signature.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      'test.documentationForwarding' as never,
      // The name/engine are generic in this test context; cast to satisfy the typed signature.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      engine as never,
      'dataProvider',
      undefined,
      documentation,
    );

    // networkObjectService.set is called as (id, object, type, attributes, documentation).
    expect(networkObjectService.set).toHaveBeenCalledTimes(1);
    expect(vi.mocked(networkObjectService.set).mock.calls[0][4]).toBe(documentation);
  });
});
