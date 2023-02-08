import { useCallback, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import * as NetworkService from '@shared/services/NetworkService';
import icon from '@assets/icon.png';
import './App.css';
import usePromise from './hooks/usePromise';

const getVar: (envVar: string) => Promise<string> =
  NetworkService.createRequestFunction('electronAPI.env.getVar');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invoke: (classMethod: string, args: unknown) => Promise<any> =
  NetworkService.createRequestFunction('electronAPI.edge.invoke');

const test: () => Promise<string> = NetworkService.createRequestFunction(
  'electronAPI.env.test',
);

const Hello = () => {
  const [edgeReturn, setEdgeReturn] = useState('');

  const [EDGE_USE_CORECLR] = usePromise(
    useCallback(() => getVar('EDGE_USE_CORECLR'), []),
    'retrieving',
  );

  const [EDGE_APP_ROOT] = usePromise(
    useCallback(() => getVar('EDGE_APP_ROOT'), []),
    'retrieving',
  );

  const [EDGE_BOOTSTRAP_DIR] = usePromise(
    useCallback(() => getVar('EDGE_BOOTSTRAP_DIR'), []),
    'retrieving',
  );

  const edgeInvoke = useCallback(
    (name: string) => {
      return invoke(name, 'Node!')
        .then((result) => {
          console.log(result);
          setEdgeReturn(result);
          return result;
        })
        .catch((e) => {
          console.error(e);
          console.error('TEST!');
          setEdgeReturn(e.message);
          return undefined;
        });
    },
    [setEdgeReturn],
  );

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <div className="Hello">
        <h1>Paranext</h1>
      </div>
      <div className="Hello">
        <button
          type="button"
          onClick={() => edgeInvoke('EdgeMethods.UseDynamicInput')}
          onContextMenu={(e) => {
            const numRequests = 10000;
            const requests = new Array<Promise<string>>(numRequests);
            const requestTime = new Array<number>(numRequests);
            const start = performance.now();
            for (let i = 0; i < numRequests; i++) {
              requestTime[i] = performance.now();
              requests[i] = edgeInvoke('EdgeMethods.UseDynamicInput')
                .then((response) => {
                  requestTime[i] = performance.now() - requestTime[i];
                  return response;
                })
                .catch((err) => console.error(err));
            }
            e.preventDefault();

            Promise.all(requests)
              .then((responses) => {
                const finish = performance.now();

                const avgResponseTime =
                  requestTime.reduce((sum, time) => sum + time, 0) /
                  numRequests;
                const maxTime = requestTime.reduce(
                  (max, time) => Math.max(max, time),
                  0,
                );
                const minTime = requestTime.reduce(
                  (min, time) => Math.min(min, time),
                  Number.MAX_VALUE,
                );
                console.log(
                  `Of ${numRequests} requests:\n\tAvg response time: ${avgResponseTime} ms\n\tMax response time: ${maxTime} ms\n\tMin response time: ${minTime}\n\tTotal time: ${
                    finish - start
                  }\n\tResponse times:`,
                  requestTime,
                );
                console.log(responses[responses.length - 1]);
                return undefined;
              })
              .catch((err) => console.error(err));
          }}
        >
          Test Edge Input
        </button>
        <button
          type="button"
          onClick={() => edgeInvoke('EdgeMethods.ThrowException')}
        >
          Test Edge Exception
        </button>
        <button
          type="button"
          onClick={() => {
            test()
              .then((result) => {
                console.log(result);
                setEdgeReturn(result);
                return undefined;
              })
              .catch((e) => {
                console.error(e);
                setEdgeReturn(e.message);
                return undefined;
              });
          }}
          onContextMenu={(e) => {
            const numRequests = 10000;
            const requests = new Array<Promise<string | void>>(numRequests);
            const requestTime = new Array<number>(numRequests);
            const start = performance.now();
            for (let i = 0; i < numRequests; i++) {
              requestTime[i] = performance.now();
              requests[i] = test()
                .then((response) => {
                  requestTime[i] = performance.now() - requestTime[i];
                  return response;
                })
                .catch((err) => console.error(err));
            }
            e.preventDefault();

            Promise.all(requests)
              .then((responses) => {
                const finish = performance.now();

                const avgResponseTime =
                  requestTime.reduce((sum, time) => sum + time, 0) /
                  numRequests;
                const maxTime = requestTime.reduce(
                  (max, time) => Math.max(max, time),
                  0,
                );
                const minTime = requestTime.reduce(
                  (min, time) => Math.min(min, time),
                  Number.MAX_VALUE,
                );
                console.log(
                  `Of ${numRequests} requests:\n\tAvg response time: ${avgResponseTime} ms\n\tMax response time: ${maxTime} ms\n\tMin response time: ${minTime}\n\tTotal time: ${
                    finish - start
                  }\n\tResponse times:`,
                  requestTime,
                );
                console.log(responses[responses.length - 1]);
                return undefined;
              })
              .catch((err) => console.error(err));
          }}
        >
          Test
        </button>
      </div>
      <div className="Hello">
        <div>EDGE_USE_CORECLR: {EDGE_USE_CORECLR}</div>
        <div>EDGE_APP_ROOT: {EDGE_APP_ROOT}</div>
        <div>EDGE_BOOTSTRAP_DIR: {EDGE_BOOTSTRAP_DIR}</div>
        <div>{edgeReturn}</div>
      </div>
    </div>
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
