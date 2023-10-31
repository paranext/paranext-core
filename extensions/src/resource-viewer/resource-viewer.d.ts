declare module 'resource-viewer' {}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    /**
     * Opens a new text Resource Viewer WebView and returns the WebView id
     * @param projectId optional project ID of the resource to open. Prompts the user to
     * select a resource project if not provided
     * @returns WebView id for new Resource Viewer WebView or `null` if the user canceled the dialog
     */
    'resourceViewer.open': (projectId: string | undefined) => Promise<string | null | undefined>;
  }
}
