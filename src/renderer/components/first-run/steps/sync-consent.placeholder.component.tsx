import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';
import { useEffect } from 'react';
import { FirstRunStepProps } from '../first-run-step-props.model';

const KEYS: LocalizeKey[] = ['%firstRun_step_syncConsent_placeholder%'];

/** Placeholder for the Sync consent step. To be replaced by a sibling ticket. */
export function SyncConsentPlaceholderStep({ setCanSkip }: FirstRunStepProps) {
  useEffect(() => setCanSkip?.(true), [setCanSkip]);
  const [strings] = useLocalizedStrings(KEYS);
  return <p className="tw:text-sm">{strings['%firstRun_step_syncConsent_placeholder%']}</p>;
}

export default SyncConsentPlaceholderStep;
