/**
 * Handles registering, sending, and receiving commands with the Paratext backend in a unified
 * format. Exposed on papi
 */

import * as networkService from '@shared/services/network.service';
import { UnsubscriberAsync } from 'platform-bible-utils';
import { serializeRequestType } from '@shared/utils/util';
import { CommandHandlers, CommandNames } from 'papi-shared-types';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';

/**
 * Register a command on the papi to be handled here
 *
 * @param commandName Command name to register for handling here
 *
 *   - Note: Command names must consist of two string separated by at least one period. We recommend one
 *       period and lower camel case in case we expand the api in the future to allow dot notation.
 *
 * @param handler Function to run when the command is invoked
 * @returns Promise that resolves if the command successfully registered and unsubscriber function
 *   to run to stop the passed-in function from handling commands
 */
export const registerCommand = <CommandName extends CommandNames>(
  commandName: CommandName,
  handler: CommandHandlers[CommandName],
  commandDocs?: SingleMethodDocumentation,
): Promise<UnsubscriberAsync> => {
  return networkService.registerRequestHandler(
    serializeRequestType(CATEGORY_COMMAND, commandName),
    handler,
    commandDocs,
  );
};

/** Send a command to the backend. */
export const sendCommand = async <CommandName extends CommandNames>(
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
 * Creates a function that is a command function with a baked commandName. This is also nice because
 * you get TypeScript type support using this function.
 *
 * @param commandName Command name for command function
 * @returns Function to call with arguments of command that sends the command and resolves with the
 *   result of the command
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
 * JSDOC SOURCE commandService
 *
 * The command service allows you to exchange messages with other components in the platform. You
 * can register a command that other services and extensions can send you. You can send commands to
 * other services and extensions that have registered commands.
 */
export type moduleSummaryComments = {};
