// For each conflicted file in a repo mid-merge, writes what the template changed (merge base ->
// theirs) and what the repo changed (merge base -> ours), so a pull applied in the wrong direction
// stands out. Usage: node conflict-sides.mjs <repo dir> <out file>
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const [repo, outFile] = process.argv.slice(2);
if (!repo || !outFile) {
  console.error('Usage: node conflict-sides.mjs <repo dir> <out file>');
  process.exit(2);
}

// Node's 1 MiB default is too small for a conflicted lockfile's diff
const maxBuffer = 1 << 26;

const git = (args, input) =>
  execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer, input });

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
    git(['ls-files', '-z', '--unmerged', '--', `:(top,literal)${file}`])
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

/** The blob of the file at a merge stage. `:<n>:<path>` paths are relative to the repo's top. */
const stageBlob = (n, file) => `:${n}:${file}`;

/** The empty blob, to diff a whole added file against. Writing it is idempotent. */
const emptyBlob = () => git(['hash-object', '-w', '--stdin'], '').trim();

/**
 * A unified diff of two blobs, without the file headers. Comparing blobs directly, with colour,
 * external diff tools and textconv filters turned off, keeps the user's git config out of the
 * report, and compares the stored bytes, so a change in line endings alone still shows.
 */
const diff = (a, b) => {
  const output = git(['diff', '--no-color', '--no-ext-diff', '--no-textconv', '-U1', a, b]);
  if (!output) return '(no change)\n';
  const lines = output.split('\n');
  // The header ends at the first hunk; content lines after it can start with `--- ` or `+++ `
  // too. A binary file's diff has no hunk, only header lines and a "Binary files … differ" line.
  const firstHunk = lines.findIndex((line) => line.startsWith('@@'));
  return firstHunk >= 0
    ? lines.slice(firstHunk).join('\n')
    : lines.filter((line) => !/^(diff --git|index |--- |\+\+\+ )/.test(line)).join('\n');
};

/** What one side changed since the merge base, saying so when either version is missing */
const sideChange = (file, stages, side) => {
  if (!stages.has(side))
    return stages.has(MERGE_BASE)
      ? '(this side deleted the file)\n'
      : '(the file is absent on this side and in the merge base)\n';
  if (!stages.has(MERGE_BASE))
    return `(not in the merge base: this side added the whole file)\n${diff(emptyBlob(), stageBlob(side, file))}`;
  return diff(stageBlob(MERGE_BASE, file), stageBlob(side, file));
};

// `-z` lists names unquoted: by default git quotes a non-ASCII name (`"caf\303\251.txt"`), which
// then matches no file
const files = git(['diff', '-z', '--name-only', '--diff-filter=U']).split('\0').filter(Boolean);
let out = '';
for (const file of files) {
  const stages = stagesOf(file);
  out += `\n################ ${file}\n`;
  out += `=== TEMPLATE changed (merge base -> theirs):\n${sideChange(file, stages, THEIRS)}\n`;
  out += `=== REPO changed (merge base -> ours):\n${sideChange(file, stages, OURS)}\n`;
}
fs.writeFileSync(outFile, out);
console.log(`${files.length} conflicted file(s) written to ${outFile}`);
