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

  /**
   * Deletes a Hello World project
   *
   * @param projectId Optional project ID of the project to delete. Prompts the user to select a
   *   project if not provided
   * @returns `true` if successfully deleted
   */
  async deleteProject(projectId: string): Promise<boolean> {
    const allProjectData = await this.getAllProjectData();

    if (!allProjectData[projectId]) return false;

    delete allProjectData[projectId];
    this.allProjectDataCached = allProjectData;
    await this.saveAllProjectData();
    return true;
  }

  async #getUniqueProjectName(): Promise<string> {
    const projectName = ELIGIBLE_NEW_NAMES[Math.floor(ELIGIBLE_NEW_NAMES.length * Math.random())];

    const allProjectData = await this.getAllProjectData();

    // Look for all projects with the same name and a number after their name, and find the first number missing
    const projectNameRegex = new RegExp(`${projectName} ?(?<number>\\d*)`);

    const nameNumbers = new Set<number>();
    Object.entries(allProjectData).forEach(([, projectData]) => {
      if (!projectData?.projectName) return;
      const matches = projectNameRegex.exec(projectData.projectName);
      if (!matches) return;

      if (matches.groups?.number) {
        const nameNumber = parseInt(matches.groups.number, 10);
        if (typeof nameNumber === 'number') nameNumbers.add(nameNumber);
      }
      // There was no number, so consider that to be 0
      else nameNumbers.add(0);
    });

    let projectNameCount = 0;

    if (nameNumbers.size > 0) {
      const nameNumbersArray = [...nameNumbers];
      nameNumbersArray.sort((a, b) => (a > b ? 1 : -1));
      const nameNumberMissingIndex = nameNumbersArray.findIndex(
        (nameNumber, i) => nameNumber !== i,
      );
      projectNameCount =
        nameNumberMissingIndex === -1 ? nameNumbersArray.length : nameNumberMissingIndex;
    }

    return `${projectName}${projectNameCount !== 0 ? ` ${projectNameCount}` : ''}`;
  }
}

export default HelloWorldProjectDataProviderEngineFactory;
