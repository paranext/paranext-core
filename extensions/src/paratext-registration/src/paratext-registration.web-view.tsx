import { WebViewProps } from '@papi/core';
import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { formatReplacementString, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MarkdownRenderer } from 'platform-bible-react';
import { RegistrationForm } from './components/registration-form.component';
import { PRODUCTION_REGISTRY_URL } from './utils';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%paratextRegistration_app_startup_description%',
  '%paratextRegistration_description_is_registered%',
  '%paratextRegistration_registration_details%',
  '%product_name%',
];

globalThis.webViewComponent = function ParatextRegistration({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // The registry link follows the selected server. Default to (and fall back on) the production
  // URL so the link is never blank or broken. The view reads the server on mount; a server change
  // requires an app restart to take effect, after which the view reopens fresh.
  const [registryLink, setRegistryLink] = useState(PRODUCTION_REGISTRY_URL);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const url = await papi.commands.sendCommand('paratextRegistration.getParatextRegistryUrl');
        if (!cancelled && url) setRegistryLink(url);
      } catch {
        // Keep the production fallback so the link is never broken.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const registrationDetails = useMemo(
    () =>
      formatReplacementString(localizedStrings['%paratextRegistration_registration_details%'], {
        registryLink,
      }),
    [localizedStrings, registryLink],
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
    <div className="tw:flex tw:flex-col tw:gap-4 tw:h-screen tw:p-4">
      {isInitialRegistration ? (
        <div className="tw:flex tw:flex-col tw:gap-2">
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
