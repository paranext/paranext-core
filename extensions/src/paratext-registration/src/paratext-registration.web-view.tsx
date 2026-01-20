import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { formatReplacementString, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';
import { MarkdownRenderer } from 'platform-bible-react';
import { RegistrationForm } from './components/registration-form.component';
import { PARATEXT_REGISTRY_LINK } from './utils';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%paratextRegistration_app_startup_description%',
  '%paratextRegistration_description_is_registered%',
  '%paratextRegistration_registration_details%',
  '%product_name%',
];

globalThis.webViewComponent = function ParatextRegistration({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const registrationDetails = useMemo(
    () =>
      formatReplacementString(localizedStrings['%paratextRegistration_registration_details%'], {
        registryLink: PARATEXT_REGISTRY_LINK,
      }),
    [localizedStrings],
  );
  const markdownComponent = useMemo(
    () => <MarkdownRenderer anchorTarget="_blank" markdown={registrationDetails} />,
    [registrationDetails],
  );

  const [isInitialRegistration, setIsInitialRegistration] = useState(false);

  const handleFormTypeChange = useCallback((newIsInitialRegistration: boolean) => {
    setIsInitialRegistration(newIsInitialRegistration);
  }, []);

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-h-screen tw-p-4">
      {isInitialRegistration ? (
        <div className="tw-flex tw-flex-col tw-gap-2">
          <p>
            {formatReplacementString(
              localizedStrings['%paratextRegistration_app_startup_description%'],
              { ...localizedStrings },
            )}
          </p>
          {markdownComponent}
        </div>
      ) : (
        <p>
          {formatReplacementString(
            localizedStrings['%paratextRegistration_description_is_registered%'],
            { ...localizedStrings },
          )}
        </p>
      )}
      <RegistrationForm
        useWebViewState={useWebViewState}
        handleFormTypeChange={handleFormTypeChange}
      />
      {!isInitialRegistration && markdownComponent}
    </div>
  );
};
