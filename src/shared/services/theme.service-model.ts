import {
  OnDidDispose,
  PlatformError,
  UnsubscriberAsync,
  ThemeDefinition,
} from 'platform-bible-utils';
import { IDataProvider } from '@shared/models/data-provider.interface';
import {
  DataProviderDataType,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { ThemeDefinitionsById } from '@shared/utils/themes-document-combiner';

/** JSDOC DESTINATION themeServiceDataProviderName */
export const themeServiceDataProviderName = 'platform.themeServiceDataProvider';
export const themeServiceObjectToProxy = Object.freeze({
  /**
   * JSDOC SOURCE themeServiceDataProviderName
   *
   * This name is used to register the theme service data provider on the papi. You can use this
   * name to find the data provider when accessing it using the useData hook
   */
  dataProviderName: themeServiceDataProviderName,
});

/** ThemeDataTypes handles getting and setting the application theme. */
export type ThemeDataTypes = {
  CurrentTheme: DataProviderDataType<undefined, ThemeDefinition, string>;
  ShouldMatchSystem: DataProviderDataType<undefined, boolean, boolean>;
  AllThemes: DataProviderDataType<undefined, ThemeDefinitionsById, never>;
};

declare module 'papi-shared-types' {
  export interface DataProviders {
    [themeServiceDataProviderName]: IThemeService;
  }
}

/**
 * JSDOC SOURCE themeService
 *
 * Service that allows to interact with the application theme.
 *
 * When accessing `papi.themes` from a WebView, it will have additional functionality. See
 * {@link IThemeServiceLocal}
 */
export type IThemeService = {
  /**
   * JSDOC SOURCE getCurrentTheme
   *
   * Retrieves the current theme information
   *
   * @param selector `undefined`. Does not have to be provided
   * @returns Information about the currently selected theme
   */
  getCurrentTheme(selector: undefined): Promise<ThemeDefinition>;
  /** JSDOC DESTINATION getCurrentTheme */
  getCurrentTheme(): Promise<ThemeDefinition>;

  /**
   * Sets the current theme. If `getShouldMatchSystem` is `true` and the current theme has a theme
   * pair of the type the system theme is set to, this will set the theme to the version of the
   * theme that matches the current system theme.
   *
   * @param newThemeId The string id of the theme to change to
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @throws If `newThemeId` is not a valid theme id
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setCurrentTheme(newThemeId: string): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;
  /**
   * Sets the current theme. If `getShouldMatchSystem` is `true` and the current theme has a theme
   * pair of the type the system theme is set to, this will set the theme to the version of the
   * theme that matches the current system theme.
   *
   * @param selector `undefined`. Does not have to be provided
   * @param newThemeId The string id of the theme to change to
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setCurrentTheme(
    selector: undefined,
    newThemeId: string,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;

  /**
   * Sets the current theme to the theme with the same name (other than suffix) and the opposite
   * type of the current theme.
   *
   * For example, `paratext-light` theme will flip to `paratext-dark`. `my-theme` will flip to
   * `my-theme-dark`.
   */
  flipTheme(): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;

  /**
   * Subscribes to updates of the current theme. Whenever the current theme changes, the callback
   * function is executed.
   *
   * @param selector `undefined`
   * @param callback The function that will be called whenever the current theme is updated. If
   *   there is an error while retrieving the updated data, the function will run with a
   *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this value
   *   to check if it is an error.
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber that should be called whenever the subscription should be deleted
   */
  subscribeCurrentTheme(
    selector: undefined,
    callback: (currentTheme: ThemeDefinition | PlatformError) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;

  /**
   * JSDOC SOURCE getShouldMatchSystem
   *
   * Retrieves whether the theme type should follow the system-wide theme (dark/light). If so, the
   * current theme will match the system-wide theme where possible.
   *
   * If the current theme gets set to a theme with the wrong type but with a theme pair that is the
   * right type, it will automatically change to that theme. If the system theme changes, the
   * current theme will automatically attempt to change to match it.
   *
   * @param selector `undefined`. Does not have to be provided
   * @returns Information about the currently selected theme
   */
  getShouldMatchSystem(selector: undefined): Promise<boolean>;
  /** JSDOC DESTINATION getShouldMatchSystem */
  getShouldMatchSystem(): Promise<boolean>;

  /**
   * Sets whether the theme type should follow the system-wide theme (dark/light).
   *
   * @param shouldMatchSystem Whether the theme type should follow the system-wide theme
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setShouldMatchSystem(
    shouldMatchSystem: boolean,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;
  /**
   * Sets whether the theme type should follow the system-wide theme (dark/light).
   *
   * @param selector `undefined`. Does not have to be provided
   * @param shouldMatchSystem Whether the theme type should follow the system-wide theme
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setShouldMatchSystem(
    selector: undefined,
    shouldMatchSystem: boolean,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;

  /**
   * Subscribes to updates of whether the theme type should follow the system-wide theme
   * (dark/light). Whenever `shouldMatchSystem` changes, the callback function is executed.
   *
   * @param selector `undefined`
   * @param callback The function that will be called whenever `shouldMatchSystem` is updated. If
   *   there is an error while retrieving the updated data, the function will run with a
   *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this value
   *   to check if it is an error.
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber that should be called whenever the subscription should be deleted
   */
  subscribeShouldMatchSystem(
    selector: undefined,
    callback: (shouldMatchSystem: boolean | PlatformError) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;

  /**
   * JSDOC SOURCE getAllThemes
   *
   * Retrieves information about all themes available in the app. These are provided by the platform
   * and by extensions.
   *
   * @param selector `undefined`. Does not have to be provided
   * @returns Information about the currently selected theme
   */
  getAllThemes(selector: undefined): Promise<ThemeDefinitionsById>;
  /** JSDOC DESTINATION getAllThemes */
  getAllThemes(): Promise<ThemeDefinitionsById>;

  /**
   * This data cannot be changed. Trying to use this setter this will always throw. Extensions can
   * provide themes in contributions
   */
  setAllThemes(
    selector: undefined,
    value: never,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;

  /**
   * Subscribes to updates of all themes available in the app. Whenever any theme data changes, the
   * callback function is executed.
   *
   * @param selector `undefined`
   * @param callback The function that will be called when a theme is added/updated/removed. If
   *   there is an error while retrieving the updated data, the function will run with a
   *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this value
   *   to check if it is an error.
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber that should be called whenever the subscription should be deleted
   */
  subscribeAllThemes(
    selector: undefined,
    callback: (allThemes: ThemeDefinitionsById | PlatformError) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;
} & OnDidDispose &
  IDataProvider<ThemeDataTypes> &
  typeof themeServiceObjectToProxy;

/** JSDOC DESTINATION themeService */
export type IThemeServiceLocal = IThemeService & {
  /** JSDOC DESTINATION getCurrentTheme */
  getCurrentThemeSync(): ThemeDefinition;
};
