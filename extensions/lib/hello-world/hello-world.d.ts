import { CommandHandlerTypes } from 'papi-commands';

declare module 'hello-world' {}

declare module 'papi-commands' {
  export interface CommandHandlers {
    'hello-world.hello-world': CommandHandlerTypes<() => string>;
    'hello-world.hello-exception': CommandHandlerTypes<(message: string) => void>;
  }
}
