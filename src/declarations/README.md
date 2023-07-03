# paranext-core/src/declarations

A special folder with type declarations shared between core and extensions

Files in this folder should only be `.ts` files that contain declarations of types that core and extensions need to share and use together. The contents of these files are bundled into `papi.d.ts`.

For example, `papi-commands.ts` contains an interface that defines command handlers. Core and extensions both define and use each others' command handlers, so they both `declare module 'papi-commands'` and extend the `CommandHandlers` interface. That way, both core and extensions can use each others' command handler types.
