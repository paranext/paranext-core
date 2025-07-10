import {
  ThemeDataTypes,
  IThemeService,
  themeServiceObjectToProxy,
  themeServiceDataProviderName,
  IThemeServiceLocal,
  CurrentThemeSpecifier,
  USER_THEME_FAMILY_PREFIX,
} from '@shared/services/theme.service-model';
import { dataProviderService } from '@shared/services/data-provider.service';
import { DataProviderEngine, IDataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import {
  createSyncProxyForAsyncObject,
  expandThemeContribution,
  deserialize,
  serialize,
  PlatformEvent,
  deepEqual,
  PlatformEventEmitter,
  ThemeFamiliesByIdExpanded,
  ThemeDefinitionExpanded,
  ThemeFamiliesById,
  AsyncVariable,
  UnsubscriberAsyncList,
  PlatformEventAsync,
  PlatformError,
  getErrorMessage,
  isPlatformError,
  startsWith,
  ThemeFamily,
} from 'platform-bible-utils';
import themesDataObject from '@shared/data/themes.data.json';
import { DEFAULT_THEME_FAMILY, DEFAULT_THEME_TYPE } from '@shared/data/platform.data';
import { themeDataService } from '@shared/services/theme-data.service';
import { logger } from '@shared/services/logger.service';

/** Raw un-expanded themes that are built into the software */
// We know this is the right data type because we write this data
// eslint-disable-next-line no-type-assertion/no-type-assertion
const THEMES_DATA_OBJECT = themesDataObject as ThemeFamiliesById;

/**
 * Runs {@link expandThemeContribution} on the provided theme families to expand them. Uses the
 * default built-in theme family to back up the `cssVariables` of the provided theme families
 *
 * @param themeFamiliesById Theme families to expand
 * @returns Expanded theme families
 */
function expandThemeFamiliesByIdWithDefault(
  themeFamiliesById: ThemeFamiliesById,
): ThemeFamiliesByIdExpanded {
  return expandThemeContribution(themeFamiliesById, THEMES_DATA_OBJECT[DEFAULT_THEME_FAMILY]);
}

/** Expanded Themes that are built into the software */
const BUILT_IN_THEMES: ThemeFamiliesByIdExpanded =
  expandThemeFamiliesByIdWithDefault(THEMES_DATA_OBJECT);

const defaultThemePossiblyUndefined = BUILT_IN_THEMES[DEFAULT_THEME_FAMILY]?.[DEFAULT_THEME_TYPE];
if (!defaultThemePossiblyUndefined)
  throw new Error(
    `Theme service host could not find the built-in default theme! Family ${DEFAULT_THEME_FAMILY} type ${DEFAULT_THEME_TYPE}. This should not happen.`,
  );
const DEFAULT_THEME: ThemeDefinitionExpanded = defaultThemePossiblyUndefined;

/** Gets name of user-defined theme family for the given number */
function getUserThemeFamilyName(themeNumber: number) {
  return `${USER_THEME_FAMILY_PREFIX}${themeNumber}`;
}

const defaultUserThemeFamilyPossiblyUndefined = THEMES_DATA_OBJECT[getUserThemeFamilyName(0)];
if (!defaultUserThemeFamilyPossiblyUndefined)
  throw new Error(
    `Theme service host could not find the built-in default user theme family! Family ${getUserThemeFamilyName(0)}. This should not happen.`,
  );
const DEFAULT_USER_THEME_FAMILY: ThemeFamily = defaultUserThemeFamilyPossiblyUndefined;

/**
 * Time from process start to consider to be still in startup and loading. For example, do not reset
 * theme to default until after this time.
 */
const STARTUP_TIME_MS = 30000;

// #region interacting with localStorage

const CURRENT_THEME_STORAGE_KEY = 'theme.service-host.currentTheme';

/** FOR LOADING ONLY! DO NOT USE */
const currentThemeSerialized = localStorage.getItem(CURRENT_THEME_STORAGE_KEY);
// Load the whole theme data from localStorage now, then we will retrieve the actual theme data for
// this theme when we can
/** Current application theme that should be applied at startup. Will not be used afterward */
const currentThemeFromLocalStorage: ThemeDefinitionExpanded = currentThemeSerialized
  ? deserialize(currentThemeSerialized)
  : DEFAULT_THEME;

function saveCurrentThemeToLocalStorage(newCurrentTheme: ThemeDefinitionExpanded) {
  localStorage.setItem(CURRENT_THEME_STORAGE_KEY, serialize(newCurrentTheme));
}

const SHOULD_MATCH_SYSTEM_STORAGE_KEY = 'theme.service-host.shouldMatchSystem';

/** FOR LOADING ONLY! DO NOT USE */
const shouldMatchSystemSerialized = localStorage.getItem(SHOULD_MATCH_SYSTEM_STORAGE_KEY);
/**
 * Whether the theme type (light/dark) should match the system theme at startup. Will not be used
 * afterward
 */
const shouldMatchSystemFromLocalStorage: boolean = shouldMatchSystemSerialized
  ? deserialize(shouldMatchSystemSerialized)
  : true;

function saveShouldMatchSystemToLocalStorage(newShouldMatchSystem: boolean) {
  localStorage.setItem(SHOULD_MATCH_SYSTEM_STORAGE_KEY, serialize(newShouldMatchSystem));
}

const USER_THEMES_STORAGE_KEY = 'theme.service-host.userThemes';

/** FOR LOADING ONLY! DO NOT USE */
const userThemesSerialized = localStorage.getItem(USER_THEMES_STORAGE_KEY);
/** User-defined theme families at startup. Will not be used afterward */
const userThemesFromLocalStorage: ThemeFamiliesById = {
  ...Object.fromEntries(
    Object.entries(THEMES_DATA_OBJECT).filter(([themeFamilyId]) =>
      startsWith(themeFamilyId, USER_THEME_FAMILY_PREFIX),
    ),
  ),
  ...(userThemesSerialized ? deserialize(userThemesSerialized) : {}),
};

function saveUserThemesToLocalStorage(newUserThemes: ThemeFamiliesById) {
  localStorage.setItem(USER_THEMES_STORAGE_KEY, serialize(newUserThemes));
}

// #endregion

const onDidChangeSystemThemeEmitter = new PlatformEventEmitter<'light' | 'dark'>();

/**
 * Get a media query on `window` for whether the current system theme is dark
 *
 * @returns Media query results for checking dark mode. Use `matches` to check if dark mode
 */
function getSystemDarkThemeMediaQuery(): MediaQueryList {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  return darkModeMediaQuery;
}

/**
 * Listen to the system theme change using media query on `window` and fire
 * {@link onDidChangeSystemThemeEmitter}
 *
 * @returns Unsubscriber to stop listening to system theme changes
 */
function listenToSystemThemeChanges() {
  const darkModeMediaQuery = getSystemDarkThemeMediaQuery();

  const emitUpdate = (event: MediaQueryListEvent) => {
    const newTheme = event.matches ? 'dark' : 'light';
    onDidChangeSystemThemeEmitter.emit(newTheme);
  };

  darkModeMediaQuery.addEventListener('change', emitUpdate);

  return {
    currentTheme: darkModeMediaQuery.matches ? 'dark' : 'light',
    unsubscribe: () => {
      darkModeMediaQuery.removeEventListener('change', emitUpdate);
    },
  };
}

class ThemeDataProviderEngine
  extends DataProviderEngine<ThemeDataTypes>
  implements IDataProviderEngine<ThemeDataTypes>
{
  private unsubscribeEventListeners = new UnsubscriberAsyncList('Theme Service Host');
  /** All Theme Data available to the application. `undefined` if not yet loaded. */
  #allThemeFamiliesById: ThemeFamiliesByIdExpanded | undefined;
  /**
   * Async Variable that resolves to the first `allThemeFamiliesById`. If `allThemeFamiliesById` is
   * `undefined`, await this variable.
   */
  #allThemeFamiliesByIdAsyncVariable: AsyncVariable<ThemeFamiliesByIdExpanded>;
  #isDisposed = false;

  // Actually private methods set in the constructor. These need to be real private methods to avoid
  // being put on the papi
  #saveCurrentTheme: (currentTheme: ThemeDefinitionExpanded) => void;
  #saveShouldMatchSystem: (shouldMatchSystem: boolean) => void;
  #saveUserThemes: (userThemes: ThemeFamiliesById) => void;

  constructor(
    public currentTheme: ThemeDefinitionExpanded,
    saveCurrentTheme: (currentTheme: ThemeDefinitionExpanded) => void,
    public shouldMatchSystem: boolean,
    saveShouldMatchSystem: (shouldMatchSystem: boolean) => void,
    onDidUpdateAllThemes: PlatformEventAsync<ThemeFamiliesByIdExpanded | PlatformError>,
    public currentSystemTheme: 'light' | 'dark',
    onDidChangeSystemTheme: PlatformEvent<'light' | 'dark'>,
    public userThemes: ThemeFamiliesById,
    saveUserThemes: (userThemes: ThemeFamiliesById) => void,
  ) {
    super();

    this.#saveCurrentTheme = saveCurrentTheme;
    this.#saveShouldMatchSystem = saveShouldMatchSystem;
    this.#saveUserThemes = saveUserThemes;

    this.#allThemeFamiliesByIdAsyncVariable = new AsyncVariable<ThemeFamiliesByIdExpanded>(
      'theme.service-host.allThemeFamiliesById',
      STARTUP_TIME_MS,
    );

    // Setup timeout to reset theme to default at end of startup if the current theme does not exist
    const resetThemeTimeout = setTimeout(async () => {
      if (this.#isDisposed) return;

      const allThemeFamiliesById = await this.#getAllThemeFamiliesByIdResolved();

      const updatedCurrentTheme =
        allThemeFamiliesById[this.currentTheme.themeFamilyId]?.[this.currentTheme.type];
      // If the current theme no longer exists, reset back to default
      if (!updatedCurrentTheme) {
        this.#resetCurrentThemeNoUpdate();
        this.notifyUpdate('CurrentTheme');
      }
    }, STARTUP_TIME_MS - performance.now());
    this.unsubscribeEventListeners.add(() => {
      clearTimeout(resetThemeTimeout);
      return true;
    });

    // Immediately subscribe to and get latest themes
    (async () => {
      try {
        const unsubscribe = await onDidUpdateAllThemes((allThemeFamilies) => {
          const dataTypesToUpdate = this.#updateAllThemeFamiliesNoUpdate(allThemeFamilies);
          // Notify others if theme data changed
          if (dataTypesToUpdate) this.notifyUpdate(dataTypesToUpdate);
        });
        // If disposed while awaiting this subscription, immediately unsubscribe
        if (this.#isDisposed) unsubscribe();
        else this.unsubscribeEventListeners.add(unsubscribe);
      } catch (e) {
        logger.warn(
          `Theme service failed to subscribe to onDidUpdateAllThemes: ${getErrorMessage(e)}`,
        );
      }
    })();

    // Listen to system theme change and update current theme
    const updateThemeToSystem = (newThemeType: 'light' | 'dark') => {
      this.currentSystemTheme = newThemeType;

      if (this.#tryMatchCurrentThemeTypeToSystemNoUpdate()) this.notifyUpdate('CurrentTheme');
    };
    updateThemeToSystem(currentSystemTheme);
    this.unsubscribeEventListeners.add(onDidChangeSystemTheme(updateThemeToSystem));
  }

  async getCurrentTheme(): Promise<ThemeDefinitionExpanded> {
    return this.currentTheme;
  }

  // Can be called with or without a selector
  async setCurrentTheme(
    newThemeSpecifierPossiblyUndefinedSelector?: CurrentThemeSpecifier,
    newThemeSpecifierPossiblyNotProvided?: CurrentThemeSpecifier,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>> {
    const newThemeSpecifier =
      newThemeSpecifierPossiblyUndefinedSelector ?? newThemeSpecifierPossiblyNotProvided;

    // Throw if no specifier or doesn't contain any information
    if (
      !newThemeSpecifier ||
      (!newThemeSpecifier.themeFamilyId &&
        newThemeSpecifier.themeFamilyId !== '' &&
        !newThemeSpecifier.type)
    )
      throw new Error('Theme specifier not provided or did not contain at least family id or type');

    // Backfill with current theme information so both are defined
    const newThemeSpecifierFilled = {
      themeFamilyId: this.currentTheme.themeFamilyId,
      type: this.currentTheme.type,
      ...newThemeSpecifier,
    };

    // If the specified theme is the current theme, no change
    if (
      newThemeSpecifierFilled.themeFamilyId === this.currentTheme.themeFamilyId &&
      newThemeSpecifierFilled.type === this.currentTheme.type
    )
      return false;

    const allThemeFamiliesById = await this.#getAllThemeFamiliesByIdResolved();

    const dataTypesToUpdate: DataProviderUpdateInstructions<ThemeDataTypes> = ['CurrentTheme'];

    const newTheme =
      allThemeFamiliesById[newThemeSpecifierFilled.themeFamilyId]?.[newThemeSpecifierFilled.type];
    if (!newTheme) throw new Error(`Theme definition not found for id ${newThemeSpecifier}`);

    // If we're currently matching system and change type, turn off matching system
    if (this.shouldMatchSystem && newThemeSpecifierFilled.type !== this.currentTheme.type) {
      this.#setShouldMatchSystemNoUpdate(false);
      dataTypesToUpdate.push('ShouldMatchSystem');
    }

    this.#setCurrentThemeNoUpdate(newTheme);
    return dataTypesToUpdate;
  }

  async getShouldMatchSystem(): Promise<boolean> {
    return this.shouldMatchSystem;
  }

  // Can be called with or without a selector
  async setShouldMatchSystem(
    newShouldMatchSystemPossiblyUndefinedSelector?: boolean,
    newShouldMatchSystemPossiblyNotProvided?: boolean,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>> {
    const newShouldMatchSystem =
      newShouldMatchSystemPossiblyUndefinedSelector ?? newShouldMatchSystemPossiblyNotProvided;
    if (newShouldMatchSystem === undefined) throw new Error('shouldMatchSystem not provided');
    if (newShouldMatchSystem === this.shouldMatchSystem) return false;

    const dataTypesToUpdate: DataProviderUpdateInstructions<ThemeDataTypes> = ['ShouldMatchSystem'];
    this.#setShouldMatchSystemNoUpdate(newShouldMatchSystem);

    // If we should match the system theme, flip the theme to the system-matching version in the same family
    if (this.#tryMatchCurrentThemeTypeToSystemNoUpdate()) dataTypesToUpdate.push('CurrentTheme');

    return dataTypesToUpdate;
  }

  async getAllThemes(): Promise<ThemeFamiliesByIdExpanded> {
    // TODO: SET UP TO WAIT FOR allThemeDefinitions
    return this.#allThemeFamiliesById ?? {};
  }

  // Can be called with or without a selector
  async setAllThemes(
    newUserThemesPossiblyUndefinedSelector?: Partial<ThemeFamiliesById>,
    newUserThemesPossiblyNotProvided?: Partial<ThemeFamiliesById>,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>> {
    const newUserThemes =
      newUserThemesPossiblyUndefinedSelector ?? newUserThemesPossiblyNotProvided;

    if (!newUserThemes) return false;

    // Reject if changing anything but user-defined families
    if (
      Object.keys(newUserThemes).some(
        (themeFamilyId) => !startsWith(themeFamilyId, USER_THEME_FAMILY_PREFIX),
      )
    )
      throw new Error(
        'Cannot set themes other than user-defined theme families. Extensions can provide their own themes in contributions',
      );

    // Fill in the provided partial user-defined themes so they are full themes
    const newUserThemesFilled = Object.fromEntries(
      Object.entries(newUserThemes).map(([themeFamilyId, newUserThemeFamily]) => [
        themeFamilyId,
        newUserThemeFamily
          ? {
              // Make sure the default theme types without `cssVariables` exist but overwrite with provided definitions
              ...Object.fromEntries(
                Object.entries(DEFAULT_USER_THEME_FAMILY).map(([type, defaultTheme]) => [
                  type,
                  defaultTheme
                    ? {
                        ...defaultTheme,
                        cssVariables: {},
                      }
                    : defaultTheme,
                ]),
              ),
              // Fill passed-in themes with default user theme definition contents so any new user themes have
              // the contents they need
              ...Object.fromEntries(
                Object.entries(newUserThemeFamily).map(([type, newUserTheme]) => [
                  type,
                  newUserTheme
                    ? {
                        // If there is no default user theme of this type, back-fill with default
                        // theme type but let it be overwritten by what is provided
                        ...DEFAULT_USER_THEME_FAMILY[DEFAULT_THEME_TYPE],
                        ...newUserTheme,
                        // If there is a default user theme of this type, fill with the default
                        // theme and overwrite what is provided
                        ...DEFAULT_USER_THEME_FAMILY[type],
                        // Keep only the provided cssVariables
                        cssVariables: {
                          ...newUserTheme?.cssVariables,
                        },
                      }
                    : newUserTheme,
                ]),
              ),
            }
          : newUserThemeFamily,
      ]),
    );

    // Write over the themes with the user-defined themes but let cssVariables be overwritten
    this.#setUserThemesNoUpdate({
      ...newUserThemesFilled,
      ...Object.fromEntries(
        Object.entries(this.userThemes).map(([themeFamilyId, existingUserThemeFamily]) => [
          themeFamilyId,
          existingUserThemeFamily
            ? {
                // Add in any newly provided user-defined themes
                ...newUserThemesFilled[themeFamilyId],
                // Preserve all existing user-defined themes but merge cssVariables from provided
                ...Object.fromEntries(
                  Object.entries(existingUserThemeFamily).map(([type, existingUserTheme]) => [
                    type,
                    existingUserTheme
                      ? {
                          ...newUserThemesFilled[themeFamilyId]?.[type],
                          ...existingUserTheme,
                          cssVariables: {
                            ...existingUserTheme.cssVariables,
                            ...newUserThemesFilled[themeFamilyId]?.[type]?.cssVariables,
                          },
                        }
                      : existingUserTheme,
                  ]),
                ),
              }
            : existingUserThemeFamily,
        ]),
      ),
    });

    return this.#updateAllThemeFamiliesNoUpdate(await this.#getAllThemeFamiliesByIdResolved());
  }

  async dispose(): Promise<boolean> {
    const success = await this.unsubscribeEventListeners.runAllUnsubscribers();

    if (!this.#allThemeFamiliesByIdAsyncVariable.hasSettled) {
      this.#allThemeFamiliesByIdAsyncVariable.rejectWithReason('Theme service host disposing');
    }

    this.#isDisposed = true;
    return success;
  }

  async #getAllThemeFamiliesByIdResolved(): Promise<ThemeFamiliesByIdExpanded> {
    return this.#allThemeFamiliesById ?? this.#allThemeFamiliesByIdAsyncVariable.promise;
  }

  #setCurrentThemeNoUpdate(newTheme: ThemeDefinitionExpanded) {
    this.currentTheme = newTheme;
    this.#saveCurrentTheme(this.currentTheme);
  }

  /** Sets current theme to default */
  #resetCurrentThemeNoUpdate() {
    return this.#setCurrentThemeNoUpdate(
      this.#allThemeFamiliesById?.[DEFAULT_THEME_FAMILY]?.[this.currentTheme.type] ?? DEFAULT_THEME,
    );
  }

  #setShouldMatchSystemNoUpdate(newShouldMatchSystem: boolean) {
    this.shouldMatchSystem = newShouldMatchSystem;
    this.#saveShouldMatchSystem(this.shouldMatchSystem);
  }

  #setUserThemesNoUpdate(newUserThemes: ThemeFamiliesById) {
    this.userThemes = newUserThemes;
    this.#saveUserThemes(this.userThemes);
  }

  /**
   * Returns the theme from the current theme family that matches the current system theme.
   *
   * @returns Theme from current theme family matching system theme or `undefined` if not found
   */
  #getCurrentThemeMatchingSystem(): ThemeDefinitionExpanded | undefined {
    return this.#allThemeFamiliesById?.[this.currentTheme.themeFamilyId]?.[this.currentSystemTheme];
  }

  /**
   * If we should match the system theme and there is a theme in the current family with the type
   * matching the system theme, set the current theme to the system-matching version in the same
   * family. Do nothing if we should not or cannot match current theme type to system.
   *
   * Does not send out any updates
   *
   * @returns `true` if changed the theme; `false` otherwise
   */
  #tryMatchCurrentThemeTypeToSystemNoUpdate(): boolean {
    const updatedCurrentThemeMatchingSystem = this.#getCurrentThemeMatchingSystem();
    if (
      !this.shouldMatchSystem ||
      this.currentTheme.type === this.currentSystemTheme ||
      !updatedCurrentThemeMatchingSystem
    )
      return false;

    this.#setCurrentThemeNoUpdate(updatedCurrentThemeMatchingSystem);
    return true;
  }

  /**
   * Update all theme families with the newly passed-in theme families. Adds the user-defined theme
   * families to the passed-in families.
   *
   * @param allThemeFamilies New set of all defined theme families except user-defined families
   * @returns Array of strings of what data types updated the theme successfully updated; `false`
   *   otherwise
   */
  #updateAllThemeFamiliesNoUpdate(
    allThemeFamilies: ThemeFamiliesByIdExpanded | PlatformError,
  ): DataProviderUpdateInstructions<ThemeDataTypes> {
    if (isPlatformError(allThemeFamilies)) {
      logger.warn(
        `Theme service host received PlatformError in updateAllThemeFamilies: ${getErrorMessage(allThemeFamilies)}`,
      );
      return false;
    }

    const allThemeFamiliesWithUserThemes = {
      ...allThemeFamilies,
      ...expandThemeFamiliesByIdWithDefault(this.userThemes),
    };

    if (!this.#allThemeFamiliesById)
      this.#allThemeFamiliesByIdAsyncVariable.resolveToValue(allThemeFamiliesWithUserThemes);
    this.#allThemeFamiliesById = allThemeFamiliesWithUserThemes;

    const dataTypesToUpdate: DataProviderUpdateInstructions<ThemeDataTypes> = ['AllThemes'];

    // If we should match the system theme, flip the theme to the system-matching version in the same family
    if (this.#tryMatchCurrentThemeTypeToSystemNoUpdate()) dataTypesToUpdate.push('CurrentTheme');
    else {
      const updatedCurrentTheme =
        this.#allThemeFamiliesById[this.currentTheme.themeFamilyId]?.[this.currentTheme.type];
      if (!updatedCurrentTheme) {
        if (performance.now() >= STARTUP_TIME_MS) {
          // The current theme no longer exists, and it's after startup time. Reset theme
          this.#resetCurrentThemeNoUpdate();
          this.notifyUpdate('CurrentTheme');
        }
      }
      // If the current theme's definition was updated, update it
      else if (!deepEqual(this.currentTheme, updatedCurrentTheme)) {
        this.#setCurrentThemeNoUpdate(updatedCurrentTheme);
        dataTypesToUpdate.push('CurrentTheme');
      }
    }

    return dataTypesToUpdate;
  }
}

const themeServiceEngine = new ThemeDataProviderEngine(
  currentThemeFromLocalStorage,
  saveCurrentThemeToLocalStorage,
  shouldMatchSystemFromLocalStorage,
  saveShouldMatchSystemToLocalStorage,
  async (allThemesHandler) => {
    return themeDataService.subscribeAllThemes(undefined, allThemesHandler);
  },
  getSystemDarkThemeMediaQuery().matches ? 'dark' : 'light',
  onDidChangeSystemThemeEmitter.event,
  userThemesFromLocalStorage,
  saveUserThemesToLocalStorage,
);

let initializationPromise: Promise<void>;
/** Need to run initialize before using this */
let dataProvider: IThemeService;
export async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const systemThemeChangesInfo = listenToSystemThemeChanges();

          dataProvider = await dataProviderService.registerEngine(
            themeServiceDataProviderName,
            themeServiceEngine,
          );

          dataProvider.onDidDispose(() => {
            systemThemeChangesInfo.unsubscribe();
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

/** This is an internal-only export for testing purposes and should not be used in development */
export const testingThemeService = {
  implementThemeDataProviderEngine: (
    currentTheme: ThemeDefinitionExpanded,
    saveCurrentTheme: () => void,
    shouldMatchSystem: boolean,
    saveShouldMatchSystem: (shouldMatchSystem: boolean) => void,
    onDidUpdateAllThemes: PlatformEventAsync<ThemeFamiliesByIdExpanded>,
    currentSystemTheme: 'light' | 'dark',
    onDidChangeSystemTheme: PlatformEvent<'light' | 'dark'>,
    userThemes: ThemeFamiliesById,
    saveUserThemes: (userThemes: ThemeFamiliesById) => void,
  ) => {
    return new ThemeDataProviderEngine(
      currentTheme,
      saveCurrentTheme,
      shouldMatchSystem,
      saveShouldMatchSystem,
      onDidUpdateAllThemes,
      currentSystemTheme,
      onDidChangeSystemTheme,
      userThemes,
      saveUserThemes,
    );
  },
};

const themeServiceEngineSyncAdditions = Object.freeze({
  ...themeServiceObjectToProxy,
  getCurrentThemeSync() {
    return themeServiceEngine.currentTheme;
  },
});

/**
 * Theme service that is available locally in the renderer only and can perform synchronous
 * operations
 */
// We are adding extra sync methods in the proxy-over object, so they will be available in the final
// object
// eslint-disable-next-line no-type-assertion/no-type-assertion
export const localThemeService = createSyncProxyForAsyncObject(async () => {
  await initialize();
  return dataProvider;
}, themeServiceEngineSyncAdditions) as IThemeServiceLocal;
