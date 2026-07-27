import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';

const KEYS: LocalizeKey[] = ['%firstRun_step_internet_placeholder%'];

/**
 * Placeholder for the Internet settings step. Replaced by the real step via
 * `stepComponents.internet`.
 */
export function InternetPlaceholderStep() {
  const [strings] = useLocalizedStrings(KEYS);
  return <p className="tw:text-sm">{strings['%firstRun_step_internet_placeholder%']}</p>;
}

export default InternetPlaceholderStep;
