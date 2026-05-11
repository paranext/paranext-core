import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Shape of the per-user Markers Checklist defaults setting
 * (`platformScripture.markersChecklistDefaults`). Mirrors the SettingTypes augmentation in
 * `types/platform-scripture.d.ts`; the duplication here is intentional so consumers of this hook do
 * not need the augmentation import on every call site.
 *
 * Decision A1 (rebase onto PR #2276): only view preferences (comparative-projects list + the two
 * eye-icon toggles) participate in this user-defaults snapshot. Marker-config fields
 * (`equivalentMarkers` / `markerFilter`) are project-scoped and live in
 * `platformScripture.checklistEquivalentMarkers` / `platformScripture.checklistMarkerFilter`.
 */
export type ChecklistDefaults = {
  comparativeTextIds: string[];
  hideMatches: boolean;
  showVerseText: boolean;
};

const SETTING_KEY = 'platformScripture.markersChecklistDefaults';

const STATIC_DEFAULTS: ChecklistDefaults = {
  comparativeTextIds: [],
  hideMatches: false,
  showVerseText: false,
};

/**
 * Reads the per-user "Markers Checklist defaults" setting and exposes a setter that writes back
 * (UX-2 follow-up finding #22, WP7). Used by `checklist.web-view.tsx` to seed its `useWebViewState`
 * slots so a new checklist tab — or a fresh app session — inherits the user's last-committed
 * defaults.
 *
 * Returns `[defaults, isLoading, writeDefaults]`:
 *
 * - `defaults` is `undefined` while the initial async read is in flight. Consumers MUST gate any
 *   `useWebViewState(defaults?.field)` seeding on `isLoading === false`, because `useWebViewState`
 *   consults the supplied default only on first render (see
 *   `src/renderer/hooks/use-web-view-state.hook.ts:33-35` — `useState(() => ...)` lazy init). A
 *   transient `undefined` default at mount would seed the slot with the static default forever,
 *   defeating persistence.
 * - `isLoading` flips to `false` once the read settles (success OR failure).
 * - `writeDefaults` merges a partial update with the latest snapshot (held in `latestRef`) and writes
 *   the full object back to `papi.settings`. Errors are swallowed and logged — a failed persist
 *   degrades to per-tab-only persistence (the user's current tab still works) and the next field
 *   change will retry the write.
 *
 * @see ux-followup-implementation-plan.md §WP7
 */
export function useChecklistDefaults(): readonly [
  ChecklistDefaults | undefined,
  boolean,
  (next: Partial<ChecklistDefaults>) => Promise<void>,
] {
  const [defaults, setDefaults] = useState<ChecklistDefaults | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Tracks the latest full snapshot so `writeDefaults` can merge a partial update without
  // re-reading from `papi.settings`. Initialised to STATIC_DEFAULTS and overwritten as soon as the
  // initial read resolves; subsequent `writeDefaults` calls also update it.
  const latestRef = useRef<ChecklistDefaults>(STATIC_DEFAULTS);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const value = await papi.settings.get(SETTING_KEY);
        if (cancelled) return;
        // Merge static defaults under the persisted value so any new field added in a future
        // setting-schema bump appears with its declared default instead of `undefined`. Also
        // tolerates a corrupted/partial setting payload (legacy installs, manual edits).
        const next: ChecklistDefaults = { ...STATIC_DEFAULTS, ...value };
        latestRef.current = next;
        setDefaults(next);
      } catch (err) {
        logger.warn(`useChecklistDefaults: read failed: ${getErrorMessage(err)}`);
        if (!cancelled) {
          latestRef.current = STATIC_DEFAULTS;
          setDefaults(STATIC_DEFAULTS);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const writeDefaults = useCallback(async (next: Partial<ChecklistDefaults>) => {
    const merged: ChecklistDefaults = { ...latestRef.current, ...next };
    latestRef.current = merged;
    try {
      await papi.settings.set(SETTING_KEY, merged);
    } catch (err) {
      // Persistence is best-effort: a failed write leaves the in-memory snapshot intact and the
      // next change will retry. Surfacing this as a toast would be noisy for a transient
      // settings-service blip, so we log at warn level instead.
      logger.warn(`useChecklistDefaults: write failed: ${getErrorMessage(err)}`);
    }
  }, []);

  return [defaults, isLoading, writeDefaults] as const;
}

export default useChecklistDefaults;
