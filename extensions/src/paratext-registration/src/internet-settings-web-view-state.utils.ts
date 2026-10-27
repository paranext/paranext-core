import type { SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import { isPlatformError, type PlatformError } from 'platform-bible-utils';
import type { InternetSettings } from 'paratext-registration';
import type { InternetSettingsWebViewOptions } from './internet-settings.web-view-provider';

/**
 * Build the Internet Settings WebView's persisted `state` from its saved definition and the options
 * `showInternetSettings`/`showInternetSettingsWithServerSelection` supply. Kept outside
 * `InternetSettingsWebViewProvider.getWebView` so this option→state mapping is unit-testable
 * without importing the WebView's `?inline` content.
 *
 * `requestDeveloperSettings` is scrubbed unconditionally to `false` when the caller supplies
 * nothing, rather than falling back to the saved value — same treatment as `shouldFocusSearch` in
 * the Find provider (`find-web-view-state.utils.ts`). It records whether the dialog was opened via
 * `showInternetSettingsWithServerSelection`, a one-shot gesture rather than durable state; carrying
 * a saved `true` over would re-reveal the server-selection control on a restored layout that nobody
 * asked to unlock this session.
 */
export function buildInternetSettingsWebViewState(
  savedWebView: SavedWebViewDefinition,
  options: InternetSettingsWebViewOptions,
): WebViewDefinition['state'] {
  return {
    ...savedWebView.state,
    requestDeveloperSettings: options.requestDeveloperSettings ?? false,
  };
}

/**
 * Whether the Internet Settings dialog should render the (otherwise hidden) server-selection
 * control. Combines the one-shot `showInternetSettingsWithServerSelection` request with a live read
 * of whether the persisted server is already something other than Production — the friction only
 * guards leaving Production, so a user already off it (or one who opened via that command) can
 * always reach the control. A failed `internetSettings` read (a `PlatformError`) fails toward
 * locked rather than guessing the control should show.
 */
export function computeCanEditServer(
  requestDeveloperSettings: boolean,
  internetSettings: InternetSettings | PlatformError,
): boolean {
  return (
    requestDeveloperSettings ||
    (!isPlatformError(internetSettings) && internetSettings.selectedServer !== 'Production')
  );
}
