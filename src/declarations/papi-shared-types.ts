declare module 'papi-shared-types' {
  import type { PlatformError, UnsubscriberAsync } from 'platform-bible-utils';
  import type {
    DataProviderDataType,
    DataProviderDataTypes,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
  } from '@shared/models/data-provider.model';
  import type {
    ExtensionDataScope,
    MandatoryProjectDataTypes,
    PROJECT_INTERFACE_PLATFORM_BASE,
    WithProjectDataProviderEngineExtensionDataMethods,
  } from '@shared/models/project-data-provider.model';
  import type {
    IDataProvider,
    IDisposableDataProvider,
  } from '@shared/models/data-provider.interface';
  import type { ExtractDataProviderDataTypes } from '@shared/models/extract-data-provider-data-types.model';
  import type {
    NetworkableObject,
    NetworkObjectDetails,
  } from '@shared/models/network-object.model';
  import type { ScrollGroupUpdateInfo } from '@shared/services/scroll-group.service-model';
  import type {
    CloseWebViewEvent,
    OpenWebViewEvent,
    UpdateWebViewEvent,
  } from '@shared/services/web-view.service-model';
  // Used in JSDocs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { WebViewFactory } from '@shared/models/web-view-factory.model';
  // Used in JSDocs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { IWebViewProvider } from '@shared/models/web-view-provider.model';
  import { WebViewId } from '@shared/models/web-view.model';

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
    /** Shut down the application */
    'platform.quit': () => Promise<void>;
    /** Restart the application */
    'platform.restart': () => Promise<void>;
    /** Get the operating system platform */
    'platform.getOSPlatform': () => Promise<string | undefined>;
    /** Get the current log file content for debugging purposes */
    'platform.getLogFileContent': () => Promise<string>;
    /** If the browser window is in full screen */
    'platform.isFullScreen': () => Promise<boolean>;
    /** Increase the zoom level of the entire UI */
    'platform.zoomIn': () => Promise<void>;
    /** Decrease the zoom level of the entire UI */
    'platform.zoomOut': () => Promise<void>;
    /** Open a browser to the platform's OpenRPC documentation */
    'platform.openDeveloperDocumentationUrl': () => Promise<void>;
    /**
     * Open a link in a new browser window. Like `window.open` in the frontend with
     * `target='_blank'` Consider using a visual indication along with this. E.g. for a menu
     * download the https://lucide.dev/icons/external-link icon, add it to your extension's assets
     * folder and use it like
     *
     * - `"iconPathAfter": "papi-extension://<yourExtension>/assets/icons/external-link.svg"`. We plan
     *   to provide a common set of icons via an API in the future.
     *
     * For a button that opens external urls add
     *
     * - `aria-label="{localizedStrings['%ariaLabel_opensInBrowser%']}"`
     * - Lucide icon `<ExternalLink />`
     */
    'platform.openWindow': (url: string) => Promise<void>;

    // These commands are provided in `web-view.service-host.ts`
    /** @deprecated 3 December 2024. Renamed to `platform.openSettings` */
    'platform.openProjectSettings': (webViewId: string) => Promise<void>;
    /** @deprecated 3 December 2024. Renamed to `platform.openSettings` */
    'platform.openUserSettings': () => Promise<void>;
    'platform.openSettings': (webViewId?: WebViewId) => Promise<void>;
    /** Open a dialog that displays essential information about the application */
    'platform.about': () => Promise<void>;
    /** Open Usersnap feedback form to submit an idea */
    'platform.usersnapSubmitIdea': () => Promise<void>;
    /** Open Usersnap feedback form to report an issue */
    'platform.usersnapReportIssue': () => Promise<void>;
    /** Check if a Usersnap form is currently open */
    'platform.isUsersnapFormCurrentlyOpen': () => Promise<boolean>;
    /** Call close function for Usersnap forms known to the application */
    'platform.closeOpenUsersnapForm': () => Promise<void>;

    // These commands are provided in `scroll-group-navigation.commands.ts` (renderer)
    /**
     * Navigate the active scroll group to the next chapter (rolls into the next book)
     *
     * @experimental This command is unstable and may change or disappear without notice
     */
    'platform.goToNextChapter': () => Promise<void>;
    /**
     * Navigate the active scroll group to the previous chapter (rolls into the previous book)
     *
     * @experimental This command is unstable and may change or disappear without notice
     */
    'platform.goToPreviousChapter': () => Promise<void>;
    /**
     * Navigate the active scroll group to the next book (chapter 1, verse 1)
     *
     * @experimental This command is unstable and may change or disappear without notice
     */
    'platform.goToNextBook': () => Promise<void>;
    /**
     * Navigate the active scroll group to the previous book (chapter 1, verse 1)
     *
     * @experimental This command is unstable and may change or disappear without notice
     */
    'platform.goToPreviousBook': () => Promise<void>;
    /**
     * Navigate the active scroll group to the next verse
     *
     * @experimental This command is unstable and may change or disappear without notice
     */
    'platform.goToNextVerse': () => Promise<void>;
    /**
     * Navigate the active scroll group to the previous verse
     *
     * @experimental This command is unstable and may change or disappear without notice
     */
    'platform.goToPreviousVerse': () => Promise<void>;
    /**
     * Open the appropriate Book Chapter Control (the active tab's if it shows one, else the top
     * toolbar's) and focus its input, ready for typing a reference
     *
     * @experimental This command is unstable and may change or disappear without notice
     */
    'platform.openBookChapterControl': () => Promise<void>;

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
    /**
     * List of locales to use when localizing the interface. First in the list receives highest
     * priority. Please always add 'en' (English) at the end when using this setting so everything
     * localizes to English if it does not have a localization in a higher-priority locale.
     */
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
    /** @deprecated 20 November 2025. */
    'platform.commentsEnabled': boolean;
    /**
     * Timeout in seconds for requests to be resolved before they are considered to have failed.
     *
     * If the timeout is set to 0, then requests will never timeout.
     */
    'platform.requestTimeout': number;
    /**
     * The zoom factor that applies to the entire application. 1.0 is the default. Allowed range is
     * 0.5 to 3.0.
     */
    'platform.zoomFactor': number;
    /**
     * The interface mode for the application. `simple` provides a streamlined experience, while
     * `power` exposes advanced features.
     *
     * WARNING: This setting is experimental. The default mode may change, available modes may
     * change, and new modes may be added in the future. Changing the modes available will not be
     * considered a breaking change until this warning is removed.
     *
     * @default `simple`
     */
    'platform.interfaceMode': 'simple' | 'power';
  }

  /**
   * Names for each user setting available on the papi.
   *
   * Automatically includes all extensions' user settings that are added to {@link SettingTypes}.
   *
   * @example 'platform.interfaceLanguage'
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
     * The BCP 47 language tag for the writing system of this project.
     *
     * @example 'en-GB'
     */
    'platform.languageTag': string;
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
     * Whether or not the primary content of the project is currently editable. If this is `false`,
     * ancillary data may still be editable. This is a project-wide "editable"; if this is `true`,
     * that does not necessarily mean it is editable by the current user.
     *
     * This setting is intended to be used as a central location to turn off all editing of the
     * primary content of the project temporarily. For example, an administrator of a Scripture
     * project may want to disable editing the Scripture text while allowing users to comment on the
     * project for a period of review.
     *
     * Each project may implement this differently. For Paratext Scripture projects, not editable
     * means the following are not editable:
     *
     * - Scripture text
     * - Inventory approval statuses
     * - Biblical terms renderings
     *
     * While most everything else on the project is still editable such as the following
     * (non-exhaustive):
     *
     * - Project comments
     * - Biblical terms renderings descriptions
     * - Project settings
     * - Project plan
     * - User permissions
     *
     * Note: not all of these editable rules are necessarily enforced on an API level for Paratext
     * Scripture projects; some rules may be enforced only in UI.
     *
     * This is a coarse, project-level approximation of "the user can edit the primary content of
     * this project" and currently doubles as our user-permissions proxy for editing primary project
     * data. In the future, using it to check for editing permissions will be replaced by
     * fine-grained user permissions.
     *
     * Use this setting when you need to determine whether **a project's primary content may be
     * edited**.
     *
     * For determining whether a project should be treated as a fully read-only published reference
     * / resource, use {@link ProjectSettingTypes['platform.isPublished'] | `platform.isPublished`}.
     * If the project is read-only or a published resource, this setting should be `false` and
     * {@link ProjectSettingTypes['platform.isPublished'] | `platform.isPublished`} should be
     * `true`.
     *
     * If `isPublished` is `true`, then `isEditable` should always be `false`.
     *
     * Defaults to `true`.
     */
    'platform.isEditable': boolean;
    /**
     * Whether this project has been published and is therefore not currently writeable in any way.
     *
     * A "published" project is one that has been packaged or delivered for use as a reference (e.g.
     * a Bible resource downloaded from DBL, a global-note-type resource). Nothing on a published
     * project is writeable — not the primary content or ancillary data.
     *
     * Use this setting when you need to:
     *
     * - Determine whether a project has been packaged/delivered in a way that it is intended to be
     *   used as a reference for consultation rather than a project that is actively being worked
     *   on.
     * - Determine whether ancillary data on a project (extension data, settings, etc.) may be
     *   modified. On a published project the answer is always "no"; on a non-published project it
     *   may still be "no" for other reasons but is at least not gated by publication.
     *
     * Do **not** use this setting as the sole gate on editing the primary content of a project —
     * that is what {@link ProjectSettingTypes['platform.isEditable'] | `platform.isEditable`} is
     * for. A non-published project may still have non-editable primary content for other reasons.
     *
     * If `isPublished` is `true`, then `isEditable` should always be `false`.
     *
     * Defaults to `false`.
     */
    'platform.isPublished': boolean;
    /**
     * Which way the project's text flows. 'ltr' = left-to-right; 'rtl' = right-to-left. '' or
     * undefined = left-to-right (may be changed in the future to detect). Defaults to ''. This is
     * generally derived from the language definition for the project's language code. Note that
     * additional string options may be added in the future, so handle accordingly. Adding
     * additional options will not be considered a breaking change.
     */
    'platform.textDirection': 'ltr' | 'rtl' | '' | undefined;
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
         * @param callback Function to run with the updated project setting value. If there is an
         *   error while retrieving the updated data, the function will run with a
         *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
         *   value to check if it is an error.
         * @param options Various options to adjust how the subscriber emits updates
         * @returns Unsubscriber to stop listening for updates
         */
        subscribeSetting: <ProjectSettingName extends ProjectSettingNames>(
          key: ProjectSettingName,
          callback: (value: ProjectSettingTypes[ProjectSettingName] | PlatformError) => void,
          options?: DataProviderSubscriberOptions,
        ) => Promise<UnsubscriberAsync>;
        /**
         * Subscribe to receive updates to an extension's project data identified by `dataScope` in
         * this project
         *
         * @param dataScope Information about what data is being referenced by the calling extension
         *   given to this Project Data Provider
         * @param callback Function to run with the updated data corresponding to the `dataScope`.
         *   If there is an error while retrieving the updated data, the function will run with a
         *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
         *   value to check if it is an error.
         * @param options Various options to adjust how the subscriber emits updates
         * @returns Unsubscriber to stop listening for updates
         */
        subscribeExtensionData(
          dataScope: ExtensionDataScope,
          callback: (extensionData: string | undefined | PlatformError) => void,
          options?: DataProviderSubscriberOptions,
        ): Promise<UnsubscriberAsync>;
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
    // These are examples. Feel free to take them out if we actually need to provide real ones in core
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

  /**
   * {@link NetworkableObject} types for each web view controller supported by PAPI. A Web View
   * Controller is a network object that represents a web view and whose methods facilitate
   * communication between its associated web view and extensions that want to interact with it.
   * `WebViewControllers` can be created by {@link IWebViewProvider} of the same `webViewType`.
   * Extensions can add web view controllers with corresponding `webViewType`s by adding details to
   * their `.d.ts` file and registering a web view controller in their web view provider's
   * `getWebView` function with `papi.webViewProviders.registerWebViewController`. If you want to
   * create web view controllers, we recommend you create a class derived from the abstract class
   * {@link WebViewFactory}, which automatically manage the lifecycle of the web view controllers for
   * you.
   *
   * Note: The keys of this interface are the `webViewType`s for the web views associated with these
   * web view controllers. They must consist of two strings separated by at least one period. We
   * recommend one period and lower camel case in case we expand the api in the future to allow dot
   * notation.
   *
   * An extension can extend this interface to add a type for the web view controller it registers
   * by adding the following to its `.d.ts` file (in this example, we are adding the
   * `'helloSomeone.peopleWebView'` web view controller type):
   *
   * @example
   *
   * ```typescript
   * declare module 'papi-shared-types' {
   *   export type PeopleWebViewController = NetworkableObject<{
   *     setSelectedPerson(name: string): Promise<boolean>;
   *     testRandomMethod(things: string): Promise<string>;
   *   }>;
   *
   *   export interface WebViewControllers {
   *     'helloSomeone.peopleWebView': PeopleWebViewController;
   *   }
   * }
   * ```
   */
  export interface WebViewControllers {
    // These are examples. Feel free to take them out if we actually need to provide real ones in core
    'platform.stuffWebView': NetworkableObject<{ doStuff(thing: string): Promise<boolean> }>;
    'platform.placeholderWebView': NetworkableObject<{
      runPlaceholderStuff(thing: string): Promise<boolean>;
    }>;
  }

  /**
   * `webViewType`s for each web view controller available on the papi.
   *
   * Automatically includes all extensions' web view controllers that are added to
   * {@link WebViewControllers}.
   *
   * @example 'platform.placeholderWebView'
   */
  export type WebViewControllerTypes = keyof WebViewControllers;

  // #endregion

  // #region Network Events

  /**
   * Network events emitted from multiple processes (each process emits its own local event under
   * the same name). Declared by the platform; not extensible by extensions.
   *
   * The names listed here are the source of truth for which event names use multi-source semantics
   * at the central registry. An event name in this type allows registration from multiple processes
   * (each process registers once, all emitters are valid sources). Any other event name uses
   * single-source semantics (one registrant ever).
   *
   * Subscribers do not need to know which events are multi-source — `getNetworkEvent` handles both
   * kinds identically.
   *
   * See {@link NetworkEvents} for the full registry of known event names.
   */
  export type MultiSourceNetworkEvents = {
    /**
     * Emitted when a network object is created in any process. Payload includes the new object's
     * details.
     */
    'object:onDidCreateNetworkObject': NetworkObjectDetails;
    /**
     * Emitted when a network object is disposed in any process. Payload is the disposed object's
     * ID.
     */
    'object:onDidDisposeNetworkObject': string;
  };

  /**
   * Mapping of network event names to their payload types. Extensions augment this to declare their
   * own events. Inherits the platform's multi-source events from {@link MultiSourceNetworkEvents}
   * automatically.
   *
   * To declare a new event for use with `createNetworkEventEmitterAsync`:
   *
   * ```ts
   * declare module 'papi-shared-types' {
   *   export interface NetworkEvents {
   *     'myExt.somethingHappened': { foo: string };
   *   }
   * }
   * ```
   *
   * Mark a single event as experimental by adding an `@experimental` JSDoc tag in a doc comment
   * directly above its entry.
   */
  export interface NetworkEvents extends MultiSourceNetworkEvents {
    /** Emitted when extensions finish reloading. `true` if reload succeeded, `false` if it failed. */
    'platform.onDidReloadExtensions': boolean;
    /** Emitted when the Scripture reference for a scroll group changes. */
    'scrollGroup:onDidUpdateScrRef': ScrollGroupUpdateInfo;
    /** @deprecated 13 November 2024. Use the `webView:onDidOpenWebView` event instead. */
    'webView:onDidAddWebView': OpenWebViewEvent;
    /** Emitted when a WebView is created. */
    'webView:onDidOpenWebView': OpenWebViewEvent;
    /** Emitted when a WebView is updated. */
    'webView:onDidUpdateWebView': UpdateWebViewEvent;
    /** Emitted when a WebView is closed. */
    'webView:onDidCloseWebView': CloseWebViewEvent;
  }

  /** Union of all known network event names (keys of {@link NetworkEvents}). */
  export type NetworkEventTypes = keyof NetworkEvents;

  // #endregion
}
