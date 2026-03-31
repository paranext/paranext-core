/** Modules provided by our vite configuration */

declare module 'vite-env' {
  // vite-env is not a real module. Unfortunately, though, TypeScript needs to think it is. We need
  // to provide this so TypeScript could find vite-env in the modules loaded with the `types` field
  // in `tsconfig.json` so dts-bundle-generator would be able to see the `*.css` module declaration
}

/** Import css files as strings */
declare module '*.css' {
  const content: string;
  export default content;
}
