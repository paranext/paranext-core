import * as fs from 'fs';
import JSON5 from 'json5';
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
 * Refuses a product block that is incomplete or that names a product the packaging config does not
 * build.
 *
 * The name is READ from the packaging config and CONFIRMED by the overlay, not asserted by it: a
 * downstream build rewrites `productName` before packaging, and the document has to describe what
 * that build produces. A block naming something else would put a product name into a legal artifact
 * that no installer carries.
 */
export function assertProductMatchesPackaging(
  product: ProductBlock | undefined,
  config: PackagingConfig,
  configName: string,
): void {
  if (!product) return;
  if (!String(product.name || '').trim() || !String(product.repository || '').trim())
    throw new Error(
      'the notices policy "product" block must record both "name" and "repository": the name is ' +
        'what the document calls the product and the repository is where it says the product is ' +
        'built. Fill both in, or remove the block.',
    );
  if (config.productName !== product.name)
    throw new Error(
      `the notices policy "product" block names "${product.name}", but ${configName} builds ` +
        `"${config.productName}". The document describes what the packaging config builds, so ` +
        'the two have to agree - fix whichever is wrong.',
    );
}
