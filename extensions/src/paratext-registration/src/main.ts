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

async function showParatextRegistration(): Promise<string | undefined> {
  return papi.webViews.openWebView(
    paratextRegistrationWebViewType,
    { type: 'float', position: 'center', floatSize: { width: 600, height: 540 } },
    { existingId: '?' },
  );
}

async function showInternetSettings(): Promise<string | undefined> {
  return papi.webViews.openWebView(
    internetSettingsWebViewType,
    { type: 'float', position: 'center', floatSize: { width: 450, height: 500 } },
    { existingId: '?' },
  );
}

// Startup registration is handled by the renderer-side first-run overlay (PT-4175) — opening WebViews here races WebViewService.
export async function activate(context: ExecutionActivationContext) {
  logger.debug('Paratext Registration is activating!');

  const paratextRegistrationWebViewProvider = new ParatextRegistrationWebViewProvider();
  const internetSettingsWebViewProvider = new InternetSettingsWebViewProvider();

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

  context.registrations.add(
    await showParatextRegistrationPromise,
    await showParatextRegistrationWebViewProviderPromise,
    await showInternetSettingsPromise,
    await showInternetSettingsWebViewProviderPromise,
  );
}

export async function deactivate() {
  logger.debug('Paratext Registration is deactivating!');
  return true;
}
