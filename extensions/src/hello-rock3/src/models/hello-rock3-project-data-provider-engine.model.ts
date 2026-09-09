import papi, { BaseProjectDataProviderEngine } from '@papi/backend';
import {
  DataProviderUpdateInstructions,
  ExtensionDataListScope,
  ExtensionDataScope,
  IBaseProjectDataProviderEngine,
} from '@papi/core';
import type {
  ProjectInterfaceDataTypes,
  ProjectSettingNames,
  ProjectSettingTypes,
} from 'papi-shared-types';

/** The `projectInterface`s the hello rock3 pdpf serves */
// TypeScript is upset without `satisfies` here because `as const` makes the array readonly but it
// needs to be used in ProjectMetadata as not readonly :p
export const HELLO_ROCK3_PROJECT_INTERFACES = ['platform.base', 'helloRock3'] as const satisfies [
  'platform.base',
  'helloRock3',
];

export type HelloRock3ProjectData = {
  projectName: string;
  numbers: { [max: string]: number | undefined };
  names: Set<string>;
  settings: {
    [ProjectSettingName in ProjectSettingNames]?: ProjectSettingTypes[ProjectSettingName];
  };
  extensionData: { [key: string]: string | undefined };
};

/** What every one of an extension's extension-data keys starts with */
function getExtensionKeyPrefix(extensionName: string): string {
  return `${extensionName}/`;
}

function getExtensionDataKey(scope: ExtensionDataScope): string {
  return `${getExtensionKeyPrefix(scope.extensionName)}${scope.dataQualifier}`;
}

export class HelloRock3ProjectDataProviderEngine
  extends BaseProjectDataProviderEngine<typeof HELLO_ROCK3_PROJECT_INTERFACES>
  implements IBaseProjectDataProviderEngine<typeof HELLO_ROCK3_PROJECT_INTERFACES>
{
  private saveProjectData: () => Promise<void>;

  constructor(
    private projectData: HelloRock3ProjectData,
    saveProjectDataWithData: (data: HelloRock3ProjectData) => Promise<void>,
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
  ): Promise<DataProviderUpdateInstructions<ProjectInterfaceDataTypes['helloRock3']>> {
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
  ): Promise<DataProviderUpdateInstructions<ProjectInterfaceDataTypes['helloRock3']>> {
    this.projectData.extensionData[getExtensionDataKey(scope)] = data;
    await this.saveProjectData();
    return true;
  }

  async listExtensionDataQualifiers(scope: ExtensionDataListScope): Promise<string[]> {
    // Native `String` methods, not the grapheme-aware ones from `platform-bible-utils`, and the
    // whole expression stays native so the prefix length and the slice index share an index space.
    // Extension names are author-chosen and need not be ASCII, but nothing here is a search through
    // text: `getExtensionDataKey` composes these keys with a native template literal and
    // `getExtensionData` looks one up by exact string equality, so the listing has to split them on
    // exactly the same terms. Grapheme-aware matching does not agree with exact-string storage: a
    // `dataQualifier` beginning with a combining mark fuses it onto the `/` into one cluster, so a
    // grapheme `startsWith` rejects a key `getExtensionData` reads back fine, and the qualifier
    // vanishes from the listing. The repo's string rule records this carve-out and names this
    // method as its example: .claude/rules/code-quality/native-string-vs-grapheme-helpers.md
    const keyPrefix = getExtensionKeyPrefix(scope.extensionName);
    return Object.keys(this.projectData.extensionData)
      .filter((key) => key.startsWith(keyPrefix))
      .map((key) => key.slice(keyPrefix.length))
      .sort();
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

  // setNames doesn't use instance state but cannot be static because it implements the
  // IBaseProjectDataProviderEngine<typeof HELLO_ROCK3_PROJECT_INTERFACES> interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setNames(): Promise<
    DataProviderUpdateInstructions<ProjectInterfaceDataTypes['helloRock3']>
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

export default HelloRock3ProjectDataProviderEngine;
