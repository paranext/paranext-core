#!/usr/bin/env node
/**
 * Fail on any Markdown file with an odd number of code-fence lines.
 *
 * A fenced code block opens and closes with a matching pair of ``` lines, so a well-formed file
 * always has an even count. An odd count means a fence line was lost or added without its partner
 * — e.g. a broken opening/closing fence — which silently turns everything after it into either
 * rendered prose or an unterminated code block. `prettier --check` does not catch this: a lone
 * `` ` `` `` `` reads as inline code, not a broken fence, so it exits 0. Lint and typecheck do not
 * look at Markdown at all.
 *
 * The fence match tolerates leading whitespace (`^\s*` before the backticks) rather than anchoring
 * only at column 0: fences indented under a list item are real, common CommonMark, and an
 * anchored-only match would silently skip them.
 *
 * Usage:
 *   node .claude/scripts/verify-md-fences.mjs [file...]   # check the given files
 *   node .claude/scripts/verify-md-fences.mjs             # check every tracked *.md file
 * Exit 0 = every checked file has a balanced (even) fence count.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const FENCE_LINE = /^\s*```/;

function trackedMarkdownFiles() {
  const repo = spawnSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).stdout.trim();
  process.chdir(repo);
  const out = spawnSync('git', ['ls-files', '--', '*.md'], { encoding: 'utf8' }).stdout;
  return out
    .split('\n')
    .filter(Boolean)
    .filter((f) => !/(^|\/)(node_modules|vendor)\//.test(f));
}

function main() {
  const files = process.argv.slice(2);
  const targets = files.length ? files : trackedMarkdownFiles();

  const failures = [];
  for (const file of targets) {
    const text = readFileSync(file, 'utf8');
    const count = text.split(/\r?\n/).filter((line) => FENCE_LINE.test(line)).length;
    if (count % 2 !== 0) {
      failures.push({ file, count });
    }
  }

  if (failures.length) {
    console.error('Markdown files with an unbalanced (odd) number of code-fence lines:');
    failures.forEach(({ file, count }) => console.error(`  ${file}: ${count} fence lines`));
    return 1;
  }

  console.log(`OK: ${targets.length} Markdown file(s) checked, all have balanced code fences.`);
  return 0;
}

process.exitCode = main();
