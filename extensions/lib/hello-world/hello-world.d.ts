declare module 'hello-world' {}

declare module 'papi-commands' {
  export interface CommandHandlers {
    'helloWorld.helloWorld': () => string;
    'helloWorld.helloException': (message: string) => void;
  }
}
