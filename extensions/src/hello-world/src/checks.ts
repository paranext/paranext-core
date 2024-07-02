import { projectDataProviders } from '@papi/backend';
import {
  Check,
  CheckCreatorFunction,
  CheckDetails,
  CheckRunResult,
  IUSJBookProjectDataProvider,
  ScriptureRange,
} from 'platform-scripture';

export const checkDetails: CheckDetails = Object.freeze({
  checkName: 'helloWordSimpleCheck',
  checkDescription: 'find the word "hello"',
});

class HelloCheck implements Check {
  targetProjectId: string | undefined;
  pdp: IUSJBookProjectDataProvider | undefined;

  async initialize(projectId: string): Promise<string[]> {
    try {
      this.targetProjectId = projectId;
      this.pdp = await projectDataProviders.get('platformScripture.USJ_Book', projectId);
      this.pdp.onDidDispose(this.dispose);
    } catch (error) {
      return [JSON.stringify(error)];
    }
    return [];
  }

  async dispose(): Promise<boolean> {
    this.targetProjectId = undefined;
    this.pdp = undefined;
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  getCheckDetails(): CheckDetails {
    return checkDetails;
  }

  async getCheckResults(range: ScriptureRange): Promise<CheckRunResult[]> {
    if (range.end && range.end.bookNum !== range.start.bookNum)
      throw new Error('This only supports checks within a single book right now');

    const usj = await this.pdp?.getBookUSJ(range.start);
    if (!usj)
      throw new Error(`Could not load ${range.start.toString()} from ${this.targetProjectId}`);

    return [];
  }
}

export const createHelloCheck: CheckCreatorFunction = async () => {
  return new HelloCheck();
};
