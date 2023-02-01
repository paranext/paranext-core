/**
 * Utility functions specific to the internal technologies we are using.
 */

/**
 * Determine if running on the client or on the server.
 * Thanks to Marshal at https://stackoverflow.com/a/71388839/8535752
 * @returns Returns true if running on the client, false otherwise
 */
// eslint-disable-next-line import/prefer-default-export
export const isClient = () =>
  typeof process === 'undefined' || !process || process.type === 'renderer';
