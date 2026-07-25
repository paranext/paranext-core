import { useEffect } from 'react';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';
import { FirstRunStepProps } from '../first-run-step-props.model';

const KEYS: LocalizeKey[] = ['%firstRun_step_identify_placeholder%'];

/**
 * Placeholder for the Identify step. Replaced by PT-4177.
 *
 * PT-4177 note: the real step calls `platform.restart` after saving registration. The store's
 * `wizardActive` marker survives the relaunch so the wizard resumes at Sync consent — verify this
 * with a test (see the store's existing resume-routing test as the model).
 */
export function IdentifyPlaceholderStep({ setCanProceed }: FirstRunStepProps) {
  useEffect(() => setCanProceed?.(true), [setCanProceed]);
  const [strings] = useLocalizedStrings(KEYS);
  return <p className="tw:text-sm">{strings['%firstRun_step_identify_placeholder%']}</p>;
}

export default IdentifyPlaceholderStep;
