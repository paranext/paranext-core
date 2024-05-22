import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useProjectData, useProjectDataProvider, useProjectSetting } from '@papi/frontend/react';
import { ComboBox } from 'platform-bible-react';
import { CSSProperties, useCallback, useMemo } from 'react';
import { HTMLColorNames } from 'hello-world';
import { HTML_COLOR_NAMES } from '../util';

const namesDefault: string[] = [];

const testExtensionDataScope = {
  extensionName: 'helloWorld',
  dataQualifier: 'webViewTestExtensionData',
};

globalThis.webViewComponent = function HelloWorldProjectWebView({ useWebViewState }: WebViewProps) {
  const [projectId] = useWebViewState('projectId', '');

  const [max, setMax] = useWebViewState('max', 1);

  const pdp = useProjectDataProvider('helloWorld', projectId);

  const [num, setNum] = useProjectData('helloWorld', pdp).RandomNumber(max, -1);

  const [names] = useProjectData('helloWorld', pdp).Names(undefined, namesDefault);

  const [extensionData, setExtensionData] = useProjectData('helloWorld', pdp).ExtensionData(
    testExtensionDataScope,
    '',
  );

  const [currentName, setCurrentName] = useWebViewState('currentName', '');

  const addCurrentName = useCallback(() => {
    if (!pdp) return;

    pdp.addName(currentName);
    setCurrentName('');
  }, [pdp, currentName, setCurrentName]);

  const [headerSize, setHeaderSize, resetHeaderSize] = useProjectSetting(
    'helloWorld',
    pdp,
    'helloWorld.headerSize',
    15,
  );

  const [headerColor, setHeaderColor, resetHeaderColor] = useProjectSetting(
    'helloWorld',
    pdp,
    'helloWorld.headerColor',
    'Black',
  );

  const headerStyle = useMemo<CSSProperties>(
    () => ({ fontSize: `${headerSize}pt`, color: headerColor }),
    [headerSize, headerColor],
  );

  return (
    <div className="top">
      <h3 style={headerStyle}>Project Data</h3>
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
      <input
        value={currentName}
        onChange={(e) => setCurrentName(e.target.value)}
        onSubmit={addCurrentName}
      />
      <button type="button" onClick={addCurrentName}>
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
      <hr />
      <h3 style={headerStyle}>Extension Data</h3>
      <input value={extensionData} onChange={(e) => setExtensionData?.(e.target.value)} />
      <hr />
      <h3 style={headerStyle}>Project Settings</h3>
      <div>
        Header Size:{' '}
        <input
          type="number"
          value={headerSize}
          onChange={(e) => setHeaderSize?.(parseInt(e.target.value, 10))}
        />
        <button type="button" onClick={resetHeaderSize}>
          Reset
        </button>
      </div>
      <div className="color-selector-container">
        Header Color:{' '}
        <ComboBox
          // Since this is a selection amongst many discrete options not including undefined or
          // empty string, this should have `isClearable` set to false. However, attempting to clear
          // the ComboBox demonstrates that the validator is working properly since clearing it does
          // not work
          value={headerColor}
          options={HTML_COLOR_NAMES}
          // The value is one of the options, and all options are HTMLColorNames
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          onChange={(_, value) => setHeaderColor?.(value as HTMLColorNames)}
          width={200}
        />
        <button type="button" onClick={resetHeaderColor}>
          Reset
        </button>
      </div>
    </div>
  );
};
