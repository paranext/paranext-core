declare module 'hello-world' {}

declare module 'papi-commands' {
  export interface CommandHandlers {
    'hello-world.hello-world': () => string;
    'hello-world.hello-exception': (message: string) => void;
  }
}
