import { describe, expect, it, vi } from 'vitest';
import type { Check, CheckDetails, CheckCreatorFunction, ICheckRunner } from 'platform-scripture';
import { checkHostingService } from './extension-host-check-runner.service';

type RegisterCheckHandler = (
  details: CheckDetails,
  create: CheckCreatorFunction,
) => Promise<unknown>;

// The runner registers itself and its registerCheck command through PAPI; capture both so the test
// can drive the engine directly.
const registered: { engine?: ICheckRunner; registerCheck?: RegisterCheckHandler } = {};

vi.mock('@papi/backend', () => {
  class DataProviderEngine {
    notifyUpdate = vi.fn();
  }
  return {
    default: {
      commands: {
        registerCommand: vi.fn(async (_name: string, handler: RegisterCheckHandler) => {
          registered.registerCheck = handler;
          return async () => true;
        }),
      },
      projectDataProviders: {
        get: vi.fn(async () => ({
          getExtensionData: vi.fn(async () => undefined),
          setExtensionData: vi.fn(async () => true),
        })),
      },
    },
    DataProviderEngine,
    dataProviders: {
      registerEngine: vi.fn(async (_name: string, engine: ICheckRunner) => {
        registered.engine = engine;
        return Object.assign(engine, { dispose: async () => true });
      }),
    },
    logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  };
});

const RANGE = {
  projectId: 'P1',
  start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
};

function makeCheck(name: string, getCheckResults: Check['getCheckResults']): CheckCreatorFunction {
  return async () => ({
    initialize: async () => [],
    dispose: async () => true,
    getCheckDetails: () => ({ checkName: name, checkDescription: name }),
    getCheckResults,
  });
}

async function register(name: string, create: CheckCreatorFunction): Promise<string> {
  const details: CheckDetails = { checkName: name, checkDescription: name };
  await registered.registerCheck?.(details, create);
  return `registered-${name}-${name}`;
}

async function runToEnd(runner: ICheckRunner, checkIds: string[]) {
  const jobId = await runner.beginCheckJob({ checkIds, inputRanges: [RANGE] });
  for (let attempt = 0; attempt < 200; attempt += 1) {
    // Each poll depends on the previous one not being finished yet
    // eslint-disable-next-line no-await-in-loop
    const report = await runner.retrieveCheckJobUpdate(jobId, 1000);
    if (report.status !== 'queued' && report.status !== 'running') return report;
    // Wait between polls
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => {
      setTimeout(resolve, 5);
    });
  }
  throw new Error('job did not finish');
}

describe('extension-host check runner', () => {
  it('keeps the other checks’ results when one check throws', async () => {
    const runner = await checkHostingService.getCheckRunner();
    const failing = await register(
      'fails',
      makeCheck('fails', async () => {
        throw new Error('boom');
      }),
    );
    const healthy = await register(
      'works',
      makeCheck('works', async () => [
        {
          projectId: 'P1',
          checkResultType: 't',
          verseText: '',
          itemText: 'x',
          messageFormatString: 'found',
          isDenied: false,
          verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
          start: { book: 'GEN', chapterNum: 1, verseNum: 1, offset: 0 },
          end: { book: 'GEN', chapterNum: 1, verseNum: 1, offset: 1 },
        },
      ]),
    );

    const report = await runToEnd(runner, [failing, healthy]);

    expect(report.status).toBe('completed');
    expect(report.totalResultsCount).toBe(1);
    expect(report.checkErrors).toEqual([{ checkId: failing, message: 'boom' }]);
  });

  it('reports every check as ready because extension-hosted checks have no setup', async () => {
    const runner = await checkHostingService.getCheckRunner();

    await expect(runner.lookupCheckSetupStatus('registered-any-any', 'P1')).resolves.toEqual({
      status: 'ready',
    });
  });

  it('records an unregistered check as a check error and completes', async () => {
    const runner = await checkHostingService.getCheckRunner();
    const report = await runToEnd(runner, ['registered-gone-gone']);

    expect(report.status).toBe('completed');
    expect(report.checkErrors?.[0].checkId).toBe('registered-gone-gone');
  });
});
