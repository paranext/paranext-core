import { ElevatedPrivilegeNames } from '@shared/models/elevated-privileges.model';

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
   * Must be specified. Can be an empty string if the extension does not have any JavaScript to run.
   */
  main: string;
  /** List of special permissions required by the extension to work as intended */
  elevatedPrivileges: `${ElevatedPrivilegeNames}`[];
  /**
   * Path to the TypeScript type declaration file that describes this extension and its interactions
   * on the PAPI. Relative to the extension's root folder.
   *
   * If not provided, Platform.Bible will look in the following locations:
   *
   * 1. `<extension_name>.d.ts`
   * 2. `<extension_name><other_stuff>.d.ts`
   * 3. `index.d.ts`
   *
   * See [Extension Anatomy - Type Declaration
   * Files](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#type-declaration-files-dts)
   * for more information about extension type declaration files.
   */
  types?: string;
  /** Path to the JSON file that defines the menu items this extension is adding. */
  menus?: string;
  /** Path to the JSON file that defines the settings this extension is adding. */
  settings?: string;
  /** Path to the JSON file that defines the project settings this extension is adding. */
  projectSettings?: string;
  /** Path to the JSON file that defines the localized strings this extension is adding. */
  localizedStrings?: string;
  /**
   * List of events that occur that should cause this extension to be activated. Not yet
   * implemented.
   */
  activationEvents: string[];
};
