// For each conflicted file in a repo mid-merge, writes what the template changed (merge base ->
// theirs) and what the repo changed (merge base -> ours), so a pull applied in the wrong direction
// stands out. Usage: node conflict-sides.mjs <repo dir> <out file>
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [repo, outFile] = process.argv.slice(2);
if (!repo || !outFile) {
  console.error('Usage: node conflict-sides.mjs <repo dir> <out file>');
  process.exit(2);
}

// Node's 1 MiB default is too small for a conflicted lockfile's diff
const maxBuffer = 1 << 26;

const git = (...args) =>
  execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer });

const MERGE_BASE = 1;
const OURS = 2;
const THEIRS = 3;

/**
 * The merge stages present for a conflicted file. A modify/delete conflict has no stage for the
 * side that deleted the file, and an add/add conflict has no merge-base stage.
 */
const stagesOf = (file) => {
  const stages = new Set(
    // `literal`: a file name with `*` or `?` must not be read as a glob
    git('ls-files', '-z', '--unmerged', '--', `:(top,literal)${file}`)
      .split('\0')
      .filter(Boolean)
      // Each entry is `<mode> <object> <stage>\t<path>`
      .map((entry) => Number(entry.split('\t')[0].split(' ')[2])),
  );
  // A conflicted file always has at least one stage; none means the lookup missed it, and the
  // report would wrongly call the file absent on both sides.
  if (stages.size === 0) throw new Error(`No merge stages found for conflicted file ${file}`);
  return stages;
};

/** The file's content at a merge stage. `:<n>:<path>` paths are relative to the repo's top. */
const contentAt = (n, file) => git('show', `:${n}:${file}`);

/** A unified diff of two strings, without the file headers */
const diff = (dir, a, b) => {
  const left = path.join(dir, 'left');
  const right = path.join(dir, 'right');
  fs.writeFileSync(left, a);
  fs.writeFileSync(right, b);
  try {
    execFileSync('git', ['diff', '--no-index', '-U1', left, right], {
      encoding: 'utf8',
      maxBuffer,
    });
    return '(no change)\n';
  } catch (error) {
    // `git diff --no-index` exits 1 when the files differ; its output is the diff. Anything else
    // (git failing, output over maxBuffer) would leave a missing or cut-off diff, so fail loudly.
    if (error.status !== 1) throw error;
    const lines = error.stdout.split('\n');
    // The header ends at the first hunk; content lines after it can start with `--- ` or `+++ `
    // too. A binary file's diff has no hunk, only header lines and a "Binary files … differ" line.
    const firstHunk = lines.findIndex((line) => line.startsWith('@@'));
    return firstHunk >= 0
      ? lines.slice(firstHunk).join('\n')
      : lines.filter((line) => !/^(diff --git|index |--- |\+\+\+ )/.test(line)).join('\n');
  }
};

/** What one side changed since the merge base, saying so when either version is missing */
const sideChange = (dir, file, stages, side) => {
  if (!stages.has(side))
    return stages.has(MERGE_BASE)
      ? '(this side deleted the file)\n'
      : '(the file is absent on this side and in the merge base)\n';
  if (!stages.has(MERGE_BASE))
    return `(not in the merge base: this side added the whole file)\n${diff(dir, '', contentAt(side, file))}`;
  return diff(dir, contentAt(MERGE_BASE, file), contentAt(side, file));
};

// `-z` lists names unquoted: by default git quotes a non-ASCII name (`"caf\303\251.txt"`), which
// then matches no file
const files = git('diff', '-z', '--name-only', '--diff-filter=U').split('\0').filter(Boolean);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'conflict-sides-'));
let out = '';
try {
  for (const file of files) {
    const stages = stagesOf(file);
    out += `\n################ ${file}\n`;
    out += `=== TEMPLATE changed (merge base -> theirs):\n${sideChange(tmp, file, stages, THEIRS)}\n`;
    out += `=== REPO changed (merge base -> ours):\n${sideChange(tmp, file, stages, OURS)}\n`;
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
fs.writeFileSync(outFile, out);
console.log(`${files.length} conflicted file(s) written to ${outFile}`);
