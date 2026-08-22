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
 * DIFFERENT `npm run build` invocations; a same-id partial rebuild is caught instead by the
 * warm-cache refusal and by CI, which always builds every bundle from a clean checkout.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const FILE = path.join(REPO, '.notices', 'build-id');

function main() {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  const id = `${new Date().toISOString().replace(/[:.]/g, '-')}-${crypto.randomUUID()}`;
  fs.writeFileSync(FILE, `${id}\n`);
  console.log(`notices build id: ${id}`);
}

if (require.main === module) main();

module.exports = { BUILD_ID_FILE: FILE, main };
