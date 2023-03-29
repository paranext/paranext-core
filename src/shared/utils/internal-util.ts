/**
 * Utility functions specific to the internal technologies we are using.
 */

import { ProcessType } from '@shared/global-this.model';

/**
 * Determine if running on a client process (renderer, extension-host) or on the server.
 * @returns Returns true if running on a client, false otherwise
 */
export const isClient = () => globalThis.processType !== ProcessType.Main;

/**
 * Determine if running on the server process (main)
 * @returns Returns true if running on the server, false otherwise
 */
export const isServer = () => !isClient();

/**
 * Determine if running on the renderer process
 * @returns Returns true if running on the renderer, false otherwise
 */
export const isRenderer = () => globalThis.processType === ProcessType.Renderer;

/**
 * Gets which kind of process this is (main, renderer, extension-host)
 * @returns ProcessType for this process
 */
export const getProcessType = (): ProcessType => globalThis.processType;
