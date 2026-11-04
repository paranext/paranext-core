const path = require('path');
const { spawnSync } = require('child_process');

/**
 * Runs `xcrun stapler staple` once on a notarized app, the way `@electron/notarize` does: from the
 * app's folder, naming the bundle relative to it.
 *
 * @param {string} appPath Absolute path of the `.app` bundle
 * @returns {{ ok: boolean; output: string }} Whether stapling worked, and stapler's output
 */
function stapleOnce(appPath) {
  const result = spawnSync('xcrun', ['stapler', 'staple', '-v', path.basename(appPath)], {
    cwd: path.dirname(appPath),
    encoding: 'utf-8',
  });
  return { ok: result.status === 0, output: `${result.stdout ?? ''}${result.stderr ?? ''}` };
}

/** @param {number} ms */
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Staples Apple's notarization ticket to an app that notarytool has already accepted, retrying for
 * several minutes.
 *
 * `xcrun stapler` downloads the ticket from Apple's CloudKit ticket service, which sometimes drops
 * the connection (stapler error 68, `NSURLErrorDomain` -1005). `@electron/notarize` retries the
 * staple too, but its retries are over within about 7 seconds, and the service can stay unreachable
 * for longer than that. Retrying only the staple avoids redoing the build and the notarization.
 *
 * @param {string} appPath Absolute path of the notarized `.app` bundle
 * @param {object} [options]
 * @param {number} [options.attempts] How many times to try stapling in all. Default 8
 * @param {number} [options.delayMs] How long to wait after a failed attempt. Default 60 seconds
 * @param {(appPath: string) => { ok: boolean; output: string }} [options.staple] Runs one staple
 *   attempt. Defaults to `xcrun stapler staple`
 * @param {(ms: number) => Promise<void>} [options.wait] Waits between attempts. Defaults to a timer
 * @returns {Promise<void>} Resolves once the ticket is stapled; rejects with stapler's last output
 *   when every attempt fails
 */
async function stapleWithRetry(
  appPath,
  { attempts = 8, delayMs = 60_000, staple = stapleOnce, wait = sleep } = {},
) {
  const tryFrom = async (attempt) => {
    const { ok, output } = staple(appPath);
    if (ok) {
      console.log(`Stapled ${path.basename(appPath)} on attempt ${attempt} of ${attempts}`);
      return;
    }
    if (attempt >= attempts) {
      throw new Error(`Failed to staple ${appPath} after ${attempts} attempts:\n${output}`);
    }
    console.warn(
      `Staple attempt ${attempt} of ${attempts} failed; retrying in ${delayMs / 1000} s:\n${output}`,
    );
    await wait(delayMs);
    await tryFrom(attempt + 1);
  };
  await tryFrom(1);
}

module.exports = { stapleWithRetry };
