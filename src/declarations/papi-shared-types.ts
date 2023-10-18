declare module 'papi-shared-types' {
  import { ScriptureReference } from 'papi-components';
  import type { DataProviderDataType } from 'shared/models/data-provider.model';
  import type { MandatoryProjectDataType } from '@shared/models/project-data-provider.model';

  // TODO: Adding an index type removes type checking on the key :( How do we make sure extensions provide only functions?
  /**
   * Function types for each command available on the papi. Each extension can extend this interface
   * to add commands that it registers on the papi.
   *
   * Note: Command names must consist of two string separated by at least one period. We recommend
   * one period and lower camel case in case we expand the api in the future to allow dot notation.
   *
   * @example An extension can extend this interface to add types for the commands it registers by
   * adding the following to its `.d.ts` file:
   *
   * ```typescript
   * declare module 'papi-shared-types' {
       export interface CommandHandlers {
         'myExtension.myCommand1': (foo: string, bar: number) => string;
         'myExtension.myCommand2': (foo: string) => Promise<void>;
       }
     }
   * ```
   */
  export interface CommandHandlers {
    // These commands are provided in `main.ts`. They are only here because I needed them to use in
    // other places, but building `papi-dts` wasn't working because it didn't see `main.ts`
    'test.echo': (message: string) => string;
    'test.echoRenderer': (message: string) => Promise<string>;
    'test.echoExtensionHost': (message: string) => Promise<string>;
    'test.throwError': (message: string) => void;
    'platform.restartExtensionHost': () => Promise<void>;
    'platform.quit': () => Promise<void>;
    // These commands are provided in `extension-host.ts`. They are only here because I needed them to
    // use in other places, but building `papi-dts` wasn't working because it didn't see
    // `extension-host.ts`
    'test.addMany': (...nums: number[]) => number;
    'test.throwErrorExtensionHost': (message: string) => void;
  }

  /**
   * Names for each command available on the papi. Automatically includes all extensions' commands
   * that are added to {@link CommandHandlers}.
   *
   * Note: Command names must consist of two string separated by at least one period. We recommend
   * one period and lower camel case in case we expand the api in the future to allow dot notation.
   *
   * @example 'platform.quit'
   */
  export type CommandNames = keyof CommandHandlers;

  export interface SettingTypes {
    'platform.verseRef': ScriptureReference;
    // With only one key in this interface, `papi.d.ts` was baking in the literal string when
    // `SettingNames` was being used. Adding a placeholder key makes TypeScript generate `papi.d.ts`
    // correctly. When we add another setting, we can remove this placeholder.
    placeholder: null;
  }

  export type SettingNames = keyof SettingTypes;

  /** This is just a simple example so we have more than one. It's not intended to be real. */
  export type NotesOnlyProjectDataTypes = MandatoryProjectDataType & {
    Notes: DataProviderDataType<string, string | undefined, string>;
  };

  /**
   * Data types for each project data provider supported by PAPI. Extensions can add more data types
   * with corresponding project data provider IDs by adding details to their `d.ts` file. Note that
   * all project data types should extend `MandatoryProjectDataTypes` like the following example.
   *
   * @example
   * ```typescript
   * declare module 'papi-shared-types' {
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
  export interface ProjectDataTypes {
    NotesOnly: NotesOnlyProjectDataTypes;
    // With only one key in this interface, `papi.d.ts` was baking in the literal string when
    // `ProjectTypes` was being used. Adding a placeholder key makes TypeScript generate `papi.d.ts`
    // correctly. When we add another project data type, we can remove this placeholder.
    placeholder: MandatoryProjectDataType;
  }

  /**
   * Identifiers for all project types supported by PAPI. These are not intended to correspond 1:1
   * to the set of project types available in Paratext.
   */
  export type ProjectTypes = keyof ProjectDataTypes;
}
