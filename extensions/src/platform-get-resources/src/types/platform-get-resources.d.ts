declare module 'platform-get-resources' {
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import { DataProviderDataType, IDataProvider } from '@papi/core';
  import type { DblResourceData } from 'platform-bible-utils';

  export type GetResourcesDataTypes = {
    /** List of information about resources that are available from the DBL */
    DblResources: DataProviderDataType<undefined, DblResourceData[], never>;
  };

  export type IDblResourcesProvider = IDataProvider<GetResourcesDataTypes> & {
    /**
     * Installs or updates a DBL resource to the local filesystem
     *
     * @param uid DBL Entry UID that is used to identify the resource
     */
    installDblResource: (uid: string) => Promise<void>;
    /**
     * Uninstalls a DBL resource from the local filesystem
     *
     * @param uid DBL Entry UID that is used to identify the resource
     */
    uninstallDblResource: (uid: string) => Promise<void>;
    /**
     * Detects if credentials for the DBL have been configured or not. Does not check if they are
     * valid or not.
     *
     * @returns True if any credentials are configured, false if not.
     */
    isGetDblResourcesAvailable: () => Promise<boolean>;
  };
}

declare module 'papi-shared-types' {
  import type { IDblResourcesProvider } from 'platform-get-resources';

  export interface DataProviders {
    'platformGetResources.dblResourcesProvider': IDblResourcesProvider;
  }

  export interface CommandHandlers {
    /**
     * Opens a new Get Resources web view and returns the WebView id
     *
     * @returns WebView id for new Get Resources WebView or `undefined` if not created
     */
    'platformGetResources.openGetResources': () => Promise<string | undefined>;

    /**
     * Opens a new Home web view and returns the WebView id
     *
     * @returns WebView id for new Home WebView or `undefined` if not created
     */
    'platformGetResources.openHome': () => Promise<string | undefined>;

    /** @returns True if Send/Receive is available to the user, false if not */
    'platformGetResources.isSendReceiveAvailable': () => Promise<boolean | undefined>;
  }

  export interface SettingTypes {
    /**
     * List of PDP Factory IDs to exclude when searching for projects to display in the Home
     * projects list
     */
    'platformGetResources.excludePdpFactoryIdsInHome': string[];
  }
}
