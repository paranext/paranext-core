#!/usr/bin/env node
/**
 * Fail on any Markdown file whose fenced code blocks are structurally broken.
 *
 * A fenced code block is CommonMark's rule, not a line-counting one: it opens on a line indented
 * at most 3 spaces with a run of 3+ identical backticks or tildes, and it closes only on a later
 * line with the same indent cap, the same character, and a run at least as long as the opener's —
 * every line in between, however fence-like it looks, is content. Counting how many lines merely
 * CONTAIN a backtick run can't express any of that: it can't tell a real closer from a nested
 * example's own fence-looking line (a ``` block legitimately nested inside a ```` block is valid
 * CommonMark and common in docs about Markdown itself), and a uniform find/replace that strips one
 * backtick off every real fence preserves whatever parity the file already had, so that kind of
 * damage sails through a count unnoticed. This script instead walks the file tracking fence state,
 * plus a second, independent check for the specific damage signature a uniform one-backtick
 * demotion leaves behind.
 *
 * Why a separate check rather than leaning on `format:check`: `.prettierignorerun` excludes
 * `.context`, `.claude`, `.review` and `CLAUDE.md`, which is where most of this repo's agent-facing
 * Markdown lives — so prettier never reads the files most at risk, whatever it would make of them.
 *
 * Check 1 — destroyed fence lines. A demoted ``` (or ```lang) becomes `` (or ``lang): a run of
 * EXACTLY two backticks, alone on the line except for one info-string word, with nothing else on
 * the line. That is never how backticks are used mid-sentence: inline code always has surrounding
 * text on the same line, and a doubled-backtick span that legitimately wraps a literal backtick
 * (` ``code`` `) always has more after the pair than a single bare word. So the pattern isolates
 * demotion damage without flagging ordinary inline code.
 *
 * Check 2 — unclosed fences. CommonMark caps fence indentation at 3 spaces so that an indented
 * code block (4+ spaces) can contain fence-like lines as literal text without opening anything.
 * The closer must match the opener's character and be at least as long as it — not necessarily
 * equal, since a longer closing run is also valid CommonMark, while a shorter run (or one made of
 * the other character) is just content that happens to look fence-shaped. Whatever fence is still
 * open at end of file is the real defect, so its opening line — not an aggregate count — is what
 * gets reported.
 *
 * Known limits, so nobody reads this as a CommonMark implementation. It walks fences at the top
 * level only: one inside a blockquote or indented under a list item is invisible to it, and an
 * unclosed fence there passes. CommonMark closes such a fence at the end of its containing block,
 * so the file still renders — the gap is in this checker's reach, not in the document. It also
 * treats a backtick fence whose info string contains a backtick as a fence, which CommonMark does
 * not. Both are places to widen the walk if damage ever turns up there; neither is a reason to
 * distrust what it does report.
 *
 * Usage:
 *   node .claude/scripts/verify-md-fences.mjs [file...]   # check the given files
 *   node .claude/scripts/verify-md-fences.mjs             # check every tracked *.md file
 * Exit 0 = every checked file has intact, fully-closed code fences.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

// Exactly two backticks, optionally followed by one bare info-string word, and nothing else on the
// line but the ≤3-space indent CommonMark allows before fence syntax. A run of 3+ backticks can
// never match this: the third backtick has nowhere to go once the optional word group is spent (it
// excludes backticks), so this never fires on an intact fence — only on the two-backtick shape a
// demoted one collapses to.
const DAMAGED_FENCE_LINE = /^ {0,3}``([^`\s]+)?\s*$/;

// A real fence opener: ≤3-space indent, then a run of 3+ identical backticks or tildes.
const FENCE_OPEN = /^ {0,3}(`{3,}|~{3,})/;

// A candidate fence closer: ≤3-space indent, a run of backticks or tildes, then only whitespace.
// Whether it actually closes the currently-open fence (same character, run at least as long) is
// checked against the recorded opener below — this pattern alone only shapes the candidate.
const FENCE_CLOSE = /^ {0,3}(`+|~+)\s*$/;

function trackedMarkdownFiles() {
  const repo = spawnSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).stdout.trim();
  process.chdir(repo);
  const out = spawnSync('git', ['ls-files', '--', '*.md'], { encoding: 'utf8' }).stdout;
  return out
    .split('\n')
    .filter(Boolean)
    .filter((f) => !/(^|\/)(node_modules|vendor)\//.test(f));
}

/**
 * Walk the file once, tracking fence state, and report both problems from that one pass.
 *
 * The two checks share a walk rather than running independently because the damage signature is
 * only damage OUTSIDE a fence. Inside one, a two-backtick line is content — and the content most
 * likely to contain it is a document explaining this very failure mode, which is exactly what a
 * repo that owns this checker will end up writing. A scan with no fence state cannot tell those
 * apart, and would block the documentation about the thing it detects.
 *
 * @returns `{ damagedLines, unclosedAt }` — damaged line numbers found outside any fence, and the
 *   1-based line where a fence that never closes was opened (`null` when every fence closed).
 */
function findFenceProblems(lines) {
  const damagedLines = [];
  let opener = null;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (opener) {
      const close = FENCE_CLOSE.exec(line);
      if (close && close[1][0] === opener.char && close[1].length >= opener.length) {
        opener = null;
      }
      // Any other line while a fence is open is content, however fence-like it looks — ignore it.
      continue;
    }
    if (DAMAGED_FENCE_LINE.test(line)) {
      damagedLines.push(index + 1);
      continue;
    }
    const open = FENCE_OPEN.exec(line);
    if (open) {
      opener = { char: open[1][0], length: open[1].length, lineNumber: index + 1 };
    }
  }
  return { damagedLines, unclosedAt: opener ? opener.lineNumber : null };
}

function checkFile(file) {
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch (err) {
    return { file, readError: err.message };
  }
  const lines = text.split(/\r?\n/);
  const { damagedLines, unclosedAt } = findFenceProblems(lines);
  if (damagedLines.length === 0 && unclosedAt === null) return null;
  return { file, damagedLines, unclosedAt };
}

function main() {
  const files = process.argv.slice(2);
  const targets = files.length ? files : trackedMarkdownFiles();

  const failures = targets.map(checkFile).filter(Boolean);

  if (failures.length) {
    console.error('Markdown files with broken code fences:');
    failures.forEach(({ file, readError, damagedLines, unclosedAt }) => {
      if (readError) {
        console.error(`  ${file}: could not be read (${readError})`);
        return;
      }
      const problems = [];
      if (damagedLines.length) {
        const plural = damagedLines.length > 1 ? 's' : '';
        problems.push(`destroyed fence line${plural} at ${damagedLines.join(', ')}`);
      }
      if (unclosedAt !== null) {
        problems.push(`fence opened at line ${unclosedAt} is never closed`);
      }
      console.error(`  ${file}: ${problems.join('; ')}`);
    });
    return 1;
  }

  console.log(`OK: ${targets.length} Markdown file(s) checked, all fences intact.`);
  return 0;
}

process.exitCode = main();
