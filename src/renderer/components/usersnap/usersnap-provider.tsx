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
    platform: 'electron',
    app: 'paranext-core',
    environment: globalThis.isNoisyDevModeEnabled ? 'development' : 'production',
  },
};

interface UsersnapProviderProps {
  children: React.ReactNode;
  initParams?: InitOptions;
}

export function UsersnapProvider({ children, initParams }: UsersnapProviderProps) {
  const [usersnapApi, setUsersnapApi] = useState<SpaceApi | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Don't initialize UserSnap if no API key is configured
    if (!USERSNAP_SPACE_API_KEY || USERSNAP_SPACE_API_KEY === '<USERSNAP_SPACE_API_KEY>') {
      logger.warn('UserSnap API key not configured. UserSnap will not be available.');
      setIsLoading(false);
      return;
    }

    const initializeUserSnap = async () => {
      try {
        const mergedInitParams = { ...defaultInitParams, ...initParams };
        const api = await loadSpace(USERSNAP_SPACE_API_KEY);
        console.log('api', JSON.stringify(api));

        api.init(mergedInitParams);
        setUsersnapApi(api);
        setIsLoading(false);
        logger.info('UserSnap initialized successfully');
      } catch (err) {
        const errorMessage = `Failed to initialize UserSnap: ${err}`;
        logger.error(errorMessage);
        setIsLoading(false);
      }
    };

    initializeUserSnap();
  }, [initParams]);

  // Log loading state for debugging
  useEffect(() => {
    if (isLoading) {
      logger.debug('UserSnap is loading...');
    }
  }, [isLoading]);

  return <UsersnapContext.Provider value={usersnapApi}>{children}</UsersnapContext.Provider>;
}
