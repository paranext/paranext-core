import { useEffect, useRef, useState } from 'react';
import { useSetting } from '@renderer/hooks/papi-hooks';
import { isPlatformError } from 'platform-bible-utils';
import type { SettingTypes } from 'papi-shared-types';
import type { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import type { SettingDataTypes } from '@shared/services/settings.service-model';

type InterfaceMode = SettingTypes['platform.interfaceMode'];

/**
 * `localStorage` key for the last-known `platform.interfaceMode`. We seed the hook's initial value
 * from this so the first render after startup matches the user's actual mode instead of the
 * hardcoded `'simple'` default. Without the seed, power-mode users briefly see simple-mode UI
 * (project picker shown, scroll-group selector hidden, etc.) until `useSetting` resolves and
 * triggers a re-render, which is visible as a flicker.
 */
export const INTERFACE_MODE_CACHE_KEY = 'platform-bible.interfaceMode';

/**
 * Reads the last-known `platform.interfaceMode` from the `localStorage` cache, or `undefined` on a
 * miss / unavailable storage. Returning `undefined` (rather than defaulting) lets each caller apply
 * its own fallback: this hook seeds `'simple'`, while the first-run store keeps `undefined` to
 * distinguish "no cached mode yet" from "cached as simple". Shared so the cache format/accepted
 * values live in one place and the gate's power-vs-simple routing can't silently diverge.
 */
export function readCachedInterfaceMode(): InterfaceMode | undefined {
  try {
    const raw = localStorage.getItem(INTERFACE_MODE_CACHE_KEY);
    if (raw === 'power' || raw === 'simple') return raw;
  } catch {
    // localStorage may be unavailable (e.g. in some test or sandboxed environments); fall through
  }
  return undefined;
}

function writeCachedInterfaceMode(mode: InterfaceMode): void {
  try {
    localStorage.setItem(INTERFACE_MODE_CACHE_KEY, mode);
  } catch {
    // Best-effort cache; a failed write just means the next startup falls back to 'simple'
  }
}

/**
 * Returns the current `platform.interfaceMode` (always a safe `'simple' | 'power'` value, falling
 * back to the last known mode and then to `'simple'` while the setting is loading or if reading it
 * fails) along with a setter and whether that value is actually _known_. Companion to
 * {@link useIsPowerMode}, which only reads the mode.
 *
 * On startup the initial value is seeded from a `localStorage` cache of the last resolved mode so
 * mode-gated UI doesn't flash the wrong layout before `useSetting` resolves the real value. The
 * fallback then tracks each mode the session resolves, so it stays right after the user switches
 * modes — which they can do without ever remounting this hook.
 *
 * `setMode` is `undefined` whenever {@link useSetting} has nothing to write through — call it as
 * `setMode?.(…)`.
 *
 * `isModeKnown` is `false` only until the first read settles with no mode behind it, and never
 * returns to `false` afterwards. It means "we have a value worth acting on", not "verified": a
 * cached mode counts, and so does the `'simple'` assumed after a failed read. Power-only UI can
 * ignore it (its own `mode === 'power'` test already fails closed), but **simple-only UI must gate
 * on it**: without that check, `'simple'` means "really simple" and "we don't know yet" alike, so
 * simple-only affordances render for power users until the setting resolves.
 */
export function useInterfaceMode(): [
  mode: InterfaceMode,
  setMode:
    | ((newMode: InterfaceMode) => Promise<DataProviderUpdateInstructions<SettingDataTypes>>)
    | undefined,
  isModeKnown: boolean,
] {
  // Read the cache once per mount rather than every render: it is what seeded `useSetting` below,
  // so re-reading it could later disagree with the value React actually started from.
  const [cachedMode] = useState(readCachedInterfaceMode);

  // The best mode we have to stand in for a read we cannot trust. It starts at the cached mode and
  // then advances to every mode this session actually resolves, because the user can switch modes
  // without remounting this hook: a fallback frozen at mount would answer with the mode they left,
  // putting simple-only UI in the power toolbar on the first read failure after a switch.
  //
  // A ref rather than state because it is only ever consulted on a render the settings read has
  // already triggered — a read that failed, or `isLoading` back on — and it is only ever written
  // when the read settled successfully, which is exactly when it is not consulted. So it never
  // needs to cause a render of its own, and as state it would add one on mount to every consumer.
  const lastKnownModeRef = useRef(cachedMode);
  const lastKnownMode = lastKnownModeRef.current;

  const [modePossiblyError, setMode, , isLoading] = useSetting(
    'platform.interfaceMode',
    cachedMode ?? 'simple',
  );

  const didReadFail = isPlatformError(modePossiblyError);
  // A failed read falls back to the last known mode before 'simple', so a transient read error does
  // not demote a user we already know to be in power mode into simple-mode UI.
  const mode: InterfaceMode = didReadFail ? (lastKnownMode ?? 'simple') : modePossiblyError;

  // Known once the setting settles — including when it settles as a failure, which resolves to the
  // last known mode or to 'simple' and is as good an answer as we will get — and immediately when
  // a mode is already known, whether from the cache at mount or from an earlier resolve this
  // session. Only a read still in flight with no mode behind it is unknown.
  //
  // Treating a settled failure as unknown would hide simple-only UI for the whole session, and for
  // every session after it, since nothing would ever be cached to break the cycle. Keeping an
  // earlier resolve as known is what makes this one-way: `isLoading` goes back to true whenever the
  // subscription is rebuilt — for `useData`'s whole runaway cooldown, among others — and dropping
  // back to unknown there would unmount and remount every mode-gated control mid-session.
  const isModeKnown = !isLoading || lastKnownMode !== undefined;

  useEffect(() => {
    // Keep only a mode the read actually produced. `mode` reports a fallback both while the read is
    // still in flight and whenever it is a `PlatformError` — including while `useData`'s runaway
    // guard is throttled — and either fallback is meant to last only as long as its cause.
    // Persisting one outlives that: this cache is the startup seed `computeInitialStatus` reads, so
    // a Power user would be routed through the first-run gate on the next launch.
    if (isLoading || didReadFail) return;
    lastKnownModeRef.current = mode;
    writeCachedInterfaceMode(mode);
  }, [didReadFail, isLoading, mode]);

  return [mode, setMode, isModeKnown];
}

export default useInterfaceMode;
