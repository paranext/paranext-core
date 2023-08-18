import { ProjectDataProviderEngineFactory } from '@shared/models/project-data-provider.model';
import {
  NotesOnlyProjectDataTypes,
  ProjectDataProviderEngineTypes,
} from 'declarations/project-data-types';
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
  await registerProjectDataProviderEngineFactory('NotesOnly', notesOnlyPdpEngineFactory);
}

export async function test() {
  const pdp = await getProjectDataProvider('FAKE', 'NotesOnly', 'WHATEVER');
  const pdpExtensionData = await pdp.getExtensionData('');
  if (pdpExtensionData !== 'extension data') logger.error("Project Data Provider didn't work");
  else logger.info('Project Data Provider worked!');
}
