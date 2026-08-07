/**
 * This window's local representation of the app-global theme service, whose authority is
 * `theme.service-host.ts` in main.
 *
 * It is a cache with a synchronous façade. This window paints its first frame — and bakes a
 * stylesheet into every web view's `srcdoc` — before any service has started, so this module keeps
 * a copy of the host's current theme, seeded before React renders and kept current by the host's
 * subscription, and serves `getCurrentThemeSync` from it. Everything else on the theme service is a
 * plain pass-through to the host: there is no synchronous writer here to predict with.
 *
 * ONE ANSWER PER WINDOW. This module is what `papi.themes` resolves to in the renderer (see
 * `papi-frontend.service.ts`), so a web view cannot get one answer from `papi.themes` and a
 * different one from the stylesheet it was rendered with.
 */

import { THEME_STATE_QUERY_PARAMETER } from '@shared/data/platform.data';
import { dataProviderService } from '@shared/services/data-provider.service';
import { logger } from '@shared/services/logger.service';
import {
  CURRENT_THEME_STORAGE_KEY,
  IThemeHostService,
  IThemeService,
  IThemeServiceLocal,
  PersistedThemeState,
  SHOULD_MATCH_SYSTEM_STORAGE_KEY,
  themeServiceDataProviderName,
  themeServiceObjectToProxy,
  USER_THEMES_STORAGE_KEY,
} from '@shared/services/theme.service-model';
import { DEFAULT_THEME } from '@shared/utils/built-in-themes.util';
import { createCachedInitializer } from '@shared/utils/cached-initializer';
import {
  createSyncProxyForAsyncObject,
  deserialize,
  getErrorMessage,
  isPlatformError,
  PlatformEvent,
  PlatformEventEmitter,
  ThemeDefinitionExpanded,
} from 'platform-bible-utils';

// #region the host

/**
 * The theme service host's data provider.
 *
 * Main registers it before any window is created and keeps it for the life of the app, so there is
 * nothing to re-arm here: resolving it once is enough, and a failure to resolve it is a startup
 * problem rather than a handover to wait out. `createCachedInitializer` still retries a FAILED
 * resolution, which is the case that remains — a consumer that asks before the provider has been
 * announced.
 */
const getThemeProvider = createCachedInitializer<IThemeService>(async () => {
  const provider = await dataProviderService.get(themeServiceDataProviderName);
  if (!provider) throw new Error('Theme service undefined');
  return provider;
});

// #endregion

// #region the cache

/** Whether a value is shaped like a theme this module can serve to the UI */
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

/**
 * The theme main handed this window on its URL when it created it, if any.
 *
 * This is how the cache is right on the FIRST frame. React renders before the network is even up,
 * and the stylesheet this window paints with — plus the one baked into every web view's `srcdoc` —
 * is read synchronously during that render, so a cache that could only be filled by a round trip
 * would paint the default theme and then flash into the real one.
 *
 * Absent on a profile main has no theme for yet, and unreadable input is treated the same as
 * absent: this runs while the module is being evaluated, where a throw takes the window down with
 * it.
 */
function readWindowCreationCurrentTheme(): ThemeDefinitionExpanded | undefined {
  try {
    const serialized = new URLSearchParams(globalThis.location?.search ?? '').get(
      THEME_STATE_QUERY_PARAMETER,
    );
    return serialized ? deserialize(serialized) : undefined;
  } catch (e) {
    logger.warn(`Could not read the theme this window was created with. ${getErrorMessage(e)}`);
    return undefined;
  }
}

/**
 * Where the theme state used to be persisted, back when a renderer hosted the theme engine: this
 * window's own `localStorage`, under the keys the host now uses for its own store. The host cannot
 * read it — main's `localStorage` polyfill is a different store in a different place — so a profile
 * that predates the host has to hand it over, and until it has, this is the only thing in this
 * process that knows which theme the user chose.
 *
 * This module never treats these keys as its own state: they are read to paint the first frame on
 * the one start where main has nothing yet, and to be offered once (see
 * {@link handOverPreviouslyStoredThemeState}). Both this and the offer stop being reachable once
 * every profile that could be carrying them has started the app.
 */
function readPreviouslyStoredThemeState(): PersistedThemeState | undefined {
  try {
    const storedCurrentTheme = localStorage.getItem(CURRENT_THEME_STORAGE_KEY);
    const storedShouldMatchSystem = localStorage.getItem(SHOULD_MATCH_SYSTEM_STORAGE_KEY);
    const storedUserThemes = localStorage.getItem(USER_THEMES_STORAGE_KEY);
    if (!storedCurrentTheme && !storedShouldMatchSystem && !storedUserThemes) return undefined;
    return {
      currentTheme: storedCurrentTheme ? deserialize(storedCurrentTheme) : undefined,
      shouldMatchSystem: storedShouldMatchSystem ? deserialize(storedShouldMatchSystem) : undefined,
      userThemes: storedUserThemes ? deserialize(storedUserThemes) : undefined,
    };
  } catch (e) {
    logger.warn(
      `Could not read the theme state stored in this window before the theme service host existed. ${getErrorMessage(e)}`,
    );
    return undefined;
  }
}

/**
 * Work out the theme to paint with before anything has started, synchronously, while this module is
 * being evaluated — which is before React renders.
 *
 * What main handed over wins: it is the app's live theme, and it is the only one of the two that
 * moves while the app runs. This window's own leftover store is the fallback for the single start
 * after an upgrade, where main has nothing until the handover in {@link startThemeService}
 * completes. The default is the last resort, for a profile that has never chosen a theme.
 */
function seedCurrentThemeBeforeFirstRender(): ThemeDefinitionExpanded {
  const fromMain = readWindowCreationCurrentTheme();
  if (isThemeShaped(fromMain)) return fromMain;
  const fromOwnStore = readPreviouslyStoredThemeState()?.currentTheme;
  if (isThemeShaped(fromOwnStore)) return fromOwnStore;
  return DEFAULT_THEME;
}

/** This window's copy of the current application theme */
let cachedCurrentTheme: ThemeDefinitionExpanded = seedCurrentThemeBeforeFirstRender();

const onDidChangeCurrentThemeEmitter = new PlatformEventEmitter<ThemeDefinitionExpanded>();

/**
 * Event that emits with the new current theme whenever it changes.
 *
 * For this window's own consumers — the document's theme stylesheet — which need the cache to have
 * been updated by the time they react, so subscribing to the host separately would be a race
 * between two deliveries of the same change.
 *
 * @experimental
 */
export const onDidChangeCurrentTheme: PlatformEvent<ThemeDefinitionExpanded> =
  onDidChangeCurrentThemeEmitter.event;

/**
 * The current application theme, synchronously, for the UI that cannot await a round trip: the
 * document's stylesheet on first load and the stylesheet baked into a new web view's `srcdoc`.
 *
 * @experimental
 */
export function getCurrentThemeSync(): ThemeDefinitionExpanded {
  return cachedCurrentTheme;
}

// #endregion

// #region startup

/**
 * Keep this window's copy current as the host announces theme changes, whoever caused them.
 *
 * `retrieveDataImmediately` so this doubles as the seed from the host: what the window was created
 * with is right at the moment of creation, and this closes the gap between then and now.
 *
 * The unsubscriber is deliberately never called — this module is a session-lifetime singleton and
 * the provider outlives every window.
 *
 * HIDDEN VIEWS — this sync is data-driven and deliberately does nothing about visibility. It writes
 * one cache entry that the synchronous reader serves and reads no geometry: nothing here measures,
 * scrolls, or focuses anything, so it behaves identically in a minimized or occluded window and in
 * a window whose tabs are inactive (display-none) panes. There is no catch-up to defer either — a
 * hidden view re-renders from this already-current cache when it is shown, and the CSS variables
 * the theme sets apply to a hidden subtree as soon as it is displayed.
 */
async function subscribeToCurrentTheme(): Promise<void> {
  const provider = await getThemeProvider();
  await provider.subscribeCurrentTheme(
    undefined,
    (currentTheme) => {
      if (isPlatformError(currentTheme)) {
        logger.warn(
          `Could not read the current theme from the theme service host; this window keeps the theme it has. ${getErrorMessage(currentTheme)}`,
        );
        return;
      }
      cachedCurrentTheme = currentTheme;
      onDidChangeCurrentThemeEmitter.emit(currentTheme);
    },
    { retrieveDataImmediately: true },
  );
}

/**
 * Offer this window's previously stored theme state (see {@link readPreviouslyStoredThemeState}) to
 * the host, which adopts it only if it has none of its own. Every window offers, and the host takes
 * the first — they are all offering the same state, since these keys were app-global even while a
 * renderer held them.
 *
 * The offer is terminal in both directions. Adopted means the host now owns it; refused means the
 * host has state that beats it. Either way this window's copy is finished, so the keys are removed:
 * left in place they would be re-offered by every window on every start forever, and — worse — a
 * profile whose main-process store is ever cleared would silently resurrect a theme from before the
 * host existed. Only a rejection (the host was unreachable, or could not store what it adopted)
 * keeps them, because that is the one case where this copy is still the only one.
 *
 * Best-effort: a failed offer costs the user the theme they chose for this session, which choosing
 * again fixes, and it leaves the host with nothing adopted so a later start can offer again.
 */
async function handOverPreviouslyStoredThemeState(): Promise<void> {
  const previouslyStoredState = readPreviouslyStoredThemeState();
  if (!previouslyStoredState) return;
  try {
    const provider = await getThemeProvider();
    // The provider also carries the platform's own state-keeping methods (see
    // `IThemeServiceInternal`), which are deliberately off the `DataProviders` entry so
    // `papi.themes` does not offer them. This is the one call in this process that needs one.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await (provider as IThemeHostService).migrateStoredThemeState(previouslyStoredState);
    localStorage.removeItem(CURRENT_THEME_STORAGE_KEY);
    localStorage.removeItem(SHOULD_MATCH_SYSTEM_STORAGE_KEY);
    localStorage.removeItem(USER_THEMES_STORAGE_KEY);
  } catch (e) {
    logger.warn(
      `Could not hand this window's previously stored theme state to the theme service host; it will be offered again. ${getErrorMessage(e)}`,
    );
  }
}

/**
 * Start this window's theme service: hand over any theme state stored before the host existed, then
 * subscribe to the host so this window's copy stays current.
 *
 * Handing over first so the subscription's immediate delivery already carries whatever was adopted,
 * rather than the state main had a moment before. A handover that fails must not cost this window
 * the subscription — that would cost it every theme change for the rest of the session, where the
 * failed handover only costs it the theme the user left off at.
 *
 * Call once at renderer startup.
 */
export async function startThemeService(): Promise<void> {
  await handOverPreviouslyStoredThemeState();
  await subscribeToCurrentTheme();
}

// #endregion

// #region the service this window's consumers see

const themeServiceSyncAdditions = Object.freeze({
  ...themeServiceObjectToProxy,
  getCurrentThemeSync,
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
  themeServiceSyncAdditions,
) as IThemeServiceLocal;

// #endregion
