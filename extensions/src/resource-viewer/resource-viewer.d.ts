declare module 'resource-viewer' {}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'resourceViewer.open': () => void;
  }
}
