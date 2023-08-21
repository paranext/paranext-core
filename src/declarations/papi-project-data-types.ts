declare module 'papi-project-data-types' {
  import type { DataProviderDataType } from 'shared/models/data-provider.model';
  import type { MandatoryProjectDataType } from '@shared/models/project-data-provider.model';
  import { VerseRef } from '@sillsdev/scripture';

  /** This is not yet a complete list of the data types available from Paratext projects. */
  export type ParatextStandardProjectDataTypes = MandatoryProjectDataType & {
    Book: DataProviderDataType<VerseRef, string | undefined, string>;
    Chapter: DataProviderDataType<VerseRef, string | undefined, string>;
    Verse: DataProviderDataType<VerseRef, string | undefined, string>;
  };

  /** This is just a simple example so we have more than one. It's not intended to be real. */
  export type NotesOnlyProjectDataTypes = MandatoryProjectDataType & {
    Notes: DataProviderDataType<string, string | undefined, string>;
  };

  /**
   * Data types for each project data provider supported by PAPI. Extensions can add more data types
   * with corresponding project data provider IDs by adding details to their `d.ts` file.
   *
   * @example
   * ```typescript
   * declare module 'papi-project-data-types' {
   *   export type MyProjectDataTypes = MandatoryProjectDataTypes & {
   *     MyProjectData1: DataProviderDataType<string, string, string>;
   *     MyProjectData2: DataProviderDataType<string, string, string>;
   *   }
   *
   *   export interface ProjectDataTypes {
   *     MyExtensionProjectTypeName: MyProjectDataTypes;
   *   }
   * }
   * ```
   */
  /** Data types associated with all types of projects */
  export interface ProjectDataTypes {
    ParatextStandard: ParatextStandardProjectDataTypes;
    NotesOnly: NotesOnlyProjectDataTypes;
  }
}
