declare module 'paratext-registration' {
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
   * Set of servers to which to connect in `ParatextData.dll`
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
}

declare module 'papi-shared-types' {
  import type { RegistrationData, InternetSettings } from 'paratext-registration';

  export interface CommandHandlers {
    /**
     * Show the Paratext Registration window with which the user can connect to the Paratext
     * Registry
     *
     * @returns Id of the registration web view
     */
    'paratextRegistration.showParatextRegistration': () => Promise<string | undefined>;
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
     * Gets information about user's current ParatextData.dll internet settings
     *
     * Note: These settings only apply to operations that ParatextData.dll performs, not everything
     * in the whole application.
     *
     * Note that this does not return the passwords in internet settings as they are secure
     * information. Instead, it returns `********` in their place.
     */
    'paratextRegistration.getParatextDataInternetSettings': () => Promise<InternetSettings>;
    /**
     * Sets information about user's current ParatextData.dll internet settings
     *
     * Note: These settings only apply to operations that ParatextData.dll performs, not everything
     * in the whole application.
     *
     * Note: The application must be restarted after running this to properly reflect changes.
     *
     * @returns If successfully changed ParatextData.dll internet settings
     * @throws If did not successfully change ParatextData.dll internet settings
     */
    'paratextRegistration.setParatextDataInternetSettings': (
      newRegistrationData: InternetSettings,
    ) => Promise<void>;
    /**
     * Gets the validity status of the user's Paratext registration
     *
     * @returns True if the user has a valid Paratext registration, false otherwise
     */
    'paratextRegistration.doesUserHaveValidRegistration': () => Promise<boolean>;
  }

  export interface SettingTypes {
    /**
     * Whether to show the form to enter Paratext Registration information when the application
     * starts if it has not been entered previously
     */
    'paratextRegistration.shouldShowOnStartup': boolean;
  }
}
