import {
  ThemeDataTypes,
  IThemeService,
  themeServiceObjectToProxy,
  themeServiceDataProviderName,
  IThemeServiceLocal,
  CurrentThemeSpecifier,
  USER_THEME_FAMILY_PREFIX,
  createReattachingSubscribeCurrentTheme,
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
  UnsubscriberAsync,
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
import { createCachedInitializer } from '@shared/utils/cached-initializer';
import { isNameTakenError } from '@renderer/services/name-taken-error.util';

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

// The theme keys live in plain `localStorage`, which is shared across every window of the app, so
// a fresh read always sees the values the current engine host last saved. These loaders run once at
// module load and again when this window takes the engine over from a closed host — serving the
// module-load snapshot at takeover would roll the app back to whatever this window saw when it
// started (see `reloadPersistedThemeState`).

const CURRENT_THEME_STORAGE_KEY = 'theme.service-host.currentTheme';

/** Read the most recently persisted current application theme (default theme if none persisted) */
function loadCurrentThemeFromLocalStorage(): ThemeDefinitionExpanded {
  const currentThemeSerialized = localStorage.getItem(CURRENT_THEME_STORAGE_KEY);
  // Load the whole theme data from localStorage now, then we will retrieve the actual theme data
  // for this theme when we can
  return currentThemeSerialized ? deserialize(currentThemeSerialized) : DEFAULT_THEME;
}

function saveCurrentThemeToLocalStorage(newCurrentTheme: ThemeDefinitionExpanded) {
  localStorage.setItem(CURRENT_THEME_STORAGE_KEY, serialize(newCurrentTheme));
}

const SHOULD_MATCH_SYSTEM_STORAGE_KEY = 'theme.service-host.shouldMatchSystem';

/**
 * Read the most recently persisted setting for whether the theme type (light/dark) should match the
 * system theme (`true` if none persisted)
 */
function loadShouldMatchSystemFromLocalStorage(): boolean {
  const shouldMatchSystemSerialized = localStorage.getItem(SHOULD_MATCH_SYSTEM_STORAGE_KEY);
  return shouldMatchSystemSerialized ? deserialize(shouldMatchSystemSerialized) : true;
}

function saveShouldMatchSystemToLocalStorage(newShouldMatchSystem: boolean) {
  localStorage.setItem(SHOULD_MATCH_SYSTEM_STORAGE_KEY, serialize(newShouldMatchSystem));
}

const USER_THEMES_STORAGE_KEY = 'theme.service-host.userThemes';

/** Read the most recently persisted user-defined theme families over the built-in ones */
function loadUserThemesFromLocalStorage(): ThemeFamiliesById {
  const userThemesSerialized = localStorage.getItem(USER_THEMES_STORAGE_KEY);
  return {
    ...Object.fromEntries(
      Object.entries(THEMES_DATA_OBJECT).filter(([themeFamilyId]) =>
        startsWith(themeFamilyId, USER_THEME_FAMILY_PREFIX),
      ),
    ),
    ...(userThemesSerialized ? deserialize(userThemesSerialized) : {}),
  };
}

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
  /**
   * The most recent theme families received from `onDidUpdateAllThemes`, WITHOUT the user-defined
   * families merged in. Kept so {@link ThemeDataProviderEngine.reloadState} can rebuild
   * `allThemeFamiliesById` from a pristine base: rebuilding over the merged set instead would let a
   * user-defined family that no longer exists in the freshly loaded user themes live on in the
   * served list.
   */
  #themeFamiliesFromLastUpdate: ThemeFamiliesByIdExpanded | undefined;
  #isDisposed = false;
  /**
   * Whether {@link ThemeDataProviderEngine.reloadState} is rebuilding this engine's state right now.
   *
   * Reload is a read-only refresh: it replaces the engine's live state with what is already
   * persisted. The persisted theme keys are app-global — every window reads and writes the same
   * `localStorage` entries — and a reload runs in EVERY surviving window when a host closes,
   * including the ones that go on to lose the race to host. Writing anything back from the rebuild
   * would let those windows overwrite the shared state the reload was called to pick up (e.g.
   * persisting `DEFAULT_THEME` because a freshly loaded family is missing from this window's last
   * theme payload), so the save callbacks are suppressed while this is set.
   */
  #isReloadingState = false;

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
          // Keep the payload as received — no user themes merged in — for `reloadState` to
          // rebuild from (see `#themeFamiliesFromLastUpdate`)
          if (!isPlatformError(allThemeFamilies))
            this.#themeFamiliesFromLastUpdate = allThemeFamilies;
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

  /**
   * Replace the engine's live state with freshly loaded values and rebuild the served theme list
   * from them.
   *
   * Run when this window takes over serving the engine from a closed host: the engine otherwise
   * still holds the state this window loaded at startup, and serving (then eventually re-saving)
   * that snapshot would silently roll back everything the previous host changed since.
   *
   * Static rather than an instance method because every non-`#`-private method on the engine is
   * exposed to consumers when the engine is registered (see the note on the save methods above),
   * and reloading state is a host-side lifecycle operation, not part of the theme data API. A
   * static stays off the instance while still being able to reach the `#` members it needs.
   *
   * @param engine The engine whose state to replace
   * @param currentTheme Freshly loaded current theme
   * @param shouldMatchSystem Freshly loaded setting for matching the system theme
   * @param currentSystemTheme The system theme as it is right now. Re-read alongside the persisted
   *   values because only the hosting window listens for system theme changes, so a window that
   *   spent its life attached carries the snapshot from its own load — and rebuilding the current
   *   theme below against that stale value could flip the freshly loaded theme back to the wrong
   *   type
   * @param userThemes Freshly loaded user-defined theme families
   * @experimental
   */
  static reloadState(
    engine: ThemeDataProviderEngine,
    currentTheme: ThemeDefinitionExpanded,
    shouldMatchSystem: boolean,
    currentSystemTheme: 'light' | 'dark',
    userThemes: ThemeFamiliesById,
  ): void {
    engine.currentTheme = currentTheme;
    engine.shouldMatchSystem = shouldMatchSystem;
    engine.currentSystemTheme = currentSystemTheme;
    engine.userThemes = userThemes;
    // Rebuild the served theme list so it merges the fresh user themes over the latest provider
    // payload, and reconcile the fresh current theme against the result the same way an incoming
    // update would. Before the first payload arrives there is nothing to rebuild — the
    // subscription's first event will pick the fresh user themes up when it fires.
    //
    // The reconciliation can land on a theme other than the one just loaded (matching the system
    // theme, or the family being absent from this window's last payload), which on the normal path
    // persists the result. Suppress that for the length of the rebuild — see
    // `#isReloadingState`. Synchronous throughout, so the flag cannot span an await.
    if (engine.#themeFamiliesFromLastUpdate) {
      engine.#isReloadingState = true;
      try {
        engine.#updateAllThemeFamiliesNoUpdate(engine.#themeFamiliesFromLastUpdate);
      } finally {
        engine.#isReloadingState = false;
      }
    }
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

  // Can be called with or without a selector
  async setAllThemes(
    newUserThemesPossiblyUndefinedSelector: Partial<ThemeFamiliesById> | undefined,
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
    if (this.#isReloadingState) return;
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
    if (this.#isReloadingState) return;
    this.#saveShouldMatchSystem(this.shouldMatchSystem);
  }

  #setUserThemesNoUpdate(newUserThemes: ThemeFamiliesById) {
    this.userThemes = newUserThemes;
    if (this.#isReloadingState) return;
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
  loadCurrentThemeFromLocalStorage(),
  saveCurrentThemeToLocalStorage,
  loadShouldMatchSystemFromLocalStorage(),
  saveShouldMatchSystemToLocalStorage,
  async (allThemesHandler) => {
    return themeDataService.subscribeAllThemes(undefined, allThemesHandler);
  },
  getSystemDarkThemeMediaQuery().matches ? 'dark' : 'light',
  onDidChangeSystemThemeEmitter.event,
  loadUserThemesFromLocalStorage(),
  saveUserThemesToLocalStorage,
);

/**
 * Re-read everything {@link themeServiceEngine} was constructed with at module load — the persisted
 * theme state (current theme, should-match-system, user themes; `localStorage` is shared across all
 * windows, so this sees the last values any window saved) and the current system theme — and apply
 * it to the engine's live state.
 */
function reloadPersistedThemeState(): void {
  ThemeDataProviderEngine.reloadState(
    themeServiceEngine,
    loadCurrentThemeFromLocalStorage(),
    loadShouldMatchSystemFromLocalStorage(),
    getSystemDarkThemeMediaQuery().matches ? 'dark' : 'light',
    loadUserThemesFromLocalStorage(),
  );
}

/**
 * The theme provider this window is talking to — its own engine while it hosts, otherwise the
 * hosting window's over the network. `undefined` until {@link initialize} resolves, and again once
 * that provider goes away, which is what tells {@link retryHostOrAttachToThemeEngine} that the
 * window hosting the engine took it with it.
 */
let dataProvider: IThemeService | undefined;

/**
 * Cached initializer behind {@link initialize}. Held in a mutable binding because it is re-armed
 * when the window hosting the theme engine closes, so this window can take the engine over.
 */
let runInitialize: () => Promise<void>;

/** Whether this window is the one currently hosting the theme engine */
let isHostingThemeEngine = false;

/**
 * Host-or-attach run started by {@link retryHostOrAttachToThemeEngine} that has not settled yet, if
 * any. A window can lose the engine's host again while it is still re-entering the race for the
 * last one — it attaches to a new host inside that run, and that host can go away in the same
 * instant. Each retry builds a fresh cached initializer, so without this guard two triggers would
 * run `registerEngine` concurrently and race each other for the engine name — the loser's event
 * registration is rejected by the central registry (single-source names reject even the same
 * handler) and it noisily falls into the attach path. Cleared when the run settles so a later host
 * going away can retry again.
 */
let pendingRetryPromise: Promise<void> | undefined;

/**
 * Whether a trigger arrived while {@link pendingRetryPromise} was in flight and still needs a run of
 * its own. A trigger raised mid-run is evidence of a death the in-flight run started too early to
 * have seen, so it cannot be dropped; several of them collapse into the one re-run, since
 * re-running once after the last of them is enough.
 */
let isRetryQueuedAfterPendingRun = false;

/**
 * How long to wait before racing again after a run that came out of it with nothing — neither
 * hosting the engine nor attached to the window that does. Every surviving window is in the same
 * state, so the wait is what keeps them from retrying in lockstep forever; short enough that
 * `papi.themes` is unanswerable for a moment rather than for the session.
 */
const RACE_AGAIN_AFTER_EMPTY_HANDED_RUN_DELAY_MS = 1000;

/**
 * How many times in a row to race again after coming out of a run empty-handed. Bounded so a window
 * whose registrations are failing for some reason other than the name being taken does not retry
 * for the life of the session; reset the moment a run ends with an engine to talk to.
 */
const MAX_CONSECUTIVE_EMPTY_HANDED_RUNS = 5;

/** How many runs in a row have ended with this window neither hosting the engine nor attached */
let consecutiveEmptyHandedRuns = 0;

/**
 * Re-arm {@link runInitialize} and run it, so this window re-enters the host-or-attach race.
 *
 * Concurrent triggers share the pending run instead of starting another (see
 * {@link pendingRetryPromise}); one that arrives while a run is in flight is re-run afterwards
 * rather than discarded (see {@link isRetryQueuedAfterPendingRun}).
 */
function retryHostOrAttachToThemeEngine(): void {
  // Nothing to take over while this window is the host: re-entering the race here would drop the
  // engine it is serving to everyone else, and the state reload in `hostOrAttachToThemeEngine` would
  // discard whatever the user has changed since. Checked on every entry, including the re-run below,
  // because this window can win hosting between a trigger being raised and it being acted on.
  if (isHostingThemeEngine) return;
  if (pendingRetryPromise) {
    isRetryQueuedAfterPendingRun = true;
    return;
  }
  runInitialize = createCachedInitializer(hostOrAttachToThemeEngine);
  pendingRetryPromise = runInitialize()
    .catch((e) => {
      // Neither hosting nor attached, and nothing else re-enters the race for this window: a
      // takeover is driven by the disposal of the provider this window is holding, and it is holding
      // none. `createCachedInitializer` does clear its cache on this rejection, so the next
      // `papi.themes` call would retry — but nothing guarantees there is a next call, and every
      // surviving window can land here at once, which would leave the app with no theme engine at
      // all. Schedule the re-entry rather than waiting to be asked.
      consecutiveEmptyHandedRuns += 1;
      if (consecutiveEmptyHandedRuns > MAX_CONSECUTIVE_EMPTY_HANDED_RUNS) {
        logger.error(
          `Window ${globalThis.windowId} gave up racing for the theme engine after ${MAX_CONSECUTIVE_EMPTY_HANDED_RUNS} attempts that neither hosted it nor found the window that does; papi.themes calls will fail until a window hosts it: ${getErrorMessage(e)}`,
        );
        return;
      }
      logger.error(
        `Window ${globalThis.windowId} neither re-hosted the theme service after its host closed nor could attach to another window; racing again in ${RACE_AGAIN_AFTER_EMPTY_HANDED_RUN_DELAY_MS}ms (attempt ${consecutiveEmptyHandedRuns} of ${MAX_CONSECUTIVE_EMPTY_HANDED_RUNS}): ${getErrorMessage(e)}`,
      );
      setTimeout(() => {
        // A queued trigger's re-run, or another window's disposal, may have found this window an
        // engine in the meantime. Racing again then would resolve that same provider and leave a
        // second dispose handler on it.
        if (dataProvider) return;
        retryHostOrAttachToThemeEngine();
      }, RACE_AGAIN_AFTER_EMPTY_HANDED_RUN_DELAY_MS);
    })
    .finally(() => {
      pendingRetryPromise = undefined;
      if (!isRetryQueuedAfterPendingRun) return;
      isRetryQueuedAfterPendingRun = false;
      // The run that just settled may already have answered what the queued trigger was about, so
      // only run again while this window still has no engine to talk to. Re-running against a
      // provider that is alive would resolve that same provider and leave another dispose handler
      // on it.
      //
      // Note the asymmetry with the scroll group host, which re-runs unless it came out of the run
      // publishing: dropping the queued trigger for a window that ended up merely ATTACHED is only
      // safe because the provider it attached to carries its own dispose handler, which re-fires
      // this if that provider is the one the swallowed trigger was about. Remove that handler and
      // this drops takeovers silently.
      if (!dataProvider) retryHostOrAttachToThemeEngine();
    });
}

/**
 * Host the theme engine in this window, or attach to the window already hosting it.
 *
 * Unlike the window and web view services, the theme is app-global — one current theme, one set of
 * user themes — so it gets exactly one engine rather than one per window. Whichever renderer starts
 * first wins the name; the rest consume it over the network and see the same state. Registration
 * failure is treated as "someone else got there first" because that is the only way the name can be
 * taken: nothing else in the app registers it, and the retry below re-enters this same path.
 */
async function hostOrAttachToThemeEngine(): Promise<void> {
  // This window's engine still holds whatever was persisted when the window loaded, and a window
  // that has been hosting since then may have saved newer state. Refresh before racing, on every
  // route into the race rather than only the one the disposal takes: any route that ends up winning
  // would otherwise republish — and, on the next save, persist — the load-time snapshot, dropping
  // the user's changes. A no-op on the first run, where the two are the same values.
  reloadPersistedThemeState();
  try {
    const hostedEngine = await dataProviderService.registerEngine(
      themeServiceDataProviderName,
      themeServiceEngine,
    );
    dataProvider = hostedEngine;
    isHostingThemeEngine = true;
    consecutiveEmptyHandedRuns = 0;
    // Only the hosting window watches the OS dark-mode preference, and only once it has actually
    // won the name. Listening before registering would leak a media-query listener in every window
    // that loses the race, since the unsubscribe below is only reached on the success path.
    const systemThemeChangesInfo = listenToSystemThemeChanges();
    hostedEngine.onDidDispose(() => {
      isHostingThemeEngine = false;
      dataProvider = undefined;
      systemThemeChangesInfo.unsubscribe();
    });
    return;
  } catch (e) {
    // Losing the name is the expected outcome in every window but one, and the only thing this
    // `try` is written to survive. Anything else — a request that timed out, an event registration
    // the central registry refused, a network service that has shut down — reaches here too and
    // looks identical from the code's point of view, so say which one it was rather than reporting
    // a bug as the routine outcome at a severity nothing reads.
    const errorMessage = getErrorMessage(e);
    if (isNameTakenError(errorMessage))
      logger.debug(
        `Another window is already hosting the theme service; attaching to it. ${errorMessage}`,
      );
    else
      logger.warn(
        `Window ${globalThis.windowId} failed to host the theme service for a reason other than the name being taken; attaching to whichever window has it instead. ${errorMessage}`,
      );
  }

  const hostedProvider = await dataProviderService.get(themeServiceDataProviderName);
  if (!hostedProvider)
    throw new Error(
      `Window ${globalThis.windowId} did not win hosting of the theme engine and could not resolve the window that did, so it has no theme service to attach to`,
    );
  dataProvider = hostedProvider;
  consecutiveEmptyHandedRuns = 0;

  // Everything else on the theme service is answered by the host over the network, but
  // `getCurrentThemeSync` reads this window's own engine — which serves nobody while this window is
  // attached and hears nothing the host's engine does. Mirroring the host's current theme onto it
  // is what keeps the synchronous answer honest; without it this window answers with whatever it
  // loaded at startup for as long as it stays attached.
  let unsubscribeFromHostCurrentTheme: UnsubscriberAsync | undefined;
  try {
    unsubscribeFromHostCurrentTheme = await hostedProvider.subscribeCurrentTheme(
      undefined,
      (currentThemeFromHost) => {
        if (isPlatformError(currentThemeFromHost)) {
          logger.warn(
            `Window ${globalThis.windowId} could not read the hosting window's current theme for its synchronous theme reads: ${getErrorMessage(currentThemeFromHost)}`,
          );
          return;
        }
        // Assigned straight onto the engine rather than set through it, because the engine's
        // setters persist what they are given. The persisted theme keys are app-global and the
        // hosting window owns writing them, so a window echoing back what it was just told would
        // race the host on every change — the same write `reloadState` suppresses while it rebuilds
        // this engine from those keys.
        themeServiceEngine.currentTheme = currentThemeFromHost;
      },
    );
  } catch (e) {
    // An attached window that cannot mirror the host still has a working theme service, since
    // everything but the synchronous read goes to the host, so this must not fail the attach.
    logger.warn(
      `Window ${globalThis.windowId} could not subscribe to the hosting window's current theme for its synchronous theme reads: ${getErrorMessage(e)}`,
    );
  }

  // When the hosting window goes away its provider goes with it, so drop it, re-arm, and take over.
  // Every remaining window does this; the one that wins the re-registration becomes the new host and
  // the others attach to it on their own retry. A window that closes never disposes anything itself,
  // so what fires this in that case is the disposal the process owning the connections announces
  // once that window's registrations are gone — which is every bit as reliable a signal, and cannot
  // arrive before the window is actually unreachable.
  hostedProvider.onDidDispose(() => {
    dataProvider = undefined;
    // The mirror above is over either way: if this window wins the re-registration its own engine
    // becomes the source of truth, and if it attaches again it gets a fresh mirror on the new host.
    // Leaving it subscribed would keep a dead provider's failures coming on every theme change.
    const stopMirroringClosedHost = unsubscribeFromHostCurrentTheme;
    unsubscribeFromHostCurrentTheme = undefined;
    stopMirroringClosedHost?.().catch((e) => {
      logger.warn(
        `Window ${globalThis.windowId} failed to stop reading the closed hosting window's current theme: ${getErrorMessage(e)}`,
      );
    });
    retryHostOrAttachToThemeEngine();
  });
}

runInitialize = createCachedInitializer(hostOrAttachToThemeEngine);

/** Set up this window's access to the app-wide theme service. Safe to call more than once */
export async function initialize(): Promise<void> {
  return runInitialize();
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

/** The theme provider this window should be talking to right now, resolving it if needed */
async function getThemeProvider(): Promise<IThemeService> {
  await initialize();
  // Names the state rather than the symptom: this is the gap between the window that was hosting
  // the theme engine going away and one of the surviving windows winning it back (see
  // `retryHostOrAttachToThemeEngine`), which the retry closes on its own. Callers that can wait
  // should retry rather than treat this as the theme service being gone.
  if (!dataProvider)
    throw new Error(
      `Window ${globalThis.windowId} has no theme service while the theme engine is being handed over from the window that closed; retry once a window has taken it over`,
    );
  return dataProvider;
}

const themeServiceEngineSyncAdditions = Object.freeze({
  ...themeServiceObjectToProxy,
  getCurrentThemeSync() {
    return themeServiceEngine.currentTheme;
  },
  // Served here rather than passed through to the provider so a subscription made before a window
  // handover keeps delivering afterwards. See `createReattachingSubscribeCurrentTheme`.
  subscribeCurrentTheme: createReattachingSubscribeCurrentTheme(getThemeProvider),
});

/**
 * Theme service that is available locally in the renderer only and can perform synchronous
 * operations
 */
// We are adding extra sync methods in the proxy-over object, so they will be available in the final
// object
// eslint-disable-next-line no-type-assertion/no-type-assertion
export const localThemeService = createSyncProxyForAsyncObject(
  getThemeProvider,
  themeServiceEngineSyncAdditions,
) as IThemeServiceLocal;
