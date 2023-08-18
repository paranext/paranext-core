declare module 'papi-commands' {
  // TODO: Adding an index type removes type checking on the key :( How do we make sure extensions provide only functions?
  /**
   * Function types for each command available on the papi. Each extension can extend this interface
   * to add commands that it registers on the papi.
   *
   * Note: Command names must consist of two string separated by at least one period. We recommend
   * one period and lower camel case in case we expand the api in the future to allow dot notation.
   *
   * @example An extension can extend this interface to add types for the commands it registers by
   * adding the following to its `.d.ts` file:
   *
   * ```typescript
   * declare module 'papi-commands' {
       export interface CommandHandlers {
         'myExtension.myCommand1': (foo: string, bar: number) => string;
         'myExtension.myCommand2': (foo: string) => Promise<void>;
       }
     }
   * ```
   */
  export interface CommandHandlers {
    // These commands are provided in `main.ts`. They are only here because I needed them to use in
    // other places, but building `papi-dts` wasn't working because it didn't see `main.ts`
    'test.echo': (message: string) => string;
    'test.echoRenderer': (message: string) => Promise<string>;
    'test.echoExtensionHost': (message: string) => Promise<string>;
    'test.throwError': (message: string) => void;
    'platform.restartExtensionHost': () => Promise<void>;
    'platform.quit': () => Promise<void>;
    // These commands are provided in `extension-host.ts`. They are only here because I needed them to
    // use in other places, but building `papi-dts` wasn't working because it didn't see
    // `extension-host.ts`
    'test.addMany': (...nums: number[]) => number;
    'test.throwErrorExtensionHost': (message: string) => void;
  }

  /**
   * Names for each command available on the papi. Automatically includes all extensions' commands
   * that are added to {@link CommandHandlers}.
   *
   * Note: Command names must consist of two string separated by at least one period. We recommend
   * one period and lower camel case in case we expand the api in the future to allow dot notation.
   *
   * @example 'platform.quit'
   */
  export type CommandNames = keyof CommandHandlers;
}
