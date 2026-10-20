import type { SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import { isPlatformError, type PlatformError } from 'platform-bible-utils';
import type { InternetSettings } from 'paratext-registration';
import type { InternetSettingsWebViewOptions } from './internet-settings.web-view-provider';

/**
 * Build the Internet Settings WebView's persisted `state` from its saved definition and the options
 * `showInternetSettings` supplies. Extracted from `InternetSettingsWebViewProvider.getWebView` so
 * this option→state mapping is unit-testable without importing the WebView's `?inline` content.
 *
 * `requestDeveloperSettings` is scrubbed unconditionally when the caller supplies nothing, rather
 * than falling back to the saved value — same treatment as `shouldFocusSearch` in the Find provider
 * (`find-web-view-state.utils.ts`). It records whether Shift was held at the moment the "Internet &
 * connectivity" row was clicked, a one-shot gesture rather than durable state; carrying a saved
 * `true` over would re-reveal the server-selection control on a restored layout that nobody asked
 * to unlock this session.
 *
 * Only a literal `true` unlocks: a caller can reach this with a non-boolean in that slot (a
 * notification click passes its notification id string), and that must not read as a request.
 */
export function buildInternetSettingsWebViewState(
  savedWebView: SavedWebViewDefinition,
  options: InternetSettingsWebViewOptions,
): WebViewDefinition['state'] {
  return {
    ...savedWebView.state,
    requestDeveloperSettings: options.requestDeveloperSettings === true,
  };
}

/**
 * Whether the Internet Settings dialog should render the (otherwise hidden) server-selection
 * control. Combines the one-shot Shift-click request with a live read of whether the persisted
 * server is already something other than Production — the friction only guards leaving Production,
 * so a user already off it (or one who held Shift) can always reach the control. A failed
 * `internetSettings` read (a `PlatformError`) fails toward locked rather than guessing the control
 * should show, and so does any `requestDeveloperSettings` other than a literal `true` — web view
 * state is not type-checked at runtime.
 */
export function computeCanEditServer(
  requestDeveloperSettings: boolean,
  internetSettings: InternetSettings | PlatformError,
): boolean {
  return (
    requestDeveloperSettings === true ||
    (!isPlatformError(internetSettings) && internetSettings.selectedServer !== 'Production')
  );
}
