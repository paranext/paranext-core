import {
  ThemeDataTypes,
  IThemeService,
  themeServiceObjectToProxy,
  themeServiceDataProviderName,
  ThemeData,
  AllThemeData,
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
} from 'platform-bible-utils';

const LIGHT_THEME: ThemeData = Object.freeze({
  id: `light`,
  label: '%theme_label_light%',
  type: 'light',
  cssVariables: {
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',
    card: '0 0% 100%',
    'card-foreground': '222.2 84% 4.9%',
    popover: '210 20% 98%',
    'popover-foreground': '222.2 84% 4.9%',
    primary: '222.2 47.4% 11.2%',
    'primary-foreground': '210 40% 98%',
    secondary: '210 50% 95%',
    'secondary-foreground': '222.2 47.4% 11.2%',
    muted: '210 50% 95%',
    'muted-foreground': '215.4 16.3% 46.9%',
    accent: '210 50% 95%',
    'accent-foreground': '222.2 47.4% 11.2%',
    destructive: '0 84.2% 60.2%',
    'destructive-foreground': '210 40% 98%',
    border: '214.3 31.8% 91.4%',
    input: '214.3 31.8% 91.4%',
    ring: '222.2 84% 4.9%',

    'sidebar-background': '210 20% 98%',
    'sidebar-foreground': '222.2 84% 4.9%',
    'sidebar-primary': '222.2 47.4% 11.2%',
    'sidebar-primary-foreground': '210 40% 98%',
    'sidebar-accent': '210 50% 95%',
    'sidebar-accent-foreground': '222.2 47.4% 11.2%',
    'sidebar-border': '214.3 31.8% 91.4%',
    'sidebar-ring': '222.2 84% 4.9%',

    radius: '0.5rem',
  },
});

const DARK_THEME: ThemeData = Object.freeze({
  id: `dark`,
  label: '%theme_label_light%',
  type: 'dark',
  cssVariables: {
    background: '222.2 84% 4.9%',
    foreground: '210 40% 98%',
    card: '222.2 84% 4.9%',
    'card-foreground': '210 40% 98%',
    popover: '222.2 84% 4.9%',
    'popover-foreground': '210 40% 98%',
    primary: '210 40% 98%',
    'primary-foreground': '222.2 47.4% 11.2%',
    secondary: '217.2 32.6% 17.5%',
    'secondary-foreground': '210 40% 98%',
    muted: '217.2 32.6% 17.5%',
    'muted-foreground': '215 20.2% 65.1%',
    accent: '217.2 32.6% 17.5%',
    'accent-foreground': '210 40% 98%',
    destructive: '0 62.8% 30.6%',
    'destructive-foreground': '210 40% 98%',
    border: '217.2 32.6% 17.5%',
    input: '217.2 32.6% 17.5%',
    ring: '212.7 26.8% 83.9%',

    'sidebar-background': '222.2 84% 4.9%',
    'sidebar-foreground': '215 20.2% 65.1%',
    'sidebar-primary': '210 40% 98%',
    'sidebar-primary-foreground': '222.2 47.4% 11.2%',
    'sidebar-accent': '217.2 32.6% 17.5%',
    'sidebar-accent-foreground': '215 20.2% 65.1%',
    'sidebar-border': '217.2 32.6% 17.5%',
    'sidebar-ring': '212.7 26.8% 83.9%',
  },
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

const SHOULD_MATCH_SYSTEM_STORAGE_KEY = 'theme.service-host.currentTheme';

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
  ) {
    super();

    // Immediately subscribe to and get latest themes
    const updateThemeData = (allThemeData: AllThemeData) => {
      this.allThemeData = allThemeData;
      const dataTypesToUpdate: DataProviderUpdateInstructions<ThemeDataTypes> = ['AllThemes'];

      // TODO: detect system theme and update current theme if needed
      // TODO: react to system theme changes
      const updatedCurrentTheme = this.allThemeData[this.currentTheme.id];
      if (!updatedCurrentTheme) {
        this.#setCurrentThemeNoUpdate(this.allThemeData[DEFAULT_THEME.id] ?? DEFAULT_THEME);
        dataTypesToUpdate.push('CurrentTheme');
      } else if (!deepEqual(this.currentTheme, updatedCurrentTheme)) {
        this.#setCurrentThemeNoUpdate(updatedCurrentTheme);
        dataTypesToUpdate.push('CurrentTheme');
      }

      this.notifyUpdate(dataTypesToUpdate);
    };
    onDidUpdateAllThemes(updateThemeData);

    updateThemeData({ light: LIGHT_THEME, dark: DARK_THEME });
  }

  async getCurrentTheme(): Promise<ThemeData> {
    return this.currentTheme;
  }

  // Can be called with or without a selector
  async setCurrentTheme(
    newThemeIdPossiblyUndefinedSelector: string | undefined,
    newThemeIdPossiblyNotProvided?: string,
  ): Promise<DataProviderUpdateInstructions<ThemeDataTypes>> {
    let newThemeId = newThemeIdPossiblyUndefinedSelector ?? newThemeIdPossiblyNotProvided;
    if (newThemeId === '') newThemeId = DEFAULT_THEME.id;

    if (!newThemeId) throw new Error('Theme ID not provided');
    if (newThemeId === this.currentTheme.id) return false;
    const newTheme = this.allThemeData?.[newThemeId];
    // TODO: Should this throw? Also below in setCurrentThemeSync
    if (!newTheme) return false;

    // TODO: match system theme if appropriate. Also below in setCurrentThemeSync
    this.#setCurrentThemeNoUpdate(newTheme);
    return true;
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

    this.shouldMatchSystem = newShouldMatchSystem;
    this.saveShouldMatchSystem(this.shouldMatchSystem);
    return true;
  }

  async getAllThemes(): Promise<AllThemeData> {
    // TODO: SET UP TO WAIT FOR ALLTHEMEDATA
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
    this.saveCurrentTheme(this.currentTheme);
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
);

let initializationPromise: Promise<void>;
/** Need to run initialize before using this */
let dataProvider: IThemeService;
export async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          dataProvider = await dataProviderService.registerEngine(
            themeServiceDataProviderName,
            themeServiceEngine,
          );
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
  ) => {
    return new ThemeDataProviderEngine(
      currentTheme,
      saveCurrentTheme,
      shouldMatchSystem,
      saveShouldMatchSystem,
      onDidUpdateAllThemes,
    );
  },
};

const themeServiceEngineSyncAdditions = {
  ...themeServiceObjectToProxy,
  getCurrentThemeSync() {
    return themeServiceEngine.currentTheme;
  },
  setCurrentThemeSync(newThemeIdProvided: string) {
    let newThemeId = newThemeIdProvided;
    if (newThemeId === '') newThemeId = DEFAULT_THEME.id;
    const newTheme = themeServiceEngine.allThemeData?.[newThemeId];
    if (!newTheme) return false;

    themeServiceEngine.currentTheme = newTheme;
    saveCurrentThemeToLocalStorage(newTheme);
    return true;
  },
};

type IThemeServiceLocal = IThemeService & typeof themeServiceEngineSyncAdditions;

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
