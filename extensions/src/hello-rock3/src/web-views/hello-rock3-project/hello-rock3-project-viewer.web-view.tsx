import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useProjectData, useWebViewController } from '@papi/frontend/react';
import { Button } from 'platform-bible-react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { CSSProperties, useMemo } from 'react';
import { useHelloRock3ProjectSettings } from './use-hello-rock3-project-settings.hook';
import { HELLO_ROCK_3_PROJECT_WEB_VIEW_TYPE } from 'src/util';

const namesDefault: string[] = [];

globalThis.webViewComponent = function HelloRock3ProjectViewer({
  projectId,
  useWebViewState,
}: WebViewProps) {
  const [callerWebViewId] = useWebViewState<string | undefined>('callerWebViewId', undefined);

  const callerWebViewController = useWebViewController(
    HELLO_ROCK_3_PROJECT_WEB_VIEW_TYPE,
    callerWebViewId,
  );

  const [namesPossiblyError] = useProjectData('helloRock3', projectId).Names(
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

  const { headerSize, headerColor } = useHelloRock3ProjectSettings(projectId);

  const headerStyle = useMemo<CSSProperties>(() => {
    const colorPropertyName = callerWebViewController ? 'backgroundColor' : 'color';
    return { fontSize: `${headerSize}pt`, [colorPropertyName]: headerColor };
  }, [callerWebViewController, headerSize, headerColor]);

  return (
    <div className="tw-m-3 [&>*]:tw-mb-3">
      {callerWebViewController && (
        <div>Click a name to select it in the Hello Third Rock Project web view!</div>
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
