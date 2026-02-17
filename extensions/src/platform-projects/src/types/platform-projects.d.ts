declare module 'platform-projects' {
  // Types exposed on the papi for other extensions to use
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'platformProjects.openProjectProperties': () => Promise<string | undefined>;

    /** Open the Project Name form to edit project identification fields */
    'platformProjects.openProjectName': () => Promise<string | undefined>;
  }
}
