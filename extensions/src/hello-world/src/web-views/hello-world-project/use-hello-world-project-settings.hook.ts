import { useProjectSetting } from '@papi/frontend/react';
import type { IBaseProjectDataProvider } from 'papi-shared-types';
import { CSSProperties, useMemo } from 'react';

function useHelloWorldProjectSettings(
  // Any Base PDP type works. Without `any`, the DataProviderUpdateInstructions types are incompatible
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projectDataProviderSource: string | IBaseProjectDataProvider<any> | undefined,
) {
  const [headerSize, setHeaderSize, resetHeaderSize] = useProjectSetting(
    projectDataProviderSource,
    'helloWorld.headerSize',
    15,
  );

  const [headerColor, setHeaderColor, resetHeaderColor] = useProjectSetting(
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
