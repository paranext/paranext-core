/**
 * Pure helpers behind the dev-package staging scripts.
 *
 * These carry the parts of the design that are easy to get subtly wrong and impossible to notice
 * from a passing install: which remote counts as the same repo, when a staged copy is still
 * current, how a staged manifest is reshaped for `file:` consumption, and where a lockfile stopped
 * agreeing with what is staged. They live here, apart from the file I/O and git calls, so they can
 * be exercised directly — a regression in any of them otherwise surfaces as "npm install is broken
 * on main" for every developer and every consumer CI job at once.
 *
 * Consumed by `stage-dev-packages.ts` and `postinstall.ts`, which both run under bare `node` with
 * type stripping, so they reach it with `require('./stage-dev-packages.util.ts')` — the explicit
 * extension is required there.
 */

/** The dependency sections npm records for a `file:` package and validates against the lockfile. */
export const COMPARED_SECTIONS = [
  'dependencies',
  'peerDependencies',
  'peerDependenciesMeta',
  'optionalDependencies',
] as const;

/**
 * The dependency sections compared, as parsed from a staged manifest or a lockfile entry. Entry
 * values are `unknown` because `peerDependenciesMeta` holds objects where the others hold
 * version-range strings.
 */
export type DependencySections = Partial<
  Record<(typeof COMPARED_SECTIONS)[number], Record<string, unknown>>
>;

/**
 * Reduces every URL form git accepts for one repo to `<host>/<path>`.
 *
 * Only the repo's identity matters when deciding whether a checkout points at the configured
 * remote, not the transport: anyone who pushes to a dev repo has an SSH remote
 * (`git@github.com:org/repo.git`), which is the same repo as the HTTPS `cloneUrl` and must not be
 * reported as a move.
 */
export function normalizeRepoUrl(url: string): string {
  return (
    url
      .trim()
      .replace(/\/+$/, '')
      .replace(/\.git$/, '')
      // Drop the scheme (`https://`, `ssh://`, `git+https://`) and any `user@` prefix, then turn
      // scp-style `host:org/repo` into `host/org/repo`.
      .replace(/^[a-z+]+:\/\//i, '')
      .replace(/^[^@/]+@/, '')
      .replace(/^([^/:]+):/, '$1/')
      .toLowerCase()
  );
}

/**
 * What a marker written for this source state, package, and script version would say.
 *
 * `packagePath` is part of the identity because the source commit alone does not determine what was
 * staged: repointing a package at a different path in `dev-packages.json` leaves both the commit
 * and the destination folder unchanged, so without it the staged copy would keep satisfying the
 * freshness check and never be rebuilt from the new path.
 *
 * `stagingFormat` is bumped whenever what a staged copy contains changes. The marker records only
 * the source commit, so without it a fix to the staging logic would never reach anyone already
 * staged at a revision that has not moved.
 */
export function getExpectedMarker(
  sourceStamp: string,
  packagePath: string,
  isLocal: boolean,
  stagingFormat: number,
): string {
  return `${sourceStamp}${isLocal ? '-local' : ''} path=${packagePath} format=${stagingFormat}`;
}

/**
 * The dependency sections whose pnpm `workspace:` specifiers get rewritten to sibling `file:`
 * paths. Narrower than {@link COMPARED_SECTIONS}: `peerDependenciesMeta` declares no specifier.
 */
const REWRITTEN_SECTIONS = ['dependencies', 'peerDependencies', 'optionalDependencies'] as const;

/**
 * The parts of a dev package's manifest that staging reshapes. Everything else it carries is passed
 * through untouched, so it is deliberately not modelled here.
 */
export type StagedManifest = {
  /**
   * Nests arbitrarily (subpath -> condition -> ... -> path), so it is deliberately left untyped and
   * walked instead. See {@link stripDevelopmentConditions}.
   */
  exports?: unknown;
  devDependencies?: Record<string, string>;
  volta?: unknown;
} & Partial<Record<(typeof REWRITTEN_SECTIONS)[number], Record<string, string>>>;

/**
 * Deletes every `development` export condition anywhere under `exports`.
 *
 * The condition points at the package's raw TypeScript under `src/`, which staging copies (`src` is
 * in both dev packages' `files`), so a surviving condition lets a consumer bundler configured with
 * `development` in its `conditionNames` resolve the staged package to untranspiled source and fail
 * at build time — in the consumer's repo, with nothing naming staging as the cause.
 *
 * Walks rather than indexing a fixed path because `exports` nests arbitrarily: a condition can sit
 * under any subpath and at any depth, and conditions-only shorthand puts one at the top level. A
 * bare `development` key is always a condition, never a subpath — subpath keys start with `.`.
 */
function stripDevelopmentConditions(node: unknown): void {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    node.forEach(stripDevelopmentConditions);
    return;
  }
  const conditions: { development?: unknown } = node;
  delete conditions.development;
  Object.values(node).forEach(stripDevelopmentConditions);
}

/**
 * Reshapes a dev package's manifest into the form npm consumes from a staged `file:` folder.
 *
 * Mutates and returns `manifest`: the `development` export condition and `devDependencies` are
 * dropped, Volta's toolchain pin goes with them (it means nothing in a consumer's tree), and pnpm
 * `workspace:` specifiers become `file:` paths at the sibling staged folder.
 *
 * @param stagingFolderByName Staged folder name for each package name that may appear as a
 *   `workspace:` dependency.
 * @param describeManifest How to name the manifest if a `workspace:` specifier cannot be resolved.
 */
export function shapeStagedManifest(
  manifest: StagedManifest,
  stagingFolderByName: Map<string, string>,
  describeManifest: string,
): StagedManifest {
  stripDevelopmentConditions(manifest.exports);
  delete manifest.devDependencies;
  // Volta pins the dev repo's toolchain; it means nothing in a consumer's tree.
  delete manifest.volta;

  // `optionalDependencies` is included even though nothing declares one today: npm resolves it like
  // `dependencies`, so a `workspace:` specifier left there would fail the install with
  // `Unsupported URL Type "workspace:"` naming a file inside a gitignored staging folder that
  // nobody edited.
  REWRITTEN_SECTIONS.forEach((section) => {
    const deps = manifest[section];
    if (!deps) return;
    Object.entries(deps).forEach(([name, specifier]) => {
      if (!specifier.startsWith('workspace:')) return;
      const stagingFolder = stagingFolderByName.get(name);
      if (!stagingFolder)
        throw new Error(
          `${describeManifest} depends on "${name}" with specifier "${specifier}", but "${name}" is not staged. Add it to dev-packages.json so it can be resolved.`,
        );
      deps[name] = `file:../${stagingFolder}`;
    });
  });

  return manifest;
}

/**
 * Describes every place a lockfile entry disagrees with the manifest actually staged.
 *
 * Presence in `node_modules` is not enough on its own: npm builds its ideal tree from the on-disk
 * state it saw at startup, so a staged package whose dependency _range_ moved resolves to the
 * already-installed version, reports "up to date", and leaves the lockfile recording the old range.
 * Every later `npm ci` then fails on the mismatch, in CI, for everyone.
 */
export function diffStagedAgainstLock(
  stagingFolder: string,
  staged: DependencySections,
  lockEntry: DependencySections | undefined,
): string[] {
  if (!lockEntry)
    return [`package-lock.json has no entry for dev-packages/staging/${stagingFolder}`];

  const mismatches: string[] = [];
  COMPARED_SECTIONS.forEach((section) => {
    const stagedSection = staged[section] ?? {};
    const recordedSection = lockEntry[section] ?? {};
    new Set([...Object.keys(stagedSection), ...Object.keys(recordedSection)]).forEach((name) => {
      // Structural, because `peerDependenciesMeta` entries are objects. Both sides are parsed from
      // JSON npm wrote, so key order is stable. `JSON.stringify` of an absent entry is `undefined`,
      // which compares equal only to another absent one.
      const stagedValue = JSON.stringify(stagedSection[name]);
      const recordedValue = JSON.stringify(recordedSection[name]);
      if (stagedValue === recordedValue) return;
      mismatches.push(
        `${stagingFolder} ${section}.${name}: staged package declares ${stagedValue ?? 'nothing'}, ` +
          `package-lock.json records ${recordedValue ?? 'nothing'}`,
      );
    });
  });
  return mismatches;
}

/**
 * Whether an environment variable is set to something meaning "on".
 *
 * `!!process.env.X` is true for `"0"`, `"false"` and `"no"`, so the natural way to turn one of
 * these flags back off instead turns it on — and these flags choose between staging the pinned
 * revision and staging whatever a checkout happens to hold, or between repairing an install and
 * failing it.
 */
export function isEnvFlagEnabled(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized !== '' && normalized !== '0' && normalized !== 'false' && normalized !== 'no';
}

/**
 * Where `stage-dev-packages` records commits it moved aside, relative to the repository root.
 *
 * A file rather than a return value because the two halves run in different processes: staging is
 * `preinstall` and the announcement has to survive until the end of `postinstall`, which is the
 * last thing `npm install` prints. Under `dev-packages/`, which is gitignored, so a rescue never
 * shows up as a change to commit.
 */
export const RESCUED_COMMITS_FILE = 'dev-packages/.stage-rescues.json';

/** One checkout whose commits `stage-dev-packages` moved aside before resetting it. */
export type RescuedCommit = {
  /** `dev-packages.json`'s folder name, to say which checkout this was. */
  repoFolder: string;
  /** Absolute path, so the recovery commands below can be pasted as they are printed. */
  repoPath: string;
  /** The branch that was reset. */
  revision: string;
  /** How many commits were on it that the remote did not have. */
  commitCount: number;
  /** The ref holding the pre-reset commit. */
  rescueRef: string;
};

/**
 * The announcement printed when a checkout's unpushed commits were moved aside.
 *
 * Deliberately loud, and deliberately printed twice - once by staging and once at the very end of
 * `postinstall`. Staging runs as `preinstall`, so anything it says is followed by npm's own install
 * output and a full build chain; a quiet line there is gone by the time the install finishes.
 *
 * The refs are not cleaned up by anything, which is the point: the reminder repeats on every
 * install until the commits are dealt with, and deleting the ref is how that is said.
 */
export function formatRescuedCommitsBanner(rescues: RescuedCommit[]): string {
  if (rescues.length === 0) return '';
  const rule = '='.repeat(78);
  const lines = ['', rule, '  UNPUSHED COMMITS WERE MOVED ASIDE - NOT LOST', rule, ''];
  rescues.forEach((rescue) => {
    lines.push(
      `  ${rescue.repoFolder}: ${rescue.commitCount} commit(s) on "${rescue.revision}" were not on`,
      '  the remote, so staging reset the branch past them. They are kept at:',
      '',
      `      ${rescue.rescueRef}`,
      '',
      '  To look at them, or put them back on a branch of their own:',
      '',
      `      git -C "${rescue.repoPath}" log ${rescue.rescueRef}`,
      `      git -C "${rescue.repoPath}" branch <your-branch-name> ${rescue.rescueRef}`,
      '',
      '  This message repeats on every install until you delete the ref:',
      '',
      `      git -C "${rescue.repoPath}" update-ref -d ${rescue.rescueRef}`,
      '',
    );
  });
  lines.push(rule, '');
  return lines.join('\n');
}
