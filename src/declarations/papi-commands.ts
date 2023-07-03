declare module 'papi-commands' {
  // TODO: Adding an index type removes type checking on the key :( How do we make sure extensions provide only functions?
  /**
   * Function types for each command available on the papi. Each extension can extend this interface
   * to add commands that it registers on the papi.
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
    echo: (message: string) => string;
    echoRenderer: (message: string) => Promise<string>;
    echoExtensionHost: (message: string) => Promise<string>;
    throwError: (message: string) => void;
    quit: () => Promise<void>;
    // These commands are provided in `extension-host.ts`. They are only here because I needed them to
    // use in other places, but building `papi-dts` wasn't working because it didn't see
    // `extension-host.ts`
    addMany: (...nums: number[]) => number;
    throwErrorExtensionHost: (message: string) => void;
  }

  export type CommandNames = keyof CommandHandlers;
}
