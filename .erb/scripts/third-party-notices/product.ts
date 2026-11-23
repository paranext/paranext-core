import * as fs from 'fs';
import JSON5 from 'json5';
import { requireText } from './policy';
import type { ProductBlock } from './types';

/**
 * An `extraResources` entry.
 *
 * `from` and `to` are OPTIONAL because electron-builder declares them that way on a `FileSet`; this
 * type is a claim about JSON nobody validated, so every reader narrows before using either.
 */
export type ExtraResource = string | { from?: string; to?: string };

/** The parts of `electron-builder.json5` this pipeline reads. */
export type PackagingConfig = {
  productName?: string;
  extraResources?: ExtraResource[];
  snap?: { stagePackages?: string[] };
  /** Unset in this repository, and `packaging.test.ts` is what holds them that way. */
  nsis?: { license?: string };
  dmg?: { license?: string };
  directories?: { buildResources?: string };
  /**
   * Per-platform overrides. electron-builder UNIONS the `extraResources` here with the top-level
   * list rather than replacing it, so a reader that looks only at the top level misses anything a
   * build declares for one platform - see `extraResourceEntries` in `external-extensions.ts`.
   */
  mac?: { extraResources?: ExtraResource[] };
  win?: { extraResources?: ExtraResource[] };
  linux?: { extraResources?: ExtraResource[] };
};

/** Parses the packaging config once, for every reader in this pipeline. */
export function readPackagingConfig(file: string): PackagingConfig {
  return JSON5.parse(fs.readFileSync(file, 'utf8'));
}

/**
 * What this repository itself builds, and so what the no-product prose in `render.ts` names.
 *
 * Shared with that prose rather than spelled twice, because the check below is what keeps the two
 * in step: the document may only fall back to this wording for a build that actually produces it.
 */
export const DEFAULT_PRODUCT_NAME = 'Platform.Bible';

/** Every file name the packaging config copies into the installed `resources/` directory. */
function packedResourceNames(config: PackagingConfig): string[] {
  const entries = [
    config.extraResources,
    config.mac?.extraResources,
    config.win?.extraResources,
    config.linux?.extraResources,
  ].flatMap((list) => (Array.isArray(list) ? list : []));
  return entries.flatMap((entry) => {
    // A string entry copies to `resources/` preserving its relative path; the object form names its
    // destination. Either way what a reader of the installed product sees beside the notices is the
    // last path segment, which is what the document tells them to look for.
    const spelled = typeof entry === 'string' ? entry : entry?.to || entry?.from;
    if (typeof spelled !== 'string') return [];
    const name = spelled.replace(/\\/g, '/').replace(/\/+$/, '').split('/').pop();
    return name ? [name] : [];
  });
}

/**
 * Refuses a product block whose license document is not one the installer carries.
 *
 * The sentence this drives tells the reader the file sits beside the document they are reading. A
 * name no `extraResources` entry produces makes that sentence false in the one place it is most
 * likely to be read - inside the installed product, offline, by someone looking for the terms they
 * agreed to.
 */
function assertLicenseDocumentShips(
  product: ProductBlock,
  config: PackagingConfig,
  configName: string,
): void {
  const block = 'the notices policy "product" block\'s "licenseDocument"';
  const document = product.licenseDocument;
  if (!document || typeof document !== 'object')
    throw new Error(
      `the notices policy "product" block records no "licenseDocument". The document states where ` +
        `a reader finds the terms ${product.name} itself is licensed under, and this repository's ` +
        'own answer - LICENSING.md - is about this repository. Record the label, the file name the ' +
        'installer carries, and optionally a published copy.',
    );
  requireText(block, 'label', document.label);
  requireText(block, 'file', document.file);
  if (document.href !== undefined) requireText(block, 'href', document.href);
  const packed = packedResourceNames(config);
  if (!packed.includes(document.file.trim()))
    throw new Error(
      `${block} names "${document.file}", and ${configName} copies no such file into the ` +
        'installed resources directory. The document tells the reader it ships beside them, so a ' +
        `name no installer carries states something false. Packed today: ${packed.join(', ')}.`,
    );
}

/**
 * Refuses a product block that is incomplete or that names a product the packaging config does not
 * build, and a build that renames the product without declaring one at all.
 *
 * The name is READ from the packaging config and CONFIRMED by the overlay, not asserted by it: a
 * downstream build rewrites `productName` before packaging, and the document has to describe what
 * that build produces. A block naming something else would put a product name into a legal artifact
 * that no installer carries.
 *
 * A MISSING block is the same failure in the other direction. The no-product prose says
 * "Platform.Bible incorporates..." and "This is a reference, not the notices for any shipped
 * product" - true of this repository, and false of any build that renamed the product. An overlay
 * that misspells the `product` key, or omits it, would ship that disclaimer as the notices for a
 * shipped application, so the absence has to be confirmed by `productName` too.
 */
export function assertProductMatchesPackaging(
  product: ProductBlock | undefined,
  config: PackagingConfig,
  configName: string,
): void {
  if (!product) {
    if (config.productName === undefined)
      throw new Error(
        `${configName} sets no "productName", so this run cannot establish what it builds. The ` +
          'document names the product in its first sentence - set productName, or declare a ' +
          '"product" block in the overlay.',
      );
    if (config.productName !== DEFAULT_PRODUCT_NAME)
      throw new Error(
        `${configName} builds "${config.productName}" but the notices policy declares no ` +
          '"product" block; add one to the overlay, or restore productName',
      );
    return;
  }
  // The shared refusal, which is a TYPE test as well as an emptiness and placeholder one.
  // `repository` is cross-checked against nothing - unlike `name`, which has to equal `productName`
  // - and `render.ts` prints it into the document's opening paragraph inside a code span, so a
  // number or the npm-conventional `{ "type": "git", "url": … }` object would ship there as the
  // literal `[object Object]`. The same refusal the separate-program and external-extension tables
  // apply, so one table cannot accept a shape another refuses.
  const block = 'the notices policy "product" block';
  requireText(block, 'name', product.name);
  requireText(block, 'repository', product.repository);
  // Read for truthiness by `render.ts`, where it decides whether the document states that UBS's
  // permission covers this product - so "false", "no" or any other non-empty string would assert
  // a third party's licence grant. The same rule `nonBooleanOverrideFlag` applies to its flags.
  if (product.isParatext !== undefined && typeof product.isParatext !== 'boolean')
    throw new Error(
      `the notices policy "product" block records "isParatext" as "${product.isParatext}", which ` +
        "is not a boolean. It decides whether the document states that UBS's permission to " +
        'distribute the lexical database covers this product, and any non-empty value at all ' +
        'would otherwise read as "yes" - record true or false.',
    );
  if (config.productName !== product.name)
    throw new Error(
      `the notices policy "product" block names "${product.name}", but ${configName} builds ` +
        `"${config.productName}". The document describes what the packaging config builds, so ` +
        'the two have to agree - fix whichever is wrong.',
    );
  // UBS's permission to distribute the lexical database names Paratext. A product CALLED Paratext
  // that is not recorded as covered by it would make the document say the permission is specific to
  // Paratext and then that it does not extend to this product - two statements about the same
  // artifact that a reader cannot reconcile. Refused rather than rendered: which one is wrong is a
  // determination, not something this pipeline can pick.
  if (/paratext/i.test(product.name) && product.isParatext !== true)
    throw new Error(
      `the notices policy "product" block names "${product.name}" and does not record ` +
        '"isParatext": true. UBS permits the lexical database\'s distribution in Paratext, so the ' +
        'document would state that the permission is specific to Paratext and then that it does ' +
        `not extend to ${product.name}. Record "isParatext": true if the permission covers this ` +
        'product, or rename it if it does not.',
    );
  // Last, because the checks above are about WHICH product this is: a block naming the wrong
  // product would otherwise be reported as a license-document problem.
  assertLicenseDocumentShips(product, config, configName);
}
