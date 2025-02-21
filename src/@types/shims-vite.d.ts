/* eslint-disable @typescript-eslint/no-explicit-any */

// vite is shimmed since we only use it for vitest and this excludes it from type checking. Note to
// use this a path for 'vite' is added in `tsconfig.json`.
// Without this, when running `npm run typecheck:core` we get this error:
//   node_modules/vite/dist/node/index.d.ts:5:41 - error TS2307: Cannot find module 'rollup/parseAst' or its corresponding type declarations.
declare module 'vite' {
  export type TransformResult = any;
  export type ServerOptions = any;
  export type DepOptimizationConfig = any;
  export type AliasOptions = any;
  export type ConfigEnv = any;
  export type ViteDevServer = any;
  export type ModuleNode = any;
}
