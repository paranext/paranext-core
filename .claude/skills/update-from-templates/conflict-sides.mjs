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

const git = (...args) =>
  execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 1 << 26 });

/** The file's content at a merge stage (1 = merge base, 2 = ours, 3 = theirs), or '' if absent */
const stage = (n, file) => {
  try {
    return git('show', `:${n}:${file}`);
  } catch {
    return '';
  }
};

/** A unified diff of two strings, without the file headers */
const diff = (dir, a, b) => {
  const left = path.join(dir, 'left');
  const right = path.join(dir, 'right');
  fs.writeFileSync(left, a);
  fs.writeFileSync(right, b);
  try {
    execFileSync('git', ['diff', '--no-index', '-U1', left, right], { encoding: 'utf8' });
    return '(no change)\n';
  } catch (error) {
    // `git diff --no-index` exits 1 when the files differ; its output is the diff
    return error.stdout
      .split('\n')
      .filter((line) => !/^(diff --git|index |--- |\+\+\+ )/.test(line))
      .join('\n');
  }
};

const files = git('diff', '--name-only', '--diff-filter=U').trim().split('\n').filter(Boolean);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'conflict-sides-'));
let out = '';
for (const file of files) {
  const [base, ours, theirs] = [1, 2, 3].map((n) => stage(n, file));
  out += `\n################ ${file}\n`;
  out += `=== TEMPLATE changed (merge base -> theirs):\n${diff(tmp, base, theirs)}\n`;
  out += `=== REPO changed (merge base -> ours):\n${diff(tmp, base, ours)}\n`;
}
fs.rmSync(tmp, { recursive: true, force: true });
fs.writeFileSync(outFile, out);
console.log(`${files.length} conflicted file(s) written to ${outFile}`);
