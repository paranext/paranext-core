import type { SpaceApi } from '@usersnap/browser';

export const USERSNAP_SPACE_API_KEY: string = '1cf2709b-3ff0-4cff-8952-a2d2bca7590d';
export const USERSNAP_PROJECT_REPORT_ISSUE_API_KEY: string = '68df6b26-c519-4829-8d07-2201d31fac9d';
export const USERSNAP_PROJECT_SUBMIT_IDEA_API_KEY: string = 'bd3bc542-1f0c-40e4-85f7-315f5138ea88';

/** Global UserSnap API instance service */

let globalUsersnapApi: SpaceApi | undefined;

/** Sets the global UserSnap API instance. This should only be called from during initialization */
export function setUsersnapApi(api: SpaceApi | undefined): void {
  globalUsersnapApi = api;
}

/**
 * Gets the current UserSnap API instance
 *
 * @returns The UserSnap API instance or undefined if not initialized
 */
export function getUsersnapApi(): SpaceApi | undefined {
  return globalUsersnapApi;
}
