import type { InternetSettings } from 'paratext-registration';
import { Alert, AlertDescription, Button } from 'platform-bible-react';
import {
  DeveloperSection,
  DEVELOPER_SECTION_STRING_KEYS,
  InternetAccessOptionList,
  INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
} from 'platform-bible-react/experimental';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useDelayedFlag } from '@renderer/hooks/use-delayed-flag.hook';
import { sendCommand } from '@shared/services/command.service';
import { getJsonRpcRequestErrorMessagePrefix } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import { JSONRPCErrorCode } from 'json-rpc-2.0';
import { getErrorMessage, wait, type LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FirstRunStepProps } from '../first-run-step-props.model';
import { StepLoading } from '../step-loading.component';

// `internetSettings_*` keys come from the paratext-registration extension, `firstRun_*` from core
// (assets/localization). Both merge in the combiner, so the extension keys need no en.json entry.
const STRING_KEYS: LocalizeKey[] = [
  '%internetSettings_button_retry%',
  '%firstRun_step_internetSettings_connecting%',
  '%firstRun_step_internetSettings_loadError%',
  ...INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
  ...DEVELOPER_SECTION_STRING_KEYS,
];

// A first-run cold start can mount this step before the paratext-registration handlers register, so
// fetchInternetSettings() rejects with JSON-RPC "method not found". The command layer already retries
// that (~10 s per call, rpc.model.ts); registration can outlast one call, so we re-issue until the
// budget is spent. Matched via the shared producer so it can't drift from the RPC error format.
const METHOD_NOT_FOUND_MESSAGE_PREFIX = getJsonRpcRequestErrorMessagePrefix(
  JSONRPCErrorCode.MethodNotFound,
);
// Each call already blocks ~10 s (command-layer retry), up to ~30 s (client request timeout), so this
// budget affords only ~2-3 re-issues — generous on purpose, and independent of the equal-looking
// client timeout. Compare the sibling resolve-registration-validity.ts (REGISTRATION_RESOLVE_TIMEOUT_MS).
const SERVICE_STARTUP_BUDGET_MS = 30_000;
// Backoff between re-issues; only bites when a call rejects fast (a real method-not-found call already
// spent ~10 s upstream).
const SERVICE_STARTUP_RETRY_DELAY_MS = 500;
// Show the "getting ready" message after this much elapsed time — not attempt count; one attempt
// can block ~10 s.
const CONNECTING_MESSAGE_DELAY_MS = 2_000;

async function fetchInternetSettings() {
  return sendCommand('paratextRegistration.getParatextDataInternetSettings');
}

async function persistInternetSettings(settings: InternetSettings) {
  return sendCommand('paratextRegistration.setParatextDataInternetSettings', settings);
}

/**
 * First-run wizard step that lets the user configure internet access before registration. Saves
 * immediately on each selection change (immediate-apply model). The identify step's restart applies
 * the chosen setting — no second restart is needed here.
 *
 * Save concurrency: only one save is in flight at a time. A second selection while a save is
 * pending is ignored (the control is disabled). This prevents out-of-order saves from leaving
 * persisted state inconsistent with the displayed state.
 */
export function InternetSettingsStep({ setCanProceed }: FirstRunStepProps) {
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);
  const [settings, setSettings] = useState<InternetSettings | undefined>();
  const [loadFailed, setLoadFailed] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);
  // Bumped on each load() so a stale run (e.g. a superseded retry) can't write state over a newer one.
  const loadGeneration = useRef(0);

  // Reveal the "getting ready" message only once the load has been slow for a beat — active whenever
  // we're still loading (no settings yet, not failed). Declarative timer; no manual setTimeout here.
  const showConnectingMessage = useDelayedFlag(
    !settings && !loadFailed,
    CONNECTING_MESSAGE_DELAY_MS,
  );

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    loadGeneration.current += 1;
    const generation = loadGeneration.current;
    const isStale = () => !isMounted.current || loadGeneration.current !== generation;

    setCanProceed?.(false);
    setLoadFailed(false);

    const deadline = Date.now() + SERVICE_STARTUP_BUDGET_MS;
    let lastErrorMessage = '';
    while (Date.now() < deadline) {
      try {
        // Attempts are inherently sequential — each must finish before we decide to retry.
        // eslint-disable-next-line no-await-in-loop
        const loaded = await fetchInternetSettings();
        if (isStale()) return;
        setSettings(loaded);
        setCanProceed?.(true);
        return;
      } catch (err: unknown) {
        if (isStale()) return;
        lastErrorMessage = getErrorMessage(err);
        // Only a not-yet-registered handler is worth retrying; any other error is a real failure.
        if (!lastErrorMessage.includes(METHOD_NOT_FOUND_MESSAGE_PREFIX)) break;
        // Small backoff so a fast-rejecting handler can't spin the loop.
        // eslint-disable-next-line no-await-in-loop
        await wait(SERVICE_STARTUP_RETRY_DELAY_MS);
      }
    }
    // Fell through: a non-transient error, or the budget ran out while still unregistered.
    if (isStale()) return;
    // Show the user a friendly message; keep the raw RPC error in the log for debugging.
    logger.warn(`Could not load internet settings: ${lastErrorMessage}`);
    setLoadFailed(true);
  }, [setCanProceed]);

  useEffect(() => {
    load();
  }, [load]);

  const handleChange = useCallback(
    async (next: InternetSettings) => {
      if (isSaving) return;
      setSettings(next);
      setSaveError('');
      setIsSaving(true);
      setCanProceed?.(false);
      try {
        await persistInternetSettings(next);
        if (!isMounted.current) return;
        setIsSaving(false);
        setCanProceed?.(true);
      } catch (err: unknown) {
        if (!isMounted.current) return;
        setIsSaving(false);
        setSaveError(getErrorMessage(err));
        setCanProceed?.(false);
      }
    },
    [setCanProceed, isSaving],
  );

  if (loadFailed) {
    return (
      <div className="tw:flex tw:flex-col tw:gap-4">
        <Alert variant="destructive">
          <AlertDescription>
            {localizedStrings['%firstRun_step_internetSettings_loadError%']}
          </AlertDescription>
        </Alert>
        <Button variant="outline" onClick={load}>
          {localizedStrings['%internetSettings_button_retry%']}
        </Button>
      </div>
    );
  }

  if (!settings) {
    return (
      <StepLoading
        message={
          showConnectingMessage
            ? localizedStrings['%firstRun_step_internetSettings_connecting%']
            : undefined
        }
      />
    );
  }

  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      {saveError && (
        <Alert variant="destructive">
          <AlertDescription>{saveError}</AlertDescription>
        </Alert>
      )}
      <InternetAccessOptionList
        localizedStrings={localizedStrings}
        value={settings.permittedInternetUse}
        onChange={(v) => handleChange({ ...settings, permittedInternetUse: v })}
        disabled={isSaving}
      />
      <DeveloperSection
        localizedStrings={localizedStrings}
        selectedServer={settings.selectedServer}
        onServerChange={(s) => handleChange({ ...settings, selectedServer: s })}
        disabled={isSaving}
      />
    </div>
  );
}

export default InternetSettingsStep;
