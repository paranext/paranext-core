#!/usr/bin/env tsx
/**
 * Build-time CLI wrapper around {@link convert}. An operator runs it by hand to regenerate a
 * marker-styles SCSS file from PT9 CSS:
 *
 * ```bash
 * npx tsx tools/pt9-css-converter/src/cli.ts --in <input.css> --out <output.scss> [--base <base.scss>]
 * ```
 *
 * It reads `--in`, optionally reads `--base`, calls {@link convert}, writes the result to `--out`,
 * and prints a one-line summary. `console` is used deliberately here (rather than the platform
 * logger) because this is a standalone operator script, not part of the running application — hence
 * the file-level `no-console` disable below.
 */
/* eslint-disable no-console */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { convert, type ConvertWarnings } from './convert';
import { isMainModule } from './is-main-module';

/** Parsed command-line arguments. */
interface CliArgs {
  in: string;
  out: string;
  base?: string;
}

/** Injectable dependencies for {@link normalizeSourcePath}, overridden in tests. */
interface NormalizeSourcePathDeps {
  cwd?: string;
  resolveRepoRoot?: (dir: string) => string | undefined;
  pathModule?: typeof path;
}

/**
 * Normalizes whatever path the operator passed via `--in` into a stable, repo-root-relative
 * POSIX-style string. Keeps the generated SCSS header reproducible across machines and worktrees so
 * committed output doesn't bake in the operator's absolute filesystem layout. Falls back to the
 * bare filename when the repo root can't be determined.
 *
 * @param inputPath The `--in` path as given (absolute or relative to `cwd`).
 * @param deps Injectable overrides for the working directory, repo-root resolver, and path module.
 * @returns A forward-slash path relative to the repo root, or just the basename if no root is
 *   found.
 */
export function normalizeSourcePath(inputPath: string, deps: NormalizeSourcePathDeps = {}): string {
  const pathLib = deps.pathModule ?? path;
  const cwd = deps.cwd ?? process.cwd();
  const resolveRepoRoot = deps.resolveRepoRoot ?? gitRepoRootResolver;

  const absolutePath = pathLib.resolve(cwd, inputPath);
  const repoRoot = resolveRepoRoot(pathLib.dirname(absolutePath));
  if (!repoRoot) return pathLib.basename(absolutePath);
  const rel = pathLib.relative(repoRoot, absolutePath);
  return rel.split(pathLib.sep).join('/');
}

/** Resolves the git repo root containing `dir` via `git rev-parse`, or `undefined` if not a repo. */
function gitRepoRootResolver(dir: string): string | undefined {
  try {
    const root = execFileSync('git', ['-C', dir, 'rev-parse', '--show-toplevel'], {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return root || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Entry point: parses args, runs the conversion, writes the output file, and prints a summary.
 * Exported so it can be driven in-process by tests; execution is still gated by
 * {@link isMainModule}.
 */
export function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const css = readFileSync(path.resolve(args.in), 'utf-8');
  const baseScss = args.base ? readFileSync(path.resolve(args.base), 'utf-8') : undefined;
  const source = normalizeSourcePath(args.in);
  const { scss, markerCount, warnings } = convert(css, { source, baseScss });
  writeFileSync(path.resolve(args.out), scss, 'utf-8');
  console.log(`Wrote ${args.out} — ${markerCount} markers${summarizeWarnings(warnings)}`);
}

/**
 * Parses `--in`, `--out`, and optional `--base` flags. Prints usage and exits non-zero on unknown
 * arguments or when a required flag is missing; exits zero on `--help`/`-h`.
 *
 * @param argv Argument list (typically `process.argv.slice(2)`).
 * @returns The validated `--in`/`--out`/`--base` values.
 */
function parseArgs(argv: string[]): CliArgs {
  let inPath: string | undefined;
  let outPath: string | undefined;
  let basePath: string | undefined;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--in') {
      i += 1;
      inPath = argv[i];
    } else if (arg === '--out') {
      i += 1;
      outPath = argv[i];
    } else if (arg === '--base') {
      i += 1;
      basePath = argv[i];
    } else if (arg === '--help' || arg === '-h') {
      printUsage();
      process.exit(0);
    } else if (arg !== '--') {
      console.error(`Unknown argument: ${arg}`);
      printUsage();
      process.exit(2);
    }
  }
  if (!inPath || !outPath) {
    printUsage();
    process.exit(2);
  }
  return { in: inPath, out: outPath, base: basePath };
}

/** Builds the parenthetical warning summary appended to the success line (empty when none). */
function summarizeWarnings(w: ConvertWarnings): string {
  const parts: string[] = [];
  if (w.unknownProperties.length) parts.push(`${w.unknownProperties.length} unknown properties`);
  if (w.skippedTableMarkers.length)
    parts.push(`${w.skippedTableMarkers.length} table markers skipped`);
  if (w.skippedSelectors.length)
    parts.push(`${w.skippedSelectors.length} non-marker selectors skipped`);
  if (w.duplicateMarkers.length) parts.push(`${w.duplicateMarkers.length} duplicate markers`);
  if (w.baseOverlapMarkers.length) parts.push(`${w.baseOverlapMarkers.length} base overlaps`);
  return parts.length ? ` (${parts.join(', ')})` : '';
}

function printUsage(): void {
  console.error(
    'Usage: pt9-css-to-editor-scss --in <input.css> --out <output.scss> [--base <_usj-nodes.scss>]',
  );
}

if (isMainModule(import.meta.url)) main();
