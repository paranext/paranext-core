import { WebViewProps } from '@papi/core';
import { useProjectData, useProjectSetting, useWebViewController } from '@papi/frontend/react';
import { Button } from 'platform-bible-react';
import { CSSProperties, useMemo } from 'react';

const namesDefault: string[] = [];

globalThis.webViewComponent = function HelloWorldProjectViewer({
  projectId,
  useWebViewState,
}: WebViewProps) {
  const [callerWebViewId] = useWebViewState<string | undefined>('callerWebViewId', undefined);

  const callerWebViewController = useWebViewController(
    'helloWorld.projectWebView',
    callerWebViewId,
  );

  const [names] = useProjectData('helloWorld', projectId).Names(undefined, namesDefault);

  const [headerSize] = useProjectSetting(projectId, 'helloWorld.headerSize', 15);

  const [headerColor] = useProjectSetting(projectId, 'helloWorld.headerColor', 'Black');

  const headerStyle = useMemo<CSSProperties>(
    () => ({ fontSize: `${headerSize}pt`, backgroundColor: headerColor }),
    [headerSize, headerColor],
  );

  return (
    <div className="tw-m-3 [&>*]:tw-mb-3">
      <div>Web View Id: {globalThis.webViewId}</div>
      <div>Caller Web View Id: {callerWebViewId}</div>
      <div>Caller Web View Controller: {callerWebViewController?.toString()}</div>
      <div>Click a name to focus it on the Hello World Project web view!</div>
      {names.map((name) => (
        <div key={name}>
          <Button
            className="tw-text-foreground"
            style={headerStyle}
            onClick={() => callerWebViewController?.focusName(name)}
          >
            Hello, {name}!
          </Button>
        </div>
      ))}
    </div>
  );
};
