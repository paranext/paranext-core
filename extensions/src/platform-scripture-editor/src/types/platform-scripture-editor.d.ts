declare module 'platform-scripture-editor' {}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    /**
     * Opens a new editor WebView and returns the WebView id
     *
     * @param projectId Optional project ID of the resource to open. Prompts the user to select a
     *   resource project if not provided
     * @returns WebView id for new editor WebView or `undefined` if the user canceled the dialog
     */
    'platformScriptureEditor.open': (
      projectId: string | undefined,
      isEditable: boolean,
    ) => Promise<string | undefined>;

    // add second command
  }
}
