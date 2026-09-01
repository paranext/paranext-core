declare module 'platform-get-resources' {
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import { DataProviderDataType, IDataProvider } from '@papi/core';
  import type { DblResourceData } from 'platform-bible-utils';

  export type GetResourcesDataTypes = {
    /** List of information about resources that are available from the DBL */
    DblResources: DataProviderDataType<undefined, DblResourceData[], never>;
  };

  /**
   * Whether a newer version of each resource is available from the DBL, keyed by DBL Entry UID.
   *
   * Only the backend can determine this — it compares the revision of the locally installed
   * resource against the revision in the DBL catalog — so a resource missing from the map means
   * "unknown", and callers should keep whatever value they already have rather than guessing.
   */
  export type DblResourceUpdateStatus = { [dblEntryUid: string]: boolean | undefined };

  export type IDblResourcesProvider = IDataProvider<GetResourcesDataTypes> & {
    /**
     * Recomputes whether a newer version of each known resource is available from the DBL,
     * comparing the locally installed revision against the revision in the DBL catalog already in
     * memory.
     *
     * Never contacts the DBL and never waits, so it is cheap enough to call on a UI refresh. In
     * exchange it answers for only what it already knows: the result is empty if the catalog has
     * not been fetched yet this session, or if another DBL operation (a fetch, install, or
     * uninstall) currently holds the provider. Treat a resource missing from the result as
     * "unknown" and keep whatever value you have.
     *
     * @returns Whether an update is available, keyed by DBL Entry UID.
     */
    recomputeDblResourcesUpdateStatus: () => Promise<DblResourceUpdateStatus>;
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
  import type { DblResourceData } from 'platform-bible-utils';

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

    /**
     * Opens a "New Tab" web view and returns the WebView id
     *
     * @param tabGroupId Id of the tab group (panel) to put the new tab in
     * @returns WebView id for new tab WebView or `undefined` if not created
     */
    'platformGetResources.openNewTab': (tabGroupId?: string) => Promise<string | undefined>;

    /**
     * Whether the Send/Receive extension is part of this build.
     *
     * @returns `true` if Send/Receive is available to the user, `false` if it is not, or
     *   `undefined` if availability could not be determined. Treat `undefined` as unknown — never
     *   as unavailable — since it means this extension had no way to check, not that Send/Receive
     *   is missing.
     */
    'platformGetResources.isSendReceiveAvailable': () => Promise<boolean | undefined>;

    /**
     * Returns DBL resources from memory cache.
     *
     * If no cached value exists, attempts to fetch them. Failed refresh attempts do NOT clear
     * existing cached data.
     *
     * @returns Cached DBL resources, or `undefined` if none have been successfully fetched.
     */
    'platformGetResources.getCachedResources': () => Promise<DblResourceData[] | undefined>;

    // `paratextBibleSendReceive.*` commands are deliberately NOT declared here. This file is
    // auto-included (via `typeRoots`) into the TypeScript programs of extension repos developed
    // against core — including the closed-source Send/Receive extension itself, where duplicate or
    // drifted declarations collide with the authoritative ones. Core's copy of the Send/Receive
    // seam lives in `src/@types/paratext-bible-send-receive/`, which external extension programs
    // do not include.
  }

  export interface SettingTypes {
    /**
     * List of PDP Factory IDs to exclude when searching for projects to display in the Home
     * projects list
     */
    'platformGetResources.excludePdpFactoryIdsInHome': string[];
  }
}
