declare module 'papi-shared-types' {
  export interface CommandHandlers {
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
  }

  export interface SettingTypes {
    /**
     * List of PDP Factory IDs to exclude when searching for projects to display in the Home
     * projects list
     */
    'platformGetResources.excludePdpFactoryIdsInHome': string[];
  }
}
