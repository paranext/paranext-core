/**
 * Handles registering, sending, and receiving commands with the Paratext backend in a unified format.
 * Exposed on papi
 */

import * as networkService from '@shared/services/network.service';
import {
  aggregateUnsubscriberAsyncs,
  createSafeRegisterFn,
  serializeRequestType,
  UnsubscriberAsync,
} from '@shared/utils/papi-util';
import { isClient, isRenderer } from '@shared/utils/internal-util';
import logger from '@shared/services/logger.service';

// We want to be able to use `CommandTypes` as a catch-all for creating command handler maps, so we
// need `any`, not just `unknown`, because `unknown` does not match to actual functions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommandTypes<TParams extends Array<any> = Array<any>, TReturn = any> = {
  params: TParams;
  returnType: TReturn;
};

// Can't use Function type because it is not compatible with Parameters or ReturnType, so we spell
// out any function type here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommandHandlerTypes<TCommandHandler extends (...args: any) => any> = CommandTypes<
  Parameters<TCommandHandler>,
  ReturnType<TCommandHandler>
>;

/**
 * Handler function for a command. Called when a command is executed.
 */
export type CommandHandler<TCommandTypes extends CommandTypes> = (
  ...args: TCommandTypes['params']
) => Promise<TCommandTypes['returnType']> | TCommandTypes['returnType'];

// TODO: Adding an index type removes type checking on the key :( How do we make sure extensions provide only CommandTypes?
export interface CommandHandlers {
  addThree: CommandHandlerTypes<typeof addThree>;
  squareAndConcat: CommandHandlerTypes<typeof squareAndConcat>;
  // These commands are provided in `main.ts`. They are only here because I needed them to use in
  // other places, but building `papi-dts` wasn't working because it didn't see `main.ts`
  echo: CommandTypes<[message: string], string>;
  echoRenderer: CommandHandlerTypes<(message: string) => Promise<string>>;
  echoExtensionHost: CommandHandlerTypes<(message: string) => Promise<string>>;
  throwError: CommandHandlerTypes<(message: string) => void>;
  quit: CommandHandlerTypes<() => Promise<void>>;
  // These commands are provided in `extension-host.ts`. They are only here because I needed them to
  // use in other places, but building `papi-dts` wasn't working because it didn't see
  // `extension-host.ts`
  addMany: CommandHandlerTypes<(...nums: number[]) => number>;
  throwErrorExtensionHost: CommandHandlerTypes<(message: string) => void>;
}

export type CommandNames = keyof CommandHandlers;

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
const rendererCommandFunctions: { [CommandName in CommandNames]?: CommandHandler<CommandTypes> } = {
  addThree,
  squareAndConcat,
};

/**
 * Send a command to the backend.
 *
 * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use sendCommand
 */
const sendCommandUnsafe = async <CommandName extends CommandNames>(
  commandName: CommandName,
  ...args: CommandHandlers[CommandName]['params']
): Promise<Awaited<CommandHandlers[CommandName]['returnType']>> => {
  return networkService.request(
    serializeRequestType(CATEGORY_COMMAND, commandName),
    ...args,
  ) as Promise<Awaited<CommandHandlers[CommandName]['returnType']>>;
};

/**
 * Register a command on the papi to be handled here.
 *
 * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use registerCommand
 * @param commandName command name to register for handling here
 * @param handler function to run when the command is invoked
 * @returns promise that resolves if the request successfully registered and unsubscriber function to run to stop the passed-in function from handling requests
 */
export const registerCommandUnsafe = <CommandName extends CommandNames>(
  commandName: CommandName,
  handler: CommandHandler<CommandHandlers[CommandName]>,
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

    // Set up subscriptions that the service needs to work

    // Register built-in commands
    if (isRenderer()) {
      // TODO: make a registerRequestHandlers function that we use here and in NetworkService.initialize?
      const unsubPromises = Object.entries(rendererCommandFunctions).map(([commandName, handler]) =>
        registerCommandUnsafe(commandName as CommandNames, handler),
      );

      // Wait to successfully register all commands
      const unsubscribeCommands = aggregateUnsubscriberAsyncs(await Promise.all(unsubPromises));

      // On closing, try to remove command listeners
      // TODO: should do this on the server when the connection closes or when the server exists as well
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
export const sendCommand = async <CommandName extends CommandNames>(
  commandName: CommandName,
  ...args: CommandHandlers[CommandName]['params']
): Promise<Awaited<CommandHandlers[CommandName]['returnType']>> => {
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
    ...args: CommandHandlers[CommandName]['params']
  ): Promise<Awaited<CommandHandlers[CommandName]['returnType']>> =>
    sendCommand(commandName, ...args);
};

/**
 * Register a command on the papi to be handled here
 * @param commandName command name to register for handling here
 * @param handler function to run when the command is invoked
 * @returns true if successfully registered, throws with error message if not
 */
export const registerCommand: <CommandName extends CommandNames>(
  commandName: CommandName,
  handler: CommandHandler<CommandHandlers[CommandName]>,
) => Promise<UnsubscriberAsync> = createSafeRegisterFn(
  registerCommandUnsafe,
  isInitialized,
  initialize,
);
