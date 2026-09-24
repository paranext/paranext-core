/**
 * Storybook stub for `@papi/core`.
 *
 * `@papi/core` is consumed only for type imports in the extension source, so these are erased at
 * compile time and never reach webpack. This module exists as a safety net in case a non-type value
 * import is ever added; it intentionally exports nothing at runtime.
 */

export {};
