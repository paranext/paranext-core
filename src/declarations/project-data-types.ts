import type { DataProviderDataType } from 'shared/models/data-provider.model';
import type IDataProvider from 'shared/models/data-provider.interface';
import type IDataProviderEngine from 'shared/models/data-provider-engine.model';
import { VerseRef } from '@sillsdev/scripture';

/** All PDP data types must extend from this */
export type MandatoryProjectDataTypes = {
  ExtensionData: DataProviderDataType<string, string | undefined, string>;
};

/** This is not yet a complete list of the data types available from Paratext projects. */
export type ParatextStandardProjectDataTypes = MandatoryProjectDataTypes & {
  Book: DataProviderDataType<VerseRef, string | undefined, string>;
  Chapter: DataProviderDataType<VerseRef, string | undefined, string>;
  Verse: DataProviderDataType<VerseRef, string | undefined, string>;
};

/** This is just a simple example so we have more than one. It's not intended to be real. */
export type NotesOnlyProjectDataTypes = MandatoryProjectDataTypes & {
  Notes: DataProviderDataType<string, string | undefined, string>;
};

/**
 * Data types for each project data provider supported by PAPI. Extensions can add more data types
 * with corresponding project data provider IDs by adding details to their `d.ts` file.
 *
 * @example
 * ```typescript
 * declare module 'project-data-types' {
 *   export type MyProjectDataTypes = MandatoryProjectDataTypes & {
 *     myData: DataProviderDataType<string, string, string>;
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

/**
 * Identifiers for all project types supported by PAPI. These are not intended to correspond 1:1
 * to the set of project types available in Paratext.
 */
export type ProjectTypes = keyof ProjectDataTypes;

// This enforces all the keys match ProjectDataTypes
type IDataProviderEngineGeneric<T extends ProjectDataTypes> = {
  [K in keyof T]: IDataProviderEngine<T[K]>;
};

/** All possible types for ProjectDataProviderEngines: IDataProviderEngine<ProjectDataType> */
export type ProjectDataProviderEngineTypes = IDataProviderEngineGeneric<ProjectDataTypes>;

// This enforces all the keys match ProjectDataTypes
type IDataProviderGeneric<T extends ProjectDataTypes> = {
  [K in keyof T]: IDataProvider<T[K]>;
};

/** All possible types for ProjectDataProviders: IDataProvider<ProjectDataType> */
export type ProjectDataProviderTypes = IDataProviderGeneric<ProjectDataTypes>;
