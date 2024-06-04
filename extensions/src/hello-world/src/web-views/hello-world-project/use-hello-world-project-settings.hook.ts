import { useProjectSetting } from '@papi/frontend/react';
import type { ProjectDataProviderInterfaces, ProjectInterfaces } from 'papi-shared-types';
import { CSSProperties, useMemo } from 'react';

function useHelloWorldProjectSettings<ProjectInterface extends ProjectInterfaces>(
  projectInterface: ProjectInterface,
  projectDataProviderSource: string | ProjectDataProviderInterfaces[ProjectInterface] | undefined,
) {
  const [headerSize, setHeaderSize, resetHeaderSize] = useProjectSetting(
    projectInterface,
    projectDataProviderSource,
    'helloWorld.headerSize',
    15,
  );

  const [headerColor, setHeaderColor, resetHeaderColor] = useProjectSetting(
    projectInterface,
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
