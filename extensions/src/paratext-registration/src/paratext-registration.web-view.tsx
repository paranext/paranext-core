import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { formatReplacementString, getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';
import { MarkdownRenderer, usePromise } from 'platform-bible-react';
import { RegistrationForm } from './components/registration-form.component';
import { PRODUCTION_REGISTRY_URL } from './utils';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%paratextRegistration_app_startup_description%',
  '%paratextRegistration_description_is_registered%',
  '%paratextRegistration_registration_details%',
  '%product_name%',
];

/**
 * Fetches the registry site URL for the selected server, falling back to production so the link is
 * never blank or broken. Module-scope so it is a stable `usePromise` callback.
 */
async function fetchRegistryUrl() {
  try {
    const url = await papi.commands.sendCommand('paratextRegistration.getParatextRegistryUrl');
    return url || PRODUCTION_REGISTRY_URL;
  } catch (error) {
    logger.warn(
      `Could not resolve the selected registry URL; falling back to production: ${getErrorMessage(error)}`,
    );
    return PRODUCTION_REGISTRY_URL;
  }
}

globalThis.webViewComponent = function ParatextRegistration({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // The registry link follows the selected server. The view reads it on mount; a server change
  // requires an app restart to take effect, after which the view reopens fresh.
  const [registryLink] = usePromise(fetchRegistryUrl, PRODUCTION_REGISTRY_URL);

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
