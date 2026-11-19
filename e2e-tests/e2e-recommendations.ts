/**
 * Matches a branch's changed files to the isolated e2e tests that cover them.
 *
 * The mapping lives in `tests/isolated/subset-sources.json`. {@link recommendE2eTests} is pure: it
 * takes the changed files, the mapping and the CI spec lists, and returns a report. The
 * command-line entry point at the bottom of the file reads git and the spec lists and prints the
 * report as JSON.
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  editorPathsPattern,
  isolatedCommand,
  ISOLATED_PREFIX,
  readEditorPathEntries,
  readSpecList,
} from './core-specs';

/**
 * Per isolated key, the repository path prefixes its specs exist to test (`main`) and the ones they
 * only drive along the way (`incidental`). A trailing `/` makes a prefix a directory.
 *
 * A key is a subset (a directory under `tests/isolated/`, such as `docking`), a loose spec directly
 * under it (`comments-tab.spec.ts`) or a spec key: one spec file inside a subset
 * (`scripture-editor/chapter-marker-repair.spec.ts`), which lets that spec name sources of its own.
 * A file that reaches both a subset and one of its spec keys through `main` counts for the spec key
 * first; the report then folds the spec key into the subset when both are recommended.
 */
export type SubsetSources = Record<string, { main: string[]; incidental: string[] }>;

/** How CI treats a recommended key. */
export type CiStatus =
  | { kind: 'spec'; coreList: 'always' | 'editor' | 'none' }
  | {
      kind: 'subset';
      /** Specs CI runs on every pull request. */
      alwaysCoreSpecCount: number;
      /** Further specs CI runs only when the pull request touches the Scripture editor. */
      editorCoreSpecCount: number;
      specCount: number;
    };

/** One isolated key recommended for the changed files. */
export interface E2eRecommendation {
  /**
   * The key from `subset-sources.json`, or for a collapsed item the path prefix that runs its
   * members.
   */
  key: string;
  /** The command that runs it. */
  command: string;
  /** The changed files that matched, sorted. */
  matchedFiles: string[];
  /** For a collapsed item, `kind: 'subset'` counts the member specs only, not the whole subset. */
  ci: CiStatus;
  /**
   * Present on a collapsed item: the spec keys it stands for. Spec keys of one subset that matched
   * the same changed files collapse into one item whose `key` is their common prefix, trimmed back
   * to a `-`, `.` or `/` boundary where that still runs only the members, and run as a path filter.
   * Only a prefix longer than `<subset>/` collapses.
   */
  memberKeys?: string[];
}

/** The result of matching changed files against the isolated e2e tests. */
export interface E2eRecommendationReport {
  /**
   * Keys matched through `main`, sorted by key. A spec key (or a collapsed item) whose subset is
   * recommended too is folded into the subset, its matched files merged in: running the subset runs
   * the spec.
   */
  recommendations: E2eRecommendation[];
  /**
   * Keys matched only through `incidental`, sorted by key. A spec key whose subset is recommended
   * is left out (the subset's run covers it); one whose subset is listed here too is merged into
   * it.
   */
  alsoExercised: { key: string; matchedFiles: string[] }[];
  /**
   * Changed runtime source files under `src/`, `extensions/src/` and `c-sharp/` that no key lists,
   * so no recommendation can cover them. Files `NON_RUNTIME` matches are never reported here, nor
   * are deleted files, and neither is `lib/`: library code is reached through the extensions and
   * renderer components that consume it, so a `lib/` file is reported only through the keys that
   * list it.
   */
  uncoveredFiles: string[];
  /** Changed files that add, change or remove a menu, web view or command registration, sorted. */
  entryPointFiles: string[];
  /**
   * Whether any changed file is runtime code: not matched by `NON_RUNTIME`, and under `src/`,
   * `extensions/src/`, `c-sharp/` or `lib/`. False for a change to documentation, tests, stories,
   * tool configuration or e2e files alone.
   */
  runtimeChanged: boolean;
  /**
   * Prefixes in `subset-sources.json` that match no tracked file, sorted: a moved or deleted source
   * a key still names. Such a prefix silently stops matching, so the map needs updating.
   */
  stalePrefixes: string[];
  /**
   * Whether the changed files make CI's `e2e-core` job run the editor list too: whether one of them
   * matches an `editor_paths` entry in `.github/workflows/test.yml`.
   */
  editorListRuns: boolean;
  /**
   * Whether an e2e spec or its support code changed: any `.ts` file under `e2e-tests/tests/`
   * (specs, page objects, spec helpers), `e2e-tests/fixtures/` or `e2e-tests/reporters/`, plus
   * `e2e-tests/global-setup.ts`, `e2e-tests/global-teardown.ts` and
   * `e2e-tests/playwright*.config.ts` (the harness files the Playwright configuration loads),
   * except a unit test (`*.test.ts`). READMEs and mapping files do not count.
   */
  specsChanged: boolean;
}

/** Everything {@link recommendE2eTests} needs. */
export interface RecommendInput {
  /** Repository-relative changed paths, deleted ones included. */
  changedFiles: string[];
  /**
   * Changed files whose diff adds or removes a command, request handler or web view provider
   * registration ({@link REGISTRATION_PATTERN}). Files outside the source roots or that are not
   * runtime code are ignored.
   */
  filesChangingCommandRegistrations: string[];
  /** The subset of `changedFiles` that no longer exist. */
  deletedFiles: string[];
  /** Every file git tracks (and every untracked one), repository-relative, as written on disk. */
  trackedFiles: string[];
  /** The `editor_paths` entries of `.github/workflows/test.yml`, each a POSIX ERE. */
  editorPaths: string[];
  sources: SubsetSources;
  /** Entries of `e2e-tests/core-specs.txt`. */
  coreSpecs: string[];
  /** Entries of `e2e-tests/core-specs-editor.txt`. */
  editorCoreSpecs: string[];
  /** Each subset key's `*.spec.ts` paths, repository-relative. */
  specFilesBySubset: Record<string, string[]>;
}

const SOURCE_ROOTS = ['src/', 'extensions/src/', 'c-sharp/'];

/**
 * Matches added or removed lines that register a command (`registerCommand(`, or the request
 * handler registration the C# `RegisterRequestHandlerAsync(` and the TypeScript
 * `registerRequestHandler(` calls make) or a web view provider (`registerWebViewProvider(`). Passed
 * to `git diff -G` (POSIX extended regular expression) and tested against the content of untracked
 * files. It over-reports: the request handler calls also register network object and validator
 * handlers, and a declaration matches too, so the result is a prompt to look at the diff, not proof
 * that a command was added. Sending a command does not match.
 */
export const REGISTRATION_PATTERN =
  'registerCommand\\(|registerWebViewProvider\\(|RegisterRequestHandlerAsync\\(|registerRequestHandler\\(';

/**
 * Paths that are not runtime code: tests, Storybook stories and their support code, docs, type
 * declarations, package and .NET build metadata, image and font assets (other files under
 * `assets/`, such as style sheets and data, are runtime), every dotfile and dot-directory below the
 * top level (the formatter, linter, editor and Git configuration, `.github/` workflows, `.vscode/`
 * settings), spelling and TypeScript configuration, licenses, the extension template's release
 * scripts and the Roslyn analyzers. Build configuration that shapes the bundle
 * (`webpack.config.ts`, `webpack/`, `postcss.config.ts`, `tailwind.config.ts`) is runtime. One
 * alternative group per line, each with its reason. `e2e-recommendations.test.ts` runs this over
 * every tracked file under the source roots and fails on a file that is plainly not app code but
 * matches none of these.
 */
const NON_RUNTIME = new RegExp(
  [
    // Unit tests, their helpers and fixtures, Storybook stories and the data only stories use.
    String.raw`\.test\.|\.test-utils?\.|\.fixtures\.|\.stories\.|\.story-data\.`,
    // The core Storybook's own pages and the components only they render.
    String.raw`^src\/stories\/`,
    // Documentation and licenses.
    String.raw`\.md$|\.mdx$|(^|\/)LICENSE$`,
    // Type declarations only exist at compile time.
    String.raw`\.d\.ts$`,
    // Test and mock directories.
    String.raw`(^|\/)(__tests__|__mocks__)\/`,
    // Any dotfile or dot-directory below the top level: formatter, linter, editor, Git and .NET
    // tool configuration, CI workflows and IDE settings, none of which the app loads. A top-level
    // one is not matched, because `.erb/` holds the webpack configuration that builds the app.
    String.raw`\/\.[^/]`,
    // Images and fonts; style sheets and data under assets/ stay runtime.
    String.raw`(^|\/)assets\/.*\.(png|jpe?g|gif|svg|ico|woff2?|ttf)$`,
    // C# test projects (`Foo.Tests/`).
    String.raw`(^|\/)[^/]*Tests\/`,
    // Package and extension metadata: a design decision, not an oversight (a version or
    // dependency bump changes no behaviour an e2e spec can see).
    String.raw`(^|\/)package\.json$|(^|\/)manifest\.json$`,
    // .NET build metadata: projects, shared build properties, the solution and IDE settings.
    String.raw`\.csproj$|\.props$|\.sln$|\.DotSettings$`,
    // Analyzer configuration. `.globalconfig` files have arbitrary names
    // (`ai-analyzers.globalconfig`), so only the suffix is matched.
    String.raw`\.globalconfig$`,
    // Roslyn analyzers run at build time; the app never loads them.
    String.raw`(^|\/)c-sharp\/Paranext\.Analyzers\/`,
    // Per-extension spelling and TypeScript configuration (a template merge rewrites these in every
    // extension). Runtime JSON such as `manifest.json` or `menus.json` is not here.
    String.raw`(^|\/)(tsconfig[^/]*\.json|cspell\.json)$`,
    // The extension template's release scripts, run by hand or from its `.github/` workflows.
    // The other files under an extension's `lib/` can feed the build (`download-db.ts` fetches the
    // data the extension ships), so they stay runtime.
    String.raw`^extensions\/src\/[^/]+\/lib\/(bump-versions|git\.util)\.ts$`,
  ].join('|'),
);
const isNonRuntime = (file: string) => NON_RUNTIME.test(file);
const isInSourceRoot = (file: string) => SOURCE_ROOTS.some((root) => file.startsWith(root));
/** Library code is runtime but reached through the source roots that consume it. */
const isRuntimeRoot = (file: string) => isInSourceRoot(file) || file.startsWith('lib/');
const isE2eSpecSupport = (file: string) =>
  file.endsWith('.ts') &&
  !file.endsWith('.test.ts') &&
  (file.startsWith('e2e-tests/tests/') ||
    file.startsWith('e2e-tests/fixtures/') ||
    file.startsWith('e2e-tests/reporters/') ||
    file === 'e2e-tests/global-setup.ts' ||
    file === 'e2e-tests/global-teardown.ts' ||
    /^e2e-tests\/playwright[^/]*\.config\.ts$/.test(file));

/** Menu contributions of the extensions and the core menu data. */
const isMenuFile = (file: string) =>
  file.endsWith('contributions/menus.json') || file === 'src/extension-host/data/menu.data.json';

function matchesPrefix(file: string, prefix: string): boolean {
  return file === prefix || (prefix.endsWith('/') && file.startsWith(prefix));
}

const matchesAny = (file: string, prefixes: string[]) =>
  prefixes.some((prefix) => matchesPrefix(file, prefix));

const isSpecKey = (key: string) => key.endsWith('.spec.ts');

/** The subset a spec key (or collapsed prefix) lives in; undefined for a subset or a loose spec. */
const subsetOfNestedKey = (key: string) => (key.includes('/') ? key.split('/')[0] : undefined);

/** The command that runs a key: a subset by name, a spec or collapsed prefix as a path filter. */
const commandForKey = (key: string) =>
  isolatedCommand(isSpecKey(key) || key.includes('/') ? `${ISOLATED_PREFIX}${key}` : key);

function addFile(map: Map<string, Set<string>>, key: string, file: string) {
  const files = map.get(key) ?? new Set<string>();
  files.add(file);
  map.set(key, files);
}

/** How many of `specPaths` each CI core list runs. */
function countCoreSpecs(
  specPaths: string[],
  input: RecommendInput,
): { alwaysCoreSpecCount: number; editorCoreSpecCount: number } {
  return {
    alwaysCoreSpecCount: specPaths.filter((spec) => input.coreSpecs.includes(spec)).length,
    editorCoreSpecCount: specPaths.filter((spec) => input.editorCoreSpecs.includes(spec)).length,
  };
}

function ciStatus(key: string, input: RecommendInput): CiStatus {
  if (isSpecKey(key)) {
    const specPath = `${ISOLATED_PREFIX}${key}`;
    if (input.coreSpecs.includes(specPath)) return { kind: 'spec', coreList: 'always' };
    if (input.editorCoreSpecs.includes(specPath)) return { kind: 'spec', coreList: 'editor' };
    return { kind: 'spec', coreList: 'none' };
  }
  const specs = input.specFilesBySubset[key] ?? [];
  return { kind: 'subset', ...countCoreSpecs(specs, input), specCount: specs.length };
}

function commonPrefix(strings: string[]): string {
  return strings.reduce((prefix, value) => {
    let length = 0;
    while (length < prefix.length && prefix[length] === value[length]) length += 1;
    return prefix.slice(0, length);
  });
}

/**
 * Collapses spec keys of one subset that matched the same changed files into one recommendation
 * keyed by the common prefix of their keys, which Playwright accepts as a path filter. The group
 * stays separate when that prefix is no longer than `<subset>/`, or, if the subset's spec files are
 * known, when it would also run a spec that is not a member.
 */
function collapseSpecGroups(
  recommendations: E2eRecommendation[],
  input: RecommendInput,
): E2eRecommendation[] {
  const groups = new Map<string, E2eRecommendation[]>();
  recommendations
    .filter((recommendation) => isSpecKey(recommendation.key) && recommendation.key.includes('/'))
    .forEach((recommendation) => {
      const groupId = `${recommendation.key.slice(0, recommendation.key.lastIndexOf('/'))}\n${recommendation.matchedFiles.join('\n')}`;
      groups.set(groupId, [...(groups.get(groupId) ?? []), recommendation]);
    });

  const collapsed = new Map<E2eRecommendation, E2eRecommendation>();
  groups.forEach((members) => {
    if (members.length < 2) return;
    const longest = commonPrefix(members.map((member) => member.key));
    const subset = members[0].key.slice(0, members[0].key.lastIndexOf('/') + 1);
    if (longest.length <= subset.length) return;
    // The path filter also runs every other spec of the subset that starts with the prefix, so it
    // must run exactly the members (checked whenever the subset's spec files are known).
    // `specFilesBySubset` is keyed by the top-level group, also for a key nested deeper.
    const subsetSpecs = input.specFilesBySubset[members[0].key.split('/')[0]];
    const runsExactlyMembers = (prefix: string) =>
      !subsetSpecs ||
      subsetSpecs.filter((spec) => spec.startsWith(`${ISOLATED_PREFIX}${prefix}`)).length ===
        members.length;
    if (!runsExactlyMembers(longest)) return;
    // Prefer a key that ends at a `-`, `.` or `/` boundary over one that stops mid-word, but only
    // when the subset's spec files are known, so the shorter prefix can be checked.
    const boundary = Math.max(
      longest.lastIndexOf('-'),
      longest.lastIndexOf('.'),
      longest.lastIndexOf('/'),
    );
    const atBoundary = longest.slice(0, boundary + 1);
    const key =
      subsetSpecs && atBoundary.length > subset.length && runsExactlyMembers(atBoundary)
        ? atBoundary
        : longest;
    const merged: E2eRecommendation = {
      key,
      command: commandForKey(key),
      matchedFiles: members[0].matchedFiles,
      ci: {
        kind: 'subset',
        ...countCoreSpecs(
          members.map((member) => `${ISOLATED_PREFIX}${member.key}`),
          input,
        ),
        specCount: members.length,
      },
      memberKeys: members.map((member) => member.key),
    };
    members.forEach((member) => collapsed.set(member, merged));
  });

  const emitted = new Set<E2eRecommendation>();
  return recommendations
    .flatMap((recommendation) => {
      const merged = collapsed.get(recommendation);
      if (!merged) return [recommendation];
      if (emitted.has(merged)) return [];
      emitted.add(merged);
      return [merged];
    })
    .sort((a, b) => (a.key < b.key ? -1 : Number(a.key > b.key)));
}

/**
 * Folds every recommendation whose subset is also recommended into that subset, merging the matched
 * files: the subset's run covers the spec.
 */
function foldIntoSubsets(recommendations: E2eRecommendation[]): E2eRecommendation[] {
  const subsets = new Map(
    recommendations
      .filter((recommendation) => !recommendation.key.includes('/'))
      .map((recommendation) => [recommendation.key, { ...recommendation }]),
  );
  const kept = recommendations.filter((recommendation) => {
    const subset = subsets.get(subsetOfNestedKey(recommendation.key) ?? '');
    if (!subset) return true;
    subset.matchedFiles = [
      ...new Set([...subset.matchedFiles, ...recommendation.matchedFiles]),
    ].sort();
    return false;
  });
  return kept.map((recommendation) => subsets.get(recommendation.key) ?? recommendation);
}

/** The prefixes of `sources` that no tracked file matches, sorted. */
function findStalePrefixes(sources: SubsetSources, trackedFiles: string[]): string[] {
  const tracked = new Set(trackedFiles);
  const prefixes = new Set(
    Object.values(sources).flatMap((entry) => [...entry.main, ...entry.incidental]),
  );
  return [...prefixes]
    .filter((prefix) =>
      prefix.endsWith('/')
        ? !trackedFiles.some((file) => file.startsWith(prefix))
        : !tracked.has(prefix),
    )
    .sort();
}

/** Matches the changed files to the isolated e2e keys that cover them. */
export function recommendE2eTests(input: RecommendInput): E2eRecommendationReport {
  const keys = Object.keys(input.sources);
  const mainMatches = new Map<string, Set<string>>();
  const incidentalMatches = new Map<string, Set<string>>();

  const runtimeFiles = input.changedFiles.filter((file) => !isNonRuntime(file));

  runtimeFiles.forEach((file) => {
    const mainKeys = keys.filter((key) => matchesAny(file, input.sources[key].main));
    mainKeys
      // A subset yields to a spec key inside it that this same file reaches.
      .filter((key) => !mainKeys.some((other) => other.startsWith(`${key}/`)))
      .forEach((key) => addFile(mainMatches, key, file));
    keys
      .filter((key) => !mainKeys.includes(key) && matchesAny(file, input.sources[key].incidental))
      .forEach((key) => addFile(incidentalMatches, key, file));
  });

  const sorted = (files: Set<string> | undefined) => [...(files ?? [])].sort();

  const singles: E2eRecommendation[] = [...mainMatches.keys()].sort().map((key) => ({
    key,
    command: commandForKey(key),
    matchedFiles: sorted(mainMatches.get(key)),
    ci: ciStatus(key, input),
  }));
  const recommendations = foldIntoSubsets(collapseSpecGroups(singles, input));
  const recommendedSubsets = new Set(recommendations.map((recommendation) => recommendation.key));

  const incidentalOnly = [...incidentalMatches.keys()]
    .filter((key) => !mainMatches.has(key))
    .sort()
    .map((key) => ({ key, matchedFiles: sorted(incidentalMatches.get(key)) }));
  const exercisedSubsets = new Map(
    incidentalOnly.filter((entry) => !entry.key.includes('/')).map((entry) => [entry.key, entry]),
  );
  const alsoExercised = incidentalOnly.filter((entry) => {
    const subset = subsetOfNestedKey(entry.key);
    if (subset === undefined) return true;
    if (recommendedSubsets.has(subset)) return false;
    const target = exercisedSubsets.get(subset);
    if (!target) return true;
    target.matchedFiles = [...new Set([...target.matchedFiles, ...entry.matchedFiles])].sort();
    return false;
  });

  const allPrefixes = keys.flatMap((key) => [
    ...input.sources[key].main,
    ...input.sources[key].incidental,
  ]);
  const deleted = new Set(input.deletedFiles);
  const uncoveredFiles = runtimeFiles
    .filter(isInSourceRoot)
    .filter((file) => !deleted.has(file))
    // Localized strings stay matchable (e2e locators use visible text) but are never "uncovered".
    .filter((file) => !file.endsWith('localizedStrings.json'))
    .filter((file) => !matchesAny(file, allPrefixes))
    .sort();

  const entryPointFiles = [
    ...new Set([
      ...runtimeFiles.filter((file) => isMenuFile(file) || file.endsWith('.web-view-provider.ts')),
      ...input.filesChangingCommandRegistrations
        .filter(isInSourceRoot)
        .filter((file) => !isNonRuntime(file)),
    ]),
  ].sort();

  return {
    recommendations,
    alsoExercised,
    uncoveredFiles,
    entryPointFiles,
    runtimeChanged: runtimeFiles.some(isRuntimeRoot),
    stalePrefixes: findStalePrefixes(input.sources, input.trackedFiles),
    editorListRuns:
      input.editorPaths.length > 0 &&
      input.changedFiles.some((file) => editorPathsPattern(input.editorPaths).test(file)),
    specsChanged: input.changedFiles.some(isE2eSpecSupport),
  };
}

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function git(repoRoot: string, ...args: string[]): string[] {
  // `core.quotePath=false` keeps a non-ASCII file name as written instead of a quoted escape.
  return execFileSync('git', ['-c', 'core.quotePath=false', ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 64 * 1024 * 1024,
  })
    .split('\n')
    .filter((line) => line !== '');
}

function listSpecFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listSpecFiles(fullPath);
    return entry.name.endsWith('.spec.ts')
      ? [path.relative(REPO_ROOT, fullPath).split(path.sep).join('/')]
      : [];
  });
}

/**
 * The working tree's changes against `mergeBase`, read from the git repository at `repoRoot`.
 * `--no-renames` lists a rename's old and new path; untracked files never appear in `git diff`, so
 * they come from `git ls-files` and their content is tested for a registration directly.
 * `--end-of-options` makes a ref that starts with `-` a ref, not an option.
 */
export function readGitChanges(
  repoRoot: string,
  mergeBase: string,
): Pick<RecommendInput, 'changedFiles' | 'filesChangingCommandRegistrations' | 'deletedFiles'> {
  const untrackedFiles = git(repoRoot, 'ls-files', '--others', '--exclude-standard');
  const registrationRegExp = new RegExp(REGISTRATION_PATTERN);
  const untrackedRegistering = untrackedFiles
    .filter((file) => isInSourceRoot(file) && !isNonRuntime(file))
    .filter((file) => {
      try {
        return registrationRegExp.test(fs.readFileSync(path.join(repoRoot, file), 'utf8'));
      } catch (error) {
        process.stderr.write(
          `e2e-recommendations: could not read untracked file ${file}: ${error instanceof Error ? error.message : String(error)}\n`,
        );
        return false;
      }
    });
  return {
    changedFiles: [
      ...new Set([
        ...git(repoRoot, 'diff', '--no-renames', '--name-only', '--end-of-options', mergeBase),
        ...untrackedFiles,
      ]),
    ],
    deletedFiles: git(
      repoRoot,
      'diff',
      '--no-renames',
      '--name-only',
      '--diff-filter=D',
      '--end-of-options',
      mergeBase,
    ),
    filesChangingCommandRegistrations: [
      ...git(
        repoRoot,
        'diff',
        '--no-renames',
        '--name-only',
        '-G',
        REGISTRATION_PATTERN,
        '--end-of-options',
        mergeBase,
      ),
      ...untrackedRegistering,
    ],
  };
}

/**
 * Prints the {@link E2eRecommendationReport} for the working tree against `mergeBase` as JSON on
 * stdout.
 */
function runCli(mergeBase: string): void {
  const sources: SubsetSources = JSON.parse(
    fs.readFileSync(path.join(REPO_ROOT, 'e2e-tests/tests/isolated/subset-sources.json'), 'utf8'),
  );
  const specFilesBySubset: Record<string, string[]> = {};
  Object.keys(sources)
    .filter((key) => !isSpecKey(key))
    .forEach((key) => {
      specFilesBySubset[key] = listSpecFiles(path.join(REPO_ROOT, ISOLATED_PREFIX, key));
    });

  const report = recommendE2eTests({
    ...readGitChanges(REPO_ROOT, mergeBase),
    sources,
    trackedFiles: git(REPO_ROOT, 'ls-files', '--cached', '--others', '--exclude-standard'),
    editorPaths: readEditorPathEntries(REPO_ROOT),
    coreSpecs: readSpecList(path.join(REPO_ROOT, 'e2e-tests/core-specs.txt')),
    editorCoreSpecs: readSpecList(path.join(REPO_ROOT, 'e2e-tests/core-specs-editor.txt')),
    specFilesBySubset,
  });
  process.stdout.write(`${JSON.stringify(report, undefined, 2)}\n`);
}

/** Whether this module is the program's entry point, also when started through a symbolic link. */
function isEntryPoint(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return fs.realpathSync(entry) === fs.realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isEntryPoint()) {
  const mergeBase = process.argv[2];
  if (!mergeBase) {
    process.stderr.write('Usage: tsx e2e-tests/e2e-recommendations.ts <merge-base>\n');
    process.exit(1);
  }
  try {
    runCli(mergeBase);
  } catch (error) {
    process.stderr.write(
      `e2e-recommendations failed for "${mergeBase}": ${error instanceof Error ? error.message : String(error)}\n`,
    );
    process.exit(1);
  }
}
