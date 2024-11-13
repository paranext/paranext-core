import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useProjectData, useProjectDataProvider } from '@papi/frontend/react';
import { useCallback, useEffect } from 'react';
import useHelloWorldProjectSettings from './use-hello-world-project-settings.hook';
import ProjectSettingsEditor from './project-settings-editor.component';

const namesDefault: string[] = [];

const testExtensionDataScope = {
  extensionName: 'helloWorld',
  dataQualifier: 'webViewTestExtensionData',
};

globalThis.webViewComponent = function HelloWorldProjectWebView({
  projectId,
  useWebViewState,
}: WebViewProps) {
  const [focusedName, setFocusedName] = useWebViewState('focusedName', '');

  useEffect(() => {
    const webViewMessageListener = ({ data: { method, name } }: MessageEvent) => {
      switch (method) {
        case 'focusName':
          setFocusedName(focusedName === name ? '' : name);
          break;
        default:
          // Unknown method name
          logger.info(`Received event with unknown method ${method} and name ${name}`);
          break;
      }
    };

    window.addEventListener('message', webViewMessageListener);

    return () => {
      window.removeEventListener('message', webViewMessageListener);
    };
  }, [focusedName, setFocusedName]);

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

  const helloWorldProjectSettings = useHelloWorldProjectSettings(pdp);
  const { headerStyle, headerColor } = helloWorldProjectSettings;

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
      <div>
        Names:{' '}
        {names.map((name) => (
          <span key={name}>
            <span style={focusedName === name ? { backgroundColor: headerColor } : undefined}>
              {name}
            </span>
            <button
              type="button"
              className="remove-name-button"
              onClick={async () => {
                if (await pdp?.removeName(name)) setFocusedName('');
              }}
            >
              -
            </button>
          </span>
        ))}
      </div>
      <input
        value={currentName}
        onChange={(e) => setCurrentName(e.target.value)}
        onSubmit={addCurrentName}
      />
      <button type="button" onClick={addCurrentName}>
        Add Name
      </button>
      <hr />
      <h3 style={headerStyle}>Extension Data</h3>
      <input value={extensionData} onChange={(e) => setExtensionData?.(e.target.value)} />
      <hr />
      <h3 style={headerStyle}>Project Settings</h3>
      <ProjectSettingsEditor {...helloWorldProjectSettings} />
    </div>
  );
};
