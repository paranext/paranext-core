import {
  OnDidDispose,
  UnsubscriberAsync,
  PlatformError,
  ThemeFamiliesByIdExpanded,
} from 'platform-bible-utils';
import {
  DataProviderDataType,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { IDataProvider } from './papi-core.service';

/** JSDOC DESTINATION themeDataServiceProviderName */
export const themeDataServiceProviderName = 'platform.themeDataServiceDataProvider';
export const themeDataServiceObjectToProxy = Object.freeze({
  /**
   * JSDOC SOURCE themeDataServiceProviderName
   *
   * This name is used to register the theme data data provider on the papi. You can use this name
   * to find the data provider when accessing it using the useData hook
   */
  dataProviderName: themeDataServiceProviderName,
});

// Data Type to initialize data provider engine with
export type ThemeDataDataTypes = {
  AllThemes: DataProviderDataType<undefined, ThemeFamiliesByIdExpanded, never>;
};

declare module 'papi-shared-types' {
  export interface DataProviders {
    [themeDataServiceProviderName]: IThemeDataService;
  }
}

// This could probably be combined with the IThemeService one day once we have CachedDataProviders.
// Maybe the only reason to have that on the frontend is the caching. Probably needs more thought.
/**
 * JSDOC SOURCE themeDataService
 *
 * Service that provides aggregated theme contributions from the platform and extensions. Serves
 * theme contribution info to the theme service
 */
export type IThemeDataService = {
  /**
   * JSDOC SOURCE getAllThemes
   *
   * Retrieves information about all themes (including theme families) available in the app. These
   * are provided by the platform and by extensions.
   *
   * @param selector `undefined`. Does not have to be provided
   * @returns Information about the currently selected theme
   */
  getAllThemes(selector: undefined): Promise<ThemeFamiliesByIdExpanded>;
  /** JSDOC DESTINATION getAllThemes */
  getAllThemes(): Promise<ThemeFamiliesByIdExpanded>;

  /**
   * This data cannot be changed. Trying to use this setter this will always throw. Extensions can
   * provide themes in contributions
   */
  setAllThemes(
    selector: undefined,
    value: never,
  ): Promise<DataProviderUpdateInstructions<ThemeDataDataTypes>>;

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
    callback: (allThemes: ThemeFamiliesByIdExpanded | PlatformError) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;
} & OnDidDispose &
  typeof themeDataServiceObjectToProxy &
  IDataProvider<ThemeDataDataTypes>;
