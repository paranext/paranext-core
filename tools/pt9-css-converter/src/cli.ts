#!/usr/bin/env tsx
// One-off build-time CLI that prints results for the operator; not part of the
// runtime where the platform logger would otherwise be required.
/* eslint-disable no-console */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { convert, type ConvertWarnings } from './convert';

interface CliArgs {
  in: string;
  out: string;
  base?: string;
}

interface NormalizeSourcePathDeps {
  cwd?: string;
  resolveRepoRoot?: (dir: string) => string | undefined;
  pathModule?: typeof path;
}

// Normalize whatever path the operator passed via --in into a stable, repo-root-
// relative POSIX-style string. Keeps the generated SCSS header reproducible
// across machines and worktrees so committed output doesn't bake in the
// operator's absolute filesystem layout.
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

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const css = readFileSync(path.resolve(args.in), 'utf-8');
  const baseScss = args.base ? readFileSync(path.resolve(args.base), 'utf-8') : undefined;
  const source = normalizeSourcePath(args.in);
  const { scss, markerCount, warnings } = convert(css, { source, baseScss });
  writeFileSync(path.resolve(args.out), scss, 'utf-8');
  console.log(`Wrote ${args.out} — ${markerCount} markers${summarizeWarnings(warnings)}`);
}

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

function isMainModule(): boolean {
  if (!process.argv[1]) return false;
  try {
    return import.meta.url === pathToFileURL(process.argv[1]).href;
  } catch {
    return false;
  }
}

if (isMainModule()) main();
