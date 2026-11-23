import type { ResourceReferenceList } from 'platform-scripture';

/** Current data-version written into the JSON body of a stored ResourceReferenceList. */
export const CURRENT_DATA_VERSION = '1.1.0';

/**
 * Canonical empty ResourceReferenceList used as a default/fallback value. Frozen so it can be
 * shared as a module-level reference without risk of mutation.
 */
export const DEFAULT_RESOURCE_REFERENCE_LIST: ResourceReferenceList = Object.freeze({
  dataVersion: CURRENT_DATA_VERSION,
  items: [],
});
