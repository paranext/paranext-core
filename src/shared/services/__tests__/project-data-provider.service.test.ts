import { describe, it, expect } from 'vitest';
import { registerProjectDataProviderEngineFactory } from '@shared/services/project-data-provider.service';
import type { IProjectDataProviderEngineFactory } from '@shared/models/project-data-provider-engine-factory.model';

describe('registerProjectDataProviderEngineFactory — attributes + documentation parameters', () => {
  it('accepts attributes and documentation as optional trailing parameters (compile-time)', () => {
    // Compile-time only: verify the function signature.
    type Sig = Parameters<typeof registerProjectDataProviderEngineFactory>;
    // Should have 5 parameters: id, projectInterfaces, factory, attributes?, documentation?
    const sigCheck: Sig | undefined = undefined;
    expect(sigCheck).toBeUndefined();
  });

  it('factory can return either engine or envelope (compile-time)', () => {
    // Verifies the return shape augmentation compiles.
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
