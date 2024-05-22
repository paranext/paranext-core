import { useProjectSetting } from '@papi/frontend/react';
import type { ProjectDataProviders } from 'papi-shared-types';
import { CSSProperties, useMemo } from 'react';

function useHelloWorldProjectSettings<ProjectType extends keyof ProjectDataProviders>(
  projectType: ProjectType,
  projectDataProviderSource: string | ProjectDataProviders[ProjectType] | undefined,
) {
  const [headerSize, setHeaderSize, resetHeaderSize] = useProjectSetting(
    projectType,
    projectDataProviderSource,
    'helloWorld.headerSize',
    15,
  );

  const [headerColor, setHeaderColor, resetHeaderColor] = useProjectSetting(
    projectType,
    projectDataProviderSource,
    'helloWorld.headerColor',
    'Black',
  );

  const headerStyle = useMemo<CSSProperties>(
    () => ({ fontSize: `${headerSize}pt`, color: headerColor }),
    [headerSize, headerColor],
  );

  return {
    headerSize,
    setHeaderSize,
    resetHeaderSize,
    headerColor,
    setHeaderColor,
    resetHeaderColor,
    headerStyle,
  };
}

export default useHelloWorldProjectSettings;
