import './TestButtonsPanel.css';
import { useCallback, useState } from 'react';
import usePromise from '@renderer/hooks/usePromise';
import papi from '@shared/services/papi';
import * as NetworkService from '@shared/services/NetworkService';
import { getErrorMessage } from '@shared/util/Util';
import logger from '@shared/util/logger';
import { TabInfo } from '@shared/data/WebviewTypes';

const getVar: (envVar: string) => Promise<string> =
  NetworkService.createRequestFunction('electronAPI.env.getVar');

const testBase: () => Promise<string> = NetworkService.createRequestFunction(
  'electronAPI.env.test',
);

const test = async () => {
  /* const start = performance.now(); */
  const result = await testBase();
  /* logger.log(`Test took ${performance.now() - start} ms`); */
  return result;
};

const addOne = async (message: number) =>
  papi.commands.sendCommand<[number], number>('addOne', message);

const echo = async (message: string) =>
  papi.commands.sendCommand<[string], string>('echo', message);

const throwError = async (message: string) =>
  papi.commands.sendCommand<[string], string>('throwError', message);

const executeMany = async <T,>(fn: () => Promise<T>) => {
  const numRequests = 10000;
  const requests = new Array<Promise<T | void>>(numRequests);
  const requestTime = new Array<number>(numRequests);
  const start = performance.now();
  for (let i = 0; i < numRequests; i++) {
    requestTime[i] = performance.now();
    requests[i] = fn()
      .then((response) => {
        requestTime[i] = performance.now() - requestTime[i];
        return response;
      })
      .catch((err) => logger.error(err));
  }

  try {
    const responses = await Promise.all(requests);
    const finish = performance.now();

    const avgResponseTime =
      requestTime.reduce((sum, time) => sum + time, 0) / numRequests;
    const maxTime = requestTime.reduce((max, time) => Math.max(max, time), 0);
    const minTime = requestTime.reduce(
      (min, time) => Math.min(min, time),
      Number.MAX_VALUE,
    );
    logger.log(
      `Of ${numRequests} requests:\n\tAvg response time: ${avgResponseTime} ms\n\tMax response time: ${maxTime} ms\n\tMin response time: ${minTime}\n\tTotal time: ${
        finish - start
      }\n\tResponse times:`,
      requestTime,
    );
    logger.log(responses[responses.length - 1]);
  } catch (e) {
    logger.error(e);
  }
};

const TestButtonsPanel = () => {
  const [promiseReturn, setPromiseReturn] = useState('');

  const [NODE_ENV] = usePromise(
    useCallback(() => getVar('NODE_ENV'), []),
    'retrieving',
  );

  const runPromise = useCallback(
    async (asyncFn: () => Promise<unknown>) => {
      try {
        const result = await asyncFn();
        logger.log(result);
        setPromiseReturn(JSON.stringify(result));
        return result;
      } catch (e) {
        logger.error(e);
        setPromiseReturn(`Error: ${getErrorMessage(e)}`);
        return undefined;
      }
    },
    [setPromiseReturn],
  );

  return (
    <>
      <div className="Hello">
        <button
          className="testButton"
          type="button"
          onClick={async () => {
            const start = performance.now();
            const result = await runPromise(() => echo('Stuff'));
            logger.log(
              `command:echo '${result}' took ${performance.now() - start} ms`,
            );
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            executeMany(() => echo('Stuff'));
          }}
        >
          Echo
        </button>
        <button
          className="testButton"
          type="button"
          onClick={() => runPromise(() => throwError('Test error'))}
        >
          Test Exception
        </button>
        <button
          className="testButton"
          type="button"
          onClick={() => runPromise(() => test())}
          onContextMenu={(e) => {
            e.preventDefault();
            executeMany(test);
          }}
        >
          Test
        </button>
        <button
          className="testButton"
          type="button"
          onClick={async () => {
            const result = await runPromise(() => addOne(78));
            logger.log(`added: '${result}'`);
          }}
        >
          Test C#
        </button>
      </div>
      <div className="Hello">
        <div>NODE_ENV: {NODE_ENV}</div>
        <div>{promiseReturn}</div>
      </div>
    </>
  );
};

const createButtonsPanel = (): TabInfo => {
  return {
    type: 'buttons',
    title: 'Test Buttons',
    content: <TestButtonsPanel />,
  };
};

export default createButtonsPanel;
