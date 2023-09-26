import {
  ProjectDataProviderEngineTypes,
  ProjectDataProviderEngineFactory,
} from '@shared/models/project-data-provider-engine.model';
import type { NotesOnlyProjectDataTypes } from 'papi-shared-types';
import {
  registerProjectDataProviderEngineFactory,
  getProjectDataProvider,
} from '@shared/services/project-data-provider.service';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import logger from '@shared/services/logger.service';

const notesOnlyPdpEngineFactory: ProjectDataProviderEngineFactory<'NotesOnly'> = {
  createProjectDataProviderEngine: (
    projectId: string,
    projectStorageInterpreterId: string,
  ): ProjectDataProviderEngineTypes['NotesOnly'] => {
    logger.debug(`Creating PDP Engine for ${projectId}, ${projectStorageInterpreterId}`);
    return {
      getExtensionData: async (): Promise<string> => {
        return 'extension data';
      },
      setExtensionData: async (): Promise<
        DataProviderUpdateInstructions<NotesOnlyProjectDataTypes>
      > => {
        return false;
      },
      getNotes: async (): Promise<string> => {
        return 'awesome notes';
      },
      setNotes: async (): Promise<DataProviderUpdateInstructions<NotesOnlyProjectDataTypes>> => {
        return false;
      },
    };
  },
};

export async function initialize(): Promise<void> {
  // If this service was disposable, we would keep track of the PDP Factory returned here
  await registerProjectDataProviderEngineFactory('NotesOnly', notesOnlyPdpEngineFactory);
}

export async function test() {
  const pdp = await getProjectDataProvider('FAKE', 'NotesOnly', 'WHATEVER');
  const pdpExtensionData = await pdp.getExtensionData({ extensionName: 'a', dataQualifier: 'b' });
  if (pdpExtensionData !== 'extension data') logger.error("Project Data Provider didn't work");
  else logger.info('Project Data Provider worked!');
}
