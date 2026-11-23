/**
 * Reads `gh pr list --json number,headRefOid,files` output on stdin and prints `<number>
 * <headRefOid>` for each pull request that touches a library. Runs under bare `node` with type
 * stripping.
 */

const fs = require('fs');
// Explicit `.ts`: bare `node` does not resolve extensionless TypeScript files.
const { selectLibraryPullRequests } = require('./library-dist.util.ts');

type OpenPullRequest = { number: number; headRefOid: string; files: { path: string }[] };

const pullRequests: OpenPullRequest[] = JSON.parse(fs.readFileSync(0, 'utf8'));

selectLibraryPullRequests(pullRequests).forEach((pullRequest: OpenPullRequest) => {
  console.log(`${pullRequest.number} ${pullRequest.headRefOid}`);
});
