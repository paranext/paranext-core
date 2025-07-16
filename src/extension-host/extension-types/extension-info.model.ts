import { Uri } from '@shared/data/file-system.model';
import { ExtensionManifest } from './extension-manifest.model';

/**
 * Information about an extension and extra metadata about it that we generate
 *
 * This is a transformed and frozen version of the extension's {@link ExtensionManifest}
 */
export type ExtensionInfo = Readonly<
  ExtensionManifest & {
    /**
     * Uri to this extension's directory. Not provided in actual manifest, but added while parsing
     * the manifest
     */
    dirUri: Uri;
  }
>;
