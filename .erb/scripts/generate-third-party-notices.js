/**
 * Generates THIRD-PARTY-NOTICES.md from the resolved production dependency tree.
 *
 * Attribution obligations (MIT/BSD/ISC/Apache) attach to the _distributed binary_, so this walks
 * the production tree only — devDependencies never ship and are deliberately excluded. Run it
 * whenever production dependencies change:
 *
 *     npm run build:third-party-notices
 *
 * The .NET and Electron sections are curated below rather than derived, because NuGet nuspec
 * metadata is incomplete and Electron ships its own notices inside the packaged app.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const REPO = path.resolve(__dirname, '..', '..');
const OUT = path.join(REPO, 'THIRD-PARTY-NOTICES.md');
const MODULE_ROOTS = ['node_modules', 'extensions/node_modules', 'release/app/node_modules'];
const LICENSE_FILE = /^(LICEN[CS]E|COPYING)(\..*)?$/i;

/**
 * Dual-licensed dependencies, and which branch Platform.Bible elects. Recorded explicitly because
 * "MIT OR GPL-3.0-or-later" is not self-resolving: shipping under a license the project has not
 * chosen is exactly the ambiguity a notices file exists to remove.
 */
const ELECTED_LICENSES = {
  jszip: { elected: 'MIT', of: 'MIT OR GPL-3.0-or-later' },
  dompurify: { elected: 'Apache-2.0', of: 'MPL-2.0 OR Apache-2.0' },
  'harmony-reflect': { elected: 'Apache-2.0', of: 'Apache-2.0 OR MPL-1.1' },
};

/**
 * Strong copyleft. A dependency under one of these would force the _distributed application_ to be
 * offered under the same terms, which is incompatible with shipping the binary under separate
 * end-user terms (see LICENSING.md). Reaching one is a build-stopping error, not a warning —
 * discovering it after release is not a recoverable position.
 */
const BLOCKING_COPYLEFT = /^\s*(AGPL|GPL|LGPL|SSPL|OSL|EUPL|CPAL|CeCILL)\b/i;

/**
 * File-level copyleft. Compatible with proprietary distribution provided the covered files' source
 * stays available and is not further restricted, so these warn rather than block — but each one is
 * a deliberate acceptance, not something to wave through.
 */
const WEAK_COPYLEFT = /^\s*(MPL|CDDL|EPL|MS-RL)\b/i;

/** NuGet packages referenced by the .NET data provider, with licenses read from their nuspec. */
const DOTNET_PACKAGES = [
  { name: 'icu.net', license: 'MIT' },
  { name: 'Microsoft.Extensions.Configuration', license: 'MIT' },
  { name: 'Microsoft.Extensions.Configuration.UserSecrets', license: 'MIT' },
  {
    name: 'Microsoft.ICU.ICU4C.Runtime',
    license: 'Unicode-3.0',
    note: 'Windows only. Permissive; requires the Unicode copyright and permission notice to travel with copies.',
  },
  { name: 'StreamJsonRpc', license: 'MIT' },
  { name: 'System.Text.Encoding.CodePages', license: 'MIT' },
  { name: 'ParatextChecks', license: 'Proprietary — SIL Global / UBS' },
  { name: 'ParatextData', license: 'Proprietary — SIL Global / UBS' },
];

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return undefined;
  }
}

function readDirSafe(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

/** Resolves a package name to its installed directory, searching nested node_modules. */
function findPackageDir(name) {
  const direct = MODULE_ROOTS.map((root) => path.join(REPO, root, name)).find((dir) =>
    fs.existsSync(path.join(dir, 'package.json')),
  );
  if (direct) return direct;

  const stack = MODULE_ROOTS.map((root) => path.join(REPO, root));
  let found;
  while (stack.length && !found) {
    const nested = readDirSafe(stack.pop())
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(entry.parentPath ?? entry.path, entry.name, 'node_modules'))
      .filter((dir) => fs.existsSync(dir));
    const hit = nested.find((dir) => fs.existsSync(path.join(dir, name, 'package.json')));
    if (hit) found = path.join(hit, name);
    else stack.push(...nested);
  }
  return found;
}

function licenseIdOf(pkg) {
  if (typeof pkg.license === 'string') return pkg.license;
  if (pkg.license?.type) return pkg.license.type;
  if (Array.isArray(pkg.licenses)) return pkg.licenses.map((l) => l.type || l).join(' OR ');
  return 'UNKNOWN';
}

/** Every package in the production tree, deduplicated by name@version. */
function collectProductionPackages() {
  let raw;
  try {
    raw = execSync('npm ls --omit=dev --all --json', {
      cwd: REPO,
      maxBuffer: 1024 * 1024 * 256,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString();
  } catch (err) {
    // `npm ls` exits non-zero on extraneous/peer warnings but still emits usable JSON.
    raw = err.stdout?.toString() || '{}';
  }
  const found = new Map();
  const walk = (node) => {
    Object.entries(node.dependencies || {}).forEach(([name, dep]) => {
      // No version means npm listed the edge but resolved nothing — an unmet optional or peer
      // dependency. Nothing is on disk, so nothing ships, and it must not reach the notices file.
      if (!dep || dep.missing || !dep.version) return;
      const key = `${name}@${dep.version}`;
      if (found.has(key)) return;
      found.set(key, { name, version: dep.version });
      walk(dep);
    });
  };
  walk(JSON.parse(raw));
  return [...found.values()];
}

/**
 * Workspace packages are first-party; they belong in LICENSING.md, not a third-party file.
 *
 * Resolved by reading each workspace's declared `name` rather than taking the last path segment —
 * the two differ (`extensions/` is published as `paranext-extensions`), and guessing from the path
 * silently leaks a first-party package into the third-party report.
 */
function collectOwnPackageNames() {
  const own = new Set();
  const lock = readJson(path.join(REPO, 'package-lock.json')) || {};
  Object.entries(lock.packages || {}).forEach(([key, entry]) => {
    if (!key) return;
    if (entry.resolved?.startsWith('file:')) own.add(key.replace(/^node_modules\//, ''));
    if (key.startsWith('node_modules')) return;
    const manifest = readJson(path.join(REPO, key, 'package.json'));
    if (manifest?.name) own.add(manifest.name);
  });
  return own;
}

/** Licenses recorded in the lockfile, for packages not installed on this platform. */
function lockfileLicenses() {
  const lock = readJson(path.join(REPO, 'package-lock.json')) || {};
  const byName = new Map();
  Object.entries(lock.packages || {}).forEach(([key, entry]) => {
    if (!entry.license) return;
    const name = key.replace(/^.*node_modules\//, '');
    if (name && !byName.has(name)) byName.set(name, entry.license);
  });
  return byName;
}

/**
 * Classifies a license expression as 'ok', 'weak', 'blocking', or 'unknown'.
 *
 * SPDX expressions are disjunctions as often as not ("MIT OR GPL-3.0-or-later"), and a single
 * permissive branch is enough — the recipient chooses. So a package only blocks when _every_ branch
 * is copyleft. `AND` is not split: it means all named licenses apply together, so the expression is
 * judged as a whole and a copyleft term anywhere in it still blocks.
 */
function classifyLicense(expression) {
  if (!expression || expression === 'UNKNOWN') return 'unknown';
  const branches = expression
    .split(/\s+OR\s+/i)
    .map((branch) => branch.replace(/[()]/g, '').trim())
    .filter(Boolean);
  if (!branches.length) return 'unknown';
  if (branches.some((b) => !BLOCKING_COPYLEFT.test(b) && !WEAK_COPYLEFT.test(b))) return 'ok';
  if (branches.every((b) => BLOCKING_COPYLEFT.test(b))) return 'blocking';
  return 'weak';
}

/**
 * Reads a package's own license file, if it ships one.
 *
 * Line endings are normalized to LF: some upstream licenses are CRLF, and git normalizes them on
 * commit. Without this the committed file would never match freshly generated output, so the
 * generated artifact would show a spurious diff on every run.
 */
function readLicenseText(dir) {
  if (!dir) return undefined;
  const file = readDirSafe(dir).find((entry) => LICENSE_FILE.test(entry.name));
  if (!file) return undefined;
  try {
    return fs.readFileSync(path.join(dir, file.name), 'utf8').replace(/\r\n?/g, '\n').trim();
  } catch {
    return undefined;
  }
}

function buildReport() {
  const own = collectOwnPackageNames();
  const fromLock = lockfileLicenses();
  const packages = collectProductionPackages()
    .filter((pkg) => !own.has(pkg.name))
    .sort((a, b) => a.name.localeCompare(b.name) || a.version.localeCompare(b.version));

  const texts = new Map(); // sha1 of license text -> { text, packages: [] }
  const rows = [];
  const notInstalled = [];

  packages.forEach((pkg) => {
    const dir = findPackageDir(pkg.name);
    const manifest = dir ? readJson(path.join(dir, 'package.json')) : undefined;
    const declared = manifest ? licenseIdOf(manifest) : fromLock.get(pkg.name) || 'UNKNOWN';
    const elected = ELECTED_LICENSES[pkg.name];
    const text = readLicenseText(dir);

    if (!dir) notInstalled.push(pkg.name);
    if (text) {
      const hash = crypto.createHash('sha1').update(text).digest('hex');
      if (!texts.has(hash)) texts.set(hash, { text, packages: [] });
      texts.get(hash).packages.push(`${pkg.name}@${pkg.version}`);
    }
    // An election resolves the expression, so classify what is actually relied on, not what was
    // declared: `jszip` declares "MIT OR GPL-3.0-or-later" but ships to users as MIT.
    const effective = elected ? elected.elected : declared;
    rows.push({
      ...pkg,
      license: elected ? `${elected.elected} (elected from ${elected.of})` : declared,
      classification: classifyLicense(effective),
      hasText: !!text,
    });
  });

  return { rows, texts, notInstalled };
}

function render({ rows, texts, notInstalled }) {
  const counts = rows.reduce(
    (acc, row) => ({ ...acc, [row.license]: (acc[row.license] || 0) + 1 }),
    {},
  );
  const noText = rows.filter((row) => !row.hasText).map((row) => row.name);
  const out = [];

  out.push('# Third-party notices', '');
  out.push(
    'Platform.Bible incorporates the third-party components listed below. Their licenses are',
    'reproduced in full, as those licenses require. This file covers the **production dependency',
    'tree only** — build and test tooling does not ship and is excluded.',
    '',
    '> Generated by `.erb/scripts/generate-third-party-notices.js`. Do not edit by hand; run',
    '> `npm run build:third-party-notices` after changing production dependencies.',
    '',
    'For the license covering Platform.Bible itself, see [LICENSING.md](./LICENSING.md).',
    '',
  );

  out.push('## Electron, Chromium, and Node.js', '');
  out.push(
    'The packaged application embeds Electron (MIT), which in turn bundles Chromium, V8, and',
    'Node.js under their own licenses. Electron ships those notices inside the packaged',
    'application as `LICENSE.electron.txt` and `LICENSES.chromium.html`; both are installed',
    'alongside the executable and are the authoritative text for those components.',
    '',
  );

  out.push('## .NET data provider (NuGet)', '');
  out.push('| Package | License | Notes |', '| --- | --- | --- |');
  DOTNET_PACKAGES.forEach((pkg) =>
    out.push(`| \`${pkg.name}\` | ${pkg.license} | ${pkg.note || ''} |`),
  );
  out.push('');
  if (DOTNET_PACKAGES.some((pkg) => pkg.license.includes('(verify)'))) {
    out.push(
      'Entries marked `(verify)` could not be resolved from local nuspec metadata and need',
      'confirmation against the published package before a binary release.',
      '',
    );
  }

  out.push('## npm production dependencies', '');
  out.push(`${rows.length} packages. License distribution:`, '');
  out.push('| License | Packages |', '| --- | --- |');
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([license, n]) => out.push(`| ${license} | ${n} |`));
  out.push('');

  if (notInstalled.length) {
    out.push(
      `Not installed on the generating platform, so the license below comes from \`package-lock.json\`: ${notInstalled
        .map((name) => `\`${name}\``)
        .join(', ')}.`,
      '',
    );
  }
  if (noText.length) {
    out.push(
      'The following ship no license file of their own, so the identifier in the table below comes',
      'from their `package.json` (or the lockfile) and no text for them appears in the next',
      `section: ${noText.map((name) => `\`${name}\``).join(', ')}.`,
      '',
    );
  }

  out.push('| Package | Version | License |', '| --- | --- | --- |');
  rows.forEach((row) => out.push(`| \`${row.name}\` | ${row.version} | ${row.license} |`));
  out.push('');

  out.push('## License texts', '');
  out.push(
    `The ${texts.size} distinct license texts below cover the packages named beneath each heading.`,
    '',
  );
  [...texts.values()].forEach(({ text, packages: covered }, index) => {
    out.push(`### ${index + 1}. ${covered.join(', ')}`, '', '```text', text, '```', '');
  });

  return `${out.join('\n')}\n`;
}

const report = buildReport();
// Write before gating, so a failing build still leaves the evidence to inspect.
fs.writeFileSync(OUT, render(report));
console.log(
  `Wrote ${path.relative(REPO, OUT)}: ${report.rows.length} packages, ${report.texts.size} distinct license texts.`,
);

const blocking = report.rows.filter((row) => row.classification === 'blocking');
const weak = report.rows.filter((row) => row.classification === 'weak');
const unknown = report.rows.filter((row) => row.classification === 'unknown');

weak.forEach((row) =>
  console.warn(`  warning: ${row.name}@${row.version} is file-level copyleft (${row.license}).`),
);
unknown.forEach((row) =>
  console.warn(`  warning: ${row.name}@${row.version} declares no resolvable license.`),
);

if (blocking.length) {
  console.error(
    `\nERROR: ${blocking.length} production dependency/dependencies are under strong copyleft:`,
  );
  blocking.forEach((row) => console.error(`  - ${row.name}@${row.version}: ${row.license}`));
  console.error(
    '\nShipping these would extend their copyleft to the distributed application, which is',
    '\nincompatible with releasing the binary under separate end-user terms (see LICENSING.md).',
    '\nRemove or replace the dependency. If it is genuinely dual-licensed and a permissive branch',
    '\napplies, record that election in ELECTED_LICENSES in this script so the choice is explicit.',
  );
  process.exit(1);
}
