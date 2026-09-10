import * as fs from 'fs';
import JSON5 from 'json5';
import { PLACEHOLDER_TEMPLATE_VALUE } from './policy';
import type { ProductBlock } from './types';

/** The parts of `electron-builder.json5` this pipeline reads. */
export type PackagingConfig = {
  productName?: string;
  extraResources?: (string | { from: string; to: string })[];
  snap?: { stagePackages?: string[] };
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
  if (!String(product.name || '').trim() || !String(product.repository || '').trim())
    throw new Error(
      'the notices policy "product" block must record both "name" and "repository": the name is ' +
        'what the document calls the product and the repository is where it says the product is ' +
        'built. Fill both in, or remove the block.',
    );
  // `repository` is cross-checked against nothing - unlike `name`, which has to equal
  // `productName` - so a template value would otherwise print into the document's opening
  // paragraph. The same refusal the separate-program and external-extension tables apply.
  const placeholder = (['name', 'repository'] as const).find((field) =>
    PLACEHOLDER_TEMPLATE_VALUE.test(String(product[field] ?? '')),
  );
  if (placeholder)
    throw new Error(
      `the notices policy "product" block records "${placeholder}" as ` +
        `"${product[placeholder]}", which is still the template placeholder. Replace it with the ` +
        'value it asks for.',
    );
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
}
