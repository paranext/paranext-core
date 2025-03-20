/* eslint-disable no-type-assertion/no-type-assertion */

import { vi } from 'vitest';
import {
  ProjectDataProviderFactoryMetadataInfo,
  ProjectMetadata,
  ProjectMetadataWithoutFactoryInfo,
} from '@shared/models/project-metadata.model';
import {
  getPDPFactoryIdFromNetworkObjectName,
  getPDPFactoryNetworkObjectNameFromId,
  testingProjectLookupService,
} from '@shared/models/project-lookup.service-model';
import { networkObjectService } from '@shared/services/network-object.service';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import {
  IProjectDataProviderFactory,
  PDP_FACTORY_OBJECT_TYPE,
  ProjectMetadataFilterOptions,
} from '@shared/models/project-data-provider-factory.interface';
import { NetworkObjectDetails } from '@shared/models/network-object.model';
import { ProjectInterfaces } from 'papi-shared-types';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { LayeringProjectDataProviderEngineFactory } from '@shared/models/project-data-provider-engine-factory.model';

vi.mock('@shared/services/network-object.service', () => ({
  __esModule: true,
  default: {
    get: vi.fn(),
  },
}));

vi.mock('@shared/services/network-object-status.service', () => ({
  __esModule: true,
  default: {
    getAllNetworkObjectDetails: vi.fn(),
    // Not a full implementation - we just don't need whatever is returned here
    waitForNetworkObject: vi.fn(async () => {}),
  },
}));

beforeAll(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true, toFake: ['performance'] });
  vi.advanceTimersByTime(testingProjectLookupService.LOAD_TIME_GRACE_PERIOD_MS);
});

afterAll(() => {
  vi.useRealTimers();
});

beforeEach(() => {
  // @ts-expect-error ts(2339) TypeScript doesn't realize this is a jest function :(
  networkObjectService.get.mockImplementation(() => {
    throw new Error('networkObjectService.get has no test implementation');
  });
  // @ts-expect-error ts(2339) TypeScript doesn't realize this is a jest function :(
  networkObjectStatusService.getAllNetworkObjectDetails.mockImplementation(() => {
    throw new Error(
      'networkObjectStatusService.getAllNetworkObjectDetails has no test implementation',
    );
  });
});

describe('Getting project metadata with Layering PDPs', () => {
  const testProjectId = 'test-project';
  const baseProjectInterfaces: ProjectInterfaces[] = ['platform.base', 'platform.placeholder'];
  const layeringPDPInterfaces: { [pdpfName: string]: ProjectInterfaces[] } = {
    [getPDPFactoryNetworkObjectNameFromId('layer-1')]: ['platformScripture.USJ_Chapter'],
    [getPDPFactoryNetworkObjectNameFromId('layer-2')]: ['platformScripture.USX_Chapter'],
    [getPDPFactoryNetworkObjectNameFromId('layer-3')]: ['platformScripture.USX_Chapter'],
    [getPDPFactoryNetworkObjectNameFromId('meta-layer-3')]: ['platform.notesOnly'],
    [getPDPFactoryNetworkObjectNameFromId('non-layer')]: ['platformScripture.USFM_Book'],
  };
  function getIncludedPdpfIds(pdpfIds: string[]) {
    return pdpfIds.filter(
      (pdpfId) =>
        !pdpfId.startsWith('non-') &&
        (!pdpfId.startsWith('meta-') || pdpfIds.includes(pdpfId.substring('meta-'.length))),
    );
  }
  function getAggregatedProjectInterfaces(pdpfIds: string[]) {
    const interfaces = new Set([
      ...baseProjectInterfaces,
      ...getIncludedPdpfIds(pdpfIds)
        .filter((pdpfId) => pdpfId !== 'base')
        .flatMap(
          (layeringPdpfId) =>
            layeringPDPInterfaces[getPDPFactoryNetworkObjectNameFromId(layeringPdpfId)],
        ),
    ]);
    return [...interfaces];
  }
  const testPDPFInfo: Record<string, Partial<NetworkObjectDetails>> = {
    ...Object.fromEntries(
      Object.entries(layeringPDPInterfaces).map(([pdpfName, projectInterfaces]) => [
        pdpfName,
        {
          objectType: PDP_FACTORY_OBJECT_TYPE,
          attributes: {
            projectInterfaces,
          },
        },
      ]),
    ),
    [getPDPFactoryNetworkObjectNameFromId('base')]: {
      objectType: PDP_FACTORY_OBJECT_TYPE,
      attributes: {
        projectInterfaces: baseProjectInterfaces,
      },
    },
    extraneous: {
      objectType: 'not-a-pdpf',
    },
  };
  function getTestPDPFInfoSubset(pdpfIds: string[]) {
    return Object.fromEntries(
      pdpfIds.map((pdpfId) => {
        const pdpfName = getPDPFactoryNetworkObjectNameFromId(pdpfId);
        return [pdpfName, testPDPFInfo[pdpfName]];
      }),
    );
  }
  const testPDPFs: Record<string, Partial<IProjectDataProviderFactory>> = {
    ...Object.fromEntries(
      Object.entries(layeringPDPInterfaces).map(([pdpfName, projectInterfaces]) => {
        let projectInterfacesToLayerOver: string | (string | string[])[] = 'platform.placeholder';
        const pdpfId = getPDPFactoryIdFromNetworkObjectName(pdpfName);
        if (pdpfId.startsWith('non-'))
          projectInterfacesToLayerOver = 'blah-does-not-match-anything';
        else if (pdpfId.startsWith('meta-')) {
          const layerOverPdpfId = pdpfId.substring('meta-'.length);
          projectInterfacesToLayerOver =
            layeringPDPInterfaces[getPDPFactoryNetworkObjectNameFromId(layerOverPdpfId)];
        }
        class LayeringPDP extends LayeringProjectDataProviderEngineFactory<
          typeof projectInterfaces
        > {
          projectInterfacesToLayerOver = projectInterfacesToLayerOver;
          providedProjectInterfaces = projectInterfaces;
        }
        return [pdpfName, new LayeringPDP(pdpfId)];
      }),
    ),
    [getPDPFactoryNetworkObjectNameFromId('base')]: {
      async getAvailableProjects(): Promise<ProjectMetadataWithoutFactoryInfo[]> {
        return [
          {
            id: testProjectId,
            projectInterfaces: baseProjectInterfaces,
          },
        ];
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-expect-error ts(2339) TypeScript doesn't realize this is a jest function :(
    networkObjectService.get.mockImplementation(
      (networkObjectId: string) => testPDPFs[networkObjectId],
    );
  });

  it('should successfully get just the base metadata if that is the only pdpf available', async () => {
    const pdpfIds = ['base'];
    // @ts-expect-error ts(2339) TypeScript doesn't realize this is a jest function :(
    networkObjectStatusService.getAllNetworkObjectDetails.mockImplementation(() =>
      getTestPDPFInfoSubset(pdpfIds),
    );

    const projectsMetadata = await projectLookupService.getMetadataForAllProjects();

    expect(projectsMetadata.length).toBe(1);

    // Check project 1
    const testProjectMetadataPossiblyUndefined = projectsMetadata.find(
      (projectMetadata) => projectMetadata.id === testProjectId,
    );
    expect(testProjectMetadataPossiblyUndefined).toBeDefined();
    const testProjectMetadata = testProjectMetadataPossiblyUndefined as ProjectMetadata;

    // Should be provided by the right number of pdpfs
    expect(Object.entries(testProjectMetadata.pdpFactoryInfo).length).toBe(
      getIncludedPdpfIds(pdpfIds).length,
    );

    // `projectInterface`s should be a combination of all available `projectInterface`s
    const correctProjectInterfaces = getAggregatedProjectInterfaces(pdpfIds);
    expect(testProjectMetadata.projectInterfaces.length).toEqual(correctProjectInterfaces.length);
    correctProjectInterfaces.forEach((projectInterface) =>
      expect(testProjectMetadata.projectInterfaces).toContain(projectInterface),
    );
  });

  it('should successfully get no projects if only a layering pdpf is available', async () => {
    const pdpfIds = ['layer-1'];
    // @ts-expect-error ts(2339) TypeScript doesn't realize this is a jest function :(
    networkObjectStatusService.getAllNetworkObjectDetails.mockImplementation(() =>
      getTestPDPFInfoSubset(pdpfIds),
    );

    const projectsMetadata = await projectLookupService.getMetadataForAllProjects();

    expect(projectsMetadata.length).toBe(0);
  });

  it('should successfully get the base plus one layering metadata if there is just one layering pdpfs available', async () => {
    const pdpfIds = ['base', 'layer-1'];
    // @ts-expect-error ts(2339) TypeScript doesn't realize this is a jest function :(
    networkObjectStatusService.getAllNetworkObjectDetails.mockImplementation(() =>
      getTestPDPFInfoSubset(pdpfIds),
    );

    const projectsMetadata = await projectLookupService.getMetadataForAllProjects();

    expect(projectsMetadata.length).toBe(1);

    // Check project 1
    const testProjectMetadataPossiblyUndefined = projectsMetadata.find(
      (projectMetadata) => projectMetadata.id === testProjectId,
    );
    expect(testProjectMetadataPossiblyUndefined).toBeDefined();
    const testProjectMetadata = testProjectMetadataPossiblyUndefined as ProjectMetadata;

    // Should be provided by the right number of pdpfs
    expect(Object.entries(testProjectMetadata.pdpFactoryInfo).length).toBe(
      getIncludedPdpfIds(pdpfIds).length,
    );

    // `projectInterface`s should be a combination of all available `projectInterface`s
    const correctProjectInterfaces = getAggregatedProjectInterfaces(pdpfIds);
    expect(testProjectMetadata.projectInterfaces.length).toEqual(correctProjectInterfaces.length);
    correctProjectInterfaces.forEach((projectInterface) =>
      expect(testProjectMetadata.projectInterfaces).toContain(projectInterface),
    );
  });

  it('should not cause an infinite loop of calling each other but should successfully get base and layering metadata with multiple layering pdpfs (as far as we can control)', async () => {
    const pdpfIds = ['base', 'layer-1', 'layer-2'];
    // @ts-expect-error ts(2339) TypeScript doesn't realize this is a jest function :(
    networkObjectStatusService.getAllNetworkObjectDetails.mockImplementation(() =>
      getTestPDPFInfoSubset(pdpfIds),
    );

    const projectsMetadata = await projectLookupService.getMetadataForAllProjects();

    expect(projectsMetadata.length).toBe(1);

    // Check project 1
    const testProjectMetadataPossiblyUndefined = projectsMetadata.find(
      (projectMetadata) => projectMetadata.id === testProjectId,
    );
    expect(testProjectMetadataPossiblyUndefined).toBeDefined();
    const testProjectMetadata = testProjectMetadataPossiblyUndefined as ProjectMetadata;

    // Should be provided by the right number of pdpfs
    expect(Object.entries(testProjectMetadata.pdpFactoryInfo).length).toBe(
      getIncludedPdpfIds(pdpfIds).length,
    );

    // `projectInterface`s should be a combination of all available `projectInterface`s
    const correctProjectInterfaces = getAggregatedProjectInterfaces(pdpfIds);
    expect(testProjectMetadata.projectInterfaces.length).toEqual(correctProjectInterfaces.length);
    correctProjectInterfaces.forEach((projectInterface) =>
      expect(testProjectMetadata.projectInterfaces).toContain(projectInterface),
    );
  });

  it('should successfully get base and layering metadata with duplicate layering pdpfs', async () => {
    const pdpfIds = ['base', 'layer-1', 'layer-2', 'layer-3'];
    // @ts-expect-error ts(2339) TypeScript doesn't realize this is a jest function :(
    networkObjectStatusService.getAllNetworkObjectDetails.mockImplementation(() =>
      getTestPDPFInfoSubset(pdpfIds),
    );

    const projectsMetadata = await projectLookupService.getMetadataForAllProjects();

    expect(projectsMetadata.length).toBe(1);

    // Check project 1
    const testProjectMetadataPossiblyUndefined = projectsMetadata.find(
      (projectMetadata) => projectMetadata.id === testProjectId,
    );
    expect(testProjectMetadataPossiblyUndefined).toBeDefined();
    const testProjectMetadata = testProjectMetadataPossiblyUndefined as ProjectMetadata;

    // Should be provided by the right number of pdpfs
    expect(Object.entries(testProjectMetadata.pdpFactoryInfo).length).toBe(
      getIncludedPdpfIds(pdpfIds).length,
    );

    // `projectInterface`s should be a combination of all available `projectInterface`s
    const correctProjectInterfaces = getAggregatedProjectInterfaces(pdpfIds);
    expect(testProjectMetadata.projectInterfaces.length).toEqual(correctProjectInterfaces.length);
    correctProjectInterfaces.forEach((projectInterface) =>
      expect(testProjectMetadata.projectInterfaces).toContain(projectInterface),
    );
  });

  it('should not get interfaces for non-matching layering pdpfs', async () => {
    const pdpfIds = ['base', 'layer-1', 'non-layer', 'meta-layer-3'];
    // @ts-expect-error ts(2339) TypeScript doesn't realize this is a jest function :(
    networkObjectStatusService.getAllNetworkObjectDetails.mockImplementation(() =>
      getTestPDPFInfoSubset(pdpfIds),
    );

    const projectsMetadata = await projectLookupService.getMetadataForAllProjects();

    expect(projectsMetadata.length).toBe(1);

    // Check project 1
    const testProjectMetadataPossiblyUndefined = projectsMetadata.find(
      (projectMetadata) => projectMetadata.id === testProjectId,
    );
    expect(testProjectMetadataPossiblyUndefined).toBeDefined();
    const testProjectMetadata = testProjectMetadataPossiblyUndefined as ProjectMetadata;

    // Should be provided by the right number of pdpfs
    expect(Object.entries(testProjectMetadata.pdpFactoryInfo).length).toBe(
      getIncludedPdpfIds(pdpfIds).length,
    );

    // `projectInterface`s should be a combination of all available `projectInterface`s
    const correctProjectInterfaces = getAggregatedProjectInterfaces(pdpfIds);
    expect(testProjectMetadata.projectInterfaces.length).toEqual(correctProjectInterfaces.length);
    correctProjectInterfaces.forEach((projectInterface) =>
      expect(testProjectMetadata.projectInterfaces).toContain(projectInterface),
    );
  });

  it('should successfully get metadata for layering pdpfs that layer over layering pdpfs', async () => {
    const pdpfIds = ['base', 'layer-1', 'layer-3', 'meta-layer-3'];
    // @ts-expect-error ts(2339) TypeScript doesn't realize this is a jest function :(
    networkObjectStatusService.getAllNetworkObjectDetails.mockImplementation(() =>
      getTestPDPFInfoSubset(pdpfIds),
    );

    const projectsMetadata = await projectLookupService.getMetadataForAllProjects();

    expect(projectsMetadata.length).toBe(1);

    // Check project 1
    const testProjectMetadataPossiblyUndefined = projectsMetadata.find(
      (projectMetadata) => projectMetadata.id === testProjectId,
    );
    expect(testProjectMetadataPossiblyUndefined).toBeDefined();
    const testProjectMetadata = testProjectMetadataPossiblyUndefined as ProjectMetadata;

    // Should be provided by the right number of pdpfs
    expect(Object.entries(testProjectMetadata.pdpFactoryInfo).length).toBe(
      getIncludedPdpfIds(pdpfIds).length,
    );

    // `projectInterface`s should be a combination of all available `projectInterface`s
    const correctProjectInterfaces = getAggregatedProjectInterfaces(pdpfIds);
    expect(testProjectMetadata.projectInterfaces.length).toEqual(correctProjectInterfaces.length);
    correctProjectInterfaces.forEach((projectInterface) =>
      expect(testProjectMetadata.projectInterfaces).toContain(projectInterface),
    );
  });
});

describe('Metadata generation:', () => {
  const testProjectId = 'test-project';
  const expectedTestProjectInterfaces: ProjectInterfaces[] = [
    'platform.placeholder',
    'platform.notesOnly',
    'platformScripture.USFM_Book',
    'helloWorld',
  ];
  const expectedTest2ProjectInterfaces: ProjectInterfaces[] = [
    'platformScripture.USFM_Book',
    'platform.notesOnly',
  ];
  const test2ProjectId = 'test-2-project';
  const testPDPFInfo: Record<string, Partial<NetworkObjectDetails>> = {
    [getPDPFactoryNetworkObjectNameFromId('test-0')]: {
      objectType: PDP_FACTORY_OBJECT_TYPE,
    },
    [getPDPFactoryNetworkObjectNameFromId('test-1')]: {
      objectType: PDP_FACTORY_OBJECT_TYPE,
    },
    [getPDPFactoryNetworkObjectNameFromId('test-2')]: {
      objectType: PDP_FACTORY_OBJECT_TYPE,
    },
    [getPDPFactoryNetworkObjectNameFromId('test-3')]: {
      objectType: PDP_FACTORY_OBJECT_TYPE,
    },
    [getPDPFactoryNetworkObjectNameFromId('test-4')]: {
      objectType: PDP_FACTORY_OBJECT_TYPE,
    },
    extraneous: {
      objectType: 'not-a-pdpf',
    },
  };
  const testPDPFs: Record<string, Partial<IProjectDataProviderFactory>> = {
    [getPDPFactoryNetworkObjectNameFromId('test-2')]: {
      async getAvailableProjects(): Promise<ProjectMetadataWithoutFactoryInfo[]> {
        return [
          {
            id: testProjectId,
            projectInterfaces: ['platform.placeholder', 'platform.notesOnly', 'helloWorld'],
          },
        ];
      },
    },
    [getPDPFactoryNetworkObjectNameFromId('test-1')]: {
      async getAvailableProjects(): Promise<ProjectMetadataWithoutFactoryInfo[]> {
        return [
          {
            id: testProjectId,
            projectInterfaces: ['platform.placeholder', 'platform.notesOnly'],
          },
          {
            id: test2ProjectId,
            projectInterfaces: ['platformScripture.USFM_Book', 'platform.notesOnly'],
          },
        ];
      },
    },
    [getPDPFactoryNetworkObjectNameFromId('test-3')]: {
      async getAvailableProjects(): Promise<ProjectMetadataWithoutFactoryInfo[]> {
        return [
          {
            id: testProjectId,
            projectInterfaces: [
              'platform.placeholder',
              'platform.notesOnly',
              'platformScripture.USFM_Book',
            ],
          },
        ];
      },
    },
    [getPDPFactoryNetworkObjectNameFromId('test-0')]: {
      async getAvailableProjects(): Promise<ProjectMetadataWithoutFactoryInfo[]> {
        return [{ id: testProjectId, projectInterfaces: ['platform.placeholder'] }];
      },
    },
    [getPDPFactoryNetworkObjectNameFromId('test-4')]: {
      async getAvailableProjects(): Promise<ProjectMetadataWithoutFactoryInfo[]> {
        return [
          { id: testProjectId, projectInterfaces: ['platform.notesOnly'] },
          { id: test2ProjectId, projectInterfaces: ['platform.notesOnly'] },
        ];
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-expect-error ts(2339) TypeScript doesn't realize this is a jest function :(
    networkObjectStatusService.getAllNetworkObjectDetails.mockImplementation(() => testPDPFInfo);
    // @ts-expect-error ts(2339) TypeScript doesn't realize this is a jest function :(
    networkObjectService.get.mockImplementation(
      (networkObjectId: string) => testPDPFs[networkObjectId],
    );
  });

  describe('compareProjectDataProviderFactoryMetadataInfoMinimalMatch', () => {
    test('gets the PDP Factory Id that implements projectInterface and as few others as possible', async () => {
      const projectsMetadata = await testingProjectLookupService.internalGetMetadata(
        testingProjectLookupService.transformGetMetadataForProjectParametersToFilter(
          undefined,
          'platform.placeholder',
        ),
      );

      // Check project 1
      const testProjectMetadataPossiblyUndefined = projectsMetadata.find(
        (projectMetadata) => projectMetadata.id === testProjectId,
      );
      expect(testProjectMetadataPossiblyUndefined).toBeDefined();
      const testProjectMetadata = testProjectMetadataPossiblyUndefined as ProjectMetadata;

      const pdpfInfoValuesSorted = (
        Object.values(testProjectMetadata.pdpFactoryInfo)
          // Just get the ones that have the right `projectInterface` (and get rid of undefined)
          .filter(
            (pdpfInfo) => pdpfInfo && pdpfInfo.projectInterfaces.includes('platform.placeholder'),
          ) as ProjectDataProviderFactoryMetadataInfo[]
      ).sort(testingProjectLookupService.compareProjectDataProviderFactoryMetadataInfoMinimalMatch);

      expect(pdpfInfoValuesSorted.length).toBe(4);
      expect(pdpfInfoValuesSorted[0].projectInterfaces).toEqual(['platform.placeholder']);
      expect(pdpfInfoValuesSorted[1].projectInterfaces).toEqual([
        'platform.placeholder',
        'platform.notesOnly',
      ]);
      expect(pdpfInfoValuesSorted[2].projectInterfaces).toEqual([
        'platform.placeholder',
        'platform.notesOnly',
        'helloWorld',
      ]);
      expect(pdpfInfoValuesSorted[3].projectInterfaces).toEqual([
        'platform.placeholder',
        'platform.notesOnly',
        'platformScripture.USFM_Book',
      ]);
    });
  });

  describe('getMinimalMatchPdpFactoryInfo', () => {
    test('returns sort values to order by minimally matching to the projectInterface', async () => {
      const projectsMetadata = await testingProjectLookupService.internalGetMetadata(
        testingProjectLookupService.transformGetMetadataForProjectParametersToFilter(
          undefined,
          'platform.placeholder',
        ),
      );

      // Check project 1
      const testProjectMetadataPossiblyUndefined = projectsMetadata.find(
        (projectMetadata) => projectMetadata.id === testProjectId,
      );
      expect(testProjectMetadataPossiblyUndefined).toBeDefined();
      const testProjectMetadata = testProjectMetadataPossiblyUndefined as ProjectMetadata;

      const minimalMatchIdPossiblyUndefined = projectLookupService.getMinimalMatchPdpFactoryId(
        testProjectMetadata,
        'platform.placeholder',
      );
      expect(minimalMatchIdPossiblyUndefined).toBeDefined();
      const minimalMatchId = minimalMatchIdPossiblyUndefined as string;

      expect(minimalMatchId).toBe('test-0');
      expect(testProjectMetadata.pdpFactoryInfo[minimalMatchId]?.projectInterfaces).toEqual([
        'platform.placeholder',
      ]);
    });
  });

  describe('internalGetMetadata', () => {
    test('gets all aggregated ProjectMetadata when not filtered', async () => {
      const projectsMetadata = await testingProjectLookupService.internalGetMetadata();

      expect(projectsMetadata.length).toBe(2);

      // Check project 1
      const testProjectMetadataPossiblyUndefined = projectsMetadata.find(
        (projectMetadata) => projectMetadata.id === testProjectId,
      );
      expect(testProjectMetadataPossiblyUndefined).toBeDefined();
      const testProjectMetadata = testProjectMetadataPossiblyUndefined as ProjectMetadata;

      // Should be provided by the right number of pdpfs
      expect(Object.entries(testProjectMetadata.pdpFactoryInfo).length).toBe(5);

      // `projectInterface`s should be a combination of all available `projectInterface`s
      expect(testProjectMetadata.projectInterfaces.length).toEqual(
        expectedTestProjectInterfaces.length,
      );
      expectedTestProjectInterfaces.forEach((projectInterface) =>
        expect(testProjectMetadata.projectInterfaces).toContain(projectInterface),
      );

      // Check project 2
      const test2ProjectMetadataPossiblyUndefined = projectsMetadata.find(
        (projectMetadata) => projectMetadata.id === test2ProjectId,
      );
      expect(test2ProjectMetadataPossiblyUndefined).toBeDefined();
      const test2ProjectMetadata = test2ProjectMetadataPossiblyUndefined as ProjectMetadata;

      // Should be provided by the right number of pdpfs
      expect(Object.entries(test2ProjectMetadata.pdpFactoryInfo).length).toBe(2);

      // `projectInterface`s should be the right `projectInterface`s
      expect(test2ProjectMetadata.projectInterfaces.length).toEqual(
        expectedTest2ProjectInterfaces.length,
      );
      expectedTest2ProjectInterfaces.forEach((projectInterface) =>
        expect(test2ProjectMetadata.projectInterfaces).toContain(projectInterface),
      );
    });

    test('deep clones resulting ProjectMetadata so future calls are not affected', async () => {
      const projectsMetadata = await testingProjectLookupService.internalGetMetadata(
        testingProjectLookupService.transformGetMetadataForProjectParametersToFilter(testProjectId),
      );

      // First time checking to make sure everything is consistent for later
      expect(projectsMetadata.length).toBe(1);
      expect(projectsMetadata[0].projectInterfaces.length).toBe(
        expectedTestProjectInterfaces.length,
      );

      // Change the values
      projectsMetadata[0].id = 'FAKE ID';
      projectsMetadata[0].projectInterfaces.push('FAKE PROJECT INTERFACE' as ProjectInterfaces);

      // Get the same ProjectMetadata again
      const newProjectsMetadata = await testingProjectLookupService.internalGetMetadata(
        testingProjectLookupService.transformGetMetadataForProjectParametersToFilter(testProjectId),
      );

      // Check the same conditions to make sure nothing changed
      expect(newProjectsMetadata.length).toBe(1);
      expect(newProjectsMetadata[0].projectInterfaces.length).toBe(
        expectedTestProjectInterfaces.length,
      );
    });

    test('gets just one ProjectMetadata when filtered by projectId', async () => {
      const projectsMetadata = await testingProjectLookupService.internalGetMetadata(
        testingProjectLookupService.transformGetMetadataForProjectParametersToFilter(testProjectId),
      );

      expect(projectsMetadata.length).toBe(1);

      const testProjectMetadataPossiblyUndefined = projectsMetadata.find(
        (projectMetadata) => projectMetadata.id === testProjectId,
      );
      expect(testProjectMetadataPossiblyUndefined).toBeDefined();
      const testProjectMetadata = testProjectMetadataPossiblyUndefined as ProjectMetadata;

      // Should be provided by the right number of pdpfs
      expect(Object.entries(testProjectMetadata.pdpFactoryInfo).length).toBe(5);
    });

    test('gets the whole ProjectMetadata when filtered by projectInterface', async () => {
      const projectsMetadata = await testingProjectLookupService.internalGetMetadata(
        testingProjectLookupService.transformGetMetadataForProjectParametersToFilter(
          undefined,
          'platform.placeholder',
        ),
      );

      expect(projectsMetadata.length).toBe(1);

      const testProjectMetadataPossiblyUndefined = projectsMetadata.find(
        (projectMetadata) => projectMetadata.id === testProjectId,
      );
      expect(testProjectMetadataPossiblyUndefined).toBeDefined();
      const testProjectMetadata = testProjectMetadataPossiblyUndefined as ProjectMetadata;

      // `projectInterface`s should be a combination of all available `projectInterface`s
      expect(testProjectMetadata.projectInterfaces.length).toEqual(
        expectedTestProjectInterfaces.length,
      );
      expectedTestProjectInterfaces.forEach((projectInterface) =>
        expect(testProjectMetadata.projectInterfaces).toContain(projectInterface),
      );

      // Each entry in pdpfInfo should have the `projectInterface`s provided by that pdpf
      // Notably, test-4 doesn't have platform.placeholder, but it is still there because the
      // project has `platform.placeholder` and we're looking for all info about all projects that
      // match
      expect(testProjectMetadata.pdpFactoryInfo).toEqual({
        'test-2': {
          projectInterfaces: ['platform.placeholder', 'platform.notesOnly', 'helloWorld'],
        },
        'test-1': { projectInterfaces: ['platform.placeholder', 'platform.notesOnly'] },
        'test-3': {
          projectInterfaces: [
            'platform.placeholder',
            'platform.notesOnly',
            'platformScripture.USFM_Book',
          ],
        },
        'test-0': { projectInterfaces: ['platform.placeholder'] },
        'test-4': { projectInterfaces: ['platform.notesOnly'] },
      });
    });

    test('does not use regex for projectInterface when transforming parameters', async () => {
      const projectsMetadata = await testingProjectLookupService.internalGetMetadata(
        testingProjectLookupService.transformGetMetadataForProjectParametersToFilter(
          undefined,
          'platform.*' as ProjectInterfaces,
        ),
      );

      expect(projectsMetadata.length).toBe(0);
    });

    test('gets partial ProjectMetadata when filtered by pdpFactoryId', async () => {
      const projectsMetadata = await testingProjectLookupService.internalGetMetadata(
        testingProjectLookupService.transformGetMetadataForProjectParametersToFilter(
          undefined,
          undefined,
          'test-1',
        ),
      );

      expect(projectsMetadata.length).toBe(2);

      // Check project 1
      const testProjectMetadataPossiblyUndefined = projectsMetadata.find(
        (projectMetadata) => projectMetadata.id === testProjectId,
      );
      expect(testProjectMetadataPossiblyUndefined).toBeDefined();
      const testProjectMetadata = testProjectMetadataPossiblyUndefined as ProjectMetadata;

      // `projectInterface`s should be just the `projectInterface`s from this pdpf
      const expectedTestProjectInterfacesOnePDPF = ['platform.placeholder', 'platform.notesOnly'];
      expect(testProjectMetadata.projectInterfaces.length).toEqual(
        expectedTestProjectInterfacesOnePDPF.length,
      );
      expectedTestProjectInterfacesOnePDPF.forEach((projectInterface) =>
        expect(testProjectMetadata.projectInterfaces).toContain(projectInterface),
      );

      // Each entry in pdpfInfo should have only the `projectInterface`s provided by this pdpf
      expect(testProjectMetadata.pdpFactoryInfo).toEqual({
        'test-1': { projectInterfaces: ['platform.placeholder', 'platform.notesOnly'] },
      });

      // Check project 2
      const test2ProjectMetadataPossiblyUndefined = projectsMetadata.find(
        (projectMetadata) => projectMetadata.id === test2ProjectId,
      );
      expect(test2ProjectMetadataPossiblyUndefined).toBeDefined();
      const test2ProjectMetadata = test2ProjectMetadataPossiblyUndefined as ProjectMetadata;

      // `projectInterface`s should be just the `projectInterface`s from this pdpf
      const expectedTest2ProjectInterfacesOnePDPF = [
        'platformScripture.USFM_Book',
        'platform.notesOnly',
      ];
      expect(test2ProjectMetadata.projectInterfaces.length).toEqual(
        expectedTest2ProjectInterfacesOnePDPF.length,
      );
      expectedTest2ProjectInterfacesOnePDPF.forEach((projectInterface) =>
        expect(test2ProjectMetadata.projectInterfaces).toContain(projectInterface),
      );

      // Each entry in pdpfInfo should have only the `projectInterface`s provided by this pdpf
      expect(test2ProjectMetadata.pdpFactoryInfo).toEqual({
        'test-1': {
          projectInterfaces: ['platformScripture.USFM_Book', 'platform.notesOnly'],
        },
      });
    });

    test('does not use regex for pdpFactoryId when transforming parameters', async () => {
      const projectsMetadata = await testingProjectLookupService.internalGetMetadata(
        testingProjectLookupService.transformGetMetadataForProjectParametersToFilter(
          undefined,
          undefined,
          'test-.',
        ),
      );

      expect(projectsMetadata.length).toBe(0);
    });

    test('only calls the specific pdpFactory when filtered by pdpFactoryId', async () => {
      const pdpfId = 'test-1';
      await testingProjectLookupService.internalGetMetadata(
        testingProjectLookupService.transformGetMetadataForProjectParametersToFilter(
          undefined,
          undefined,
          pdpfId,
        ),
      );

      expect(networkObjectService.get).toHaveBeenCalledTimes(1);
      expect(networkObjectService.get).toHaveBeenCalledWith(
        getPDPFactoryNetworkObjectNameFromId('test-1'),
      );
    });

    test('calls all but the specific pdpFactory when excluding one pdpFactoryId', async () => {
      const pdpfId = 'test-1';
      await testingProjectLookupService.internalGetMetadata({ excludePdpFactoryIds: pdpfId });

      expect(networkObjectService.get).toHaveBeenCalledTimes(Object.keys(testPDPFInfo).length - 2);
      expect(networkObjectService.get).not.toHaveBeenCalledWith(
        getPDPFactoryNetworkObjectNameFromId('test-1'),
      );
    });
  });

  describe('getMetadataForProject', () => {
    test('gets the matching project metadata when providing just projectId', async () => {
      const testProjectMetadata = await projectLookupService.getMetadataForProject(testProjectId);

      expect(testProjectMetadata.id).toBe(testProjectId);

      // `projectInterface`s should be a combination of all available `projectInterface`s
      expect(testProjectMetadata.projectInterfaces.length).toEqual(
        expectedTestProjectInterfaces.length,
      );
      expectedTestProjectInterfaces.forEach((projectInterface) =>
        expect(testProjectMetadata.projectInterfaces).toContain(projectInterface),
      );

      // Should be provided by the right number of pdpfs
      expect(Object.entries(testProjectMetadata.pdpFactoryInfo).length).toBe(5);
    });
  });
});

describe('filterProjectsMetadata', () => {
  const projectsMetadata: ProjectMetadata[] = [
    {
      id: 'asdf',
      projectInterfaces: ['helloWorld', 'platform.notesOnly'],
      pdpFactoryInfo: {
        test1: { projectInterfaces: ['platform.notesOnly'] },
        test4: { projectInterfaces: ['helloWorld'] },
      },
    },
    {
      id: 'asdfg',
      projectInterfaces: ['platformScripture.USFM_Book', 'platform.notesOnly'],
      pdpFactoryInfo: {
        test2: {
          projectInterfaces: ['platformScripture.USFM_Book', 'platform.notesOnly'],
        },
        test4: { projectInterfaces: ['platformScripture.USFM_Book'] },
      },
    },
    {
      id: 'asdfgh',
      projectInterfaces: ['platform.placeholder'],
      pdpFactoryInfo: { test3: { projectInterfaces: ['platform.placeholder'] } },
    },
  ];

  test('should return a shallow clone if there are no filters', () => {
    const options: ProjectMetadataFilterOptions = {};

    const filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata).not.toBe(projectsMetadata);
    expect(filteredMetadata).toEqual(projectsMetadata);
  });

  test('should remove ids matching excludeProjectIds', () => {
    // Single string

    let options: ProjectMetadataFilterOptions = {
      excludeProjectIds: 'asdf',
    };

    let filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(2);

    // Multiple strings

    options = {
      excludeProjectIds: ['asdf', 'asdfg'],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);

    // Still excludes even if includeProjectInterfaces includes

    options = {
      excludeProjectIds: ['asdf', 'asdfg'],
      includeProjectInterfaces: ['^platformScripture\\.USFM_Book$', '^platform\\.placeholder$'],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);
  });

  test('should include only ids matching includeProjectIds', () => {
    // Single string that exact matches one project

    let options: ProjectMetadataFilterOptions = {
      includeProjectIds: 'asdf',
    };

    let filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);

    // Multiple strings that match two project ids

    options = {
      includeProjectIds: ['asdf', 'asdfg'],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(2);

    // other filters work even if this includes

    options = {
      includeProjectIds: ['asdf', 'asdfg', 'asdfgh'],
      excludeProjectIds: 'asdfg',
      includeProjectInterfaces: ['^platformScripture\\.USFM_Book$', '^platform\\.placeholder$'],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);
  });

  test('should remove ids matching excludeProjectInterfaces', () => {
    // Single RegExp that exact matches one project

    let options: ProjectMetadataFilterOptions = {
      excludeProjectInterfaces: '^helloWorld$',
    };

    let filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(2);

    // Single RegExp that loosely matches all projects

    options = {
      excludeProjectInterfaces: 'o',
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(0);

    // Multiple OR'ed RegExps that match two project interfaces

    options = {
      excludeProjectInterfaces: ['^helloWorld$', '^platformScripture\\.USFM_Book$'],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);

    // Single AND'ed RegExp

    options = {
      excludeProjectInterfaces: [['platform.notesOnly']],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);

    // Multiple AND'ed RegExps

    options = {
      excludeProjectInterfaces: [['helloWorld', 'platform.notesOnly']],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(2);

    // Multiple OR'ed and AND'ed RegExps

    options = {
      excludeProjectInterfaces: [['helloWorld', 'platform.notesOnly'], 'platform.placeholder'],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);

    // Still excludes even if includeProjectInterfaces includes

    options = {
      excludeProjectInterfaces: 'USFM',
      includeProjectInterfaces: ['^platformScripture\\.USFM_Book$', '^platform\\.placeholder$'],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);
  });

  test('should include only ids matching includeProjectInterfaces', () => {
    // Single RegExp that exact matches one project

    let options: ProjectMetadataFilterOptions = {
      includeProjectInterfaces: '^helloWorld$',
    };

    let filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);

    // Single RegExp that loosely matches all projects

    options = {
      includeProjectInterfaces: 'o',
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata).toEqual(projectsMetadata);

    // Multiple RegExps that match two project interfaces

    options = {
      includeProjectInterfaces: ['^helloWorld$', '^platformScripture\\.USFM_Book$'],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(2);

    // Single AND'ed RegExp

    options = {
      includeProjectInterfaces: [['platform.notesOnly']],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(2);

    // Multiple AND'ed RegExps

    options = {
      includeProjectInterfaces: [['helloWorld', 'platform.notesOnly']],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);

    // Multiple OR'ed and AND'ed RegExps

    options = {
      includeProjectInterfaces: [['helloWorld', 'platform.notesOnly'], 'platform.placeholder'],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(2);

    // excludeProjectInterfaces excludes even if this includes

    options = {
      excludeProjectInterfaces: 'USFM',
      includeProjectInterfaces: ['^platformScripture\\.USFM_Book$', '^platform\\.placeholder$'],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);
  });

  test('should remove ids matching excludePdpFactoryIds', () => {
    // Single RegExp that exact matches one project

    let options: ProjectMetadataFilterOptions = {
      excludePdpFactoryIds: '.est1',
    };

    let filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(2);

    // Single RegExp that loosely matches all projects

    options = {
      excludePdpFactoryIds: 'test[34]',
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(0);

    // Multiple OR'ed RegExps that match two pdp factory ids

    options = {
      excludePdpFactoryIds: ['test1', '^test2$'],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);

    // Still excludes even if includePdpFactoryIds includes

    options = {
      excludePdpFactoryIds: ['test4'],
      includePdpFactoryIds: 'test',
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);
  });

  test('should include only ids matching includePdpFactoryIds', () => {
    // Single RegExp that exact matches one project

    let options: ProjectMetadataFilterOptions = {
      includePdpFactoryIds: 'test[^234]',
    };

    let filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);

    // Single RegExp that loosely matches all projects

    options = {
      includePdpFactoryIds: '\\d',
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata).toEqual(projectsMetadata);

    // Multiple RegExps that match two pdpf ids

    options = {
      includePdpFactoryIds: ['test1', '2$'],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(2);

    // excludePdpFactoryIds excludes even if this includes

    options = {
      excludePdpFactoryIds: 'test1',
      includePdpFactoryIds: ['test1', 'test2'],
    };

    filteredMetadata = projectLookupService.filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);
  });
});

describe('Merging metadata filters', () => {
  it('properly keeps the filter minimal', () => {
    let merged = projectLookupService.mergeMetadataFilters(undefined, undefined);
    expect(merged).toEqual({});
    merged = projectLookupService.mergeMetadataFilters({}, undefined);
    expect(merged).toEqual({});
    merged = projectLookupService.mergeMetadataFilters(undefined, {
      extraneousProperty: 'blah',
    } as ProjectMetadataFilterOptions);
    expect(merged).toEqual({});
  });

  it('properly merges simple string filters', () => {
    const merged = projectLookupService.mergeMetadataFilters(
      {
        excludePdpFactoryIds: 'blah0',
        excludeProjectIds: 'blah1',
        excludeProjectInterfaces: 'blah2',
        includePdpFactoryIds: 'blah3',
        includeProjectIds: 'blah4',
        includeProjectInterfaces: 'blah5',
      },
      {
        excludePdpFactoryIds: 'thing0',
        excludeProjectIds: 'thing1',
        excludeProjectInterfaces: 'thing2',
        includePdpFactoryIds: 'thing3',
        includeProjectIds: 'thing4',
        includeProjectInterfaces: 'thing5',
      },
    );
    expect(merged).toEqual({
      excludePdpFactoryIds: ['blah0', 'thing0'],
      excludeProjectIds: ['blah1', 'thing1'],
      excludeProjectInterfaces: ['blah2', 'thing2'],
      includePdpFactoryIds: ['blah3', 'thing3'],
      includeProjectIds: ['blah4', 'thing4'],
      includeProjectInterfaces: ['blah5', 'thing5'],
    });
  });

  it('properly merges complex filters', () => {
    const merged = projectLookupService.mergeMetadataFilters(
      {
        excludePdpFactoryIds: ['blah0', 'blah0.5'],
        excludeProjectIds: ['blah1'],
        excludeProjectInterfaces: ['blah2', ['blah2.5', 'blah2.6']],
        includePdpFactoryIds: 'blah3',
        includeProjectIds: ['blah4'],
        includeProjectInterfaces: ['blah5', ['blah5.5', 'blah5.6']],
      },
      {
        excludePdpFactoryIds: 'thing0',
        excludeProjectIds: ['thing1'],
        excludeProjectInterfaces: 'thing2',
        includePdpFactoryIds: ['thing3'],
        includeProjectIds: ['thing4', 'thing4.5'],
        includeProjectInterfaces: [['thing5.5', 'thing5.6', 'thing5.7'], 'thing5'],
      },
    );
    expect(merged).toEqual({
      excludePdpFactoryIds: ['blah0', 'blah0.5', 'thing0'],
      excludeProjectIds: ['blah1', 'thing1'],
      excludeProjectInterfaces: ['blah2', ['blah2.5', 'blah2.6'], 'thing2'],
      includePdpFactoryIds: ['blah3', 'thing3'],
      includeProjectIds: ['blah4', 'thing4', 'thing4.5'],
      includeProjectInterfaces: [
        'blah5',
        ['blah5.5', 'blah5.6'],
        ['thing5.5', 'thing5.6', 'thing5.7'],
        'thing5',
      ],
    });
  });

  it('properly merges filters with missing entries and de-dupes duplicates', () => {
    const merged = projectLookupService.mergeMetadataFilters(
      {
        excludePdpFactoryIds: ['blah0', 'blah0.5'],
        // excludeProjectIds
        excludeProjectInterfaces: [
          'blah2',
          'blah2',
          ['blah2.5', 'blah2.6'],
          ['blah2.5', 'blah2.6'],
        ],
        includePdpFactoryIds: 'blah3',
        // includeProjectIds
        includeProjectInterfaces: ['blah5'],
      },
      {
        // excludePdpFactoryIds
        excludeProjectIds: 'thing1',
        excludeProjectInterfaces: 'thing2',
        includePdpFactoryIds: 'blah3',
        includeProjectIds: ['thing4', 'thing4.5'],
        includeProjectInterfaces: [['thing5.5', 'thing5.6', 'thing5.7'], 'blah5', 'thing5'],
      },
    );
    expect(merged).toEqual({
      excludePdpFactoryIds: ['blah0', 'blah0.5'],
      // Wraps individual strings in an array, which is functionally equivalent
      excludeProjectIds: ['thing1'],
      // Does not properly look into arrays and deduplicate them at the moment. Would be nice to fix
      // sometime, but it's not a high priority as they are functionally equivalent and this is
      // probably rare
      excludeProjectInterfaces: ['blah2', ['blah2.5', 'blah2.6'], ['blah2.5', 'blah2.6'], 'thing2'],
      includePdpFactoryIds: ['blah3'],
      includeProjectIds: ['thing4', 'thing4.5'],
      includeProjectInterfaces: ['blah5', ['thing5.5', 'thing5.6', 'thing5.7'], 'thing5'],
    });
  });
});
