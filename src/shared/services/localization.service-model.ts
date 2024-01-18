/**
 * JSDOC SOURCE localizationService
 *
 * Provides localization data for UI
 */
export interface LocalizationServiceType {
  /**
   * Provide localization data for UI
   *
   * @returns Localization data for UI
   */
  getLocalizedValues: (obj: {}) => Promise<{}>;
}

export const localizationServiceNetworkObjectName = 'LocalizationService';
