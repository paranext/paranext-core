import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useProjectData, useWebViewController } from '@papi/frontend/react';
import { Button } from 'platform-bible-react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { CSSProperties, useMemo } from 'react';
import { useHelloWorldProjectSettings } from './use-hello-world-project-settings.hook';

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

  const [namesPossiblyError] = useProjectData('helloWorld', projectId).Names(
    undefined,
    namesDefault,
  );

  const names = useMemo(() => {
    if (isPlatformError(namesPossiblyError)) {
      logger.warn(`Error getting names: ${getErrorMessage(namesPossiblyError)}`);
      return namesDefault;
    }
    return namesPossiblyError;
  }, [namesPossiblyError]);

  const { headerSize, headerColor } = useHelloWorldProjectSettings(projectId);

  const headerStyle = useMemo<CSSProperties>(() => {
    const colorPropertyName = callerWebViewController ? 'backgroundColor' : 'color';
    return { fontSize: `${headerSize}pt`, [colorPropertyName]: headerColor };
  }, [callerWebViewController, headerSize, headerColor]);

  return (
    <div className="tw-m-3 [&>*]:tw-mb-3">
      {callerWebViewController && (
        <div>Click a name to focus it on the Hello World Project web view!</div>
      )}
      {names.map((name) => {
        const textContent = `Hello, ${name}!`;
        return callerWebViewController ? (
          <div key={name}>
            <Button
              className="tw-text-foreground"
              style={headerStyle}
              onClick={() => callerWebViewController?.focusName(name)}
            >
              {textContent}
            </Button>
          </div>
        ) : (
          <div key={name} style={headerStyle}>
            {textContent}
          </div>
        );
      })}
    </div>
  );
};
