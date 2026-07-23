import * as commandService from '@shared/services/command.service';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { isDemoMode } from '@renderer/services/first-run-store';
import { Alert, AlertDescription, AlertTitle, Button, Input, Spinner } from 'platform-bible-react';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { AlertCircle, CircleCheck } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FirstRunStepProps } from '../first-run-step-props.model';

// Copied from the paratext-registration extension — keep in sync if the extension changes.
//   REGISTRATION_CODE_REGEX: extensions/src/paratext-registration/src/components/registration-form-view.component.tsx
//   REGISTRATION_CODE_CHARACTER_REGEX, REGISTRATION_CODE_INSERT_DASH_REGEX:
//     extensions/src/paratext-registration/src/components/registration-form.component.tsx
const REGISTRATION_CODE_CHARACTER_REGEX = '^[a-zA-Z0-9\\-]*$';
// NOTE: the '[[' below is a pre-existing quirk in the extension's source — copied verbatim so the
// two stay identical. It is harmless: '[[' only adds literal '[' to the match, which the segment
// character-class filter in onRegistrationCodeChange rejects for real input anyway.
const REGISTRATION_CODE_INSERT_DASH_REGEX = '^[a-zA-Z0-9]{6}$|-[[a-zA-Z0-9\\-]{6}$';
export const REGISTRATION_CODE_REGEX =
  '^(?:[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}|\\*{6}-\\*{6}-\\*{6}-\\*{6}-\\*{6})$';
export const REGISTRATION_CODE_MAX_LENGTH = 34;
// Kept as separate constants so each delay can be tuned independently.
export const VALIDATION_DEBOUNCE_MS = 1000;
export const INVALID_CODE_DISPLAY_DEBOUNCE_MS = 1000;

export const PARATEXT_REGISTRY_LINK = 'https://registry.paratext.org/';

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
 * Identify step of the first-run wizard (step 'identify' in STEP_ORDER). Collects and validates the
 * user's Paratext registration name + code, then calls `platform.restart` to apply the
 * registration. The store's `wizardActive` flag (already set when the wizard started) survives the
 * relaunch, so the startup reducer routes to `syncConsent` on the next launch rather than
 * re-showing this step.
 *
 * The shell's "Next" button is permanently disabled (`setCanProceed(false)` on mount) — this step
 * owns its own explicit "Save and restart" footer action.
 *
 * Eight localization keys (`%paratextRegistration_*`) resolve from the paratext-registration
 * extension's `localizedStrings.json` at runtime via PAPI — they will not be in `en.json`.
 */
export function IdentifyStep({ onNext, setCanProceed }: FirstRunStepProps) {
  // Always block the shell's generic Next — this step owns its own explicit restart action.
  useEffect(() => setCanProceed?.(false), [setCanProceed]);

  const [strings] = useLocalizedStrings(KEYS);

  const [name, setName] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [registrationIsValid, setRegistrationIsValid] = useState(false);
  const [showInvalidCode, setShowInvalidCode] = useState(false);
  const [error, setError] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [isRestarting, setIsRestarting] = useState(false);

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Debounced display of the code-format warning (avoids flashing while the user types).
  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setShowInvalidCode(
          registrationCode.length > 0 && !registrationCode.match(REGISTRATION_CODE_REGEX),
        ),
      INVALID_CODE_DISPLAY_DEBOUNCE_MS,
    );
    return () => clearTimeout(timeout);
  }, [registrationCode]);

  const validationTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Clear any pending validation timer on unmount so it doesn't fire against a dead component.
  useEffect(
    () => () => {
      clearTimeout(validationTimeout.current);
    },
    [],
  );

  const validateRegistration = (code: string, newName: string) => {
    if (validationTimeout.current) clearTimeout(validationTimeout.current);
    setRegistrationIsValid(false);
    if (isDemoMode()) return;
    validationTimeout.current = setTimeout(async () => {
      // Guard at the top so no state update (including setIsValidating) runs after unmount.
      if (!isMounted.current || !code.match(REGISTRATION_CODE_REGEX) || !newName.trim()) return;
      setIsValidating(true);
      setError('');
      setErrorDescription('');
      try {
        const isValid = await commandService.sendCommand(
          'paratextRegistration.validateParatextRegistrationData',
          // email/supporterName are not collected in the first-run form (Paratext manages them separately).
          { name: newName, code, email: '', supporterName: '' },
        );
        if (!isMounted.current) return;
        setRegistrationIsValid(!!isValid);
        if (!isValid) {
          setError(strings['%paratextRegistration_alert_invalidRegistration%']);
          setErrorDescription(
            strings['%paratextRegistration_alert_invalidRegistration_description%'],
          );
        }
      } catch {
        if (isMounted.current) setRegistrationIsValid(false);
      } finally {
        if (isMounted.current) setIsValidating(false);
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
      !code.match(REGISTRATION_CODE_REGEX) &&
      code.match(REGISTRATION_CODE_INSERT_DASH_REGEX) &&
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
            seg.match(REGISTRATION_CODE_CHARACTER_REGEX) &&
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
    setError('');
    try {
      await commandService.sendCommand('paratextRegistration.setParatextRegistrationData', {
        name,
        code: registrationCode,
        // email/supporterName are not collected in the first-run form (Paratext manages them separately).
        email: '',
        supporterName: '',
      });
      // Restart immediately — the explicit "Save and restart" button already sets the expectation.
      // The process terminates here; setIsRestarting(true) above keeps the button in "Restarting…"
      // until the app exits.
      await commandService.sendCommand('platform.restart');
    } catch (err) {
      if (!isMounted.current) return;
      setError(strings['%general_error_title%']);
      setErrorDescription(getErrorMessage(err));
      setIsRestarting(false);
    }
  };

  const inDemoMode = isDemoMode();
  // Demo: only a non-empty name is required (no real code validation). Real: backend must confirm.
  const isSaveDisabled = inDemoMode
    ? !name.trim()
    : !name.trim() || !registrationIsValid || isValidating || isRestarting;

  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      <h2 className="tw:m-0 tw:text-sm tw:font-normal">
        {strings['%firstRun_step_identify_heading%']}
      </h2>

      <div className="tw:flex tw:flex-col tw:gap-3">
        <div className="tw:flex tw:flex-col tw:gap-1">
          <label htmlFor="identify-name" className="tw:text-sm tw:font-medium">
            {strings['%paratextRegistration_label_registrationName%']}
          </label>
          <Input id="identify-name" value={name} disabled={isRestarting} onChange={onNameChange} />
        </div>

        <div className="tw:flex tw:flex-col tw:gap-1">
          <label htmlFor="identify-code" className="tw:text-sm tw:font-medium">
            {strings['%paratextRegistration_label_registrationCode%']}
          </label>
          <Input
            id="identify-code"
            className="tw:font-mono"
            maxLength={REGISTRATION_CODE_MAX_LENGTH}
            placeholder="XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX"
            value={registrationCode}
            disabled={isRestarting}
            aria-invalid={showInvalidCode || (!!error && !isValidating)}
            onChange={onRegistrationCodeChange}
          />
          {showInvalidCode && (
            <p className="tw:text-sm tw:text-muted-foreground">
              {strings['%paratextRegistration_warning_invalid_registration_length%']}
            </p>
          )}
        </div>
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
        <Alert variant="destructive">
          <AlertCircle className="tw:h-4 tw:w-4" />
          <AlertTitle>{error}</AlertTitle>
          <AlertDescription>{errorDescription}</AlertDescription>
        </Alert>
      )}

      <div className="tw:flex tw:justify-end">
        <Button disabled={isSaveDisabled} onClick={saveAndRestart}>
          {isRestarting ? (
            <>
              <Spinner />
              {strings['%paratextRegistration_button_restarting%']}
            </>
          ) : (
            strings['%paratextRegistration_button_saveAndRestart%']
          )}
        </Button>
      </div>
    </div>
  );
}

export default IdentifyStep;
