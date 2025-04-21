import { OnDidDispose, PlatformError, UnsubscriberAsync, ThemeData } from 'platform-bible-utils';
import { IDataProvider } from '@shared/models/data-provider.interface';
import {
  DataProviderDataType,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';

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

export type AllThemeData = { [themeId: string]: ThemeData | undefined };

/** ThemeDataTypes handles getting and setting the application theme. */
export type ThemeDataTypes = {
  CurrentTheme: DataProviderDataType<undefined, ThemeData, string>;
  ShouldMatchSystem: DataProviderDataType<undefined, boolean, boolean>;
  AllThemes: DataProviderDataType<undefined, AllThemeData, never>;
};

declare module 'papi-shared-types' {
  export interface DataProviders {
    [themeServiceDataProviderName]: IThemeService;
  }
}

/**
 * JSDOC SOURCE themeService
 *
 * Service that allows to interact with the application theme
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
  getCurrentTheme(selector: undefined): Promise<ThemeData>;
  /** JSDOC DESTINATION getCurrentTheme */
  getCurrentTheme(): Promise<ThemeData>;

  /**
   * Sets the current theme
   *
   * @param newThemeId The string id of the theme to change to
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setCurrentTheme(newThemeId: string): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;
  /**
   * Sets the current theme
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
    callback: (currentTheme: ThemeData | PlatformError) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;

  /**
   * JSDOC SOURCE getShouldMatchSystem
   *
   * TODO: UPDATE ShouldMatchSystem TSDocs BEFORE MERGE!!
   *
   * Retrieves the current theme information
   *
   * @param selector `undefined`. Does not have to be provided
   * @returns Information about the currently selected theme
   */
  getShouldMatchSystem(selector: undefined): Promise<boolean>;
  /** JSDOC DESTINATION getShouldMatchSystem */
  getShouldMatchSystem(): Promise<boolean>;

  /**
   * Sets the current theme
   *
   * @param newThemeId The string id of the theme to change to
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setShouldMatchSystem(
    shouldMatchSystem: boolean,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;
  /**
   * Sets the current theme
   *
   * @param selector `undefined`. Does not have to be provided
   * @param newThemeId The string id of the theme to change to
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setShouldMatchSystem(
    selector: undefined,
    shouldMatchSystem: boolean,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;

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
  subscribeShouldMatchSystem(
    selector: undefined,
    callback: (shouldMatchSystem: boolean | PlatformError) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;

  /**
   * JSDOC SOURCE getAllThemes
   *
   * TODO: UPDATE AllThemes TSDocs BEFORE MERGE!!
   *
   * Retrieves the current theme information
   *
   * @param selector `undefined`. Does not have to be provided
   * @returns Information about the currently selected theme
   */
  getAllThemes(selector: undefined): Promise<AllThemeData>;
  /** JSDOC DESTINATION getAllThemes */
  getAllThemes(): Promise<AllThemeData>;

  /**
   * This data cannot be changed. Trying to use this setter this will always throw. Extensions can
   * provide themes in contributions
   *
   * @param selector `undefined`. Does not have to be provided
   * @param value
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setAllThemes(
    selector: undefined,
    value: never,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;

  /**
   * Subscribes to updates of the current theme. Whenever the current theme changes, the callback
   * function is executed.
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
    callback: (allThemes: AllThemeData | PlatformError) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;
} & OnDidDispose &
  IDataProvider<ThemeDataTypes> &
  typeof themeServiceObjectToProxy;
