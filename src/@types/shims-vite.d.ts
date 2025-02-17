/* eslint-disable @typescript-eslint/no-explicit-any */

// vite is shimmed since we only use it for vitest and this excludes it from type checking.
declare module 'vite' {
  export type TransformResult = any;
  export type ServerOptions = any;
  export type DepOptimizationConfig = any;
  export type AliasOptions = any;
  export type ConfigEnv = any;
  export type ViteDevServer = any;
  export type ModuleNode = any;
}
