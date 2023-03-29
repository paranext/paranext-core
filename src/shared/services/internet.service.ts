/**
 * Provides access to fetching resources and such things on the internet over the papi.
 * This is important because extensions should not be able to access the internet outside these functions.
 */

// TODO: use some more universal cached version of fetch in paranext-core#75
const fetchOriginal = globalThis.fetch;
/** Our shim over fetch. Allows us to control internet access. */
const papiFetch: typeof fetch = (...args) => {
  return fetchOriginal(...args);
};

export default {
  fetch: papiFetch,
};
