#!/usr/bin/env tsx
// One-off build-time CLI that prints results for the operator; not part of the
// runtime where the platform logger would otherwise be required.
/* eslint-disable no-console */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { auditScss, firstDifference, type AuditResult } from './audit';
import { isMainModule } from './is-main-module';

// tools/pt9-css-converter/src -> repo root. Resolved from the script location so the audit works
// regardless of the caller's cwd.
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const CSS_DIR = path.join(REPO_ROOT, 'data/pt9-css');
const MARKER_STYLES_DIR = path.join(
  REPO_ROOT,
  'extensions/src/platform-scripture-editor/src/marker-styles',
);
const BASE_SCSS = path.join(
  REPO_ROOT,
  'extensions/src/platform-scripture-editor/src/_usj-nodes.scss',
);

// The commentaries to audit are derived from the committed pipeline CSS snapshots in data/pt9-css —
// every `<id>.css` except the `*-manual.css` manual references (which are the audit baseline, not a
// converter input). Deriving the list here means there's no hand-maintained resource list to keep
// in sync with the directory contents.
export function resourceIds(): string[] {
  return readdirSync(CSS_DIR)
    .filter((file) => file.endsWith('.css') && !file.endsWith('-manual.css'))
    .map((file) => file.replace(/\.css$/, ''))
    .sort();
}

/** One commentary's audit outcome, with its id attached for reporting. */
export interface CommentaryAuditResult extends AuditResult {
  id: string;
}

/**
 * Audits every committed pipeline stylesheet against its source CSS and returns the results. Pure
 * file IO + comparison with no console/exit side effects, so it is testable directly; {@link main}
 * is the console/exit shell around it.
 */
export function auditAll(): CommentaryAuditResult[] {
  const baseScss = readFileSync(BASE_SCSS, 'utf-8');
  return resourceIds().map((id) => {
    const css = readFileSync(path.join(CSS_DIR, `${id}.css`), 'utf-8');
    const committedScss = readFileSync(path.join(MARKER_STYLES_DIR, `${id}.scss`), 'utf-8');
    return { id, ...auditScss(committedScss, css, { baseScss }) };
  });
}

function main(): void {
  const results = auditAll();
  if (!results.length) {
    console.error(`No pipeline CSS snapshots found in ${CSS_DIR} — nothing to audit.`);
    process.exit(1);
  }

  let drift = false;
  results.forEach(({ id, inSync, expected, actual }) => {
    if (inSync) {
      console.log(`✓ ${id}: marker-styles/${id}.scss matches data/pt9-css/${id}.css`);
    } else {
      drift = true;
      console.error(`✗ ${id}: marker-styles/${id}.scss is OUT OF SYNC with data/pt9-css/${id}.css`);
      console.error(firstDifference(expected, actual));
    }
  });

  if (drift) {
    console.error(
      '\nDrift detected. Re-run the converter (see tools/pt9-css-converter/README.md) or fix the source CSS.',
    );
    process.exit(1);
  }
  console.log(`\nAll ${results.length} commentary stylesheets are in sync with their source CSS.`);
}

if (isMainModule(import.meta.url)) main();
