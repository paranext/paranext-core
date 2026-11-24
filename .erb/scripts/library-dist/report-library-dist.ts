/**
 * Posts the `Library dist current` commit status for a finished check run. The target file comes
 * from an artifact that a fork pull request's run can write, so it is treated as data: only the
 * commit, pull request number and description come from it, and the state comes from the run's
 * conclusion. Runs under bare `node` with type stripping.
 */

const fs = require('fs');
// Explicit `.ts`: bare `node` does not resolve extensionless TypeScript files.
const {
  parseTarget,
  isTargetForRun,
  shouldReportResult,
  buildStatus,
} = require('./library-dist.util.ts');

async function githubRequest(
  method: string,
  url: string,
  token: string,
  body?: object,
): Promise<{ ok: boolean; status: number; json: () => Promise<unknown> }> {
  return fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

async function main(): Promise<void> {
  const {
    TARGET_FILE,
    CONCLUSION,
    RUN_URL,
    REPOSITORY,
    GITHUB_TOKEN,
    EVENT,
    RUN_HEAD_SHA,
    RUN_ID,
    RUN_ATTEMPT,
  } = process.env;

  let contents: string | undefined;
  try {
    contents = TARGET_FILE ? fs.readFileSync(TARGET_FILE, 'utf8') : undefined;
  } catch {
    contents = undefined;
  }
  const target = contents === undefined ? undefined : parseTarget(contents);
  if (!target) {
    console.log('No valid check target; not posting a status');
    return;
  }

  const runAttempt = Number(RUN_ATTEMPT);
  if (
    !CONCLUSION ||
    !RUN_URL ||
    !REPOSITORY ||
    !GITHUB_TOKEN ||
    !EVENT ||
    !RUN_HEAD_SHA ||
    !RUN_ID ||
    !Number.isInteger(runAttempt)
  ) {
    console.error(
      'CONCLUSION, RUN_URL, REPOSITORY, GITHUB_TOKEN, EVENT, RUN_HEAD_SHA, RUN_ID and RUN_ATTEMPT are required',
    );
    process.exit(1);
  }

  if (!isTargetForRun(target, EVENT, RUN_HEAD_SHA, runAttempt)) {
    console.log(
      `Target does not match attempt ${runAttempt} of the ${EVENT} run at ${RUN_HEAD_SHA}; not posting a status`,
    );
    return;
  }

  const apiRoot = `https://api.github.com/repos/${REPOSITORY}`;

  // A report can run after a newer attempt of the same run has started (the recheck re-runs a
  // finished check), and that attempt reports instead.
  const runResponse = await githubRequest('GET', `${apiRoot}/actions/runs/${RUN_ID}`, GITHUB_TOKEN);
  if (!runResponse.ok) {
    console.error(`Fetching run ${RUN_ID} failed: HTTP ${runResponse.status}`);
    process.exit(1);
  }
  const run: unknown = await runResponse.json();
  const latestAttempt: unknown =
    run && typeof run === 'object' ? Reflect.get(run, 'run_attempt') : undefined;
  if (latestAttempt !== runAttempt) {
    console.log(`Run ${RUN_ID} has a newer attempt than ${runAttempt}; skipping`);
    return;
  }

  if (target.pr !== undefined) {
    const response = await githubRequest('GET', `${apiRoot}/pulls/${target.pr}`, GITHUB_TOKEN);
    if (!response.ok) {
      console.error(`Fetching pull request ${target.pr} failed: HTTP ${response.status}`);
      process.exit(1);
    }
    const pull: unknown = await response.json();
    const head: unknown = pull && typeof pull === 'object' ? Reflect.get(pull, 'head') : undefined;
    const headSha: unknown =
      head && typeof head === 'object' ? Reflect.get(head, 'sha') : undefined;
    if (typeof headSha !== 'string') {
      console.log(`Pull request ${target.pr} response has no head sha; not posting a status`);
      return;
    }
    if (!shouldReportResult(target.sha, headSha)) {
      console.log(`Pull request ${target.pr} has a newer head than ${target.sha}; skipping`);
      return;
    }
  }

  const status = buildStatus(CONCLUSION, target.description, RUN_URL);
  const response = await githubRequest(
    'POST',
    `${apiRoot}/statuses/${target.sha}`,
    GITHUB_TOKEN,
    status,
  );
  if (!response.ok) {
    console.error(`Posting the status failed: HTTP ${response.status}`);
    process.exit(1);
  }
  console.log(`Posted ${status.state} for ${target.sha}: ${status.description}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
