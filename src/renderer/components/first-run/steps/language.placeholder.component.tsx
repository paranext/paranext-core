import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';

const KEYS: LocalizeKey[] = ['%firstRun_step_language_placeholder%'];

/**
 * Placeholder for the Language step. Replaced by PT-4176 (swap the shell's
 * `stepComponents.language`).
 */
export function LanguagePlaceholderStep() {
  const [strings] = useLocalizedStrings(KEYS);
  return <p className="tw:text-sm">{strings['%firstRun_step_language_placeholder%']}</p>;
}

export default LanguagePlaceholderStep;
