import {
  NETWORK_OBJECT_NAME_PROJECT_LOOKUP_SERVICE,
  ProjectLookupServiceType,
  projectLookupServiceBase,
} from '@shared/models/project-lookup.service-model';
import networkObjectService from '@shared/services/network-object.service';

const projectLookupService = projectLookupServiceBase;

/**
 * Register the network object that mirrors the locally-run project lookup service exposed on the
 * PAPI websocket.
 *
 * This service runs fully locally from `project-lookup.service.ts`. This is here to provide
 * lookup-related services to other processes on the PAPI websocket
 */
// To use this service, you should use `project-lookup.service.ts`.
// This is not representative of this file. Maybe there will be a default export later that is more
// representative of the file
// eslint-disable-next-line import/prefer-default-export
export async function startProjectLookupService(): Promise<void> {
  await networkObjectService.set<ProjectLookupServiceType>(
    NETWORK_OBJECT_NAME_PROJECT_LOOKUP_SERVICE,
    projectLookupService,
    undefined,
    undefined,
    {
      summary: 'Provides metadata for projects known by the platform',
      methods: [
        {
          name: 'getMetadataForAllProjects',
          summary: 'Provide metadata for all projects that have PDP factories',
          description:
            'Note: If there are multiple PDPs available whose metadata matches the conditions provided by the parameters, their project metadata will all be combined, so all available `projectInterface`s provided by the PDP Factory with the matching ID (or all PDP Factories if no ID is specified) for the project will be returned.',
          params: [
            {
              name: 'options',
              required: false,
              summary:
                'Options for specifying filters for the project metadata retrieved. If a PDP Factory ID does not match the filter, it will not be contacted at all for this function call. As a result, a PDP factory that intends to layer over other PDP factories **must** specify its ID in `options.excludePdpFactoryIds` to avoid an infinite loop of calling this function.',
              schema: {
                $ref: '#/components/schemas/ProjectMetadataFilterOptions',
              },
            },
          ],
          result: {
            name: 'return value',
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ProjectMetadata',
              },
            },
          },
        },
      ],
      components: {
        schemas: {
          ProjectMetadata: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'ID of the project (must be unique and case insensitive)',
              },
              projectInterfaces: {
                type: 'array',
                description:
                  'All `projectInterface`s (aka standardized sets of methods on a PDP) that Project Data Providers for this project support. Indicates what sort of project data should be available on this project.',
                items: { type: 'string' },
              },
              pdpFactoryInfo: {
                type: 'object',
                description: 'Information about the PDP Factories associated with the project.',
              },
            },
          },
          ProjectMetadataFilterOptions: {
            type: 'object',
            properties: {
              includePdpFactoryIds: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'List of PDP Factory Ids to include in the metadata retrieval.',
              },
              excludePdpFactoryIds: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'List of PDP Factory Ids to exclude from the metadata retrieval.',
              },
              projectIds: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'List of project Ids to filter the metadata retrieval.',
              },
            },
            additionalProperties: false,
            description: 'Options for specifying filters for the project metadata retrieved.',
          },
        },
      },
    },
  );
}
