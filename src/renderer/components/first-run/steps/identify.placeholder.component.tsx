import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';

const KEYS: LocalizeKey[] = ['%firstRun_step_identify_placeholder%'];

/**
 * Placeholder for the Identify step. Replaced by PT-4177.
 *
 * NOTE for PT-4177: the real Identify step saves registration and calls `platform.restart`, which
 * relaunches the app. The store's `wizardActive` marker survives the relaunch, so on the next
 * startup the reducer routes to Sync consent (see the store's resume test). PT-4177 MUST add an
 * end-to-end test that registration validity is reliably `true` before routing (no re-show/loop).
 */
export function IdentifyPlaceholderStep() {
  const [strings] = useLocalizedStrings(KEYS);
  return <p className="tw:text-sm">{strings['%firstRun_step_identify_placeholder%']}</p>;
}

export default IdentifyPlaceholderStep;
