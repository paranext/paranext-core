import './TestButtonsPanel.css';
import { useCallback, useEffect, useState } from 'react';
import usePromise from '@renderer/hooks/papi-hooks/usePromise';
import papi from '@shared/services/papi';
import * as NetworkService from '@shared/services/NetworkService';
import { getErrorMessage, isString } from '@shared/util/Util';
import logger from '@shared/util/logger';
import { TabInfo } from '@shared/data/WebviewTypes';
import { WebView, WebViewProps } from '@renderer/components/WebView';

const testBase: (message: string) => Promise<string> =
  NetworkService.createRequestFunction('electronAPI.env.test');

const test = async () => {
  /* const start = performance.now(); */
  const result = await testBase('stuff');
  /* logger.log(`Test took ${performance.now() - start} ms`); */
  return result;
};

const addOne = async (num: number) =>
  papi.commands.sendCommand<[number], number>('addOne', num);

const echo: (message: string) => Promise<string> =
  papi.commands.createSendCommandFunction<[string], string>('echo');

const echoRenderer = papi.commands.createSendCommandFunction<[string], string>(
  'echoRenderer',
);

const echoExtensionHost = papi.commands.createSendCommandFunction<
  [string],
  string
>('echoExtensionHost');

const echoSomeoneRenderer = papi.commands.createSendCommandFunction<
  [string],
  string
>('hello-someone.echo-someone-renderer');

const addThree = papi.commands.createSendCommandFunction<
  [number, number, number],
  number
>('addThree');

const addMany = papi.commands.createSendCommandFunction<number[], number>(
  'addMany',
);

const getResourcesPath = papi.commands.createSendCommandFunction<[], string>(
  'getResourcesPath',
);

const helloWorld = papi.commands.createSendCommandFunction<[], string>(
  'hello-world.hello-world',
);

const throwErrorHelloWorld = papi.commands.createSendCommandFunction<
  [string],
  string
>('hello-world.hello-exception');

const helloSomeone = papi.commands.createSendCommandFunction<[string], string>(
  'hello-someone.hello-someone',
);

const throwError = papi.commands.createSendCommandFunction<[string], string>(
  'throwError',
);

const throwErrorExtensionHost = papi.commands.createSendCommandFunction<
  [string],
  string
>('throwErrorExtensionHost');

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
      .catch(logger.error);
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
      }`,
    );
    logger.log(responses[responses.length - 1]);
  } catch (e) {
    logger.error(e);
  }
};

function TestButtonsPanel() {
  const [promiseReturn, setPromiseReturn] = useState('Click a button.');
  const updatePromiseReturn = useCallback(
    (state: unknown) =>
      setPromiseReturn(isString(state) ? state : JSON.stringify(state)),
    [],
  );

  const [addOneResult, setAddOneResult] = useState(0);

  const [resourcesPath] = usePromise(
    useCallback(async () => {
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 5000);
      });
      return getResourcesPath();
    }, []),
    'retrieving',
  );

  const runPromise = useCallback(
    async (asyncFn: () => Promise<unknown>) => {
      try {
        const result = await asyncFn();
        logger.log(result);
        updatePromiseReturn(result);
        return result;
      } catch (e) {
        logger.error(e);
        updatePromiseReturn(`Error: ${getErrorMessage(e)}`);
        return undefined;
      }
    },
    [updatePromiseReturn],
  );

  const [webViews, setWebViews] = useState<WebViewProps[]>([]);
  const addWebView = useCallback(
    (webView: WebViewProps) => {
      setWebViews((webViewsCurrent) => [...webViewsCurrent, webView]);
    },
    [setWebViews],
  );

  useEffect(() => {
    const unsubscriber = papi.webViews.subscribeAddWebView(addWebView);
    return () => {
      unsubscriber();
    };
  }, [addWebView]);

  return (
    <>
      <div className="Hello">
        <button
          className="testButton"
          type="button"
          onClick={async () => {
            const start = performance.now();
            const result = await runPromise(() => echo('Echo Stuff'));
            logger.log(
              `command:echo '${result}' took ${performance.now() - start} ms`,
            );
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            executeMany(() => echo('Echo Stuff'));
          }}
        >
          Echo
        </button>
        <button
          className="testButton"
          type="button"
          onClick={async () => {
            const start = performance.now();
            const result = await runPromise(() =>
              echoRenderer('Echo Renderer Stuff'),
            );
            logger.log(
              `command:echoRenderer '${result}' took ${
                performance.now() - start
              } ms`,
            );
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            executeMany(() => echoRenderer('Echo Renderer Stuff'));
          }}
        >
          Echo Renderer
        </button>
        <button
          className="testButton"
          type="button"
          onClick={async () => {
            const start = performance.now();
            const result = await runPromise(() =>
              echoExtensionHost('Echo Extension Host Stuff'),
            );
            logger.log(
              `command:echoExtensionHost '${result}' took ${
                performance.now() - start
              } ms`,
            );
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            executeMany(() => echoExtensionHost('Echo Extension Host Stuff'));
          }}
        >
          Echo Extension Host
        </button>
        <button
          className="testButton"
          type="button"
          onClick={async () => {
            const start = performance.now();
            const result = await runPromise(() =>
              echoSomeoneRenderer('Echo Someone Renderer Stuff'),
            );
            logger.log(
              `command:hello-someone.echo-someone-renderer '${result}' took ${
                performance.now() - start
              } ms`,
            );
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            executeMany(() =>
              echoSomeoneRenderer('Echo Someone Renderer Stuff'),
            );
          }}
        >
          Echo Someone Renderer
        </button>
        <button
          className="testButton"
          type="button"
          onClick={async () => {
            const start = performance.now();
            const result = await runPromise(() => addThree(1, 2, 3));
            logger.log(
              `command:addThree ${result} took ${performance.now() - start} ms`,
            );
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            executeMany(() => addThree(1, 2, 3));
          }}
        >
          AddThree (Renderer)
        </button>
        <button
          className="testButton"
          type="button"
          onClick={async () => {
            const start = performance.now();
            const result = await runPromise(() => addMany(1, 2, 3, 4, 5, 6));
            logger.log(
              `command:addMany ${result} took ${performance.now() - start} ms`,
            );
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            executeMany(() => addMany(1, 2, 3, 4, 5, 6));
          }}
        >
          AddMany (Extension Host)
        </button>
        <button
          className="testButton"
          type="button"
          onClick={() =>
            runPromise(async () => {
              const addResult = await addOne(addOneResult);
              setAddOneResult(addResult);
              return `C# addOne: ${addResult}`;
            })
          }
          onContextMenu={(e) => {
            e.preventDefault();
            executeMany(() => addOne(3));
          }}
        >
          AddOne (C#)
        </button>
        <button
          className="testButton"
          type="button"
          onClick={async () => {
            const start = performance.now();
            const result = await runPromise(() => helloWorld());
            logger.log(
              `command:hello-world.hello-world ${result} took ${
                performance.now() - start
              } ms`,
            );
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            executeMany(() => helloWorld());
          }}
        >
          Hello World (Extension)
        </button>
        <button
          className="testButton"
          type="button"
          onClick={async () => {
            const start = performance.now();
            const result = await runPromise(() =>
              helloSomeone('Paranext user'),
            );
            logger.log(
              `command:hello-someone.hello-someone ${result} took ${
                performance.now() - start
              } ms`,
            );
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            executeMany(() => helloSomeone('Paranext user'));
          }}
        >
          Hello Someone (Extension)
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
          onClick={() =>
            runPromise(() => throwErrorExtensionHost('Test error'))
          }
        >
          Test Exception (Extension Host)
        </button>
        <button
          className="testButton"
          type="button"
          onClick={() => runPromise(() => throwErrorHelloWorld('Test error'))}
        >
          Test Exception (Hello World)
        </button>
        <papi.react.components.PButton
          className="testButton"
          onClick={() => runPromise(() => test())}
          onContextMenu={() => {
            executeMany(test);
          }}
        >
          Test
        </papi.react.components.PButton>
      </div>
      <div className="Hello">
        <div>resourcesPath: {resourcesPath}</div>
        <div>{promiseReturn}</div>
      </div>
      {webViews.map((webView, i) => (
        // TODO: Make webViews trackable in some way
        // eslint-disable-next-line react/no-array-index-key
        <WebView key={i} {...webView} />
      ))}
    </>
  );
}

const createButtonsPanel = (): TabInfo => {
  return {
    type: 'buttons',
    title: 'Test Buttons',
    content: <TestButtonsPanel />,
  };
};

export default createButtonsPanel;
