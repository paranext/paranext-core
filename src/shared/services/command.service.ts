/**
 * Handles registering, sending, and receiving commands with the Paratext backend in a unified format.
 * Exposed on papi
 */

import * as networkService from '@shared/services/network.service';
import {
  createSafeRegisterFn,
  serializeRequestType,
  UnsubscriberAsync,
} from '@shared/utils/papi-util';
import { CommandHandlers, CommandNames } from 'papi-shared-types';
import { CATEGORY_COMMAND } from '@shared/data/internal-connection.model';

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/**
 * Send a command to the backend.
 *
 * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use sendCommand
 */
const sendCommandUnsafe = async <CommandName extends CommandNames>(
  commandName: CommandName,
  ...args: Parameters<CommandHandlers[CommandName]>
): Promise<Awaited<ReturnType<CommandHandlers[CommandName]>>> => {
  // This type assertion is needed when the return type is unknown or when it's not Awaited<...>.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion
  return networkService.request(
    serializeRequestType(CATEGORY_COMMAND, commandName),
    ...args,
  ) as Promise<Awaited<ReturnType<CommandHandlers[CommandName]>>>;
};

/**
 * Register a command on the papi to be handled here.
 *
 * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use registerCommand
 * @param commandName command name to register for handling here
 *   - Note: Command names must consist of two string separated by at least one period. We recommend
 *   one period and lower camel case in case we expand the api in the future to allow dot notation.
 * @param handler function to run when the command is invoked
 * @returns promise that resolves if the request successfully registered and unsubscriber function to run to stop the passed-in function from handling requests
 */
const registerCommandUnsafe = <CommandName extends CommandNames>(
  commandName: CommandName,
  handler: CommandHandlers[CommandName],
): Promise<UnsubscriberAsync> => {
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
    isInitialized = true;
  })();

  return initializePromise;
};

/**
 * Send a command to the backend.
 */
export const sendCommand = async <CommandName extends CommandNames>(
  commandName: CommandName,
  ...args: Parameters<CommandHandlers[CommandName]>
): Promise<Awaited<ReturnType<CommandHandlers[CommandName]>>> => {
  await initialize();
  return sendCommandUnsafe(commandName, ...args);
};

/**
 * Creates a function that is a command function with a baked commandName.
 * This is also nice because you get TypeScript type support using this function.
 * @param commandName command name for command function
 * @returns function to call with arguments of command that sends the command and resolves with the result of the command
 */
export const createSendCommandFunction = <CommandName extends CommandNames>(
  commandName: CommandName,
) => {
  return async (
    ...args: Parameters<CommandHandlers[CommandName]>
  ): Promise<Awaited<ReturnType<CommandHandlers[CommandName]>>> =>
    sendCommand(commandName, ...args);
};

/**
 * Register a command on the papi to be handled here
 * @param commandName command name to register for handling here
 *   - Note: Command names must consist of two string separated by at least one period. We recommend
 *   one period and lower camel case in case we expand the api in the future to allow dot notation.
 * @param handler function to run when the command is invoked
 * @returns true if successfully registered, throws with error message if not
 */
export const registerCommand: <CommandName extends CommandNames>(
  commandName: CommandName,
  handler: CommandHandlers[CommandName],
) => Promise<UnsubscriberAsync> = createSafeRegisterFn(
  registerCommandUnsafe,
  isInitialized,
  initialize,
);

/** JSDOC SOURCE commandService
 * The command service allows you to exchange messages with other components in the platform.
 * You can register a command that other services and extensions can send you.
 * You can send commands to other services and extensions that have registered commands.
 */
export type moduleSummaryComments = {};
