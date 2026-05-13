/**
 * Finds the most recently applied shadcn preset by searching git history for a commit whose message
 * contains `npx shadcn apply --preset <preset>`, then prints the preset code.
 *
 * Run via: npm run get-latest-preset
 */

import { execSync } from 'node:child_process';

const commitBody = execSync("git log --grep 'npx shadcn apply --preset' -1 --format=%B", {
  encoding: 'utf8',
});

if (!commitBody.trim()) {
  process.stderr.write(
    "No commit found containing 'npx shadcn apply --preset'. Has a preset been applied yet?\n",
  );
  process.exit(1);
}

const match = commitBody.match(/npx shadcn apply --preset\s+([\w\d]+)/);
if (!match) {
  process.stderr.write(`Could not extract preset from commit message:\n${commitBody}\n`);
  process.exit(1);
}

process.stdout.write(`${match[1]}\n`);
