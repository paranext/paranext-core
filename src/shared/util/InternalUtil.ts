/**
 * Utility functions specific to the internal technologies we are using.
 */

/**
 * Determine if running on the clientor on the server
 * @returns Returns true if running on the client, false otherwise
 */
// eslint-disable-next-line import/prefer-default-export
export const isClient = () =>
  typeof process === 'undefined' || !process || process.type === 'renderer';
