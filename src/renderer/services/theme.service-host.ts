import {
  ThemeDataTypes,
  IThemeService,
  themeServiceObjectToProxy,
  themeServiceDataProviderName,
  IThemeServiceLocal,
  CurrentThemeSpecifier,
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
} from 'platform-bible-utils';
import themesDataObject from '@shared/data/themes.data.json';
import { DEFAULT_THEME_FAMILY, DEFAULT_THEME_TYPE } from '@shared/data/platform.data';
import themeDataService from '@shared/services/theme-data.service';
import { logger } from '@shared/services/logger.service';

/** Themes that are built into the software. Used for loading themes immediately */
const BUILT_IN_THEMES: ThemeFamiliesByIdExpanded = expandThemeContribution(
  // We know this is the right data type because we write this data
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  themesDataObject as ThemeFamiliesById,
  undefined,
);

const defaultThemePossiblyUndefined = BUILT_IN_THEMES[DEFAULT_THEME_FAMILY]?.[DEFAULT_THEME_TYPE];
if (!defaultThemePossiblyUndefined)
  throw new Error(
    `Theme service host could not find the built-in default theme! Family ${DEFAULT_THEME_FAMILY} type ${DEFAULT_THEME_TYPE}. This should not happen.`,
  );
const DEFAULT_THEME: ThemeDefinitionExpanded = defaultThemePossiblyUndefined;

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
  ? (deserialize(currentThemeSerialized) ?? {})
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
  ? (deserialize(shouldMatchSystemSerialized) ?? true)
  : DEFAULT_THEME;

function saveShouldMatchSystemToLocalStorage(newShouldMatchSystem: boolean) {
  localStorage.setItem(SHOULD_MATCH_SYSTEM_STORAGE_KEY, serialize(newShouldMatchSystem));
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

  constructor(
    public currentTheme: ThemeDefinitionExpanded,
    public saveCurrentTheme: (currentTheme: ThemeDefinitionExpanded) => void,
    public shouldMatchSystem: boolean,
    public saveShouldMatchSystem: (shouldMatchSystem: boolean) => void,
    onDidUpdateAllThemes: PlatformEventAsync<ThemeFamiliesByIdExpanded | PlatformError>,
    public currentSystemTheme: 'light' | 'dark',
    onDidChangeSystemTheme: PlatformEvent<'light' | 'dark'>,
  ) {
    super();

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
    const updateAllThemeFamilies = (
      allThemeFamilies: ThemeFamiliesByIdExpanded | PlatformError,
    ) => {
      if (isPlatformError(allThemeFamilies)) {
        logger.warn(
          `Theme service host received error on subscription to all theme families: ${getErrorMessage(allThemeFamilies)}`,
        );
        return;
      }
      logger.info(
        `Theme service host updated all theme families at ${performance.now()}: ${JSON.stringify(allThemeFamilies, undefined, 2)}`,
      );

      if (!this.#allThemeFamiliesById)
        this.#allThemeFamiliesByIdAsyncVariable.resolveToValue(allThemeFamilies);
      this.#allThemeFamiliesById = allThemeFamilies;

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

      // Notify others that theme data changed
      this.notifyUpdate(dataTypesToUpdate);
    };
    (async () => {
      try {
        const unsubscribe = await onDidUpdateAllThemes(updateAllThemeFamilies);
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
    newThemeSpecifierPossiblyUndefinedSelector: CurrentThemeSpecifier | undefined,
    newThemeSpecifierPossiblyNotProvided?: CurrentThemeSpecifier,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>> {
    const newThemeSpecifier =
      newThemeSpecifierPossiblyUndefinedSelector ?? newThemeSpecifierPossiblyNotProvided;

    // Throw if no specifier or doesn't contain any information
    if (!newThemeSpecifier || (!newThemeSpecifier.themeFamilyId && !newThemeSpecifier.type))
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
    newShouldMatchSystemPossiblyUndefinedSelector: boolean | undefined,
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

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setAllThemes(): Promise<DataProviderUpdateInstructions<ThemeDataTypes>> {
    throw new Error('Cannot set all themes. Extensions can provide themes in contributions');
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
    this.saveCurrentTheme(this.currentTheme);
  }

  /** Sets current theme to default */
  #resetCurrentThemeNoUpdate() {
    return this.#setCurrentThemeNoUpdate(
      this.#allThemeFamiliesById?.[DEFAULT_THEME_FAMILY]?.[this.currentTheme.type] ?? DEFAULT_THEME,
    );
  }

  #setShouldMatchSystemNoUpdate(newShouldMatchSystem: boolean) {
    this.shouldMatchSystem = newShouldMatchSystem;
    this.saveShouldMatchSystem(this.shouldMatchSystem);
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
  ) => {
    return new ThemeDataProviderEngine(
      currentTheme,
      saveCurrentTheme,
      shouldMatchSystem,
      saveShouldMatchSystem,
      onDidUpdateAllThemes,
      currentSystemTheme,
      onDidChangeSystemTheme,
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
