process.env['NODE_DEV'] = 'TEST';
import { Check, CheckCreatorFunction, CheckDetails, CheckRunResult, ScriptureRange } from 'platform-scripture';
import checkHostingService from './check-hosting.service';

jest.spyOn(checkHostingService, 'initialize').mockImplementation(async () => {});

function registerCheck(  checkDetails: CheckDetails,
  createCheck: CheckCreatorFunction,
) {
  //@ts-expect-error
  checkHostingService.registerCheck(checkDetails, createCheck);
}

const check1Details: CheckDetails = {
  checkName: 'testCheck1',
  checkDescription: 'test'
};

const check1: Check = {
  async initialize(projectId: string): Promise<string[]> {
    return [projectId];
  },
  async dispose(): Promise<boolean> { return true; },
  getCheckDetails() {
      return check1Details;
  },
  async getCheckResults(range: ScriptureRange): Promise<CheckRunResult[]> {
    if (range) return [];
    else return [];
  }
};

async function createCheck1() {
  return check1;
}

describe('test scenario', () => {
  it('should do something', async () => {
    registerCheck(check1Details, createCheck1);
  });
});
