/**
 * Modules provided by our webpack configuration
 *
 * Please keep these JSDocs up-to-date with their counterparts in `webpack.config.base.ts`
 */

/** Import files with no transformation as strings with "./file?raw" */
declare module '*?raw' {
  const content: string;
  export default content;
}
