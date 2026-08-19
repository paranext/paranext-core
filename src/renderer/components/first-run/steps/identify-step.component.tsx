import * as commandService from '@shared/services/command.service';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import {
  continueWithoutRegistration,
  isDemoMode,
  markJustRegistered,
} from '@renderer/services/first-run-store';
import { settingsService } from '@shared/services/settings.service';
import { logger } from '@shared/services/logger.service';
import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  Input,
  Label,
  Spinner,
  usePromise,
} from 'platform-bible-react';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { AlertCircle, CircleCheck } from 'lucide-react';
import { ChangeEvent, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { WizardStepForm } from '../wizard-step-form.component';
import { FirstRunStepProps } from '../first-run-step-props.model';
import { StepLoading } from '../step-loading.component';

// Copied from the paratext-registration extension — keep in sync if the extension changes.
//   REGISTRATION_CODE_REGEX_STRING, REGISTRATION_CODE_LENGTH_WITH_DASHES:
//     extensions/src/paratext-registration/src/components/registration-form-view.component.tsx
//   REGISTRATION_CODE_CHARACTER_VALIDATION_REGEX, REGISTRATION_CODE_INSERT_DASH_REGEX_STRING:
//     extensions/src/paratext-registration/src/components/registration-form.component.tsx
const REGISTRATION_CODE_CHARACTER_VALIDATION_REGEX = '^[a-zA-Z0-9\\-]*$';
// NOTE: the '[[' below is a pre-existing quirk in the extension's source — copied verbatim so the
// two stay identical. It is harmless: '[[' only adds literal '[' to the match, which the segment
// character-class filter in onRegistrationCodeChange rejects for real input anyway.
const REGISTRATION_CODE_INSERT_DASH_REGEX_STRING = '^[a-zA-Z0-9]{6}$|-[[a-zA-Z0-9\\-]{6}$';
export const REGISTRATION_CODE_REGEX_STRING =
  '^(?:[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}|\\*{6}-\\*{6}-\\*{6}-\\*{6}-\\*{6})$';
export const REGISTRATION_CODE_LENGTH_WITH_DASHES = 34;
// Kept as separate constants so each delay can be tuned independently.
export const VALIDATION_DEBOUNCE_MS = 1000;
export const INVALID_CODE_DISPLAY_DEBOUNCE_MS = 1000;

// No trailing slash: this is the exact string ParatextData returns for the Production environment,
// so the fallback and a real backend response are the same value.
const PRODUCTION_REGISTRY_URL = 'https://registry.paratext.org';

/**
 * Fetches the registry site URL for the selected server environment, falling back to production so
 * the link always has a target rather than going blank (and skips the lookup entirely in demo
 * mode). That is all the fallback guarantees — whether the target is reachable is a separate matter
 * (a retired host, or access blocked from the user's network or country, still reads as a broken
 * link). Module-scope so it is a stable `usePromise` callback.
 */
async function fetchRegistryUrl() {
  if (isDemoMode()) return PRODUCTION_REGISTRY_URL;
  try {
    const url = await commandService.sendCommand('paratextRegistration.getParatextRegistryUrl');
    return url || PRODUCTION_REGISTRY_URL;
  } catch (error) {
    logger.warn(
      `Could not resolve the selected registry URL; falling back to production: ${getErrorMessage(error)}`,
    );
    return PRODUCTION_REGISTRY_URL;
  }
}

// Eight %paratextRegistration_*% keys below are provided at runtime by the paratext-registration
// extension's localizedStrings.json via PAPI — they will not appear in en.json.
const KEYS: LocalizeKey[] = [
  '%paratextRegistration_label_registrationName%',
  '%paratextRegistration_label_registrationCode%',
  '%paratextRegistration_alert_validRegistration%',
  '%paratextRegistration_alert_invalidRegistration%',
  '%paratextRegistration_alert_invalidRegistration_description%',
  '%paratextRegistration_button_saveAndRestart%',
  '%paratextRegistration_button_restarting%',
  '%paratextRegistration_warning_invalid_registration_length%',
  '%firstRun_step_identify_heading%',
  '%firstRun_step_identify_reRegisterNotice%',
  '%firstRun_step_identify_registryHelp%',
  '%firstRun_step_identify_registryLink%',
  '%firstRun_step_identify_validatingCode%',
  '%firstRun_button_back%',
  '%firstRun_button_continueWithoutRegistration%',
  '%firstRun_step_identify_dontShowAgain%',
  '%general_error_title%',
];

/**
 * Props for the Identify wizard step. Extends {@link FirstRunStepProps} with a swappable restart
 * trigger.
 */
export interface IdentifyStepProps extends FirstRunStepProps {
  /**
   * Called after registration data is saved successfully. Defaults to `platform.restart`. When
   * provided (e.g. for testing or a batched-restart flow), `platform.restart` is not called. If it
   * resolves without actually relaunching the app, the component resets the spinner overlay.
   */
  onRestartAfterSave?: () => void | Promise<void>;
}

/**
 * Identify step of the first-run wizard (step 'identify' in STEP_ORDER). Collects and validates the
 * user's Paratext registration name + code, then calls `platform.restart` to apply the
 * registration. The store's `wizardActive` flag (already set when the wizard started) survives the
 * relaunch, so the startup reducer routes to `syncConsent` on the next launch rather than
 * re-showing this step.
 *
 * The shell's "Next" button is hidden (`setCanProceed(undefined)` on mount) — this step owns its
 * own explicit "Save and restart" action via WizardStepForm's `primaryButton` slot.
 *
 * Eight localization keys (`%paratextRegistration_*`) resolve from the paratext-registration
 * extension's `localizedStrings.json` at runtime via PAPI — they will not be in `en.json`.
 */
export function IdentifyStep({
  onNext,
  onBack,
  setCanProceed,
  setManagesOwnFooter,
  onRestartAfterSave,
  allowContinueWithoutRegistration,
}: IdentifyStepProps) {
  // Suppress the shell's generic Next/Finish and the shell footer before the first paint — this
  // step owns its navigation entirely via WizardStepForm. onBack is rendered inside the form.
  useLayoutEffect(() => {
    setCanProceed?.(undefined);
    setManagesOwnFooter?.(true);
  }, [setCanProceed, setManagesOwnFooter]);

  const [strings] = useLocalizedStrings(KEYS);
  // Ref so debounce callbacks always read the latest strings even if PAPI delivers them mid-wait.
  const stringsRef = useRef(strings);
  useEffect(() => {
    stringsRef.current = strings;
  }, [strings]);

  const [name, setName] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [registrationIsValid, setRegistrationIsValid] = useState(false);
  const [showInvalidCode, setShowInvalidCode] = useState(false);
  const [error, setError] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saveErrorDescription, setSaveErrorDescription] = useState('');
  const [isRestarting, setIsRestarting] = useState(false);
  const [suppressReminder, setSuppressReminder] = useState(false);
  const onToggleSuppressReminder = async (checked: boolean) => {
    setSuppressReminder(checked);
    try {
      // Setting is `true` = keep showing, so a checked "don't show again" writes `false`.
      await settingsService.set('platform.showRegistrationReminderOnStartup', !checked);
    } catch (e) {
      // Revert the optimistic toggle so the checkbox reflects the (unchanged) persisted setting.
      setSuppressReminder(!checked);
      logger.warn(
        `Failed to persist platform.showRegistrationReminderOnStartup: ${getErrorMessage(e)}`,
      );
    }
  };

  // The registry link follows the selected server. This step remounts each time the wizard
  // navigates to it, so the URL re-reads the latest selection (including a change made on the
  // preceding Internet Settings step).
  const [registryUrl] = usePromise(fetchRegistryUrl, PRODUCTION_REGISTRY_URL);

  const isMounted = useRef(false);
  const validationTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Incremented each time a new validation request is dispatched; stale in-flight responses
  // check their captured generation before writing state.
  const validationGeneration = useRef(0);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      // Clear any pending validation timer on unmount so it doesn't fire against a dead component.
      clearTimeout(validationTimeout.current);
    };
  }, []);

  // Debounced display of the code-format warning (avoids flashing while the user types).
  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setShowInvalidCode(
          registrationCode.length > 0 && !registrationCode.match(REGISTRATION_CODE_REGEX_STRING),
        ),
      INVALID_CODE_DISPLAY_DEBOUNCE_MS,
    );
    return () => clearTimeout(timeout);
  }, [registrationCode]);

  const validateRegistration = (code: string, newName: string) => {
    if (validationTimeout.current) clearTimeout(validationTimeout.current);
    setRegistrationIsValid(false);
    // Clear any stale errors immediately so alerts don't linger while the user keeps typing.
    setError('');
    setErrorDescription('');
    setSaveError('');
    setSaveErrorDescription('');
    if (isDemoMode()) return;
    validationTimeout.current = setTimeout(async () => {
      // Claim a generation slot before any guard so stale in-flight responses see a mismatched
      // generation even when this call exits early (e.g. format check or empty name).
      validationGeneration.current += 1;
      const gen = validationGeneration.current;
      // Unmount guard: no state writes at all after teardown.
      if (!isMounted.current) return;
      // Input guard: input is incomplete — clear any lingering spinner and bail.
      if (!code.match(REGISTRATION_CODE_REGEX_STRING) || !newName.trim()) {
        setIsValidating(false);
        return;
      }
      setIsValidating(true);
      // Read from ref so we always get the latest strings even if PAPI delivered them mid-wait.
      const latestStrings = stringsRef.current;
      try {
        const isValid = await commandService.sendCommand(
          'paratextRegistration.validateParatextRegistrationData',
          // email/supporterName are not collected in the first-run form (Paratext manages them separately).
          { name: newName, code, email: '', supporterName: '' },
        );
        if (!isMounted.current || validationGeneration.current !== gen) return;
        setRegistrationIsValid(!!isValid);
        if (!isValid) {
          setError(latestStrings['%paratextRegistration_alert_invalidRegistration%']);
          setErrorDescription(
            latestStrings['%paratextRegistration_alert_invalidRegistration_description%'],
          );
        }
      } catch (err) {
        if (isMounted.current && validationGeneration.current === gen) {
          setRegistrationIsValid(false);
          setError(latestStrings['%general_error_title%']);
          setErrorDescription(getErrorMessage(err));
        }
      } finally {
        if (isMounted.current && validationGeneration.current === gen) setIsValidating(false);
      }
    }, VALIDATION_DEBOUNCE_MS);
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    validateRegistration(registrationCode, e.target.value);
  };

  const onRegistrationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let code = e.target.value;
    // Auto-insert a dash after every 6th alphanumeric character (matches PT9 UX).
    if (
      !code.match(REGISTRATION_CODE_REGEX_STRING) &&
      code.match(REGISTRATION_CODE_INSERT_DASH_REGEX_STRING) &&
      !registrationCode.endsWith('-')
    ) {
      code += '-';
    } else if (registrationCode.endsWith('-') && code.length < registrationCode.length) {
      // When backspacing over a dash, remove the dash AND the preceding character.
      code = code.substring(0, registrationCode.length - 2);
    }
    if (
      code
        .split('-')
        .every(
          (seg, idx, arr) =>
            seg.match(REGISTRATION_CODE_CHARACTER_VALIDATION_REGEX) &&
            (idx < arr.length - 1 ? seg.length === 6 : true),
        )
    ) {
      setRegistrationCode(code);
      validateRegistration(code, name);
    }
  };

  const saveAndRestart = async () => {
    // Demo mode: advance without touching the real backend or triggering a relaunch.
    if (isDemoMode()) {
      onNext();
      return;
    }
    setIsRestarting(true);
    setSaveError('');
    setSaveErrorDescription('');
    try {
      await commandService.sendCommand('paratextRegistration.setParatextRegistrationData', {
        name,
        code: registrationCode,
        // email/supporterName are not collected in the first-run form (Paratext manages them separately).
        email: '',
        supporterName: '',
      });
      // Signal the next startup to treat a transient 'invalid' from the registration backend as
      // non-fatal: the user just registered successfully, so 'invalid' on the next launch is almost
      // certainly a server fluke. The flag is consumed (cleared) on the next resolveInternal call.
      markJustRegistered();
      // Restart immediately — the explicit "Save and restart" button already sets the expectation.
      await (onRestartAfterSave ?? (() => commandService.sendCommand('platform.restart')))();
      // platform.restart resolves after invoking app.quit() but before the process actually
      // terminates — the window may still be alive for a few frames. Gate the spinner reset on the
      // injected path so production (where onRestartAfterSave is undefined) is unaffected.
      if (onRestartAfterSave && isMounted.current) setIsRestarting(false);
    } catch (err) {
      if (!isMounted.current) return;
      setSaveError(strings['%general_error_title%']);
      setSaveErrorDescription(getErrorMessage(err));
      setIsRestarting(false);
    }
  };

  const inDemoMode = isDemoMode();
  // Demo: only a non-empty name is required (no real code validation). Real: backend must confirm.
  const isSaveDisabled = inDemoMode
    ? !name.trim()
    : !name.trim() || !registrationIsValid || isValidating;

  // Validation error and save error are mutually exclusive: validateRegistration (called on every
  // keystroke) clears both, and save can only be attempted after validation succeeds.
  const activeError = error || saveError;
  const activeErrorDescription = error ? errorDescription : saveErrorDescription;

  if (isRestarting) {
    return <StepLoading message={strings['%paratextRegistration_button_restarting%']} />;
  }

  // Re-register mode surfaces an escape hatch in the back-button slot; at the identify entry the
  // shell supplies no onBack (index === entryIndex), so the slot is otherwise empty. Computed as
  // if/else (not a nested ternary) to satisfy ESLint no-nested-ternary.
  let backButton: ReactNode;
  if (onBack) {
    backButton = (
      <Button variant="outline" onClick={onBack}>
        {strings['%firstRun_button_back%']}
      </Button>
    );
  } else if (allowContinueWithoutRegistration) {
    backButton = (
      <Button variant="ghost" onClick={() => continueWithoutRegistration()}>
        {strings['%firstRun_button_continueWithoutRegistration%']}
      </Button>
    );
  }

  return (
    <WizardStepForm
      heading={strings['%firstRun_step_identify_heading%']}
      error={activeError}
      errorDescription={activeErrorDescription}
      backButton={backButton}
      primaryButton={
        <Button disabled={isSaveDisabled} onClick={saveAndRestart}>
          {strings['%paratextRegistration_button_saveAndRestart%']}
        </Button>
      }
    >
      <div className="tw:flex tw:flex-col tw:gap-3">
        {/* Re-register mode only: explain why an already-onboarded user is being asked to register
            again (their previously-valid registration went invalid). Absent in fresh onboarding. */}
        {allowContinueWithoutRegistration && (
          <Alert>
            <AlertCircle className="tw:h-4 tw:w-4" />
            <AlertTitle>{strings['%firstRun_step_identify_reRegisterNotice%']}</AlertTitle>
          </Alert>
        )}
        <div className="tw:flex tw:flex-col tw:gap-1">
          <label htmlFor="identify-name" className="tw:text-sm tw:font-medium">
            {strings['%paratextRegistration_label_registrationName%']}
          </label>
          <Input id="identify-name" value={name} onChange={onNameChange} />
        </div>

        <div className="tw:flex tw:flex-col tw:gap-1">
          <label htmlFor="identify-code" className="tw:text-sm tw:font-medium">
            {strings['%paratextRegistration_label_registrationCode%']}
          </label>
          <Input
            id="identify-code"
            className="tw:font-mono"
            maxLength={REGISTRATION_CODE_LENGTH_WITH_DASHES}
            placeholder="XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX"
            value={registrationCode}
            aria-invalid={showInvalidCode || (!!error && !isValidating)}
            // Only link the description when the format-warning element is actually rendered; a
            // backend error is announced via WizardStepForm's role="alert" Alert, not this field.
            aria-describedby={showInvalidCode ? 'identify-code-warning' : undefined}
            onChange={onRegistrationCodeChange}
          />
          {showInvalidCode && (
            <p id="identify-code-warning" className="tw:text-sm tw:text-muted-foreground">
              {strings['%paratextRegistration_warning_invalid_registration_length%']}
            </p>
          )}
        </div>

        {isValidating && (
          <div className="tw:flex tw:items-center tw:gap-2 tw:text-sm tw:text-muted-foreground">
            <Spinner />
            {strings['%firstRun_step_identify_validatingCode%']}
          </div>
        )}

        <p className="tw:text-sm tw:text-muted-foreground">
          {strings['%firstRun_step_identify_registryHelp%']}{' '}
          <a href={registryUrl} target="_blank" rel="noopener noreferrer" className="tw:underline">
            {strings['%firstRun_step_identify_registryLink%']}
          </a>
        </p>

        {!error && registrationIsValid && !isValidating && (
          <Alert>
            <CircleCheck className="tw:h-4 tw:w-4" />
            <AlertTitle>{strings['%paratextRegistration_alert_validRegistration%']}</AlertTitle>
          </Alert>
        )}

        {/* Isolate this immediate-apply preference (persists instantly on toggle) from the
            explicit-apply "Save and restart" form above it with a divider, so the two apply models
            don't read as sibling controls. */}
        {allowContinueWithoutRegistration && (
          <div className="tw:mt-2 tw:flex tw:items-center tw:gap-2 tw:border-t tw:pt-4">
            <Checkbox
              id="identify-dont-show-again"
              checked={suppressReminder}
              // onToggleSuppressReminder is async but onCheckedChange expects void. Calling it
              // directly (without void or .catch) is safe: the handler catches its own errors
              // internally, and no-floating-promises is off in this codebase.
              onCheckedChange={(checked) => onToggleSuppressReminder(checked === true)}
            />
            <Label htmlFor="identify-dont-show-again">
              {strings['%firstRun_step_identify_dontShowAgain%']}
            </Label>
          </div>
        )}
      </div>
    </WizardStepForm>
  );
}

export default IdentifyStep;
