/** Information about an extension provided by the extension developer. */
export type ExtensionManifest = {
  /** Name of the extension */
  name: string;
  /**
   * Extension version - expected to be [semver](https://semver.org/) like `"0.1.3"`.
   *
   * Note: semver may become a hard requirement in the future, so we recommend using it now.
   */
  version: string;
  /**
   * Path to the JavaScript file to run in the extension host. Relative to the extension's root
   * folder.
   *
   * Must be specified. Can be `null` if the extension does not have any JavaScript to run.
   */
  main: string | null;
  /**
   * Path to the TypeScript type definition file that describes this extension and its interactions
   * on the PAPI. Relative to the extension's root folder.
   *
   * If not provided, Platform.Bible will look in the following locations:
   *
   * 1. `<extension_name>.d.ts`
   * 2. `<extension_name><other_stuff>.d.ts`
   * 3. `index.d.ts`
   */
  types?: string;
  /**
   * List of events that occur that should cause this extension to be activated. Not yet
   * implemented.
   */
  activationEvents: string[];
};
