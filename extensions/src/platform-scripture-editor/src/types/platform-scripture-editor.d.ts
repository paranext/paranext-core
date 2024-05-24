declare module 'platform-scripture-editor' {}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    /**
     * Opens a new editor WebView and returns the WebView id
     *
     * @param projectId Optional project ID of the project/resource to open. If a resource ID (not
     *   editable) is provided, this will properly open the resource viewer. Prompts the user to
     *   select a project if this parameter is not provided.
     * @returns WebView id for new editor WebView or `undefined` if the user canceled the dialog
     */
    'platformScriptureEditor.openScriptureEditor': (
      projectId?: string | undefined,
    ) => Promise<string | undefined>;

    /**
     * Opens a new read-only editor WebView and returns the WebView id
     *
     * @param projectId Optional project ID of the project/resource to open. If a project ID
     *   (editable) is provided, this will properly open the Scripture editor. Prompts the user to
     *   select a resource if this parameter is not provided.
     * @returns WebView id for new editor WebView or `undefined` if the user canceled the dialog
     */
    'platformScriptureEditor.openResourceViewer': (
      projectId?: string | undefined,
    ) => Promise<string | undefined>;
  }
}
