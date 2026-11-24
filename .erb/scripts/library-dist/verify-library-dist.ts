/**
 * Rebuilds both libraries and fails when the committed `dist/` folders differ from the fresh build.
 * CI runs this same command. Runs under bare `node` with type stripping.
 */

const { execSync } = require('child_process');
const path = require('path');
// Explicit `.ts`: bare `node` does not resolve extensionless TypeScript files.
const {
  LIBRARY_DIRS,
  parseChangedPaths,
  staleDistInstructions,
} = require('./library-dist.util.ts');

const REPO_ROOT: string = path.resolve(__dirname, '..', '..', '..');

// `platform-bible-react` builds against `platform-bible-utils`, so the utils library builds first.
const BUILD_ORDER: string[] = ['lib/platform-bible-utils', 'lib/platform-bible-react'];

BUILD_ORDER.forEach((libraryDir) => {
  execSync('npm run build:basic', { cwd: path.join(REPO_ROOT, libraryDir), stdio: 'inherit' });
});

const status: string = execSync(
  `git status --porcelain -z -- ${LIBRARY_DIRS.map((dir: string) => `${dir}/dist`).join(' ')}`,
  { cwd: REPO_ROOT, encoding: 'utf8' },
);

const changedFiles: string[] = parseChangedPaths(status);

if (changedFiles.length > 0) {
  console.error(staleDistInstructions(changedFiles));
  process.exit(1);
}
