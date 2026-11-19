// Filters `npm audit` down to the npm packages the installers ship. `npm audit --omit=dev` cannot
// answer that: it reports packages that never ship and misses Electron, a devDependency that ships
// as the runtime. The shipped set is the notices lock's npm rows plus Electron.
import { spawnSync } from 'child_process';
import path from 'path';
import semver from 'semver';
import { readLock } from './third-party-notices/lock';
import { messageOf, readJsonFile } from './third-party-notices/read-json';
import type { LockPackage, Lockfile } from './third-party-notices/types';

const REPO = path.resolve(__dirname, '..', '..');
const SEVERITIES = ['info', 'low', 'moderate', 'high', 'critical'];

export type Advisory = { title: string; url: string; severity: string; range: string };
type AuditEntry = { via?: (string | Advisory)[]; nodes?: string[] };

const isObject = (value: unknown): value is object => typeof value === 'object' && !!value;
const getSeverityRank = (severity: string) => SEVERITIES.indexOf(severity);

/** The shipped npm set as `name@version`: the notices lock's npm rows plus Electron. */
export function getShippedSet(
  lockPackages: Pick<LockPackage, 'ecosystem' | 'name' | 'version'>[],
  packageLock: Lockfile,
): Set<string> {
  const npmRows = lockPackages.filter((p) => p.ecosystem === 'npm');
  if (!npmRows.length) throw new Error('the notices lock has no npm rows');
  const electron = packageLock.packages?.['node_modules/electron']?.version;
  if (!electron) throw new Error('package-lock.json has no node_modules/electron version');
  return new Set([...npmRows.map((p) => `${p.name}@${p.version}`), `electron@${electron}`]);
}

/** Maps each shipped `name@version` with advisories to the advisories whose range covers it. */
export function findShippedAdvisories(
  audit: unknown,
  packageLock: Lockfile,
  shipped: Set<string>,
): Map<string, Advisory[]> {
  // Matching relies on the version 2 report's fields; a new format must fail, not read as clean.
  if (!isObject(audit) || !('auditReportVersion' in audit) || audit.auditReportVersion !== 2)
    throw new Error('npm audit output is not the version 2 report this check reads');
  if (!('vulnerabilities' in audit) || !isObject(audit.vulnerabilities))
    throw new Error('npm audit output has no vulnerabilities object');
  const found = new Map<string, Advisory[]>();
  Object.entries(audit.vulnerabilities).forEach(([name, entry]: [string, AuditEntry]) => {
    // A via of only strings marks a parent flagged because of a child; the child has its own entry.
    const advisories = (entry.via ?? []).filter((v): v is Advisory => typeof v === 'object');
    if (!advisories.length) return;

    (entry.nodes ?? []).forEach((node) => {
      const version = packageLock.packages?.[node]?.version;
      if (!version) return;

      const key = `${name}@${version}`;
      if (!shipped.has(key)) return;

      // One entry covers every copy of a name, and each advisory has its own range, so keep only
      // the advisories that cover this copy's version. A range semver can't read is kept, and a
      // prerelease version is tested against the range like any other: semver would otherwise
      // leave it outside every ordinary range and drop the advisory.
      const applicable = advisories.filter(
        (a) =>
          !semver.validRange(a.range) ||
          semver.satisfies(version, a.range, { includePrerelease: true }),
      );
      if (!applicable.length) return;

      const list = found.get(key) ?? [];
      applicable.forEach((a) => {
        if (!list.some((b) => b.url === a.url)) list.push(a);
      });
      found.set(key, list);
    });
  });
  return found;
}

function main(): number {
  const packageLock = readJsonFile<Lockfile>(path.join(REPO, 'package-lock.json'), 'the lockfile');
  const shipped = getShippedSet(
    readLock(path.join(REPO, 'THIRD-PARTY-NOTICES.lock.json')).packages,
    packageLock,
  );

  // npm audit exits non-zero whenever it finds anything, so only its output is meaningful.
  // `shell: true` lets `npm` resolve to `npm.cmd` on Windows. The command is one fixed string,
  // because Node deprecates passing an argument list alongside `shell: true` (DEP0190).
  const run = spawnSync('npm audit --json --package-lock-only', {
    cwd: REPO,
    shell: true,
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
  let audit: unknown;
  try {
    audit = JSON.parse(run.stdout);
  } catch {
    throw new Error(`could not parse npm audit output: ${run.error?.message ?? run.stderr}`);
  }
  // When the audit request itself fails, npm reports `{ "error": ... }` instead of results.
  if (isObject(audit) && 'error' in audit)
    throw new Error(`npm audit failed: ${JSON.stringify(audit.error)}`);

  const found = findShippedAdvisories(audit, packageLock, shipped);
  found.forEach((advisories, key) => {
    const bySeverity = advisories.toSorted(
      (a, b) => getSeverityRank(b.severity) - getSeverityRank(a.severity),
    );
    console.log(`${key}: ${bySeverity.length} advisories, highest ${bySeverity[0].severity}`);
    bySeverity.forEach((a) => console.log(`  ${a.severity}  ${a.title}  ${a.url}`));
  });
  if (!found.size) console.log('No shipped npm package version has a known advisory.');
  console.log(
    '\nAlso run `dotnet list c-sharp/ParanextDataProvider.csproj package --vulnerable ' +
      '--include-transitive`. Not covered: code inlined in the editor dist, and the extension zips.',
  );
  return found.size ? 1 : 0;
}

if (require.main === module) {
  try {
    process.exitCode = main();
  } catch (err) {
    console.error(`The check could not be completed: ${messageOf(err)}`);
    process.exitCode = 2;
  }
}
