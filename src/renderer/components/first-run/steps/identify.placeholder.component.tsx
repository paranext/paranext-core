import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';

const KEYS: LocalizeKey[] = ['%firstRun_step_identify_placeholder%'];

/**
 * Placeholder for the Identify step. To be replaced by a sibling ticket.
 *
 * NOTE: the real Identify step must save registration and call `platform.restart`, which relaunches
 * the app. The store's `wizardActive` marker survives the relaunch, so on the next startup the
 * reducer routes to Sync consent (see the store's resume test). The real Identify step MUST ensure
 * registration validity is reliably `true` before routing (no re-show/loop).
 */
export function IdentifyPlaceholderStep() {
  const [strings] = useLocalizedStrings(KEYS);
  return <p className="tw:text-sm">{strings['%firstRun_step_identify_placeholder%']}</p>;
}

export default IdentifyPlaceholderStep;
