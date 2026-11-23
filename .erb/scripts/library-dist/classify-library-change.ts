/**
 * Reads changed file paths on stdin, one per line, and prints `true` when any is a library path,
 * otherwise `false`. Runs under bare `node` with type stripping.
 */

const fs = require('fs');
// Explicit `.ts`: bare `node` does not resolve extensionless TypeScript files.
const { hasLibraryChanges } = require('./library-dist.util.ts');

const filePaths: string[] = fs
  .readFileSync(0, 'utf8')
  .split('\n')
  .filter((line: string) => line.length > 0);

console.log(hasLibraryChanges(filePaths));
