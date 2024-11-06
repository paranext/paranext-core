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
}

declare module 'papi-shared-types' {
  import type { RegistrationData } from 'paratext-registration';

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
     * `ParatextData.dll` and restarts the application.
     *
     * @returns If successfully changed registration data
     * @throws If did not successfully change registration data
     */
    'paratextRegistration.setParatextRegistrationData': (
      newRegistrationData: RegistrationData,
    ) => Promise<void>;
  }

  export interface SettingTypes {
    /**
     * Whether to show the form to enter Paratext Registration information when the application
     * starts if it has not been entered previously
     */
    'paratextRegistration.shouldShowOnStartup': boolean;
  }
}
