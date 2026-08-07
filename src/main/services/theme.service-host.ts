/**
 * Service host for the app-global theme service.
 *
 * There is one current theme, one should-match-system setting, and one set of user-defined themes
 * for the whole app — so that state has exactly one home, and that home is the process that
 * outlives every window. Main owns those three values (persisted), the derived list of every theme
 * available, and the data provider every process reads them through. Each renderer keeps a cache of
 * the current theme in `theme.service.ts` for the synchronous readers it paints with.
 *
 * The OS dark-mode preference is read here too, through Electron's `nativeTheme` — one source for
 * the app instead of one media-query listener per window.
 *
 * See the service host / service pattern in `.context/standards/Architecture.md` § "Service Host vs
 * Service".
 */

import { app, nativeTheme } from 'electron';
import { DEFAULT_THEME_FAMILY, DEFAULT_THEME_TYPE } from '@shared/data/platform.data';
import { DataProviderEngine, IDataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import { dataProviderService } from '@shared/services/data-provider.service';
import { logger } from '@shared/services/logger.service';
import { markStartup } from '@shared/utils/startup-timing.util';
import { onDidCreateNetworkObject } from '@shared/services/network-object.service';
import { themeDataService } from '@shared/services/theme-data.service';
import { themeDataServiceProviderName } from '@shared/services/theme-data.service-model';
import {
  CURRENT_THEME_STORAGE_KEY,
  CurrentThemeSpecifier,
  PersistedThemeState,
  SHOULD_MATCH_SYSTEM_STORAGE_KEY,
  ThemeDataTypes,
  themeServiceDataProviderName,
  USER_THEME_FAMILY_PREFIX,
  USER_THEMES_STORAGE_KEY,
} from '@shared/services/theme.service-model';
import {
  DEFAULT_THEME,
  DEFAULT_USER_THEME_FAMILY,
  expandThemeFamiliesByIdWithDefault,
  THEMES_DATA_OBJECT,
} from '@shared/utils/built-in-themes.util';
import {
  AsyncVariable,
  deepEqual,
  deserialize,
  getErrorMessage,
  isPlatformError,
  PlatformError,
  PlatformEvent,
  PlatformEventAsync,
  PlatformEventEmitter,
  serialize,
  startsWith,
  wait,
  ThemeDefinitionExpanded,
  ThemeFamiliesById,
  ThemeFamiliesByIdExpanded,
  UnsubscriberAsyncList,
} from 'platform-bible-utils';

/**
 * How long extension-contributed themes have to arrive before the current theme is judged against
 * the theme list — and reset if the list does not have it.
 *
 * Measured from the theme list's FIRST payload, not from this process's age. The list is published
 * by the extension host, which this process spawns after its own app-global services have started,
 * and its first payload is built at extension-host init before any extension has loaded — so
 * "extension themes have had a fair chance" starts when that payload arrives and the extensions
 * contributing themes are loading behind it. Anchoring to this process's age instead throws away
 * the theme of anyone whose extension host starts slowly, and persists the reset.
 */
const EXTENSION_THEMES_GRACE_PERIOD_MS = 30000;

// #region interacting with localStorage

/**
 * Whether a value read out of a store — this process's own, or a renderer's offered over the
 * network — is shaped like a theme this process can serve
 */
function isThemeShaped(
  theme: ThemeDefinitionExpanded | undefined,
): theme is ThemeDefinitionExpanded {
  return (
    !!theme &&
    typeof theme.themeFamilyId === 'string' &&
    typeof theme.type === 'string' &&
    typeof theme.cssVariables === 'object' &&
    !!theme.cssVariables
  );
}

// `localStorage` here is main's file-backed polyfill (`polyfillLocalStorage()` in
// `global-this.model.ts`), NOT a renderer's Chromium store, so these are one store for the whole
// app rather than one per window. The key names are unchanged from when a renderer held this state,
// which is what lets the one-time handover in `migrateStoredThemeState` find anything.

/**
 * Read one persisted value out of the store.
 *
 * A store this process cannot make sense of degrades to "nothing persisted" instead of throwing.
 * This runs while `main.ts`'s import graph is being evaluated — before any window, any error
 * dialog, or anything the user could act on — so a truncated or hand-edited file would otherwise
 * stop the app from starting at all, with nothing to tell the user which file to remove. Losing a
 * theme choice beats that. The next write replaces the unreadable file.
 */
function loadStoredValue<T>(storageKey: string, fallback: T): T {
  try {
    const serialized = localStorage.getItem(storageKey);
    return serialized ? (deserialize(serialized) ?? fallback) : fallback;
  } catch (e) {
    logger.error(
      `Theme service host could not read its stored ${storageKey}; starting without it. ${getErrorMessage(e)}`,
    );
    return fallback;
  }
}

/** Read the most recently persisted current application theme (default theme if none persisted) */
function loadCurrentTheme(): ThemeDefinitionExpanded {
  // Load the whole theme data from the store now; the real definition for this theme is picked up
  // when the theme data service publishes it.
  const stored = loadStoredValue<ThemeDefinitionExpanded>(CURRENT_THEME_STORAGE_KEY, DEFAULT_THEME);
  // Shape-checked the same way an offer arriving over the network is. A theme without
  // `cssVariables` is served to the title-bar painter and to every window's stylesheet, neither of
  // which has anywhere to report it; trusting this process's own file more than the network's
  // offer is the wrong way round when both end up in the same places.
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return isThemeShaped(stored) ? stored : DEFAULT_THEME;
}

/**
 * Read the most recently persisted setting for whether the theme type (light/dark) should match the
 * system theme (`true` if none persisted)
 */
function loadShouldMatchSystem(): boolean {
  return loadStoredValue(SHOULD_MATCH_SYSTEM_STORAGE_KEY, true);
}

/**
 * Fill in the built-in user-defined theme families under whatever user themes are provided, so a
 * family the user has never edited still exists to be edited.
 */
function mergeUserThemesWithBuiltIns(userThemes: ThemeFamiliesById | undefined): ThemeFamiliesById {
  return {
    ...Object.fromEntries(
      Object.entries(THEMES_DATA_OBJECT).filter(([themeFamilyId]) =>
        startsWith(themeFamilyId, USER_THEME_FAMILY_PREFIX),
      ),
    ),
    ...(userThemes ?? {}),
  };
}

/** Read the most recently persisted user-defined theme families over the built-in ones */
function loadUserThemes(): ThemeFamiliesById {
  return mergeUserThemesWithBuiltIns(
    loadStoredValue<ThemeFamiliesById | undefined>(USER_THEMES_STORAGE_KEY, undefined),
  );
}

/** The current theme as of module load, and the answer before the engine has been built */
const currentThemeAtLoad = loadCurrentTheme();

/**
 * Whether this process holds theme state a user CHOSE, as opposed to only ever having had defaults
 * and whatever this process derived from them.
 *
 * Its own key rather than the presence of the three value keys, because this process writes those
 * on its own: it matches the theme type to the machine's dark-mode preference and picks up changed
 * definitions as extensions contribute to the theme list, and on a dark-mode machine that persists
 * a current theme on the very first start before the user has touched anything. Seeding from the
 * value keys would read those writes back one restart later as a user choice, and
 * {@link ThemeDataProviderEngine.migrateStoredThemeState} would refuse an offer that has not been
 * adopted yet — which deletes it, because the offering window discards its copy on a refusal.
 *
 * Written only by {@link noteUserThemeChange} (the three public setters) and by an adoption, which
 * is a user choice made on an older build.
 */
const HAS_USER_THEME_STATE_KEY = 'theme.service-host.hasUserThemeState';

let hasOwnThemeState = false;
try {
  hasOwnThemeState = !!localStorage.getItem(HAS_USER_THEME_STATE_KEY);
} catch {
  // A store that cannot be read holds nothing this process can claim as its own, so the safe answer
  // is the one that lets a renderer's handover proceed. `loadStoredValue` has already said so.
  hasOwnThemeState = false;
}

/**
 * Values waiting to be written to the store, keyed by the key they go under. Holds the values
 * rather than their serializations so a run of changes (dragging a colour picker through a user
 * theme) serializes once, at the write, instead of once per change.
 */
const pendingPersistValues = new Map<string, unknown>();

/**
 * How long a theme change waits before it is written to disk. Long enough that dragging a colour
 * picker through a user theme writes once at the end of the drag rather than once per frame, short
 * enough that it is over before a user who changed the theme and then quit gets to the menu.
 */
const PERSIST_DEBOUNCE_MS = 500;

let pendingPersistTimeout: ReturnType<typeof setTimeout> | undefined;

/**
 * Claim the coalesced write, cancelling the timer that would have run it.
 *
 * @returns The values it claimed, or `undefined` when there was nothing pending
 */
function takePendingPersist(): Map<string, unknown> | undefined {
  if (pendingPersistTimeout !== undefined) {
    clearTimeout(pendingPersistTimeout);
    pendingPersistTimeout = undefined;
  }
  if (pendingPersistValues.size === 0) return undefined;
  const claimed = new Map(pendingPersistValues);
  pendingPersistValues.clear();
  return claimed;
}

/** Write the claimed values to the store, now. Throws whatever the store throws. */
function writeValuesNow(values: Map<string, unknown>): void {
  values.forEach((value, storageKey) => {
    localStorage.setItem(storageKey, serialize(value));
  });
}

/**
 * Persist a theme value soon.
 *
 * Memory is authoritative and the store is a lagging record of it, so the write is coalesced: each
 * `localStorage.setItem` is an open-write-fsync-rename executed synchronously ON MAIN'S EVENT LOOP,
 * which is also the JSON-RPC server every other process talks through. Writing per change puts that
 * latency between every window and the platform while someone drags a colour picker.
 *
 * The cost of coalescing is a loss window: a crash (not a quit — see
 * {@link flushPersistedThemeState}) loses at most {@link PERSIST_DEBOUNCE_MS} of theme editing.
 */
function schedulePersist(storageKey: string, value: unknown): void {
  pendingPersistValues.set(storageKey, value);
  if (pendingPersistTimeout !== undefined) return;
  pendingPersistTimeout = setTimeout(() => {
    const values = takePendingPersist();
    if (!values) return;
    try {
      writeValuesNow(values);
    } catch (e) {
      // Said once and loudly, then the session carries on: the state consumers read is in memory and
      // was already broadcast, so a store that cannot be written costs the next restart its theme,
      // not this session its correctness.
      logger.error(
        `Theme service host could not persist its state; this session is unaffected but a restart will not remember the theme. ${getErrorMessage(e)}`,
      );
    }
  }, PERSIST_DEBOUNCE_MS);
}

/** Record that the user changed the theme in this process, not that this process derived something */
function noteUserThemeChange(): void {
  if (hasOwnThemeState) return;
  hasOwnThemeState = true;
  schedulePersist(HAS_USER_THEME_STATE_KEY, true);
}

/**
 * Write any coalesced theme state to the store immediately.
 *
 * Call this on the way down. {@link schedulePersist} deliberately lets the store lag memory, so
 * without a flush at shutdown a quit within {@link PERSIST_DEBOUNCE_MS} of a theme change would lose
 * it — the one loss the debounce must not cause, because quitting right after changing the theme is
 * something users do on purpose.
 */
export function flushPersistedThemeState(): void {
  const values = takePendingPersist();
  if (!values) return;
  try {
    writeValuesNow(values);
  } catch (e) {
    logger.error(
      `Theme service host could not persist its state while shutting down; the next start will show the last theme it managed to write. ${getErrorMessage(e)}`,
    );
  }
}

// #endregion

// #region the system (OS) theme

const onDidChangeSystemThemeEmitter = new PlatformEventEmitter<'light' | 'dark'>();

/**
 * The OS dark-mode preference right now.
 *
 * `nativeTheme` is unusable before Electron's `ready` event, so every caller of this is downstream
 * of the `app.whenReady()` in {@link startThemeServiceHost}.
 */
function getCurrentSystemTheme(): 'light' | 'dark' {
  return nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
}

// #endregion

// #region the current theme, for this process's own consumers

const onDidChangeCurrentThemeEmitter = new PlatformEventEmitter<ThemeDefinitionExpanded>();

/**
 * Event that emits with the new current theme whenever it changes.
 *
 * For main's own consumers — the title bar overlay colours — which would otherwise subscribe to
 * their own process's data provider over the network to hear what the object in the next module
 * already knows.
 *
 * @experimental
 */
export const onDidChangeCurrentTheme: PlatformEvent<ThemeDefinitionExpanded> =
  onDidChangeCurrentThemeEmitter.event;

// #endregion

// #region migration

/**
 * Whether stored state from somewhere this process cannot read has already been adopted. Persisted
 * rather than kept in memory: what makes the adoption a one-time event is that it happened at all,
 * not that it happened this session.
 */
const MIGRATED_STORED_STATE_KEY = 'theme.service-host.didMigrateStoredState';

/** Whether a value read out of a foreign store is shaped like a set of theme families */
function isThemeFamiliesShaped(
  userThemes: ThemeFamiliesById | undefined,
): userThemes is ThemeFamiliesById {
  return !!userThemes && typeof userThemes === 'object' && !Array.isArray(userThemes);
}

// #endregion

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
   *
   * Deliberately created with no timeout of its own. When the list arrives is up to the extension
   * host, which this process neither controls nor bounds, so a deadline measured from here can only
   * reject a wait that was going to succeed — and because the variable is settled once, that
   * rejection would be the answer to every later theme change for the rest of the session. Callers
   * bound their own wait instead (see
   * {@link ThemeDataProviderEngine.#getAllThemeFamiliesByIdResolved}).
   */
  #allThemeFamiliesByIdAsyncVariable: AsyncVariable<ThemeFamiliesByIdExpanded>;
  /**
   * Whether extension-contributed themes have had their chance to arrive, so a current theme that
   * is not in the served list is missing rather than merely late. See
   * {@link EXTENSION_THEMES_GRACE_PERIOD_MS}.
   */
  #hasExtensionThemesGracePeriodElapsed = false;
  /** Timer that ends the grace period, once the theme list's first payload has started it */
  #extensionThemesGracePeriodTimeout: ReturnType<typeof setTimeout> | undefined;
  /** Unsubscriber for the live `onDidUpdateAllThemes` subscription, if there is one */
  #unsubscribeAllThemes: (() => void) | undefined;
  /** Whether a subscribe attempt is in flight, so overlapping announcements take one attempt */
  #isSubscribingAllThemes = false;
  /** How to subscribe to the theme list, kept so the subscription can be taken again */
  #onDidUpdateAllThemes: PlatformEventAsync<ThemeFamiliesByIdExpanded | PlatformError>;
  /**
   * The most recent theme families received from `onDidUpdateAllThemes`, WITHOUT the user-defined
   * families merged in. Kept so {@link ThemeDataProviderEngine.adoptMigratedState} can rebuild
   * `allThemeFamiliesById` from a pristine base: rebuilding over the merged set instead would let a
   * user-defined family that no longer exists in the freshly adopted user themes live on in the
   * served list.
   */
  #themeFamiliesFromLastUpdate: ThemeFamiliesByIdExpanded | undefined;
  #isDisposed = false;
  /**
   * Whether {@link ThemeDataProviderEngine.adoptMigratedState} is rebuilding this engine's state
   * right now.
   *
   * The rebuild's reconciliation can change the current theme (matching the system theme, or the
   * adopted family being absent from the last payload), which on the normal path persists the
   * result. The adoption persists everything itself, in an order chosen so an interrupted migration
   * is retried rather than stranded, so the save callbacks are suppressed while this is set.
   */
  #isSuppressingSaves = false;

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
      -1,
    );
    // Settled by `dispose` when nothing is waiting, which would otherwise be an unhandled rejection
    // in main. Callers get the rejection through their own await; this only keeps the promise from
    // being unhandled when there are none.
    this.#allThemeFamiliesByIdAsyncVariable.promise.catch(() => {});

    this.#onDidUpdateAllThemes = onDidUpdateAllThemes;
    this.unsubscribeEventListeners.add(() => {
      this.#dropAllThemesSubscription();
      return true;
    });

    // Listen to system theme change and update current theme
    const updateThemeToSystem = (newThemeType: 'light' | 'dark') => {
      this.currentSystemTheme = newThemeType;

      if (this.#tryMatchCurrentThemeTypeToSystemNoUpdate()) this.notifyUpdate('CurrentTheme');
    };
    updateThemeToSystem(currentSystemTheme);
    this.unsubscribeEventListeners.add(onDidChangeSystemTheme(updateThemeToSystem));
  }

  /**
   * Take (or retake) the subscription to the theme list, dropping any subscription it replaces.
   *
   * Static for the same reason {@link ThemeDataProviderEngine.adoptMigratedState} is: every
   * non-`#`-private method on the engine is exposed to consumers when it is registered, and this is
   * a host-side lifecycle operation rather than part of the theme data API.
   *
   * The provider behind it is registered by the EXTENSION HOST, which this process spawns only
   * after its own app-global services have started and which `platform.restartExtensionHost` can
   * replace at any time — so this is driven by that provider appearing on the network (see
   * {@link startThemeServiceHost}) rather than taken once at startup and hoped for. Without it, a
   * cold start slow enough to miss the one attempt leaves the app with no theme list at all for the
   * session: nothing else in this process ever asks again.
   *
   * @param engine Engine to subscribe
   */
  static async subscribeToAllThemes(engine: ThemeDataProviderEngine): Promise<void> {
    if (engine.#isDisposed || engine.#isSubscribingAllThemes) return;
    engine.#isSubscribingAllThemes = true;
    try {
      const unsubscribe = await engine.#onDidUpdateAllThemes((allThemeFamilies) => {
        // Keep the payload as received — no user themes merged in — for `adoptMigratedState` to
        // rebuild from (see `#themeFamiliesFromLastUpdate`)
        if (!isPlatformError(allThemeFamilies))
          engine.#themeFamiliesFromLastUpdate = allThemeFamilies;
        engine.#startExtensionThemesGracePeriod();
        const dataTypesToUpdate = engine.#updateAllThemeFamiliesNoUpdate(allThemeFamilies);
        // Notify others if theme data changed
        if (dataTypesToUpdate) engine.notifyUpdate(dataTypesToUpdate);
      });
      // Whatever this replaces is a subscription to a provider that has just been replaced, or one
      // this engine no longer wants; either way it is not the one delivering from here on.
      engine.#dropAllThemesSubscription();
      if (engine.#isDisposed) unsubscribe();
      else engine.#unsubscribeAllThemes = unsubscribe;
    } catch (e) {
      // Said at debug, not warn: before the extension host has registered the provider this is the
      // expected answer, and the announcement that it exists is what tries again.
      logger.debug(
        `Theme service host could not subscribe to onDidUpdateAllThemes yet; it will try again when the theme data provider is announced. ${getErrorMessage(e)}`,
      );
    } finally {
      engine.#isSubscribingAllThemes = false;
    }
  }

  /**
   * Replace the engine's live state with state adopted from a store this process cannot read, and
   * rebuild the served theme list from it.
   *
   * Static rather than an instance method because every non-`#`-private method on the engine is
   * exposed to consumers when the engine is registered (see the note on the save methods above),
   * and this is a host-side lifecycle operation, not part of the theme data API. A static stays off
   * the instance while still being able to reach the `#` members it needs.
   *
   * @param engine The engine whose state to replace
   * @param currentTheme Adopted current theme, or `undefined` to keep this engine's
   * @param shouldMatchSystem Adopted setting for matching the system theme, or `undefined` to keep
   *   this engine's
   * @param userThemes Adopted user-defined theme families, or `undefined` to keep this engine's
   */
  static adoptMigratedState(
    engine: ThemeDataProviderEngine,
    currentTheme: ThemeDefinitionExpanded | undefined,
    shouldMatchSystem: boolean | undefined,
    userThemes: ThemeFamiliesById | undefined,
  ): void {
    // Through the same setters an ordinary change goes through, so the adopted theme is announced
    // to this process's own consumers — main's title bar is painted from `ready-to-show`, which is
    // before the offering window's renderer gets as far as offering, so an assignment that skipped
    // the announcement would leave the caption buttons on the pre-adoption colours for the session.
    //
    // Saves are suppressed for the length of the adoption — see `#isSuppressingSaves` — because
    // `migrateStoredThemeState` persists every value itself, in an order chosen so an interrupted
    // migration is retried rather than stranded. Synchronous throughout, so the flag cannot span an
    // await.
    engine.#isSuppressingSaves = true;
    try {
      if (currentTheme) engine.#setCurrentThemeNoUpdate(currentTheme);
      if (shouldMatchSystem !== undefined) engine.#setShouldMatchSystemNoUpdate(shouldMatchSystem);
      if (userThemes) engine.#setUserThemesNoUpdate(userThemes);
      // Rebuild the served theme list so it merges the adopted user themes over the latest provider
      // payload, and reconcile the adopted current theme against the result the same way an incoming
      // update would. Before the first payload arrives there is nothing to rebuild — the
      // subscription's first event will pick the adopted user themes up when it fires.
      if (engine.#themeFamiliesFromLastUpdate)
        engine.#updateAllThemeFamiliesNoUpdate(engine.#themeFamiliesFromLastUpdate);
    } finally {
      engine.#isSuppressingSaves = false;
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

    // A theme the user picked, as opposed to one this process derived, so a renderer's one-time
    // handover of pre-host state must not overwrite it
    noteUserThemeChange();

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

    noteUserThemeChange();

    const dataTypesToUpdate: DataProviderUpdateInstructions<ThemeDataTypes> = ['ShouldMatchSystem'];
    this.#setShouldMatchSystemNoUpdate(newShouldMatchSystem);

    // If we should match the system theme, flip the theme to the system-matching version in the same family
    if (this.#tryMatchCurrentThemeTypeToSystemNoUpdate()) dataTypesToUpdate.push('CurrentTheme');

    return dataTypesToUpdate;
  }

  async getAllThemes(): Promise<ThemeFamiliesByIdExpanded> {
    // Answers `{}` rather than waiting for the first payload: this is what the settings theme
    // picker reads, and a picker that hangs until the extension host has published is worse than
    // one that is briefly empty and fills in on the update that follows. The setters, which have no
    // useful empty answer, do wait — see `#getAllThemeFamiliesByIdResolved`.
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

    noteUserThemeChange();

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

  /** See {@link IThemeServiceInternal.migrateStoredThemeState} */
  async migrateStoredThemeState(state: PersistedThemeState): Promise<boolean> {
    // First one wins. Deliberately no locking: this whole function body is `await`-free, so two
    // windows offering in the same tick cannot interleave. The offers all describe the same app's
    // state from before it had one store, so taking the first and ignoring the rest cannot lose
    // anything the others would have added, and a mixture of two of them is the only outcome worth
    // ruling out.
    //
    // State this process holds also refuses an offer, even if the flag was never set: that means an
    // earlier offer failed to arrive but the app has been used since, and the theme the user last
    // chose has to beat the one they left behind before any of this.
    if (localStorage.getItem(MIGRATED_STORED_STATE_KEY) || hasOwnThemeState) return false;

    // Shape-checked on the way in, the same way a write is: this arrives over the network from
    // another process's store and is about to become this store's contents for the life of the
    // profile, so a garbage entry must not survive the trip.
    const offeredCurrentTheme = isThemeShaped(state?.currentTheme) ? state.currentTheme : undefined;
    const offeredShouldMatchSystem =
      typeof state?.shouldMatchSystem === 'boolean' ? state.shouldMatchSystem : undefined;
    const offeredUserThemes = isThemeFamiliesShaped(state?.userThemes)
      ? mergeUserThemesWithBuiltIns(state.userThemes)
      : undefined;
    // Nothing usable was offered. Refused rather than adopted-and-flagged: flagging would spend the
    // one-time migration on an offer that carried nothing, and the caller discards its copy either
    // way.
    if (!offeredCurrentTheme && offeredShouldMatchSystem === undefined && !offeredUserThemes)
      return false;

    ThemeDataProviderEngine.adoptMigratedState(
      this,
      offeredCurrentTheme,
      offeredShouldMatchSystem,
      offeredUserThemes,
    );
    hasOwnThemeState = true;

    // Persist what was adopted BEFORE recording that the migration ran, and write the values before
    // either marker. The store is one file per key with no atomicity across them, so an order that
    // records "already migrated" first can leave a profile permanently flagged as done with nothing
    // migrated — the user's theme gone with no way to ask for it again. This order fails the other
    // way: neither marker is set, so the next start's offer is adopted again and the partial write
    // is simply overwritten.
    //
    // The user themes go first because they are the one thing here this process could never derive
    // for itself: a current theme and a should-match-system setting both have defaults it would
    // land on anyway, while a user-defined family exists nowhere else once the offering window has
    // dropped its copy.
    try {
      takePendingPersist();
      writeValuesNow(
        new Map<string, unknown>([
          [USER_THEMES_STORAGE_KEY, this.userThemes],
          [CURRENT_THEME_STORAGE_KEY, this.currentTheme],
          [SHOULD_MATCH_SYSTEM_STORAGE_KEY, this.shouldMatchSystem],
          // What was adopted is a choice the user made on an older build, so it counts as this
          // process's own state from here on — see `HAS_USER_THEME_STATE_KEY`.
          [HAS_USER_THEME_STATE_KEY, true],
        ]),
      );
      localStorage.setItem(MIGRATED_STORED_STATE_KEY, 'true');
    } catch (e) {
      // Rejected rather than reported as refused: a caller told "refused" discards its copy, and
      // this is the one outcome where its copy is still the only durable one.
      logger.error(
        `Theme service host could not store the theme state it was offered; it will ask for it again. ${getErrorMessage(e)}`,
      );
      throw e;
    }
    logger.info('Theme service host adopted previously stored theme state');
    // Announced, unlike the scroll group's adoption, because a window is already rendering by the
    // time this runs. It painted the same values it is offering here, so this is normally a no-op
    // for it — but the adopted user themes are new to everything reading the theme list.
    this.notifyUpdate('*');
    return true;
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
    if (this.#allThemeFamiliesById) return this.#allThemeFamiliesById;
    // Bounded from THIS call rather than from the variable's creation: the list arrives when the
    // extension host publishes it, so a deadline anchored to startup would answer every later
    // caller with a rejection it earned before the caller existed.
    return Promise.race([
      this.#allThemeFamiliesByIdAsyncVariable.promise,
      wait(EXTENSION_THEMES_GRACE_PERIOD_MS).then(() => {
        throw new Error(
          'The theme list has not been published yet, so there is nothing to pick a theme from',
        );
      }),
    ]);
  }

  /** Drop the live theme-list subscription, if there is one */
  #dropAllThemesSubscription(): void {
    const unsubscribe = this.#unsubscribeAllThemes;
    this.#unsubscribeAllThemes = undefined;
    if (!unsubscribe) return;
    try {
      unsubscribe();
    } catch (e) {
      // The usual reason is that the provider it belonged to is already gone, which is also the
      // reason this is being replaced. Nothing to do about it and nothing depending on it.
      logger.debug(
        `Theme service host could not unsubscribe from a theme list it had replaced. ${getErrorMessage(e)}`,
      );
    }
  }

  /**
   * Start the window in which extension-contributed themes may still arrive, on the first payload
   * of the theme list. See {@link EXTENSION_THEMES_GRACE_PERIOD_MS}.
   */
  #startExtensionThemesGracePeriod(): void {
    if (this.#extensionThemesGracePeriodTimeout !== undefined) return;
    this.#extensionThemesGracePeriodTimeout = setTimeout(() => {
      if (this.#isDisposed) return;
      this.#hasExtensionThemesGracePeriodElapsed = true;
      // The current theme is now judged missing rather than late. Reset it if the list does not
      // have it — the family's extension was removed or renamed, and nothing else would notice.
      const updatedCurrentTheme =
        this.#allThemeFamiliesById?.[this.currentTheme.themeFamilyId]?.[this.currentTheme.type];
      if (updatedCurrentTheme) return;
      this.#resetCurrentThemeNoUpdate();
      this.notifyUpdate('CurrentTheme');
    }, EXTENSION_THEMES_GRACE_PERIOD_MS);
    this.unsubscribeEventListeners.add(() => {
      clearTimeout(this.#extensionThemesGracePeriodTimeout);
      return true;
    });
  }

  #setCurrentThemeNoUpdate(newTheme: ThemeDefinitionExpanded) {
    this.currentTheme = newTheme;
    // Persisted before the announcement, and the announcement is isolated: main registers one
    // subscriber per window, so a plain emit would let one throwing subscriber cost every later
    // window its repaint AND — emitting first — cost the write. The store is a lagging record of
    // memory either way, but the announcement is what keeps everything else agreeing with it.
    if (!this.#isSuppressingSaves) this.#saveCurrentTheme(this.currentTheme);
    // The one place the current theme is assigned, so main's title bar hears every change rather
    // than the subset that is also persisted — including a theme adopted from a migration offer.
    onDidChangeCurrentThemeEmitter.emitIsolated(newTheme, (error) => {
      logger.error(
        `A consumer threw while being told the current theme changed; the rest were still told: ${getErrorMessage(error)}`,
      );
    });
  }

  /** Sets current theme to default */
  #resetCurrentThemeNoUpdate() {
    return this.#setCurrentThemeNoUpdate(
      this.#allThemeFamiliesById?.[DEFAULT_THEME_FAMILY]?.[this.currentTheme.type] ?? DEFAULT_THEME,
    );
  }

  #setShouldMatchSystemNoUpdate(newShouldMatchSystem: boolean) {
    this.shouldMatchSystem = newShouldMatchSystem;
    if (this.#isSuppressingSaves) return;
    this.#saveShouldMatchSystem(this.shouldMatchSystem);
  }

  #setUserThemesNoUpdate(newUserThemes: ThemeFamiliesById) {
    this.userThemes = newUserThemes;
    if (this.#isSuppressingSaves) return;
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
        // The current theme is not in the list. Only a reset once extension-contributed themes have
        // had their chance — before that this list is simply incomplete, and resetting would throw
        // away the theme of anyone whose theme extension has not finished loading.
        if (this.#hasExtensionThemesGracePeriodElapsed) {
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

/**
 * The engine, once {@link startThemeServiceHost} has built it. Built there rather than at module
 * load because it reads the OS dark-mode preference, and Electron's `nativeTheme` is unusable
 * before the app's `ready` event.
 */
let themeServiceEngine: ThemeDataProviderEngine | undefined;

/**
 * The current application theme, synchronously.
 *
 * Answers out of the engine once there is one, and out of what was loaded at module load before
 * that — which is the same value the engine is built with, so a caller earlier in startup than the
 * engine gets the theme rather than nothing.
 *
 * @experimental
 */
export function getCurrentThemeSync(): ThemeDefinitionExpanded {
  return themeServiceEngine?.currentTheme ?? currentThemeAtLoad;
}

/**
 * The theme to hand a window being created, so it paints its first frame with the theme the app is
 * actually on rather than the default. Travels as a query parameter on the window's URL (see
 * `THEME_STATE_QUERY_PARAMETER`), which is the same channel the window id arrives on.
 *
 * Read from memory, not from the store, because persistence lags memory (see
 * {@link schedulePersist}) — a window created moments after a theme change must still be told about
 * it.
 *
 * Asks whether this process has a theme worth handing over, NOT whether the user chose one (see
 * `HAS_USER_THEME_STATE_KEY`, which answers a different question): a theme derived from the
 * machine's dark-mode preference is the theme the app is on, and a window not told about it paints
 * light and flashes. A profile whose theme is still in a renderer's own store awaiting its one-time
 * handover is handled on the renderer's side, which is the only process that can see those keys —
 * they beat what is handed over for as long as they exist.
 *
 * @returns The theme, or `undefined` while this process is still on the compile-time default, which
 *   is what the window falls back to anyway — no point spending a multi-kilobyte query parameter
 *   saying so.
 * @experimental
 */
export function getCurrentThemeForNewWindow(): ThemeDefinitionExpanded | undefined {
  const currentTheme = getCurrentThemeSync();
  if (deepEqual(currentTheme, DEFAULT_THEME)) return undefined;
  return currentTheme;
}

/**
 * Register the data provider that backs the theme service. Must be called during main process
 * startup, before createWindow().
 */
export async function startThemeServiceHost(): Promise<void> {
  // `nativeTheme` cannot be touched before Electron is ready. Startup reaches here well before
  // `main.ts`'s own `app.whenReady()` handler runs, and `ready` fires off Electron's event loop
  // regardless of what this process is awaiting, so this is a wait rather than a deadlock.
  //
  // Marked because this start function is awaited in main's app-global service batch, which puts
  // the .NET data provider and the extension-host spawn behind Electron's `ready` event too. That
  // is invisible in the waterfall without a mark for the moment the wait ends.
  await app.whenReady();
  markStartup('theme-host-electron-ready');

  themeServiceEngine = new ThemeDataProviderEngine(
    currentThemeAtLoad,
    (currentTheme) => schedulePersist(CURRENT_THEME_STORAGE_KEY, currentTheme),
    loadShouldMatchSystem(),
    (shouldMatchSystem) => schedulePersist(SHOULD_MATCH_SYSTEM_STORAGE_KEY, shouldMatchSystem),
    async (allThemesHandler) => themeDataService.subscribeAllThemes(undefined, allThemesHandler),
    getCurrentSystemTheme(),
    onDidChangeSystemThemeEmitter.event,
    loadUserThemes(),
    (userThemes) => schedulePersist(USER_THEMES_STORAGE_KEY, userThemes),
  );

  // The theme list comes from a provider the EXTENSION HOST registers, and this runs inside main's
  // app-global service batch — before that process has even been spawned, and it can be replaced
  // later by `platform.restartExtensionHost`. So the subscription follows the provider onto the
  // network rather than being taken once here: one attempt now for the case where it is already
  // there, and one on every announcement that it exists.
  //
  // Matched on the id's prefix because a data provider's network object id is its provider name
  // plus a suffix this module has no business spelling; provider names are namespaced, so nothing
  // else starts with this one.
  const engine = themeServiceEngine;
  onDidCreateNetworkObject((networkObjectDetails) => {
    if (!startsWith(networkObjectDetails.id, themeDataServiceProviderName)) return;
    // Fire-and-forget: the subscribe reports its own failures and the next announcement retries.
    (async () => {
      await ThemeDataProviderEngine.subscribeToAllThemes(engine);
    })();
  });
  // Also fire-and-forget, and for a sharper reason: resolving a data provider that is not
  // registered spends the whole RPC retry budget (`MAX_REQUEST_ATTEMPTS` x
  // `REQUEST_ATTEMPT_WAIT_TIME_MS`, about ten seconds) before answering, and on a cold start it
  // never is — the extension host that registers it has not been spawned yet. Awaiting that here
  // would put those ten seconds in front of the .NET and extension-host spawns, which main awaits
  // after the batch this function runs in. This attempt is only for the case where the provider is
  // already there; the announcement above is what takes the subscription otherwise.
  (async () => {
    await ThemeDataProviderEngine.subscribeToAllThemes(engine);
  })();

  // One listener for the app, for the life of the app. `nativeTheme` fires `updated` for changes
  // that leave the dark-mode answer alone, so only a real flip is announced.
  let lastAnnouncedSystemTheme = getCurrentSystemTheme();
  nativeTheme.on('updated', () => {
    const systemTheme = getCurrentSystemTheme();
    if (systemTheme === lastAnnouncedSystemTheme) return;
    lastAnnouncedSystemTheme = systemTheme;
    onDidChangeSystemThemeEmitter.emit(systemTheme);
  });

  // Mark ONLY the migration method on the (otherwise stable) theme data provider, via per-method
  // `x-experimental` in documentation.methods[] — NOT the object-level flag, which would wrongly
  // mark the stable getCurrentTheme/setCurrentTheme methods too. Mirrors the `@experimental` TSDoc
  // on `IThemeServiceInternal` in the theme service model.
  await dataProviderService.registerEngine(
    themeServiceDataProviderName,
    themeServiceEngine,
    undefined,
    undefined,
    {
      methods: [
        {
          name: 'migrateStoredThemeState',
          'x-experimental': true,
          summary:
            'Hand over previously persisted theme state for the host to adopt (first offer adopted wins)',
          params: [
            {
              name: 'state',
              required: true,
              summary: 'Previously persisted current theme, should-match-system, and user themes',
              schema: { type: 'object' },
            },
          ],
          result: { name: 'didAdopt', schema: { type: 'boolean' } },
        },
      ],
    },
  );
  logger.info('Theme service host registered');
}
