import papi, { BaseProjectDataProviderEngine } from '@papi/backend';
import {
  DataProviderUpdateInstructions,
  ExtensionDataScope,
  IBaseProjectDataProviderEngine,
} from '@papi/core';
import type {
  ProjectInterfaceDataTypes,
  ProjectSettingNames,
  ProjectSettingTypes,
} from 'papi-shared-types';

/** The `projectInterface`s the hello world pdpf serves */
// TypeScript is upset without `satisfies` here because `as const` makes the array readonly but it
// needs to be used in ProjectMetadata as not readonly :p
export const HELLO_WORLD_PROJECT_INTERFACES = ['platform.base', 'helloWorld'] as const satisfies [
  'platform.base',
  'helloWorld',
];

export type HelloWorldProjectData = {
  projectName: string;
  numbers: { [max: string]: number | undefined };
  names: Set<string>;
  settings: {
    [ProjectSettingName in ProjectSettingNames]?: ProjectSettingTypes[ProjectSettingName];
  };
  extensionData: { [key: string]: string | undefined };
};

function getExtensionDataKey(scope: ExtensionDataScope): string {
  return `${scope.extensionName}/${scope.dataQualifier}`;
}

class HelloWorldProjectDataProviderEngine
  extends BaseProjectDataProviderEngine<typeof HELLO_WORLD_PROJECT_INTERFACES>
  implements IBaseProjectDataProviderEngine<typeof HELLO_WORLD_PROJECT_INTERFACES>
{
  private saveProjectData: () => Promise<void>;

  constructor(
    private projectData: HelloWorldProjectData,
    saveProjectDataWithData: (data: HelloWorldProjectData) => Promise<void>,
  ) {
    super();

    this.saveProjectData = () => saveProjectDataWithData(this.projectData);
  }

  @papi.dataProviders.decorators.ignore
  async getAnyRandomNumber() {
    const keys = Object.keys(this.projectData.numbers);
    return keys[Math.random() * keys.length] ?? Math.random();
  }

  async getSetting<ProjectSettingName extends keyof ProjectSettingTypes>(
    key: ProjectSettingName,
  ): Promise<ProjectSettingTypes[ProjectSettingName]> {
    if (key === 'platform.name')
      // TypeScript doesn't realize ProjectSettingName is 'platform.name' in this case for some reason
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return this.projectData.projectName as ProjectSettingTypes[ProjectSettingName];
    // We are checking in this same line that it is there. TypeScript :/
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    if (key in this.projectData.settings) return this.projectData.settings[key]!;

    return papi.projectSettings.getDefault(key);
  }

  async setSetting<ProjectSettingName extends keyof ProjectSettingTypes>(
    key: ProjectSettingName,
    newSetting: ProjectSettingTypes[ProjectSettingName],
  ): Promise<DataProviderUpdateInstructions<ProjectInterfaceDataTypes['helloWorld']>> {
    if (!(await papi.projectSettings.isValid(key, newSetting, await this.getSetting(key))))
      return false;

    if (key === 'platform.name')
      // TypeScript doesn't realize ProjectSettingName is 'platform.name' in this case for some reason
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      this.projectData.projectName = newSetting as ProjectSettingTypes['platform.name'];

    this.projectData.settings[key] = newSetting;
    await this.saveProjectData();
    return true;
  }

  async resetSetting<ProjectSettingName extends keyof ProjectSettingTypes>(
    key: ProjectSettingName,
  ): Promise<boolean> {
    if (!(key in this.projectData.settings)) return false;

    delete this.projectData.settings[key];
    await this.saveProjectData();
    this.notifyUpdate('Setting');
    return true;
  }

  async getExtensionData(scope: ExtensionDataScope): Promise<string | undefined> {
    return this.projectData.extensionData[getExtensionDataKey(scope)];
  }

  async setExtensionData(
    scope: ExtensionDataScope,
    data: string,
  ): Promise<DataProviderUpdateInstructions<ProjectInterfaceDataTypes['helloWorld']>> {
    this.projectData.extensionData[getExtensionDataKey(scope)] = data;
    await this.saveProjectData();
    return true;
  }

  async setRandomNumber(max: number, newNum: number) {
    if (newNum === this.projectData.numbers[max] || newNum > max) return false;

    this.projectData.numbers[max] = newNum;
    await this.saveProjectData();
    return true;
  }

  async getRandomNumber(max: number) {
    const currentNumber = this.projectData.numbers[max];
    if (currentNumber !== undefined) return currentNumber;

    const newNumber = Math.random() * max;
    // We want to send an update because, even though no one has gotten this max before, some may
    // be subscribed to updates on this max without having gotten it
    await this.setRandomNumber(max, newNumber);

    return newNumber;
  }

  // Required method since this is a data provider engine
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setNames(): Promise<
    DataProviderUpdateInstructions<ProjectInterfaceDataTypes['helloWorld']>
  > {
    throw new Error(`Cannot use setNames! Use addName and removeName`);
  }

  async getNames() {
    return Array.from(this.projectData.names);
  }

  async addName(name: string) {
    if (!this.projectData.names.has(name)) {
      this.projectData.names.add(name);
      await this.saveProjectData();
      this.notifyUpdate('Names');
      return true;
    }
    return false;
  }

  async removeName(name: string) {
    if (this.projectData.names.has(name)) {
      this.projectData.names.delete(name);
      await this.saveProjectData();
      this.notifyUpdate('Names');
      return true;
    }
    return false;
  }
}

export default HelloWorldProjectDataProviderEngine;
