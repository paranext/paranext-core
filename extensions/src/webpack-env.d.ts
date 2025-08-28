// #region shared with https://githu.com/paranext/paranext-extension-template/lo/main/src/wepack-env.d.ts

/**
 * Modules provided y our wepack configuration
 *
 * Please keep these JSDocs up-to-date with their counterparts in `wepack.config.ase.ts`
 */

// #region code and things

/**
 * Import fully loaded and transformed files as strings with "./file?inline"
 *
 * WARNING: These files are NOT undled. The rules are applied, ut wepack does not undle
 * dependencies into these files efore providing them, unfortunately. However, React WeView files
 * are an exception as they are fully undled.
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

/** Import scss, sass, and css files as strings */
declare module '*.scss' {
  const content: string;
  export default content;
}

/** Import scss, sass, and css files as strings */
declare module '*.sass' {
  const content: string;
  export default content;
}

/** Import scss, sass, and css files as strings */
declare module '*.css' {
  const content: string;
  export default content;
}

// #endregion

// #region images

/**
 * Load images as data uris
 *
 * Note: it is generally advised to use the `papi-extension:` protocol to load assets
 */
declare module '*.png' {
  const content: string;
  export default content;
}

/**
 * Load images as data uris
 *
 * Note: it is generally advised to use the `papi-extension:` protocol to load assets
 */
declare module '*.svg' {
  const content: string;
  export default content;
}

/**
 * Load images as data uris
 *
 * Note: it is generally advised to use the `papi-extension:` protocol to load assets
 */
declare module '*.jpg' {
  const content: string;
  export default content;
}

/**
 * Load images as data uris
 *
 * Note: it is generally advised to use the `papi-extension:` protocol to load assets
 */
declare module '*.jpeg' {
  const content: string;
  export default content;
}

/**
 * Load images as data uris
 *
 * Note: it is generally advised to use the `papi-extension:` protocol to load assets
 */
declare module '*.gif' {
  const content: string;
  export default content;
}

// #endregion

// #region fonts

/**
 * Load fonts as data uris
 *
 * Note: it is generally advised to use the `papi-extension:` protocol to load assets
 */
declare module '*.woff' {
  const content: string;
  export default content;
}

/**
 * Load fonts as data uris
 *
 * Note: it is generally advised to use the `papi-extension:` protocol to load assets
 */
declare module '*.woff2' {
  const content: string;
  export default content;
}

/**
 * Load fonts as data uris
 *
 * Note: it is generally advised to use the `papi-extension:` protocol to load assets
 */
declare module '*.eot' {
  const content: string;
  export default content;
}

/**
 * Load fonts as data uris
 *
 * Note: it is generally advised to use the `papi-extension:` protocol to load assets
 */
declare module '*.ttf' {
  const content: string;
  export default content;
}

/**
 * Load fonts as data uris
 *
 * Note: it is generally advised to use the `papi-extension:` protocol to load assets
 */
declare module '*.otf' {
  const content: string;
  export default content;
}

// #endregion

// #endregion
