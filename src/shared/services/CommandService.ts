/**
 * Handles registering, sending, and receiving commands with the Paratext backend in a unified format.
 * Exposed on papi
 */

import * as NetworkService from '@shared/services/NetworkService';
import {
  CATEGORY_COMMAND,
  CATEGORY_EPM,
  CommandHandler,
  ComplexResponse,
  serializeRequestType,
  Unsubscriber,
} from '@shared/util/PapiUtil';
import memoizeOne from 'memoize-one';

/** Whether this service has finished setting up */
let initialized = false;

/** Registration object for a command. Want an object so we can register multiple commands at once */
// Any is probably fine because we likely never know or care about the args or return
export type CommandRegistration<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TParam extends Array<unknown> = any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TReturn = any,
> = {
  commandName: string;
  handler: CommandHandler<TParam, TReturn>;
};

/** Map of command name to unregister function for that command */
const commandUnsubscribers = new Map<string, Unsubscriber>();

function addThree(a: number, b: number, c: number) {
  return a + b + c;
}
function squareAndConcat(a: number, b: string) {
  return a * a + b.toString();
}
/** Commands that this process will handle. Registered automatically at initialization */
const commandFunctions: { [commandName: string]: CommandHandler } = {
  addThree,
  squareAndConcat,
};

/**
 * Send a command to the backend.
 * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use sendCommand
 */
const sendCommandUnsafe = async <TParam extends Array<unknown>, TReturn>(
  type: string,
  ...args: TParam
): Promise<ComplexResponse<TReturn>> => {
  return NetworkService.request(
    serializeRequestType(CATEGORY_COMMAND, type),
    args,
  );
};

/**
 * Send an epm request to the backend.
 * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use sendEpmRequest
 */
const sendEpmRequestUnsafe = async <TParam extends Array<unknown>, TReturn>(
  type: string,
  ...args: TParam
): Promise<ComplexResponse<TReturn>> => {
  return NetworkService.request(serializeRequestType(CATEGORY_EPM, type), args);
};

/**
 * Unregister commands on the papi that were being handled here
 * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use unregisterCommands
 * @param commands list of command names to unregister from handling here
 * @returns response whose contents are a list of commands that were not successfully unregistered if error
 * TODO: instead of having an independent unregister, refactor so registerCommandsUnsafe returns a promise and an unsubscriber per command
 */
const unregisterCommandsUnsafe = async (
  ...commandNames: string[]
): Promise<ComplexResponse<string[]>> => {
  const commandResponse = await sendEpmRequestUnsafe<string[], string[]>(
    'unregisterCommands',
    ...commandNames,
  );

  commandNames.forEach((commandName) => {
    if (
      commandResponse.success ||
      !commandResponse.contents?.includes(commandName)
    ) {
      // Command successfully unregistered. Unsubscribe the command request handler!
      const commandUnsubscriber = commandUnsubscribers.get(commandName);
      if (commandUnsubscriber) {
        commandUnsubscriber();
        commandUnsubscribers.delete(commandName);
      } else
        throw Error(`Command ${commandName} does not have a handler to remove`);
    }
  });

  if (!commandResponse.success) {
    console.error(commandResponse.errorMessage, commandResponse);
  }

  return commandResponse;
};

/**
 * Register commands on the papi to be handled here
 * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use registerCommands
 * @param commands list of commands and handlers to register for handling here
 * @returns response whose contents are a list of commands that were not successfully registered if error
 */
const registerCommandsUnsafe = async (
  ...commands: CommandRegistration[]
): Promise<ComplexResponse<string[]>> => {
  const commandResponse = await sendEpmRequestUnsafe<string[], string[]>(
    'registerCommands',
    ...commands.map((command) => command.commandName),
  );

  commands.forEach((commandRegistration) => {
    if (
      commandResponse.success ||
      !commandResponse.contents?.includes(commandRegistration.commandName)
    ) {
      // Command successfully registered. Register to respond to the command request
      commandUnsubscribers.set(
        commandRegistration.commandName,
        NetworkService.registerRequestHandler(
          serializeRequestType(
            CATEGORY_COMMAND,
            commandRegistration.commandName,
          ),
          commandRegistration.handler,
        ),
      );
    }
  });

  if (!commandResponse.success) {
    console.error(commandResponse.errorMessage, commandResponse);
  }

  return commandResponse;
};

/** Sets up the CommunicationService */
export const initialize = memoizeOne(async (): Promise<void> => {
  if (initialized) return;

  // TODO: Might be best to make a singleton or something
  await NetworkService.initialize();

  // Set up subscriptions that the service needs to work

  // Register built-in commands
  console.log(
    await registerCommandsUnsafe(
      ...Object.entries(commandFunctions).map(([commandName, handler]) => ({
        commandName,
        handler,
      })),
    ),
  );

  // On closing, try to remove command listeners
  // TODO: should probably do this on the server when the connection closes
  window.addEventListener('beforeunload', async () => {
    /* unsubscribeRequests(); */
    await unregisterCommandsUnsafe(...commandUnsubscribers.keys());
  });

  initialized = true;

  const start = performance.now();
  sendCommandUnsafe('echo', 'Hi server!')
    .then((response) =>
      console.log(
        'Response!!!',
        response,
        'Response time:',
        performance.now() - start,
      ),
    )
    .catch((e) => console.error(e));
});

/**
 * Send a command to the backend.
 */
export const sendCommand = async <TParam extends Array<unknown>, TReturn>(
  type: string,
  ...args: TParam
): Promise<ComplexResponse<TReturn>> => {
  await initialize();
  return sendCommandUnsafe(type, ...args);
};

/**
 * Send an epm request to the backend.
 * Internal; do not export for use on papi.
 * Not sure we need this, but it's here just in case
 */
/* const sendEpmRequest = async <TParam extends Array<unknown>, TReturn>(
  type: string,
  ...args: TParam
): Promise<ComplexResponse<TReturn>> => {
  await initialize();
  return sendEpmRequestUnsafe(type, ...args);
}; */

/**
 * Register commands on the papi to be handled here
 * @param commands list of commands and handlers to register for handling here
 * @returns response whose contents are a list of commands that were not successfully registered if error
 */
const registerCommands = async (...commands: CommandRegistration[]) => {
  await initialize();
  return registerCommandsUnsafe(...commands);
};

/**
 * Register a command on the papi to be handled here
 * @param commandName command name to register for handling here
 * @param handler function to run when the command is invoked
 * @returns true if successfully registered, throws with error message if not
 */
export const registerCommand = async (
  commandName: string,
  handler: CommandHandler,
) => {
  const response = await registerCommands({ commandName, handler });
  if (!response.success) throw new Error(response.errorMessage);
  return true;
};

/**
 * Unregister commands on the papi that were being handled here
 * @param commands list of command names to unregister from handling here
 * @returns response whose contents are a list of commands that were not successfully unregistered if error
 */
const unregisterCommands = async (...commands: string[]) => {
  await initialize();
  return unregisterCommandsUnsafe(...commands);
};

/**
 * Unregister a command on the papi that was being handled here
 * @param commandName command name to unregister from handling here
 * @returns true if successfully unregistered, throws with error message if not
 */
export const unregisterCommand = async (commandName: string) => {
  const response = await unregisterCommands(commandName);
  if (!response.success) throw new Error(response.errorMessage);
  return true;
};
