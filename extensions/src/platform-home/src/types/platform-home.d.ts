declare module 'platform-home' {
  // Add extension types exposed on the papi for other extensions to use here
  // More instructions can be found in the README
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    /**
     * Opens a new Home web view and returns the WebView id
     *
     * @returns WebView id for new Home WebView or `undefined` if not created
     */
    'platformHome.openHome': () => Promise<string | undefined>;
  }
}
