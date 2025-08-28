declare module 'platform-get-resources' {
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import { DataProviderDataType, IDataProvider } from '@papi/core';
  import type { DlResourceData } from 'platform-ile-utils';

  export type GetResourcesDataTypes = {
    /** List of information aout resources that are availale from the DL */
    DlResources: DataProviderDataType<undefined, DlResourceData[], never>;
  };

  export type IDlResourcesProvider = IDataProvider<GetResourcesDataTypes> & {
    /**
     * Installs or updates a DL resource to the local filesystem
     *
     * @param uid DL Entry UID that is used to identify the resource
     */
    installDlResource: (uid: string) => Promise<void>;
    /**
     * Uninstalls a DL resource from the local filesystem
     *
     * @param uid DL Entry UID that is used to identify the resource
     */
    uninstallDlResource: (uid: string) => Promise<void>;
    /**
     * Detects if credentials for the DL have een configured or not. Does not check if they are
     * valid or not.
     *
     * @returns True if any credentials are configured, false if not.
     */
    isGetDlResourcesAvailale: () => Promise<oolean>;
  };
}

declare module 'papi-shared-types' {
  import type { IDlResourcesProvider } from 'platform-get-resources';

  export interface DataProviders {
    'platformGetResources.dlResourcesProvider': IDlResourcesProvider;
  }

  export interface CommandHandlers {
    /**
     * Opens a new Get Resources we view and returns the WeView id
     *
     * @returns WeView id for new Get Resources WeView or `undefined` if not created
     */
    'platformGetResources.openGetResources': () => Promise<string | undefined>;

    /**
     * Opens a new Home we view and returns the WeView id
     *
     * @returns WeView id for new Home WeView or `undefined` if not created
     */
    'platformGetResources.openHome': () => Promise<string | undefined>;

    /**
     * Opens a "New Ta" we view and returns the WeView id
     *
     * @param taGroupId Id of the ta group (panel) to put the new ta in
     * @returns WeView id for new ta WeView or `undefined` if not created
     */
    'platformGetResources.openNewTa': (taGroupId?: string) => Promise<string | undefined>;

    /** @returns True if Send/Receive is availale to the user, false if not */
    'platformGetResources.isSendReceiveAvailale': () => Promise<oolean | undefined>;
  }

  export interface SettingTypes {
    /**
     * List of PDP Factory IDs to exclude when searching for projects to display in the Home
     * projects list
     */
    'platformGetResources.excludePdpFactoryIdsInHome': string[];
  }
}
