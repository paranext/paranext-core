import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';

const KEYS: LocalizeKey[] = ['%firstRun_step_syncProgress_placeholder%'];

/** Placeholder for the Sync progress step. To be replaced by a sibling ticket. */
export function SyncProgressPlaceholderStep() {
  const [strings] = useLocalizedStrings(KEYS);
  return <p className="tw:text-sm">{strings['%firstRun_step_syncProgress_placeholder%']}</p>;
}

export default SyncProgressPlaceholderStep;
