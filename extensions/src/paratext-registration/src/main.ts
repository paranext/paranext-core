import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext } from '@papi/core';
import {
  ParatextRegistrationWebViewProvider,
  paratextRegistrationWebViewType,
} from './paratext-registration.web-view-provider';
import {
  InternetSettingsWebViewProvider,
  internetSettingsWebViewType,
} from './internet-settings.web-view-provider';
import { ProfileWebViewProvider, profileWebViewType } from './profile.web-view-provider';

async function showParatextRegistration(): Promise<string | undefined> {
  // First checks to see if the app has been registered yet
  const registrationData = await papi.commands.sendCommand(
    'paratextRegistration.getParatextRegistrationData',
  );

  // If it has been registered, then it shows the profile view. Else, it shows the initial
  // registration view
  return papi.webViews.openWebView(
    registrationData.code ? profileWebViewType : paratextRegistrationWebViewType,
    { type: 'float', position: 'center', floatSize: { width: 600, height: 540 } },
    { existingId: '?' },
  );
}

async function showInternetSettings(): Promise<string | undefined> {
  return papi.webViews.openWebView(
    internetSettingsWebViewType,
    { type: 'float', position: 'center', floatSize: { width: 450, height: 390 } },
    { existingId: '?' },
  );
}

/**
 * Shows the registration info pane if there isn't any registration info yet. Used to help people
 * get signed in at startup
 *
 * Handles its own errors. No need to await
 */
async function showParatextRegistrationIfNoRegistrationData(): Promise<string | undefined> {
  try {
    if (!(await papi.settings.get('paratextRegistration.shouldShowOnStartup'))) return undefined;

    const registrationData = await papi.commands.sendCommand(
      'paratextRegistration.getParatextRegistrationData',
    );

    if (
      registrationData.name ||
      registrationData.code ||
      registrationData.email ||
      registrationData.supporterName
    )
      return undefined;

    return await showParatextRegistration();
  } catch (e) {
    logger.warn(
      `Error while trying to determine if we need to pull up the Paratext registration info web view on startup: ${e}`,
    );
  }
  return undefined;
}

export async function activate(context: ExecutionActivationContext) {
  logger.debug('Paratext Registration is activating!');

  const paratextRegistrationWebViewProvider = new ParatextRegistrationWebViewProvider();
  const internetSettingsWebViewProvider = new InternetSettingsWebViewProvider();
  const profileWebViewProvider = new ProfileWebViewProvider();

  const shouldShowOnStartupValidatorPromise = papi.settings.registerValidator(
    'paratextRegistration.shouldShowOnStartup',
    async (newValue) => typeof newValue === 'boolean',
  );

  const showParatextRegistrationPromise = papi.commands.registerCommand(
    'paratextRegistration.showParatextRegistration',
    showParatextRegistration,
  );
  const showParatextRegistrationWebViewProviderPromise =
    papi.webViewProviders.registerWebViewProvider(
      paratextRegistrationWebViewType,
      paratextRegistrationWebViewProvider,
    );

  const showInternetSettingsPromise = papi.commands.registerCommand(
    'paratextRegistration.showInternetSettings',
    showInternetSettings,
  );
  const showInternetSettingsWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    internetSettingsWebViewType,
    internetSettingsWebViewProvider,
  );

  const showProfileProviderPromise = papi.webViewProviders.registerWebViewProvider(
    profileWebViewType,
    profileWebViewProvider,
  );

  // No need to wait for this; it will do its thing and handle its own errors
  showParatextRegistrationIfNoRegistrationData();

  context.registrations.add(
    await shouldShowOnStartupValidatorPromise,
    await showParatextRegistrationPromise,
    await showParatextRegistrationWebViewProviderPromise,
    await showInternetSettingsPromise,
    await showInternetSettingsWebViewProviderPromise,
    await showProfileProviderPromise,
  );
}

export async function deactivate() {
  logger.debug('Paratext Registration is deactivating!');
  return true;
}
