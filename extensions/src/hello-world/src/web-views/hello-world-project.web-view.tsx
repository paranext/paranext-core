import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useProjectData, useProjectDataProvider } from '@papi/frontend/react';

const namesDefault: string[] = [];

globalThis.webViewComponent = function HelloWorldProjectWebView({ useWebViewState }: WebViewProps) {
  const [projectId] = useWebViewState('projectId', '');

  const [max, setMax] = useWebViewState('max', 1);

  const pdp = useProjectDataProvider('helloWorld', projectId);

  const [num, setNum] = useProjectData('helloWorld', pdp).RandomNumber(max, -1);

  const [names] = useProjectData('helloWorld', pdp).Names(undefined, namesDefault);

  const [currentName, setCurrentName] = useWebViewState('currentName', '');

  return (
    <div className="top">
      <div>
        Max:{' '}
        <input type="number" value={max} onChange={(e) => setMax(parseInt(e.target.value, 10))} />
      </div>
      <div>
        Random Number:{' '}
        <input
          value={num}
          onChange={(e) => {
            if (!setNum) {
              logger.log('setNum is not available');
              return;
            }
            const newNum = parseInt(e.target.value, 10);

            if (Number.isNaN(newNum)) return;

            setNum(newNum);
          }}
        />
      </div>
      <div>Names: {names.join(', ')}</div>
      <input value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
      <button
        type="button"
        onClick={() => {
          if (!pdp) return;

          pdp.addName(currentName);
          setCurrentName('');
        }}
      >
        Add Name
      </button>
      <button
        type="button"
        onClick={() => {
          if (!pdp) return;

          pdp.removeName(currentName);
          setCurrentName('');
        }}
      >
        Remove Name
      </button>
    </div>
  );
};
