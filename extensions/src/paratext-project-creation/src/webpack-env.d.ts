/**
 * Modules that tell TypeScript the return type of webpack imports. If you change these, make sure
 * to also update `webpack.config.base`
 */

// Please keep these JSDocs up-to-date with their counterparts in `webpack.config.base.ts`

/**
 * Import fully loaded and transformed files as strings with "./file?inline"
 *
 * WARNING: These files are NOT bundled. The rules are applied, but webpack does not bundle
 * dependencies into these files before providing them, unfortunately. However, React WebView files
 * are an exception as they are fully bundled.
 */
declare module '*?inline' {
  const content: string;
  export default content;
}

/** Import files with no transformation as strings with "./file?raw" */
declare module '*?raw' {
  const content: string;
  export default content;
}
