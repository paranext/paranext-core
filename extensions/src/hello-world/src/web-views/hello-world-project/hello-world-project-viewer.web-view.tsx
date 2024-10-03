import { WebViewProps } from '@papi/core';
import { useProjectData, useProjectSetting } from '@papi/frontend/react';
import { CSSProperties, useMemo } from 'react';

const namesDefault: string[] = [];

globalThis.webViewComponent = function HelloWorldProjectViewer({ projectId }: WebViewProps) {
  const [names] = useProjectData('helloWorld', projectId).Names(undefined, namesDefault);

  const [headerSize] = useProjectSetting(projectId, 'helloWorld.headerSize', 15);

  const [headerColor] = useProjectSetting(projectId, 'helloWorld.headerColor', 'Black');

  const headerStyle = useMemo<CSSProperties>(
    () => ({ fontSize: `${headerSize}pt`, color: headerColor }),
    [headerSize, headerColor],
  );

  return (
    <div className="top">
      {names.map((name) => (
        <div style={headerStyle}>Hello, {name}!</div>
      ))}
    </div>
  );
};
