import type { InternetSettings } from 'paratext-registration';

/** Name of the data provider that reads and writes `ParatextData.dll`'s internet settings. */
export const INTERNET_SETTINGS_DATA_PROVIDER = 'paratextRegistration.internetSettingsDataProvider';

// Intentionally NOT shared with the standalone dialog (extensions/src/paratext-registration/src/
// internet-settings.web-view.tsx): that consumer sits on the extension side of the core/extension
// boundary, and `paratext-registration` is a types-only module, so there is no shared runtime module
// across that boundary to hoist its copy into. This module is for core `src/renderer`
// consumers only.
/**
 * `useData`'s defaultValue is typed as the data type's getData (`InternetSettings`), so it cannot
 * be undefined. This value is never shown to the user — each consumer covers it with a spinner or
 * skeleton until a real value replaces it.
 */
export const DEFAULT_INTERNET_SETTINGS: InternetSettings = {
  permittedInternetUse: 'Disabled',
  selectedServer: 'Production',
  proxyPort: 0,
};
