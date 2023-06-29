declare module 'papi-commands' {
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
    // These commands are provided in `main.ts`. They are only here because I needed them to use in
    // other places, but building `papi-dts` wasn't working because it didn't see `main.ts`
    echo: CommandTypes<[message: string], string>;
    echoRenderer: CommandHandlerTypes<(message: string) => Promise<string>>;
    echoExtensionHost: CommandHandlerTypes<(message: string) => Promise<string>>;
    throwError: CommandHandlerTypes<(message: string) => void>;
    quit: CommandHandlerTypes<() => Promise<void>>;
  }

  export type CommandNames = keyof CommandHandlers;
}
