import papi, { ProjectDataProviderEngine } from '@papi/backend';
import { IProjectDataProviderEngine, DataProviderUpdateInstructions } from '@papi/core';
import type { ProjectDataTypes } from 'papi-shared-types';

class HelloWorldProjectDataProviderEngine
  extends ProjectDataProviderEngine<'helloWorld'>
  implements IProjectDataProviderEngine<'helloWorld'>
{
  private numbers: { [max: string]: number | undefined };
  private names: Set<string>;

  constructor(projectId: string, projectStorageInterpreterId: string) {
    super(projectId, projectStorageInterpreterId);

    this.numbers = {};
    this.names = new Set();
  }

  @papi.dataProviders.decorators.ignore
  async getAnyRandomNumber() {
    const keys = Object.keys(this.numbers);
    return keys[Math.random() * keys.length] ?? Math.random();
  }

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
