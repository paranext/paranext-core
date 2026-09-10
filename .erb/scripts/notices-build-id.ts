/**
 * Stamps one identity on every module manifest a single `npm run build` produces.
 *
 * The manifests (`.notices/modules/*.json`) are written by FIVE separate webpack processes running
 * concurrently, and the notices generator unions them into one shipping set. Without a shared
 * stamp, a set of MIXED VINTAGE is undetectable - and a stale manifest is a SILENT UNDER-REPORT: it
 * names modules that are gone, or misses ones that are now there, and either way the document comes
 * out shorter or wrong while the build exits 0.
 *
 * Run as `prebuild`, so every `npm run build` mints a fresh id before any webpack starts and each
 * plugin stamps the manifest it writes with it.
 *
 * What this does NOT catch: this file persists between builds, so a bundle rebuilt ON ITS OWN
 * afterwards (`npm run build:renderer`) reads the SAME id and re-stamps its manifest with it, and
 * the mixed-vintage check sees no disagreement. The `unstamped-` fallback in
 * `emit-shipped-modules-plugin.ts` applies only when this file is absent entirely - a tree where
 * `prebuild` has never run - not to a partial rebuild. The stamp detects manifests from two
 * DIFFERENT `npm run build` invocations.
 *
 * What catches a same-id partial rebuild is CI, which builds every bundle from a clean checkout and
 * byte-compares the regenerated artifact. NOT the warm-cache refusal, which is worth stating
 * because it is the obvious candidate and it cannot do the job: only the renderer and the
 * extensions configure a filesystem cache, so `isWarmFilesystemCache` is permanently false for
 * `main` and `extension-host`, and a partial rebuild of either is exactly the case it would need to
 * see. Locally, `rm -rf .notices` before regenerating is the reliable answer: only `npm run
 * package` clears this directory (see `clean.ts`), and an ordinary `npm run build` does not.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

const REPO = path.resolve(__dirname, '..', '..');

/** Name of the stamp file, spelled once so the writer and both readers cannot drift apart. */
const BUILD_ID = 'build-id';

const FILE = path.join(REPO, '.notices', BUILD_ID);

/**
 * Where the stamp file sits relative to the module manifests.
 *
 * Both readers - the webpack plugin that stamps each manifest as it writes it
 * (`.erb/configs/emit-shipped-modules-plugin.ts`) and the generator that checks the stamps agree
 * (`readBuildId` in `.erb/scripts/third-party-notices/shipping-set.ts`) - know only the manifest
 * directory, and reach the stamp from it. Shared so that moving the file cannot leave one of them
 * reading a path nothing writes, which fails as an absent stamp: the plugin falls back to
 * `unstamped-`, and every manifest then carries a value that matches no other.
 *
 * @param manifestDir Directory the module manifests are written to.
 */
export function buildIdFile(manifestDir: string): string {
  return path.join(manifestDir, '..', BUILD_ID);
}

export function main(): void {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  const id = `${new Date().toISOString().replace(/[:.]/g, '-')}-${crypto.randomUUID()}`;
  fs.writeFileSync(FILE, `${id}\n`);
  console.log(`notices build id: ${id}`);
}

if (require.main === module) main();
