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
  }
}
