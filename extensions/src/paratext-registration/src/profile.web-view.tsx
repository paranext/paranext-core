import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { formatReplacementString, LocalizeKey } from 'platform-bible-utils';
import { useMemo } from 'react';
import { MarkdownRenderer } from 'platform-bible-react';
import { RegistrationForm } from './components/registration-form.component';
import { PARATEXT_REGISTRY_LINK } from './utils';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%paratextRegistration_description_is_registered%',
  '%paratextRegistration_registration_details%',
  '%product_name%',
];

globalThis.webViewComponent = function Profile({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const registrationDetails = useMemo(
    () =>
      formatReplacementString(localizedStrings['%paratextRegistration_registration_details%'], {
        registryLink: PARATEXT_REGISTRY_LINK,
      }),
    [localizedStrings],
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-h-screen tw-p-4">
      <p>
        {formatReplacementString(
          localizedStrings['%paratextRegistration_description_is_registered%'],
          { ...localizedStrings },
        )}
      </p>
      <RegistrationForm useWebViewState={useWebViewState} />
      <MarkdownRenderer anchorTarget="_blank" markdown={registrationDetails} />
    </div>
  );
};
