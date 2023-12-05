# paranext-core/src/declarations

A special folder with type declarations shared between core and extensions

Files in this folder should only be `.ts` files that contain declarations of types that core and extensions need to share and use together. The contents of these files are bundled into `papi.d.ts`. These files should be `.ts` files as opposed to `.d.ts` files because TypeScript creates `reference` imports to `.d.ts` files instead of bundling them into `papi.d.ts`, but we want `papi.d.ts` to be one independent file.

For example, `papi-shared-types.ts` contains an interface that defines command handlers. Core and extensions both define and use each others' command handlers, so they both `declare module 'papi-shared-types'` and extend the `CommandHandlers` interface. That way, both core and extensions can use each others' command handler types.

All new type declaration names should start with `@papi` to inherit some ESLint rules that ignore unnecessary errors.
