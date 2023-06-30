declare module 'hello-world' {}

declare module '@shared/services/command.service' {
  export interface CommandHandlers {
    'hello-world.hello-world': () => string;
    'hello-world.hello-exception': (message: string) => void;
  }
}
