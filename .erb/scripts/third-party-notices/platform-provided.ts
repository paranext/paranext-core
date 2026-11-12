import { EXTENSION_INTERFACE_MODULE_SPECIFIERS } from '../../../src/extension-host/data/extension-interface-modules.data';
import { WEB_VIEW_MODULE_SPECIFIERS } from '../../../src/renderer/data/web-view-modules.data';
import { compareStrings } from './compare';
import { packageOfSpecifier } from './shipping-set';

/**
 * The packages Platform.Bible itself supplies to an extension at run time, so an extension's bundle
 * neither ships them nor owes a notice for them.
 *
 * Derived from the two module allowlists the extension host and the renderer enforce, reduced to
 * package names. Node built-ins (`crypto`) are packages of no one, and `packageOfSpecifier` drops
 * them.
 *
 * A function rather than a constant, so loading this module calls nothing in `shipping-set.ts`: a
 * suite that replaces that module with a partial stub then only has to supply what it calls.
 */
export function platformProvidedPackages(): string[] {
  return [
    ...new Set(
      [...EXTENSION_INTERFACE_MODULE_SPECIFIERS, ...WEB_VIEW_MODULE_SPECIFIERS]
        .map((specifier) => packageOfSpecifier(specifier))
        .filter((name): name is string => name !== undefined),
    ),
  ].sort(compareStrings);
}
