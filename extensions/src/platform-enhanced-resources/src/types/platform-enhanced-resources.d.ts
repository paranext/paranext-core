declare module 'platform-enhanced-resources' {
  // Add extension types exposed on the papi for other extensions to use here
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    /**
     * Opens an Enhanced Resource viewer web view.
     *
     * @param webViewId Optional existing web view ID to reuse
     * @returns The web view ID of the opened Enhanced Resource viewer, or `undefined` if not opened
     */
    'platformEnhancedResources.openEnhancedResource': (
      webViewId: string | undefined,
    ) => Promise<string | undefined>;

    /**
     * Opens the Enhanced Resources Getting Started guide.
     *
     * @param webViewId Optional existing web view ID
     * @returns The web view ID of the guide, or `undefined` if not opened
     */
    'platformEnhancedResources.openGuide': (
      webViewId: string | undefined,
    ) => Promise<string | undefined>;
  }
}
