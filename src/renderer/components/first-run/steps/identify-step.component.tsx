import * as commandService from '@shared/services/command.service';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { isDemoMode, markJustRegistered } from '@renderer/services/first-run-store';
import { Alert, AlertDescription, AlertTitle, Button, Input, Spinner } from 'platform-bible-react';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { AlertCircle, CircleCheck } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { WizardStepForm } from '../wizard-step-form.component';
import { FirstRunStepProps } from '../first-run-step-props.model';

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

const PARATEXT_REGISTRY_LINK = 'https://registry.paratext.org/';

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
  '%firstRun_step_identify_registryHelp%',
  '%firstRun_step_identify_registryLink%',
  '%firstRun_step_identify_validatingCode%',
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
export function IdentifyStep({ onNext, setCanProceed, onRestartAfterSave }: IdentifyStepProps) {
  // Suppress the shell's generic Next entirely — this step owns its own explicit restart action.
  useEffect(() => setCanProceed?.(undefined), [setCanProceed]);

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
      const s = stringsRef.current;
      try {
        const isValid = await commandService.sendCommand(
          'paratextRegistration.validateParatextRegistrationData',
          // email/supporterName are not collected in the first-run form (Paratext manages them separately).
          { name: newName, code, email: '', supporterName: '' },
        );
        if (!isMounted.current || validationGeneration.current !== gen) return;
        setRegistrationIsValid(!!isValid);
        if (!isValid) {
          setError(s['%paratextRegistration_alert_invalidRegistration%']);
          setErrorDescription(s['%paratextRegistration_alert_invalidRegistration_description%']);
        }
      } catch (err) {
        if (isMounted.current && validationGeneration.current === gen) {
          setRegistrationIsValid(false);
          setError(s['%general_error_title%']);
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
      // The process terminates here; setIsRestarting(true) above keeps the button in "Restarting…"
      // until the app exits.
      await (onRestartAfterSave ?? (() => commandService.sendCommand('platform.restart')))();
      // In production, platform.restart relaunches the process and this line never runs.
      // If the restart resolves without relaunching (e.g. a test stub), reset the spinner so the
      // UI doesn't get stuck.
      if (isMounted.current) setIsRestarting(false);
    } catch (err) {
      if (!isMounted.current) return;
      setSaveError(stringsRef.current['%general_error_title%']);
      setSaveErrorDescription(getErrorMessage(err));
      setIsRestarting(false);
    }
  };

  const inDemoMode = isDemoMode();
  // Demo: only a non-empty name is required (no real code validation). Real: backend must confirm.
  const isSaveDisabled = inDemoMode
    ? !name.trim()
    : !name.trim() || !registrationIsValid || isValidating;

  if (isRestarting) {
    return (
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-4 tw:py-8 tw:text-center">
        <Spinner />
        <p className="tw:text-sm tw:text-muted-foreground">
          {strings['%paratextRegistration_button_restarting%']}
        </p>
      </div>
    );
  }

  return (
    <WizardStepForm
      heading={strings['%firstRun_step_identify_heading%']}
      primaryButton={
        <Button disabled={isSaveDisabled} onClick={saveAndRestart}>
          {strings['%paratextRegistration_button_saveAndRestart%']}
        </Button>
      }
    >
      <div className="tw:flex tw:flex-col tw:gap-3">
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
            aria-describedby="identify-code-warning identify-code-error"
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
          <a
            href={PARATEXT_REGISTRY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="tw:underline"
          >
            {strings['%firstRun_step_identify_registryLink%']}
          </a>
        </p>

        {!error && registrationIsValid && !isValidating && (
          <Alert>
            <CircleCheck className="tw:h-4 tw:w-4" />
            <AlertTitle>{strings['%paratextRegistration_alert_validRegistration%']}</AlertTitle>
          </Alert>
        )}

        {error && (
          <Alert id="identify-code-error" variant="destructive">
            <AlertCircle className="tw:h-4 tw:w-4" />
            <AlertTitle>{error}</AlertTitle>
            <AlertDescription>{errorDescription}</AlertDescription>
          </Alert>
        )}

        {saveError && (
          <Alert id="identify-save-error" variant="destructive">
            <AlertCircle className="tw:h-4 tw:w-4" />
            <AlertTitle>{saveError}</AlertTitle>
            <AlertDescription>{saveErrorDescription}</AlertDescription>
          </Alert>
        )}
      </div>
    </WizardStepForm>
  );
}

export default IdentifyStep;
