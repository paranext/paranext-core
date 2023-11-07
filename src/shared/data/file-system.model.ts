/** Types to use with file system operations */

/**
 * Represents a path in file system or other. Has a scheme followed by :// followed by a relative
 * path. If no scheme is provided, the app scheme is used. Available schemes are as follows:
 *
 * - `app://` - goes to the app's home directory and into `.platform.bible` (platform-dependent)
 * - `cache://` - goes to the app's temporary file cache at `app://cache`
 * - `data://` - goes to the app's data storage location at `app://data`
 * - `resources://` - goes to the resources directory installed in the app
 * - `file://` - an absolute file path from root
 */
export type Uri = string;
