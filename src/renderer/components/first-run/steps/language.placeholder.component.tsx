import { useEffect } from 'react';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';
import { FirstRunStepProps } from '../first-run-step-props.model';

const KEYS: LocalizeKey[] = ['%firstRun_step_language_placeholder%'];

/**
 * Placeholder for the Language step. Replaced by PT-4176 (swap the shell's
 * `stepComponents.language`).
 */
export function LanguagePlaceholderStep({ setCanProceed }: FirstRunStepProps) {
  useEffect(() => setCanProceed?.(true), [setCanProceed]);
  const [strings] = useLocalizedStrings(KEYS);
  return <p className="tw:text-sm">{strings['%firstRun_step_language_placeholder%']}</p>;
}

export default LanguagePlaceholderStep;
