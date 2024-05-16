import {
  IProjectDataProviderEngine,
  IProjectDataProviderEngineFactory,
  ProjectMetadata,
} from '@papi/core';
import { newGuid } from 'platform-bible-utils';
import HelloWorldProjectDataProviderEngine, {
  HelloWorldProjectData,
} from './hello-world-project-data-provider-engine.model';
import { ELIGIBLE_NEW_NAMES } from '../util';

export type AllHelloWorldProjectData = { [projectId: string]: HelloWorldProjectData | undefined };

function createEmptyHelloWorldProjectData(projectName: string): HelloWorldProjectData {
  return {
    names: new Set(),
    numbers: {},
    settings: {},
    extensionData: {},
    projectName,
  };
}

class HelloWorldProjectDataProviderEngineFactory
  implements IProjectDataProviderEngineFactory<'helloWorld'>
{
  /** Do not use directly as it may not have a value. Use `getAllProjectData` */
  private allProjectDataCached: AllHelloWorldProjectData | undefined;
  private saveAllProjectData: () => Promise<void>;

  constructor(
    private readRawDataForAllProjects: () => Promise<string>,
    writeRawDataForAllProjects: (data: string) => Promise<void>,
  ) {
    this.saveAllProjectData = async () => {
      const allProjectData = await this.getAllProjectData();

      // Serialize by making the 'names' Set into an array
      const allProjectDataRaw = JSON.stringify(allProjectData, (key, value) =>
        key === 'names' ? [...value] : value,
      );

      return writeRawDataForAllProjects(allProjectDataRaw);
    };
  }

  async getAllProjectData(): Promise<AllHelloWorldProjectData> {
    if (this.allProjectDataCached) return this.allProjectDataCached;

    // We don't have the data, so we need to go get it
    const allProjectDataRaw = await this.readRawDataForAllProjects();

    // Deserialize by putting the 'names' array back into a Set
    const allProjectData: AllHelloWorldProjectData = JSON.parse(allProjectDataRaw, (key, value) =>
      key === 'names' ? new Set(value) : value,
    );

    this.allProjectDataCached = allProjectData;
    return allProjectData;
  }

  async setAndSaveProjectData(projectId: string, projectData: HelloWorldProjectData) {
    const allProjectData = await this.getAllProjectData();
    allProjectData[projectId] = projectData;
    this.allProjectDataCached = allProjectData;
    await this.saveAllProjectData();
  }

  /**
   * Returns a list of metadata objects for all projects that can be the targets of PDPs created by
   * this factory
   */
  async getAvailableProjects(): Promise<ProjectMetadata[]> {
    const allAvailableProjects = Object.entries(await this.getAllProjectData());
    return allAvailableProjects.map(([projectId, projectData]) => ({
      projectType: 'helloWorld',
      id: projectId,
      name: projectData?.projectName ?? projectId,
    }));
  }

  async createProjectDataProviderEngine(
    projectId: string,
  ): Promise<IProjectDataProviderEngine<'helloWorld'>> {
    const allProjectData = await this.getAllProjectData();
    const projectData: HelloWorldProjectData =
      allProjectData[projectId] ?? createEmptyHelloWorldProjectData(projectId);
    return new HelloWorldProjectDataProviderEngine(projectData, (data) => {
      return this.setAndSaveProjectData(projectId, data);
    });
  }

  /**
   * Creates a new project with a random name
   *
   * @returns Project id of the new hello world project
   */
  async createNewProject(): Promise<string> {
    const allProjectData = await this.getAllProjectData();

    let newProjectId = newGuid();
    // In production code, please ensure uniqueness better than this
    while (allProjectData[newProjectId]) {
      newProjectId = newGuid();
    }
    const newProjectData = createEmptyHelloWorldProjectData(await this.#getUniqueProjectName());

    await this.setAndSaveProjectData(newProjectId, newProjectData);

    return newProjectId;
  }

  async #getUniqueProjectName(): Promise<string> {
    const projectName = ELIGIBLE_NEW_NAMES[Math.floor(ELIGIBLE_NEW_NAMES.length * Math.random())];
    let projectNameCount = 0;

    const allProjectData = await this.getAllProjectData();

    while (
      Object.entries(allProjectData).some(
        // I don't think there is another way to increment projectNameCount indefinitely and to
        // check for uniqueness. Not really sure why this rule is flagging this
        // eslint-disable-next-line no-loop-func
        ([, projectData]) =>
          projectData?.projectName ===
          `${projectName}${projectNameCount !== 0 ? ` ${projectNameCount}` : ''}`,
      )
    ) {
      projectNameCount += 1;
    }

    return `${projectName}${projectNameCount !== 0 ? ` ${projectNameCount}` : ''}`;
  }
}

export default HelloWorldProjectDataProviderEngineFactory;
