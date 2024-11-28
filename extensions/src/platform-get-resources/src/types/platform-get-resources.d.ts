declare module 'platform-get-resources' {
  import { DataProviderDataType, IDataProvider } from '@papi/core';

  export type ResourceType = 'DBL' | 'EnhancedResource' | 'XmlResource' | 'SourceLanguageResource';

  /**
   * Contains small amount of information about DBL resources, for the purpose of presenting a list
   * of available resources to the user
   */
  export type DblResourceData = {
    dblEntryUid: string;
    displayName: string;
    fullName: string;
    bestLanguageName: string;
    type: ResourceType;
    size: number;
    installed: boolean;
    updateAvailable: boolean;
    projectId: string;
  };

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
