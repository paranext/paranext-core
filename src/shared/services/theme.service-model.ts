import {
  OnDidDispose,
  PlatformError,
  UnsubscriberAsync,
  ThemeDefinitionExpanded,
  ThemeFamiliesByIdExpanded,
  ThemeFamiliesById,
} from 'platform-bible-utils';
import { IDataProvider } from '@shared/models/data-provider.interface';
import {
  DataProviderDataType,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';

/** JSDOC DESTINATION USER_THEME_FAMILY_PREFIX */
export const USER_THEME_FAMILY_PREFIX = 'user-';

/**
 * `localStorage` key the current application theme is persisted under.
 *
 * Named here rather than in the host because two processes spell it: main's host, which owns the
 * store, and the renderer, whose one-time handover reads the copy left in its own `localStorage`
 * from when a renderer held this state. Those are two different stores under one key name, and the
 * handover only finds anything if the name stays identical in both.
 *
 * @experimental
 */
export const CURRENT_THEME_STORAGE_KEY = 'theme.service-host.currentTheme';

/**
 * `localStorage` key the setting for matching the system-wide light/dark theme is persisted under.
 * Spelled in two processes for the same reason as {@link CURRENT_THEME_STORAGE_KEY}.
 *
 * @experimental
 */
export const SHOULD_MATCH_SYSTEM_STORAGE_KEY = 'theme.service-host.shouldMatchSystem';

/**
 * `localStorage` key the user-defined theme families are persisted under. Spelled in two processes
 * for the same reason as {@link CURRENT_THEME_STORAGE_KEY}.
 *
 * @experimental
 */
export const USER_THEMES_STORAGE_KEY = 'theme.service-host.userThemes';

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

  /**
   * JSDOC SOURCE USER_THEME_FAMILY_PREFIX
   *
   * Prefix on theme families that are specifically user-defined theme families that can be edited
   * live instead of being provided by an extension
   */
  USER_THEME_FAMILY_PREFIX,
});

/**
 * Object containing any/all of the identifying information for a theme.
 *
 * Use this when setting the current theme. Can set just theme family, just theme type, or both
 */
export type CurrentThemeSpecifier = {
  /** Which theme family to change to. Does not change `shouldMatchSystem` */
  themeFamilyId?: string;
  /**
   * Which theme type to change to (e.g. 'light', 'dark'). If this does not match system theme, sets
   * `shouldMatchSystem` to false
   */
  type?: string;
};

/**
 * The theme state that survives an app restart: the current theme, whether the theme type follows
 * the system-wide light/dark setting, and the user-defined theme families. Every member is optional
 * because this describes what a store happened to hold, and a store that predates the theme service
 * host can be missing any of them.
 *
 * @experimental
 */
export type PersistedThemeState = {
  /** The current application theme, or `undefined` if none was stored */
  currentTheme?: ThemeDefinitionExpanded;
  /** Whether the theme type follows the system-wide theme, or `undefined` if none was stored */
  shouldMatchSystem?: boolean;
  /** The user-defined theme families, or `undefined` if none were stored */
  userThemes?: ThemeFamiliesById;
};

/** ThemeDataTypes handles getting and setting the application theme. */
export type ThemeDataTypes = {
  CurrentTheme: DataProviderDataType<undefined, ThemeDefinitionExpanded, CurrentThemeSpecifier>;
  ShouldMatchSystem: DataProviderDataType<undefined, boolean, boolean>;
  AllThemes: DataProviderDataType<undefined, ThemeFamiliesByIdExpanded, Partial<ThemeFamiliesById>>;
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
  getCurrentTheme(selector: undefined): Promise<ThemeDefinitionExpanded>;
  /** JSDOC DESTINATION getCurrentTheme */
  getCurrentTheme(): Promise<ThemeDefinitionExpanded>;

  /**
   * Sets the current theme family and/or type.
   *
   * @param newThemeSpecifier Which theme family and/or type to set to. See
   *   {@link CurrentThemeSpecifier} for more info
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @throws If `newThemeSpecifier` specified theme family or type that do not exist
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setCurrentTheme(
    newThemeSpecifier: CurrentThemeSpecifier,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;
  /**
   * Sets the current theme family and/or type.
   *
   * @param selector `undefined`. Does not have to be provided
   * @param newThemeSpecifier Which theme family and/or type to set to. See
   *   {@link CurrentThemeSpecifier} for more info
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @throws If `newThemeSpecifier` specified theme family or type that do not exist
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setCurrentTheme(
    selector: undefined,
    newThemeSpecifier: CurrentThemeSpecifier,
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
  subscribeCurrentTheme(
    selector: undefined,
    callback: (currentTheme: ThemeDefinitionExpanded | PlatformError) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;

  /**
   * JSDOC SOURCE getShouldMatchSystem
   *
   * Retrieves whether the theme type should follow the system-wide theme (dark/light). If so, the
   * current theme will match the system-wide theme where possible.
   *
   * If the system theme changes, the current theme will automatically change to match it if there
   * is a theme with the matching type in the currently selected theme family.
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
   * Sets partial theme definition information (can only provide `cssVariables`). Only allowed to
   * set user-defined themes (themes whose family id starts with {@link USER_THEME_FAMILY_PREFIX}).
   * Extensions can provide their own themes in contributions
   *
   * @param updatedUserThemeFamilies Partial {@link ThemeFamiliesById} consisting of any desired
   *   updates to user-defined themes.
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @throws If theme families not starting with {@link USER_THEME_FAMILY_PREFIX} are passed in
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setAllThemes(
    updatedUserThemeFamilies: Partial<ThemeFamiliesById>,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>>;
  /**
   * Sets partial theme definition information (can only provide `cssVariables`). Only allowed to
   * set user-defined themes (themes whose family id starts with {@link USER_THEME_FAMILY_PREFIX}).
   * Extensions can provide their own themes in contributions
   *
   * @param selector `undefined`. Does not have to be provided
   * @param updatedUserThemeFamilies Partial {@link ThemeFamiliesById} consisting of any desired
   *   updates to user-defined themes.
   * @returns `true` or an array of strings if the theme successfully updated; `false` otherwise
   * @throws If theme families not starting with {@link USER_THEME_FAMILY_PREFIX} are passed in
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setAllThemes(
    selector: undefined,
    updatedUserThemeFamilies: Partial<ThemeFamiliesById>,
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
    callback: (allThemes: ThemeFamiliesByIdExpanded | PlatformError) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;
} & OnDidDispose &
  IDataProvider<ThemeDataTypes> &
  typeof themeServiceObjectToProxy;

/** JSDOC DESTINATION themeService */
export type IThemeServiceLocal = IThemeService & {
  /** JSDOC DESTINATION getCurrentTheme */
  getCurrentThemeSync(): ThemeDefinitionExpanded;
};

/**
 * Theme operations that exist for the platform's own state-keeping rather than for consumers. They
 * are deliberately kept off {@link IThemeService}, so `papi.themes` does not offer them.
 *
 * That is the whole guarantee, and it is a discoverability one rather than a privacy one: these
 * ride on the same data provider as {@link IThemeService} under the same name, so any process that
 * resolves the provider itself can call them. That reachability is why they are `@experimental` on
 * both surfaces (TSDoc here, `x-experimental` in the registration's OpenRPC document) rather than
 * pretending to be private.
 *
 * @experimental
 */
export interface IThemeServiceInternal {
  /**
   * Hand over theme state persisted somewhere the host cannot read, so the host can adopt it into
   * its own store. Idempotent: the first offer to be adopted wins and every later one is refused,
   * so several callers offering their own copies cannot interleave into a mixture of them.
   *
   * Resolving is terminal for the caller either way: `true` means the state now lives in the host's
   * store, `false` means the host already has state that beats the offer (or the offer carried
   * nothing usable). In both cases the caller's copy is dead and should be discarded. A rejection
   * means neither — the offer can be made again.
   *
   * @param state Previously persisted theme state
   * @returns `true` if the offer was adopted, `false` if it was refused
   * @experimental
   */
  migrateStoredThemeState(state: PersistedThemeState): Promise<boolean>;
}

/**
 * Everything the theme service host registers on its data provider: what consumers call plus the
 * platform's own state-keeping operations.
 *
 * @experimental
 */
export type IThemeHostService = IThemeService & IThemeServiceInternal;
