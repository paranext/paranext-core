/**
 * Provides access to fetching resources and such things on the internet over the papi. This is
 * important because extensions should not be able to access the internet outside these functions.
 */

// TODO: use some more universal cached version of fetch in paranext-core#75
const fetchOriginal = globalThis.fetch;
/** Our shim over fetch. Allows us to control internet access. */
const papiFetch: typeof fetch = (...args) => {
  return fetchOriginal(...args);
};

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface InternetService {
  fetch: typeof papiFetch;
}

/**
 * JSDOC SOURCE internetService
 *
 * Service that provides a way to call `fetch` since the original function is not available
 */
export const internetService: InternetService = {
  fetch: papiFetch,
};
export default internetService;
