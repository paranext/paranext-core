/**
 * Handles registering, sending, and receiving commands with the Paratext backend in a unified format.
 * Exposed on papi
 */

import * as networkService from '@shared/services/network.service';
import {
  aggregateUnsubscriberAsyncs,
  CommandHandler,
  createSafeRegisterFn,
  serializeRequestType,
  UnsubPromiseAsync,
} from '@shared/utils/papi-util';
import { isClient, isRenderer } from '@shared/utils/internal-util';
import logger from '@shared/services/logger.service';

/** Prefix on requests that indicates that the request is a command */
const CATEGORY_COMMAND = 'command';

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

async function addThree(a: number, b: number, c: number) {
  return a + b + c;
}
async function squareAndConcat(a: number, b: string) {
  return a * a + b.toString();
}
/** Commands that this process will handle if it is the renderer. Registered automatically at initialization */
const rendererCommandFunctions: { [commandName: string]: CommandHandler } = {
  addThree,
  squareAndConcat,
};

/**
 * Send a command to the backend.
 *
 * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use sendCommand
 */
const sendCommandUnsafe = async <TParam extends Array<unknown>, TReturn>(
  commandName: string,
  ...args: TParam
): Promise<TReturn> => {
  return networkService.request(serializeRequestType(CATEGORY_COMMAND, commandName), ...args);
};

/**
 * Register a command on the papi to be handled here.
 *
 * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use registerCommand
 * @param commandName command name to register for handling here
 * @param handler function to run when the command is invoked
 * @returns promise that resolves if the request successfully registered and unsubscriber function to run to stop the passed-in function from handling requests
 */
export const registerCommandUnsafe = (
  commandName: string,
  handler: CommandHandler,
): UnsubPromiseAsync<void> => {
  return networkService.registerRequestHandler(
    serializeRequestType(CATEGORY_COMMAND, commandName),
    handler,
  );
};

/** Sets up the CommandService. Only runs once and always returns the same promise after that */
export const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    if (isInitialized) return;

    // TODO: Might be best to make a singleton or something
    await networkService.initialize();

    // Set up subscriptions that the service needs to work

    // Register built-in commands
    if (isRenderer()) {
      // TODO: make a registerRequestHandlers function that we use here and in NetworkService.initialize?
      const unsubPromises = Object.entries(rendererCommandFunctions).map(([commandName, handler]) =>
        registerCommandUnsafe(commandName, handler),
      );

      const unsubscribeCommands = aggregateUnsubscriberAsyncs(
        unsubPromises.map(({ unsubscriber }) => unsubscriber),
      );

      // Wait to successfully register all commands
      await Promise.all(unsubPromises.map(({ promise }) => promise));

      // On closing, try to remove command listeners
      // TODO: should do this on the server when the connection closes or when the server exists as well
      if (isRenderer())
        window.addEventListener('beforeunload', async () => {
          await unsubscribeCommands();
        });
    }

    isInitialized = true;

    if (isClient()) {
      const start = performance.now();
      sendCommandUnsafe('echo', 'Hi server!')
        .then((response) =>
          logger.info(
            'command:echo Response!!!',
            response,
            'Response time:',
            performance.now() - start,
          ),
        )
        .catch(logger.error);
    }
  })();

  return initializePromise;
};

/**
 * Send a command to the backend.
 */
export const sendCommand = async <TParam extends Array<unknown>, TReturn>(
  commandName: string,
  ...args: TParam
): Promise<TReturn> => {
  await initialize();
  return sendCommandUnsafe(commandName, ...args);
};

/**
 * Creates a function that is a command function with a baked commandName.
 * This is also nice because you get TypeScript type support using this function.
 * @param commandName command name for command function
 * @returns function to call with arguments of command that sends the command and resolves with the result of the command
 */
export const createSendCommandFunction = <TParam extends Array<unknown>, TReturn>(
  commandName: string,
) => {
  return async (...args: TParam) => sendCommand<TParam, TReturn>(commandName, ...args);
};

/**
 * Register a command on the papi to be handled here
 * @param commandName command name to register for handling here
 * @param handler function to run when the command is invoked
 * @returns true if successfully registered, throws with error message if not
 */
export const registerCommand: (
  commandName: string,
  handler: CommandHandler,
) => UnsubPromiseAsync<void> = createSafeRegisterFn(
  registerCommandUnsafe,
  isInitialized,
  initialize,
);
