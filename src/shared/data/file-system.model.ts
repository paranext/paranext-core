/** Types to use with file system operations */

/**
 * Represents a path in file system or other. Has a scheme followed by :// followed by a relative
 * path. If no scheme is provided, the app scheme is used. Available schemes are as follows:
 *
 * - `app://` - goes to the `.platform.bible` directory inside the user's home directory.
 *
 *   - On Linux and Mac, this is `$HOME/.platform.bible`
 *   - On Windows, this is `%USERPROFILE%/.platform.bible`
 *   - Note: In development, `app://` always goes to `paranext-core/dev-appdata`
 * - `cache://` - goes to the app's temporary file cache at `app://cache`
 * - `data://` - goes to the app's data storage location at `app://data`
 * - `resources://` - goes to the `resources` directory inside the install directory
 *
 *   - Note: In development, `resources://` always goes to the repo root, `paranext-core`. Not all files
 *       are copied into the production `resources` folder, though. See `electron-builder.json5`'s
 *       `extraResources` for some that are copied.
 * - `file://` - an absolute file path from drive root
 *
 * Note: projects are stored in the production version of `app://projects` regardless of whether you
 * are in production or development
 *
 * @example This kind of Uri could look like `app://projects/1234/notes.txt`
 *
 * Note: This kind of Uri does not include extension Uris, which support an additional set of
 * schemes and are only available for use in the extension host.
 *
 * @example An extension Uri might look like `papi-extension://my-extension/assets/notes.txt`
 *
 * You can convert from a `Uri` to a file path using `getPathFromUri`.
 *
 * You can convert from an Extension Uri to a Uri using `getUriFromExtensionUri`.
 */
export type Uri = string;
