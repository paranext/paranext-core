/**
 * Types to use with file system operations
 */

/**
 * Represents a path in file system or other.
 * Has a scheme followed by :// followed by a relative path.
 * If no scheme is provided, the app scheme is used.
 * Available schemes are as follows:
 *  - app:// - goes to the app's data directory (platform-dependent)
 *  - resources:// - goes to the resources directory installed in the app
 */
export type Uri = string;
