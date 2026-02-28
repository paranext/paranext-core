declare module 'platform-enhanced-resources' {
  // Add extension types exposed on the papi for other extensions to use here
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    /** Open an Enhanced Resource web view */
    'platformEnhancedResources.openEnhancedResource': (
      resourceId?: string,
    ) => Promise<string | undefined>;
  }
}
