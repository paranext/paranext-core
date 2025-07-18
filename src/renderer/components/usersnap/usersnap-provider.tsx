import React, { useEffect, useState } from 'react';
import { loadSpace } from '@usersnap/browser';
import type { SpaceApi, InitOptions } from '@usersnap/browser';
import { logger } from '@shared/services/logger.service';
import { USERSNAP_SPACE_API_KEY } from './usersnap.constants';
import { UsersnapContext } from './usersnap-context';

// Default init parameters for Paranext
const defaultInitParams: InitOptions = {
  // Electron-specific configuration
  // Use native screenshot capability for better performance in Electron
  nativeScreenshot: true,
  // Don't collect geo location for privacy
  collectGeoLocation: 'none',
  // Use system fonts for better integration
  useSystemFonts: true,
  // Allow local storage for better user experience
  useLocalStorage: true,
  // Additional context data
  custom: {
    platform: 'Electron',
    app: 'Platform.Bible',
    environment: globalThis.isNoisyDevModeEnabled ? 'development' : 'production',
  },
};

interface UsersnapProviderProps {
  children: React.ReactNode;
  initParams?: InitOptions;
}

export function UsersnapProvider({ children, initParams }: UsersnapProviderProps) {
  const [usersnapApi, setUsersnapApi] = useState<SpaceApi | undefined>(undefined);

  useEffect(() => {
    const initializeUserSnap = async () => {
      try {
        const mergedInitParams = { ...defaultInitParams, ...initParams };

        const startTime = performance.now();
        const api = await loadSpace(USERSNAP_SPACE_API_KEY);
        api.init(mergedInitParams);
        const endTime = performance.now();
        logger.info(`UserSnap initialized successfully in ${endTime - startTime}ms`);

        setUsersnapApi(api);
      } catch (err) {
        const errorMessage = `Failed to initialize UserSnap: ${err}`;
        logger.error(errorMessage);
      }
    };

    initializeUserSnap();
  }, [initParams]);

  return <UsersnapContext.Provider value={usersnapApi}>{children}</UsersnapContext.Provider>;
}
