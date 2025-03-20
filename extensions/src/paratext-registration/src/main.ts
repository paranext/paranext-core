import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext } from '@papi/core';
import {
  ParatextRegistrationWebViewProvider,
  paratextRegistrationWebViewType,
} from './paratext-registration.web-view-provider';

async function showParatextRegistration(): Promise<string | undefined> {
  return papi.webViews.openWebView(
    paratextRegistrationWebViewType,
    { type: 'float', position: 'center', floatSize: { width: 540, height: 448 } },
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
  logger.info('Paratext Registration is activating!');

  const paratextRegistrationWebViewProvider = new ParatextRegistrationWebViewProvider();

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

  // No need to wait for this; it will do its thing and handle its own errors
  showParatextRegistrationIfNoRegistrationData();

  context.registrations.add(
    await shouldShowOnStartupValidatorPromise,
    await showParatextRegistrationPromise,
    await showParatextRegistrationWebViewProviderPromise,
  );
}

export async function deactivate() {
  logger.info('Paratext Registration is deactivating!');
  return true;
}
