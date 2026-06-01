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

    /** @returns True if Send/Receive is available to the user, false if not */
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

    /**
     * Commits changes in the specified project to the version history. Unless `forceCommit` is
     * `true`, will only commit if there are changes/revisions detected.
     *
     * @param projectId Id of the project
     * @param comment Specified comment describing the change/revisions
     * @param forceCommit Whether to force a commit even if there are no changes
     * @returns Whether or not changes were committed
     */
    'paratextBibleSendReceive.commitChanges': (
      projectId: string,
      comment: string,
      forceCommit?: boolean,
    ) => Promise<boolean>;

    /**
     * Commits changes only if it's been a day since the last commit.
     *
     * @param projectId Id of the project
     */
    'paratextBibleSendReceive.commitDaily': (projectId: string) => Promise<void>;

    /**
     * Syncs projects: sends/receives each project, then reads each project's connected resources
     * and projects (one level deep — connections of connections are not included) and
     * sends/receives connected translation projects or DBL-updates connected resources as needed.
     * Unknown project IDs are skipped. Deduplication is handled internally.
     *
     * @param projectIds IDs of the projects to sync. If omitted, all shared projects that are
     *   already present locally (i.e., not new) are synced. If provided, only projects already
     *   present locally are synced; new projects (not yet received) and unknown IDs are skipped.
     * @throws `PlatformUnimplementedException` if not running in an application that implements
     *   this command (e.g., Paratext 10 Studio)
     */
    'paratextBibleSendReceive.syncProjects': (projectIds?: string[]) => Promise<void>;

    /**
     * Gets all open webview project IDs and calls `paratextBibleSendReceive.syncProjects` with
     * them.
     *
     * @throws `PlatformUnimplementedException` if not running in an application that implements
     *   this command (e.g., Paratext 10 Studio)
     */
    'paratextBibleSendReceive.syncOpenProjects': () => Promise<void>;

    /**
     * Cancels an in-progress sync operation if one is running. The process will finish dealing with
     * the current project/resource and then it will abort. It will not undo what has been done.
     *
     * @param notificationId ID of the notification that triggered this cancel, if any.
     *   Implementations may use this to validate that the cancel is for the expected sync
     *   operation.
     * @throws `PlatformUnimplementedException` if not running in an application that implements
     *   this command (e.g., Paratext 10 Studio)
     */
    'paratextBibleSendReceive.cancelSync': (notificationId?: string | number) => Promise<void>;
  }

  export interface SettingTypes {
    /**
     * List of PDP Factory IDs to exclude when searching for projects to display in the Home
     * projects list
     */
    'platformGetResources.excludePdpFactoryIdsInHome': string[];
  }
}
