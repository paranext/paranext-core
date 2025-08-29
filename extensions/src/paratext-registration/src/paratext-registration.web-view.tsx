import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import { RegistrationForm } from './components/registration-form.component';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%paratextRegistration_description_shared_with_paratext_9%',
];

globalThis.webViewComponent = function ParatextRegistration({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  return (
    <div className="tw-p-2 tw-flex tw-flex-col tw-justify-between tw-h-screen">
      <div>
        <div className="tw-ms-2 tw-text-sm tw-text-muted-foreground">
          {localizedStrings['%paratextRegistration_description_shared_with_paratext_9%']}
        </div>
        <RegistrationForm useWebViewState={useWebViewState} />
      </div>
    </div>
  );
};
