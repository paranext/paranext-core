/**
 * Sets `description` in the check target file (path in env `TARGET_FILE`) to the first argument,
 * keeping the other fields. Runs under bare `node` with type stripping.
 */

const fs = require('fs');
// Explicit `.ts`: bare `node` does not resolve extensionless TypeScript files.
const { parseTarget } = require('./library-dist.util.ts');

const targetFile: string | undefined = process.env.TARGET_FILE;
const description: string | undefined = process.argv[2];

if (!targetFile || description === undefined) {
  console.error('Usage: TARGET_FILE=<path> write-description.ts <description>');
  process.exit(1);
}

const target = parseTarget(fs.readFileSync(targetFile, 'utf8'));
if (!target) {
  console.error(`${targetFile} is not a valid check target`);
  process.exit(1);
}

fs.writeFileSync(targetFile, JSON.stringify({ ...target, description }));
