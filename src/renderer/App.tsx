import { useCallback, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import * as NetworkService from '@shared/services/NetworkService';
import icon from '@assets/icon.png';
import './App.css';
import papi from '@shared/services/papi';
import { getErrorMessage, isString } from '@shared/util/Util';
import usePromise from '@renderer/hooks/usePromise';
import { WebView, WebViewProps } from './components/WebView';

const getVar: (envVar: string) => Promise<string> =
  NetworkService.createRequestFunction('electronAPI.env.getVar');

const testBase: () => Promise<string> = NetworkService.createRequestFunction(
  'electronAPI.env.test',
);

const test = async () => {
  /* const start = performance.now(); */
  const result = await testBase();
  /* console.log(`Test took ${performance.now() - start} ms`); */
  return result;
};

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
      .catch((err) => console.error(err));
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
    console.log(
      `Of ${numRequests} requests:\n\tAvg response time: ${avgResponseTime} ms\n\tMax response time: ${maxTime} ms\n\tMin response time: ${minTime}\n\tTotal time: ${
        finish - start
      }`,
    );
    console.log(responses[responses.length - 1]);
  } catch (e) {
    console.error(e);
  }
};

const Hello = () => {
  const [promiseReturn, setPromiseReturn] = useState('');
  const updatePromiseReturn = useCallback(
    (state: unknown) =>
      setPromiseReturn(isString(state) ? state : JSON.stringify(state)),
    [],
  );

  const [NODE_ENV] = usePromise(
    useCallback(() => getVar('NODE_ENV'), []),
    'retrieving',
  );

  const runPromise = useCallback(
    async (asyncFn: () => Promise<unknown>) => {
      try {
        const result = await asyncFn();
        console.log(result);
        updatePromiseReturn(result);
        return result;
      } catch (e) {
        console.error(e);
        updatePromiseReturn(`Error: ${getErrorMessage(e)}`);
        return undefined;
      }
    },
    [updatePromiseReturn],
  );

  const [webViews, setWebViews] = useState<WebViewProps[]>([
    { contents: '<html><head></head><body>stuff</body></html>' },
  ]);

  return (
    <>
      <div className="view">
        <div className="Hello">
          <img width="200" alt="icon" src={icon} />
        </div>
        <div className="Hello">
          <h1>Paranext</h1>
        </div>
        <div className="Hello">
          <button
            type="button"
            onClick={async () => {
              const start = performance.now();
              const result = await runPromise(() => echo('Echo Stuff'));
              console.log(
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
            type="button"
            onClick={async () => {
              const start = performance.now();
              const result = await runPromise(() =>
                echoRenderer('Echo Renderer Stuff'),
              );
              console.log(
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
            type="button"
            onClick={async () => {
              const start = performance.now();
              const result = await runPromise(() =>
                echoExtensionHost('Echo Extension Host Stuff'),
              );
              console.log(
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
            type="button"
            onClick={async () => {
              const start = performance.now();
              const result = await runPromise(() =>
                echoSomeoneRenderer('Echo Someone Renderer Stuff'),
              );
              console.log(
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
            type="button"
            onClick={async () => {
              const start = performance.now();
              const result = await runPromise(() => addThree(1, 2, 3));
              console.log(
                `command:addThree ${result} took ${
                  performance.now() - start
                } ms`,
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
            type="button"
            onClick={async () => {
              const start = performance.now();
              const result = await runPromise(() => addMany(1, 2, 3, 4, 5, 6));
              console.log(
                `command:addMany ${result} took ${
                  performance.now() - start
                } ms`,
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
            type="button"
            onClick={async () => {
              const start = performance.now();
              const result = await runPromise(() => helloWorld());
              console.log(
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
            type="button"
            onClick={async () => {
              const start = performance.now();
              const result = await runPromise(() =>
                helloSomeone('Paranext user'),
              );
              console.log(
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
            type="button"
            onClick={() => runPromise(() => throwError('Test error'))}
          >
            Test Exception
          </button>
          <button
            type="button"
            onClick={() =>
              runPromise(() => throwErrorExtensionHost('Test error'))
            }
          >
            Test Exception (Extension Host)
          </button>
          <button
            type="button"
            onClick={() => runPromise(() => throwErrorHelloWorld('Test error'))}
          >
            Test Exception (Hello World)
          </button>
          <button
            type="button"
            onClick={() => runPromise(() => test())}
            onContextMenu={(e) => {
              e.preventDefault();
              executeMany(test);
            }}
          >
            Test
          </button>
        </div>
        <div className="Hello">
          <div>NODE_ENV: {NODE_ENV}</div>
          <div>{promiseReturn}</div>
        </div>
      </div>
      {webViews.map((webView) => (
        <WebView {...webView} />
      ))}
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
