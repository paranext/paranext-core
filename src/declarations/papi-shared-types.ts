declare module 'papi-shared-types' {
  import type { ScriptureReference, UnsubscriberAsync } from 'platform-bible-utils';
  import type {
    DataProviderDataType,
    DataProviderDataTypes,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
  } from '@shared/models/data-provider.model';
  import type {
    MandatoryProjectDataTypes,
    PROJECT_INTERFACE_PLATFORM_BASE,
    WithProjectDataProviderEngineExtensionDataMethods,
  } from '@shared/models/project-data-provider.model';
  import type { IDisposableDataProvider } from '@shared/models/data-provider.interface';
  import type IDataProvider from '@shared/models/data-provider.interface';
  import type ExtractDataProviderDataTypes from '@shared/models/extract-data-provider-data-types.model';

  // #region Commands

  // TODO: Adding an index type removes type checking on the key :( How do we make sure extensions provide only functions?
  /**
   * Function types for each command available on the papi. Each extension can extend this interface
   * to add commands that it registers on the papi with `papi.commands.registerCommand`.
   *
   * Note: Command names must consist of two strings separated by at least one period. We recommend
   * one period and lower camel case in case we expand the api in the future to allow dot notation.
   *
   * An extension can extend this interface to add types for the commands it registers by adding the
   * following to its `.d.ts` file:
   *
   * @example
   *
   * ```typescript
   * declare module 'papi-shared-types' {
   *   export interface CommandHandlers {
   *     'myExtension.myCommand1': (foo: string, bar: number) => string;
   *     'myExtension.myCommand2': (foo: string) => Promise<void>;
   *   }
   * }
   * ```
   */
  export interface CommandHandlers {
    // These commands are provided in `main.ts`. They are only here because I needed them to use in
    // other places, but building `papi-dts` wasn't working because it didn't see `main.ts`
    'test.echo': (message: string) => string;
    'test.echoExtensionHost': (message: string) => Promise<string>;
    'test.throwError': (message: string) => void;
    'platform.restartExtensionHost': () => Promise<void>;
    'platform.quit': () => Promise<void>;
    'platform.openProjectSettings': (webViewId: string) => Promise<void>;
    // These commands are provided in `extension-host.ts`. They are only here because I needed them to
    // use in other places, but building `papi-dts` wasn't working because it didn't see
    // `extension-host.ts`
    'test.addMany': (...nums: number[]) => number;
    'test.throwErrorExtensionHost': (message: string) => void;
  }

  /**
   * Names for each command available on the papi.
   *
   * Automatically includes all extensions' commands that are added to {@link CommandHandlers}.
   *
   * @example 'platform.quit';
   */
  export type CommandNames = keyof CommandHandlers;

  // #endregion

  // #region User Settings

  /**
   * Types corresponding to each user setting available in Platform.Bible. Keys are setting names,
   * and values are setting data types. Extensions can add more user setting types with
   * corresponding user setting IDs by adding details to their `.d.ts` file.
   *
   * Note: Setting names must consist of two strings separated by at least one period. We recommend
   * one period and lower camel case in case we expand the api in the future to allow dot notation.
   *
   * An extension can extend this interface to add types for the user settings it registers by
   * adding the following to its `.d.ts` file (in this example, we are adding the
   * `myExtension.highlightColor` setting):
   *
   * @example
   *
   * ```typescript
   * declare module 'papi-shared-types' {
   *   export interface SettingTypes {
   *     'myExtension.highlightColor': string | { r: number; g: number; b: number };
   *   }
   * }
   * ```
   */
  export interface SettingTypes {
    'platform.verseRef': ScriptureReference;
    'platform.interfaceLanguage': string[];
    /**
     * Mementos managed in the dotnet process and used for interacting with PtxUtils. Mementos are
     * persisted objects containing some data. They are stored as xml strings.
     */
    'platform.ptxUtilsMementoData': { [key: string]: string };
    /**
     * Tracking last S/R registry data cache time managed in the dotnet process and used for
     * interacting with ParatextData.
     */
    'platform.paratextDataLastRegistryDataCachedTimes': { [key: string]: string };
  }

  /**
   * Names for each user setting available on the papi.
   *
   * Automatically includes all extensions' user settings that are added to {@link SettingTypes}.
   *
   * @example 'platform.verseRef'
   */
  export type SettingNames = keyof SettingTypes;

  // #endregion

  // #region Project Settings

  /**
   * Types corresponding to each project setting available in Platform.Bible. Keys are project
   * setting names, and values are project setting data types. Extensions can add more project
   * setting types with corresponding project setting IDs by adding details to their `.d.ts` file.
   *
   * Note: Project setting names must consist of two strings separated by at least one period. We
   * recommend one period and lower camel case in case we expand the api in the future to allow dot
   * notation.
   *
   * An extension can extend this interface to add types for the project settings it registers by
   * adding the following to its `.d.ts` file (in this example, we are adding the
   * `myExtension.highlightColor` project setting):
   *
   * @example
   *
   * ```typescript
   * declare module 'papi-shared-types' {
   *   export interface ProjectSettingTypes {
   *     'myExtension.highlightColor': string | { r: number; g: number; b: number };
   *   }
   * }
   * ```
   */
  export interface ProjectSettingTypes {
    /**
     * Localized name of the language in which this project is written. This will be displayed
     * directly in the UI.
     *
     * @example 'English'
     */
    'platform.language': string;
    /**
     * Short name of the project (not necessarily unique). This will be displayed directly in the
     * UI.
     *
     * @example 'WEB'
     */
    'platform.name': string;
    /**
     * Localized full name of the project. This will be displayed directly in the UI.
     *
     * @example 'World English Bible'
     */
    'platform.fullName': string;
    /**
     * Whether or not the project is editable. This is a general "editable", not necessarily that it
     * is editable by the current user.
     *
     * Projects that are not editable are sometimes called "resources".
     */
    'platform.isEditable': boolean;
  }

  /**
   * Names for each user setting available on the papi.
   *
   * Automatically includes all extensions' user settings that are added to
   * {@link ProjectSettingTypes}.
   *
   * @example 'platform.fullName'
   */
  export type ProjectSettingNames = keyof ProjectSettingTypes;

  // #endregion

  // #region Project Data Provider

  /**
   * The `Setting` methods required for a Project Data Provider Engine to fulfill the requirements
   * of {@link MandatoryProjectDataTypes}'s `Setting` data type.
   */
  export type WithProjectDataProviderEngineSettingMethods<
    TProjectDataTypes extends DataProviderDataTypes,
  > = {
    /**
     * Set the value of the specified project setting on this project.
     *
     * Note for implementing: `setSetting` must call `papi.projectSettings.isValid` before allowing
     * the setting change.
     *
     * @param key The string id of the project setting to change
     * @param newSetting The value that is to be set to the project setting.
     * @returns Information that papi uses to interpret whether to send out updates. Defaults to
     *   `true` (meaning send updates only for this data type).
     * @throws If the setting validator failed.
     * @see {@link DataProviderUpdateInstructions} for more info on what to return
     */
    setSetting: <ProjectSettingName extends ProjectSettingNames>(
      key: ProjectSettingName,
      newSetting: ProjectSettingTypes[ProjectSettingName],
    ) => Promise<DataProviderUpdateInstructions<TProjectDataTypes & MandatoryProjectDataTypes>>;
    /**
     * Get the value of the specified project setting.
     *
     * Note: This is good for retrieving a project setting once. If you want to keep the value
     * up-to-date, use `subscribeSetting` instead, which can immediately give you the value and keep
     * it up-to-date.
     *
     * Note for implementing: `getSetting` must call `papi.projectSettings.getDefault` if this
     * project does not have a value for this setting
     *
     * @param key The string id of the project setting to get
     * @returns The value of the specified project setting. Returns default setting value if the
     *   project setting does not exist on the project.
     * @throws If no default value is available for the setting.
     */
    getSetting: <ProjectSettingName extends ProjectSettingNames>(
      key: ProjectSettingName,
    ) => Promise<ProjectSettingTypes[ProjectSettingName]>;
    /**
     * Deletes the specified project setting, setting it back to its default value.
     *
     * Note for implementing: `resetSetting` should remove the value for this setting for this
     * project such that calling `getSetting` later would cause it to call
     * `papi.projectSettings.getDefault` and return the default value.
     *
     * @param key The string id of the project setting to reset
     * @returns `true` if successfully reset the project setting, `false` otherwise
     */
    resetSetting: <ProjectSettingName extends ProjectSettingNames>(
      key: ProjectSettingName,
    ) => Promise<boolean>;
  };

  /**
   * An object on the papi for interacting with that project data. Created by the papi and layers
   * over an {@link IProjectDataProviderEngine} provided by an extension. Returned from getting a
   * project data provider with `papi.projectDataProviders.get`.
   *
   * Project Data Providers are a specialized version of {@link IDataProvider} that work with
   * projects by exposing methods according to a set of `projectInterface`s. For each project
   * available, a Project Data Provider Factory that supports that project with some set of
   * `projectInterface`s creates a new instance of a PDP with the supported `projectInterface`s.
   *
   * Often, these objects are Layering PDPs, meaning they manipulate data provided by Base PDPs
   * which actually control the saving and loading of the data. Base PDPs must implement
   * {@link IBaseProjectDataProvider}, which imposes additional requirements.
   *
   * See more information, including the difference between Base and Layering PDPs, at
   * {@link ProjectDataProviderInterfaces}.
   */
  export type IProjectDataProvider<TProjectDataTypes extends DataProviderDataTypes> =
    IDataProvider<TProjectDataTypes>;

  /**
   * An object on the papi for interacting with that project data. Created by the papi and layers
   * over an {@link IBaseProjectDataProviderEngine} provided by an extension. Sometimes returned from
   * getting a project data provider with `papi.projectDataProviders.get` (depending on if the PDP
   * supports the `platform.base` `projectInterface`).
   *
   * Project Data Providers are a specialized version of {@link IDataProvider} that work with
   * projects by exposing methods according to a set of `projectInterface`s. For each project
   * available, a Project Data Provider Factory that supports that project with some set of
   * `projectInterface`s creates a new instance of a PDP with the supported `projectInterface`s.
   *
   * Every Base PDP **must** fulfill the requirements of this interface in order to support the
   * methods the PAPI requires for interacting with project data.
   *
   * See more information, including the difference between Base and Layering PDPs, at
   * {@link ProjectDataProviderInterfaces}.
   */
  export type IBaseProjectDataProvider<TProjectDataTypes extends DataProviderDataTypes> =
    IProjectDataProvider<TProjectDataTypes & MandatoryProjectDataTypes> &
      WithProjectDataProviderEngineSettingMethods<TProjectDataTypes> &
      WithProjectDataProviderEngineExtensionDataMethods<TProjectDataTypes> & {
        /**
         * Subscribe to receive updates to the specified project setting.
         *
         * Note: By default, this `subscribeSetting` function automatically retrieves the current
         * project setting value and runs the provided callback as soon as possible. That way, if
         * you want to keep your data up-to-date, you do not also have to run `getSetting`. You can
         * turn this functionality off in the `options` parameter.
         *
         * @param key The string id of the project setting for which to listen to changes
         * @param callback Function to run with the updated project setting value
         * @param options Various options to adjust how the subscriber emits updates
         * @returns Unsubscriber to stop listening for updates
         */
        subscribeSetting: <ProjectSettingName extends ProjectSettingNames>(
          key: ProjectSettingName,
          callback: (value: ProjectSettingTypes[ProjectSettingName]) => void,
          options: DataProviderSubscriberOptions,
        ) => Promise<UnsubscriberAsync>;
      };

  /** This is just a simple example so we have more than one. It's not intended to be real. */
  export type NotesOnlyProjectDataTypes = MandatoryProjectDataTypes & {
    Notes: DataProviderDataType<string, string | undefined, string>;
  };

  /**
   * {@link IProjectDataProvider} types for each `projectInterface` supported by PAPI. Extensions can
   * add more Project Data Providers with corresponding `projectInterface`s by adding details to
   * their `.d.ts` file and registering a Project Data Provider factory with the corresponding
   * `projectInterface`.
   *
   * There are two types of Project Data Providers (and Project Data Provider Factories that serve
   * them):
   *
   * 1. Base Project Data Provider - provides project data via some `projectInterface`s for its own
   *    projects with **its own unique project ids**. These PDPs **must support the `platform.base`
   *    `projectInterface` by implementing {@link IBaseProjectDataProvider}**. More information
   *    below.
   * 2. Layering Project Data Provider - layers over other PDPs and provides additional
   *    `projectInterface`s for projects on other PDPs. Likely **does not provide its own unique
   *    project ids** but rather layers over base PDPs' project ids. These PDPs **do not need to
   *    support the `platform.base` `projectInterface` and should instead implement
   *    {@link IProjectDataProvider}**. Instead of providing projects themselves, they likely use the
   *    `ExtensionData` data type exposed via the `platform.base` `projectInterface` on Base PDPs to
   *    provide additional project data on top of Base PDPs.
   *
   * All Base Project Data Provider Interfaces' data types **must** implement
   * {@link IBaseProjectDataProvider} (which extends {@link MandatoryProjectDataTypes}) like in the
   * following example. Please see its documentation for information on how Project Data Providers
   * can implement this interface.
   *
   * Note: The keys of this interface are the `projectInterface`s for the associated Project Data
   * Provider Interfaces. `projectInterface`s represent standardized sets of methods on a PDP.
   *
   * WARNING: Each Base Project Data Provider **must** fulfill certain requirements for its
   * `getSetting`, `setSetting`, `resetSetting`, `getExtensionData`, and `setExtensionData` methods.
   * See {@link IBaseProjectDataProvider} and {@link MandatoryProjectDataTypes} for more information.
   *
   * An extension can extend this interface to add types for the Project Data Provider Interfaces
   * its registered factory provides by adding the following to its `.d.ts` file (in this example,
   * we are adding a Base Project Data Provider interface for the `MyExtensionBaseProjectInterface`
   * `projectInterface` and a Layering Project Data Provider interface for the
   * `MyExtensionLayeringProjectInterface` `projectInterface`):
   *
   * @example
   *
   * ```typescript
   * declare module 'papi-shared-types' {
   *   export type MyBaseProjectDataTypes = {
   *     MyProjectData: DataProviderDataType<string, string, string>;
   *   };
   *
   *   export type MyLayeringProjectDataTypes = {
   *     MyOtherProjectData: DataProviderDataType<number, number, number>;
   *   };
   *
   *   export interface ProjectDataProviderInterfaces {
   *     // Note that the base PDP implements `I**Base**ProjectDataProvider`
   *     MyExtensionBaseProjectInterface: IBaseProjectDataProvider<MyProjectDataTypes>;
   *     // Note that the layering PDP only implements `IProjectDataProvider` because the base PDP already
   *     // provides the `platform.base` data types
   *     MyExtensionLayeringProjectInterface: IProjectDataProvider<MyLayeringProjectDataTypes>;
   *   }
   * }
   * ```
   */
  export interface ProjectDataProviderInterfaces {
    /**
     * Base `projectInterface` that all PDPs that expose their own unique project ids must
     * implement.
     *
     * There should be a PDP that provides `platform.base` for all available project ids.
     */
    [PROJECT_INTERFACE_PLATFORM_BASE]: IBaseProjectDataProvider<MandatoryProjectDataTypes>;
    'platform.notesOnly': IProjectDataProvider<NotesOnlyProjectDataTypes>;
    'platform.placeholder': IProjectDataProvider<PlaceholderDataTypes>;
  }

  /**
   * Names for each `projectInterface` available on the papi. `projectInterface`s represent
   * standardized sets of methods on a PDP. Extensions can register a Project Data Provider Factory
   * with one or more `projectInterface`s to indicate that factory provides Project Data Providers
   * that have the methods associated with those `projectInterface`s.
   *
   * Automatically includes all extensions' `projectInterface`s that are added to
   * {@link ProjectDataProviderInterfaces}.
   *
   * @example 'platform.notesOnly'
   */
  export type ProjectInterfaces = keyof ProjectDataProviderInterfaces;

  /**
   * `DataProviderDataTypes` for each Project Data Provider Interface supported by PAPI. These are
   * the data types served by Project Data Providers for each `projectInterface`.
   *
   * Automatically includes all extensions' `projectInterface`s that are added to
   * {@link ProjectDataProviderInterfaces}.
   *
   * Note: The keys of this interface are the `projectInterface`s for the associated project data
   * provider interface data types. `projectInterface`s represent standardized sets of methods on a
   * PDP.
   *
   * @example
   *
   * ```typescript
   * ProjectInterfaceDataTypes['MyExtensionProjectInterfaceName'] => MandatoryProjectDataTypes & {
   *     MyProjectData: DataProviderDataType<string, string, string>;
   *   }
   * ```
   */
  export type ProjectInterfaceDataTypes = {
    [ProjectInterface in ProjectInterfaces]: ExtractDataProviderDataTypes<
      ProjectDataProviderInterfaces[ProjectInterface]
    >;
  };

  // #endregion

  // #region Data Provider

  type StuffDataTypes = { Stuff: DataProviderDataType<string, number, never> };

  type PlaceholderDataTypes = {
    Placeholder: DataProviderDataType<{ thing: number }, string[], number>;
  };

  /**
   * {@link IDataProvider} types for each data provider supported by PAPI. Extensions can add more
   * data providers with corresponding data provider IDs by adding details to their `.d.ts` file and
   * registering a data provider engine in their `activate` function with
   * `papi.dataProviders.registerEngine`.
   *
   * Note: Data Provider names must consist of two strings separated by at least one period. We
   * recommend one period and lower camel case in case we expand the api in the future to allow dot
   * notation.
   *
   * An extension can extend this interface to add types for the data provider it registers by
   * adding the following to its `.d.ts` file (in this example, we are adding the
   * `'helloSomeone.people'` data provider types):
   *
   * @example
   *
   * ```typescript
   * declare module 'papi-shared-types' {
   *   export type PeopleDataTypes = {
   *     Greeting: DataProviderDataType<string, string | undefined, string>;
   *     Age: DataProviderDataType<string, number | undefined, number>;
   *     People: DataProviderDataType<undefined, PeopleData, never>;
   *   };
   *
   *   export type PeopleDataMethods = {
   *     deletePerson(name: string): Promise<boolean>;
   *     testRandomMethod(things: string): Promise<string>;
   *   };
   *
   *   export type PeopleDataProvider = IDataProvider<PeopleDataTypes> & PeopleDataMethods;
   *
   *   export interface DataProviders {
   *     'helloSomeone.people': PeopleDataProvider;
   *   }
   * }
   * ```
   */
  export interface DataProviders {
    'platform.stuff': IDataProvider<StuffDataTypes>;
    'platform.placeholder': IDataProvider<PlaceholderDataTypes>;
  }

  /**
   * Names for each data provider available on the papi.
   *
   * Automatically includes all extensions' data providers that are added to {@link DataProviders}.
   *
   * @example 'platform.placeholder'
   */
  export type DataProviderNames = keyof DataProviders;

  /**
   * `DataProviderDataTypes` for each data provider supported by PAPI. These are the data types
   * served by each data provider.
   *
   * Automatically includes all extensions' data providers that are added to {@link DataProviders}.
   *
   * @example
   *
   * ```typescript
   * DataProviderTypes['helloSomeone.people'] => {
   *     Greeting: DataProviderDataType<string, string | undefined, string>;
   *     Age: DataProviderDataType<string, number | undefined, number>;
   *     People: DataProviderDataType<undefined, PeopleData, never>;
   *   }
   * ```
   */
  export type DataProviderTypes = {
    [DataProviderName in DataProviderNames]: ExtractDataProviderDataTypes<
      DataProviders[DataProviderName]
    >;
  };

  /**
   * Disposable version of each data provider type supported by PAPI. These objects are only
   * returned from `papi.dataProviders.registerEngine` - only the one who registers a data provider
   * engine is allowed to dispose of the data provider.
   *
   * Automatically includes all extensions' data providers that are added to {@link DataProviders}.
   */
  export type DisposableDataProviders = {
    [DataProviderName in DataProviderNames]: IDisposableDataProvider<
      DataProviders[DataProviderName]
    >;
  };

  // #endregion
}
