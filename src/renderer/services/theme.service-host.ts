import {
  ThemeDataTypes,
  IThemeService,
  themeServiceObjectToProxy,
  themeServiceDataProviderName,
  IThemeServiceLocal,
} from '@shared/services/theme.service-model';
import { dataProviderService } from '@shared/services/data-provider.service';
import { DataProviderEngine, IDataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import {
  createSyncProxyForAsyncObject,
  Unsubscriber,
  deserialize,
  serialize,
  PlatformEvent,
  deepEqual,
  ThemeData,
  PlatformEventEmitter,
} from 'platform-bible-utils';
import { AllThemeData, ThemeDataExpanded } from '@shared/utils/themes-document-combiner';
import themesDataObject from '@shared/data/themes.data.json';

const LIGHT_THEME_ID = 'light';
const DARK_THEME_ID = 'dark';
const PARATEXT_LIGHT_THEME_ID = 'paratext-light';
const PARATEXT_DARK_THEME_ID = 'paratext-dark';

// We know what type this JSON file is and what themes are in it, so we're using it
// eslint-disable-next-line no-type-assertion/no-type-assertion
const LIGHT_THEME: ThemeDataExpanded = (themesDataObject as ThemeDataExpanded[]).find(
  (theme) => theme.id === LIGHT_THEME_ID,
)!;

// We know what type this JSON file is and what themes are in it, so we're using it
// eslint-disable-next-line no-type-assertion/no-type-assertion
const DARK_THEME: ThemeDataExpanded = (themesDataObject as ThemeDataExpanded[]).find(
  (theme) => theme.id === DARK_THEME_ID,
)!;

// We know what type this JSON file is and what themes are in it, so we're using it
// eslint-disable-next-line no-type-assertion/no-type-assertion
const PARATEXT_LIGHT_THEME: ThemeDataExpanded = (themesDataObject as ThemeDataExpanded[]).find(
  (theme) => theme.id === PARATEXT_LIGHT_THEME_ID,
)!;

// We know what type this JSON file is and what themes are in it, so we're using it
// eslint-disable-next-line no-type-assertion/no-type-assertion
const PARATEXT_DARK_THEME: ThemeDataExpanded = (themesDataObject as ThemeDataExpanded[]).find(
  (theme) => theme.id === PARATEXT_DARK_THEME_ID,
)!;

const BUILT_IN_THEMES: AllThemeData = Object.freeze({
  [LIGHT_THEME.id]: LIGHT_THEME,
  [DARK_THEME.id]: DARK_THEME,
  [PARATEXT_LIGHT_THEME.id]: PARATEXT_LIGHT_THEME,
  [PARATEXT_DARK_THEME.id]: PARATEXT_DARK_THEME,
});

const DEFAULT_THEME = LIGHT_THEME;

// #region interacting with localStorage

const CURRENT_THEME_STORAGE_KEY = 'theme.service-host.currentTheme';

/** FOR LOADING ONLY! DO NOT USE */
const currentThemeSerialized = localStorage.getItem(CURRENT_THEME_STORAGE_KEY);
// Load the whole theme data from localStorage now, then we will retrieve the actual theme data for
// this theme when we can
/** Current application theme that should be applied at startup. Will not be used afterward */
const currentThemeFromLocalStorage: ThemeData = currentThemeSerialized
  ? (deserialize(currentThemeSerialized) ?? {})
  : DEFAULT_THEME;

function saveCurrentThemeToLocalStorage(newCurrentTheme: ThemeData) {
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
  /** All Theme Data available to the application. `undefined` if not yet loaded. */
  allThemeData: AllThemeData | undefined;
  private unsubscribeOnDidUpdateAllThemes: Unsubscriber | undefined;

  constructor(
    public currentTheme: ThemeData,
    public saveCurrentTheme: (currentTheme: ThemeData) => void,
    public shouldMatchSystem: boolean,
    public saveShouldMatchSystem: (shouldMatchSystem: boolean) => void,
    onDidUpdateAllThemes: PlatformEvent<AllThemeData>,
    public currentSystemTheme: 'light' | 'dark',
    onDidChangeSystemTheme: PlatformEvent<'light' | 'dark'>,
  ) {
    super();

    // Immediately subscribe to and get latest themes
    const updateAllThemeData = (allThemeData: AllThemeData) => {
      this.allThemeData = allThemeData;
      const dataTypesToUpdate: DataProviderUpdateInstructions<ThemeDataTypes> = ['AllThemes'];

      const updatedCurrentTheme = this.allThemeData[this.currentTheme.id];
      // If the current theme no longer exists, set back to default
      if (!updatedCurrentTheme) {
        this.#setCurrentThemeNoUpdate(this.allThemeData[DEFAULT_THEME.id] ?? DEFAULT_THEME);
        dataTypesToUpdate.push('CurrentTheme');
      }
      // If we should match the system theme, flip the theme to the system-matching version
      else if (this.shouldMatchSystem && updatedCurrentTheme.type !== this.currentSystemTheme) {
        this.#setCurrentThemeNoUpdate(updatedCurrentTheme);
        dataTypesToUpdate.push('CurrentTheme');
      }
      // If the current theme's definition was updated, update it
      else if (!deepEqual(this.currentTheme, updatedCurrentTheme)) {
        this.#setCurrentThemeNoUpdate(updatedCurrentTheme);
        dataTypesToUpdate.push('CurrentTheme');
      }

      // Notify others that theme data changed
      this.notifyUpdate(dataTypesToUpdate);
    };
    onDidUpdateAllThemes(updateAllThemeData);

    // TODO: REMOVE THIS WHEN WE HAVE CONTRIBUTIONS
    updateAllThemeData(BUILT_IN_THEMES);

    // Listen to system theme change and update current theme
    const updateThemeToSystem = (newThemeType: 'light' | 'dark') => {
      this.currentSystemTheme = newThemeType;

      if (!this.shouldMatchSystem || this.currentTheme.type === newThemeType) return;

      const flippedTheme = this.#getFlippedTheme();
      if (!flippedTheme) return;

      this.setCurrentTheme(flippedTheme.id);
    };
    updateThemeToSystem(currentSystemTheme);
    onDidChangeSystemTheme(updateThemeToSystem);
  }

  async getCurrentTheme(): Promise<ThemeData> {
    return this.currentTheme;
  }

  // Can be called with or without a selector
  async setCurrentTheme(
    newThemeIdPossiblyUndefinedSelector: string | undefined,
    newThemeIdPossiblyNotProvided?: string,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>> {
    // TODO: AWAIT GETTING ALLTHEMEDATA

    let newThemeId = newThemeIdPossiblyUndefinedSelector ?? newThemeIdPossiblyNotProvided;
    if (newThemeId === '') newThemeId = DEFAULT_THEME.id;

    if (!newThemeId) throw new Error('Theme ID not provided');
    if (newThemeId === this.currentTheme.id) return false;
    const newTheme = this.allThemeData?.[newThemeId];
    if (!newTheme) throw new Error(`Theme data not found for id ${newThemeId}`);

    this.#setCurrentThemeNoUpdate(newTheme);
    return true;
  }

  async flipTheme(): Promise<DataProviderUpdateInstructions<ThemeDataTypes>> {
    // TODO: AWAIT GETTING ALLTHEMEDATA

    const flippedTheme = this.#getFlippedTheme();
    if (!flippedTheme) return false;

    const dataTypesToUpdate: DataProviderUpdateInstructions<ThemeDataTypes> = ['CurrentTheme'];

    // Flipping the theme implies they don't want to follow system theme anymore
    if (this.shouldMatchSystem) {
      this.#setShouldMatchSystemNoUpdate(false);
      dataTypesToUpdate.push('ShouldMatchSystem');
    }

    this.#setCurrentThemeNoUpdate(flippedTheme);

    this.notifyUpdate(dataTypesToUpdate);
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

    // If we should match the system theme, flip the theme to the system-matching version
    if (this.shouldMatchSystem && this.currentTheme.type !== this.currentSystemTheme) {
      this.#setCurrentThemeNoUpdate(this.currentTheme);
      dataTypesToUpdate.push('CurrentTheme');
    }

    return dataTypesToUpdate;
  }

  async getAllThemes(): Promise<AllThemeData> {
    // TODO: SET UP TO WAIT FOR allThemeData
    return this.allThemeData ?? {};
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setAllThemes(): Promise<DataProviderUpdateInstructions<ThemeDataTypes>> {
    throw new Error('Cannot set all themes. Extensions can provide themes in contributions');
  }

  async dispose(): Promise<boolean> {
    if (this.unsubscribeOnDidUpdateAllThemes) {
      const success = this.unsubscribeOnDidUpdateAllThemes();
      this.unsubscribeOnDidUpdateAllThemes = undefined;
      return success;
    }
    return true;
  }

  #setCurrentThemeNoUpdate(newTheme: ThemeData) {
    this.currentTheme = newTheme;

    // If we should match system theme and the theme has a version that matches system theme, set it
    // to that system theme version. Otherwise, just set to the new theme
    if (this.shouldMatchSystem && newTheme.type !== this.currentSystemTheme) {
      this.currentTheme = this.#getFlippedTheme(newTheme.id) ?? newTheme;
    }

    this.saveCurrentTheme(this.currentTheme);
  }

  #setShouldMatchSystemNoUpdate(newShouldMatchSystem: boolean) {
    this.shouldMatchSystem = newShouldMatchSystem;
    this.saveShouldMatchSystem(this.shouldMatchSystem);
  }

  /**
   * Returns the flipped light/dark theme data for the provided theme
   *
   * @param themeId Theme id to get flipped data for. Defaults to current theme
   * @returns Flipped theme data for `themeId` or `undefined` if not found
   */
  #getFlippedTheme(themeId = this.currentTheme.id): ThemeData | undefined {
    const { allThemeData } = this;
    if (!allThemeData) throw new Error('All theme data not available. This should not happen');

    const flippedThemeId = allThemeData[themeId]?.pairId;

    if (!flippedThemeId) return undefined;

    const flippedTheme = allThemeData[flippedThemeId];
    if (!flippedTheme)
      throw new Error(
        `Flipped theme data not found for id ${flippedThemeId}. This should not happen`,
      );

    return flippedTheme;
  }
}

const themeServiceEngine = new ThemeDataProviderEngine(
  currentThemeFromLocalStorage,
  saveCurrentThemeToLocalStorage,
  shouldMatchSystemFromLocalStorage,
  saveShouldMatchSystemToLocalStorage,
  // TODO: SET UP ALLTHEMEDATA
  () => {
    return () => true;
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
    currentTheme: ThemeData,
    saveCurrentTheme: () => void,
    shouldMatchSystem: boolean,
    saveShouldMatchSystem: (shouldMatchSystem: boolean) => void,
    onDidUpdateAllThemes: PlatformEvent<AllThemeData>,
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
