import { logger } from '@papi/frontend';
import { useProjectSetting } from '@papi/frontend/react';
import type { IBaseProjectDataProvider } from 'papi-shared-types';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { CSSProperties, useMemo } from 'react';

const HEADER_SIZE_DEFAULT = 15;
const HEADER_COLOR_DEFAULT = 'Black';

export function useHelloRock3ProjectSettings(
  // Any Base PDP type works. Without `any`, the DataProviderUpdateInstructions types are incompatible
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projectDataProviderSource: string | IBaseProjectDataProvider<any> | undefined,
) {
  const [headerSizePossiblyError, setHeaderSize, resetHeaderSize] = useProjectSetting(
    projectDataProviderSource,
    'helloRock3.headerSize',
    HEADER_SIZE_DEFAULT,
  );

  const headerSize = useMemo(() => {
    if (isPlatformError(headerSizePossiblyError)) {
      logger.warn(`Error getting header size: ${getErrorMessage(headerSizePossiblyError)}`);
      return HEADER_SIZE_DEFAULT;
    }
    return headerSizePossiblyError;
  }, [headerSizePossiblyError]);

  const [headerColorPossiblyError, setHeaderColor, resetHeaderColor] = useProjectSetting(
    projectDataProviderSource,
    'helloRock3.headerColor',
    HEADER_COLOR_DEFAULT,
  );

  const headerColor = useMemo(() => {
    if (isPlatformError(headerColorPossiblyError)) {
      logger.warn(`Error getting header color: ${getErrorMessage(headerColorPossiblyError)}`);
      return HEADER_COLOR_DEFAULT;
    }
    return headerColorPossiblyError;
  }, [headerColorPossiblyError]);

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

export default useHelloRock3ProjectSettings;
