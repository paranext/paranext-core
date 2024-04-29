import papi, { DataProviderEngine } from '@papi/backend';
import {
  IProjectDataProviderEngine,
  DataProviderUpdateInstructions,
  ExtensionDataScope,
} from '@papi/core';
import type { ProjectDataTypes, ProjectSettingTypes } from 'papi-shared-types';

class HelloWorldProjectDataProviderEngine
  extends DataProviderEngine<ProjectDataTypes['helloWorld']>
  implements IProjectDataProviderEngine<'helloWorld'>
{
  private numbers: { [max: string]: number | undefined };
  private names: Set<string>;

  constructor() {
    super();

    this.numbers = {};
    this.names = new Set();
  }

  @papi.dataProviders.decorators.ignore
  async getAnyRandomNumber() {
    const keys = Object.keys(this.numbers);
    return keys[Math.random() * keys.length] ?? Math.random();
  }

  /* eslint-disable class-methods-use-this */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async getSetting<ProjectSettingName extends keyof ProjectSettingTypes>(
    _key: ProjectSettingName,
  ): Promise<ProjectSettingTypes[ProjectSettingName]> {
    throw new Error('No settings available');
  }

  async setSetting<ProjectSettingName extends keyof ProjectSettingTypes>(
    _key: ProjectSettingName,
    _newSetting: ProjectSettingTypes[ProjectSettingName],
  ): Promise<DataProviderUpdateInstructions<ProjectDataTypes['helloWorld']>> {
    throw new Error('No settings available');
  }

  async resetSetting<ProjectSettingName extends keyof ProjectSettingTypes>(
    _key: ProjectSettingName,
  ): Promise<boolean> {
    throw new Error('No settings available');
  }

  async getExtensionData(_scope: ExtensionDataScope): Promise<string | undefined> {
    throw new Error('No extension data available');
  }

  async setExtensionData(
    _scope: ExtensionDataScope,
    _data: string,
  ): Promise<DataProviderUpdateInstructions<ProjectDataTypes['helloWorld']>> {
    throw new Error('No extension data available');
  }
  /* eslint-enable class-methods-use-this */
  /* eslint-enable @typescript-eslint/no-unused-vars */

  async setRandomNumber(max: number, newNum: number) {
    if (newNum === this.numbers[max] || newNum > max) return false;

    this.numbers[max] = newNum;
    return true;
  }

  async getRandomNumber(max: number) {
    const currentNumber = this.numbers[max];
    if (currentNumber !== undefined) return currentNumber;

    const newNumber = Math.random() * max;
    // We want to send an update because, even though no one has gotten this max before, some may
    // be subscribed to updates on this max without having gotten it
    await this.setRandomNumber(max, newNumber);

    return newNumber;
  }

  // eslint-disable-next-line class-methods-use-this
  async setNames(): Promise<DataProviderUpdateInstructions<ProjectDataTypes['helloWorld']>> {
    throw new Error(`Cannot use setNames! Use addName and removeName`);
  }

  async getNames() {
    return Array.from(this.names);
  }

  async addName(name: string) {
    if (!this.names.has(name)) {
      this.names.add(name);
      this.notifyUpdate('Names');
      return true;
    }
    return false;
  }

  async removeName(name: string) {
    if (this.names.has(name)) {
      this.names.delete(name);
      this.notifyUpdate('Names');
      return true;
    }
    return false;
  }
}

export default HelloWorldProjectDataProviderEngine;
