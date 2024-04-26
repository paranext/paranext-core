declare module 'platform-scripture-editor' {}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    /**
     * Opens a new editor WebView and returns the WebView id
     *
     * @param projectId Optional project ID of the resource to open. Prompts the user to select a
     *   resource project if not provided
     * @param isReadOnly True if the editor should be opened in read-only mode
     * @returns WebView id for new editor WebView or `undefined` if the user canceled the dialog
     */
    'platformScriptureEditor.openScriptureEditor': (
      projectId: string | undefined,
      isReadOnly: boolean,
    ) => Promise<string | undefined>;

    /**
     * Opens a new read-only editor WebView and returns the WebView id
     *
     * @param projectId Optional project ID of the resource to open. Prompts the user to select a
     *   resource project if not provided
     * @param isReadOnly True if the editor should be opened in read-only mode
     * @returns WebView id for new editor WebView or `undefined` if the user canceled the dialog
     */
    'platformScriptureEditor.openResourceViewer': (
      projectId: string | undefined,
      isReadOnly: boolean,
    ) => Promise<string | undefined>;
  }
}
