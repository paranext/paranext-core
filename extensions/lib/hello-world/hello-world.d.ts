import type { CommandHandlerTypes } from 'shared/services/command.service';

declare module 'hello-world' {}

declare module 'shared/services/command.service' {
  export interface CommandHandlers {
    'hello-world.hello-world': CommandHandlerTypes<() => string>;
    'hello-world.hello-exception': CommandHandlerTypes<(message: string) => void>;
  }
}
