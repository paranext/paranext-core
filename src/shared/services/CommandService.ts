/**
 * Handles registering, sending, and receiving commands with the Paratext backend in a unified format.
 * Exposed on papi
 */

import memoizeOne from 'memoize-one';
import * as NetworkService from '@shared/services/NetworkService';
import {
  aggregateUnsubscriberAsyncs,
  CATEGORY_COMMAND,
  CommandHandler,
  createSafeRegisterFn,
  serializeRequestType,
  UnsubPromiseAsync,
} from '@shared/util/PapiUtil';
import { isClient, isRenderer } from '@shared/util/InternalUtil';

/** Whether this service has finished setting up */
let isInitialized = false;

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
/* const commandUnsubscribers = new Map<string, Unsubscriber>(); */

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
 * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use sendCommand
 */
const sendCommandUnsafe = async <TParam extends Array<unknown>, TReturn>(
  commandName: string,
  ...args: TParam
): Promise<TReturn> => {
  return NetworkService.request(
    serializeRequestType(CATEGORY_COMMAND, commandName),
    ...args,
  );
};

/**
 * Register commands on the papi to be handled here
 * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use registerCommands
 * @param commands list of commands and handlers to register for handling here
 * @returns promise that resolves when the command is finished registering and unsubscriber to unregister this command
 */
/* const registerCommandsUnsafe = (
  ...commands: CommandRegistration[]
): Promise<ComplexResponse<void>> => {
  const unsubPromises = commands.map(({ commandName, handler }) =>
    NetworkService.registerRequestHandler(
      serializeRequestType(CATEGORY_COMMAND, commandName),
      handler,
    ),
  );

  const unsubscribeCommands = aggregateUnsubscriberAsyncs(
    unsubPromises.map(({ unsubscriber }) => unsubscriber),
  );

  // Wait to successfully register all commands
  await Promise.all(unsubPromises.map(({ promise }) => promise));

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
}; */

/**
 * Register a command on the papi to be handled here.
 * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use registerCommand
 * @param commandName command name to register for handling here
 * @param handler function to run when the command is invoked
 * @returns promise that resolves if the request successfully registered and unsubscriber function to run to stop the passed-in function from handling requests
 */
export const registerCommandUnsafe = (
  commandName: string,
  handler: CommandHandler,
): UnsubPromiseAsync<void> => {
  return NetworkService.registerRequestHandler(
    serializeRequestType(CATEGORY_COMMAND, commandName),
    handler,
  );
};

/** Sets up the CommunicationService */
export const initialize = memoizeOne(async (): Promise<void> => {
  if (isInitialized) return;

  // TODO: Might be best to make a singleton or something
  await NetworkService.initialize();

  // Set up subscriptions that the service needs to work

  // Register built-in commands
  if (isRenderer()) {
    // TODO: make a registerRequestHandlers function that we use here and in NetworkService.initialize?
    const unsubPromises = Object.entries(rendererCommandFunctions).map(
      ([commandName, handler]) => registerCommandUnsafe(commandName, handler),
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
        console.log(
          'command:echo Response!!!',
          response,
          'Response time:',
          performance.now() - start,
        ),
      )
      .catch((e) => console.error(e));
  }
});

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
/* const registerCommands = async (...commands: CommandRegistration[]) => {
  await initialize();
  return registerCommandsUnsafe(...commands);
}; */

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

/**
 * Unregister commands on the papi that were being handled here
 * @param commands list of command names to unregister from handling here
 * @returns response whose contents are a list of commands that were not successfully unregistered if error
 */
/* const unregisterCommands = async (...commands: string[]) => {
  await initialize();
  return unregisterCommandsUnsafe(...commands);
}; */

/**
 * Unregister a command on the papi that was being handled here
 * @param commandName command name to unregister from handling here
 * @returns true if successfully unregistered, throws with error message if not
 */
/* export const unregisterCommand = async (commandName: string) => {
  const response = await unregisterCommands(commandName);
  if (!response.success) throw new Error(response.errorMessage);
  return true;
}; */
