import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext } from '@papi/core';
import {
  ParatextRegistrationWebViewProvider,
  paratextRegistrationWebViewType,
} from './paratext-registration.web-view-provider';
import {
  InternetSettingsWebViewOptions,
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

/**
 * Open (or refocus) the Internet Settings dialog.
 *
 * `requestDeveloperSettings` is checked with a strict `=== true` because this command is also the
 * click-command target of two notifications (`src/shared/utils/paratext-error-notification.util.ts`
 * and `extensions/src/platform-get-resources/src/internet-block-notification.utils.ts`), and the
 * notification service invokes a click command with the notification's own id string as its first
 * argument. A truthiness check would let that id unlock the server-selection control with no Shift
 * held.
 *
 * Known, accepted gap: `existingId: '?'` refocuses an already-open dialog without reloading it, so
 * a second Shift-click does not deliver `requestDeveloperSettings: true` to an instance that is
 * already open and locked; closing and reopening it works. The usual probe-then-reload pattern for
 * one-shot launch parameters is deliberately not used here: once PT-4869 makes the dialog modal, it
 * cannot stay open while the user goes back and Shift-clicks the row.
 */
async function showInternetSettings(
  requestDeveloperSettings?: boolean,
): Promise<string | undefined> {
  const options: InternetSettingsWebViewOptions = {
    existingId: '?',
    requestDeveloperSettings: requestDeveloperSettings === true,
  };
  return papi.webViews.openWebView(
    internetSettingsWebViewType,
    { type: 'float', position: 'center', floatSize: { width: 450, height: 500 } },
    options,
  );
}

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
  // Startup registration is handled by the renderer-side first-run overlay —
  // opening WebViews here races WebViewService.
}

export async function deactivate() {
  logger.debug('Paratext Registration is deactivating!');
  return true;
}
