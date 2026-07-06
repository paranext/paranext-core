/**
 * === NEW IN PT10 === keyboard-switching UI-PKG-002 (CAP-UI-001): PAPI wiring layer for the
 * per-project keyboard-selection dialog. The presentational component
 * (`keyboard-selection.component.tsx`, UX-approved in phase-3-ui-design) is a pure function of
 * props; this thin web view owns all data fetching and persistence following the manage-books
 * direct-commit pattern (ui-alignment.md §"Direct-Commit Dialog Pattern", alignment-decision #11).
 *
 * Wiring responsibilities:
 *
 * - Reads (plural, one `useData` call per concern — alignment-decision #29 §C):
 *   `ProjectDefaultKeyboards(projectId, {})`, `LastUsedKeyboards(projectId, {})`,
 *   `AvailableKeyboards(undefined, [])` on the `platform.keyboard` data provider.
 * - Reads `projectInterfaces` + project short-name once at open via
 *   `papi.projectLookup.getMetadataForProject` / the `platform.base` PDP (alignment-decision #30).
 * - OK: per-surface `papi.keyboard.setProjectDefaultKeyboard({ projectId, surfaceType }, kid)` loop
 *   over the rendered surfaces (no hardcoded surface names at the write site), then
 *   `papi.webViews.closeWebView(webViewId)`.
 * - Cancel / Escape: `papi.webViews.closeWebView(webViewId)` only — no writes (BHV-309).
 * - Write errors surface via `papi.notifications.send({ severity: 'error', ... })` and the dialog
 *   stays open so the user may retry or cancel.
 */
import papi, { logger } from '@papi/frontend';
import { useData, useLocalizedStrings } from '@papi/frontend/react';
import { WebViewProps } from '@papi/core';
import { getErrorMessage, isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  KEYBOARD_SELECTION_STRING_KEYS,
  KEYBOARD_SELECTION_SURFACE_TYPES,
  KeyboardSelection,
  KeyboardSelectionKeyboardOption,
  KeyboardSelectionLocalizedStrings,
  KeyboardSelectionSelections,
} from './keyboard-selection.component';

/** The `platform.keyboard` data provider name (CAP-015/CAP-016). */
const KEYBOARD_DATA_PROVIDER_NAME = 'platform.keyboard';

global.webViewComponent = function KeyboardSelectionWebView({ projectId }: WebViewProps) {
  // ===== Localization ========================================================
  const stringKeys = useMemo<LocalizeKey[]>(() => [...KEYBOARD_SELECTION_STRING_KEYS], []);
  const [localizedStringsRaw] = useLocalizedStrings(stringKeys);
  // Copy the resolved keys into the component's typed map shape (avoids an `as`-assertion at the
  // wire boundary — same approach as manage-books' pickerLocalizedStrings).
  const localizedStrings = useMemo<KeyboardSelectionLocalizedStrings>(() => {
    const out: KeyboardSelectionLocalizedStrings = {};
    KEYBOARD_SELECTION_STRING_KEYS.forEach((key) => {
      const value = localizedStringsRaw[key];
      if (typeof value === 'string') out[key] = value;
    });
    return out;
  }, [localizedStringsRaw]);

  // ===== Project metadata: projectInterfaces + short-name ====================
  // Read once at open (alignment-decision #30). `projectInterfaces` drives which surface
  // dropdowns render; the short-name is interpolated into the dialog description.
  const [projectInterfaces, setProjectInterfaces] = useState<readonly string[] | undefined>(
    undefined,
  );
  const [projectShortName, setProjectShortName] = useState<string>('');
  useEffect(() => {
    if (!projectId) {
      // No project context — render the resource-like single-dropdown shape with no short-name.
      setProjectInterfaces([]);
      return undefined;
    }
    let cancelled = false;
    (async () => {
      try {
        const metadata = await papi.projectLookup.getMetadataForProject(projectId);
        if (!cancelled) setProjectInterfaces(metadata.projectInterfaces);
      } catch (error) {
        logger.warn(
          `keyboard-selection: getMetadataForProject(${projectId}) failed: ${getErrorMessage(error)}`,
        );
        if (!cancelled) setProjectInterfaces([]);
      }
      try {
        const pdp = await papi.projectDataProviders.get('platform.base', projectId);
        const nameSetting = await pdp.getSetting('platform.name');
        if (!cancelled)
          setProjectShortName(typeof nameSetting === 'string' ? nameSetting : projectId);
      } catch {
        // Best-effort: fall back to the raw project id as the display name.
        if (!cancelled) setProjectShortName(projectId);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  // ===== PAPI data reads (plural read-only data types — alignment-decision #29 §C) ====
  const [configuredDefaultsRaw, , isLoadingDefaults] = useData(
    projectId ? KEYBOARD_DATA_PROVIDER_NAME : undefined,
  ).ProjectDefaultKeyboards(projectId ?? '', {});
  const [lastUsedRaw, , isLoadingLastUsed] = useData(
    projectId ? KEYBOARD_DATA_PROVIDER_NAME : undefined,
  ).LastUsedKeyboards(projectId ?? '', {});
  const [availableKeyboardsRaw, , isLoadingAvailable] = useData(
    KEYBOARD_DATA_PROVIDER_NAME,
  ).AvailableKeyboards(undefined, []);

  const configuredKeyboardIds = useMemo(() => {
    if (isPlatformError(configuredDefaultsRaw)) {
      logger.warn(
        `keyboard-selection: ProjectDefaultKeyboards read failed: ${getErrorMessage(configuredDefaultsRaw)}`,
      );
      return {};
    }
    return configuredDefaultsRaw;
  }, [configuredDefaultsRaw]);

  const lastUsedKeyboardIds = useMemo(() => {
    if (isPlatformError(lastUsedRaw)) {
      logger.warn(
        `keyboard-selection: LastUsedKeyboards read failed: ${getErrorMessage(lastUsedRaw)}`,
      );
      return {};
    }
    return lastUsedRaw;
  }, [lastUsedRaw]);

  const availableKeyboards = useMemo<readonly KeyboardSelectionKeyboardOption[]>(() => {
    if (isPlatformError(availableKeyboardsRaw)) {
      logger.warn(
        `keyboard-selection: AvailableKeyboards read failed: ${getErrorMessage(availableKeyboardsRaw)}`,
      );
      return [];
    }
    return availableKeyboardsRaw;
  }, [availableKeyboardsRaw]);

  /** Distinguishes successful empty enumeration from a failed one (gm-012 vs FN-008 error). */
  const loadError = isPlatformError(availableKeyboardsRaw) ? 'unknown' : 'none';

  // The dialog counts as "loading" until every initial read has resolved — keyboard enumeration
  // (FN-013) plus the persisted defaults / last-used / projectInterfaces the initial selection is
  // computed from (the component initializes its selections once loading settles).
  const isLoadingKeyboards =
    isLoadingAvailable || isLoadingDefaults || isLoadingLastUsed || projectInterfaces === undefined;

  // ===== OK / Cancel handlers (direct-commit — ui-alignment §"OK / Cancel Handlers") =====
  const handleOk = useCallback(
    async (selections: KeyboardSelectionSelections) => {
      if (projectId) {
        try {
          // Iterate the canonical surface-type list rather than hardcoding surface names
          // (alignment-decision #29 §C). The component only includes keys for RENDERED surfaces
          // (isSurfaceRendered filter), so non-rendered surfaces are naturally skipped.
          // Sequential awaits intentional: writes are ordered per-surface and the dialog only
          // closes after every write succeeds.
          for (let i = 0; i < KEYBOARD_SELECTION_SURFACE_TYPES.length; i += 1) {
            const surfaceType = KEYBOARD_SELECTION_SURFACE_TYPES[i];
            if (Object.prototype.hasOwnProperty.call(selections, surfaceType)) {
              // Sequential awaits intentional: per-surface writes are ordered and the dialog only
              // closes after every write succeeds (see loop-level comment above).
              // eslint-disable-next-line no-await-in-loop
              await papi.keyboard.setProjectDefaultKeyboard(
                { projectId, surfaceType },
                selections[surfaceType],
              );
            }
          }
        } catch (error) {
          // Surface via the standard platform error toast; do NOT close on error — the user may
          // retry or cancel (UI-PKG-002 acceptance criteria / ui-alignment error contract).
          papi.notifications.send({ message: getErrorMessage(error), severity: 'error' });
          return;
        }
      }
      try {
        await papi.webViews.closeWebView(globalThis.webViewId);
      } catch (error) {
        logger.warn(`keyboard-selection: closeWebView failed: ${getErrorMessage(error)}`);
      }
    },
    [projectId],
  );

  const handleCancel = useCallback(async () => {
    // Cancel / Escape / X-close: just close. No PAPI writes (BHV-309).
    try {
      await papi.webViews.closeWebView(globalThis.webViewId);
    } catch (error) {
      logger.warn(`keyboard-selection: closeWebView failed: ${getErrorMessage(error)}`);
    }
  }, []);

  return (
    <KeyboardSelection
      projectShortName={projectShortName}
      projectInterfaces={projectInterfaces ?? []}
      configuredKeyboardIds={configuredKeyboardIds}
      lastUsedKeyboardIds={lastUsedKeyboardIds}
      availableKeyboards={availableKeyboards}
      isLoadingKeyboards={isLoadingKeyboards}
      loadError={loadError}
      localizedStrings={localizedStrings}
      onOk={handleOk}
      onCancel={handleCancel}
    />
  );
};
