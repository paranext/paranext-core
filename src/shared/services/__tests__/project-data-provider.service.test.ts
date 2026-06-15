import { describe, it, expect, expectTypeOf, vi, beforeEach } from 'vitest';
import { registerProjectDataProviderEngineFactory } from '@shared/services/project-data-provider.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { registerEngineByType } from '@shared/services/data-provider.service';
import type {
  IProjectDataProviderEngineFactory,
  ProjectDataProviderEngineEnvelope,
} from '@shared/models/project-data-provider-engine-factory.model';
import type { NetworkObjectDocumentation } from '@shared/models/openrpc.model';

// Mock the boundaries the PDP service registers through so we can inspect the attributes it merges.
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: vi.fn(), hasKnown: vi.fn(() => false) },
}));

vi.mock('@shared/services/data-provider.service', () => ({
  registerEngineByType: vi.fn(),
  getByType: vi.fn(),
}));

vi.mock('@shared/services/project-lookup.service', () => ({
  projectLookupService: {},
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

/** Minimal `platform.base` engine — has the keys the base-projectInterface check looks for. */
function makeBaseEngine() {
  return {
    getExtensionData: vi.fn(),
    setExtensionData: vi.fn(),
    getSetting: vi.fn(),
    setSetting: vi.fn(),
    resetSetting: vi.fn(),
  };
}

describe('registerProjectDataProviderEngineFactory — attributes + documentation parameters', () => {
  it('exposes attributes and documentation as optional trailing parameters (compile-time)', () => {
    type Sig = Parameters<typeof registerProjectDataProviderEngineFactory>;
    // id, projectInterfaces, factory, attributes?, documentation?
    expectTypeOf<Sig['length']>().toEqualTypeOf<3 | 4 | 5>();
    expectTypeOf<Sig[3]>().toEqualTypeOf<{ [property: string]: unknown } | undefined>();
    expectTypeOf<Sig[4]>().toEqualTypeOf<NetworkObjectDocumentation | undefined>();
  });

  it('factory can return either a raw engine or an envelope (compile-time)', () => {
    const factoryEngine: IProjectDataProviderEngineFactory<['platform.base']> = {
      getAvailableProjects: async () => [],
      // The cast is needed to satisfy the generic engine type in a test context without a real engine
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      createProjectDataProviderEngine: async () => ({}) as never, // raw engine
    };
    const factoryEnvelope: IProjectDataProviderEngineFactory<['platform.base']> = {
      getAvailableProjects: async () => [],
      createProjectDataProviderEngine: async () => ({
        // The cast is needed to satisfy the generic engine type in a test context without a real engine
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        projectDataProviderEngine: {} as never,
        attributes: { extra: 1 },
        documentation: { 'x-experimental': true },
      }),
    };
    expect(factoryEngine).toBeDefined();
    expect(factoryEnvelope).toBeDefined();
  });
});

describe('registerProjectDataProviderEngineFactory — platform-canonical attributes win (anti-spoofing)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // The mocks return minimal disposables standing in for the full network object / data provider.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(networkObjectService.set).mockResolvedValue({ dispose: vi.fn() } as never);
    // The mocks return minimal disposables standing in for the full network object / data provider.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(registerEngineByType).mockResolvedValue({
      dispose: vi.fn(async () => true),
    } as never);
  });

  it('overwrites caller-supplied projectInterfaces with the canonical value at the factory level', async () => {
    const engineFactory: IProjectDataProviderEngineFactory<['platform.base']> = {
      getAvailableProjects: async () => [],
      // The test engine isn't a full typed engine; cast to satisfy the generic engine return type.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      createProjectDataProviderEngine: async () => makeBaseEngine() as never,
    };
    const documentation: NetworkObjectDocumentation = { 'x-experimental': true };

    await registerProjectDataProviderEngineFactory(
      'pdpf-id',
      ['platform.base'],
      engineFactory,
      // A malicious/incorrect caller tries to spoof projectInterfaces and slip in extra attributes.
      { projectInterfaces: ['spoofed.interface'], custom: 'keep' },
      documentation,
    );

    expect(networkObjectService.set).toHaveBeenCalledTimes(1);
    const setCall = vi.mocked(networkObjectService.set).mock.calls[0];
    const mergedAttributes = setCall[3];
    // The platform-canonical projectInterfaces wins; the caller's spoofed value is discarded.
    expect(mergedAttributes).toEqual({ projectInterfaces: ['platform.base'], custom: 'keep' });
    // Documentation is forwarded untouched as the 5th argument.
    expect(setCall[4]).toBe(documentation);
  });

  it('overwrites caller-supplied projectId and projectInterfaces with canonical values per PDP', async () => {
    const baseEngine = makeBaseEngine();
    const envelope: ProjectDataProviderEngineEnvelope<['platform.base']> = {
      // The test engine isn't a full typed engine; cast to satisfy the generic engine type.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      projectDataProviderEngine: baseEngine as never,
      // The per-PDP attributes try to spoof both projectId and projectInterfaces.
      attributes: {
        projectId: 'spoofed-id',
        projectInterfaces: ['spoofed.interface'],
        custom: 'keep',
      },
    };
    const engineFactory: IProjectDataProviderEngineFactory<['platform.base']> = {
      getAvailableProjects: async () => [],
      createProjectDataProviderEngine: async () => envelope,
    };

    await registerProjectDataProviderEngineFactory('pdpf-id', ['platform.base'], engineFactory);

    // Capture the internal factory the service registered, then drive a PDP creation through it.
    // set() types its object argument as a generic NetworkableObject, so cast to reach the method.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const factory = vi.mocked(networkObjectService.set).mock.calls[0][1] as unknown as {
      getProjectDataProviderId(projectId: string): Promise<string>;
    };
    await factory.getProjectDataProviderId('real-project-id');

    expect(registerEngineByType).toHaveBeenCalledTimes(1);
    const mergedAttributes = vi.mocked(registerEngineByType).mock.calls[0][3];
    // Canonical projectId (the real argument) and projectInterfaces win; custom attribute survives.
    expect(mergedAttributes).toEqual({
      projectId: 'real-project-id',
      projectInterfaces: ['platform.base'],
      custom: 'keep',
    });
  });
});
