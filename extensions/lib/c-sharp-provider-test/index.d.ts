declare module 'c-sharp-provider-test' {}

declare module 'papi-commands' {
  export interface CommandHandlers {
    addOne: (num: number) => number;
  }
}
