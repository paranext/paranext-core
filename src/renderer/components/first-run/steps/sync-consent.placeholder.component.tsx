import { useEffect } from 'react';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';
import { FirstRunStepProps } from '../first-run-step-props.model';

const KEYS: LocalizeKey[] = ['%firstRun_step_syncConsent_placeholder%'];

/** Placeholder for the Sync consent step. Replaced by PT-4178. */
export function SyncConsentPlaceholderStep({ setCanProceed }: FirstRunStepProps) {
  useEffect(() => setCanProceed?.(true), [setCanProceed]);
  const [strings] = useLocalizedStrings(KEYS);
  return <p className="tw:text-sm">{strings['%firstRun_step_syncConsent_placeholder%']}</p>;
}

export default SyncConsentPlaceholderStep;
