declare module 'platform-projects' {
  // Types exposed on the papi for other extensions to use
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'platformProjects.openProjectProperties': () => Promise<string | undefined>;

    /** Open the Project Name form to edit project identification fields */
    'platformProjects.openProjectName': () => Promise<string | undefined>;

    /** Open the Language Settings dialog to configure language-specific settings */
    'platformProjects.openLanguageSettings': () => Promise<string | undefined>;

    /** Open the Choose Encoding dialog to select an encoding converter */
    'platformProjects.openChooseEncoding': () => Promise<string | undefined>;

    /** Open the Edit Filing Pattern dialog to customize book file naming */
    'platformProjects.openEditFilingPattern': () => Promise<string | undefined>;

    /** Open the Copy Books dialog to copy book files between projects */
    'platformProjects.openCopyBooks': () => Promise<string | undefined>;

    /** Open the Delete Books dialog to permanently delete book files from a project */
    'platformProjects.openDeleteBooks': () => Promise<string | undefined>;
  }
}
