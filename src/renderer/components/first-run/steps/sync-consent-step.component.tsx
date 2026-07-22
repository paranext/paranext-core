import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';

const KEYS: LocalizeKey[] = [
  '%firstRun_step_syncConsent_heading%',
  '%firstRun_step_syncConsent_body%',
];

/** Sync consent wizard step — body content only; the shell owns footer buttons (Next/Skip). */
export function SyncConsentStep() {
  const [strings] = useLocalizedStrings(KEYS);
  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <h2 className="tw:text-base tw:font-semibold">
        {strings['%firstRun_step_syncConsent_heading%']}
      </h2>
      <p className="tw:text-sm tw:text-muted-foreground">
        {strings['%firstRun_step_syncConsent_body%']}
      </p>
    </div>
  );
}

export default SyncConsentStep;
