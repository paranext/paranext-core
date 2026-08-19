declare module 'paratext-registration' {
  import type {
    DataProviderDataType,
    IDataProvider,
    // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
    // The root tsconfig uses ./extensions/src as a typeRoot but doesn't include ./lib, so @papi/core
    // is unresolvable in the root context. The extensions workspace resolves it via ../../../lib.
    // This inline suppression matches the pattern in platform-scripture.d.ts, legacy-comment-manager.d.ts, etc.
  } from '@papi/core';

  /**
   * Paratext registry user information as used in `ParatextData.dll`
   *
   * Equivalent to C# `RegistrationData`
   */
  export type RegistrationData = {
    /** Registration name */
    name: string;
    /** Registration code */
    code: string;
    /** Email address of the user if any */
    email: string;
    /** Name of the user's supporter if any */
    supporterName: string;
  };

  /**
   * The server environment `ParatextData.dll` operates in. Selecting one picks the whole matching
   * set of back ends — Send/Receive archive, Paratext Registry, Paratext Live, and Digital Bible
   * Library — not just a single server. `ParatextData.dll` owns those mappings, and several
   * environments deliberately share a back end (for example, Development, Test, and
   * QualityAssurance all use the same registry).
   *
   * Equivalent to C# `ServerType`
   */
  export type ServerType = 'Production' | 'QualityAssurance' | 'Development' | 'Test';
  /**
   * How restricted or open the internet connection should be in `ParatextData.dll`
   *
   * Equivalent to C# `InternetUse`
   */
  export type InternetUse = 'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly';

  /**
   * Internet settings as used in `ParatextData.dll`
   *
   * Equivalent to C# `InternetAccess.InternetSettingsMemento`
   *
   * Note these settings only apply to operations that ParatextData.dll performs, not everything in
   * the whole application.
   */
  export type InternetSettings = {
    selectedServer: ServerType;
    permittedInternetUse: InternetUse;
    proxyPort: number;
    proxyHost?: string;
    proxyUsername?: string;
    proxyPassword?: string;
    proxyMode?: string;
    overrideDBLServer?: string;
    overrideDBLApiServer?: string;
    overrideGbcServer?: string;
    dblEmail?: string;
    dblPassword?: string;
  };

  /** Data types served by the Internet Settings data provider. Selector is unused (single object). */
  export type InternetSettingsDataTypes = {
    InternetSettings: DataProviderDataType<undefined, InternetSettings, InternetSettings>;
  };

  /**
   * Data provider for the ParatextData.dll internet settings. `useDataProvider` returns `undefined`
   * until it registers (a natural loading signal); `subscribeInternetSettings` is auto-generated.
   *
   * Note: these settings only apply to operations ParatextData.dll performs, not the whole app.
   * Note: passwords are returned masked as `********`, and the app must be restarted for changes to
   * fully take effect.
   */
  export type IInternetSettingsDataProvider = IDataProvider<InternetSettingsDataTypes>;
}

declare module 'papi-shared-types' {
  import type {
    RegistrationData,
    InternetSettings,
    IInternetSettingsDataProvider,
  } from 'paratext-registration';

  export interface CommandHandlers {
    /**
     * Show the Paratext Registration window with which the user can connect to the Paratext
     * Registry
     *
     * @returns Id of the registration web view
     */
    'paratextRegistration.showParatextRegistration': () => Promise<string | undefined>;
    /**
     * Show the Paratext Registration Internet Settings window with which the user defines internet
     * settings for connecting to the Paratext Registration
     *
     * @returns Id of the internet settings web view
     */
    'paratextRegistration.showInternetSettings': () => Promise<string | undefined>;
    /**
     * Gets information about user's current Paratext Registry user information in
     * `ParatextData.dll`
     *
     * Note that this does not return the user's registration code as it is secure information.
     * Instead, it returns `******-******-******-******-******` in its place.
     */
    'paratextRegistration.getParatextRegistrationData': () => Promise<RegistrationData>;
    /**
     * Sets information about user's current Paratext Registry user information in
     * `ParatextData.dll`
     *
     * Note: The application must be restarted after running this to properly reflect changes.
     *
     * @returns If successfully changed registration data
     * @throws If did not successfully change registration data
     */
    'paratextRegistration.setParatextRegistrationData': (
      newRegistrationData: RegistrationData,
    ) => Promise<void>;
    /**
     * Gets the validity status of the user's Paratext registration
     *
     * @returns True if the user has a valid Paratext registration, false otherwise
     */
    'paratextRegistration.doesUserHaveValidRegistration': () => Promise<boolean>;
    /**
     * Checks whether the given registration data, specifically the name and code, are valid
     *
     * @returns True if the registration data was valid, false otherwise
     */
    'paratextRegistration.validateParatextRegistrationData': (
      registrationData: RegistrationData,
    ) => Promise<boolean>;
    /**
     * @deprecated Use the `paratextRegistration.internetSettingsDataProvider` data provider's
     *   `getInternetSettings` instead. Retained as a thin wrapper for backward compatibility and
     *   will be removed in a future release.
     *
     *   Gets information about the user's current ParatextData.dll internet settings.
     *
     *   Note: these settings only apply to operations ParatextData.dll performs, not the whole app.
     *   Note that passwords are returned masked as `********`.
     */
    'paratextRegistration.getParatextDataInternetSettings': () => Promise<InternetSettings>;
    /**
     * @deprecated Use the `paratextRegistration.internetSettingsDataProvider` data provider's
     *   `setInternetSettings` instead. Retained as a thin wrapper for backward compatibility and
     *   will be removed in a future release.
     *
     *   Sets the user's ParatextData.dll internet settings.
     *
     *   Note: the application must be restarted after this to fully reflect changes.
     */
    'paratextRegistration.setParatextDataInternetSettings': (
      newInternetSettings: InternetSettings,
    ) => Promise<void>;
    /**
     * Gets the Paratext Registry website URL for the currently-selected server environment.
     *
     * @returns The registry site URL (e.g. `https://registry.paratext.org`) for the environment
     *   currently selected in ParatextData internet settings.
     */
    'paratextRegistration.getParatextRegistryUrl': () => Promise<string>;
  }

  export interface DataProviders {
    'paratextRegistration.internetSettingsDataProvider': IInternetSettingsDataProvider;
  }

  export interface SettingTypes {
    /**
     * @deprecated 22 July 2026. The startup registration prompt this controlled was replaced by the
     *   first-run gating overlay.
     */
    'paratextRegistration.shouldShowOnStartup': boolean;
  }
}
