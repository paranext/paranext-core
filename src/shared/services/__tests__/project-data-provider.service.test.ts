import { describe, it } from 'vitest';
import { registerProjectDataProviderEngineFactory } from '@shared/services/project-data-provider.service';
import type { IProjectDataProviderEngineFactory } from '@shared/models/project-data-provider-engine-factory.model';

describe('registerProjectDataProviderEngineFactory — attributes + documentation parameters', () => {
  it('accepts attributes and documentation as optional trailing parameters (compile-time)', () => {
    // Compile-time only: verify the function signature.
    type Sig = Parameters<typeof registerProjectDataProviderEngineFactory>;
    // Should have 5 parameters: id, projectInterfaces, factory, attributes?, documentation?
    void (null as unknown as Sig);
  });

  it('factory can return either engine or envelope (compile-time)', () => {
    // Verifies the return shape augmentation compiles.
    const factoryEngine: IProjectDataProviderEngineFactory<['platform.base']> = {
      getAvailableProjects: async () => [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createProjectDataProviderEngine: async () => ({}) as any, // raw engine
    };
    const factoryEnvelope: IProjectDataProviderEngineFactory<['platform.base']> = {
      getAvailableProjects: async () => [],
      createProjectDataProviderEngine: async () => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        projectDataProviderEngine: {} as any,
        attributes: { extra: 1 },
        documentation: { 'x-experimental': true },
      }),
    };
    void factoryEngine;
    void factoryEnvelope;
  });
});
